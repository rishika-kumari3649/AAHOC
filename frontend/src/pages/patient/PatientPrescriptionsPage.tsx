import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const PatientPrescriptionsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Patient"
      section="Prescriptions"
      path="/patient/prescriptions"
      description="Active prescriptions, dosing reminders, and refill status."
    />
  );
};