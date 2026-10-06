import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGymData } from '../context/GymDataContext';
import { useAuth } from '../context/AuthContext';
import {
  ArrowRight,
  Flame,
  Dumbbell,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  Phone,
  MessageSquare,
  Star,
  Users,
  Award,
  Clock,
  ChevronRight,
  Zap,
  Activity,
  Bot,
} from 'lucide-react';
import { UpiPaymentModal } from '../components/ui/UpiPaymentModal';
import { AiAssistantModal } from '../components/ui/AiAssistantModal';
import { MembershipPlan } from '../types';

export const Home: React.FC = () => {
  const { memberships, trainers, reviews, transformations, gallery } = useGymData();
  const { user } = useAuth();

  const [selectedPlanForUpi, setSelectedPlanForUpi] = useState<MembershipPlan | null>(null);
  const [upiModalOpen, setUpiModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // Quick BMI widget on home
  const [quickHeight, setQuickHeight] = useState(175);
  const [quickWeight, setQuickWeight] = useState(74);
  const quickBmi = Number((quickWeight / ((quickHeight / 100) * (quickHeight / 100))).toFixed(1));

  const handleJoinPlan = (plan: MembershipPlan) => {
    setSelectedPlanForUpi(plan);
    setUpiModalOpen(true);
  };

  const programsPreview = [
    { title: 'Muscle Building', subtitle: 'Hypertrophy & progressive overload', icon: Dumbbell, color: 'from-orange-500/20 to-orange-600/5' },
    { title: 'Fat Loss Shred', subtitle: 'High metabolic burn & deficit protocols', icon: Flame, color: 'from-red-500/20 to-red-600/5' },
    { title: 'Powerlifting 1RM', subtitle: 'Peak squat, bench, deadlift numbers', icon: Zap, color: 'from-amber-500/20 to-amber-600/5' },
    { title: 'Hardcore Bodybuilding', subtitle: 'Symmetry, density, stage condition', icon: Award, color: 'from-purple-500/20 to-purple-600/5' },
    { title: 'Beginner Foundations', subtitle: 'Form mastery & injury prevention', icon: ShieldCheck, color: 'from-emerald-500/20 to-emerald-600/5' },
    { title: 'Women Strength & Tone', subtitle: 'Glute hypertrophy & core posture', icon: Sparkles, color: 'from-pink-500/20 to-pink-600/5' },
    { title: 'Athlete Cross-Turf', subtitle: 'VO2 max, sleds & sprint endurance', icon: Activity, color: 'from-sky-500/20 to-sky-600/5' },
    { title: 'Personal Coaching', subtitle: '1-on-1 daily accountability', icon: Users, color: 'from-orange-500/20 to-orange-600/5' },
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85"
            alt="GYM CORE Strength Arena Neota Jaipur"
            className="w-full h-full object-cover object-center opacity-25 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-dark opacity-80" />
        </div>

        {/* Ambient energetic glow elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-neutral-300">
              JAIPUR’S PREMIER STRENGTH & PERFORMANCE CLUB • NEOTA / MAHINDRA SEZ
            </span>
          </div>

          {/* Main Hero Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.02]">
              BUILD YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400">STRONGEST</span> SELF
            </h1>
            <p className="text-base sm:text-xl text-neutral-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Train smarter. Build stronger. Become unstoppable. Hardcore bodybuilding meets high-tech biometric training in Mahindra World City SEZ, Jaipur.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/membership"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>JOIN NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/free-trial"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-white font-extrabold text-sm uppercase tracking-wider backdrop-blur-sm active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>START FREE TRIAL</span>
            </Link>

            <button
              onClick={() => setAiModalOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-neutral-950/80 hover:bg-neutral-900 border border-orange-500/40 text-orange-400 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>AI COACH</span>
            </button>
          </div>

          {/* Quick Features Row */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-neutral-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-500" /> 24/7 RFID Turnstile Access
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-500" /> Eleiko & Hammer Strength Equipment
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-500" /> Finnish Sauna & Ice Bath Recovery
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-500" /> Certified Nutrition & Biometrics
            </span>
          </div>
        </div>
      </section>

      {/* 2. STATS & TRUST COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: '1,800+', label: 'Active Iron Members', sub: 'Jaipur & SEZ community' },
            { value: '15+', label: 'Elite Coaches', sub: 'ACE, ACSM & CSCS certified' },
            { value: '4,500+', label: 'Transformations', sub: 'Verified physique results' },
            { value: '12,000', label: 'Sq. Ft Arena', sub: 'Heavy platforms & turf' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-neutral-950/90 border border-neutral-800/80 text-center relative overflow-hidden group hover:border-orange-500/40 transition-colors"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-mono tracking-tight group-hover:text-orange-500 transition-colors">
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-neutral-200 mt-2 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BRAND CREED & PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                Our Core Creed
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                Strength. Discipline. Consistency. Results.
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                GYM CORE was built to dismantle the mediocrity of standard commercial fitness centers.
                Located strategically between Neota and Mahindra World City SEZ in Jaipur, we engineered an
                authentic sanctum where corporate leaders, college athletes, competitive bodybuilders, and fitness
                beginners forge unbreakable discipline.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                  <h4 className="font-extrabold text-white text-sm">Hardcore Barbell Culture</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Calibrated competition bumper plates, chalk allowed, zero noise restrictions.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                  <h4 className="font-extrabold text-white text-sm">Next-Gen Technology</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    RFID QR check-ins, app-driven progressive overload logs & AI macro planning.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 uppercase tracking-wider"
                >
                  <span>Explore the GYM CORE Story</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80"
                  alt="GYM CORE Jaipur Facility"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[10px] text-orange-400 font-mono uppercase font-bold">
                      Neota / SEZ Flagship
                    </span>
                    <h3 className="text-lg font-black text-white">12,000 Sq. Ft Biomechanical Arena</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKOUT PROGRAMS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
              Structured Training Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
              Engineered Workout Programs
            </h2>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {programsPreview.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <Link
                key={idx}
                to="/programs"
                className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-all group flex flex-col justify-between h-52 relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white group-hover:text-orange-400 transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">{prog.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold group-hover:text-white pt-4 border-t border-neutral-900">
                  <span>Explore Blueprint</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. MEMBERSHIP TIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">
            Invest in Longevity & Strength
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Membership Plans
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Transparent pricing with 24/7 RFID digital access, sauna protocols, and zero hidden locker fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {memberships.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 sm:p-7 rounded-3xl bg-neutral-950 border flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? 'border-orange-500 shadow-2xl shadow-orange-500/10 scale-[1.02]'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-lg">
                  Most Popular Transformation
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-black text-xl text-white uppercase">{plan.name}</h3>
                  <p className="text-xs text-neutral-400 mt-1">{plan.tagline}</p>
                </div>

                <div className="py-2 border-y border-neutral-900">
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
                        Save {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 text-xs text-neutral-300">
                  {plan.features.slice(0, 5).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-900">
                <button
                  onClick={() => handleJoinPlan(plan)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800'
                  }`}
                >
                  <span>Select & Pay via UPI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. AI FITNESS ASSISTANT HERO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-orange-500/30 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-8 sm:p-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold">
              <Bot className="w-4 h-4" />
              <span>Next-Gen Biometric Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              GYM CORE AI Fitness Assistant
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Don’t guess your daily caloric burn or weekly split. Enter your height, weight, body goal, and available days.
              Our assistant calculates your exact Mifflin-St Jeor TDEE, macro split, and custom exercise sequence in seconds.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setAiModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-orange-500/25 flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch AI Coach Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. QUICK CALCULATORS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">
              Biometric Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
              Precision Fitness Calculators
            </h2>
          </div>
          <Link
            to="/calculators"
            className="text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>View All 6 Calculators (BMR, 1RM, Body Fat)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-white">Instant BMI & Body Metrics Estimator</h3>
            <p className="text-xs text-neutral-400">
              Drag the sliders below to estimate your Body Mass Index and check whether your current weight matches
              ideal athletic ranges.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-neutral-300">Height: {quickHeight} cm</span>
                  <span className="text-orange-400 font-mono">{(quickHeight / 30.48).toFixed(1)} Ft</span>
                </div>
                <input
                  type="range"
                  min="140"
                  max="210"
                  value={quickHeight}
                  onChange={(e) => setQuickHeight(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-neutral-300">Weight: {quickWeight} kg</span>
                  <span className="text-orange-400 font-mono">{(quickWeight * 2.20462).toFixed(1)} lbs</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="140"
                  value={quickWeight}
                  onChange={(e) => setQuickWeight(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-center items-center p-6 bg-neutral-900/70 border border-neutral-800 rounded-2xl text-center space-y-3">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Your BMI Score</span>
            <div className="text-5xl font-black text-white font-mono">{quickBmi}</div>
            <p className="text-xs text-emerald-400 font-bold">
              {quickBmi < 18.5
                ? 'Underweight'
                : quickBmi < 25
                ? 'Healthy / Athletic Range'
                : quickBmi < 30
                ? 'Overweight Zone'
                : 'Obese Zone'}
            </p>
            <Link
              to="/calculators"
              className="text-xs font-bold text-neutral-300 hover:text-white underline pt-1"
            >
              Open Full BMR & Calorie Calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. ELITE TRAINERS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">
              World-Class Mentorship
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
              Meet Our Head Coaches
            </h2>
          </div>
          <Link
            to="/trainers"
            className="text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>All Coaches & Credentials</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden hover:border-orange-500/40 transition-colors flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{t.rating} ({t.reviewsCount})</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-white">{t.name}</h3>
                  <p className="text-xs text-orange-400 font-medium">{t.role}</p>
                  <p className="text-[11px] text-neutral-400 mt-2 line-clamp-2">{t.bio}</p>
                </div>

                <div className="pt-3 border-t border-neutral-900">
                  <Link
                    to="/trainers"
                    className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-orange-500 hover:text-white text-neutral-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Book 1-on-1 Session</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. TRANSFORMATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">
            Undeniable Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Real Transformations
          </h2>
          <p className="text-xs text-neutral-400">
            Zero fads. Pure progressive overload, dedicated coaching, and dialed-in Indian nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transformations.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 flex flex-col justify-between"
            >
              <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden relative">
                <div className="relative">
                  <img src={item.beforeImage} alt={`${item.name} Before`} className="w-full h-48 object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-neutral-300">
                    BEFORE
                  </span>
                </div>
                <div className="relative">
                  <img src={item.afterImage} alt={`${item.name} After`} className="w-full h-48 object-cover" />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-orange-500 text-[10px] font-bold text-white">
                    AFTER
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">{item.name}</h3>
                  <span className="text-xs font-mono text-orange-400 font-bold">{item.durationWeeks} Weeks</span>
                </div>
                <p className="text-xs text-neutral-400 italic mt-1">"{item.quote}"</p>

                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                    <span className="text-[10px] text-neutral-500 block">Weight Shift</span>
                    <span className="font-bold text-white font-mono">
                      {item.metrics.startWeight}kg → {item.metrics.endWeight}kg
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                    <span className="text-[10px] text-neutral-500 block">Body Fat</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {item.metrics.startBodyFat}% → {item.metrics.endBodyFat}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. REVIEWS & RATINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Member Voice & Reviews
          </h2>
          <p className="text-xs text-neutral-400">
            Rated 4.95 / 5.0 across 400+ local athletes from Neota, Kalwada, and Mahindra World City SEZ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-neutral-500">{rev.date}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">"{rev.comment}"</p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-neutral-900">
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
            </div>
          ))}
        </div>
      </section>

      {/* 11. LOCATION & JAIPUR MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-2">
                  Visit Our Arena
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                  GYM CORE Flagship Neota
                </h2>
                <p className="text-xs text-neutral-400 mt-2">
                  Conveniently situated right next to Mahindra SEZ & Kalwada road with dedicated parking,
                  clean air filtration, and 24/7 RFID entry.
                </p>

                <div className="space-y-3 mt-6 text-xs text-neutral-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>Near Mahindra World City SEZ, Neota / Kalwada Road, Jaipur, Rajasthan 302037</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                    <a href="tel:+919829011223" className="font-mono text-white hover:underline">
                      +91 98290 11223
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>24/7 RFID Member Access • Staffed: 5:30 AM – 10:30 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-900">
                <a
                  href="https://maps.google.com/?q=Mahindra+World+City+Jaipur"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
                <a
                  href="https://wa.me/919829011223?text=Hi%20GYM%20CORE%2C%20I%20want%20to%20visit%20the%20Neota%20club"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-neutral-800"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Embedded Map Representation */}
            <div className="lg:col-span-7 h-80 lg:h-auto min-h-[350px] relative bg-neutral-900">
              <iframe
                title="GYM CORE Neota Jaipur Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14246.541459423668!2d75.6027581!3d26.8521199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4dca16c026cf%3A0xe5f9227c444f2ff4!2sMahindra%20World%20City%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale contrast-125 opacity-85"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 12. FREE TRIAL FINAL HIGH CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
              Ready to Start Your Transformation?
            </h2>
            <p className="text-sm sm:text-base font-medium opacity-90 max-w-xl mx-auto">
              Book your complimentary 1-Day All-Access Pass. Experience our heavy dumbbell racks, Eleiko plates, and meet our senior trainers at Neota SEZ.
            </p>
            <div className="pt-2">
              <Link
                to="/free-trial"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-neutral-950 text-white hover:bg-neutral-900 font-black text-sm uppercase tracking-wider shadow-2xl transition-transform active:scale-95"
              >
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>BOOK YOUR FREE TRIAL NOW</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* UPI Payment Modal */}
      <UpiPaymentModal
        plan={selectedPlanForUpi}
        isOpen={upiModalOpen}
        onClose={() => setUpiModalOpen(false)}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </div>
  );
};
