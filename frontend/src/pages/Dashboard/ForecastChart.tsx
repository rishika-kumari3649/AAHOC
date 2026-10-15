import React, { useState } from 'react';
import type { ArrivalForecastPoint } from '../../types';

interface ForecastChartProps {
  data: ArrivalForecastPoint[];
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const [hoveredPoint, setHoveredPoint] = useState<ArrivalForecastPoint | null>(null);

  // Chart Dimensions
  const width = 800;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = 90;
  const minVal = 0;

  const pointsCount = data.length;

  const getX = (index: number) => paddingX + (index / (pointsCount - 1)) * (width - paddingX * 2);
  const getY = (val: number) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);

  // Split into historical line vs forecast line
  const historyPoints = data.filter(d => !d.isForecast);
  const forecastStartIndex = historyPoints.length - 1;

  // Build SVG path for history
  const historyPath = historyPoints.reduce((acc, point, i) => {
    const x = getX(i);
    const y = getY(point.arrivals);
    if (i === 0) return `M ${x} ${y}`;
    
    // Smooth Bezier Curve
    const prevX = getX(i - 1);
    const prevY = getY(historyPoints[i - 1].arrivals);
    const midX = (prevX + x) / 2;
    return `${acc} C ${midX} ${prevY}, ${midX} ${y}, ${x} ${y}`;
  }, '');

  // Build SVG path for forecast
  const lastHistoryX = getX(forecastStartIndex);
  const lastHistoryY = getY(historyPoints[forecastStartIndex].arrivals);
  const forecastX = getX(forecastStartIndex + 1);
  const forecastY = getY(data[forecastStartIndex + 1].arrivals);
  const forecastPath = `M ${lastHistoryX} ${lastHistoryY} L ${forecastX} ${forecastY}`;

  // Area under history curve
  const areaPath = `${historyPath} L ${lastHistoryX} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;

  return (
    <div className="w-full relative select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: '260px' }}
      >
        <defs>
          <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gridlines & Y-Axis Labels */}
        {[20, 40, 60, 80].map((gridVal) => {
          const y = getY(gridVal);
          return (
            <g key={gridVal}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#F1F5F9"
                strokeWidth="1.5"
              />
              <text
                x={paddingX - 12}
                y={y + 4}
                textAnchor="end"
                className="text-[11px] fill-slate-400 font-medium font-sans"
              >
                {gridVal}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill="url(#curveGradient)" />

        {/* Historical Smooth Green Curve */}
        <path
          d={historyPath}
          fill="none"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dashed Amber Forecast Line */}
        <path
          d={forecastPath}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />

        {/* History Node Markers */}
        {historyPoints.map((point, i) => {
          const cx = getX(i);
          const cy = getY(point.arrivals);
          const isHovered = hoveredPoint?.timeLabel === point.timeLabel;
          return (
            <g key={point.timeLabel}>
              <circle
                cx={cx}
                cy={cy}
                r={isHovered ? 6 : 4}
                className="fill-white stroke-[#10B981] stroke-[2.5] cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </g>
          );
        })}

        {/* Forecast Node Marker */}
        {data[forecastStartIndex + 1] && (
          <g>
            <circle
              cx={forecastX}
              cy={forecastY}
              r={hoveredPoint?.isForecast ? 7 : 5}
              className="fill-white stroke-[#F59E0B] stroke-[3] cursor-pointer"
              onMouseEnter={() => setHoveredPoint(data[forecastStartIndex + 1])}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          </g>
        )}
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredPoint && (
        <div
          className="absolute bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 font-medium"
          style={{
            left: `${(getX(data.findIndex(p => p.timeLabel === hoveredPoint.timeLabel)) / width) * 100}%`,
            top: `${(getY(hoveredPoint.arrivals) / height) * 100}%`,
          }}
        >
          <div className="font-bold">{hoveredPoint.timeLabel}</div>
          <div className={hoveredPoint.isForecast ? 'text-amber-400' : 'text-emerald-400'}>
            {hoveredPoint.arrivals} arrivals {hoveredPoint.isForecast ? '(Forecasted)' : ''}
          </div>
        </div>
      )}
    </div>
  );
};
