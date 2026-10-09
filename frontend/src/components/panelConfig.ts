export interface PanelNavigation {
  role: string;
  label: string;
  description: string;
  basePath: string;
  badge?: string;
  items: {
    label: string;
    path: string;
  }[];
}

export const PANEL_NAVIGATIONS: Record<string, PanelNavigation> = {
  admin: {
    role: 'admin',
    label: 'Admin Panel',
    description: 'Hospital Administration & System Management',
    basePath: '/admin',
    items: [
      { label: 'Dashboard', path: '/admin' },
      { label: 'Patients', path: '/admin/patients' },
      { label: 'Doctors', path: '/admin/doctors' },
      { label: 'Appointments', path: '/admin/appointments' },
      { label: 'Departments', path: '/admin/departments' },
      { label: 'Nurses', path: '/admin/nurses' },
      { label: 'Pharmacy', path: '/admin/pharmacy' },
      { label: 'Laboratory', path: '/admin/laboratory' },
      { label: 'Prescriptions', path: '/admin/prescriptions' },
      { label: 'Medical Records', path: '/admin/medical-records' },
      { label: 'Billing', path: '/admin/billing' },
      { label: 'Emergency', path: '/admin/emergency' },
      { label: 'Staff Management', path: '/admin/staff' },
      { label: 'Reports', path: '/admin/reports' },
      { label: 'Notifications', path: '/admin/notifications' },
      { label: 'Settings', path: '/admin/settings' },
      { label: 'Admissions', path: '/admin/admissions' },
      { label: 'Beds', path: '/admin/beds' },
      { label: 'Audit Logs', path: '/admin/audit-logs' },
    ],
  },
  operations: {
    role: 'operations',
    label: 'Operations Panel',
    description: 'AAHOC AI Intelligence & Resource Command',
    basePath: '/operations',
    badge: 'AAHOC Core',
    items: [
      { label: 'Dashboard', path: '/operations' },
      { label: 'Patient Flow', path: '/operations/patient-flow' },
      { label: 'Beds & Capacity', path: '/operations/beds-capacity' },
      { label: 'Resources', path: '/operations/resources' },
      { label: 'Emergency Queue', path: '/operations/emergency-queue' },
      { label: 'Alerts', path: '/operations/alerts' },
      { label: 'AI Recommendations', path: '/operations/ai-recommendations' },
      { label: 'Approvals', path: '/operations/approvals' },
    ],
  },
  doctor: {
    role: 'doctor',
    label: 'Doctor Panel',
    description: 'Clinical Management & Consultations',
    basePath: '/doctor',
    items: [
      { label: 'Dashboard', path: '/doctor' },
      { label: 'Patients', path: '/doctor/patients' },
      { label: 'Appointments', path: '/doctor/appointments' },
      { label: 'Clinical Records', path: '/doctor/clinical-records' },
      { label: 'Prescriptions', path: '/doctor/prescriptions' },
      { label: 'Lab Orders', path: '/doctor/lab-orders' },
    ],
  },
  nurse: {
    role: 'nurse',
    label: 'Nurse Panel',
    description: 'Inpatient Care, Vitals & Ward Tasks',
    basePath: '/nurse',
    items: [
      { label: 'Dashboard', path: '/nurse' },
      { label: 'Assigned Patients', path: '/nurse/assigned-patients' },
      { label: 'Vitals', path: '/nurse/vitals' },
      { label: 'Nursing Tasks', path: '/nurse/tasks' },
      { label: 'Alerts', path: '/nurse/alerts' },
    ],
  },
  reception: {
    role: 'reception',
    label: 'Reception Panel',
    description: 'Front-desk Patient Registration & Inflow',
    basePath: '/reception',
    items: [
      { label: 'Dashboard', path: '/reception' },
      { label: 'Patient Registration', path: '/reception/registration' },
      { label: 'Appointments', path: '/reception/appointments' },
      { label: 'Admissions', path: '/reception/admissions' },
    ],
  },
  laboratory: {
    role: 'laboratory',
    label: 'Laboratory Panel',
    description: 'Diagnostic Orders, Samples & Reports',
    basePath: '/laboratory',
    items: [
      { label: 'Dashboard', path: '/laboratory' },
      { label: 'Test Orders', path: '/laboratory/test-orders' },
      { label: 'Samples', path: '/laboratory/samples' },
      { label: 'Results', path: '/laboratory/results' },
    ],
  },
  pharmacy: {
    role: 'pharmacy',
    label: 'Pharmacy Panel',
    description: 'Medicine Dispensing & Stock Inventory',
    basePath: '/pharmacy',
    items: [
      { label: 'Dashboard', path: '/pharmacy' },
      { label: 'Prescriptions', path: '/pharmacy/prescriptions' },
      { label: 'Medicines', path: '/pharmacy/medicines' },
      { label: 'Inventory', path: '/pharmacy/inventory' },
    ],
  },
  billing: {
    role: 'billing',
    label: 'Billing Panel',
    description: 'Financial Invoicing & Payment Processing',
    basePath: '/billing',
    items: [
      { label: 'Dashboard', path: '/billing' },
      { label: 'Invoices', path: '/billing/invoices' },
      { label: 'Payments', path: '/billing/payments' },
    ],
  },
  patient: {
    role: 'patient',
    label: 'Patient Portal',
    description: 'Self-Service Health Records & Bookings',
    basePath: '/patient',
    items: [
      { label: 'Dashboard', path: '/patient' },
      { label: 'Appointments', path: '/patient/appointments' },
      { label: 'Medical Records', path: '/patient/medical-records' },
      { label: 'Prescriptions', path: '/patient/prescriptions' },
      { label: 'Lab Reports', path: '/patient/lab-reports' },
      { label: 'Bills', path: '/patient/bills' },
    ],
  },
};