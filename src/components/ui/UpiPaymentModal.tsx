import React, { useState, useEffect } from 'react';
import { MembershipPlan, PaymentRecord } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useGymData } from '../../context/GymDataContext';
import {
  X,
  CheckCircle2,
  Copy,
  Clock,
  ShieldCheck,
  Download,
  Printer,
  Sparkles,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface UpiPaymentModalProps {
  plan: MembershipPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (payment: PaymentRecord) => void;
}

export const UpiPaymentModal: React.FC<UpiPaymentModalProps> = ({
  plan,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { processPayment } = useGymData();

  const [paymentStep, setPaymentStep] = useState<'scan' | 'verifying' | 'success'>('scan');
  const [utrNumber, setUtrNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [completedPayment, setCompletedPayment] = useState<PaymentRecord | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const upiId = 'gymcore.jaipur@icici';

  useEffect(() => {
    if (isOpen) {
      setPaymentStep('scan');
      setUtrNumber('');
      setCompletedPayment(null);
      setTimeLeft(600);
    }
  }, [isOpen, plan]);

  useEffect(() => {
    if (!isOpen || paymentStep !== 'scan') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, paymentStep]);

  if (!isOpen || !plan) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setPaymentStep('verifying');
    setTimeout(() => {
      const targetUserId = user?.id || 'usr_member_1';
      const ref = utrNumber.trim() ? `UPI/${utrNumber.trim()}/GYMCORE` : undefined;
      const payment = processPayment(targetUserId, plan.id, 'UPI', ref);

      setCompletedPayment(payment);
      setPaymentStep('success');

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5500', '#10b981', '#3b82f6', '#ffffff'],
      });

      if (onSuccess) onSuccess(payment);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-100 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">
              {paymentStep === 'success' ? 'Membership Activated' : 'UPI Instant Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {paymentStep === 'scan' && (
            <>
              {/* Order Summary Strip */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                    Selected Plan
                  </span>
                  <h4 className="text-base font-bold text-white">{plan.name}</h4>
                  <p className="text-xs text-neutral-400">
                    Duration: {plan.durationMonths} Month{plan.durationMonths > 1 ? 's' : ''} • GYM CORE Neota
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white">₹{plan.price.toLocaleString('en-IN')}</span>
                  <p className="text-[10px] text-emerald-400 font-semibold">Incl. All Taxes & RFID Pass</p>
                </div>
              </div>

              {/* QR Code Presentation */}
              <div className="bg-white rounded-2xl p-5 text-neutral-900 shadow-xl flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-3 text-xs font-semibold text-neutral-600 border-b pb-2">
                  <span className="flex items-center gap-1.5 text-neutral-900 font-bold">
                    <Smartphone className="w-4 h-4 text-orange-600" /> Scan with Any UPI App
                  </span>
                  <span className="flex items-center gap-1 font-mono text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded">
                    <Clock className="w-3.5 h-3.5" /> {formatTimer(timeLeft)}
                  </span>
                </div>

                {/* Simulated dynamic UPI QR code */}
                <div className="w-48 h-48 relative flex items-center justify-center border-4 border-neutral-900 rounded-xl p-2 bg-white">
                  <svg className="w-full h-full text-neutral-950" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="2" y="2" width="28" height="28" rx="2" fill="black" />
                    <rect x="6" y="6" width="20" height="20" rx="1" fill="white" />
                    <rect x="10" y="10" width="12" height="12" rx="1" fill="black" />

                    <rect x="70" y="2" width="28" height="28" rx="2" fill="black" />
                    <rect x="74" y="6" width="20" height="20" rx="1" fill="white" />
                    <rect x="78" y="10" width="12" height="12" rx="1" fill="black" />

                    <rect x="2" y="70" width="28" height="28" rx="2" fill="black" />
                    <rect x="6" y="74" width="20" height="20" rx="1" fill="white" />
                    <rect x="10" y="78" width="12" height="12" rx="1" fill="black" />

                    <rect x="36" y="6" width="12" height="12" fill="black" />
                    <rect x="52" y="14" width="14" height="6" fill="black" />
                    <rect x="6" y="38" width="10" height="16" fill="black" />
                    <rect x="20" y="44" width="12" height="10" fill="black" />

                    {/* GYM CORE Orange Core Brand in Center */}
                    <rect x="35" y="35" width="30" height="30" rx="4" fill="#ff5500" />
                    <polygon points="50,39 61,50 50,61 39,50" fill="white" />
                    <circle cx="50" cy="50" r="3" fill="#ff5500" />

                    <rect x="72" y="38" width="18" height="10" fill="black" />
                    <rect x="72" y="52" width="10" height="14" fill="black" />
                    <rect x="36" y="72" width="14" height="10" fill="black" />
                    <rect x="54" y="68" width="12" height="24" fill="black" />
                    <rect x="72" y="74" width="22" height="18" fill="black" />
                  </svg>
                </div>

                {/* Popular Indian UPI App logos representation */}
                <div className="flex items-center justify-center gap-3 mt-3 text-[11px] font-bold text-neutral-500">
                  <span className="px-2 py-1 rounded bg-neutral-100 text-purple-700">PhonePe</span>
                  <span className="px-2 py-1 rounded bg-neutral-100 text-blue-600">Google Pay</span>
                  <span className="px-2 py-1 rounded bg-neutral-100 text-sky-600">Paytm</span>
                  <span className="px-2 py-1 rounded bg-neutral-100 text-orange-600">BHIM UPI</span>
                </div>
              </div>

              {/* Manual UPI ID copy */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Or Pay to UPI ID</span>
                  <span className="font-mono text-white font-bold">{upiId}</span>
                </div>
                <button
                  onClick={handleCopyUpi}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* UTR Input Form & Instant Confirm */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Enter UPI Reference / 12-Digit UTR (Optional for instant simulation)
                  </label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="e.g. 428901847291"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-orange-500 focus:outline-none text-white text-sm font-mono placeholder:text-neutral-600"
                  />
                </div>

                <button
                  onClick={handleConfirmPayment}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/25 active:scale-[0.98] cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Confirm Payment & Activate Membership
                </button>

                <p className="text-[11px] text-center text-neutral-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 256-Bit SSL Encrypted & Bank-Grade Security
                </p>
              </div>
            </>
          )}

          {paymentStep === 'verifying' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <h4 className="text-lg font-bold text-white">Verifying UPI Transaction...</h4>
              <p className="text-xs text-neutral-400 max-w-xs">
                Connecting with National Payments Corporation of India (NPCI) gateway & assigning access keys.
              </p>
            </div>
          )}

          {paymentStep === 'success' && completedPayment && (
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-white">Payment Confirmed!</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Your membership is now active. Your digital pass and gym locker access are unlocked.
                </p>
              </div>

              {/* Tax Invoice Details Card */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Invoice Number</span>
                  <span className="font-mono text-white font-bold">{completedPayment.invoiceNumber}</span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Plan Activated</span>
                  <span className="text-white font-bold">{completedPayment.planName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Amount Paid</span>
                  <span className="text-emerald-400 font-extrabold text-sm">
                    ₹{completedPayment.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">UPI Ref / UTR</span>
                  <span className="font-mono text-neutral-300 text-[11px] truncate max-w-[200px]">
                    {completedPayment.upiRef}
                  </span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Facility Branch</span>
                  <span className="text-neutral-300 font-medium">Neota / Mahindra SEZ, Jaipur</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print Receipt
                </button>
                <button
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
