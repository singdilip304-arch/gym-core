import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useGymData } from '../../context/GymDataContext';
import {
  Dumbbell,
  PlusCircle,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  Edit,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WorkoutPlan } from '../../types';

export const TrainerWorkouts: React.FC = () => {
  const { workouts, users, addWorkoutPlan } = useGymData();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [targetUserId, setTargetUserId] = useState('usr_member_1');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Pro Athlete'>('Intermediate');
  const [goal, setGoal] = useState('Hypertrophy');
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [day1Focus, setDay1Focus] = useState('Chest & Triceps Push');
  const [day1Exercises, setDay1Exercises] = useState('Barbell Bench Press (4x8), Incline DB Press (3x10), Triceps Pushdown (3x12)');
  const [trainerNotes, setTrainerNotes] = useState('Focus on mind-muscle connection and progressive overload.');

  const members = users.filter((u) => u.role === 'member');

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();

    const exList = day1Exercises.split(',').map((exStr, idx) => ({
      id: `ex_${Date.now()}_${idx}`,
      name: exStr.trim().split('(')[0] || exStr.trim(),
      targetMuscle: day1Focus,
      sets: 3,
      reps: exStr.includes('(') ? exStr.split('(')[1].replace(')', '') : '10-12 reps',
      restSeconds: 75,
      instructions: 'Keep tight core posture and controlled 2-second eccentric cadence.',
      tips: 'Log weights lifted each session.',
    }));

    addWorkoutPlan({
      title: title.trim() || 'Custom Training Split',
      assignedToUserId: targetUserId,
      level,
      goal,
      daysPerWeek,
      trainerNotes,
      schedule: [
        {
          dayName: 'Day 1',
          focus: day1Focus,
          exercises: exList,
        },
        {
          dayName: 'Day 2',
          focus: 'Back & Biceps Pull',
          exercises: [
            {
              id: `ex_pull_1`,
              name: 'Lat Pulldown',
              targetMuscle: 'Lats & Rhomboids',
              sets: 4,
              reps: '10 - 12 reps',
              restSeconds: 60,
              instructions: 'Depress shoulder blades first.',
              tips: 'Do not swing back.',
            },
          ],
        },
      ],
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#22c55e', '#ffffff'],
    });

    setModalOpen(false);
    setTitle('');
  };

  return (
    <DashboardLayout
      activeRole="trainer"
      title="Workout Program Builder"
      subtitle="Design, deploy, and assign progressive hypertrophy and strength programs to members."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono">
            {workouts.length} Active Master & Member Plans
          </span>
          <button
            onClick={() => setModalOpen(true)}
            className="py-3 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Plan</span>
          </button>
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workouts.map((plan) => {
            const assignedMember = users.find((u) => u.id === plan.assignedToUserId);
            return (
              <div
                key={plan.id}
                className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 shadow-xl"
              >
                <div className="flex items-start justify-between border-b border-neutral-900 pb-3">
                  <div>
                    <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider font-mono">
                      {plan.level} • {plan.daysPerWeek} Days / Wk
                    </span>
                    <h3 className="text-lg font-black text-white uppercase mt-0.5">{plan.title}</h3>
                    <p className="text-xs text-neutral-400">
                      Assigned To: <strong className="text-white">{assignedMember?.name || 'All Members Template'}</strong>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400">
                    {plan.updatedAt}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-neutral-300 block">Weekly Schedule:</span>
                  <div className="space-y-1.5">
                    {plan.schedule.map((day, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-between"
                      >
                        <span className="font-bold text-orange-400">{day.dayName}</span>
                        <span className="text-neutral-200">{day.focus}</span>
                        <span className="font-mono text-neutral-500 text-[11px]">{day.exercises.length} Exercises</span>
                      </div>
                    ))}
                  </div>
                </div>

                {plan.trainerNotes && (
                  <p className="text-xs text-neutral-400 italic bg-neutral-900/40 p-2.5 rounded-xl border border-neutral-800/60">
                    Coach Notes: "{plan.trainerNotes}"
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 text-white max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  Exercise Programming
                </span>
                <h3 className="text-xl font-black uppercase text-white mt-0.5">
                  Build Custom Workout
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePlan} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">Plan Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 4-Day Upper/Lower Hypertrophy Surge"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="text-neutral-300 block mb-1">Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Pro Athlete">Pro Athlete</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Days Per Week</label>
                  <input
                    type="number"
                    min="2"
                    max="6"
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Day 1 Focus</label>
                  <input
                    type="text"
                    value={day1Focus}
                    onChange={(e) => setDay1Focus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">
                  Day 1 Exercises (Comma separated with sets & reps)
                </label>
                <textarea
                  rows={2}
                  value={day1Exercises}
                  onChange={(e) => setDay1Exercises(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Trainer Directives</label>
                <textarea
                  rows={2}
                  value={trainerNotes}
                  onChange={(e) => setTrainerNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Assign Workout Plan</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
