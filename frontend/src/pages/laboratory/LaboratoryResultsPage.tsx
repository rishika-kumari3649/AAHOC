import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const LaboratoryResultsPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Laboratory"
      section="Results"
      path="/laboratory/results"
      description="Result entry, pathologist sign-off, and automated alert triggering."
    />
  );
};