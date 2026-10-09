import React, { useState } from 'react';
import { MOCK_LAB_ORDERS } from '../../features/admin/mockData';
import type { LabOrder } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

export const AdminLaboratoryPage: React.FC = () => {
  const [orders] = useState<LabOrder[]>(MOCK_LAB_ORDERS);

  const columns: Column<LabOrder>[] = [
    {
      header: 'Order Number',
      render: (l) => <span style={{ fontWeight: 700 }}>{l.orderNumber}</span>
    },
    {
      header: 'Patient Name',
      accessor: 'patientName'
    },
    {
      header: 'Test Procedure',
      render: (l) => <span style={{ fontWeight: 600, color: 'var(--text)' }}>{l.testName}</span>
    },
    {
      header: 'Ordering Physician',
      accessor: 'doctorName'
    },
    {
      header: 'Priority',
      render: (l) => {
        let badgeClass = 'green';
        if (l.priority.startsWith('Stat')) badgeClass = 'high';
        if (l.priority === 'Urgent') badgeClass = 'orange';
        return <span className={`badge ${badgeClass}`}>{l.priority}</span>;
      }
    },
    {
      header: 'Ordered Time',
      accessor: 'orderedAt'
    },
    {
      header: 'Current Status',
      render: (l) => {
        let badgeClass = 'blue';
        if (l.status === 'Completed') badgeClass = 'green';
        if (l.status === 'Processing') badgeClass = 'purple';
        return <span className={`badge ${badgeClass}`}>{l.status}</span>;
      }
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        DIAGNOSTIC PATHOLOGY &amp; LAB ORDERS <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Laboratory Diagnostics Queue</h1>
          <p className="subtext">
            Pathology specimens, turnaround time metrics, stat emergency analyses, and verified results.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Tests Processed Today</div>
            <div className="kpi-icon blue"><i className="bi bi-virus"></i></div>
          </div>
          <div className="kpi-value">{orders.length + 314}</div>
          <div className="kpi-delta up">↑ 8% vs yesterday</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Stat Immediate Orders</div>
            <div className="kpi-icon orange"><i className="bi bi-lightning-charge"></i></div>
          </div>
          <div className="kpi-value">24</div>
          <div className="kpi-delta alert">Avg TAT: 22 mins</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Pending Verification</div>
            <div className="kpi-icon purple"><i className="bi bi-clock-history"></i></div>
          </div>
          <div className="kpi-value">18</div>
          <div className="kpi-delta down">Pathologist queue</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Analyzer Uptime</div>
            <div className="kpi-icon green"><i className="bi bi-shield-check"></i></div>
          </div>
          <div className="kpi-value">99.8<sup>%</sup></div>
          <div className="kpi-delta up">Calibration nominal</div>
        </div>
      </div>

      <HospitalDataTable
        title="Active Diagnostic Orders"
        subtitle="Track sample processing, clinical priority, and result readiness."
        columns={columns}
        data={orders}
        searchPlaceholder="Filter lab orders..."
        searchFilter={(l, term) =>
          l.orderNumber.toLowerCase().includes(term) ||
          l.patientName.toLowerCase().includes(term) ||
          l.testName.toLowerCase().includes(term) ||
          l.doctorName.toLowerCase().includes(term)
        }
      />
    </div>
  );
};
