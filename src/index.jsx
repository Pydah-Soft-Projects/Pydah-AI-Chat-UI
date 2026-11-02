import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { resolveApiUrl } from './services/chatApi';

/**
 * Main Flexible Nemo AI Chat Component.
 * Supports both embedded page layout and floating widget mode via `mode` prop.
 */
export function NemoAIChatUI(props) {
  const resolvedApiUrl = resolveApiUrl(props.apiBaseUrl || props.apiUrl);
  return <App {...props} apiBaseUrl={resolvedApiUrl} />;
}

// Backward-compatible alias
export const PydahAIChatUI = NemoAIChatUI;

/**
 * Floating Widget Shortcut Component.
 */
export function NemoAIChatWidget(props) {
  return <NemoAIChatUI {...props} mode="widget" />;
}
export const PydahAIChatWidget = NemoAIChatWidget;

/**
 * Full Page / Embedded Container Shortcut Component.
 */
export function NemoAIChatPage(props) {
  return <NemoAIChatUI {...props} mode="embedded" />;
}
export const PydahAIChatPage = NemoAIChatPage;

// Global Window Mount Logic for CDN Script Embeds (<script src=".../index.umd.js"></script>)
if (typeof window !== 'undefined') {
  // Attach all component exports to window for max framework compatibility
  const exportsObj = NemoAIChatUI;
  exportsObj.NemoAIChatUI = NemoAIChatUI;
  exportsObj.NemoAIChatWidget = NemoAIChatWidget;
  exportsObj.NemoAIChatPage = NemoAIChatPage;
  exportsObj.PydahAIChatUI = NemoAIChatUI;
  exportsObj.PydahAIChatWidget = NemoAIChatWidget;
  exportsObj.PydahAIChatPage = NemoAIChatPage;
  exportsObj.default = NemoAIChatUI;

  window.NemoAIChatUI = exportsObj;
  window.NemoAIChatWidget = NemoAIChatWidget;
  window.NemoAIChatPage = NemoAIChatPage;
  window.PydahAIChatUI = exportsObj;
  window.PydahAIChatWidget = NemoAIChatWidget;
  window.PydahAIChatPage = NemoAIChatPage;

  const initCDNWidget = () => {
    // Skip auto mounting if explicitly disabled by host React loader component or window options
    if (
      window.NEMO_AI_DISABLE_AUTO_MOUNT === true ||
      window.PYDAH_AI_DISABLE_AUTO_MOUNT === true ||
      window.NEMO_AI_AUTO_MOUNT === false ||
      window.PYDAH_AI_AUTO_MOUNT === false ||
      window.NEMO_AI_AUTO_MOUNT === 'false' ||
      window.PYDAH_AI_AUTO_MOUNT === 'false' ||
      window.NEMO_AI_MODE === 'none' ||
      window.PYDAH_AI_MODE === 'none'
    ) {
      return;
    }

    // Avoid double mounting
    if (document.getElementById('nemo-ai-chat-root') || document.getElementById('pydah-ai-chat-root')) return;

    const mountContainer = document.createElement('div');
    mountContainer.id = 'nemo-ai-chat-root';
    mountContainer.className = 'nemo-ai-root';
    document.body.appendChild(mountContainer);

    const root = ReactDOM.createRoot(mountContainer);

    const renderWidget = () => {
      const apiBaseUrl = window.NEMO_AI_API_URL || window.PYDAH_AI_API_URL || window.NEMO_AI_API_BASE_URL || window.PYDAH_AI_API_BASE_URL || window.VITE_NEMO_AI_API_URL || window.VITE_PYDAH_AI_API_URL || null;
      const assistantId = window.NEMO_AI_ASSISTANT_ID || window.PYDAH_AI_ASSISTANT_ID || window.NEMO_AI_PERSONA || window.PYDAH_AI_PERSONA || 'portal-assistant';
      const authToken = window.NEMO_AI_AUTH_TOKEN || window.PYDAH_AI_AUTH_TOKEN || null;
      const title = window.NEMO_AI_TITLE || window.PYDAH_AI_TITLE || window.NEMO_AI_HEADER_TITLE || window.PYDAH_AI_HEADER_TITLE || null;
      const welcomeMessage = window.NEMO_AI_WELCOME_MESSAGE || window.PYDAH_AI_WELCOME_MESSAGE || null;
      const position = window.NEMO_AI_POSITION || window.PYDAH_AI_POSITION || 'bottom-right';
      const mode = window.NEMO_AI_MODE || window.PYDAH_AI_MODE || 'widget';

      const Component = mode === 'embedded' ? NemoAIChatPage : NemoAIChatWidget;

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

export default NemoAIChatUI;
