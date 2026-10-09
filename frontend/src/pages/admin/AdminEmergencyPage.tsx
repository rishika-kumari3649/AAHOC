import React, { useState } from 'react';
import { MOCK_EMERGENCY } from '../../features/admin/mockData';
import type { EmergencyCase } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

export const AdminEmergencyPage: React.FC = () => {
  const [cases] = useState<EmergencyCase[]>(MOCK_EMERGENCY);

  const columns: Column<EmergencyCase>[] = [
    {
      header: 'Case ID / Patient',
      render: (e) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text)' }}>{e.patientName}</div>
          <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>
            {e.caseId} &bull; {e.age} yrs
          </div>
        </div>
      )
    },
    {
      header: 'Triage Acuity',
      render: (e) => {
        let badgeClass = 'high';
        if (e.triageLevel.includes('Orange')) badgeClass = 'orange';
        if (e.triageLevel.includes('Yellow')) badgeClass = 'amber';
        if (e.triageLevel.includes('Green')) badgeClass = 'green';
        return <span className={`badge ${badgeClass}`}>{e.triageLevel}</span>;
      }
    },
    {
      header: 'Chief Complaint',
      render: (e) => (
        <span style={{ fontWeight: 500, color: '#1E293B', fontSize: '.82rem' }}>
          {e.chiefComplaint}
        </span>
      )
    },
    {
      header: 'Vital Signs',
      render: (e) => (
        <code style={{ fontSize: '.76rem', background: '#F1F5F9', padding: '3px 6px', borderRadius: '4px' }}>
          {e.vitals}
        </code>
      )
    },
    {
      header: 'Treatment Zone',
      render: (e) => <strong>{e.assignedZone}</strong>
    },
    {
      header: 'Arrival Time',
      accessor: 'arrivalTime'
    },
    {
      header: 'Care Status',
      render: (e) => {
        let badgeClass = 'high';
        if (e.status === 'Under Observation') badgeClass = 'amber';
        if (e.status === 'Stable') badgeClass = 'green';
        return <span className={`badge ${badgeClass}`}>{e.status}</span>;
      }
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        EMERGENCY DEPARTMENT &amp; TRAUMA COMMAND <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Emergency &amp; Trauma Command</h1>
          <p className="subtext">
            Trauma center patient tracking, resuscitation bays, acute acuity triage, and surge management.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Active ED Cases</div>
            <div className="kpi-icon blue"><i className="bi bi-shield-exclamation"></i></div>
          </div>
          <div className="kpi-value">{cases.length + 14}</div>
          <div className="kpi-delta up">38 arrivals per hour</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Priority 1 (Red Resuscitation)</div>
            <div className="kpi-icon orange"><i className="bi bi-heart-pulse-fill"></i></div>
          </div>
          <div className="kpi-value">2</div>
          <div className="kpi-delta alert">Full trauma team deployed</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">ED Capacity Utilization</div>
            <div className="kpi-icon purple"><i className="bi bi-pie-chart-fill"></i></div>
          </div>
          <div className="kpi-value">85<sup>%</sup></div>
          <div className="kpi-delta alert">34 of 40 treatment spaces</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Ambulance Diversion Status</div>
            <div className="kpi-icon green"><i className="bi bi-truck-front-fill"></i></div>
          </div>
          <div className="kpi-value">Open</div>
          <div className="kpi-delta down">No diversion active</div>
        </div>
      </div>

      <HospitalDataTable
        title="Live Emergency Queue"
        subtitle="Real-time triage ledger of emergency arrivals and treatment room allocations."
        columns={columns}
        data={cases}
        searchPlaceholder="Filter emergency cases..."
        searchFilter={(e, term) =>
          e.caseId.toLowerCase().includes(term) ||
          e.patientName.toLowerCase().includes(term) ||
          e.chiefComplaint.toLowerCase().includes(term) ||
          e.assignedZone.toLowerCase().includes(term)
        }
      />
    </div>
  );
};
