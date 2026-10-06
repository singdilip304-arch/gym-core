import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import {
  Users,
  Dumbbell,
  Salad,
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  Star,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const TrainerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { users, trainerBookings, workouts, diets, trainers } = useGymData();

  const trainerProfile =
    trainers.find((t) => t.userId === user?.id || t.name === user?.name) || trainers[0];

  const assignedMembers = users.filter((u) => u.role === 'member');
  const upcomingAppointments = trainerBookings.filter(
    (b) => b.trainerId === trainerProfile.id || b.trainerName === trainerProfile.name
  );

  return (
    <DashboardLayout
      activeRole="trainer"
      title={`Coach Command: ${trainerProfile.name}`}
      subtitle={`${trainerProfile.role} • GYM CORE Neota / Mahindra SEZ`}
    >
      <div className="space-y-6">
        {/* Trainer Stats Header */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Active Trainees</span>
              <Users className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{assignedMembers.length}</div>
            <p className="text-[10px] text-emerald-400 font-semibold">Under direct coaching</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Appointments Today</span>
              <Calendar className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{upcomingAppointments.length}</div>
            <p className="text-[10px] text-orange-400 font-semibold">1-on-1 sessions scheduled</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Coach Rating</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{trainerProfile.rating}</div>
            <p className="text-[10px] text-neutral-500">{trainerProfile.reviewsCount} verified reviews</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Active Workouts</span>
              <Dumbbell className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{workouts.length}</div>
            <p className="text-[10px] text-neutral-400">Customized splits deployed</p>
          </div>
        </div>

        {/* 2-Column: Today's Appointments & Trainee Quick Roster */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Appointments */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>Upcoming Client Appointments</span>
              </h4>
              <Link to="/trainer/appointments" className="text-xs font-bold text-orange-400">
                Manage All →
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-white text-sm">{appt.userName}</h5>
                      <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold">
                        {appt.sessionType}
                      </span>
                    </div>
                    <p className="text-neutral-400 font-mono text-[11px]">{appt.userPhone}</p>
                    {appt.notes && <p className="text-neutral-500 italic text-[11px]">"{appt.notes}"</p>}
                  </div>

                  <div className="text-right font-mono shrink-0">
                    <span className="font-bold text-white block">{appt.date}</span>
                    <span className="text-orange-400 font-bold block">{appt.timeSlot}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Members Quick Access */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                <span>Assigned Athletes</span>
              </h4>
              <Link to="/trainer/members" className="text-xs font-bold text-orange-400">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {assignedMembers.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-xl object-cover border border-neutral-800"
                    />
                    <div>
                      <h5 className="font-bold text-white">{member.name}</h5>
                      <p className="text-[11px] text-neutral-400">{member.fitnessGoal || 'Hypertrophy'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-emerald-400 font-bold block">{member.weight} kg</span>
                    <span className="text-[10px] text-neutral-500 font-mono">{member.membershipPlanName?.split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tools Navigation Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/trainer/workouts"
            className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-colors flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-white uppercase text-sm">Workout Builder</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Deploy & assign customized hypertrophy splits</p>
            </div>
          </Link>

          <Link
            to="/trainer/diet"
            className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-colors flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Salad className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-white uppercase text-sm">Diet & Macro Matrix</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Design 5-meal Indian macro plans</p>
            </div>
          </Link>

          <Link
            to="/trainer/members"
            className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-colors flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-white uppercase text-sm">Biometric Progress Logs</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Audit circumference & 1RM gains</p>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};
