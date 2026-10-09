import React from 'react';
import App from './App';
import './index.css';

/**
 * Reusable Pydah AI Chat UI Component for host applications.
 *
 * @param {Object} props
 * @param {string} [props.apiBaseUrl] - Custom backend API URL (overrides env var).
 * @param {string} [props.title] - Custom assistant title displayed in header.
 * @param {string} [props.welcomeMessage] - Custom welcome heading.
 * @param {Array} [props.suggestedPrompts] - Array of prompt objects [{title, desc, prompt}].
 */
export function PydahAIChatUI(props) {
  return <App {...props} />;
}

export default PydahAIChatUI;
