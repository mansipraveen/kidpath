// Activity Service - connects to ACTIVE.com Kids API
// Using mock data for development, swap to real API calls for production

const MOCK_ACTIVITIES = [
  {
    id: '1',
    name: 'Junior Soccer League',
    provider: 'Seattle Youth Sports',
    category: 'sports',
    distance: 1.2,
    ageRange: '5-8',
    price: 120,
    description:
      'A fun and engaging soccer program designed for beginners. Kids will learn basic skills, teamwork, and sportsmanship in a supportive environment. No experience needed!',
    schedule: 'Saturdays, 9:00 AM - 10:30 AM (8 weeks)',
    address: '1234 Park Ave, Seattle, WA 98101',
    url: 'https://example.com/signup/soccer',
  },
  {
    id: '2',
    name: 'Creative Kids Art Studio',
    provider: 'Artful Minds Academy',
    category: 'arts',
    distance: 2.5,
    ageRange: '4-10',
    price: 85,
    description:
      'Explore painting, sculpture, and mixed media in our fully equipped art studio. Each week features a new technique and project that kids take home!',
    schedule: 'Wednesdays, 3:30 PM - 5:00 PM (6 weeks)',
    address: '567 Creative Blvd, Seattle, WA 98102',
    url: 'https://example.com/signup/art',
  },
  {
    id: '3',
    name: 'Coding for Kids: Scratch & Beyond',
    provider: 'TechKids Seattle',
    category: 'stem',
    distance: 3.1,
    ageRange: '7-12',
    price: 150,
    description:
      'Introduction to programming using Scratch, followed by basic Python. Kids build games, animations, and interactive stories while learning computational thinking.',
    schedule: 'Tuesdays & Thursdays, 4:00 PM - 5:30 PM (8 weeks)',
    address: '890 Innovation Dr, Seattle, WA 98103',
    url: 'https://example.com/signup/coding',
  },
  {
    id: '4',
    name: 'Little Musicians Piano Class',
    provider: 'Harmony Music School',
    category: 'music',
    distance: 1.8,
    ageRange: '5-9',
    price: 200,
    description:
      'Group piano lessons in a fun, encouraging setting. Kids learn to read music, play simple songs, and develop a love for music. Keyboards provided during class.',
    schedule: 'Mondays, 4:00 PM - 4:45 PM (10 weeks)',
    address: '321 Melody Lane, Seattle, WA 98104',
    url: 'https://example.com/signup/piano',
  },
  {
    id: '5',
    name: 'Hip Hop Dance Crew',
    provider: 'Move It Dance Studio',
    category: 'dance',
    distance: 4.2,
    ageRange: '6-11',
    price: 95,
    description:
      'High-energy hip hop classes where kids learn choreography, freestyle, and performance skills. End-of-session showcase for family and friends!',
    schedule: 'Fridays, 5:00 PM - 6:00 PM (8 weeks)',
    address: '456 Rhythm St, Seattle, WA 98105',
    url: 'https://example.com/signup/dance',
  },
  {
    id: '6',
    name: 'Nature Explorers Camp',
    provider: 'Green Trails Outdoor Education',
    category: 'outdoors',
    distance: 5.0,
    ageRange: '6-12',
    price: 175,
    description:
      'Hands-on outdoor education including nature hikes, plant identification, wildlife observation, and basic survival skills. All gear provided.',
    schedule: 'Saturdays, 10:00 AM - 1:00 PM (6 weeks)',
    address: '789 Forest Trail, Seattle, WA 98106',
    url: 'https://example.com/signup/nature',
  },
];

/**
 * Search for kids' activities by location and category
 * Currently uses mock data - replace with ACTIVE.com API in production
 */
export async function searchActivities(zipCode, category = null) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let results = [...MOCK_ACTIVITIES];

  // Filter by category if specified
  if (category) {
    results = results.filter((a) => a.category === category);
  }

  return results;
}

/**
 * Get activity details by ID
 */
export async function getActivityById(id) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_ACTIVITIES.find((a) => a.id === id) || null;
}

// ============================================================
// TODO: Replace mock data with real ACTIVE.com API calls
// ============================================================
// 
// Real API integration would look like:
//
// const API_BASE = 'http://api.amp.active.com/v2/search';
// const API_KEY = 'YOUR_API_KEY'; // Get from developer.active.com
//
// export async function searchActivities(zipCode, category) {
//   const params = new URLSearchParams({
//     near: zipCode,
//     radius: 25,
//     category: 'activities',
//     kids: true,
//     api_key: API_KEY,
//   });
//   if (category) params.append('topic', category);
//
//   const response = await fetch(`${API_BASE}?${params}`);
//   const data = await response.json();
//   return data.results.map(mapApiToActivity);
// }
