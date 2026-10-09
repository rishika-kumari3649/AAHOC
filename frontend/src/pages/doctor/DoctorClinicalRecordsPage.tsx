import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const DoctorClinicalRecordsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Doctor"
      section="Clinical Records"
      path="/doctor/clinical-records"
      description="SOAP clinical notes, diagnosis coding (ICD), and clinical observations."
    />
  );
};