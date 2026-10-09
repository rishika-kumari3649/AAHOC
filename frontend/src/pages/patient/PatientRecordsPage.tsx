import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const PatientRecordsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Patient"
      section="Medical Records"
      path="/patient/medical-records"
      description="Digital health records, doctor visit summaries, and immunization logs."
    />
  );
};