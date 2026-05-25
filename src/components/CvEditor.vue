<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CvProject, Experience, Education, Project, Skill, CustomSection, CustomSectionItem } from '../types'
import {
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Cpu,
  BookmarkPlus,
  Palette,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Settings,
  Sparkles,
  ArrowUp,
  ArrowDown
} from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  cv: CvProject
  lang?: 'en' | 'es'
}>(), {
  lang: 'en'
})

const activeSection = ref<string>('personal')
const activeTab = ref<'content' | 'design'>('content')

const toggleSection = (section: string) => {
  if (activeSection.value === section) {
    activeSection.value = ''
  } else {
    activeSection.value = section
  }
}

// Expander state for items inside lists
const expandedItems = ref<Record<string, boolean>>({})

const toggleItemExpansion = (itemId: string) => {
  expandedItems.value[itemId] = !expandedItems.value[itemId]
}

// Reordering helper function: swaps items in place
const moveItem = (array: any[], index: number, direction: 'up' | 'down') => {
  const newIndex = direction === 'up' ? index - 1 : index + 1
  if (newIndex < 0 || newIndex >= array.length) return
  
  // Swap elements
  const temp = array[index]
  array[index] = array[newIndex]
  array[newIndex] = temp
  props.cv.updatedAt = new Date().toISOString()
}

// Helpers to add list items
const generateId = () => Math.random().toString(36).substring(2, 9)

const addExperience = () => {
  const newExp: Experience = {
    id: generateId(),
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  }
  props.cv.data.experience.push(newExp)
  props.cv.updatedAt = new Date().toISOString()
  expandedItems.value[newExp.id] = true
}

const removeExperience = (index: number) => {
  props.cv.data.experience.splice(index, 1)
  props.cv.updatedAt = new Date().toISOString()
}

const addEducation = () => {
  const newEdu: Education = {
    id: generateId(),
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  }
  props.cv.data.education.push(newEdu)
  props.cv.updatedAt = new Date().toISOString()
  expandedItems.value[newEdu.id] = true
}

const removeEducation = (index: number) => {
  props.cv.data.education.splice(index, 1)
  props.cv.updatedAt = new Date().toISOString()
}

const addProject = () => {
  const newProj: Project = {
    id: generateId(),
    name: '',
    description: '',
    techStack: '',
    link: ''
  }
  props.cv.data.projects.push(newProj)
  props.cv.updatedAt = new Date().toISOString()
  expandedItems.value[newProj.id] = true
}

const removeProject = (index: number) => {
  props.cv.data.projects.splice(index, 1)
  props.cv.updatedAt = new Date().toISOString()
}

const addSkill = () => {
  const newSkill: Skill = {
    id: generateId(),
    name: '',
    level: '',
    category: props.lang === 'es' ? 'Habilidades' : 'Skills'
  }
  props.cv.data.skills.push(newSkill)
  props.cv.updatedAt = new Date().toISOString()
}

const removeSkill = (index: number) => {
  props.cv.data.skills.splice(index, 1)
  props.cv.updatedAt = new Date().toISOString()
}

const addCustomSection = () => {
  const sectionId = generateId()
  const newSection: CustomSection = {
    id: sectionId,
    title: props.lang === 'es' ? 'Nueva Sección' : 'New Section',
    items: []
  }
  props.cv.data.customSections.push(newSection)
  props.cv.updatedAt = new Date().toISOString()
  activeSection.value = `custom-${sectionId}`
}

const removeCustomSection = (index: number) => {
  props.cv.data.customSections.splice(index, 1)
  props.cv.updatedAt = new Date().toISOString()
}

const addCustomSectionItem = (section: CustomSection) => {
  const newItem: CustomSectionItem = {
    id: generateId(),
    title: '',
    subtitle: '',
    description: ''
  }
  section.items.push(newItem)
  props.cv.updatedAt = new Date().toISOString()
  expandedItems.value[newItem.id] = true
}

const removeCustomSectionItem = (section: CustomSection, index: number) => {
  section.items.splice(index, 1)
  props.cv.updatedAt = new Date().toISOString()
}

// Predefined HSL color swatches
const themeSwatches = [
  { name: 'Indigo', hue: '250', color: '#6366f1' },
  { name: 'Emerald', hue: '142', color: '#10b981' },
  { name: 'Violet', hue: '263', color: '#8b5cf6' },
  { name: 'Amber', hue: '38', color: '#f59e0b' },
  { name: 'Rose', hue: '350', color: '#f43f5e' },
  { name: 'Teal', hue: '180', color: '#14b8a6' },
  { name: 'Blue', hue: '217', color: '#3b82f6' },
  { name: 'Slate', hue: '215', color: '#64748b' }
]

const updateTimestamp = () => {
  props.cv.updatedAt = new Date().toISOString()
}

// Bilingual UI Dictionary
const t = computed(() => {
  if (props.lang === 'es') {
    return {
      tabContent: 'Contenido del CV',
      tabDesign: 'Estilos y Temas',
      sectLayout: 'Diseño de Plantilla',
      sectLayoutTitle: 'Escoge la plantilla del CV',
      optDev: 'Desarrollador Moderno (Badges en Sidebar)',
      optExec: 'Ejecutivo Elegante (Serif Centrado)',
      optCreat: 'Creador Minimalista (Banner Asimétrico)',
      sectFonts: 'Tipografía y Fuentes',
      fontOutfitDesc: 'Sensación moderna y tecnológica',
      fontInterDesc: 'Sans geométrica, limpia y premium',
      fontPlayfairDesc: 'Serif tradicional, gran autoridad',
      sectColors: 'Colores de la Paleta',
      accentHue: 'Color de Acento',
      spacing: 'Espaciado del Documento',
      spacingComp: 'Densidad Compacta',
      spacingNorm: 'Equilibrado (Normal)',
      spacingRel: 'Espaciado Relajado',
      showA4: 'Mostrar Guía A4',
      
      // Form Sections
      personalInfo: 'Información Personal',
      fullName: 'Nombre Completo',
      jobTitle: 'Título Profesional',
      avatarUrl: 'URL de Imagen de Perfil',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      location: 'Ubicación / Ciudad',
      website: 'Sitio Web Personal',
      github: 'Enlace GitHub',
      linkedin: 'Enlace LinkedIn',
      summary: 'Resumen Profesional',
      summaryPlaceholder: 'Breve resumen de tus logros profesionales...',
      
      workExp: 'Experiencia Laboral',
      expCardTitle: 'Puesto',
      expCardSub: 'Empresa',
      company: 'Empresa',
      locationLabel: 'Ubicación',
      currentJob: 'Trabajo Actual',
      startDate: 'Fecha Inicio (AAAA-MM)',
      endDate: 'Fecha Fin (AAAA-MM)',
      descLabel: 'Responsabilidades y Logros',
      btnAddExp: 'Añadir Bloque de Experiencia',
      
      education: 'Educación',
      eduDegree: 'Título / Grado',
      eduSchool: 'Escuela / Institución',
      eduField: 'Campo de Estudio',
      inProgress: 'En Curso',
      eduDetail: 'Detalles adicionales / honores',
      btnAddEdu: 'Añadir Bloque de Educación',
      
      projects: 'Proyectos Personales',
      projName: 'Nombre del Proyecto',
      projUrl: 'Enlace del Proyecto',
      projTech: 'Tecnologías Utilizadas',
      projDesc: 'Descripción del Proyecto',
      btnAddProj: 'Añadir Bloque de Proyecto',
      
      skills: 'Habilidades Clave',
      skillName: 'Nombre de Habilidad',
      skillLevel: 'Nivel',
      skillCat: 'Categoría',
      skillLevelOpt: {
        none: 'Sin Nivel',
        expert: 'Experto',
        inter: 'Intermedio',
        beg: 'Principiante',
        fluent: 'Fluido',
        native: 'Nativo'
      },
      btnAddSkill: 'Añadir Habilidad',
      
      customSect: 'Sección Personalizada',
      customItem: 'Elemento',
      btnAddCustom: 'Añadir Sección (ej. Idiomas, Cursos)',
      btnAddItemCustom: 'Añadir Elemento a la Sección',
      customTitle: 'Título de la Sección',
      customLabel: 'Título del Elemento',
      customSubtitle: 'Subtítulo del Elemento',
      customDesc: 'Descripción breve'
    }
  } else {
    return {
      tabContent: 'CV Content',
      tabDesign: 'Styles & Themes',
      sectLayout: 'Resume Template Layout',
      sectLayoutTitle: 'Template Layout Choice',
      optDev: 'Modern Developer (Sidebar Badges)',
      optExec: 'Elegant Executive (Centered Serif)',
      optCreat: 'Minimalist Creative (Asymmetric Banner)',
      sectFonts: 'Typography & Fonts',
      fontOutfitDesc: 'Modern, high tech feel',
      fontInterDesc: 'Clean, geometric, premium sans',
      fontPlayfairDesc: 'Traditional, serif, high authority',
      sectColors: 'Palette Colors',
      accentHue: 'Theme Hue Accent',
      spacing: 'Document Spacing',
      spacingComp: 'Compact Density',
      spacingNorm: 'Balanced (Normal)',
      spacingRel: 'Relaxed Spacious',
      showA4: 'Show A4 Guide',
      
      // Form Sections
      personalInfo: 'Personal Information',
      fullName: 'Full Name',
      jobTitle: 'Job Title',
      avatarUrl: 'Profile Image URL',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      website: 'Personal Website',
      github: 'GitHub Link',
      linkedin: 'LinkedIn Link',
      summary: 'Professional Summary',
      summaryPlaceholder: 'Brief summary of your career accomplishments...',
      
      workExp: 'Work Experience',
      expCardTitle: 'Position',
      expCardSub: 'Company',
      company: 'Company',
      locationLabel: 'Location',
      currentJob: 'Current Job',
      startDate: 'Start Date (YYYY-MM)',
      endDate: 'End Date (YYYY-MM)',
      descLabel: 'Responsibilities & Achievements',
      btnAddExp: 'Add Experience Block',
      
      education: 'Education',
      eduDegree: 'Degree',
      eduSchool: 'School / Institution',
      eduField: 'Field of Study',
      inProgress: 'In Progress',
      eduDetail: 'Additional details / honors',
      btnAddEdu: 'Add Education Block',
      
      projects: 'Personal Projects',
      projName: 'Project Name',
      projUrl: 'Project URL / Link',
      projTech: 'Technologies Used',
      projDesc: 'Project Description',
      btnAddProj: 'Add Project Block',
      
      skills: 'Core Skills',
      skillName: 'Skill Name',
      skillLevel: 'Level',
      skillCat: 'Category',
      skillLevelOpt: {
        none: 'No Level',
        expert: 'Expert',
        inter: 'Intermediate',
        beg: 'Beginner',
        fluent: 'Fluent',
        native: 'Native'
      },
      btnAddSkill: 'Add Skill',
      
      customSect: 'Custom Section',
      customItem: 'Item',
      btnAddCustom: 'Add Custom Section (e.g. Languages)',
      btnAddItemCustom: 'Add Item to Section',
      customTitle: 'Section Title',
      customLabel: 'Item Title',
      customSubtitle: 'Item Subtitle',
      customDesc: 'Brief Description'
    }
  }
})
</script>

<template>
  <div class="editor-sidebar">
    <!-- Sub-tab headers -->
    <div class="editor-tabs">
      <button 
        class="editor-tab-btn" 
        :class="{ active: activeTab === 'content' }"
        @click="activeTab = 'content'"
      >
        <Sparkles :size="16" /> {{ t.tabContent }}
      </button>
      <button 
        class="editor-tab-btn" 
        :class="{ active: activeTab === 'design' }"
        @click="activeTab = 'design'"
      >
        <Palette :size="16" /> {{ t.tabDesign }}
      </button>
    </div>

    <!-- Scrollable Panel Content -->
    <div class="editor-scroll-pane">
      
      <!-- DESIGN TAB -->
      <div v-if="activeTab === 'design'" class="design-grid">
        <!-- Layout Selection -->
        <div class="editor-section-card active-section">
          <div class="editor-section-header">
            <span class="editor-section-title"><Settings :size="18" /> {{ t.sectLayout }}</span>
          </div>
          <div class="editor-section-content">
            <div class="form-group">
              <label class="form-label">{{ t.sectLayoutTitle }}</label>
              <select class="form-select" v-model="cv.design.template" @change="updateTimestamp">
                <option value="developer">{{ t.optDev }}</option>
                <option value="executive">{{ t.optExec }}</option>
                <option value="creative">{{ t.optCreat }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Typography selector -->
        <div class="editor-section-card active-section">
          <div class="editor-section-header">
            <span class="editor-section-title"><Palette :size="18" /> {{ t.sectFonts }}</span>
          </div>
          <div class="editor-section-content">
            <div class="form-group" style="gap: 0.75rem;">
              <div 
                class="font-option font-outfit" 
                :class="{ active: cv.design.fontFamily === 'outfit' }"
                @click="cv.design.fontFamily = 'outfit'; updateTimestamp()"
              >
                <div>
                  <strong>Outfit</strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted)">{{ t.fontOutfitDesc }}</div>
                </div>
                <span style="font-size: 1.25rem;">Aa</span>
              </div>
              <div 
                class="font-option font-inter" 
                :class="{ active: cv.design.fontFamily === 'inter' }"
                @click="cv.design.fontFamily = 'inter'; updateTimestamp()"
              >
                <div>
                  <strong>Inter</strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted)">{{ t.fontInterDesc }}</div>
                </div>
                <span style="font-size: 1.25rem;">Aa</span>
              </div>
              <div 
                class="font-option font-playfair" 
                :class="{ active: cv.design.fontFamily === 'playfair' }"
                @click="cv.design.fontFamily = 'playfair'; updateTimestamp()"
              >
                <div>
                  <strong>Playfair Display</strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted)">{{ t.fontPlayfairDesc }}</div>
                </div>
                <span style="font-size: 1.25rem; font-family: 'Playfair Display', serif;">Aa</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Accent Colors -->
        <div class="editor-section-card active-section">
          <div class="editor-section-header">
            <span class="editor-section-title"><Palette :size="18" /> {{ t.sectColors }}</span>
          </div>
          <div class="editor-section-content">
            <div class="form-group">
              <label class="form-label">{{ t.accentHue }}</label>
              <div class="color-picker-group">
                <div 
                  v-for="swatch in themeSwatches" 
                  :key="swatch.hue" 
                  class="color-swatch"
                  :style="{ backgroundColor: swatch.color }"
                  :class="{ active: cv.design.themeColor === swatch.hue }"
                  :title="swatch.name"
                  @click="cv.design.themeColor = swatch.hue; updateTimestamp()"
                />
              </div>
            </div>
            
            <div class="form-group-row" style="margin-top: 0.5rem;">
              <div class="form-group">
                <label class="form-label">{{ t.spacing }}</label>
                <select class="form-select" v-model="cv.design.spacing" @change="updateTimestamp">
                  <option value="compact">{{ t.spacingComp }}</option>
                  <option value="normal">{{ t.spacingNorm }}</option>
                  <option value="relaxed">{{ t.spacingRel }}</option>
                </select>
              </div>
              <div class="form-group" style="justify-content: flex-end;">
                <label class="form-label" style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; margin-top: auto; margin-bottom: 0.65rem;">
                  <input type="checkbox" v-model="cv.design.showA4Guidelines" />
                  {{ t.showA4 }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CONTENT TAB -->
      <div v-else class="design-grid">
        
        <!-- Personal Information Section -->
        <div class="editor-section-card" :class="{ 'active-section': activeSection === 'personal' }">
          <div class="editor-section-header" @click="toggleSection('personal')">
            <span class="editor-section-title"><User :size="18" /> {{ t.personalInfo }}</span>
            <ChevronDown v-if="activeSection !== 'personal'" :size="16" />
            <ChevronUp v-else :size="16" />
          </div>
          <div v-if="activeSection === 'personal'" class="editor-section-content">
            <div class="form-group">
              <label class="form-label">{{ t.fullName }}</label>
              <input type="text" class="form-input" v-model="cv.data.personalInfo.fullName" @input="updateTimestamp" placeholder="Jane Doe" />
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label class="form-label">{{ t.jobTitle }}</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.title" @input="updateTimestamp" placeholder="Senior Product Manager" />
              </div>
              <div class="form-group">
                <label class="form-label">{{ t.avatarUrl }}</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.avatarUrl" @input="updateTimestamp" placeholder="https://unsplash.com/..." />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label class="form-label">{{ t.email }}</label>
                <input type="email" class="form-input" v-model="cv.data.personalInfo.email" @input="updateTimestamp" placeholder="jane@example.com" />
              </div>
              <div class="form-group">
                <label class="form-label">{{ t.phone }}</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.phone" @input="updateTimestamp" placeholder="+1 (555) 123-4567" />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label class="form-label">{{ t.location }}</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.location" @input="updateTimestamp" placeholder="Austin, TX" />
              </div>
              <div class="form-group">
                <label class="form-label">{{ t.website }}</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.website" @input="updateTimestamp" placeholder="janedoe.com" />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label class="form-label">{{ t.github }}</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.github" @input="updateTimestamp" placeholder="github.com/jane" />
              </div>
              <div class="form-group">
                <label class="form-label">{{ t.linkedin }}</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.linkedin" @input="updateTimestamp" placeholder="linkedin.com/in/jane" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">{{ t.summary }}</label>
              <textarea class="form-textarea" v-model="cv.data.personalInfo.summary" @input="updateTimestamp" :placeholder="t.summaryPlaceholder"></textarea>
            </div>
          </div>
        </div>

        <!-- Work Experience Section -->
        <div class="editor-section-card" :class="{ 'active-section': activeSection === 'experience' }">
          <div class="editor-section-header" @click="toggleSection('experience')">
            <span class="editor-section-title"><Briefcase :size="18" /> {{ t.workExp }} ({{ cv.data.experience.length }})</span>
            <ChevronDown v-if="activeSection !== 'experience'" :size="16" />
            <ChevronUp v-else :size="16" />
          </div>
          <div v-if="activeSection === 'experience'" class="editor-section-content">
            <transition-group name="list" tag="div">
              <div v-for="(exp, index) in cv.data.experience" :key="exp.id" class="list-item-card">
                <div class="list-item-header" @click="toggleItemExpansion(exp.id)">
                  <div class="list-item-header-info" style="max-width: 60%">
                    <span class="list-item-title">{{ exp.position || t.expCardTitle }}</span>
                    <span class="list-item-subtitle">{{ exp.company || t.expCardSub }} {{ exp.startDate ? `(${exp.startDate})` : '' }}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 2px;">
                    <!-- Move Up Button -->
                    <button 
                      class="btn-icon" 
                      style="width: 28px; height: 28px; border: none; background: transparent; color: var(--text-muted);" 
                      :disabled="index === 0"
                      :title="props.lang === 'es' ? 'Mover Arriba' : 'Move Up'" 
                      @click.stop="moveItem(cv.data.experience, index, 'up')"
                    >
                      <ArrowUp :size="14" />
                    </button>
                    <!-- Move Down Button -->
                    <button 
                      class="btn-icon" 
                      style="width: 28px; height: 28px; border: none; background: transparent; color: var(--text-muted);" 
                      :disabled="index === cv.data.experience.length - 1"
                      :title="props.lang === 'es' ? 'Mover Abajo' : 'Move Down'" 
                      @click.stop="moveItem(cv.data.experience, index, 'down')"
                    >
                      <ArrowDown :size="14" />
                    </button>
                    <!-- Delete Button -->
                    <button class="btn-icon" style="width: 28px; height: 28px; border: none; background: transparent; color: #ef4444;" title="Delete" @click.stop="removeExperience(index)">
                      <Trash2 :size="14" />
                    </button>
                    <ChevronDown v-if="!expandedItems[exp.id]" :size="14" style="margin-left: 0.25rem;" />
                    <ChevronUp v-else :size="14" style="margin-left: 0.25rem;" />
                  </div>
                </div>
                
                <div v-if="expandedItems[exp.id]" class="list-item-content">
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">{{ t.company }}</label>
                      <input type="text" class="form-input" v-model="exp.company" @input="updateTimestamp" placeholder="Google" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">{{ t.jobTitle }}</label>
                      <input type="text" class="form-input" v-model="exp.position" @input="updateTimestamp" placeholder="Software Engineer" />
                    </div>
                  </div>
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">{{ t.locationLabel }}</label>
                      <input type="text" class="form-input" v-model="exp.location" @input="updateTimestamp" placeholder="Mountain View, CA" />
                    </div>
                    <div class="form-group" style="flex-direction: row; align-items: flex-end; gap: 0.5rem;">
                      <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; margin-bottom: 0.65rem; font-size: 0.85rem;">
                        <input type="checkbox" v-model="exp.current" @change="updateTimestamp" /> {{ t.currentJob }}
                      </label>
                    </div>
                  </div>
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">{{ t.startDate }}</label>
                      <input type="text" class="form-input" v-model="exp.startDate" @input="updateTimestamp" placeholder="YYYY-MM" />
                    </div>
                    <div class="form-group" v-if="!exp.current">
                      <label class="form-label">{{ t.endDate }}</label>
                      <input type="text" class="form-input" v-model="exp.endDate" @input="updateTimestamp" placeholder="YYYY-MM" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">{{ t.descLabel }}</label>
                    <textarea class="form-textarea" v-model="exp.description" @input="updateTimestamp" placeholder="Details..."></textarea>
                  </div>
                </div>
              </div>
            </transition-group>
            
            <button class="btn btn-secondary" style="width: 100%; border-style: dashed;" @click="addExperience">
              <Plus :size="16" /> {{ t.btnAddExp }}
            </button>
          </div>
        </div>

        <!-- Education Section -->
        <div class="editor-section-card" :class="{ 'active-section': activeSection === 'education' }">
          <div class="editor-section-header" @click="toggleSection('education')">
            <span class="editor-section-title"><GraduationCap :size="18" /> {{ t.education }} ({{ cv.data.education.length }})</span>
            <ChevronDown v-if="activeSection !== 'education'" :size="16" />
            <ChevronUp v-else :size="16" />
          </div>
          <div v-if="activeSection === 'education'" class="editor-section-content">
            <transition-group name="list" tag="div">
              <div v-for="(edu, index) in cv.data.education" :key="edu.id" class="list-item-card">
                <div class="list-item-header" @click="toggleItemExpansion(edu.id)">
                  <div class="list-item-header-info" style="max-width: 60%">
                    <span class="list-item-title">{{ edu.degree || t.eduDegree }} {{ edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : '' }}</span>
                    <span class="list-item-subtitle">{{ edu.institution || t.eduSchool }}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 2px;">
                    <!-- Move Up Button -->
                    <button 
                      class="btn-icon" 
                      style="width: 28px; height: 28px; border: none; background: transparent; color: var(--text-muted);" 
                      :disabled="index === 0"
                      :title="props.lang === 'es' ? 'Mover Arriba' : 'Move Up'" 
                      @click.stop="moveItem(cv.data.education, index, 'up')"
                    >
                      <ArrowUp :size="14" />
                    </button>
                    <!-- Move Down Button -->
                    <button 
                      class="btn-icon" 
                      style="width: 28px; height: 28px; border: none; background: transparent; color: var(--text-muted);" 
                      :disabled="index === cv.data.education.length - 1"
                      :title="props.lang === 'es' ? 'Mover Abajo' : 'Move Down'" 
                      @click.stop="moveItem(cv.data.education, index, 'down')"
                    >
                      <ArrowDown :size="14" />
                    </button>
                    <!-- Delete Button -->
                    <button class="btn-icon" style="width: 28px; height: 28px; border: none; background: transparent; color: #ef4444;" title="Delete" @click.stop="removeEducation(index)">
                      <Trash2 :size="14" />
                    </button>
                    <ChevronDown v-if="!expandedItems[edu.id]" :size="14" style="margin-left: 0.25rem;" />
                    <ChevronUp v-else :size="14" style="margin-left: 0.25rem;" />
                  </div>
                </div>
                
                <div v-if="expandedItems[edu.id]" class="list-item-content">
                  <div class="form-group">
                    <label class="form-label">{{ t.eduSchool }}</label>
                    <input type="text" class="form-input" v-model="edu.institution" @input="updateTimestamp" placeholder="Stanford University" />
                  </div>
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">{{ t.eduDegree }}</label>
                      <input type="text" class="form-input" v-model="edu.degree" @input="updateTimestamp" placeholder="Bachelor of Science" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">{{ t.eduField }}</label>
                      <input type="text" class="form-input" v-model="edu.fieldOfStudy" @input="updateTimestamp" placeholder="Computer Science" />
                    </div>
                  </div>
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">{{ t.startDate }}</label>
                      <input type="text" class="form-input" v-model="edu.startDate" @input="updateTimestamp" placeholder="YYYY-MM" />
                    </div>
                    <div class="form-group" style="display: flex; flex-direction: column;">
                      <label class="form-label" style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; margin-top: auto; margin-bottom: 0.65rem;">
                        <input type="checkbox" v-model="edu.current" @change="updateTimestamp" /> {{ t.inProgress }}
                      </label>
                    </div>
                  </div>
                  <div class="form-group-row" v-if="!edu.current">
                    <div class="form-group">
                      <label class="form-label">{{ t.endDate }}</label>
                      <input type="text" class="form-input" v-model="edu.endDate" @input="updateTimestamp" placeholder="YYYY-MM" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">{{ t.eduDetail }}</label>
                    <textarea class="form-textarea" v-model="edu.description" @input="updateTimestamp" placeholder="e.g. GPA 3.9..."></textarea>
                  </div>
                </div>
              </div>
            </transition-group>
            
            <button class="btn btn-secondary" style="width: 100%; border-style: dashed;" @click="addEducation">
              <Plus :size="16" /> {{ t.btnAddEdu }}
            </button>
          </div>
        </div>

        <!-- Projects Section -->
        <div class="editor-section-card" :class="{ 'active-section': activeSection === 'projects' }">
          <div class="editor-section-header" @click="toggleSection('projects')">
            <span class="editor-section-title"><FolderGit2 :size="18" /> {{ t.projects }} ({{ cv.data.projects.length }})</span>
            <ChevronDown v-if="activeSection !== 'projects'" :size="16" />
            <ChevronUp v-else :size="16" />
          </div>
          <div v-if="activeSection === 'projects'" class="editor-section-content">
            <transition-group name="list" tag="div">
              <div v-for="(proj, index) in cv.data.projects" :key="proj.id" class="list-item-card">
                <div class="list-item-header" @click="toggleItemExpansion(proj.id)">
                  <div class="list-item-header-info" style="max-width: 60%">
                    <span class="list-item-title">{{ proj.name || t.projName }}</span>
                    <span class="list-item-subtitle">{{ proj.link || 'No URL' }}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 2px;">
                    <!-- Move Up Button -->
                    <button 
                      class="btn-icon" 
                      style="width: 28px; height: 28px; border: none; background: transparent; color: var(--text-muted);" 
                      :disabled="index === 0"
                      :title="props.lang === 'es' ? 'Mover Arriba' : 'Move Up'" 
                      @click.stop="moveItem(cv.data.projects, index, 'up')"
                    >
                      <ArrowUp :size="14" />
                    </button>
                    <!-- Move Down Button -->
                    <button 
                      class="btn-icon" 
                      style="width: 28px; height: 28px; border: none; background: transparent; color: var(--text-muted);" 
                      :disabled="index === cv.data.projects.length - 1"
                      :title="props.lang === 'es' ? 'Mover Abajo' : 'Move Down'" 
                      @click.stop="moveItem(cv.data.projects, index, 'down')"
                    >
                      <ArrowDown :size="14" />
                    </button>
                    <!-- Delete Button -->
                    <button class="btn-icon" style="width: 28px; height: 28px; border: none; background: transparent; color: #ef4444;" title="Delete" @click.stop="removeProject(index)">
                      <Trash2 :size="14" />
                    </button>
                    <ChevronDown v-if="!expandedItems[proj.id]" :size="14" style="margin-left: 0.25rem;" />
                    <ChevronUp v-else :size="14" style="margin-left: 0.25rem;" />
                  </div>
                </div>
                
                <div v-if="expandedItems[proj.id]" class="list-item-content">
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">{{ t.projName }}</label>
                      <input type="text" class="form-input" v-model="proj.name" @input="updateTimestamp" placeholder="Aether Canvas" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">{{ t.projUrl }}</label>
                      <input type="text" class="form-input" v-model="proj.link" @input="updateTimestamp" placeholder="github.com/myproject" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">{{ t.projTech }}</label>
                    <input type="text" class="form-input" v-model="proj.techStack" @input="updateTimestamp" placeholder="Vue 3, TypeScript, CSS Variables" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">{{ t.projDesc }}</label>
                    <textarea class="form-textarea" v-model="proj.description" @input="updateTimestamp" placeholder="Describe project achievements..."></textarea>
                  </div>
                </div>
              </div>
            </transition-group>
            
            <button class="btn btn-secondary" style="width: 100%; border-style: dashed;" @click="addProject">
              <Plus :size="16" /> {{ t.btnAddProj }}
            </button>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="editor-section-card" :class="{ 'active-section': activeSection === 'skills' }">
          <div class="editor-section-header" @click="toggleSection('skills')">
            <span class="editor-section-title"><Cpu :size="18" /> {{ t.skills }} ({{ cv.data.skills.length }})</span>
            <ChevronDown v-if="activeSection !== 'skills'" :size="16" />
            <ChevronUp v-else :size="16" />
          </div>
          <div v-if="activeSection === 'skills'" class="editor-section-content">
            <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 300px; overflow-y: auto; padding-right: 0.25rem; margin-bottom: 0.5rem;">
              <div v-for="(skill, index) in cv.data.skills" :key="skill.id" style="display: flex; gap: 4px; align-items: center; background: var(--bg-app); padding: 0.4rem; border-radius: var(--radius-sm); border: 1px solid var(--border);">
                <!-- Reorder buttons for skills -->
                <div style="display: flex; flex-direction: column; gap: 1px;">
                  <button 
                    style="border: none; background: transparent; cursor: pointer; color: var(--text-muted); display: flex; align-items: center; justify-content: center; padding: 1px;" 
                    :disabled="index === 0" 
                    @click="moveItem(cv.data.skills, index, 'up')"
                  >
                    <ArrowUp :size="12" />
                  </button>
                  <button 
                    style="border: none; background: transparent; cursor: pointer; color: var(--text-muted); display: flex; align-items: center; justify-content: center; padding: 1px;" 
                    :disabled="index === cv.data.skills.length - 1" 
                    @click="moveItem(cv.data.skills, index, 'down')"
                  >
                    <ArrowDown :size="12" />
                  </button>
                </div>

                <input type="text" class="form-input" style="flex: 2; padding: 0.35rem 0.55rem; font-size: 0.8rem;" v-model="skill.name" @input="updateTimestamp" placeholder="Vue 3" />
                <select class="form-select" style="flex: 1.2; padding: 0.35rem 0.55rem; font-size: 0.8rem;" v-model="skill.level" @change="updateTimestamp">
                  <option value="">{{ t.skillLevelOpt.none }}</option>
                  <option value="Expert">{{ t.skillLevelOpt.expert }}</option>
                  <option value="Intermediate">{{ t.skillLevelOpt.inter }}</option>
                  <option value="Beginner">{{ t.skillLevelOpt.beg }}</option>
                  <option value="Fluent">{{ t.skillLevelOpt.fluent }}</option>
                  <option value="Native">{{ t.skillLevelOpt.native }}</option>
                </select>
                <input type="text" class="form-input" style="flex: 1.2; padding: 0.35rem 0.55rem; font-size: 0.8rem;" v-model="skill.category" @input="updateTimestamp" placeholder="Frontend" />
                
                <button class="btn-icon" style="width: 28px; height: 28px; border: none; background: transparent; color: #ef4444; flex-shrink: 0;" title="Remove Skill" @click="removeSkill(index)">
                  <Trash2 :size="13" />
                </button>
              </div>
            </div>
            
            <button class="btn btn-secondary" style="width: 100%; border-style: dashed;" @click="addSkill">
              <Plus :size="16" /> {{ t.btnAddSkill }}
            </button>
          </div>
        </div>

        <!-- Custom Sections -->
        <div 
          v-for="(sect, sIndex) in cv.data.customSections" 
          :key="sect.id" 
          class="editor-section-card" 
          :class="{ 'active-section': activeSection === `custom-${sect.id}` }"
        >
          <div class="editor-section-header" @click="toggleSection(`custom-${sect.id}`)">
            <span class="editor-section-title">
              <BookmarkPlus :size="18" /> {{ sect.title || t.customSect }}
            </span>
            <div style="display: flex; align-items: center; gap: 2px;">
              <!-- Reorder Sections Up -->
              <button 
                class="btn-icon" 
                style="width: 28px; height: 28px; border: none; background: transparent; color: var(--text-muted);" 
                :disabled="sIndex === 0"
                :title="props.lang === 'es' ? 'Mover Arriba' : 'Move Up'" 
                @click.stop="moveItem(cv.data.customSections, sIndex, 'up')"
              >
                <ArrowUp :size="14" />
              </button>
              <!-- Reorder Sections Down -->
              <button 
                class="btn-icon" 
                style="width: 28px; height: 28px; border: none; background: transparent; color: var(--text-muted);" 
                :disabled="sIndex === cv.data.customSections.length - 1"
                :title="props.lang === 'es' ? 'Mover Abajo' : 'Move Down'" 
                @click.stop="moveItem(cv.data.customSections, sIndex, 'down')"
              >
                <ArrowDown :size="14" />
              </button>
              <!-- Delete Section Button -->
              <button class="btn-icon" style="width: 28px; height: 28px; border: none; background: transparent; color: #ef4444;" title="Delete Section" @click.stop="removeCustomSection(sIndex)">
                <Trash2 :size="14" />
              </button>
              <ChevronDown v-if="activeSection !== `custom-${sect.id}`" :size="16" style="margin-left: 0.25rem;" />
              <ChevronUp v-else :size="16" style="margin-left: 0.25rem;" />
            </div>
          </div>
          
          <div v-if="activeSection === `custom-${sect.id}`" class="editor-section-content">
            <div class="form-group">
              <label class="form-label">{{ t.customTitle }}</label>
              <input type="text" class="form-input" v-model="sect.title" @input="updateTimestamp" placeholder="e.g. Languages, Certifications..." />
            </div>
            
            <div style="margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <div v-for="(item, iIndex) in sect.items" :key="item.id" class="list-item-card" style="margin-bottom: 0;">
                <div class="list-item-header" @click="toggleItemExpansion(item.id)">
                  <div class="list-item-header-info" style="max-width: 60%">
                    <span class="list-item-title">{{ item.title || t.customItem }}</span>
                    <span class="list-item-subtitle">{{ item.subtitle || 'Subtitle' }}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 2px;">
                    <!-- Move Item Up inside Section -->
                    <button 
                      class="btn-icon" 
                      style="width: 28px; height: 28px; border: none; background: transparent; color: var(--text-muted);" 
                      :disabled="iIndex === 0"
                      :title="props.lang === 'es' ? 'Mover Arriba' : 'Move Up'" 
                      @click.stop="moveItem(sect.items, iIndex, 'up')"
                    >
                      <ArrowUp :size="14" />
                    </button>
                    <!-- Move Item Down inside Section -->
                    <button 
                      class="btn-icon" 
                      style="width: 28px; height: 28px; border: none; background: transparent; color: var(--text-muted);" 
                      :disabled="iIndex === sect.items.length - 1"
                      :title="props.lang === 'es' ? 'Mover Abajo' : 'Move Down'" 
                      @click.stop="moveItem(sect.items, iIndex, 'down')"
                    >
                      <ArrowDown :size="14" />
                    </button>
                    <!-- Delete Item inside Section -->
                    <button class="btn-icon" style="width: 28px; height: 28px; border: none; background: transparent; color: #ef4444;" title="Delete Item" @click.stop="removeCustomSectionItem(sect, iIndex)">
                      <Trash2 :size="14" />
                    </button>
                    <ChevronDown v-if="!expandedItems[item.id]" :size="14" style="margin-left: 0.25rem;" />
                    <ChevronUp v-else :size="14" style="margin-left: 0.25rem;" />
                  </div>
                </div>
                
                <div v-if="expandedItems[item.id]" class="list-item-content">
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">{{ t.customLabel }}</label>
                      <input type="text" class="form-input" v-model="item.title" @input="updateTimestamp" placeholder="e.g. French, AWS Certified Developer" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">{{ t.customSubtitle }}</label>
                      <input type="text" class="form-input" v-model="item.subtitle" @input="updateTimestamp" placeholder="e.g. Fluent, Amazon Web Services" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">{{ t.customDesc }}</label>
                    <textarea class="form-textarea" v-model="item.description" @input="updateTimestamp" placeholder="Additional info..."></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="btn btn-secondary" style="width: 100%; border-style: dashed; margin-top: 0.5rem;" @click="addCustomSectionItem(sect)">
              <Plus :size="16" /> {{ t.btnAddItemCustom }}
            </button>
          </div>
        </div>

        <!-- Add Custom Section Trigger -->
        <button class="btn btn-secondary" style="width: 100%; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem;" @click="addCustomSection">
          <BookmarkPlus :size="18" style="color: var(--primary)" /> {{ t.btnAddCustom }}
        </button>

      </div>
    </div>
  </div>
</template>
