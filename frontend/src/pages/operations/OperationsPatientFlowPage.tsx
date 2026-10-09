import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const OperationsPatientFlowPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Operations"
      section="Patient Flow"
      path="/operations/patient-flow"
      description="Hospital-wide patient journey, bottlenecks, transit times, and discharge forecasting."
    />
  );
};