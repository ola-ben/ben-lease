export type PropertyType =
  | 'apartment'
  | 'duplex'
  | 'self-con'
  | 'bungalow'
  | 'mini-flat';

export type City = 'Lagos' | 'Abuja' | 'Ibadan';

export interface Landlord {
  name: string;
  isDirect: boolean;
  listingsCount: number;
  avatarTint: string;
}

export interface Utilities {
  powerHoursDay: number;
  generatorBackup: 'none' | 'partial' | 'full';
  borehole: boolean;
  internet: string[];
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  location: {
    area: string;
    city: City;
    landmark: string;
    distanceKm: number;
    lat: number;
    lng: number;
  };
  utilities?: Utilities;
  pricePerYear: number;
  serviceCharge: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  furnished: boolean;
  leaseMonthsMin: number;
  amenities: string[];
  landlord: Landlord;
  verifiedAt: string;
  images: string[];
  videoId?: string;
  videoDurationSec?: number;
  isFeatured: boolean;
  isNegotiable?: boolean;
  description: string[];
  nearby: { name: string; distanceKm: number }[];
  testimonial?: { quote: string; author: string };
}

export type ApplicationStatus =
  | 'under-review'
  | 'inspection-scheduled'
  | 'approved'
  | 'declined';

export interface Application {
  id: string;
  propertyId: string;
  status: ApplicationStatus;
  appliedAt: string;
  reference: string;
  timeline: { label: string; at: string; done: boolean }[];
}

export interface Neighborhood {
  name: string;
  city: City;
  listingCount: number;
  image: string;
  size: 'large' | 'small';
  slug?: string;
}

export interface NeighborhoodGuide {
  slug: string;
  name: string;
  city: City;
  tagline: string;
  hero: string;
  intro: string;
  characterParas: string[];
  vibes: string[];
  pros: string[];
  watchouts: string[];
  averageRent: { type: string; price: string }[];
  goodFor: string[];
  commute: { to: string; time: string }[];
  spots: { kind: string; name: string }[];
  coords: { lat: number; lng: number };
}
