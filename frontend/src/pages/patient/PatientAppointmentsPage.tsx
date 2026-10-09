import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const PatientAppointmentsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Patient"
      section="Appointments"
      path="/patient/appointments"
      description="Self-service booking, consultation history, and reminders."
    />
  );
};