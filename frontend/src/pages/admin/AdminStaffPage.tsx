import React, { useState } from 'react';
import { MOCK_STAFF } from '../../features/admin/mockData';
import type { StaffMember } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

export const AdminStaffPage: React.FC = () => {
  const [staff] = useState<StaffMember[]>(MOCK_STAFF);

  const columns: Column<StaffMember>[] = [
    {
      header: 'Employee ID',
      render: (s) => <span style={{ fontWeight: 700 }}>{s.employeeId}</span>
    },
    {
      header: 'Full Name',
      render: (s) => (
        <span style={{ fontWeight: 600, color: 'var(--text)' }}>{s.name}</span>
      )
    },
    {
      header: 'Job Title / Role',
      accessor: 'role'
    },
    {
      header: 'Department',
      accessor: 'department'
    },
    {
      header: 'Shift Timing',
      accessor: 'shift'
    },
    {
      header: 'Employment Status',
      render: (s) => {
        let badgeClass = 'green';
        if (s.status === 'On Leave') badgeClass = 'amber';
        if (s.status === 'Rotational') badgeClass = 'blue';
        return <span className={`badge ${badgeClass}`}>{s.status}</span>;
      }
    },
    {
      header: 'Contact',
      accessor: 'contact'
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        HUMAN RESOURCES &amp; OPERATIONS <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Staff Management</h1>
          <p className="subtext">
            Non-clinical operations staff, department directors, biomedical engineers, and coordinators.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Total Employed Staff</div>
            <div className="kpi-icon blue"><i className="bi bi-people-fill"></i></div>
          </div>
          <div className="kpi-value">468</div>
          <div className="kpi-delta up">All divisions covered</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Active Shift Attendance</div>
            <div className="kpi-icon green"><i className="bi bi-person-check-fill"></i></div>
          </div>
          <div className="kpi-value">98.2<sup>%</sup></div>
          <div className="kpi-delta up">Biometric check-in verified</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">On Approved Leave</div>
            <div className="kpi-icon orange"><i className="bi bi-calendar-x"></i></div>
          </div>
          <div className="kpi-value">12</div>
          <div className="kpi-delta down">Temporary float coverage</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Credential Verification</div>
            <div className="kpi-icon purple"><i className="bi bi-award-fill"></i></div>
          </div>
          <div className="kpi-value">100<sup>%</sup></div>
          <div className="kpi-delta up">Annual renewal complete</div>
        </div>
      </div>

      <HospitalDataTable
        title="Hospital Staff Roster"
        subtitle="Operational, technical, administrative, and clinical support personnel."
        columns={columns}
        data={staff}
        searchPlaceholder="Filter staff members..."
        searchFilter={(s, term) =>
          s.employeeId.toLowerCase().includes(term) ||
          s.name.toLowerCase().includes(term) ||
          s.role.toLowerCase().includes(term) ||
          s.department.toLowerCase().includes(term)
        }
      />
    </div>
  );
};