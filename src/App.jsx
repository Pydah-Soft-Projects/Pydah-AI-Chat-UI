import React, { useState } from 'react';
import { useChat } from './hooks/useChat';
import ChatHeader from './components/ChatHeader';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import MessageList from './components/MessageList';
import MessageComposer from './components/MessageComposer';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    retryLastMessage,
    clearConversation
  } = useChat();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-[#F1F1F1] overflow-hidden">
      {/* Navigation Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={clearConversation}
        messageCount={messages.length}
      />

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ChatHeader
          onNewChat={clearConversation}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Global Error Notification Banner */}
        {error && (
          <div className="bg-rose-50 border-b border-rose-200 px-4 py-3 text-rose-800 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={retryLastMessage}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-md transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          </div>
        )}

        {/* Conversation Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {messages.length === 0 ? (
            <div className="flex-1 overflow-y-auto flex items-center justify-center">
              <WelcomeScreen onSelectPrompt={sendMessage} />
            </div>
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}

          {/* Bottom Message Input */}
          <MessageComposer onSend={sendMessage} disabled={isLoading} />
        </main>
      </div>
    </div>
  );
}
