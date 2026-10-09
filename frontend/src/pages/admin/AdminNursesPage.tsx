import React, { useState } from 'react';
import { MOCK_NURSES } from '../../features/admin/mockData';
import type { Nurse } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

export const AdminNursesPage: React.FC = () => {
  const [nurses] = useState<Nurse[]>(MOCK_NURSES);

  const columns: Column<Nurse>[] = [
    {
      header: 'Nurse / Badge',
      render: (n) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="avatar sm purple">
            {n.name.split(' ').map((p) => p[0]).join('')}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)' }}>{n.name}</div>
            <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{n.badgeNumber}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Ward',
      accessor: 'ward'
    },
    {
      header: 'Shift Timing',
      accessor: 'shift'
    },
    {
      header: 'Patient Load',
      render: (n) => (
        <span style={{ fontWeight: 600 }}>{n.assignedPatients} patients</span>
      )
    },
    {
      header: 'Duty Status',
      render: (n) => {
        let badgeClass = 'green';
        if (n.status === 'On Break') badgeClass = 'amber';
        if (n.status === 'Off Duty') badgeClass = 'gray';
        return <span className={`badge ${badgeClass}`}>{n.status}</span>;
      }
    },
    {
      header: 'Contact',
      accessor: 'phone'
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        NURSING ROSTER &amp; INPATIENT CARE <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Nursing Staff Management</h1>
          <p className="subtext">
            Ward nursing allocations, active shift coverage, and nurse-to-patient staffing ratios.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Active Shift Nurses</div>
            <div className="kpi-icon blue"><i className="bi bi-people"></i></div>
          </div>
          <div className="kpi-value">124</div>
          <div className="kpi-delta up">98% planned shift filled</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Average Nurse-to-Patient</div>
            <div className="kpi-icon green"><i className="bi bi-clipboard2-pulse"></i></div>
          </div>
          <div className="kpi-value">1 : 4.2</div>
          <div className="kpi-delta up">Within hospital safety index</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Critical Care (ICU) Ratio</div>
            <div className="kpi-icon purple"><i className="bi bi-heart-pulse"></i></div>
          </div>
          <div className="kpi-value">1 : 1.8</div>
          <div className="kpi-delta up">Optimal 1:2 standard</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Float Nurses Available</div>
            <div className="kpi-icon orange"><i className="bi bi-arrow-repeat"></i></div>
          </div>
          <div className="kpi-value">8</div>
          <div className="kpi-delta alert">Ready for surge dispatch</div>
        </div>
      </div>

      <HospitalDataTable
        title="Nursing Staff Roster"
        subtitle="Manage assigned ward wards, active shift coverage, and direct contact numbers."
        columns={columns}
        data={nurses}
        searchPlaceholder="Filter nurses by name, ward, badge..."
        searchFilter={(n, term) =>
          n.name.toLowerCase().includes(term) ||
          n.ward.toLowerCase().includes(term) ||
          n.badgeNumber.toLowerCase().includes(term)
        }
      />
    </div>
  );
};
