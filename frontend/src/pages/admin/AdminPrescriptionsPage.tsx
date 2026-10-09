import React, { useState } from 'react';
import { MOCK_PRESCRIPTIONS } from '../../features/admin/mockData';
import type { Prescription } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

export const AdminPrescriptionsPage: React.FC = () => {
  const [prescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);

  const columns: Column<Prescription>[] = [
    {
      header: 'Prescription ID',
      render: (p) => <span style={{ fontWeight: 700 }}>{p.prescriptionNumber}</span>
    },
    {
      header: 'Patient Name',
      accessor: 'patientName'
    },
    {
      header: 'Prescribing Physician',
      accessor: 'doctorName'
    },
    {
      header: 'Medications & Dosage',
      render: (p) => (
        <span style={{ fontSize: '.8rem', color: '#1E293B', fontWeight: 500 }}>
          {p.medications}
        </span>
      )
    },
    {
      header: 'Administration Notes',
      accessor: 'instructions'
    },
    {
      header: 'Issued Date',
      accessor: 'date'
    },
    {
      header: 'Status',
      render: (p) => {
        let badgeClass = 'green';
        if (p.status === 'Pending Dispensing') badgeClass = 'amber';
        if (p.status === 'Requires Clarification') badgeClass = 'high';
        return <span className={`badge ${badgeClass}`}>{p.status}</span>;
      }
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        MEDICATION ORDERS &amp; DISPENSING <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Prescription Registry</h1>
          <p className="subtext">
            Physician drug orders, dosage checks, pharmacist verification, and fulfillment logs.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Today's Orders</div>
            <div className="kpi-icon blue"><i className="bi bi-file-earmark-medical"></i></div>
          </div>
          <div className="kpi-value">{prescriptions.length + 237}</div>
          <div className="kpi-delta up">All digitally signed</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Dispensed by Pharmacy</div>
            <div className="kpi-icon green"><i className="bi bi-check2-circle"></i></div>
          </div>
          <div className="kpi-value">218</div>
          <div className="kpi-delta up">91% completion rate</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Pending Dispensing</div>
            <div className="kpi-icon orange"><i className="bi bi-hourglass"></i></div>
          </div>
          <div className="kpi-value">22</div>
          <div className="kpi-delta down">Queue under 15m</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Interaction Checks</div>
            <div className="kpi-icon purple"><i className="bi bi-shield-check"></i></div>
          </div>
          <div className="kpi-value">100<sup>%</sup></div>
          <div className="kpi-delta up">AI Contraindication check active</div>
        </div>
      </div>

      <HospitalDataTable
        title="Active Prescription Roster"
        subtitle="Review active inpatient and outpatient medical orders."
        columns={columns}
        data={prescriptions}
        searchPlaceholder="Filter prescriptions..."
        searchFilter={(p, term) =>
          p.prescriptionNumber.toLowerCase().includes(term) ||
          p.patientName.toLowerCase().includes(term) ||
          p.doctorName.toLowerCase().includes(term) ||
          p.medications.toLowerCase().includes(term)
        }
      />
    </div>
  );
};
