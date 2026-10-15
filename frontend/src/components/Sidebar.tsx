import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  ArrowLeftRight,
  Flag,
  BedDouble,
  Sparkles,
  Bot,
  History,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { role, setRole, alerts, recommendations, triagePatients } = useHospital();
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);

  // Active counts for badges matching db.pdf
  const activeAlertsCount = alerts.filter(a => a.status === 'active').length;
  const pendingRecsCount = recommendations.filter(r => r.status === 'pending').length;
  const waitingTriageCount = triagePatients.filter(t => t.urgencyLevel <= 2).length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'alerts',
      label: 'Alerts',
      path: '/alerts',
      icon: Bell,
      badge: activeAlertsCount > 0 ? activeAlertsCount : undefined,
      badgeStyle: 'bg-orange-100 text-orange-700 font-semibold',
    },
    {
      id: 'patient-flow',
      label: 'Patient Flow',
      path: '/patient-flow',
      icon: ArrowLeftRight,
    },
    {
      id: 'patient-prioritisation',
      label: 'Patient Prioritisation',
      path: '/patient-prioritisation',
      icon: Flag,
      badge: waitingTriageCount > 0 ? waitingTriageCount : undefined,
      badgeStyle: 'bg-purple-100 text-purple-700 font-semibold',
    },
    {
      id: 'resource-management',
      label: 'Resource Management',
      path: '/resource-management',
      icon: BedDouble,
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      path: '/recommendations',
      icon: Sparkles,
      badge: pendingRecsCount > 0 ? pendingRecsCount : undefined,
      badgeStyle: 'bg-purple-100 text-purple-700 font-semibold',
    },
    {
      id: 'agent-activity',
      label: 'Agent Activity',
      path: '/agent-activity',
      icon: Bot,
    },
    {
      id: 'history-reports',
      label: 'History & Reports',
      path: '/history-reports',
      icon: History,
    },
  ];

  return (
    <aside className="w-64 md:w-72 flex-shrink-0 bg-white border-r border-slate-200/80 h-screen sticky top-0 overflow-y-auto flex flex-col justify-between p-5 select-none transition-all">
      {/* Top Branding Section */}
      <div>
        <div className="flex items-center gap-3 mb-8 px-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shadow-sm">
            <svg className="w-5 h-5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-black tracking-tight text-slate-900 leading-none flex items-center gap-1.5">
              <span>XZYABC</span>
            </div>
            <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-1">
              HOSPITAL OPERATIONS
            </div>
          </div>
        </div>

        {/* Section Label */}
        <div className="px-2 mb-3">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            WORKSPACE
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full text-center min-w-[20px] ${
                      item.badgeStyle || 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Pinned Cards */}
      <div className="space-y-3 pt-6 border-t border-slate-100">
        {/* AI Agent Status Pill */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">AI Agent Active</div>
              <div className="text-[11px] text-slate-500">Monitoring live operations</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>

        {/* Role & User Switcher Card */}
        <div className="relative">
          <div
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                {role === 'triage' ? 'TR' : 'OC'}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 leading-snug">
                  {role === 'triage' ? 'Triage Desk' : 'Operations Centre'}
                </div>
                <div className="text-[11px] text-slate-500">
                  {role === 'triage' ? 'Nurse Triage view' : 'Coordinator view'}
                </div>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <ChevronDown className={`w-4 h-4 transition-transform ${showRoleMenu ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Role Switching Dropdown */}
          {showRoleMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-slate-200 rounded-2xl shadow-lg p-2 z-50 text-xs">
              <div className="font-semibold text-slate-400 px-2 py-1 uppercase text-[10px] tracking-wider">
                Switch Operational View
              </div>
              <button
                onClick={() => {
                  setRole('operations');
                  setShowRoleMenu(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors ${
                  role === 'operations' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>Hospital Coordinator</span>
                {role === 'operations' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
              <button
                onClick={() => {
                  setRole('triage');
                  setShowRoleMenu(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors ${
                  role === 'triage' ? 'bg-purple-50 text-purple-800 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>Patient Triage Support</span>
                {role === 'triage' && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};