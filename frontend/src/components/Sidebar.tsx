import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PANEL_NAVIGATIONS } from './panelConfig';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const activeRole = Object.keys(PANEL_NAVIGATIONS).find(role => 
    currentPath.startsWith(`/${role}`)
  ) || 'operations';

  const panel = PANEL_NAVIGATIONS[activeRole] || PANEL_NAVIGATIONS['operations'];
  const isOperations = activeRole === 'operations';

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <div className="p-4">
        <div className="mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              {panel.label}
            </h2>
            {panel.badge && (
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-700">
                {panel.badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-400">{panel.description}</p>
        </div>

        <nav className="space-y-1">
          {panel.items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? isOperations
                      ? 'bg-purple-50 text-purple-700 font-semibold border-l-4 border-purple-600 pl-2'
                      : 'bg-sky-50 text-sky-700 font-semibold border-l-4 border-sky-600 pl-2'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{item.label}</span>
                {item.label.includes('AI') && (
                  <span className="rounded bg-purple-100 px-1.5 py-0.2 text-[10px] font-semibold text-purple-700">
                    AI
                  </span>
                )}
                {item.label.includes('Alerts') && (
                  <span className="rounded bg-rose-100 px-1.5 py-0.2 text-[10px] font-semibold text-rose-700">
                    Live
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <p className="text-xs font-medium text-slate-600">Coordinator Online</p>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">Role Panel: {activeRole.toUpperCase()}</p>
      </div>
    </aside>
  );
};