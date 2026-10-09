import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, DEMO_USERS } from '../../context/AuthContext';
import { ThemeToggle } from '../../components/ThemeToggle';
import type { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Reference defaults to Patient
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState(DEMO_USERS.patient.email);
  const [password, setPassword] = useState('Password@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const roles: { value: UserRole; label: string }[] = [
    { value: 'patient', label: 'Patient' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'admin', label: 'Admin' },
    { value: 'operations', label: 'Operations' },
    { value: 'reception', label: 'Reception' },
    { value: 'laboratory', label: 'Laboratory' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'billing', label: 'Billing' },
  ];

  const handleRoleChange = (newRole: UserRole) => {
    setSelectedRole(newRole);
    setErrorMessage(null);
    if (DEMO_USERS[newRole]) {
      setEmail(DEMO_USERS[newRole].email);
      setPassword('Password@2026');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const redirectTarget = await login(selectedRole, email, password);
      const stateFrom = (location.state as { from?: { pathname: string } })?.from?.pathname;
      const destination =
        stateFrom && stateFrom.startsWith(`/${selectedRole}`) ? stateFrom : redirectTarget;

      navigate(destination, { replace: true });
    } catch {
      setErrorMessage('Incorrect email or password. Please check your details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F7F8FA] dark:bg-black font-sans text-slate-900 dark:text-neutral-100 transition-colors duration-200">
      {/* Top Floating Controls Bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 dark:bg-[#181818] border border-slate-200/90 dark:border-[#2E2E2E] text-slate-700 dark:text-neutral-300 hover:text-[#16A34A] dark:hover:text-[#22C55E] backdrop-blur-md shadow-2xs transition-all"
        >
          <i className="bi bi-arrow-left"></i>
          <span>Back to Home</span>
        </Link>
        <ThemeToggle size="sm" />
      </div>

      {/* ========================================================
          TABLET & MOBILE CLINICAL BANNER (< lg)
          Exact match to Reference Image (media_1791447375993.jpg):
          - Top brand logo + Records encrypted badge
          - "Care that connects every team." headline
          - Concentric pulse radar rings + Glowing Medical Cross + ECG Heartbeat line
          - Centered Login Card overlaps the bottom of this banner
          ======================================================== */}
      <div className="block lg:hidden w-full relative overflow-hidden bg-gradient-to-tr from-[#064e3b] via-[#047857] to-[#0f766e] dark:from-[#000000] dark:via-[#05130b] dark:to-[#021008] text-white pt-6 pb-28 sm:pt-8 sm:pb-36 md:pb-40 px-5 sm:px-10">
        {/* Subtle Ambient Background Glows */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10 dark:bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-16 w-72 h-72 rounded-full bg-emerald-300/15 dark:bg-emerald-400/5 blur-3xl pointer-events-none"></div>

        {/* Banner Top Header Row: Brand Logo & Records encrypted badge */}
        <div className="relative z-10 flex items-center justify-between pr-32 sm:pr-36">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-white/20 dark:bg-emerald-500/20 backdrop-blur-md border border-white/30 dark:border-emerald-500/30 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              <i className="bi bi-plus-lg"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight leading-none text-white">
                AAHOC<span className="text-emerald-300">Care</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-100/70 tracking-wider uppercase mt-0.5">
                Hospital System
              </span>
            </div>
          </Link>
        </div>

        {/* Banner Main Grid: Headline on left, Radar & Medical Cross on right */}
        <div className="relative z-10 mt-6 sm:mt-8 flex items-center justify-between gap-4">
          {/* Left: Headline & Subtitle */}
          <div className="max-w-[240px] xs:max-w-[280px] sm:max-w-md">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white">
              Care that connects <br />
              every team.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100/85 dark:text-neutral-400 font-normal leading-relaxed">
              One secure workspace for patients, clinicians and hospital staff.
            </p>
          </div>

          {/* Right: Medical Cross with Radar Rings & ECG Pulse Line */}
          <div className="relative flex-shrink-0 w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 flex items-center justify-center">
            {/* Concentric Radar Rings */}
            <div className="absolute inset-0 rounded-full border border-white/10 dark:border-emerald-500/10 animate-pulse"></div>
            <div className="absolute inset-3 sm:inset-5 rounded-full border border-white/15 dark:border-emerald-500/15"></div>
            <div className="absolute inset-6 sm:inset-10 rounded-full border border-white/20 dark:border-emerald-500/20"></div>

            {/* Glowing Center Medical Cross Badge */}
            <div className="relative h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-2xl bg-white/20 dark:bg-emerald-950/40 backdrop-blur-xl border border-white/35 dark:border-emerald-500/30 flex items-center justify-center shadow-xl">
              <div className="text-white text-2xl sm:text-4xl md:text-5xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                <i className="bi bi-plus-lg"></i>
              </div>
            </div>

            {/* ECG Sinus Wave Pulse SVG Line */}
            <svg
              className="absolute w-full h-12 sm:h-16 text-emerald-300 dark:text-emerald-400 filter drop-shadow-[0_0_4px_rgba(52,211,153,0.8)]"
              viewBox="0 0 200 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 0 30 L 60 30 L 70 15 L 80 45 L 90 10 L 100 50 L 110 30 L 200 30" />
            </svg>

            {/* Floating Glass Pill: Records encrypted */}
            <div className="absolute -top-2 right-0 sm:right-2 px-2.5 py-1 rounded-full bg-white/15 dark:bg-black/50 backdrop-blur-md border border-white/25 dark:border-white/15 text-[10px] font-semibold text-white flex items-center gap-1.5 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-ping"></span>
              <i className="bi bi-shield-lock-fill text-[9px] text-emerald-200"></i>
              <span>Records encrypted</span>
            </div>

            {/* Floating Glass Pill: Beds updated live */}
            <div className="hidden sm:flex absolute -bottom-1 -right-1 px-2.5 py-1 rounded-full bg-white/15 dark:bg-black/50 backdrop-blur-md border border-white/25 dark:border-white/15 text-[10px] font-semibold text-white items-center gap-1.5 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300"></span>
              <i className="bi bi-activity text-[9px] text-amber-200"></i>
              <span>Beds updated live</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          LEFT COLUMN: Clinical Brand Showcase (Desktop only: lg:flex)
          Exact match to Reference: Emerald Pulse & Healthcare Mood
          ======================================================== */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 lg:p-16 overflow-hidden bg-gradient-to-tr from-[#064e3b] via-[#047857] to-[#0f766e] dark:from-[#000000] dark:via-[#05130b] dark:to-[#021008] text-white">
        {/* Subtle Ambient Background Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 dark:bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-300/15 dark:bg-emerald-400/5 blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-white/20 dark:bg-emerald-500/20 backdrop-blur-md border border-white/30 dark:border-emerald-500/30 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              <i className="bi bi-plus-lg"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight leading-none text-white">
                AAHOC<span className="text-emerald-300">Care</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-100/70 tracking-wider uppercase mt-0.5">
                Hospital System
              </span>
            </div>
          </Link>
        </div>

        {/* Center Graphic: Medical Cross with Heartbeat Wave & Radar Rings */}
        <div className="relative z-10 my-auto py-12 flex items-center justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Concentric Radar Rings */}
            <div className="absolute inset-0 rounded-full border border-white/10 dark:border-emerald-500/10 animate-pulse"></div>
            <div className="absolute inset-8 rounded-full border border-white/15 dark:border-emerald-500/15"></div>
            <div className="absolute inset-16 rounded-full border border-white/20 dark:border-emerald-500/20"></div>

            {/* Glowing Center Medical Cross Badge */}
            <div className="relative h-28 w-28 rounded-3xl bg-white/15 dark:bg-emerald-950/40 backdrop-blur-xl border border-white/30 dark:border-emerald-500/30 flex items-center justify-center shadow-2xl">
              <div className="text-white text-5xl filter drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                <i className="bi bi-plus-lg"></i>
              </div>
            </div>

            {/* ECG Sinus Wave Pulse SVG Line */}
            <svg
              className="absolute w-full h-24 text-emerald-300 dark:text-emerald-400 filter drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]"
              viewBox="0 0 320 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 0 40 L 90 40 L 105 20 L 120 60 L 135 15 L 150 65 L 165 40 L 320 40" />
            </svg>

            {/* Floating Glass Pill: Records Encrypted */}
            <div className="absolute top-4 left-6 px-3.5 py-1.5 rounded-full bg-white/15 dark:bg-black/50 backdrop-blur-md border border-white/25 dark:border-white/15 text-xs font-semibold text-white flex items-center gap-2 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-ping"></span>
              <i className="bi bi-shield-lock-fill text-[11px] text-emerald-200"></i>
              <span>Records encrypted</span>
            </div>

            {/* Floating Glass Pill: Beds Updated Live */}
            <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-white/15 dark:bg-black/50 backdrop-blur-md border border-white/25 dark:border-white/15 text-xs font-semibold text-white flex items-center gap-2 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300"></span>
              <i className="bi bi-activity text-[11px] text-amber-200"></i>
              <span>Beds updated live</span>
            </div>
          </div>
        </div>

        {/* Bottom Headline & Trust Metrics */}
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl lg:text-[38px] font-extrabold tracking-tight leading-[1.15] text-white">
            Care that connects <br />
            every team.
          </h2>
          <p className="mt-3 text-sm text-emerald-100/90 dark:text-neutral-400 font-normal leading-relaxed">
            One secure workspace for patients, clinicians and hospital staff.
          </p>
          <div className="mt-6 pt-5 border-t border-white/15 dark:border-white/10 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-200/80 dark:text-neutral-500 font-medium">
            <span>Secure sign-in</span>
            <span>&bull;</span>
            <span>Role-based access</span>
            <span>&bull;</span>
            <span>Available 24/7</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          RIGHT / AUTHENTICATION COLUMN
          On Mobile & Tablet (< lg):
            - -mt-20 sm:-mt-28 md:-mt-32 creates the signature overlapping card effect
            - relative z-20 brings card above banner
          On Desktop (lg:):
            - lg:w-1/2 lg:mt-0 lg:min-h-screen side-by-side split layout
          ======================================================== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 lg:p-12 pb-12 relative -mt-20 sm:-mt-28 md:-mt-32 lg:mt-0 z-20 lg:min-h-screen">
        <div className="w-full max-w-[440px] my-auto">
          {/* Main Floating Card */}
          <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#282828] rounded-3xl p-6 sm:p-9 shadow-xl shadow-slate-200/40 dark:shadow-none transition-all">
            {/* Card Brand Header */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="h-8 w-8 rounded-lg bg-[#E8F7EE] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] border border-[#d2f0dd] dark:border-emerald-800/40 flex items-center justify-center font-bold text-sm shadow-2xs">
                <i className="bi bi-plus-lg"></i>
              </div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                AAHOC<span className="text-[#16A34A] dark:text-[#22C55E]">Care</span>
              </span>
            </div>

            {/* Welcome Back Headings */}
            <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-normal">
              Sign in to access your appointments, records and hospital workspace.
            </p>

            {/* Error Alert Box (State 5) */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-300 animate-fadeIn">
                <i className="bi bi-exclamation-circle-fill text-rose-600 dark:text-rose-400 mt-0.5 flex-shrink-0"></i>
                <div className="flex-1">
                  <span>{errorMessage}</span>
                  <div className="text-[11px] text-rose-600/80 dark:text-rose-400/80 mt-0.5">
                    Password is case-sensitive.
                  </div>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Field 1: Sign in as */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">
                  Sign in as
                </label>
                <div className="relative">
                  <select
                    value={selectedRole}
                    onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                    className="w-full h-11 pl-3.5 pr-9 rounded-xl border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] text-slate-800 dark:text-neutral-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all cursor-pointer appearance-none"
                  >
                    {roles.map((r) => (
                      <option key={r.value} value={r.value} className="bg-white dark:bg-[#1A1A1A]">
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <i className="bi bi-chevron-down absolute right-3.5 top-3.5 text-xs text-slate-400 pointer-events-none"></i>
                </div>
              </div>

              {/* Field 2: Email or username */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">
                  Email or username
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="name@hospital.org"
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
                />
              </div>

              {/* Field 3: Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage(null);
                    }}
                    placeholder="Enter your password"
                    required
                    className="w-full h-11 pl-3.5 pr-14 rounded-xl border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-xs font-semibold text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white cursor-pointer px-1 py-1"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Row: Remember me + Forgot password */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#16A34A] focus:ring-[#16A34A] cursor-pointer"
                  />
                  <span className="font-semibold text-slate-700 dark:text-neutral-300">
                    Remember me
                  </span>
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset instructions have been sent to your registered clinical email.');
                  }}
                  className="font-semibold text-[#16A34A] dark:text-[#22C55E] hover:text-[#15803D] dark:hover:text-emerald-400 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] text-white font-bold text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Log in</span>
                  )}
                </button>
              </div>

              {/* Bottom: New Patient Registration */}
              <div className="pt-2 text-center text-xs text-slate-500 dark:text-neutral-400">
                <span>New patient? </span>
                <Link
                  to="/register"
                  className="font-bold text-[#16A34A] dark:text-[#22C55E] hover:text-[#15803D] dark:hover:text-emerald-400 transition-colors"
                >
                  Create an account
                </Link>
              </div>
            </form>
          </div>

          {/* Footer Below Card */}
          <div className="mt-8 text-center text-xs text-slate-400 dark:text-neutral-500 flex items-center justify-center gap-3">
            <a href="#privacy" className="hover:text-slate-600 dark:hover:text-neutral-300 transition-colors">
              Privacy Policy
            </a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-slate-600 dark:hover:text-neutral-300 transition-colors">
              Terms
            </a>
            <span>&bull;</span>
            <a href="#help" className="hover:text-slate-600 dark:hover:text-neutral-300 transition-colors">
              Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;