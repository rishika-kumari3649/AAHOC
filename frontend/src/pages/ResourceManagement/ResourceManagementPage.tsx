import React, { useState } from 'react';
import {
  Stethoscope
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import type { BedItem } from '../../types';

export const ResourceManagementPage: React.FC = () => {
  const { metrics, beds, equipment, updateBedStatus } = useHospital();
  const [selectedWard, setSelectedWard] = useState<string>('All');
  const [selectedBed, setSelectedBed] = useState<BedItem | null>(null);

  const wards = ['All', 'Emergency Department', 'ICU', 'Ward A', 'Ward B'];

  const filteredBeds = beds.filter((b) => {
    if (selectedWard === 'All') return true;
    return b.ward === selectedWard;
  });

  const getStatusColor = (status: BedItem['status']) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-500 border-emerald-600 text-white';
      case 'occupied':
        return 'bg-slate-800 border-slate-900 text-white';
      case 'reserved':
        return 'bg-amber-500 border-amber-600 text-white';
      case 'cleaning':
        return 'bg-indigo-500 border-indigo-600 text-white';
      default:
        return 'bg-slate-400 text-white';
    }
  };

  return (
    <div className="space-y-8 select-none pb-12">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Bed & Resource Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time physical capacity monitoring, ward matrix telemetry, and critical equipment tracking.
        </p>
      </div>

      {/* Capacity KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Inpatient Beds */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Inpatient Beds Total
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mb-2">
            {metrics.inpatientBedsOccupied} <span className="text-sm font-normal text-slate-400">/ {metrics.inpatientBedsTotal}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
            <div
              className="bg-[#7C3AED] h-full rounded-full"
              style={{ width: `${metrics.inpatientOccupancyRate}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {metrics.inpatientOccupancyRate}% Occupancy ({metrics.inpatientBedsTotal - metrics.inpatientBedsOccupied} Available)
          </div>
        </div>

        {/* ICU Critical Capacity */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            ICU Critical Capacity
          </div>
          <div className="text-3xl font-extrabold text-rose-600 mb-2">
            18 <span className="text-sm font-normal text-slate-400">/ 20</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
            <div className="bg-rose-500 h-full rounded-full" style={{ width: '90%' }} />
          </div>
          <div className="text-xs text-rose-600 font-semibold flex items-center justify-between">
            <span>90% Current Occupancy</span>
            <span className="text-[10px] bg-rose-50 px-1.5 py-0.5 rounded">Critically Low</span>
          </div>
        </div>

        {/* Predicted ICU Occupancy */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            ML Predicted ICU (4h)
          </div>
          <div className="text-3xl font-extrabold text-amber-600 mb-2">
            98%
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '98%' }} />
          </div>
          <div className="text-xs text-amber-700 font-semibold">
            High Congestion Risk (+2 Inbound)
          </div>
        </div>

        {/* Emergency Spaces */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            ED Treatment Spaces
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mb-2">
            {metrics.edCapacityOccupied} <span className="text-sm font-normal text-slate-400">/ {metrics.edCapacityTotal}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
            <div
              className="bg-[#10B981] h-full rounded-full"
              style={{ width: `${metrics.edOccupancyRate}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {metrics.edOccupancyRate}% Occupied (6 Spaces Free)
          </div>
        </div>
      </div>

      {/* Visual Bed Matrix Section */}
      <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Interactive Bed Matrix Telemetry
            </h2>
            <p className="text-xs text-slate-400">Click any bed node to inspect patient allocation or change room status.</p>
          </div>

          {/* Filter by Ward */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-2xl">
            {wards.map((ward) => (
              <button
                key={ward}
                onClick={() => setSelectedWard(ward)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedWard === ward
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {ward}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 text-xs text-slate-600 font-medium border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-slate-800" />
            <span>Occupied ({beds.filter(b => b.status === 'occupied').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-emerald-500" />
            <span>Available ({beds.filter(b => b.status === 'available').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-amber-500" />
            <span>Reserved ({beds.filter(b => b.status === 'reserved').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-indigo-500" />
            <span>Cleaning / Sanitizing</span>
          </div>
        </div>

        {/* Bed Grid Nodes */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5">
          {filteredBeds.map((bed) => {
            const isSelected = selectedBed?.id === bed.id;
            return (
              <div
                key={bed.id}
                onClick={() => setSelectedBed(bed)}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                  getStatusColor(bed.status)
                } ${isSelected ? 'ring-3 ring-emerald-400 scale-105' : 'hover:opacity-90'}`}
              >
                <div className="text-[10px] font-bold tracking-tight opacity-80 truncate">
                  {bed.ward.replace('Department', '').replace('General', '')}
                </div>
                <div className="text-xs font-black mt-0.5">{bed.bedNumber}</div>
              </div>
            );
          })}
        </div>

        {/* Selected Bed Quick Drawer / Modal */}
        {selectedBed && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-900 text-sm mr-2">{selectedBed.bedNumber}</span>
              <span className="text-slate-500">({selectedBed.ward})</span>
              <div className="text-slate-600 mt-1">
                Status: <span className="font-bold uppercase text-slate-800">{selectedBed.status}</span>
                {selectedBed.patientName && ` • Patient: ${selectedBed.patientName}`}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Quick Set:</span>
              <button
                onClick={() => updateBedStatus(selectedBed.id, 'available')}
                className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200"
              >
                Available
              </button>
              <button
                onClick={() => updateBedStatus(selectedBed.id, 'occupied')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
              >
                Occupied
              </button>
              <button
                onClick={() => updateBedStatus(selectedBed.id, 'reserved')}
                className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-bold hover:bg-amber-200"
              >
                Reserved
              </button>
              <button
                onClick={() => setSelectedBed(null)}
                className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Critical Equipment Availability Table */}
      <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Critical Life-Support & Clinical Equipment
            </h2>
            <p className="text-xs text-slate-400">Monitored essential devices across all high-acuity zones</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="pb-3 font-semibold">Equipment Name</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Total Stock</th>
                <th className="pb-3 font-semibold">Currently In Use</th>
                <th className="pb-3 font-semibold">Available Units</th>
                <th className="pb-3 font-semibold">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {equipment.map((eq) => {
                const isWatch = eq.status === 'Watch';
                return (
                  <tr key={eq.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 font-bold text-slate-800 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-slate-400" />
                      <span>{eq.name}</span>
                    </td>
                    <td className="py-3.5 text-slate-500 font-medium">{eq.category}</td>
                    <td className="py-3.5 font-semibold text-slate-900">{eq.total}</td>
                    <td className="py-3.5 text-slate-700 font-medium">{eq.inUse}</td>
                    <td className="py-3.5 font-black text-slate-900">{eq.available}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          isWatch
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {eq.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ResourceManagementPage;
