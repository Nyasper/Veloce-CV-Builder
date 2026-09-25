<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { CvProject } from './types'
import { mockCv } from './mockData'
import { 
  normalizeCv, 
  cloneCvProject, 
  getDefaultCvData, 
  getDefaultCvDesign, 
  exportCvAsJson, 
  generateId 
} from './utils'
import CvDashboard from './components/CvDashboard.vue'
import CvEditor from './components/CvEditor.vue'
import CvPreview from './components/CvPreview.vue'
import { Sparkles, Sun, Moon, LayoutDashboard, Eye, Edit3 } from 'lucide-vue-next'

const LOCAL_STORAGE_KEY = 'cv_portfolio_builder_cvs'
const THEME_STORAGE_KEY = 'cv_builder_dark_mode'
const LANG_STORAGE_KEY = 'cv_builder_language'

// Global Reactive States
const cvList = ref<CvProject[]>([])
const activeCvId = ref<string | null>(null)
const currentTab = ref<'dashboard' | 'editor'>('dashboard')
const darkMode = ref<boolean>(true) // Dark mode is default
const appLang = ref<'en' | 'es'>('en') // English is default
const mobileView = ref<'editor' | 'preview'>('editor') // Mobile viewport toggle

// Writable computed active CV for robust two-way reactivity
const activeCv = computed<CvProject | null>({
  get: () => {
    if (!activeCvId.value) return null
    return cvList.value.find(cv => cv.id === activeCvId.value) || null
  },
  set: (newVal) => {
    if (!newVal || !activeCvId.value) return
    const index = cvList.value.findIndex(cv => cv.id === activeCvId.value)
    if (index !== -1) {
      cvList.value[index] = newVal
    }
  }
})

// Initialize Application State on Mount
onMounted(() => {
  // Load Dark Mode (default is true if not explicitly saved as false)
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'false') {
    darkMode.value = false
    document.body.classList.remove('dark-mode')
  } else {
    darkMode.value = true
    document.body.classList.add('dark-mode')
  }

  // Load Language
  const savedLang = localStorage.getItem(LANG_STORAGE_KEY)
  if (savedLang === 'en' || savedLang === 'es') {
    appLang.value = savedLang
  }
  document.documentElement.lang = appLang.value

  // Load CV List with schema normalization
  const savedCvs = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (savedCvs) {
    try {
      const parsed = JSON.parse(savedCvs)
      if (Array.isArray(parsed) && parsed.length > 0) {
        cvList.value = parsed.map(item => normalizeCv(item))
      } else if (Array.isArray(parsed)) {
        cvList.value = []
      } else {
        cvList.value = [normalizeCv(mockCv)]
      }
    } catch {
      cvList.value = [normalizeCv(mockCv)]
    }
  } else {
    // On first load, preload the clean mock CV so the user isn't greeted with an empty screen
    cvList.value = [normalizeCv(mockCv)]
    saveToStorage()
  }
})

// Deep watch cvList to auto-save instantly
watch(cvList, () => {
  saveToStorage()
}, { deep: true })

// Watch language changes to persist and update html lang attribute
watch(appLang, (newLang) => {
  localStorage.setItem(LANG_STORAGE_KEY, newLang)
  document.documentElement.lang = newLang
})

const saveToStorage = () => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cvList.value))
  } catch (err) {
    console.error('Failed to save to localStorage', err)
  }
}

const toggleTheme = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem(THEME_STORAGE_KEY, String(darkMode.value))
  if (darkMode.value) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
}

// State Action Handlers
const handleSelectCv = (id: string) => {
  activeCvId.value = id
  mobileView.value = 'editor'
  currentTab.value = 'editor'
}

const handleCreateCv = (title: string) => {
  const newCv: CvProject = {
    id: generateId(),
    title: title.trim() || (appLang.value === 'es' ? 'Nuevo CV' : 'New CV'),
    updatedAt: new Date().toISOString(),
    design: getDefaultCvDesign(),
    data: getDefaultCvData()
  }

  cvList.value.push(newCv)
  activeCvId.value = newCv.id
  mobileView.value = 'editor'
  currentTab.value = 'editor'
}

const handleDeleteCv = (id: string) => {
  const confirmMsg = appLang.value === 'es'
    ? '¿Estás seguro de que deseas eliminar permanentemente este CV?'
    : 'Are you sure you want to permanently delete this CV?'

  if (window.confirm(confirmMsg)) {
    cvList.value = cvList.value.filter(cv => cv.id !== id)
    if (activeCvId.value === id) {
      activeCvId.value = null
      currentTab.value = 'dashboard'
    }
  }
}

const handleCloneCv = (id: string) => {
  const original = cvList.value.find(cv => cv.id === id)
  if (!original) return

  const clone = cloneCvProject(original, appLang.value === 'es' ? '(Copia)' : '(Copy)')
  cvList.value.push(clone)
}

const handleImportCv = (imported: CvProject) => {
  const cleanImport = cloneCvProject(
    normalizeCv(imported), 
    appLang.value === 'es' ? '(Importado)' : '(Imported)'
  )
  cvList.value.push(cleanImport)
  activeCvId.value = cleanImport.id
  mobileView.value = 'editor'
  currentTab.value = 'editor'
}

const handleLoadDemo = () => {
  const demoCopy = cloneCvProject(mockCv, '')
  demoCopy.title = appLang.value === 'es' 
    ? 'Alex Mercer - Ingeniero Frontend Senior' 
    : 'Alex Mercer - Senior Frontend Engineer'

  cvList.value.push(demoCopy)
  activeCvId.value = demoCopy.id
  mobileView.value = 'editor'
  currentTab.value = 'editor'
}

const handleExportCvJson = () => {
  if (!activeCv.value) return
  exportCvAsJson(activeCv.value)
}
</script>

<template>
  <div class="app-container">
    <!-- Header (hidden in print mode due to stylesheet rules) -->
    <header class="app-header">
      <div class="logo">
        <Sparkles :size="24" style="color: var(--primary)" />
        <span>Veloce CV</span>
      </div>

      <div class="header-actions">
        <!-- Mobile Viewport Switcher (Editor vs Preview) -->
        <div v-if="currentTab === 'editor'" class="mobile-toggle-group">
          <button 
            class="btn-toggle" 
            :class="{ active: mobileView === 'editor' }"
            @click="mobileView = 'editor'"
            :aria-label="appLang === 'es' ? 'Ver Editor' : 'View Editor'"
          >
            <Edit3 :size="14" />
            <span>{{ appLang === 'es' ? 'Editor' : 'Editor' }}</span>
          </button>
          <button 
            class="btn-toggle" 
            :class="{ active: mobileView === 'preview' }"
            @click="mobileView = 'preview'"
            :aria-label="appLang === 'es' ? 'Ver Vista Previa' : 'View Preview'"
          >
            <Eye :size="14" />
            <span>{{ appLang === 'es' ? 'Vista' : 'Preview' }}</span>
          </button>
        </div>

        <!-- Sleek Language Switcher Capsule -->
        <div class="lang-switch-capsule">
          <button 
            class="lang-btn"
            :class="{ active: appLang === 'es' }"
            @click="appLang = 'es'"
            aria-label="Español"
          >
            ES
          </button>
          <button 
            class="lang-btn"
            :class="{ active: appLang === 'en' }"
            @click="appLang = 'en'"
            aria-label="English"
          >
            EN
          </button>
        </div>

        <!-- Return to Dashboard if currently in Builder view -->
        <button 
          v-if="currentTab === 'editor'" 
          class="btn btn-secondary"
          @click="currentTab = 'dashboard'"
        >
          <LayoutDashboard :size="16" /> 
          <span class="desktop-text">{{ appLang === 'es' ? 'Volver al Panel' : 'Dashboard' }}</span>
        </button>

        <!-- Light/Dark Mode Switcher -->
        <button 
          class="btn btn-icon" 
          @click="toggleTheme" 
          :aria-label="darkMode ? (appLang === 'es' ? 'Modo Claro' : 'Switch to Light Mode') : (appLang === 'es' ? 'Modo Oscuro' : 'Switch to Dark Mode')"
          :title="darkMode ? (appLang === 'es' ? 'Modo Claro' : 'Switch to Light Mode') : (appLang === 'es' ? 'Modo Oscuro' : 'Switch to Dark Mode')"
        >
          <Sun v-if="darkMode" :size="18" style="color: #f59e0b" />
          <Moon v-else :size="18" style="color: #6366f1" />
        </button>
      </div>
    </header>

    <!-- Page Body Switching -->
    <main style="flex: 1; display: flex; flex-direction: column;">
      <CvDashboard 
        v-if="currentTab === 'dashboard'"
        :cv-list="cvList"
        :lang="appLang"
        @select="handleSelectCv"
        @create="handleCreateCv"
        @delete="handleDeleteCv"
        @clone="handleCloneCv"
        @import="handleImportCv"
        @load-demo="handleLoadDemo"
      />
      
      <!-- Interactive Split Screen Editor & Preview Panel -->
      <div 
        v-else-if="currentTab === 'editor' && activeCv" 
        class="builder-layout"
        :class="'mobile-show-' + mobileView"
      >
        <CvEditor v-model:cv="activeCv" :lang="appLang" />
        <CvPreview 
          :cv="activeCv" 
          :lang="appLang"
          @back="currentTab = 'dashboard'" 
          @export="handleExportCvJson"
        />
      </div>
    </main>
  </div>
</template>
