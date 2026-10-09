import React from 'react';
import { Link } from 'react-router-dom';
import type { AlertItem } from '../types';

interface AdminAlertsCardProps {
  alerts: AlertItem[];
  maxCount?: number;
}

export const AdminAlertsCard: React.FC<AdminAlertsCardProps> = ({ alerts, maxCount = 6 }) => {
  const displayAlerts = alerts.slice(0, maxCount);

  return (
    <div className="panel alerts-panel">
      <div className="panel-head">
        <div>
          <h2>
            Alerts <span className="pill-count solid" id="alertCount">{alerts.length}</span>
          </h2>
          <p className="subtext">Needs a closer look</p>
        </div>
        <Link to="/admin/notifications" className="link-btn">
          View all
        </Link>
      </div>

      <div className="alerts-list" id="alertsList" tabIndex={0} role="region" aria-label="Alerts list">
        {displayAlerts.map((a) => (
          <div key={a.id} className={`alert-card ${a.severity.toLowerCase()}`}>
            <div className="alert-top">
              <div className="alert-icon">
                <i className={`bi ${a.icon}`}></i>
              </div>
              <div className="alert-title">{a.title}</div>
              <div className="alert-badge">{a.severity}</div>
            </div>
            <div className="alert-desc">{a.desc}</div>
            <div className="alert-time">
              <i className="bi bi-clock"></i> {a.time}
            </div>
          </div>
        ))}

        {displayAlerts.length === 0 && (
          <div className="empty-state" style={{ padding: '24px 12px' }}>
            <i className="bi bi-check2-circle" style={{ fontSize: '1.4rem' }}></i>
            No active alerts at this moment.
          </div>
        )}
      </div>
    </div>
  );
};
