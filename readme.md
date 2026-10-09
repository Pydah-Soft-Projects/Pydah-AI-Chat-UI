# Pydah AI Chat UI - Reusable Component Library & Web Widget

A modern, responsive, reusable AI chat interface for the **Pydah AI** backend platform.

Supports **React Component Package Imports** and **Hosted CDN Script Embeds** across all frontend frameworks and web applications.

* **Live Web Preview:** [https://pydah-ai.netlify.app/](https://pydah-ai.netlify.app/)
* **Hosted CDN Script:** `https://pydah-ai.netlify.app/index.umd.js`
* **Hosted CDN Stylesheet:** `https://pydah-ai.netlify.app/style.css`

---

## ⚙️ 1. How Backend API URLs Are Configured

| Integration Method | Needs `.env` File? | How Host App Configures Backend API URL |
| :--- | :---: | :--- |
| **React Package Import** | **YES** | Host app's `.env` file (`VITE_PYDAH_AI_API_URL=https://...`) |
| **CDN Script Embed** | **NO** | Set `window.PYDAH_AI_API_URL = "https://..."` in JavaScript |

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

### Host Application `.env` Setup (No Hardcoded URLs in React Code):
```env
# Vite Host Apps (.env)
VITE_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com

# Create-React-App / Webpack Host Apps (.env)
REACT_APP_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com

# Next.js Host Apps (.env)
NEXT_PUBLIC_PYDAH_AI_API_URL=https://your-pydah-ai-backend.onrender.com
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

Using CDN script embeds in React / Next.js / HTML gives your host application **instant live UI updates** without needing `npm install` or `npm update`!

To specify your backend API URL, set `window.PYDAH_AI_API_URL = "https://your-pydah-ai-backend.onrender.com";`.

### A. HTML / Vanilla JS / PHP / Laravel / ASP.NET / Django

```html
<script>
  window.PYDAH_AI_API_URL = "https://your-pydah-ai-backend.onrender.com";
</script>
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

    <script>
      window.PYDAH_AI_API_URL = "https://your-pydah-ai-backend.onrender.com";
    </script>
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
    // 1. Set Backend API URL
    window.PYDAH_AI_API_URL = "https://your-pydah-ai-backend.onrender.com";

    // 2. Inject Stylesheet
    if (!document.getElementById('pydah-ai-style')) {
      const link = document.createElement('link');
      link.id = 'pydah-ai-style';
      link.rel = 'stylesheet';
      link.href = 'https://pydah-ai.netlify.app/style.css';
      document.head.appendChild(link);
    }

    // 3. Inject Widget Script
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
        <script
          dangerouslySetInnerHTML={{
            __html: 'window.PYDAH_AI_API_URL = "https://your-pydah-ai-backend.onrender.com";',
          }}
        />
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
| `apiBaseUrl` | `string` | Auto-detected from `.env` or `window` | (Optional override) Manually specifies backend URL. |

---

## 🛠️ 5. Development & Building

```bash
npm run dev     # Run local standalone demo server (http://localhost:3000)
npm run build   # Build production web preview & library bundle in dist/
```
