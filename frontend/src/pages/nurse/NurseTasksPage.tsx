import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const NurseTasksPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Nurse"
      section="Nursing Tasks"
      path="/nurse/tasks"
      description="Medication administration schedule, wound care, and scheduled rounds."
    />
  );
};