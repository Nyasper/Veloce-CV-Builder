<script setup lang="ts">
import type { CvProject } from '../types'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Link2,
  Printer,
  Download,
  ArrowLeft,
  CheckCircle2
} from 'lucide-vue-next'

const props = defineProps<{
  cv: CvProject
}>()

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'export'): void
}>()

const printCv = () => {
  window.print()
}

// Group skills by category for better sidebar layout
const getGroupedSkills = () => {
  const groups: Record<string, string[]> = {}
  props.cv.data.skills.forEach(skill => {
    if (!skill.name) return
    const cat = skill.category || 'General'
    if (!groups[cat]) {
      groups[cat] = []
    }
    groups[cat].push(skill.name + (skill.level ? ` (${skill.level})` : ''))
  })
  return groups
}
</script>

<template>
  <div class="preview-pane">
    <!-- Top toolbar controls (automatically hidden in print mode) -->
    <div class="preview-toolbar">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <button class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" @click="emit('back')">
          <ArrowLeft :size="15" /> Dashboard
        </button>
        <span style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.7); display: flex; align-items: center; gap: 0.25rem;">
          <CheckCircle2 :size="14" style="color: #10b981" /> Autosaved
        </span>
      </div>
      
      <div class="preview-toolbar-actions">
        <button class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" @click="emit('export')">
          <Download :size="15" /> Download JSON
        </button>
        <button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" @click="printCv">
          <Printer :size="15" /> Export PDF / Print
        </button>
      </div>
    </div>

    <!-- The actual high-fidelity resume document frame -->
    <div 
      class="cv-document"
      :class="['font-' + cv.design.fontFamily, 'spacing-' + cv.design.spacing, { 'show-guidelines': cv.design.showA4Guidelines }]"
      :style="{'--primary-hue': cv.design.themeColor}"
    >
      
      <!-- ========================================================
           TEMPLATE 1: MODERN DEVELOPER
           ======================================================== -->
      <div v-if="cv.design.template === 'developer'" class="template-developer">
        <!-- Sidebar column -->
        <div class="sidebar">
          <!-- Avatar -->
          <div v-if="cv.data.personalInfo.avatarUrl" class="avatar-container">
            <img :src="cv.data.personalInfo.avatarUrl" alt="Avatar" class="avatar-img" />
          </div>
          
          <div>
            <h1>{{ cv.data.personalInfo.fullName || 'Your Name' }}</h1>
            <div class="job-title">{{ cv.data.personalInfo.title || 'Professional Title' }}</div>
          </div>
          
          <!-- Contact Info -->
          <div class="contact-info">
            <div v-if="cv.data.personalInfo.email" class="contact-item">
              <Mail :size="12" style="color: var(--cv-primary); flex-shrink: 0;" />
              <span>{{ cv.data.personalInfo.email }}</span>
            </div>
            <div v-if="cv.data.personalInfo.phone" class="contact-item">
              <Phone :size="12" style="color: var(--cv-primary); flex-shrink: 0;" />
              <span>{{ cv.data.personalInfo.phone }}</span>
            </div>
            <div v-if="cv.data.personalInfo.location" class="contact-item">
              <MapPin :size="12" style="color: var(--cv-primary); flex-shrink: 0;" />
              <span>{{ cv.data.personalInfo.location }}</span>
            </div>
            <div v-if="cv.data.personalInfo.website" class="contact-item">
              <Globe :size="12" style="color: var(--cv-primary); flex-shrink: 0;" />
              <span>{{ cv.data.personalInfo.website }}</span>
            </div>
            <div v-if="cv.data.personalInfo.github" class="contact-item">
              <Github :size="12" style="color: var(--cv-primary); flex-shrink: 0;" />
              <span>{{ cv.data.personalInfo.github }}</span>
            </div>
            <div v-if="cv.data.personalInfo.linkedin" class="contact-item">
              <Linkedin :size="12" style="color: var(--cv-primary); flex-shrink: 0;" />
              <span>{{ cv.data.personalInfo.linkedin }}</span>
            </div>
          </div>

          <!-- Skills grouped in Sidebar -->
          <div v-if="cv.data.skills.length > 0" class="cv-section" style="margin-top: 1rem;">
            <h2>Skills</h2>
            <div v-for="(skills, category) in getGroupedSkills()" :key="category" style="margin-bottom: 0.75rem;">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--cv-primary); margin-bottom: 0.25rem;">
                {{ category }}
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 0.2rem;">
                <span v-for="skill in skills" :key="skill" class="skill-badge">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Column -->
        <div class="main-content">
          <!-- Summary -->
          <div v-if="cv.data.personalInfo.summary" class="cv-section">
            <h2>Profile</h2>
            <p class="cv-item-description" style="font-size: 0.88rem; line-height: 1.5;">
              {{ cv.data.personalInfo.summary }}
            </p>
          </div>

          <!-- Experience -->
          <div v-if="cv.data.experience.length > 0" class="cv-section">
            <h2>Experience</h2>
            <div v-for="exp in cv.data.experience" :key="exp.id" class="cv-item">
              <div class="cv-item-header">
                <span>{{ exp.position || 'Position' }}</span>
                <span style="font-size: 0.8rem; color: var(--cv-text-muted)">
                  {{ exp.startDate || 'Start' }} — {{ exp.current ? 'Present' : (exp.endDate || 'End') }}
                </span>
              </div>
              <div class="cv-item-subheader">
                <span>{{ exp.company || 'Company' }}</span>
                <span style="font-size: 0.8rem; font-weight: normal;">{{ exp.location }}</span>
              </div>
              <p class="cv-item-description" style="white-space: pre-line;">{{ exp.description }}</p>
            </div>
          </div>

          <!-- Education -->
          <div v-if="cv.data.education.length > 0" class="cv-section">
            <h2>Education</h2>
            <div v-for="edu in cv.data.education" :key="edu.id" class="cv-item">
              <div class="cv-item-header">
                <span>{{ edu.degree || 'Degree' }} {{ edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : '' }}</span>
                <span style="font-size: 0.8rem; color: var(--cv-text-muted)">
                  {{ edu.startDate || 'Start' }} — {{ edu.current ? 'Present' : (edu.endDate || 'End') }}
                </span>
              </div>
              <div class="cv-item-subheader">
                <span>{{ edu.institution || 'Institution' }}</span>
              </div>
              <p v-if="edu.description" class="cv-item-description">{{ edu.description }}</p>
            </div>
          </div>

          <!-- Projects -->
          <div v-if="cv.data.projects.length > 0" class="cv-section">
            <h2>Projects</h2>
            <div v-for="proj in cv.data.projects" :key="proj.id" class="cv-item">
              <div class="cv-item-header">
                <span style="display: inline-flex; align-items: center; gap: 0.25rem;">
                  {{ proj.name || 'Project Name' }}
                  <a v-if="proj.link" :href="'https://' + proj.link.replace(/^https?:\/\//, '')" target="_blank" style="color: var(--cv-primary); font-size: 0.75rem;">
                    <Link2 :size="12" />
                  </a>
                </span>
                <span v-if="proj.techStack" style="font-size: 0.75rem; font-weight: normal; color: var(--cv-primary);">
                  {{ proj.techStack }}
                </span>
              </div>
              <p class="cv-item-description">{{ proj.description }}</p>
            </div>
          </div>

          <!-- Custom Sections -->
          <div v-for="sect in cv.data.customSections" :key="sect.id" class="cv-section">
            <h2 v-if="sect.items.length > 0">{{ sect.title }}</h2>
            <div v-for="item in sect.items" :key="item.id" class="cv-item">
              <div class="cv-item-header">
                <span>{{ item.title }}</span>
                <span style="font-size: 0.8rem; color: var(--cv-primary)">{{ item.subtitle }}</span>
              </div>
              <p v-if="item.description" class="cv-item-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================
           TEMPLATE 2: ELEGANT EXECUTIVE
           ======================================================== -->
      <div v-else-if="cv.design.template === 'executive'" class="template-executive">
        <!-- Header -->
        <div class="header">
          <h1>{{ cv.data.personalInfo.fullName || 'Your Name' }}</h1>
          <div class="job-title">{{ cv.data.personalInfo.title || 'Professional Title' }}</div>
          
          <div class="contact-row">
            <div v-if="cv.data.personalInfo.email" class="contact-item">
              <Mail :size="12" style="color: var(--cv-primary);" />
              <span>{{ cv.data.personalInfo.email }}</span>
            </div>
            <div v-if="cv.data.personalInfo.phone" class="contact-item">
              <Phone :size="12" style="color: var(--cv-primary);" />
              <span>{{ cv.data.personalInfo.phone }}</span>
            </div>
            <div v-if="cv.data.personalInfo.location" class="contact-item">
              <MapPin :size="12" style="color: var(--cv-primary);" />
              <span>{{ cv.data.personalInfo.location }}</span>
            </div>
            <div v-if="cv.data.personalInfo.website" class="contact-item">
              <Globe :size="12" style="color: var(--cv-primary);" />
              <span>{{ cv.data.personalInfo.website }}</span>
            </div>
            <div v-if="cv.data.personalInfo.github" class="contact-item">
              <Github :size="12" style="color: var(--cv-primary);" />
              <span>{{ cv.data.personalInfo.github }}</span>
            </div>
            <div v-if="cv.data.personalInfo.linkedin" class="contact-item">
              <Linkedin :size="12" style="color: var(--cv-primary);" />
              <span>{{ cv.data.personalInfo.linkedin }}</span>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div v-if="cv.data.personalInfo.summary" class="cv-section" style="text-align: center;">
          <p class="cv-item-description" style="font-style: italic; max-width: 700px; margin: 0 auto; line-height: 1.6; font-size: 0.92rem;">
            "{{ cv.data.personalInfo.summary }}"
          </p>
        </div>

        <!-- Experience -->
        <div v-if="cv.data.experience.length > 0" class="cv-section">
          <h2>Professional Experience</h2>
          <div v-for="exp in cv.data.experience" :key="exp.id" class="cv-item">
            <div class="cv-item-header">
              <span>{{ exp.company || 'Company' }}</span>
              <span style="font-size: 0.85rem; color: var(--cv-text-muted)">
                {{ exp.startDate || 'Start' }} — {{ exp.current ? 'Present' : (exp.endDate || 'End') }}
              </span>
            </div>
            <div class="cv-item-subheader">
              <span>{{ exp.position || 'Position' }}</span>
              <span style="font-size: 0.85rem; font-weight: normal;">{{ exp.location }}</span>
            </div>
            <p class="cv-item-description" style="white-space: pre-line; margin-top: 0.25rem;">{{ exp.description }}</p>
          </div>
        </div>

        <!-- Education -->
        <div v-if="cv.data.education.length > 0" class="cv-section">
          <h2>Education</h2>
          <div v-for="edu in cv.data.education" :key="edu.id" class="cv-item">
            <div class="cv-item-header">
              <span>{{ edu.institution || 'Institution' }}</span>
              <span style="font-size: 0.85rem; color: var(--cv-text-muted)">
                {{ edu.startDate || 'Start' }} — {{ edu.current ? 'Present' : (edu.endDate || 'End') }}
              </span>
            </div>
            <div class="cv-item-subheader">
              <span>{{ edu.degree || 'Degree' }} {{ edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : '' }}</span>
            </div>
            <p v-if="edu.description" class="cv-item-description" style="margin-top: 0.25rem;">{{ edu.description }}</p>
          </div>
        </div>

        <!-- Projects -->
        <div v-if="cv.data.projects.length > 0" class="cv-section">
          <h2>Key Projects</h2>
          <div v-for="proj in cv.data.projects" :key="proj.id" class="cv-item">
            <div class="cv-item-header">
              <span style="display: inline-flex; align-items: center; gap: 0.25rem;">
                {{ proj.name || 'Project Name' }}
                <a v-if="proj.link" :href="'https://' + proj.link.replace(/^https?:\/\//, '')" target="_blank" style="color: var(--cv-primary); font-size: 0.75rem;">
                  <Link2 :size="12" />
                </a>
              </span>
              <span v-if="proj.techStack" style="font-size: 0.8rem; font-weight: normal; color: var(--cv-primary)">
                {{ proj.techStack }}
              </span>
            </div>
            <p class="cv-item-description" style="margin-top: 0.25rem;">{{ proj.description }}</p>
          </div>
        </div>

        <!-- Skills -->
        <div v-if="cv.data.skills.length > 0" class="cv-section">
          <h2>Core Competencies</h2>
          <div class="skills-list-container">
            <span v-for="skill in cv.data.skills" :key="skill.id" class="executive-skill">
              {{ skill.name }}<span v-if="skill.level" style="color: var(--cv-primary); font-size: 0.75rem; margin-left: 0.25rem;">• {{ skill.level }}</span>
            </span>
          </div>
        </div>

        <!-- Custom Sections -->
        <div v-for="sect in cv.data.customSections" :key="sect.id" class="cv-section">
          <h2 v-if="sect.items.length > 0">{{ sect.title }}</h2>
          <div v-for="item in sect.items" :key="item.id" class="cv-item">
            <div class="cv-item-header">
              <span>{{ item.title }}</span>
              <span style="font-size: 0.85rem; color: var(--cv-primary)">{{ item.subtitle }}</span>
            </div>
            <p v-if="item.description" class="cv-item-description" style="margin-top: 0.25rem;">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <!-- ========================================================
           TEMPLATE 3: MINIMALIST CREATIVE
           ======================================================== -->
      <div v-else-if="cv.design.template === 'creative'" class="template-creative">
        <!-- Banner Header -->
        <div class="header-block">
          <div class="header-text">
            <h1>{{ cv.data.personalInfo.fullName || 'Your Name' }}</h1>
            <div class="job-title">{{ cv.data.personalInfo.title || 'Professional Title' }}</div>
          </div>
          <div v-if="cv.data.personalInfo.avatarUrl" class="header-avatar">
            <img :src="cv.data.personalInfo.avatarUrl" alt="Avatar" />
          </div>
        </div>

        <!-- Horizontal Quick Contacts -->
        <div class="creative-contact-bar">
          <div class="contact-block" v-if="cv.data.personalInfo.email || cv.data.personalInfo.phone">
            <div class="contact-block-label">Get in touch</div>
            <div>{{ cv.data.personalInfo.email }}</div>
            <div>{{ cv.data.personalInfo.phone }}</div>
          </div>
          <div class="contact-block" v-if="cv.data.personalInfo.location || cv.data.personalInfo.website">
            <div class="contact-block-label">Location & Web</div>
            <div>{{ cv.data.personalInfo.location }}</div>
            <div style="color: var(--cv-primary)">{{ cv.data.personalInfo.website }}</div>
          </div>
          <div class="contact-block" v-if="cv.data.personalInfo.github || cv.data.personalInfo.linkedin">
            <div class="contact-block-label">Social Portfolio</div>
            <div>{{ cv.data.personalInfo.github }}</div>
            <div>{{ cv.data.personalInfo.linkedin }}</div>
          </div>
        </div>

        <!-- Asymmetric Grid blocks -->
        <div class="sections-grid">
          <!-- Profile/Summary (Full Width in Grid) -->
          <div v-if="cv.data.personalInfo.summary" class="span-full">
            <h2>About Me</h2>
            <p class="cv-item-description" style="font-size: 0.9rem; line-height: 1.55;">
              {{ cv.data.personalInfo.summary }}
            </p>
          </div>

          <!-- Left Grid Column: Experience -->
          <div v-if="cv.data.experience.length > 0" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <h2>Career Path</h2>
            <div v-for="exp in cv.data.experience" :key="exp.id">
              <div class="cv-item-header">{{ exp.position || 'Position' }}</div>
              <div class="cv-item-meta">
                {{ exp.company }} | {{ exp.startDate }} — {{ exp.current ? 'Present' : exp.endDate }}
              </div>
              <p class="cv-item-description" style="white-space: pre-line;">{{ exp.description }}</p>
            </div>
          </div>

          <!-- Right Grid Column: Education & Skills -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Education -->
            <div v-if="cv.data.education.length > 0" style="display: flex; flex-direction: column; gap: 1rem;">
              <h2>Studies</h2>
              <div v-for="edu in cv.data.education" :key="edu.id">
                <div class="cv-item-header">{{ edu.degree || 'Degree' }}</div>
                <div class="cv-item-meta">
                  {{ edu.institution }} | {{ edu.startDate }} — {{ edu.current ? 'Present' : edu.endDate }}
                </div>
                <p v-if="edu.description" class="cv-item-description">{{ edu.description }}</p>
              </div>
            </div>

            <!-- Skills -->
            <div v-if="cv.data.skills.length > 0">
              <h2>Capabilities</h2>
              <div style="display: flex; flex-wrap: wrap;">
                <span v-for="skill in cv.data.skills" :key="skill.id" class="skill-badge">
                  {{ skill.name }}<span v-if="skill.level" style="opacity: 0.7; font-size: 0.7rem; font-weight: normal;"> ({{ skill.level }})</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Projects (Full Width in Grid) -->
          <div v-if="cv.data.projects.length > 0" class="span-full" style="margin-top: 0.5rem;">
            <h2>Featured Projects</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div v-for="proj in cv.data.projects" :key="proj.id" style="border: 1px solid var(--cv-border); padding: 1rem; border-radius: var(--radius-sm);">
                <div class="cv-item-header" style="display: flex; justify-content: space-between; align-items: center;">
                  <span>{{ proj.name }}</span>
                  <a v-if="proj.link" :href="'https://' + proj.link.replace(/^https?:\/\//, '')" target="_blank" style="color: var(--cv-primary)">
                    <Link2 :size="12" />
                  </a>
                </div>
                <div v-if="proj.techStack" style="font-size: 0.72rem; color: var(--cv-primary); margin-bottom: 0.4rem; font-weight: 500;">
                  {{ proj.techStack }}
                </div>
                <p class="cv-item-description" style="font-size: 0.8rem; line-height: 1.4;">{{ proj.description }}</p>
              </div>
            </div>
          </div>

          <!-- Custom Sections (Full Width in Grid) -->
          <div v-for="sect in cv.data.customSections" :key="sect.id" class="span-full">
            <h2 v-if="sect.items.length > 0">{{ sect.title }}</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div v-for="item in sect.items" :key="item.id">
                <div class="cv-item-header" style="display: flex; justify-content: space-between;">
                  <span>{{ item.title }}</span>
                  <span style="font-size: 0.8rem; color: var(--cv-primary)">{{ item.subtitle }}</span>
                </div>
                <p v-if="item.description" class="cv-item-description" style="font-size: 0.8rem;">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
