import React from 'react';
import { Sparkles, Code2, PenTool, GraduationCap, Lightbulb } from 'lucide-react';

const DEFAULT_SUGGESTIONS = [
  {
    icon: Lightbulb,
    title: "Explain a Technical Concept",
    desc: "Understand complex topics simply",
    prompt: "Explain how artificial intelligence language models process text step by step."
  },
  {
    icon: PenTool,
    title: "Help Write or Improve Something",
    desc: "Draft essays or professional content",
    prompt: "Help me write a concise professional announcement explaining a new project launch."
  },
  {
    icon: Code2,
    title: "Solve a Programming Problem",
    desc: "Debug code or algorithm design",
    prompt: "Write a Python script to sort a list of dictionary items by date cleanly."
  },
  {
    icon: GraduationCap,
    title: "Explain Topic Step by Step",
    desc: "Structured learning breakdown",
    prompt: "What are the core concepts of web application development? Explain step by step."
  }
];

export default function WelcomeScreen({ onSelectPrompt, welcomeMessage = null, suggestions = null, isCompact = false }) {
  const headingText = welcomeMessage || "How can I help you today?";
  const items = suggestions || DEFAULT_SUGGESTIONS;

  return (
    <div className={`max-w-3xl mx-auto px-4 ${isCompact ? 'py-4 flex flex-col items-center text-center' : 'py-8 sm:py-12 flex flex-col items-center text-center'}`}>
      <div className={`${isCompact ? 'w-12 h-12 mb-3 ring-4' : 'w-16 h-16 mb-6 ring-8'} rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center shadow-sm ring-brand-50/50`}>
        <Sparkles className={isCompact ? "w-6 h-6" : "w-8 h-8"} />
      </div>

      <h2 className={`${isCompact ? 'text-lg font-bold' : 'text-2xl sm:text-3xl font-bold'} text-slate-900 tracking-tight`}>
        {headingText}
      </h2>
      <p className={`mt-1 text-slate-500 ${isCompact ? 'text-xs max-w-xs' : 'text-sm sm:text-base max-w-md'}`}>
        Ask me anything. I'm here to help you find answers and explore ideas.
      </p>

      <div className={`mt-6 grid grid-cols-1 ${isCompact ? 'gap-2 w-full' : 'sm:grid-cols-2 gap-3.5 w-full'}`}>
        {items.map((item, idx) => {
          const IconComponent = item.icon || Lightbulb;
          return (
            <button
              key={idx}
              onClick={() => onSelectPrompt(item.prompt || item.title)}
              className="group text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-brand-500/50 hover:shadow-md transition-all duration-150 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2.5 mb-1">
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-500 transition-colors">
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-semibold text-slate-800 text-xs sm:text-sm group-hover:text-brand-500 transition-colors">
                  {item.title}
                </h3>
              </div>
              {item.desc && (
                <p className="text-[11px] text-slate-500 leading-normal pl-8">
                  {item.desc}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
