import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import {
  TrendingUp,
  PlusCircle,
  X,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowDown,
  ArrowUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MemberProgress: React.FC = () => {
  const { user } = useAuth();
  const { progressLogs, addProgressLog } = useGymData();

  const userLogs = progressLogs.filter(
    (l) => l.userId === (user?.id || 'usr_member_1')
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState(78.2);
  const [newBf, setNewBf] = useState(14.4);
  const [newChest, setNewChest] = useState(107);
  const [newArms, setNewArms] = useState(38.8);
  const [newWaist, setNewWaist] = useState(79.5);
  const [newThighs, setNewThighs] = useState(61);
  const [newNotes, setNewNotes] = useState('');

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    addProgressLog({
      userId: user?.id || 'usr_member_1',
      date: new Date().toISOString().split('T')[0],
      weight: Number(newWeight),
      bodyFatPercent: Number(newBf),
      chestCm: Number(newChest),
      armsCm: Number(newArms),
      waistCm: Number(newWaist),
      thighsCm: Number(newThighs),
      notes: newNotes.trim() || 'Logged via Member Dashboard',
    });

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#10b981', '#ffffff'],
    });

    setModalOpen(false);
    setNewNotes('');
  };

  const earliest = userLogs[0];
  const latest = userLogs[userLogs.length - 1] || earliest;
  const weightDiff = earliest && latest ? Number((latest.weight - earliest.weight).toFixed(1)) : 0;
  const bfDiff =
    earliest?.bodyFatPercent && latest?.bodyFatPercent
      ? Number((latest.bodyFatPercent - earliest.bodyFatPercent).toFixed(1))
      : 0;

  return (
    <DashboardLayout
      activeRole="member"
      title="Biometric Progress Tracker"
      subtitle="Track your weight, body fat %, and circumference changes over time."
    >
      <div className="space-y-6">
        {/* Header Action Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Current Weight</span>
              <span className="text-2xl font-black text-white font-mono">{latest?.weight || 78.5} kg</span>
              <span className="text-[10px] text-emerald-400 block font-semibold">
                {weightDiff < 0 ? `${weightDiff} kg` : `+${weightDiff} kg`}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Body Fat %</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {latest?.bodyFatPercent || 14.6}%
              </span>
              <span className="text-[10px] text-emerald-400 block font-semibold">{bfDiff}%</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Chest Circumference</span>
              <span className="text-2xl font-black text-white font-mono">{latest?.chestCm || 106.5} cm</span>
              <span className="text-[10px] text-orange-400 block font-semibold">+5.5 cm Growth</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Arms Flexed</span>
              <span className="text-2xl font-black text-white font-mono">{latest?.armsCm || 38.5} cm</span>
              <span className="text-[10px] text-orange-400 block font-semibold">+3.0 cm Peak</span>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="py-3 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Biometrics</span>
          </button>
        </div>

        {/* Clean Interactive SVG Trend Chart */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-orange-400 uppercase font-bold tracking-wider">
                Progress Curve
              </span>
              <h3 className="text-lg font-black text-white uppercase">Weight (KG) Trendline</h3>
            </div>
            <span className="text-xs text-neutral-500 font-mono">InBody Scans • Neota Arena</span>
          </div>

          {/* SVG Line Visualizer */}
          <div className="w-full h-48 sm:h-64 relative flex items-end pt-8">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5500" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ff5500" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area Under Curve */}
              <polygon
                points="10,130 10,20 125,50 250,75 375,100 490,115 490,130"
                fill="url(#trendGrad)"
              />

              {/* Connecting Line */}
              <polyline
                fill="none"
                stroke="#ff5500"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="10,20 125,50 250,75 375,100 490,115"
              />

              {/* Data points */}
              {[
                { x: 10, y: 20, val: '84.2kg', label: 'Jun' },
                { x: 125, y: 50, val: '82.0kg', label: 'Jul' },
                { x: 250, y: 75, val: '80.4kg', label: 'Aug' },
                { x: 375, y: 100, val: '79.2kg', label: 'Sep' },
                { x: 490, y: 115, val: '78.5kg', label: 'Oct' },
              ].map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#ff5500" strokeWidth="3" />
                  <text x={pt.x} y={pt.y - 10} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {pt.val}
                  </text>
                  <text x={pt.x} y={145} fill="#737373" fontSize="10" textAnchor="middle">
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* History Table */}
        <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
            Historical Measurement Records
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Weight (kg)</th>
                  <th className="py-3 px-3">Body Fat %</th>
                  <th className="py-3 px-3">Chest (cm)</th>
                  <th className="py-3 px-3">Arms (cm)</th>
                  <th className="py-3 px-3">Waist (cm)</th>
                  <th className="py-3 px-3">Notes & Observations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {userLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-900/50">
                    <td className="py-3 px-3 font-mono font-bold text-white">{log.date}</td>
                    <td className="py-3 px-3 font-mono font-bold text-orange-400">{log.weight}</td>
                    <td className="py-3 px-3 font-mono text-emerald-400">{log.bodyFatPercent}%</td>
                    <td className="py-3 px-3 font-mono">{log.chestCm || '—'}</td>
                    <td className="py-3 px-3 font-mono">{log.armsCm || '—'}</td>
                    <td className="py-3 px-3 font-mono">{log.waistCm || '—'}</td>
                    <td className="py-3 px-3 text-neutral-400 italic text-[11px]">{log.notes || 'Normal progression'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Log Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 text-white max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  Record Entry
                </span>
                <h3 className="text-xl font-black uppercase text-white mt-0.5">
                  Log Biometric Measurements
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Bodyweight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Body Fat %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newBf}
                    onChange={(e) => setNewBf(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="text-neutral-400 block mb-1">Chest (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newChest}
                    onChange={(e) => setNewChest(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Arms (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newArms}
                    onChange={(e) => setNewArms(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Waist (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newWaist}
                    onChange={(e) => setNewWaist(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Thighs (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newThighs}
                    onChange={(e) => setNewThighs(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Notes / PR Milestones</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Hit new PR 100kg Bench Press today..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Biometric Entry</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
