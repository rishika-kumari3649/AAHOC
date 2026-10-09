import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const OperationsResourcesPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Operations"
      section="Resources"
      path="/operations/resources"
      description="OR suites, imaging devices, ventilators, and vital equipment allocation."
    />
  );
};