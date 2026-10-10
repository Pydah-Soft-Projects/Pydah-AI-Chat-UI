import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { resolveApiUrl } from './services/chatApi';

/**
 * Main Flexible Pydah AI Chat Component.
 * Supports both embedded page layout and floating widget mode via `mode` prop.
 */
export function PydahAIChatUI(props) {
  const resolvedApiUrl = resolveApiUrl(props.apiBaseUrl || props.apiUrl);
  return <App {...props} apiBaseUrl={resolvedApiUrl} />;
}

/**
 * Floating Widget Shortcut Component.
 */
export function PydahAIChatWidget(props) {
  return <PydahAIChatUI {...props} mode="widget" />;
}

/**
 * Full Page / Embedded Container Shortcut Component.
 */
export function PydahAIChatPage(props) {
  return <PydahAIChatUI {...props} mode="embedded" />;
}

// Global Window Mount Logic for CDN Script Embeds (<script src=".../index.umd.js"></script>)
if (typeof window !== 'undefined') {
  // Attach all component exports to window.PydahAIChatUI for max framework compatibility
  const exportsObj = PydahAIChatUI;
  exportsObj.PydahAIChatUI = PydahAIChatUI;
  exportsObj.PydahAIChatWidget = PydahAIChatWidget;
  exportsObj.PydahAIChatPage = PydahAIChatPage;
  exportsObj.default = PydahAIChatUI;

  window.PydahAIChatUI = exportsObj;
  window.PydahAIChatWidget = PydahAIChatWidget;
  window.PydahAIChatPage = PydahAIChatPage;

  const initCDNWidget = () => {
    // Skip auto mounting if explicitly disabled by host React loader component or window options
    if (
      window.PYDAH_AI_DISABLE_AUTO_MOUNT === true ||
      window.PYDAH_AI_AUTO_MOUNT === false ||
      window.PYDAH_AI_AUTO_MOUNT === 'false' ||
      window.PYDAH_AI_MODE === 'none'
    ) {
      return;
    }

    // Avoid double mounting
    if (document.getElementById('pydah-ai-chat-root')) return;

    const mountContainer = document.createElement('div');
    mountContainer.id = 'pydah-ai-chat-root';
    mountContainer.className = 'pydah-ai-root';
    document.body.appendChild(mountContainer);

    const root = ReactDOM.createRoot(mountContainer);

    const renderWidget = () => {
      const apiBaseUrl = window.PYDAH_AI_API_URL || window.PYDAH_AI_API_BASE_URL || window.VITE_PYDAH_AI_API_URL || null;
      const assistantId = window.PYDAH_AI_ASSISTANT_ID || window.PYDAH_AI_PERSONA || 'student-assistant';
      const authToken = window.PYDAH_AI_AUTH_TOKEN || null;
      const title = window.PYDAH_AI_TITLE || window.PYDAH_AI_HEADER_TITLE || null;
      const welcomeMessage = window.PYDAH_AI_WELCOME_MESSAGE || null;
      const position = window.PYDAH_AI_POSITION || 'bottom-right';
      const mode = window.PYDAH_AI_MODE || 'widget';

      const Component = mode === 'embedded' ? PydahAIChatPage : PydahAIChatWidget;

      root.render(
        <Component
          apiBaseUrl={apiBaseUrl}
          assistantId={assistantId}
          authToken={authToken}
          title={title}
          welcomeMessage={welcomeMessage}
          position={position}
        />
      );
    };

    renderWidget();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCDNWidget);
  } else {
    initCDNWidget();
  }
}

export default PydahAIChatUI;
