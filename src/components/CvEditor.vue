<script setup lang="ts">
import { ref } from 'vue'
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
  Eye,
  Settings,
  Sparkles
} from 'lucide-vue-next'

const props = defineProps<{
  cv: CvProject
}>()

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
    category: 'Skills'
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
    title: 'Custom Section',
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

// Predefined gorgeous HSL color swatches
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
        <Sparkles :size="16" /> CV Content
      </button>
      <button 
        class="editor-tab-btn" 
        :class="{ active: activeTab === 'design' }"
        @click="activeTab = 'design'"
      >
        <Palette :size="16" /> Styles & Themes
      </button>
    </div>

    <!-- Scrollable Panel Content -->
    <div class="editor-scroll-pane">
      
      <!-- DESIGN TAB -->
      <div v-if="activeTab === 'design'" class="design-grid">
        <!-- Layout Selection -->
        <div class="editor-section-card active-section">
          <div class="editor-section-header">
            <span class="editor-section-title"><Settings :size="18" /> Resume Template Layout</span>
          </div>
          <div class="editor-section-content">
            <div class="form-group">
              <label class="form-label">Template Layout Choice</label>
              <select class="form-select" v-model="cv.design.template" @change="updateTimestamp">
                <option value="developer">Modern Developer (Sidebar Badges)</option>
                <option value="executive">Elegant Executive (Centered Serif)</option>
                <option value="creative">Minimalist Creative (Asymmetric Grid)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Typography selector -->
        <div class="editor-section-card active-section">
          <div class="editor-section-header">
            <span class="editor-section-title"><Palette :size="18" /> Typography & Fonts</span>
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
                  <div style="font-size: 0.75rem; color: var(--text-muted)">Modern, high tech feel</div>
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
                  <div style="font-size: 0.75rem; color: var(--text-muted)">Clean, geometric, premium sans</div>
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
                  <div style="font-size: 0.75rem; color: var(--text-muted)">Traditional, serif, high authority</div>
                </div>
                <span style="font-size: 1.25rem; font-family: 'Playfair Display', serif;">Aa</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Accent Colors -->
        <div class="editor-section-card active-section">
          <div class="editor-section-header">
            <span class="editor-section-title"><Palette :size="18" /> Palette Colors</span>
          </div>
          <div class="editor-section-content">
            <div class="form-group">
              <label class="form-label">Theme Hue Accent</label>
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
                <label class="form-label">Document Spacing</label>
                <select class="form-select" v-model="cv.design.spacing" @change="updateTimestamp">
                  <option value="compact">Compact Density</option>
                  <option value="normal">Balanced (Normal)</option>
                  <option value="relaxed">Relaxed Spacious</option>
                </select>
              </div>
              <div class="form-group" style="justify-content: flex-end;">
                <label class="form-label" style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer;">
                  <input type="checkbox" v-model="cv.design.showA4Guidelines" />
                  Show A4 Guide
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
            <span class="editor-section-title"><User :size="18" /> Personal Information</span>
            <ChevronDown v-if="activeSection !== 'personal'" :size="16" />
            <ChevronUp v-else :size="16" />
          </div>
          <div v-if="activeSection === 'personal'" class="editor-section-content">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" v-model="cv.data.personalInfo.fullName" @input="updateTimestamp" placeholder="Jane Doe" />
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label class="form-label">Job Title</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.title" @input="updateTimestamp" placeholder="Senior Product Manager" />
              </div>
              <div class="form-group">
                <label class="form-label">Profile Image URL</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.avatarUrl" @input="updateTimestamp" placeholder="https://unsplash.com/..." />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" v-model="cv.data.personalInfo.email" @input="updateTimestamp" placeholder="jane@example.com" />
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.phone" @input="updateTimestamp" placeholder="+1 (555) 123-4567" />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label class="form-label">Location</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.location" @input="updateTimestamp" placeholder="Austin, TX" />
              </div>
              <div class="form-group">
                <label class="form-label">Personal Website</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.website" @input="updateTimestamp" placeholder="janedoe.com" />
              </div>
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <label class="form-label">GitHub Link</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.github" @input="updateTimestamp" placeholder="github.com/jane" />
              </div>
              <div class="form-group">
                <label class="form-label">LinkedIn Link</label>
                <input type="text" class="form-input" v-model="cv.data.personalInfo.linkedin" @input="updateTimestamp" placeholder="linkedin.com/in/jane" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Professional Summary</label>
              <textarea class="form-textarea" v-model="cv.data.personalInfo.summary" @input="updateTimestamp" placeholder="Brief summary of your career accomplishments..."></textarea>
            </div>
          </div>
        </div>

        <!-- Work Experience Section -->
        <div class="editor-section-card" :class="{ 'active-section': activeSection === 'experience' }">
          <div class="editor-section-header" @click="toggleSection('experience')">
            <span class="editor-section-title"><Briefcase :size="18" /> Work Experience ({{ cv.data.experience.length }})</span>
            <ChevronDown v-if="activeSection !== 'experience'" :size="16" />
            <ChevronUp v-else :size="16" />
          </div>
          <div v-if="activeSection === 'experience'" class="editor-section-content">
            <transition-group name="list" tag="div">
              <div v-for="(exp, index) in cv.data.experience" :key="exp.id" class="list-item-card">
                <div class="list-item-header" @click="toggleItemExpansion(exp.id)">
                  <div class="list-item-header-info">
                    <span class="list-item-title">{{ exp.position || 'Position' }}</span>
                    <span class="list-item-subtitle">{{ exp.company || 'Company' }} {{ exp.startDate ? `(${exp.startDate})` : '' }}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button class="btn-icon" style="width: 28px; height: 28px; border: none; background: transparent; color: #ef4444;" title="Delete" @click.stop="removeExperience(index)">
                      <Trash2 :size="14" />
                    </button>
                    <ChevronDown v-if="!expandedItems[exp.id]" :size="14" />
                    <ChevronUp v-else :size="14" />
                  </div>
                </div>
                
                <div v-if="expandedItems[exp.id]" class="list-item-content">
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">Company</label>
                      <input type="text" class="form-input" v-model="exp.company" @input="updateTimestamp" placeholder="Google" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Job Title</label>
                      <input type="text" class="form-input" v-model="exp.position" @input="updateTimestamp" placeholder="Software Engineer" />
                    </div>
                  </div>
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">Location</label>
                      <input type="text" class="form-input" v-model="exp.location" @input="updateTimestamp" placeholder="Mountain View, CA" />
                    </div>
                    <div class="form-group" style="flex-direction: row; align-items: flex-end; gap: 0.5rem;">
                      <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; margin-bottom: 0.65rem; font-size: 0.85rem;">
                        <input type="checkbox" v-model="exp.current" @change="updateTimestamp" /> Current Job
                      </label>
                    </div>
                  </div>
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">Start Date</label>
                      <input type="text" class="form-input" v-model="exp.startDate" @input="updateTimestamp" placeholder="YYYY-MM" />
                    </div>
                    <div class="form-group" v-if="!exp.current">
                      <label class="form-label">End Date</label>
                      <input type="text" class="form-input" v-model="exp.endDate" @input="updateTimestamp" placeholder="YYYY-MM" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Responsibilities & Achievements</label>
                    <textarea class="form-textarea" v-model="exp.description" @input="updateTimestamp" placeholder="Details..."></textarea>
                  </div>
                </div>
              </div>
            </transition-group>
            
            <button class="btn btn-secondary" style="width: 100%; border-style: dashed;" @click="addExperience">
              <Plus :size="16" /> Add Experience Block
            </button>
          </div>
        </div>

        <!-- Education Section -->
        <div class="editor-section-card" :class="{ 'active-section': activeSection === 'education' }">
          <div class="editor-section-header" @click="toggleSection('education')">
            <span class="editor-section-title"><GraduationCap :size="18" /> Education ({{ cv.data.education.length }})</span>
            <ChevronDown v-if="activeSection !== 'education'" :size="16" />
            <ChevronUp v-else :size="16" />
          </div>
          <div v-if="activeSection === 'education'" class="editor-section-content">
            <transition-group name="list" tag="div">
              <div v-for="(edu, index) in cv.data.education" :key="edu.id" class="list-item-card">
                <div class="list-item-header" @click="toggleItemExpansion(edu.id)">
                  <div class="list-item-header-info">
                    <span class="list-item-title">{{ edu.degree || 'Degree' }} {{ edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : '' }}</span>
                    <span class="list-item-subtitle">{{ edu.institution || 'Institution' }}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button class="btn-icon" style="width: 28px; height: 28px; border: none; background: transparent; color: #ef4444;" title="Delete" @click.stop="removeEducation(index)">
                      <Trash2 :size="14" />
                    </button>
                    <ChevronDown v-if="!expandedItems[edu.id]" :size="14" />
                    <ChevronUp v-else :size="14" />
                  </div>
                </div>
                
                <div v-if="expandedItems[edu.id]" class="list-item-content">
                  <div class="form-group">
                    <label class="form-label">School / Institution</label>
                    <input type="text" class="form-input" v-model="edu.institution" @input="updateTimestamp" placeholder="Stanford University" />
                  </div>
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">Degree</label>
                      <input type="text" class="form-input" v-model="edu.degree" @input="updateTimestamp" placeholder="Bachelor of Science" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Field of Study</label>
                      <input type="text" class="form-input" v-model="edu.fieldOfStudy" @input="updateTimestamp" placeholder="Computer Science" />
                    </div>
                  </div>
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">Start Date</label>
                      <input type="text" class="form-input" v-model="edu.startDate" @input="updateTimestamp" placeholder="YYYY-MM" />
                    </div>
                    <div class="form-group" style="display: flex; flex-direction: column;">
                      <label class="form-label" style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; margin-top: auto; margin-bottom: 0.65rem;">
                        <input type="checkbox" v-model="edu.current" @change="updateTimestamp" /> In Progress
                      </label>
                    </div>
                  </div>
                  <div class="form-group-row" v-if="!edu.current">
                    <div class="form-group">
                      <label class="form-label">End Date</label>
                      <input type="text" class="form-input" v-model="edu.endDate" @input="updateTimestamp" placeholder="YYYY-MM" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Additional details / honors</label>
                    <textarea class="form-textarea" v-model="edu.description" @input="updateTimestamp" placeholder="e.g. GPA 3.9, Major focus..."></textarea>
                  </div>
                </div>
              </div>
            </transition-group>
            
            <button class="btn btn-secondary" style="width: 100%; border-style: dashed;" @click="addEducation">
              <Plus :size="16" /> Add Education Block
            </button>
          </div>
        </div>

        <!-- Projects Section -->
        <div class="editor-section-card" :class="{ 'active-section': activeSection === 'projects' }">
          <div class="editor-section-header" @click="toggleSection('projects')">
            <span class="editor-section-title"><FolderGit2 :size="18" /> Personal Projects ({{ cv.data.projects.length }})</span>
            <ChevronDown v-if="activeSection !== 'projects'" :size="16" />
            <ChevronUp v-else :size="16" />
          </div>
          <div v-if="activeSection === 'projects'" class="editor-section-content">
            <transition-group name="list" tag="div">
              <div v-for="(proj, index) in cv.data.projects" :key="proj.id" class="list-item-card">
                <div class="list-item-header" @click="toggleItemExpansion(proj.id)">
                  <div class="list-item-header-info">
                    <span class="list-item-title">{{ proj.name || 'Project Name' }}</span>
                    <span class="list-item-subtitle">{{ proj.link || 'No project link' }}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button class="btn-icon" style="width: 28px; height: 28px; border: none; background: transparent; color: #ef4444;" title="Delete" @click.stop="removeProject(index)">
                      <Trash2 :size="14" />
                    </button>
                    <ChevronDown v-if="!expandedItems[proj.id]" :size="14" />
                    <ChevronUp v-else :size="14" />
                  </div>
                </div>
                
                <div v-if="expandedItems[proj.id]" class="list-item-content">
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">Project Name</label>
                      <input type="text" class="form-input" v-model="proj.name" @input="updateTimestamp" placeholder="Aether Canvas" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Project URL / Link</label>
                      <input type="text" class="form-input" v-model="proj.link" @input="updateTimestamp" placeholder="github.com/myproject" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Technologies Used</label>
                    <input type="text" class="form-input" v-model="proj.techStack" @input="updateTimestamp" placeholder="Vue 3, TypeScript, CSS Variables" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Project Description</label>
                    <textarea class="form-textarea" v-model="proj.description" @input="updateTimestamp" placeholder="Describe the project objective, your role, and technical achievements..."></textarea>
                  </div>
                </div>
              </div>
            </transition-group>
            
            <button class="btn btn-secondary" style="width: 100%; border-style: dashed;" @click="addProject">
              <Plus :size="16" /> Add Project Block
            </button>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="editor-section-card" :class="{ 'active-section': activeSection === 'skills' }">
          <div class="editor-section-header" @click="toggleSection('skills')">
            <span class="editor-section-title"><Cpu :size="18" /> Core Skills ({{ cv.data.skills.length }})</span>
            <ChevronDown v-if="activeSection !== 'skills'" :size="16" />
            <ChevronUp v-else :size="16" />
          </div>
          <div v-if="activeSection === 'skills'" class="editor-section-content">
            <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 300px; overflow-y: auto; padding-right: 0.25rem; margin-bottom: 0.5rem;">
              <div v-for="(skill, index) in cv.data.skills" :key="skill.id" style="display: flex; gap: 0.5rem; align-items: center; background: var(--bg-app); padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border);">
                <input type="text" class="form-input" style="flex: 2; padding: 0.4rem 0.6rem; font-size: 0.85rem;" v-model="skill.name" @input="updateTimestamp" placeholder="Vue 3" />
                <select class="form-select" style="flex: 1; padding: 0.4rem 0.6rem; font-size: 0.85rem;" v-model="skill.level" @change="updateTimestamp">
                  <option value="">No Level</option>
                  <option value="Expert">Expert</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Native">Native</option>
                </select>
                <input type="text" class="form-input" style="flex: 1.5; padding: 0.4rem 0.6rem; font-size: 0.85rem;" v-model="skill.category" @input="updateTimestamp" placeholder="Frontend" />
                
                <button class="btn-icon" style="width: 32px; height: 32px; border: none; background: transparent; color: #ef4444; flex-shrink: 0;" title="Remove Skill" @click="removeSkill(index)">
                  <Trash2 :size="14" />
                </button>
              </div>
            </div>
            
            <button class="btn btn-secondary" style="width: 100%; border-style: dashed;" @click="addSkill">
              <Plus :size="16" /> Add Skill
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
              <BookmarkPlus :size="18" /> {{ sect.title || 'Custom Section' }}
            </span>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <button class="btn-icon" style="width: 28px; height: 28px; border: none; background: transparent; color: #ef4444;" title="Delete Section" @click.stop="removeCustomSection(sIndex)">
                <Trash2 :size="14" />
              </button>
              <ChevronDown v-if="activeSection !== `custom-${sect.id}`" :size="16" />
              <ChevronUp v-else :size="16" />
            </div>
          </div>
          
          <div v-if="activeSection === `custom-${sect.id}`" class="editor-section-content">
            <div class="form-group">
              <label class="form-label">Section Title</label>
              <input type="text" class="form-input" v-model="sect.title" @input="updateTimestamp" placeholder="e.g. Languages, Certifications..." />
            </div>
            
            <div style="margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <div v-for="(item, iIndex) in sect.items" :key="item.id" class="list-item-card" style="margin-bottom: 0;">
                <div class="list-item-header" @click="toggleItemExpansion(item.id)">
                  <div class="list-item-header-info">
                    <span class="list-item-title">{{ item.title || 'Title' }}</span>
                    <span class="list-item-subtitle">{{ item.subtitle || 'Subtitle' }}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button class="btn-icon" style="width: 28px; height: 28px; border: none; background: transparent; color: #ef4444;" title="Delete Item" @click.stop="removeCustomSectionItem(sect, iIndex)">
                      <Trash2 :size="14" />
                    </button>
                    <ChevronDown v-if="!expandedItems[item.id]" :size="14" />
                    <ChevronUp v-else :size="14" />
                  </div>
                </div>
                
                <div v-if="expandedItems[item.id]" class="list-item-content">
                  <div class="form-group-row">
                    <div class="form-group">
                      <label class="form-label">Item Title</label>
                      <input type="text" class="form-input" v-model="item.title" @input="updateTimestamp" placeholder="e.g. French, AWS Certified Developer" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Item Subtitle</label>
                      <input type="text" class="form-input" v-model="item.subtitle" @input="updateTimestamp" placeholder="e.g. Fluent, Amazon Web Services" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Brief Description</label>
                    <textarea class="form-textarea" v-model="item.description" @input="updateTimestamp" placeholder="Additional info..."></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="btn btn-secondary" style="width: 100%; border-style: dashed; margin-top: 0.5rem;" @click="addCustomSectionItem(sect)">
              <Plus :size="16" /> Add Item to Section
            </button>
          </div>
        </div>

        <!-- Add Custom Section Trigger -->
        <button class="btn btn-secondary" style="width: 100%; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.5rem;" @click="addCustomSection">
          <BookmarkPlus :size="18" style="color: var(--primary)" /> Add Custom Section (e.g. Languages)
        </button>

      </div>
    </div>
  </div>
</template>
