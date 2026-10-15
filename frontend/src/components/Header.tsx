import React from 'react';
import { useLocation } from 'react-router-dom';
import { Play, RefreshCw, AlertTriangle } from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { triggerScenario, activeScenario } = useHospital();

  const getBreadcrumbTitle = () => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        return 'Dashboard';
      case '/alerts':
        return 'Alerts';
      case '/patient-flow':
        return 'Patient Flow';
      case '/patient-prioritisation':
        return 'Patient Prioritisation';
      case '/resource-management':
        return 'Resource Management';
      case '/recommendations':
        return 'Recommendations';
      case '/agent-activity':
        return 'Agent Activity';
      case '/history-reports':
        return 'History & Reports';
      default:
        return 'Operations';
    }
  };

  return (
    <header className="h-16 px-6 md:px-8 flex items-center justify-between border-b border-slate-200/60 bg-white/85 backdrop-blur-md sticky top-0 z-30 transition-all select-none">
      {/* Breadcrumb Left - Cool & Clean */}
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <span className="text-slate-400 font-medium hover:text-slate-600 transition-colors">Workspace</span>
        <span className="text-slate-300 font-light">›</span>
        <span className="text-slate-900 font-black tracking-tight">{getBreadcrumbTitle()}</span>
        {activeScenario && (
          <span className="ml-3 hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold animate-pulse shadow-2xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            {activeScenario}
          </span>
        )}
      </div>

      {/* Action Bar Right - Well-proportioned & Modern */}
      <div className="flex items-center gap-3.5">
        {/* Sleek Simulator Command Pill */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100/90 border border-slate-200/70 p-1 rounded-full text-xs shadow-2xs">
          <span className="px-2 text-slate-400 uppercase text-[10px] font-bold tracking-wider">Test:</span>
          
          <button
            onClick={() => triggerScenario('ED_CONGESTION')}
            title="Simulate Scenario 1: Emergency Department Congestion at 6 PM"
            className={`px-3 py-1 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeScenario?.includes('Scenario 1')
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>ED Rush (Sc. 1)</span>
          </button>

          <button
            onClick={() => triggerScenario('ICU_SHORTAGE')}
            title="Simulate Scenario 2: ICU Resource Shortage (98% capacity)"
            className={`px-3 py-1 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeScenario?.includes('Scenario 2')
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>ICU Crisis (Sc. 2)</span>
          </button>

          {activeScenario && (
            <button
              onClick={() => triggerScenario('RESET')}
              title="Reset to Normal Telemetry"
              className="px-2 py-1 text-slate-500 hover:text-slate-800 hover:bg-white rounded-full transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Live Data Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-bold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live data</span>
        </div>

        {/* Dynamic Date */}
        <div className="hidden md:inline-block text-xs font-semibold text-slate-500 px-1">
          Friday, October 2
        </div>
      </div>
    </header>
  );
};

export default Header;
