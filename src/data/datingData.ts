import { SafeDateSpot, VipEvent } from '../types';

export const safeDateSpots: SafeDateSpot[] = [
  {
    id: 'spot_1',
    name: 'The Project Cafe & Art Space',
    city: 'Ahmedabad',
    area: 'Ambawadi / Riverfront',
    category: 'Cafe',
    safetyScore: 99,
    address: 'Near Yellow Mustard Lane, Ambawadi, Ahmedabad',
    lat: 23.0225,
    lng: 72.5510,
    openHours: '9:00 AM - 11:00 PM',
    features: ['Well-Lit Public Seating', 'CCTV Monitored', 'HerVibe Safe Partner', 'Valet Parking', 'Female Friendly Staff'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    phone: '+91 79 2630 4400'
  },
  {
    id: 'spot_2',
    name: 'K\'s Charcoal & Bistro Lounge',
    city: 'Ahmedabad',
    area: 'SG Highway, Bodakdev',
    category: 'Bistro',
    safetyScore: 98,
    address: 'Opposite Rajpath Club, Bodakdev, Ahmedabad',
    lat: 23.0422,
    lng: 72.5115,
    openHours: '11:00 AM - 11:30 PM',
    features: ['Spacious Open Seating', 'Verified Staff', 'Security Guard on Duty', 'Emergency Button Access'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    phone: '+91 79 4004 8888'
  },
  {
    id: 'spot_3',
    name: 'The Roastery Cultur & Brew',
    city: 'Ahmedabad',
    area: 'Sindhu Bhavan Road',
    category: 'Cafe',
    safetyScore: 99,
    address: 'Times Square Grand, Sindhu Bhavan Marg, Ahmedabad',
    lat: 23.0489,
    lng: 72.5028,
    openHours: '8:00 AM - 11:59 PM',
    features: ['24/7 Security Concierge', 'High CCTV Density', 'Dedicated HerVibe Table Check', 'Open Glass Architecture'],
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    phone: '+91 79 4910 8822'
  },
  {
    id: 'spot_4',
    name: 'Riverfront Oasis Cafe & Garden',
    city: 'Ahmedabad',
    area: 'Sabarmati Riverfront West',
    category: 'Cultural Space',
    safetyScore: 97,
    address: 'Flower Park Promenade, Sabarmati Riverfront, Ahmedabad',
    lat: 23.0335,
    lng: 72.5695,
    openHours: '10:00 AM - 10:30 PM',
    features: ['Public Riverside Patrol', 'Family Friendly Atmosphere', 'SOS Call Box 20m away', 'Bright LED Promenade'],
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
    phone: '+91 79 2658 0011'
  },
  {
    id: 'spot_5',
    name: 'Nomad Coffee Co. & Roastery',
    city: 'Surat',
    area: 'Vesu Main Road',
    category: 'Cafe',
    safetyScore: 98,
    address: 'Shop 14, Royal Square, VIP Road / Vesu, Surat',
    lat: 21.1442,
    lng: 72.7715,
    openHours: '8:30 AM - 11:00 PM',
    features: ['Specialty Coffee Bar', 'HerVibe Check-in Desk', 'Active Public Hub', 'Rapid SOS Link'],
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    phone: '+91 261 229 1100'
  },
  {
    id: 'spot_6',
    name: 'The Lakeview Glasshouse',
    city: 'Surat',
    area: 'Piplod Waterfront',
    category: 'Fine Dining',
    safetyScore: 97,
    address: 'Gaurav Path, Piplod, Surat',
    lat: 21.1578,
    lng: 72.7663,
    openHours: '11:30 AM - 11:30 PM',
    features: ['Scenic Lake View', 'Family & Date Friendly', 'Valet Security', 'Quiet Private Corners'],
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=600&q=80',
    phone: '+91 261 450 7722'
  },
  {
    id: 'spot_7',
    name: 'Subko Coffee & Bakehouse',
    city: 'Mumbai',
    area: 'Bandra West',
    category: 'Cafe',
    safetyScore: 99,
    address: 'Craftery, Chapel Rd, Bandra West, Mumbai',
    lat: 19.0552,
    lng: 72.8290,
    openHours: '8:00 AM - 10:00 PM',
    features: ['Artisanal Pastries', 'Vibrant Crowd', 'Safe Transit Access', 'HerVibe Safe Hub'],
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80',
    phone: '+91 22 6902 3344'
  },
  {
    id: 'spot_8',
    name: 'Blue Tokai Coffee Roasters',
    city: 'Mumbai',
    area: 'Pali Hill, Bandra',
    category: 'Cafe',
    safetyScore: 98,
    address: 'Corner of 16th Rd, Pali Village, Bandra West, Mumbai',
    lat: 19.0620,
    lng: 72.8335,
    openHours: '7:30 AM - 11:00 PM',
    features: ['Pedestrian Safe Zone', 'Bustling Neighborhood', 'Fast Emergency Response', 'CCTV Equipped'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    phone: '+91 22 6821 7711'
  }
];

export const girlsVipEvents: VipEvent[] = [
  {
    id: 'event_1',
    title: 'Ahmedabad Women Coffee & Pottery Mixer',
    city: 'Ahmedabad',
    date: 'Saturday, 19 Sept',
    time: '4:30 PM - 7:00 PM',
    venue: 'Clay Art Studio, Bodakdev',
    category: 'Art & Social',
    attendeesCount: 22,
    maxSpots: 30,
    description: 'Private, women-only afternoon of clay sculpting, artisanal espresso, and friendly conversations. Bring a friend or meet inspiring women in the city!',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    isGirlsOnly: true
  },
  {
    id: 'event_2',
    title: 'Surat Sunset Book & Chai Circle',
    city: 'Surat',
    date: 'Sunday, 20 Sept',
    time: '5:00 PM - 7:30 PM',
    venue: 'Riverfront Deck Cafe, Adajan',
    category: 'Book Club & Dating Advice',
    attendeesCount: 18,
    maxSpots: 25,
    description: 'Unwind at golden hour discussing books, romance red/green flags, and modern relationships over hot kulhad chai.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    isGirlsOnly: true
  },
  {
    id: 'event_3',
    title: 'Navratri Pre-Garba Style & Dating Gala',
    city: 'Ahmedabad',
    date: 'Friday, 25 Sept',
    time: '7:00 PM - 10:30 PM',
    venue: 'Royal Amphitheatre, SG Highway',
    category: 'Festive & Speed Dating',
    attendeesCount: 42,
    maxSpots: 50,
    description: 'A curated mixer for verified singles! Special VIP lounge for women with complimentary styling touch-ups and priority queue choice.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=80',
    isGirlsOnly: false
  }
];

export const emergencyHotlines = [
  { name: 'National Emergency Helpline', number: '112', desc: 'Instant Police, Ambulance & Fire dispatch' },
  { name: 'National Women Safety Helpline', number: '1091', desc: '24x7 Dedicated Women Assistance' },
  { name: 'Gujarat Women Safety Cell (181 Abhayam)', number: '181', desc: 'Gujarat Government 24x7 Emergency Response' },
  { name: 'HerVibe Rapid Incident Team', number: '1800-419-VIBE', desc: 'In-app safety officers available immediately' }
];

export const initialMatches = [
  {
    id: 'match_1',
    profile: {
      id: 'girl_1',
      name: 'Ananya Sharma',
      age: 23,
      gender: 'woman' as const,
      city: 'Ahmedabad',
      distanceKm: 4,
      profession: 'UI/UX Designer at Fintech',
      bio: 'Finding the best filter coffee in Ahmedabad ☕. Love spontaneous evening drives along the Sabarmati Riverfront.',
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
      ],
      interests: ['Design', 'Coffee', 'Riverfront Walks'],
      prompts: [
        {
          question: 'My ideal Sunday in Gujarat',
          answer: 'Morning maska bun & chai at Lucky Tea stall, sketching at Riverfront park.'
        }
      ],
      verified: true,
      verificationBadge: 'Aadhaar Verified' as const,
      safetyScore: 98,
      compatibilityScore: 96,
      languages: ['Gujarati', 'Hindi', 'English'],
      lifestyle: {
        smoking: 'Never',
        drinking: 'Socially',
        workout: 'Yoga 4x/week',
        pets: 'Golden Retriever lover'
      }
    },
    matchedAt: 'Today, 2:15 PM',
    lastMessage: 'Hey! I saw you love pour-over coffee too! Have you tried the new cafe near Riverfront?',
    lastMessageTime: '10m ago',
    unreadCount: 1,
    isOnline: true
  },
  {
    id: 'match_2',
    profile: {
      id: 'girl_2',
      name: 'Priya Patel',
      age: 24,
      gender: 'woman' as const,
      city: 'Surat',
      distanceKm: 8,
      profession: 'Fashion Stylist & Textile Curator',
      bio: 'Surat born & proud foodie! Living between sustainable fashion shoots and evening walks at Dumas Beach 🌊.',
      photos: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
      ],
      interests: ['Fashion', 'Street Food', 'Sunset Photography'],
      prompts: [
        {
          question: 'A boundary I appreciate',
          answer: 'Direct communication, no ghosting, and genuine kindness.'
        }
      ],
      verified: true,
      verificationBadge: 'Photo Verified' as const,
      safetyScore: 96,
      compatibilityScore: 92,
      languages: ['Gujarati', 'Hindi', 'English'],
      lifestyle: {
        smoking: 'Never',
        drinking: 'Never',
        workout: 'Pilates & Dance',
        pets: 'Has a cat named Mochi'
      }
    },
    matchedAt: 'Yesterday',
    lastMessage: 'The photos of Dumas beach you shared are gorgeous! ✨',
    lastMessageTime: '2h ago',
    unreadCount: 0,
    isOnline: false
  },
  {
    id: 'match_3',
    profile: {
      id: 'boy_1',
      name: 'Aarav Shah',
      age: 25,
      gender: 'man' as const,
      city: 'Ahmedabad',
      distanceKm: 5,
      profession: 'Founder & Full-Stack Engineer',
      bio: 'Building AI tools by day, playing guitar and brewing pour-overs by evening. Big fan of indie cinema.',
      photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
      ],
      interests: ['Tech', 'Guitar', 'Tennis'],
      prompts: [
        {
          question: 'My simple pleasures',
          answer: 'Fresh monsoon rain in Gujarat, a warm cup of masala tea.'
        }
      ],
      verified: true,
      verificationBadge: 'Aadhaar Verified' as const,
      safetyScore: 97,
      compatibilityScore: 95,
      languages: ['Gujarati', 'Hindi', 'English'],
      lifestyle: {
        smoking: 'Never',
        drinking: 'Occasionally',
        workout: 'Tennis 3x/week',
        pets: 'Love dogs'
      }
    },
    matchedAt: '3 days ago',
    lastMessage: 'Let\'s catch up this weekend if you are free!',
    lastMessageTime: '1d ago',
    unreadCount: 0,
    isOnline: true
  }
];
