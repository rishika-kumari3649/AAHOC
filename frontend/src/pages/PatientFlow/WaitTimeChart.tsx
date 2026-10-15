import React, { useState } from 'react';
import type { WaitTimeTrendPoint } from '../../types';

interface WaitTimeChartProps {
  data: WaitTimeTrendPoint[];
}

export const WaitTimeChart: React.FC<WaitTimeChartProps> = ({ data }) => {
  const [hoveredPoint, setHoveredPoint] = useState<WaitTimeTrendPoint | null>(null);

  const width = 760;
  const height = 210;
  const paddingX = 45;
  const paddingY = 28;

  const minVal = 0;
  const maxVal = 60; // 0 to 60 minutes scale
  const targetThreshold = 20; // 20m standard clinical guideline

  const pointsCount = data.length;

  const getX = (index: number) => paddingX + (index / (pointsCount - 1)) * (width - paddingX * 2);
  const getY = (val: number) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);

  // SVG path for wait time trend curve
  const curvePath = data.reduce((acc, point, i) => {
    const x = getX(i);
    const y = getY(point.avgWaitMins);
    if (i === 0) return `M ${x} ${y}`;
    const prevX = getX(i - 1);
    const prevY = getY(data[i - 1].avgWaitMins);
    const midX = (prevX + x) / 2;
    return `${acc} C ${midX} ${prevY}, ${midX} ${y}, ${x} ${y}`;
  }, '');

  const areaPath = `${curvePath} L ${getX(pointsCount - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;
  const targetY = getY(targetThreshold);

  return (
    <div className="w-full relative select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: '230px' }}
      >
        <defs>
          <linearGradient id="waitTrendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#10B981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gridlines & Y-Axis */}
        {[10, 20, 30, 40, 50].map((gridVal) => {
          const y = getY(gridVal);
          const isTarget = gridVal === targetThreshold;
          return (
            <g key={gridVal}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke={isTarget ? '#F59E0B' : '#F1F5F9'}
                strokeWidth={isTarget ? '1.5' : '1'}
                strokeDasharray={isTarget ? '4 4' : undefined}
                strokeOpacity={isTarget ? 0.8 : 1}
              />
              <text
                x={paddingX - 10}
                y={y + 3.5}
                textAnchor="end"
                className={`text-[10px] font-medium font-sans ${isTarget ? 'fill-amber-600 font-bold' : 'fill-slate-400'}`}
              >
                {gridVal}m
              </text>
            </g>
          );
        })}

        {/* Target Threshold Marker Label */}
        <text
          x={width - paddingX}
          y={targetY - 6}
          textAnchor="end"
          className="text-[9px] font-bold fill-amber-600 uppercase tracking-wider"
        >
          Clinical Target (20m Benchmark)
        </text>

        {/* Area fill */}
        <path d={areaPath} fill="url(#waitTrendGradient)" />

        {/* Curve Path */}
        <path
          d={curvePath}
          fill="none"
          stroke="#0F766E"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Data points */}
        {data.map((point, idx) => {
          const cx = getX(idx);
          const cy = getY(point.avgWaitMins);
          const isExceeded = point.avgWaitMins > targetThreshold;

          return (
            <g
              key={point.timeLabel}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle
                cx={cx}
                cy={cy}
                r="6"
                className="fill-white stroke-2 transition-all duration-200"
                stroke={isExceeded ? '#EF4444' : '#10B981'}
              />
              <circle
                cx={cx}
                cy={cy}
                r="3"
                fill={isExceeded ? '#EF4444' : '#10B981'}
              />

              {/* X-axis label */}
              <text
                x={cx}
                y={height - 8}
                textAnchor="middle"
                className="text-[10px] font-medium fill-slate-400 font-sans"
              >
                {point.timeLabel}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredPoint && (
        <div className="absolute top-2 right-4 bg-slate-900/90 text-white text-xs px-3 py-2 rounded-xl backdrop-blur-xs shadow-lg pointer-events-none transition-all">
          <div className="font-bold flex items-center justify-between gap-4">
            <span>{hoveredPoint.timeLabel}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                hoveredPoint.avgWaitMins > targetThreshold
                  ? 'bg-rose-500/20 text-rose-300'
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}
            >
              {hoveredPoint.avgWaitMins > targetThreshold ? 'Above Benchmark' : 'Optimal'}
            </span>
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            Average Wait: <strong className="text-white">{hoveredPoint.avgWaitMins} mins</strong>
          </div>
          <div className="text-[10px] text-slate-400">
            Target Standard: 20 mins
          </div>
        </div>
      )}
    </div>
  );
};
