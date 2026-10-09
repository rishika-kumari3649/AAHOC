import React, { useState } from 'react';
import { MOCK_MEDICAL_RECORDS } from '../../features/admin/mockData';
import type { MedicalRecord } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

export const AdminMedicalRecordsPage: React.FC = () => {
  const [records] = useState<MedicalRecord[]>(MOCK_MEDICAL_RECORDS);

  const columns: Column<MedicalRecord>[] = [
    {
      header: 'EHR Record Number',
      render: (r) => <span style={{ fontWeight: 700 }}>{r.recordNumber}</span>
    },
    {
      header: 'Patient Name',
      render: (r) => <span style={{ fontWeight: 600, color: 'var(--text)' }}>{r.patientName}</span>
    },
    {
      header: 'Blood Type',
      render: (r) => <span className="badge blue">{r.bloodType}</span>
    },
    {
      header: 'Documented Allergies',
      render: (r) => (
        <span style={{ color: r.allergies.includes('NKDA') ? 'var(--muted)' : 'var(--high)', fontWeight: 600 }}>
          {r.allergies}
        </span>
      )
    },
    {
      header: 'Primary Clinical Diagnosis',
      accessor: 'primaryDiagnosis'
    },
    {
      header: 'Attending Physician',
      accessor: 'attendingPhysician'
    },
    {
      header: 'Last Chart Update',
      accessor: 'lastUpdated'
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        ELECTRONIC HEALTH RECORDS (EHR) <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Medical Records Management</h1>
          <p className="subtext">
            Centralized health records archive, clinical encounter documentation, and allergy safety alerts.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Archived Patient Files</div>
            <div className="kpi-icon blue"><i className="bi bi-folder2-open"></i></div>
          </div>
          <div className="kpi-value">14,290</div>
          <div className="kpi-delta up">100% cloud encrypted</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Chart Updates Today</div>
            <div className="kpi-icon green"><i className="bi bi-pencil-square"></i></div>
          </div>
          <div className="kpi-value">184</div>
          <div className="kpi-delta up">Physician notes logged</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Active Allergy Flags</div>
            <div className="kpi-icon orange"><i className="bi bi-exclamation-diamond"></i></div>
          </div>
          <div className="kpi-value">42</div>
          <div className="kpi-delta alert">Real-time alerts active</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">HIPAA Security Audit</div>
            <div className="kpi-icon purple"><i className="bi bi-shield-lock-fill"></i></div>
          </div>
          <div className="kpi-value">Passing</div>
          <div className="kpi-delta up">Zero access violations</div>
        </div>
      </div>

      <HospitalDataTable
        title="Electronic Health Records Directory"
        subtitle="Search patient clinical histories and attending physician chart entries."
        columns={columns}
        data={records}
        searchPlaceholder="Search medical records..."
        searchFilter={(r, term) =>
          r.recordNumber.toLowerCase().includes(term) ||
          r.patientName.toLowerCase().includes(term) ||
          r.primaryDiagnosis.toLowerCase().includes(term) ||
          r.attendingPhysician.toLowerCase().includes(term)
        }
      />
    </div>
  );
};
