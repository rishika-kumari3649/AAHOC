import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const NurseVitalsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Nurse"
      section="Vitals"
      path="/nurse/vitals"
      description="Vitals charting (BP, HR, SpO2, Temperature, Pain scale, NEWS score)."
    />
  );
};