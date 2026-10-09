import React from 'react';
import { MOCK_DEPARTMENTS } from '../../features/admin/mockData';

export const AdminBedsPage: React.FC = () => {
  return (
    <div>
      <div className="eyebrow">
        BED CAPACITY &amp; CENSUS COMMAND <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Inpatient Bed Inventory &amp; Turnover</h1>
          <p className="subtext">
            Physical bed space availability, intensive care capacity, decontamination status, and surge buffers.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Total Staffed Beds</div>
            <div className="kpi-icon blue"><i className="bi bi-grid-3x3-gap-fill"></i></div>
          </div>
          <div className="kpi-value">300</div>
          <div className="kpi-delta up">279 currently equipped</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Currently Occupied</div>
            <div className="kpi-icon purple"><i className="bi bi-person-fill"></i></div>
          </div>
          <div className="kpi-value">246</div>
          <div className="kpi-delta up">82% occupancy rate</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Ready for Admission</div>
            <div className="kpi-icon green"><i className="bi bi-check-circle-fill"></i></div>
          </div>
          <div className="kpi-value">38</div>
          <div className="kpi-delta up">Sanitized &amp; inspected</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Turnover Cleaning Queue</div>
            <div className="kpi-icon orange"><i className="bi bi-arrow-repeat"></i></div>
          </div>
          <div className="kpi-value">16</div>
          <div className="kpi-delta down">Avg turnover: 28 min</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2>Ward-by-Ward Bed Census Breakdown</h2>
            <p className="subtext">Real-time bed utilization across all hospital floors</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {MOCK_DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '16px',
                background: '#FAFBFC'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong style={{ fontSize: '.92rem' }}>{dept.name}</strong>
                <span className={`badge ${dept.occupancyRate > 90 ? 'high' : dept.occupancyRate > 80 ? 'amber' : 'green'}`}>
                  {dept.occupancyRate}%
                </span>
              </div>

              <div style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Occupancy</span>
                <span style={{ fontWeight: 700, color: 'var(--text)' }}>
                  {dept.occupiedBeds} / {dept.totalBeds} beds
                </span>
              </div>

              <div className="kpi-progress" style={{ margin: '0 0 12px 0' }}>
                <div
                  className={`kpi-progress-bar ${dept.occupancyRate > 90 ? 'purple' : dept.occupancyRate > 80 ? 'orange' : 'green'}`}
                  style={{ width: `${dept.occupancyRate}%` }}
                ></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.76rem', color: 'var(--muted)', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                <span>Available: <strong style={{ color: 'var(--green)' }}>{dept.totalBeds - dept.occupiedBeds}</strong></span>
                <span>Head: {dept.headOfDept}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};