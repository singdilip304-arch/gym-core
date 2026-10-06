import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  Users,
  Search,
  PlusCircle,
  X,
  CheckCircle2,
  UserX,
  QrCode,
  CalendarCheck,
  ShieldCheck,
  Edit,
} from 'lucide-react';
import { User } from '../../types';
import confetti from 'canvas-confetti';

export const AdminMembers: React.FC = () => {
  const { users, addMember, updateMember, markAttendance, memberships } = useGymData();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newPlanId, setNewPlanId] = useState('plan_pro_quarterly');
  const [feedback, setFeedback] = useState<string | null>(null);

  const members = users.filter(
    (u) =>
      u.role === 'member' &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.mobile.includes(search))
  );

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    const plan = memberships.find((p) => p.id === newPlanId) || memberships[0];

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + plan.durationMonths);

    addMember({
      name: newName.trim(),
      email: newEmail.trim(),
      mobile: newMobile.trim(),
      role: 'member',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      membershipId: plan.id,
      membershipPlanName: plan.name,
      membershipStatus: 'active',
      membershipExpiresAt: expiryDate.toISOString().split('T')[0],
      age: 26,
      height: 175,
      weight: 74,
      fitnessGoal: 'Hypertrophy & Strength',
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#10b981', '#ffffff'],
    });

    setModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewMobile('');
  };

  const handleManualCheckIn = (userId: string, memberName: string) => {
    const res = markAttendance(userId, 'admin_manual');
    setFeedback(res.message);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleToggleStatus = (member: User) => {
    const nextStatus = member.membershipStatus === 'active' ? 'expired' : 'active';
    updateMember(member.id, { membershipStatus: nextStatus });
  };

  return (
    <DashboardLayout
      activeRole="admin"
      title="Members Directory & Access Control"
      subtitle="Enroll new members, monitor turnstile permissions, and mark manual attendance."
    >
      <div className="space-y-6">
        {/* Actions & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search member by name, phone, or email..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Enroll New Member</span>
          </button>
        </div>

        {feedback && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Members Table */}
        <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Member</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3">Plan & Expiry</th>
                  <th className="py-3 px-3">QR Code Pass</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Turnstile & Status Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {members.map((mem) => (
                  <tr key={mem.id} className="hover:bg-neutral-900/50">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={mem.avatar}
                          alt={mem.name}
                          className="w-9 h-9 rounded-xl object-cover border border-neutral-800 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-white block text-sm">{mem.name}</span>
                          <span className="text-[11px] text-neutral-500">{mem.fitnessGoal || 'Hypertrophy'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-neutral-400">
                      <p className="text-white">{mem.mobile}</p>
                      <p className="text-[11px]">{mem.email}</p>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-orange-400 block">{mem.membershipPlanName || 'CORE'}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">Expires: {mem.membershipExpiresAt || '2026-12-15'}</span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-neutral-400">
                      {mem.qrCode || `GC-${mem.id.slice(-5)}`}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          mem.membershipStatus === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {mem.membershipStatus || 'active'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleManualCheckIn(mem.id, mem.name)}
                          className="px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[10px] font-bold uppercase transition-colors cursor-pointer"
                          title="Manual Turnstile Check-in"
                        >
                          Manual Scan
                        </button>
                        <button
                          onClick={() => handleToggleStatus(mem)}
                          className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white text-[10px] font-bold uppercase transition-colors cursor-pointer"
                        >
                          {mem.membershipStatus === 'active' ? 'Disable' : 'Enable'}
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

      {/* Enroll Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 text-white max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  Member Onboarding
                </span>
                <h3 className="text-xl font-black uppercase text-white mt-0.5">
                  Enroll New Athlete
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sunil Shekhawat"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value)}
                    placeholder="+91 98290 00000"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="sunil@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Membership Plan</label>
                <select
                  value={newPlanId}
                  onChange={(e) => setNewPlanId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                >
                  {memberships.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ₹{p.price.toLocaleString('en-IN')} ({p.durationMonths} Mo)
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Activate Member & Generate QR Code</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
