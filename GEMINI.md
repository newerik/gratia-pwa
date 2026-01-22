# 🧠 Interaction Guidelines

**How you should answer:**

- **Be Concise:** Use short sentences and simple language.
- **Structure:** Always use bullet points for lists and steps.
- **Visuals:** Use emojis (✨, 🚀, ⚠️) to highlight important points in explanations.
- **Clean Code:** 🚫 **NEVER** put emojis inside code blocks or comments.
- **Context:** Assume the user wants the simplest effective solution.

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
- **Sub-components:** Separate sub-components defined outside the main component to prevent re-renders and focus loss.

---

## 🧩 Coding Philosophy

### Custom Hooks

**Keep it simple!** 🛑

- **DO NOT** extract hooks just to "clean up" a component.
- **DO** create hooks only if they enable reuse or encapsulate very complex logic.
- **DO** keep logic inline if it is used once.

---

## 📝 Workflow & Standards

### Git Commit Messages

- **Git & Commits:** 🚫 **NEVER** commit or push changes unless explicitly asked by the user.
- **Mood:** Imperative ("Add", not "Added").
- **Forbidden Word:** "Refactor" (Describe the actual change instead).
- **Be Specific:**
  - ✅ "Update component to use MUI v7 slotProps API"
  - ✅ "Simplify authentication flow"
  - ❌ "Refactor code"
