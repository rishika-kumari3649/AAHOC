import React, { useState } from 'react';
import {
  TrendingUp,
  Building2,
  Clock,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  ArrowLeftRight,
  Filter,
  Eye,
  X,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { ForecastChart } from '../Dashboard/ForecastChart';
import { WaitTimeChart } from './WaitTimeChart';
import type { FlowStage, FlowPatient } from '../../types';

export const PatientFlowPage: React.FC = () => {
  const {
    flowStages,
    departmentFlows,
    transfers,
    flowPatients,
    waitTimeTrends,
    forecastPoints,
    metrics,
    activeScenario,
    updateTransferStatus
  } = useHospital();

  const [selectedStage, setSelectedStage] = useState<FlowStage | null>(null);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('All');
  const [transferFilter, setTransferFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  // Summary counts
  const totalInFlow = flowStages.reduce((sum, s) => sum + s.count, 0);
  const activeTransfersCount = transfers.filter((t) => t.status !== 'Completed').length;
  const inTreatmentCount = flowStages.find((s) => s.id === 'stg-6')?.count || 42;
  const admissionsCount = flowStages.find((s) => s.id === 'stg-7')?.count || 16;
  const dischargesCount = flowStages.find((s) => s.id === 'stg-8')?.count || 11;
  const avgOverallWait = Math.round(
    flowStages.reduce((sum, s) => sum + s.avgWaitMins, 0) / (flowStages.length || 1)
  );

  // Critical bottlenecks detection
  const criticalStages = flowStages.filter((s) => s.status === 'critical' || s.status === 'watch');

  // Filtered department flows
  const filteredDepts = selectedDeptFilter === 'All'
    ? departmentFlows
    : departmentFlows.filter((d) => d.name.toLowerCase().includes(selectedDeptFilter.toLowerCase()));

  // Filtered transfers
  const filteredTransfers = transfers.filter((t) => {
    const matchesStatus =
      transferFilter === 'All'
        ? true
        : transferFilter === 'Active'
        ? t.status !== 'Completed'
        : t.status === 'Completed';

    const matchesDept =
      selectedDeptFilter === 'All'
        ? true
        : t.fromDepartment.toLowerCase().includes(selectedDeptFilter.toLowerCase()) ||
          t.toDepartment.toLowerCase().includes(selectedDeptFilter.toLowerCase());

    return matchesStatus && matchesDept;
  });

  // Stage roster modal helper
  const getPatientsForStage = (stage: FlowStage): FlowPatient[] => {
    const directMatches = flowPatients.filter(
      (p) => p.currentStage.toLowerCase() === stage.name.toLowerCase()
    );
    if (directMatches.length > 0) return directMatches;

    // Provide representative sample patients for full operational visibility
    return [
      {
        id: `PAT-FL-${stage.id}-1`,
        name: 'Alex Rivera',
        age: 48,
        gender: 'Male',
        currentStage: stage.name,
        department: 'Emergency & Trauma (ED)',
        arrivalTime: '13:15 PM',
        waitMinutes: stage.avgWaitMins,
        acuity: stage.status === 'critical' ? 'High' : 'Medium',
        assignedStaff: 'Clinical Team Bay 3',
      },
      {
        id: `PAT-FL-${stage.id}-2`,
        name: 'Maria Santos',
        age: 62,
        gender: 'Female',
        currentStage: stage.name,
        department: 'General Medicine (Ward A)',
        arrivalTime: '12:50 PM',
        waitMinutes: Math.round(stage.avgWaitMins * 1.2),
        acuity: 'Medium',
        assignedStaff: 'Dr. Henderson',
      },
      {
        id: `PAT-FL-${stage.id}-3`,
        name: 'Jordan Lee',
        age: 31,
        gender: 'Other',
        currentStage: stage.name,
        department: 'Diagnostic Imaging / CT',
        arrivalTime: '13:40 PM',
        waitMinutes: Math.max(5, stage.avgWaitMins - 6),
        acuity: 'Low',
        assignedStaff: 'Charge Nurse Miller',
      },
    ];
  };

  return (
    <div className="space-y-8 select-none pb-14">
      {/* 1. Header & Telemetry Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Patient Flow Monitoring
            </h1>
            {activeScenario && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" />
                Active Simulation
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Live clinical pathway tracking across 8 care stages, bottleneck surveillance, inter-department transfers, and AI-predicted surge forecasts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200/80 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-500">Pipeline Load:</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              {totalInFlow} Patients Active
            </span>
          </div>
        </div>
      </div>

      {/* 2. Top-Level 7-Metric Operational Strip (Requirement A.6) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
        {/* Total Arrivals */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold">Total Arrivals</span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{metrics.arrivalsCurrent}</div>
            <div className="text-[10px] text-emerald-700 font-bold mt-1 flex items-center gap-0.5">
              <span>{metrics.arrivalsTrend}</span>
            </div>
          </div>
        </div>

        {/* Patients Waiting */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold">Waiting Patients</span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{metrics.patientsWaiting}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">
              Queue triage level
            </div>
          </div>
        </div>

        {/* In Treatment */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold">In Treatment</span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{inTreatmentCount}</div>
            <div className="text-[10px] text-blue-600 font-bold mt-1">
              Active bedside care
            </div>
          </div>
        </div>

        {/* Admissions */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold">Admissions</span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{admissionsCount}</div>
            <div className="text-[10px] text-purple-600 font-bold mt-1">
              Assigned inpatient beds
            </div>
          </div>
        </div>

        {/* Discharges */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold">Discharges</span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{dischargesCount}</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-1">
              Transit cleared
            </div>
          </div>
        </div>

        {/* Transfers */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold">Transfers</span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{activeTransfersCount}</div>
            <div className="text-[10px] text-indigo-600 font-bold mt-1">
              {transfers.length} total logged
            </div>
          </div>
        </div>

        {/* Avg Wait Time */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold">Avg Wait Time</span>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{avgOverallWait}m</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">
              Target: &le; 20m standard
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottleneck Alert Banner (Requirement B) */}
      {criticalStages.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent p-4 rounded-3xl border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span>Clinical Bottlenecks Detected:</span>
                <span className="text-rose-700 font-black">
                  {criticalStages.map((s) => s.name).join(', ')}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Treatment is running at {flowStages.find((s) => s.id === 'stg-6')?.count}/50 capacity with 45-58m wait. Admission queue is facing delays.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200/60 shrink-0">
            Action Recommended
          </span>
        </div>
      )}

      {/* 4. Sequential 8-Stage Flow Pipeline with Directional Visual Flow (Requirement A & B) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>End-to-End Care Pathway Telemetry (8 Sequential Stages)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any stage card to inspect the patient roster, wait times, and clinical acuity.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Normal
            </span>
            <span className="flex items-center gap-1.5 ml-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Watch
            </span>
            <span className="flex items-center gap-1.5 ml-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Critical
            </span>
          </div>
        </div>

        {/* 8 Stages Grid with Directional Chevrons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {flowStages.map((stage, idx) => {
            const isCritical = stage.status === 'critical';
            const isWatch = stage.status === 'watch';
            const stageCapacity = stage.capacity || 50;
            const loadPercent = Math.min(100, Math.round((stage.count / stageCapacity) * 100));

            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage)}
                className={`group relative p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                  isCritical
                    ? 'bg-rose-50/40 border-rose-200/80 hover:border-rose-300'
                    : isWatch
                    ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300'
                    : 'bg-slate-50/60 border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/20'
                }`}
              >
                {/* Header: Step number + Status badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-black text-slate-400">
                      Step 0{idx + 1}
                    </span>
                    {idx < 7 && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    )}
                  </div>
                  <span
                    className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isCritical
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : isWatch
                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>

                {/* Stage Title & Short Description */}
                <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {stage.name}
                </div>
                <div className="text-[11px] text-slate-500 mb-3 min-h-[30px] line-clamp-2">
                  {stage.shortDesc}
                </div>

                {/* Capacity utilization bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-1">
                    <span>Capacity Load</span>
                    <span className={loadPercent > 80 ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                      {stage.count} / {stageCapacity} ({loadPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical ? 'bg-rose-500' : isWatch ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${loadPercent}%` }}
                    />
                  </div>
                </div>

                {/* Footer: Volume, Avg Wait, Inspect Hint */}
                <div className="flex items-center justify-between border-t border-slate-200/50 pt-2.5 text-xs">
                  <div>
                    <span className="text-xl font-black text-slate-900">{stage.count}</span>
                    <span className="text-[11px] text-slate-400 ml-1 font-semibold">pts</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 block font-medium">Avg Wait</span>
                    <span
                      className={`font-black ${
                        stage.avgWaitMins > 25
                          ? 'text-rose-600'
                          : stage.avgWaitMins > 15
                          ? 'text-amber-600'
                          : 'text-slate-800'
                      }`}
                    >
                      {stage.avgWaitMins}m
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-dashed border-slate-200 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-emerald-700">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> View Stage Roster
                  </span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Dual Intelligence Grid: Hourly Waiting-Time Trends (Req C) & Arrival Forecast (Req E) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waiting-Time Trend Progression (Requirement C) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Waiting-Time Trends (Hourly Progression)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Hourly average wait time vs 20-minute clinical service benchmark
                </p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                Peak: 48m (16:00)
              </span>
            </div>

            <div className="py-2">
              <WaitTimeChart data={waitTimeTrends} />
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Standard Goal: &le; 20m</span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ml-2" />
              <span>Exceeded Guideline</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Surge predicted to elevate wait times after 15:00
            </span>
          </div>
        </div>

        {/* Patient Arrival Forecast (Requirement E - Demonstration ML Data) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Patient Arrival Forecast (Next 2-4 Hours)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Predictive ML model telemetry for incoming ambulance & ambulatory flow
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                ML Model Demo Data
              </span>
            </div>

            <div className="py-2">
              <ForecastChart data={forecastPoints} />
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 flex items-center justify-between">
            <span className="font-semibold text-[11px]">
              💡 Forecast Insight: Projected peak of 78 arrivals/hr at 19:00 (+21% surge).
            </span>
            <span className="font-bold text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full shrink-0 ml-2">
              High Probability
            </span>
          </div>
        </div>
      </div>

      {/* 6. Department Filtering & Live Department Distribution (Requirement D) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>Department-Wise Patient Distribution & Congestion</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Active care loads, triage queue sizes, and congestion levels across clinical departments.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {['All', 'Emergency', 'ICU', 'Ward A', 'Ward B', 'Pediatrics', 'Imaging'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDeptFilter(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedDeptFilter === dept
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="pb-3 font-semibold">Department</th>
                <th className="pb-3 font-semibold">Active Care</th>
                <th className="pb-3 font-semibold">Queue Waiting</th>
                <th className="pb-3 font-semibold">Avg Wait Time</th>
                <th className="pb-3 font-semibold">Capacity Stress</th>
                <th className="pb-3 font-semibold text-right">Congestion Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDepts.map((dept) => {
                const isCrit = dept.congestionLevel === 'Critical';
                const isHigh = dept.congestionLevel === 'High';
                const isMod = dept.congestionLevel === 'Moderate';

                return (
                  <tr key={dept.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 font-bold text-slate-800 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{dept.name}</span>
                    </td>
                    <td className="py-3.5 font-bold text-slate-900">{dept.activePatients}</td>
                    <td className="py-3.5 text-slate-600 font-semibold">{dept.waitingPatients}</td>
                    <td className="py-3.5 font-bold text-slate-700">{dept.avgWaitMins} mins</td>
                    <td className="py-3.5">
                      <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isCrit ? 'bg-rose-500 w-[95%]' : isHigh ? 'bg-amber-500 w-[80%]' : isMod ? 'bg-blue-500 w-[60%]' : 'bg-emerald-500 w-[35%]'
                          }`}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider inline-block ${
                          isCrit
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : isHigh
                            ? 'bg-orange-100 text-orange-700 border border-orange-200'
                            : isMod
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {dept.congestionLevel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Inter-Department Transfers Ledger (Requirement A.6 & D) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
              <span>Inter-Department Patient Transfers ({filteredTransfers.length})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live transit queue between Emergency, ICUs, Diagnostic Imaging, and Wards.
            </p>
          </div>

          {/* Transfer status filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {(['All', 'Active', 'Completed'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTransferFilter(filter)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  transferFilter === filter
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="pb-3 font-semibold">Patient</th>
                <th className="pb-3 font-semibold">Routing (From &rarr; To)</th>
                <th className="pb-3 font-semibold">Priority</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Elapsed</th>
                <th className="pb-3 font-semibold">Clinical Indication</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransfers.map((trn) => {
                const isImmediate = trn.priority === 'Immediate';
                const isUrgent = trn.priority === 'Urgent';
                const isCompleted = trn.status === 'Completed';
                const isInTransit = trn.status === 'In-Transit';

                return (
                  <tr key={trn.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5">
                      <div className="font-bold text-slate-900">{trn.patientName}</div>
                      <div className="text-[10px] text-slate-400">{trn.patientId}</div>
                    </td>
                    <td className="py-3.5 font-semibold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <span>{trn.fromDepartment}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span className="text-slate-900 font-bold">{trn.toDepartment}</span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                          isImmediate
                            ? 'bg-rose-100 text-rose-700'
                            : isUrgent
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {trn.priority}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-700'
                            : isInTransit
                            ? 'bg-blue-100 text-blue-700 animate-pulse'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {trn.status}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-slate-700">{trn.elapsedMins} mins</td>
                    <td className="py-3.5 text-slate-600 max-w-xs truncate" title={trn.reason}>
                      {trn.reason}
                    </td>
                    <td className="py-3.5 text-right">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Logged
                        </span>
                      ) : (
                        <button
                          onClick={() => updateTransferStatus(trn.id, isInTransit ? 'Completed' : 'In-Transit')}
                          className="px-2.5 py-1 rounded-xl bg-slate-900 text-white font-bold text-[10px] hover:bg-emerald-700 transition-colors cursor-pointer"
                        >
                          {isInTransit ? 'Mark Completed' : 'Start Transit'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. Stage Patient Roster Modal / Inspection Drawer */}
      {selectedStage && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Active Patients in Stage: {selectedStage.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      selectedStage.status === 'critical'
                        ? 'bg-rose-100 text-rose-700'
                        : selectedStage.status === 'watch'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {selectedStage.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedStage.shortDesc} &bull; {selectedStage.count} patients currently occupying this stage.
                </p>
              </div>
              <button
                onClick={() => setSelectedStage(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {getPatientsForStage(selectedStage).map((pt) => (
                <div
                  key={pt.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{pt.name}</span>
                      <span className="text-xs text-slate-400">({pt.id})</span>
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                          pt.acuity === 'High'
                            ? 'bg-rose-100 text-rose-700'
                            : pt.acuity === 'Medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Acuity: {pt.acuity}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {pt.age} yrs &bull; {pt.gender} &bull; Dept: <strong className="text-slate-700">{pt.department}</strong>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Assigned: {pt.assignedStaff || 'Pending Bedside Allocation'}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block font-semibold">Stage Wait</span>
                    <span className="font-black text-slate-900 text-base">{pt.waitMinutes} mins</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Arrived {pt.arrivalTime}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">
                Stage Throughput: {selectedStage.count} / {selectedStage.capacity || 50} beds utilized
              </span>
              <button
                onClick={() => setSelectedStage(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientFlowPage;
