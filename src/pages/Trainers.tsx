import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { useAuth } from '../context/AuthContext';
import {
  Star,
  Award,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Trainer, TrainerBooking } from '../types';
import confetti from 'canvas-confetti';

export const Trainers: React.FC = () => {
  const { trainers, bookTrainerSession } = useGymData();
  const { user } = useAuth();

  const [bookingModalTrainer, setBookingModalTrainer] = useState<Trainer | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-08');
  const [selectedSlot, setSelectedSlot] = useState<string>('06:00 AM');
  const [sessionType, setSessionType] = useState<TrainerBooking['sessionType']>('Personal Training');
  const [clientName, setClientName] = useState<string>(user?.name || '');
  const [clientPhone, setClientPhone] = useState<string>(user?.mobile || '');
  const [notes, setNotes] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<TrainerBooking | null>(null);

  const handleOpenBooking = (trainer: Trainer) => {
    setBookingModalTrainer(trainer);
    setSelectedSlot(trainer.availableSlots[0] || '06:00 AM');
    setClientName(user?.name || '');
    setClientPhone(user?.mobile || '');
    setConfirmedBooking(null);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalTrainer) return;

    const booking = bookTrainerSession({
      trainerId: bookingModalTrainer.id,
      trainerName: bookingModalTrainer.name,
      userId: user?.id || 'usr_member_1',
      userName: clientName.trim() || 'Valued Member',
      userPhone: clientPhone.trim() || '+91 98290 00000',
      date: selectedDate,
      timeSlot: selectedSlot,
      sessionType,
      notes: notes.trim(),
    });

    setConfirmedBooking(booking);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#22c55e', '#3b82f6'],
    });
  };

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
          Elite Coaching Staff
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          Certified Trainers
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Our coaches don't just count repetitions; they hold international certifications in exercise physiology,
          biomechanics, and strength periodization.
        </p>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col sm:flex-row hover:border-orange-500/40 transition-colors shadow-2xl"
          >
            {/* Photo Column */}
            <div className="sm:w-2/5 relative min-h-[260px] sm:min-h-full">
              <img
                src={trainer.avatar}
                alt={trainer.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-amber-400 flex items-center gap-1 border border-neutral-700">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{trainer.rating} ({trainer.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Details Column */}
            <div className="sm:w-3/5 p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-black text-white uppercase">{trainer.name}</h3>
                  <p className="text-xs text-orange-400 font-bold">{trainer.role}</p>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    {trainer.experienceYears} Years Competitive Experience • {trainer.clientsCount} Active Athletes
                  </p>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">{trainer.bio}</p>

                {/* Certifications */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block">
                    Certifications & Credentials
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {trainer.certifications.map((cert, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-semibold"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block">
                    Primary Specializations
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {trainer.specialization.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/20 text-[10px] text-orange-400 font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-neutral-900">
                <button
                  onClick={() => handleOpenBooking(trainer)}
                  className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation / Session</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trainer Booking Modal */}
      {bookingModalTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 text-white max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  Schedule Private Coaching
                </span>
                <h3 className="text-xl font-black uppercase text-white mt-0.5">
                  Book {bookingModalTrainer.name}
                </h3>
                <p className="text-xs text-neutral-400">GYM CORE Neota / Mahindra SEZ Facility</p>
              </div>
              <button
                onClick={() => setBookingModalTrainer(null)}
                className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {!confirmedBooking ? (
              <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                {/* Session Type */}
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Session Focus
                  </label>
                  <select
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Personal Training">1-on-1 Personal Training (Hypertrophy / Fat Loss)</option>
                    <option value="Form Correction">Compound Barbell Form Correction & Biomechanics</option>
                    <option value="Strength Assessment">1RM & Strength Baseline Assessment</option>
                    <option value="Nutrition Consultation">Indian Macro Diet & Supplement Advisory</option>
                  </select>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Available Coach Slot
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
                    >
                      {bookingModalTrainer.availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Member Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Aman Verma"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 98290 00000"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Specific Goals / Previous Injuries (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Mild lower back stiffness on squats, want to increase bench press..."
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none placeholder:text-neutral-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm Appointment
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black uppercase text-white">Session Confirmed!</h4>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                  Your appointment with <strong className="text-orange-400">{bookingModalTrainer.name}</strong> has
                  been scheduled for <strong>{confirmedBooking.date}</strong> at <strong>{confirmedBooking.timeSlot}</strong>.
                </p>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 text-left space-y-1 font-mono">
                  <p>Booking ID: {confirmedBooking.id}</p>
                  <p>Facility: GYM CORE Neota Arena (First Floor)</p>
                  <p>Status: Confirmed</p>
                </div>

                <button
                  onClick={() => setBookingModalTrainer(null)}
                  className="py-2.5 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
