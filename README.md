# Gratia PWA - Gratitude Journal

A Progressive Web App (PWA) built with React, TypeScript, and Vite for keeping a daily gratitude journal and managing a prayer list.

## Features

- **Gratitude Journal**: Write down what you are grateful for each day. Includes a calendar view for easy navigation.
- **Prayer List**: A to-do list style view for prayers, functioning similarly to Google Keep, complete with archiving and reordering capabilities.
- **Mobile First & Responsive**: Designed for mobile devices first, but fully functional on desktop screens.
- **Offline Support**: Fully functional offline using Local Storage and a service worker (Workbox).
- **Google Drive Sync**: Sync your journal entries and prayers to Google Drive when online.
- **Customization**:
  - Dark Mode support (manual or system-based).
  - Customizable header colors (7 colors of the rainbow).
- **Localization**: Supports multiple languages (currently English and Hungarian), detecting browser language with English as the fallback.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Material UI (MUI)](https://mui.com/)
- [Workbox](https://developer.chrome.com/docs/workbox/) for PWA and offline support

## Getting Started

### Prerequisites

Ensure you have Node.js and a package manager like `pnpm` installed.

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm run dev
   ```

### Build

To build the project for production:

```bash
pnpm run build
```

## Concept

For more detailed information regarding the core concept, features, and design, please refer to the [Concept.md](./Concept.md) file.
