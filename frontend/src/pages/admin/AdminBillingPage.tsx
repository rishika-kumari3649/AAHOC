import React, { useState } from 'react';
import { MOCK_INVOICES } from '../../features/admin/mockData';
import type { InvoiceItem } from '../../features/admin/types';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

export const AdminBillingPage: React.FC = () => {
  const [invoices] = useState<InvoiceItem[]>(MOCK_INVOICES);

  const columns: Column<InvoiceItem>[] = [
    {
      header: 'Invoice Number',
      render: (i) => <span style={{ fontWeight: 700 }}>{i.invoiceNumber}</span>
    },
    {
      header: 'Patient Name',
      accessor: 'patientName'
    },
    {
      header: 'Admission Date',
      accessor: 'admissionDate'
    },
    {
      header: 'Total Charges',
      render: (i) => <strong>${i.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
    },
    {
      header: 'Insurance Covered',
      render: (i) => (
        <span style={{ color: 'var(--green)', fontWeight: 600 }}>
          ${i.insuranceCoverage.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      )
    },
    {
      header: 'Patient Responsibility',
      render: (i) => (
        <span style={{ fontWeight: 600 }}>
          ${i.patientPayable.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      )
    },
    {
      header: 'Payment Status',
      render: (i) => {
        let badgeClass = 'green';
        if (i.status === 'Insurance Claim Pending') badgeClass = 'amber';
        if (i.status === 'Partially Paid') badgeClass = 'purple';
        if (i.status === 'Pending') badgeClass = 'high';
        return <span className={`badge ${badgeClass}`}>{i.status}</span>;
      }
    },
    {
      header: 'Due Date',
      accessor: 'dueDate'
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        FINANCIAL OPERATIONS &amp; BILLING <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Billing &amp; Revenue Cycle Management</h1>
          <p className="subtext">
            Inpatient hospital accounts, insurance claim submissions, payment settlements, and copayments.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Gross Billed (24h)</div>
            <div className="kpi-icon blue"><i className="bi bi-currency-dollar"></i></div>
          </div>
          <div className="kpi-value">$482.5k</div>
          <div className="kpi-delta up">↑ 5.1% vs budget forecast</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Insurance Recovery Rate</div>
            <div className="kpi-icon green"><i className="bi bi-shield-check"></i></div>
          </div>
          <div className="kpi-value">92.4<sup>%</sup></div>
          <div className="kpi-delta up">Clean claims adjudication</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Pending Claim Clearance</div>
            <div className="kpi-icon orange"><i className="bi bi-hourglass-split"></i></div>
          </div>
          <div className="kpi-value">$34.2k</div>
          <div className="kpi-delta alert">28 open vouchers</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Direct Patient Collections</div>
            <div className="kpi-icon purple"><i className="bi bi-wallet2"></i></div>
          </div>
          <div className="kpi-value">$42.1k</div>
          <div className="kpi-delta up">Copay &amp; deductibles settled</div>
        </div>
      </div>

      <HospitalDataTable
        title="Patient Billing Ledger"
        subtitle="Manage hospital accounts, insurance claim status, and outstanding invoices."
        columns={columns}
        data={invoices}
        searchPlaceholder="Filter invoices by number, patient..."
        searchFilter={(i, term) =>
          i.invoiceNumber.toLowerCase().includes(term) ||
          i.patientName.toLowerCase().includes(term) ||
          i.status.toLowerCase().includes(term)
        }
      />
    </div>
  );
};
