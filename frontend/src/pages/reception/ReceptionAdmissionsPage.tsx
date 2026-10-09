import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const ReceptionAdmissionsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Reception"
      section="Admissions"
      path="/reception/admissions"
      description="Inpatient desk check-in, initial deposit verification, and room key release."
    />
  );
};