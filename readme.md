# Pydah AI Chat UI - Reusable React Component Library

A modern, responsive, reusable AI chat interface component library for the **Pydah AI** backend platform.

Designed as a **shared React component package** to be consumed across multiple PydahSoft applications (Student Dashboard, Fee Management, Transport, Hostel, HRMS, Admissions, etc.).

---

## 📦 1. Installation in Host Applications

Add the Git repository dependency to your React application's `package.json`:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "pydah-ai-chat-ui": "git+https://github.com/Pydah-Soft-Projects/Pydah-AI-Chat-UI.git"
  }
}
```

Then run:
```bash
npm install
```

---

## ⚙️ 2. Dynamic Environment Variable Configuration

Host applications **do not need to hardcode any backend API URL in React code**.

Simply add your Pydah AI backend URL to the host application's `.env` file:

```env
# Vite Host Apps (.env)
VITE_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com

# Create-React-App / Webpack Host Apps (.env)
REACT_APP_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com

# Next.js Host Apps (.env)
NEXT_PUBLIC_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com
```

---

## 🎨 3. Integration Usage Modes

### Mode A: Floating Widget (Bottom-Right Trigger Button)

Place `<PydahAIChatWidget />` in your layout. It floats at the bottom-right of the page:

```jsx
import React from 'react';
import { PydahAIChatWidget } from 'pydah-ai-chat-ui';
import 'pydah-ai-chat-ui/style.css';

export default function App() {
  return (
    <div>
      {/* Floating Bottom-Right Chat Widget */}
      <PydahAIChatWidget 
        title="Pydah Student Assistant" 
        welcomeMessage="How can I help you today?" 
      />
    </div>
  );
}
```

---

### Mode B: Full-Page / Embedded Container Layout

Use `<PydahAIChatPage />` to embed directly into a dedicated chat page:

```jsx
import React from 'react';
import { PydahAIChatPage } from 'pydah-ai-chat-ui';
import 'pydah-ai-chat-ui/style.css';

export default function DedicatedChatPage() {
  return (
    <div className="h-screen w-full">
      <PydahAIChatPage 
        title="Pydah Student Assistant" 
        welcomeMessage="Ask questions about your courses and schedule." 
      />
    </div>
  );
}
```

---

## 📋 4. Component Props Reference

| Component Export | Usage | Description |
| :--- | :--- | :--- |
| **`PydahAIChatWidget`** | `<PydahAIChatWidget mode="widget" />` | Floating bottom-right circular trigger button & popover chat window. |
| **`PydahAIChatPage`** | `<PydahAIChatPage mode="embedded" />` | Full-page embedded container layout. |

### Component Props:

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'embedded' \| 'widget'` | `'embedded'` | Display style (full page vs floating widget). |
| `title` | `string` | `"Pydah AI Assistant"` | Assistant header title. |
| `welcomeMessage` | `string` | `"How can I help you today?"` | Welcome heading on empty chat screen. |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Floating button screen position. |
| `apiBaseUrl` | `string` | Auto-detected from `.env` | (Optional override) Manually specifies backend URL. |

---

## 🛠️ 5. Local Development & Building

```bash
npm run dev     # Run local standalone demo server (http://localhost:3000)
npm run build   # Build production library bundle in dist/
```
