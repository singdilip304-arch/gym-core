export type UserRole = 'admin' | 'trainer' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  avatar: string;
  gender?: 'male' | 'female' | 'other';
  age?: number;
  height?: number; // cm
  weight?: number; // kg
  fitnessGoal?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  membershipId?: string;
  membershipStatus?: 'active' | 'expired' | 'pending' | 'none';
  membershipExpiresAt?: string;
  membershipPlanName?: string;
  assignedTrainerId?: string;
  assignedTrainerName?: string;
  memberSince?: string;
  qrCode?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  price: number; // INR
  originalPrice?: number;
  durationMonths: number;
  popular?: boolean;
  features: string[];
  description: string;
  accessHours: string;
  trainerSessionsIncluded: number;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  upiRef: string;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash';
  invoiceNumber: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'present' | 'completed';
  markedBy: 'qr_scanner' | 'admin_manual' | 'turnstile';
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  sets: number;
  reps: string;
  restSeconds: number;
  instructions: string;
  tips: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface DayWorkout {
  dayName: string; // e.g. "Monday"
  focus: string; // e.g. "Chest & Triceps"
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  title: string;
  assignedToUserId?: string; // specific user or global template
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro Athlete';
  goal: string;
  daysPerWeek: number;
  schedule: DayWorkout[];
  trainerNotes?: string;
  updatedAt: string;
}

export interface MealItem {
  name: string;
  portion: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface Meal {
  mealNumber: number;
  title: string; // e.g. "Breakfast (Post-Workout)"
  time: string;
  items: MealItem[];
  notes?: string;
}

export interface DietPlan {
  id: string;
  title: string;
  assignedToUserId?: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  meals: Meal[];
  guidelines: string[];
  hydrationTargetLiters: number;
  updatedAt: string;
}

export interface ProgressLog {
  id: string;
  userId: string;
  date: string;
  weight: number;
  bodyFatPercent?: number;
  chestCm?: number;
  armsCm?: number;
  waistCm?: number;
  thighsCm?: number;
  notes?: string;
  photoUrl?: string;
}

export interface Trainer {
  id: string;
  userId: string;
  name: string;
  role: string;
  experienceYears: number;
  specialization: string[];
  certifications: string[];
  bio: string;
  avatar: string;
  phone: string;
  email: string;
  rating: number;
  reviewsCount: number;
  clientsCount: number;
  availableDays: string[];
  availableSlots: string[];
}

export interface TrainerBooking {
  id: string;
  trainerId: string;
  trainerName: string;
  userId: string;
  userName: string;
  userPhone: string;
  date: string;
  timeSlot: string;
  sessionType: 'Strength Assessment' | 'Personal Training' | 'Form Correction' | 'Nutrition Consultation';
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface FreeTrialBooking {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  fitnessGoal: string;
  experienceLevel: string;
  status: 'confirmed' | 'attended' | 'cancelled' | 'pending';
  notes?: string;
  createdAt: string;
  bookingCode: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  programTaken: string;
  transformationImage?: string;
  isApproved: boolean;
  location?: string;
}

export interface TransformationStory {
  id: string;
  name: string;
  age: number;
  durationWeeks: number;
  weightLostKg?: number;
  muscleGainedKg?: number;
  beforeImage: string;
  afterImage: string;
  program: string;
  trainer: string;
  quote: string;
  metrics: {
    startWeight: number;
    endWeight: number;
    startBodyFat: number;
    endBodyFat: number;
  };
  isApproved: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'equipment' | 'trainers' | 'members' | 'events';
  imageUrl: string;
  caption: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'celebration' | 'urgent';
  createdAt: string;
  author: string;
  targetRole?: UserRole | 'all';
  active: boolean;
}
