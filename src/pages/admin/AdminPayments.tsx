import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  CreditCard,
  Search,
  CheckCircle2,
  Printer,
  Download,
  Filter,
} from 'lucide-react';

export const AdminPayments: React.FC = () => {
  const { payments } = useGymData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = payments.filter((p) => {
    const matchSearch =
      p.userName.toLowerCase().includes(search.toLowerCase()) ||
      p.planName.toLowerCase().includes(search.toLowerCase()) ||
      p.upiRef.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalCollected = payments.reduce((acc, p) => acc + (p.status === 'completed' ? p.amount : 0), 0);

  return (
    <DashboardLayout
      activeRole="admin"
      title="Revenue Intelligence & UPI Transactions"
      subtitle="Complete ledger of membership payments, UPI references, and invoice logs."
    >
      <div className="space-y-6">
        {/* Top Summary Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
              Total Realized Collections
            </span>
            <div className="text-3xl font-black text-emerald-400 font-mono">
              ₹{totalCollected.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-neutral-400">All Completed UPI & Gateway receipts</p>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
              Total Transactions
            </span>
            <div className="text-3xl font-black text-white font-mono">{payments.length}</div>
            <p className="text-xs text-neutral-400">Recorded invoices in database</p>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
              Gateway Merchant ID
            </span>
            <div className="text-base font-bold text-orange-400 font-mono mt-1">gymcore.jaipur@icici</div>
            <p className="text-xs text-neutral-500">ICICI Bank UPI Merchant QR</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by member, invoice, or UPI UTR reference..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            {['all', 'completed', 'pending'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-orange-500 text-white'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Payments Table */}
        <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Invoice #</th>
                  <th className="py-3 px-3">Member</th>
                  <th className="py-3 px-3">Plan Enrolled</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">UPI Ref / UTR</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {filtered.map((pay) => (
                  <tr key={pay.id} className="hover:bg-neutral-900/50">
                    <td className="py-3.5 px-3 font-mono font-bold text-white">{pay.date}</td>
                    <td className="py-3.5 px-3 font-mono text-neutral-400">{pay.invoiceNumber}</td>
                    <td className="py-3.5 px-3 font-bold text-white">{pay.userName}</td>
                    <td className="py-3.5 px-3 text-orange-400 font-semibold">{pay.planName}</td>
                    <td className="py-3.5 px-3 font-mono font-black text-white text-sm">
                      ₹{pay.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-neutral-400">{pay.upiRef}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {pay.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => window.print()}
                        className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title="Print / Save Tax Invoice"
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
    </DashboardLayout>
  );
};
