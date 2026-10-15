import React from 'react';
import { Sparkles } from 'lucide-react';
import { DEFAULT_AVATAR } from '../assets/avatar';

export default function WelcomeScreen({
  onSelectPrompt = null,
  welcomeMessage = null,
  suggestions = null,
  isCompact = false,
  avatarUrl = null
}) {
  const botAvatar = avatarUrl || DEFAULT_AVATAR;

  return (
    <div className={`max-w-xl mx-auto px-4 ${isCompact ? 'py-4 sm:py-6 flex flex-col items-center text-center' : 'py-10 sm:py-16 flex flex-col items-center text-center'}`}>
      {/* Avatar Container with glowing badge */}
      <div className="relative mb-3 sm:mb-4 group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 opacity-20 blur-md group-hover:opacity-35 transition-all duration-300"></div>
        <img 
          src={botAvatar} 
          alt="Nemo - Pydah AI Mascot" 
          className={`${isCompact ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-24 h-24 sm:w-28 sm:h-28'} relative object-contain drop-shadow-md select-none transition-transform duration-200 group-hover:scale-105`} 
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
      </div>

      {/* Intro Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-[11px] sm:text-xs font-medium">
        <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse shrink-0" />
        <span>Meet Nemo, your Pydah AI Companion</span>
      </div>

      {/* Main Intro Title */}
      <h2 className={`${isCompact ? 'text-lg sm:text-xl font-bold' : 'text-2xl sm:text-3xl font-extrabold'} text-slate-900 tracking-tight`}>
        Hi, I'm Nemo!
      </h2>

      {/* Welcome Message / Subtitle */}
      <p className={`mt-1.5 font-medium text-slate-700 ${isCompact ? 'text-xs sm:text-sm max-w-xs' : 'text-base sm:text-lg max-w-md'}`}>
        {welcomeMessage || "How can I help you today?"}
      </p>
    </div>
  );
}

