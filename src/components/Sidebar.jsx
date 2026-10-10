import React from 'react';
import { Plus, MessageSquare, Info, ShieldCheck, Sparkles, X } from 'lucide-react';
import { DEFAULT_AVATAR } from '../assets/avatar';

export default function Sidebar({ isOpen, onClose, onNewChat, messageCount, avatarUrl = null }) {
  const botAvatar = avatarUrl || DEFAULT_AVATAR;

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
        onClick={onClose}
      />

      <aside className="fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 flex flex-col justify-between p-4 shadow-lg lg:shadow-none transition-all duration-200">
        <div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <img 
                src={botAvatar} 
                alt="Pydah AI Mascot" 
                className="w-7 h-7 object-contain shrink-0" 
              />
              <span className="font-semibold text-slate-900 text-sm">Pydah AI Workspace</span>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => { onNewChat(); onClose(); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-xl shadow-sm transition-all duration-150 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Start New Session
          </button>

          <div className="mt-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
              Active Session
            </h3>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 text-sm">
              <MessageSquare className="w-4 h-4 text-sky-500 shrink-0" />
              <div className="truncate flex-1">
                <span className="font-medium text-slate-800 block truncate">Current Conversation</span>
                <span className="text-xs text-slate-400">{messageCount} message{messageCount !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100/80">
            <div className="flex items-center gap-2 text-sky-700 font-medium text-xs mb-1">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              Centralized Backend
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Powered by Pydah AI core LLM service with session context support.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Pydah AI UI v1.0.2.2</span>
            <span className="flex items-center gap-1"><Info className="w-3.5 h-3.5" /> Core Engine</span>
          </div>
        </div>
      </aside>
    </>
  );
}
