import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  MessageSquare,
  Sparkles,
  Star,
  CheckCircle2,
  Trash2,
  ThumbsUp,
  Image as ImageIcon,
  Flame,
  Award,
  Filter,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminReviews: React.FC = () => {
  const {
    reviews,
    approveReview,
    deleteReview,
    transformations,
    approveTransformation,
    deleteTransformation,
  } = useGymData();

  const [activeTab, setActiveTab] = useState<'reviews' | 'transformations'>('reviews');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const filteredReviews = reviews.filter((r) => {
    if (filter === 'pending') return !r.isApproved;
    if (filter === 'approved') return r.isApproved;
    return true;
  });

  const filteredTransformations = transformations.filter((t) => {
    if (filter === 'pending') return !t.isApproved;
    if (filter === 'approved') return t.isApproved;
    return true;
  });

  const handleApproveReview = (id: string) => {
    approveReview(id);
    confetti({ particleCount: 35, spread: 50, colors: ['#ff5500', '#10b981'] });
  };

  const handleApproveTransform = (id: string) => {
    approveTransformation(id);
    confetti({ particleCount: 45, spread: 60, colors: ['#ff5500', '#f59e0b'] });
  };

  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <DashboardLayout
      activeRole="admin"
      title="Moderation & Social Proof Control"
      subtitle="Verify incoming member reviews and body transformation case studies before public publishing."
    >
      <div className="space-y-6">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
              Average Google & Member Score
            </span>
            <div className="text-2xl font-black text-amber-400 mt-1 flex items-center gap-1.5">
              <span>{avgRating}</span>
              <div className="flex text-amber-400 text-sm">
                {'★'.repeat(Math.round(Number(avgRating)))}
              </div>
            </div>
            <p className="text-xs text-neutral-400 mt-1">From {reviews.length} total reviews</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
              Pending Reviews
            </span>
            <div className="text-2xl font-black text-orange-400 mt-1">
              {reviews.filter((r) => !r.isApproved).length}
            </div>
            <p className="text-xs text-neutral-400 mt-1">Awaiting moderation approval</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
              Transformation Stories
            </span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {transformations.length}
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              {transformations.filter((t) => !t.isApproved).length} Pending Review
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
              Neota / Jaipur Brand Reach
            </span>
            <div className="text-2xl font-black text-white mt-1">99.2%</div>
            <p className="text-xs text-neutral-400 mt-1">Positive sentiment index</p>
          </div>
        </div>

        {/* Tab & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'reviews'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Reviews ({reviews.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('transformations')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'transformations'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Transformations ({transformations.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Content</option>
              <option value="pending">Pending Approval Only</option>
              <option value="approved">Approved & Live</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReviews.length === 0 ? (
              <div className="col-span-2 p-8 text-center text-neutral-500 rounded-2xl border border-neutral-800 bg-neutral-950">
                No reviews found matching filter.
              </div>
            ) : (
              filteredReviews.map((r) => (
                <div
                  key={r.id}
                  className="p-5 rounded-2xl border border-neutral-800 bg-neutral-950 space-y-3 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{r.userName}</div>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                        <span className="text-orange-400 font-semibold">{r.programTaken}</span>
                        <span>•</span>
                        <span>{r.date}</span>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {'★'.repeat(r.rating)}
                      <span className="text-neutral-700">{'★'.repeat(5 - r.rating)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    "{r.comment}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        r.isApproved
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {r.isApproved ? 'Live on Site' : 'Pending Verification'}
                    </span>

                    <div className="flex items-center gap-2">
                      {!r.isApproved && (
                        <button
                          onClick={() => handleApproveReview(r.id)}
                          className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs cursor-pointer flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(r.id)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                        title="Delete review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Transformations List */}
        {activeTab === 'transformations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTransformations.length === 0 ? (
              <div className="col-span-2 p-8 text-center text-neutral-500 rounded-2xl border border-neutral-800 bg-neutral-950">
                No transformation stories found matching filter.
              </div>
            ) : (
              filteredTransformations.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl border border-neutral-800 bg-neutral-950 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-base">
                        {t.name}, {t.age} yrs
                      </h4>
                      <p className="text-xs text-orange-400">
                        {t.program} with {t.trainer} • {t.durationWeeks} Weeks
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        t.isApproved
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {t.isApproved ? 'Published' : 'Pending'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                    <div className="relative aspect-4/3">
                      <img
                        src={t.beforeImage}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-bold text-neutral-300">
                        BEFORE
                      </span>
                    </div>
                    <div className="relative aspect-4/3">
                      <img
                        src={t.afterImage}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-orange-500 text-[10px] font-bold text-white">
                        AFTER
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-850">
                      <div className="text-[10px] text-neutral-500 uppercase font-bold">Bodyweight</div>
                      <div className="font-mono font-bold text-white mt-0.5">
                        {t.metrics.startWeight}kg → {t.metrics.endWeight}kg
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-850">
                      <div className="text-[10px] text-neutral-500 uppercase font-bold">Body Fat %</div>
                      <div className="font-mono font-bold text-orange-400 mt-0.5">
                        {t.metrics.startBodyFat}% → {t.metrics.endBodyFat}%
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 italic">"{t.quote}"</p>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-900">
                    {!t.isApproved && (
                      <button
                        onClick={() => handleApproveTransform(t.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs cursor-pointer flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Publish to Gallery</span>
                      </button>
                    )}
                    <button
                      onClick={() => deleteTransformation(t.id)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                      title="Delete Story"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
