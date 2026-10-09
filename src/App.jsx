import React, { useState } from 'react';
import { useChat } from './hooks/useChat';
import ChatHeader from './components/ChatHeader';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import MessageList from './components/MessageList';
import MessageComposer from './components/MessageComposer';
import FloatingWidget from './components/FloatingWidget';
import { AlertCircle, RefreshCw, Layout, MessageSquarePlus } from 'lucide-react';

export default function App({
  mode: initialMode = "embedded",
  apiBaseUrl = null,
  title = null,
  welcomeMessage = null,
  suggestedPrompts = null,
  position = "bottom-right"
}) {
  const [activeMode, setActiveMode] = useState(initialMode);

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    retryLastMessage,
    clearConversation
  } = useChat(apiBaseUrl);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F1F1F1] overflow-hidden">
      {/* Dev Mode Switcher Header Bar (Visible during standalone dev preview) */}
      {import.meta.env.DEV && (
        <div className="h-10 bg-slate-900 text-white px-4 flex items-center justify-between shrink-0 text-xs z-30 shadow-md">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Pydah AI UI Standalone Demo</span>
          </div>

          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveMode("embedded")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeMode === "embedded" 
                  ? "bg-brand-500 text-white shadow-xs" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              Full Page Mode
            </button>
            <button
              onClick={() => setActiveMode("widget")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeMode === "widget" 
                  ? "bg-brand-500 text-white shadow-xs" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              Floating Widget Mode
            </button>
          </div>
        </div>
      )}

      {/* Widget Mode Render */}
      {activeMode === "widget" || activeMode === "floating" ? (
        <div className="flex-1 relative bg-slate-100 flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 bg-white rounded-3xl shadow-md border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-4">
              <MessageSquarePlus className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Sample Application Dashboard</h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              This simulates a host application page. Look at the <strong className="text-brand-600">bottom-right corner</strong> to see and test the floating Pydah AI chat widget!
            </p>
          </div>

          <FloatingWidget
            apiBaseUrl={apiBaseUrl}
            title={title || "Pydah Student Assistant"}
            welcomeMessage={welcomeMessage}
            suggestedPrompts={suggestedPrompts}
            position={position}
          />
        </div>
      ) : (
        /* Embedded Full-Page Mode Render */
        <div className="flex-1 flex h-full overflow-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onNewChat={clearConversation}
            messageCount={messages.length}
          />

          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <ChatHeader
              onNewChat={clearConversation}
              onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
              isSidebarOpen={isSidebarOpen}
              title={title}
            />

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

            <main className="flex-1 flex flex-col overflow-hidden relative">
              {messages.length === 0 ? (
                <div className="flex-1 overflow-y-auto flex items-center justify-center">
                  <WelcomeScreen onSelectPrompt={sendMessage} welcomeMessage={welcomeMessage} suggestions={suggestedPrompts} />
                </div>
              ) : (
                <MessageList messages={messages} isLoading={isLoading} />
              )}

              <MessageComposer onSend={sendMessage} disabled={isLoading} />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
