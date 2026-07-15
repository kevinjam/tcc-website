import { ChurchEvent, Branch, GalleryItem, Program, Devotion, LiveStreamConfig, ChurchInfo, JoinSubmission } from './types';
import { churchInfo, initialEvents, initialBranches, initialPrograms, initialGallery, defaultLiveStream, initialDevotions } from './initialData';

// Keys for Local Storage
const KEYS = {
  INFO: 'tcc_church_info',
  EVENTS: 'tcc_events',
  BRANCHES: 'tcc_branches',
  PROGRAMS: 'tcc_programs',
  GALLERY: 'tcc_gallery',
  LIVESTREAM: 'tcc_livestream',
  DEVOTIONS: 'tcc_devotions',
  SUBMISSIONS: 'tcc_submissions'
};

export const getStoredChurchInfo = (): ChurchInfo => {
  const data = localStorage.getItem(KEYS.INFO);
  return data ? JSON.parse(data) : churchInfo;
};

export const saveStoredChurchInfo = (info: ChurchInfo): void => {
  localStorage.setItem(KEYS.INFO, JSON.stringify(info));
};

export const getStoredEvents = (): ChurchEvent[] => {
  const data = localStorage.getItem(KEYS.EVENTS);
  return data ? JSON.parse(data) : initialEvents;
};

export const saveStoredEvents = (events: ChurchEvent[]): void => {
  localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
};

export const getStoredBranches = (): Branch[] => {
  const data = localStorage.getItem(KEYS.BRANCHES);
  return data ? JSON.parse(data) : initialBranches;
};

export const saveStoredBranches = (branches: Branch[]): void => {
  localStorage.setItem(KEYS.BRANCHES, JSON.stringify(branches));
};

export const getStoredPrograms = (): Program[] => {
  const data = localStorage.getItem(KEYS.PROGRAMS);
  return data ? JSON.parse(data) : initialPrograms;
};

export const saveStoredPrograms = (programs: Program[]): void => {
  localStorage.setItem(KEYS.PROGRAMS, JSON.stringify(programs));
};

export const getStoredGallery = (): GalleryItem[] => {
  const data = localStorage.getItem(KEYS.GALLERY);
  return data ? JSON.parse(data) : initialGallery;
};

export const saveStoredGallery = (gallery: GalleryItem[]): void => {
  localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
};

export const getStoredLiveStream = (): LiveStreamConfig => {
  const data = localStorage.getItem(KEYS.LIVESTREAM);
  return data ? JSON.parse(data) : defaultLiveStream;
};

export const saveStoredLiveStream = (config: LiveStreamConfig): void => {
  localStorage.setItem(KEYS.LIVESTREAM, JSON.stringify(config));
};

export const getStoredDevotions = (): Devotion[] => {
  const data = localStorage.getItem(KEYS.DEVOTIONS);
  return data ? JSON.parse(data) : initialDevotions;
};

export const saveStoredDevotions = (devotions: Devotion[]): void => {
  localStorage.setItem(KEYS.DEVOTIONS, JSON.stringify(devotions));
};

export const getStoredSubmissions = (): JoinSubmission[] => {
  const data = localStorage.getItem(KEYS.SUBMISSIONS);
  return data ? JSON.parse(data) : [];
};

export const saveStoredSubmissions = (submissions: JoinSubmission[]): void => {
  localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify(submissions));
};

export const resetAllToDefault = (): void => {
  localStorage.removeItem(KEYS.INFO);
  localStorage.removeItem(KEYS.EVENTS);
  localStorage.removeItem(KEYS.BRANCHES);
  localStorage.removeItem(KEYS.PROGRAMS);
  localStorage.removeItem(KEYS.GALLERY);
  localStorage.removeItem(KEYS.LIVESTREAM);
  localStorage.removeItem(KEYS.DEVOTIONS);
  // We keep user submissions so they don't get accidentally wiped, but can be reset in CMS UI
};
