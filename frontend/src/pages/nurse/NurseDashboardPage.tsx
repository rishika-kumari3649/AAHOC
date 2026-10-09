import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const NurseDashboardPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Nurse"
      section="Dashboard"
      path="/nurse"
      description="Ward overview, shift handover summaries, and patient status board."
    />
  );
};