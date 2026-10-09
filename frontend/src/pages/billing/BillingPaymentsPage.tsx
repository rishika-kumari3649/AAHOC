import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const BillingPaymentsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Billing"
      section="Payments"
      path="/billing/payments"
      description="Payment gateway reconciliation, cash receipting, and refund processing."
    />
  );
};