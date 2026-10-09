import React, { useState } from 'react';
import { User, Sparkles, Copy, Check } from 'lucide-react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 sm:gap-4 my-4 max-w-3xl mx-auto px-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
        isUser ? 'bg-brand-500 text-white' : 'bg-white border border-slate-200 text-brand-500'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      </div>

      {/* Message Content Container */}
      <div className={`flex flex-col max-w-[85%] sm:max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1 text-xs text-slate-400 px-1">
          <span className="font-medium text-slate-700">{isUser ? 'You' : 'Pydah AI'}</span>
          {message.timestamp && <span>• {message.timestamp}</span>}
          {message.model && (
            <span className="hidden sm:inline px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded text-[10px]">
              {message.model}
            </span>
          )}
        </div>

        <div className={`relative group p-3.5 sm:p-4 rounded-2xl text-sm leading-relaxed ${
          isUser 
            ? 'bg-brand-500 text-white rounded-tr-xs shadow-sm' 
            : 'bg-white border border-slate-200/80 text-slate-800 rounded-tl-xs shadow-sm'
        }`}>
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>

          {!isUser && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-slate-600 bg-white/80 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              title="Copy answer text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
