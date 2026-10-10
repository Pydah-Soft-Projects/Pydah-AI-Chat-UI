import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function MessageComposer({ onSend, disabled, isCompact = false }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, isCompact ? 120 : 160)}px`;
    }
  }, [text, isCompact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`sticky bottom-0 bg-gradient-to-t from-[#F1F1F1] via-[#F1F1F1] to-transparent ${isCompact ? 'pt-2 pb-2.5 px-2.5' : 'pt-4 pb-4 px-3 sm:px-4'} z-10`}>
      <form 
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-md p-1.5 sm:p-2 flex items-end gap-1.5 sm:gap-2 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all duration-150"
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isCompact ? "Ask Pydah AI..." : "Ask Pydah AI anything... (Press Enter to send)"}
          rows={1}
          disabled={disabled}
          className="flex-1 max-h-32 sm:max-h-40 min-h-[38px] sm:min-h-[44px] py-2 px-2.5 sm:px-3 bg-transparent text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed"
        />

        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium transition-all duration-150 shrink-0 shadow-xs disabled:shadow-none"
          title="Send message"
        >
          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </form>
      
      {!isCompact && (
        <p className="text-[10px] sm:text-[11px] text-center text-slate-400 mt-1.5">
          Pydah AI can make mistakes. Verify important information.
        </p>
      )}
    </div>
  );
}
