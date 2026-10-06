import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  Bell,
  PlusCircle,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Info,
  PartyPopper,
  Flame,
  Radio,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminNotifications: React.FC = () => {
  const { announcements, addAnnouncement, toggleAnnouncement, deleteAnnouncement } =
    useGymData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'celebration' | 'urgent'>('info');
  const [targetRole, setTargetRole] = useState<'all' | 'member' | 'trainer'>('all');

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    addAnnouncement({
      title,
      message,
      type,
      author: 'GYM CORE Administration',
      targetRole,
      active: true,
    });

    confetti({ particleCount: 35, spread: 50, colors: ['#ff5500', '#3b82f6'] });
    setIsModalOpen(false);
    setTitle('');
    setMessage('');
  };

  return (
    <DashboardLayout
      activeRole="admin"
      title="Broadcast Communications & Alerts"
      subtitle="Publish instant app notices, festival schedule alerts, and training announcements."
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {announcements.filter((a) => a.active).length} Active Live Broadcasts
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>DISPATCH BROADCAST NOTICE</span>
          </button>
        </div>

        {/* Announcements List */}
        <div className="space-y-3">
          {announcements.map((item) => {
            const isInfo = item.type === 'info';
            const isWarning = item.type === 'warning';
            const isUrgent = item.type === 'urgent';
            const isParty = item.type === 'celebration';

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all ${
                  item.active
                    ? isUrgent
                      ? 'bg-red-950/20 border-red-500/40'
                      : isWarning
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : 'bg-neutral-950 border-neutral-800'
                    : 'bg-neutral-950/40 border-neutral-900 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isUrgent
                          ? 'bg-red-500/20 text-red-400'
                          : isWarning
                          ? 'bg-amber-500/20 text-amber-400'
                          : isParty
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {isUrgent && <AlertTriangle className="w-5 h-5" />}
                      {isWarning && <AlertTriangle className="w-5 h-5" />}
                      {isParty && <PartyPopper className="w-5 h-5" />}
                      {isInfo && <Info className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">{item.title}</h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            isUrgent
                              ? 'bg-red-500/20 text-red-300'
                              : isWarning
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}
                        >
                          {item.type}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-neutral-850 text-neutral-400">
                          Audience: {item.targetRole?.toUpperCase() || 'ALL'}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{item.message}</p>
                      <div className="text-[11px] text-neutral-500 mt-2 flex items-center gap-3">
                        <span>Issued by: {item.author}</span>
                        <span>•</span>
                        <span>{new Date(item.createdAt).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAnnouncement(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        item.active
                          ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {item.active ? 'Active' : 'Muted'}
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(item.id)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                      title="Delete notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Broadcast Creator Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-neutral-950 border border-neutral-800 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-black text-lg text-white">Create Broadcast Alert</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-bold">Alert Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Special Holiday Hours / Diwali Timing"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1 font-bold">Notice Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  >
                    <option value="info">General Info</option>
                    <option value="warning">Maintenance / Schedule</option>
                    <option value="urgent">Urgent Operational</option>
                    <option value="celebration">Celebration / Festival</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-bold">Audience</label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  >
                    <option value="all">All Members & Coaches</option>
                    <option value="member">Members Only</option>
                    <option value="trainer">Trainers Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-bold">Notice Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed notification copy for dashboard display..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Broadcast Instantly</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
