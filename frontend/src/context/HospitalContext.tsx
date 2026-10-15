import React, { createContext, useContext, useState } from 'react';
import type {
  OperationalMetrics,
  ArrivalForecastPoint,
  AlertItem,
  RecommendationItem,
  FlowStage,
  DepartmentFlow,
  TransferItem,
  FlowPatient,
  WaitTimeTrendPoint,
  TriagePatient,
  BedItem,
  EquipmentItem,
  AgentActivityLog,
  HistoryRecord,
  UserRole
} from '../types';

interface HospitalContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  metrics: OperationalMetrics;
  forecastPoints: ArrivalForecastPoint[];
  alerts: AlertItem[];
  recommendations: RecommendationItem[];
  flowStages: FlowStage[];
  departmentFlows: DepartmentFlow[];
  transfers: TransferItem[];
  flowPatients: FlowPatient[];
  waitTimeTrends: WaitTimeTrendPoint[];
  triagePatients: TriagePatient[];
  beds: BedItem[];
  equipment: EquipmentItem[];
  activityLogs: AgentActivityLog[];
  historyRecords: HistoryRecord[];
  
  // Actions
  approveRecommendation: (id: string) => void;
  dismissRecommendation: (id: string) => void;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string) => void;
  updateTransferStatus: (transferId: string, status: TransferItem['status']) => void;
  addTriagePatient: (patient: Omit<TriagePatient, 'id' | 'arrivalTime' | 'waitingMins' | 'triageCategory' | 'urgencyLevel' | 'reasoning' | 'status'>) => void;
  updateBedStatus: (bedId: string, status: BedItem['status']) => void;
  triggerScenario: (scenario: 'ED_CONGESTION' | 'ICU_SHORTAGE' | 'RESET') => void;
  activeScenario: string | null;
}

const INITIAL_METRICS: OperationalMetrics = {
  arrivalsCurrent: 38,
  arrivalsTrend: '↑ 8.2% vs previous hour',
  patientsWaiting: 14,
  waitingTrend: '↓ 2 since 9:00 AM',
  inpatientBedsTotal: 300,
  inpatientBedsOccupied: 246,
  inpatientOccupancyRate: 82,
  edCapacityTotal: 40,
  edCapacityOccupied: 34,
  edOccupancyRate: 85,
  lastUpdated: 'just now',
};

const INITIAL_FORECAST: ArrivalForecastPoint[] = [
  { timeLabel: '06:00', arrivals: 12, isForecast: false },
  { timeLabel: '07:00', arrivals: 10, isForecast: false },
  { timeLabel: '08:00', arrivals: 8, isForecast: false },
  { timeLabel: '09:00', arrivals: 15, isForecast: false },
  { timeLabel: '10:00', arrivals: 24, isForecast: false },
  { timeLabel: '11:00', arrivals: 32, isForecast: false },
  { timeLabel: '12:00', arrivals: 45, isForecast: false },
  { timeLabel: '13:00', arrivals: 52, isForecast: false },
  { timeLabel: '14:00', arrivals: 55, isForecast: false },
  { timeLabel: '15:00', arrivals: 60, isForecast: false },
  { timeLabel: '16:00', arrivals: 64, isForecast: false },
  { timeLabel: '17:00', arrivals: 68, isForecast: false },
  { timeLabel: '18:00', arrivals: 73, isForecast: false },
  { timeLabel: '19:00', arrivals: 78, isForecast: true },
];

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-01',
    title: 'Emergency Department capacity',
    severity: 'High',
    detail: 'Trending toward 90% within 2 hrs',
    timeAgo: '8 min ago',
    timestamp: '12:49 PM',
    department: 'Emergency',
    status: 'active',
  },
  {
    id: 'ALT-02',
    title: 'Critical care beds nearly full',
    severity: 'High',
    detail: 'Only one staffed ICU bed remains available',
    timeAgo: '11 min ago',
    timestamp: '12:46 PM',
    department: 'ICU',
    status: 'active',
  },
  {
    id: 'ALT-03',
    title: 'Ward B nearing capacity',
    severity: 'Medium',
    detail: 'Monitor discharge availability',
    timeAgo: '21 min ago',
    timestamp: '12:36 PM',
    department: 'Ward B',
    status: 'active',
  },
  {
    id: 'ALT-04',
    title: 'Imaging wait times rising',
    severity: 'Medium',
    detail: 'CT queue is above the usual afternoon level',
    timeAgo: '34 min ago',
    timestamp: '12:23 PM',
    department: 'Imaging',
    status: 'active',
  },
  {
    id: 'ALT-05',
    title: 'Post-Op Transfer Backlog',
    severity: 'Medium',
    detail: '2 recovery room patients awaiting inpatient beds',
    timeAgo: '41 min ago',
    timestamp: '12:16 PM',
    department: 'Surgical Recovery',
    status: 'active',
  },
  {
    id: 'ALT-06',
    title: 'Shift Change Handover Due',
    severity: 'Low',
    detail: 'Nursing evening shift briefing starts in 20 min',
    timeAgo: '48 min ago',
    timestamp: '12:09 PM',
    department: 'Operations',
    status: 'active',
  },
];

const INITIAL_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 'REC-01',
    priority: 1,
    title: 'Prepare for rising ED demand',
    description: 'ED is currently at 85% capacity (34/40 spaces). The model estimates arrivals may increase over the next 2 hours.',
    timeAgo: 'Suggested 4 min ago',
    department: 'Emergency Department',
    agentReasoning: 'Review the next discharge window, check staff availability, and keep one flexible treatment space ready if demand continues to rise.',
    recommendedAction: 'Ask charge nurse to review flexible capacity',
    status: 'pending',
    impactSummary: 'Prepares 3 flex beds and dispatches alert to ED Coordinator',
    actionPayload: {
      additionalBeds: 3,
      targetWard: 'Emergency Department',
      alertRecipient: 'Charge Nurse & ED Coordinator',
    },
  },
  {
    id: 'REC-02',
    priority: 2,
    title: 'ICU Resource Shortage Mitigation',
    description: 'ICU occupancy is at 90% (18/20 beds). The ML model predicts ICU occupancy may reach 98% within the next 4 hours.',
    timeAgo: 'Suggested 12 min ago',
    department: 'Intensive Care Unit',
    agentReasoning: 'Expected admissions (2) exceed step-downs to Step-Down Ward A. Recommend preparing 2 standby critical care beds and alerting ICU coordinator.',
    recommendedAction: 'Prepare 2 ICU beds & alert ICU Coordinator',
    status: 'pending',
    impactSummary: 'Reserves 2 ICU beds and dispatches emergency shift mobilization alert',
    actionPayload: {
      additionalBeds: 2,
      targetWard: 'ICU',
      alertRecipient: 'ICU Coordinator',
    },
  },
  {
    id: 'REC-03',
    priority: 3,
    title: 'Accelerate Discharge Pipeline for Ward B',
    description: 'Ward B occupancy reached 88%. 4 patients are medically cleared for discharge pending pharmacy mediation.',
    timeAgo: 'Suggested 18 min ago',
    department: 'Ward B',
    agentReasoning: 'Expediting medication reconciliation and transport for 4 cleared patients will open 4 acute beds prior to 5:00 PM peak.',
    recommendedAction: 'Expedite 4 discharge packages with floor coordinator',
    status: 'pending',
    impactSummary: 'Frees 4 acute inpatient beds in Ward B',
    actionPayload: {
      additionalBeds: 4,
      targetWard: 'Ward B',
      alertRecipient: 'Ward B Floor Lead',
    },
  },
];

const INITIAL_STAGES: FlowStage[] = [
  { id: 'stg-1', name: 'Arrival', shortDesc: 'Ambulance & walk-in check-in', count: 38, avgWaitMins: 3, capacity: 50, status: 'normal' },
  { id: 'stg-2', name: 'Registration', shortDesc: 'Intake and insurance triage log', count: 18, avgWaitMins: 6, capacity: 25, status: 'normal' },
  { id: 'stg-3', name: 'Waiting', shortDesc: 'Waiting for clinical examination', count: 14, avgWaitMins: 22, capacity: 30, status: 'normal' },
  { id: 'stg-4', name: 'Doctor Consultation', shortDesc: 'Attending physician evaluation', count: 28, avgWaitMins: 14, capacity: 35, status: 'normal' },
  { id: 'stg-5', name: 'Diagnostic Tests', shortDesc: 'Radiology, CT & bloodwork', count: 22, avgWaitMins: 38, capacity: 25, status: 'watch' },
  { id: 'stg-6', name: 'Treatment', shortDesc: 'Active bedside care & stabilization', count: 42, avgWaitMins: 45, capacity: 50, status: 'watch' },
  { id: 'stg-7', name: 'Admission / Bed', shortDesc: 'Transferred to inpatient ward or ICU', count: 16, avgWaitMins: 52, capacity: 20, status: 'critical' },
  { id: 'stg-8', name: 'Discharge', shortDesc: 'Discharge summary & transit ready', count: 11, avgWaitMins: 18, capacity: 20, status: 'normal' },
];

const INITIAL_DEPTS: DepartmentFlow[] = [
  { id: 'dept-1', name: 'Emergency & Trauma (ED)', activePatients: 42, waitingPatients: 14, avgWaitMins: 22, congestionLevel: 'High' },
  { id: 'dept-2', name: 'Intensive Care Unit (ICU)', activePatients: 18, waitingPatients: 2, avgWaitMins: 8, congestionLevel: 'Critical' },
  { id: 'dept-3', name: 'General Medicine (Ward A)', activePatients: 112, waitingPatients: 5, avgWaitMins: 15, congestionLevel: 'Moderate' },
  { id: 'dept-4', name: 'Acute Surgical (Ward B)', activePatients: 88, waitingPatients: 7, avgWaitMins: 28, congestionLevel: 'High' },
  { id: 'dept-5', name: 'Pediatrics Ward', activePatients: 28, waitingPatients: 3, avgWaitMins: 12, congestionLevel: 'Low' },
  { id: 'dept-6', name: 'Diagnostic Imaging / CT', activePatients: 19, waitingPatients: 9, avgWaitMins: 42, congestionLevel: 'High' },
];

const INITIAL_TRANSFERS: TransferItem[] = [
  {
    id: 'TRN-101',
    patientId: 'PAT-8492',
    patientName: 'Marcus Vance',
    fromDepartment: 'Emergency & Trauma (ED)',
    toDepartment: 'Intensive Care Unit (ICU)',
    priority: 'Immediate',
    status: 'In-Transit',
    elapsedMins: 14,
    reason: 'Acute coronary syndrome / Post-PCI critical telemetry monitoring',
  },
  {
    id: 'TRN-102',
    patientId: 'PAT-8495',
    patientName: 'Elena Rostova',
    fromDepartment: 'Emergency & Trauma (ED)',
    toDepartment: 'General Medicine (Ward A)',
    priority: 'Urgent',
    status: 'Pending Bed',
    elapsedMins: 28,
    reason: 'Asthma exacerbation stabilized, acute inpatient respiratory bed required',
  },
  {
    id: 'TRN-103',
    patientId: 'PAT-8512',
    patientName: 'Chloe Martin',
    fromDepartment: 'Emergency & Trauma (ED)',
    toDepartment: 'Diagnostic Imaging / CT',
    priority: 'Urgent',
    status: 'In-Transit',
    elapsedMins: 8,
    reason: 'Non-contrast emergent head CT for neurological deficit evaluation',
  },
  {
    id: 'TRN-104',
    patientId: 'PAT-8204',
    patientName: 'David Morales',
    fromDepartment: 'Intensive Care Unit (ICU)',
    toDepartment: 'General Medicine (Ward A)',
    priority: 'Routine',
    status: 'Pending Bed',
    elapsedMins: 45,
    reason: 'Extubated, hemodynamically stable; step-down transfer to free critical bed',
  },
  {
    id: 'TRN-105',
    patientId: 'PAT-8390',
    patientName: 'Arthur Pendelton',
    fromDepartment: 'Acute Surgical (Ward B)',
    toDepartment: 'Emergency & Trauma (ED)',
    priority: 'Routine',
    status: 'Completed',
    elapsedMins: 62,
    reason: 'Post-op orthopedic wound review completed; returned to inpatient care',
  },
];

const INITIAL_FLOW_PATIENTS: FlowPatient[] = [
  { id: 'PAT-901', name: 'Sarah Jenkins', age: 42, gender: 'Female', currentStage: 'Arrival', department: 'Emergency & Trauma (ED)', arrivalTime: '13:42', waitMinutes: 8, acuity: 'Medium', assignedStaff: 'Triage Nurse Cooper' },
  { id: 'PAT-902', name: 'Liam O\'Connor', age: 29, gender: 'Male', currentStage: 'Registration', department: 'Emergency & Trauma (ED)', arrivalTime: '13:35', waitMinutes: 15, acuity: 'Low', assignedStaff: 'Intake Desk 2' },
  { id: 'PAT-903', name: 'Elena Rostova', age: 34, gender: 'Female', currentStage: 'Waiting', department: 'Emergency & Trauma (ED)', arrivalTime: '12:41', waitMinutes: 16, acuity: 'High', assignedStaff: 'Dr. Alvarez' },
  { id: 'PAT-904', name: 'David Kim', age: 46, gender: 'Male', currentStage: 'Doctor Consultation', department: 'Emergency & Trauma (ED)', arrivalTime: '12:48', waitMinutes: 9, acuity: 'Medium', assignedStaff: 'Dr. Alvarez' },
  { id: 'PAT-905', name: 'Sophia Martinez', age: 19, gender: 'Female', currentStage: 'Diagnostic Tests', department: 'Diagnostic Imaging / CT', arrivalTime: '12:15', waitMinutes: 42, acuity: 'Medium', assignedStaff: 'Tech Reynolds' },
  { id: 'PAT-906', name: 'Marcus Vance', age: 58, gender: 'Male', currentStage: 'Treatment', department: 'Emergency & Trauma (ED)', arrivalTime: '12:35', waitMinutes: 22, acuity: 'High', assignedStaff: 'Dr. Chen' },
  { id: 'PAT-907', name: 'Robert Sterling', age: 67, gender: 'Male', currentStage: 'Admission / Bed', department: 'General Medicine (Ward A)', arrivalTime: '11:30', waitMinutes: 58, acuity: 'High', assignedStaff: 'Charge Nurse Davis' },
  { id: 'PAT-908', name: 'Hannah Abbott', age: 51, gender: 'Female', currentStage: 'Discharge', department: 'Acute Surgical (Ward B)', arrivalTime: '09:10', waitMinutes: 20, acuity: 'Low', assignedStaff: 'Dr. Watson' },
  { id: 'PAT-909', name: 'Lucas Zhang', age: 7, gender: 'Male', currentStage: 'Doctor Consultation', department: 'Pediatrics Ward', arrivalTime: '13:10', waitMinutes: 14, acuity: 'Medium', assignedStaff: 'Dr. Patel' },
  { id: 'PAT-910', name: 'Beatrice Hall', age: 74, gender: 'Female', currentStage: 'Treatment', department: 'Intensive Care Unit (ICU)', arrivalTime: '10:05', waitMinutes: 12, acuity: 'High', assignedStaff: 'Dr. Kessler' },
];

const INITIAL_WAIT_TIME_TRENDS: WaitTimeTrendPoint[] = [
  { timeLabel: '08:00', avgWaitMins: 12, targetThreshold: 20 },
  { timeLabel: '09:00', avgWaitMins: 14, targetThreshold: 20 },
  { timeLabel: '10:00', avgWaitMins: 18, targetThreshold: 20 },
  { timeLabel: '11:00', avgWaitMins: 21, targetThreshold: 20 },
  { timeLabel: '12:00', avgWaitMins: 26, targetThreshold: 20 },
  { timeLabel: '13:00', avgWaitMins: 24, targetThreshold: 20 },
  { timeLabel: '14:00', avgWaitMins: 22, targetThreshold: 20 },
  { timeLabel: '15:00', avgWaitMins: 29, targetThreshold: 20 },
  { timeLabel: '16:00', avgWaitMins: 34, targetThreshold: 20 },
];

const INITIAL_TRIAGE: TriagePatient[] = [
  {
    id: 'PAT-8492',
    name: 'Marcus Vance',
    age: 58,
    gender: 'Male',
    arrivalTime: '12:35 PM',
    waitingMins: 22,
    symptoms: 'Crushing retrosternal chest pain radiating to left jaw, diaphoresis',
    painLevel: 9,
    vitalSigns: { heartRate: 118, bloodPressure: '175/105', spO2: 91, temperature: 37.2, respiratoryRate: 24 },
    triageCategory: 'Resuscitation',
    urgencyLevel: 1,
    reasoning: 'Critical acute coronary syndrome signs: Severe pain (9/10), tachycardia, hypoxic (91%), hypertensive.',
    assignedWard: 'ED Resus Bay 1',
    status: 'Waiting',
  },
  {
    id: 'PAT-8495',
    name: 'Elena Rostova',
    age: 34,
    gender: 'Female',
    arrivalTime: '12:41 PM',
    waitingMins: 16,
    symptoms: 'Severe acute asthma exacerbation, audible wheezing, accessory muscle use',
    painLevel: 7,
    vitalSigns: { heartRate: 112, bloodPressure: '138/88', spO2: 89, temperature: 36.8, respiratoryRate: 28 },
    triageCategory: 'Emergent',
    urgencyLevel: 2,
    reasoning: 'Severe respiratory distress with SpO2 89% and tachypnea (28 bpm). Rapid nebulization required.',
    assignedWard: 'ED Acute Bay 4',
    status: 'Waiting',
  },
  {
    id: 'PAT-8499',
    name: 'David Kim',
    age: 46,
    gender: 'Male',
    arrivalTime: '12:48 PM',
    waitingMins: 9,
    symptoms: 'Deep laceration on right forearm from workshop machinery, controlled bleeding',
    painLevel: 6,
    vitalSigns: { heartRate: 84, bloodPressure: '128/82', spO2: 98, temperature: 36.6, respiratoryRate: 16 },
    triageCategory: 'Urgent',
    urgencyLevel: 3,
    reasoning: 'Significant trauma with stable vitals. Requires exploration and closure within 45 minutes.',
    assignedWard: 'ED Minor Trauma 2',
    status: 'Waiting',
  },
  {
    id: 'PAT-8501',
    name: 'Aisha Patel',
    age: 27,
    gender: 'Female',
    arrivalTime: '12:52 PM',
    waitingMins: 5,
    symptoms: 'Moderate abdominal pain in right lower quadrant for 6 hours, low grade fever',
    painLevel: 5,
    vitalSigns: { heartRate: 88, bloodPressure: '118/74', spO2: 99, temperature: 38.1, respiratoryRate: 18 },
    triageCategory: 'Urgent',
    urgencyLevel: 3,
    reasoning: 'Suspected acute appendicitis. Stable hemodynamics; ultrasound and surgical consult queued.',
    assignedWard: 'ED Assessment Bed 3',
    status: 'Waiting',
  },
  {
    id: 'PAT-8504',
    name: 'James Campbell',
    age: 62,
    gender: 'Male',
    arrivalTime: '12:55 PM',
    waitingMins: 2,
    symptoms: 'Mild ankle sprain after stumble, weight bearing with discomfort',
    painLevel: 3,
    vitalSigns: { heartRate: 72, bloodPressure: '124/80', spO2: 99, temperature: 36.5, respiratoryRate: 14 },
    triageCategory: 'Semi-Urgent',
    urgencyLevel: 4,
    reasoning: 'Isolated soft tissue injury. Hemodynamically normal; X-ray ordered.',
    status: 'Waiting',
  },
];

const INITIAL_BEDS: BedItem[] = [
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `BED-ED-${i + 1}`,
    ward: 'Emergency Department' as const,
    bedNumber: `ED-${(i + 1).toString().padStart(2, '0')}`,
    status: (i < 34 ? 'occupied' : 'available') as BedItem['status'],
    patientName: i < 34 ? `Patient #${8400 + i}` : undefined,
    acuityLevel: (i < 8 ? 'High' : i < 25 ? 'Medium' : 'Low') as BedItem['acuityLevel'],
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `BED-ICU-${i + 1}`,
    ward: 'ICU' as const,
    bedNumber: `ICU-${(i + 1).toString().padStart(2, '0')}`,
    status: (i < 18 ? 'occupied' : i === 18 ? 'reserved' : 'available') as BedItem['status'],
    patientName: i < 18 ? `ICU Patient #${8300 + i}` : undefined,
    acuityLevel: 'High' as const,
  })),
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `BED-WDA-${i + 1}`,
    ward: 'Ward A' as const,
    bedNumber: `WA-${(i + 1).toString().padStart(2, '0')}`,
    status: (i < 24 ? 'occupied' : 'available') as BedItem['status'],
    patientName: i < 24 ? `Ward Patient #${8200 + i}` : undefined,
    acuityLevel: 'Medium' as const,
  })),
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `BED-WDB-${i + 1}`,
    ward: 'Ward B' as const,
    bedNumber: `WB-${(i + 1).toString().padStart(2, '0')}`,
    status: (i < 26 ? 'occupied' : 'available') as BedItem['status'],
    patientName: i < 26 ? `Ward Patient #${8100 + i}` : undefined,
    acuityLevel: 'Medium' as const,
  })),
];

const INITIAL_EQUIPMENT: EquipmentItem[] = [
  { id: 'EQ-01', name: 'High-Acuity Mechanical Ventilators', category: 'Ventilators', total: 24, inUse: 21, available: 3, status: 'Watch' },
  { id: 'EQ-02', name: 'Multiparameter Patient Monitors', category: 'Monitors', total: 60, inUse: 52, available: 8, status: 'Adequate' },
  { id: 'EQ-03', name: 'Biphasic Defibrillators & Pacing Units', category: 'Defibrillators', total: 16, inUse: 6, available: 10, status: 'Adequate' },
  { id: 'EQ-04', name: 'Smart Infusion & Syringe Pumps', category: 'Infusion Pumps', total: 110, inUse: 98, available: 12, status: 'Watch' },
  { id: 'EQ-05', name: 'Portable Ultrasound Doppler Units', category: 'Diagnostic', total: 12, inUse: 9, available: 3, status: 'Adequate' },
];

const INITIAL_LOGS: AgentActivityLog[] = [
  {
    id: 'ACT-01',
    timestamp: '12:53 PM',
    timeAgo: '4 min ago',
    step: 'RECOMMEND',
    headline: 'Generated Priority 1 Recommendation for ED Demand Spurt',
    details: 'Projected 96% occupancy in next 2 hours. Formulated recommendation to reserve 3 flex treatment spaces.',
    contextTag: 'Emergency Department',
    status: 'active',
  },
  {
    id: 'ACT-02',
    timestamp: '12:51 PM',
    timeAgo: '6 min ago',
    step: 'PLAN',
    headline: 'Calculated Ward Discharge Windows & Nurse Coverage',
    details: 'Determined 4 potential Ward B step-downs can balance incoming admissions if expedited before 14:00.',
    contextTag: 'Capacity Optimizer',
    status: 'completed',
  },
  {
    id: 'ACT-03',
    timestamp: '12:48 PM',
    timeAgo: '9 min ago',
    step: 'REASON',
    headline: 'Detected Multi-Department Bottleneck Correlation',
    details: 'High CT scan turnaround delay (38 mins) is buffering 6 patients from moving into inpatient ward admissions.',
    contextTag: 'Cross-Dept Engine',
    status: 'completed',
  },
  {
    id: 'ACT-04',
    timestamp: '12:44 PM',
    timeAgo: '13 min ago',
    step: 'UNDERSTAND',
    headline: 'ML Ensemble Predicted 98% ICU Capacity Risk',
    details: 'Regression model forecasted 2 scheduled thoracic post-op transfers against 1 available staffed bed.',
    contextTag: 'Prediction Engine',
    status: 'completed',
  },
  {
    id: 'ACT-05',
    timestamp: '12:40 PM',
    timeAgo: '17 min ago',
    step: 'OBSERVE',
    headline: 'Continuous Telemetry Scan: Ingested 38 Arrivals/hr',
    details: 'Monitored 14 waiting queue entries, 246 occupied inpatient beds, and 34 ED active treatment spaces.',
    contextTag: 'Telemetry Feed',
    status: 'completed',
  },
];

const INITIAL_HISTORY: HistoryRecord[] = [
  {
    id: 'HIS-01',
    timestamp: '11:30 AM',
    type: 'Recommendation Approved',
    title: 'Pre-allocate 2 Step-Down Beds for Ward A',
    user: 'Operations Coordinator (Human-in-the-Loop)',
    outcome: 'Successfully prevented morning surgical holding delay; 2 beds assigned.',
  },
  {
    id: 'HIS-02',
    timestamp: '10:45 AM',
    type: 'Alert Resolved',
    title: 'Radiology Ultrasound Queue Delay',
    user: 'Radiology Shift Supervisor',
    outcome: 'Secondary sonographer mobilized; average wait reduced from 48m to 19m.',
  },
  {
    id: 'HIS-03',
    timestamp: '09:15 AM',
    type: 'Triage Prioritized',
    title: 'Code STEMI Emergency Prioritization (PAT-8411)',
    user: 'Triage Nurse Rachel Adams',
    outcome: 'Direct cath lab activation authorized within 4 minutes of arrival.',
  },
];

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('operations');
  const [metrics, setMetrics] = useState<OperationalMetrics>(INITIAL_METRICS);
  const [forecastPoints] = useState<ArrivalForecastPoint[]>(INITIAL_FORECAST);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(INITIAL_RECOMMENDATIONS);
  const [flowStages, setFlowStages] = useState<FlowStage[]>(INITIAL_STAGES);
  const [departmentFlows, setDepartmentFlows] = useState<DepartmentFlow[]>(INITIAL_DEPTS);
  const [transfers, setTransfers] = useState<TransferItem[]>(INITIAL_TRANSFERS);
  const [flowPatients] = useState<FlowPatient[]>(INITIAL_FLOW_PATIENTS);
  const [waitTimeTrends, setWaitTimeTrends] = useState<WaitTimeTrendPoint[]>(INITIAL_WAIT_TIME_TRENDS);
  const [triagePatients, setTriagePatients] = useState<TriagePatient[]>(INITIAL_TRIAGE);
  const [beds, setBeds] = useState<BedItem[]>(INITIAL_BEDS);
  const [equipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [activityLogs, setActivityLogs] = useState<AgentActivityLog[]>(INITIAL_LOGS);
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>(INITIAL_HISTORY);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  // Approve Recommendation (Human in the loop execution)
  const approveRecommendation = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' as const } : r))
    );

    const rec = recommendations.find((r) => r.id === id);
    if (!rec) return;

    // Execute authorized actions:
    // 1. Prepare beds in ward
    if (rec.actionPayload?.additionalBeds && rec.actionPayload.targetWard) {
      const wardName = rec.actionPayload.targetWard;
      const countToReserve = rec.actionPayload.additionalBeds;
      
      setBeds((prev) => {
        let reservedCount = 0;
        return prev.map((b) => {
          if (b.ward.includes(wardName) && b.status === 'available' && reservedCount < countToReserve) {
            reservedCount++;
            return { ...b, status: 'reserved' as const };
          }
          return b;
        });
      });
    }

    // 2. Adjust metrics to reflect human authorized intervention
    setMetrics((prev) => ({
      ...prev,
      edCapacityOccupied: Math.max(30, prev.edCapacityOccupied - 2),
      edOccupancyRate: 80,
      lastUpdated: 'just now',
    }));

    // 3. Log agent action
    const newLog: AgentActivityLog = {
      id: `ACT-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeAgo: 'Just now',
      step: 'ACT',
      headline: `Human Approved & Dispatched: "${rec.title}"`,
      details: `Action executed: ${rec.recommendedAction}. Dispatched notifications to ${rec.actionPayload?.alertRecipient || 'team'}. Operational tasks created.`,
      contextTag: rec.department,
      status: 'approved',
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    // 4. Record in audit history
    const newHistory: HistoryRecord = {
      id: `HIS-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'Recommendation Approved',
      title: rec.title,
      user: 'Operations Coordinator (Approved)',
      outcome: `Dispatched operational action: ${rec.recommendedAction}`,
    };
    setHistoryRecords((prev) => [newHistory, ...prev]);
  };

  // Dismiss Recommendation
  const dismissRecommendation = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'dismissed' as const } : r))
    );

    const rec = recommendations.find((r) => r.id === id);
    if (!rec) return;

    const newLog: AgentActivityLog = {
      id: `ACT-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeAgo: 'Just now',
      step: 'PLAN',
      headline: `Recommendation Dismissed by Coordinator: "${rec.title}"`,
      details: 'Coordinator marked action as not required for current clinical staffing shift.',
      contextTag: rec.department,
      status: 'completed',
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'reviewed' as const } : a))
    );
  };

  const resolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'resolved' as const } : a))
    );
  };

  // Add Triage Patient with deterministic ML Urgency Calculation
  const addTriagePatient = (
    data: Omit<TriagePatient, 'id' | 'arrivalTime' | 'waitingMins' | 'triageCategory' | 'urgencyLevel' | 'reasoning' | 'status'>
  ) => {
    const { vitalSigns, painLevel, symptoms } = data;
    
    // ML Rule-based simulation (mimicking trained clinical priority algorithm)
    let urgencyLevel: 1 | 2 | 3 | 4 | 5 = 4;
    let triageCategory: TriagePatient['triageCategory'] = 'Semi-Urgent';
    let reasoning = 'Stable vital signs with moderate discomfort. Standard nursing review indicated.';

    if (
      vitalSigns.spO2 < 90 ||
      vitalSigns.heartRate > 130 ||
      vitalSigns.heartRate < 45 ||
      painLevel === 10 ||
      symptoms.toLowerCase().includes('cardiac arrest') ||
      symptoms.toLowerCase().includes('unresponsive')
    ) {
      urgencyLevel = 1;
      triageCategory = 'Resuscitation';
      reasoning = 'Severe hemodynamic or respiratory compromise. Immediate clinical resuscitation required.';
    } else if (
      vitalSigns.spO2 < 93 ||
      vitalSigns.heartRate > 115 ||
      vitalSigns.temperature > 39.2 ||
      painLevel >= 8 ||
      symptoms.toLowerCase().includes('chest pain') ||
      symptoms.toLowerCase().includes('severe asthma')
    ) {
      urgencyLevel = 2;
      triageCategory = 'Emergent';
      reasoning = 'High risk criteria detected: Critical vital sign abnormality or severe acute symptom burden.';
    } else if (
      painLevel >= 5 ||
      vitalSigns.heartRate > 100 ||
      vitalSigns.temperature > 38.0 ||
      symptoms.toLowerCase().includes('fracture') ||
      symptoms.toLowerCase().includes('appendicitis')
    ) {
      urgencyLevel = 3;
      triageCategory = 'Urgent';
      reasoning = 'Potential progressive medical condition. Physician examination required within 30 minutes.';
    } else if (painLevel <= 2 && vitalSigns.spO2 >= 98) {
      urgencyLevel = 5;
      triageCategory = 'Non-Urgent';
      reasoning = 'Minor non-acute complaint. Routine ambulatory outpatient care.';
    }

    const newPatient: TriagePatient = {
      ...data,
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      waitingMins: 1,
      triageCategory,
      urgencyLevel,
      reasoning,
      status: 'Waiting',
    };

    setTriagePatients((prev) => [newPatient, ...prev].sort((a, b) => a.urgencyLevel - b.urgencyLevel));

    // Update operational waiting queue count
    setMetrics((prev) => ({
      ...prev,
      patientsWaiting: prev.patientsWaiting + 1,
      arrivalsCurrent: prev.arrivalsCurrent + 1,
      lastUpdated: 'just now',
    }));

    // Log to Agent Activity
    const newLog: AgentActivityLog = {
      id: `ACT-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeAgo: 'Just now',
      step: 'REASON',
      headline: `AI Triage Scored Patient: ${newPatient.name} → [${triageCategory}]`,
      details: `ML priority assessment: Level ${urgencyLevel}. Reason: ${reasoning}`,
      contextTag: 'Triage Support',
      status: 'active',
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  const updateTransferStatus = (transferId: string, status: TransferItem['status']) => {
    setTransfers((prev) =>
      prev.map((t) => (t.id === transferId ? { ...t, status } : t))
    );
    const target = transfers.find((t) => t.id === transferId);
    if (target) {
      const log: AgentActivityLog = {
        id: `ACT-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timeAgo: 'Just now',
        step: 'ACT',
        headline: `Transfer Status: [${target.patientName}] → ${status}`,
        details: `Inter-department transfer (${target.fromDepartment} → ${target.toDepartment}) updated to ${status}. Priority: ${target.priority}.`,
        contextTag: 'Patient Flow',
        status: 'approved',
      };
      setActivityLogs((prev) => [log, ...prev]);
    }
  };

  const updateBedStatus = (bedId: string, status: BedItem['status']) => {
    setBeds((prev) => prev.map((b) => (b.id === bedId ? { ...b, status } : b)));
  };

  // Scenario Simulator from Document
  const triggerScenario = (scenario: 'ED_CONGESTION' | 'ICU_SHORTAGE' | 'RESET') => {
    if (scenario === 'ED_CONGESTION') {
      setActiveScenario('Scenario 1: Emergency Department Congestion (6 PM Surge)');
      setMetrics((prev) => ({
        ...prev,
        edCapacityOccupied: 38,
        edOccupancyRate: 95,
        arrivalsCurrent: 46,
        patientsWaiting: 22,
        arrivalsTrend: '↑ 21.0% surge detected',
        lastUpdated: 'just now',
      }));

      // Update 8-Stage Flow pipeline for ED Surge
      setFlowStages([
        { id: 'stg-1', name: 'Arrival', shortDesc: 'Ambulance & walk-in check-in', count: 46, avgWaitMins: 6, capacity: 50, status: 'watch' },
        { id: 'stg-2', name: 'Registration', shortDesc: 'Intake and insurance triage log', count: 24, avgWaitMins: 14, capacity: 25, status: 'watch' },
        { id: 'stg-3', name: 'Waiting', shortDesc: 'Waiting for clinical examination', count: 22, avgWaitMins: 38, capacity: 30, status: 'critical' },
        { id: 'stg-4', name: 'Doctor Consultation', shortDesc: 'Attending physician evaluation', count: 34, avgWaitMins: 24, capacity: 35, status: 'watch' },
        { id: 'stg-5', name: 'Diagnostic Tests', shortDesc: 'Radiology, CT & bloodwork', count: 28, avgWaitMins: 49, capacity: 25, status: 'critical' },
        { id: 'stg-6', name: 'Treatment', shortDesc: 'Active bedside care & stabilization', count: 48, avgWaitMins: 58, capacity: 50, status: 'critical' },
        { id: 'stg-7', name: 'Admission / Bed', shortDesc: 'Transferred to inpatient ward or ICU', count: 19, avgWaitMins: 65, capacity: 20, status: 'critical' },
        { id: 'stg-8', name: 'Discharge', shortDesc: 'Discharge summary & transit ready', count: 12, avgWaitMins: 16, capacity: 20, status: 'normal' },
      ]);

      // Update Department Load
      setDepartmentFlows((prev) =>
        prev.map((d) =>
          d.id === 'dept-1'
            ? { ...d, activePatients: 48, waitingPatients: 22, avgWaitMins: 38, congestionLevel: 'Critical' }
            : d
        )
      );

      // Surge in wait times
      setWaitTimeTrends([
        { timeLabel: '08:00', avgWaitMins: 12, targetThreshold: 20 },
        { timeLabel: '09:00', avgWaitMins: 14, targetThreshold: 20 },
        { timeLabel: '10:00', avgWaitMins: 18, targetThreshold: 20 },
        { timeLabel: '11:00', avgWaitMins: 21, targetThreshold: 20 },
        { timeLabel: '12:00', avgWaitMins: 26, targetThreshold: 20 },
        { timeLabel: '13:00', avgWaitMins: 29, targetThreshold: 20 },
        { timeLabel: '14:00', avgWaitMins: 34, targetThreshold: 20 },
        { timeLabel: '15:00', avgWaitMins: 42, targetThreshold: 20 },
        { timeLabel: '16:00', avgWaitMins: 48, targetThreshold: 20 },
      ]);

      const newRec: RecommendationItem = {
        id: `REC-SCENARIO-1`,
        priority: 1,
        title: 'Emergency Department Congestion Crisis',
        description: 'ED occupancy reached 95% (38/40 spaces). ML model forecasts 98% saturation within 90 minutes with 6 inbound ambulances.',
        timeAgo: 'Generated right now',
        department: 'Emergency Department',
        agentReasoning: 'Emergency capacity critical. Recommend preparing 3 additional flex beds in Day Surgery holding and mobilizing secondary triage physician.',
        recommendedAction: 'Authorize emergency flex spaces & alert ED Coordinator',
        status: 'pending',
        actionPayload: { additionalBeds: 3, targetWard: 'Emergency Department', alertRecipient: 'Emergency Coordinator & On-call Charge' },
      };

      setRecommendations((prev) => [newRec, ...prev.filter((r) => r.id !== 'REC-SCENARIO-1')]);

      const log: AgentActivityLog = {
        id: `ACT-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timeAgo: 'Just now',
        step: 'REASON',
        headline: 'Scenario 1 Triggered: Critical ED Congestion Detected',
        details: 'Occupancy 95%. Investigated ward availability: 3 beds can be mobilized in observation wing. Seeking human approval.',
        contextTag: 'Scenario 1',
        status: 'active',
      };
      setActivityLogs((prev) => [log, ...prev]);
    } else if (scenario === 'ICU_SHORTAGE') {
      setActiveScenario('Scenario 2: ICU Resource Shortage (98% Inbound Shock)');
      setMetrics((prev) => ({
        ...prev,
        inpatientBedsOccupied: 275,
        inpatientOccupancyRate: 92,
        lastUpdated: 'just now',
      }));

      // Update ICU Flow
      setDepartmentFlows((prev) =>
        prev.map((d) =>
          d.id === 'dept-2'
            ? { ...d, activePatients: 19, waitingPatients: 4, avgWaitMins: 16, congestionLevel: 'Critical' }
            : d
        )
      );

      setFlowStages((prev) =>
        prev.map((s) =>
          s.id === 'stg-7'
            ? { ...s, count: 19, avgWaitMins: 74, status: 'critical' }
            : s
        )
      );

      const newRec: RecommendationItem = {
        id: `REC-SCENARIO-2`,
        priority: 1,
        title: 'ICU Critical Capacity Shortage',
        description: 'ICU occupancy reached 95% (19/20 beds). Predicted to reach 100% within 3 hours upon arrival of 2 scheduled cardiac post-op cases.',
        timeAgo: 'Generated right now',
        department: 'ICU',
        agentReasoning: 'Critical care deficit impending. Recommend preparing 2 ICU standby beds and initiating transfer of 1 stable patient to Step-Down.',
        recommendedAction: 'Prepare 2 ICU beds & alert ICU Medical Director',
        status: 'pending',
        actionPayload: { additionalBeds: 2, targetWard: 'ICU', alertRecipient: 'ICU Medical Director' },
      };

      setRecommendations((prev) => [newRec, ...prev.filter((r) => r.id !== 'REC-SCENARIO-2')]);

      const log: AgentActivityLog = {
        id: `ACT-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timeAgo: 'Just now',
        step: 'REASON',
        headline: 'Scenario 2 Triggered: ICU Saturation Imminent',
        details: 'Only 1 bed unassigned. Step-down candidate identified in Bed ICU-03. Seeking coordinator authorization.',
        contextTag: 'Scenario 2',
        status: 'active',
      };
      setActivityLogs((prev) => [log, ...prev]);
    } else {
      setActiveScenario(null);
      setMetrics(INITIAL_METRICS);
      setRecommendations(INITIAL_RECOMMENDATIONS);
      setFlowStages(INITIAL_STAGES);
      setDepartmentFlows(INITIAL_DEPTS);
      setTransfers(INITIAL_TRANSFERS);
      setWaitTimeTrends(INITIAL_WAIT_TIME_TRENDS);
    }
  };

  return (
    <HospitalContext.Provider
      value={{
        role,
        setRole,
        metrics,
        forecastPoints,
        alerts,
        recommendations,
        flowStages,
        departmentFlows,
        transfers,
        flowPatients,
        waitTimeTrends,
        triagePatients,
        beds,
        equipment,
        activityLogs,
        historyRecords,
        approveRecommendation,
        dismissRecommendation,
        acknowledgeAlert,
        resolveAlert,
        updateTransferStatus,
        addTriagePatient,
        updateBedStatus,
        triggerScenario,
        activeScenario,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
