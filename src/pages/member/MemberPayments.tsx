import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import { UpiPaymentModal } from '../../components/ui/UpiPaymentModal';
import {
  CreditCard,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { MembershipPlan } from '../../types';

export const MemberPayments: React.FC = () => {
  const { user } = useAuth();
  const { payments, memberships } = useGymData();

  const [upiModalOpen, setUpiModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);

  const currentUser = user || {
    id: 'usr_member_1',
    name: 'Aman Verma',
    email: 'aman.verma@example.com',
    membershipPlanName: 'PRO ATHLETE (3-Month)',
    membershipStatus: 'active' as const,
    membershipExpiresAt: '2026-12-15',
  };

  const userPayments = payments.filter(
    (p) => p.userId === currentUser.id || p.userName === currentUser.name
  );

  const handleRenewClick = () => {
    const defaultPlan = memberships.find((p) => p.id === 'plan_pro_quarterly') || memberships[0];
    setSelectedPlan(defaultPlan);
    setUpiModalOpen(true);
  };

  return (
    <DashboardLayout
      activeRole="member"
      title="Billing & Membership Pass"
      subtitle="View payment history, download tax invoices, and renew your membership."
    >
      <div className="space-y-6">
        {/* Active Membership Status Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Current Active Tier
              </span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase">
              {currentUser.membershipPlanName || 'PRO ATHLETE (3-Month)'}
            </h3>
            <p className="text-xs text-neutral-400">
              Valid through: <strong className="text-white">{currentUser.membershipExpiresAt || '2026-12-15'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRenewClick}
              className="py-3 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Renew with UPI</span>
            </button>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              UPI Transactions & Invoices
            </h4>
            <span className="text-[11px] text-neutral-500 font-mono">
              {userPayments.length} Total Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Invoice #</th>
                  <th className="py-3 px-3">Membership Plan</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Method & Ref</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {userPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-900/50">
                    <td className="py-3.5 px-3 font-mono font-bold text-white">{p.date}</td>
                    <td className="py-3.5 px-3 font-mono text-neutral-400">{p.invoiceNumber}</td>
                    <td className="py-3.5 px-3 font-bold text-white">{p.planName}</td>
                    <td className="py-3.5 px-3 font-mono font-black text-white text-sm">
                      ₹{p.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-3 text-[11px] font-mono text-neutral-400">
                      <span className="text-orange-400 font-bold">{p.paymentMethod}</span> • {p.upiRef}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => window.print()}
                        className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title="Print / Download Receipt"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UpiPaymentModal
        plan={selectedPlan}
        isOpen={upiModalOpen}
        onClose={() => setUpiModalOpen(false)}
      />
    </DashboardLayout>
  );
};
