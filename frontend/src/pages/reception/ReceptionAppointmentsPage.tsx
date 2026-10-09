import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const ReceptionAppointmentsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Reception"
      section="Appointments"
      path="/reception/appointments"
      description="Scheduling, token issuing, reschedule requests, and doctor availability check."
    />
  );
};