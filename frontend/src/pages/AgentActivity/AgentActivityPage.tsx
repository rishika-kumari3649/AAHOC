import React from 'react';
import {
  Bot,
  Eye,
  Brain,
  Lightbulb,
  Clock,
  Sparkles,
  Send
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const AgentActivityPage: React.FC = () => {
  const { activityLogs } = useHospital();

  const getStepBadge = (step: string) => {
    switch (step) {
      case 'OBSERVE':
        return {
          icon: Eye,
          bg: 'bg-sky-100 text-sky-700',
          border: 'border-sky-300',
        };
      case 'UNDERSTAND':
        return {
          icon: Brain,
          bg: 'bg-indigo-100 text-indigo-700',
          border: 'border-indigo-300',
        };
      case 'REASON':
        return {
          icon: Lightbulb,
          bg: 'bg-purple-100 text-purple-700',
          border: 'border-purple-300',
        };
      case 'PLAN':
        return {
          icon: Clock,
          bg: 'bg-amber-100 text-amber-700',
          border: 'border-amber-300',
        };
      case 'RECOMMEND':
        return {
          icon: Sparkles,
          bg: 'bg-orange-100 text-orange-700',
          border: 'border-orange-300',
        };
      case 'ACT':
        return {
          icon: Send,
          bg: 'bg-emerald-100 text-emerald-700',
          border: 'border-emerald-300',
        };
      default:
        return {
          icon: Bot,
          bg: 'bg-slate-100 text-slate-700',
          border: 'border-slate-300',
        };
    }
  };

  return (
    <div className="space-y-8 select-none pb-12">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
          <span>Agent Operational Activity</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Transparent telemetry trace demonstrating the full autonomous loop: Observe → Understand → Reason → Plan → Recommend → Act.
        </p>
      </div>

      {/* Architecture Cycle Infographic */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Autonomous Coordination Engine Loop
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: '01. OBSERVE', desc: 'Scan live telemetry, beds & queue', color: 'bg-sky-50 text-sky-700 border-sky-200' },
            { step: '02. UNDERSTAND', desc: 'Synthesize data with ML forecasts', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
            { step: '03. REASON', desc: 'Diagnose bottlenecks & risks', color: 'bg-purple-50 text-purple-700 border-purple-200' },
            { step: '04. PLAN', desc: 'Formulate mitigation workflows', color: 'bg-amber-50 text-amber-700 border-amber-200' },
            { step: '05. RECOMMEND', desc: 'Present to human coordinator', color: 'bg-orange-50 text-orange-700 border-orange-200' },
            { step: '06. ACT', desc: 'Execute upon human authorization', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
          ].map((item) => (
            <div key={item.step} className={`p-3 rounded-2xl border ${item.color}`}>
              <div className="text-[11px] font-black">{item.step}</div>
              <div className="text-[10px] text-slate-600 mt-1 font-medium leading-tight">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chronological Activity Feed */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Live Decision & Execution Stream ({activityLogs.length} Events)
        </h2>

        <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
          {activityLogs.map((log) => {
            const badge = getStepBadge(log.step);
            const Icon = badge.icon;

            return (
              <div key={log.id} className="relative group">
                {/* Timeline node */}
                <div className={`absolute -left-[35px] top-1.5 w-6 h-6 rounded-full bg-white border-2 ${badge.border} flex items-center justify-center`}>
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                </div>

                {/* Log Card */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${badge.bg}`}>
                        <Icon className="w-3 h-3" />
                        <span>{log.step}</span>
                      </span>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {log.contextTag}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 font-medium">
                      {log.timeAgo} ({log.timestamp})
                    </div>
                  </div>

                  <div className="text-sm font-bold text-slate-900 mb-1">
                    {log.headline}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {log.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AgentActivityPage;
