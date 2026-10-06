import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  HelpCircle,
  CreditCard,
  QrCode,
  Award,
} from 'lucide-react';
import { UpiPaymentModal } from '../components/ui/UpiPaymentModal';
import { MembershipPlan } from '../types';

export const Membership: React.FC = () => {
  const { memberships } = useGymData();
  const { user } = useAuth();

  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [upiModalOpen, setUpiModalOpen] = useState<boolean>(false);

  const handleSelectPlan = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setUpiModalOpen(true);
  };

  const comparisonFeatures = [
    { name: 'Gym Floor & Free Weights Access', core: true, pro: true, elite: true, vip: true },
    { name: 'Cardio & Turf Sled Arena', core: true, pro: true, elite: true, vip: true },
    { name: 'Digital QR & 24/7 RFID Turnstile Entry', core: false, pro: true, elite: true, vip: true },
    { name: 'Personal Trainer Sessions Included', core: '1 Assessment', pro: '4 Sessions', elite: '12 Sessions', vip: '24 VIP Sessions' },
    { name: 'Customized Indian Macro Diet Blueprint', core: false, pro: true, elite: true, vip: true },
    { name: 'Finnish Sauna & Ice Bath Recovery', core: false, pro: false, elite: true, vip: true },
    { name: 'Dedicated Permanent Luxury Locker', core: false, pro: false, elite: true, vip: true },
    { name: 'Free Guest Passes per Year', core: '0 Passes', pro: '2 Passes', elite: '6 Passes', vip: 'Unlimited Guests' },
    { name: 'Head Coach Vikram Supervision', core: false, pro: false, elite: false, vip: true },
  ];

  const faqs = [
    {
      q: 'How does the digital QR access work at GYM CORE?',
      a: 'Upon activating your membership, your personal encrypted QR pass is instantly generated in your Member Dashboard. Simply hold your phone screen to the optical scanner at our Neota entrance turnstile for instant contactless entry.',
    },
    {
      q: 'Can I pay using any Indian UPI app?',
      a: 'Yes! Our gateway supports PhonePe, Google Pay, Paytm, BHIM, and any bank UPI app. You can scan the dynamic QR code or send payment to gymcore.jaipur@icici with instant membership activation.',
    },
    {
      q: 'Is there any registration or locker maintenance charge?',
      a: 'Zero hidden fees. The displayed price is completely inclusive of GST, turnstile card calibration, shower facilities, and filtered hydration stations.',
    },
    {
      q: 'Can I freeze my membership if I travel outside Jaipur?',
      a: 'Yes, members on the Pro Athlete and Elite Annual plans can pause their membership for up to 30 days per year with zero penalty.',
    },
  ];

  return (
    <div className="pt-24 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
          Tiered Investment in Longevity
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          Membership Plans
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Select your training tier. Instant UPI activation, automated QR access pass generation,
          and immediate trainer consultation booking.
        </p>
      </div>

      {/* Plans Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {memberships.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 sm:p-7 rounded-3xl bg-neutral-950 border flex flex-col justify-between relative transition-all duration-300 ${
              plan.popular
                ? 'border-orange-500 shadow-2xl shadow-orange-500/15 scale-[1.02]'
                : 'border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-lg">
                Most Popular Choice
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-black text-xl text-white uppercase">{plan.name}</h3>
                <p className="text-xs text-neutral-400 mt-1">{plan.tagline}</p>
              </div>

              <div className="py-2.5 border-y border-neutral-900">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                    ₹{plan.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-neutral-400">
                    / {plan.durationMonths} Mo{plan.durationMonths > 1 ? 's' : ''}
                  </span>
                </div>
                {plan.originalPrice && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs line-through text-neutral-500 font-mono">
                      ₹{plan.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">
                      Save ₹{(plan.originalPrice - plan.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-neutral-400 space-y-1">
                <p>
                  <strong className="text-neutral-200">Access:</strong> {plan.accessHours}
                </p>
                <p>
                  <strong className="text-neutral-200">PT Sessions:</strong> {plan.trainerSessionsIncluded} 1-on-1 Sessions
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 text-xs text-neutral-300 pt-2 border-t border-neutral-900">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-900">
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Join & Pay via UPI</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">
            Side-By-Side Comparison
          </span>
          <h2 className="text-2xl font-black uppercase text-white mt-1">Tier Features Matrix</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Feature / Benefit</th>
                <th className="py-3 px-4 text-center">Core</th>
                <th className="py-3 px-4 text-center text-orange-400">Pro Athlete</th>
                <th className="py-3 px-4 text-center">Elite Annual</th>
                <th className="py-3 px-4 text-center">Hardcore VIP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 text-neutral-300">
              {comparisonFeatures.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-900/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">{row.name}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.core === 'boolean' ? (
                      row.core ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-neutral-600 mx-auto" />
                    ) : (
                      <span className="font-mono">{row.core}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center bg-orange-500/5 font-semibold text-white">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-neutral-600 mx-auto" />
                    ) : (
                      <span className="font-mono text-orange-400 font-bold">{row.pro}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.elite === 'boolean' ? (
                      row.elite ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-neutral-600 mx-auto" />
                    ) : (
                      <span className="font-mono font-bold text-white">{row.elite}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.vip === 'boolean' ? (
                      row.vip ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-neutral-600 mx-auto" />
                    ) : (
                      <span className="font-mono font-bold text-amber-400">{row.vip}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
            Clarity & Policies
          </span>
          <h2 className="text-3xl font-black uppercase text-white">Membership FAQ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <h3 className="text-sm font-extrabold text-white flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* UPI Payment Modal */}
      <UpiPaymentModal
        plan={selectedPlan}
        isOpen={upiModalOpen}
        onClose={() => setUpiModalOpen(false)}
      />
    </div>
  );
};
