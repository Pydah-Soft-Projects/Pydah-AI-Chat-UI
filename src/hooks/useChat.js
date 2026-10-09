import { useState, useCallback } from 'react';
import { sendChatMessage } from '../services/chatApi';

export function useChat() {
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

    // Update UI state with user message immediately
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Pass current history prior to this new user message
      const historyToPass = messages;
      const response = await sendChatMessage({
        message: trimmed,
        history: historyToPass,
        conversationId
      });

      if (response.conversation_id) {
        setConversationId(response.conversation_id);
      }

      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        model: response.model,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while generating response.');
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, conversationId]);

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
