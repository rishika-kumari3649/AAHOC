import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../../components/ThemeToggle';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // Form Field States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Optional Medical Details Accordion
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  // UI Interactive States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password Strength Calculation (0 to 4)
  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [password]);

  // Check if form is valid to enable button
  const isFormValid = useMemo(() => {
    return (
      fullName.trim().length > 0 &&
      email.trim().includes('@') &&
      phone.trim().length > 5 &&
      dateOfBirth.trim().length > 0 &&
      gender.trim().length > 0 &&
      password.length >= 8 &&
      confirmPassword.length >= 8 &&
      agreeTerms
    );
  }, [fullName, email, phone, dateOfBirth, gender, password, confirmPassword, agreeTerms]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation checks
    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password confirmation.');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long with a number and a symbol.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Please agree to the Terms & Conditions and Privacy Policy to create your account.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate account registration
      await new Promise((resolve) => setTimeout(resolve, 1400));
      setIsSuccess(true);
    } catch {
      setErrorMessage('Unable to register account. Please check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F7F8FA] dark:bg-black font-sans text-slate-900 dark:text-neutral-100 transition-colors duration-200">
      {/* Top Floating Controls Bar */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 dark:bg-[#181818] border border-slate-200/90 dark:border-[#2E2E2E] text-slate-700 dark:text-neutral-300 hover:text-[#16A34A] dark:hover:text-[#22C55E] backdrop-blur-md shadow-2xs transition-all"
        >
          <i className="bi bi-arrow-left"></i>
          <span className="hidden xs:inline">Back to Home</span>
          <span className="xs:hidden">Home</span>
        </Link>
        <ThemeToggle size="sm" />
      </div>

      {/* ========================================================
          TABLET & MOBILE CLINICAL BANNER (< lg)
          Matching Exact Reference:
          - Top brand logo + Records encrypted badge
          - "Your health, in one place." headline
          - Concentric pulse radar rings + Glowing Medical Cross + ECG Heartbeat line
          - Centered Login/Registration Card overlaps bottom of banner
          ======================================================== */}
      <div className="block lg:hidden w-full relative overflow-hidden bg-gradient-to-tr from-[#064e3b] via-[#047857] to-[#0f766e] dark:from-[#000000] dark:via-[#05130b] dark:to-[#021008] text-white pt-6 pb-28 sm:pt-8 sm:pb-36 md:pb-40 px-5 sm:px-10">
        {/* Subtle Ambient Background Glows */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10 dark:bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-16 w-72 h-72 rounded-full bg-emerald-300/15 dark:bg-emerald-400/5 blur-3xl pointer-events-none"></div>

        {/* Banner Top Header Row: Brand Logo & Status */}
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
              Your health, <br />
              in one place.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100/85 dark:text-neutral-400 font-normal leading-relaxed">
              Book visits, find available beds and keep your records safe in one account.
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
      <div className="hidden lg:flex lg:w-1/2 min-h-screen relative flex-col justify-between p-12 lg:p-16 overflow-hidden bg-gradient-to-tr from-[#064e3b] via-[#047857] to-[#0f766e] dark:from-[#000000] dark:via-[#05130b] dark:to-[#021008] text-white">
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
            Your health, <br />
            in one place.
          </h2>
          <p className="mt-3 text-sm text-emerald-100/90 dark:text-neutral-400 font-normal leading-relaxed">
            Book visits, find available beds and keep your records safe in one account.
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
          RIGHT / REGISTRATION COLUMN
          On Mobile & Tablet (< lg):
            - -mt-20 sm:-mt-28 md:-mt-32 creates the signature overlapping card effect
            - relative z-20 brings card above banner
          On Desktop (lg:):
            - lg:w-1/2 lg:mt-0 lg:min-h-screen side-by-side split layout
          ======================================================== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 lg:p-12 pb-12 relative -mt-20 sm:-mt-28 md:-mt-32 lg:mt-0 z-20 lg:min-h-screen">
        <div className="w-full max-w-[480px] my-auto">
          {/* Main Floating Card */}
          <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#282828] rounded-3xl p-6 sm:p-9 shadow-xl shadow-slate-200/40 dark:shadow-none transition-all">
            {/* ====================================================
                STATE 6: ACCOUNT CREATED SUCCESS VIEW
                ==================================================== */}
            {isSuccess ? (
              <div className="py-6 text-center animate-fadeIn">
                <div className="mx-auto h-16 w-16 rounded-full bg-[#E8F7EE] dark:bg-emerald-950/60 border border-[#d2f0dd] dark:border-emerald-800/40 flex items-center justify-center text-[#16A34A] dark:text-[#22C55E] text-2xl shadow-xs">
                  <i className="bi bi-check-lg text-3xl font-bold"></i>
                </div>
                <h2 className="mt-5 text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Account created
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                  We sent a verification link to <br />
                  <span className="font-bold text-slate-900 dark:text-white">{email}</span>.
                </p>
                <p className="mt-1 text-xs text-slate-400 dark:text-neutral-500">
                  Verify your email to start booking appointments.
                </p>

                <div className="mt-8 space-y-3">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="w-full h-12 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Go to login</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('A new verification email has been sent.')}
                    className="text-xs font-semibold text-slate-500 dark:text-neutral-400 hover:text-[#16A34A] dark:hover:text-[#22C55E] transition-colors"
                  >
                    No email? Resend link
                  </button>
                </div>
              </div>
            ) : (
              /* ====================================================
                  STANDARD REGISTRATION FORM
                  ==================================================== */
              <>
                {/* Card Brand Header */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="h-8 w-8 rounded-lg bg-[#E8F7EE] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] border border-[#d2f0dd] dark:border-emerald-800/40 flex items-center justify-center font-bold text-sm shadow-2xs">
                    <i className="bi bi-plus-lg"></i>
                  </div>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                    AAHOC<span className="text-[#16A34A] dark:text-[#22C55E]">Care</span>
                  </span>
                </div>

                {/* Create Account Headings */}
                <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Create your account
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-normal">
                  Book doctors, find beds and keep your records in one secure place.
                </p>

                {/* STATE 5: Error Alert Box */}
                {errorMessage && (
                  <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-300 animate-fadeIn">
                    <i className="bi bi-exclamation-circle-fill text-rose-600 dark:text-rose-400 mt-0.5 flex-shrink-0"></i>
                    <div className="flex-1">
                      <span>{errorMessage}</span>
                    </div>
                  </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* Field 1: Full name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setErrorMessage(null);
                      }}
                      placeholder="As on your ID"
                      required
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrorMessage(null);
                        }}
                        placeholder="name@email.com"
                        required
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrorMessage(null);
                        }}
                        placeholder="+977 ..."
                        required
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Date of birth & Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">
                        Date of birth
                      </label>
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => {
                          setDateOfBirth(e.target.value);
                          setErrorMessage(null);
                        }}
                        required
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          value={gender}
                          onChange={(e) => {
                            setGender(e.target.value);
                            setErrorMessage(null);
                          }}
                          required
                          className="w-full h-11 pl-3.5 pr-9 rounded-xl border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] text-slate-800 dark:text-neutral-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                        <i className="bi bi-chevron-down absolute right-3.5 top-3.5 text-xs text-slate-400 pointer-events-none"></i>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Password & Confirm Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                          placeholder="Create a password"
                          required
                          className="w-full h-11 pl-3.5 pr-14 rounded-xl border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-xs font-semibold text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white cursor-pointer px-1 py-1"
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">
                        Confirm password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setErrorMessage(null);
                          }}
                          placeholder="Repeat password"
                          required
                          className="w-full h-11 pl-3.5 pr-14 rounded-xl border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-2.5 text-xs font-semibold text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white cursor-pointer px-1 py-1"
                        >
                          {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password helper & Strength meter */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
                      <span>At least 8 characters with a number and a symbol.</span>
                      {password && (
                        <span className={`font-semibold ${passwordStrength >= 3 ? 'text-[#16A34A] dark:text-[#22C55E]' : 'text-amber-500'}`}>
                          {passwordStrength >= 3 ? 'Strong password' : 'Moderate password'}
                        </span>
                      )}
                    </div>
                    {password && (
                      <div className="grid grid-cols-4 gap-1.5 h-1.5">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`rounded-full transition-all duration-300 ${
                              passwordStrength >= step
                                ? 'bg-[#16A34A] dark:bg-[#22C55E]'
                                : 'bg-slate-200 dark:bg-[#2E2E2E]'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Optional Patient Information Accordion */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowOptionalFields(!showOptionalFields)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-neutral-400 hover:text-[#16A34A] dark:hover:text-[#22C55E] transition-colors"
                    >
                      <i className={`bi bi-chevron-${showOptionalFields ? 'up' : 'down'} text-[10px]`}></i>
                      <span>{showOptionalFields ? 'Hide optional medical details' : '+ Add medical details (optional)'}</span>
                    </button>

                    {showOptionalFields && (
                      <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A]/60 border border-slate-200/80 dark:border-[#282828] space-y-3 animate-fadeIn">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-neutral-400 mb-1">
                            Blood Group
                          </label>
                          <select
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#181818] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
                          >
                            <option value="">Select blood group</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'].map((bg) => (
                              <option key={bg} value={bg}>{bg}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-neutral-400 mb-1">
                            Residential Address
                          </label>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Street, City, Province"
                            className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#181818] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-neutral-400 mb-1">
                            Emergency Contact
                          </label>
                          <input
                            type="text"
                            value={emergencyContact}
                            onChange={(e) => setEmergencyContact(e.target.value)}
                            placeholder="Contact Name & Phone"
                            className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-[#2E2E2E] bg-white dark:bg-[#181818] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="pt-1 flex items-start gap-2.5 text-xs">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#16A34A] focus:ring-[#16A34A] cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-slate-600 dark:text-neutral-400 leading-snug cursor-pointer select-none">
                      I agree to the{' '}
                      <a href="#terms" className="font-semibold text-[#16A34A] dark:text-[#22C55E] hover:underline">
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#privacy" className="font-semibold text-[#16A34A] dark:text-[#22C55E] hover:underline">
                        Privacy Policy
                      </a>.
                    </label>
                  </div>

                  {/* Primary Action Button (State 1 Disabled vs Active vs State 4 Loading) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!isFormValid || isLoading}
                      className={`w-full h-12 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        !isFormValid
                          ? 'bg-slate-200 dark:bg-[#262626] text-slate-400 dark:text-neutral-500 cursor-not-allowed opacity-80'
                          : 'bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] text-white hover:shadow'
                      } ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                    >
                      {isLoading ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          <span>Creating account...</span>
                        </>
                      ) : (
                        <span>Create account</span>
                      )}
                    </button>
                  </div>

                  {/* Bottom Link: Already have an account? Login */}
                  <div className="pt-2 text-center text-xs text-slate-500 dark:text-neutral-400">
                    <span>Already have an account? </span>
                    <Link
                      to="/login"
                      className="font-bold text-[#16A34A] dark:text-[#22C55E] hover:text-[#15803D] dark:hover:text-emerald-400 transition-colors"
                    >
                      Log in
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Below Card */}
          <div className="mt-6 text-center text-xs text-slate-400 dark:text-neutral-500 space-y-2">
            <p className="text-[11px] text-slate-400/90 dark:text-neutral-500">
              Your health data is encrypted and private.
            </p>
            <div className="flex items-center justify-center gap-3">
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
    </div>
  );
};

export default RegisterPage;
