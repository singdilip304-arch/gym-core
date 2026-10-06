import React from 'react';
import { CalculatorsSuite } from '../components/calculators/CalculatorsSuite';
import { Bot, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Calculators: React.FC = () => {
  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
          Evidence-Based Biometrics
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          Fitness Calculators
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Calibrate your exact nutritional, metabolic, and strength parameters.
          Engineered using validated physiological formulas (Mifflin-St Jeor, US Navy Tape, Epley, Devine).
        </p>
      </div>

      {/* Main Calculators Suite */}
      <CalculatorsSuite />

      {/* Scientific Reference Cards */}
      <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">
            Formulas & Exercise Science
          </span>
          <h3 className="text-2xl font-black uppercase text-white mt-1">
            Understanding Your Metrics
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-400">
          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
            <h4 className="font-extrabold text-white text-sm">Mifflin-St Jeor (BMR)</h4>
            <p>
              Proven in peer-reviewed clinical studies to predict basal metabolic caloric expenditure within 5% of
              calorimetric laboratory tests.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
            <h4 className="font-extrabold text-white text-sm">Epley Formula (1RM)</h4>
            <p>
              Formula: <em>1RM = Weight × (1 + Reps/30)</em>. Accurately extrapolates maximum lifting capacity
              without risking injury from true 1RM testing.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
            <h4 className="font-extrabold text-white text-sm">US Navy Circumference (Body Fat)</h4>
            <p>
              Utilizes logarithmic neck, waist, and hip ratios to assess visceral adiposity and lean skeletal mass.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
