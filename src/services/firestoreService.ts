import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { Profile, Gender, GirlsPremiumState } from '../types';

export interface UserDocument {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  gender: Gender;
  age: number;
  city: string;
  profession: string;
  bio: string;
  interests: string[];
  isVerified: boolean;
  safetyScore: number;
  isGirlsPremium: boolean;
  videoVerified: boolean;
  govtVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FirestoreSafeDate {
  id: string;
  userId: string;
  matchName: string;
  venue: string;
  city: string;
  dateTime: string;
  emergencyContact: string;
  status: string;
}

// 1. Save or sync User Profile
export async function syncUserProfile(
  userProfile: Partial<UserDocument> & { id: string; name: string; gender: Gender }
): Promise<void> {
  const path = `users/${userProfile.id}`;
  try {
    const userRef = doc(db, 'users', userProfile.id);
    const existingSnap = await getDoc(userRef);

    const dataToSave: UserDocument = {
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email || auth.currentUser?.email || '',
      photoURL: userProfile.photoURL || auth.currentUser?.photoURL || '',
      gender: userProfile.gender,
      age: userProfile.age || 24,
      city: userProfile.city || 'Ahmedabad',
      profession: userProfile.profession || 'Creative Professional',
      bio: userProfile.bio || 'Exploring life, cafe culture & genuine connections.',
      interests: userProfile.interests || ['Specialty Coffee', 'Architecture', 'Travel'],
      isVerified: userProfile.isVerified ?? false,
      safetyScore: userProfile.safetyScore ?? (userProfile.gender === 'woman' ? 98 : 92),
      isGirlsPremium: userProfile.isGirlsPremium ?? false,
      videoVerified: userProfile.videoVerified ?? false,
      govtVerified: userProfile.govtVerified ?? false,
      createdAt: existingSnap.exists()
        ? existingSnap.data().createdAt || new Date().toISOString()
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(userRef, dataToSave, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 2. Fetch User Profile
export async function getUserProfile(userId: string): Promise<UserDocument | null> {
  const path = `users/${userId}`;
  try {
    const snap = await getDoc(doc(db, 'users', userId));
    if (snap.exists()) {
      return snap.data() as UserDocument;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

// 3. Record a swipe
export async function recordSwipe(
  userId: string,
  targetProfileId: string,
  direction: 'like' | 'dislike' | 'superlike'
): Promise<void> {
  const swipeId = `${targetProfileId}_${Date.now()}`;
  const path = `users/${userId}/swipes/${swipeId}`;
  try {
    const swipeRef = doc(db, 'users', userId, 'swipes', swipeId);
    await setDoc(swipeRef, {
      id: swipeId,
      userId,
      targetProfileId,
      direction,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 4. Save a Match
export async function saveMatch(
  userId: string,
  targetProfile: Profile,
  matchId: string
): Promise<void> {
  const path = `matches/${matchId}`;
  try {
    const matchRef = doc(db, 'matches', matchId);
    await setDoc(
      matchRef,
      {
        id: matchId,
        users: [userId, targetProfile.id],
        lastMessage: "It's a Vibe Match! Start the conversation.",
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 5. Send a Chat Message
export async function sendChatMessage(
  matchId: string,
  senderId: string,
  text: string,
  isAiGenerated: boolean = false
): Promise<void> {
  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const path = `matches/${matchId}/messages/${messageId}`;
  try {
    const msgRef = doc(db, 'matches', matchId, 'messages', messageId);
    await setDoc(msgRef, {
      id: messageId,
      matchId,
      senderId,
      text,
      timestamp: new Date().toISOString(),
      isAiGenerated,
      isVoiceNote: false,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 6. Listen to Chat Messages in real time
export function subscribeToMessages(
  matchId: string,
  onUpdate: (messages: any[]) => void
): Unsubscribe {
  const path = `matches/${matchId}/messages`;
  try {
    const colRef = collection(db, 'matches', matchId, 'messages');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const msgs = snapshot.docs
          .map((d) => d.data())
          .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
        onUpdate(msgs);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// 7. Save Safe Date Itinerary
export async function saveSafeDatePlan(
  userId: string,
  plan: {
    matchName: string;
    venue: string;
    city: string;
    dateTime: string;
    emergencyContact: string;
  }
): Promise<FirestoreSafeDate> {
  const dateId = `date_${Date.now()}`;
  const path = `safeDates/${dateId}`;
  try {
    const dateRef = doc(db, 'safeDates', dateId);
    const data: FirestoreSafeDate = {
      id: dateId,
      userId,
      matchName: plan.matchName,
      venue: plan.venue,
      city: plan.city,
      dateTime: plan.dateTime,
      emergencyContact: plan.emergencyContact,
      status: 'planned',
    };
    await setDoc(dateRef, data);
    return data;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 8. Fetch user's safe dates
export async function fetchUserSafeDates(userId: string): Promise<FirestoreSafeDate[]> {
  const path = 'safeDates';
  try {
    const colRef = collection(db, 'safeDates');
    const q = query(colRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as FirestoreSafeDate);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
