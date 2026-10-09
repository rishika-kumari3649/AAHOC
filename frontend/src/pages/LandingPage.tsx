import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const specialties = [
    { name: 'Cardiology', doctors: '14 Doctors', icon: 'bi-heart-pulse' },
    { name: 'Neurology', doctors: '11 Doctors', icon: 'bi-activity' },
    { name: 'Orthopedics', doctors: '12 Doctors', icon: 'bi-bandaid' },
    { name: 'Pediatrics', doctors: '9 Doctors', icon: 'bi-emoji-smile' },
    { name: 'Dermatology', doctors: '8 Doctors', icon: 'bi-shield-check' },
    { name: 'Gynecology', doctors: '10 Doctors', icon: 'bi-gender-female' },
    { name: 'General Practice', doctors: '16 Doctors', icon: 'bi-clipboard2-pulse' },
    { name: 'ENT Specialists', doctors: '7 Doctors', icon: 'bi-soundwave' },
  ];

  const doctorsList = [
    {
      id: 'doc-1',
      name: 'Dr. Anika Sharma',
      specialty: 'Cardiology',
      rating: '4.9',
      fee: '$40',
      initials: 'AS',
      avatarBg: 'bg-emerald-100 text-emerald-800',
      nextSlot: 'Today, 2:30 PM',
      experience: '12 yrs'
    },
    {
      id: 'doc-2',
      name: 'Dr. Rohan Varma',
      specialty: 'Neurology',
      rating: '4.8',
      fee: '$45',
      initials: 'RV',
      avatarBg: 'bg-slate-100 text-slate-700',
      nextSlot: 'Today, 4:00 PM',
      experience: '14 yrs'
    },
    {
      id: 'doc-3',
      name: 'Dr. Lena Petrova',
      specialty: 'Pediatrics',
      rating: '4.9',
      fee: '$30',
      initials: 'LP',
      avatarBg: 'bg-teal-100 text-teal-800',
      nextSlot: 'Today, 3:15 PM',
      experience: '9 yrs'
    },
    {
      id: 'doc-4',
      name: 'Dr. David Chen',
      specialty: 'Orthopedics',
      rating: '4.7',
      fee: '$50',
      initials: 'DC',
      avatarBg: 'bg-emerald-100 text-emerald-800',
      nextSlot: 'Tomorrow, 10:00 AM',
      experience: '16 yrs'
    },
  ];

  const bedCensus = [
    { ward: 'General Ward', total: 60, free: 42, percent: 70, status: '42 free', badgeClass: 'bg-emerald-100 text-emerald-800' },
    { ward: 'Semi-Private', total: 40, free: 18, percent: 55, status: '18 free', badgeClass: 'bg-emerald-100 text-emerald-800' },
    { ward: 'Private Suite', total: 20, free: 6, percent: 70, status: '6 free', badgeClass: 'bg-emerald-100 text-emerald-800' },
    { ward: 'Intensive Care (ICU)', total: 24, free: 2, percent: 92, status: '2 free', badgeClass: 'bg-amber-100 text-amber-800' },
    { ward: 'Emergency Trauma', total: 40, free: 14, percent: 65, status: '14 free', badgeClass: 'bg-emerald-100 text-emerald-800' },
  ];

  const handleBookClick = (docName?: string) => {
    setSelectedDoctor(docName || 'General Consultation');
    setAppointmentModalOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setAppointmentModalOpen(false);
      setBookingSuccess(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* ========================================================
          1. TOP NAVIGATION BAR (Exact Desktop & Mobile Reference)
          ======================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo - Matched to Admin Design System */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#E8F7EE] text-[#16A34A] border border-[#d2f0dd] flex items-center justify-center font-bold text-base shadow-xs">
              <i className="bi bi-plus-lg"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-900 tracking-tight leading-none">
                AAHOC<span className="text-[#16A34A]">Care</span>
              </span>
              <span className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
                Hospital System
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 sm:gap-7 text-[13px] font-semibold text-slate-600">
            <a href="#hero" className="text-[#16A34A] font-bold hover:text-[#15803D] transition-colors">
              Home
            </a>
            <a href="#doctors" className="hover:text-slate-900 transition-colors">
              Doctors
            </a>
            <a href="#beds" className="hover:text-slate-900 transition-colors">
              Find a Bed
            </a>
            <a href="#specialties" className="hover:text-slate-900 transition-colors">
              Appointments
            </a>
            <a href="#trust" className="hover:text-slate-900 transition-colors">
              About
            </a>
            <a href="#facilities" className="hover:text-slate-900 transition-colors">
              Services
            </a>
            <a href="#emergency" className="hover:text-slate-900 transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Global Light/Dark Theme Toggle */}
            <ThemeToggle />

            {/* Notification Bell with Badge */}
            <button
              onClick={() => navigate('/login')}
              className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors relative"
              title="Hospital Alerts & Notices"
            >
              <i className="bi bi-bell text-sm text-amber-600"></i>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            </button>

            {/* Login Link */}
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-[#16A34A] transition-colors"
            >
              Login
            </Link>

            {/* Portal / Sign In Button - Admin Primary Green */}
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
            >
              <span>Staff Portal</span>
              <i className="bi bi-arrow-right"></i>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50"
              aria-label="Toggle Navigation"
            >
              <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'} text-base`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#16A34A] bg-[#E8F7EE] rounded-lg"
            >
              Home
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Doctors
            </a>
            <a
              href="#beds"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Find a Bed
            </a>
            <a
              href="#specialties"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Appointments
            </a>
            <a
              href="#trust"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              About &amp; Services
            </a>
            <a
              href="#emergency"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
            >
              Emergency ER 24/7
            </a>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <Link
                to="/login"
                className="flex-1 text-center py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="flex-1 text-center py-2 rounded-xl bg-[#16A34A] text-white text-sm font-bold shadow-xs"
              >
                Staff Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================
          2. HERO SECTION (Desktop + Mobile Layout)
          ======================================================== */}
      <section id="hero" className="pt-6 pb-8 sm:pt-9 sm:pb-10 bg-gradient-to-b from-emerald-50/30 via-white to-slate-50/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
            {/* Left Column: Heading, Subtitle, Buttons */}
            <div className="lg:col-span-7">
              {/* Badge: Open 24/7 */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F7EE] border border-[#d2f0dd] text-[#16A34A] font-semibold text-xs mb-3.5">
                <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                <span>Open 24/7 &bull; Emergency care available</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Quality healthcare, <br className="hidden sm:inline" />
                whenever you need it.
              </h1>

              {/* Subtitle */}
              <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-lg leading-relaxed font-normal">
                Book appointments with top specialists, check real-time bed availability, and access emergency services in seconds.
              </p>

              {/* Primary Call to Actions */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleBookClick()}
                  className="px-5.5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  Book an Appointment
                </button>
                <a
                  href="#beds"
                  className="px-5.5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-sm shadow-2xs hover:bg-slate-50 transition-all text-center"
                >
                  Find a Bed
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <i className="bi bi-patch-check-fill text-[#16A34A] text-sm"></i>
                  <span>Verified Specialists</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="bi bi-clock-history text-[#16A34A] text-sm"></i>
                  <span>Instant Confirmation</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="bi bi-shield-check text-[#16A34A] text-sm"></i>
                  <span>24/7 Clinical Care</span>
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Graphic / Card (Admin-themed Gradient & Colors) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-tr from-[#064e3b] via-[#047857] to-[#0f766e] p-4 sm:p-5.5 text-white shadow-lg overflow-hidden">
                {/* Decorative background glow circles */}
                <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-white/10 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-emerald-400/20 blur-xl"></div>

                {/* Top Card: Doctor Profile Confirmation */}
                <div className="bg-white rounded-2xl p-3.5 sm:p-4 text-slate-900 shadow-sm mb-3.5 border border-slate-100">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#E8F7EE] text-[#16A34A] text-[11px] font-bold">
                      Booked Online
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Next available: Today, 2:30 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#E8F7EE] text-[#16A34A] font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                      CT
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Dr. Carlos Thorne, MD</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Interventional Cardiology &bull; ★ 4.9 (128 reviews)</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Room: Consultation Suite 3</span>
                    <span className="font-bold text-[#16A34A] flex items-center gap-1">
                      <i className="bi bi-check-circle-fill"></i> Confirmed
                    </span>
                  </div>
                </div>

                {/* Bottom Floating Card: ICU Beds Counter */}
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-white/20 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-emerald-100 font-medium">Critical Care Census</div>
                      <div className="text-base sm:text-lg font-extrabold mt-0.5 text-white">ICU: 2 Beds Available</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold uppercase tracking-wider">
                      Live Watch
                    </span>
                  </div>
                  <div className="w-full bg-white/25 h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div className="bg-amber-300 h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <div className="mt-2 text-[11px] text-emerald-100/90 flex justify-between font-medium">
                    <span>22 of 24 Occupied</span>
                    <span>92% Utilization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FOUR ACTION FEATURE CARDS (Horizontal row from Reference)
          ======================================================== */}
      <section className="py-5 sm:py-6 bg-white border-y border-slate-200/90">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {/* Card 1: Book Appointment */}
            <div
              onClick={() => handleBookClick()}
              className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
            >
              <div className="h-9 w-9 rounded-xl bg-[#E8F7EE] text-[#16A34A] flex items-center justify-center text-base mb-2.5 group-hover:scale-105 transition-transform">
                <i className="bi bi-calendar-check"></i>
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Book Appointment</h3>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Instant confirmation with top doctors
              </p>
            </div>

            {/* Card 2: Find a Bed */}
            <a
              href="#beds"
              className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group block"
            >
              <div className="h-9 w-9 rounded-xl bg-[#E8F7EE] text-[#16A34A] flex items-center justify-center text-base mb-2.5 group-hover:scale-105 transition-transform">
                <i className="bi bi-hospital"></i>
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Find a Bed</h3>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Check real-time bed availability
              </p>
            </a>

            {/* Card 3: Find a Doctor */}
            <a
              href="#doctors"
              className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group block"
            >
              <div className="h-9 w-9 rounded-xl bg-[#E8F7EE] text-[#16A34A] flex items-center justify-center text-base mb-2.5 group-hover:scale-105 transition-transform">
                <i className="bi bi-person-badge"></i>
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Find a Doctor</h3>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                By specialty, rating &amp; experience
              </p>
            </a>

            {/* Card 4: Emergency (Red/Pink Tinted) */}
            <a
              href="#emergency"
              className="bg-rose-50/70 p-4 sm:p-5 rounded-xl border border-rose-200 shadow-2xs hover:shadow-md hover:border-rose-300 transition-all cursor-pointer group block"
            >
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-base mb-2.5 group-hover:scale-105 transition-transform">
                <i className="bi bi-telephone-inbound-fill"></i>
              </div>
              <h3 className="font-bold text-rose-900 text-sm sm:text-base">Emergency</h3>
              <p className="text-xs text-rose-700/80 mt-1 leading-normal">
                Call ER trauma now &bull; 24/7 hotline
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. CARE SEARCH BAR & QUICK FILTERS
          ======================================================== */}
      <section className="py-7 sm:py-8 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Search Care
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <i className="bi bi-search absolute left-3.5 top-3 text-slate-400"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Doctor, specialty or department..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
                />
              </div>
              <button
                onClick={() => handleBookClick()}
                className="px-6 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>

            {/* Filter Pills */}
            <div className="mt-3.5 flex flex-wrap gap-2 text-xs">
              {['Today', 'Online', 'Cardiology', 'Neurology', 'Pediatrics'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag === 'Today' ? '' : tag)}
                  className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#E8F7EE] hover:text-[#16A34A] text-slate-600 font-medium transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. POPULAR SPECIALTIES
          ======================================================== */}
      <section id="specialties" className="py-8 sm:py-10 bg-white border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="text-xs font-bold text-[#16A34A] tracking-wider uppercase">
              Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Popular specialties
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {specialties.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleBookClick(item.name)}
                className="p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-[#E8F7EE]/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-[#E8F7EE] text-[#16A34A] flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#16A34A] transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">{item.doctors}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. DOCTORS AVAILABLE THIS WEEK
          ======================================================== */}
      <section id="doctors" className="py-8 sm:py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
            <div>
              <span className="text-xs font-bold text-[#16A34A] tracking-wider uppercase">
                Doctors On Call
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Doctors available this week
              </h2>
            </div>
            <button
              onClick={() => handleBookClick()}
              className="text-xs sm:text-sm font-bold text-[#16A34A] hover:text-[#15803D] flex items-center gap-1.5 cursor-pointer"
            >
              <span>View all doctors</span>
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {doctorsList.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-slate-200 p-4 sm:p-4.5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3 mb-2.5">
                    <div className={`h-11 w-11 rounded-full ${doc.avatarBg} font-extrabold text-xs flex items-center justify-center flex-shrink-0`}>
                      {doc.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                        {doc.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {doc.specialty} &bull; <i className="bi bi-star-fill text-amber-500 text-[10px]"></i> {doc.rating}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Consultation Fee:</span>
                      <span className="font-bold text-slate-800">{doc.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Next Available:</span>
                      <span className="font-medium text-[#16A34A]">{doc.nextSlot}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBookClick(doc.name)}
                  className="w-full py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          7. INPATIENT CENSUS: SEE OPEN BEDS BEFORE YOU ARRIVE
          ======================================================== */}
      <section id="beds" className="py-8 sm:py-10 bg-white border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
            <div>
              <span className="text-xs font-bold text-[#16A34A] tracking-wider uppercase">
                Inpatient Census
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                See open beds before you arrive
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Real-time bed counts updated every 60 seconds across all inpatient wards.
              </p>
            </div>
            <button
              onClick={() => handleBookClick('Inpatient Bed Intake')}
              className="px-4.5 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
            >
              View Available Beds
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {bedCensus.map((b, idx) => (
              <div key={idx} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="w-full sm:w-48">
                  <h4 className="font-bold text-slate-900 text-sm">{b.ward}</h4>
                  <span className="text-xs text-slate-400">{b.total} Total Staffed Beds</span>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 sm:px-6">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        b.percent > 90 ? 'bg-amber-500' : 'bg-[#16A34A]'
                      }`}
                      style={{ width: `${b.percent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Occupancy: {b.percent}%</span>
                    <span>{b.total - b.free} Occupied</span>
                  </div>
                </div>

                {/* Status Pill Badge */}
                <div className="self-end sm:self-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${b.badgeClass}`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          8. CARE YOU CAN TRUST (6 Features from Reference)
          ======================================================== */}
      <section id="trust" className="py-8 sm:py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#16A34A] tracking-wider uppercase">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Care you can trust
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="h-9 w-9 rounded-xl bg-[#E8F7EE] text-[#16A34A] flex items-center justify-center text-base mb-2.5">
                <i className="bi bi-person-check-fill"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Experienced doctors</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Board-certified specialists with over 10+ years of clinical excellence in acute and preventive medicine.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="h-9 w-9 rounded-xl bg-[#E8F7EE] text-[#16A34A] flex items-center justify-center text-base mb-2.5">
                <i className="bi bi-clock-fill"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">24/7 emergency support</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Dedicated Level 1 trauma resuscitation teams and acute care on standby every minute of the day.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="h-9 w-9 rounded-xl bg-[#E8F7EE] text-[#16A34A] flex items-center justify-center text-base mb-2.5">
                <i className="bi bi-lightning-charge-fill"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Simple booking</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Reserve appointments and pre-register beds online in under 2 minutes with zero paper delays.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="h-9 w-9 rounded-xl bg-[#E8F7EE] text-[#16A34A] flex items-center justify-center text-base mb-2.5">
                <i className="bi bi-shield-lock-fill"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Secure records</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                HIPAA-compliant encrypted digital charts ensuring your personal medical records remain confidential.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="h-9 w-9 rounded-xl bg-[#E8F7EE] text-[#16A34A] flex items-center justify-center text-base mb-2.5">
                <i className="bi bi-receipt-cutoff"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Transparent pricing</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Direct insurance adjudication with clear copay estimates and no hidden administrative surcharges.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="h-9 w-9 rounded-xl bg-[#E8F7EE] text-[#16A34A] flex items-center justify-center text-base mb-2.5">
                <i className="bi bi-cpu-fill"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Modern technology</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                AI-assisted hospital operations coordinator predicting arrivals and expediting diagnostic lab results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. FOUR STEPS TO CARE
          ======================================================== */}
      <section className="py-8 sm:py-10 bg-white border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#16A34A] tracking-wider uppercase">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Four steps to care
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 relative">
              <div className="text-2xl font-black text-[#16A34A] mb-1.5">01</div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Find your specialist</h4>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Search verified consultants by clinical department and schedule.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 relative">
              <div className="text-2xl font-black text-[#16A34A] mb-1.5">02</div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Choose time or bed</h4>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Select your preferred consultation time slot or inpatient bed ward.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 relative">
              <div className="text-2xl font-black text-[#16A34A] mb-1.5">03</div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Confirm your booking</h4>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Instant digital SMS and email confirmation sent to your phone.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 relative">
              <div className="text-2xl font-black text-[#16A34A] mb-1.5">04</div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Receive care</h4>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Check in seamlessly at the front desk with zero waiting friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. EMERGENCY BANNER (From Reference)
          ======================================================== */}
      <section id="emergency" className="py-6 sm:py-8 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-800 font-extrabold text-xs uppercase tracking-wider">
                Emergency Priority
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-rose-950 mt-1.5">
                Need emergency care?
              </h3>
              <p className="text-xs sm:text-sm text-rose-800 mt-0.5 max-w-xl">
                Our Level 1 Trauma Center and emergency surgical suites operate 24 hours a day, 7 days a week.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="tel:911"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-xs transition-colors text-center"
              >
                <i className="bi bi-telephone-fill"></i>
                <span>Emergency Call Now</span>
              </a>
              <button
                onClick={() => handleBookClick('Emergency Trauma Intake')}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white border border-rose-300 hover:bg-rose-100/50 text-rose-900 font-bold text-sm transition-colors text-center cursor-pointer"
              >
                Locate Emergency Room
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          11. TESTIMONIALS: TRUSTED BY FAMILIES
          ======================================================== */}
      <section className="py-8 sm:py-10 bg-white border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#16A34A] tracking-wider uppercase">
              Patient Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Trusted by families
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex text-amber-500 gap-1 text-xs mb-2.5">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;Booking an emergency bed for my father took less than 3 minutes. The hospital team was completely prepped when our ambulance arrived.&rdquo;
              </p>
              <div className="mt-3.5 pt-2.5 border-t border-slate-200/80">
                <div className="font-bold text-slate-900 text-xs">Sarah Jenkins</div>
                <div className="text-[11px] text-[#16A34A] font-medium">Verified Inpatient Family</div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex text-amber-500 gap-1 text-xs mb-2.5">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;Dr. Sharma diagnosed my heart condition accurately and coordinated tests without any waiting time. Highly organized hospital staff.&rdquo;
              </p>
              <div className="mt-3.5 pt-2.5 border-t border-slate-200/80">
                <div className="font-bold text-slate-900 text-xs">Michael Torres</div>
                <div className="text-[11px] text-[#16A34A] font-medium">Cardiology Patient</div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex text-amber-500 gap-1 text-xs mb-2.5">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;The real-time bed count and transparent queue status gave our family peace of mind during urgent admission. Remarkable experience.&rdquo;
              </p>
              <div className="mt-3.5 pt-2.5 border-t border-slate-200/80">
                <div className="font-bold text-slate-900 text-xs">Emily Zhang</div>
                <div className="text-[11px] text-[#16A34A] font-medium">Pediatric Care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          12. EVERYTHING UNDER ONE ROOF (Facilities)
          ======================================================== */}
      <section id="facilities" className="py-8 sm:py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <span className="text-xs font-bold text-[#16A34A] tracking-wider uppercase">
              Facilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Everything under one roof
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-slate-700">
            {[
              'Intensive Care Unit (ICU)',
              'Telemedicine Consultations',
              '24/7 Central Pharmacy',
              'Diagnostic Pathology Lab',
              'Modern Surgical Theatres',
              'Rapid Inpatient Admissions',
              'Blood Bank & Transfusion',
              'Ambulatory Care Center'
            ].map((facility, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2 hover:border-emerald-300 transition-colors"
              >
                <i className="bi bi-check2 text-[#16A34A] text-sm"></i>
                <span>{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          13. CALL TO ACTION BANNER (Admin Charcoal/Slate Dark Theme)
          ======================================================== */}
      <section className="py-10 sm:py-14 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Your health comes first.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            We are here for you around the clock with top clinical specialists and immediate hospital admissions.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleBookClick()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
            <a
              href="#beds"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-transparent border border-white/40 hover:bg-white/10 text-white font-bold text-sm transition-colors text-center"
            >
              Find a Bed
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          14. FOOTER (Dark Navy/Slate)
          ======================================================== */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="text-white font-bold text-base mb-3 flex items-center gap-2">
                <i className="bi bi-plus-circle-fill text-emerald-500"></i> AAHOC Health
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Hospital Operations &amp; Clinical Healthcare System providing comprehensive emergency and inpatient services.
              </p>
              <div className="mt-3 text-white font-semibold">
                Emergency: <span className="text-red-400 font-bold">+1 (800) 247-CARE</span>
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Hospital
              </h5>
              <ul className="space-y-2">
                <li><a href="#hero" className="hover:text-white transition-colors">Home Overview</a></li>
                <li><a href="#doctors" className="hover:text-white transition-colors">Doctors Directory</a></li>
                <li><a href="#specialties" className="hover:text-white transition-colors">Specialties</a></li>
                <li><a href="#trust" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Clinical Services
              </h5>
              <ul className="space-y-2">
                <li><a href="#emergency" className="hover:text-white transition-colors">Emergency Triage</a></li>
                <li><a href="#beds" className="hover:text-white transition-colors">Inpatient Beds</a></li>
                <li><a href="#facilities" className="hover:text-white transition-colors">Central Pharmacy</a></li>
                <li><a href="#facilities" className="hover:text-white transition-colors">Diagnostic Lab</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Staff &amp; Administration
              </h5>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
                    Staff Portal Login &rarr;
                  </Link>
                </li>
                <li><Link to="/login" className="hover:text-white transition-colors">Doctor Panel</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Nurse Panel</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Operations Command</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <span>&copy; {new Date().getFullYear()} AAHOC Hospital Operations Coordinator. All rights reserved.</span>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>HIPAA Compliance</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================
          15. MOBILE STICKY BOTTOM BAR (From Mobile Reference Image)
          ======================================================== */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center gap-2 shadow-lg">
        <button
          onClick={() => handleBookClick()}
          className="flex-1 py-2.5 rounded-xl bg-[#16A34A] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs cursor-pointer"
        >
          <span>Book</span>
        </button>
        <a
          href="#beds"
          className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center text-center"
        >
          <span>Find Bed</span>
        </a>
        <a
          href="tel:911"
          className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-black text-xs flex items-center justify-center gap-1 shadow-xs"
        >
          <span>SOS</span>
        </a>
      </div>

      {/* ========================================================
          16. QUICK APPOINTMENT BOOKING MODAL
          ======================================================== */}
      {appointmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#E8F7EE] text-[#16A34A] flex items-center justify-center text-sm font-bold">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <h3 className="font-bold text-slate-900 text-base">Book Clinical Care</h3>
              </div>
              <button
                onClick={() => setAppointmentModalOpen(false)}
                className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center">
                <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mx-auto mb-3">
                  <i className="bi bi-check-lg"></i>
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Booking Confirmed!</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Your appointment request for <strong>{selectedDoctor}</strong> has been confirmed. SMS confirmation sent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specialist / Service
                  </label>
                  <input
                    type="text"
                    value={selectedDoctor || 'General Consultation'}
                    readOnly
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm shadow-sm transition-colors cursor-pointer"
                >
                  Confirm Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};