import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const DoctorLabOrdersPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Doctor"
      section="Lab Orders"
      path="/doctor/lab-orders"
      description="Diagnostic requisitions, pathology orders, and test result reviews."
    />
  );
};