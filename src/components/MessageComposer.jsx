import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function MessageComposer({ onSend, disabled }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [text]);

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
    <div className="sticky bottom-0 bg-gradient-to-t from-[#F1F1F1] via-[#F1F1F1] to-transparent pt-4 pb-4 px-4 z-10">
      <form 
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-md p-2 flex items-end gap-2 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all duration-150"
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Pydah AI anything... (Press Enter to send)"
          rows={1}
          disabled={disabled}
          className="flex-1 max-h-40 min-h-[44px] py-2.5 px-3 bg-transparent text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed"
        />

        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="p-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium transition-all duration-150 shrink-0 shadow-sm disabled:shadow-none"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      
      <p className="text-[11px] text-center text-slate-400 mt-2">
        Pydah AI can make mistakes. Verify important information.
      </p>
    </div>
  );
}
