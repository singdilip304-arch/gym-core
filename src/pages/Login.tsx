import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Dumbbell,
  Users,
} from 'lucide-react';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const { login, switchDemoUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('aman.verma@example.com');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('member');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = login(email, password, selectedRole);
    if (success) {
      if (selectedRole === 'admin') navigate('/admin/dashboard');
      else if (selectedRole === 'trainer') navigate('/trainer/dashboard');
      else navigate('/member/dashboard');
    } else {
      setError('Invalid credentials. Please verify your email and role.');
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    switchDemoUser(role);
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'trainer') navigate('/trainer/dashboard');
    else navigate('/member/dashboard');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            Sign In to GYM CORE
          </h2>
          <p className="text-xs text-neutral-400">
            Access your workouts, diet plans, RFID digital pass, or admin dashboard.
          </p>
        </div>

        {/* 1-Click Quick Demo Profiles Switcher (Golden feature for instant pair-programming testing!) */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
              1-Click Instant Demo Login
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">No password required</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('member')}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-orange-500/10 hover:border-orange-500/40 border border-neutral-800 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-orange-400">
                <Dumbbell className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">Member</span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-1 truncate">Aman Verma</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('trainer')}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-orange-500/10 hover:border-orange-500/40 border border-neutral-800 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-orange-400">
                <Users className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">Trainer</span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-1 truncate">Vikram Singh</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-orange-500/10 hover:border-orange-500/40 border border-neutral-800 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-orange-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">Admin</span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-1 truncate">Rajesh (Dir)</p>
            </button>
          </div>
        </div>

        {/* Standard Login Form */}
        <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6">
          {/* Role selector tab */}
          <div className="flex p-1 rounded-xl bg-neutral-900 text-xs font-bold text-center">
            {(['member', 'trainer', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                className={`flex-1 py-2 rounded-lg uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedRole === r ? 'bg-orange-500 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="text-neutral-300 block mb-1 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-300 block mb-1 font-semibold">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            {error && (
              <p className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to {selectedRole} Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-neutral-900 text-center text-xs text-neutral-400">
            <span>Don't have an active account? </span>
            <Link to="/register" className="text-orange-400 font-bold hover:underline">
              Register as New Member
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
