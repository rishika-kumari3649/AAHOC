import React, { useState } from 'react';
import { MOCK_DEPARTMENTS } from '../../features/admin/mockData';
import type { Department } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

export const AdminDepartmentsPage: React.FC = () => {
  const [departments] = useState<Department[]>(MOCK_DEPARTMENTS);

  const columns: Column<Department>[] = [
    {
      header: 'Department Division',
      render: (d) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text)' }}>{d.name}</div>
          <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '1px' }}>Code: {d.code}</div>
        </div>
      )
    },
    {
      header: 'Head of Department',
      accessor: 'headOfDept'
    },
    {
      header: 'Bed Capacity & Occupancy',
      render: (d) => (
        <div style={{ minWidth: '180px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', marginBottom: '3px' }}>
            <span>{d.occupiedBeds} / {d.totalBeds} beds</span>
            <span style={{ fontWeight: 700 }}>{d.occupancyRate}%</span>
          </div>
          <div className="kpi-progress" style={{ margin: 0, height: '6px' }}>
            <div
              className={`kpi-progress-bar ${
                d.occupancyRate > 90
                  ? 'purple'
                  : d.occupancyRate > 80
                  ? 'orange'
                  : 'green'
              }`}
              style={{ width: `${d.occupancyRate}%` }}
            ></div>
          </div>
        </div>
      )
    },
    {
      header: 'Medical Faculty',
      render: (d) => (
        <span>{d.doctorsCount} Specialists</span>
      )
    },
    {
      header: 'Nursing Staff',
      render: (d) => (
        <span>{d.nursesCount} Nurses</span>
      )
    },
    {
      header: 'Operational Status',
      render: (d) => {
        let badgeClass = 'green';
        if (d.status === 'Critical Surge') badgeClass = 'high';
        if (d.status === 'High Capacity') badgeClass = 'amber';
        return <span className={`badge ${badgeClass}`}>{d.status}</span>;
      }
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        FACILITY INFRASTRUCTURE &amp; CLINICAL DIVISIONS <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Department Management &amp; Census</h1>
          <p className="subtext">
            Divisional bed occupancy rates, medical director oversight, and clinical capacity monitoring.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Active Divisions</div>
            <div className="kpi-icon blue"><i className="bi bi-building"></i></div>
          </div>
          <div className="kpi-value">{departments.length + 6}</div>
          <div className="kpi-delta up">All divisions operational</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Hospital-Wide Bed Occupancy</div>
            <div className="kpi-icon purple"><i className="bi bi-grid-3x3-gap-fill"></i></div>
          </div>
          <div className="kpi-value">82<sup>%</sup></div>
          <div className="kpi-delta up">246 of 300 beds occupied</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Divisions in High/Surge</div>
            <div className="kpi-icon orange"><i className="bi bi-exclamation-triangle-fill"></i></div>
          </div>
          <div className="kpi-value">3</div>
          <div className="kpi-delta alert">ICU, ED, Ward B</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Available Inpatient Beds</div>
            <div className="kpi-icon green"><i className="bi bi-check2-circle"></i></div>
          </div>
          <div className="kpi-value">54</div>
          <div className="kpi-delta down">Buffer within safe levels</div>
        </div>
      </div>

      {/* Table */}
      <HospitalDataTable
        title="Hospital Departments Directory"
        subtitle="Divisional census breakdown and clinical staffing ratio."
        columns={columns}
        data={departments}
        searchPlaceholder="Filter departments..."
        searchFilter={(d, term) =>
          d.name.toLowerCase().includes(term) ||
          d.code.toLowerCase().includes(term) ||
          d.headOfDept.toLowerCase().includes(term)
        }
      />
    </div>
  );
};