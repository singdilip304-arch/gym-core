import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  Dumbbell,
  PlusCircle,
  Search,
  CheckCircle2,
  Users,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { WorkoutPlan, DayWorkout } from '../../types';
import confetti from 'canvas-confetti';

export const AdminWorkouts: React.FC = () => {
  const { workouts, addWorkoutPlan, users } = useGymData();
  const [search, setSearch] = useState('');
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(workouts[0]?.id || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Workout Form state
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Pro Athlete'>('Intermediate');
  const [goal, setGoal] = useState('Hypertrophy & Strength');
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [trainerNotes, setTrainerNotes] = useState('');
  const [assignedUserId, setAssignedUserId] = useState('');

  const members = users.filter((u) => u.role === 'member');

  const filtered = workouts.filter(
    (w) =>
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.goal.toLowerCase().includes(search.toLowerCase()) ||
      w.level.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const sampleSchedule: DayWorkout[] = [
      {
        dayName: 'Day 1',
        focus: 'Chest & Triceps Hypertrophy',
        exercises: [
          {
            id: 'ex_1',
            name: 'Barbell Flat Bench Press',
            targetMuscle: 'Pectoralis Major',
            sets: 4,
            reps: '8-10',
            restSeconds: 90,
            instructions: 'Arch lower back slightly, retract scapulae, drive through heels.',
            tips: 'Control the eccentric phase for 2 full seconds.',
          },
          {
            id: 'ex_2',
            name: 'Incline Dumbbell Press',
            targetMuscle: 'Upper Chest',
            sets: 3,
            reps: '10-12',
            restSeconds: 75,
            instructions: 'Bench at 30-degree incline, full stretch at bottom.',
            tips: 'Squeeze upper pecs at the peak contraction.',
          },
          {
            id: 'ex_3',
            name: 'Overhead Cable Triceps Extension',
            targetMuscle: 'Triceps Long Head',
            sets: 4,
            reps: '12-15',
            restSeconds: 60,
            instructions: 'Keep elbows tucked, flare out hands at full extension.',
            tips: 'Maintain continuous cable tension throughout.',
          },
        ],
      },
      {
        dayName: 'Day 2',
        focus: 'Back & Biceps Thickness',
        exercises: [
          {
            id: 'ex_4',
            name: 'Conventional Deadlift',
            targetMuscle: 'Posterior Chain',
            sets: 4,
            reps: '5',
            restSeconds: 150,
            instructions: 'Neutral spine, pull slack out of bar, drive floor away.',
            tips: 'Lock hips and knees simultaneously.',
          },
          {
            id: 'ex_5',
            name: 'Chest Supported T-Bar Row',
            targetMuscle: 'Mid Back & Rhomboids',
            sets: 4,
            reps: '8-10',
            restSeconds: 90,
            instructions: 'Pull with elbows towards hips, hold 1s at top.',
            tips: 'Avoid jerking the weight up.',
          },
        ],
      },
    ];

    addWorkoutPlan({
      title,
      level,
      goal,
      daysPerWeek,
      schedule: sampleSchedule,
      trainerNotes: trainerNotes || 'Execute progressive overload every 2 weeks.',
      assignedToUserId: assignedUserId || undefined,
    });

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 }, colors: ['#ff5500', '#10b981'] });
    setIsModalOpen(false);
    setTitle('');
    setTrainerNotes('');
    setAssignedUserId('');
  };

  return (
    <DashboardLayout
      activeRole="admin"
      title="Master Workout Systems & Periodization"
      subtitle="Design training splits, exercise progressions, and assign routines to GYM CORE members."
    >
      <div className="space-y-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
          <div className="relative flex-1 sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search plans by title, goal, level..."
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
            <span>CREATE WORKOUT BLUEPRINT</span>
          </button>
        </div>

        {/* Workout Plans Grid */}
        <div className="space-y-4">
          {filtered.map((plan) => {
            const isExpanded = expandedPlanId === plan.id;
            const assignedMember = users.find((u) => u.id === plan.assignedToUserId);

            return (
              <div
                key={plan.id}
                className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden transition-all"
              >
                <div
                  onClick={() => setExpandedPlanId(isExpanded ? null : plan.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/40 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-bold text-white text-base">{plan.title}</h3>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          {plan.level}
                        </span>
                        {assignedMember ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>Assigned: {assignedMember.name}</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-800 text-neutral-400">
                            Global Master Template
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">
                        Goal: <span className="text-neutral-200">{plan.goal}</span> • Split:{' '}
                        <span className="text-orange-400 font-semibold">{plan.daysPerWeek} Days/Week</span> •{' '}
                        {plan.schedule.length} Training Days Configured
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 text-xs font-semibold text-neutral-300 hover:text-white"
                    >
                      {isExpanded ? 'Hide Details' : 'View Exercises'}
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-neutral-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 border-t border-neutral-900 bg-neutral-900/30 space-y-6">
                    {plan.trainerNotes && (
                      <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>Coach Directives: {plan.trainerNotes}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {plan.schedule.map((day, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                            <span className="font-extrabold text-sm text-orange-400 font-mono">
                              {day.dayName}
                            </span>
                            <span className="text-xs font-bold text-white">{day.focus}</span>
                          </div>

                          <div className="space-y-2.5">
                            {day.exercises.map((ex, exIdx) => (
                              <div
                                key={exIdx}
                                className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-800 text-xs space-y-1"
                              >
                                <div className="flex items-center justify-between font-bold text-white">
                                  <span>{ex.name}</span>
                                  <span className="text-orange-400 font-mono">
                                    {ex.sets} × {ex.reps}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                                  <span>Target: {ex.targetMuscle}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-neutral-500" />
                                    <span>{ex.restSeconds}s rest</span>
                                  </span>
                                </div>
                                {ex.instructions && (
                                  <p className="text-[11px] text-neutral-500 italic">
                                    "{ex.instructions}"
                                  </p>
                                )}
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

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-neutral-950 border border-neutral-800 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-black text-lg text-white">New Master Workout Plan</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePlan} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-bold">Plan Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5-Day Push Pull Legs Power Hypertrophy"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1 font-bold">Training Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Pro Athlete">Pro Athlete</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1 font-bold">Days / Week</label>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-bold">Fitness Goal</label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-bold">Assign to Member (Optional)</label>
                <select
                  value={assignedUserId}
                  onChange={(e) => setAssignedUserId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                >
                  <option value="">Global Template (Available to All)</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-bold">Coach Directives / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Warmup routines, hydration, RPE targets..."
                  value={trainerNotes}
                  onChange={(e) => setTrainerNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Workout Blueprint</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
