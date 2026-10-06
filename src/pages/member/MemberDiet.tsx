import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import {
  Salad,
  Flame,
  Droplet,
  Clock,
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  Info,
} from 'lucide-react';

export const MemberDiet: React.FC = () => {
  const { user } = useAuth();
  const { diets } = useGymData();

  const userDiet = diets.find((d) => d.assignedToUserId === user?.id) || diets[0];

  // Hydration state in Litres (e.g. each glass = 250ml / 0.25L)
  const [waterLoggedLiters, setWaterLoggedLiters] = useState<number>(2.5);
  const targetLiters = userDiet?.hydrationTargetLiters || 4.0;

  const handleAddWater = () => {
    setWaterLoggedLiters((prev) => Math.min(6.0, Number((prev + 0.25).toFixed(2))));
  };

  const handleMinusWater = () => {
    setWaterLoggedLiters((prev) => Math.max(0, Number((prev - 0.25).toFixed(2))));
  };

  const waterPercent = Math.min(100, Math.round((waterLoggedLiters / targetLiters) * 100));

  return (
    <DashboardLayout
      activeRole="member"
      title="Nutrition & Macro Protocol"
      subtitle={`${userDiet?.title} • Daily Target: ${userDiet?.targetCalories} kcal`}
    >
      <div className="space-y-6">
        {/* Top Macro Breakdown Strip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
            <div>
              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider font-mono">
                Assigned Nutrition Plan
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase">{userDiet?.title}</h3>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-orange-500 font-mono">
                {userDiet?.targetCalories}
              </span>
              <span className="text-xs text-neutral-400 block font-medium">Daily Target Calories</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Total Calories</span>
              <span className="text-2xl font-black text-white font-mono">{userDiet?.targetCalories}</span>
              <span className="text-[10px] text-orange-400 block">kcal</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Protein (Target)</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{userDiet?.targetProtein}g</span>
              <span className="text-[10px] text-neutral-500 block">{userDiet?.targetProtein * 4} kcal</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Carbohydrates</span>
              <span className="text-2xl font-black text-sky-400 font-mono">{userDiet?.targetCarbs}g</span>
              <span className="text-[10px] text-neutral-500 block">{userDiet?.targetCarbs * 4} kcal</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Healthy Fats</span>
              <span className="text-2xl font-black text-amber-400 font-mono">{userDiet?.targetFats}g</span>
              <span className="text-[10px] text-neutral-500 block">{userDiet?.targetFats * 9} kcal</span>
            </div>
          </div>
        </div>

        {/* Interactive Hydration Tracker */}
        <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center">
                <Droplet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black text-white uppercase">Daily Hydration Log</h4>
                <p className="text-xs text-neutral-400">
                  Target: {targetLiters} Litres • Essential for intracellular muscular volumization
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleMinusWater}
                className="w-8 h-8 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center justify-center cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center font-mono px-2">
                <span className="text-2xl font-black text-sky-400">{waterLoggedLiters}</span>
                <span className="text-xs text-neutral-500"> / {targetLiters} L</span>
              </div>
              <button
                onClick={handleAddWater}
                className="w-8 h-8 rounded-xl bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center cursor-pointer shadow-md shadow-sky-500/20"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-neutral-400">Progress</span>
              <span className="text-sky-400 font-mono">{waterPercent}% Hydrated</span>
            </div>
            <div className="h-2.5 w-full bg-neutral-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-blue-500 transition-all duration-300"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 5-Meal Schedule Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
            Daily Meal Breakdown ({userDiet?.meals.length} Meals)
          </h3>

          <div className="space-y-4">
            {userDiet?.meals.map((meal) => (
              <div
                key={meal.mealNumber}
                className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold font-mono text-xs">
                      Meal {meal.mealNumber}
                    </span>
                    <h4 className="text-base font-extrabold text-white">{meal.title}</h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>{meal.time}</span>
                  </div>
                </div>

                {meal.notes && (
                  <p className="text-xs text-neutral-400 italic bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-800/80">
                    💡 {meal.notes}
                  </p>
                )}

                {/* Items in Meal */}
                <div className="space-y-2">
                  {meal.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <span className="font-bold text-white block">{item.name}</span>
                        <span className="text-[11px] text-neutral-400">{item.portion}</span>
                      </div>
                      <div className="flex items-center gap-4 text-neutral-400 font-mono text-[11px]">
                        <span className="text-emerald-400 font-semibold">{item.protein}g Protein</span>
                        <span className="text-sky-400">{item.carbs}g Carbs</span>
                        <span className="text-amber-400">{item.fats}g Fats</span>
                        <span className="text-white font-bold">{item.calories} kcal</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutritional Guidelines & Protocols */}
        <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-orange-400">
            Head Coach Dietary Rules
          </h4>
          <ul className="space-y-2 text-xs text-neutral-300">
            {userDiet?.guidelines.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};
