import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart,
  MessageCircle,
  Shield,
  Crown,
  User,
  Sparkles,
  MapPin,
  Calendar,
  AlertTriangle,
  Radio,
  LogIn,
  LogOut,
  CheckCircle2,
  Zap,
  Coffee,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  EyeOff,
  Info
} from 'lucide-react';
import { onAuthStateChanged, signInWithPopup, signOut, type User as FirebaseUser } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import {
  syncUserProfile,
  getUserProfile,
  recordSwipe,
  saveMatch,
  saveSafeDatePlan,
  fetchUserSafeDates,
  FirestoreSafeDate,
} from './services/firestoreService';

import { Profile, Gender, Match, GirlsPremiumState } from './types';
import { mockGirls, mockBoys } from './data/mockProfiles';
import { safeDateSpots, girlsVipEvents } from './data/datingData';

// Component Modals
import { Header } from './components/Header';
import { SwipeCard } from './components/SwipeCard';
import { ProfileDetailsModal } from './components/ProfileDetailsModal';
import { MatchCelebrationModal } from './components/MatchCelebrationModal';
import { ChatView } from './components/ChatView';
import { VerificationModal } from './components/VerificationModal';
import { GirlsPremiumModal } from './components/GirlsPremiumModal';
import { SafetyHubModal } from './components/SafetyHubModal';
import { VoiceWingmanModal } from './components/VoiceWingmanModal';

export default function App() {
  // 1. Auth & Firebase User state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // 2. Active Mode & Gender Selection
  const [activeGender, setActiveGender] = useState<Gender>('woman');
  const [activeTab, setActiveTab] = useState<'explore' | 'matches' | 'safespots' | 'profile'>('explore');

  // 3. Current User Profile data
  const [userProfile, setUserProfile] = useState<Profile>(() => {
    // Default girl profile
    return {
      id: 'usr_priya_default',
      name: 'Priya Patel',
      age: 23,
      gender: 'woman',
      city: 'Ahmedabad',
      distanceKm: 0,
      profession: 'Product Designer',
      education: 'NID Ahmedabad',
      qualification: {
        degree: 'Master of Design (M.Des)',
        field: 'Interaction & UX Architecture',
        college: 'National Institute of Design (NID), Ahmedabad',
        honors: 'Presidential Distinction'
      },
      relationshipIntent: '💍 Long-term Relationship & Meaningful Connection',
      relationshipDescription: 'Looking for someone warm, grounded, and emotionally available who loves great conversations and weekend exploration.',
      birthDate: '14 August 2001',
      zodiacSign: '♌ Leo (Fiery, Loyal & Warm-Hearted)',
      dietaryPreference: '🌱 Pure Vegetarian',
      loveLanguage: 'Quality Time & Late Evening Chats',
      communicationStyle: 'Direct texter, loves evening phone calls and shared playlists',
      idealFirstDate: 'Artisanal coffee and a scenic sunset stroll by the Sabarmati Riverfront',
      greenFlags: ['Treats service staff well', 'Has passion projects', 'Values open communication'],
      dealBreakers: ['Ghosting', 'Arrogance', 'Smoking around non-smokers'],
      hobbies: [
        { name: 'Specialty Coffee Brewing', icon: '☕', category: 'Culinary' },
        { name: 'Riverfront Sunset Cycling', icon: '🚲', category: 'Fitness' },
        { name: 'Raas-Garba & Folk Rhythm', icon: '💃', category: 'Cultural Dance' },
        { name: 'Analog Film Photography', icon: '📸', category: 'Visual Arts' },
        { name: 'Indie Vinyl & Gujarati Acoustic', icon: '🎶', category: 'Music' }
      ],
      bio: 'Lover of artisanal filter coffee, indie films, and evening strolls by the Sabarmati. Believer in kindness & genuine vibes.',
      photos: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      ],
      interests: ['Design', 'Specialty Coffee', 'Riverfront Walks', 'Music', 'Travel'],
      prompts: [
        {
          question: 'My ideal first date in Ahmedabad',
          answer: 'Meeting at The Project Cafe for iced lattes, talking design, and walking along the riverfront.',
        },
      ],
      verified: true,
      isVerified: true,
      videoVerified: true,
      govtVerified: true,
      verificationBadge: 'Aadhaar Verified',
      safetyScore: 98,
      compatibilityScore: 95,
      languages: ['Gujarati', 'Hindi', 'English'],
      lifestyle: {
        smoking: 'Never',
        drinking: 'Socially',
        workout: 'Yoga 4x/week',
        pets: 'Dog lover',
      },
    };
  });

  // 4. Girls-Only Premium Subscription State
  const [premiumState, setPremiumState] = useState<GirlsPremiumState>({
    isSubscribed: false,
    plan: 'monthly',
    seeWhoLikedYou: false,
    incognitoMode: false,
    unlimitedSuperLikes: false,
    dailyBoosts: false,
    vipLoungeAccess: false,
    safeDatePlanner: true,
    advancedSafetyScore: true,
    emergencySos: true,
    videoCalls: false,
  });

  // 5. Swipe Limits & History
  const [swipesLeft, setSwipesLeft] = useState<number>(12);
  const [swipeHistory, setSwipeHistory] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 6. Matches & Active Chat
  const [matches, setMatches] = useState<Match[]>([
    {
      id: 'match_1',
      profile: mockBoys[0],
      matchedAt: 'Just now',
      lastMessage: 'Hey Priya! Loved your bio about filter coffee in Ahmedabad ☕',
      lastMessageTime: '10:42 AM',
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: 'match_2',
      profile: mockBoys[1],
      matchedAt: 'Yesterday',
      lastMessage: 'Would love to check out that new cafe in Bodakdev with you!',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isOnline: false,
    },
  ]);
  const [activeMatchForChat, setActiveMatchForChat] = useState<Match | null>(null);

  // 7. Modals state
  const [detailedProfile, setDetailedProfile] = useState<Profile | null>(null);
  const [justMatchedProfile, setJustMatchedProfile] = useState<Profile | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);
  const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);
  const [showSafetyModal, setShowSafetyModal] = useState<boolean>(false);
  const [showVoiceCoachModal, setShowVoiceCoachModal] = useState<boolean>(false);

  // 8. Saved Safe Dates from Firestore
  const [savedSafeDates, setSavedSafeDates] = useState<FirestoreSafeDate[]>([]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        try {
          const profileDoc = await getUserProfile(user.uid);
          if (profileDoc) {
            setUserProfile((prev) => ({
              ...prev,
              id: user.uid,
              name: profileDoc.name || user.displayName || prev.name,
              gender: profileDoc.gender || prev.gender,
              safetyScore: profileDoc.safetyScore || prev.safetyScore,
              isVerified: profileDoc.isVerified ?? prev.isVerified,
              verified: profileDoc.isVerified ?? prev.verified,
              videoVerified: profileDoc.videoVerified ?? prev.videoVerified,
              govtVerified: profileDoc.govtVerified ?? prev.govtVerified,
            }));
            if (profileDoc.isGirlsPremium) {
              setPremiumState((p) => ({ ...p, isSubscribed: true }));
            }
          } else {
            // Seed initial profile in Firestore
            await syncUserProfile({
              id: user.uid,
              name: user.displayName || userProfile.name,
              email: user.email || '',
              photoURL: user.photoURL || userProfile.photos[0],
              gender: activeGender,
              age: 24,
              city: 'Ahmedabad',
              safetyScore: 98,
              isVerified: true,
              isGirlsPremium: false,
            });
          }

          // Fetch safe dates
          const dates = await fetchUserSafeDates(user.uid);
          if (dates) setSavedSafeDates(dates);
        } catch (err) {
          console.error('Error loading user data from Firestore:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Google Login
  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        await syncUserProfile({
          id: res.user.uid,
          name: res.user.displayName || 'HerVibe User',
          email: res.user.email || '',
          photoURL: res.user.photoURL || '',
          gender: activeGender,
          age: 24,
          city: 'Ahmedabad',
          safetyScore: 96,
          isVerified: true,
          isGirlsPremium: false,
        });
      }
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      alert('Could not complete Google Sign In: ' + (err?.message || 'Please try again.'));
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign Out error:', err);
    }
  };

  // Switch role between Woman and Man
  const handleSwitchGender = (newGender: Gender) => {
    setActiveGender(newGender);
    setCurrentIndex(0);
    setSwipeHistory([]);

    if (newGender === 'man') {
      setUserProfile((prev) => ({
        ...prev,
        id: currentUser?.uid || 'usr_aarav_default',
        name: currentUser?.displayName || 'Aarav Mehta',
        gender: 'man',
        profession: 'Tech Founder & Acoustic Guitarist',
        photos: [
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
        ],
        safetyScore: 97,
        verified: true,
        isVerified: true,
        verificationBadge: 'Aadhaar Verified',
      }));
    } else {
      setUserProfile((prev) => ({
        ...prev,
        id: currentUser?.uid || 'usr_priya_default',
        name: currentUser?.displayName || 'Priya Patel',
        gender: 'woman',
        profession: 'Product Designer',
        photos: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
        ],
        safetyScore: 98,
        verified: true,
        isVerified: true,
        verificationBadge: 'Aadhaar Verified',
      }));
    }
  };

  // Deck generation with the balanced ratio engine:
  // "in normal duo mode (boy view), 10 swipes has 2 to 3 girls"
  // "in girl view, curated high safety boys"
  const currentDeck = useMemo(() => {
    if (activeGender === 'woman') {
      // Girls see verified men with high safety scores
      return mockBoys;
    } else {
      // In Boy View: Balanced queue (2-3 girls per 10 cards)
      // We interleave girls into the queue so 2 to 3 appear per 10 cards!
      const deck: Profile[] = [];
      let girlIdx = 0;
      let boyIdx = 0;

      for (let i = 0; i < 20; i++) {
        const slotInTen = i % 10;
        // Slots 2, 6, and 9 are girls (3 out of 10), others are duo community profiles
        if ((slotInTen === 2 || slotInTen === 6 || slotInTen === 9) && mockGirls[girlIdx]) {
          deck.push(mockGirls[girlIdx % mockGirls.length]);
          girlIdx++;
        } else {
          deck.push(mockBoys[boyIdx % mockBoys.length]);
          boyIdx++;
        }
      }
      return deck;
    }
  }, [activeGender]);

  const activeProfile = currentDeck[currentIndex] || null;

  // Handle Swiping Action (Like, Pass, Super Like)
  const handleSwipe = async (direction: 'like' | 'pass' | 'superlike') => {
    if (!activeProfile) return;

    // Check boy swipe quota
    if (activeGender === 'man' && !premiumState.isSubscribed && swipesLeft <= 0) {
      alert('You have reached your daily 10-swipe limit. Upgrade to Girls VIP or check back tomorrow!');
      return;
    }

    if (activeGender === 'man' && !premiumState.isSubscribed) {
      setSwipesLeft((prev) => Math.max(0, prev - 1));
    }

    setSwipeHistory((prev) => [...prev, activeProfile]);
    setCurrentIndex((prev) => prev + 1);

    // Persist to Firestore if user logged in
    if (currentUser) {
      try {
        await recordSwipe(currentUser.uid, activeProfile.id, direction === 'pass' ? 'dislike' : direction);
      } catch (err) {
        console.error('Error persisting swipe:', err);
      }
    }

    // Match simulation on Like / Super Like
    if (direction === 'like' || direction === 'superlike') {
      // High match rate for demo
      const isMatch = Math.random() > 0.35 || direction === 'superlike';
      if (isMatch) {
        const newMatch: Match = {
          id: `match_${activeProfile.id}_${Date.now()}`,
          profile: activeProfile,
          matchedAt: 'Just now',
          lastMessage: "It's a Vibe Match! Start the conversation.",
          lastMessageTime: 'Just now',
          unreadCount: 1,
          isOnline: true,
        };

        setMatches((prev) => [newMatch, ...prev]);
        setJustMatchedProfile(activeProfile);

        if (currentUser) {
          try {
            await saveMatch(currentUser.uid, activeProfile, newMatch.id);
          } catch (e) {
            console.error('Error saving match to Firestore:', e);
          }
        }
      }
    }
  };

  // Rewind last swipe
  const handleRewind = () => {
    if (swipeHistory.length === 0 || currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
    setSwipeHistory((prev) => prev.slice(0, -1));
    if (activeGender === 'man' && !premiumState.isSubscribed) {
      setSwipesLeft((prev) => prev + 1);
    }
  };

  // Save safe date to Firestore
  const handleSaveSafeDate = async (plan: {
    matchName: string;
    venue: string;
    city: string;
    dateTime: string;
    emergencyContact: string;
  }) => {
    const userId = currentUser ? currentUser.uid : 'guest_user';
    try {
      const saved = await saveSafeDatePlan(userId, plan);
      setSavedSafeDates((prev) => [saved, ...prev]);
    } catch (err) {
      console.error('Error saving safe date:', err);
    }
  };

  // Handle premium upgrade
  const handleSubscribePremium = async (plan: 'monthly' | 'three_months' | 'annual' | 'lifetime') => {
    setPremiumState({
      isSubscribed: true,
      plan,
      seeWhoLikedYou: true,
      incognitoMode: false,
      unlimitedSuperLikes: true,
      dailyBoosts: true,
      vipLoungeAccess: true,
      safeDatePlanner: true,
      advancedSafetyScore: true,
      emergencySos: true,
      videoCalls: true,
    });
    if (currentUser) {
      await syncUserProfile({
        id: currentUser.uid,
        name: userProfile.name,
        gender: activeGender,
        isGirlsPremium: true,
      });
    }
  };

  // Toggle incognito mode
  const handleToggleIncognito = () => {
    setPremiumState((prev) => ({
      ...prev,
      incognitoMode: !prev.incognitoMode,
    }));
  };

  // Update profile from Verification Modal
  const handleUpdateVerification = async (updated: Partial<Profile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updated,
    }));
    if (currentUser) {
      await syncUserProfile({
        id: currentUser.uid,
        name: userProfile.name,
        gender: activeGender,
        isVerified: updated.isVerified ?? userProfile.isVerified,
        safetyScore: updated.safetyScore ?? userProfile.safetyScore,
        videoVerified: updated.videoVerified ?? userProfile.videoVerified,
        govtVerified: updated.govtVerified ?? userProfile.govtVerified,
      });
    }
  };

  return (
    <div className="min-h-screen hot-romance-bg text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white relative overflow-hidden">
      {/* Dynamic Hot Romance Ambient Lighting Orbs */}
      <div className="absolute -top-32 left-[10%] w-[520px] h-[520px] rounded-full bg-gradient-to-br from-rose-600/25 via-pink-600/20 to-transparent blur-[130px] pointer-events-none animate-aurora-1 -z-10" />
      <div className="absolute top-[30%] -right-24 w-[580px] h-[580px] rounded-full bg-gradient-to-br from-purple-600/25 via-fuchsia-600/20 to-transparent blur-[140px] pointer-events-none animate-aurora-2 -z-10" />
      <div className="absolute -bottom-32 left-[20%] w-[540px] h-[540px] rounded-full bg-gradient-to-tr from-amber-600/15 via-rose-700/20 to-transparent blur-[130px] pointer-events-none animate-aurora-3 -z-10" />

      {/* 1. Header Bar with Role Switcher & SOS */}
      <Header
        currentUserGender={activeGender}
        onSwitchGender={handleSwitchGender}
        premiumState={premiumState}
        onOpenPremium={() => setShowPremiumModal(true)}
        onOpenSafety={() => setShowSafetyModal(true)}
        onTriggerSos={() => setShowSafetyModal(true)}
        swipesLeft={swipesLeft}
      />

      {/* 2. Top Status Bar: Google Auth & Firestore Status */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">Firestore Cloud Sync:</span>
          <span className="text-emerald-300 font-semibold">Active & Encrypted</span>
        </div>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-5 h-5 rounded-full ring-1 ring-emerald-400"
                />
              ) : (
                <User className="w-4 h-4 text-emerald-400" />
              )}
              <span className="text-slate-300 font-medium hidden sm:inline">
                {currentUser.displayName || currentUser.email}
              </span>
              <button
                id="signout-btn"
                onClick={handleGoogleSignOut}
                className="text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              id="google-signin-btn"
              onClick={handleGoogleSignIn}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700 transition-colors shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-rose-400" />
              <span>Sign In with Google</span>
            </button>
          )}

          {/* AI Voice Matchmaker Quick Trigger */}
          <button
            id="voice-wingman-btn"
            onClick={() => setShowVoiceCoachModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold transition-all shadow-md shadow-purple-600/20 active:scale-95"
            title="Aria: Gemini AI Voice Dating Wingman"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden md:inline">Voice Coach</span>
          </button>
        </div>
      </div>

      {/* 3. Main Body Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-6 flex flex-col items-center justify-center">
        {/* If Active Chat is Open */}
        {activeMatchForChat ? (
          <div className="w-full max-w-2xl">
            <ChatView
              currentUser={userProfile}
              activeMatch={activeMatchForChat}
              onBack={() => setActiveMatchForChat(null)}
              onOpenSafeDatePlanner={(spotName) => {
                setShowSafetyModal(true);
              }}
              onOpenSos={() => setShowSafetyModal(true)}
            />
          </div>
        ) : (
          <>
            {/* VIEW 1: EXPLORE / SWIPE DECK */}
            {activeTab === 'explore' && (
              <div className="w-full max-w-md flex flex-col items-center">
                {/* Duo Ratio Banner */}
                {activeGender === 'man' && (
                  <div className="w-full mb-3 p-2.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span className="text-indigo-200">
                        <strong className="text-white">Normal Duo Mode:</strong> Balanced queue (2-3 verified girls per 10 cards).
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      {swipesLeft} Swipes
                    </span>
                  </div>
                )}

                {activeGender === 'woman' && (
                  <div className="w-full mb-3 p-2.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-rose-200">
                        <strong className="text-white">Girls VIP Deck:</strong> Highest safety scores & instant verification.
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                      Unlimited
                    </span>
                  </div>
                )}

                {/* Card Stack or Empty Deck */}
                {activeProfile ? (
                  <div className="w-full">
                    <SwipeCard
                      profile={activeProfile}
                      onSwipe={handleSwipe}
                      onRewind={handleRewind}
                      canRewind={swipeHistory.length > 0}
                      onOpenDetails={(p) => setDetailedProfile(p)}
                      currentUserGender={activeGender}
                      swipesLeft={swipesLeft}
                      swipeHistoryCount={swipeHistory.length}
                    />
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl w-full space-y-4 shadow-xl">
                    <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                      <Heart className="w-8 h-8 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-white">You've reached the end of today's deck!</h3>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      New verified singles join HerVibe daily in Ahmedabad, Surat, and Mumbai.
                    </p>
                    <button
                      onClick={() => {
                        setCurrentIndex(0);
                        setSwipeHistory([]);
                      }}
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/25 active:scale-95 transition-all"
                    >
                      Refresh Deck
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 2: MATCHES & CHATS */}
            {activeTab === 'matches' && (
              <div className="w-full max-w-xl space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-rose-400" />
                    <span>Your Vibe Matches ({matches.length})</span>
                  </h2>
                  <span className="text-xs text-slate-400">Real-time chat & Safe Meetups</span>
                </div>

                {/* Match Avatars Horizontal Reel */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {matches.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setActiveMatchForChat(m)}
                      className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0"
                    >
                      <div className="relative">
                        <img
                          src={m.profile.photos[0]}
                          alt={m.profile.name}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-rose-500/80 group-hover:scale-105 transition-transform"
                        />
                        {m.isOnline && (
                          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                        )}
                      </div>
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-rose-400 truncate max-w-[70px]">
                        {m.profile.name.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Match Message List */}
                <div className="space-y-2.5">
                  {matches.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setActiveMatchForChat(m)}
                      className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-center justify-between transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={m.profile.photos[0]}
                          alt={m.profile.name}
                          className="w-12 h-12 rounded-2xl object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-white group-hover:text-rose-400">
                              {m.profile.name}
                            </span>
                            {m.profile.verified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                              {m.profile.safetyScore}% Safe
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 truncate max-w-xs mt-0.5">
                            {m.lastMessage}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">{m.lastMessageTime}</span>
                        {m.unreadCount > 0 && (
                          <span className="inline-block mt-1 w-2 h-2 rounded-full bg-rose-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 3: SAFE SPOTS & VIP GATHERINGS */}
            {activeTab === 'safespots' && (
              <div className="w-full max-w-3xl space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rose-400" />
                    <span>HerVibe Verified Safe Date Cafes</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Curated partner venues with CCTV coverage, verified staff, and emergency link.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {safeDateSpots.map((spot) => (
                    <div
                      key={spot.id}
                      className="p-4 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden space-y-3 shadow-lg"
                    >
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="w-full h-36 rounded-2xl object-cover"
                      />
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white">{spot.name}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {spot.safetyScore}% Safety Score
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {spot.city} • {spot.area}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {spot.features.slice(0, 3).map((f, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300"
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setShowSafetyModal(true)}
                        className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
                      >
                        Plan Safe Date Here
                      </button>
                    </div>
                  ))}
                </div>

                {/* VIP Offline Events for Women */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span>Girls-Only VIP Gatherings</span>
                    </h3>
                    <span className="text-xs text-amber-400">Exclusive to Women</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {girlsVipEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-white">{event.title}</h5>
                          <p className="text-[11px] text-slate-400">{event.date} • {event.venue}</p>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                            {event.attendeesCount} joined • {event.maxSpots - event.attendeesCount} spots left
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: PROFILE & SAFETY SCORE */}
            {activeTab === 'profile' && (
              <div className="w-full max-w-md space-y-4">
                <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-center">
                  <div className="relative w-24 h-24 mx-auto">
                    <img
                      src={userProfile.photos[0]}
                      alt={userProfile.name}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-rose-500/40"
                    />
                    {userProfile.isVerified && (
                      <span className="absolute bottom-0 right-0 p-1 rounded-full bg-emerald-500 text-white">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center justify-center gap-1.5">
                      <span>{userProfile.name}</span>
                      <span className="text-slate-400 font-normal">, {userProfile.age}</span>
                    </h3>
                    <p className="text-xs text-slate-400">{userProfile.profession} • {userProfile.city}</p>
                  </div>

                  {/* Trust & Safety Score Card */}
                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Trust & Safety Rating
                      </span>
                      <div className="text-base font-extrabold text-emerald-400 flex items-center gap-1.5">
                        <Shield className="w-4 h-4" />
                        <span>{userProfile.safetyScore}/100 Safe Profile</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowVerificationModal(true)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-600/30 transition-colors"
                    >
                      Verify Now
                    </button>
                  </div>

                  {/* Relationship & Bio Highlights */}
                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-left space-y-2.5 text-xs">
                    {userProfile.relationshipIntent && (
                      <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                        <span className="text-slate-400">Looking For</span>
                        <span className="font-bold text-rose-300">{userProfile.relationshipIntent}</span>
                      </div>
                    )}
                    {userProfile.qualification && (
                      <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                        <span className="text-slate-400">Education</span>
                        <span className="font-medium text-slate-200">{userProfile.qualification.degree} ({userProfile.qualification.college.split(',')[0]})</span>
                      </div>
                    )}
                    {userProfile.birthDate && (
                      <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                        <span className="text-slate-400">Birthday & Zodiac</span>
                        <span className="font-medium text-amber-300">{userProfile.birthDate} • {userProfile.zodiacSign?.split(' ')[0] || 'Leo'}</span>
                      </div>
                    )}
                    {userProfile.hobbies && userProfile.hobbies.length > 0 && (
                      <div>
                        <span className="text-slate-400 block mb-1.5">My Passions & Hobbies</span>
                        <div className="flex flex-wrap gap-1.5">
                          {userProfile.hobbies.map((h, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 text-[11px] flex items-center gap-1">
                              <span>{h.icon}</span>
                              <span>{h.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Preview Full Profile Button */}
                  <button
                    onClick={() => setDetailedProfile(userProfile)}
                    className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Info className="w-4 h-4 text-rose-400" />
                    <span>Preview My Full Profile Card</span>
                  </button>

                  {/* Girls VIP Upgrade button */}
                  <button
                    onClick={() => setShowPremiumModal(true)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 active:scale-95 transition-all"
                  >
                    <Crown className="w-4 h-4" />
                    <span>{premiumState.isSubscribed ? 'Girls VIP Status Active' : 'Upgrade to Girls Premium (₹149)'}</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* 4. Bottom Tab Bar Navigation */}
      {!activeMatchForChat && (
        <nav className="sticky bottom-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-2 px-6">
          <div className="max-w-md mx-auto flex items-center justify-around">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
                activeTab === 'explore' ? 'text-rose-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${activeTab === 'explore' ? 'fill-rose-400' : ''}`} />
              <span>Discover</span>
            </button>

            <button
              onClick={() => setActiveTab('matches')}
              className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors relative ${
                activeTab === 'matches' ? 'text-rose-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageCircle className={`w-5 h-5 ${activeTab === 'matches' ? 'fill-rose-400' : ''}`} />
              <span>Matches</span>
              {matches.length > 0 && (
                <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('safespots')}
              className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
                activeTab === 'safespots' ? 'text-rose-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className={`w-5 h-5 ${activeTab === 'safespots' ? 'fill-rose-400' : ''}`} />
              <span>Safe Spots</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
                activeTab === 'profile' ? 'text-rose-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className={`w-5 h-5 ${activeTab === 'profile' ? 'fill-rose-400' : ''}`} />
              <span>Profile</span>
            </button>
          </div>
        </nav>
      )}

      {/* 5. Modals */}
      <ProfileDetailsModal
        profile={detailedProfile}
        onClose={() => setDetailedProfile(null)}
        onLike={(p) => {
          handleSwipe('like');
          setDetailedProfile(null);
        }}
        onPass={(p) => {
          handleSwipe('pass');
          setDetailedProfile(null);
        }}
        onSuperLike={(p) => {
          handleSwipe('superlike');
          setDetailedProfile(null);
        }}
        onReport={(p, reason) => {
          alert(`Profile reported to HerVibe Trust & Safety team. Reason: ${reason}`);
          setDetailedProfile(null);
        }}
        onBlock={(p) => {
          alert(`User ${p.name} has been blocked.`);
          setDetailedProfile(null);
        }}
      />

      <MatchCelebrationModal
        matchedProfile={justMatchedProfile}
        currentUserGender={activeGender}
        onClose={() => setJustMatchedProfile(null)}
        onSendMessage={(p) => {
          const m = matches.find((item) => item.profile.id === p.id) || matches[0];
          setJustMatchedProfile(null);
          setActiveMatchForChat(m);
        }}
      />

      <VerificationModal
        userProfile={userProfile}
        onClose={() => setShowVerificationModal(false)}
        onUpdateVerification={handleUpdateVerification}
      />

      <GirlsPremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        premiumState={premiumState}
        onSubscribe={handleSubscribePremium}
        onToggleIncognito={handleToggleIncognito}
      />

      <SafetyHubModal
        isOpen={showSafetyModal}
        onClose={() => setShowSafetyModal(false)}
        onOpenVerification={() => {
          setShowSafetyModal(false);
          setShowVerificationModal(true);
        }}
        onSaveSafeDate={handleSaveSafeDate}
        savedDates={savedSafeDates}
      />

      <VoiceWingmanModal
        isOpen={showVoiceCoachModal}
        onClose={() => setShowVoiceCoachModal(false)}
        userGender={activeGender}
      />
    </div>
  );
}
