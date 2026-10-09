import React from 'react';
import App from './App';
import './index.css';
import { resolveApiUrl } from './services/chatApi';

/**
 * Main Flexible Pydah AI Chat Component.
 * Supports both embedded page layout and floating widget mode via `mode` prop.
 *
 * @param {Object} props
 * @param {'embedded' | 'widget'} [props.mode='embedded'] - Display mode.
 * @param {string} [props.apiBaseUrl] - Dynamic backend API URL.
 * @param {string} [props.title] - Custom assistant title.
 * @param {string} [props.welcomeMessage] - Custom welcome heading.
 * @param {Array} [props.suggestedPrompts] - Array of prompt cards [{title, desc, prompt}].
 * @param {'bottom-right' | 'bottom-left'} [props.position='bottom-right'] - Position for widget mode.
 */
export function PydahAIChatUI(props) {
  const resolvedApiUrl = resolveApiUrl(props.apiBaseUrl || props.apiUrl);
  return <App {...props} apiBaseUrl={resolvedApiUrl} />;
}

/**
 * Floating Widget Shortcut Component.
 * Renders a bottom-right floating trigger button and popup chat modal window.
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

export default PydahAIChatUI;
