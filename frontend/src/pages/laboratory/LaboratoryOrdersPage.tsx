import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const LaboratoryOrdersPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Laboratory"
      section="Test Orders"
      path="/laboratory/test-orders"
      description="Received diagnostic requests from emergency and inpatient wards."
    />
  );
};