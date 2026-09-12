import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Video,
  Camera,
  CheckCircle,
  AlertCircle,
  Instagram,
  Linkedin,
  Music,
  FileText,
  Lock,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Award,
  Play,
  Check,
  X,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { Profile } from '../types';

interface VerificationModalProps {
  userProfile: Profile;
  onClose: () => void;
  onUpdateVerification: (updatedProfile: Partial<Profile>) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  userProfile,
  onClose,
  onUpdateVerification,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'video' | 'govt' | 'social'>('overview');
  
  // Verification states
  const [hasVideoVerified, setHasVideoVerified] = useState(userProfile.isVerified && userProfile.safetyScore >= 90);
  const [hasGovtVerified, setHasGovtVerified] = useState(userProfile.isVerified);
  const [linkedSocials, setLinkedSocials] = useState<{
    instagram: boolean;
    linkedin: boolean;
    spotify: boolean;
  }>({
    instagram: true,
    linkedin: userProfile.gender === 'male',
    spotify: true,
  });

  // Video recording simulation & camera
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [recordingStep, setRecordingStep] = useState<'prompt' | 'recording' | 'review' | 'success'>('prompt');
  const [livePrompt, setLivePrompt] = useState<string>('Look straight at the camera and smile');

  // Govt ID simulation
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [govtProcessing, setGovtProcessing] = useState(false);

  // Social account inputs
  const [igHandle, setIgHandle] = useState(userProfile.name.toLowerCase().replace(/\s+/g, '_') + '_official');
  const [linkedinUrl, setLinkedinUrl] = useState('linkedin.com/in/' + userProfile.name.toLowerCase().replace(/\s+/g, '-'));

  // Calculate live Safety Score
  const calculateScore = () => {
    let score = 30; // base score
    if (hasGovtVerified) score += 35;
    if (hasVideoVerified) score += 20;
    if (linkedSocials.linkedin) score += 10;
    if (linkedSocials.instagram) score += 5;
    return Math.min(score, 100);
  };

  const currentScore = calculateScore();

  // Start Camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
          audio: false,
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } else {
        throw new Error('Camera API not accessible in this context');
      }
    } catch (err: any) {
      console.warn('Live camera fallback to interactive simulation:', err);
      setCameraError('Camera access unavailable. Using interactive biometric simulation.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  useEffect(() => {
    if (activeTab === 'video') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab]);

  // Start 4-second video recording
  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordProgress(0);
    setRecordingStep('recording');

    // Sequence of biometric gestures
    setLivePrompt('1/3: Look straight into the frame');
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2.5; // reaches 100 in 40 intervals = 4 seconds
      setRecordProgress(progress);

      if (progress === 30) {
        setLivePrompt('2/3: Turn your head gently to the left');
      } else if (progress === 65) {
        setLivePrompt('3/3: Now smile naturally at the camera');
      }

      if (progress >= 100) {
        clearInterval(interval);
        setIsRecording(false);
        setRecordingStep('review');
        setRecordedVideoUrl(userProfile.image);
      }
    }, 100);
  };

  const handleApproveVideo = () => {
    setHasVideoVerified(true);
    setRecordingStep('success');
    onUpdateVerification({
      isVerified: true,
      safetyScore: Math.max(userProfile.safetyScore, 96),
    });
    setTimeout(() => {
      setActiveTab('overview');
    }, 1800);
  };

  // Govt verification OTP
  const handleSendOtp = () => {
    if (aadhaarInput.replace(/\s+/g, '').length < 4) return;
    setGovtProcessing(true);
    setTimeout(() => {
      setGovtProcessing(false);
      setOtpSent(true);
    }, 800);
  };

  const handleVerifyOtp = () => {
    setGovtProcessing(true);
    setTimeout(() => {
      setGovtProcessing(false);
      setHasGovtVerified(true);
      onUpdateVerification({
        isVerified: true,
        safetyScore: Math.max(userProfile.safetyScore, 85),
      });
      setActiveTab('overview');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">HerVibe Trust & Safety Hub</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  Aadhaar + Video Shield
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Verified badges ensure 100% genuine humans, zero catfishing, and trusted matches
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 py-2.5 bg-slate-950 border-b border-slate-800 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Safety Scorecard
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-medium shrink-0 transition-all flex items-center gap-1.5 ${
              activeTab === 'video'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Live Video Verification
            {hasVideoVerified && <Check className="w-3 h-3 text-emerald-300 ml-1" />}
          </button>
          <button
            onClick={() => setActiveTab('govt')}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-medium shrink-0 transition-all flex items-center gap-1.5 ${
              activeTab === 'govt'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Govt ID (DigiLocker)
            {hasGovtVerified && <Check className="w-3 h-3 text-emerald-300 ml-1" />}
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-medium shrink-0 transition-all flex items-center gap-1.5 ${
              activeTab === 'social'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            Social Profiles
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Scorecard Hero */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-700"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-400"
                      strokeDasharray={`${currentScore}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-black text-white">{currentScore}</span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">/ 100 Safe</span>
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-sm font-bold text-white">Trust Rating:</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      {currentScore >= 90 ? 'HerVibe Verified Elite' : currentScore >= 70 ? 'High Trust Profile' : 'Needs Verification'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {userProfile.gender === 'male'
                      ? 'Male profiles with 90+ Trust score receive 4x more match replies from women and are featured in priority discovery feeds.'
                      : 'Verified women profiles have complete access to Duo Mode, Ghost Mode, and priority VIP events.'}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
                    {hasGovtVerified && (
                      <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Govt ID Verified
                      </span>
                    )}
                    {hasVideoVerified && (
                      <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Award className="w-3 h-3" /> Live Video Verified
                      </span>
                    )}
                    {linkedSocials.linkedin && (
                      <span className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                        <Linkedin className="w-3 h-3" /> LinkedIn Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Checklist */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verification Steps</h4>

                {/* Video Item */}
                <div
                  onClick={() => setActiveTab('video')}
                  className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500/60 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${hasVideoVerified ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">Live Video Selfie Verification</span>
                        <span className="text-[10px] text-amber-400 font-bold">+20 pts</span>
                      </div>
                      <p className="text-xs text-slate-400">Record a 3-second live selfie clip with randomized head-turn gesture</p>
                    </div>
                  </div>
                  {hasVideoVerified ? (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Completed
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-rose-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Start <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Govt ID Item */}
                <div
                  onClick={() => setActiveTab('govt')}
                  className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500/60 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${hasGovtVerified ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">Aadhaar / Passport DigiLocker</span>
                        <span className="text-[10px] text-blue-400 font-bold">+35 pts</span>
                      </div>
                      <p className="text-xs text-slate-400">Instant OTP verification confirming age 18+ and authentic identity</p>
                    </div>
                  </div>
                  {hasGovtVerified ? (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Completed
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-rose-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Verify <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Social Profiles */}
                <div
                  onClick={() => setActiveTab('social')}
                  className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500/60 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-700 text-slate-300 flex items-center justify-center">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">Social Media Links</span>
                        <span className="text-[10px] text-purple-400 font-bold">+15 pts</span>
                      </div>
                      <p className="text-xs text-slate-400">Link Instagram, LinkedIn, and Spotify to authenticate social footprint</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-white flex items-center gap-1">
                    Manage <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE VIDEO VERIFICATION */}
          {activeTab === 'video' && (
            <div className="space-y-4 text-center">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Live Liveness Video Check</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Our AI vision checks that you match your uploaded photos and prevents fake bots or deepfakes.
                </p>
              </div>

              {/* Video Camera Container */}
              <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-emerald-500 shadow-2xl bg-slate-950 flex items-center justify-center">
                {cameraStream ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover -scale-x-100"
                  />
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-slate-800">
                    <img
                      src={userProfile.image}
                      alt={userProfile.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center text-center p-3">
                      <Camera className="w-8 h-8 text-emerald-400 mb-1" />
                      <span className="text-xs font-medium text-slate-200">Interactive Simulation</span>
                    </div>
                  </div>
                )}

                {/* Animated Guide Ring when recording */}
                {isRecording && (
                  <div className="absolute inset-0 border-4 border-rose-500 rounded-full animate-pulse pointer-events-none" />
                )}

                {/* Live Gesture Prompt Overlay */}
                {isRecording && (
                  <div className="absolute bottom-4 inset-x-3 bg-black/80 backdrop-blur-md py-1.5 px-3 rounded-full text-[11px] font-bold text-amber-300 shadow-lg animate-bounce">
                    {livePrompt}
                  </div>
                )}
              </div>

              {/* Progress Bar during recording */}
              {isRecording && (
                <div className="w-64 mx-auto space-y-1">
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-rose-500 to-emerald-400 h-full transition-all duration-100"
                      style={{ width: `${recordProgress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">Verifying liveness & matching facial features...</span>
                </div>
              )}

              {/* Status / Actions */}
              {recordingStep === 'prompt' && (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 max-w-sm mx-auto text-left flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-300">
                      You will be asked to look at the screen, turn slightly left, and smile for 4 seconds.
                    </p>
                  </div>
                  <button
                    onClick={handleStartRecording}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
                  >
                    Start 4s Live Video Check
                  </button>
                </div>
              )}

              {recordingStep === 'review' && (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl max-w-sm mx-auto text-center space-y-1">
                    <span className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Biometric Match 99.4% Verified
                    </span>
                    <p className="text-[11px] text-slate-300">
                      Live face perfectly matches {userProfile.name}'s profile photos.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={handleStartRecording}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                    >
                      Retake Clip
                    </button>
                    <button
                      onClick={handleApproveVideo}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
                    >
                      Confirm & Award Badge (+20 pts)
                    </button>
                  </div>
                </div>
              )}

              {recordingStep === 'success' && (
                <div className="py-6 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-400">Video Verification Complete!</h4>
                  <p className="text-xs text-slate-300">Gold Video Shield badge has been added to your profile.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GOVT ID DIGILOCKER */}
          {activeTab === 'govt' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-blue-200">DigiLocker Govt ID Verification</h4>
                  <p className="text-xs text-slate-300">
                    We securely verify your legal age (18+) and photo identity using DigiLocker / Aadhaar OTP. Your full ID number is strictly encrypted and never shown to other users.
                  </p>
                </div>
              </div>

              {hasGovtVerified ? (
                <div className="p-6 rounded-3xl bg-slate-800/80 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-300">Govt ID Successfully Verified</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Aadhaar ending in •••• 4912 has been authenticated via DigiLocker. Blue tick displayed on profile.
                  </p>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold inline-block">
                    Verified on 12 Sep 2026
                  </span>
                </div>
              ) : (
                <div className="space-y-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Aadhaar / Passport / Voter ID Number
                    </label>
                    <input
                      type="text"
                      placeholder="XXXX - XXXX - 4912"
                      value={aadhaarInput}
                      onChange={(e) => setAadhaarInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">256-bit encrypted. Stored in compliance with IT Act 2000.</span>
                  </div>

                  {!otpSent ? (
                    <button
                      onClick={handleSendOtp}
                      disabled={govtProcessing}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      {govtProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Request DigiLocker OTP'}
                    </button>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Enter 6-digit OTP sent to Aadhaar-linked mobile
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="482910"
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl px-3.5 py-2 text-sm text-white tracking-widest text-center focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={handleVerifyOtp}
                        disabled={govtProcessing}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                      >
                        {govtProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Confirm & Validate Age 18+'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SOCIAL MEDIA ACCOUNTS */}
          {activeTab === 'social' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300">
                Linking real social accounts confirms your workplace, alumni network, and hobbies — giving matches complete confidence.
              </p>

              {/* Instagram */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Instagram Profile</span>
                    <span className="text-[11px] text-slate-400">@{igHandle}</span>
                  </div>
                </div>
                <button
                  onClick={() => setLinkedSocials((prev) => ({ ...prev, instagram: !prev.instagram }))}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    linkedSocials.instagram ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {linkedSocials.instagram ? 'Linked ✓' : 'Connect'}
                </button>
              </div>

              {/* LinkedIn */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white">LinkedIn Professional</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                        Crucial for Men
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">{linkedinUrl}</span>
                  </div>
                </div>
                <button
                  onClick={() => setLinkedSocials((prev) => ({ ...prev, linkedin: !prev.linkedin }))}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    linkedSocials.linkedin ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {linkedSocials.linkedin ? 'Linked ✓' : 'Connect'}
                </button>
              </div>

              {/* Spotify */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-black">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Spotify Music Anthem</span>
                    <span className="text-[11px] text-slate-400">Top Artists: Prateek Kuhad, Anuv Jain</span>
                  </div>
                </div>
                <button
                  onClick={() => setLinkedSocials((prev) => ({ ...prev, spotify: !prev.spotify }))}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    linkedSocials.spotify ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {linkedSocials.spotify ? 'Linked ✓' : 'Connect'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            Zero Data Sharing with Third Parties
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
