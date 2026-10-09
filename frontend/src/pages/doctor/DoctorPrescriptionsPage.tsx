import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const DoctorPrescriptionsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Doctor"
      section="Prescriptions"
      path="/doctor/prescriptions"
      description="e-Prescriptions, medication regimens, dosage adjustments, and pharmacy routing."
    />
  );
};