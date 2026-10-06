import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { useAuth } from '../context/AuthContext';
import {
  Star,
  MessageSquare,
  PlusCircle,
  X,
  CheckCircle2,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Reviews: React.FC = () => {
  const { reviews, submitReview } = useGymData();
  const { user } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState('Mahindra SEZ, Jaipur');
  const [rating, setRating] = useState<number>(5);
  const [programTaken, setProgramTaken] = useState('PRO ATHLETE (Hypertrophy)');
  const [comment, setComment] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview({
      userName: name.trim() || 'Gym Member',
      userAvatar:
        user?.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating,
      comment: comment.trim(),
      programTaken,
      location,
    });

    setSuccess(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#fbbf24', '#ffffff'],
    });

    setTimeout(() => {
      setModalOpen(false);
      setSuccess(false);
      setComment('');
    }, 2500);
  };

  const approvedReviews = reviews.filter((r) => r.isApproved);

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
        <div className="space-y-3">
          <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
            Member Testimonials
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            Reviews & Ratings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Rated 4.95 / 5.0 by 400+ verified athletes across Neota, Kalwada, and Mahindra World City SEZ, Jaipur.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Ratings Aggregate Banner */}
      <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="text-center md:text-left space-y-2">
          <span className="text-xs text-neutral-400 uppercase font-bold tracking-wider">Overall Rating</span>
          <div className="text-5xl font-black text-white font-mono flex items-center justify-center md:justify-start gap-2">
            <span>4.95</span>
            <span className="text-xl text-neutral-500 font-normal">/ 5.0</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">5 Stars (96%)</span>
            <div className="h-2 w-48 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-[96%]" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">4 Stars (4%)</span>
            <div className="h-2 w-48 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[4%]" />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs space-y-1 text-neutral-300">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Verified Members</span>
          </div>
          <p className="text-[11px] text-neutral-400">
            Only active turnstile keycard holders can submit verified feedback.
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-orange-500/40 transition-colors shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">{rev.date}</span>
              </div>

              <p className="text-xs text-neutral-200 leading-relaxed">"{rev.comment}"</p>
            </div>

            <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={rev.userAvatar}
                  alt={rev.userName}
                  className="w-9 h-9 rounded-full object-cover border border-orange-500/30"
                />
                <div>
                  <h4 className="font-bold text-white text-xs">{rev.userName}</h4>
                  <p className="text-[10px] text-neutral-500">{rev.location}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-orange-400 font-bold border border-neutral-800">
                {rev.programTaken.split(' ')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 text-white max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  Member Feedback
                </span>
                <h3 className="text-xl font-black uppercase text-white mt-0.5">
                  Write Your Review
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!success ? (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-neutral-300 block mb-1">Your Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-2xl transition-transform hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-400 ml-2">{rating} Stars</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-300 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 block mb-1">Location / SEZ Company</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Program Taken</label>
                  <select
                    value={programTaken}
                    onChange={(e) => setProgramTaken(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="PRO ATHLETE (Hypertrophy)">PRO ATHLETE (Hypertrophy)</option>
                    <option value="CORE ESSENTIALS">CORE ESSENTIALS</option>
                    <option value="ELITE ANNUAL CLUB">ELITE ANNUAL CLUB</option>
                    <option value="Women Fitness & Strength">Women Fitness & Strength</option>
                    <option value="Hardcore VIP Pro">Hardcore VIP Pro</option>
                  </select>
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Your Review & Experience</label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe equipment quality, coach coaching style, locker cleanliness, and community vibe..."
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/25"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit Review for Verification
                  </button>
                  <p className="text-[10px] text-neutral-500 text-center mt-2">
                    Review will be displayed publicly following admin validation.
                  </p>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-white">Review Submitted!</h4>
                <p className="text-xs text-neutral-400">
                  Thank you! Your feedback has been queued for verification.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
