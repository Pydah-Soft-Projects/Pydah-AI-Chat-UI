# Pydah AI Chat UI - Reusable Component Library & Web Widget

A modern, responsive, reusable AI chat interface for the **Pydah AI** backend platform.

Supports **React Component Package Imports** and **Hosted CDN Script Embeds** across all frontend frameworks and web applications.

* **Live Web Preview:** [https://pydah-ai.netlify.app/](https://pydah-ai.netlify.app/)
* **Hosted CDN Script:** `https://pydah-ai.netlify.app/index.umd.js`
* **Hosted CDN Stylesheet:** `https://pydah-ai.netlify.app/style.css`
* **Live Production AI Backend URL:** `https://pydah-ai-api.onrender.com`

---

## ⚙️ 1. How Backend API URLs Are Configured

| Integration Method | Needs `.env` File? | Default Fallback Backend URL |
| :--- | :---: | :--- |
| **React Package Import** | **YES** | Host app's `.env` file (`VITE_PYDAH_AI_API_URL=https://pydah-ai-api.onrender.com`) |
| **CDN Script Embed** | **NO** | Auto-defaults to `https://pydah-ai-api.onrender.com` (or set `window.PYDAH_AI_API_URL`) |

---

## 📦 2. Integration Method 1: React Package Imports

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

Then run `npm install`.

### Host Application `.env` Setup (Optional Override):
```env
# Vite Host Apps (.env)
VITE_PYDAH_AI_API_URL=https://pydah-ai-api.onrender.com

# Create-React-App / Webpack Host Apps (.env)
REACT_APP_PYDAH_AI_API_URL=https://pydah-ai-api.onrender.com

# Next.js Host Apps (.env)
NEXT_PUBLIC_PYDAH_AI_API_URL=https://pydah-ai-api.onrender.com
```

### Floating Widget Mode (Bottom-Right Trigger Button):
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

### Full-Page / Embedded Container Mode:
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

## 🌐 3. Integration Method 2: Hosted CDN Script Embeds (NO `.env` File Required)

CDN script embeds automatically default to the live production backend: `https://pydah-ai-api.onrender.com`. No `.env` setup or React build tools are required!

### A. HTML / Vanilla JS / PHP / Laravel / ASP.NET / Django
Add these two lines inside your layout's `<head>` or before `</body>`:

```html
<!-- Pydah AI Floating Chat Widget Styles & Script -->
<link rel="stylesheet" href="https://pydah-ai.netlify.app/style.css" />
<script src="https://pydah-ai.netlify.app/index.umd.js" async></script>
```

---

### B. React Apps via `public/index.html` (Vite / Create-React-App)

In your React app's `public/index.html` (or `index.html`):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Student Dashboard</title>

    <link rel="stylesheet" href="https://pydah-ai.netlify.app/style.css" />
    <script src="https://pydah-ai.netlify.app/index.umd.js" async></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

### C. React Apps via Dynamic Loader Component (`useEffect`)

```jsx
import React, { useEffect } from 'react';

export default function StudentDashboardLayout({ children }) {
  useEffect(() => {
    // 1. Inject Stylesheet
    if (!document.getElementById('pydah-ai-style')) {
      const link = document.createElement('link');
      link.id = 'pydah-ai-style';
      link.rel = 'stylesheet';
      link.href = 'https://pydah-ai.netlify.app/style.css';
      document.head.appendChild(link);
    }

    // 2. Inject Widget Script
    if (!document.getElementById('pydah-ai-script')) {
      const script = document.createElement('script');
      script.id = 'pydah-ai-script';
      script.src = 'https://pydah-ai.netlify.app/index.umd.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <div>{children}</div>;
}
```

---

### D. Next.js React Apps (`<Script />` Component)

In your `app/layout.jsx` or `pages/_app.jsx`:

```jsx
'use client';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://pydah-ai.netlify.app/style.css" />
      </head>
      <body>
        {children}
        {/* Instant Netlify CDN Widget Script */}
        <Script 
          src="https://pydah-ai.netlify.app/index.umd.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}
```

---

## 🎨 4. Component Props & Exports Reference

| Export Name | Usage | Description |
| :--- | :--- | :--- |
| **`PydahAIChatWidget`** | `<PydahAIChatWidget mode="widget" />` | Floating bottom-right circular trigger button & popover chat window. |
| **`PydahAIChatPage`** | `<PydahAIChatPage mode="embedded" />` | Full-page embedded container layout. |

### Component Props Reference:

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'embedded' \| 'widget'` | `'embedded'` | Display style (full page vs floating widget). |
| `title` | `string` | `"Pydah AI Assistant"` | Assistant header title. |
| `welcomeMessage` | `string` | `"How can I help you today?"` | Welcome heading on empty chat screen. |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Floating button screen position. |
| `apiBaseUrl` | `string` | `https://pydah-ai-api.onrender.com` | (Optional override) Manually specifies backend URL. |

---

## 🛠️ 5. Development & Building

```bash
npm run dev     # Run local standalone demo server (http://localhost:3000)
npm run build   # Build production web preview & library bundle in dist/
```
