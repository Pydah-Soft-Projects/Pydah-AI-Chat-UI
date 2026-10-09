# Pydah AI Chat UI - Reusable Component Library

A modern, responsive, reusable React + Vite + Tailwind CSS frontend interface library for the **Pydah AI** backend platform.

This package provides **both Full-Page Embedded mode** and **Floating Bottom-Right Widget mode** for seamless integration into any PydahSoft application (Student Dashboard, Fee Management, Transport, Hostel, HRMS, Admissions, etc.).

---

## 1. Features & Dual Integration Modes

* **Floating Widget Mode (`<PydahAIChatWidget />` or `<PydahAIChatUI mode="widget" />`):**
  Renders a floating bottom-right trigger button. When clicked, opens a popover chat modal floating over existing page content.
* **Full-Page Embedded Mode (`<PydahAIChatPage />` or `<PydahAIChatUI mode="embedded" />`):**
  Renders as a full page or container layout.
* **Automatic Environment Auto-Detection:** Automatically detects backend URLs from `Vite`, `Next.js`, `Create-React-App`, or global `window`.

---

## 2. Installing in Host Applications

### Option A: Installing via Git Repository (Production Recommendation)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "pydah-ai-chat-ui": "git+https://github.com/Pydah-Soft-Projects/Pydah-AI-Chat-UI.git"
  }
}
```

Then run `npm install`.

---

## 3. Usage Modes

### Mode 1: Floating Widget Integration (Recommended for Dashboards)

Place `<PydahAIChatWidget />` anywhere in your host app layout. It floats at the bottom-right:

```jsx
import React from 'react';
import { PydahAIChatWidget } from 'pydah-ai-chat-ui';
import 'pydah-ai-chat-ui/style.css';

export default function AppLayout({ children }) {
  return (
    <div>
      <main>{children}</main>

      {/* Floating Bottom-Right Chat Widget */}
      <PydahAIChatWidget
        title="Pydah Student Assistant"
        welcomeMessage="How can I help you today?"
        position="bottom-right"
      />
    </div>
  );
}
```

---

### Mode 2: Full Page / Embedded Container Integration

Use `<PydahAIChatPage />` or `<PydahAIChatUI mode="embedded" />` to embed directly into a dedicated page:

```jsx
import React from 'react';
import { PydahAIChatPage } from 'pydah-ai-chat-ui';
import 'pydah-ai-chat-ui/style.css';

export default function DedicatedChatPage() {
  return (
    <div className="h-screen w-full">
      <PydahAIChatPage
        title="Pydah Student Assistant"
        welcomeMessage="Ask questions about your courses, campus schedule, and studies."
      />
    </div>
  );
}
```

---

## 4. Component Props Reference

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'embedded' \| 'widget'` | `'embedded'` | Choose between full container or floating widget. |
| `title` | `string` | `"Pydah AI Assistant"` | Assistant title displayed in header. |
| `welcomeMessage` | `string` | `"How can I help you today?"` | Welcome heading displayed on empty chat state. |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Floating widget button position. |
| `apiBaseUrl` | `string` | Auto-detected from host `.env` | (Optional) Manually overrides backend URL. |

---

## 5. Development & Building

```bash
npm run dev     # Run standalone demo
npm run build   # Build production library bundles in dist/
```
