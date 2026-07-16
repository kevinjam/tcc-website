import { Branch } from './types';

/** Branch photos in public/branches/ — keyed by branch id */
export const BRANCH_PHOTO_BY_ID: Record<string, string> = {
  'br-1': '/branches/Main-Branch.png',
  'br-2': '/branches/Namiyembe.png',
  'br-3': '/branches/Mijinje.jpg',
  'br-4': '/branches/Iganga.png',
  'br-5': '/branches/Kyegegwa.jpg',
  'br-6': '/branches/Nansanga.jpg',
  'br-7': '/branches/Kitagwenda.png',
  'br-8': '/branches/Kasanda.png',
};

export function getBranchPhotoUrl(branch: Branch): string {
  if (BRANCH_PHOTO_BY_ID[branch.id]) {
    return BRANCH_PHOTO_BY_ID[branch.id];
  }

  const slug = branch.name.replace(/\s*\(.*?\)\s*/g, '').replace(/\s+Branch$/i, '').trim();
  return `/branches/${slug.replace(/\s+/g, '-')}.png`;
}

export function branchExcerpt(text: string | undefined, maxLength = 120): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}
