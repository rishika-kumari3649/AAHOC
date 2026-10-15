import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Building2,
  Flame
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const RecommendationsPage: React.FC = () => {
  const {
    recommendations,
    approveRecommendation,
    dismissRecommendation,
    triggerScenario,
    activeScenario,
  } = useHospital();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

  const filteredRecommendations = recommendations.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const handleApprove = (id: string, title: string) => {
    approveRecommendation(id);
    setLastActionMessage(`Authorized & Dispatched: "${title}". Operational tasks created, beds reserved, and staff alerted.`);
    setTimeout(() => setLastActionMessage(null), 6000);
  };

  const handleDismiss = (id: string, title: string) => {
    dismissRecommendation(id);
    setLastActionMessage(`Dismissed: "${title}". Logged in operational audit trail.`);
    setTimeout(() => setLastActionMessage(null), 5000);
  };

  return (
    <div className="space-y-8 select-none pb-12">
      {/* Title & Scenarios Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <span>AI Operational Recommendations</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Human-in-the-Loop AI
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Autonomous observation and congestion forecasting with mandatory healthcare coordinator authorization.
          </p>
        </div>

        {/* Live Scenario Triggers from Document */}
        <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs self-start md:self-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Test Scenarios:
          </span>
          <button
            onClick={() => triggerScenario('ED_CONGESTION')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeScenario?.includes('Scenario 1')
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Scenario 1 (ED 96%)</span>
          </button>

          <button
            onClick={() => triggerScenario('ICU_SHORTAGE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeScenario?.includes('Scenario 2')
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Scenario 2 (ICU 98%)</span>
          </button>
        </div>
      </div>

      {/* Confirmation Flash Banner */}
      {lastActionMessage && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-emerald-800 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{lastActionMessage}</span>
        </div>
      )}

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filterStatus === 'all'
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          All Recommendations ({recommendations.length})
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filterStatus === 'pending'
              ? 'bg-amber-500 text-white'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Pending Authorization ({recommendations.filter((r) => r.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilterStatus('approved')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filterStatus === 'approved'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Approved & Executed ({recommendations.filter((r) => r.status === 'approved').length})
        </button>
        <button
          onClick={() => setFilterStatus('dismissed')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filterStatus === 'dismissed'
              ? 'bg-slate-600 text-white'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Dismissed ({recommendations.filter((r) => r.status === 'dismissed').length})
        </button>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-5">
        {filteredRecommendations.map((rec) => {
          const isPending = rec.status === 'pending';
          const isApproved = rec.status === 'approved';
          const isDismissed = rec.status === 'dismissed';

          return (
            <div
              key={rec.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all ${
                isApproved
                  ? 'border-emerald-200 bg-emerald-50/20 shadow-xs'
                  : isDismissed
                  ? 'border-slate-200 opacity-60'
                  : 'border-slate-200/80 shadow-xs hover:border-emerald-300'
              }`}
            >
              {/* Header: Priority, Department & Time */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                      rec.priority === 1
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    Priority {rec.priority}
                  </span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    {rec.department}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium">
                    {rec.timeAgo}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      isApproved
                        ? 'bg-emerald-100 text-emerald-800'
                        : isDismissed
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {rec.status}
                  </span>
                </div>
              </div>

              {/* Title & Detected Problem Context */}
              <div className="mb-4">
                <h3 className="text-base font-extrabold text-slate-900">
                  {rec.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              {/* Nested AI Reasoning Box matching db.pdf */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-700 mb-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Agent Reasoning & Plan (Observe → Understand → Reason → Plan)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {rec.agentReasoning}
                </p>
              </div>

              {/* Recommended Action & Authorization Gate */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Recommended Human-in-the-Loop Action:
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {rec.recommendedAction}
                  </div>
                  {rec.impactSummary && (
                    <div className="text-xs text-emerald-700 font-medium mt-0.5">
                      Impact: {rec.impactSummary}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                  {isPending ? (
                    <>
                      <button
                        onClick={() => handleApprove(rec.id, rec.title)}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-xs transition-colors flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Authorize & Dispatch</span>
                      </button>
                      <button
                        onClick={() => handleDismiss(rec.id, rec.title)}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
                      >
                        Dismiss
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      {isApproved && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {isDismissed && <XCircle className="w-4 h-4 text-slate-400" />}
                      <span className="capitalize">{rec.status} by Coordinator</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RecommendationsPage;
