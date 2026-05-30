import type { NeighborhoodGuide } from './types';

export const neighborhoodGuides: NeighborhoodGuide[] = [
  {
    slug: 'lekki-phase-1',
    name: 'Lekki Phase 1',
    city: 'Lagos',
    tagline: 'Lagos at sea level.',
    hero: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80',
    intro:
      'A planned estate east of the Lekki–Epe Expressway. Wide grid streets, mostly four-storey blocks, generators humming behind every gate. The closest thing Lagos has to a quiet coastal suburb.',
    characterParas: [
      'Lekki Phase 1 grew up fast — most of what stands today was built after 2010. The result is uneven: glass-fronted apartment blocks next to half-finished projects, with the Atlantic always two streets away. The Admiralty Way corridor concentrates restaurants and gyms; the inner streets are residential.',
      "Roads inside the estate are paved and mostly drivable. The expressway out is the choke point — traffic peaks at 7:30am and 5pm, and the Lekki Toll Plaza is the dividing line everyone uses as a landmark. Rain causes flooding in the lowest streets, especially during June and October.",
    ],
    vibes: ['Young professional', 'Expat-friendly', 'Beach-adjacent', 'Restaurant scene'],
    pros: [
      'Well-paved, planned streets',
      'Closest to the beach in Lagos proper',
      'Most rentals have full backup power',
      'Walkable to multiple supermarkets and gyms',
    ],
    watchouts: [
      'Expressway traffic in and out — plan around peaks',
      'Lower streets flood in heavy rain',
      'Service charges are above the Lagos average',
    ],
    averageRent: [
      { type: 'Self-con', price: '₦1.1M – ₦1.6M' },
      { type: '1-bedroom', price: '₦1.8M – ₦2.4M' },
      { type: '2-bedroom', price: '₦2.5M – ₦4M' },
      { type: '3-bedroom', price: '₦3.5M – ₦6M' },
      { type: '4-bed duplex', price: '₦7M – ₦12M' },
    ],
    goodFor: [
      'Young professionals working on the Island',
      'Couples without children',
      'Anyone who values quick access to the beach',
    ],
    commute: [
      { to: 'Victoria Island', time: '20–35 min' },
      { to: 'Ikoyi', time: '25–40 min' },
      { to: 'Lekki Toll', time: '5–10 min' },
      { to: 'Lagos Mainland', time: '60–90 min' },
    ],
    spots: [
      { kind: 'Supermarket', name: 'Shoprite, Circle Mall' },
      { kind: 'Hospital', name: 'Reddington Hospital' },
      { kind: 'Coffee', name: "Cafe Neo, Admiralty Way" },
      { kind: 'Gym', name: 'i-Fitness Lekki' },
      { kind: 'School', name: 'Greensprings, Lekki' },
    ],
    coords: { lat: 6.4391, lng: 3.4862 },
  },
  {
    slug: 'yaba',
    name: 'Yaba',
    city: 'Lagos',
    tagline: 'Lagos’s student-and-tech mainland.',
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80',
    intro:
      "Older, denser, and more affordable than the Island — Yaba carries the University of Lagos crowd, the Co-Creation Hub, and a tech scene that's been here since 2011. Streets are narrower, the pace is faster, and rent runs about half of Lekki for similar sqm.",
    characterParas: [
      'Yaba is the entry point for most young Lagosians moving out of family homes. Self-cons and mini-flats dominate the rental supply, mostly in 4–6 unit blocks behind unpaved or partly-paved streets.',
      'Sabo Market is the commercial spine, but the area extends to Akoka in the north (closer to Unilag) and Adekunle in the south (closer to Third Mainland Bridge). Public transport is plentiful — danfo and BRT both serve the area heavily.',
    ],
    vibes: ['Student', 'Tech-startup', 'Walkable', 'Mainland energy'],
    pros: [
      'Most affordable rents on this list',
      'Walking distance to Unilag and Yaba Tech',
      'Strong public-transport options',
      'Dense food and street-market scene',
    ],
    watchouts: [
      'Mains power is unreliable — budget for a generator or inverter',
      'Streets congest during school terms',
      'Older buildings — inspect carefully for damp and wiring',
    ],
    averageRent: [
      { type: 'Self-con', price: '₦450k – ₦750k' },
      { type: 'Mini-flat', price: '₦700k – ₦1.1M' },
      { type: '1-bedroom', price: '₦900k – ₦1.4M' },
      { type: '2-bedroom', price: '₦1.4M – ₦2.2M' },
    ],
    goodFor: [
      'University students and recent graduates',
      'Engineers working at tech companies near CcHub',
      'Anyone who needs Third Mainland Bridge access daily',
    ],
    commute: [
      { to: 'Unilag', time: '5–15 min' },
      { to: 'Victoria Island', time: '45–70 min' },
      { to: 'Ikeja', time: '30–50 min' },
      { to: 'Surulere', time: '15–25 min' },
    ],
    spots: [
      { kind: 'Workspace', name: 'Co-Creation Hub' },
      { kind: 'Market', name: 'Sabo Market' },
      { kind: 'Hospital', name: 'LUTH Idi-Araba' },
      { kind: 'Mall', name: 'Tejuosho Ultra-Modern' },
      { kind: 'Coffee', name: 'Stranger Lagos' },
    ],
    coords: { lat: 6.5057, lng: 3.3754 },
  },
  {
    slug: 'ikoyi',
    name: 'Ikoyi',
    city: 'Lagos',
    tagline: 'Old-money Lagos, kept quiet.',
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80',
    intro:
      'Diplomats, judges, and a handful of long-time families occupy Ikoyi. The streets are wide, the trees are mature, and the rent is the highest in Lagos. What you pay for is space, security, and the absence of traffic noise.',
    characterParas: [
      'Most buildings are low-rise mid-century blocks or new luxury duplexes, often behind a Lekki-style estate gate. The Bourdillon and Glover Road corridors carry the highest-value real estate; Old Ikoyi is residential through and through.',
      'Ikoyi connects directly to Victoria Island over Falomo Bridge and to the Mainland via Third Mainland Bridge — but never feels as busy as either. Restaurants are quieter and more expensive; the Ikoyi Club is the social anchor.',
    ],
    vibes: ['Diplomatic', 'Quiet', 'Old-money', 'Family-friendly'],
    pros: [
      'Lowest noise in Lagos proper',
      'Mature, tree-lined streets',
      'Walkable Ikoyi Club, Polo Club, Falomo Centre',
      'Stable power and well-managed estates',
    ],
    watchouts: [
      'Some of the highest rents in Nigeria',
      'Limited mid-range options — supply skews high-end',
      'Restaurant scene is thin compared to Lekki',
    ],
    averageRent: [
      { type: '1-bedroom', price: '₦3M – ₦5M' },
      { type: '2-bedroom', price: '₦4.5M – ₦7M' },
      { type: '3-bedroom', price: '₦6M – ₦10M' },
      { type: '4-bed duplex', price: '₦12M – ₦25M' },
    ],
    goodFor: [
      'Families with children attending nearby schools',
      'Diplomatic and corporate executives',
      'Anyone who values quiet over convenience',
    ],
    commute: [
      { to: 'Victoria Island', time: '10–15 min' },
      { to: 'Lekki Phase 1', time: '20–35 min' },
      { to: 'Lagos Mainland', time: '40–60 min' },
    ],
    spots: [
      { kind: 'Club', name: 'Ikoyi Club 1938' },
      { kind: 'Mall', name: 'Falomo Shopping Centre' },
      { kind: 'Hospital', name: 'Reddington Multi-Specialist' },
      { kind: 'School', name: 'Greensprings Anthony, Corona Ikoyi' },
      { kind: 'Park', name: 'Muri Okunola Park (nearby)' },
    ],
    coords: { lat: 6.453, lng: 3.429 },
  },
  {
    slug: 'bodija',
    name: 'Bodija',
    city: 'Ibadan',
    tagline: 'Ibadan’s academic quarter.',
    hero: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80',
    intro:
      'Built in the 1960s for University of Ibadan staff, Bodija remains the most settled residential area in Ibadan. Bungalows and modest duplexes on large plots, wide streets, and rent that runs a fraction of Lagos.',
    characterParas: [
      'Bodija divides into Old Bodija (closer to UI, larger plots, more mature trees) and New Bodija (denser, more recent). The market is a landmark in its own right — wholesale produce that supplies most of the city.',
      'Public power is more reliable here than in Lagos, though the average is still around 14 hours a day. Most rentals come without a generator, so plan for an inverter at minimum.',
    ],
    vibes: ['Academic', 'Quiet', 'Suburban', 'Family-first'],
    pros: [
      'Generous plot sizes, mature trees',
      'Lowest rent on this list',
      'Bodija Market on your doorstep for fresh food',
      'More predictable power than Lagos',
    ],
    watchouts: [
      'Slower internet — Spectranet and MTN only',
      'Limited evening dining scene',
      'You’ll likely need a car',
    ],
    averageRent: [
      { type: 'Self-con', price: '₦300k – ₦500k' },
      { type: 'Mini-flat', price: '₦500k – ₦800k' },
      { type: '2-bedroom', price: '₦800k – ₦1.4M' },
      { type: '3-bed bungalow', price: '₦1.3M – ₦2.2M' },
    ],
    goodFor: [
      'University staff and graduate students',
      'Families with school-age children',
      'Remote workers wanting space without Lagos prices',
    ],
    commute: [
      { to: 'University of Ibadan', time: '5–10 min' },
      { to: 'Mokola', time: '10–15 min' },
      { to: 'Dugbe Market', time: '15–25 min' },
      { to: 'Lagos (by road)', time: '2h – 3h' },
    ],
    spots: [
      { kind: 'Market', name: 'Bodija Market' },
      { kind: 'Hospital', name: 'University College Hospital' },
      { kind: 'Coffee', name: 'Cafe Lalita, Bodija' },
      { kind: 'School', name: 'International School Ibadan' },
      { kind: 'Park', name: 'Agodi Gardens (10 min)' },
    ],
    coords: { lat: 7.4474, lng: 3.9099 },
  },
];

export const findGuide = (slug: string) =>
  neighborhoodGuides.find((g) => g.slug === slug);
