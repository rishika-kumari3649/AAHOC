import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const PatientBillsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Patient"
      section="Bills"
      path="/patient/bills"
      description="Medical invoices, insurance coverage breakdown, and online bill payment."
    />
  );
};