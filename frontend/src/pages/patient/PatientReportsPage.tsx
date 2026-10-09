import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const PatientReportsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Patient"
      section="Lab Reports"
      path="/patient/lab-reports"
      description="Diagnostic lab results, imaging reports, and historical trends."
    />
  );
};