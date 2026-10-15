import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* Sticky Left Sidebar: stays sticky when right scrolls, scrolls independently if height overflows */}
      <Sidebar />

      {/* Right Content Area: scrolls independently while left sidebar remains sticky */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 md:p-10 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;