export interface PersonalInfo {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  github: string
  linkedin: string
  summary: string
  avatarUrl: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  techStack: string
  link: string
}

export interface Skill {
  id: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Expert' | 'Fluent' | 'Native' | ''
  category: string
}

export interface CustomSectionItem {
  id: string
  title: string
  subtitle: string
  description: string
}

export interface CustomSection {
  id: string
  title: string
  items: CustomSectionItem[]
}

export interface CvDesign {
  template: 'developer' | 'executive' | 'creative'
  themeColor: string // Hue value: e.g. "220" for Indigo/Blue, "142" for Emerald, "325" for Pink, etc.
  fontFamily: 'outfit' | 'inter' | 'playfair'
  spacing: 'compact' | 'normal' | 'relaxed'
  showA4Guidelines: boolean
}

export interface CvData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
  customSections: CustomSection[]
}

export interface CvProject {
  id: string
  title: string
  updatedAt: string
  data: CvData
  design: CvDesign
}
