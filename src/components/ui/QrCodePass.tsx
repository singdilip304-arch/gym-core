import React, { useState } from 'react';
import { User } from '../../types';
import { useGymData } from '../../context/GymDataContext';
import { QrCode, ShieldCheck, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QrCodePassProps {
  user: User;
  onCheckInSuccess?: () => void;
  compact?: boolean;
}

export const QrCodePass: React.FC<QrCodePassProps> = ({
  user,
  onCheckInSuccess,
  compact = false,
}) => {
  const { markAttendance } = useGymData();
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleSimulateCheckIn = () => {
    setIsScanning(true);
    setScanMessage(null);

    setTimeout(() => {
      const res = markAttendance(user.id, 'qr_scanner');
      setIsScanning(false);
      setScanMessage(res.message);
      setIsSuccess(res.success);

      if (res.success) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ff5500', '#ffffff', '#22c55e'],
        });
        if (onCheckInSuccess) onCheckInSuccess();
      }

      setTimeout(() => {
        setScanMessage(null);
      }, 5000);
    }, 700);
  };

  // Generate SVG mock QR matrix pattern
  const qrCodeText = user.qrCode || `GYMCORE-MEM-${user.id}`;

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${compact ? 'p-4' : 'p-6'} bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-neutral-800 text-white shadow-2xl`}>
      {/* Background glowing ambient light */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-neutral-700/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">Digital Access Pass</h4>
            <p className="text-[10px] text-neutral-400">GYM CORE • Neota / Mahindra SEZ</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Active
        </span>
      </div>

      {/* Member Details */}
      <div className="flex items-center gap-3.5 mb-4">
        <img
          src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
          alt={user.name}
          className="w-14 h-14 rounded-xl object-cover border-2 border-orange-500/40 p-0.5"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-extrabold text-white truncate">{user.name}</h3>
          <p className="text-xs text-orange-400 font-medium truncate">{user.membershipPlanName || 'CORE ATHLETE'}</p>
          <div className="flex items-center gap-3 mt-1 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1 font-mono">
              ID: {user.qrCode || `GC-${user.id.slice(-5)}`}
            </span>
          </div>
        </div>
      </div>

      {/* QR Code Presentation Box */}
      <div className="relative mx-auto my-2 p-3 bg-white rounded-xl shadow-inner flex flex-col items-center justify-center max-w-[200px]">
        {/* SVG QR Code Pattern Representation */}
        <div className="w-36 h-36 relative flex items-center justify-center">
          <svg className="w-full h-full text-neutral-900" viewBox="0 0 100 100" fill="currentColor">
            {/* Corner position markers */}
            <rect x="5" y="5" width="26" height="26" rx="4" fill="black" />
            <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
            <rect x="13" y="13" width="10" height="10" rx="1" fill="black" />

            <rect x="69" y="5" width="26" height="26" rx="4" fill="black" />
            <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
            <rect x="77" y="13" width="10" height="10" rx="1" fill="black" />

            <rect x="5" y="69" width="26" height="26" rx="4" fill="black" />
            <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
            <rect x="13" y="77" width="10" height="10" rx="1" fill="black" />

            {/* Simulated Data Points */}
            <rect x="36" y="8" width="8" height="8" rx="1" fill="black" />
            <rect x="50" y="8" width="12" height="6" rx="1" fill="black" />
            <rect x="38" y="20" width="18" height="6" rx="1" fill="black" />
            <rect x="8" y="38" width="6" height="16" rx="1" fill="black" />
            <rect x="20" y="44" width="8" height="18" rx="1" fill="black" />
            <rect x="36" y="36" width="28" height="28" rx="3" fill="#ff5500" />
            <rect x="42" y="42" width="16" height="16" rx="2" fill="white" />
            <rect x="46" y="46" width="8" height="8" rx="1" fill="#ff5500" />
            <rect x="70" y="38" width="12" height="10" rx="1" fill="black" />
            <rect x="84" y="44" width="10" height="18" rx="1" fill="black" />
            <rect x="38" y="72" width="14" height="8" rx="1" fill="black" />
            <rect x="58" y="70" width="8" height="22" rx="1" fill="black" />
            <rect x="72" y="76" width="20" height="12" rx="1" fill="black" />
          </svg>
          {isScanning && (
            <div className="absolute inset-0 bg-orange-500/20 rounded-lg flex items-center justify-center backdrop-blur-[1px]">
              <div className="w-full h-1 bg-orange-500 animate-bounce shadow-lg" />
            </div>
          )}
        </div>
        <p className="text-[10px] font-mono text-neutral-800 font-bold mt-1 tracking-wider">
          {qrCodeText}
        </p>
      </div>

      {/* Expiry & Location Info */}
      <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-3 pt-2 border-t border-neutral-800">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-neutral-500" />
          Valid: {user.membershipExpiresAt || 'Ongoing'}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-orange-500" />
          Neota Facility
        </span>
      </div>

      {/* Action / Simulation Trigger */}
      <div className="mt-4">
        <button
          onClick={handleSimulateCheckIn}
          disabled={isScanning}
          className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer"
        >
          {isScanning ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Scanning Turnstile...
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              Scan Digital Pass (Simulate Turnstile)
            </>
          )}
        </button>

        {scanMessage && (
          <div
            className={`mt-2.5 p-2.5 rounded-lg text-xs flex items-center gap-2 ${
              isSuccess
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
            )}
            <span className="leading-tight">{scanMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
