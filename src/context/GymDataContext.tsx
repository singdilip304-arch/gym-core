import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  MembershipPlan,
  PaymentRecord,
  AttendanceRecord,
  WorkoutPlan,
  DietPlan,
  ProgressLog,
  Trainer,
  TrainerBooking,
  FreeTrialBooking,
  Review,
  TransformationStory,
  GalleryItem,
  Announcement,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_MEMBERSHIPS,
  INITIAL_TRAINERS,
  INITIAL_WORKOUT_PLANS,
  INITIAL_DIET_PLANS,
  INITIAL_PROGRESS_LOGS,
  INITIAL_ATTENDANCE,
  INITIAL_PAYMENTS,
  INITIAL_TRAINER_BOOKINGS,
  INITIAL_FREE_TRIALS,
  INITIAL_REVIEWS,
  INITIAL_TRANSFORMATIONS,
  INITIAL_GALLERY,
  INITIAL_ANNOUNCEMENTS,
} from '../data/mockData';

interface GymDataContextType {
  users: User[];
  memberships: MembershipPlan[];
  payments: PaymentRecord[];
  attendance: AttendanceRecord[];
  workouts: WorkoutPlan[];
  diets: DietPlan[];
  progressLogs: ProgressLog[];
  trainers: Trainer[];
  trainerBookings: TrainerBooking[];
  freeTrials: FreeTrialBooking[];
  reviews: Review[];
  transformations: TransformationStory[];
  gallery: GalleryItem[];
  announcements: Announcement[];

  // Actions
  addMembershipPlan: (plan: Omit<MembershipPlan, 'id'>) => void;
  updateMembershipPlan: (id: string, plan: Partial<MembershipPlan>) => void;
  deleteMembershipPlan: (id: string) => void;

  processPayment: (
    userId: string,
    planId: string,
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash',
    upiRef?: string
  ) => PaymentRecord;

  markAttendance: (userId: string, markedBy?: 'qr_scanner' | 'admin_manual') => { success: boolean; message: string };

  addWorkoutPlan: (plan: Omit<WorkoutPlan, 'id' | 'updatedAt'>) => void;
  updateWorkoutPlan: (id: string, plan: Partial<WorkoutPlan>) => void;

  addDietPlan: (plan: Omit<DietPlan, 'id' | 'updatedAt'>) => void;
  updateDietPlan: (id: string, plan: Partial<DietPlan>) => void;

  addProgressLog: (log: Omit<ProgressLog, 'id'>) => void;

  bookTrainerSession: (booking: Omit<TrainerBooking, 'id' | 'createdAt' | 'status'>) => TrainerBooking;
  updateTrainerBookingStatus: (id: string, status: TrainerBooking['status']) => void;

  bookFreeTrial: (trial: Omit<FreeTrialBooking, 'id' | 'createdAt' | 'bookingCode' | 'status'>) => FreeTrialBooking;
  updateFreeTrialStatus: (id: string, status: FreeTrialBooking['status']) => void;

  submitReview: (review: Omit<Review, 'id' | 'date' | 'isApproved'>) => void;
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;

  submitTransformation: (item: Omit<TransformationStory, 'id' | 'isApproved'>) => void;
  approveTransformation: (id: string) => void;
  deleteTransformation: (id: string) => void;

  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  addAnnouncement: (ann: Omit<Announcement, 'id' | 'createdAt'>) => void;
  toggleAnnouncement: (id: string) => void;
  deleteAnnouncement: (id: string) => void;

  addTrainer: (trainer: Omit<Trainer, 'id'>) => void;
  updateTrainer: (id: string, data: Partial<Trainer>) => void;

  updateMember: (id: string, data: Partial<User>) => void;
  addMember: (user: Omit<User, 'id'>) => User;
}

const GymDataContext = createContext<GymDataContextType | undefined>(undefined);

export const GymDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getStorage = <T,>(key: string, initial: T): T => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initial;
      }
    }
    return initial;
  };

  const [users, setUsers] = useState<User[]>(() => getStorage('gymcore_users', INITIAL_USERS));
  const [memberships, setMemberships] = useState<MembershipPlan[]>(() => getStorage('gymcore_memberships', INITIAL_MEMBERSHIPS));
  const [payments, setPayments] = useState<PaymentRecord[]>(() => getStorage('gymcore_payments', INITIAL_PAYMENTS));
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => getStorage('gymcore_attendance', INITIAL_ATTENDANCE));
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>(() => getStorage('gymcore_workouts', INITIAL_WORKOUT_PLANS));
  const [diets, setDiets] = useState<DietPlan[]>(() => getStorage('gymcore_diets', INITIAL_DIET_PLANS));
  const [progressLogs, setProgressLogs] = useState<ProgressLog[]>(() => getStorage('gymcore_progress', INITIAL_PROGRESS_LOGS));
  const [trainers, setTrainers] = useState<Trainer[]>(() => getStorage('gymcore_trainers', INITIAL_TRAINERS));
  const [trainerBookings, setTrainerBookings] = useState<TrainerBooking[]>(() => getStorage('gymcore_trainer_bookings', INITIAL_TRAINER_BOOKINGS));
  const [freeTrials, setFreeTrials] = useState<FreeTrialBooking[]>(() => getStorage('gymcore_free_trials', INITIAL_FREE_TRIALS));
  const [reviews, setReviews] = useState<Review[]>(() => getStorage('gymcore_reviews', INITIAL_REVIEWS));
  const [transformations, setTransformations] = useState<TransformationStory[]>(() => getStorage('gymcore_transformations', INITIAL_TRANSFORMATIONS));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => getStorage('gymcore_gallery', INITIAL_GALLERY));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => getStorage('gymcore_announcements', INITIAL_ANNOUNCEMENTS));

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('gymcore_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('gymcore_memberships', JSON.stringify(memberships)); }, [memberships]);
  useEffect(() => { localStorage.setItem('gymcore_payments', JSON.stringify(payments)); }, [payments]);
  useEffect(() => { localStorage.setItem('gymcore_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('gymcore_workouts', JSON.stringify(workouts)); }, [workouts]);
  useEffect(() => { localStorage.setItem('gymcore_diets', JSON.stringify(diets)); }, [diets]);
  useEffect(() => { localStorage.setItem('gymcore_progress', JSON.stringify(progressLogs)); }, [progressLogs]);
  useEffect(() => { localStorage.setItem('gymcore_trainers', JSON.stringify(trainers)); }, [trainers]);
  useEffect(() => { localStorage.setItem('gymcore_trainer_bookings', JSON.stringify(trainerBookings)); }, [trainerBookings]);
  useEffect(() => { localStorage.setItem('gymcore_free_trials', JSON.stringify(freeTrials)); }, [freeTrials]);
  useEffect(() => { localStorage.setItem('gymcore_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('gymcore_transformations', JSON.stringify(transformations)); }, [transformations]);
  useEffect(() => { localStorage.setItem('gymcore_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('gymcore_announcements', JSON.stringify(announcements)); }, [announcements]);

  // Membership Actions
  const addMembershipPlan = (plan: Omit<MembershipPlan, 'id'>) => {
    const newPlan: MembershipPlan = {
      ...plan,
      id: `plan_${Date.now()}`,
    };
    setMemberships((prev) => [...prev, newPlan]);
  };

  const updateMembershipPlan = (id: string, updated: Partial<MembershipPlan>) => {
    setMemberships((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteMembershipPlan = (id: string) => {
    setMemberships((prev) => prev.filter((p) => p.id !== id));
  };

  // Payment & Membership Activation
  const processPayment = (
    userId: string,
    planId: string,
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash',
    upiRef?: string
  ): PaymentRecord => {
    const plan = memberships.find((p) => p.id === planId) || memberships[0];
    const user = users.find((u) => u.id === userId) || users[2];

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + plan.durationMonths);
    const expiryStr = expiryDate.toISOString().split('T')[0];

    const newPayment: PaymentRecord = {
      id: `pay_${Date.now()}`,
      userId,
      userName: user.name,
      userEmail: user.email,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      currency: 'INR',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      upiRef: upiRef || `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}/GYMCORE`,
      paymentMethod,
      invoiceNumber: `INV-GC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setPayments((prev) => [newPayment, ...prev]);

    // Update user membership
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              membershipId: plan.id,
              membershipPlanName: plan.name,
              membershipStatus: 'active',
              membershipExpiresAt: expiryStr,
            }
          : u
      )
    );

    // Also update logged in auth user if match
    const authUser = localStorage.getItem('gymcore_auth_user');
    if (authUser) {
      try {
        const parsed = JSON.parse(authUser);
        if (parsed.id === userId) {
          const updatedAuth = {
            ...parsed,
            membershipId: plan.id,
            membershipPlanName: plan.name,
            membershipStatus: 'active',
            membershipExpiresAt: expiryStr,
          };
          localStorage.setItem('gymcore_auth_user', JSON.stringify(updatedAuth));
        }
      } catch (e) {
        console.error(e);
      }
    }

    return newPayment;
  };

  // Attendance
  const markAttendance = (
    userId: string,
    markedBy: 'qr_scanner' | 'admin_manual' = 'qr_scanner'
  ) => {
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return { success: false, message: 'Member record not found.' };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const nowTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check if already checked in today
    const existing = attendance.find(
      (a) => a.userId === userId && a.date === todayStr
    );

    if (existing) {
      if (!existing.checkOutTime) {
        // Mark check out
        setAttendance((prev) =>
          prev.map((a) =>
            a.id === existing.id
              ? { ...a, checkOutTime: nowTimeStr, status: 'completed' }
              : a
          )
        );
        return {
          success: true,
          message: `Check-out recorded at ${nowTimeStr} for ${user.name}. Great workout!`,
        };
      }
      return {
        success: false,
        message: `Attendance already marked today for ${user.name}.`,
      };
    }

    const newRecord: AttendanceRecord = {
      id: `att_${Date.now()}`,
      userId,
      userName: user.name,
      date: todayStr,
      checkInTime: nowTimeStr,
      status: 'present',
      markedBy,
    };

    setAttendance((prev) => [newRecord, ...prev]);
    return {
      success: true,
      message: `Welcome to GYM CORE, ${user.name}! Check-in recorded at ${nowTimeStr}.`,
    };
  };

  // Workouts
  const addWorkoutPlan = (plan: Omit<WorkoutPlan, 'id' | 'updatedAt'>) => {
    const newPlan: WorkoutPlan = {
      ...plan,
      id: `wp_${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setWorkouts((prev) => [newPlan, ...prev]);
  };

  const updateWorkoutPlan = (id: string, plan: Partial<WorkoutPlan>) => {
    setWorkouts((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, ...plan, updatedAt: new Date().toISOString().split('T')[0] }
          : w
      )
    );
  };

  // Diets
  const addDietPlan = (plan: Omit<DietPlan, 'id' | 'updatedAt'>) => {
    const newDiet: DietPlan = {
      ...plan,
      id: `diet_${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setDiets((prev) => [newDiet, ...prev]);
  };

  const updateDietPlan = (id: string, plan: Partial<DietPlan>) => {
    setDiets((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, ...plan, updatedAt: new Date().toISOString().split('T')[0] }
          : d
      )
    );
  };

  // Progress Logs
  const addProgressLog = (log: Omit<ProgressLog, 'id'>) => {
    const newLog: ProgressLog = {
      ...log,
      id: `prg_${Date.now()}`,
    };
    setProgressLogs((prev) => [...prev, newLog]);
  };

  // Trainer Bookings
  const bookTrainerSession = (
    booking: Omit<TrainerBooking, 'id' | 'createdAt' | 'status'>
  ): TrainerBooking => {
    const newBooking: TrainerBooking = {
      ...booking,
      id: `tb_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTrainerBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateTrainerBookingStatus = (id: string, status: TrainerBooking['status']) => {
    setTrainerBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  // Free Trials
  const bookFreeTrial = (
    trial: Omit<FreeTrialBooking, 'id' | 'createdAt' | 'bookingCode' | 'status'>
  ): FreeTrialBooking => {
    const newTrial: FreeTrialBooking = {
      ...trial,
      id: `trial_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      bookingCode: `GC-TRIAL-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setFreeTrials((prev) => [newTrial, ...prev]);
    return newTrial;
  };

  const updateFreeTrialStatus = (id: string, status: FreeTrialBooking['status']) => {
    setFreeTrials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  // Reviews
  const submitReview = (review: Omit<Review, 'id' | 'date' | 'isApproved'>) => {
    const newReview: Review = {
      ...review,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isApproved: false, // Requires admin approval
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const approveReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: true } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // Transformations
  const submitTransformation = (item: Omit<TransformationStory, 'id' | 'isApproved'>) => {
    const newStory: TransformationStory = {
      ...item,
      id: `trans_${Date.now()}`,
      isApproved: false, // Requires admin approval
    };
    setTransformations((prev) => [newStory, ...prev]);
  };

  const approveTransformation = (id: string) => {
    setTransformations((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isApproved: true } : t))
    );
  };

  const deleteTransformation = (id: string) => {
    setTransformations((prev) => prev.filter((t) => t.id !== id));
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal_${Date.now()}`,
    };
    setGallery((prev) => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  // Announcements
  const addAnnouncement = (ann: Omit<Announcement, 'id' | 'createdAt'>) => {
    const newAnn: Announcement = {
      ...ann,
      id: `ann_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const toggleAnnouncement = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // Trainers
  const addTrainer = (trainer: Omit<Trainer, 'id'>) => {
    const newTrainer: Trainer = {
      ...trainer,
      id: `usr_trainer_${Date.now()}`,
    };
    setTrainers((prev) => [...prev, newTrainer]);
  };

  const updateTrainer = (id: string, data: Partial<Trainer>) => {
    setTrainers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
  };

  // Members
  const updateMember = (id: string, data: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
  };

  const addMember = (user: Omit<User, 'id'>): User => {
    const newUser: User = {
      ...user,
      id: `usr_mem_${Date.now()}`,
      qrCode: `GYMCORE-MEM-${Date.now().toString().slice(-6)}`,
      memberSince: new Date().toISOString().split('T')[0],
    };
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  return (
    <GymDataContext.Provider
      value={{
        users,
        memberships,
        payments,
        attendance,
        workouts,
        diets,
        progressLogs,
        trainers,
        trainerBookings,
        freeTrials,
        reviews,
        transformations,
        gallery,
        announcements,
        addMembershipPlan,
        updateMembershipPlan,
        deleteMembershipPlan,
        processPayment,
        markAttendance,
        addWorkoutPlan,
        updateWorkoutPlan,
        addDietPlan,
        updateDietPlan,
        addProgressLog,
        bookTrainerSession,
        updateTrainerBookingStatus,
        bookFreeTrial,
        updateFreeTrialStatus,
        submitReview,
        approveReview,
        deleteReview,
        submitTransformation,
        approveTransformation,
        deleteTransformation,
        addGalleryItem,
        deleteGalleryItem,
        addAnnouncement,
        toggleAnnouncement,
        deleteAnnouncement,
        addTrainer,
        updateTrainer,
        updateMember,
        addMember,
      }}
    >
      {children}
    </GymDataContext.Provider>
  );
};

export const useGymData = () => {
  const context = useContext(GymDataContext);
  if (!context) {
    throw new Error('useGymData must be used within a GymDataProvider');
  }
  return context;
};
