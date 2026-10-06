import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import {
  Dumbbell,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Info,
  Sparkles,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MemberWorkout: React.FC = () => {
  const { user } = useAuth();
  const { workouts } = useGymData();

  const userWorkout =
    workouts.find((w) => w.assignedToUserId === user?.id) || workouts[0];

  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  // Interactive Rest Timer
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedRest, setSelectedRest] = useState(90);

  useEffect(() => {
    let interval: any;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      // Ding or notify
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const currentSchedule = userWorkout?.schedule[activeDayIdx] || userWorkout?.schedule[0];

  const toggleExerciseComplete = (id: string) => {
    setCompletedExercises((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const allDone = currentSchedule?.exercises.every((ex) => next[ex.id]);
      if (allDone) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff5500', '#22c55e', '#3b82f6'],
        });
      }
      return next;
    });
  };

  const handleStartRest = (seconds: number) => {
    setSelectedRest(seconds);
    setTimerSeconds(seconds);
    setTimerRunning(true);
  };

  const completedCount = currentSchedule?.exercises.filter((ex) => completedExercises[ex.id]).length || 0;
  const totalCount = currentSchedule?.exercises.length || 1;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <DashboardLayout
      activeRole="member"
      title="Daily Workout Blueprint"
      subtitle={`${userWorkout?.title} • ${userWorkout?.daysPerWeek} Days / Week`}
    >
      <div className="space-y-6">
        {/* Day Selector Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-neutral-950 border border-neutral-800">
          {userWorkout?.schedule.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDayIdx(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeDayIdx === idx
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="block font-extrabold">{day.dayName}</span>
              <span className="text-[10px] opacity-80 block truncate max-w-[120px]">{day.focus}</span>
            </button>
          ))}
        </div>

        {/* Schedule Header & Rest Timer Strip */}
        <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider font-mono">
              Session Focus
            </span>
            <h3 className="text-2xl font-black text-white uppercase">{currentSchedule?.focus}</h3>
            <p className="text-xs text-neutral-400">
              Completed: <strong className="text-white font-mono">{completedCount} / {totalCount}</strong> exercises ({progressPercent}%)
            </p>
            <div className="w-56 h-2 bg-neutral-900 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Rest Timer Widget */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center gap-4">
            <div className="text-center font-mono">
              <span className="text-[9px] uppercase font-bold text-neutral-400 block">Rest Timer</span>
              <span className="text-3xl font-black text-orange-500">
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="p-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs cursor-pointer"
                >
                  {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setTimerSeconds(selectedRest);
                  }}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-1 text-[10px] font-mono">
                {[60, 90, 120].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStartRest(s)}
                    className={`px-2 py-0.5 rounded cursor-pointer ${
                      selectedRest === s ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    {s}s
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          {currentSchedule?.exercises.map((exercise, idx) => {
            const isCompleted = !!completedExercises[exercise.id];
            return (
              <div
                key={exercise.id}
                className={`p-6 rounded-3xl border transition-all ${
                  isCompleted
                    ? 'bg-neutral-950/60 border-neutral-900 opacity-80'
                    : 'bg-neutral-950 border-neutral-800 hover:border-orange-500/40 shadow-xl'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Exercise thumbnail if available */}
                    {exercise.imageUrl && (
                      <img
                        src={exercise.imageUrl}
                        alt={exercise.name}
                        className="w-20 h-20 rounded-2xl object-cover border border-neutral-800 shrink-0"
                      />
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-neutral-900 text-orange-400 text-[10px] font-mono font-bold flex items-center justify-center border border-neutral-800">
                          {idx + 1}
                        </span>
                        <h4 className={`text-lg font-black ${isCompleted ? 'text-neutral-400 line-through' : 'text-white'}`}>
                          {exercise.name}
                        </h4>
                      </div>
                      <p className="text-xs text-orange-400/90 font-medium">Target: {exercise.targetMuscle}</p>
                      <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">{exercise.instructions}</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium pt-1">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>Form Tip: {exercise.tips}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sets, Reps & Completed Checklist */}
                  <div className="flex items-center gap-6 self-end md:self-center shrink-0">
                    <div className="text-right font-mono text-xs">
                      <span className="text-sm font-bold text-white block">{exercise.sets} Sets</span>
                      <span className="text-neutral-400 block">{exercise.reps}</span>
                      <button
                        onClick={() => handleStartRest(exercise.restSeconds)}
                        className="text-[10px] text-orange-400 hover:underline flex items-center gap-1 mt-1 justify-end cursor-pointer"
                      >
                        <Clock className="w-3 h-3" /> Rest: {exercise.restSeconds}s
                      </button>
                    </div>

                    <button
                      onClick={() => toggleExerciseComplete(exercise.id)}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-orange-500 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};
