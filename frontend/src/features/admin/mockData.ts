import type {
  KpiItem,
  ForecastData,
  AlertItem,
  RecommendationItem,
  Patient,
  Doctor,
  Appointment,
  Department,
  Nurse,
  PharmacyItem,
  LabOrder,
  Prescription,
  MedicalRecord,
  InvoiceItem,
  EmergencyCase,
  StaffMember
} from './types';

export const INITIAL_KPIS: KpiItem[] = [
  {
    id: 'arrivals',
    label: 'Patient arrivals (current)',
    value: '38',
    suffix: '/ hr',
    icon: 'bi-graph-up-arrow',
    color: 'blue',
    delta: '↑ 8.2%',
    deltaNote: 'vs previous hour',
    deltaClass: 'up'
  },
  {
    id: 'waiting',
    label: 'Patients waiting',
    value: '14',
    suffix: 'patients',
    icon: 'bi-clock-history',
    color: 'orange',
    delta: '↓ 2',
    deltaNote: 'since 9:00 AM',
    deltaClass: 'down'
  },
  {
    id: 'inpatient-occupancy',
    label: 'Inpatient bed occupancy',
    value: '82',
    suffix: '%',
    icon: 'bi-grid-3x3-gap-fill',
    color: 'purple',
    bar: 82,
    barClass: 'purple',
    foot: '246 of 300 beds',
    tag: 'Within range',
    tagClass: 'ok'
  },
  {
    id: 'ed-capacity',
    label: 'ED capacity',
    value: '85',
    suffix: '%',
    icon: 'bi-shield-fill-check',
    color: 'green',
    bar: 85,
    barClass: 'green',
    foot: '34 of 40 spaces',
    tag: 'Watch',
    tagClass: 'watch'
  }
];

export const HOSPITAL_FINANCIAL_KPIS: KpiItem[] = [
  {
    id: 'total-patients',
    label: 'Active hospital patients',
    value: '1,428',
    suffix: 'census',
    icon: 'bi-people-fill',
    color: 'blue',
    delta: '↑ 3.4%',
    deltaNote: 'vs last week',
    deltaClass: 'up'
  },
  {
    id: 'doctors-active',
    label: 'Physicians on duty',
    value: '84',
    suffix: 'staffed',
    icon: 'bi-person-badge',
    color: 'green',
    delta: '92% coverage',
    deltaNote: 'target 80+',
    deltaClass: 'up'
  },
  {
    id: 'daily-revenue',
    label: 'Gross daily revenue',
    value: '$482,500',
    icon: 'bi-currency-dollar',
    color: 'purple',
    bar: 78,
    barClass: 'purple',
    foot: 'Target: $520k / day',
    tag: 'Normal',
    tagClass: 'ok'
  },
  {
    id: 'pending-bills',
    label: 'Pending clearance bills',
    value: '28',
    suffix: 'invoices',
    icon: 'bi-receipt',
    color: 'orange',
    delta: '$34,200',
    deltaNote: 'under insurance review',
    deltaClass: 'down'
  }
];

export const INITIAL_FORECAST: ForecastData = {
  pred1h: 15,
  pred2h: 34,
  risk: 'Moderate',
  labels: Array.from({ length: 24 }, (_, hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  }),
  actual: [12, 10, 8, 7, 9, 14, 22, 32, 41, 48, 52, 56, 60, 64, 68, 72, null, null, null, null, null, null, null, null],
  predicted: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 72, 76, 82, 88, 91, 86, 78, 67, 54]
};

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    title: 'Emergency Department capacity',
    desc: 'Trending toward 90% within 2 hrs',
    severity: 'High',
    time: '8 min ago',
    icon: 'bi-exclamation-lg',
    analysis: 'ED is already at high utilisation and the arrival trend could push capacity close to its limit within two hours.',
    action: 'Confirm staffed treatment spaces and ask the charge nurse to prepare the surge plan.'
  },
  {
    id: 'alt-2',
    title: 'Critical care beds nearly full',
    desc: 'Only one staffed ICU bed remains available',
    severity: 'High',
    time: '11 min ago',
    icon: 'bi-heart-pulse',
    analysis: 'A single available staffed bed leaves little buffer for an urgent admission or a change in patient acuity.',
    action: 'Verify the staffed-bed count with the ICU lead and review expected transfers and discharges.'
  },
  {
    id: 'alt-3',
    title: 'Ward B nearing capacity',
    desc: 'Monitor discharge availability',
    severity: 'Medium',
    time: '21 min ago',
    icon: 'bi-arrow-up-right',
    analysis: 'Rising occupancy may constrain incoming transfers if discharges do not keep pace.',
    action: 'Review pending discharge decisions and recheck Ward B capacity during the next bed huddle.'
  },
  {
    id: 'alt-4',
    title: 'Imaging wait times rising',
    desc: 'CT queue is above the usual afternoon level',
    severity: 'Medium',
    time: '34 min ago',
    icon: 'bi-hourglass-split',
    analysis: 'The increased CT queue may delay diagnostic decisions and add pressure to ED waiting times.',
    action: 'Check scanner availability and prioritise time-sensitive studies with the imaging coordinator.'
  },
  {
    id: 'alt-5',
    title: 'Routine equipment check due',
    desc: 'Portable monitors are scheduled for inspection today',
    severity: 'Low',
    time: '46 min ago',
    icon: 'bi-clipboard-check',
    analysis: 'This is a scheduled maintenance reminder; no current service disruption has been reported.',
    action: 'Complete the inspection during the planned maintenance window and record the result.'
  },
  {
    id: 'alt-6',
    title: 'Staffing coverage confirmed',
    desc: 'All planned shifts are covered for the next 4 hours',
    severity: 'Low',
    time: '1 hr ago',
    icon: 'bi-people',
    analysis: 'Current planned coverage is complete, with no immediate staffing gap indicated by this alert.',
    action: 'Continue routine monitoring and reassess if arrivals or acuity change.'
  }
];

export const INITIAL_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 1,
    priority: 'Priority 1',
    suggested: 'Suggested 4 min ago',
    title: 'Prepare for rising ED demand',
    detail: 'ED is currently at 85% capacity (34/40 spaces). The model estimates arrivals may increase over the next 2 hours.',
    reasoning: 'Review the next discharge window, check staff availability, and keep one flexible treatment space ready if demand continues to rise.',
    action: 'Ask charge nurse to review flexible capacity',
    status: 'pending'
  },
  {
    id: 2,
    priority: 'Priority 2',
    suggested: 'Suggested 12 min ago',
    title: 'Ward B discharge review',
    detail: 'Ward B occupancy has risen steadily over the last hour with no matching discharge activity.',
    reasoning: 'Two patients meet discharge criteria pending physician sign-off. Flagging early avoids a same-day capacity crunch.',
    action: 'Notify Ward B physician to review pending discharges',
    status: 'pending'
  },
  {
    id: 3,
    priority: 'Priority 3',
    suggested: 'Suggested 30 min ago',
    title: 'Staff reallocation — night shift',
    detail: 'Forecasted arrivals between 1–3 PM exceed current staffing ratio in the ED by an estimated 12%.',
    reasoning: 'Pulling one float nurse from Ward C during the 1–3 PM window keeps the ratio within target without affecting Ward C coverage.',
    action: 'Reassign 1 float nurse to ED, 1–3 PM',
    status: 'pending'
  }
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P-101',
    mrn: 'MRN-84920',
    name: 'Eleanor Vance',
    age: 58,
    gender: 'F',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Jenkins',
    admittedAt: 'Today, 08:30 AM',
    triage: 'T2 - Emergent',
    status: 'Inpatient',
    bed: 'Cardio-302A',
    contact: '+1 (555) 234-5678'
  },
  {
    id: 'P-102',
    mrn: 'MRN-84921',
    name: 'Marcus Thorne',
    age: 42,
    gender: 'M',
    department: 'Emergency & Trauma',
    doctor: 'Dr. Alan Vance',
    admittedAt: 'Today, 09:15 AM',
    triage: 'T1 - Resuscitation',
    status: 'Critical',
    bed: 'Trauma Bay 2',
    contact: '+1 (555) 345-6789'
  },
  {
    id: 'P-103',
    mrn: 'MRN-84922',
    name: 'Sophia Chen',
    age: 31,
    gender: 'F',
    department: 'Obstetrics & Gynecology',
    doctor: 'Dr. Maria Ramos',
    admittedAt: 'Yesterday, 04:20 PM',
    triage: 'T3 - Urgent',
    status: 'Inpatient',
    bed: 'Maternity-104',
    contact: '+1 (555) 456-7890'
  },
  {
    id: 'P-104',
    mrn: 'MRN-84923',
    name: 'David Reynolds',
    age: 67,
    gender: 'M',
    department: 'Neurology',
    doctor: 'Dr. Robert King',
    admittedAt: 'Today, 06:45 AM',
    triage: 'T2 - Emergent',
    status: 'Inpatient',
    bed: 'Neuro-410B',
    contact: '+1 (555) 567-8901'
  },
  {
    id: 'P-105',
    mrn: 'MRN-84924',
    name: 'Chloe Williams',
    age: 14,
    gender: 'F',
    department: 'Pediatrics',
    doctor: 'Dr. Lisa Patel',
    admittedAt: 'Today, 10:00 AM',
    triage: 'T4 - Standard',
    status: 'Outpatient',
    bed: 'OPD-Ped-12',
    contact: '+1 (555) 678-9012'
  },
  {
    id: 'P-106',
    mrn: 'MRN-84925',
    name: 'James Anderson',
    age: 73,
    gender: 'M',
    department: 'Orthopedics',
    doctor: 'Dr. Kevin Miller',
    admittedAt: '3 days ago',
    triage: 'T3 - Urgent',
    status: 'Inpatient',
    bed: 'Ortho-208',
    contact: '+1 (555) 789-0123'
  }
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'DOC-01',
    name: 'Dr. Sarah Jenkins, MD',
    specialty: 'Interventional Cardiology',
    department: 'Cardiology',
    phone: '+1 (555) 111-2233',
    email: 's.jenkins@hospital.org',
    experience: '14 years',
    opdSchedule: 'Mon - Fri (08:00 - 14:00)',
    status: 'On Duty',
    activePatients: 16
  },
  {
    id: 'DOC-02',
    name: 'Dr. Alan Vance, MD',
    specialty: 'Emergency & Critical Care',
    department: 'Emergency & Trauma',
    phone: '+1 (555) 222-3344',
    email: 'a.vance@hospital.org',
    experience: '11 years',
    opdSchedule: 'Shift 24h Trauma Lead',
    status: 'In Surgery',
    activePatients: 9
  },
  {
    id: 'DOC-03',
    name: 'Dr. Robert King, MD',
    specialty: 'Neurology & Stroke Care',
    department: 'Neurology',
    phone: '+1 (555) 333-4455',
    email: 'r.king@hospital.org',
    experience: '18 years',
    opdSchedule: 'Tue - Sat (09:00 - 15:00)',
    status: 'On Duty',
    activePatients: 12
  },
  {
    id: 'DOC-04',
    name: 'Dr. Lisa Patel, MD',
    specialty: 'Pediatric Pulmonology',
    department: 'Pediatrics',
    phone: '+1 (555) 444-5566',
    email: 'l.patel@hospital.org',
    experience: '9 years',
    opdSchedule: 'Mon - Thu (09:00 - 16:00)',
    status: 'On Duty',
    activePatients: 14
  },
  {
    id: 'DOC-05',
    name: 'Dr. Kevin Miller, MD',
    specialty: 'Orthopedic Surgery & Arthroplasty',
    department: 'Orthopedics',
    phone: '+1 (555) 555-6677',
    email: 'k.miller@hospital.org',
    experience: '16 years',
    opdSchedule: 'Mon, Wed, Fri (10:00 - 17:00)',
    status: 'On Call',
    activePatients: 8
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'APP-901',
    patientName: 'Eleanor Vance',
    doctorName: 'Dr. Sarah Jenkins',
    department: 'Cardiology',
    date: 'Today',
    time: '11:30 AM',
    type: 'Follow-up',
    status: 'Confirmed'
  },
  {
    id: 'APP-902',
    patientName: 'David Reynolds',
    doctorName: 'Dr. Robert King',
    department: 'Neurology',
    date: 'Today',
    time: '01:00 PM',
    type: 'Routine Checkup',
    status: 'Confirmed'
  },
  {
    id: 'APP-903',
    patientName: 'Chloe Williams',
    doctorName: 'Dr. Lisa Patel',
    department: 'Pediatrics',
    date: 'Today',
    time: '02:15 PM',
    type: 'General Consultation',
    status: 'Pending'
  },
  {
    id: 'APP-904',
    patientName: 'Samuel Hughes',
    doctorName: 'Dr. Kevin Miller',
    department: 'Orthopedics',
    date: 'Today',
    time: '03:45 PM',
    type: 'Post-Surgery',
    status: 'Confirmed'
  },
  {
    id: 'APP-905',
    patientName: 'Beatrice Gomez',
    doctorName: 'Dr. Maria Ramos',
    department: 'Obstetrics',
    date: 'Tomorrow',
    time: '09:00 AM',
    type: 'General Consultation',
    status: 'Confirmed'
  }
];

export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: 'DEP-01',
    name: 'Emergency & Trauma',
    code: 'ED',
    headOfDept: 'Dr. Alan Vance',
    totalBeds: 40,
    occupiedBeds: 34,
    doctorsCount: 18,
    nursesCount: 42,
    occupancyRate: 85,
    status: 'High Capacity'
  },
  {
    id: 'DEP-02',
    name: 'Cardiology & CCU',
    code: 'CARD',
    headOfDept: 'Dr. Sarah Jenkins',
    totalBeds: 50,
    occupiedBeds: 44,
    doctorsCount: 14,
    nursesCount: 28,
    occupancyRate: 88,
    status: 'Operational'
  },
  {
    id: 'DEP-03',
    name: 'Intensive Care Unit (ICU)',
    code: 'ICU',
    headOfDept: 'Dr. Nathan Bailey',
    totalBeds: 24,
    occupiedBeds: 23,
    doctorsCount: 10,
    nursesCount: 36,
    occupancyRate: 96,
    status: 'Critical Surge'
  },
  {
    id: 'DEP-04',
    name: 'General Inpatient Ward B',
    code: 'WARD-B',
    headOfDept: 'Dr. Helen Morris',
    totalBeds: 80,
    occupiedBeds: 68,
    doctorsCount: 12,
    nursesCount: 30,
    occupancyRate: 85,
    status: 'High Capacity'
  },
  {
    id: 'DEP-05',
    name: 'Neurology & Stroke Center',
    code: 'NEURO',
    headOfDept: 'Dr. Robert King',
    totalBeds: 40,
    occupiedBeds: 31,
    doctorsCount: 11,
    nursesCount: 24,
    occupancyRate: 77,
    status: 'Operational'
  },
  {
    id: 'DEP-06',
    name: 'Pediatrics & Neonatal',
    code: 'PED',
    headOfDept: 'Dr. Lisa Patel',
    totalBeds: 45,
    occupiedBeds: 30,
    doctorsCount: 9,
    nursesCount: 22,
    occupancyRate: 66,
    status: 'Operational'
  }
];

export const MOCK_NURSES: Nurse[] = [
  {
    id: 'NUR-101',
    name: 'Rachel Adams, RN',
    badgeNumber: 'RN-8812',
    ward: 'Emergency Department',
    shift: 'Morning (07:00 - 15:00)',
    assignedPatients: 5,
    status: 'On Shift',
    phone: '+1 (555) 777-1122'
  },
  {
    id: 'NUR-102',
    name: 'David O\'Connor, BSN',
    badgeNumber: 'RN-8815',
    ward: 'ICU Pod 1',
    shift: 'Morning (07:00 - 15:00)',
    assignedPatients: 2,
    status: 'On Shift',
    phone: '+1 (555) 777-2233'
  },
  {
    id: 'NUR-103',
    name: 'Emily Watson, RN',
    badgeNumber: 'RN-8820',
    ward: 'Ward B (Medical-Surgical)',
    shift: 'Evening (15:00 - 23:00)',
    assignedPatients: 6,
    status: 'On Break',
    phone: '+1 (555) 777-3344'
  },
  {
    id: 'NUR-104',
    name: 'Grace Hopper, RN',
    badgeNumber: 'RN-8831',
    ward: 'Cardiology CCU',
    shift: 'Night (23:00 - 07:00)',
    assignedPatients: 4,
    status: 'Off Duty',
    phone: '+1 (555) 777-4455'
  }
];

export const MOCK_PHARMACY: PharmacyItem[] = [
  {
    id: 'MED-01',
    drugCode: 'RX-ATV-20',
    name: 'Atorvastatin 20mg',
    category: 'Cardiovascular',
    dosage: 'Tablet 20mg',
    stock: 2450,
    minThreshold: 500,
    unitPrice: 1.25,
    expiryDate: '2027-08-15',
    status: 'In Stock'
  },
  {
    id: 'MED-02',
    drugCode: 'RX-EPN-03',
    name: 'Epinephrine 1mg/mL',
    category: 'Emergency & Resuscitation',
    dosage: 'Ampoule 1mg',
    stock: 42,
    minThreshold: 50,
    unitPrice: 18.50,
    expiryDate: '2026-12-01',
    status: 'Low Stock'
  },
  {
    id: 'MED-03',
    drugCode: 'RX-AMO-500',
    name: 'Amoxicillin + Clavulanate 500/125mg',
    category: 'Antibiotics',
    dosage: 'Capsule',
    stock: 820,
    minThreshold: 300,
    unitPrice: 2.10,
    expiryDate: '2027-04-20',
    status: 'In Stock'
  },
  {
    id: 'MED-04',
    drugCode: 'RX-HEP-5000',
    name: 'Heparin Sodium 5,000 USP Units',
    category: 'Anticoagulant',
    dosage: 'Vial',
    stock: 19,
    minThreshold: 40,
    unitPrice: 32.00,
    expiryDate: '2026-11-10',
    status: 'Critically Low'
  }
];

export const MOCK_LAB_ORDERS: LabOrder[] = [
  {
    id: 'LAB-551',
    orderNumber: 'LAB-2026-081',
    patientName: 'Eleanor Vance',
    testName: 'High-Sensitivity Troponin I & Lipid Panel',
    doctorName: 'Dr. Sarah Jenkins',
    priority: 'Stat (Immediate)',
    orderedAt: '09:05 AM',
    status: 'Processing'
  },
  {
    id: 'LAB-552',
    orderNumber: 'LAB-2026-082',
    patientName: 'Marcus Thorne',
    testName: 'Arterial Blood Gas (ABG) & Coagulation Screen',
    doctorName: 'Dr. Alan Vance',
    priority: 'Stat (Immediate)',
    orderedAt: '09:20 AM',
    status: 'Completed'
  },
  {
    id: 'LAB-553',
    orderNumber: 'LAB-2026-083',
    patientName: 'David Reynolds',
    testName: 'Comprehensive Metabolic Panel (CMP)',
    doctorName: 'Dr. Robert King',
    priority: 'Urgent',
    orderedAt: '07:15 AM',
    status: 'Sample Collected'
  },
  {
    id: 'LAB-554',
    orderNumber: 'LAB-2026-084',
    patientName: 'Sophia Chen',
    testName: 'CBC with Platelets & Serum Ferritin',
    doctorName: 'Dr. Maria Ramos',
    priority: 'Routine',
    orderedAt: 'Yesterday',
    status: 'Completed'
  }
];

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'RX-701',
    prescriptionNumber: 'PRE-8910',
    patientName: 'Eleanor Vance',
    doctorName: 'Dr. Sarah Jenkins',
    date: 'Today, 09:40 AM',
    medications: 'Atorvastatin 40mg PO QD, Aspirin 81mg PO QD, Metoprolol 25mg PO BID',
    instructions: 'Take with evening meal. Monitor resting heart rate.',
    status: 'Dispensed'
  },
  {
    id: 'RX-702',
    prescriptionNumber: 'PRE-8911',
    patientName: 'Chloe Williams',
    doctorName: 'Dr. Lisa Patel',
    date: 'Today, 10:15 AM',
    medications: 'Albuterol Inhaler 90mcg 2 puffs q4h PRN, Fluticasone 50mcg BID',
    instructions: 'Rinse mouth after each steroid inhaler use.',
    status: 'Pending Dispensing'
  },
  {
    id: 'RX-703',
    prescriptionNumber: 'PRE-8912',
    patientName: 'David Reynolds',
    doctorName: 'Dr. Robert King',
    date: 'Today, 08:00 AM',
    medications: 'Clopidogrel 75mg PO QD, Rosuvastatin 20mg PO QD',
    instructions: 'Take at the same time each day.',
    status: 'Dispensed'
  }
];

export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 'REC-301',
    recordNumber: 'EHR-2026-9901',
    patientName: 'Eleanor Vance',
    bloodType: 'A positive (A+)',
    allergies: 'Penicillin (Anaphylaxis), Sulfa drugs',
    primaryDiagnosis: 'Acute Coronary Syndrome — Non-ST Elevation MI',
    attendingPhysician: 'Dr. Sarah Jenkins',
    lastUpdated: 'Today, 10:30 AM'
  },
  {
    id: 'REC-302',
    recordNumber: 'EHR-2026-9902',
    patientName: 'Marcus Thorne',
    bloodType: 'O negative (O-)',
    allergies: 'No Known Drug Allergies (NKDA)',
    primaryDiagnosis: 'Polytrauma, Closed Femoral Fracture, Concussion',
    attendingPhysician: 'Dr. Alan Vance',
    lastUpdated: 'Today, 09:45 AM'
  },
  {
    id: 'REC-303',
    recordNumber: 'EHR-2026-9903',
    patientName: 'David Reynolds',
    bloodType: 'B positive (B+)',
    allergies: 'Aspirin (GI intolerance)',
    primaryDiagnosis: 'Transient Ischemic Attack (TIA) — Left Hemisphere',
    attendingPhysician: 'Dr. Robert King',
    lastUpdated: 'Today, 08:15 AM'
  }
];

export const MOCK_INVOICES: InvoiceItem[] = [
  {
    id: 'INV-401',
    invoiceNumber: 'INV-2026-1042',
    patientName: 'Eleanor Vance',
    admissionDate: 'Today',
    totalAmount: 8450.00,
    insuranceCoverage: 7605.00,
    patientPayable: 845.00,
    status: 'Insurance Claim Pending',
    dueDate: '2026-10-22'
  },
  {
    id: 'INV-402',
    invoiceNumber: 'INV-2026-1043',
    patientName: 'Sophia Chen',
    admissionDate: 'Yesterday',
    totalAmount: 4200.00,
    insuranceCoverage: 3780.00,
    patientPayable: 420.00,
    status: 'Paid',
    dueDate: '2026-10-15'
  },
  {
    id: 'INV-403',
    invoiceNumber: 'INV-2026-1044',
    patientName: 'James Anderson',
    admissionDate: '3 days ago',
    totalAmount: 14800.00,
    insuranceCoverage: 11840.00,
    patientPayable: 2960.00,
    status: 'Partially Paid',
    dueDate: '2026-10-25'
  },
  {
    id: 'INV-404',
    invoiceNumber: 'INV-2026-1045',
    patientName: 'Chloe Williams',
    admissionDate: 'Today',
    totalAmount: 350.00,
    insuranceCoverage: 280.00,
    patientPayable: 70.00,
    status: 'Paid',
    dueDate: '2026-10-08'
  }
];

export const MOCK_EMERGENCY: EmergencyCase[] = [
  {
    id: 'EM-01',
    caseId: 'ER-8841',
    patientName: 'Marcus Thorne',
    age: 42,
    chiefComplaint: 'Motor vehicle collision, blunt chest trauma & femur fracture',
    triageLevel: 'Priority 1 (Red)',
    vitals: 'BP 92/58, HR 128, SpO2 93%, RR 26',
    assignedZone: 'Resuscitation Bay 1',
    arrivalTime: '09:15 AM (18m ago)',
    status: 'Critical Care'
  },
  {
    id: 'EM-02',
    caseId: 'ER-8842',
    patientName: 'Kenneth Wright',
    age: 64,
    chiefComplaint: 'Crushing retrosternal chest pain radiating to left jaw',
    triageLevel: 'Priority 1 (Red)',
    vitals: 'BP 158/98, HR 102, SpO2 96%, RR 20',
    assignedZone: 'Trauma Room 3',
    arrivalTime: '09:28 AM (5m ago)',
    status: 'Critical Care'
  },
  {
    id: 'EM-03',
    caseId: 'ER-8843',
    patientName: 'Victoria Price',
    age: 28,
    chiefComplaint: 'Acute right lower quadrant abdominal pain, febrile 38.8°C',
    triageLevel: 'Priority 2 (Orange)',
    vitals: 'BP 118/74, HR 88, SpO2 99%, Temp 38.8°C',
    assignedZone: 'Acute Care 2',
    arrivalTime: '08:50 AM (43m ago)',
    status: 'Under Observation'
  },
  {
    id: 'EM-04',
    caseId: 'ER-8844',
    patientName: 'Julian Meyer',
    age: 51,
    chiefComplaint: 'Laceration to left forearm, controlled bleeding, neurovascular intact',
    triageLevel: 'Priority 3 (Yellow)',
    vitals: 'BP 130/82, HR 76, SpO2 98%',
    assignedZone: 'Fast Track 4',
    arrivalTime: '08:35 AM (58m ago)',
    status: 'Stable'
  }
];

export const MOCK_STAFF: StaffMember[] = [
  {
    id: 'STF-01',
    employeeId: 'EMP-3041',
    name: 'Catherine Bell',
    role: 'Clinical Operations Director',
    department: 'Hospital Administration',
    shift: 'General (08:00 - 17:00)',
    status: 'Active',
    contact: '+1 (555) 888-0011'
  },
  {
    id: 'STF-02',
    employeeId: 'EMP-3042',
    name: 'Brian Foster',
    role: 'Head of Biomedical Engineering',
    department: 'Facilities & Bio-Tech',
    shift: 'General (08:00 - 17:00)',
    status: 'Active',
    contact: '+1 (555) 888-0022'
  },
  {
    id: 'STF-03',
    employeeId: 'EMP-3043',
    name: 'Melissa Gomez',
    role: 'Chief Pharmacist',
    department: 'Central Pharmacy',
    shift: 'Morning (07:00 - 15:30)',
    status: 'Active',
    contact: '+1 (555) 888-0033'
  },
  {
    id: 'STF-04',
    employeeId: 'EMP-3044',
    name: 'Anthony Wright',
    role: 'Lead Radiologic Technologist',
    department: 'Medical Imaging',
    shift: 'Rotational 12h',
    status: 'Active',
    contact: '+1 (555) 888-0044'
  }
];
