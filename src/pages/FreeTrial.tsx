import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { useAuth } from '../context/AuthContext';
import {
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  QrCode,
  Phone,
  ArrowRight,
  Download,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FreeTrialBooking } from '../types';

export const FreeTrial: React.FC = () => {
  const { bookFreeTrial } = useGymData();
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [email, setEmail] = useState(user?.email || '');
  const [preferredDate, setPreferredDate] = useState('2026-10-08');
  const [preferredTime, setPreferredTime] = useState('06:30 PM (Evening Peak)');
  const [fitnessGoal, setFitnessGoal] = useState('Hypertrophy & Muscle Building');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate (1 - 3 Years)');
  const [notes, setNotes] = useState('');

  const [confirmedTrial, setConfirmedTrial] = useState<FreeTrialBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trial = bookFreeTrial({
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      preferredDate,
      preferredTime,
      fitnessGoal,
      experienceLevel,
      notes: notes.trim(),
    });

    setConfirmedTrial(trial);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#22c55e', '#ffffff', '#eab308'],
    });
  };

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
          Complimentary 1-Day All-Access Pass
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          Book Your Free Trial
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Experience our calibrated Eleiko barbells, heavy dumbbells up to 60kg, and meet our senior coaches.
          Zero sales pressure. 100% pure iron atmosphere in Neota / Mahindra SEZ, Jaipur.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {!confirmedTrial ? (
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-8">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-500 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase">Pass Registration Form</h3>
                  <p className="text-xs text-neutral-400">Valid at Flagship Neota Facility</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                100% FREE
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Mobile Number (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98290 00000"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Preferred Visit Date</label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Preferred Time Window</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
                  >
                    <option value="06:30 AM (Early Morning)">06:30 AM (Early Morning Brotherhood)</option>
                    <option value="08:30 AM (Morning Flow)">08:30 AM (Morning Flow)</option>
                    <option value="11:30 AM (Quiet Hours)">11:30 AM (Quiet Hours)</option>
                    <option value="05:30 PM (Evening Kickoff)">05:30 PM (Evening Kickoff)</option>
                    <option value="06:30 PM (Evening Peak)">06:30 PM (Evening Peak Prime Time)</option>
                    <option value="08:30 PM (Night Owls)">08:30 PM (Night Owls)</option>
                  </select>
                </div>
              </div>

              {/* Goal & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Primary Fitness Goal</label>
                  <select
                    value={fitnessGoal}
                    onChange={(e) => setFitnessGoal(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Hypertrophy & Muscle Building">Hypertrophy & Muscle Building</option>
                    <option value="Fat Loss & Calorie Shred">Fat Loss & Calorie Shred</option>
                    <option value="Strength & Powerlifting">Strength & Powerlifting 1RM</option>
                    <option value="Beginner Foundation">Complete Beginner - Learn Form</option>
                    <option value="Women Fitness & Glute Hypertrophy">Women Fitness & Glute Hypertrophy</option>
                    <option value="Athletic VO2 & Conditioning">Athletic VO2 & Conditioning</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Beginner (< 6 Months)">Beginner (&lt; 6 Months)</option>
                    <option value="Intermediate (1 - 3 Years)">Intermediate (1 - 3 Years)</option>
                    <option value="Advanced (3+ Years)">Advanced (3+ Years)</option>
                    <option value="Competitive Athlete">Competitive Athlete</option>
                  </select>
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                  Anything specific you'd like our trainers to know? (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Work at Infosys SEZ, looking for an intense evening training slot..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none placeholder:text-neutral-600"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>CONFIRM & GENERATE DIGITAL FREE TRIAL PASS</span>
              </button>

              <div className="flex items-center justify-center gap-6 text-[11px] text-neutral-500 pt-2">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> No credit card required
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Free gym bag locker included
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Full equipment access
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmed Digital Pass Card */
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-orange-500/40 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold text-orange-400 tracking-wider">
                Booking Confirmed
              </span>
              <h2 className="text-3xl font-black uppercase text-white tracking-tight">
                FREE TRIAL PASS GENERATED
              </h2>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                We are excited to welcome you to GYM CORE. Present this digital pass or mention your booking code at our Neota reception.
              </p>
            </div>

            {/* Pass Presentation Box */}
            <div className="max-w-sm mx-auto p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 text-left shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase font-bold">Pass Holder</span>
                  <h4 className="text-base font-extrabold text-white">{confirmedTrial.fullName}</h4>
                </div>
                <span className="px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono font-bold text-xs">
                  {confirmedTrial.bookingCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Scheduled Date</span>
                  <span className="font-bold text-white">{confirmedTrial.preferredDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Time Slot</span>
                  <span className="font-bold text-white">{confirmedTrial.preferredTime.split(' ')[0]}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800 text-xs space-y-1">
                <span className="text-[10px] text-neutral-500 uppercase block">Facility Address</span>
                <p className="text-neutral-300 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  Neota / Kalwada Road, Near Mahindra SEZ, Jaipur
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Print / Save Pass
              </button>
              <a
                href={`https://wa.me/919829011223?text=Hi%20GYM%20CORE%2C%20I%20have%20booked%20my%20Free%20Trial%20pass%20(${confirmedTrial.bookingCode})`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/25"
              >
                <Phone className="w-4 h-4" />
                Confirm on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
