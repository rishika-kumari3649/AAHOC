import React from 'react';
import { useTheme } from '../context/ThemeContext';

export interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'button',
  size = 'md',
  showLabel = false,
}) => {
  const { toggleTheme, isDark } = useTheme();

  // Size configurations
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  const iconSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
          isDark
            ? 'bg-[#181818] border-[#2E2E2E] text-amber-300 hover:bg-[#222222]'
            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
        } ${className}`}
      >
        <span className="flex items-center justify-center transition-transform duration-300">
          {isDark ? (
            <i className="bi bi-sun-fill text-amber-400"></i>
          ) : (
            <i className="bi bi-moon-stars-fill text-slate-600"></i>
          )}
        </span>
        {showLabel && (
          <span className="text-xs font-semibold capitalize tracking-wide">
            {isDark ? 'Dark' : 'Light'}
          </span>
        )}
      </button>
    );
  }

  // Default button variant: Clean circular/rounded action button matching header icons
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`theme-toggle-btn relative rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        sizeClasses[size]
      } ${
        isDark
          ? 'bg-[#161616] border-[#2E2E2E] text-amber-300 hover:bg-[#222222] hover:text-amber-200 hover:border-[#444444] shadow-xs'
          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-2xs'
      } ${className}`}
    >
      <span
        className={`inline-flex items-center justify-center transition-all duration-300 transform ${
          isDark ? 'rotate-0 scale-100' : 'rotate-12 scale-95'
        }`}
      >
        {isDark ? (
          <i className={`bi bi-sun-fill text-amber-400 ${iconSizes[size]}`}></i>
        ) : (
          <i className={`bi bi-moon-stars-fill text-slate-600 ${iconSizes[size]}`}></i>
        )}
      </span>
      {showLabel && (
        <span className="ml-2 text-xs font-semibold capitalize hidden sm:inline">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
