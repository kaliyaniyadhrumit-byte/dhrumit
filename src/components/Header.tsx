import React from 'react';
import { Heart, Sparkles, Shield, Crown, EyeOff, User, Zap, AlertTriangle } from 'lucide-react';
import { Gender, GirlsPremiumState } from '../types';

interface HeaderProps {
  currentUserGender: Gender;
  onSwitchGender: (gender: Gender) => void;
  premiumState: GirlsPremiumState;
  onOpenPremium: () => void;
  onOpenSafety: () => void;
  onTriggerSos: () => void;
  swipesLeft: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUserGender,
  onSwitchGender,
  premiumState,
  onOpenPremium,
  onOpenSafety,
  onTriggerSos,
  swipesLeft,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white px-3 sm:px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Tagline */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-500/20 text-white">
            <Heart className="w-5 h-5 fill-white stroke-none animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 bg-clip-text text-transparent">
                HerVibe
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                India Duo
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Where women choose first • Safe & Verified</p>
          </div>
        </div>

        {/* Center: Role Switcher Demo Bar (Crucial for testing Girl vs Boy duo ratio & premium) */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shadow-inner">
          <button
            id="role-switch-girl"
            onClick={() => onSwitchGender('woman')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              currentUserGender === 'woman'
                ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Experience as a Woman (Girls-Only Premium, Safe Date Planner, VIP Lounge)"
          >
            <span>👩</span>
            <span className="hidden md:inline">Priya (Girl View)</span>
            <span className="md:hidden">Girl</span>
            {currentUserGender === 'woman' && premiumState.isSubscribed && (
              <Crown className="w-3 h-3 text-amber-300 fill-amber-300" />
            )}
          </button>

          <button
            id="role-switch-boy"
            onClick={() => onSwitchGender('man')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              currentUserGender === 'man'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Experience as a Man (Balanced 10 Swipes -> 2-3 Girls Ratio Engine)"
          >
            <span>👨</span>
            <span className="hidden md:inline">Aarav (Boy View)</span>
            <span className="md:hidden">Boy</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Swipes status badge */}
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-slate-400">Swipes:</span>
            <span className="font-semibold text-white">
              {currentUserGender === 'woman' || premiumState.isSubscribed ? 'Unlimited' : `${swipesLeft} today`}
            </span>
          </div>

          {/* Incognito active chip */}
          {premiumState.incognitoMode && (
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs font-medium">
              <EyeOff className="w-3 h-3" />
              <span>Ghost Active</span>
            </div>
          )}

          {/* Girls-Only Premium CTA */}
          <button
            id="premium-cta-btn"
            onClick={onOpenPremium}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-md ${
              premiumState.isSubscribed
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-rose-500/25'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span className="hidden sm:inline">
              {premiumState.isSubscribed ? 'Girls VIP' : 'Girls Premium ₹149'}
            </span>
            <span className="sm:hidden">
              {premiumState.isSubscribed ? 'VIP' : '₹149'}
            </span>
          </button>

          {/* Safety Center Button */}
          <button
            id="safety-center-btn"
            onClick={onOpenSafety}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 transition-colors relative"
            title="Safety Center, Verification & Safe Date Planner"
          >
            <Shield className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
          </button>

          {/* Rapid SOS button */}
          <button
            id="emergency-sos-header-btn"
            onClick={onTriggerSos}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-md shadow-red-600/20 animate-pulse"
            title="Emergency SOS & Women Helpline 181 / 112"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
