import React from 'react';
import { Sparkles, Code2, PenTool, GraduationCap, Lightbulb } from 'lucide-react';

const SUGGESTIONS = [
  {
    icon: Lightbulb,
    title: "Explain a Technical Concept",
    desc: "Understand complex topics simply",
    prompt: "Explain how artificial intelligence language models process text step by step."
  },
  {
    icon: PenTool,
    title: "Help Write or Improve Something",
    desc: "Draft essays, emails, or professional content",
    prompt: "Help me write a concise professional announcement explaining a new project launch."
  },
  {
    icon: Code2,
    title: "Solve a Programming Problem",
    desc: "Debug code or explain algorithm design",
    prompt: "Write a Python script to sort a list of dictionary items by date cleanly."
  },
  {
    icon: GraduationCap,
    title: "Explain a Topic Step by Step",
    desc: "Structured learning breakdown",
    prompt: "What are the core concepts of web application development? Explain step by step."
  }
];

export default function WelcomeScreen({ onSelectPrompt }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mb-6 shadow-sm ring-8 ring-brand-50/50">
        <Sparkles className="w-8 h-8" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
        How can I help you today?
      </h2>
      <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-md">
        Ask me anything. I'm here to help you find answers, solve technical problems, and explore ideas.
      </p>

      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
        {SUGGESTIONS.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group text-left p-4 rounded-xl bg-white border border-slate-200 hover:border-brand-500/50 hover:shadow-md transition-all duration-150 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-500 transition-colors">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-800 text-sm group-hover:text-brand-500 transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-normal pl-11">
                {item.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
