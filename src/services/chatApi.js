/**
 * Dynamically resolve the backend API URL.
 * Resolves in order:
 * 1. React component prop override (`apiBaseUrl`)
 * 2. Window global override (`window.PYDAH_AI_API_URL`)
 * 3. Environment variables (Vite / Host App .env)
 * 4. Default fallback: http://localhost:8000
 */
export function resolveApiUrl(propUrl = null) {
  if (propUrl && typeof propUrl === 'string' && propUrl.trim() !== '') {
    return propUrl.trim();
  }

  // 1. Check Window Global Override at request execution time
  if (typeof window !== 'undefined' && window.PYDAH_AI_API_URL && typeof window.PYDAH_AI_API_URL === 'string' && window.PYDAH_AI_API_URL.trim() !== '') {
    return window.PYDAH_AI_API_URL.trim();
  }

  // 2. Host Application Environment Variables
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      if (import.meta.env.VITE_PYDAH_AI_API_URL) return import.meta.env.VITE_PYDAH_AI_API_URL;
      if (import.meta.env.PYDAH_AI_API_URL) return import.meta.env.PYDAH_AI_API_URL;
    }
  } catch (e) {}

  try {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.VITE_PYDAH_AI_API_URL) return process.env.VITE_PYDAH_AI_API_URL;
      if (process.env.REACT_APP_PYDAH_AI_API_URL) return process.env.REACT_APP_PYDAH_AI_API_URL;
      if (process.env.NEXT_PUBLIC_PYDAH_AI_API_URL) return process.env.NEXT_PUBLIC_PYDAH_AI_API_URL;
      if (process.env.PYDAH_AI_API_URL) return process.env.PYDAH_AI_API_URL;
    }
  } catch (e) {}

  return 'http://localhost:8000';
}

export async function sendChatMessage({
  message,
  history = [],
  conversationId = null,
  assistantId = 'general-assistant',
  authToken = null,
  apiBaseUrl = null
}) {
  // Dynamically resolve base URL right before sending request
  const baseUrl = resolveApiUrl(apiBaseUrl);
  const endpoint = `${baseUrl.replace(/\/$/, '')}/api/v1/chat`;

  const formattedHistory = history
    .filter(msg => msg.role === 'user' || msg.role === 'assistant')
    .map(msg => ({
      role: msg.role,
      content: msg.content
    }));

  const payload = {
    message,
    assistant_id: assistantId,
    conversation_id: conversationId,
    history: formattedHistory,
    user_token: authToken
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.details || data.error || `Server error (${response.status})`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out after 30 seconds. Please check backend status and try again.');
    }
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to Pydah AI backend service at ' + baseUrl + '. Please verify the backend URL.');
    }
    throw error;
  }
}
