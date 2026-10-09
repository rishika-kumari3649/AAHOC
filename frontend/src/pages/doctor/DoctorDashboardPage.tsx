import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const DoctorDashboardPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Doctor"
      section="Dashboard"
      path="/doctor"
      description="Active clinical shift dashboard, outpatient queue, and inpatient consults."
    />
  );
};