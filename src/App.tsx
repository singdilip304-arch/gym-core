import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { GymDataProvider } from './context/GymDataContext';
import { PublicLayout } from './components/layout/PublicLayout';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { Membership } from './pages/Membership';
import { Trainers } from './pages/Trainers';
import { Calculators } from './pages/Calculators';
import { Gallery } from './pages/Gallery';
import { Transformations } from './pages/Transformations';
import { Reviews } from './pages/Reviews';
import { FreeTrial } from './pages/FreeTrial';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Member Pages
import { MemberDashboard } from './pages/member/MemberDashboard';
import { MemberWorkout } from './pages/member/MemberWorkout';
import { MemberDiet } from './pages/member/MemberDiet';
import { MemberProgress } from './pages/member/MemberProgress';
import { MemberAttendance } from './pages/member/MemberAttendance';
import { MemberPayments } from './pages/member/MemberPayments';
import { MemberBookTrainer } from './pages/member/MemberBookTrainer';

// Trainer Pages
import { TrainerDashboard } from './pages/trainer/TrainerDashboard';
import { TrainerMembers } from './pages/trainer/TrainerMembers';
import { TrainerWorkouts } from './pages/trainer/TrainerWorkouts';
import { TrainerDiet } from './pages/trainer/TrainerDiet';
import { TrainerAppointments } from './pages/trainer/TrainerAppointments';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminMembers } from './pages/admin/AdminMembers';
import { AdminMemberships } from './pages/admin/AdminMemberships';
import { AdminPayments } from './pages/admin/AdminPayments';
import { AdminTrainers } from './pages/admin/AdminTrainers';
import { AdminAttendance } from './pages/admin/AdminAttendance';
import { AdminBookings } from './pages/admin/AdminBookings';
import { AdminWorkouts } from './pages/admin/AdminWorkouts';
import { AdminDiet } from './pages/admin/AdminDiet';
import { AdminReviews } from './pages/admin/AdminReviews';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminNotifications } from './pages/admin/AdminNotifications';
import { FloatingConversationButton } from './components/ui/FloatingConversationButton';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GymDataProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes with Navbar and Footer */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/programs" element={<PublicLayout><Programs /></PublicLayout>} />
              <Route path="/membership" element={<PublicLayout><Membership /></PublicLayout>} />
              <Route path="/trainers" element={<PublicLayout><Trainers /></PublicLayout>} />
              <Route path="/calculators" element={<PublicLayout><Calculators /></PublicLayout>} />
              <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
              <Route path="/transformations" element={<PublicLayout><Transformations /></PublicLayout>} />
              <Route path="/reviews" element={<PublicLayout><Reviews /></PublicLayout>} />
              <Route path="/free-trial" element={<PublicLayout><FreeTrial /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
              <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

              {/* Member Dashboard Routes */}
              <Route path="/member/dashboard" element={<MemberDashboard />} />
              <Route path="/member/workout" element={<MemberWorkout />} />
              <Route path="/member/diet" element={<MemberDiet />} />
              <Route path="/member/progress" element={<MemberProgress />} />
              <Route path="/member/attendance" element={<MemberAttendance />} />
              <Route path="/member/payments" element={<MemberPayments />} />
              <Route path="/member/book-trainer" element={<MemberBookTrainer />} />

              {/* Trainer Dashboard Routes */}
              <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
              <Route path="/trainer/members" element={<TrainerMembers />} />
              <Route path="/trainer/workouts" element={<TrainerWorkouts />} />
              <Route path="/trainer/diet" element={<TrainerDiet />} />
              <Route path="/trainer/appointments" element={<TrainerAppointments />} />

              {/* Admin Dashboard Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/members" element={<AdminMembers />} />
              <Route path="/admin/memberships" element={<AdminMemberships />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
              <Route path="/admin/trainers" element={<AdminTrainers />} />
              <Route path="/admin/attendance" element={<AdminAttendance />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/admin/workouts" element={<AdminWorkouts />} />
              <Route path="/admin/diet" element={<AdminDiet />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
              <Route path="/admin/gallery" element={<AdminGallery />} />
              <Route path="/admin/notifications" element={<AdminNotifications />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <FloatingConversationButton />
          </BrowserRouter>
        </GymDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
