import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  Users,
  CreditCard,
  CalendarCheck,
  Calendar,
  MessageSquare,
  Award,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    payments,
    attendance,
    freeTrials,
    reviews,
    transformations,
    memberships,
    trainers,
  } = useGymData();

  const activeMembers = users.filter((u) => u.role === 'member');
  const todayStr = new Date().toISOString().split('T')[0];
  const checkInsToday = attendance.filter((a) => a.date === todayStr);

  const totalRevenue = payments.reduce((acc, p) => acc + (p.status === 'completed' ? p.amount : 0), 0);
  const pendingTrials = freeTrials.filter((t) => t.status === 'confirmed');
  const pendingReviews = reviews.filter((r) => !r.isApproved);
  const pendingTransformations = transformations.filter((t) => !t.isApproved);

  return (
    <DashboardLayout
      activeRole="admin"
      title="Club Command Center"
      subtitle="Executive management, revenue intelligence, turnstile access, and member moderation."
    >
      <div className="space-y-6">
        {/* KPI Metric Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Total Revenue</span>
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-emerald-400 font-semibold font-mono">Verified UPI Collections</p>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Active Members</span>
              <Users className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-3xl font-black text-white font-mono">{activeMembers.length}</div>
            <p className="text-[10px] text-neutral-400">Enrolled & RFID active</p>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Turnstile Scans Today</span>
              <CalendarCheck className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">{checkInsToday.length}</div>
            <p className="text-[10px] text-sky-400 font-semibold">Live check-ins</p>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Pending Moderation</span>
              <MessageSquare className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400 font-mono">
              {pendingReviews.length + pendingTransformations.length}
            </div>
            <p className="text-[10px] text-neutral-400">Reviews & transformations queue</p>
          </div>
        </div>

        {/* 2-Column: Recent Payments + Live Turnstile Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Payments */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-orange-500" />
                <span>Recent UPI Membership Payments</span>
              </h4>
              <Link to="/admin/payments" className="text-xs font-bold text-orange-400 hover:underline">
                View Ledger →
              </Link>
            </div>

            <div className="space-y-3">
              {payments.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <h5 className="font-bold text-white">{p.userName}</h5>
                    <p className="text-[11px] text-orange-400 font-semibold">{p.planName}</p>
                    <p className="text-[10px] font-mono text-neutral-500">{p.upiRef}</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-black text-white text-sm">₹{p.amount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-emerald-400 font-bold block uppercase">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Turnstile Access Live Stream */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-400" />
                <span>Live Turnstile Activity</span>
              </h4>
              <Link to="/admin/attendance" className="text-xs font-bold text-orange-400 hover:underline">
                Scanner →
              </Link>
            </div>

            <div className="space-y-3">
              {attendance.slice(0, 5).map((att) => (
                <div
                  key={att.id}
                  className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white">{att.userName}</span>
                    <p className="text-[10px] text-neutral-400 capitalize">{att.markedBy.replace('_', ' ')}</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-emerald-400 text-xs">{att.checkInTime}</span>
                    <span className="text-[10px] text-neutral-500 block">{att.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Admin Action Navigation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/admin/members"
            className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-colors space-y-2 group"
          >
            <Users className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-white text-xs uppercase">Members Directory</h4>
            <p className="text-[11px] text-neutral-400">Add, edit, or disable member passes</p>
          </Link>

          <Link
            to="/admin/memberships"
            className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-colors space-y-2 group"
          >
            <Award className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-white text-xs uppercase">Membership Plans</h4>
            <p className="text-[11px] text-neutral-400">Configure pricing & features</p>
          </Link>

          <Link
            to="/admin/bookings"
            className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-colors space-y-2 group"
          >
            <Calendar className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-white text-xs uppercase">Free Trial Bookings</h4>
            <p className="text-[11px] text-neutral-400">{pendingTrials.length} prospective leads</p>
          </Link>

          <Link
            to="/admin/reviews"
            className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-colors space-y-2 group"
          >
            <MessageSquare className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-white text-xs uppercase">Review Moderation</h4>
            <p className="text-[11px] text-neutral-400">Approve public testimonials</p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};
