import React, { useState } from 'react';
import { 
  X, ShieldCheck, Heart, Star, MapPin, Briefcase, GraduationCap, 
  Sparkles, CheckCircle2, AlertTriangle, Ban, Flag, Volume2, Globe, 
  Activity, Coffee, Dog, Cigarette, Flame, Play, Pause, MessageCircle,
  HeartHandshake, Calendar, BookOpen, Utensils, Award, Check, Compass, MessageSquareHeart
} from 'lucide-react';
import { Profile } from '../types';

interface ProfileDetailsModalProps {
  profile: Profile | null;
  onClose: () => void;
  onLike: (profile: Profile) => void;
  onPass: (profile: Profile) => void;
  onSuperLike: (profile: Profile) => void;
  onReport: (profile: Profile, reason: string) => void;
  onBlock: (profile: Profile) => void;
}

export const ProfileDetailsModal: React.FC<ProfileDetailsModalProps> = ({
  profile,
  onClose,
  onLike,
  onPass,
  onSuperLike,
  onReport,
  onBlock,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('Inappropriate photos or content');
  const [reportedSuccess, setReportedSuccess] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  if (!profile) return null;

  const handleReportSubmit = () => {
    onReport(profile, reportReason);
    setReportedSuccess(true);
    setTimeout(() => {
      setShowReportDialog(false);
      setReportedSuccess(false);
      onClose();
    }, 1500);
  };

  const toggleVoice = () => {
    setIsPlayingVoice(!isPlayingVoice);
    if (!isPlayingVoice) {
      setTimeout(() => setIsPlayingVoice(false), 5000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-950 border border-white/10 rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white my-auto max-h-[94vh] flex flex-col">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-60 h-60 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Sticky Header with Close */}
        <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-2">
          <button
            onClick={() => setShowReportDialog(true)}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-amber-400 backdrop-blur-md border border-white/10 transition-colors shadow-lg"
            title="Report Profile"
          >
            <Flag className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white backdrop-blur-md border border-white/10 transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Profile Content */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-800/80 scrollbar-none z-10">
          {/* Main Photo Gallery Hero */}
          <div className="relative h-[380px] w-full bg-slate-950">
            <img
              src={profile.photos[selectedPhoto]}
              alt={profile.name}
              className="w-full h-full object-cover object-top transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            {/* Compatibility & Safety badges overlaid */}
            <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-20">
              <span className="px-3 py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 shadow-lg shadow-rose-600/40">
                <Flame className="w-3.5 h-3.5 fill-white" />
                {profile.compatibilityScore}% Vibe Match
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 shadow-lg shadow-emerald-600/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                {profile.safetyScore}% Safe
              </span>
            </div>

            {/* Thumbnail selector */}
            <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              {profile.photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhoto(idx)}
                  className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedPhoto === idx ? 'border-rose-500 scale-105 ring-2 ring-rose-500/50 shadow-lg' : 'border-white/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Core Info & Badges */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{profile.name}</h1>
                  <span className="text-2xl font-light text-slate-400">{profile.age}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    {profile.city} • {profile.distanceKm} km away
                  </span>
                  {profile.height && (
                    <span className="text-slate-400">📏 {profile.height}</span>
                  )}
                </div>
              </div>

              {/* Verified Pill */}
              {profile.verified && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{profile.verificationBadge || 'ID Verified'}</span>
                </div>
              )}
            </div>

            {/* Voice Bio Player if present */}
            {profile.voiceBioSeconds && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/60 via-purple-950/40 to-slate-900 border border-rose-500/30 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleVoice}
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-600/40 active:scale-95 transition-transform"
                  >
                    {isPlayingVoice ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div>
                    <span className="text-xs font-bold text-rose-200 block">
                      {profile.voiceBioTitle || "Voice Bio"}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Listen to {profile.name}'s voice • {profile.voiceBioSeconds}s
                    </span>
                  </div>
                </div>

                {isPlayingVoice ? (
                  <div className="flex items-center gap-1 h-5 px-2">
                    <span className="w-1 bg-rose-400 rounded-full animate-soundwave-1" />
                    <span className="w-1 bg-pink-400 rounded-full animate-soundwave-2" />
                    <span className="w-1 bg-rose-400 rounded-full animate-soundwave-3" />
                    <span className="w-1 bg-purple-400 rounded-full animate-soundwave-4" />
                    <span className="w-1 bg-rose-400 rounded-full animate-soundwave-5" />
                  </div>
                ) : (
                  <span className="text-xs text-rose-400/80 font-mono px-2">▶ Play</span>
                )}
              </div>
            )}

            {/* Relationship Intent & Heart Goals */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/40 via-pink-950/20 to-slate-900 border border-rose-500/30 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-rose-400" />
                  Relationship Intent & Looking For
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30 font-medium">
                  Verified Intent
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/20">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  {profile.relationshipIntent || 'Seeking Meaningful Connection'}
                </div>
                {profile.relationshipDescription && (
                  <p className="mt-2 text-xs text-rose-100/90 leading-relaxed italic">
                    "{profile.relationshipDescription}"
                  </p>
                )}
              </div>

              {(profile.loveLanguage || profile.communicationStyle) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {profile.loveLanguage && (
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
                      <span className="text-rose-400 font-semibold block mb-0.5">❤️ Love Language</span>
                      <span className="text-slate-200">{profile.loveLanguage}</span>
                    </div>
                  )}
                  {profile.communicationStyle && (
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
                      <span className="text-rose-400 font-semibold block mb-0.5">💬 Communication</span>
                      <span className="text-slate-200">{profile.communicationStyle}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Academic Qualification & Alma Mater */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/30 to-slate-900 border border-indigo-500/20 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                Education & Academic Qualification
              </span>

              {profile.qualification ? (
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-white text-sm sm:text-base">
                        {profile.qualification.degree}
                      </div>
                      <div className="text-indigo-200 text-xs font-medium">
                        {profile.qualification.field}
                      </div>
                    </div>
                    {profile.qualification.honors && (
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-[10px] font-semibold shrink-0">
                        {profile.qualification.honors}
                      </span>
                    )}
                  </div>
                  <div className="text-slate-300 text-xs flex items-center gap-1.5 pt-1 border-t border-indigo-500/10">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{profile.qualification.college}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-slate-200 font-medium">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>{profile.education || 'Graduate'}</span>
                </div>
              )}
            </div>

            {/* Birth Date, Astrology & Vital Stats */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                Birth Date & Astrological Profile
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {profile.birthDate && (
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                    <span className="text-slate-400 block text-[11px] mb-0.5">Birthday</span>
                    <span className="font-bold text-amber-200">{profile.birthDate}</span>
                  </div>
                )}
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Zodiac Sign</span>
                  <span className="font-bold text-amber-200">{profile.zodiacSign || 'Leo'}</span>
                </div>
                {profile.dietaryPreference && (
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                    <span className="text-slate-400 block text-[11px] mb-0.5">Dietary</span>
                    <span className="font-bold text-emerald-300">{profile.dietaryPreference}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Hobbies & Passions with Categories */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs uppercase font-bold tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  Hobbies & Free Time Passions
                </h3>
                <span className="text-[10px] text-slate-400">What makes them happy</span>
              </div>

              {profile.hobbies && profile.hobbies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {profile.hobbies.map((h, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-rose-500/20 hover:border-rose-400/40 transition-all flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{h.icon}</span>
                        <span className="text-xs font-semibold text-white">{h.name}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-rose-300 font-medium border border-white/5 shrink-0">
                        {h.category}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-rose-200"
                    >
                      #{interest}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Ideal First Date & Chemistry */}
            {profile.idealFirstDate && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-purple-400" />
                  Ideal First Date Vision
                </span>
                <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                  "{profile.idealFirstDate}"
                </p>
              </div>
            )}

            {/* Green Flags & Deal Breakers */}
            {(profile.greenFlags || profile.dealBreakers) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.greenFlags && (
                  <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Green Flags
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {profile.greenFlags.map((flag, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {profile.dealBreakers && (
                  <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
                    <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Deal Breakers
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {profile.dealBreakers.map((breaker, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          <span>{breaker}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Safety Score Card (Top-class Safety highlight) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      Safety Score: {profile.safetyScore}/100
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase">HerVibe Verified</span>
                    </div>
                    <div className="text-xs text-slate-400">Identity checks passed & zero harassment flags</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Aadhaar / Govt ID verified
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Live selfie match
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Verified phone OTP
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> HerVibe pledge signed
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-rose-400 mb-1.5">About Me</h3>
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line bg-slate-900/60 p-3.5 rounded-2xl border border-white/5">
                {profile.bio}
              </p>
            </div>

            {/* Prompts Section */}
            {profile.prompts.map((prompt, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950 border border-slate-800/80 space-y-2 shadow-inner">
                <p className="text-xs font-bold text-rose-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  {prompt.question}
                </p>
                <p className="text-sm text-slate-100 font-medium leading-relaxed italic">
                  "{prompt.answer}"
                </p>
              </div>
            ))}

            {/* Interests & Passions */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Interests & Vibe</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-rose-200 hover:border-rose-500/40 transition-colors"
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Lifestyle & Languages */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Lifestyle & Basics</h3>
              <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">Languages</span>
                  <span className="font-semibold text-slate-200">{profile.languages.join(', ')}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">Workout</span>
                  <span className="font-semibold text-slate-200">{profile.lifestyle.workout}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">Drinking / Smoking</span>
                  <span className="font-semibold text-slate-200">{profile.lifestyle.drinking} • {profile.lifestyle.smoking}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">Pets</span>
                  <span className="font-semibold text-slate-200">{profile.lifestyle.pets}</span>
                </div>
              </div>
            </div>

            {/* Report & Block actions */}
            <div className="pt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
              <button
                onClick={() => setShowReportDialog(true)}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Report {profile.name}
              </button>
              <button
                onClick={() => onBlock(profile)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <Ban className="w-3.5 h-3.5" />
                Block Profile
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-3.5 bg-slate-950/95 border-t border-slate-800/80 flex items-center justify-center gap-3 backdrop-blur-xl z-20">
          <button
            onClick={() => onPass(profile)}
            className="w-12 h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center border border-slate-700 shadow-md transition-transform active:scale-95"
            title="Pass"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
          <button
            onClick={() => onSuperLike(profile)}
            className="w-12 h-12 rounded-2xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-400 flex items-center justify-center border border-blue-500/40 shadow-lg shadow-blue-500/20 transition-transform active:scale-95"
            title="Super Like"
          >
            <Star className="w-5 h-5 fill-blue-400" />
          </button>
          <button
            onClick={() => onLike(profile)}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-transform active:scale-95"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>Connect & Like</span>
          </button>
        </div>

        {/* Report Dialog Modal Overlay */}
        {showReportDialog && (
          <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-xl p-6 flex flex-col justify-center animate-fadeIn">
            {reportedSuccess ? (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">Report Submitted</h3>
                <p className="text-xs text-slate-400">
                  Our 24x7 safety team will review {profile.name}'s profile within 1 hour. Thank you for keeping HerVibe safe.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Flag className="w-5 h-5 text-rose-400" />
                    Report Profile
                  </h3>
                  <button onClick={() => setShowReportDialog(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-slate-300">
                  Select a reason for reporting <span className="font-semibold text-white">{profile.name}</span>:
                </p>

                <div className="space-y-2">
                  {[
                    'Fake profile or impersonation',
                    'Inappropriate photos or bio content',
                    'Harassment or disrespectful communication',
                    'Commercial advertising or spam',
                    'Underage user (under 18)'
                  ].map((reason, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                        reportReason === reason
                          ? 'bg-rose-950/40 border-rose-500/60 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reportReason"
                        checked={reportReason === reason}
                        onChange={() => setReportReason(reason)}
                        className="accent-rose-500"
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setShowReportDialog(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReportSubmit}
                    className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-lg shadow-rose-600/30"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

