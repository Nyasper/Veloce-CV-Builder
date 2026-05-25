<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CvProject } from '../types'
import { 
  Plus, 
  Upload, 
  Trash2, 
  Copy, 
  Edit3, 
  Clock, 
  FileText,
  AlertCircle
} from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  cvList: CvProject[]
  lang?: 'en' | 'es'
}>(), {
  lang: 'en'
})

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'create', title: string): void
  (e: 'delete', id: string): void
  (e: 'clone', id: string): void
  (e: 'import', data: CvProject): void
  (e: 'load-demo'): void
}>()

const showCreateModal = ref(false)
const newCvTitle = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const importError = ref('')

// Bilingual Dictionary
const t = computed(() => {
  if (props.lang === 'es') {
    return {
      heroTitle: 'Diseña tu Trayectoria Profesional',
      heroSubtitle: 'Crea, personaliza y mantén CVs hermosos y de alta fidelidad. Expórtalos al instante a PDFs A4 listos para imprimir o a copias de seguridad portátiles en JSON.',
      btnCreate: 'Crear Nuevo CV',
      btnImport: 'Importar Respaldo JSON',
      errorInvalid: 'Formato de archivo CV no válido. Por favor verifique la estructura JSON.',
      errorParse: 'No se pudo analizar el archivo JSON.',
      portfolioTitle: 'Tu Portafolio de CVs',
      badgeTemplate: 'Plantilla',
      badgeExperiences: 'Exp. Laboral',
      badgeEducations: 'Estudios',
      btnEdit: 'Editar',
      btnClone: 'Duplicar',
      emptyTitle: 'No se encontraron CVs',
      emptySubtitle: 'Comienza creando un CV desde cero o carga nuestra plantilla profesional predefinida.',
      emptyBtnBlank: 'Crear CV en Blanco',
      emptyBtnDemo: '⚡ Cargar Demo Profesional',
      modalTitle: 'Crear Nuevo Borrador de CV',
      modalLabel: 'Título del CV / Nombre del Perfil',
      modalPlaceholder: 'ej. CV Desarrollador Frontend, Ejecutivo de Marketing...',
      modalCancel: 'Cancelar',
      modalConfirm: 'Crear CV',
      updated: 'Actualizado'
    }
  } else {
    return {
      heroTitle: 'Design Your Professional Journey',
      heroSubtitle: 'Create, customize, and maintain beautiful, high-fidelity CVs. Export them instantly to print-perfect A4 PDFs or portable JSON backups.',
      btnCreate: 'Create New CV',
      btnImport: 'Import JSON Backup',
      errorInvalid: 'Invalid CV file format. Please check the JSON structure.',
      errorParse: 'Failed to parse JSON file.',
      portfolioTitle: 'Your CV Portfolio',
      badgeTemplate: 'Template',
      badgeExperiences: 'Experience',
      badgeEducations: 'Education',
      btnEdit: 'Edit',
      btnClone: 'Clone',
      emptyTitle: 'No CVs Found',
      emptySubtitle: 'Get started by creating a brand-new blank CV, or load our prefilled high-fidelity template.',
      emptyBtnBlank: 'Create Blank CV',
      emptyBtnDemo: '⚡ Load Professional Demo',
      modalTitle: 'Create New CV Draft',
      modalLabel: 'CV Title / Profile Name',
      modalPlaceholder: 'e.g. Frontend Dev CV, Marketing Executive...',
      modalCancel: 'Cancel',
      modalConfirm: 'Create CV',
      updated: 'Updated'
    }
  }
})

const handleCreate = () => {
  if (!newCvTitle.value.trim()) return
  emit('create', newCvTitle.value.trim())
  newCvTitle.value = ''
  showCreateModal.value = false
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleJsonImport = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target?.result as string) as CvProject
      // Simple validation
      if (parsed && parsed.id && parsed.data && parsed.design) {
        emit('import', parsed)
        importError.value = ''
      } else {
        importError.value = t.value.errorInvalid
      }
    } catch (err) {
      importError.value = t.value.errorParse
    }
  }
  reader.readAsText(file)
  // reset file input
  target.value = ''
}

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString(props.lang === 'es' ? 'es-ES' : 'en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (e) {
    return dateStr
  }
}
</script>

<template>
  <div class="dashboard-container">
    <!-- Hero Header section -->
    <div class="dashboard-hero">
      <h1>{{ t.heroTitle }}</h1>
      <p>{{ t.heroSubtitle }}</p>
      
      <div class="dashboard-actions">
        <button class="btn btn-primary" @click="showCreateModal = true">
          <Plus :size="18" /> {{ t.btnCreate }}
        </button>
        <button class="btn btn-secondary" @click="triggerFileInput">
          <Upload :size="18" /> {{ t.btnImport }}
        </button>
        <button class="btn btn-secondary" style="border-color: var(--primary); color: var(--primary);" @click="emit('load-demo')">
          {{ t.emptyBtnDemo }}
        </button>
        <input 
          type="file" 
          ref="fileInput" 
          style="display: none" 
          accept=".json" 
          @change="handleJsonImport" 
        />
      </div>

      <!-- JSON Import Error message -->
      <div v-if="importError" style="margin-top: 1rem; color: #ef4444; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.9rem;">
        <AlertCircle :size="16" /> {{ importError }}
      </div>
    </div>

    <!-- CV Projects Section -->
    <h2 class="dashboard-section-title">
      <FileText :size="22" style="color: var(--primary)" /> {{ t.portfolioTitle }}
    </h2>

    <!-- Grid List -->
    <div v-if="cvList.length > 0" class="cv-grid">
      <div 
        v-for="cv in cvList" 
        :key="cv.id" 
        class="cv-card"
        :style="{'--primary-hue': cv.design.themeColor}"
      >
        <div class="cv-card-info">
          <h3>{{ cv.title }}</h3>
          
          <div class="cv-card-meta">
            <Clock :size="14" /> {{ t.updated }}: {{ formatDate(cv.updatedAt) }}
          </div>

          <div class="cv-card-preview-details">
            <span class="badge">{{ t.badgeTemplate }}: {{ cv.design.template }}</span>
            <span class="badge" style="background: rgba(0,0,0,0.05); color: var(--text-muted);">
              {{ cv.data.experience.length }} {{ t.badgeExperiences }}
            </span>
            <span class="badge" style="background: rgba(0,0,0,0.05); color: var(--text-muted);">
              {{ cv.data.education.length }} {{ t.badgeEducations }}
            </span>
          </div>
        </div>

        <div class="cv-card-actions">
          <div class="cv-card-actions-left">
            <button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" @click="emit('select', cv.id)">
              <Edit3 :size="14" /> {{ t.btnEdit }}
            </button>
            <button class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" :title="t.btnClone" @click="emit('clone', cv.id)">
              <Copy :size="14" /> {{ t.btnClone }}
            </button>
          </div>
          <button class="btn btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; background: transparent; border: 1px solid var(--border); color: #ef4444;" :title="props.lang === 'es' ? 'Eliminar CV' : 'Delete CV'" @click="emit('delete', cv.id)">
            <Trash2 :size="14" />
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else style="text-align: center; padding: 4rem 2rem; border: 2px dashed var(--border); border-radius: var(--radius-lg); background: var(--bg-panel);">
      <FileText :size="48" style="margin-bottom: 1rem; color: var(--text-muted); opacity: 0.6;" />
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">{{ t.emptyTitle }}</h3>
      <p style="color: var(--text-muted); max-width: 400px; margin: 0 auto 1.5rem; font-size: 0.95rem;">
        {{ t.emptySubtitle }}
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem;">
        <button class="btn btn-primary" @click="showCreateModal = true">
          <Plus :size="18" /> {{ t.emptyBtnBlank }}
        </button>
        <button class="btn btn-secondary" @click="emit('load-demo')">
          {{ t.emptyBtnDemo }}
        </button>
      </div>
    </div>

    <!-- Create New CV Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click.self="showCreateModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ t.modalTitle }}</h3>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">{{ t.modalLabel }}</label>
            <input 
              type="text" 
              class="form-input" 
              :placeholder="t.modalPlaceholder" 
              v-model="newCvTitle"
              @keyup.enter="handleCreate"
              autoFocus
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showCreateModal = false">{{ t.modalCancel }}</button>
          <button class="btn btn-primary" :disabled="!newCvTitle.trim()" @click="handleCreate">{{ t.modalConfirm }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
