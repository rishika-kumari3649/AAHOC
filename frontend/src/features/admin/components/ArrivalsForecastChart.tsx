import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import type { ForecastData } from '../types';

interface ArrivalsForecastChartProps {
  data: ForecastData;
}

export const ArrivalsForecastChart: React.FC<ArrivalsForecastChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const lastActualIndex = data.actual.reduce<number>(
      (lastIdx, val, idx) => (val != null ? idx : lastIdx),
      -1
    );

    const nextForecastIndex = data.predicted.findIndex(
      (val, idx) => idx > lastActualIndex && val != null
    );

    const forecastValue = nextForecastIndex < 0 ? null : data.predicted[nextForecastIndex];

    // Build series
    const actualSeriesData = data.labels.map((_, i) =>
      i <= lastActualIndex && data.actual[i] != null ? data.actual[i] : null
    );

    const forecastSeriesData = data.labels.map((_, i) => {
      if (i === lastActualIndex && lastActualIndex >= 0) {
        return data.actual[lastActualIndex];
      }
      if (i === nextForecastIndex && forecastValue != null) {
        return forecastValue;
      }
      return null;
    });

    const categories = data.labels.map((label, i) => {
      if (i === nextForecastIndex) return '+1h';
      if (i === lastActualIndex) return `${label} (Now)`;
      return label;
    });

    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'line',
        height: 220,
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 500
        },
        fontFamily: 'Urbanist, system-ui, sans-serif',
        background: 'transparent'
      },
      colors: ['#16A34A', '#F59E0B'],
      stroke: {
        curve: 'smooth',
        width: [3, 3],
        dashArray: [0, 5]
      },
      series: [
        {
          name: 'Current Arrivals',
          data: actualSeriesData
        },
        {
          name: 'Forecast (+1h)',
          data: forecastSeriesData
        }
      ],
      markers: {
        size: [3.5, 5],
        colors: ['#16A34A', '#F59E0B'],
        strokeColors: '#ffffff',
        strokeWidth: 1.5,
        hover: { size: 6.5 }
      },
      grid: {
        borderColor: '#E7EAEE',
        strokeDashArray: 0,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
        padding: { top: 0, right: 12, bottom: 0, left: 10 }
      },
      xaxis: {
        categories,
        labels: {
          style: {
            colors: '#9CA3AF',
            fontSize: '11px',
            fontFamily: 'Urbanist, system-ui, sans-serif'
          },
          rotate: 0,
          hideOverlappingLabels: true
        },
        axisBorder: { show: false },
        axisTicks: { color: '#E7EAEE' },
        tooltip: { enabled: false }
      },
      yaxis: {
        min: 0,
        tickAmount: 4,
        labels: {
          style: {
            colors: '#9CA3AF',
            fontSize: '11px',
            fontFamily: 'Urbanist, system-ui, sans-serif'
          },
          formatter: (val: number) => `${Math.round(val)}`
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        theme: 'light',
        shared: true,
        intersect: false,
        y: {
          formatter: (val?: number) => (val != null ? `${val} arrivals` : '')
        }
      }
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ApexCharts(chartRef.current, options);
    chartInstance.current.render();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data]);

  return (
    <div
      id="forecastChartViewport"
      className="chart-viewport"
      role="img"
      aria-label="Patient arrivals by hour with next-hour forecast"
      style={{ minHeight: '220px', height: '220px', width: '100%' }}
    >
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
