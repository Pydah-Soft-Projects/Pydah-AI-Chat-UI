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
  window.PydahAIChatUI = PydahAIChatUI;
  window.PydahAIChatWidget = PydahAIChatWidget;
  window.PydahAIChatPage = PydahAIChatPage;

  const initCDNWidget = () => {
    // Avoid double mounting
    if (document.getElementById('pydah-ai-chat-root')) return;

    const mountContainer = document.createElement('div');
    mountContainer.id = 'pydah-ai-chat-root';
    document.body.appendChild(mountContainer);

    const root = ReactDOM.createRoot(mountContainer);

    const renderWidget = () => {
      const apiBaseUrl = window.PYDAH_AI_API_URL || null;
      const assistantId = window.PYDAH_AI_ASSISTANT_ID || 'general-assistant';
      const authToken = window.PYDAH_AI_AUTH_TOKEN || null;

      root.render(
        <PydahAIChatWidget
          apiBaseUrl={apiBaseUrl}
          assistantId={assistantId}
          authToken={authToken}
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
