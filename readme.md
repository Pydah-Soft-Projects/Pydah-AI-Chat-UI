# Pydah AI Chat UI - Reusable Component Library

A modern, responsive, reusable React + Vite + Tailwind CSS frontend interface library for the **Pydah AI** backend platform.

This package is designed as a **shared React component library** intended to be consumed across multiple PydahSoft applications (Student Dashboard, Fee Management, Transport, Hostel, HRMS, Admissions, etc.).

---

## 1. Features & Architecture

* **React 18 & Vite 5:** Library mode bundling producing ES Module (`dist/index.es.js`) and UMD (`dist/index.umd.js`) bundles.
* **Tailwind CSS Styling:** Includes scoped styles (`dist/style.css`) with PydahSoft brand accent green (`#3D6734`) and neutral surfaces (`#F1F1F1`).
* **Automatic Environment Variable Auto-Detection:** Automatically detects backend URLs from whichever framework the host application uses (`Vite`, `Next.js`, `Create-React-App`, or global `window`).
* **Zero Code Duplication:** Host applications consume one reusable component and configure only their application identity and `.env` variables.

---

## 2. Installing in Host Applications

### Option A: Installing via Git Repository (Production Recommendation)

In your host application's `package.json` (e.g. Student Dashboard or Fee Management app), add the Git URL dependency:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "pydah-ai-chat-ui": "git+https://github.com/Pydah-Soft-Projects/Pydah-AI-Chat-UI.git"
  }
}
```

*For private Git repositories using SSH:*
```json
"pydah-ai-chat-ui": "git+ssh://git@github.com/Pydah-Soft-Projects/Pydah-AI-Chat-UI.git"
```

Then run:
```bash
npm install
```

---

### Option B: Installing via Local File Path (Development Recommendation)

For local development across sibling directories:

```json
{
  "dependencies": {
    "pydah-ai-chat-ui": "file:../Pydah-AI-Chat-UI"
  }
}
```

Then run `npm install`.

---

## 3. Configuring Backend URL in Host Applications (No Hardcoding Required)

Host applications **do not need to hardcode any backend URL in their React code**. 

Simply add your Pydah AI backend URL to the host application's own `.env` file:

### Vite Host Applications (`.env`):
```env
VITE_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com
```

### Create-React-App / Webpack Host Applications (`.env`):
```env
REACT_APP_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com
```

### Next.js Host Applications (`.env`):
```env
NEXT_PUBLIC_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com
```

---

## 4. Usage Examples in Host Applications

Import `<PydahAIChatUI />` and `pydah-ai-chat-ui/style.css`:

### Example 1: Student Dashboard Assistant

```jsx
import React from 'react';
import { PydahAIChatUI } from 'pydah-ai-chat-ui';
import 'pydah-ai-chat-ui/style.css';

export default function StudentAssistantPage() {
  // Zero hardcoding! Automatically detects VITE_PYDAH_AI_API_URL from host .env
  return (
    <div className="h-screen w-full">
      <PydahAIChatUI
        title="Pydah Student Assistant"
        welcomeMessage="Ask questions about your courses, campus schedule, and studies."
      />
    </div>
  );
}
```

---

### Example 2: Fee Assistant Application

```jsx
import React from 'react';
import { PydahAIChatUI } from 'pydah-ai-chat-ui';
import 'pydah-ai-chat-ui/style.css';

export default function FeeAssistantPage() {
  return (
    <div className="h-screen w-full">
      <PydahAIChatUI
        title="Pydah Fee Assistant"
        welcomeMessage="Ask questions about fee structure, payment schedules, and receipts."
      />
    </div>
  );
}
```

---

## 5. Component Props Reference

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Pydah AI Assistant"` | Assistant title displayed in the header. |
| `welcomeMessage` | `string` | `"How can I help you today?"` | Welcome heading displayed on empty chat state. |
| `apiBaseUrl` | `string` | Auto-detected from host `.env` | (Optional override) Manually specifies backend API URL. |
| `suggestedPrompts` | `Array` | `[...]` | Array of prompt card objects `[{ title, desc, prompt }]`. |

---

## 6. Development & Building

### Run Standalone Demo Server
```bash
npm run dev
```

### Build Production Library Bundles
```bash
npm run build
```

Generates production library bundles in `dist/`:
* `dist/index.es.js`
* `dist/index.umd.js`
* `dist/style.css`
