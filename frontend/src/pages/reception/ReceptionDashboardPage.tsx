import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const ReceptionDashboardPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Reception"
      section="Dashboard"
      path="/reception"
      description="Front-desk inflow, check-in queue, and waiting room management."
    />
  );
};