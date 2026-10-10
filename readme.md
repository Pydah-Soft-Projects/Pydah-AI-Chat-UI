# Pydah AI Chat UI - Reusable Component Library & Web Widget

A modern, responsive, reusable AI chat interface for the **Pydah AI** backend platform.

Supports **React Component Package Imports** and **Hosted CDN Script Embeds** across all frontend frameworks and web applications.

* **Live Web Preview:** [https://pydah-ai.netlify.app/](https://pydah-ai.netlify.app/)
* **Hosted CDN Script:** `https://pydah-ai.netlify.app/index.umd.js`
* **Hosted CDN Stylesheet:** `https://pydah-ai.netlify.app/style.css`
* **Live Production AI Backend URL:** `https://pydah-ai-api.onrender.com`

---

## ⚙️ 1. How Backend API URLs & Assistant Personas Are Configured

| Integration Method | Needs `.env` File? | Default Fallback Backend URL | Assistant ID Persona Config |
| :--- | :---: | :--- | :--- |
| **React Package Import** | **YES** | Host app's `.env` file (`VITE_PYDAH_AI_API_URL=...`) | Pass `assistantId="student-assistant"` prop |
| **CDN Script Embed** | **NO** | Auto-defaults to backend URL | Set `window.PYDAH_AI_ASSISTANT_ID = "student-assistant"` |

### Available Assistant Personas (`assistantId`):
- `student-assistant`: Handles student profile details, attendance records, and academic grade reports.
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
  const userToken = localStorage.getItem("user_token");

  return (
    <div>
      {/* Floating Bottom-Right Chat Widget with Student Assistant */}
      <PydahAIChatWidget 
        assistantId="student-assistant"
        authToken={userToken}
        title="Pydah Student Assistant" 
        welcomeMessage="How can I help you today with your profile, attendance, or grades?" 
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
  const userToken = localStorage.getItem("user_token");

  return (
    <div className="h-screen w-full">
      <PydahAIChatPage 
        assistantId="student-assistant"
        authToken={userToken}
        title="Pydah Student Assistant" 
        welcomeMessage="Ask questions about your courses, attendance, and schedule." 
      />
    </div>
  );
}
```

---

## 🌐 3. Integration Method 2: Hosted CDN Script Embeds (NO `.env` File Required)

CDN script embeds automatically default to the live production backend: `https://pydah-ai-api.onrender.com`. No `.env` setup or React build tools are required!

### A. HTML / Vanilla JS / PHP / Laravel / ASP.NET / Django
Add these lines inside your layout's `<head>` or before `</body>`:

```html
<!-- Optional Global Configuration Override -->
<script>
  window.PYDAH_AI_API_URL = "https://pydah-ai-api.onrender.com";
  window.PYDAH_AI_ASSISTANT_ID = "student-assistant"; // Persona identifier
  window.PYDAH_AI_AUTH_TOKEN = "YOUR_USER_BEARER_TOKEN";
</script>

<!-- Pydah AI Floating Chat Widget Styles & Script -->
<link rel="stylesheet" href="https://pydah-ai.netlify.app/style.css" />
<script src="https://pydah-ai.netlify.app/index.umd.js" async></script>
```

---

### B. React Apps via Dynamic Loader Component (`useEffect`)

To guarantee zero React version mismatch errors and prevent duplicate floating widget auto-mounts when dynamically injecting UMD scripts inside host React applications:

```jsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function PydahAiChat({
  mode = 'widget',
  assistantId = 'student-assistant',
  apiBaseUrl = 'http://localhost:8000',
  authToken = null,
  title = "Pydah Student Assistant",
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
      window.PYDAH_AI_DISABLE_AUTO_MOUNT = true;

      window.PYDAH_AI_API_URL = apiBaseUrl;
      window.PYDAH_AI_ASSISTANT_ID = assistantId;
      window.PYDAH_AI_TITLE = title;
      window.PYDAH_AI_WELCOME_MESSAGE = welcomeMessage;
      if (authToken) window.PYDAH_AI_AUTH_TOKEN = authToken;

      // Inject Stylesheet
      if (!document.getElementById('pydah-ai-style')) {
        const link = document.createElement('link');
        link.id = 'pydah-ai-style';
        link.rel = 'stylesheet';
        link.href = 'https://pydah-ai.netlify.app/style.css';
        document.head.appendChild(link);
      }

      // Inject Script
      if (!document.getElementById('pydah-ai-script')) {
        const script = document.createElement('script');
        script.id = 'pydah-ai-script';
        script.src = 'https://pydah-ai.netlify.app/index.umd.js';
        script.async = true;
        script.onload = () => setIsLoaded(true);
        document.body.appendChild(script);
      } else if (window.PydahAIChatUI) {
        setIsLoaded(true);
      }
    }
  }, [apiBaseUrl, assistantId, authToken, title, welcomeMessage]);

  if (!isLoaded || typeof window === 'undefined' || !window.PydahAIChatUI) {
    return null;
  }

  const UIModule = window.PydahAIChatUI;
  const Component = mode === 'embedded' 
    ? (UIModule.PydahAIChatPage || UIModule.default || UIModule)
    : (UIModule.PydahAIChatWidget || UIModule.default || UIModule);

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

## 🎨 4. Component Props & Exports Reference

| Export Name | Usage | Description |
| :--- | :--- | :--- |
| **`PydahAIChatWidget`** | `<PydahAIChatWidget mode="widget" />` | Floating bottom-right circular trigger button & popover chat window. |
| **`PydahAIChatPage`** | `<PydahAIChatPage mode="embedded" />` | Full-page embedded container layout. |

### Component Props Reference:

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'embedded' \| 'widget'` | `'embedded'` | Display style (full page vs floating widget). |
| `assistantId` | `string` | `"student-assistant"` | Assistant persona (`"student-assistant"`, `"fee-assistant"`, `"transport-assistant"`). |
| `authToken` | `string` | `null` | User's Bearer authentication token passed to tool calls. |
| `title` | `string` | `"Pydah Student Assistant"` | Assistant header title. |
| `welcomeMessage` | `string` | `"How can I help you today?"` | Welcome heading on empty chat screen. |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Floating button screen position. |
| `apiBaseUrl` | `string` | `https://pydah-ai-api.onrender.com` | (Optional override) Manually specifies backend URL. |

---

## 🛠️ 5. Development & Building

```bash
npm run dev     # Run local standalone demo server (http://localhost:3000)
npm run build   # Build production web preview & library bundle in dist/
```

---

## 🔗 6. Handling Links & External URLs Correctly

When integrating **Pydah AI Chat UI** into your applications or managing links within AI responses, follow these best practices:

### A. Dynamic Backend URLs (No Hardcoded Live URLs)
- Avoid hardcoding backend endpoints directly in source code.
- Always configure the backend API URL dynamically:
  - **React Package Import:** Use environment variables (`VITE_PYDAH_AI_API_URL` or `NEXT_PUBLIC_PYDAH_AI_API_URL`) or pass `apiBaseUrl` prop.
  - **CDN Script Embed:** Set `window.PYDAH_AI_API_URL = "https://your-backend.com"`.

### B. External Links in AI Responses & Markdown
- Any external links returned in assistant messages or rendered in markdown must use:
  ```html
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">Link Text</a>
  ```
- This ensures security against tabnabbing attacks (`rel="noopener noreferrer"`) and opens links in a new browser tab.
