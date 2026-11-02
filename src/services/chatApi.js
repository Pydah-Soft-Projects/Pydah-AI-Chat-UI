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
  if (typeof window !== 'undefined') {
    const winUrl = window.NEMO_AI_API_URL || window.PYDAH_AI_API_URL || window.NEMO_AI_API_BASE_URL || window.PYDAH_AI_API_BASE_URL || window.VITE_NEMO_AI_API_URL || window.VITE_PYDAH_AI_API_URL || window.NEMO_AI_URL || window.PYDAH_AI_URL;
    if (winUrl && typeof winUrl === 'string' && winUrl.trim() !== '') {
      return winUrl.trim();
    }
  }

  // 2. Host Application Environment Variables
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      if (import.meta.env.VITE_NEMO_AI_API_URL) return import.meta.env.VITE_NEMO_AI_API_URL;
      if (import.meta.env.NEMO_AI_API_URL) return import.meta.env.NEMO_AI_API_URL;
      if (import.meta.env.VITE_PYDAH_AI_API_URL) return import.meta.env.VITE_PYDAH_AI_API_URL;
      if (import.meta.env.PYDAH_AI_API_URL) return import.meta.env.PYDAH_AI_API_URL;
    }
  } catch (e) {}

  try {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.VITE_NEMO_AI_API_URL) return process.env.VITE_NEMO_AI_API_URL;
      if (process.env.REACT_APP_NEMO_AI_API_URL) return process.env.REACT_APP_NEMO_AI_API_URL;
      if (process.env.NEXT_PUBLIC_NEMO_AI_API_URL) return process.env.NEXT_PUBLIC_NEMO_AI_API_URL;
      if (process.env.NEMO_AI_API_URL) return process.env.NEMO_AI_API_URL;
      if (process.env.VITE_PYDAH_AI_API_URL) return process.env.VITE_PYDAH_AI_API_URL;
      if (process.env.REACT_APP_PYDAH_AI_API_URL) return process.env.REACT_APP_PYDAH_AI_API_URL;
      if (process.env.NEXT_PUBLIC_PYDAH_AI_API_URL) return process.env.NEXT_PUBLIC_PYDAH_AI_API_URL;
      if (process.env.PYDAH_AI_API_URL) return process.env.PYDAH_AI_API_URL;
    }
  } catch (e) {}

  return 'http://localhost:8000';
}

/**
 * Dynamically resolve the host application backend service URL (for tool dispatch).
 * Resolves in order:
 * 1. React component prop override (`serviceUrl` / `backendUrl` / `portalUrl`)
 * 2. Window global override (`window.NEMO_AI_SERVICE_URL`, `window.NEMO_SERVICE_URL`, etc.)
 * 3. Host application environment variables
 */
export function resolveServiceUrl(propUrl = null) {
  if (propUrl && typeof propUrl === 'string' && propUrl.trim() !== '') {
    return propUrl.trim().replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    const winUrl = (
      window.NEMO_AI_SERVICE_URL ||
      window.NEMO_SERVICE_URL ||
      window.PORTAL_BACKEND_URL ||
      window.APPLICATION_SERVICE_URL ||
      window.PYDAH_AI_SERVICE_URL
    );
    if (winUrl && typeof winUrl === 'string' && winUrl.trim() !== '') {
      return winUrl.trim().replace(/\/$/, '');
    }
  }

  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      if (import.meta.env.VITE_NEMO_AI_SERVICE_URL) return import.meta.env.VITE_NEMO_AI_SERVICE_URL;
      if (import.meta.env.VITE_APPLICATION_SERVICE_URL) return import.meta.env.VITE_APPLICATION_SERVICE_URL;
      if (import.meta.env.VITE_PYDAH_AI_SERVICE_URL) return import.meta.env.VITE_PYDAH_AI_SERVICE_URL;
    }
  } catch (e) {}

  try {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.VITE_NEMO_AI_SERVICE_URL) return process.env.VITE_NEMO_AI_SERVICE_URL;
      if (process.env.REACT_APP_NEMO_AI_SERVICE_URL) return process.env.REACT_APP_NEMO_AI_SERVICE_URL;
      if (process.env.NEXT_PUBLIC_NEMO_AI_SERVICE_URL) return process.env.NEXT_PUBLIC_NEMO_AI_SERVICE_URL;
      if (process.env.APPLICATION_SERVICE_URL) return process.env.APPLICATION_SERVICE_URL;
    }
  } catch (e) {}

  return null;
}

export async function sendChatMessage({
  message,
  history = [],
  conversationId = null,
  assistantId = 'general-assistant',
  authToken = null,
  apiBaseUrl = null,
  serviceUrl = null
}) {
  // Dynamically resolve base URL right before sending request
  const baseUrl = resolveApiUrl(apiBaseUrl);
  const endpoint = `${baseUrl.replace(/\/$/, '')}/api/v1/chat`;
  const resolvedServiceUrl = resolveServiceUrl(serviceUrl);

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

  if (resolvedServiceUrl) {
    payload.service_url = resolvedServiceUrl;
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  if (resolvedServiceUrl) {
    headers['X-Service-URL'] = resolvedServiceUrl;
    headers['X-Backend-URL'] = resolvedServiceUrl;
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
      throw new Error('Unable to connect to Nemo backend service at ' + baseUrl + '. Please verify the backend URL.');
    }
    throw error;
  }
}
