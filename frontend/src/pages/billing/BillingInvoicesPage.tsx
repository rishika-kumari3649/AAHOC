import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const BillingInvoicesPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Billing"
      section="Invoices"
      path="/billing/invoices"
      description="Itemized invoice generation, insurance adjudication, and audit summaries."
    />
  );
};