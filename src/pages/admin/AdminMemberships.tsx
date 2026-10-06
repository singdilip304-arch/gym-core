import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  Award,
  PlusCircle,
  X,
  CheckCircle2,
  Trash2,
  Edit,
  Sparkles,
  CreditCard,
} from 'lucide-react';
import { MembershipPlan } from '../../types';
import confetti from 'canvas-confetti';

export const AdminMemberships: React.FC = () => {
  const { memberships, addMembershipPlan, updateMembershipPlan, deleteMembershipPlan } =
    useGymData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  // Form
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [price, setPrice] = useState(3499);
  const [originalPrice, setOriginalPrice] = useState(4999);
  const [durationMonths, setDurationMonths] = useState(3);
  const [popular, setPopular] = useState(false);
  const [accessHours, setAccessHours] = useState('24/7 VIP RFID Access');
  const [trainerSessions, setTrainerSessions] = useState(4);
  const [featuresStr, setFeaturesStr] = useState('Full Gym Floor Access, Sauna Recovery, 4 PT Sessions, Free Team T-Shirt');
  const [description, setDescription] = useState('High performance transformation plan.');

  const handleOpenCreate = () => {
    setEditingPlanId(null);
    setName('');
    setTagline('');
    setPrice(3499);
    setOriginalPrice(4999);
    setDurationMonths(3);
    setPopular(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (plan: MembershipPlan) => {
    setEditingPlanId(plan.id);
    setName(plan.name);
    setTagline(plan.tagline);
    setPrice(plan.price);
    setOriginalPrice(plan.originalPrice || Math.round(plan.price * 1.3));
    setDurationMonths(plan.durationMonths);
    setPopular(!!plan.popular);
    setAccessHours(plan.accessHours);
    setTrainerSessions(plan.trainerSessionsIncluded);
    setFeaturesStr(plan.features.join(', '));
    setDescription(plan.description);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const featArray = featuresStr.split(',').map((f) => f.trim()).filter(Boolean);

    if (editingPlanId) {
      updateMembershipPlan(editingPlanId, {
        name,
        tagline,
        price: Number(price),
        originalPrice: Number(originalPrice),
        durationMonths: Number(durationMonths),
        popular,
        accessHours,
        trainerSessionsIncluded: Number(trainerSessions),
        features: featArray,
        description,
      });
    } else {
      addMembershipPlan({
        name,
        tagline,
        price: Number(price),
        originalPrice: Number(originalPrice),
        durationMonths: Number(durationMonths),
        popular,
        accessHours,
        trainerSessionsIncluded: Number(trainerSessions),
        features: featArray,
        description,
      });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff5500', '#10b981', '#ffffff'],
      });
    }

    setModalOpen(false);
  };

  return (
    <DashboardLayout
      activeRole="admin"
      title="Membership Plans Architect"
      subtitle="Configure pricing tiers, benefits, duration, and promotional packages."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono">
            {memberships.length} Active Public Membership Tiers
          </span>
          <button
            onClick={handleOpenCreate}
            className="py-3 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Plan</span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {memberships.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-3xl bg-neutral-950 border flex flex-col justify-between space-y-4 relative ${
                plan.popular ? 'border-orange-500 shadow-xl shadow-orange-500/10' : 'border-neutral-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-orange-500 text-white font-mono font-bold text-[10px] uppercase">
                  Featured / Popular
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-black text-white uppercase">{plan.name}</h3>
                  <p className="text-xs text-neutral-400">{plan.tagline}</p>
                </div>

                <div className="py-2 border-y border-neutral-900 font-mono">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-neutral-400">/ {plan.durationMonths} Mo</span>
                  </div>
                  {plan.originalPrice && (
                    <span className="text-xs line-through text-neutral-500">
                      ₹{plan.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {plan.features.slice(0, 4).map((f, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-3 border-t border-neutral-900">
                <button
                  onClick={() => handleOpenEdit(plan)}
                  className="flex-1 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase flex items-center justify-center gap-1 transition-colors cursor-pointer border border-neutral-800"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => deleteMembershipPlan(plan.id)}
                  className="p-2 rounded-xl bg-neutral-900 hover:bg-red-500/10 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer border border-neutral-800"
                  title="Delete Plan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
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
                  Plan Settings
                </span>
                <h3 className="text-xl font-black uppercase text-white mt-0.5">
                  {editingPlanId ? 'Edit Membership Plan' : 'Create New Membership Plan'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">Plan Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. VIP OLYMPIC ELITE"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Unrestricted access with sauna & 8 personal trainer sessions"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Original Price</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Duration (Months)</label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">PT Sessions Included</label>
                  <input
                    type="number"
                    value={trainerSessions}
                    onChange={(e) => setTrainerSessions(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="popCheck"
                    checked={popular}
                    onChange={(e) => setPopular(e.target.checked)}
                    className="w-4 h-4 accent-orange-500"
                  />
                  <label htmlFor="popCheck" className="text-white font-semibold cursor-pointer">
                    Highlight as Popular Plan
                  </label>
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Features (Comma separated)</label>
                <textarea
                  rows={3}
                  value={featuresStr}
                  onChange={(e) => setFeaturesStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Membership Plan</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
