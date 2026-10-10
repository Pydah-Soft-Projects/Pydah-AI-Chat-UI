import React from 'react';
import { Sparkles } from 'lucide-react';

export default function LoadingIndicator() {
  return (
    <div className="flex gap-3 sm:gap-4 my-4 max-w-3xl mx-auto px-4 items-start">
      <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-sky-500 flex items-center justify-center shrink-0 shadow-sm">
        <Sparkles className="w-4 h-4 animate-spin" />
      </div>

      <div className="flex flex-col items-start">
        <span className="text-xs font-medium text-slate-500 mb-1 px-1">Pydah AI</span>
        <div className="p-4 rounded-2xl rounded-tl-xs bg-white border border-slate-200/80 shadow-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
          <span className="text-xs text-slate-400 ml-2 font-medium">Generating answer...</span>
        </div>
      </div>
    </div>
  );
}
