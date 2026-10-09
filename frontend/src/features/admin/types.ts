export interface KpiItem {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  icon: string;
  color: 'blue' | 'orange' | 'purple' | 'green' | 'amber';
  delta?: string;
  deltaNote?: string;
  deltaClass?: 'up' | 'down' | 'alert';
  bar?: number;
  barClass?: 'purple' | 'green' | 'blue' | 'orange';
  foot?: string;
  tag?: string;
  tagClass?: 'ok' | 'watch' | 'high';
}

export interface ForecastData {
  pred1h: number;
  pred2h: number;
  risk: 'Low' | 'Moderate' | 'High' | 'Critical';
  labels: string[];
  actual: (number | null)[];
  predicted: (number | null)[];
}

export interface AlertItem {
  id: string;
  title: string;
  desc: string;
  severity: 'High' | 'Medium' | 'Low';
  time: string;
  icon: string;
  analysis: string;
  action: string;
}

export interface RecommendationItem {
  id: number;
  priority: string;
  suggested: string;
  title: string;
  detail: string;
  reasoning: string;
  action: string;
  status: 'pending' | 'approved' | 'dismissed';
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  department: string;
  doctor: string;
  admittedAt: string;
  triage: 'T1 - Resuscitation' | 'T2 - Emergent' | 'T3 - Urgent' | 'T4 - Standard';
  status: 'Inpatient' | 'Outpatient' | 'Discharged' | 'Critical';
  bed: string;
  contact: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  phone: string;
  email: string;
  experience: string;
  opdSchedule: string;
  status: 'On Duty' | 'On Call' | 'In Surgery' | 'Off Duty';
  activePatients: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  type: 'General Consultation' | 'Follow-up' | 'Emergency' | 'Routine Checkup' | 'Post-Surgery';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headOfDept: string;
  totalBeds: number;
  occupiedBeds: number;
  doctorsCount: number;
  nursesCount: number;
  occupancyRate: number;
  status: 'Operational' | 'High Capacity' | 'Critical Surge';
}

export interface Nurse {
  id: string;
  name: string;
  badgeNumber: string;
  ward: string;
  shift: 'Morning (07:00 - 15:00)' | 'Evening (15:00 - 23:00)' | 'Night (23:00 - 07:00)';
  assignedPatients: number;
  status: 'On Shift' | 'On Break' | 'Off Duty';
  phone: string;
}

export interface PharmacyItem {
  id: string;
  drugCode: string;
  name: string;
  category: string;
  dosage: string;
  stock: number;
  minThreshold: number;
  unitPrice: number;
  expiryDate: string;
  status: 'In Stock' | 'Low Stock' | 'Critically Low';
}

export interface LabOrder {
  id: string;
  orderNumber: string;
  patientName: string;
  testName: string;
  doctorName: string;
  priority: 'Stat (Immediate)' | 'Urgent' | 'Routine';
  orderedAt: string;
  status: 'Sample Collected' | 'Processing' | 'Completed' | 'Pending Verification';
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  patientName: string;
  doctorName: string;
  date: string;
  medications: string;
  instructions: string;
  status: 'Dispensed' | 'Pending Dispensing' | 'Requires Clarification';
}

export interface MedicalRecord {
  id: string;
  recordNumber: string;
  patientName: string;
  bloodType: string;
  allergies: string;
  primaryDiagnosis: string;
  attendingPhysician: string;
  lastUpdated: string;
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  patientName: string;
  admissionDate: string;
  totalAmount: number;
  insuranceCoverage: number;
  patientPayable: number;
  status: 'Paid' | 'Pending' | 'Partially Paid' | 'Insurance Claim Pending';
  dueDate: string;
}

export interface EmergencyCase {
  id: string;
  caseId: string;
  patientName: string;
  age: number;
  chiefComplaint: string;
  triageLevel: 'Priority 1 (Red)' | 'Priority 2 (Orange)' | 'Priority 3 (Yellow)' | 'Priority 4 (Green)';
  vitals: string;
  assignedZone: 'Resuscitation Bay 1' | 'Trauma Room 3' | 'Acute Care 2' | 'Fast Track 4';
  arrivalTime: string;
  status: 'Critical Care' | 'Under Observation' | 'Awaiting Bed' | 'Stable';
}

export interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  department: string;
  shift: string;
  status: 'Active' | 'On Leave' | 'Rotational';
  contact: string;
}
