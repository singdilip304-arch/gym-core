import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import {
  UserCheck,
  Calendar,
  Clock,
  CheckCircle2,
  Star,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Trainer, TrainerBooking } from '../../types';
import confetti from 'canvas-confetti';

export const MemberBookTrainer: React.FC = () => {
  const { user } = useAuth();
  const { trainers, trainerBookings, bookTrainerSession } = useGymData();

  const [selectedTrainerId, setSelectedTrainerId] = useState<string>(
    user?.assignedTrainerId || trainers[0].id
  );
  const [selectedDate, setSelectedDate] = useState('2026-10-09');
  const [selectedSlot, setSelectedSlot] = useState('06:00 AM');
  const [sessionType, setSessionType] = useState<TrainerBooking['sessionType']>('Personal Training');
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<TrainerBooking | null>(null);

  const activeTrainer =
    trainers.find((t) => t.id === selectedTrainerId) || trainers[0];

  const userBookings = trainerBookings.filter(
    (b) => b.userId === (user?.id || 'usr_member_1')
  );

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = bookTrainerSession({
      trainerId: activeTrainer.id,
      trainerName: activeTrainer.name,
      userId: user?.id || 'usr_member_1',
      userName: user?.name || 'Aman Verma',
      userPhone: user?.mobile || '+91 98290 77889',
      date: selectedDate,
      timeSlot: selectedSlot,
      sessionType,
      notes: notes.trim(),
    });

    setConfirmedBooking(newBooking);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#22c55e', '#3b82f6'],
    });

    setTimeout(() => {
      setConfirmedBooking(null);
      setNotes('');
    }, 4000);
  };

  return (
    <DashboardLayout
      activeRole="member"
      title="Book a Trainer Session"
      subtitle="Schedule 1-on-1 private coaching, powerlifting technique checks, or nutrition audits."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
            <h3 className="text-xl font-black text-white uppercase">Appointment Details</h3>

            <form onSubmit={handleBooking} className="space-y-4 text-xs">
              {/* Select Trainer */}
              <div>
                <label className="text-neutral-300 block mb-2 font-semibold">Select Head Coach</label>
                <div className="grid grid-cols-2 gap-2">
                  {trainers.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setSelectedTrainerId(t.id);
                        setSelectedSlot(t.availableSlots[0] || '06:00 AM');
                      }}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                        selectedTrainerId === t.id
                          ? 'bg-orange-500/10 border-orange-500'
                          : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-xs truncate">{t.name}</h4>
                        <span className="text-[10px] text-orange-400 font-mono block">
                          ⭐ {t.rating}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Type */}
              <div>
                <label className="text-neutral-300 block mb-1 font-semibold">Session Objective</label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="Personal Training">Personal Training (Hypertrophy / Fat Loss)</option>
                  <option value="Form Correction">Compound Barbell Form Correction & Biomechanics</option>
                  <option value="Strength Assessment">1RM & Strength Baseline Assessment</option>
                  <option value="Nutrition Consultation">Indian Macro Diet & Supplement Advisory</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1 font-semibold">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1 font-semibold">Time Slot</label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                  >
                    {activeTrainer.availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-neutral-300 block mb-1 font-semibold">
                  Workout Notes / Focus Points
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Need help dialing in deadlift hip hinge and grip..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Trainer Booking</span>
              </button>
            </form>

            {confirmedBooking && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="font-bold">Session Confirmed!</p>
                  <p className="text-[11px] text-emerald-400/80">
                    Scheduled with {confirmedBooking.trainerName} on {confirmedBooking.date} at {confirmedBooking.timeSlot}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Appointments */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>Your Scheduled Appointments</span>
            </h4>

            {userBookings.length > 0 ? (
              <div className="space-y-3">
                {userBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{b.sessionType}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px] uppercase">
                        {b.status}
                      </span>
                    </div>
                    <p className="text-neutral-400">
                      Trainer: <strong className="text-white">{b.trainerName}</strong>
                    </p>
                    <div className="flex items-center gap-2 text-orange-400 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{b.date} • {b.timeSlot}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 italic">No upcoming trainer sessions scheduled.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
