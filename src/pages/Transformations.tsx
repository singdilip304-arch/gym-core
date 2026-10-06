import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { useAuth } from '../context/AuthContext';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  PlusCircle,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Transformations: React.FC = () => {
  const { transformations, submitTransformation } = useGymData();
  const { user } = useAuth();

  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age || 26);
  const [weeks, setWeeks] = useState(16);
  const [startWeight, setStartWeight] = useState(82);
  const [endWeight, setEndWeight] = useState(76);
  const [startBf, setStartBf] = useState(22);
  const [endBf, setEndBf] = useState(15);
  const [program, setProgram] = useState('PRO ATHLETE (Hypertrophy)');
  const [trainer, setTrainer] = useState('Vikram Singh Shekhawat');
  const [quote, setQuote] = useState('');
  const [beforeUrl, setBeforeUrl] = useState(
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80'
  );
  const [afterUrl, setAfterUrl] = useState(
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTransformation({
      name: name.trim() || 'Gym Core Athlete',
      age: Number(age),
      durationWeeks: Number(weeks),
      weightLostKg: Math.max(0, Number((startWeight - endWeight).toFixed(1))),
      muscleGainedKg: Number((startBf > endBf ? 2.5 : 1.5).toFixed(1)),
      beforeImage: beforeUrl,
      afterImage: afterUrl,
      program,
      trainer,
      quote: quote.trim() || 'Consistency and progressive overload at GYM CORE changed my life.',
      metrics: {
        startWeight: Number(startWeight),
        endWeight: Number(endWeight),
        startBodyFat: Number(startBf),
        endBodyFat: Number(endBf),
      },
    });

    setSubmittedSuccess(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#10b981', '#ffffff'],
    });

    setTimeout(() => {
      setSubmitModalOpen(false);
      setSubmittedSuccess(false);
      setQuote('');
    }, 2500);
  };

  const approvedStories = transformations.filter((t) => t.isApproved);

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
        <div className="space-y-3">
          <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
            Proven Results
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            Transformations
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Real members. Verified biometric body composition scans. From software engineers at Mahindra SEZ
            to competitive Jaipur powerlifters.
          </p>
        </div>

        <button
          onClick={() => setSubmitModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit Your Story</span>
        </button>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {approvedStories.map((story) => (
          <div
            key={story.id}
            className="rounded-3xl bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between space-y-5 hover:border-orange-500/40 transition-colors shadow-xl"
          >
            {/* Side-by-side Before / After Visual */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden relative">
                <div className="relative">
                  <img
                    src={story.beforeImage}
                    alt={`${story.name} Before`}
                    className="w-full h-52 object-cover object-top"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[10px] font-bold text-neutral-300">
                    BEFORE
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={story.afterImage}
                    alt={`${story.name} After`}
                    className="w-full h-52 object-cover object-top"
                  />
                  <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded bg-orange-500 text-[10px] font-bold text-white shadow">
                    AFTER
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <h3 className="text-lg font-black text-white">{story.name}</h3>
                  <p className="text-[11px] text-orange-400 font-semibold">{story.program}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono font-bold text-white">
                  {story.durationWeeks} Weeks
                </span>
              </div>

              <p className="text-xs text-neutral-300 italic pt-1 leading-relaxed">
                "{story.quote}"
              </p>
            </div>

            {/* Metrics Breakdown Box */}
            <div className="space-y-3 pt-3 border-t border-neutral-900">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                  <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Bodyweight</span>
                  <span className="font-mono font-black text-white text-sm">
                    {story.metrics.startWeight}kg → {story.metrics.endWeight}kg
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                  <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Body Fat %</span>
                  <span className="font-mono font-black text-emerald-400 text-sm">
                    {story.metrics.startBodyFat}% → {story.metrics.endBodyFat}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span>Coached by {story.trainer}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Biometrics Verified
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 text-white max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  Member Achievements
                </span>
                <h3 className="text-xl font-black uppercase text-white mt-0.5">
                  Submit Your Transformation
                </h3>
              </div>
              <button
                onClick={() => setSubmitModalOpen(false)}
                className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!submittedSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
                    <label className="text-neutral-300 block mb-1">Duration (Weeks)</label>
                    <input
                      type="number"
                      required
                      value={weeks}
                      onChange={(e) => setWeeks(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="text-neutral-400 block mb-1">Start Wt (kg)</label>
                    <input
                      type="number"
                      value={startWeight}
                      onChange={(e) => setStartWeight(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">End Wt (kg)</label>
                    <input
                      type="number"
                      value={endWeight}
                      onChange={(e) => setEndWeight(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">Start BF (%)</label>
                    <input
                      type="number"
                      value={startBf}
                      onChange={(e) => setStartBf(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">End BF (%)</label>
                    <input
                      type="number"
                      value={endBf}
                      onChange={(e) => setEndBf(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Program Followed</label>
                  <input
                    type="text"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Your Story / Quote</label>
                  <textarea
                    rows={3}
                    required
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Share how GYM CORE training, coaches, or facilities helped you achieve your target..."
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit to Moderation Queue
                  </button>
                  <p className="text-[10px] text-neutral-500 text-center mt-2">
                    Submissions are verified by the GYM CORE head trainer before public display.
                  </p>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-white">Story Submitted!</h4>
                <p className="text-xs text-neutral-400">
                  Your transformation has been sent to the Admin Moderation Queue for verification.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
