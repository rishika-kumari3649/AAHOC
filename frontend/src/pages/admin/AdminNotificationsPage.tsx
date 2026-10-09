import React, { useState } from 'react';
import { INITIAL_ALERTS } from '../../features/admin/mockData';
import type { AlertItem } from '../../features/admin/types';

export const AdminNotificationsPage: React.FC = () => {
  const [alerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [filterSeverity, setFilterSeverity] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  const highCount = alerts.filter((a) => a.severity.toLowerCase() === 'high').length;
  const mediumCount = alerts.filter((a) => a.severity.toLowerCase() === 'medium').length;
  const lowCount = alerts.filter((a) => a.severity.toLowerCase() === 'low').length;

  const filteredAlerts = filterSeverity === 'All'
    ? alerts
    : alerts.filter((a) => a.severity.toLowerCase() === filterSeverity.toLowerCase());

  return (
    <div id="tab-alerts" className="tab-pane active" style={{ display: 'block' }}>
      {/* Page Header */}
      <div className="alerts-page-header">
        <div>
          <div className="eyebrow">
            OPERATIONS <span className="eyebrow-line"></span>
          </div>
          <h1>Alerts &amp; Operational Warnings</h1>
          <p className="subtext">
            Review hospital operational risks, capacity alerts, their likely impact, and suggested follow-up.
          </p>
        </div>
        <span className="alerts-updated">
          <span className="live-dot"></span> Prioritised by severity
        </span>
      </div>

      {/* Summary Cards */}
      <div className="alert-summary-grid" id="alertSummary">
        <div
          className={`alert-summary-card high ${filterSeverity === 'High' ? 'ring-2 ring-red-400' : ''}`}
          onClick={() => setFilterSeverity(filterSeverity === 'High' ? 'All' : 'High')}
          style={{ cursor: 'pointer' }}
        >
          <div className="alert-summary-icon">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <div>
            <div className="alert-summary-label">High priority</div>
            <div className="alert-summary-count">{highCount}</div>
          </div>
        </div>

        <div
          className={`alert-summary-card medium ${filterSeverity === 'Medium' ? 'ring-2 ring-amber-400' : ''}`}
          onClick={() => setFilterSeverity(filterSeverity === 'Medium' ? 'All' : 'Medium')}
          style={{ cursor: 'pointer' }}
        >
          <div className="alert-summary-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>
          <div>
            <div className="alert-summary-label">Medium priority</div>
            <div className="alert-summary-count">{mediumCount}</div>
          </div>
        </div>

        <div
          className={`alert-summary-card low ${filterSeverity === 'Low' ? 'ring-2 ring-green-400' : ''}`}
          onClick={() => setFilterSeverity(filterSeverity === 'Low' ? 'All' : 'Low')}
          style={{ cursor: 'pointer' }}
        >
          <div className="alert-summary-icon">
            <i className="bi bi-check-circle"></i>
          </div>
          <div>
            <div className="alert-summary-label">Low priority</div>
            <div className="alert-summary-count">{lowCount}</div>
          </div>
        </div>
      </div>

      {/* Alerts Review List */}
      <div className="panel alerts-inbox-panel">
        <div className="panel-head">
          <div>
            <h2>
              Alert review <span className="pill-count solid" id="alertsPageCount">{filteredAlerts.length}</span>
            </h2>
            <p className="subtext">
              High priority first, followed by medium and low priority.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['All', 'High', 'Medium', 'Low'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterSeverity(lvl)}
                className={filterSeverity === lvl ? 'btn-dark' : 'btn-outline'}
                style={{ padding: '5px 12px', fontSize: '.78rem' }}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div id="alertsPageList" className="alerts-page-list">
          {filteredAlerts.map((a) => (
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

              <div className="alert-analysis">
                <div className="alert-analysis-block">
                  <strong>
                    <i className="bi bi-search"></i> Operational review
                  </strong>
                  <p>{a.analysis}</p>
                </div>
                <div className="alert-analysis-block">
                  <strong>
                    <i className="bi bi-arrow-right-circle"></i> Suggested follow-up
                  </strong>
                  <p>{a.action}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredAlerts.length === 0 && (
            <div className="empty-state">
              <i className="bi bi-check2-circle"></i>
              No active alerts matching filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
