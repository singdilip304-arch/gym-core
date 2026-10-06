import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Zap,
  Flame,
  CheckCircle2,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  HeartPulse,
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
          The Iron Philosophy
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          About GYM CORE
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Engineered for relentless strength, biomechanical precision, and authentic athletic camaraderie.
          Located at Neota / Mahindra SEZ, Jaipur.
        </p>
      </div>

      {/* The Origin Story */}
      <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            Our Story & Heritage
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
            Built for Those Who Demand More Than a Standard Gym
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            In 2022, GYM CORE was established near the tech & manufacturing corridor of Mahindra World City SEZ
            and Kalwada, Jaipur. The founders realized that fitness enthusiasts had to choose between commercial
            lifestyle clubs that prohibited heavy deadlifts and basic local iron gyms lacking modern technology.
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            We built GYM CORE as the ultimate hybrid: a hardcore bodybuilding and powerlifting haven equipped
            with IPF-spec calibrated steel plates, combined with 24/7 digital turnstiles, biometric scans,
            infrared saunas, and sport physiotherapy.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="font-extrabold text-white block">12,000 Sq. Ft</span>
              <span className="text-neutral-400 text-[11px]">Uninhibited training floor</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="font-extrabold text-white block">24/7 Access</span>
              <span className="text-neutral-400 text-[11px]">RFID & Digital App Pass</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <img
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"
            alt="GYM CORE Interior Arena"
            className="rounded-2xl border border-neutral-800 shadow-2xl object-cover w-full h-80 sm:h-96"
          />
        </div>
      </div>

      {/* Brand Pillars */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">
            The 4 Cornerstones
          </span>
          <h2 className="text-3xl font-black uppercase text-white mt-1">Our Core Pillars</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Strength',
              desc: 'Progressive overload principles, calibrated barbell platforms, and free weights up to 60kg.',
              icon: Zap,
            },
            {
              title: 'Discipline',
              desc: 'An inspiring high-energy environment free of casual distractions where hard work is celebrated.',
              icon: ShieldCheck,
            },
            {
              title: 'Consistency',
              desc: '24/7 access, structured periodization schedules, and weekly coach check-ins ensure no missed sessions.',
              icon: Clock,
            },
            {
              title: 'Results',
              desc: 'Measurable biometric body composition scans, 1RM strength logs, and verified physique milestones.',
              icon: Award,
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-orange-500/40 transition-colors space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-500 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-white uppercase">{pillar.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Equipment & Standards */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-neutral-950 to-neutral-900 border border-neutral-800 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">
            World-Class Standards
          </span>
          <h2 className="text-3xl font-black uppercase text-white">Facility Specifications</h2>
          <p className="text-xs text-neutral-400">
            Every piece of hardware at GYM CORE is selected to match human biomechanics and reduce joint shear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2.5">
            <h4 className="font-extrabold text-white text-sm">Eleiko & Hammer Strength</h4>
            <p className="text-xs text-neutral-400">
              IPF approved 29mm power bars, Olympic bearing bars, and iso-lateral converging chest & back machines.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2.5">
            <h4 className="font-extrabold text-white text-sm">Recovery & Hydrotherapy</h4>
            <p className="text-xs text-neutral-400">
              Finnish cedarwood dry sauna, cold plunge contrast baths, and myofascial percussion therapy zone.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2.5">
            <h4 className="font-extrabold text-white text-sm">Industrial HEPA Air & Hygiene</h4>
            <p className="text-xs text-neutral-400">
              Continuous fresh-air circulation, hospital-grade equipment sanitization, and chilled reverse-osmosis hydration.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4 pt-6">
        <h3 className="text-2xl font-black uppercase text-white">Ready to Train at GYM CORE?</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          Visit our Neota facility or claim your 1-Day All-Access Pass today.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/free-trial"
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20"
          >
            Book Free Trial Pass
          </Link>
          <Link
            to="/membership"
            className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs uppercase tracking-wider"
          >
            Explore Plans
          </Link>
        </div>
      </div>
    </div>
  );
};
