import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const PharmacyMedicinesPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Pharmacy"
      section="Medicines"
      path="/pharmacy/medicines"
      description="Hospital drug formulary, generic equivalents, dosage guidelines, and storage specs."
    />
  );
};