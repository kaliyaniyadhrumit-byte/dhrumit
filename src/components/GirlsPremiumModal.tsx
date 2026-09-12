import React, { useState } from 'react';
import {
  Crown,
  Check,
  Sparkles,
  ShieldCheck,
  EyeOff,
  Video,
  Zap,
  Calendar,
  CreditCard,
  Heart,
  X,
  Lock,
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import { GirlsPremiumState } from '../types';

interface GirlsPremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  premiumState: GirlsPremiumState;
  onSubscribe: (plan: 'monthly' | 'three_months' | 'annual' | 'lifetime') => void;
  onToggleIncognito: () => void;
}

export const GirlsPremiumModal: React.FC<GirlsPremiumModalProps> = ({
  isOpen,
  onClose,
  premiumState,
  onSubscribe,
  onToggleIncognito,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'three_months' | 'annual' | 'lifetime'>('monthly');
  const [processing, setProcessing] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  if (!isOpen) return null;

  const plans = [
    {
      id: 'monthly' as const,
      name: '1 Month',
      price: '₹149',
      period: '/month',
      badge: 'Budget Friendly',
      popular: true,
      desc: 'Affordable pocket pass for genuine connections',
    },
    {
      id: 'three_months' as const,
      name: '3 Months',
      price: '₹399',
      period: 'total',
      badge: 'Save 10%',
      desc: '₹133/month • Best for finding a meaningful vibe',
    },
    {
      id: 'annual' as const,
      name: '1 Year',
      price: '₹999',
      period: 'annual',
      badge: 'Save 44%',
      desc: 'Includes invitation to all offline VIP events',
    },
    {
      id: 'lifetime' as const,
      name: 'Lifetime VIP',
      price: '₹2,499',
      period: 'one-time',
      badge: 'Forever VIP',
      desc: 'Permanent Gold badge + unrestricted VIP access',
    },
  ];

  const features = [
    {
      icon: <EyeOff className="w-4 h-4 text-purple-400" />,
      title: 'Full Incognito / Ghost Mode',
      desc: 'Browse invisibly — only profiles you like can ever see you.',
    },
    {
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      title: 'See Who Liked You First',
      desc: 'Instant access to all inbound admirations without waiting.',
    },
    {
      icon: <Video className="w-4 h-4 text-blue-400" />,
      title: 'Unlimited In-App Video & Voice Calling',
      desc: 'Call matches safely without revealing your phone number or WhatsApp.',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      title: 'AI Background & Trust Safety Checks',
      desc: 'Inspect background verification details and ID badges for male suitors.',
    },
    {
      icon: <Calendar className="w-4 h-4 text-amber-400" />,
      title: 'Girls-Only VIP Offline Gatherings',
      desc: 'Exclusive invites to pottery coffee mixers, book meets, and concerts.',
    },
    {
      icon: <Zap className="w-4 h-4 text-pink-400" />,
      title: 'Auto-Boost & Priority Deck Placement',
      desc: 'Get discovered 5x faster by top-rated verified singles in Gujarat & Mumbai.',
    },
  ];

  const handleCheckout = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSubscribe(selectedPlan);
      setSuccessToast(true);
      setTimeout(() => {
        setSuccessToast(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-rose-500/40 rounded-3xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[92vh]">
        {/* Modal Banner Header */}
        <div className="p-6 bg-gradient-to-r from-rose-950 via-purple-950 to-slate-900 border-b border-rose-500/30 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
              <Crown className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">HerVibe Girls VIP</h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                  Pocket Friendly
                </span>
              </div>
              <p className="text-xs text-rose-200">
                Tailored for women — unmatched safety, zero creeps, and total privacy control
              </p>
            </div>
          </div>

          {/* Launch Special Offer Banner */}
          <div className="mt-4 p-2.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="text-xs text-rose-100 font-semibold">
                Launch Offer: Early women members get 50% discount & instant VIP status
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Plan Selector Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Select Pocket-Friendly Plan
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/40 shadow-lg'
                        : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 block w-fit">
                        {plan.badge}
                      </span>
                      <h5 className="text-xs font-bold text-white mt-1">{plan.name}</h5>
                    </div>
                    <div className="mt-3">
                      <span className="text-lg font-black text-white">{plan.price}</span>
                      <span className="text-[10px] text-slate-400 block">{plan.period}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ghost Mode Quick Toggle */}
          {premiumState.isSubscribed && (
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Ghost / Incognito Browsing</h5>
                  <p className="text-xs text-slate-300">
                    {premiumState.incognitoMode
                      ? 'Active: Only your right-swipes can view your card'
                      : 'Disabled: Visible to nearby verified suitors'}
                  </p>
                </div>
              </div>
              <button
                onClick={onToggleIncognito}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  premiumState.incognitoMode
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {premiumState.incognitoMode ? 'Enabled' : 'Enable'}
              </button>
            </div>
          )}

          {/* Features Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Everything Included in Girls VIP
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-start gap-3"
                >
                  <div className="p-2 rounded-xl bg-slate-700/60 shrink-0 mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{f.title}</h5>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / CTA */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted UPI / Razorpay • Cancel anytime</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCheckout}
              disabled={processing}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-all active:scale-95"
            >
              {processing ? (
                <span>Processing UPI...</span>
              ) : successToast ? (
                <span className="flex items-center gap-1 text-emerald-300">
                  <Check className="w-4 h-4" /> VIP Activated!
                </span>
              ) : (
                <>
                  <span>Activate VIP ({plans.find((p) => p.id === selectedPlan)?.price})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
