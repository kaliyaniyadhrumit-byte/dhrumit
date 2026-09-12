import { Profile } from '../types';

export const mockGirls: Profile[] = [
  {
    id: 'girl_1',
    name: 'Ananya Sharma',
    age: 23,
    gender: 'woman',
    city: 'Ahmedabad',
    distanceKm: 4,
    profession: 'UI/UX Designer at Fintech',
    education: 'NID Ahmedabad',
    qualification: {
      degree: 'Master of Design (M.Des)',
      field: 'Interaction & Product Experience Design',
      college: 'National Institute of Design (NID), Ahmedabad',
      honors: 'President’s Gold Medal Finalist (2023)'
    },
    relationshipIntent: '💍 Long-term Relationship & Serious Commitment',
    relationshipDescription: 'Looking for a genuine, emotionally mature connection where we can inspire each other, share laugh-out-loud moments, and grow together.',
    birthDate: '14 August 2001',
    zodiacSign: '♌ Leo (Fiery, Warm-Hearted & Loyal)',
    dietaryPreference: '🌱 Pure Vegetarian',
    loveLanguage: 'Quality Time & Soulful Conversations',
    communicationStyle: 'Quick texter by day, deep phone & voice notes by evening',
    idealFirstDate: 'Artisanal filter coffee at a cozy heritage cafe followed by a peaceful sunset stroll along the Sabarmati Riverfront.',
    greenFlags: ['Treats service staff with genuine kindness', 'Has passion projects', 'Values open communication', 'Appreciates personal space'],
    dealBreakers: ['Ghosting / playing hard to get', 'Arrogance', 'Smoking around non-smokers', 'Lack of ambition'],
    hobbies: [
      { name: 'Specialty Coffee Brewing', icon: '☕', category: 'Culinary' },
      { name: 'Riverfront Sunset Cycling', icon: '🚲', category: 'Fitness' },
      { name: 'Raas-Garba & Folk Rhythm', icon: '💃', category: 'Cultural Dance' },
      { name: 'Analog Film Photography', icon: '📸', category: 'Visual Arts' },
      { name: 'Indie Vinyl & Gujarati Acoustic', icon: '🎶', category: 'Music' }
    ],
    bio: 'Finding the best pour-over coffee in Ahmedabad ☕. Love spontaneous evening drives along the Sabarmati Riverfront, indie acoustic music, and golden hour light.',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Design', 'Specialty Coffee', 'Riverfront Walks', 'Indie Music', 'Garba'],
    prompts: [
      {
        question: 'My ideal Sunday in Gujarat',
        answer: 'Morning maska bun & chai at Lucky Tea stall, sketching at Riverfront park, and home dinner with family.'
      },
      {
        question: 'You should leave a message if',
        answer: 'You appreciate dry wit, can recommend a hidden gem cafe, and respect personal boundaries.'
      }
    ],
    voiceBioSeconds: 14,
    voiceBioTitle: 'Hey! Quick intro about what makes me smile...',
    verified: true,
    verificationBadge: 'Aadhaar Verified',
    safetyScore: 98,
    compatibilityScore: 96,
    height: '5\' 6"',
    languages: ['Gujarati', 'Hindi', 'English'],
    lifestyle: {
      smoking: 'Never',
      drinking: 'Socially',
      workout: 'Yoga 4x/week',
      pets: 'Golden Retriever lover'
    }
  },
  {
    id: 'girl_2',
    name: 'Priya Patel',
    age: 24,
    gender: 'woman',
    city: 'Surat',
    distanceKm: 8,
    profession: 'Fashion Stylist & Textile Curator',
    education: 'NIFT Gandhinagar',
    qualification: {
      degree: 'Bachelor of Design (B.Des - Fashion & Textile)',
      field: 'Sustainable Textiles & Indian Handlooms',
      college: 'National Institute of Fashion Technology (NIFT), Gandhinagar',
      honors: 'Top Fashion Portfolio Award (Batch of 2022)'
    },
    relationshipIntent: '✨ Marriage Minded & Long-term Partner',
    relationshipDescription: 'Looking for my best friend and life partner—someone grounded, family-oriented, with a wonderful sense of humor and appreciation for culture.',
    birthDate: '28 October 2000',
    zodiacSign: '♏ Scorpio (Passionate, Intuitive & Deep)',
    dietaryPreference: '🌱 Jain Vegetarian (Strict & Proud)',
    loveLanguage: 'Words of Affirmation & Thoughtful Surprises',
    communicationStyle: 'Consistent texter, loves evening video calls and sharing funny Gujarati memes',
    idealFirstDate: 'Exploring artisanal Surat Locho spots, catching the sea breeze at Dumas Beach, and discussing our favorite childhood memories.',
    greenFlags: ['Family values & warmth', 'Passionate about his work', 'Good listener', 'Loves festive Garba nights'],
    dealBreakers: ['Dishonesty', 'Disrespecting family', 'Hot-headed temper', 'Smoking'],
    hobbies: [
      { name: 'Navratri Chaniya Choli Styling', icon: '✨', category: 'Fashion' },
      { name: 'Ceramics & Hand Pottery', icon: '🏺', category: 'Creative' },
      { name: 'Dumas Beach Sunset Treks', icon: '🌊', category: 'Outdoors' },
      { name: 'Surat Street Food Tasting', icon: '🥘', category: 'Culinary' },
      { name: 'Indian Folk Embroidery', icon: '🧵', category: 'Craft' }
    ],
    bio: 'Surat born & proud foodie! Living between sustainable fashion shoots and evening breeze at Dumas Beach 🌊. Big believer in kindness and sparkling conversation.',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Fashion', 'Street Food', 'Sunset Photography', 'Ceramics', 'Garba'],
    prompts: [
      {
        question: 'A boundary I appreciate',
        answer: 'Direct communication, no ghosting, and a guy who treats service staff with genuine kindness.'
      },
      {
        question: 'Dating me is like',
        answer: 'Getting unlimited recommendations for Surat locho, vintage saree stories, and road trips.'
      }
    ],
    voiceBioSeconds: 19,
    voiceBioTitle: 'Listen to my quirky take on first dates ✨',
    verified: true,
    verificationBadge: 'Photo Verified',
    safetyScore: 96,
    compatibilityScore: 92,
    height: '5\' 5"',
    languages: ['Gujarati', 'Hindi', 'English'],
    lifestyle: {
      smoking: 'Never',
      drinking: 'Never',
      workout: 'Pilates & Dance',
      pets: 'Has a cat named Mochi'
    }
  },
  {
    id: 'girl_3',
    name: 'Meera Trivedi',
    age: 22,
    gender: 'woman',
    city: 'Vadodara',
    distanceKm: 12,
    profession: 'Architecture Apprentice & Bharatnatyam Dancer',
    education: 'MS University Vadodara',
    qualification: {
      degree: 'Bachelor of Architecture (B.Arch)',
      field: 'Heritage Architecture & Stepwell Conservation',
      college: 'Faculty of Architecture, The Maharaja Sayajirao University (MSU) of Baroda',
      honors: 'Alankrita Dance Scholar & First Class with Distinction'
    },
    relationshipIntent: '🌟 Deep Intellectual Connection & Romance',
    relationshipDescription: 'Fascinated by soulful minds. I value someone who can converse about history, art, and life beneath starry skies with mutual respect.',
    birthDate: '03 March 2002',
    zodiacSign: '♓ Pisces (Artistic, Empathetic & Dreamer)',
    dietaryPreference: '🌱 Pure Vegetarian',
    loveLanguage: 'Quality Time & Acts of Service',
    communicationStyle: 'Prefers long evening voice notes and weekend chai dates over endless shallow texting',
    idealFirstDate: 'Visiting Laxmi Vilas Palace grounds for architectural photography followed by piping hot cutting chai at a quiet terrace cafe.',
    greenFlags: ['Reads physical books', 'Appreciates classical music & art', 'Speaks kindly', 'Calm under stress'],
    dealBreakers: ['Shallow talk', 'Constantly checking phone on dates', 'Rudeness', 'Cigarette smoking'],
    hobbies: [
      { name: 'Classical Bharatnatyam Dance', icon: '💃', category: 'Performing Arts' },
      { name: 'Heritage Stepwell Sketching', icon: '🏛️', category: 'Architecture' },
      { name: 'Nature & Forest Treks (Pavagadh)', icon: '🌲', category: 'Outdoors' },
      { name: 'Oil Painting on Canvas', icon: '🎨', category: 'Fine Art' },
      { name: 'Gujarati Literature & Ghazals', icon: '📖', category: 'Literature' }
    ],
    bio: 'Fascinated by stepwells, classical rhythms, and minimalism. Looking for soulful conversations over cutting chai in old Baroda.',
    photos: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Architecture', 'Classical Dance', 'History', 'Painting', 'Nature Treks'],
    prompts: [
      {
        question: 'My green flags in someone',
        answer: 'Listens intently, values family warmth, and reads actual physical books.'
      }
    ],
    voiceBioSeconds: 12,
    voiceBioTitle: 'A short voice note from my Vadodara studio',
    verified: true,
    verificationBadge: 'Video Verified',
    safetyScore: 99,
    compatibilityScore: 94,
    height: '5\' 4"',
    languages: ['Gujarati', 'Hindi', 'English'],
    lifestyle: {
      smoking: 'Never',
      drinking: 'Never',
      workout: 'Classical Dance Daily',
      pets: 'Bird watcher'
    }
  },
  {
    id: 'girl_4',
    name: 'Diya Mehta',
    age: 25,
    gender: 'woman',
    city: 'Mumbai',
    distanceKm: 22,
    profession: 'Product Lead @ Tech Unicorn',
    education: 'IIM Ahmedabad',
    qualification: {
      degree: 'Master of Business Administration (MBA)',
      field: 'Product Strategy & Technology Management',
      college: 'Indian Institute of Management (IIM), Ahmedabad',
      honors: 'Dean’s Honor Roll (Class of 2021) • B.Tech Gold Medal'
    },
    relationshipIntent: '💍 Long-term Relationship & Equal Partnership',
    relationshipDescription: 'Ambitious yet grounded. Seeking an equal partner with intellectual curiosity, emotional depth, and an adventurous spirit.',
    birthDate: '19 September 1999',
    zodiacSign: '♍ Virgo (Analytical, Caring & Ambitious)',
    dietaryPreference: '🌱 Vegetarian / Eggetarian friendly',
    loveLanguage: 'Acts of Service & Physical Affection',
    communicationStyle: 'Direct, witty, candid texter who values punctual weekend dates',
    idealFirstDate: 'Third wave coffee cupping at Subko Bandra followed by browsing an independent bookstore in Fort.',
    greenFlags: ['Emotionally secure', 'Curious about the world', 'Celebrates my wins', 'Can make me laugh effortlessly'],
    dealBreakers: ['Insecurity around ambitious women', 'Lack of punctuality', 'Gossiping', 'Negativity'],
    hobbies: [
      { name: 'Half Marathon Long Runs', icon: '🏃‍♀️', category: 'Endurance' },
      { name: 'Sourdough Pastry Baking', icon: '🥐', category: 'Culinary' },
      { name: 'Modern Art Galleries', icon: '🖼️', category: 'Culture' },
      { name: 'Tech & Philosophy Podcasts', icon: '🎙️', category: 'Intellectual' },
      { name: 'Rooftop Book Clubs', icon: '📚', category: 'Reading' }
    ],
    bio: 'Tech enthusiast by day, amateur pastry baker by night. Love podcasts, marathon training, and rooftop book clubs. Seeking an equal partner.',
    photos: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Startups', 'Baking', 'Marathon', 'Podcasts', 'Art Galleries'],
    prompts: [
      {
        question: 'The key to winning me over',
        answer: 'Tell me about a quirky passionate project you built or a book that completely changed your mind.'
      }
    ],
    voiceBioSeconds: 16,
    voiceBioTitle: 'Quick voice snippet on my weekend vibe',
    verified: true,
    verificationBadge: 'Aadhaar Verified',
    safetyScore: 97,
    compatibilityScore: 95,
    height: '5\' 7"',
    languages: ['Gujarati', 'Hindi', 'English', 'French'],
    lifestyle: {
      smoking: 'Never',
      drinking: 'Socially',
      workout: 'Half marathon runner',
      pets: 'Dog lover'
    }
  },
  {
    id: 'girl_5',
    name: 'Riya Joshi',
    age: 23,
    gender: 'woman',
    city: 'Ahmedabad',
    distanceKm: 6,
    profession: 'Medical Intern & Food Explorer',
    education: 'BJ Medical College',
    qualification: {
      degree: 'Bachelor of Medicine & Surgery (MBBS)',
      field: 'Pediatrics & Community Medicine',
      college: 'B.J. Medical College & Civil Hospital, Ahmedabad',
      honors: 'Gold Medal in Pediatrics Clinicals'
    },
    relationshipIntent: '☕ Meaningful Dating & Emotional Connection',
    relationshipDescription: 'Life as a doctor is busy, so I cherish sincere moments, honest laughs, and finding comfort in someone special.',
    birthDate: '11 December 2001',
    zodiacSign: '♐ Sagittarius (Warm, Joyful & Free-Spirited)',
    dietaryPreference: '🌱 Pure Vegetarian',
    loveLanguage: 'Quality Time & Receiving Thoughtful Texts',
    communicationStyle: 'Responsive when off-shift, loves warm late-night calls and debriefing our days',
    idealFirstDate: 'A casual iced latte walk around Kankaria Lake or Ambawadi, completely relaxing with no hospital beeps.',
    greenFlags: ['Patient & understanding of demanding careers', 'Has a warm infectious smile', 'Loves animals', 'Authentic'],
    dealBreakers: ['Neediness/clinginess', 'Smoking', 'Disrespecting health workers', 'Lack of empathy'],
    hobbies: [
      { name: 'Badminton & Lawn Tennis', icon: '🏸', category: 'Sports' },
      { name: '90s Bollywood Unplugged', icon: '🎵', category: 'Music' },
      { name: 'Artisan Sourdough Pizza', icon: '🍕', category: 'Culinary' },
      { name: 'Sunset Cloud Watching', icon: '☁️', category: 'Mindfulness' },
      { name: 'Baking Warm Cinnamon Rolls', icon: '🧁', category: 'Baking' }
    ],
    bio: 'Future pediatrician with a soft spot for sourdough pizza, sunset skies, and 90s Bollywood songs 🎶. Looking for someone warm and genuine.',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Medicine', 'Foodie', 'Bollywood', 'Baking', 'Badminton'],
    prompts: [
      {
        question: 'First date vibe',
        answer: 'Casual iced coffee walk, zero pressure, lots of laughs and real talk.'
      }
    ],
    voiceBioSeconds: 10,
    voiceBioTitle: 'Hospital shifts to coffee sips ✨',
    verified: true,
    verificationBadge: 'Aadhaar Verified',
    safetyScore: 99,
    compatibilityScore: 91,
    height: '5\' 5"',
    languages: ['Gujarati', 'Hindi', 'English'],
    lifestyle: {
      smoking: 'Never',
      drinking: 'Never',
      workout: 'Badminton & Gym',
      pets: 'Cat enthusiast'
    }
  }
];

export const mockBoys: Profile[] = [
  {
    id: 'boy_1',
    name: 'Aarav Shah',
    age: 25,
    gender: 'man',
    city: 'Ahmedabad',
    distanceKm: 5,
    profession: 'Founder & Full-Stack Engineer',
    education: 'DA-IICT Gandhinagar',
    qualification: {
      degree: 'B.Tech (Honors) in Information & Communication Technology',
      field: 'Distributed Systems & Human-Computer Interaction',
      college: 'Dhirubhai Ambani Institute (DA-IICT), Gandhinagar',
      honors: 'Smart India Hackathon Winner'
    },
    relationshipIntent: '💍 Looking for Long-term & Meaningful Bond',
    relationshipDescription: 'I value emotional honesty, deep late-night conversations over tea, and supporting each other through life’s adventures.',
    birthDate: '07 July 1999',
    zodiacSign: '♋ Cancer (Empathetic, Loyal & Protective)',
    dietaryPreference: '🌱 Pure Vegetarian',
    loveLanguage: 'Quality Time & Acts of Service',
    communicationStyle: 'Direct and prompt texter, prefers spontaneous coffee dates',
    idealFirstDate: 'Cozy coffee shop in Bodakdev followed by sharing favorite playlist tracks.',
    greenFlags: ['Honest listener', 'Self-aware', 'Loves animals', 'Passionate about coding & music'],
    dealBreakers: ['Arrogance', 'Disrespecting boundaries', 'Smoking'],
    hobbies: [
      { name: 'Acoustic Guitar Composing', icon: '🎸', category: 'Music' },
      { name: 'Lawn Tennis Singles', icon: '🎾', category: 'Sports' },
      { name: 'Specialty V60 Coffee Brewing', icon: '☕', category: 'Culinary' },
      { name: 'Polo Forest Camping', icon: '⛺', category: 'Adventure' },
      { name: 'Indie Cinema Analysis', icon: '🎬', category: 'Media' }
    ],
    bio: 'Building AI tools by day, playing guitar and brewing pour-overs by evening. Big fan of indie cinema and tennis 🎾. Looking for a genuine connection.',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Tech', 'Guitar', 'Tennis', 'Coffee Brewing', 'Hiking'],
    prompts: [
      {
        question: 'My simple pleasures',
        answer: 'Fresh monsoon rain in Gujarat, a warm cup of masala tea, and finishing a great novel.'
      },
      {
        question: 'I take safety & respect seriously because',
        answer: 'Consent, mutual comfort, and verifying identity upfront create the foundation for any real connection.'
      }
    ],
    voiceBioSeconds: 15,
    voiceBioTitle: 'Hey there! A quick note on what I love building',
    verified: true,
    verificationBadge: 'Aadhaar Verified',
    safetyScore: 97,
    compatibilityScore: 95,
    height: '5\' 11"',
    languages: ['Gujarati', 'Hindi', 'English'],
    lifestyle: {
      smoking: 'Never',
      drinking: 'Occasionally',
      workout: 'Tennis 3x/week',
      pets: 'Love dogs'
    }
  },
  {
    id: 'boy_2',
    name: 'Rohan Desai',
    age: 26,
    gender: 'man',
    city: 'Surat',
    distanceKm: 9,
    profession: 'Diamond Jewelry Designer & Photographer',
    education: 'NIFT Mumbai',
    qualification: {
      degree: 'Master of Design (M.Des) - Lifestyle Accessories',
      field: 'Precious Gemology & Haute Joaillerie Design',
      college: 'National Institute of Fashion Technology (NIFT), Mumbai',
      honors: 'De Beers Young Diamond Designer Gold Award'
    },
    relationshipIntent: '✨ Marriage Minded / Soulmate Search',
    relationshipDescription: 'Family-centered, creative, and enthusiastic about building a warm home filled with laughter and traditional festivals.',
    birthDate: '15 May 1998',
    zodiacSign: '♉ Taurus (Dependable, Aesthetic & Grounded)',
    dietaryPreference: '🌱 Jain Vegetarian (Strict)',
    loveLanguage: 'Thoughtful Gifts & Quality Time',
    communicationStyle: 'Thoughtful voice notes and lovely photograph updates',
    idealFirstDate: 'Watching the sunset at Dumas, trying authentic Surat street snacks, and discussing our art philosophies.',
    greenFlags: ['Strong family ties', 'Calm temperament', 'Attentive', 'Gentlemanly manners'],
    dealBreakers: ['Dishonesty', 'Smoking', 'Impatience'],
    hobbies: [
      { name: 'Street Portrait Photography', icon: '📸', category: 'Visual Arts' },
      { name: 'Weekend Coastal Cycling', icon: '🚴', category: 'Fitness' },
      { name: 'Diamond Faceting & Sketching', icon: '💎', category: 'Design' },
      { name: 'Surat Heritage Walk Guiding', icon: '🏛️', category: 'Culture' },
      { name: 'Gujarati Traditional Folk Music', icon: '🪘', category: 'Music' }
    ],
    bio: 'Curating geometry in precious gems and capturing street portraits across Old Surat. Looking for a genuine spark and lifelong companionship.',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Photography', 'Fine Jewelry', 'Cycling', 'Art', 'Road Trips'],
    prompts: [
      {
        question: 'My ideal Sunday',
        answer: 'Early morning photography cycle ride to Dumas, Gujarati breakfast with jalebi-fafda, relaxing edit session.'
      }
    ],
    voiceBioSeconds: 18,
    voiceBioTitle: 'Notes from my design studio',
    verified: true,
    verificationBadge: 'Photo Verified',
    safetyScore: 94,
    compatibilityScore: 91,
    height: '6\' 0"',
    languages: ['Gujarati', 'Hindi', 'English'],
    lifestyle: {
      smoking: 'Never',
      drinking: 'Socially',
      workout: 'Cycling 20km/weekend',
      pets: 'Has a rescue pup'
    }
  },
  {
    id: 'boy_3',
    name: 'Kabir Mehta',
    age: 24,
    gender: 'man',
    city: 'Mumbai',
    distanceKm: 18,
    profession: 'Sound Designer & Music Composer',
    education: 'Whistling Woods International',
    qualification: {
      degree: 'B.A. in Music Production & Sound Engineering',
      field: 'Film Scoring & Audio Synthesis',
      college: 'Whistling Woods International Film School, Mumbai',
      honors: 'Best Student Sound Design - Mumbai International Film Festival'
    },
    relationshipIntent: '☕ Meaningful Dating & Mutual Inspiration',
    relationshipDescription: 'Looking for a creative soul who appreciates slow afternoons, vintage vinyl tunes, and honest conversation without masks.',
    birthDate: '22 February 2000',
    zodiacSign: '♓ Pisces (Intuitive, Romantic & Soulful)',
    dietaryPreference: '🌱 Pure Vegetarian',
    loveLanguage: 'Words of Affirmation & Shared Playlists',
    communicationStyle: 'Sends songs instead of words when emotions run deep, warm caller',
    idealFirstDate: 'Exploring vintage vinyl stores in South Bombay followed by Bun Maska & Irani Chai at Yazdani Bakery.',
    greenFlags: ['Emotional depth', 'Passionate about culture', 'Kind-hearted', 'Respects boundaries'],
    dealBreakers: ['Pretentiousness', 'Playing games', 'Disrespect towards creatives'],
    hobbies: [
      { name: 'Analog Cassette Tapes', icon: '📼', category: 'Music' },
      { name: 'Piano & Modular Synth', icon: '🎹', category: 'Composition' },
      { name: 'Irani Cafe Crawls', icon: '☕', category: 'Culinary' },
      { name: 'Swimming & Ocean Dips', icon: '🏊‍♂️', category: 'Sports' },
      { name: 'Classic World Cinema', icon: '🎞️', category: 'Film' }
    ],
    bio: 'Scoring films, collecting indie cassette tapes, and hunting down the best Irani cafe brunches in South Bombay.',
    photos: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Music', 'Cinema', 'Irani Cafes', 'Vinyl', 'Vinyl Records'],
    prompts: [
      {
        question: 'A song that describes my vibe',
        answer: 'Prateek Kuhad meets Amit Trivedi unplugged.'
      }
    ],
    voiceBioSeconds: 20,
    voiceBioTitle: 'A quick acoustic chord intro 🎸',
    verified: true,
    verificationBadge: 'Video Verified',
    safetyScore: 95,
    compatibilityScore: 89,
    height: '5\' 10"',
    languages: ['Gujarati', 'Hindi', 'English'],
    lifestyle: {
      smoking: 'Never',
      drinking: 'Socially',
      workout: 'Swimming & Running',
      pets: 'Cat friend'
    }
  },
  {
    id: 'boy_4',
    name: 'Siddharth Vora',
    age: 25,
    gender: 'man',
    city: 'Ahmedabad',
    distanceKm: 7,
    profession: 'Nutritionist & CrossFit Coach',
    education: 'Gujarat University',
    qualification: {
      degree: 'Master of Science (M.Sc) in Clinical Nutrition',
      field: 'Sports Physiology & Performance Dietetics',
      college: 'Gujarat University, Ahmedabad',
      honors: 'Certified Strength & Conditioning Specialist (CSCS)'
    },
    relationshipIntent: '💍 Long-term Relationship & Active Life Partner',
    relationshipDescription: 'Looking for a teammate in life. Someone who enjoys staying active, trying wholesome recipes, and cheering each other on.',
    birthDate: '04 September 1999',
    zodiacSign: '♍ Virgo (Grounded, Disciplined & Caring)',
    dietaryPreference: '🌱 Vegetarian with protein focus',
    loveLanguage: 'Acts of Service & Physical Touch',
    communicationStyle: 'Reliable, clear, punctual, loves morning greeting texts',
    idealFirstDate: 'Bouldering / rock climbing session or an evening acai smoothie walk.',
    greenFlags: ['Values physical & mental health', 'Optimistic', 'Encouraging', 'Great cook'],
    dealBreakers: ['Excessive complaining', 'Smoking', 'Lack of enthusiasm'],
    hobbies: [
      { name: 'CrossFit & Olympic Lifting', icon: '🏋️‍♂️', category: 'Fitness' },
      { name: 'Polo Forest Trekking', icon: '🌲', category: 'Outdoors' },
      { name: 'Nutritional Meal Prep Master', icon: '🥗', category: 'Culinary' },
      { name: 'Longevity & Health Podcasts', icon: '🎧', category: 'Wellness' },
      { name: 'Sunday Lawn Cricket', icon: '🏏', category: 'Sports' }
    ],
    bio: 'Passionate about mindful fitness, healthy wholesome cooking, and weekend treks in Polo Forest 🌲. Looking for an energetic, warm-hearted partner.',
    photos: [
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['CrossFit', 'Cooking', 'Trekking', 'Nutrition', 'Podcasts'],
    prompts: [
      {
        question: 'We will get along if',
        answer: 'You enjoy active dates like climbing, bowling, or cooking an elaborate multi-course dinner together.'
      }
    ],
    voiceBioSeconds: 14,
    voiceBioTitle: 'Warm greeting from the gym floor 💪',
    verified: true,
    verificationBadge: 'Aadhaar Verified',
    safetyScore: 98,
    compatibilityScore: 93,
    height: '6\' 1"',
    languages: ['Gujarati', 'Hindi', 'English'],
    lifestyle: {
      smoking: 'Never',
      drinking: 'Never',
      workout: 'CrossFit 5x/week',
      pets: 'Dogs & Wildlife enthusiast'
    }
  },
  {
    id: 'boy_5',
    name: 'Devraj Solanki',
    age: 27,
    gender: 'man',
    city: 'Vadodara',
    distanceKm: 14,
    profession: 'Heritage Restoration Architect',
    education: 'CEPT University',
    qualification: {
      degree: 'Master of Architecture (M.Arch - Architectural Conservation)',
      field: 'Historic Brick & Wood Haveli Restoration',
      college: 'Centre for Environmental Planning and Technology (CEPT), Ahmedabad',
      honors: 'UNESCO Asia-Pacific Heritage Award Commendation'
    },
    relationshipIntent: '✨ Marriage Minded & Lifelong Commitment',
    relationshipDescription: 'Deeply connected to roots and heritage. Searching for a kind, cultured soul to travel old towns and create memories together.',
    birthDate: '12 January 1997',
    zodiacSign: '♑ Capricorn (Steadfast, Visionary & Cultured)',
    dietaryPreference: '🌱 Pure Vegetarian',
    loveLanguage: 'Quality Time & Hand-written Notes',
    communicationStyle: 'Warm, patient, loves in-person conversations over evening tea',
    idealFirstDate: 'Strolling through old pols of Ahmedabad or Vadodara heritage stepwells with watercolor notebooks.',
    greenFlags: ['Values roots and culture', 'Gentle-mannered', 'Honors commitments', 'Generous heart'],
    dealBreakers: ['Materialism', 'Disrespecting traditions', 'Dishonesty'],
    hobbies: [
      { name: 'Haveli Restoration Research', icon: '🏛️', category: 'Architecture' },
      { name: 'Plein-Air Watercoloring', icon: '🎨', category: 'Art' },
      { name: 'Rural Gujarat Roadtrips', icon: '🚙', category: 'Travel' },
      { name: 'Ghazal & Sufi Musical Nights', icon: '🎵', category: 'Music' },
      { name: 'Campfires in Dang Forest', icon: '🔥', category: 'Nature' }
    ],
    bio: 'Restoring centuries-old Haveli architecture in Gujarat. Love watercolor sketches, folk traditions, and road trips.',
    photos: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Heritage', 'Architecture', 'Watercolors', 'History', 'Campfires'],
    prompts: [
      {
        question: 'My secret talent',
        answer: 'I can tell you the century and masonry style of any heritage monument in Gujarat within 10 seconds.'
      }
    ],
    voiceBioSeconds: 17,
    voiceBioTitle: 'Stories from old Pols of Ahmedabad',
    verified: true,
    verificationBadge: 'Photo Verified',
    safetyScore: 96,
    compatibilityScore: 88,
    height: '5\' 10"',
    languages: ['Gujarati', 'Hindi', 'English'],
    lifestyle: {
      smoking: 'Never',
      drinking: 'Never',
      workout: 'Trekking & Walking',
      pets: 'Nature lover'
    }
  },
  {
    id: 'boy_6',
    name: 'Tirth Joshi',
    age: 24,
    gender: 'man',
    city: 'Ahmedabad',
    distanceKm: 3,
    profession: 'Digital Creator & Content Strategist',
    education: 'MICA Ahmedabad',
    qualification: {
      degree: 'Post Graduate Diploma in Management - Communications (PGDM-C)',
      field: 'Digital Storytelling & Cultural Branding',
      college: 'MICA (Mudra Institute of Communications), Ahmedabad',
      honors: 'Top Creative Pitch Award'
    },
    relationshipIntent: '☕ Casual Dating & Creative Chemistry',
    relationshipDescription: 'Looking for a witty partner who loves spontaneous cafe hops, witty banter, and isn’t afraid to be completely weird together.',
    birthDate: '30 November 1999',
    zodiacSign: '♐ Sagittarius (Humorous, Spontaneous & Friendly)',
    dietaryPreference: '🌱 Pure Vegetarian (Street food fanatic)',
    loveLanguage: 'Humor, Shared Giggles & Quality Food',
    communicationStyle: 'Super active texter, sends voice memos and funny Instagram reels',
    idealFirstDate: 'Exploring the Manek Chowk night market for chocolate sandwich & rabdi kulfi while debating pop culture.',
    greenFlags: ['Great sense of humor', 'Can laugh at themselves', 'Adventurous palate', 'Supportive'],
    dealBreakers: ['Taking life too seriously', 'Rudeness', 'Judgmental attitude'],
    hobbies: [
      { name: 'Short Documentary Filmmaking', icon: '🎥', category: 'Creative' },
      { name: 'Midnight Street Food Hunting', icon: '🍜', category: 'Food' },
      { name: 'Stand-up Comedy Nights', icon: '🎤', category: 'Entertainment' },
      { name: 'Board Games & Trivia', icon: '🎲', category: 'Social' },
      { name: 'Spontaneous Highway Drives', icon: '🚗', category: 'Travel' }
    ],
    bio: 'Making witty reels about life in Gujarat. Looking for someone with an appetite for street food, hearty laughs, and deep discussions.',
    photos: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Filmmaking', 'Street Food', 'Standup Comedy', 'Podcasts', 'Travel'],
    prompts: [
      {
        question: 'First round is on me if',
        answer: 'You know where to find the crispest Khaman in town before 8 AM.'
      }
    ],
    voiceBioSeconds: 12,
    voiceBioTitle: 'Voice check: 1, 2, 3! ✨',
    verified: true,
    verificationBadge: 'Aadhaar Verified',
    safetyScore: 95,
    compatibilityScore: 90,
    height: '5\' 9"',
    languages: ['Gujarati', 'Hindi', 'English'],
    lifestyle: {
      smoking: 'Never',
      drinking: 'Occasionally',
      workout: 'Gym 3x/week',
      pets: 'Loves dogs'
    }
  }
];

/**
 * Generates the curated deck honoring the user's specific ratio rule:
 * In Normal Duo Mode for boys:
 * "10 swipe ma 2 to 1 girl aavvi pade" (meaning in 10 swipes, 2-3 verified girls guaranteed,
 * mixed with duo discovery candidates and smart prioritization).
 * For girls: Curated verified boys with high safety scores and priority matching!
 */
export function generateCuratedDeck(currentViewerGender: 'man' | 'woman'): Profile[] {
  if (currentViewerGender === 'woman') {
    // When a woman browses: show top verified male profiles
    return [...mockBoys].sort((a, b) => b.safetyScore - a.safetyScore);
  }

  // When a man browses in Duo Mode:
  // User explicit instruction: "normal duo mode ma girl and boy koi pan aavi sake pn duo mode ma most off boy j aavva pade (meaning : 10swipe ma 2 to 1 girl aavvi pade)"
  // So every batch of 10 items contains 2 to 3 girls and 7 to 8 boys/duo candidates!
  const deck: Profile[] = [];
  const girlsPool = [...mockGirls];
  const boysPool = [...mockBoys];

  let girlIdx = 0;
  let boyIdx = 0;

  // Pattern: 2 boys -> 1 girl -> 3 boys -> 1 girl -> 3 boys (gives exactly 2-3 girls in 10 cards)
  const pattern = ['boy', 'boy', 'girl', 'boy', 'boy', 'boy', 'girl', 'boy', 'boy', 'boy'];

  for (let i = 0; i < 20; i++) {
    const targetType = pattern[i % pattern.length];
    if (targetType === 'girl') {
      const girl = girlsPool[girlIdx % girlsPool.length];
      deck.push({ ...girl, id: `${girl.id}_d_${i}` });
      girlIdx++;
    } else {
      const boy = boysPool[boyIdx % boysPool.length];
      deck.push({ ...boy, id: `${boy.id}_d_${i}` });
      boyIdx++;
    }
  }

  return deck;
}
