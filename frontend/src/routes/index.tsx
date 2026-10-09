import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout & Guards
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AdminLayout } from '../features/admin/components/AdminLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';

// Landing & Auth
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

// Admin Panel Pages
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminPatientsPage } from '../pages/admin/AdminPatientsPage';
import { AdminDoctorsPage } from '../pages/admin/AdminDoctorsPage';
import { AdminStaffPage } from '../pages/admin/AdminStaffPage';
import { AdminDepartmentsPage } from '../pages/admin/AdminDepartmentsPage';
import { AdminAppointmentsPage } from '../pages/admin/AdminAppointmentsPage';
import { AdminAdmissionsPage } from '../pages/admin/AdminAdmissionsPage';
import { AdminBedsPage } from '../pages/admin/AdminBedsPage';
import { AdminReportsPage } from '../pages/admin/AdminReportsPage';
import { AdminAuditLogsPage } from '../pages/admin/AdminAuditLogsPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';
import { AdminNursesPage } from '../pages/admin/AdminNursesPage';
import { AdminPharmacyPage } from '../pages/admin/AdminPharmacyPage';
import { AdminLaboratoryPage } from '../pages/admin/AdminLaboratoryPage';
import { AdminPrescriptionsPage } from '../pages/admin/AdminPrescriptionsPage';
import { AdminMedicalRecordsPage } from '../pages/admin/AdminMedicalRecordsPage';
import { AdminBillingPage } from '../pages/admin/AdminBillingPage';
import { AdminEmergencyPage } from '../pages/admin/AdminEmergencyPage';
import { AdminNotificationsPage } from '../pages/admin/AdminNotificationsPage';

// Operations Panel Pages
import { OperationsDashboardPage } from '../pages/operations/OperationsDashboardPage';
import { OperationsPatientFlowPage } from '../pages/operations/OperationsPatientFlowPage';
import { OperationsBedsPage } from '../pages/operations/OperationsBedsPage';
import { OperationsResourcesPage } from '../pages/operations/OperationsResourcesPage';
import { OperationsEmergencyQueuePage } from '../pages/operations/OperationsEmergencyQueuePage';
import { OperationsAlertsPage } from '../pages/operations/OperationsAlertsPage';
import { OperationsAIRecommendationsPage } from '../pages/operations/OperationsAIRecommendationsPage';
import { OperationsApprovalsPage } from '../pages/operations/OperationsApprovalsPage';

// Doctor Panel Pages
import { DoctorDashboardPage } from '../pages/doctor/DoctorDashboardPage';
import { DoctorPatientsPage } from '../pages/doctor/DoctorPatientsPage';
import { DoctorAppointmentsPage } from '../pages/doctor/DoctorAppointmentsPage';
import { DoctorClinicalRecordsPage } from '../pages/doctor/DoctorClinicalRecordsPage';
import { DoctorPrescriptionsPage } from '../pages/doctor/DoctorPrescriptionsPage';
import { DoctorLabOrdersPage } from '../pages/doctor/DoctorLabOrdersPage';

// Nurse Panel Pages
import { NurseDashboardPage } from '../pages/nurse/NurseDashboardPage';
import { NursePatientsPage } from '../pages/nurse/NursePatientsPage';
import { NurseVitalsPage } from '../pages/nurse/NurseVitalsPage';
import { NurseTasksPage } from '../pages/nurse/NurseTasksPage';
import { NurseAlertsPage } from '../pages/nurse/NurseAlertsPage';

// Reception Panel Pages
import { ReceptionDashboardPage } from '../pages/reception/ReceptionDashboardPage';
import { ReceptionRegistrationPage } from '../pages/reception/ReceptionRegistrationPage';
import { ReceptionAppointmentsPage } from '../pages/reception/ReceptionAppointmentsPage';
import { ReceptionAdmissionsPage } from '../pages/reception/ReceptionAdmissionsPage';

// Laboratory Panel Pages
import { LaboratoryDashboardPage } from '../pages/laboratory/LaboratoryDashboardPage';
import { LaboratoryOrdersPage } from '../pages/laboratory/LaboratoryOrdersPage';
import { LaboratorySamplesPage } from '../pages/laboratory/LaboratorySamplesPage';
import { LaboratoryResultsPage } from '../pages/laboratory/LaboratoryResultsPage';

// Pharmacy Panel Pages
import { PharmacyDashboardPage } from '../pages/pharmacy/PharmacyDashboardPage';
import { PharmacyPrescriptionsPage } from '../pages/pharmacy/PharmacyPrescriptionsPage';
import { PharmacyMedicinesPage } from '../pages/pharmacy/PharmacyMedicinesPage';
import { PharmacyInventoryPage } from '../pages/pharmacy/PharmacyInventoryPage';

// Billing Panel Pages
import { BillingDashboardPage } from '../pages/billing/BillingDashboardPage';
import { BillingInvoicesPage } from '../pages/billing/BillingInvoicesPage';
import { BillingPaymentsPage } from '../pages/billing/BillingPaymentsPage';

// Patient Panel Pages
import { PatientDashboardPage } from '../pages/patient/PatientDashboardPage';
import { PatientAppointmentsPage } from '../pages/patient/PatientAppointmentsPage';
import { PatientRecordsPage } from '../pages/patient/PatientRecordsPage';
import { PatientPrescriptionsPage } from '../pages/patient/PatientPrescriptionsPage';
import { PatientReportsPage } from '../pages/patient/PatientReportsPage';
import { PatientBillsPage } from '../pages/patient/PatientBillsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Hub & Auth */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/signup" element={<RegisterPage />} />

      {/* Admin Panel (Managed Hospital System) */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="patients" element={<AdminPatientsPage />} />
          <Route path="doctors" element={<AdminDoctorsPage />} />
          <Route path="appointments" element={<AdminAppointmentsPage />} />
          <Route path="departments" element={<AdminDepartmentsPage />} />
          <Route path="nurses" element={<AdminNursesPage />} />
          <Route path="pharmacy" element={<AdminPharmacyPage />} />
          <Route path="laboratory" element={<AdminLaboratoryPage />} />
          <Route path="prescriptions" element={<AdminPrescriptionsPage />} />
          <Route path="medical-records" element={<AdminMedicalRecordsPage />} />
          <Route path="billing" element={<AdminBillingPage />} />
          <Route path="emergency" element={<AdminEmergencyPage />} />
          <Route path="staff" element={<AdminStaffPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="admissions" element={<AdminAdmissionsPage />} />
          <Route path="beds" element={<AdminBedsPage />} />
          <Route path="audit-logs" element={<AdminAuditLogsPage />} />
        </Route>
      </Route>

      {/* Operations Panel (Core AAHOC Intelligence Dashboard) */}
      <Route element={<ProtectedRoute allowedRoles={['operations', 'admin']} />}>
        <Route path="/operations" element={<DashboardLayout />}>
          <Route index element={<OperationsDashboardPage />} />
          <Route path="patient-flow" element={<OperationsPatientFlowPage />} />
          <Route path="beds-capacity" element={<OperationsBedsPage />} />
          <Route path="resources" element={<OperationsResourcesPage />} />
          <Route path="emergency-queue" element={<OperationsEmergencyQueuePage />} />
          <Route path="alerts" element={<OperationsAlertsPage />} />
          <Route path="ai-recommendations" element={<OperationsAIRecommendationsPage />} />
          <Route path="approvals" element={<OperationsApprovalsPage />} />
        </Route>
      </Route>

      {/* Doctor Panel */}
      <Route element={<ProtectedRoute allowedRoles={['doctor', 'admin']} />}>
        <Route path="/doctor" element={<DashboardLayout />}>
          <Route index element={<DoctorDashboardPage />} />
          <Route path="patients" element={<DoctorPatientsPage />} />
          <Route path="appointments" element={<DoctorAppointmentsPage />} />
          <Route path="clinical-records" element={<DoctorClinicalRecordsPage />} />
          <Route path="prescriptions" element={<DoctorPrescriptionsPage />} />
          <Route path="lab-orders" element={<DoctorLabOrdersPage />} />
        </Route>
      </Route>

      {/* Nurse Panel */}
      <Route element={<ProtectedRoute allowedRoles={['nurse', 'admin']} />}>
        <Route path="/nurse" element={<DashboardLayout />}>
          <Route index element={<NurseDashboardPage />} />
          <Route path="assigned-patients" element={<NursePatientsPage />} />
          <Route path="vitals" element={<NurseVitalsPage />} />
          <Route path="tasks" element={<NurseTasksPage />} />
          <Route path="alerts" element={<NurseAlertsPage />} />
        </Route>
      </Route>

      {/* Reception Panel */}
      <Route element={<ProtectedRoute allowedRoles={['reception', 'admin']} />}>
        <Route path="/reception" element={<DashboardLayout />}>
          <Route index element={<ReceptionDashboardPage />} />
          <Route path="registration" element={<ReceptionRegistrationPage />} />
          <Route path="appointments" element={<ReceptionAppointmentsPage />} />
          <Route path="admissions" element={<ReceptionAdmissionsPage />} />
        </Route>
      </Route>

      {/* Laboratory Panel */}
      <Route element={<ProtectedRoute allowedRoles={['laboratory', 'admin']} />}>
        <Route path="/laboratory" element={<DashboardLayout />}>
          <Route index element={<LaboratoryDashboardPage />} />
          <Route path="test-orders" element={<LaboratoryOrdersPage />} />
          <Route path="samples" element={<LaboratorySamplesPage />} />
          <Route path="results" element={<LaboratoryResultsPage />} />
        </Route>
      </Route>

      {/* Pharmacy Panel */}
      <Route element={<ProtectedRoute allowedRoles={['pharmacy', 'admin']} />}>
        <Route path="/pharmacy" element={<DashboardLayout />}>
          <Route index element={<PharmacyDashboardPage />} />
          <Route path="prescriptions" element={<PharmacyPrescriptionsPage />} />
          <Route path="medicines" element={<PharmacyMedicinesPage />} />
          <Route path="inventory" element={<PharmacyInventoryPage />} />
        </Route>
      </Route>

      {/* Billing Panel */}
      <Route element={<ProtectedRoute allowedRoles={['billing', 'admin']} />}>
        <Route path="/billing" element={<DashboardLayout />}>
          <Route index element={<BillingDashboardPage />} />
          <Route path="invoices" element={<BillingInvoicesPage />} />
          <Route path="payments" element={<BillingPaymentsPage />} />
        </Route>
      </Route>

      {/* Patient Panel */}
      <Route element={<ProtectedRoute allowedRoles={['patient', 'admin']} />}>
        <Route path="/patient" element={<DashboardLayout />}>
          <Route index element={<PatientDashboardPage />} />
          <Route path="appointments" element={<PatientAppointmentsPage />} />
          <Route path="medical-records" element={<PatientRecordsPage />} />
          <Route path="prescriptions" element={<PatientPrescriptionsPage />} />
          <Route path="lab-reports" element={<PatientReportsPage />} />
          <Route path="bills" element={<PatientBillsPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};