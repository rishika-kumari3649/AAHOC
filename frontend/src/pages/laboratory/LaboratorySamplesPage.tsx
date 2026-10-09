import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const LaboratorySamplesPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Laboratory"
      section="Samples"
      path="/laboratory/samples"
      description="Sample collection, barcoding, centrifuge status, and specimen tracking."
    />
  );
};