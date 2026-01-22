# Gratia PWA - Gratitude Journal & Prayer List

Gratia PWA is a mobile-first Progressive Web Application (PWA) designed to help users cultivate gratitude and manage their prayer lists. Built with React, TypeScript, and Material UI, it offers a seamless experience across devices with offline capabilities and planned Google Drive synchronization.

## 🌟 Features

### 📖 Gratitude Journal

- **Calendar View:** Browse through dates to view past entries.
- **Rich Text Editor:** Write daily gratitude entries with formatting options (bold, italic, underline, bullet points).
- **Auto-save:** Content is saved automatically to local storage as you type.
- **Responsive Layout:**
  - _Mobile:_ Toggles between calendar and editor/list view.
  - _Desktop:_ Split-screen layout with calendar and entry list side-by-side.

### 🙏 Prayer List

- **Checklist Management:** Add, edit, and reorder prayer requests (inspired by Google Keep).
- **Archiving:** Archive answered or completed items; view them in a separate "Archived" list.
- **Edit & Delete:** Full control over your list items.

### ⚙️ Customization & Settings

- **Dark Mode:** Toggle between Light and Dark themes (or sync with system settings).
- **Header Customization:** Select from 7 rainbow colors for the app header.
- **Internationalization (i18n):** Native support for English and Hungarian (Magyar) with auto-detection.
- **Data Management:** Options to export, import, or delete local data.

### ☁️ Google Drive Integration (Planned)

- Sync journal entries and prayer lists across devices using a Google account.
- **Offline-First:** Fully functional without an internet connection; syncs when online.

## 🛠️ Tech Stack

- **Framework:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI Library:** [Material UI (MUI)](https://mui.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **PWA Support:** [Vite PWA Plugin](https://vite-pwa-org.netlify.app/) & Workbox
- **Internationalization:** [i18next](https://www.i18next.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- [pnpm](https://pnpm.io/) package manager

### Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start the development server:**

   ```bash
   pnpm dev
   ```

3. **Build for production:**

   ```bash
   pnpm build
   ```

4. **Preview the production build:**

   ```bash
   pnpm preview
   ```

## 📱 PWA Features

This application is installed as a Progressive Web App (PWA):

- **Installable:** Add to home screen on mobile and desktop.
- **Offline Capable:** Service workers cache assets and data for offline access.
- **Auto-Update:** Notifies users when a new version is available.
