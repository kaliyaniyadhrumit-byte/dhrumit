import React, { useState } from 'react';
import { 
  Heart, X, Star, RotateCcw, ShieldCheck, MapPin, Briefcase, 
  Volume2, VolumeX, Sparkles, ChevronLeft, 
  ChevronRight, Info, Flame, CheckCircle2, Zap, Send, MessageCircle,
  GraduationCap, Calendar, HeartHandshake, Compass
} from 'lucide-react';
import { Profile, Gender } from '../types';

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: 'like' | 'pass' | 'superlike') => void;
  onRewind: () => void;
  canRewind: boolean;
  onOpenDetails: (profile: Profile) => void;
  currentUserGender: Gender;
  swipesLeft: number;
  swipeHistoryCount: number;
  onSendSpark?: (profile: Profile, compliment: string) => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
  onSwipe,
  onRewind,
  canRewind,
  onOpenDetails,
  currentUserGender,
  swipesLeft,
  swipeHistoryCount,
  onSendSpark,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(0);
  const [hoverStamp, setHoverStamp] = useState<'like' | 'pass' | 'superlike' | null>(null);
  const [showSparkMenu, setShowSparkMenu] = useState(false);
  const [customSparkText, setCustomSparkText] = useState('');

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex < profile.photos.length - 1) {
      setPhotoIndex(photoIndex + 1);
    } else {
      setPhotoIndex(0);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex > 0) {
      setPhotoIndex(photoIndex - 1);
    } else {
      setPhotoIndex(profile.photos.length - 1);
    }
  };

  const toggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingVoice) {
      setIsPlayingVoice(false);
      setVoiceProgress(0);
    } else {
      setIsPlayingVoice(true);
      let p = 0;
      const interval = setInterval(() => {
        p += 4;
        if (p > 100) {
          clearInterval(interval);
          setIsPlayingVoice(false);
          setVoiceProgress(0);
        } else {
          setVoiceProgress(p);
        }
      }, 150);
    }
  };

  const handleSparkSend = (text: string) => {
    if (onSendSpark) {
      onSendSpark(profile, text);
    } else {
      onSwipe('like');
    }
    setShowSparkMenu(false);
    setCustomSparkText('');
  };

  // Fun zodiac inference for added flirt aesthetic
  const zodiacMap = ['♌ Leo', '♍ Virgo', '♎ Libra', '♏ Scorpio', '♐ Sagittarius', '♑ Capricorn', '♒ Aquarius', '♓ Pisces', '♈ Aries', '♉ Taurus'];
  const profileZodiac = zodiacMap[profile.name.length % zodiacMap.length];

  return (
    <div className="relative w-full max-w-md mx-auto h-[640px] flex flex-col select-none">
      {/* Background Sensual Ambient Aura */}
      <div className="absolute -inset-2 bg-gradient-to-r from-rose-600/20 via-pink-600/15 to-purple-600/20 rounded-[38px] blur-xl opacity-75 pointer-events-none" />

      {/* Ratio & Mode Status Bar */}
      <div className="mb-2 flex items-center justify-between px-2 text-xs relative z-10">
        <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-rose-500/20 shadow-md">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-slate-200 font-medium tracking-tight">
            {currentUserGender === 'man' ? 'Duo Ratio Deck (10 Swipes : 2-3 Girls)' : 'VIP Curated Discovery Deck'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 font-medium">
          <span>Card #{swipeHistoryCount + 1}</span>
        </div>
      </div>

      {/* Main Dating Card */}
      <div 
        onClick={() => onOpenDetails(profile)}
        className="relative flex-1 w-full rounded-[32px] overflow-hidden bg-slate-950 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer group transition-all duration-300 hover:border-rose-500/40"
      >
        {/* Profile Image with Dynamic Lighting */}
        <img
          src={profile.photos[photoIndex]}
          alt={profile.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          referrerPolicy="no-referrer"
        />

        {/* Top Vignette Gradient */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Bottom Rich Contrast Vignette */}
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-slate-950/90 to-transparent pointer-events-none" />

        {/* Interactive Swipe Stamps (Hot visual stamps) */}
        {hoverStamp === 'like' && (
          <div className="absolute top-16 right-6 z-30 pointer-events-none animate-stamp-like border-4 border-emerald-400/90 bg-emerald-950/60 backdrop-blur-sm text-emerald-300 font-black text-2xl tracking-widest px-4 py-1.5 rounded-2xl shadow-[0_0_25px_rgba(52,211,153,0.5)] flex items-center gap-1.5">
            <Flame className="w-6 h-6 text-emerald-400 fill-emerald-400" />
            <span>VIBE LIKE</span>
          </div>
        )}

        {hoverStamp === 'pass' && (
          <div className="absolute top-16 left-6 z-30 pointer-events-none animate-stamp-pass border-4 border-rose-500/90 bg-rose-950/60 backdrop-blur-sm text-rose-400 font-black text-2xl tracking-widest px-4 py-1.5 rounded-2xl shadow-[0_0_25px_rgba(244,63,94,0.5)] flex items-center gap-1.5">
            <X className="w-6 h-6 stroke-[3]" />
            <span>PASS</span>
          </div>
        )}

        {hoverStamp === 'superlike' && (
          <div className="absolute top-16 inset-x-0 mx-auto w-fit z-30 pointer-events-none animate-stamp-like border-4 border-cyan-400/90 bg-cyan-950/70 backdrop-blur-sm text-cyan-200 font-black text-2xl tracking-widest px-5 py-1.5 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center gap-2">
            <Star className="w-6 h-6 text-cyan-300 fill-cyan-300 animate-spin" style={{ animationDuration: '3s' }} />
            <span>SUPER LIKE</span>
          </div>
        )}

        {/* Instagram/Tinder Story Bar Progress */}
        <div className="absolute top-3 inset-x-3.5 flex gap-1.5 z-20">
          {profile.photos.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                idx === photoIndex 
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]' 
                  : 'bg-white/30 backdrop-blur-sm'
              }`}
            />
          ))}
        </div>

        {/* Top Badges: Trust Shield & Hot Chemistry */}
        <div className="absolute top-7 inset-x-3.5 flex items-center justify-between z-20 pointer-events-auto">
          {/* Trust Rating */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(profile);
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/50 text-white shadow-lg shadow-emerald-500/10 hover:border-emerald-400 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-300">{profile.safetyScore}% Safe</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span className="text-[10px] text-slate-300 font-medium">Verified</span>
          </div>

          {/* AI Match Chemistry */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 backdrop-blur-md border border-rose-500/50 text-white shadow-lg shadow-rose-500/20">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span className="text-xs font-black tracking-tight text-rose-200">{profile.compatibilityScore}% Vibe</span>
          </div>
        </div>

        {/* Left / Right Tap zones for photos */}
        <div 
          onClick={prevPhoto}
          className="absolute inset-y-16 left-0 w-1/3 z-10 flex items-center pl-2 opacity-0 group-hover:opacity-75 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
            <ChevronLeft className="w-5 h-5" />
          </div>
        </div>
        <div 
          onClick={nextPhoto}
          className="absolute inset-y-16 right-0 w-1/3 z-10 flex items-center justify-end pr-2 opacity-0 group-hover:opacity-75 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>

        {/* Bottom Profile Details Container */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-20 pointer-events-auto">
          {/* Relationship Intent Highlight Banner */}
          {profile.relationshipIntent && (
            <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-600/40 via-pink-600/40 to-purple-600/40 border border-rose-400/60 text-rose-100 text-[11px] sm:text-xs font-bold backdrop-blur-md shadow-md shadow-rose-900/30 animate-pulse">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-300" />
              <span>{profile.relationshipIntent}</span>
            </div>
          )}

          {/* Status, Birth Date & Verification Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
            {profile.verified && (
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/50 text-sky-300 text-[11px] font-bold backdrop-blur-md shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>{profile.verificationBadge || 'Aadhaar Verified'}</span>
              </div>
            )}
            {profile.birthDate && (
              <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-[10px] font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-rose-400" />
                <span>{profile.birthDate}</span>
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-[10px] font-semibold">
              {profile.zodiacSign || profileZodiac}
            </span>
            {profile.dietaryPreference && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-[10px] font-medium">
                {profile.dietaryPreference}
              </span>
            )}
            {profile.height && (
              <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-[10px] font-semibold">
                📏 {profile.height}
              </span>
            )}
          </div>

          {/* Name & Age with Luxury Styling */}
          <div className="flex items-baseline gap-2.5 text-white">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
              {profile.name}
            </h2>
            <span className="text-2xl sm:text-3xl font-light text-rose-200 drop-shadow-md">
              {profile.age}
            </span>
          </div>

          {/* Profession, Education & Location */}
          <div className="space-y-1 mt-1 text-xs sm:text-sm text-slate-200">
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3">
              <div className="flex items-center gap-1.5 font-medium">
                <Briefcase className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="line-clamp-1">{profile.profession}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>{profile.city} • {profile.distanceKm} km away</span>
              </div>
            </div>

            {/* Qualification & College */}
            {(profile.qualification || profile.education) && (
              <div className="flex items-center gap-1.5 text-xs text-rose-200/90 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="line-clamp-1">
                  {profile.qualification 
                    ? `${profile.qualification.degree} • ${profile.qualification.college.split(',')[0]}` 
                    : profile.education}
                </span>
              </div>
            )}
          </div>

          {/* Voice Bio with Live Equalizer Waveform */}
          {profile.voiceBioSeconds && (
            <div 
              onClick={toggleVoice}
              className="mt-2.5 p-2.5 rounded-2xl bg-slate-900/80 border border-rose-500/40 backdrop-blur-xl shadow-lg transition-all hover:border-rose-400 group/voice flex items-center gap-3"
            >
              <button 
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all shadow-md ${
                  isPlayingVoice 
                    ? 'bg-gradient-to-tr from-rose-600 to-pink-500 scale-105 shadow-rose-500/50' 
                    : 'bg-slate-800 group-hover/voice:bg-rose-600'
                }`}
              >
                {isPlayingVoice ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <div className="flex-1">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-white font-semibold flex items-center gap-1 line-clamp-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                    {profile.voiceBioTitle || 'Listen to my audio vibe'}
                  </span>
                  <span className="text-rose-300 font-mono text-[10px] font-bold">{profile.voiceBioSeconds}s</span>
                </div>

                {/* Animated Equalizer Wave Bars */}
                {isPlayingVoice ? (
                  <div className="flex items-center gap-1 h-5 py-0.5">
                    <span className="w-1 bg-rose-400 rounded-full animate-soundwave-1" />
                    <span className="w-1 bg-pink-400 rounded-full animate-soundwave-2" />
                    <span className="w-1 bg-rose-300 rounded-full animate-soundwave-3" />
                    <span className="w-1 bg-amber-300 rounded-full animate-soundwave-4" />
                    <span className="w-1 bg-rose-500 rounded-full animate-soundwave-5" />
                    <span className="w-1 bg-pink-400 rounded-full animate-soundwave-2" />
                    <span className="w-1 bg-rose-400 rounded-full animate-soundwave-1" />
                    <span className="w-1 bg-amber-400 rounded-full animate-soundwave-3" />
                    <span className="w-1 bg-rose-300 rounded-full animate-soundwave-5" />
                  </div>
                ) : (
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500/40 w-1/3 rounded-full" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Bio snippet */}
          <p className="mt-2 text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
            {profile.bio}
          </p>

          {/* Hobbies & Passion Chips with Emojis */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {profile.hobbies && profile.hobbies.length > 0 ? (
              profile.hobbies.slice(0, 3).map((h, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-md border border-rose-400/30 text-rose-100 text-[11px] font-medium shadow-sm flex items-center gap-1"
                >
                  <span>{h.icon}</span>
                  <span>{h.name}</span>
                </span>
              ))
            ) : (
              profile.interests.slice(0, 3).map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-sm"
                >
                  {interest}
                </span>
              ))
            )}
            {(profile.hobbies ? profile.hobbies.length > 3 : profile.interests.length > 3) && (
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-rose-300 text-[11px] font-medium">
                +{profile.hobbies ? profile.hobbies.length - 3 : profile.interests.length - 3} more
              </span>
            )}
          </div>

          {/* Bottom Tap Info Indicator */}
          <div className="mt-3 flex items-center justify-between text-xs text-rose-300 font-semibold">
            <span className="hover:underline flex items-center gap-1 text-rose-300">
              Tap card for deep profile, hobbies & prompts <Info className="w-3.5 h-3.5" />
            </span>
            <span className="text-slate-400 font-normal">
              {currentUserGender === 'man' ? 'Duo Match' : 'Women First'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Spark / Flirt Icebreaker Popover Tray */}
      {showSparkMenu && (
        <div className="absolute bottom-20 inset-x-2 z-40 bg-slate-900/95 backdrop-blur-2xl p-4 rounded-3xl border border-rose-500/40 shadow-2xl space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Send Direct Spark to {profile.name.split(' ')[0]}</span>
            </div>
            <button 
              onClick={() => setShowSparkMenu(false)}
              className="text-slate-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {[
              `That smile is contagious ✨`,
              `Artisanal coffee on me? ☕`,
              `Loved your bio prompt! 😊`,
              `Sabarmati riverfront stroll? 🌊`
            ].map((spark, idx) => (
              <button
                key={idx}
                onClick={() => handleSparkSend(spark)}
                className="p-2 text-left rounded-xl bg-slate-800/80 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/50 text-[11px] text-slate-200 hover:text-white transition-all"
              >
                {spark}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Or write a custom sweet note..."
              value={customSparkText}
              onChange={(e) => setCustomSparkText(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
            />
            <button
              onClick={() => customSparkText.trim() && handleSparkSend(customSparkText)}
              disabled={!customSparkText.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Modern Sculpted Action Controls Bar */}
      <div className="mt-3.5 flex items-center justify-center gap-2.5 sm:gap-3.5 px-2 relative z-20">
        {/* Rewind */}
        <button
          id="swipe-rewind-btn"
          onClick={onRewind}
          disabled={!canRewind}
          className="w-12 h-12 rounded-full bg-slate-900/90 hover:bg-slate-800 disabled:opacity-30 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-[0_4px_15px_rgba(245,158,11,0.15)] transition-all active:scale-95"
          title="Rewind / Undo Last Swipe"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Pass (Nope) with hover stamp */}
        <button
          id="swipe-pass-btn"
          onMouseEnter={() => setHoverStamp('pass')}
          onMouseLeave={() => setHoverStamp(null)}
          onClick={() => onSwipe('pass')}
          className="w-14 h-14 rounded-full bg-slate-900/90 hover:bg-rose-950/50 text-slate-300 hover:text-rose-400 flex items-center justify-center border border-slate-700/80 hover:border-rose-500/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all active:scale-90"
          title="Pass / Swipe Left"
        >
          <X className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Super Like with hover stamp */}
        <button
          id="swipe-superlike-btn"
          onMouseEnter={() => setHoverStamp('superlike')}
          onMouseLeave={() => setHoverStamp(null)}
          onClick={() => onSwipe('superlike')}
          className="w-12 h-12 rounded-full bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 flex items-center justify-center border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all active:scale-95"
          title="Super Like"
        >
          <Star className="w-5 h-5 fill-cyan-400/30" />
        </button>

        {/* Vibe / Like with hover stamp & vibrant pulse */}
        <button
          id="swipe-like-btn"
          onMouseEnter={() => setHoverStamp('like')}
          onMouseLeave={() => setHoverStamp(null)}
          onClick={() => onSwipe('like')}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 hover:from-rose-500 hover:to-amber-300 text-white flex items-center justify-center shadow-[0_0_25px_rgba(244,63,94,0.5)] transition-all active:scale-90"
          title="Like / Swipe Right"
        >
          <Heart className="w-7 h-7 fill-white stroke-none" />
        </button>

        {/* Instant Spark Flirt Trigger */}
        <button
          id="swipe-spark-btn"
          onClick={() => setShowSparkMenu(!showSparkMenu)}
          className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-md transition-all active:scale-95 ${
            showSparkMenu
              ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
              : 'bg-slate-900/90 hover:bg-purple-950/50 text-purple-400 border-purple-500/30 shadow-[0_4px_15px_rgba(168,85,247,0.15)]'
          }`}
          title="Send Instant Spark / Flirt Compliment"
        >
          <Zap className="w-5 h-5 fill-purple-400/30" />
        </button>
      </div>
    </div>
  );
};

