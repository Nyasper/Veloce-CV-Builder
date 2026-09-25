import type { CvProject, CvData, CvDesign } from './types'

export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).substring(2, 11)
}

export const getDefaultCvData = (): CvData => ({
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
})

export const getDefaultCvDesign = (): CvDesign => ({
  template: 'developer',
  themeColor: '250',
  fontFamily: 'outfit',
  spacing: 'normal',
  showA4Guidelines: true
})

export const normalizeCv = (raw: Partial<CvProject> | null | undefined): CvProject => {
  const defaultData = getDefaultCvData()
  const defaultDesign = getDefaultCvDesign()

  const safeData: CvData = {
    personalInfo: {
      fullName: raw?.data?.personalInfo?.fullName || '',
      title: raw?.data?.personalInfo?.title || '',
      email: raw?.data?.personalInfo?.email || '',
      phone: raw?.data?.personalInfo?.phone || '',
      location: raw?.data?.personalInfo?.location || '',
      website: raw?.data?.personalInfo?.website || '',
      github: raw?.data?.personalInfo?.github || '',
      linkedin: raw?.data?.personalInfo?.linkedin || '',
      summary: raw?.data?.personalInfo?.summary || '',
      avatarUrl: raw?.data?.personalInfo?.avatarUrl || ''
    },
    education: Array.isArray(raw?.data?.education)
      ? raw.data.education.map(edu => ({
          id: edu.id || generateId(),
          institution: edu.institution || '',
          degree: edu.degree || '',
          fieldOfStudy: edu.fieldOfStudy || '',
          startDate: edu.startDate || '',
          endDate: edu.endDate || '',
          current: Boolean(edu.current),
          description: edu.description || ''
        }))
      : defaultData.education,
    experience: Array.isArray(raw?.data?.experience)
      ? raw.data.experience.map(exp => ({
          id: exp.id || generateId(),
          company: exp.company || '',
          position: exp.position || '',
          location: exp.location || '',
          startDate: exp.startDate || '',
          endDate: exp.endDate || '',
          current: Boolean(exp.current),
          description: exp.description || ''
        }))
      : defaultData.experience,
    projects: Array.isArray(raw?.data?.projects)
      ? raw.data.projects.map(proj => ({
          id: proj.id || generateId(),
          name: proj.name || '',
          description: proj.description || '',
          techStack: proj.techStack || '',
          link: proj.link || ''
        }))
      : defaultData.projects,
    skills: Array.isArray(raw?.data?.skills)
      ? raw.data.skills.map(skill => ({
          id: skill.id || generateId(),
          name: skill.name || '',
          level: skill.level || '',
          category: skill.category || ''
        }))
      : defaultData.skills,
    customSections: Array.isArray(raw?.data?.customSections)
      ? raw.data.customSections.map(sect => ({
          id: sect.id || generateId(),
          title: sect.title || '',
          items: Array.isArray(sect.items)
            ? sect.items.map(item => ({
                id: item.id || generateId(),
                title: item.title || '',
                subtitle: item.subtitle || '',
                description: item.description || ''
              }))
            : []
        }))
      : defaultData.customSections
  }

  const safeDesign: CvDesign = {
    template:
      raw?.design?.template === 'developer' ||
      raw?.design?.template === 'executive' ||
      raw?.design?.template === 'creative'
        ? raw.design.template
        : defaultDesign.template,
    themeColor: raw?.design?.themeColor || defaultDesign.themeColor,
    fontFamily:
      raw?.design?.fontFamily === 'outfit' ||
      raw?.design?.fontFamily === 'inter' ||
      raw?.design?.fontFamily === 'playfair'
        ? raw.design.fontFamily
        : defaultDesign.fontFamily,
    spacing:
      raw?.design?.spacing === 'compact' ||
      raw?.design?.spacing === 'normal' ||
      raw?.design?.spacing === 'relaxed'
        ? raw.design.spacing
        : defaultDesign.spacing,
    showA4Guidelines: raw?.design?.showA4Guidelines ?? defaultDesign.showA4Guidelines
  }

  return {
    id: raw?.id || generateId(),
    title: raw?.title?.trim() || 'Untitled CV',
    updatedAt: raw?.updatedAt || new Date().toISOString(),
    data: safeData,
    design: safeDesign
  }
}

export const cloneCvProject = (cv: CvProject, titleSuffix = '(Copy)'): CvProject => {
  const cloned = normalizeCv(JSON.parse(JSON.stringify(cv)))
  cloned.id = generateId()
  cloned.title = `${cloned.title} ${titleSuffix}`.trim()
  cloned.updatedAt = new Date().toISOString()

  // Generate completely fresh IDs for all items so no collision happens with the original
  cloned.data.education.forEach(edu => {
    edu.id = generateId()
  })
  cloned.data.experience.forEach(exp => {
    exp.id = generateId()
  })
  cloned.data.projects.forEach(proj => {
    proj.id = generateId()
  })
  cloned.data.skills.forEach(skill => {
    skill.id = generateId()
  })
  cloned.data.customSections.forEach(sect => {
    sect.id = generateId()
    sect.items.forEach(item => {
      item.id = generateId()
    })
  })

  return cloned
}

export const formatDateRange = (
  startDate?: string,
  endDate?: string,
  current?: boolean,
  presentText = 'Present'
): string => {
  const start = startDate?.trim() || ''
  const end = endDate?.trim() || ''

  if (current) {
    return start ? `${start} — ${presentText}` : presentText
  }

  if (start && end) {
    return `${start} — ${end}`
  }

  if (start) return start
  if (end) return end

  return ''
}

export const exportCvAsJson = (cv: CvProject): void => {
  const blob = new Blob([JSON.stringify(cv, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute('href', url)

  // Clean filename while allowing international characters
  const cleanTitle = (cv.title || 'cv')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '_')
    .replace(/^_+|_+$/g, '') || 'cv'

  downloadAnchor.setAttribute('download', `${cleanTitle}_backup.json`)
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
  URL.revokeObjectURL(url)
}
