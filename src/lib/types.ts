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

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  location: {
    area: string;
    city: City;
    landmark: string;
    distanceKm: number;
  };
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
  isFeatured: boolean;
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
}
