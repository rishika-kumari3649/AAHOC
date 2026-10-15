import React, { useState } from 'react';
import {
  Heart,
  Thermometer,
  Activity,
  Wind,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  BedDouble,
  Search,
  Plus
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import type { TriageCategory } from '../../types';

export const PatientPrioritisationPage: React.FC = () => {
  const { triagePatients, addTriagePatient } = useHospital();

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(45);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [symptoms, setSymptoms] = useState('');
  const [painLevel, setPainLevel] = useState<number>(5);
  const [heartRate, setHeartRate] = useState<number>(85);
  const [bloodPressure, setBloodPressure] = useState('120/80');
  const [spO2, setSpO2] = useState<number>(98);
  const [temperature, setTemperature] = useState<number>(37.0);
  const [respiratoryRate, setRespiratoryRate] = useState<number>(18);
  const [assignedWard, setAssignedWard] = useState('ED Acute Care');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !symptoms) return;

    addTriagePatient({
      name,
      age: Number(age),
      gender,
      symptoms,
      painLevel: Number(painLevel),
      vitalSigns: {
        heartRate: Number(heartRate),
        bloodPressure,
        spO2: Number(spO2),
        temperature: Number(temperature),
        respiratoryRate: Number(respiratoryRate),
      },
      assignedWard,
    });

    // Reset and close
    setName('');
    setSymptoms('');
    setPainLevel(5);
    setHeartRate(85);
    setBloodPressure('120/80');
    setSpO2(98);
    setTemperature(37.0);
    setRespiratoryRate(18);
    setShowAddModal(false);
  };

  const getUrgencyBadge = (_category: TriageCategory, level: number) => {
    switch (level) {
      case 1:
        return {
          bg: 'bg-rose-100 text-rose-700 border-rose-200',
          label: 'Priority 1 (Resuscitation)',
          cardBorder: 'border-l-4 border-l-rose-500',
        };
      case 2:
        return {
          bg: 'bg-orange-100 text-orange-700 border-orange-200',
          label: 'Priority 2 (Emergent)',
          cardBorder: 'border-l-4 border-l-orange-500',
        };
      case 3:
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-200',
          label: 'Priority 3 (Urgent)',
          cardBorder: 'border-l-4 border-l-amber-500',
        };
      case 4:
        return {
          bg: 'bg-sky-100 text-sky-700 border-sky-200',
          label: 'Priority 4 (Semi-Urgent)',
          cardBorder: 'border-l-4 border-l-sky-500',
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          label: 'Priority 5 (Non-Urgent)',
          cardBorder: 'border-l-4 border-l-slate-400',
        };
    }
  };

  const filteredPatients = triagePatients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 select-none pb-12">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <span>Patient Prioritisation</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
              AI Triage Support
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Machine learning urgency scoring based on clinical vitals & symptom distress. Final decision with healthcare professional.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Patient Triage Intake</span>
        </button>
      </div>

      {/* Resource Context Row: Beds ready */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <BedDouble className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">ED Resus & Acute Spaces</div>
            <div className="text-lg font-black text-slate-900">
              6 of 40 available
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Staffed ICU Critical Beds</div>
            <div className="text-lg font-black text-rose-600">
              1 bed remaining
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Avg Triage Queue Time</div>
            <div className="text-lg font-black text-slate-900">
              11 mins
            </div>
          </div>
        </div>
      </div>

      {/* Search & Queue Header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-bold text-slate-900">
          Prioritised Triage Queue ({filteredPatients.length} Patients Waiting)
        </h2>
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search queue..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Triage Patients Cards List */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => {
          const badge = getUrgencyBadge(patient.triageCategory, patient.urgencyLevel);
          return (
            <div
              key={patient.id}
              className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all ${badge.cardBorder}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Patient Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {patient.id}
                    </span>
                    <span className="text-base font-black text-slate-900">
                      {patient.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {patient.age} yrs • {patient.gender}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}
                    >
                      {badge.label}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Arrived {patient.arrivalTime} ({patient.waitingMins}m wait)
                    </span>
                  </div>

                  {/* Symptoms & Pain */}
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold text-slate-900 mr-1.5">Chief Complaint:</span>
                    <span>{patient.symptoms}</span>
                    <span className="ml-3 font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full text-[11px]">
                      Pain Level: {patient.painLevel}/10
                    </span>
                  </div>

                  {/* Vital Signs Grid */}
                  <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap pt-1">
                    <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span className="font-semibold">{patient.vitalSigns.heartRate}</span>
                      <span className="text-[10px] text-slate-400">bpm</span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <Activity className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="font-semibold">{patient.vitalSigns.bloodPressure}</span>
                      <span className="text-[10px] text-slate-400">BP</span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <Wind className="w-3.5 h-3.5 text-sky-500" />
                      <span className={`font-semibold ${patient.vitalSigns.spO2 < 92 ? 'text-rose-600' : ''}`}>
                        {patient.vitalSigns.spO2}%
                      </span>
                      <span className="text-[10px] text-slate-400">SpO₂</span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-semibold">{patient.vitalSigns.temperature}°C</span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] font-semibold">RR:</span>
                      <span className="font-semibold">{patient.vitalSigns.respiratoryRate}</span>
                      <span className="text-[10px] text-slate-400">/min</span>
                    </div>
                  </div>
                </div>

                {/* Right: AI Explanation & Human sign-off */}
                <div className="lg:max-w-md w-full bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>ML Risk Scoring Factors</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {patient.reasoning}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200/60 pt-2 text-xs">
                    <span className="text-slate-500 font-medium">
                      Assigned: <span className="font-bold text-slate-800">{patient.assignedWard || 'Unassigned'}</span>
                    </span>
                    <button className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs shadow-2xs transition-colors flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Confirm Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add Patient Intake */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  New Patient Triage Intake
                </h3>
                <p className="text-xs text-slate-400">
                  Input patient vitals; ML model will score urgency category in real-time.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Demographics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={110}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | 'Other')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Presenting Symptoms / Chief Complaint
                </label>
                <textarea
                  required
                  rows={2}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. Sudden severe retrosternal chest tightness with shortness of breath..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Pain Scale Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <label className="font-bold text-slate-700">
                    Subjective Pain Level (1 to 10)
                  </label>
                  <span className="font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    {painLevel} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Vital Signs Grid */}
              <div className="pt-2 border-t border-slate-100">
                <span className="block text-xs font-bold text-slate-900 mb-2">
                  Recorded Clinical Vital Signs
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Heart Rate (BPM)
                    </label>
                    <input
                      type="number"
                      required
                      value={heartRate}
                      onChange={(e) => setHeartRate(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Blood Pressure
                    </label>
                    <input
                      type="text"
                      required
                      value={bloodPressure}
                      onChange={(e) => setBloodPressure(e.target.value)}
                      placeholder="120/80"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Oxygen SpO₂ (%)
                    </label>
                    <input
                      type="number"
                      required
                      min={70}
                      max={100}
                      value={spO2}
                      onChange={(e) => setSpO2(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Temperature (°C)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Resp Rate (/min)
                    </label>
                    <input
                      type="number"
                      required
                      value={respiratoryRate}
                      onChange={(e) => setRespiratoryRate(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Target Area
                    </label>
                    <select
                      value={assignedWard}
                      onChange={(e) => setAssignedWard(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="ED Resus Bay">ED Resus Bay</option>
                      <option value="ED Acute Bay">ED Acute Bay</option>
                      <option value="ED Minor Care">ED Minor Care</option>
                      <option value="Assessment Room">Assessment Room</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run ML Urgency Scoring & Enqueue</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default PatientPrioritisationPage;
