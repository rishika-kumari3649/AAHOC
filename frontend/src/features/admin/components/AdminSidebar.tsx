import React from 'react';
import { NavLink, Link } from 'react-router-dom';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  alertCount?: number;
  recCount?: number;
  emergencyCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen = false,
  onClose,
  alertCount = 6,
  recCount = 3,
  emergencyCount = 4
}) => {
  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: 'bi-grid-1x2', end: true },
    { label: 'Patients', path: '/admin/patients', icon: 'bi-people' },
    { label: 'Doctors', path: '/admin/doctors', icon: 'bi-person-badge' },
    { label: 'Appointments', path: '/admin/appointments', icon: 'bi-calendar-check' },
    { label: 'Departments', path: '/admin/departments', icon: 'bi-building' },
    { label: 'Nurses', path: '/admin/nurses', icon: 'bi-clipboard2-pulse' },
    { label: 'Pharmacy', path: '/admin/pharmacy', icon: 'bi-capsule' },
    { label: 'Laboratory', path: '/admin/laboratory', icon: 'bi-virus' },
    { label: 'Prescriptions', path: '/admin/prescriptions', icon: 'bi-file-earmark-medical' },
    { label: 'Medical Records', path: '/admin/medical-records', icon: 'bi-folder2-open' },
    { label: 'Billing', path: '/admin/billing', icon: 'bi-credit-card-2-front' },
    {
      label: 'Emergency',
      path: '/admin/emergency',
      icon: 'bi-shield-exclamation',
      badge: `${emergencyCount} active`,
      badgeClass: 'alert-nav-count'
    },
    { label: 'Staff Management', path: '/admin/staff', icon: 'bi-person-gear' },
    {
      label: 'Reports',
      path: '/admin/reports',
      icon: 'bi-file-earmark-bar-graph',
      badge: recCount > 0 ? `${recCount} pending` : undefined,
      badgeClass: 'amber'
    },
    {
      label: 'Notifications',
      path: '/admin/notifications',
      icon: 'bi-bell',
      badge: `${alertCount}`,
      badgeClass: 'alert-nav-count'
    },
    { label: 'Settings', path: '/admin/settings', icon: 'bi-gear' }
  ];

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <Link to="/admin" className="brand" onClick={onClose}>
        <div className="brand-icon">
          <i className="bi bi-plus-lg"></i>
        </div>
        <div>
          <div className="brand-name">
            AAHOC<span>Admin</span>
          </div>
          <div className="brand-sub">HOSPITAL OPERATIONS</div>
        </div>
      </Link>

      <div className="nav-label">HOSPITAL MANAGEMENT</div>

      <nav className="nav-list">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
            onClick={onClose}
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
            {item.badge && (
              <em className={`pill-count ${item.badgeClass || ''}`}>
                {item.badge}
              </em>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-bottom">
        <div className="agent-card">
          <div className="agent-row">
            <span className="dot-pulse"></span>
            <strong>AI Agent Active</strong>
            <span className="dot-plain"></span>
          </div>
          <div className="agent-sub">Monitoring live operations</div>
          <div className="agent-row hitl">
            <span className="dot-static"></span>
            <span>HITL Mode</span>
            <i
              className="bi bi-info-circle"
              title="Human-in-the-loop: agent proposes, a human approves."
            ></i>
          </div>
        </div>

        <div className="profile-row">
          <div className="avatar">HA</div>
          <div className="profile-text">
            <div className="profile-name">Hospital Admin</div>
            <div className="profile-sub">Coordinator view</div>
          </div>
          <i className="bi bi-three-dots" style={{ color: 'var(--muted)', cursor: 'pointer' }}></i>
        </div>
      </div>
    </aside>
  );
};
