import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const DoctorPatientsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Doctor"
      section="Patients"
      path="/doctor/patients"
      description="Assigned patients, medical history, encounters, and active episode details."
    />
  );
};