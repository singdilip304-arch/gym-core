import React, { useState } from 'react';
import {
  Scale,
  Flame,
  PieChart,
  Activity,
  Dumbbell,
  Target,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const CalculatorsSuite: React.FC<{ initialTab?: string }> = ({ initialTab = 'bmi' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // 1. BMI State
  const [bmiHeight, setBmiHeight] = useState<number>(175);
  const [bmiWeight, setBmiWeight] = useState<number>(74);

  // 2. BMR State
  const [bmrAge, setBmrAge] = useState<number>(26);
  const [bmrGender, setBmrGender] = useState<'male' | 'female'>('male');
  const [bmrHeight, setBmrHeight] = useState<number>(175);
  const [bmrWeight, setBmrWeight] = useState<number>(74);

  // 3. Calorie & TDEE State
  const [calActivity, setCalActivity] = useState<number>(1.55); // 1.2, 1.375, 1.55, 1.725, 1.9
  const [calGoal, setCalGoal] = useState<'cut' | 'mild_cut' | 'maintain' | 'lean_bulk' | 'bulk'>('lean_bulk');

  // 4. Body Fat State
  const [bfGender, setBfGender] = useState<'male' | 'female'>('male');
  const [bfHeight, setBfHeight] = useState<number>(175);
  const [bfWeight, setBfWeight] = useState<number>(74);
  const [bfWaist, setBfWaist] = useState<number>(82);
  const [bfNeck, setBfNeck] = useState<number>(38);
  const [bfHips, setBfHips] = useState<number>(95);

  // 5. Ideal Weight State
  const [iwGender, setIwGender] = useState<'male' | 'female'>('male');
  const [iwHeight, setIwHeight] = useState<number>(175);

  // 6. 1RM State
  const [oneRmWeight, setOneRmWeight] = useState<number>(100);
  const [oneRmReps, setOneRmReps] = useState<number>(5);

  // Computations
  // BMI
  const heightMeters = bmiHeight / 100;
  const bmiScore = Number((bmiWeight / (heightMeters * heightMeters)).toFixed(1));
  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-sky-400', bg: 'bg-sky-500' };
    if (bmi < 24.9) return { label: 'Normal / Athletic Weight', color: 'text-emerald-400', bg: 'bg-emerald-500' };
    if (bmi < 29.9) return { label: 'Overweight (Pre-Obese)', color: 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'Obese', color: 'text-rose-500', bg: 'bg-rose-500' };
  };
  const bmiCategory = getBmiCategory(bmiScore);

  // BMR (Mifflin-St Jeor)
  let calculatedBmr = 10 * bmrWeight + 6.25 * bmrHeight - 5 * bmrAge;
  calculatedBmr += bmrGender === 'male' ? 5 : -161;
  calculatedBmr = Math.round(calculatedBmr);

  // TDEE & Target Calories
  const calculatedTdee = Math.round(calculatedBmr * calActivity);
  let goalCalorieModifier = 0;
  if (calGoal === 'cut') goalCalorieModifier = -500;
  else if (calGoal === 'mild_cut') goalCalorieModifier = -250;
  else if (calGoal === 'lean_bulk') goalCalorieModifier = 300;
  else if (calGoal === 'bulk') goalCalorieModifier = 500;

  const targetDailyCalories = calculatedTdee + goalCalorieModifier;
  const proteinTarget = Math.round(bmrWeight * 2.2);
  const fatsTarget = Math.round(bmrWeight * 0.85);
  const carbsTarget = Math.max(60, Math.round((targetDailyCalories - (proteinTarget * 4 + fatsTarget * 9)) / 4));

  // Body Fat % (US Navy formula)
  let bodyFatPercent = 15.0;
  try {
    if (bfGender === 'male') {
      const val = 495 / (1.0324 - 0.19077 * Math.log10(bfWaist - bfNeck) + 0.15456 * Math.log10(bfHeight)) - 450;
      bodyFatPercent = Math.max(5, Math.min(50, Number(val.toFixed(1))));
    } else {
      const val = 495 / (1.29579 - 0.35004 * Math.log10(bfWaist + bfHips - bfNeck) + 0.22100 * Math.log10(bfHeight)) - 450;
      bodyFatPercent = Math.max(8, Math.min(55, Number(val.toFixed(1))));
    }
  } catch {
    bodyFatPercent = 15.0;
  }
  const fatMassKg = Number(((bfWeight * bodyFatPercent) / 100).toFixed(1));
  const leanMassKg = Number((bfWeight - fatMassKg).toFixed(1));

  // Ideal Weight (Devine & Robinson average)
  const heightInches = iwHeight / 2.54;
  const inchesOver5Ft = Math.max(0, heightInches - 60);
  let devine = iwGender === 'male' ? 50 + 2.3 * inchesOver5Ft : 45.5 + 2.3 * inchesOver5Ft;
  let robinson = iwGender === 'male' ? 52 + 1.9 * inchesOver5Ft : 49 + 1.7 * inchesOver5Ft;
  const avgIdealWeight = Number(((devine + robinson) / 2).toFixed(1));

  // 1RM (Epley formula: weight * (1 + reps/30))
  const calculated1Rm = Math.round(oneRmWeight * (1 + oneRmReps / 30));
  const percentages = [
    { pct: 95, reps: '2 reps' },
    { pct: 90, reps: '3-4 reps' },
    { pct: 85, reps: '5-6 reps' },
    { pct: 80, reps: '7-8 reps' },
    { pct: 75, reps: '10 reps' },
    { pct: 70, reps: '12 reps' },
  ];

  const tabs = [
    { id: 'bmi', label: 'BMI Calculator', icon: Scale },
    { id: 'bmr', label: 'BMR Metabolic Rate', icon: Flame },
    { id: 'calories', label: 'Calorie & TDEE', icon: PieChart },
    { id: 'bodyfat', label: 'Body Fat %', icon: Activity },
    { id: 'ideal', label: 'Ideal Weight', icon: Target },
    { id: 'onerm', label: '1RM Strength Max', icon: Dumbbell },
  ];

  return (
    <div className="space-y-6">
      {/* Horizontal Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CALCULATOR 1: BMI */}
      {activeTab === 'bmi' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8">
          <div className="md:col-span-6 space-y-5">
            <div>
              <h3 className="text-xl font-black text-white">Body Mass Index (BMI)</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Standard metric to gauge body weight relative to stature for general fitness.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-neutral-300">Height: {bmiHeight} cm</span>
                  <span className="text-orange-400 font-mono">{(bmiHeight / 30.48).toFixed(1)} Feet</span>
                </div>
                <input
                  type="range"
                  min="130"
                  max="220"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-neutral-300">Weight: {bmiWeight} kg</span>
                  <span className="text-orange-400 font-mono">{(bmiWeight * 2.20462).toFixed(1)} lbs</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <p>
                Note: In muscular bodybuilders and heavy athletes, BMI can overestimate fatness due to high bone density and skeletal muscle mass.
              </p>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-center items-center p-6 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl text-center space-y-4">
            <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Your Calculated BMI</span>
            <div className="text-6xl font-black text-white font-mono tracking-tight">{bmiScore}</div>
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${bmiCategory.color} bg-neutral-950 border border-neutral-800`}>
              {bmiCategory.label}
            </div>

            {/* Visual Gauge Bar */}
            <div className="w-full space-y-1.5 pt-2">
              <div className="h-3 w-full bg-neutral-800 rounded-full overflow-hidden flex">
                <div className="w-[18.5%] bg-sky-500" title="Underweight (< 18.5)" />
                <div className="w-[30%] bg-emerald-500" title="Normal (18.5 - 24.9)" />
                <div className="w-[25%] bg-amber-500" title="Overweight (25 - 29.9)" />
                <div className="w-[26.5%] bg-rose-500" title="Obese (30+)" />
              </div>
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>16</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 2: BMR */}
      {activeTab === 'bmr' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8">
          <div className="md:col-span-6 space-y-5">
            <div>
              <h3 className="text-xl font-black text-white">Basal Metabolic Rate (BMR)</h3>
              <p className="text-xs text-neutral-400 mt-1">
                The minimum baseline calories your organs burn staying alive at complete resting state.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Gender</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setBmrGender('male')}
                    className={`py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      bmrGender === 'male' ? 'bg-orange-500 text-white' : 'bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setBmrGender('female')}
                    className={`py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      bmrGender === 'female' ? 'bg-orange-500 text-white' : 'bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Age ({bmrAge} Years)</label>
                <input
                  type="number"
                  min="14"
                  max="90"
                  value={bmrAge}
                  onChange={(e) => setBmrAge(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Height ({bmrHeight} cm)</label>
                <input
                  type="number"
                  min="130"
                  max="220"
                  value={bmrHeight}
                  onChange={(e) => setBmrHeight(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Weight ({bmrWeight} kg)</label>
                <input
                  type="number"
                  min="40"
                  max="160"
                  value={bmrWeight}
                  onChange={(e) => setBmrWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-bold"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-center items-center p-6 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl text-center space-y-4">
            <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Resting Basal Burn</span>
            <div className="text-5xl font-black text-orange-500 font-mono tracking-tight">{calculatedBmr}</div>
            <p className="text-xs text-neutral-400">Calories burned per 24 hours at pure rest.</p>
            <div className="w-full grid grid-cols-2 gap-2 text-xs pt-2">
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 block">Sedentary TDEE</span>
                <span className="font-bold text-white font-mono">{Math.round(calculatedBmr * 1.2)} kcal</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 block">Athlete TDEE</span>
                <span className="font-bold text-emerald-400 font-mono">{Math.round(calculatedBmr * 1.725)} kcal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 3: CALORIES & TDEE */}
      {activeTab === 'calories' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-black text-white">Daily Calorie & Macro Target (TDEE)</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Calculates your Total Daily Energy Expenditure and distributes target Protein, Carbs, and Fats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Weekly Training Activity</label>
              <select
                value={calActivity}
                onChange={(e) => setCalActivity(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-medium focus:outline-none"
              >
                <option value={1.2}>Sedentary (Desk Job, Minimal Exercise)</option>
                <option value={1.375}>Lightly Active (Gym 1-3 Days/Week)</option>
                <option value={1.55}>Moderately Active (Hard Training 3-5 Days/Week)</option>
                <option value={1.725}>Very Active (Hard Training 6-7 Days/Week)</option>
                <option value={1.9}>Elite Athlete / Heavy Physical Work (2x per Day)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Specific Physique Goal</label>
              <select
                value={calGoal}
                onChange={(e) => setCalGoal(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-medium focus:outline-none"
              >
                <option value="cut">Fat Loss Cut (-500 kcal deficit)</option>
                <option value="mild_cut">Gradual Recomp Cut (-250 kcal deficit)</option>
                <option value="maintain">Bodyweight Maintenance (0 kcal)</option>
                <option value="lean_bulk">Clean Hypertrophy Lean Bulk (+300 kcal)</option>
                <option value="bulk">Powerlifter Heavy Bulk (+500 kcal)</option>
              </select>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-400 uppercase font-bold block">Target Intake</span>
              <span className="text-2xl sm:text-3xl font-black text-orange-500 font-mono">{targetDailyCalories}</span>
              <span className="text-[10px] text-neutral-500 block">kcal / day</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-400 uppercase font-bold block">Protein</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{proteinTarget}g</span>
              <span className="text-[10px] text-neutral-500 block">{proteinTarget * 4} kcal</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-400 uppercase font-bold block">Carbs</span>
              <span className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">{carbsTarget}g</span>
              <span className="text-[10px] text-neutral-500 block">{carbsTarget * 4} kcal</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-400 uppercase font-bold block">Healthy Fats</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{fatsTarget}g</span>
              <span className="text-[10px] text-neutral-500 block">{fatsTarget * 9} kcal</span>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 4: BODY FAT % */}
      {activeTab === 'bodyfat' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8">
          <div className="md:col-span-7 space-y-4">
            <div>
              <h3 className="text-xl font-black text-white">Body Fat % (US Navy Tape Method)</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Measure circumferences in centimeters using a non-stretch tape measure.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setBfGender('male')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  bfGender === 'male' ? 'bg-orange-500 text-white' : 'bg-neutral-900 text-neutral-400'
                }`}
              >
                Male Protocol
              </button>
              <button
                onClick={() => setBfGender('female')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  bfGender === 'female' ? 'bg-orange-500 text-white' : 'bg-neutral-900 text-neutral-400'
                }`}
              >
                Female Protocol
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={bfHeight}
                  onChange={(e) => setBfHeight(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={bfWeight}
                  onChange={(e) => setBfWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Neck Circumference (cm)</label>
                <input
                  type="number"
                  value={bfNeck}
                  onChange={(e) => setBfNeck(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Waist at Navel (cm)</label>
                <input
                  type="number"
                  value={bfWaist}
                  onChange={(e) => setBfWaist(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-bold"
                />
              </div>
              {bfGender === 'female' && (
                <div className="col-span-2">
                  <label className="text-xs text-neutral-300 block mb-1">Hips at Widest Point (cm)</label>
                  <input
                    type="number"
                    value={bfHips}
                    onChange={(e) => setBfHips(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-bold"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-center items-center p-6 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl text-center space-y-4">
            <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Estimated Body Fat</span>
            <div className="text-5xl font-black text-white font-mono tracking-tight">{bodyFatPercent}%</div>

            <div className="w-full space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-400">Lean Muscle Mass</span>
                <span className="font-bold text-emerald-400 font-mono">{leanMassKg} kg</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-400">Estimated Fat Mass</span>
                <span className="font-bold text-amber-400 font-mono">{fatMassKg} kg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 5: IDEAL WEIGHT */}
      {activeTab === 'ideal' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8">
          <div className="md:col-span-6 space-y-4">
            <div>
              <h3 className="text-xl font-black text-white">Ideal Healthy Bodyweight</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Calculates consensus ideal weight based on validated medical formulas (Devine & Robinson).
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIwGender('male')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  iwGender === 'male' ? 'bg-orange-500 text-white' : 'bg-neutral-900 text-neutral-400'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setIwGender('female')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  iwGender === 'female' ? 'bg-orange-500 text-white' : 'bg-neutral-900 text-neutral-400'
                }`}
              >
                Female
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-300">Height: {iwHeight} cm</span>
                <span className="text-orange-400 font-mono">{(iwHeight / 30.48).toFixed(1)} Feet</span>
              </div>
              <input
                type="range"
                min="140"
                max="215"
                value={iwHeight}
                onChange={(e) => setIwHeight(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-center items-center p-6 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl text-center space-y-3">
            <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Estimated Ideal Weight</span>
            <div className="text-5xl font-black text-white font-mono tracking-tight">
              {avgIdealWeight} <span className="text-xl font-normal text-neutral-400">kg</span>
            </div>
            <p className="text-xs text-neutral-400">
              Optimal athletic range: {(avgIdealWeight * 0.95).toFixed(1)} kg – {(avgIdealWeight * 1.08).toFixed(1)} kg
            </p>
          </div>
        </div>
      )}

      {/* CALCULATOR 6: 1RM STRENGTH MAX */}
      {activeTab === 'onerm' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8">
          <div className="md:col-span-6 space-y-4">
            <div>
              <h3 className="text-xl font-black text-white">One-Repetition Maximum (1RM)</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Calculate maximum single-lift capacity (Bench, Squat, Deadlift) using the Epley formula.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Weight Lifted for Reps ({oneRmWeight} kg)
                </label>
                <input
                  type="number"
                  min="10"
                  max="400"
                  value={oneRmWeight}
                  onChange={(e) => setOneRmWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-bold"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-neutral-300">Reps Performed to Near Failure</span>
                  <span className="text-orange-400 font-mono font-bold">{oneRmReps} Reps</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={oneRmReps}
                  onChange={(e) => setOneRmReps(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-center p-6 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl space-y-4">
            <div className="text-center">
              <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Estimated 1RM Max</span>
              <div className="text-5xl font-black text-orange-500 font-mono tracking-tight">{calculated1Rm} kg</div>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                Training Load Percentages
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {percentages.map((p) => (
                  <div key={p.pct} className="flex justify-between p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-400">{p.pct}% ({p.reps})</span>
                    <span className="font-bold text-white font-mono">
                      {Math.round((calculated1Rm * p.pct) / 100)} kg
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
