import React from 'react';
import { HospitalDataTable, type Column } from '../../features/admin/components/HospitalDataTable';

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  module: string;
  ipAddress: string;
  status: 'Success' | 'Flagged' | 'Denied';
}

export const AdminAuditLogsPage: React.FC = () => {
  const auditLogs: AuditLog[] = [
    {
      id: 'LOG-881',
      timestamp: 'Today, 09:41 AM',
      actor: 'Catherine Bell',
      role: 'Hospital Admin',
      action: 'Approved AI Recommendation: Reassign 1 float nurse to ED',
      module: 'Operations Command',
      ipAddress: '10.24.1.15',
      status: 'Success'
    },
    {
      id: 'LOG-882',
      timestamp: 'Today, 09:30 AM',
      actor: 'Dr. Sarah Jenkins',
      role: 'Cardiologist',
      action: 'Updated Clinical Chart: Eleanor Vance (MRN-84920)',
      module: 'Medical Records',
      ipAddress: '10.24.3.44',
      status: 'Success'
    },
    {
      id: 'LOG-883',
      timestamp: 'Today, 09:18 AM',
      actor: 'Dr. Alan Vance',
      role: 'Trauma Lead',
      action: 'Triage Override to T1: Marcus Thorne',
      module: 'Emergency Department',
      ipAddress: '10.24.2.10',
      status: 'Success'
    },
    {
      id: 'LOG-884',
      timestamp: 'Today, 08:52 AM',
      actor: 'System Autonomous Agent',
      role: 'AAHOC AI Core',
      action: 'Dispatched Alert: ED Capacity trending toward 90%',
      module: 'Surge Intelligence',
      ipAddress: 'Internal Event Bus',
      status: 'Success'
    },
    {
      id: 'LOG-885',
      timestamp: 'Today, 08:15 AM',
      actor: 'Guest Terminal #4',
      role: 'Unauthenticated',
      action: 'Attempted access to Restricted Inpatient Pharmacy Records',
      module: 'Security Vault',
      ipAddress: '192.168.10.88',
      status: 'Denied'
    }
  ];

  const columns: Column<AuditLog>[] = [
    {
      header: 'Timestamp',
      accessor: 'timestamp'
    },
    {
      header: 'Actor',
      render: (l) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text)' }}>{l.actor}</div>
          <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{l.role}</div>
        </div>
      )
    },
    {
      header: 'Action Event',
      render: (l) => (
        <span style={{ fontWeight: 500, color: '#1E293B', fontSize: '.84rem' }}>
          {l.action}
        </span>
      )
    },
    {
      header: 'System Module',
      accessor: 'module'
    },
    {
      header: 'IP / Source',
      render: (l) => (
        <code style={{ fontSize: '.76rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
          {l.ipAddress}
        </code>
      )
    },
    {
      header: 'Result',
      render: (l) => {
        let badgeClass = 'green';
        if (l.status === 'Denied') badgeClass = 'high';
        if (l.status === 'Flagged') badgeClass = 'amber';
        return <span className={`badge ${badgeClass}`}>{l.status}</span>;
      }
    }
  ];

  return (
    <div>
      <div className="eyebrow">
        REGULATORY COMPLIANCE &amp; SECURITY <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>System Audit &amp; Activity Logs</h1>
          <p className="subtext">
            Immutable HIPAA compliance audit trail, access events, AI decisions, and security alerts.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Logged Events (24h)</div>
            <div className="kpi-icon blue"><i className="bi bi-shield-check"></i></div>
          </div>
          <div className="kpi-value">8,412</div>
          <div className="kpi-delta up">100% audit coverage</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">AI Agent Transactions</div>
            <div className="kpi-icon purple"><i className="bi bi-stars"></i></div>
          </div>
          <div className="kpi-value">1,240</div>
          <div className="kpi-delta up">All decisions logged</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Security Flagged Denials</div>
            <div className="kpi-icon orange"><i className="bi bi-shield-exclamation"></i></div>
          </div>
          <div className="kpi-value">1</div>
          <div className="kpi-delta alert">Blocked by WAF</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-label">Cryptographic Hash Status</div>
            <div className="kpi-icon green"><i className="bi bi-key-fill"></i></div>
          </div>
          <div className="kpi-value">Verified</div>
          <div className="kpi-delta up">Tamper-proof ledger</div>
        </div>
      </div>

      <HospitalDataTable
        title="Audit Trail Registry"
        subtitle="Search administrative and operational events by user, module, or action."
        columns={columns}
        data={auditLogs}
        searchPlaceholder="Filter audit records..."
        searchFilter={(l, term) =>
          l.actor.toLowerCase().includes(term) ||
          l.action.toLowerCase().includes(term) ||
          l.module.toLowerCase().includes(term)
        }
      />
    </div>
  );
};