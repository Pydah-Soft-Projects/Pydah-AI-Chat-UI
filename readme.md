# Pydah AI Chat UI - Reusable Component & Netlify CDN Web Widget

A modern, responsive, reusable AI chat interface for the **Pydah AI** backend platform.

Supports **React Component Imports** and **Instant Netlify CDN Script Embeds** across all frontend frameworks and technologies.

Live Hosted Netlify CDN: **https://pydah-ai.netlify.app/**

---

## 🚀 1. Instant CDN Embed (Zero Host App Updates)

When hosted on **Netlify** (`https://pydah-ai.netlify.app/`), host applications across **ANY technology** get instant, automated UI updates without needing to rebuild or reinstall packages!

### A. HTML / Vanilla JS / PHP / Laravel / ASP.NET / Django
Add these two lines inside your layout's `<head>` or before `</body>`:

```html
<!-- Pydah AI Floating Chat Widget Styles & Script -->
<link rel="stylesheet" href="https://pydah-ai.netlify.app/dist/style.css" />
<script src="https://pydah-ai.netlify.app/dist/index.umd.js" async></script>
```

---

### B. React (Vite / Create-React-App)

#### Option 1: Git Package Dependency
In `package.json`:
```json
"dependencies": {
  "pydah-ai-chat-ui": "git+https://github.com/Pydah-Soft-Projects/Pydah-AI-Chat-UI.git"
}
```

In your React App:
```jsx
import React from 'react';
import { PydahAIChatWidget } from 'pydah-ai-chat-ui';
import 'pydah-ai-chat-ui/style.css';

export default function App() {
  return (
    <div>
      {/* Floating Bottom-Right Chat Widget */}
      <PydahAIChatWidget title="Pydah Student Assistant" />
    </div>
  );
}
```

---

### C. Next.js (App Router & Pages Router)

In your `app/layout.jsx` or `pages/_app.jsx`:

```jsx
'use client';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://pydah-ai.netlify.app/dist/style.css" />
      </head>
      <body>
        {children}
        {/* Instant Netlify CDN Widget Script */}
        <Script 
          src="https://pydah-ai.netlify.app/dist/index.umd.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}
```

---

### D. Vue.js / Nuxt

In `index.html` or `app.vue`:

```html
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (!document.getElementById('pydah-ai-style')) {
    const link = document.createElement('link');
    link.id = 'pydah-ai-style';
    link.rel = 'stylesheet';
    link.href = 'https://pydah-ai.netlify.app/dist/style.css';
    document.head.appendChild(link);
  }

  if (!document.getElementById('pydah-ai-script')) {
    const script = document.createElement('script');
    script.id = 'pydah-ai-script';
    script.src = 'https://pydah-ai.netlify.app/dist/index.umd.js';
    script.async = true;
    document.body.appendChild(script);
  }
});
</script>
```

---

### E. Angular

Add CDN script and style references to `angular.json` or `src/index.html`:

```html
<!-- src/index.html -->
<link rel="stylesheet" href="https://pydah-ai.netlify.app/dist/style.css">
<script src="https://pydah-ai.netlify.app/dist/index.umd.js" async></script>
```

---

## ⚙️ 2. Dynamic Environment Variable Configuration

Host applications **do not need to hardcode any backend API URL in code**. 

Simply add your Pydah AI backend URL to the host application's `.env` file:

```env
# Vite Host Apps
VITE_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com

# Create-React-App / Webpack Host Apps
REACT_APP_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com

# Next.js Host Apps
NEXT_PUBLIC_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com
```

---

## 🎨 3. Integration Modes & Component Props

| Mode | Usage | Description |
| :--- | :--- | :--- |
| **`PydahAIChatWidget`** | `<PydahAIChatWidget mode="widget" />` | Floating bottom-right circular trigger button & popup popover window. |
| **`PydahAIChatPage`** | `<PydahAIChatPage mode="embedded" />` | Full-page embedded container layout. |

### Component Props Reference:

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'embedded' \| 'widget'` | `'embedded'` | Display style (full page vs floating widget). |
| `title` | `string` | `"Pydah AI Assistant"` | Assistant header title. |
| `welcomeMessage` | `string` | `"How can I help you today?"` | Welcome heading on empty chat screen. |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Floating button screen position. |
| `apiBaseUrl` | `string` | Auto-detected from `.env` | (Optional override) Manually specifies backend URL. |

---

## 🛠️ 4. Local Development & Netlify Build

```bash
npm run dev     # Run local standalone demo server (http://localhost:3000)
npm run build   # Build Netlify / Production library bundle in dist/
```
