export type Gender = 'woman' | 'man';

export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  city: string;
  distanceKm: number;
  profession: string;
  education?: string;
  qualification?: {
    degree: string;
    field: string;
    college: string;
    honors?: string;
  };
  relationshipIntent: string; // e.g. '💍 Long-term Relationship', '✨ Marriage Minded', '☕ Casual & Dating'
  relationshipDescription?: string;
  birthDate: string; // e.g. '14 August 2000'
  zodiacSign: string; // e.g. '♌ Leo (Fire Sign)'
  dietaryPreference?: string; // e.g. '🌱 Pure Vegetarian', ' Jain Vegetarian'
  loveLanguage?: string; // e.g. 'Quality Time & Late Night Chats'
  communicationStyle?: string; // e.g. 'Fast texter & voice notes'
  idealFirstDate?: string;
  greenFlags?: string[];
  dealBreakers?: string[];
  hobbies?: Array<{
    name: string;
    icon?: string;
    category?: string;
  }>;
  bio: string;
  photos: string[];
  interests: string[];
  prompts: {
    question: string;
    answer: string;
  }[];
  voiceBioSeconds?: number;
  voiceBioTitle?: string;
  verified: boolean;
  isVerified?: boolean;
  videoVerified?: boolean;
  govtVerified?: boolean;
  verificationBadge: 'Aadhaar Verified' | 'Photo Verified' | 'Video Verified' | null;
  safetyScore: number; // 0 to 100
  compatibilityScore: number; // % match
  height?: string;
  languages: string[];
  lifestyle: {
    smoking: string;
    drinking: string;
    workout: string;
    pets: string;
  };
}

export interface Match {
  id: string;
  profile: Profile;
  matchedAt: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isVoice?: boolean;
  voiceDuration?: number;
  isPhoto?: boolean;
  photoUrl?: string;
  status: 'sent' | 'delivered' | 'read';
}

export type PremiumPlan = 'monthly' | 'quarterly' | 'annual' | 'lifetime';

export interface GirlsPremiumState {
  isSubscribed: boolean;
  plan: PremiumPlan;
  seeWhoLikedYou: boolean;
  incognitoMode: boolean;
  unlimitedSuperLikes: boolean;
  dailyBoosts: boolean;
  vipLoungeAccess: boolean;
  safeDatePlanner: boolean;
  advancedSafetyScore: boolean;
  emergencySos: boolean;
  videoCalls: boolean;
}

export interface SafeDateSpot {
  id: string;
  name: string;
  city: string;
  area: string;
  category: 'Cafe' | 'Bistro' | 'Cultural Space' | 'Fine Dining' | 'Lounge';
  safetyScore: number;
  address: string;
  features: string[];
  image: string;
  phone: string;
  lat?: number;
  lng?: number;
  openHours?: string;
  distanceKm?: number;
}

export interface VipEvent {
  id: string;
  title: string;
  city: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  attendeesCount: number;
  maxSpots: number;
  description: string;
  image: string;
  isGirlsOnly: boolean;
}
