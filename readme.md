# Pydah AI Chat UI - Reusable Component Library

A modern, responsive, reusable React + Vite + Tailwind CSS frontend interface library for the **Pydah AI** backend platform.

This package is designed as a **shared React component library** intended to be consumed across multiple PydahSoft applications (Student Dashboard, Fee Management, Transport, Hostel, HRMS, Admissions, etc.).

---

## 1. Features & Architecture

* **React 18 & Vite 5:** Library mode bundling producing ES Module (`dist/index.es.js`) and UMD (`dist/index.umd.js`) bundles.
* **Tailwind CSS Styling:** Includes scoped styles (`dist/style.css`) with PydahSoft brand accent green (`#3D6734`) and neutral surfaces (`#F1F1F1`).
* **Configurable Assistant Identity:** Pass custom titles, welcome headings, and suggested prompts per application without duplicating component code.
* **Decoupled API Client:** Connects to the Pydah AI backend API (`POST /api/v1/chat`) via configurable `apiBaseUrl` prop.

---

## 2. Installing in Other Applications

### Option A: Installing via Git Repository (Production Recommendation)

In your host application's `package.json` (e.g. Student Dashboard or Fee Management app), add the Git URL dependency:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "pydah-ai-chat-ui": "git+https://github.com/PydahSoft/pydah-ai-chat-ui.git"
  }
}
```

*For private Git repositories using SSH:*
```json
"pydah-ai-chat-ui": "git+ssh://git@github.com/PydahSoft/pydah-ai-chat-ui.git"
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

## 3. How to Use the Component in Host Applications

Import `<PydahAIChatUI />` and its CSS file `pydah-ai-chat-ui/style.css` inside your host application:

### Example 1: Student Dashboard Assistant

```jsx
import React from 'react';
import { PydahAIChatUI } from 'pydah-ai-chat-ui';
import 'pydah-ai-chat-ui/style.css';

export default function StudentAssistantPage() {
  return (
    <div className="h-screen w-full">
      <PydahAIChatUI
        title="Pydah Student Assistant"
        welcomeMessage="Ask questions about your courses, campus schedule, and studies."
        apiBaseUrl="http://localhost:8000"
        suggestedPrompts={[
          {
            title: "Course Topics",
            desc: "Understand complex subjects simply",
            prompt: "Explain binary search trees with an easy Python example."
          },
          {
            title: "Exam Revision Tips",
            desc: "Structured study tips",
            prompt: "What is an effective 3-day study schedule for computer science exams?"
          }
        ]}
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
        apiBaseUrl="http://localhost:8000"
        suggestedPrompts={[
          {
            title: "Payment Methods",
            desc: "Online portals and banking options",
            prompt: "What online payment methods are accepted for tuition fees?"
          },
          {
            title: "Receipt Verification",
            desc: "Download fee receipts",
            prompt: "How can I obtain an official receipt for my semester payment?"
          }
        ]}
      />
    </div>
  );
}
```

---

## 4. Component Props Reference

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Pydah AI Assistant"` | Assistant title displayed in the header. |
| `welcomeMessage` | `string` | `"How can I help you today?"` | Welcome heading displayed on empty chat state. |
| `apiBaseUrl` | `string` | `http://localhost:8000` | Central Pydah AI backend endpoint. |
| `suggestedPrompts` | `Array` | `[...]` | Array of prompt card objects `[{ title, desc, prompt }]`. |

---

## 5. Development & Standalone Demo

### Run Dev Demo Server
```bash
npm run dev
```

### Build Library Artifacts
```bash
npm run build
```

Generates production library bundles in `dist/`:
* `dist/index.es.js`
* `dist/index.umd.js`
* `dist/style.css`
