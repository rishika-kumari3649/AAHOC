import React, { useState } from 'react';
import { MOCK_PHARMACY } from '../../features/admin/mockData';
import type { PharmacyItem } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

export const AdminPharmacyPage: React.FC = () => {
  const [items] = useState<PharmacyItem[]>(MOCK_PHARMACY);

  const columns: Column<PharmacyItem>[] = [
    {
      header: 'Medication Name',
      render: (m) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text)' }}>{m.name}</div>
          <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '1px' }}>Code: {m.drugCode}</div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category'
    },
    {
      header: 'Dosage Form',
      accessor: 'dosage'
    },
    {
      header: 'Current Stock',
      render: (m) => (
        <span style={{ fontWeight: 700, color: m.stock < m.minThreshold ? 'var(--high)' : 'var(--text)' }}>
          {m.stock} units
        </span>
      )
    },
    {
      header: 'Reorder Level',
      render: (m) => (
        <span style={{ color: 'var(--muted)' }}>Min {m.minThreshold}</span>
      )
    },
    {
      header: 'Unit Price',
      render: (m) => `$${m.unitPrice.toFixed(2)}`
    },
    {
      header: 'Expiry Date',
      accessor: 'expiryDate'
    },
    {
      header: 'Status',
      render: (m) => {
        let badgeClass = 'green';
        if (m.status === 'Critically Low') badgeClass = 'high';
        if (m.status === 'Low Stock') badgeClass = 'amber';
        return <span className={`badge ${badgeClass}`}>{m.status}</span>;
      }
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        PHARMACY DISPENSARY &amp; STOCK <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Pharmacy Inventory &amp; Formulary</h1>
          <p className="subtext">
            Central medication depository, automated replenishment triggers, and dispensing controls.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Formulary Drugs</div>
            <div className="kpi-icon blue"><i className="bi bi-capsule"></i></div>
          </div>
          <div className="kpi-value">1,840</div>
          <div className="kpi-delta up">Active hospital catalogue</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Normal Stock</div>
            <div className="kpi-icon green"><i className="bi bi-check-circle"></i></div>
          </div>
          <div className="kpi-value">96.8<sup>%</sup></div>
          <div className="kpi-delta up">Adequate inventory buffer</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Low Stock Alerts</div>
            <div className="kpi-icon orange"><i className="bi bi-exclamation-triangle"></i></div>
          </div>
          <div className="kpi-value">14</div>
          <div className="kpi-delta alert">Purchase orders created</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Emergency Drugs Ready</div>
            <div className="kpi-icon purple"><i className="bi bi-shield-fill-check"></i></div>
          </div>
          <div className="kpi-value">100<sup>%</sup></div>
          <div className="kpi-delta up">Crash cart stock verified</div>
        </div>
      </div>

      <HospitalDataTable
        title="Formulary Depository"
        subtitle="Search medications by brand name, generic name, category, or code."
        columns={columns}
        data={items}
        searchPlaceholder="Search medications..."
        searchFilter={(m, term) =>
          m.name.toLowerCase().includes(term) ||
          m.drugCode.toLowerCase().includes(term) ||
          m.category.toLowerCase().includes(term)
        }
      />
    </div>
  );
};
