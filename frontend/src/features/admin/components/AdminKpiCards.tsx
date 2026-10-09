import React from 'react';
import type { KpiItem } from '../types';

interface AdminKpiCardsProps {
  kpis: KpiItem[];
}

export const AdminKpiCards: React.FC<AdminKpiCardsProps> = ({ kpis }) => {
  return (
    <div className="kpi-grid" id="kpiRow">
      {kpis.map((k) => (
        <div key={k.id} className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">{k.label}</div>
            <div className={`kpi-icon ${k.color}`}>
              <i className={`bi ${k.icon}`}></i>
            </div>
          </div>
          
          <div className="kpi-value">
            {k.value}
            {k.suffix && k.bar == null ? (
              <sup style={{ fontSize: '.85rem', fontWeight: 500, color: 'var(--muted)', marginLeft: '3px' }}>
                {k.suffix}
              </sup>
            ) : k.bar != null ? (
              <sup>%</sup>
            ) : null}
          </div>

          {k.delta && (
            <div className={`kpi-delta ${k.deltaClass || ''}`}>
              {k.delta}{' '}
              {k.deltaNote && <span style={{ color: 'var(--muted)' }}>{k.deltaNote}</span>}
            </div>
          )}

          {k.bar != null && (
            <>
              <div className="kpi-progress">
                <div
                  className={`kpi-progress-bar ${k.barClass || 'purple'}`}
                  style={{ width: `${k.bar}%` }}
                ></div>
              </div>
              <div className="kpi-foot">
                <span>{k.foot}</span>
                {k.tag && <span className={`kpi-tag ${k.tagClass || 'ok'}`}>{k.tag}</span>}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
