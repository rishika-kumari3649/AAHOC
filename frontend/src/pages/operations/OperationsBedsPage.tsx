import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const OperationsBedsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Operations"
      section="Beds & Capacity"
      path="/operations/beds-capacity"
      description="Dynamic bed capacity optimization, turnover rates, and ward availability."
    />
  );
};