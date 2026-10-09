# Pydah AI Chat UI - Reusable Component Library & Web Widget

A modern, responsive, reusable AI chat interface for the **Pydah AI** backend platform.

Supports **React Component Imports** and **Hosted CDN Script Embeds** across all frontend frameworks and web applications.

* **Live Web Preview:** [https://pydah-ai.netlify.app/](https://pydah-ai.netlify.app/)
* **Hosted CDN Script:** `https://pydah-ai.netlify.app/index.umd.js`
* **Hosted CDN Stylesheet:** `https://pydah-ai.netlify.app/style.css`

---

## 📦 1. Integration in React Applications

### Method A: Package Import (Recommended for React Apps)

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

#### Floating Widget Mode (Bottom-Right Trigger Button):
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

#### Full-Page / Embedded Container Mode:
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

### Method B: Script Tag Embed in React (`public/index.html`)

If you prefer zero-dependency script embedding in React, add these two lines to your `public/index.html`:

```html
<head>
  <link rel="stylesheet" href="https://pydah-ai.netlify.app/style.css" />
  <script src="https://pydah-ai.netlify.app/index.umd.js" async></script>
</head>
```

---

## 🌐 2. Integration in Other Web Frameworks

### A. Next.js (App Router & Pages Router)

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

### B. HTML / Vanilla JS / PHP / Laravel / ASP.NET / Django

Add to your main layout or HTML page before `</body>`:

```html
<!-- Pydah AI Floating Chat Widget -->
<link rel="stylesheet" href="https://pydah-ai.netlify.app/style.css" />
<script src="https://pydah-ai.netlify.app/index.umd.js" async></script>
```

---

### C. Vue.js / Nuxt

In `index.html` or `app.vue`:

```html
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (!document.getElementById('pydah-ai-style')) {
    const link = document.createElement('link');
    link.id = 'pydah-ai-style';
    link.rel = 'stylesheet';
    link.href = 'https://pydah-ai.netlify.app/style.css';
    document.head.appendChild(link);
  }

  if (!document.getElementById('pydah-ai-script')) {
    const script = document.createElement('script');
    script.id = 'pydah-ai-script';
    script.src = 'https://pydah-ai.netlify.app/index.umd.js';
    script.async = true;
    document.body.appendChild(script);
  }
});
</script>
```

---

## ⚙️ 3. Dynamic Environment Variable Configuration

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

## 🎨 4. Component Props Reference

| Export Name | Usage | Description |
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

## 🛠️ 5. Development & Building

```bash
npm run dev     # Run local standalone demo server (http://localhost:3000)
npm run build   # Build production web preview & library bundle in dist/
```
