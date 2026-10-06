import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  CalendarCheck,
  Search,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminAttendance: React.FC = () => {
  const { attendance, users, markAttendance } = useGymData();

  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    // Find member by ID or qrCode or name
    const found = users.find(
      (u) =>
        u.id.toLowerCase() === scanInput.trim().toLowerCase() ||
        (u.qrCode && u.qrCode.toLowerCase() === scanInput.trim().toLowerCase()) ||
        u.name.toLowerCase().includes(scanInput.trim().toLowerCase()) ||
        u.mobile.includes(scanInput.trim())
    );

    if (!found) {
      setScanResult({
        success: false,
        message: `Member not found matching "${scanInput}". Please verify ID or QR code.`,
      });
      return;
    }

    const res = markAttendance(found.id, 'admin_manual');
    setScanResult(res);

    if (res.success) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#ff5500', '#22c55e', '#ffffff'],
      });
    }

    setScanInput('');
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayScans = attendance.filter((a) => a.date === todayStr);

  return (
    <DashboardLayout
      activeRole="admin"
      title="Optical Turnstile Scanner & Attendance Log"
      subtitle="Live turnstile gate control, manual RFID bypass, and daily check-in reports."
    >
      <div className="space-y-6">
        {/* Scanner Simulator Box */}
        <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-500 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase">Turnstile Scanner Terminal</h3>
              <p className="text-xs text-neutral-400">
                Simulate optical barcode/QR scan or enter Member ID / Phone number to record instant check-in
              </p>
            </div>
          </div>

          <form onSubmit={handleScanSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="Scan or enter QR Code, Member ID (e.g. GYMCORE-MEM-2026-77889 or Aman)..."
              className="flex-1 px-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-orange-500 focus:outline-none"
            />
            <button
              type="submit"
              className="py-3 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-orange-500/20"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Simulate Turnstile Gate</span>
            </button>
          </form>

          {scanResult && (
            <div
              className={`p-4 rounded-2xl text-xs flex items-center gap-3 animate-in fade-in ${
                scanResult.success
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/10 border border-red-500/30 text-red-300'
              }`}
            >
              {scanResult.success ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              )}
              <span className="font-semibold">{scanResult.message}</span>
            </div>
          )}
        </div>

        {/* Attendance Activity Table */}
        <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Turnstile Access Records ({attendance.length})
            </h4>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              {todayScans.length} Check-ins Today
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Member Name</th>
                  <th className="py-3 px-3">Check-In</th>
                  <th className="py-3 px-3">Check-Out</th>
                  <th className="py-3 px-3">Entry Device</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {attendance.map((att) => (
                  <tr key={att.id} className="hover:bg-neutral-900/50">
                    <td className="py-3 px-3 font-mono font-bold text-white">{att.date}</td>
                    <td className="py-3 px-3 font-bold text-white">{att.userName}</td>
                    <td className="py-3 px-3 font-mono text-emerald-400">{att.checkInTime}</td>
                    <td className="py-3 px-3 font-mono text-neutral-400">{att.checkOutTime || '—'}</td>
                    <td className="py-3 px-3 text-[11px] text-neutral-400 capitalize">
                      {att.markedBy.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {att.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
