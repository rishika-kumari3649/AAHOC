import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import '../../../styles/admin-dashboard.css';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-scope">
      {/* Sidebar Overlay on mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 45
          }}
        />
      )}

      {/* 262px Fixed Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        alertCount={6}
        recCount={3}
        emergencyCount={4}
      />

      {/* Main Content Area */}
      <main className="admin-main">
        <AdminTopbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          alertCount={6}
        />

        <div style={{ flex: '1 0 auto' }}>
          <Outlet />
        </div>

        <footer className="page-footer">
          <span>AAHOC Hospital Management &amp; Administrative Command</span>
          <span>
            <i className="bi bi-shield-check" style={{ color: 'var(--green)', marginRight: '4px' }}></i>
            Operational Systems Live &bull; Encrypted Audit Log Active
          </span>
        </footer>
      </main>
    </div>
  );
};
