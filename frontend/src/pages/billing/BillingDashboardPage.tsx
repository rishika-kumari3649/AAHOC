import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const BillingDashboardPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Billing"
      section="Dashboard"
      path="/billing"
      description="Revenue metrics, pending claims, unbilled bed days, and cash collections."
    />
  );
};