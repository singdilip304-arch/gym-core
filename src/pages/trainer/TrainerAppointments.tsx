import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  UserCheck,
} from 'lucide-react';

export const TrainerAppointments: React.FC = () => {
  const { user } = useAuth();
  const { trainerBookings, updateTrainerBookingStatus, trainers } = useGymData();

  const trainerProfile =
    trainers.find((t) => t.userId === user?.id || t.name === user?.name) || trainers[0];

  const appointments = trainerBookings.filter(
    (b) => b.trainerId === trainerProfile.id || b.trainerName === trainerProfile.name
  );

  return (
    <DashboardLayout
      activeRole="trainer"
      title="Client Appointments & Availability"
      subtitle="Manage private consultations, 1RM strength audits, and personal training slots."
    >
      <div className="space-y-6">
        {/* Availability Strip */}
        <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider font-mono">
              Working Availability
            </span>
            <h3 className="text-lg font-black text-white uppercase">Active Coaching Hours</h3>
            <p className="text-xs text-neutral-400">
              Slots: {trainerProfile.availableSlots.join(' • ')}
            </p>
          </div>

          <div className="flex flex-wrap gap-1 text-xs">
            {trainerProfile.availableDays.map((d) => (
              <span
                key={d}
                className="px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-orange-400 font-bold font-mono"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Appointments Table */}
        <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Client Bookings Queue
            </h4>
            <span className="text-[11px] text-neutral-500 font-mono">
              {appointments.length} Total Appointments
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Client Name</th>
                  <th className="py-3 px-3">Session Type</th>
                  <th className="py-3 px-3">Date & Time</th>
                  <th className="py-3 px-3">Phone</th>
                  <th className="py-3 px-3">Notes</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-neutral-900/50">
                    <td className="py-3 px-3 font-bold text-white">{appt.userName}</td>
                    <td className="py-3 px-3 text-orange-400 font-semibold">{appt.sessionType}</td>
                    <td className="py-3 px-3 font-mono font-bold text-white">
                      {appt.date} • {appt.timeSlot}
                    </td>
                    <td className="py-3 px-3 font-mono text-neutral-400">{appt.userPhone}</td>
                    <td className="py-3 px-3 text-neutral-400 italic text-[11px] max-w-xs truncate">
                      {appt.notes || 'No specific notes'}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          appt.status === 'confirmed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : appt.status === 'completed'
                            ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => updateTrainerBookingStatus(appt.id, 'completed')}
                          className="px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase border border-emerald-500/30 cursor-pointer"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => updateTrainerBookingStatus(appt.id, 'cancelled')}
                          className="px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-[10px] uppercase border border-red-500/30 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
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
