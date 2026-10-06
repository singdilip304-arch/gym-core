import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  UserCheck,
  PlusCircle,
  X,
  Star,
  CheckCircle2,
  Trash2,
  Phone,
  Mail,
  Award,
} from 'lucide-react';
import { Trainer } from '../../types';
import confetti from 'canvas-confetti';

export const AdminTrainers: React.FC = () => {
  const { trainers, addTrainer } = useGymData();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Senior Strength Coach');
  const [experience, setExperience] = useState(5);
  const [phone, setPhone] = useState('+91 98290 00000');
  const [email, setEmail] = useState('');
  const [specializationsStr, setSpecializationsStr] = useState('Powerlifting, Hypertrophy, Mobility');
  const [certificationsStr, setCertificationsStr] = useState('ACE Certified, CSCS, CPR First Aid');
  const [bio, setBio] = useState('Experienced strength coach dedicated to athlete transformation.');
  const [avatar, setAvatar] = useState(
    'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80'
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addTrainer({
      userId: `usr_coach_${Date.now()}`,
      name: name.trim(),
      role,
      experienceYears: Number(experience),
      phone,
      email,
      specialization: specializationsStr.split(',').map((s) => s.trim()),
      certifications: certificationsStr.split(',').map((c) => c.trim()),
      bio,
      avatar,
      rating: 4.9,
      reviewsCount: 12,
      clientsCount: 15,
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      availableSlots: ['06:00 AM', '08:00 AM', '05:00 PM', '07:00 PM'],
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#10b981', '#ffffff'],
    });

    setModalOpen(false);
    setName('');
  };

  return (
    <DashboardLayout
      activeRole="admin"
      title="Trainer Roster & Staff Management"
      subtitle="Manage coaching contracts, certifications, client loads, and specialty domains."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono">
            {trainers.length} Certified Head Coaches on Roster
          </span>
          <button
            onClick={() => setModalOpen(true)}
            className="py-3 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Coach</span>
          </button>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainers.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-orange-500/40 shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-black text-white uppercase">{t.name}</h3>
                    <p className="text-xs text-orange-400 font-bold">{t.role}</p>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-1">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {t.rating}
                      </span>
                      <span>•</span>
                      <span>{t.experienceYears} Years Exp</span>
                      <span>•</span>
                      <span>{t.clientsCount} Clients</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">{t.bio}</p>

                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block">
                    Certifications
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {t.certifications.map((c, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-900 text-xs text-neutral-400 font-mono">
                  <p>{t.phone} • {t.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 text-white max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  Staff Onboarding
                </span>
                <h3 className="text-xl font-black uppercase text-white mt-0.5">
                  Add Certified Coach
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kabir Mehta"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Years of Experience</label>
                  <input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Mobile</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="coach@gymcore.in"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Certifications (Comma separated)</label>
                <input
                  type="text"
                  value={certificationsStr}
                  onChange={(e) => setCertificationsStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Bio</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Coach Profile</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
