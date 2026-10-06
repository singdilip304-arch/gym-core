import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  Salad,
  PlusCircle,
  Search,
  CheckCircle2,
  Users,
  Flame,
  Droplets,
  ChevronDown,
  ChevronUp,
  Apple,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminDiet: React.FC = () => {
  const { diets, addDietPlan, users } = useGymData();
  const [search, setSearch] = useState('');
  const [expandedDietId, setExpandedDietId] = useState<string | null>(diets[0]?.id || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Diet plan state
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState(2400);
  const [protein, setProtein] = useState(160);
  const [carbs, setCarbs] = useState(220);
  const [fats, setFats] = useState(60);
  const [hydration, setHydration] = useState(3.5);
  const [assignedUserId, setAssignedUserId] = useState('');

  const members = users.filter((u) => u.role === 'member');

  const filtered = diets.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.targetCalories.toString().includes(search)
  );

  const handleCreateDiet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addDietPlan({
      title,
      targetCalories: Number(calories),
      targetProtein: Number(protein),
      targetCarbs: Number(carbs),
      targetFats: Number(fats),
      hydrationTargetLiters: Number(hydration),
      assignedToUserId: assignedUserId || undefined,
      guidelines: [
        'Maintain clean source macros with whole unprocessed foods.',
        'Drink 500ml water immediately upon waking.',
        'Post-workout shake within 45 minutes of training session.',
      ],
      meals: [
        {
          mealNumber: 1,
          title: 'Breakfast & Energy Surge',
          time: '08:00 AM',
          items: [
            { name: 'Oats with Almond Milk', portion: '80g', protein: 12, carbs: 54, fats: 8, calories: 340 },
            { name: 'Boiled Egg Whites + 2 Whole', portion: '4 whites, 2 whole', protein: 26, carbs: 1, fats: 10, calories: 200 },
          ],
        },
        {
          mealNumber: 2,
          title: 'Pre-Workout Fuel',
          time: '12:30 PM',
          items: [
            { name: 'Grilled Chicken Breast / Tofu', portion: '180g', protein: 42, carbs: 0, fats: 4, calories: 210 },
            { name: 'Steamed Brown Rice & Veggies', portion: '150g', protein: 4, carbs: 45, fats: 2, calories: 215 },
          ],
        },
        {
          mealNumber: 3,
          title: 'Recovery Dinner',
          time: '08:30 PM',
          items: [
            { name: 'Fish Fillet / Paneer Tikka', portion: '150g', protein: 32, carbs: 6, fats: 12, calories: 260 },
            { name: 'Green Salad with Olive Oil', portion: '1 Bowl', protein: 2, carbs: 8, fats: 10, calories: 130 },
          ],
        },
      ],
    });

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 }, colors: ['#ff5500', '#10b981'] });
    setIsModalOpen(false);
    setTitle('');
    setAssignedUserId('');
  };

  return (
    <DashboardLayout
      activeRole="admin"
      title="Master Nutrition & Diet Matrices"
      subtitle="Configure macro targets, meal timing, and custom nutritional protocols for gym athletes."
    >
      <div className="space-y-6">
        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="relative flex-1 sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search diet plans by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>CREATE NUTRITION BLUEPRINT</span>
          </button>
        </div>

        {/* Diet Plans List */}
        <div className="space-y-4">
          {filtered.map((diet) => {
            const isExpanded = expandedDietId === diet.id;
            const assignedMember = users.find((u) => u.id === diet.assignedToUserId);

            return (
              <div
                key={diet.id}
                className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden"
              >
                <div
                  onClick={() => setExpandedDietId(isExpanded ? null : diet.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/40 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <Salad className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-bold text-white text-base">{diet.title}</h3>
                        {assignedMember ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>Assigned: {assignedMember.name}</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-800 text-neutral-400">
                            Global Protocol
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-1.5">
                        <span className="flex items-center gap-1 text-orange-400 font-bold font-mono">
                          <Flame className="w-3.5 h-3.5" />
                          <span>{diet.targetCalories} kcal</span>
                        </span>
                        <span>•</span>
                        <span>Protein: <strong className="text-white">{diet.targetProtein}g</strong></span>
                        <span>•</span>
                        <span>Carbs: <strong className="text-white">{diet.targetCarbs}g</strong></span>
                        <span>•</span>
                        <span>Fats: <strong className="text-white">{diet.targetFats}g</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-cyan-400">
                          <Droplets className="w-3.5 h-3.5" />
                          <span>{diet.hydrationTargetLiters}L Water</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 text-xs font-semibold text-neutral-300 hover:text-white"
                    >
                      {isExpanded ? 'Collapse' : 'View Meals'}
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-neutral-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 border-t border-neutral-900 bg-neutral-900/30 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {diet.meals.map((meal) => (
                        <div
                          key={meal.mealNumber}
                          className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                            <span className="font-extrabold text-xs text-orange-400">
                              Meal #{meal.mealNumber}
                            </span>
                            <span className="text-[11px] text-neutral-400 font-mono">{meal.time}</span>
                          </div>
                          <div className="text-xs font-bold text-white">{meal.title}</div>
                          <div className="space-y-1.5">
                            {meal.items.map((it, idx) => (
                              <div
                                key={idx}
                                className="p-2 rounded bg-neutral-900/60 text-[11px] flex items-center justify-between"
                              >
                                <div>
                                  <div className="font-semibold text-neutral-200">{it.name}</div>
                                  <div className="text-[10px] text-neutral-500">{it.portion}</div>
                                </div>
                                <span className="font-mono text-neutral-400">{it.calories} cal</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* New Diet Blueprint Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-neutral-950 border border-neutral-800 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-black text-lg text-white">Create Nutrition Protocol</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDiet} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-bold">Plan Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High Protein Hypertrophy Shred (Vegetarian)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1 font-bold">Calories (kcal)</label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1 font-bold">Protein (g)</label>
                  <input
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1 font-bold">Carbs (g)</label>
                  <input
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1 font-bold">Fats (g)</label>
                  <input
                    type="number"
                    value={fats}
                    onChange={(e) => setFats(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1 font-bold">Hydration (Liters)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={hydration}
                    onChange={(e) => setHydration(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1 font-bold">Assign Member</label>
                  <select
                    value={assignedUserId}
                    onChange={(e) => setAssignedUserId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  >
                    <option value="">Global Template (All)</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Nutrition Matrix</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
