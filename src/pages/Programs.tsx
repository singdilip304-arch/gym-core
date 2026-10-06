import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dumbbell,
  Flame,
  Zap,
  Award,
  ShieldCheck,
  Sparkles,
  Activity,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface ProgramDetail {
  id: string;
  category: 'hypertrophy' | 'fatloss' | 'strength' | 'beginner' | 'women' | 'athlete';
  title: string;
  tagline: string;
  level: string;
  duration: string;
  frequency: string;
  leadCoach: string;
  description: string;
  highlights: string[];
  sampleSplit: { day: string; focus: string }[];
  image: string;
}

export const Programs: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(null);

  const programs: ProgramDetail[] = [
    {
      id: 'prog_muscle_building',
      category: 'hypertrophy',
      title: 'Hypertrophy Muscle Building',
      tagline: 'Science-backed hypertrophy targeting progressive tension & volume',
      level: 'Intermediate to Advanced',
      duration: '12 - 16 Weeks',
      frequency: '5 Days / Week',
      leadCoach: 'Vikram Singh Shekhawat',
      description: 'Engineered for maximum cross-sectional muscle growth. Utilizes periodized mechanical tension, metabolic stress, and calculated rest intervals to forge dense athletic muscularity.',
      highlights: [
        'Compound barbell and heavy dumbbell foundations',
        'Calculated 2-3 second eccentric contraction cadence',
        'Targeted isolation angles to target upper chest and rear delts',
        'Custom Indian macro-target nutrition framework',
      ],
      sampleSplit: [
        { day: 'Day 1', focus: 'Chest & Anterior Deltoids (Push A)' },
        { day: 'Day 2', focus: 'Upper Back & Biceps (Pull A)' },
        { day: 'Day 3', focus: 'Quadriceps & Calves (Legs A)' },
        { day: 'Day 4', focus: 'Shoulders & Triceps Density' },
        { day: 'Day 5', focus: 'Posterior Chain & Lats (Pull B)' },
      ],
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog_fat_loss',
      category: 'fatloss',
      title: 'Metabolic Fat Loss Shred',
      tagline: 'High thermogenic caloric burn while preserving lean muscle mass',
      level: 'All Levels',
      duration: '8 - 12 Weeks',
      frequency: '4 - 5 Days / Week',
      leadCoach: 'Priya Rathore',
      description: 'Designed to torch visceral and subcutaneous body fat without cannibalizing muscle tissue. Blends heavy resistance work with high-density anaerobic interval complexes.',
      highlights: [
        'Peripheral heart action superset training',
        'VO2 max conditioning intervals on curved treadmills & assault bikes',
        'Structured deficit macro plan with high protein satiety',
        'Weekly body fat impedance tracking',
      ],
      sampleSplit: [
        { day: 'Day 1', focus: 'Upper Body Strength + 15m MetCon' },
        { day: 'Day 2', focus: 'Lower Body Blast + Sled Pushes' },
        { day: 'Day 3', focus: 'Active Mobility & Core Stability' },
        { day: 'Day 4', focus: 'Full Body Density Barbell Complexes' },
        { day: 'Day 5', focus: 'Turf Sprint Intervals & Assault Bike' },
      ],
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog_strength_training',
      category: 'strength',
      title: 'Powerlifting Strength & 1RM Prep',
      tagline: 'Master the Big 3: Squat, Bench Press, and Deadlift',
      level: 'Intermediate to Pro',
      duration: '12 Weeks Block',
      frequency: '4 Days / Week',
      leadCoach: 'Vikram Singh Shekhawat',
      description: 'Conjugate and linear periodization methods designed to skyrocket absolute force production, barbell path efficiency, and nervous system recruitment.',
      highlights: [
        'Dedicated Eleiko calibrated competition platforms',
        'Video biomechanical breakdown of bar path & lockout',
        'Accessory work targeting triceps lockout and hip drive',
        'Peaking protocol for official or simulated meet days',
      ],
      sampleSplit: [
        { day: 'Day 1', focus: 'Max Effort Squat & Hamstring Accessories' },
        { day: 'Day 2', focus: 'Max Effort Bench Press & Triceps Lockout' },
        { day: 'Day 3', focus: 'Dynamic Effort Deadlift & Lat Recruitment' },
        { day: 'Day 4', focus: 'Overhead Press & Spinal Erector Density' },
      ],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog_hardcore_bodybuilding',
      category: 'hypertrophy',
      title: 'Hardcore Competitive Bodybuilding',
      tagline: 'Extreme muscle thickness, 3D deltoids, and razor-sharp separation',
      level: 'Advanced / Competitor',
      duration: '16 - 24 Weeks',
      frequency: '6 Days / Week',
      leadCoach: 'Vikram Singh Shekhawat',
      description: 'The uncompromising iron school. High volume, blood flow restriction, drop sets, and brutal intensity for athletes aiming for stage conditioning or peak visual dominance.',
      highlights: [
        'Extreme pump protocols with Intra-workout amino support',
        'Posing practice and physique symmetry evaluation',
        'Peak week carb depletion & loading protocols',
        'Heavy dumbbell work up to 60kg and iso-lateral machines',
      ],
      sampleSplit: [
        { day: 'Day 1', focus: 'Chest Thickness & Triceps Lateral Head' },
        { day: 'Day 2', focus: 'Lats Width, Mid-Traps & Rear Delts' },
        { day: 'Day 3', focus: 'Quads & Adductors (Brutal Volume)' },
        { day: 'Day 4', focus: 'Boulders Shoulders & Traps' },
        { day: 'Day 5', focus: 'Hamstrings, Glutes & Calves' },
        { day: 'Day 6', focus: 'Arms Annihilation (Biceps/Triceps Superset)' },
      ],
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog_weight_gain',
      category: 'hypertrophy',
      title: 'Mass Reconstruction (Weight Gain)',
      tagline: 'Designed for ectomorphs and hardgainers struggling to pack on size',
      level: 'Beginner to Intermediate',
      duration: '12 Weeks',
      frequency: '4 Days / Week',
      leadCoach: 'Arjun Rawat',
      description: 'Stop spinning your wheels. Combines heavy basic multi-joint lifts with a calorie-dense Indian surplus nutritional strategy to build solid bone density and thick muscle.',
      highlights: [
        'Strict focus on basic squats, deadlifts, dips, and rows',
        'Easy-to-digest high-calorie meal plans (shakes, nuts, rice, paneer)',
        'Limiting cardio to prevent excessive caloric burn',
        'Bi-weekly weight and circumference check-ins',
      ],
      sampleSplit: [
        { day: 'Day 1', focus: 'Heavy Upper Body Push & Pull' },
        { day: 'Day 2', focus: 'Heavy Lower Body Squat & Carry' },
        { day: 'Day 3', focus: 'Upper Body Hypertrophy & Arms' },
        { day: 'Day 4', focus: 'Posterior Chain Deadlift & Traps' },
      ],
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog_beginner_training',
      category: 'beginner',
      title: 'Beginner Iron Foundation',
      tagline: 'Confidence, movement mechanics, and injury-free progression',
      level: 'Complete Beginners',
      duration: '8 Weeks',
      frequency: '3 Days / Week',
      leadCoach: 'Dr. Sarah Khan',
      description: 'Every gym champion starts with zero knowledge. We teach you hip hinges, scapular retraction, bracing, breathing, and proper gym etiquette in a welcoming, supportive space.',
      highlights: [
        'Dedicated 1-on-1 form demonstration for all barbell lifts',
        'Gradual progressive load to build tendon and ligament integrity',
        'Zero intimidation atmosphere with friendly coaches',
        'Foundational mobility and postural restoration',
      ],
      sampleSplit: [
        { day: 'Monday', focus: 'Full Body Foundational Movement A' },
        { day: 'Wednesday', focus: 'Full Body Movement B & Core Bracing' },
        { day: 'Friday', focus: 'Full Body Movement C & Stamina' },
      ],
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog_athlete_training',
      category: 'athlete',
      title: 'Athletic Performance & VO2 Max',
      tagline: 'Speed, explosive power, vertical leap, and multi-directional agility',
      level: 'Athletes & Sports Enthusiasts',
      duration: '10 Weeks',
      frequency: '5 Days / Week',
      leadCoach: 'Arjun Rawat',
      description: 'Train like an Olympic sprinter and MMA fighter. Utilizes Olympic clean-and-jerks, plyometric medicine ball throws, resistance bands, and turf sprint drills.',
      highlights: [
        '25-meter indoor sprint turf with heavy prowler sleds',
        'Plyometric box jumps & rotational core medicine ball throws',
        'VO2 max conditioning and lactic acid tolerance training',
        'Injury resilience for knees, ankles, and rotator cuffs',
      ],
      sampleSplit: [
        { day: 'Day 1', focus: 'Olympic Lifts & Explosive Power' },
        { day: 'Day 2', focus: 'Turf Acceleration & Change of Direction' },
        { day: 'Day 3', focus: 'Unilateral Strength & Ankle Stability' },
        { day: 'Day 4', focus: 'Rotational Power & Anaerobic Threshold' },
        { day: 'Day 5', focus: 'High-Volume Recovery & Fascial Mobility' },
      ],
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog_women_fitness',
      category: 'women',
      title: 'Women Strength, Tone & Curves',
      tagline: 'Empowering women to lift heavy, sculpt athletic curves, and build metabolic stamina',
      level: 'All Levels',
      duration: '12 Weeks',
      frequency: '4 - 5 Days / Week',
      leadCoach: 'Priya Rathore',
      description: 'Discard pink 1kg dumbbells. Learn progressive hip thrusts, barbell squats, pull-ups, and core stability to build firm glutes, sculpted shoulders, and high metabolic stamina.',
      highlights: [
        'Glute hypertrophy protocols (hip thrusts, RDLs, lunges)',
        'Hormone-friendly training cycles and PCOS-supportive nutrition',
        'Safe, highly professional, female-friendly facility',
        'Postural correction and pelvic floor strength',
      ],
      sampleSplit: [
        { day: 'Day 1', focus: 'Glutes & Hamstrings Hypertrophy Focus' },
        { day: 'Day 2', focus: 'Upper Body Definition (Back & Delts)' },
        { day: 'Day 3', focus: 'Active Mobility & Deep Core Pilates Fusion' },
        { day: 'Day 4', focus: 'Full Lower Body & Hip Thrust Density' },
        { day: 'Day 5', focus: 'HIIT Kettlebell Conditioning & Abs' },
      ],
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog_personal_training',
      category: 'strength',
      title: '1-on-1 Elite Personal Coaching',
      tagline: 'Direct daily oversight from Jaipur’s most decorated coaches',
      level: 'Customized for You',
      duration: 'Flexible (Monthly / Quarterly)',
      frequency: 'Customized',
      leadCoach: 'Head Coaching Staff',
      description: 'The fastest, most accountable route to peak physical transformation. Your personal trainer is by your side every single repetition, adjusting loads, checking form, and auditing your diet.',
      highlights: [
        'Complete biometric and postural evaluation on Day 1',
        'Custom workout written and dynamically adjusted each week',
        'Nutrition meal plans updated based on weekly weigh-ins',
        'Priority appointment scheduling in Neota SEZ facility',
      ],
      sampleSplit: [
        { day: 'Personalized', focus: 'Customized based on your specific biometrics & schedule' },
      ],
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filteredPrograms =
    filter === 'all' ? programs : programs.filter((p) => p.category === filter);

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block">
          Elite Training Blueprints
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          Workout Programs
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          From competitive bodybuilding and heavy powerlifting to functional athletic turf conditioning
          and women’s aesthetic hypertrophy.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-neutral-950 border border-neutral-800 max-w-fit mx-auto">
        {[
          { id: 'all', label: 'All 9 Programs' },
          { id: 'hypertrophy', label: 'Hypertrophy & Mass' },
          { id: 'fatloss', label: 'Fat Loss & Shred' },
          { id: 'strength', label: 'Strength & 1RM' },
          { id: 'beginner', label: 'Beginner Foundations' },
          { id: 'women', label: 'Women Fitness' },
          { id: 'athlete', label: 'Athletic VO2' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrograms.map((prog) => (
          <div
            key={prog.id}
            className="rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col justify-between hover:border-orange-500/40 transition-all group shadow-xl"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-orange-400 uppercase tracking-wider border border-orange-500/30">
                  {prog.level}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white uppercase group-hover:text-orange-400 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-orange-400/90 font-medium mt-1">{prog.tagline}</p>
                  <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed">{prog.description}</p>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-neutral-900">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{prog.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{prog.frequency}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block">
                    Key Directives
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {prog.highlights.slice(0, 3).map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedProgram(prog)}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-orange-500 hover:text-white text-neutral-200 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-neutral-800"
              >
                <span>View Full Weekly Split</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  Program Blueprint
                </span>
                <h3 className="text-2xl font-black uppercase text-white mt-0.5">
                  {selectedProgram.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">Lead Coach: {selectedProgram.leadCoach}</p>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
                  Weekly Schedule Breakdown
                </h4>
                <div className="space-y-2">
                  {selectedProgram.sampleSplit.map((split, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between"
                    >
                      <span className="font-bold text-orange-400">{split.day}</span>
                      <span className="text-neutral-200 font-medium">{split.focus}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
                  Complete Program Features
                </h4>
                <ul className="space-y-1.5 text-neutral-300">
                  {selectedProgram.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                to="/membership"
                className="flex-1 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider text-center"
              >
                Join GYM CORE with This Program
              </Link>
              <Link
                to="/free-trial"
                className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider text-center"
              >
                Try Free Trial First
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
