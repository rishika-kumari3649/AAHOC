import React, { useState } from 'react';
import { INITIAL_RECOMMENDATIONS, INITIAL_KPIS, MOCK_DEPARTMENTS } from '../../features/admin/mockData';
import { AdminRecommendationsCard } from '../../features/admin/components/AdminRecommendationsCard';
import type { RecommendationItem } from '../../features/admin/types';

export const AdminReportsPage: React.FC = () => {
  const [recs, setRecs] = useState<RecommendationItem[]>(INITIAL_RECOMMENDATIONS);

  const handleDecision = (id: number, decision: 'approve' | 'dismiss') => {
    setRecs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: decision === 'approve' ? 'approved' : 'dismissed' } : r))
    );
  };

  const handleExportJson = () => {
    const report = {
      timestamp: new Date().toISOString(),
      reportType: 'AAHOC Hospital Intelligence Master Report',
      kpis: INITIAL_KPIS,
      departments: MOCK_DEPARTMENTS,
      recommendations: recs
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hospital-analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reportsList = [
    {
      title: 'Daily Hospital Census & Bed Occupancy Report',
      period: 'Today, 24-hour cycle',
      generated: '09:00 AM',
      category: 'Inpatient Operations',
      size: '2.4 MB'
    },
    {
      title: 'Emergency Department Throughput & Diversion Risk',
      period: 'Rolling 7-day window',
      generated: '08:30 AM',
      category: 'Acute Care & ED',
      size: '4.1 MB'
    },
    {
      title: 'Revenue Cycle & Claims Adjudication Summary',
      period: 'Monthly (October 2026)',
      generated: 'Yesterday',
      category: 'Financial Management',
      size: '1.8 MB'
    },
    {
      title: 'Pharmacy Depository & High-Cost Drug Utilization',
      period: 'Past 30 days',
      generated: '2 days ago',
      category: 'Clinical Pharmacy',
      size: '3.2 MB'
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        CLINICAL &amp; FINANCIAL ANALYTICS <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Executive Hospital Reports</h1>
          <p className="subtext">
            Operational audits, clinical census data archives, AI decision logs, and compliance exports.
          </p>
        </div>

        <div className="header-actions">
          <button className="btn-dark" onClick={handleExportJson}>
            Export Full Analytics <i className="bi bi-download"></i>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Reports Generated (MTD)</div>
            <div className="kpi-icon blue"><i className="bi bi-file-earmark-bar-graph"></i></div>
          </div>
          <div className="kpi-value">148</div>
          <div className="kpi-delta up">Scheduled daily &amp; weekly</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">AI Recommendations Accepted</div>
            <div className="kpi-icon green"><i className="bi bi-stars"></i></div>
          </div>
          <div className="kpi-value">88.4<sup>%</sup></div>
          <div className="kpi-delta up">Clinical coordinator agreement</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Bed Turnaround Velocity</div>
            <div className="kpi-icon purple"><i className="bi bi-arrow-left-right"></i></div>
          </div>
          <div className="kpi-value">58 min</div>
          <div className="kpi-delta up">Discharge to cleaning complete</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Data Retention Status</div>
            <div className="kpi-icon orange"><i className="bi bi-hdd-network"></i></div>
          </div>
          <div className="kpi-value">7 Years</div>
          <div className="kpi-delta up">Regulatory compliance active</div>
        </div>
      </div>

      {/* Available Executive Reports Table */}
      <div className="panel" style={{ marginBottom: '24px' }}>
        <div className="panel-head">
          <div>
            <h2>Standard Operational Report Archives</h2>
            <p className="subtext">Download scheduled hospital intelligence and census briefs.</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="hospital-table">
            <thead>
              <tr>
                <th>Report Title</th>
                <th>Category</th>
                <th>Reporting Period</th>
                <th>Generated</th>
                <th>File Size</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportsList.map((r, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text)' }}>{r.title}</div>
                  </td>
                  <td>
                    <span className="badge blue">{r.category}</span>
                  </td>
                  <td>{r.period}</td>
                  <td>{r.generated}</td>
                  <td>
                    <code style={{ fontSize: '.76rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                      {r.size}
                    </code>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-outline" style={{ padding: '4px 10px', fontSize: '.76rem' }} onClick={handleExportJson}>
                      <i className="bi bi-download"></i> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations Full Panel */}
      <AdminRecommendationsCard
        recommendations={recs}
        onDecision={handleDecision}
        showAll={true}
      />
    </div>
  );
};