import React, { useState } from 'react';
import {
  Download,
  User
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const HistoryReportsPage: React.FC = () => {
  const { historyRecords } = useHospital();
  const [activeTab, setActiveTab] = useState<'audit' | 'metrics'>('audit');

  return (
    <div className="space-y-8 select-none pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            History & Operational Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Historical audit log of coordinator approvals, system recommendations, and past shift outcomes.
          </p>
        </div>

        <button className="px-4 py-2 rounded-2xl bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs flex items-center gap-2 self-start sm:self-auto">
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Shift Audit PDF</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'audit'
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Authorization Audit Trail ({historyRecords.length})
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'metrics'
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Shift Performance Summary
        </button>
      </div>

      {activeTab === 'audit' ? (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="pb-3 font-semibold">Timestamp</th>
                  <th className="pb-3 font-semibold">Event Type</th>
                  <th className="pb-3 font-semibold">Title / Action</th>
                  <th className="pb-3 font-semibold">Authorized By</th>
                  <th className="pb-3 font-semibold">Outcome Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {historyRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 font-bold text-slate-700 whitespace-nowrap">
                      {record.timestamp}
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100">
                        {record.type}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-slate-900">{record.title}</td>
                    <td className="py-3.5 text-slate-600 font-medium flex items-center gap-1.5">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{record.user}</span>
                    </td>
                    <td className="py-3.5 text-slate-600 leading-relaxed">{record.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">Shift Interventions</div>
            <div className="text-3xl font-black text-slate-900 mb-1">12</div>
            <p className="text-xs text-slate-500">Autonomous recommendations approved by human coordinator.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">Congestion Avoidance Rate</div>
            <div className="text-3xl font-black text-emerald-600 mb-1">94.2%</div>
            <p className="text-xs text-slate-500">Capacity alerts mitigated before reaching critical overflow.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">Triage Accuracy Alignment</div>
            <div className="text-3xl font-black text-purple-600 mb-1">98.5%</div>
            <p className="text-xs text-slate-500">Clinical agreement between ML urgency score and attending nurse.</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default HistoryReportsPage;
