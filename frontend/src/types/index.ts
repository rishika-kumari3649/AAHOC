export type UserRole = 'operations' | 'triage' | 'admin';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: number | string;
  badgeColor?: 'orange' | 'lavender' | 'green' | 'red';
}

export interface OperationalMetrics {
  arrivalsCurrent: number;
  arrivalsTrend: string;
  patientsWaiting: number;
  waitingTrend: string;
  inpatientBedsTotal: number;
  inpatientBedsOccupied: number;
  inpatientOccupancyRate: number;
  edCapacityTotal: number;
  edCapacityOccupied: number;
  edOccupancyRate: number;
  lastUpdated: string;
}

export interface ArrivalForecastPoint {
  timeLabel: string;
  arrivals: number;
  isForecast: boolean;
}

export interface AlertItem {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  detail: string;
  timeAgo: string;
  timestamp: string;
  department: string;
  status: 'active' | 'reviewed' | 'resolved';
}

export interface RecommendationItem {
  id: string;
  priority: number;
  title: string;
  description: string;
  timeAgo: string;
  department: string;
  agentReasoning: string;
  recommendedAction: string;
  status: 'pending' | 'approved' | 'dismissed';
  impactSummary?: string;
  actionPayload?: {
    additionalBeds?: number;
    targetWard?: string;
    alertRecipient?: string;
  };
}

export interface FlowStage {
  id: string;
  name: string;
  shortDesc: string;
  count: number;
  avgWaitMins: number;
  capacity?: number;
  status: 'normal' | 'watch' | 'critical';
}

export interface DepartmentFlow {
  id: string;
  name: string;
  activePatients: number;
  waitingPatients: number;
  avgWaitMins: number;
  congestionLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
}

export interface TransferItem {
  id: string;
  patientId: string;
  patientName: string;
  fromDepartment: string;
  toDepartment: string;
  priority: 'Immediate' | 'Urgent' | 'Routine';
  status: 'In-Transit' | 'Pending Bed' | 'Completed';
  elapsedMins: number;
  reason: string;
}

export interface FlowPatient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  currentStage: string;
  department: string;
  arrivalTime: string;
  waitMinutes: number;
  acuity: 'High' | 'Medium' | 'Low';
  assignedStaff?: string;
}

export interface WaitTimeTrendPoint {
  timeLabel: string;
  avgWaitMins: number;
  targetThreshold: number;
}

export type TriageCategory = 'Resuscitation' | 'Emergent' | 'Urgent' | 'Semi-Urgent' | 'Non-Urgent';

export interface VitalSigns {
  heartRate: number;
  bloodPressure: string;
  spO2: number;
  temperature: number;
  respiratoryRate: number;
}

export interface TriagePatient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  arrivalTime: string;
  waitingMins: number;
  symptoms: string;
  painLevel: number; // 1-10
  vitalSigns: VitalSigns;
  triageCategory: TriageCategory;
  urgencyLevel: 1 | 2 | 3 | 4 | 5; // 1 is highest
  reasoning: string;
  assignedWard?: string;
  status: 'Waiting' | 'In-Treatment' | 'Admitted' | 'Discharged';
}

export interface BedItem {
  id: string;
  ward: 'Emergency Department' | 'ICU' | 'Ward A' | 'Ward B' | 'Pediatrics';
  bedNumber: string;
  status: 'available' | 'occupied' | 'cleaning' | 'reserved';
  patientId?: string;
  patientName?: string;
  admittedAt?: string;
  acuityLevel?: 'High' | 'Medium' | 'Low';
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  total: number;
  inUse: number;
  available: number;
  status: 'Adequate' | 'Watch' | 'Critical';
}

export interface AgentActivityLog {
  id: string;
  timestamp: string;
  timeAgo: string;
  step: 'OBSERVE' | 'UNDERSTAND' | 'REASON' | 'PLAN' | 'RECOMMEND' | 'ACT';
  headline: string;
  details: string;
  contextTag: string;
  status: 'active' | 'approved' | 'completed';
}

export interface HistoryRecord {
  id: string;
  timestamp: string;
  type: 'Recommendation Approved' | 'Recommendation Dismissed' | 'Alert Resolved' | 'Triage Prioritized';
  title: string;
  user: string;
  outcome: string;
}