# Nemo AI Chat UI - Reusable Component Library & Web Widget

A modern, responsive, reusable AI chat interface for the **Nemo AI** backend platform.

Supports **React Component Package Imports** and **Hosted CDN Script Embeds** across all frontend frameworks and web applications.

* **Live Web Preview:** [https://nemo-chat.pydah.edu.in](https://nemo-chat.pydah.edu.in)
* **Hosted CDN Script:** `https://nemo-chat.pydah.edu.in/index.umd.js`
* **Hosted CDN Stylesheet:** `https://nemo-chat.pydah.edu.in/style.css`
* **Live Production AI Backend URL:** `https://nemo-ai.pydah.edu.in`

---

## ⚙️ 1. How Backend API URLs & Assistant Personas Are Configured

| Integration Method | Needs `.env` File? | Default Fallback Backend URL | Assistant ID Persona Config |
| :--- | :---: | :--- | :--- |
| **React Package Import** | **YES** | Host app's `.env` file (`VITE_NEMO_AI_API_URL=...`) | Pass `assistantId="portal-assistant"` prop |
| **CDN Script Embed** | **NO** | Auto-defaults to backend URL | Set `window.NEMO_AI_ASSISTANT_ID = "portal-assistant"` |

### Available Assistant Personas (`assistantId`):
- `portal-assistant` / `student-assistant`: Handles user/student profile details, attendance records, academic grade reports, and class timetable/schedule.
- `fee-assistant`: Handles fee summaries, tuition breakdown, and itemized pending dues.
- `transport-assistant`: Handles bus allocation, driver contacts, and route schedules.
- `general-assistant`: General institution guidance and default responses.

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
VITE_NEMO_AI_API_URL=https://nemo-ai.pydah.edu.in

# Create-React-App / Webpack Host Apps (.env)
REACT_APP_NEMO_AI_API_URL=https://nemo-ai.pydah.edu.in

# Next.js Host Apps (.env)
NEXT_PUBLIC_NEMO_AI_API_URL=https://nemo-ai.pydah.edu.in
```

### Floating Widget Mode (Bottom-Right Trigger Button):
```jsx
import React from 'react';
import { NemoAIChatWidget } from 'pydah-ai-chat-ui';
import 'pydah-ai-chat-ui/style.css';

export default function App() {
  const userToken = localStorage.getItem("user_token");

  return (
    <div>
      {/* Floating Bottom-Right Chat Widget with Nemo Assistant */}
      <NemoAIChatWidget 
        assistantId="portal-assistant"
        authToken={userToken}
        serviceUrl="https://student-api.mycollege.edu"
        title="Nemo" 
        welcomeMessage="How can I help you today?" 
      />
    </div>
  );
}
```

### Full-Page / Embedded Container Mode:
```jsx
import React from 'react';
import { NemoAIChatPage } from 'pydah-ai-chat-ui';
import 'pydah-ai-chat-ui/style.css';

export default function DedicatedChatPage() {
  const userToken = localStorage.getItem("user_token");

  return (
    <div className="h-screen w-full">
      <NemoAIChatPage 
        assistantId="portal-assistant"
        authToken={userToken}
        serviceUrl="https://student-api.mycollege.edu"
        title="Nemo" 
        welcomeMessage="How can I help you today?" 
      />
    </div>
  );
}
```

### ⚡ Next.js Integration (App Router & Pages Router):

Because chat interfaces rely on browser APIs (`window`, `localStorage`, `document`), always use **`next/dynamic`** with **`ssr: false`** (or add `'use client'` in Next.js 13+ App Router) to prevent server-side hydration errors:

```jsx
'use client'; // Required if using Next.js 13+ App Router (app/ directory)

import React from 'react';
import dynamic from 'next/dynamic';
import 'pydah-ai-chat-ui/style.css';

// Dynamically load with SSR disabled
const NemoAIChatWidget = dynamic(
  () => import('pydah-ai-chat-ui').then((mod) => mod.NemoAIChatWidget),
  { ssr: false }
);

export default function NextChatLayout({ children }) {
  const userToken = typeof window !== 'undefined' ? localStorage.getItem("jwt_token") : null;

  return (
    <>
      {children}

      <NemoAIChatWidget
        apiBaseUrl={process.env.NEXT_PUBLIC_NEMO_AI_API_URL || "https://nemo-ai.pydah.edu.in"}
        serviceUrl={process.env.NEXT_PUBLIC_PORTAL_BACKEND_URL || "https://student-api.mycollege.edu"}
        assistantId="portal-assistant"
        authToken={userToken}
        title="Nemo"
        welcomeMessage="How can I help you today?"
        position="bottom-right"
      />
    </>
  );
}
```

---

## 🌐 3. Integration Method 2: Hosted CDN Script Embeds (NO `.env` File Required)

CDN script embeds automatically default to the live production backend: `https://nemo-ai.pydah.edu.in`. No `.env` setup or React build tools are required!

### A. HTML / Vanilla JS / PHP / Laravel / ASP.NET / Django
Add these lines inside your layout's `<head>` or before `</body>`:

```html
<!-- Optional Global Configuration Override -->
<script>
  window.NEMO_AI_API_URL = "https://nemo-ai.pydah.edu.in";
  window.NEMO_AI_SERVICE_URL = "https://student-api.mycollege.edu"; // Dynamic Portal Backend
  window.NEMO_AI_ASSISTANT_ID = "portal-assistant"; // Persona identifier
  window.NEMO_AI_AUTH_TOKEN = "YOUR_USER_BEARER_TOKEN";
</script>

<!-- Nemo AI Floating Chat Widget Styles & Script -->
<link rel="stylesheet" href="https://nemo-chat.pydah.edu.in/style.css" />
<script src="https://nemo-chat.pydah.edu.in/index.umd.js" async></script>
```

---

### B. React Apps via Dynamic Loader Component (`useEffect`)

To guarantee zero React version mismatch errors and prevent duplicate floating widget auto-mounts when dynamically injecting UMD scripts inside host React applications:

```jsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function NemoAiChat({
  mode = 'widget',
  assistantId = 'portal-assistant',
  apiBaseUrl = 'http://localhost:8000',
  authToken = null,
  title = "Nemo",
  welcomeMessage = "How can I help you today?",
  position = 'bottom-right',
  ...restProps
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Expose React & ReactDOM globally BEFORE UMD bundle executes to prevent React hook errors
      window.React = React;
      window.ReactDOM = ReactDOM;

      // Disable auto-mounting to prevent duplicate floating widgets on document.body
      window.NEMO_AI_DISABLE_AUTO_MOUNT = true;

      window.NEMO_AI_API_URL = apiBaseUrl;
      window.NEMO_AI_ASSISTANT_ID = assistantId;
      window.NEMO_AI_TITLE = title;
      window.NEMO_AI_WELCOME_MESSAGE = welcomeMessage;
      if (authToken) window.NEMO_AI_AUTH_TOKEN = authToken;

      // Inject Stylesheet
      if (!document.getElementById('nemo-ai-style')) {
        const link = document.createElement('link');
        link.id = 'nemo-ai-style';
        link.rel = 'stylesheet';
        link.href = 'https://nemo-chat.pydah.edu.in/style.css';
        document.head.appendChild(link);
      }

      // Inject Script
      if (!document.getElementById('nemo-ai-script')) {
        const script = document.createElement('script');
        script.id = 'nemo-ai-script';
        script.src = 'https://nemo-chat.pydah.edu.in/index.umd.js';
        script.async = true;
        script.onload = () => setIsLoaded(true);
        document.body.appendChild(script);
      } else if (window.NemoAIChatUI || window.PydahAIChatUI) {
        setIsLoaded(true);
      }
    }
  }, [apiBaseUrl, assistantId, authToken, title, welcomeMessage]);

  if (!isLoaded || typeof window === 'undefined' || !(window.NemoAIChatUI || window.PydahAIChatUI)) {
    return null;
  }

  const UIModule = window.NemoAIChatUI || window.PydahAIChatUI;
  const Component = mode === 'embedded' 
    ? (UIModule.NemoAIChatPage || UIModule.PydahAIChatPage || UIModule.default || UIModule)
    : (UIModule.NemoAIChatWidget || UIModule.PydahAIChatWidget || UIModule.default || UIModule);

  if (!Component) return null;

  return (
    <Component 
      mode={mode} 
      assistantId={assistantId} 
      authToken={authToken} 
      apiBaseUrl={apiBaseUrl}
      title={title}
      welcomeMessage={welcomeMessage}
      position={position}
      {...restProps} 
    />
  );
}
```

---

### C. Next.js Apps via `next/script` (Root Layout or Custom Document)

You can also use Next.js's native `<Script>` component inside `app/layout.jsx` (Next.js 13/14/15) or `pages/_app.jsx`:

```jsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Hosted CDN Stylesheet */}
        <link rel="stylesheet" href="https://nemo-chat.pydah.edu.in/style.css" />
      </head>
      <body>
        {children}

        {/* Global Configuration Script */}
        <Script id="nemo-ai-config" strategy="beforeInteractive">
          {`
            window.NEMO_AI_API_URL = "https://nemo-ai.pydah.edu.in";
            window.NEMO_AI_SERVICE_URL = "https://student-api.mycollege.edu";
            window.NEMO_AI_ASSISTANT_ID = "portal-assistant";
            window.NEMO_AI_TITLE = "Nemo";
            window.NEMO_AI_MODE = "widget";
          `}
        </Script>

        {/* Hosted CDN Script Bundle */}
        <Script
          src="https://nemo-chat.pydah.edu.in/index.umd.js"
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
| **`NemoAIChatWidget`** (or `PydahAIChatWidget`) | `<NemoAIChatWidget mode="widget" />` | Floating bottom-right circular trigger button & popover chat window. |
| **`NemoAIChatPage`** (or `PydahAIChatPage`) | `<NemoAIChatPage mode="embedded" />` | Full-page embedded container layout. |

### Component Props Reference:

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'embedded' \| 'widget'` | `'embedded'` | Display style (full page vs floating widget). |
| `assistantId` | `string` | `"portal-assistant"` | Assistant persona (`"portal-assistant"`, `"student-assistant"`, `"fee-assistant"`, `"transport-assistant"`). |
| `authToken` | `string` | `null` | User's Bearer authentication token passed to tool calls. |
| `title` | `string` | `"Nemo"` | Assistant header title. |
| `welcomeMessage` | `string` | `"How can I help you today?"` | Welcome heading on empty chat screen. |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Floating button screen position. |
| `apiBaseUrl` | `string` | `https://nemo-ai.pydah.edu.in` | (Optional override) Nemo AI Core Engine URL. |
| `serviceUrl` | `string` | `null` | **Dynamic Portal Backend URL:** The host portal's own backend API for tool dispatch (e.g. `https://api.mycollege.edu`). |

---

## 🛠️ 5. Development & Building

```bash
npm run dev     # Run local standalone demo server (http://localhost:3000)
npm run build   # Build production web preview & library bundle in dist/
```

---

## 🔗 6. Handling Links & External URLs Correctly

When integrating **Nemo AI Chat UI** into your applications or managing links within AI responses, follow these best practices:

### A. Dynamic Backend URLs (No Hardcoded Live URLs)
- Avoid hardcoding backend endpoints directly in source code.
- Always configure the backend API URL dynamically:
  - **React Package Import:** Use environment variables (`VITE_NEMO_AI_API_URL` or `NEXT_PUBLIC_NEMO_AI_API_URL`) or pass `apiBaseUrl` prop.
  - **CDN Script Embed:** Set `window.NEMO_AI_API_URL = "https://your-backend.com"`.

### B. External Links in AI Responses & Markdown
- Any external links returned in assistant messages or rendered in markdown must use:
  ```html
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">Link Text</a>
  ```
- This ensures security against tabnabbing attacks (`rel="noopener noreferrer"`) and opens links in a new browser tab.
