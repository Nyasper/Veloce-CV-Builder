<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { CvProject, CvData } from './types'
import { mockCv } from './mockData'
import CvDashboard from './components/CvDashboard.vue'
import CvEditor from './components/CvEditor.vue'
import CvPreview from './components/CvPreview.vue'
import { Sparkles, Sun, Moon, LayoutDashboard } from 'lucide-vue-next'

const LOCAL_STORAGE_KEY = 'cv_portfolio_builder_cvs'
const THEME_STORAGE_KEY = 'cv_builder_dark_mode'

// Global Reactive States
const cvList = ref<CvProject[]>([])
const activeCvId = ref<string | null>(null)
const currentTab = ref<'dashboard' | 'editor'>('dashboard')
const darkMode = ref<boolean>(false)

// Computed active CV
const activeCv = computed(() => {
  if (!activeCvId.value) return null
  return cvList.value.find(cv => cv.id === activeCvId.value) || null
})

// Initialize Application State on Mount
onMounted(() => {
  // Load Dark Mode
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'true') {
    darkMode.value = true
    document.body.classList.add('dark-mode')
  }

  // Load CV List
  const savedCvs = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (savedCvs) {
    try {
      cvList.value = JSON.parse(savedCvs)
    } catch (e) {
      console.error('Failed to parse saved CVs', e)
      cvList.value = []
    }
  } else {
    // On first load, preload the beautiful mock CV so the user isn't greeted with an empty screen
    cvList.value = [JSON.parse(JSON.stringify(mockCv))]
    saveToStorage()
  }
})

// Deep watch cvList to auto-save instantly
watch(cvList, () => {
  saveToStorage()
}, { deep: true })

const saveToStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cvList.value))
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
  currentTab.value = 'editor'
}

const handleCreateCv = (title: string) => {
  const newId = Math.random().toString(36).substring(2, 9)
  
  const defaultCvData: CvData = {
    personalInfo: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      github: '',
      linkedin: '',
      summary: '',
      avatarUrl: ''
    },
    education: [],
    experience: [],
    projects: [],
    skills: [],
    customSections: []
  }

  const newCv: CvProject = {
    id: newId,
    title,
    updatedAt: new Date().toISOString(),
    design: {
      template: 'developer',
      themeColor: '250', // Beautiful default Indigo
      fontFamily: 'outfit',
      spacing: 'normal',
      showA4Guidelines: true
    },
    data: defaultCvData
  }

  cvList.value.push(newCv)
  activeCvId.value = newId
  currentTab.value = 'editor'
}

const handleDeleteCv = (id: string) => {
  if (confirm('Are you sure you want to permanently delete this CV?')) {
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

  // Deep clone
  const clone: CvProject = JSON.parse(JSON.stringify(original))
  clone.id = Math.random().toString(36).substring(2, 9)
  clone.title = `${clone.title} (Copy)`
  clone.updatedAt = new Date().toISOString()

  cvList.value.push(clone)
}

const handleImportCv = (imported: CvProject) => {
  // Ensure new unique ID to avoid collisions
  const cleanImport: CvProject = JSON.parse(JSON.stringify(imported))
  cleanImport.id = Math.random().toString(36).substring(2, 9)
  cleanImport.title = `${cleanImport.title} (Imported)`
  cleanImport.updatedAt = new Date().toISOString()
  
  cvList.value.push(cleanImport)
  activeCvId.value = cleanImport.id
  currentTab.value = 'editor'
}

const handleLoadDemo = () => {
  const demoCopy: CvProject = JSON.parse(JSON.stringify(mockCv))
  demoCopy.id = Math.random().toString(36).substring(2, 9)
  demoCopy.title = `Demo: ${demoCopy.title}`
  demoCopy.updatedAt = new Date().toISOString()

  cvList.value.push(demoCopy)
  activeCvId.value = demoCopy.id
  currentTab.value = 'editor'
}

const handleExportCvJson = () => {
  if (!activeCv.value) return
  
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(activeCv.value, null, 2)
  )}`
  
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute('href', jsonString)
  downloadAnchor.setAttribute(
    'download', 
    `${activeCv.value.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_backup.json`
  )
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
}
</script>

<template>
  <div class="app-container">
    <!-- Header (hidden in print mode due to stylesheet rules) -->
    <header class="app-header">
      <div class="logo">
        <Sparkles :size="24" style="color: var(--primary)" />
        <span>Veloce CV Builder</span>
      </div>

      <div class="header-actions">
        <!-- Return to Dashboard if currently in Builder view -->
        <button 
          v-if="currentTab === 'editor'" 
          class="btn btn-secondary"
          @click="currentTab = 'dashboard'"
        >
          <LayoutDashboard :size="16" /> Back to Dashboard
        </button>

        <!-- Light/Dark Mode Switcher -->
        <button 
          class="btn btn-icon" 
          @click="toggleTheme" 
          :title="darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
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
        @select="handleSelectCv"
        @create="handleCreateCv"
        @delete="handleDeleteCv"
        @clone="handleCloneCv"
        @import="handleImportCv"
        @load-demo="handleLoadDemo"
      />
      
      <!-- Interactive Split Screen Editor & Preview Panel -->
      <div v-else-if="currentTab === 'editor' && activeCv" class="builder-layout">
        <CvEditor :cv="activeCv" />
        <CvPreview 
          :cv="activeCv" 
          @back="currentTab = 'dashboard'" 
          @export="handleExportCvJson"
        />
      </div>
    </main>
  </div>
</template>
