import React, { useState } from 'react';
import { MOCK_PATIENTS } from '../../features/admin/mockData';
import type { Patient } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';
import { Modal } from '../../features/admin/components/Modal';

export const AdminPatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // New patient form state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'M',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Jenkins',
    triage: 'T3 - Urgent' as Patient['triage'],
    bed: 'Bed-101'
  });

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newPatient: Patient = {
      id: `P-${Date.now().toString().slice(-4)}`,
      mrn: `MRN-${Math.floor(10000 + Math.random() * 90000)}`,
      name: formData.name,
      age: Number(formData.age) || 30,
      gender: formData.gender as 'M' | 'F' | 'Other',
      department: formData.department,
      doctor: formData.doctor,
      admittedAt: 'Just now',
      triage: formData.triage,
      status: 'Inpatient',
      bed: formData.bed,
      contact: '+1 (555) 000-1122'
    };

    setPatients([newPatient, ...patients]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      age: '',
      gender: 'M',
      department: 'Cardiology',
      doctor: 'Dr. Sarah Jenkins',
      triage: 'T3 - Urgent',
      bed: 'Bed-101'
    });
  };

  const columns: Column<Patient>[] = [
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
      render: (p) => `${p.age} yrs • ${p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : p.gender}`
    },
    {
      header: 'Department',
      accessor: 'department'
    },
    {
      header: 'Attending Doctor',
      render: (p) => <span style={{ fontWeight: 500 }}>{p.doctor}</span>
    },
    {
      header: 'Triage Level',
      render: (p) => {
        let badgeClass = 'green';
        if (p.triage.startsWith('T1')) badgeClass = 'high';
        else if (p.triage.startsWith('T2')) badgeClass = 'orange';
        else if (p.triage.startsWith('T3')) badgeClass = 'amber';
        return <span className={`badge ${badgeClass}`}>{p.triage}</span>;
      }
    },
    {
      header: 'Assigned Bed',
      render: (p) => (
        <code style={{ fontSize: '.8rem', color: '#1E293B', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
          {p.bed}
        </code>
      )
    },
    {
      header: 'Admission Date',
      accessor: 'admittedAt'
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
    },
    {
      header: 'Actions',
      align: 'right',
      render: (p) => (
        <button
          className="btn-outline"
          style={{ padding: '4px 10px', fontSize: '.76rem' }}
          onClick={() => setSelectedPatient(p)}
        >
          View Chart
        </button>
      )
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        PATIENT DIRECTORY &amp; ADMISSIONS <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Patient Management</h1>
          <p className="subtext">
            Centralized registry of admitted inpatients, clinical triage status, and assigned care teams.
          </p>
        </div>

        <div className="header-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <i className="bi bi-person-plus-fill"></i> Admit New Patient
          </button>
        </div>
      </div>

      {/* Metric Cards Summary */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Total Inpatients</div>
            <div className="kpi-icon blue"><i className="bi bi-hospital"></i></div>
          </div>
          <div className="kpi-value">{patients.filter(p => p.status === 'Inpatient').length + 240}</div>
          <div className="kpi-delta up">↑ 4.2% <span style={{ color: 'var(--muted)' }}>census growth</span></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Emergency Acuity (T1/T2)</div>
            <div className="kpi-icon orange"><i className="bi bi-heart-pulse-fill"></i></div>
          </div>
          <div className="kpi-value">{patients.filter(p => p.triage.startsWith('T1') || p.triage.startsWith('T2')).length}</div>
          <div className="kpi-delta alert">Critical observation</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Available Beds (Facility)</div>
            <div className="kpi-icon green"><i className="bi bi-check-circle-fill"></i></div>
          </div>
          <div className="kpi-value">54</div>
          <div className="kpi-delta down">↓ 6 <span style={{ color: 'var(--muted)' }}>since morning</span></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Discharge Reviews Due</div>
            <div className="kpi-icon purple"><i className="bi bi-box-arrow-right"></i></div>
          </div>
          <div className="kpi-value">12</div>
          <div className="kpi-delta up">2 pending sign-off</div>
        </div>
      </div>

      {/* Main Table */}
      <HospitalDataTable
        title="Active Inpatient Census"
        subtitle="Search across records by patient name, MRN, medical division, or assigned consultant."
        columns={columns}
        data={patients}
        searchPlaceholder="Search patients by name, MRN, department..."
        searchFilter={(p, term) =>
          p.name.toLowerCase().includes(term) ||
          p.mrn.toLowerCase().includes(term) ||
          p.department.toLowerCase().includes(term) ||
          p.doctor.toLowerCase().includes(term) ||
          p.bed.toLowerCase().includes(term)
        }
      />

      {/* Admit New Patient Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Admit New Inpatient"
        footer={
          <>
            <button className="btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleAddPatient}>
              Confirm Admission
            </button>
          </>
        }
      >
        <form onSubmit={handleAddPatient} style={{ display: 'grid', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
              Full Name
            </label>
            <input
              type="text"
              className="search-input"
              style={{ width: '100%', padding: '8px 12px' }}
              placeholder="e.g. Robert Pattinson"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Age
              </label>
              <input
                type="number"
                className="search-input"
                style={{ width: '100%', padding: '8px 12px' }}
                placeholder="Years"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Gender
              </label>
              <select
                className="range-select"
                style={{ width: '100%', padding: '8px 12px' }}
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Department
              </label>
              <select
                className="range-select"
                style={{ width: '100%', padding: '8px 12px' }}
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <option value="Emergency & Trauma">Emergency & Trauma</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Triage Acuity
              </label>
              <select
                className="range-select"
                style={{ width: '100%', padding: '8px 12px' }}
                value={formData.triage}
                onChange={(e) => setFormData({ ...formData, triage: e.target.value as Patient['triage'] })}
              >
                <option value="T1 - Resuscitation">T1 - Resuscitation (Red)</option>
                <option value="T2 - Emergent">T2 - Emergent (Orange)</option>
                <option value="T3 - Urgent">T3 - Urgent (Yellow)</option>
                <option value="T4 - Standard">T4 - Standard (Green)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
              Allocated Bed / Ward
            </label>
            <input
              type="text"
              className="search-input"
              style={{ width: '100%', padding: '8px 12px' }}
              placeholder="e.g. ICU-04, Ward-302B"
              value={formData.bed}
              onChange={(e) => setFormData({ ...formData, bed: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <Modal
          isOpen={Boolean(selectedPatient)}
          onClose={() => setSelectedPatient(null)}
          title={`Clinical Profile: ${selectedPatient.name}`}
          footer={
            <button className="btn-dark" onClick={() => setSelectedPatient(null)}>
              Close File
            </button>
          }
        >
          <div style={{ display: 'grid', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#F8FAFC', padding: '12px', borderRadius: '10px' }}>
              <div className="avatar md green">{selectedPatient.name.split(' ').map(n => n[0]).join('')}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{selectedPatient.name}</div>
                <div style={{ fontSize: '.78rem', color: 'var(--muted)' }}>
                  {selectedPatient.mrn} &bull; {selectedPatient.age} years &bull; {selectedPatient.gender === 'M' ? 'Male' : 'Female'}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '.84rem' }}>
              <div style={{ background: '#FAFBFC', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '.74rem' }}>Department</span>
                <strong>{selectedPatient.department}</strong>
              </div>
              <div style={{ background: '#FAFBFC', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '.74rem' }}>Attending Physician</span>
                <strong>{selectedPatient.doctor}</strong>
              </div>
              <div style={{ background: '#FAFBFC', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '.74rem' }}>Bed / Space</span>
                <strong>{selectedPatient.bed}</strong>
              </div>
              <div style={{ background: '#FAFBFC', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '.74rem' }}>Emergency Contact</span>
                <strong>{selectedPatient.contact}</strong>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};