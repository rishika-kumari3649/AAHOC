import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Check
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { ForecastChart } from './ForecastChart';

export const DashboardPage: React.FC = () => {
  const {
    metrics,
    forecastPoints,
    alerts,
    recommendations,
    approveRecommendation,
    dismissRecommendation,
  } = useHospital();

  const [forecastTimeframe] = useState('Today');
  const [alertIndex, setAlertIndex] = useState(0);

  const activeAlerts = alerts.filter((a) => a.status === 'active');
  const primaryRecommendation = recommendations[0];

  return (
    <div className="space-y-8 select-none pb-12">
      {/* 1. OPERATIONAL OVERVIEW'S Title Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            OPERATIONAL OVERVIEW'S
          </h1>
          <div className="h-px bg-slate-200 flex-1 max-w-[120px]" />
        </div>
        <p className="text-sm font-medium text-slate-600">
          Here's what's happening across the hospital right now.
        </p>
        <p className="text-xs text-slate-400">
          Last updated {metrics.lastUpdated}
        </p>
      </div>

      {/* 2. Four Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Patient arrivals */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
          <div className="text-sm font-medium text-slate-500 mb-2">
            Patient arrivals (current)
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-extrabold tracking-tight text-slate-900">
              {metrics.arrivalsCurrent}
            </span>
            <span className="text-slate-400 font-semibold text-sm">/ hr</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>{metrics.arrivalsTrend}</span>
          </div>
        </div>

        {/* Card 2: Patients waiting */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all">
          <div className="text-sm font-medium text-slate-500 mb-2">
            Patients waiting
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-extrabold tracking-tight text-slate-900">
              {metrics.patientsWaiting}
            </span>
            <span className="text-slate-400 font-semibold text-sm">patients</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <ArrowDownRight className="w-4 h-4" />
            <span>{metrics.waitingTrend}</span>
          </div>
        </div>

        {/* Card 3: Inpatient bed occupancy */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div>
            <div className="text-sm font-medium text-slate-500 mb-2">
              Inpatient bed occupancy
            </div>
            <div className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              {metrics.inpatientOccupancyRate}%
            </div>
            {/* Purple Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
              <div
                className="bg-[#7C3AED] h-full rounded-full transition-all duration-500"
                style={{ width: `${metrics.inpatientOccupancyRate}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{metrics.inpatientBedsOccupied} of {metrics.inpatientBedsTotal} beds</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
              Within range
            </span>
          </div>
        </div>

        {/* Card 4: ED capacity */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div>
            <div className="text-sm font-medium text-slate-500 mb-2">
              ED capacity
            </div>
            <div className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              {metrics.edOccupancyRate}%
            </div>
            {/* Green Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
              <div
                className="bg-[#10B981] h-full rounded-full transition-all duration-500"
                style={{ width: `${metrics.edOccupancyRate}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{metrics.edCapacityOccupied} of {metrics.edCapacityTotal} spaces</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold text-[11px]">
              Watch
            </span>
          </div>
        </div>
      </div>

      {/* 3. Patient Arrivals Forecast Card */}
      <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs">
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Patient arrivals forecast
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hourly arrivals and the forecast trend
            </p>
          </div>

          <div className="flex items-center gap-5">
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span>Next hour</span>
              </div>
            </div>

            {/* Timeframe Selector */}
            <div className="relative">
              <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 shadow-xs">
                <span>{forecastTimeframe}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Forecast Quick Stats */}
        <div className="flex items-baseline gap-10 mb-6">
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Expected in 1 hour</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              +15 arrivals
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Congestion risk</div>
            <div className="text-2xl font-black text-[#D97706] tracking-tight">
              Moderate
            </div>
          </div>
        </div>

        {/* The SVG Line Graph */}
        <div className="py-2">
          <ForecastChart data={forecastPoints} />
        </div>

        {/* Footer Caption */}
        <div className="text-xs text-slate-400 mt-4 border-t border-slate-100 pt-3">
          Forecast is an estimate based on recent arrival patterns and current conditions.
        </div>
      </div>

      {/* 4. Alerts Section ("Needs a closer look") */}
      <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Alerts</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {activeAlerts.length}
              </span>
            </h2>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Needs a closer look
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/alerts"
              className="text-xs font-semibold text-[#10B981] hover:text-[#059669] transition-colors"
            >
              View all
            </Link>
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => setAlertIndex(Math.max(0, alertIndex - 1))}
                disabled={alertIndex === 0}
                className="p-1 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setAlertIndex(Math.min(activeAlerts.length - 1, alertIndex + 1))}
                disabled={alertIndex >= activeAlerts.length - 1}
                className="p-1 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Alert Cards List */}
        <div className="space-y-3">
          {activeAlerts.slice(0, 4).map((alert) => {
            const isHigh = alert.severity === 'High';
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isHigh
                    ? 'bg-[#FFF5F2] border-[#FEE0D8]'
                    : 'bg-[#FEFBE8] border-[#FEF08A]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-900">
                      {alert.title}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isHigh
                          ? 'bg-[#FEE4DE] text-[#C2410C]'
                          : 'bg-[#FEF08A] text-[#854D0E]'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    {alert.detail}
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-medium whitespace-nowrap self-end sm:self-center">
                  {alert.timeAgo}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Recommendations Section */}
      <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Recommendations</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {recommendations.filter(r => r.status === 'pending').length} pending
              </span>
            </h2>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Suggested actions based on current operations
            </span>
          </div>

          <Link
            to="/recommendations"
            className="text-xs font-semibold text-[#10B981] hover:text-[#059669] flex items-center gap-1 transition-colors"
          >
            <span>View all recommendations</span>
            <span>→</span>
          </Link>
        </div>

        {/* Primary Recommendation Card */}
        {primaryRecommendation && (
          <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4 shadow-2xs">
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
                  Priority {primaryRecommendation.priority}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {primaryRecommendation.timeAgo}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recommendation Title & Context */}
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {primaryRecommendation.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {primaryRecommendation.description}
              </p>
            </div>

            {/* AI Agent Reasoning Callout */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-700 mb-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Agent reasoning & plan</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {primaryRecommendation.agentReasoning}
              </p>
            </div>

            {/* Action Bar / Human-in-the-Loop Gate */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
              <div className="text-xs text-slate-700">
                <span className="text-slate-400 font-medium mr-2">Recommended action</span>
                <span className="font-semibold text-slate-900">
                  {primaryRecommendation.recommendedAction}
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {primaryRecommendation.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => approveRecommendation(primaryRecommendation.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Execute</span>
                    </button>
                    <button
                      onClick={() => dismissRecommendation(primaryRecommendation.id)}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-colors"
                    >
                      Dismiss
                    </button>
                  </>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 uppercase tracking-wider">
                    {primaryRecommendation.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DashboardPage;
