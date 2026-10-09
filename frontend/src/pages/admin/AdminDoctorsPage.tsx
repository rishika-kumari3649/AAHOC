import React, { useState } from 'react';
import { MOCK_DOCTORS } from '../../features/admin/mockData';
import type { Doctor } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';
import { Modal } from '../../features/admin/components/Modal';

export const AdminDoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    department: 'Cardiology',
    phone: '',
    email: '',
    experience: '8 years',
    opdSchedule: 'Mon - Fri (09:00 - 15:00)'
  });

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newDoc: Doctor = {
      id: `DOC-0${doctors.length + 1}`,
      name: formData.name,
      specialty: formData.specialty || 'General Medicine',
      department: formData.department,
      phone: formData.phone || '+1 (555) 123-9999',
      email: formData.email || `${formData.name.toLowerCase().replace(/[^a-z]/g, '')}@hospital.org`,
      experience: formData.experience,
      opdSchedule: formData.opdSchedule,
      status: 'On Duty',
      activePatients: 0
    };

    setDoctors([...doctors, newDoc]);
    setIsModalOpen(false);
  };

  const columns: Column<Doctor>[] = [
    {
      header: 'Physician',
      render: (d) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="avatar sm green">
            {d.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)' }}>{d.name}</div>
            <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{d.specialty}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Department',
      accessor: 'department'
    },
    {
      header: 'OPD Clinical Schedule',
      accessor: 'opdSchedule'
    },
    {
      header: 'Experience',
      accessor: 'experience'
    },
    {
      header: 'Active Patients',
      render: (d) => (
        <span style={{ fontWeight: 600 }}>{d.activePatients} under care</span>
      )
    },
    {
      header: 'Current Status',
      render: (d) => {
        let badgeClass = 'green';
        if (d.status === 'In Surgery') badgeClass = 'purple';
        if (d.status === 'On Call') badgeClass = 'amber';
        if (d.status === 'Off Duty') badgeClass = 'gray';
        return <span className={`badge ${badgeClass}`}>{d.status}</span>;
      }
    },
    {
      header: 'Actions',
      align: 'right',
      render: (d) => (
        <button
          className="btn-outline"
          style={{ padding: '4px 10px', fontSize: '.76rem' }}
          onClick={() => setSelectedDoctor(d)}
        >
          View Profile
        </button>
      )
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        MEDICAL FACULTY &amp; SPECIALISTS <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Doctor Directory &amp; Schedules</h1>
          <p className="subtext">
            Consultant profiles, surgical schedules, active patient census, and department allocations.
          </p>
        </div>

        <div className="header-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <i className="bi bi-person-plus"></i> Add Physician
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Active Consultants</div>
            <div className="kpi-icon blue"><i className="bi bi-person-badge"></i></div>
          </div>
          <div className="kpi-value">{doctors.length + 79}</div>
          <div className="kpi-delta up">↑ 4 credentialed this month</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">On Duty Right Now</div>
            <div className="kpi-icon green"><i className="bi bi-check2-circle"></i></div>
          </div>
          <div className="kpi-value">48</div>
          <div className="kpi-delta up">96% roster coverage</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">In Surgery / OR</div>
            <div className="kpi-icon purple"><i className="bi bi-scissors"></i></div>
          </div>
          <div className="kpi-value">6</div>
          <div className="kpi-delta down">Theatre 1 to 4 active</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">On-Call Emergency</div>
            <div className="kpi-icon orange"><i className="bi bi-telephone-inbound"></i></div>
          </div>
          <div className="kpi-value">14</div>
          <div className="kpi-delta up">Ready for trauma surge</div>
        </div>
      </div>

      {/* Table */}
      <HospitalDataTable
        title="Physician Registry"
        subtitle="Search doctors by name, medical specialty, clinical department, or current availability."
        columns={columns}
        data={doctors}
        searchPlaceholder="Filter doctors by name, specialty, dept..."
        searchFilter={(d, term) =>
          d.name.toLowerCase().includes(term) ||
          d.specialty.toLowerCase().includes(term) ||
          d.department.toLowerCase().includes(term)
        }
      />

      {/* Add Doctor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Physician to Directory"
        footer={
          <>
            <button className="btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleAddDoctor}>
              Save Doctor Profile
            </button>
          </>
        }
      >
        <form onSubmit={handleAddDoctor} style={{ display: 'grid', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
              Doctor Name &amp; Credentials
            </label>
            <input
              type="text"
              className="search-input"
              style={{ width: '100%', padding: '8px 12px' }}
              placeholder="e.g. Dr. Arthur Pendelton, MD, FACS"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Medical Specialty
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%', padding: '8px 12px' }}
                placeholder="e.g. Interventional Cardiology"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
              />
            </div>
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
                <option value="Cardiology">Cardiology</option>
                <option value="Emergency & Trauma">Emergency & Trauma</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Direct Phone
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%', padding: '8px 12px' }}
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                OPD Schedule
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%', padding: '8px 12px' }}
                placeholder="Mon - Fri (09:00 - 15:00)"
                value={formData.opdSchedule}
                onChange={(e) => setFormData({ ...formData, opdSchedule: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <Modal
          isOpen={Boolean(selectedDoctor)}
          onClose={() => setSelectedDoctor(null)}
          title={`Faculty Profile: ${selectedDoctor.name}`}
          footer={
            <button className="btn-dark" onClick={() => setSelectedDoctor(null)}>
              Close
            </button>
          }
        >
          <div style={{ display: 'grid', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#F8FAFC', padding: '12px', borderRadius: '10px' }}>
              <div className="avatar md green">
                {selectedDoctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{selectedDoctor.name}</div>
                <div style={{ fontSize: '.78rem', color: 'var(--muted)' }}>
                  {selectedDoctor.specialty} &bull; {selectedDoctor.experience}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '.84rem' }}>
              <div style={{ background: '#FAFBFC', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '.74rem' }}>Department</span>
                <strong>{selectedDoctor.department}</strong>
              </div>
              <div style={{ background: '#FAFBFC', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '.74rem' }}>Current Duty Status</span>
                <span className="badge green">{selectedDoctor.status}</span>
              </div>
              <div style={{ background: '#FAFBFC', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '.74rem' }}>OPD Schedule</span>
                <strong>{selectedDoctor.opdSchedule}</strong>
              </div>
              <div style={{ background: '#FAFBFC', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '.74rem' }}>Contact Email</span>
                <strong>{selectedDoctor.email}</strong>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};