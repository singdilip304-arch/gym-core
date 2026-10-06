import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import { QrCodePass } from '../../components/ui/QrCodePass';
import { UpiPaymentModal } from '../../components/ui/UpiPaymentModal';
import {
  Dumbbell,
  Salad,
  CalendarCheck,
  CreditCard,
  UserCheck,
  Flame,
  Award,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  QrCode,
  AlertCircle,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import { MembershipPlan } from '../../types';

export const MemberDashboard: React.FC = () => {
  const { user } = useAuth();
  const { workouts, diets, attendance, progressLogs, trainerBookings, memberships, announcements } =
    useGymData();

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [upiModalOpen, setUpiModalOpen] = useState(false);
  const [selectedPlanForRenew, setSelectedPlanForRenew] = useState<MembershipPlan | null>(null);

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

  // Find user's assigned workout plan or fallback
  const userWorkout =
    workouts.find((w) => w.assignedToUserId === currentUser.id) || workouts[0];
  const userDiet = diets.find((d) => d.assignedToUserId === currentUser.id) || diets[0];
  const userAttendance = attendance.filter((a) => a.userId === currentUser.id);
  const userBookings = trainerBookings.filter((b) => b.userId === currentUser.id);
  const latestProgress = progressLogs[progressLogs.length - 1];

  // Today's workout focus (Monday Chest, etc.)
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaysWorkout =
    userWorkout?.schedule.find((s) => s.dayName.toLowerCase().includes(todayName.toLowerCase())) ||
    userWorkout?.schedule[0];

  const handleRenew = () => {
    const proPlan = memberships.find((p) => p.id === 'plan_pro_quarterly') || memberships[0];
    setSelectedPlanForRenew(proPlan);
    setUpiModalOpen(true);
  };

  return (
    <DashboardLayout
      activeRole="member"
      title={`Welcome back, ${currentUser.name.split(' ')[0]}!`}
      subtitle="Track your progressive overload, Indian macro nutrition, and gym access."
    >
      <div className="space-y-6">
        {/* Top Status & Pass Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase font-bold text-emerald-400 tracking-wider">
                Membership Active • RFID Turnstile Unlocked
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {currentUser.membershipPlanName || 'PRO ATHLETE (3-Month)'}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-500" />
                Valid until: <strong className="text-white">{currentUser.membershipExpiresAt || '2026-12-15'}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-mono">
                ID: <strong className="text-white">{currentUser.qrCode || 'GC-MEM-889'}</strong>
              </span>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setQrModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Digital Access Pass</span>
            </button>
            <button
              onClick={handleRenew}
              className="px-4 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-orange-500" />
              <span>Renew / Upgrade</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Attendance Rate</span>
              <CalendarCheck className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {userAttendance.length > 0 ? `${userAttendance.length} Days` : '18 Days'}
            </div>
            <p className="text-[10px] text-emerald-400 font-semibold">92% Consistency this month</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Current Weight</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {latestProgress?.weight || 78.5} <span className="text-sm font-normal text-neutral-400">kg</span>
            </div>
            <p className="text-[10px] text-emerald-400 font-semibold">-5.7 kg from start baseline</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Daily Calorie Target</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {userDiet?.targetCalories || 2850} <span className="text-sm font-normal text-neutral-400">kcal</span>
            </div>
            <p className="text-[10px] text-neutral-400">{userDiet?.targetProtein || 165}g Protein target</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Assigned Head Coach</span>
              <UserCheck className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-base font-extrabold text-white truncate">
              {currentUser.assignedTrainerName || 'Vikram Singh Shekhawat'}
            </div>
            <Link to="/member/book-trainer" className="text-[10px] text-orange-400 font-bold hover:underline block">
              Book Check-in Session →
            </Link>
          </div>
        </div>

        {/* Main 2-Column Section: Today's Workout + Diet Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Today's Workout Card */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-500 flex items-center justify-center">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    Scheduled for Today ({todayName})
                  </h4>
                  <h3 className="text-base font-black text-white">{todaysWorkout?.focus}</h3>
                </div>
              </div>
              <Link
                to="/member/workout"
                className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
              >
                <span>Full Split</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {todaysWorkout?.exercises.slice(0, 4).map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-white">{ex.name}</h5>
                    <p className="text-[11px] text-neutral-400">{ex.targetMuscle}</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-orange-400">{ex.sets} Sets</span>
                    <span className="text-neutral-500 block text-[10px]">{ex.reps}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/member/workout"
              className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Launch Workout Tracker & Rest Timers</span>
            </Link>
          </div>

          {/* Diet & Nutrition Snapshot */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <Salad className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Diet & Nutrition
                    </h4>
                    <h3 className="text-base font-black text-white">{userDiet?.title}</h3>
                  </div>
                </div>
                <Link
                  to="/member/diet"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  Meals →
                </Link>
              </div>

              {/* Macro Bars */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-neutral-300">Daily Calories</span>
                    <span className="text-white font-mono">{userDiet?.targetCalories} kcal</span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-orange-500 w-[78%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-neutral-300">Protein (Muscle Synthesis)</span>
                    <span className="text-emerald-400 font-mono">{userDiet?.targetProtein}g</span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-neutral-300">Carbohydrates</span>
                    <span className="text-sky-400 font-mono">{userDiet?.targetCarbs}g</span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-sky-500 w-[65%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-neutral-300">Healthy Fats</span>
                    <span className="text-amber-400 font-mono">{userDiet?.targetFats}g</span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-amber-500 w-[55%]" />
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/member/diet"
              className="py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>View 5-Meal Breakdown & Hydration</span>
            </Link>
          </div>
        </div>

        {/* Upcoming Trainer Appointments & Announcements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trainer Session */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-orange-500" />
                <span>Upcoming Trainer Sessions</span>
              </h4>
              <Link to="/member/book-trainer" className="text-xs font-bold text-orange-400">
                + Book New
              </Link>
            </div>

            {userBookings.length > 0 ? (
              userBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{b.sessionType}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px] uppercase">
                      {b.status}
                    </span>
                  </div>
                  <p className="text-neutral-400">
                    Coach: <strong className="text-white">{b.trainerName}</strong>
                  </p>
                  <p className="text-orange-400 font-mono">
                    {b.date} • {b.timeSlot}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-500 italic">No scheduled trainer sessions this week.</p>
            )}
          </div>

          {/* Announcements */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-500" />
                <span>Gym Announcements</span>
              </h4>
              <span className="text-[10px] text-neutral-500 font-mono">Neota Facility</span>
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 2).map((ann) => (
                <div
                  key={ann.id}
                  className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-white">{ann.title}</h5>
                    <span className="text-[10px] text-neutral-500">{ann.createdAt}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-snug">{ann.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute -top-10 right-0 p-1.5 rounded-full bg-neutral-800 text-white hover:bg-neutral-700"
            >
              ✕
            </button>
            <QrCodePass user={currentUser} onCheckInSuccess={() => setQrModalOpen(false)} />
          </div>
        </div>
      )}

      {/* UPI Payment Modal */}
      <UpiPaymentModal
        plan={selectedPlanForRenew}
        isOpen={upiModalOpen}
        onClose={() => setUpiModalOpen(false)}
      />
    </DashboardLayout>
  );
};
