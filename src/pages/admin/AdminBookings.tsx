import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  User,
  Filter,
  Search,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminBookings: React.FC = () => {
  const {
    trainerBookings,
    updateTrainerBookingStatus,
    freeTrials,
    updateFreeTrialStatus,
    trainers,
  } = useGymData();

  const [activeTab, setActiveTab] = useState<'trials' | 'trainer'>('trials');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTrials = freeTrials.filter((t) => {
    const matchSearch =
      t.fullName.toLowerCase().includes(search.toLowerCase()) ||
      t.mobile.includes(search) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.bookingCode.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const filteredTrainerBookings = trainerBookings.filter((b) => {
    const matchSearch =
      b.userName.toLowerCase().includes(search.toLowerCase()) ||
      b.trainerName.toLowerCase().includes(search.toLowerCase()) ||
      b.notes?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleApproveTrial = (id: string) => {
    updateFreeTrialStatus(id, 'confirmed');
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#10b981'],
    });
  };

  const handleCompleteTrial = (id: string) => {
    updateFreeTrialStatus(id, 'attended');
  };

  const handleCancelTrial = (id: string) => {
    updateFreeTrialStatus(id, 'cancelled');
  };

  const handleUpdateTrainerBooking = (
    id: string,
    status: 'confirmed' | 'completed' | 'cancelled'
  ) => {
    updateTrainerBookingStatus(id, status);
    if (status === 'confirmed') {
      confetti({ particleCount: 40, spread: 50, colors: ['#ff5500', '#3b82f6'] });
    }
  };

  return (
    <DashboardLayout
      activeRole="admin"
      title="Bookings & Free Trial Desk"
      subtitle="Verify incoming 1-day free trial passes and personal coaching appointments."
    >
      <div className="space-y-6">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
              Total Trial Requests
            </span>
            <div className="text-2xl font-black text-white mt-1">{freeTrials.length}</div>
            <p className="text-xs text-orange-400 mt-1">
              {freeTrials.filter((t) => t.status === 'pending').length} Pending Approval
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
              Active Trainer Sessions
            </span>
            <div className="text-2xl font-black text-white mt-1">{trainerBookings.length}</div>
            <p className="text-xs text-blue-400 mt-1">
              {trainerBookings.filter((b) => b.status === 'confirmed').length} Confirmed
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
              Trial Conversion Rate
            </span>
            <div className="text-2xl font-black text-emerald-400 mt-1">68.4%</div>
            <p className="text-xs text-neutral-400 mt-1">Free trial to paid member</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
              Coaches Available
            </span>
            <div className="text-2xl font-black text-white mt-1">{trainers.length}</div>
            <p className="text-xs text-neutral-400 mt-1">Jaipur Mahindra SEZ Campus</p>
          </div>
        </div>

        {/* Tab Selection & Search Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('trials')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'trials'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Free Trials ({freeTrials.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('trainer')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'trainer'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Personal Training ({trainerBookings.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Search name, phone, code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Tab 1: Free Trial Requests */}
        {activeTab === 'trials' && (
          <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-950">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Pass Code</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Slot Date & Time</th>
                    <th className="py-3 px-4">Goal & Details</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {filteredTrials.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-neutral-500">
                        No free trial requests found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredTrials.map((trial) => (
                      <tr key={trial.id} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-orange-400">
                          {trial.bookingCode}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-white text-sm">{trial.fullName}</div>
                          <div className="flex items-center gap-3 text-neutral-400 mt-1">
                            <a
                              href={`tel:${trial.mobile}`}
                              className="flex items-center gap-1 hover:text-orange-400"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{trial.mobile}</span>
                            </a>
                            <span className="text-neutral-700">•</span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              <span>{trial.email}</span>
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-neutral-200">
                            {new Date(trial.preferredDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                          <div className="text-neutral-500 text-[11px] flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-orange-400" />
                            <span>{trial.preferredTime}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-orange-300 font-medium">
                            {trial.fitnessGoal}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              trial.status === 'confirmed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : trial.status === 'pending'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : trial.status === 'attended'
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}
                          >
                            {trial.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`https://wa.me/91${trial.mobile.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                                trial.fullName
                              )},%20your%20GYM%20CORE%20Free%20Trial%20Pass%20is%20ready!`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                              title="Message on WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>

                            {trial.status === 'pending' && (
                              <button
                                onClick={() => handleApproveTrial(trial.id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] cursor-pointer"
                              >
                                Approve
                              </button>
                            )}

                            {trial.status === 'confirmed' && (
                              <button
                                onClick={() => handleCompleteTrial(trial.id)}
                                className="px-2.5 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-[11px] cursor-pointer"
                              >
                                Complete
                              </button>
                            )}

                            {trial.status !== 'cancelled' && (
                              <button
                                onClick={() => handleCancelTrial(trial.id)}
                                className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                                title="Cancel Pass"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Trainer Bookings */}
        {activeTab === 'trainer' && (
          <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-950">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Member</th>
                    <th className="py-3 px-4">Assigned Coach</th>
                    <th className="py-3 px-4">Session Date & Time</th>
                    <th className="py-3 px-4">Notes / Focus</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {filteredTrainerBookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-neutral-500">
                        No trainer coaching appointments found.
                      </td>
                    </tr>
                  ) : (
                    filteredTrainerBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="py-4 px-4 font-bold text-white text-sm">
                          {b.userName}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-orange-400">{b.trainerName}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-neutral-200">
                            {new Date(b.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                          <div className="text-neutral-500 text-[11px] flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-orange-400" />
                            <span>{b.timeSlot}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-neutral-400">
                          {b.notes || 'General 1-on-1 coaching session'}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : b.status === 'pending'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : b.status === 'completed'
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {b.status === 'pending' && (
                              <button
                                onClick={() => handleUpdateTrainerBooking(b.id, 'confirmed')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] cursor-pointer"
                              >
                                Confirm
                              </button>
                            )}
                            {b.status === 'confirmed' && (
                              <button
                                onClick={() => handleUpdateTrainerBooking(b.id, 'completed')}
                                className="px-2.5 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-[11px] cursor-pointer"
                              >
                                Mark Done
                              </button>
                            )}
                            {b.status !== 'cancelled' && (
                              <button
                                onClick={() => handleUpdateTrainerBooking(b.id, 'cancelled')}
                                className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                                title="Cancel Booking"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
