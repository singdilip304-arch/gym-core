import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import { useTheme } from '../../context/ThemeContext';
import { Logo } from '../ui/Logo';
import { QrCodePass } from '../ui/QrCodePass';
import {
  LayoutDashboard,
  Dumbbell,
  Salad,
  LineChart,
  CalendarCheck,
  CreditCard,
  UserPlus,
  Users,
  ShieldAlert,
  Award,
  Calendar,
  MessageSquare,
  Image,
  Bell,
  Sun,
  Moon,
  LogOut,
  QrCode,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  UserCheck,
  Flame,
} from 'lucide-react';
import { UserRole } from '../../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeRole: UserRole;
  title: string;
  subtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeRole,
  title,
  subtitle,
}) => {
  const { user, isAuthenticated, logout, switchDemoUser } = useAuth();
  const { announcements } = useGymData();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Define navigation items per role
  const memberNav = [
    { label: 'Overview', path: '/member/dashboard', icon: LayoutDashboard },
    { label: 'My Workout', path: '/member/workout', icon: Dumbbell },
    { label: 'Diet & Macros', path: '/member/diet', icon: Salad },
    { label: 'Progress Metrics', path: '/member/progress', icon: LineChart },
    { label: 'Attendance Log', path: '/member/attendance', icon: CalendarCheck },
    { label: 'Payments & Pass', path: '/member/payments', icon: CreditCard },
    { label: 'Book Trainer', path: '/member/book-trainer', icon: UserPlus },
  ];

  const trainerNav = [
    { label: 'Trainer Hub', path: '/trainer/dashboard', icon: LayoutDashboard },
    { label: 'Assigned Members', path: '/trainer/members', icon: Users },
    { label: 'Workout Builder', path: '/trainer/workouts', icon: Dumbbell },
    { label: 'Diet Matrix', path: '/trainer/diet', icon: Salad },
    { label: 'Appointments', path: '/trainer/appointments', icon: Calendar },
  ];

  const adminNav = [
    { label: 'Command Center', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Members Directory', path: '/admin/members', icon: Users },
    { label: 'Membership Plans', path: '/admin/memberships', icon: Award },
    { label: 'Payments & Revenue', path: '/admin/payments', icon: CreditCard },
    { label: 'Trainer Roster', path: '/admin/trainers', icon: UserCheck },
    { label: 'Attendance Scanner', path: '/admin/attendance', icon: CalendarCheck },
    { label: 'Bookings & Trials', path: '/admin/bookings', icon: Calendar },
    { label: 'Master Workouts', path: '/admin/workouts', icon: Dumbbell },
    { label: 'Master Diets', path: '/admin/diet', icon: Salad },
    { label: 'Reviews Moderation', path: '/admin/reviews', icon: MessageSquare },
    { label: 'Gallery Media', path: '/admin/gallery', icon: Image },
    { label: 'Announcements', path: '/admin/notifications', icon: Bell },
  ];

  const currentNav =
    activeRole === 'admin' ? adminNav : activeRole === 'trainer' ? trainerNav : memberNav;

  const handleRoleSwitch = (role: UserRole) => {
    switchDemoUser(role);
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'trainer') navigate('/trainer/dashboard');
    else navigate('/member/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-neutral-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo size="sm" />
          <div className="hidden sm:block h-5 w-px bg-neutral-800" />
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-white capitalize flex items-center gap-1.5">
              <span>{activeRole} Platform</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                PRO v2.0
              </span>
            </h1>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Member Digital QR Pass Button (if member) */}
          {activeRole === 'member' && user && (
            <button
              onClick={() => setQrModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gym Access Pass</span>
              <span className="sm:hidden">Pass</span>
            </button>
          )}

          {/* Role switcher toggle */}
          <div className="hidden md:flex items-center bg-neutral-900 rounded-full p-1 border border-neutral-800 text-[11px] font-semibold">
            {(['member', 'trainer', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleSwitch(r)}
                className={`px-3 py-1 rounded-full uppercase tracking-wider transition-colors cursor-pointer ${
                  activeRole === r
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {announcements.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-4 z-50 text-xs animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-neutral-800">
                  <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
                    Gym Announcements
                  </h4>
                  <span className="text-[10px] text-orange-400 font-mono">
                    {announcements.length} Active
                  </span>
                </div>
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-[11px]">{ann.title}</span>
                        <span className="text-[9px] text-neutral-500">{ann.createdAt}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-snug">{ann.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
          </button>

          {/* User profile dropdown / logout */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-orange-500/40"
            />
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main App Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-neutral-800/80 bg-neutral-950/70 p-4 shrink-0 justify-between">
          <div className="space-y-6">
            {/* User Profile Mini Card */}
            <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={user?.name}
                className="w-10 h-10 rounded-xl object-cover border border-orange-500/30"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{user?.name}</h4>
                <p className="text-[10px] text-orange-400 uppercase font-semibold tracking-wider">
                  {user?.role}
                </p>
                <p className="text-[10px] text-neutral-500 font-mono truncate">
                  {user?.membershipPlanName || 'Core Athlete'}
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider px-3 block mb-2">
                Navigation
              </span>
              {currentNav.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-orange-500/70'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-neutral-900 text-xs text-neutral-500 space-y-2">
            <Link
              to="/"
              className="flex items-center justify-between text-neutral-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-neutral-900 transition-colors"
            >
              <span>Back to Public Site</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <div className="px-2 text-[10px] text-neutral-600">
              GYM CORE Neota Facility • Jaipur
            </div>
          </div>
        </aside>

        {/* Mobile Slide-in Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-neutral-950 border-r border-neutral-800 p-5 flex flex-col justify-between z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
                  <Logo size="sm" />
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded-lg text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Role Switcher in Mobile Drawer */}
                <div className="grid grid-cols-3 gap-1 bg-neutral-900 p-1 rounded-xl text-center text-[10px] font-bold">
                  {(['member', 'trainer', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        handleRoleSwitch(r);
                        setMobileSidebarOpen(false);
                      }}
                      className={`py-1.5 rounded-lg uppercase ${
                        activeRole === r ? 'bg-orange-500 text-white' : 'text-neutral-400'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <nav className="space-y-1.5 pt-2">
                  {currentNav.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:bg-neutral-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-neutral-900">
                <Link
                  to="/"
                  className="block text-center py-2 rounded-xl bg-neutral-900 text-xs font-semibold text-neutral-300"
                >
                  Return to Public Site
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto pb-24 lg:pb-10 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{title}</h2>
                {subtitle && <p className="text-xs sm:text-sm text-neutral-400 mt-1">{subtitle}</p>}
              </div>

              {/* Action triggers depending on role */}
              {activeRole === 'member' && (
                <div className="flex items-center gap-2">
                  <Link
                    to="/member/book-trainer"
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-white transition-colors"
                  >
                    Book Trainer
                  </Link>
                  <Link
                    to="/member/workout"
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20"
                  >
                    Today’s Workout
                  </Link>
                </div>
              )}
            </div>

            {/* Injected Content */}
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (App-like feel) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800/80 px-2 py-2 flex items-center justify-around shadow-2xl">
        {currentNav.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-colors ${
                isActive ? 'text-orange-500' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-1 truncate max-w-[64px]">
                {item.label.split(' ')[0]}
              </span>
            </Link>
          );
        })}

        {/* Center Digital Pass or More */}
        {activeRole === 'member' && user ? (
          <button
            onClick={() => setQrModalOpen(true)}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl text-orange-500 font-bold"
          >
            <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
              <QrCode className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5">Pass</span>
          </button>
        ) : (
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl text-neutral-400"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] mt-1">More</span>
          </button>
        )}
      </nav>

      {/* Member Digital Access Pass Modal */}
      {qrModalOpen && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute -top-10 right-0 p-1.5 rounded-full bg-neutral-800 text-white hover:bg-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>
            <QrCodePass user={user} onCheckInSuccess={() => setQrModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
