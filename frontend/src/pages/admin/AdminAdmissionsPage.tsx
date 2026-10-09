import React from 'react';
import { MOCK_PATIENTS } from '../../features/admin/mockData';
import type { Patient } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

export const AdminAdmissionsPage: React.FC = () => {
  const columns: Column<Patient>[] = [
    {
      header: 'Patient / MRN',
      render: (p) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text)' }}>{p.name}</div>
          <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{p.mrn}</div>
        </div>
      )
    },
    {
      header: 'Department',
      accessor: 'department'
    },
    {
      header: 'Attending Doctor',
      accessor: 'doctor'
    },
    {
      header: 'Allocated Bed',
      render: (p) => (
        <code style={{ fontSize: '.8rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
          {p.bed}
        </code>
      )
    },
    {
      header: 'Admission Timestamp',
      accessor: 'admittedAt'
    },
    {
      header: 'Triage Acuity',
      render: (p) => {
        let badgeClass = 'green';
        if (p.triage.startsWith('T1')) badgeClass = 'high';
        if (p.triage.startsWith('T2')) badgeClass = 'orange';
        if (p.triage.startsWith('T3')) badgeClass = 'amber';
        return <span className={`badge ${badgeClass}`}>{p.triage}</span>;
      }
    },
    {
      header: 'Admission Status',
      render: (p) => <span className="badge purple">{p.status}</span>
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        INPATIENT ADMISSIONS &amp; TRANSFERS <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Inpatient Admissions Registry</h1>
          <p className="subtext">
            Formal admission documentation, ward bed allocations, and physician assignment records.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Today's Total Admissions</div>
            <div className="kpi-icon blue"><i className="bi bi-box-arrow-in-right"></i></div>
          </div>
          <div className="kpi-value">42</div>
          <div className="kpi-delta up">28 via Emergency Inflow</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Elective Surgery Admissions</div>
            <div className="kpi-icon green"><i className="bi bi-calendar2-check"></i></div>
          </div>
          <div className="kpi-value">14</div>
          <div className="kpi-delta up">Pre-op checks completed</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Inter-Ward Transfers</div>
            <div className="kpi-icon purple"><i className="bi bi-arrow-left-right"></i></div>
          </div>
          <div className="kpi-value">6</div>
          <div className="kpi-delta down">ICU step-downs to Ward B</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Bed Assignment Wait Time</div>
            <div className="kpi-icon orange"><i className="bi bi-stopwatch"></i></div>
          </div>
          <div className="kpi-value">18 min</div>
          <div className="kpi-delta down">Under 30 min target</div>
        </div>
      </div>

      <HospitalDataTable
        title="Active Admissions Ledger"
        subtitle="Live registry of admitted patients across all medical wards."
        columns={columns}
        data={MOCK_PATIENTS}
        searchPlaceholder="Search admissions..."
        searchFilter={(p, term) =>
          p.name.toLowerCase().includes(term) ||
          p.mrn.toLowerCase().includes(term) ||
          p.department.toLowerCase().includes(term)
        }
      />
    </div>
  );
};