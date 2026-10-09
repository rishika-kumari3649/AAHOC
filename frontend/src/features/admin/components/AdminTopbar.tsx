import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../../../components/ThemeToggle';

interface AdminTopbarProps {
  onToggleSidebar?: () => void;
  alertCount?: number;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ onToggleSidebar, alertCount = 6 }) => {
  const location = useLocation();

  // Get current section name from pathname
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSection = pathParts.length > 1
    ? pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1).replace(/-/g, ' ')
    : 'Dashboard';

  const todayFormatted = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <header className="topbar">
      <div className="crumb">
        <button
          className="mobile-sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <i className="bi bi-list"></i>
        </button>
        <Link to="/admin">Workspace</Link> <i className="bi bi-chevron-right" style={{ fontSize: '.7rem' }}></i>{' '}
        <strong>{currentSection}</strong>
      </div>

      <div className="topbar-right">
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span className="live-dot"></span> Live data
        </span>
        <span className="divider"></span>
        <span id="todayDate" className="hidden sm:inline">
          {todayFormatted}
        </span>
        <span className="divider hidden sm:inline"></span>

        <ThemeToggle size="sm" />

        <Link to="/" className="portal-switch-btn" title="Return to Portal Hub">
          <i className="bi bi-grid"></i>
          <span className="hidden md:inline">Hub</span>
        </Link>

        <Link
          to="/admin/notifications"
          style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#4B5563' }}
          title={`${alertCount} Alerts`}
        >
          <i className="bi bi-bell" id="bellIcon"></i>
          {alertCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-6px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: 'var(--high)',
                color: '#fff',
                fontSize: '9px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {alertCount}
            </span>
          )}
        </Link>

        <div className="avatar sm">HA</div>
      </div>
    </header>
  );
};
