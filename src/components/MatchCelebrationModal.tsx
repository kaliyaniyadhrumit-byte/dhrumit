import React, { useEffect } from 'react';
import { Heart, MessageCircle, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Profile, Gender } from '../types';

interface MatchCelebrationModalProps {
  matchedProfile: Profile | null;
  currentUserGender: Gender;
  onClose: () => void;
  onSendMessage: (profile: Profile) => void;
}

export const MatchCelebrationModal: React.FC<MatchCelebrationModalProps> = ({
  matchedProfile,
  currentUserGender,
  onClose,
  onSendMessage,
}) => {
  useEffect(() => {
    if (matchedProfile) {
      // Fire festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#ffffff']
      });
    }
  }, [matchedProfile]);

  if (!matchedProfile) return null;

  const myAvatar = currentUserGender === 'woman'
    ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
    : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-950 border border-rose-500/40 rounded-3xl p-6 text-center shadow-2xl overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Title */}
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider border border-rose-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>It's a Vibe Match!</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            You & {matchedProfile.name}
          </h2>
          <p className="text-xs text-slate-300">
            Both of you swiped right! {matchedProfile.compatibilityScore}% compatibility vibe.
          </p>
        </div>

        {/* Dual Avatars */}
        <div className="relative my-7 flex items-center justify-center">
          <div className="relative z-10 w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-rose-500 to-pink-500 shadow-xl">
            <img
              src={myAvatar}
              alt="You"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Overlapping Heart Icon */}
          <div className="absolute z-20 w-10 h-10 rounded-full bg-slate-900 border-2 border-rose-500 flex items-center justify-center shadow-lg text-rose-400 animate-bounce">
            <Heart className="w-5 h-5 fill-rose-500 stroke-none" />
          </div>

          <div className="relative z-10 -ml-4 w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-pink-500 to-amber-400 shadow-xl">
            <img
              src={matchedProfile.photos[0]}
              alt={matchedProfile.name}
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Safety Badge reminder */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/40 py-1 px-3 rounded-full border border-emerald-500/30 mb-5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Safety Score: {matchedProfile.safetyScore}/100 • End-to-End Encrypted Chat</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            id="match-send-msg-btn"
            onClick={() => onSendMessage(matchedProfile)}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 transition-transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send First Message</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="match-keep-swiping-btn"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
};
