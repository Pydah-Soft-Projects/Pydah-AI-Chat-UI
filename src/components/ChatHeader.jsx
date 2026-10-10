import React from 'react';
import { Bot, Plus, PanelLeft, Sparkles } from 'lucide-react';
import { DEFAULT_AVATAR } from '../assets/avatar';

export default function ChatHeader({ onNewChat, onToggleSidebar, isSidebarOpen, title, avatarUrl = null }) {
  const botAvatar = avatarUrl || DEFAULT_AVATAR;

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Toggle Navigation Sidebar"
          aria-label="Toggle Sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <img 
            src={botAvatar} 
            alt="Pydah AI Mascot" 
            className="w-9 h-9 object-contain shrink-0" 
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-slate-900 text-base leading-tight">Pydah AI</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200">
                Assistant
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              Connected & Ready
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onNewChat}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          title="Start a New Chat Session"
        >
          <Plus className="w-4 h-4 text-slate-600" />
          <span className="hidden sm:inline">New Chat</span>
        </button>
      </div>
    </header>
  );
}
