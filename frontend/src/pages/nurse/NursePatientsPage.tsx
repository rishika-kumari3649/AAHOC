import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const NursePatientsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Nurse"
      section="Assigned Patients"
      path="/nurse/assigned-patients"
      description="Assigned bedside patients, room allocations, and care plans."
    />
  );
};