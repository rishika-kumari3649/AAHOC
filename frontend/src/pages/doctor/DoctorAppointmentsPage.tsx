import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const DoctorAppointmentsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Doctor"
      section="Appointments"
      path="/doctor/appointments"
      description="Consultation calendar, booked time slots, and telehealth requests."
    />
  );
};