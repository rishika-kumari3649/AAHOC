import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const NurseAlertsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Nurse"
      section="Alerts"
      path="/nurse/alerts"
      description="Patient deterioration warnings, missed medication alerts, and call bells."
    />
  );
};