import { useState, useCallback } from 'react';
import { sendChatMessage } from '../services/chatApi';

export function useChat(options = {}) {
  const apiBaseUrl = typeof options === 'string' ? options : options?.apiBaseUrl || null;
  const assistantId = typeof options === 'object' ? options?.assistantId || 'general-assistant' : 'general-assistant';
  const authToken = typeof options === 'object' ? options?.authToken || null : null;

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const userMessageId = Date.now().toString();
    const userMsg = {
      id: userMessageId,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const historyToPass = messages;
      const response = await sendChatMessage({
        message: trimmed,
        history: historyToPass,
        conversationId,
        assistantId,
        authToken,
        apiBaseUrl
      });

      if (response.conversation_id) {
        setConversationId(response.conversation_id);
      }

      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        model: response.model,
        assistantId: response.assistant_id,
        executedTools: response.executed_tools || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while generating response.');
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, conversationId, assistantId, authToken, apiBaseUrl]);

  const retryLastMessage = useCallback(() => {
    if (messages.length === 0) return;
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg) {
      sendMessage(lastUserMsg.content);
    }
  }, [messages, sendMessage]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setIsLoading(false);
    setError(null);
    setConversationId(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    conversationId,
    sendMessage,
    retryLastMessage,
    clearConversation
  };
}
