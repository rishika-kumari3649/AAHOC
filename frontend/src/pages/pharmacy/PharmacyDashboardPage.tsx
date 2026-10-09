import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const PharmacyDashboardPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Pharmacy"
      section="Dashboard"
      path="/pharmacy"
      description="Dispensary counter throughput, active prescription queue, and stock status."
    />
  );
};