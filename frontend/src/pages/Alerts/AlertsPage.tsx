import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Search,
  Building2
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const AlertsPage: React.FC = () => {
  const { alerts, acknowledgeAlert, resolveAlert } = useHospital();
  const [filterSeverity, setFilterSeverity] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === 'All' || alert.severity === filterSeverity;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.detail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6 select-none pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Operational Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time anomaly detection and early warning triggers across hospital wards.
          </p>
        </div>

        {/* Severity Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-xs">
          {['All', 'High', 'Medium', 'Low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterSeverity === sev
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search alerts by department, symptom, or operational constraint..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/80 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        />
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No active alerts matching filter</h3>
            <p className="text-xs text-slate-400 mt-1">All hospital operational parameters are within safe ranges.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isHigh = alert.severity === 'High';
            const isMedium = alert.severity === 'Medium';
            const isResolved = alert.status === 'resolved';

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl p-5 border transition-all ${
                  isResolved
                    ? 'border-slate-200 opacity-60'
                    : isHigh
                    ? 'border-orange-200 hover:border-orange-300 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isHigh
                          ? 'bg-rose-100 text-rose-600'
                          : isMedium
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <AlertTriangle className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-bold text-slate-900">
                          {alert.title}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isHigh
                              ? 'bg-rose-100 text-rose-700'
                              : isMedium
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {alert.severity} Priority
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          {alert.department}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {alert.detail}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Timestamp */}
                  <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-semibold text-slate-600">{alert.timeAgo}</div>
                      <div className="text-[10px] text-slate-400">{alert.timestamp}</div>
                    </div>

                    {!isResolved && (
                      <div className="flex items-center gap-1.5 pl-3 border-l border-slate-100">
                        {alert.status === 'active' && (
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors"
                        >
                          Resolve
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default AlertsPage;
