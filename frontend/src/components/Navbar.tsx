import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PANEL_NAVIGATIONS } from './panelConfig';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Detect current role panel from URL
  const activeRole = Object.keys(PANEL_NAVIGATIONS).find(role => 
    currentPath.startsWith(`/${role}`)
  ) || 'operations';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white font-bold shadow-sm">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900">AAHOC</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium text-slate-500 border-l border-slate-200 pl-2">
                Operations Coordinator
              </span>
            </div>
          </Link>
        </div>

        {/* Role Quick-Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:inline">Panels:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {Object.values(PANEL_NAVIGATIONS).map((p) => {
              const isActive = activeRole === p.role;
              return (
                <Link
                  key={p.role}
                  to={p.basePath}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    isActive
                      ? p.role === 'operations' 
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {p.label.replace(' Panel', '').replace(' Portal', '')}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle size="sm" />
          <Link
            to="/auth/login"
            className="text-xs font-medium text-slate-600 hover:text-sky-600 px-3 py-1.5 rounded-md border border-slate-200 hover:border-sky-300 transition-colors"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </header>
  );
};