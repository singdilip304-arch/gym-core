import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  Users,
  Search,
  Dumbbell,
  Salad,
  Phone,
  Mail,
  ShieldCheck,
  TrendingUp,
  X,
  CheckCircle2,
} from 'lucide-react';
import { User } from '../../types';

export const TrainerMembers: React.FC = () => {
  const { users, workouts, diets, progressLogs } = useGymData();
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<User | null>(null);

  const members = users.filter(
    (u) =>
      u.role === 'member' &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.mobile.includes(search))
  );

  return (
    <DashboardLayout
      activeRole="trainer"
      title="Assigned Trainees Directory"
      subtitle="View client fitness goals, biometric stats, emergency contacts, and assigned plans."
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search athlete by name, email, or mobile..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
            />
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            {members.length} Athletes Found
          </span>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((mem) => {
            const memberWorkout = workouts.find((w) => w.assignedToUserId === mem.id) || workouts[0];
            const memberDiet = diets.find((d) => d.assignedToUserId === mem.id) || diets[0];

            return (
              <div
                key={mem.id}
                className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 hover:border-orange-500/40 transition-colors shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={mem.avatar}
                      alt={mem.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-orange-500/30"
                    />
                    <div className="min-w-0">
                      <h4 className="text-base font-extrabold text-white truncate">{mem.name}</h4>
                      <p className="text-xs text-orange-400 font-semibold">{mem.membershipPlanName || 'CORE ATHLETE'}</p>
                      <p className="text-[10px] text-neutral-500 font-mono">ID: {mem.qrCode || `GC-${mem.id.slice(-5)}`}</p>
                    </div>
                  </div>

                  {/* Biometrics */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 border-y border-neutral-900">
                    <div className="p-2 rounded-xl bg-neutral-900">
                      <span className="text-[10px] text-neutral-500 block">Weight</span>
                      <span className="font-bold text-white font-mono">{mem.weight || 75} kg</span>
                    </div>
                    <div className="p-2 rounded-xl bg-neutral-900">
                      <span className="text-[10px] text-neutral-500 block">Height</span>
                      <span className="font-bold text-white font-mono">{mem.height || 175} cm</span>
                    </div>
                    <div className="p-2 rounded-xl bg-neutral-900">
                      <span className="text-[10px] text-neutral-500 block">Age</span>
                      <span className="font-bold text-white font-mono">{mem.age || 26} Yrs</span>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-300 space-y-1">
                    <p>
                      <strong className="text-neutral-400">Goal:</strong> {mem.fitnessGoal || 'Hypertrophy'}
                    </p>
                    <p className="font-mono text-neutral-400 text-[11px] truncate">
                      {mem.mobile} • {mem.email}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-900">
                  <button
                    onClick={() => setSelectedMember(mem)}
                    className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-orange-500 hover:text-white text-neutral-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    View Trainee Dossier
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trainee Dossier Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 text-white max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-orange-500"
                />
                <div>
                  <h3 className="text-lg font-black uppercase text-white">{selectedMember.name}</h3>
                  <p className="text-xs text-orange-400 font-semibold">{selectedMember.membershipPlanName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block uppercase">Contact Details</span>
                  <p className="font-mono text-white mt-1">{selectedMember.mobile}</p>
                  <p className="text-neutral-400 truncate">{selectedMember.email}</p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block uppercase">Emergency Contact</span>
                  <p className="font-bold text-white mt-1">
                    {selectedMember.emergencyContact?.name || 'Primary Guardian'} ({selectedMember.emergencyContact?.relation || 'Family'})
                  </p>
                  <p className="font-mono text-orange-400">{selectedMember.emergencyContact?.phone || '+91 98290 00000'}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block">
                  Fitness Biometrics
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Height</span>
                    <span className="font-bold text-white">{selectedMember.height} cm</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Weight</span>
                    <span className="font-bold text-white">{selectedMember.weight} kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Gender</span>
                    <span className="font-bold text-white capitalize">{selectedMember.gender || 'Male'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Age</span>
                    <span className="font-bold text-white">{selectedMember.age} Yrs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedMember(null)}
                className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
