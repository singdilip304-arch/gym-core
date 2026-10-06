import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  Salad,
  PlusCircle,
  X,
  CheckCircle2,
  Clock,
  Droplet,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TrainerDiet: React.FC = () => {
  const { diets, users, addDietPlan } = useGymData();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [targetUserId, setTargetUserId] = useState('usr_member_1');
  const [targetCalories, setTargetCalories] = useState(2800);
  const [targetProtein, setTargetProtein] = useState(170);
  const [targetCarbs, setTargetCarbs] = useState(330);
  const [targetFats, setTargetFats] = useState(65);
  const [hydration, setHydration] = useState(4.0);
  const [guidelinesStr, setGuidelinesStr] = useState('Take 5g Creatine daily with water, finish dinner 2h before bed');

  const members = users.filter((u) => u.role === 'member');

  const handleCreateDiet = (e: React.FormEvent) => {
    e.preventDefault();

    addDietPlan({
      title: title.trim() || 'Custom Indian Nutrition Matrix',
      assignedToUserId: targetUserId,
      targetCalories: Number(targetCalories),
      targetProtein: Number(targetProtein),
      targetCarbs: Number(targetCarbs),
      targetFats: Number(targetFats),
      hydrationTargetLiters: Number(hydration),
      guidelines: guidelinesStr.split(',').map((g) => g.trim()),
      meals: [
        {
          mealNumber: 1,
          title: 'Power Breakfast',
          time: '08:00 AM',
          items: [
            { name: 'Oats with Low-Fat Milk & Whey', portion: '70g Oats + 1 scoop Whey', protein: 28, carbs: 54, fats: 8, calories: 400 },
          ],
        },
        {
          mealNumber: 2,
          title: 'Nutrient-Dense Lunch',
          time: '01:30 PM',
          items: [
            { name: 'Grilled Chicken / Paneer + Brown Rice', portion: '180g Paneer / Chicken + 1 Bowl Rice', protein: 42, carbs: 70, fats: 10, calories: 530 },
          ],
        },
        {
          mealNumber: 3,
          title: 'Restorative Dinner',
          time: '08:30 PM',
          items: [
            { name: 'Multigrain Rotis + Dal Tadka + Salad', portion: '3 Rotis + 1 Bowl Dal', protein: 20, carbs: 60, fats: 6, calories: 370 },
          ],
        },
      ],
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#10b981', '#3b82f6'],
    });

    setModalOpen(false);
    setTitle('');
  };

  return (
    <DashboardLayout
      activeRole="trainer"
      title="Diet & Macro Nutrition Matrix"
      subtitle="Formulate high-protein, calorie-calibrated Indian nutritional plans for athletes."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono">
            {diets.length} Active Nutrition Blueprints
          </span>
          <button
            onClick={() => setModalOpen(true)}
            className="py-3 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Design New Diet</span>
          </button>
        </div>

        {/* Diets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diets.map((diet) => {
            const assignedMember = users.find((u) => u.id === diet.assignedToUserId);
            return (
              <div
                key={diet.id}
                className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 shadow-xl"
              >
                <div className="flex items-start justify-between border-b border-neutral-900 pb-3">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-mono">
                      {diet.targetCalories} kcal / Day
                    </span>
                    <h3 className="text-lg font-black text-white uppercase mt-0.5">{diet.title}</h3>
                    <p className="text-xs text-neutral-400">
                      Assigned To: <strong className="text-white">{assignedMember?.name || 'All Members'}</strong>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400">
                    {diet.updatedAt}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Protein</span>
                    <span className="font-bold text-emerald-400 font-mono text-base">{diet.targetProtein}g</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Carbs</span>
                    <span className="font-bold text-sky-400 font-mono text-base">{diet.targetCarbs}g</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Fats</span>
                    <span className="font-bold text-amber-400 font-mono text-base">{diet.targetFats}g</span>
                  </div>
                </div>

                <div className="text-xs text-neutral-300 space-y-1">
                  <p>
                    <strong className="text-neutral-400">Hydration:</strong> {diet.hydrationTargetLiters} L / day
                  </p>
                  <p>
                    <strong className="text-neutral-400">Meals:</strong> {diet.meals.length} Scheduled Daily Meals
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 text-white max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  Nutritional Architecture
                </span>
                <h3 className="text-xl font-black uppercase text-white mt-0.5">
                  Formulate Nutrition Plan
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDiet} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">Plan Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 2,800 kcal Lean Bulk High Protein Protocol"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Assign to Member</label>
                <select
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.fitnessGoal || 'Member'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={targetCalories}
                    onChange={(e) => setTargetCalories(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={targetProtein}
                    onChange={(e) => setTargetProtein(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={targetCarbs}
                    onChange={(e) => setTargetCarbs(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Fats (g)</label>
                  <input
                    type="number"
                    value={targetFats}
                    onChange={(e) => setTargetFats(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Hydration Target (Litres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={hydration}
                  onChange={(e) => setHydration(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Guidelines (Comma separated)</label>
                <textarea
                  rows={2}
                  value={guidelinesStr}
                  onChange={(e) => setGuidelinesStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save & Assign Nutrition Protocol</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
