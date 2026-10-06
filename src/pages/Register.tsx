import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/Logo';
import {
  User as UserIcon,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(72);
  const [fitnessGoal, setFitnessGoal] = useState('Hypertrophy & Muscle Building');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('Parent / Spouse');
  const [avatar, setAvatar] = useState(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
  );

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      password,
      age: Number(age),
      gender,
      height: Number(height),
      weight: Number(weight),
      fitnessGoal,
      emergencyName: emergencyName.trim(),
      emergencyPhone: emergencyPhone.trim(),
      emergencyRelation,
      avatar,
    });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5500', '#22c55e', '#ffffff'],
    });

    setTimeout(() => {
      navigate('/member/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            Create Member Account
          </h2>
          <p className="text-xs text-neutral-400">
            Join Jaipur’s elite bodybuilding, strength & performance sanctum.
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6">
          <form onSubmit={handleRegister} className="space-y-6 text-xs">
            {/* Avatar Selector */}
            <div>
              <label className="text-neutral-300 font-bold block mb-2">Choose Profile Avatar</label>
              <div className="flex items-center gap-3">
                <img
                  src={avatar}
                  alt="Chosen Avatar"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-500 p-0.5 shadow-md"
                />
                <div className="flex gap-2 overflow-x-auto py-1">
                  {sampleAvatars.map((av, idx) => (
                    <img
                      key={idx}
                      src={av}
                      alt={`Avatar option ${idx}`}
                      onClick={() => setAvatar(av)}
                      className={`w-10 h-10 rounded-xl object-cover cursor-pointer border transition-transform hover:scale-105 ${
                        avatar === av ? 'border-orange-500 scale-105' : 'border-neutral-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Core credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-300 block mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vikram@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1 font-semibold">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98290 00000"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1 font-semibold">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Biometrics */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-3">
              <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider block">
                Biometric Baselines
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Primary Fitness Goal</label>
                <select
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                >
                  <option value="Hypertrophy & Muscle Building">Hypertrophy & Muscle Building</option>
                  <option value="Metabolic Fat Loss">Metabolic Fat Loss</option>
                  <option value="Strength & Powerlifting 1RM">Strength & Powerlifting 1RM</option>
                  <option value="Beginner Foundation & Form">Beginner Foundation & Form</option>
                  <option value="Women Fitness & Glute Hypertrophy">Women Fitness & Glute Hypertrophy</option>
                  <option value="Athletic VO2 & Conditioning">Athletic VO2 & Conditioning</option>
                </select>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-3">
              <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider block">
                Safety & Emergency Contact
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="e.g. Ramesh Verma"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="+91 98290 00000"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Relationship</label>
                  <input
                    type="text"
                    value={emergencyRelation}
                    onChange={(e) => setEmergencyRelation(e.target.value)}
                    placeholder="e.g. Brother / Mother"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Complete Registration & Generate Digital Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-neutral-900 text-center text-xs text-neutral-400">
            <span>Already have an active membership? </span>
            <Link to="/login" className="text-orange-400 font-bold hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
