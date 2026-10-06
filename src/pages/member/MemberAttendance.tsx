import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import { QrCodePass } from '../../components/ui/QrCodePass';
import {
  CalendarCheck,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Award,
} from 'lucide-react';

export const MemberAttendance: React.FC = () => {
  const { user } = useAuth();
  const { attendance } = useGymData();

  const currentUser = user || {
    id: 'usr_member_1',
    name: 'Aman Verma',
    email: 'aman.verma@example.com',
    mobile: '+91 98290 77889',
    role: 'member' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    membershipPlanName: 'PRO ATHLETE (3-Month)',
    membershipStatus: 'active' as const,
    membershipExpiresAt: '2026-12-15',
    qrCode: 'GYMCORE-MEM-2026-77889',
  };

  const userLogs = attendance.filter((a) => a.userId === currentUser.id);

  // Generate calendar representation for October 2026 (days 1 to 31)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const attendedDays = userLogs.map((a) => parseInt(a.date.split('-')[2], 10));

  return (
    <DashboardLayout
      activeRole="member"
      title="Attendance & Access Pass"
      subtitle="Digital contactless check-ins, monthly attendance percentage, and streak records."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Digital Access Pass */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">
              Contactless Entry
            </span>
            <h3 className="text-xl font-black text-white uppercase">Your Digital Gym Pass</h3>
            <p className="text-xs text-neutral-400">
              Hold this QR pass to the optical reader on the Neota turnstile gates.
            </p>
          </div>

          <QrCodePass user={currentUser} />

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs text-neutral-400">
            <span className="font-bold text-white uppercase text-[10px] tracking-wider block">
              Turnstile Instructions
            </span>
            <p className="leading-snug">
              • Screen brightness will automatically optimize on mobile scan.
            </p>
            <p className="leading-snug">
              • Turnstile unlocks green within 0.3 seconds.
            </p>
            <p className="leading-snug">
              • Duplicate scans within 15 minutes are prevented for security.
            </p>
          </div>
        </div>

        {/* Right Column: Attendance Statistics & Monthly Heatmap */}
        <div className="lg:col-span-7 space-y-6">
          {/* Consistency Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Days Attended</span>
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">{userLogs.length}</span>
              <span className="text-[10px] text-neutral-400 block">October 2026</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Monthly Rate</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">92%</span>
              <span className="text-[10px] text-emerald-400 block">Consistent</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Current Streak</span>
              <span className="text-2xl sm:text-3xl font-black text-orange-500 font-mono">5 Days</span>
              <span className="text-[10px] text-orange-400 block font-semibold">Active 🔥</span>
            </div>
          </div>

          {/* Calendar Heatmap */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                October 2026 Activity Heatmap
              </h4>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Attended Check-in
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, dIdx) => (
                <div key={dIdx} className="text-center text-[10px] font-bold text-neutral-500 font-mono">
                  {day}
                </div>
              ))}

              {daysInMonth.map((dayNum) => {
                const attended = attendedDays.includes(dayNum);
                const isToday = dayNum === 4;
                return (
                  <div
                    key={dayNum}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-mono font-bold transition-colors ${
                      attended
                        ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                        : isToday
                        ? 'border-2 border-orange-500 bg-neutral-900 text-white'
                        : 'bg-neutral-900/60 border border-neutral-800 text-neutral-500'
                    }`}
                  >
                    <span>{dayNum}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Check-In History Log */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Recent Check-in Timestamps
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Check-In</th>
                    <th className="py-2.5 px-3">Check-Out</th>
                    <th className="py-2.5 px-3">Method</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                  {userLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-neutral-900/50">
                      <td className="py-2.5 px-3 font-mono font-bold text-white">{log.date}</td>
                      <td className="py-2.5 px-3 font-mono text-emerald-400">{log.checkInTime}</td>
                      <td className="py-2.5 px-3 font-mono text-neutral-400">{log.checkOutTime || '—'}</td>
                      <td className="py-2.5 px-3 text-[11px] text-neutral-400 capitalize">
                        {log.markedBy.replace('_', ' ')}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
