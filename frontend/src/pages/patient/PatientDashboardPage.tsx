import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const PatientDashboardPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Patient"
      section="Dashboard"
      path="/patient"
      description="Patient personal health portal, upcoming visits, and active medications."
    />
  );
};