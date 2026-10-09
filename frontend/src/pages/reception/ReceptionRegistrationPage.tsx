import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const ReceptionRegistrationPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Reception"
      section="Patient Registration"
      path="/reception/registration"
      description="New patient onboarding, KYC, insurance capture, and digital badge generation."
    />
  );
};