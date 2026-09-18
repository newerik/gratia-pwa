# 🧠 Interaction Guidelines

> 📎 This is the single source of truth for AI agent conventions. `GEMINI.md` imports this file via Gemini CLI's `@` import syntax, so edit only this file.

**How you should answer:**

- **Be Concise:** Use short sentences and simple language.
- **Structure:** Always use bullet points for lists and steps.
- **Visuals:** Use emojis (✨, 🚀, ⚠️) to highlight important points in explanations.
- **Clean Code:** 🚫 **NEVER** put emojis inside code blocks or comments.
- **Context:** Assume the user wants the simplest effective solution.

---

## ⛔ CRITICAL RULES: Git & Commits

- **NO AUTO-COMMIT:** 🚫 **NEVER** commit or push changes unless explicitly asked by the user.
- **CODENAME:** 🚀 **"toljad"** means "commit and push".
- **CODENAME:** 📤 **"ereszd"** means "pnpm build:upload".
- **Mood:** Imperative ("Add", not "Added").
- **Forbidden Word:** "Refactor" (Describe the actual change instead).
- **Be Specific:**
  - ✅ "Update component to use MUI v7 slotProps API"
  - ✅ "Simplify authentication flow"
  - ❌ "Refactor code"

---

## 🛠️ Technology Stack & Tooling

- **Framework:** React 19.2.0 with TypeScript (Strict Mode)
- **UI Library:** MUI v7.3.7 (Material UI)
- **Build Tool:** Vite v7.1.9
- **Routing:** React Router v7.12.0
- **Internationalization:** i18next
- **Package Manager:** **PNPM** (Strictly enforced)

### 📦 Package Management Rules

- 🕵️ **Detect first:** Always check `package.json` and `pnpm-lock.yaml`.
- **Rule:** Use **PNPM** commands (`pnpm install`, `pnpm add`, etc.).
- 🚫 **Avoid:** Do not use `npm` or `yarn` commands unless explicitly instructed.

---

## 🏗️ Architecture & Structure

### 1. File Organization

**Rule:** Structure code for clarity.

- **Pages:** Located in `src/pages/`.
- **Components:** Shared components in `src/components/`.
- **Context:** React Contexts in `src/context/`.
- **Hooks:** Custom hooks in `src/hooks/`.

**Component Pattern:**
For complex components, prefer a folder structure:

```text
src/components/MyComplexComponent/
├── MyComplexComponent.tsx   # Main component
└── index.ts                 # export { default } from './MyComplexComponent'
```

### 2. Coding Patterns

- **MUI Usage:** Use the `sx` prop for styling. Utilize `useTheme` and `useMediaQuery` for responsiveness.
- **MUI Props:** 🚫 Avoid `inputProps`. Use `slotProps={{ input: ... }}` instead as `inputProps` is deprecated.
- **Sub-components:** Separate sub-components defined outside the main component to prevent re-renders and focus loss.

---

## 🧩 Coding Philosophy

### Custom Hooks

**Keep it simple!** 🛑

- **DO NOT** extract hooks just to "clean up" a component.
- **DO** create hooks only if they enable reuse or encapsulate very complex logic.
- **DO** keep logic inline if it is used once.

---

## ✅ Testing & Verification

- **Unit tests:** 🚫 None configured (no vitest/jest). Do not assume unit test files exist.
- **E2E tests:** Playwright (`@playwright/test`), config in `playwright.config.ts`.
  - Test files: `e2e/*.spec.ts`.
  - Run with `npx playwright test` (no wrapping pnpm script exists yet).
- **Typecheck:** `pnpm build` (runs `tsc -b && vite build`); no standalone `typecheck` script.
- **Lint:** `pnpm lint` (`eslint .`), `pnpm lint:fix` to auto-fix.
- **Format:** `pnpm format` (`prettier --write .`).
- **Pre-commit:** Husky + lint-staged auto-runs eslint --fix and prettier on staged files.
