import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Minus, AlertCircle, RefreshCw, GripHorizontal } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import WelcomeScreen from './WelcomeScreen';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';

export default function FloatingWidget({
  apiBaseUrl = null,
  assistantId = "general-assistant",
  authToken = null,
  title = "Pydah AI Assistant",
  welcomeMessage = null,
  suggestedPrompts = null,
  position = "bottom-right"
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [isBtnDragging, setIsBtnDragging] = useState(false);
  const dragDistanceRef = useRef(0);
  const btnDragStartRef = useRef({ mouseX: 0, mouseY: 0, initialX: 0, initialY: 0 });

  const [modalOffset, setModalOffset] = useState({ x: 0, y: 0 });
  const [isModalDragging, setIsModalDragging] = useState(false);
  const modalDragStartRef = useRef({ mouseX: 0, mouseY: 0, initialX: 0, initialY: 0 });

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    retryLastMessage,
    clearConversation
  } = useChat({ apiBaseUrl, assistantId, authToken });

  const handleBtnMouseDown = (e) => {
    setIsBtnDragging(true);
    dragDistanceRef.current = 0;
    const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
    const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
    btnDragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      initialX: btnOffset.x,
      initialY: btnOffset.y
    };
  };

  useEffect(() => {
    let animId = null;

    const handleMove = (e) => {
      const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;

      if (isBtnDragging) {
        const deltaX = clientX - btnDragStartRef.current.mouseX;
        const deltaY = clientY - btnDragStartRef.current.mouseY;
        dragDistanceRef.current = Math.hypot(deltaX, deltaY);

        if (animId) cancelAnimationFrame(animId);
        animId = requestAnimationFrame(() => {
          setBtnOffset({
            x: btnDragStartRef.current.initialX + deltaX,
            y: btnDragStartRef.current.initialY + deltaY
          });
        });
      }

      if (isModalDragging) {
        const deltaX = clientX - modalDragStartRef.current.mouseX;
        const deltaY = clientY - modalDragStartRef.current.mouseY;

        if (animId) cancelAnimationFrame(animId);
        animId = requestAnimationFrame(() => {
          setModalOffset({
            x: modalDragStartRef.current.initialX + deltaX,
            y: modalDragStartRef.current.initialY + deltaY
          });
        });
      }
    };

    const handleEnd = () => {
      if (animId) cancelAnimationFrame(animId);
      if (isBtnDragging) setIsBtnDragging(false);
      if (isModalDragging) setIsModalDragging(false);
    };

    if (isBtnDragging || isModalDragging) {
      window.addEventListener('mousemove', handleMove, { passive: true });
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: true });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isBtnDragging, isModalDragging]);

  const handleBtnClick = (e) => {
    if (dragDistanceRef.current < 5) {
      setIsOpen(prev => !prev);
    }
  };

  const handleModalHeaderMouseDown = (e) => {
    if (e.target.closest('button')) return;
    setIsModalDragging(true);
    const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
    const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
    modalDragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      initialX: modalOffset.x,
      initialY: modalOffset.y
    };
  };

  const posClasses = position === "bottom-left" ? "bottom-4 left-4 sm:bottom-6 sm:left-6" : "bottom-4 right-4 sm:bottom-6 sm:right-6";
  const defaultWindowPos = position === "bottom-left" ? "bottom-20 left-2 sm:bottom-24 sm:left-6" : "bottom-20 right-2 sm:bottom-24 sm:right-6";

  return (
    <div className="font-sans antialiased">
      {/* Draggable Circular Trigger Button */}
      <button
        onMouseDown={handleBtnMouseDown}
        onTouchStart={handleBtnMouseDown}
        onClick={handleBtnClick}
        style={{
          transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
          willChange: 'transform'
        }}
        className={`fixed ${posClasses} z-50 p-3 sm:p-4 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-slate-700 border border-sky-200/80 shadow-lg hover:shadow-xl flex items-center justify-center group ring-4 ring-sky-300/40 select-none ${
          isBtnDragging ? 'transition-none cursor-grabbing scale-105' : 'transition-all duration-150 cursor-grab hover:scale-105 active:scale-95'
        }`}
        aria-label="Open Pydah AI Assistant"
        title="Click to open or drag to move button"
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-sky-700 transition-transform group-hover:rotate-90 duration-200 pointer-events-none" />
        ) : (
          <div className="relative pointer-events-none flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8">
            <img 
              src="/pydah-avatar.png" 
              alt="Pydah AI Mascot" 
              className="w-full h-full object-contain drop-shadow-sm" 
            />
            <span className="absolute -top-0.5 -right-0.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>
        )}
      </button>

      {/* Floating Chat Modal Window */}
      {isOpen && (
        <div 
          style={{
            transform: `translate3d(${btnOffset.x + modalOffset.x}px, ${btnOffset.y + modalOffset.y}px, 0)`,
            willChange: 'transform'
          }}
          className={`fixed ${defaultWindowPos} z-50 w-[calc(100vw-1rem)] xs:w-[calc(100vw-2rem)] sm:w-[410px] md:w-[430px] h-[520px] sm:h-[580px] max-h-[85vh] bg-[#F1F1F1] rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden ${
            isModalDragging ? 'transition-none' : 'animate-in fade-in slide-in-from-bottom-5 duration-200'
          }`}
        >
          {/* Header */}
          <div 
            onMouseDown={handleModalHeaderMouseDown}
            onTouchStart={handleModalHeaderMouseDown}
            className={`h-12 sm:h-14 bg-white border-b border-slate-200 px-3 sm:px-4 flex items-center justify-between shrink-0 shadow-xs ${
              isModalDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
            title="Click and drag to move window"
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <GripHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 hover:text-slate-500 transition-colors shrink-0" />
              <img 
                src="/pydah-avatar.png" 
                alt="Pydah AI Mascot" 
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0" 
              />
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-tight truncate max-w-[130px] sm:max-w-[170px]">
                  {title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                onClick={clearConversation}
                className="p-1 sm:p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg text-[11px] sm:text-xs font-medium transition-colors"
                title="Reset Chat"
              >
                Reset
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 sm:p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close Assistant"
              >
                <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Global Error Banner */}
          {error && (
            <div className="bg-rose-50 border-b border-rose-200 px-3 py-1.5 text-rose-800 text-xs flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5 truncate">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span className="truncate text-[11px] sm:text-xs">{error}</span>
              </div>
              <button
                onClick={retryLastMessage}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium bg-rose-100 text-rose-800 rounded hover:bg-rose-200 transition-colors shrink-0"
              >
                <RefreshCw className="w-3 h-3" />
                Retry
              </button>
            </div>
          )}

          {/* Conversation Body */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {messages.length === 0 ? (
              <div className="flex-1 overflow-y-auto flex items-center justify-center p-1.5 sm:p-2">
                <WelcomeScreen
                  onSelectPrompt={sendMessage}
                  welcomeMessage={welcomeMessage}
                  suggestions={suggestedPrompts}
                  isCompact={true}
                />
              </div>
            ) : (
              <MessageList messages={messages} isLoading={isLoading} />
            )}

            <MessageComposer onSend={sendMessage} disabled={isLoading} isCompact={true} />
          </div>
        </div>
      )}
    </div>
  );
}
