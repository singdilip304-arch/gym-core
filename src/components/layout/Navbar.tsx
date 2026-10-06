import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Menu,
  X,
  Sun,
  Moon,
  Bot,
  UserCheck,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { AiAssistantModal } from '../ui/AiAssistantModal';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, switchDemoUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setRoleDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Programs', path: '/programs' },
    { label: 'Membership', path: '/membership' },
    { label: 'Trainers', path: '/trainers' },
    { label: 'Calculators', path: '/calculators' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Transformations', path: '/transformations' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Contact', path: '/contact' },
  ];

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'trainer') return '/trainer/dashboard';
    return '/member/dashboard';
  };

  const handleRoleSelect = (role: UserRole) => {
    switchDemoUser(role);
    setRoleDropdownOpen(false);
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'trainer') navigate('/trainer/dashboard');
    else navigate('/member/dashboard');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-neutral-950/90 dark:bg-[#0b0d13]/95 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 bg-neutral-900/60 p-1 rounded-full border border-neutral-800/80 backdrop-blur-sm">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions Bar */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* AI Assistant Quick Trigger */}
              <button
                onClick={() => setAiModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold transition-all shadow-sm group cursor-pointer"
                title="Open GYM CORE AI Conversation & Coach"
              >
                <Bot className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>AI Conversation</span>
              </button>

              {/* Free Trial Button */}
              <Link
                to="/free-trial"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold text-neutral-200 hover:text-white transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                <span>Free Trial</span>
              </Link>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
                aria-label="Toggle Theme"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-sky-400" />
                )}
              </button>

              {/* Quick Role Switcher (Crucial pair-programming tool for seamless role testing) */}
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:border-orange-500/50 transition-colors cursor-pointer"
                  title="Switch Demo Role"
                >
                  <UserCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span className="capitalize font-semibold hidden sm:inline">
                    {user ? user.role : 'Demo'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-neutral-500" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                      Switch Role Mode
                    </div>
                    <button
                      onClick={() => handleRoleSelect('member')}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between font-medium cursor-pointer ${
                        user?.role === 'member'
                          ? 'bg-orange-500/10 text-orange-400'
                          : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <span>Member (Aman)</span>
                      {user?.role === 'member' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                    </button>
                    <button
                      onClick={() => handleRoleSelect('trainer')}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between font-medium cursor-pointer ${
                        user?.role === 'trainer'
                          ? 'bg-orange-500/10 text-orange-400'
                          : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <span>Trainer (Vikram)</span>
                      {user?.role === 'trainer' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                    </button>
                    <button
                      onClick={() => handleRoleSelect('admin')}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between font-medium cursor-pointer ${
                        user?.role === 'admin'
                          ? 'bg-orange-500/10 text-orange-400'
                          : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <span>Admin (Director)</span>
                      {user?.role === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                    </button>
                  </div>
                )}
              </div>

              {/* User Login / Dashboard CTA */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-1.5">
                  <Link
                    to={getDashboardPath()}
                    className="flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/20"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-5 h-5 rounded-full object-cover border border-white/40"
                    />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                    title="Log Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Link
                    to="/login"
                    className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-semibold text-xs transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/membership"
                    className="px-3.5 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/20"
                  >
                    Join Now
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden px-4 pt-4 pb-6 mt-3 bg-neutral-950/95 border-b border-neutral-800 backdrop-blur-xl animate-in slide-in-from-top-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => {
                  setAiModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4" /> AI Fitness Coach
              </button>
              <Link
                to="/free-trial"
                className="py-2.5 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-orange-500" /> Book Free Trial
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-1.5 border-t border-neutral-900 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                    location.pathname === link.path
                      ? 'bg-orange-500 text-white'
                      : 'text-neutral-300 hover:bg-neutral-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between">
              <div className="text-[11px] text-neutral-500">
                Neota / Mahindra SEZ, Jaipur
              </div>
              <Link
                to="/membership"
                className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs uppercase"
              >
                Join Now
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Persistent AI Assistant Modal */}
      <AiAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </>
  );
};
