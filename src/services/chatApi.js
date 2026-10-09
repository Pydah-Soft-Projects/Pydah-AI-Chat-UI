const API_BASE_URL = import.meta.env.VITE_PYDAH_AI_API_URL || 'http://localhost:8000';

/**
 * Send chat message request to the Pydah AI backend API.
 *
 * @param {Object} params
 * @param {string} params.message - The latest user message text.
 * @param {Array} params.history - List of prior message objects [{role, content}].
 * @param {string} [params.conversationId] - Optional conversation ID.
 * @returns {Promise<Object>} Response data containing success, answer, model, conversation_id.
 */
export async function sendChatMessage({ message, history = [], conversationId = null }) {
  const endpoint = `${API_BASE_URL.replace(/\/$/, '')}/api/v1/chat`;

  // Format message history for backend
  const formattedHistory = history
    .filter(msg => msg.role === 'user' || msg.role === 'assistant')
    .map(msg => ({
      role: msg.role,
      content: msg.content
    }));

  const payload = {
    message,
    conversation_id: conversationId,
    history: formattedHistory
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      throw new Error('Unable to connect to Pydah AI backend service. Please ensure the backend is running at ' + API_BASE_URL);
    }
    throw error;
  }
}
