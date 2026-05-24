ff# Vue CV Website & Portfolio Builder Plan

This document outlines the architectural plan, user experience flow, and design specifications for the CV and Portfolio Website Builder.

## 🚀 Key Features

1. **Dashboard Overview**:
   - Manage multiple CV projects.
   - Quick-actions to Create, Delete, Clone, and Edit CVs.
   - Preloaded template to preview instant premium designs.

2. **Interactive Real-Time Builder**:
   - Split-screen visual editor (Form controls on the left, interactive CV preview on the right).
   - Rich form controls for Education, Experience, Skills, Projects, and Personal Info.
   - Custom section additions for complete personalization.

3. **High-Fidelity Style Customization**:
   - Theme customization: Dynamic color palettes using HSL variables.
   - Font Selection: Clean Sans-Serif (`Inter`, `Outfit`) or elegant Serif (`Playfair Display`).
   - Multiple layouts: *Modern Developer*, *Elegant Executive*, and *Minimalist Creative*.

4. **Persistence & Export**:
   - Local-first storage (`localStorage`) so CV drafts are never lost.
   - Import/Export via lightweight JSON files.
   - Custom Print stylesheets (`@media print`) that format the document perfectly to A4 PDF with custom layout parameters, hiding interactive editor buttons automatically.

## 🛠 Tech Stack & Setup

- **Frontend**: Vue 3 (Composition API, `<script setup>`)
- **Language**: TypeScript
- **Styling**: Modern Vanilla CSS with CSS custom properties (variables)
- **Icons**: Lucide Icons via `lucide-vue-next`
- **Build Tool**: Vite

## 📂 Codebase Architecture

```text
src/
├── assets/
│   └── style.css          # Global styling, themes, animations, & @media print logic
├── components/
│   ├── CvDashboard.vue    # Landing and portfolio management dashboard
│   ├── CvEditor.vue       # Accordion-based form inputs and styling options
│   └── CvPreview.vue      # Dynamic template container and print frame
├── types.ts               # Complete TypeScript types for CV and configuration state
├── mockData.ts            # Realistic pre-filled resume for visual onboarding
├── main.ts                # Application entrypoint
└── App.vue                # Main orchestrator, local storage manager, header/footer
```

## 📅 Roadmap

### Step 1: Base Configuration
- Install `lucide-vue-next` for UI icon assets.
- Create `types.ts` and `mockData.ts` to define our CV data structure.
- Define a beautiful global CSS design system in `src/assets/style.css` supporting light/dark theme variables, transitions, and printing optimizations.

### Step 2: Dashboard Implementation
- Construct `CvDashboard.vue` with visual cards representing user portfolio CVs.
- Build "Import JSON" triggers and "Create New CV" forms on the dashboard.

### Step 3: Visual Editor Formulation
- Design `CvEditor.vue` with input sections grouped into collapsible card panels.
- Add quick add/remove logic for sub-items with subtle fade-in animations.
- Integrate the design picker (colors, fonts, layout templates).

### Step 4: Preview Templates Configuration
- Design `CvPreview.vue` with individual templates:
  - **Modern Developer**: Left-aligned, high skill visibility, modern block badges.
  - **Elegant Executive**: Centered typography, serif headings, traditional chronology.
  - **Minimalist Creative**: Elegant sidebar structure, refined accents.
- Implement CSS `@media print` rules for clean margins, hides interactive buttons, and enforces exact A4 page size pagination.

### Step 5: Master Integration & Verification
- Orchestrate global state inside `App.vue` (`activeCv`, list of CVs, `currentTab`).
- Implement JSON export/import & `localStorage` syncing.
- Build and verify locally (`npm run build` & typecheck) to ensure no compilation errors.
