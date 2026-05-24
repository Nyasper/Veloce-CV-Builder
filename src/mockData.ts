import type { CvProject } from './types'

export const mockCv: CvProject = {
  id: 'mock-1',
  title: 'Alex Mercer - Senior Frontend Engineer',
  updatedAt: new Date().toISOString(),
  design: {
    template: 'developer',
    themeColor: '250', // Beautiful Indigo
    fontFamily: 'outfit',
    spacing: 'normal',
    showA4Guidelines: true
  },
  data: {
    personalInfo: {
      fullName: 'Alex Mercer',
      title: 'Senior Frontend Engineer',
      email: 'alex.mercer@dev.io',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      website: 'alexmercer.dev',
      github: 'github.com/alexmercer',
      linkedin: 'linkedin.com/in/alexmercer',
      summary: 'Passionate and details-oriented Senior Frontend Engineer with 6+ years of experience building scalable, interactive web applications. Expert in Vue 3, TypeScript, and modern styling solutions. Proven track record of improving user experience, optimizing rendering performance, and leading engineering teams to deliver high-quality products.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80'
    },
    education: [
      {
        id: 'edu-1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science & Engineering',
        startDate: '2016-09',
        endDate: '2020-05',
        current: false,
        description: 'Graduated with Honors. Specialization in Human-Computer Interaction (HCI) and Distributed Systems. Active member of the Computer Science Undergraduate Association.'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        company: 'Synthetix Tech',
        position: 'Senior Frontend Engineer',
        location: 'San Francisco, CA',
        startDate: '2022-08',
        endDate: '',
        current: true,
        description: 'Led the refactoring of a legacy dashboard application to Vue 3 and TypeScript, resulting in a 40% improvement in Initial Load Time (LCP). Spearheaded the development of a reusable dynamic design system loaded with fluid animations and customized components. Mentored 4 junior developers and established automated CI/CD code quality gates.'
      },
      {
        id: 'exp-2',
        company: 'PixelPerfect Solutions',
        position: 'Frontend Developer',
        location: 'Remote',
        startDate: '2020-06',
        endDate: '2022-07',
        current: false,
        description: 'Developed and maintained responsive client-facing e-commerce websites and single-page applications. Worked closely with UX/UI designers to convert Figma prototypes into high-fidelity code. Implemented complex state management configurations and interactive visual layouts, serving over 500k monthly active users.'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'Aether Canvas',
        description: 'An interactive vector graphics editor built directly inside the browser using Vue 3, HTML5 Canvas, and HSL style customizers. Supports custom layers, dynamic grid systems, and SVG/JSON exports.',
        techStack: 'Vue 3, TypeScript, CSS Variables, HTML5 Canvas',
        link: 'github.com/alexmercer/aether-canvas'
      },
      {
        id: 'proj-2',
        name: 'Veloce Form Builder',
        description: 'A modular, low-code drag-and-drop form building engine supporting conditional field logic, real-time reactive schemas, and custom print layouts.',
        techStack: 'Vue 3, Pinia, Vanilla CSS, Vitest',
        link: 'github.com/alexmercer/veloce'
      }
    ],
    skills: [
      { id: 'skill-1', name: 'Vue 3 (Composition API)', level: 'Expert', category: 'Frontend' },
      { id: 'skill-2', name: 'TypeScript', level: 'Expert', category: 'Languages' },
      { id: 'skill-3', name: 'JavaScript (ES6+)', level: 'Expert', category: 'Languages' },
      { id: 'skill-4', name: 'CSS / SCSS / Tailwind', level: 'Expert', category: 'Frontend' },
      { id: 'skill-5', name: 'Vite & Webpack', level: 'Intermediate', category: 'Tools' },
      { id: 'skill-6', name: 'Git & GitHub Actions', level: 'Expert', category: 'Tools' },
      { id: 'skill-7', name: 'REST & GraphQL APIs', level: 'Intermediate', category: 'Backend' },
      { id: 'skill-8', name: 'Node.js & Express', level: 'Intermediate', category: 'Backend' }
    ],
    customSections: [
      {
        id: 'custom-1',
        title: 'Languages',
        items: [
          {
            id: 'lang-1',
            title: 'English',
            subtitle: 'Native Proficiency',
            description: 'Bilingual native speaker.'
          },
          {
            id: 'lang-2',
            title: 'Spanish',
            subtitle: 'Conversational',
            description: 'Proficient in written and spoken communication.'
          }
        ]
      }
    ]
  }
}
