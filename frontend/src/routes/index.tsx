import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import { DashboardLayout } from '../layouts/DashboardLayout';

// Auth
import { LoginPage } from '../pages/auth/LoginPage';

// Core AAHOC Operational Modules (Matching docx & db.pdf)
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { AlertsPage } from '../pages/Alerts/AlertsPage';
import { PatientFlowPage } from '../pages/PatientFlow/PatientFlowPage';
import { PatientPrioritisationPage } from '../pages/PatientPrioritisation/PatientPrioritisationPage';
import { ResourceManagementPage } from '../pages/ResourceManagement/ResourceManagementPage';
import { RecommendationsPage } from '../pages/Recommendations/RecommendationsPage';
import { AgentActivityPage } from '../pages/AgentActivity/AgentActivityPage';
import { HistoryReportsPage } from '../pages/HistoryReports/HistoryReportsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Auth */}
      <Route path="/login" element={<LoginPage />} />

      {/* Main Protected Workspace Shell */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/patient-flow" element={<PatientFlowPage />} />
        <Route path="/patient-prioritisation" element={<PatientPrioritisationPage />} />
        <Route path="/resource-management" element={<ResourceManagementPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/agent-activity" element={<AgentActivityPage />} />
        <Route path="/history-reports" element={<HistoryReportsPage />} />
        
        {/* Backwards compatibility redirects for old routes */}
        <Route path="/operations/*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/nurse/*" element={<Navigate to="/patient-prioritisation" replace />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
export default AppRoutes;