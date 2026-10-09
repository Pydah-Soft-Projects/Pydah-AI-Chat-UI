import React from 'react';
import App from './App';
import './index.css';
import { resolveApiUrl } from './services/chatApi';

/**
 * Reusable Pydah AI Chat UI Component for host applications.
 *
 * @param {Object} props
 * @param {string} [props.apiBaseUrl] - Dynamic backend API URL prop (optional).
 * @param {string} [props.title] - Custom assistant title displayed in header.
 * @param {string} [props.welcomeMessage] - Custom welcome heading.
 * @param {Array} [props.suggestedPrompts] - Array of prompt objects [{title, desc, prompt}].
 */
export function PydahAIChatUI(props) {
  const resolvedApiUrl = resolveApiUrl(props.apiBaseUrl || props.apiUrl);
  return <App {...props} apiBaseUrl={resolvedApiUrl} />;
}

export default PydahAIChatUI;
