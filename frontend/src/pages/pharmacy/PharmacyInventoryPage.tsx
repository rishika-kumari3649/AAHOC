import React from 'react';
import { PanelPlaceholder } from '../../components/PanelPlaceholder';

export const PharmacyInventoryPage: React.FC = () => {
  return (
    <PanelPlaceholder
      panel="Pharmacy"
      section="Inventory"
      path="/pharmacy/inventory"
      description="Batch tracking, expiry monitoring, reorder triggers, and cold-chain stock."
    />
  );
};