import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  INITIAL_KPIS,
  HOSPITAL_FINANCIAL_KPIS,
  INITIAL_FORECAST,
  INITIAL_ALERTS,
  INITIAL_RECOMMENDATIONS,
  MOCK_PATIENTS,
  MOCK_DEPARTMENTS
} from '../../features/admin/mockData';
import type { KpiItem, RecommendationItem, Patient } from '../../features/admin/types';
import { AdminKpiCards } from '../../features/admin/components/AdminKpiCards';
import { ArrivalsForecastChart } from '../../features/admin/components/ArrivalsForecastChart';
import { AdminAlertsCard } from '../../features/admin/components/AdminAlertsCard';
import { AdminRecommendationsCard } from '../../features/admin/components/AdminRecommendationsCard';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

export const AdminDashboardPage: React.FC = () => {
  const [kpiMode, setKpiMode] = useState<'operations' | 'executive'>('operations');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [forecastRange, setForecastRange] = useState('Today');
  const [recs, setRecs] = useState<RecommendationItem[]>(INITIAL_RECOMMENDATIONS);
  const [kpis] = useState<KpiItem[]>(INITIAL_KPIS);
  const [lastUpdated, setLastUpdated] = useState('just now');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('just now');
    }, 600);
  };

  const handleExport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      reportTitle: 'AAHOC Hospital Operational & Administrative Census',
      kpis: kpiMode === 'operations' ? kpis : HOSPITAL_FINANCIAL_KPIS,
      forecast: INITIAL_FORECAST,
      activeAlerts: INITIAL_ALERTS,
      recommendations: recs,
      departments: MOCK_DEPARTMENTS,
      recentPatients: MOCK_PATIENTS
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hospital-admin-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDecision = (id: number, decision: 'approve' | 'dismiss') => {
    setRecs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: decision === 'approve' ? 'approved' : 'dismissed' } : r))
    );
  };

  const patientColumns: Column<Patient>[] = [
    {
      header: 'Patient / MRN',
      render: (p) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text)' }}>{p.name}</div>
          <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '1px' }}>{p.mrn}</div>
        </div>
      )
    },
    {
      header: 'Demographics',
      render: (p) => `${p.age} yrs &bull; ${p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : p.gender}`
    },
    {
      header: 'Department',
      accessor: 'department'
    },
    {
      header: 'Attending Doctor',
      render: (p) => (
        <span style={{ fontWeight: 500 }}>{p.doctor}</span>
      )
    },
    {
      header: 'Triage Acuity',
      render: (p) => {
        let badgeClass = 'green';
        if (p.triage.startsWith('T1')) badgeClass = 'high';
        else if (p.triage.startsWith('T2')) badgeClass = 'orange';
        else if (p.triage.startsWith('T3')) badgeClass = 'amber';
        return <span className={`badge ${badgeClass}`}>{p.triage}</span>;
      }
    },
    {
      header: 'Room / Bed',
      render: (p) => <code style={{ fontSize: '.8rem', color: '#1E293B', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>{p.bed}</code>
    },
    {
      header: 'Status',
      render: (p) => {
        let badgeClass = 'blue';
        if (p.status === 'Critical') badgeClass = 'high';
        if (p.status === 'Inpatient') badgeClass = 'purple';
        if (p.status === 'Discharged') badgeClass = 'gray';
        return <span className={`badge ${badgeClass}`}>{p.status}</span>;
      }
    }
  ];

  return (
    <div id="tab-dashboard" className="tab-pane active" style={{ display: 'block' }}>
      {/* Eyebrow */}
      <div className="eyebrow">
        OPERATIONAL OVERVIEW'S <span className="eyebrow-line"></span>
      </div>

      {/* Header Row */}
      <div className="header-row">
        <div>
          <h1>Hospital Operations &amp; Administration</h1>
          <p className="subtext">
            Real-time census, patient arrivals forecast, and AI-assisted operational coordination.
          </p>
        </div>

        <div className="header-actions">
          {/* KPI toggle */}
          <div
            style={{
              display: 'inline-flex',
              background: '#F1F5F9',
              padding: '3px',
              borderRadius: '9px',
              marginRight: '6px'
            }}
          >
            <button
              onClick={() => setKpiMode('operations')}
              style={{
                border: 'none',
                background: kpiMode === 'operations' ? '#FFFFFF' : 'transparent',
                color: kpiMode === 'operations' ? 'var(--text)' : 'var(--muted)',
                fontWeight: kpiMode === 'operations' ? 700 : 500,
                fontSize: '.78rem',
                padding: '6px 12px',
                borderRadius: '7px',
                cursor: 'pointer',
                boxShadow: kpiMode === 'operations' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.15s'
              }}
            >
              Arrivals &amp; Capacity
            </button>
            <button
              onClick={() => setKpiMode('executive')}
              style={{
                border: 'none',
                background: kpiMode === 'executive' ? '#FFFFFF' : 'transparent',
                color: kpiMode === 'executive' ? 'var(--text)' : 'var(--muted)',
                fontWeight: kpiMode === 'executive' ? 700 : 500,
                fontSize: '.78rem',
                padding: '6px 12px',
                borderRadius: '7px',
                cursor: 'pointer',
                boxShadow: kpiMode === 'executive' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.15s'
              }}
            >
              Census &amp; Revenue
            </button>
          </div>

          <button
            className="btn-outline"
            id="refreshBtn"
            onClick={handleRefresh}
            title="Refresh live metrics"
          >
            <i
              className={`bi bi-arrow-clockwise ${
                isRefreshing ? 'bi-arrow-clockwise-spin' : ''
              }`}
              style={{
                display: 'inline-block',
                transition: 'transform 0.4s ease',
                transform: isRefreshing ? 'rotate(360deg)' : 'none'
              }}
            ></i>{' '}
            Refresh
          </button>

          <button className="btn-dark" id="exportBtn" onClick={handleExport}>
            Export report <i className="bi bi-download"></i>
          </button>
        </div>
      </div>

      {/* Last updated indicator */}
      <div className="row-between" style={{ marginTop: '-10px', marginBottom: '12px' }}>
        <div style={{ fontSize: '.76rem', color: 'var(--muted)' }}>
          Active Stream: Emergency Inflow &bull; Inpatient Bed Census &bull; Critical Care
        </div>
        <div className="last-updated">
          Updated <strong>{lastUpdated}</strong>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <AdminKpiCards kpis={kpiMode === 'operations' ? kpis : HOSPITAL_FINANCIAL_KPIS} />

      {/* Two Column Section: Forecast Panel + Alerts Panel */}
      <div className="two-col">
        {/* Left: Arrivals Forecast Panel */}
        <div className="panel forecast-panel">
          <div className="panel-head">
            <div>
              <h2>Patient arrivals forecast</h2>
              <p className="subtext">Hourly arrivals and the next-hour forecast</p>
            </div>
            <div className="forecast-controls">
              <div className="forecast-legend" aria-label="Chart legend">
                <span>
                  <span className="legend-dot current"></span>Current
                </span>
                <span>
                  <span className="legend-dot predicted"></span>Next hour
                </span>
              </div>
              <select
                className="range-select"
                value={forecastRange}
                onChange={(e) => setForecastRange(e.target.value)}
              >
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This week">This week</option>
              </select>
            </div>
          </div>

          <div className="forecast-stats">
            <div>
              <div className="stat-lbl">Expected in 1 hour</div>
              <div className="stat-val">
                +{INITIAL_FORECAST.pred1h} <span>arrivals</span>
              </div>
            </div>
            <div>
              <div className="stat-lbl">Expected in 2 hours</div>
              <div className="stat-val">
                +{INITIAL_FORECAST.pred2h} <span>arrivals</span>
              </div>
            </div>
            <div>
              <div className="stat-lbl">Congestion risk</div>
              <div className="stat-val risk">{INITIAL_FORECAST.risk}</div>
            </div>
          </div>

          <ArrivalsForecastChart data={INITIAL_FORECAST} />

          <div className="footnote">
            <i className="bi bi-info-circle"></i> Forecast is an estimate based on recent arrival patterns and current conditions.
          </div>
        </div>

        {/* Right: Alerts Panel */}
        <AdminAlertsCard alerts={INITIAL_ALERTS} maxCount={4} />
      </div>

      {/* Recommendations Panel */}
      <AdminRecommendationsCard
        recommendations={recs}
        onDecision={handleDecision}
        showAll={false}
      />

      {/* Department Capacity Breakdown */}
      <div className="panel" style={{ marginBottom: '24px' }}>
        <div className="panel-head">
          <div>
            <h2>Department Capacity &amp; Inpatient Census</h2>
            <p className="subtext">Staffing ratios and occupied beds by hospital division</p>
          </div>
          <Link to="/admin/departments" className="link-btn">
            Manage all departments <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {MOCK_DEPARTMENTS.slice(0, 4).map((dept) => (
            <div
              key={dept.id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '11px',
                padding: '14px',
                background: '#FAFBFC'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{dept.name}</div>
                  <div style={{ fontSize: '.74rem', color: 'var(--muted)' }}>Head: {dept.headOfDept}</div>
                </div>
                <span
                  className={`badge ${
                    dept.status === 'Critical Surge'
                      ? 'high'
                      : dept.status === 'High Capacity'
                      ? 'amber'
                      : 'green'
                  }`}
                >
                  {dept.status}
                </span>
              </div>

              <div style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.76rem', color: 'var(--muted)', marginBottom: '4px' }}>
                  <span>Bed Occupancy</span>
                  <span style={{ fontWeight: 700, color: 'var(--text)' }}>
                    {dept.occupiedBeds} / {dept.totalBeds} ({dept.occupancyRate}%)
                  </span>
                </div>
                <div className="kpi-progress" style={{ marginTop: '2px', height: '5px' }}>
                  <div
                    className={`kpi-progress-bar ${
                      dept.occupancyRate > 90
                        ? 'purple'
                        : dept.occupancyRate > 80
                        ? 'orange'
                        : 'green'
                    }`}
                    style={{ width: `${dept.occupancyRate}%` }}
                  ></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border)', fontSize: '.74rem', color: 'var(--muted)' }}>
                <span><i className="bi bi-person-badge"></i> {dept.doctorsCount} Doctors</span>
                <span><i className="bi bi-heart-pulse"></i> {dept.nursesCount} Nurses</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Admissions Data Table */}
      <HospitalDataTable
        title="Recent Patient Inflow &amp; Inpatient Admissions"
        subtitle="Live registry of currently admitted cases, emergency triage acuteness, and room allocations."
        columns={patientColumns}
        data={MOCK_PATIENTS}
        searchPlaceholder="Filter patients by name, MRN, department..."
        searchFilter={(p, term) =>
          p.name.toLowerCase().includes(term) ||
          p.mrn.toLowerCase().includes(term) ||
          p.department.toLowerCase().includes(term) ||
          p.doctor.toLowerCase().includes(term)
        }
        secondaryAction={{
          label: 'View Directory',
          icon: 'bi-people',
          onClick: () => {
            window.location.href = '/admin/patients';
          }
        }}
      />
    </div>
  );
};