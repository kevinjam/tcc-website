export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'Service' | 'Youth' | 'Prayer' | 'Community' | 'Brigade' | 'Outreach';
  isFeatured?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  pastor: string;
  phone: string;
  email: string;
  description?: string;
  isHeadquarters?: boolean;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'Worship' | 'Youth' | 'Brigade' | 'Community' | 'Outreach' | 'Media';
  date: string;
}

export interface Program {
  id: string;
  name: string;
  day: string;
  time: string;
  description: string;
  location: string;
}

export interface Devotion {
  id: string;
  date: string;
  title: string;
  scripture: string;
  content: string;
  author: string;
}

export interface JoinSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  interestArea: string; // e.g. "Choir", "Youth", "Brigade", "Prayer Group", "Just Joining"
  status: 'New' | 'Contacted' | 'Archived';
}

export interface LiveStreamConfig {
  videoUrl: string; // YouTube video ID or embed URL
  radioUrl: string; // Audio stream URL for in-page player
  radioSiteUrl?: string; // Public radio site for redirects
  isLiveVideo: boolean;
  isLiveRadio: boolean;
  videoTitle: string;
  radioTitle: string;
  activeSpeaker: string;
}

export interface ChurchInfo {
  aboutText: string;
  historyText: string;
  visionText: string;
  missionText: string;
  aimsText: string[];
  brigadeBoysText: string;
  brigadeGirlsText: string;
}
