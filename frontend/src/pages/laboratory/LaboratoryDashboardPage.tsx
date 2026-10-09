import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const LaboratoryDashboardPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Laboratory"
      section="Dashboard"
      path="/laboratory"
      description="Lab throughput, pending sample queues, and TAT (Turnaround Time) status."
    />
  );
};