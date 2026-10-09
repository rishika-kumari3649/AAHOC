import React, { useState } from 'react';
import { MOCK_APPOINTMENTS } from '../../features/admin/mockData';
import type { Appointment } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';
import { Modal } from '../../features/admin/components/Modal';

export const AdminAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: 'Dr. Sarah Jenkins',
    department: 'Cardiology',
    date: 'Today',
    time: '10:00 AM',
    type: 'General Consultation' as Appointment['type']
  });

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName) return;

    const newApp: Appointment = {
      id: `APP-${Date.now().toString().slice(-4)}`,
      patientName: formData.patientName,
      doctorName: formData.doctorName,
      department: formData.department,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: 'Confirmed'
    };

    setAppointments([newApp, ...appointments]);
    setIsModalOpen(false);
  };

  const columns: Column<Appointment>[] = [
    {
      header: 'Patient Name',
      render: (a) => (
        <span style={{ fontWeight: 700, color: 'var(--text)' }}>{a.patientName}</span>
      )
    },
    {
      header: 'Assigned Physician',
      render: (a) => (
        <span style={{ fontWeight: 500 }}>{a.doctorName}</span>
      )
    },
    {
      header: 'Department',
      accessor: 'department'
    },
    {
      header: 'Date & Time Slot',
      render: (a) => (
        <div>
          <span style={{ fontWeight: 600 }}>{a.time}</span>
          <span style={{ color: 'var(--muted)', fontSize: '.76rem', marginLeft: '6px' }}>({a.date})</span>
        </div>
      )
    },
    {
      header: 'Consultation Type',
      render: (a) => {
        let badgeClass = 'blue';
        if (a.type === 'Emergency') badgeClass = 'high';
        if (a.type === 'Post-Surgery') badgeClass = 'purple';
        if (a.type === 'Follow-up') badgeClass = 'green';
        return <span className={`badge ${badgeClass}`}>{a.type}</span>;
      }
    },
    {
      header: 'Status',
      render: (a) => {
        let badgeClass = 'green';
        if (a.status === 'Pending') badgeClass = 'amber';
        if (a.status === 'Cancelled') badgeClass = 'gray';
        return <span className={`badge ${badgeClass}`}>{a.status}</span>;
      }
    },
    {
      header: 'Actions',
      align: 'right',
      render: (a) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          {a.status === 'Pending' && (
            <button
              className="btn-primary"
              style={{ padding: '3px 8px', fontSize: '.72rem' }}
              onClick={() => {
                setAppointments(appointments.map(x => x.id === a.id ? { ...x, status: 'Confirmed' } : x));
              }}
            >
              Confirm
            </button>
          )}
          <button
            className="btn-outline"
            style={{ padding: '3px 8px', fontSize: '.72rem' }}
            onClick={() => {
              setAppointments(appointments.map(x => x.id === a.id ? { ...x, status: 'Completed' } : x));
            }}
          >
            Mark Done
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        OUTPATIENT SCHEDULING &amp; CONSULTATIONS <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Appointments Ledger</h1>
          <p className="subtext">
            Outpatient department (OPD) queue, physician consultation bookings, and status verification.
          </p>
        </div>

        <div className="header-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <i className="bi bi-calendar-plus"></i> Book Consultation
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Today's Total Bookings</div>
            <div className="kpi-icon blue"><i className="bi bi-calendar-check"></i></div>
          </div>
          <div className="kpi-value">{appointments.length + 187}</div>
          <div className="kpi-delta up">↑ 12% vs last Thursday</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Confirmed Slots</div>
            <div className="kpi-icon green"><i className="bi bi-check2-circle"></i></div>
          </div>
          <div className="kpi-value">{appointments.filter(a => a.status === 'Confirmed').length + 160}</div>
          <div className="kpi-delta up">Slot capacity 94%</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Pending Confirmation</div>
            <div className="kpi-icon orange"><i className="bi bi-hourglass-split"></i></div>
          </div>
          <div className="kpi-value">{appointments.filter(a => a.status === 'Pending').length}</div>
          <div className="kpi-delta alert">Action required</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Completed Consults</div>
            <div className="kpi-icon purple"><i className="bi bi-clipboard2-check"></i></div>
          </div>
          <div className="kpi-value">76</div>
          <div className="kpi-delta down">Avg wait: 14 min</div>
        </div>
      </div>

      {/* Table */}
      <HospitalDataTable
        title="Consultation Roster"
        subtitle="Search appointments by patient name, doctor, or department."
        columns={columns}
        data={appointments}
        searchPlaceholder="Filter appointments..."
        searchFilter={(a, term) =>
          a.patientName.toLowerCase().includes(term) ||
          a.doctorName.toLowerCase().includes(term) ||
          a.department.toLowerCase().includes(term)
        }
      />

      {/* Book Appointment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book Outpatient Appointment"
        footer={
          <>
            <button className="btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleAddAppointment}>
              Confirm Appointment
            </button>
          </>
        }
      >
        <form onSubmit={handleAddAppointment} style={{ display: 'grid', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
              Patient Full Name
            </label>
            <input
              type="text"
              className="search-input"
              style={{ width: '100%', padding: '8px 12px' }}
              placeholder="e.g. Samuel Hughes"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              required
            />
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
                <option value="Cardiology">Cardiology</option>
                <option value="Emergency & Trauma">Emergency & Trauma</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Attending Physician
              </label>
              <select
                className="range-select"
                style={{ width: '100%', padding: '8px 12px' }}
                value={formData.doctorName}
                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
              >
                <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Cardiology)</option>
                <option value="Dr. Robert King">Dr. Robert King (Neurology)</option>
                <option value="Dr. Lisa Patel">Dr. Lisa Patel (Pediatrics)</option>
                <option value="Dr. Kevin Miller">Dr. Kevin Miller (Orthopedics)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Date
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%', padding: '8px 12px' }}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Time Slot
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%', padding: '8px 12px' }}
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
              Consultation Type
            </label>
            <select
              className="range-select"
              style={{ width: '100%', padding: '8px 12px' }}
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Appointment['type'] })}
            >
              <option value="General Consultation">General Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
              <option value="Routine Checkup">Routine Checkup</option>
              <option value="Post-Surgery">Post-Surgery</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};