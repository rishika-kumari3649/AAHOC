import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Stethoscope
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import type { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useHospital();
  const [selectedRole, setSelectedRole] = useState<UserRole>('operations');
  const [email, setEmail] = useState('coordinator@aahoc.health');
  const [password, setPassword] = useState('••••••••••••');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'operations') {
      setEmail('coordinator@aahoc.health');
    } else {
      setEmail('triage.nurse@aahoc.health');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    if (selectedRole === 'triage') {
      navigate('/patient-prioritisation');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 select-none">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-emerald-100 items-center justify-center text-emerald-600 shadow-sm mb-2">
            <svg className="w-8 h-8 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
            </svg>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            XZYABC Hospital Operations
          </h1>
          <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
            AI-Assisted Operations Coordinator & Triage Support System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select Operational Role
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => handleRoleSelect('operations')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'operations'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Coordinator</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('triage')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'triage'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-purple-600" />
                <span>Triage Support</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Authorized Staff Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Security Passcode
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <span>Enter Operational Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Note */}
          <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
            Human-in-the-Loop Operational Intelligence • Project I Scope
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;