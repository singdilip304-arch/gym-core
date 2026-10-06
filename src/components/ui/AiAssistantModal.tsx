import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import {
  X,
  Bot,
  Sparkles,
  Flame,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Zap,
  MessageSquare,
  Send,
  User,
  Trash2,
  Clock,
  MapPin,
  Check,
  Dumbbell,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'chat' | 'plan';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  suggestions?: string[];
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'chat',
}) => {
  const { user } = useAuth();
  const { addWorkoutPlan, addDietPlan } = useGymData();

  const [activeTab, setActiveTab] = useState<'chat' | 'plan'>(initialTab);

  // Sync initial tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // ================= Chat / Conversation State =================
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      time: 'Just now',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'Athlete'}! Welcome to **GYM CORE Conversation AI**.

I am your 24/7 dedicated Fitness & Training Coach for our premier facility at **Neota / Mahindra SEZ / Kalwada, Jaipur**.

How can I help you today? You can ask me about:
• Workout splits & exercise technique cues
• Indian high-protein diet & calorie calibration
• GYM CORE timings, amenities & free trial passes
• Progressive overload & breaking strength plateaus`,
      suggestions: [
        'How to break a bench press plateau?',
        'High-protein Indian meal plan',
        'GYM CORE Jaipur hours & amenities',
        'Explain progressive overload',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isTyping, activeTab]);

  // ================= Wizard State =================
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Questionnaire, 2: Thinking/Generating, 3: Recommendations

  // Form Inputs
  const [goal, setGoal] = useState<string>('Muscle Building');
  const [age, setAge] = useState<number>(user?.age || 25);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(user?.gender || 'male');
  const [height, setHeight] = useState<number>(user?.height || 175);
  const [weight, setWeight] = useState<number>(user?.weight || 72);
  const [experience, setExperience] = useState<string>('Intermediate');
  const [daysAvailable, setDaysAvailable] = useState<number>(4);
  const [preference, setPreference] = useState<string>('Barbell & Dumbbells');

  // Generated Plan State
  const [generatedResult, setGeneratedResult] = useState<any>(null);
  const [appliedMessage, setAppliedMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Conversational response engine
  const getAiResponse = (query: string): { reply: string; suggestions?: string[] } => {
    const q = query.toLowerCase();

    if (q.includes('bench') || q.includes('plateau') || q.includes('chest')) {
      return {
        reply: `### 🏋️ Breaking Your Bench Press Plateau:
1. **Optimize Grip & Arch**: Set tight shoulder blade retraction, push through feet (leg drive), and keep wrists stacked over elbows.
2. **Increase Frequency & Variations**: Bench 2-3x per week with variations like *Pause Bench Press* (3-second pause on chest) and *Spoto Press*.
3. **Overload the Triceps**: Your triceps lockout is often the weak link. Add heavy Close-Grip Bench (3x6) and weighted dips.
4. **Implement a Deload**: If you haven't dropped volume in 6+ weeks, take a 50% volume deload week to let CNS recover.

*Pro tip*: Aim for 2.5kg micro-loading increments rather than jumping 5kg at once.`,
        suggestions: ['What exercises strengthen triceps?', 'Generate a 4-day workout plan', 'How much protein daily?'],
      };
    }

    if (q.includes('diet') || q.includes('protein') || q.includes('food') || q.includes('meal') || q.includes('nutrition')) {
      return {
        reply: `### 🥗 High-Protein Nutrition Strategy (Indian Diet Focus):
• **Daily Protein Target**: 1.6g - 2.2g per kg bodyweight (approx. 120g - 160g for a 70kg athlete).

**Top Vegetarian Protein Sources**:
• Low-fat Paneer (100g = 18-20g protein)
• Soya chunks (50g = 26g protein)
• Greek Yogurt / Hung Curd (200g = 16-18g protein)
• Dal + Chickpeas / Rajma combo with quinoa/rice
• Whey Protein Isolate (1 scoop = 24-27g protein)

**Non-Vegetarian Options**:
• Chicken breast (150g = 45g protein)
• Whole eggs + egg whites (3 whites + 1 whole = 16g protein)
• Fish / Rohu / Tilapia (150g = 35g protein)

*Pre-workout*: Banana + Black Coffee + 20g whey 45 min before lifting.
*Post-workout*: 30g protein + 40g simple carbs within 60 min.`,
        suggestions: ['Switch to Plan Generator', 'What are safe pre-workout supplements?', 'How much water should I drink?'],
      };
    }

    if (q.includes('timing') || q.includes('hour') || q.includes('location') || q.includes('jaipur') || q.includes('address') || q.includes('sez') || q.includes('neota')) {
      return {
        reply: `### 📍 GYM CORE Jaipur Facility & Hours:
• **Location**: Near Mahindra World City SEZ, Neota / Kalwada Road, Jaipur, Rajasthan 302037.
• **Monday – Saturday**: 05:30 AM – 10:30 PM (Non-stop access)
• **Sunday**: 06:00 AM – 08:00 PM (Recovery & Mobility sessions)

**Facility Highlights**:
• 12,000+ sq. ft. air-conditioned hardcore strength floor
• Eleiko & Hammer Strength Olympic equipment
• Dedicated CrossFit Turf & Olympic Lifting platforms
• Infrared Sauna, Ice Bath recovery lounge & Shake bar
• Ample valet parking & secure biometric turnstiles`,
        suggestions: ['How to claim a free trial?', 'View membership pricing', 'Talk to personal trainer'],
      };
    }

    if (q.includes('progressive overload') || q.includes('overload') || q.includes('strength')) {
      return {
        reply: `### ⚡ The Law of Progressive Overload:
Muscle hypertrophy and strength require giving your body a greater stimulus over time.

**4 Ways to Progress Each Week**:
1. **Load Progression**: Increase weight by 1–2.5 kg while keeping reps constant.
2. **Repetition Progression**: Move from 8 reps to 10-12 reps with the same weight before bumping up load.
3. **Set Volume Progression**: Add 1 extra working set to lagging body parts.
4. **Time Under Tension (TUT)**: Control the eccentric (lowering) phase for 3 seconds per rep.

*Log every single set and weight in your GYM CORE Member Dashboard!*`,
        suggestions: ['How to warm up properly?', 'Generate 4-day split', 'Bench press plateau cues'],
      };
    }

    if (q.includes('trial') || q.includes('free') || q.includes('guest') || q.includes('book')) {
      return {
        reply: `### 🎟️ 1-Day VIP Free Trial Pass:
You can experience GYM CORE Jaipur completely free!
• Full access to cardio zone, heavy lifting arena, functional turf, and steam sauna.
• Complimentary 15-minute body composition assessment (InBody 570 scan).
• One-on-one equipment orientation with a Senior Coach.

Head over to the **Free Trial** page from the top navigation or click below to claim your digital QR pass instantly!`,
        suggestions: ['Go to Free Trial page', 'What are membership prices?', 'Timings for trial session'],
      };
    }

    if (q.includes('membership') || q.includes('price') || q.includes('plan') || q.includes('cost') || q.includes('fee')) {
      return {
        reply: `### 💳 GYM CORE Memberships:
1. **Starter Tier (₹1,499 / Month)**: Full floor access, standard locker, mobile app access.
2. **Elite Tier (₹2,999 / Month - Best Value)**: Floor access, steam sauna, 2 trainer sessions/month, free guest pass.
3. **Pro Athlete Tier (₹4,999 / Month)**: Unlimited sauna & ice baths, nutrition consultations, dedicated locker & towel service.
4. **Annual Championship Pass (₹19,999 / Year)**: 12 months all-inclusive VIP pass with 20% discount and gym kit.

*Supports Instant UPI (GPay, PhonePe, Paytm, BHIM) with zero convenience fee.*`,
        suggestions: ['Switch to Plan Generator', 'Where is the gym located?', 'Free trial pass'],
      };
    }

    // Default intelligent fitness assistant fallback
    return {
      reply: `Great question regarding **"${query}"**! 

At GYM CORE, we combine progressive overload, structured nutrition, and precise recovery. 

**Core Recommendations**:
1. **Consistency**: Train each major muscle group 2x per week with 10–18 weekly working sets.
2. **Nutrition**: Maintain 1.8g - 2.0g protein per kg bodyweight and stay within a calculated 300 kcal surplus (bulking) or 400 kcal deficit (cutting).
3. **Recovery**: Ensure 7.5 - 8 hours sleep and active hydration with electrolytes.

Would you like me to auto-generate a custom **Biometric Workout & Diet Matrix** specifically calibrated to your body metrics right now?`,
      suggestions: ['Generate Personalized Plan', 'High-protein Indian meal plan', 'Jaipur Gym location & hours'],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAiResponse(text);
      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: response.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-cleared-${Date.now()}`,
        sender: 'bot',
        time: 'Just now',
        text: `Chat refreshed! How can I assist you with your fitness journey today?`,
        suggestions: [
          'How to break a bench press plateau?',
          'High-protein Indian meal plan',
          'GYM CORE Jaipur hours & amenities',
          'Explain progressive overload',
        ],
      },
    ]);
  };

  // ================= Wizard Logic =================
  const handleGenerate = () => {
    setStep(2);
    setAppliedMessage(null);

    setTimeout(() => {
      let bmr = 10 * weight + 6.25 * height - 5 * age;
      if (gender === 'female') {
        bmr -= 161;
      } else {
        bmr += 5;
      }
      bmr = Math.round(bmr);

      const mult = daysAvailable <= 3 ? 1.35 : daysAvailable === 4 ? 1.45 : 1.6;
      const tdee = Math.round(bmr * mult);

      let targetCalories = tdee;
      let proteinGrams = Math.round(weight * 2.0);
      let fatGrams = Math.round(weight * 0.85);

      if (goal === 'Muscle Building') {
        targetCalories = Math.round(tdee + 350);
        proteinGrams = Math.round(weight * 2.2);
      } else if (goal === 'Fat Loss') {
        targetCalories = Math.round(tdee - 450);
        proteinGrams = Math.round(weight * 2.3);
      } else if (goal === 'Strength / Powerlifting') {
        targetCalories = Math.round(tdee + 200);
        proteinGrams = Math.round(weight * 2.0);
      }

      const carbsGrams = Math.max(80, Math.round((targetCalories - (proteinGrams * 4 + fatGrams * 9)) / 4));

      let splitTitle = 'Upper / Lower Power Split';
      let splitSchedule: any[] = [];

      if (daysAvailable === 3) {
        splitTitle = '3-Day Full Body Compound Acceleration';
        splitSchedule = [
          { day: 'Day 1', name: 'Full Body Heavy (Squat & Push Focus)', exercises: ['Barbell Back Squat 4x6', 'Incline Dumbbell Press 3x8', 'Barbell Row 4x8', 'Plank 3x60s'] },
          { day: 'Day 2', name: 'Full Body Hinge (Deadlift & Pull Focus)', exercises: ['Conventional Deadlift 3x5', 'Overhead Press 4x8', 'Lat Pulldown 3x10', 'Dumbbell Lunges 3x12'] },
          { day: 'Day 3', name: 'Full Body Hypertrophy Blitz', exercises: ['Leg Press 3x12', 'Dumbbell Bench Press 3x10', 'Cable Row 3x12', 'Arms Superset 3x15'] },
        ];
      } else if (daysAvailable === 4) {
        splitTitle = '4-Day Upper / Lower Density Split';
        splitSchedule = [
          { day: 'Monday', name: 'Upper Body Power', exercises: ['Barbell Flat Bench 4x6', 'Barbell Row 4x6', 'Standing Overhead Press 3x8', 'Dumbbell Bicep Curls 3x12'] },
          { day: 'Tuesday', name: 'Lower Body Strength', exercises: ['Barbell Back Squat 4x8', 'Romanian Deadlift 3x10', 'Leg Press 3x12', 'Calf Raises 4x15'] },
          { day: 'Thursday', name: 'Upper Body Hypertrophy', exercises: ['Incline DB Press 3x10', 'Lat Pulldown 4x12', 'Cable Flys 3x15', 'Triceps Pushdown 3x12'] },
          { day: 'Friday', name: 'Lower Body & Core Finisher', exercises: ['Bulgarian Split Squats 3x10', 'Hamstring Curls 4x12', 'Walking Lunges 3x15', 'Hanging Leg Raises 3x15'] },
        ];
      } else {
        splitTitle = '5-6 Day Push / Pull / Legs Hypertrophy Split';
        splitSchedule = [
          { day: 'Day 1', name: 'Push (Chest, Delts, Triceps)', exercises: ['Barbell Flat Bench Press 4x8', 'Overhead DB Press 3x10', 'Incline DB Fly 3x12', 'Skull Crushers 3x12'] },
          { day: 'Day 2', name: 'Pull (Back, Rear Delts, Biceps)', exercises: ['Barbell Deadlift 4x6', 'Wide Lat Pulldown 4x10', 'Chest-Supported Row 3x12', 'Incline DB Curl 3x12'] },
          { day: 'Day 3', name: 'Legs & Calves (Quad Focus)', exercises: ['Barbell Squat 4x8', 'Leg Press 3x12', 'Leg Extension 3x15', 'Standing Calf Raise 4x15'] },
          { day: 'Day 4', name: 'Upper Athletic Hypertrophy', exercises: ['Incline Barbell Press 4x8', 'Weighted Pull-Ups 3x8', 'Lateral Raises 4x15', 'Face Pulls 3x15'] },
          { day: 'Day 5', name: 'Posterior Chain & Core', exercises: ['Romanian Deadlift 4x8', 'Lying Leg Curl 4x12', 'Goblet Squats 3x12', 'Cable Woodchoppers 3x15'] },
        ];
      }

      setGeneratedResult({
        goal,
        splitTitle,
        bmr,
        tdee,
        targetCalories,
        proteinGrams,
        carbsGrams,
        fatGrams,
        splitSchedule,
        recoveryProtocols: [
          'Hydration: Consume minimum 3.5 to 4.0 Litres of mineralized water daily.',
          'Sleep: 7.5 - 8.5 hours of uninterrupted sleep for peak growth hormone release.',
          'Post-Workout: Consume 25-30g of fast-absorbing protein within 45 minutes.',
          'Warmup: 5 minutes joint mobility + 2 ramp-up warmup sets per exercise.',
        ],
      });

      setStep(3);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff5500', '#3b82f6', '#10b981'],
      });
    }, 1100);
  };

  const handleApplyToPlan = () => {
    if (!generatedResult) return;

    addWorkoutPlan({
      title: `AI Custom: ${generatedResult.splitTitle}`,
      assignedToUserId: user?.id || 'usr_member_1',
      level: (experience as any) || 'Intermediate',
      goal: generatedResult.goal,
      daysPerWeek: daysAvailable,
      trainerNotes: 'Generated by GYM CORE AI Assistant. Progressive overload recommended weekly.',
      schedule: generatedResult.splitSchedule.map((s: any) => ({
        dayName: s.day,
        focus: s.name,
        exercises: s.exercises.map((exStr: string, idx: number) => ({
          id: `ai_ex_${Date.now()}_${idx}`,
          name: exStr.split(' ')[0] + ' ' + (exStr.split(' ')[1] || ''),
          targetMuscle: 'Compound Muscle Group',
          sets: 3,
          reps: exStr.split(' ')[2] || '10-12 reps',
          restSeconds: 75,
          instructions: 'Maintain rigid core bracing, controlled eccentric phase.',
          tips: 'Log weights lifted each week to ensure progressive overload.',
        })),
      })),
    });

    addDietPlan({
      title: `AI Nutrition Matrix (${generatedResult.targetCalories} kcal)`,
      assignedToUserId: user?.id || 'usr_member_1',
      targetCalories: generatedResult.targetCalories,
      targetProtein: generatedResult.proteinGrams,
      targetCarbs: generatedResult.carbsGrams,
      targetFats: generatedResult.fatGrams,
      hydrationTargetLiters: 3.8,
      guidelines: generatedResult.recoveryProtocols,
      meals: [
        {
          mealNumber: 1,
          title: 'Power Breakfast',
          time: '08:00 AM',
          items: [
            { name: 'Oats with Almond Milk & Whey', portion: '70g Oats + 1 scoop Whey', protein: 30, carbs: 50, fats: 7, calories: 380 },
            { name: 'Boiled Eggs', portion: '2 Whole Eggs', protein: 12, carbs: 1, fats: 10, calories: 140 },
          ],
        },
        {
          mealNumber: 2,
          title: 'Post-Workout Fuel',
          time: '12:00 PM',
          items: [
            { name: 'Grilled Chicken / Paneer with Steamed Rice', portion: '150g Chicken + 1 Bowl Rice', protein: 38, carbs: 65, fats: 8, calories: 480 },
          ],
        },
        {
          mealNumber: 3,
          title: 'Clean Dinner & Recovery',
          time: '08:30 PM',
          items: [
            { name: 'Multigrain Roti with Dal & Mixed Veg', portion: '2 Rotis + 1 Bowl Dal', protein: 18, carbs: 55, fats: 7, calories: 350 },
          ],
        },
      ],
    });

    setAppliedMessage('Successfully saved to your Member Workout & Diet dashboards!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-neutral-800 bg-neutral-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-500 flex items-center justify-center shadow-inner">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-white flex items-center gap-1.5">
                GYM CORE Conversation AI
                <span className="text-[10px] bg-orange-500/20 text-orange-400 font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
                  Live Coach
                </span>
              </h3>
              <p className="text-[10px] text-neutral-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-orange-500 inline" />
                Neota / Mahindra SEZ, Jaipur • 24/7 Fitness Intelligence
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === 'chat' && (
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800/80 transition-colors cursor-pointer"
                title="Clear Conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/50 px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'border-orange-500 text-orange-400 bg-neutral-900 shadow-sm'
                : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>AI Fitness Conversation</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab('plan')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'plan'
                ? 'border-orange-500 text-orange-400 bg-neutral-900 shadow-sm'
                : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Biometric Plan Generator</span>
          </button>
        </div>

        {/* ================= TAB 1: AI CONVERSATION ================= */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#0c0d12]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  } animate-in fade-in duration-150`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-tr-none shadow-md shadow-orange-500/20'
                        : 'bg-neutral-900/90 border border-neutral-800 text-neutral-200 rounded-tl-none shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1.5 opacity-70 text-[10px]">
                      <span className="font-bold uppercase tracking-wider">
                        {msg.sender === 'user' ? user?.name || 'You' : 'GYM CORE Coach'}
                      </span>
                      <span>{msg.time}</span>
                    </div>

                    <div className="whitespace-pre-line space-y-2">
                      {msg.text.split('\n\n').map((para, i) => (
                        <p key={i}>
                          {para.startsWith('### ') ? (
                            <span className="font-extrabold text-orange-400 text-sm block mb-1">
                              {para.replace('### ', '')}
                            </span>
                          ) : (
                            para
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Quick Suggestion Chips */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-neutral-800/80 flex flex-wrap gap-1.5">
                        {msg.suggestions.map((suggestion, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => {
                              if (suggestion === 'Switch to Plan Generator' || suggestion === 'Generate Personalized Plan') {
                                setActiveTab('plan');
                              } else {
                                handleSendMessage(suggestion);
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-neutral-800/80 hover:bg-orange-500/20 border border-neutral-700/60 hover:border-orange-500/50 text-neutral-300 hover:text-orange-300 text-[11px] font-medium transition-all text-left cursor-pointer"
                          >
                            💬 {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start items-center text-xs text-neutral-400 animate-in fade-in">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-500 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] text-neutral-400 ml-1">GYM CORE AI is formulating response...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 border-t border-neutral-800 bg-neutral-950/90">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask GYM CORE AI (workouts, Indian diet, timings, form tips)..."
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs sm:text-sm focus:border-orange-500 focus:outline-none placeholder:text-neutral-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="p-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:hover:bg-orange-500 text-white transition-all cursor-pointer shadow-md shadow-orange-500/20"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Quick Bar */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-2 px-1">
                <span>Press Enter to send • 24/7 AI Fitness Support</span>
                <button
                  onClick={() => setActiveTab('plan')}
                  className="text-orange-400 hover:text-orange-300 font-semibold cursor-pointer underline flex items-center gap-1"
                >
                  <Zap className="w-3 h-3 inline" /> Open Plan Generator
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: BIOMETRIC PLAN GENERATOR ================= */}
        {activeTab === 'plan' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {step === 1 && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <p>
                    Answer a few biometric and training parameters. Our fitness AI will calibrate your exact BMR,
                    TDEE caloric baseline, weekly muscle split, and recovery protocols.
                  </p>
                </div>

                {/* Goal Selection */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-2">Primary Fitness Objective</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Muscle Building',
                      'Fat Loss',
                      'Strength / Powerlifting',
                      'Athlete Conditioning',
                      'Beginner Hypertrophy',
                      'Body Recomposition',
                    ].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGoal(g)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left cursor-pointer ${
                          goal === g
                            ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-sm'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs font-medium text-neutral-400 block mb-1">Age (Years)</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-neutral-400 block mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-orange-500 focus:outline-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-neutral-400 block mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-neutral-400 block mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Experience & Days Available */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1.5">Experience Level</label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-orange-500 focus:outline-none"
                    >
                      <option value="Beginner (< 1 Year)">Beginner (&lt; 1 Year)</option>
                      <option value="Intermediate (1 - 3 Years)">Intermediate (1 - 3 Years)</option>
                      <option value="Advanced (3+ Years)">Advanced (3+ Years)</option>
                      <option value="Competitive Athlete">Competitive Athlete</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                      Days Available per Week ({daysAvailable} Days)
                    </label>
                    <div className="flex gap-2">
                      {[3, 4, 5, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setDaysAvailable(num)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                            daysAvailable === num
                              ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          {num} Days
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preference */}
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1.5">Training Equipment Preference</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Barbell & Dumbbells', 'Machines & Cables', 'HIIT & Functional Turf'].map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => setPreference(pref)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border text-left cursor-pointer ${
                          preference === pref
                            ? 'bg-orange-500/10 border-orange-500 text-orange-400'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-[11px] text-neutral-500 flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <p>
                    Safety Notice: AI-generated suggestions are strictly informational guidelines based on
                    exercise science formulas and do not constitute certified medical diagnosis or prescriptions.
                  </p>
                </div>

                {/* Submit CTA */}
                <button
                  onClick={handleGenerate}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  Generate Personalized Fitness Plan
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 animate-pulse">
                    <Bot className="w-8 h-8" />
                  </div>
                  <div className="absolute -inset-2 bg-orange-500/20 rounded-2xl blur-lg animate-ping opacity-30" />
                </div>
                <h4 className="text-base font-bold text-white">Synthesizing Biometrics & Hypertrophy Curves...</h4>
                <p className="text-xs text-neutral-400 max-w-sm">
                  Optimizing Mifflin-St Jeor TDEE calibration, exercise selection, and weekly progressive overload split.
                </p>
              </div>
            )}

            {step === 3 && generatedResult && (
              <div className="space-y-5 animate-in zoom-in-95 duration-200">
                {/* Macro & Calories Overview */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center justify-between mb-3 border-b border-neutral-800/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Caloric & Macro Targets
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-orange-400">
                      BMR: {generatedResult.bmr} kcal • TDEE: {generatedResult.tdee} kcal
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Daily Calories</span>
                      <span className="text-xl font-black text-white">{generatedResult.targetCalories}</span>
                      <span className="text-[10px] text-orange-400 block font-medium">kcal / day</span>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Protein</span>
                      <span className="text-xl font-black text-emerald-400">{generatedResult.proteinGrams}g</span>
                      <span className="text-[10px] text-neutral-500 block">Muscle Repair</span>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Carbohydrates</span>
                      <span className="text-xl font-black text-sky-400">{generatedResult.carbsGrams}g</span>
                      <span className="text-[10px] text-neutral-500 block">Glycogen Energy</span>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Healthy Fats</span>
                      <span className="text-xl font-black text-amber-400">{generatedResult.fatGrams}g</span>
                      <span className="text-[10px] text-neutral-500 block">Hormone Balance</span>
                    </div>
                  </div>
                </div>

                {/* Split Structure */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {generatedResult.splitTitle}
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      {daysAvailable} Days / Week
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {generatedResult.splitSchedule.map((sched: any, sIdx: number) => (
                      <div key={sIdx} className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-orange-400">{sched.day}</span>
                          <span className="text-[11px] text-neutral-300 font-medium">{sched.name}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {sched.exercises.map((ex: string, eIdx: number) => (
                            <span
                              key={eIdx}
                              className="px-2 py-0.5 rounded-md bg-neutral-950 text-neutral-300 text-[10px] border border-neutral-800"
                            >
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recovery Guidelines */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                    AI Recovery & Hydration Protocols
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-400">
                    {generatedResult.recoveryProtocols.map((proto: string, pIdx: number) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{proto}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Feedback Alert */}
                {appliedMessage && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{appliedMessage}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Recalibrate
                  </button>
                  <button
                    onClick={handleApplyToPlan}
                    className="flex-1 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-orange-500/20 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Save to Member Dashboard Plans
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
