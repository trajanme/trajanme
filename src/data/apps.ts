export type Platform = 'iOS' | 'Android' | 'Web';

export interface AppInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  bgColor: string;
  contactEmail: string;
  platforms: Platform[];
  appStoreUrl?: string;
  playStoreUrl?: string;
  pages: {
    support: boolean;
    privacy: boolean;
    terms: boolean;
    tokushoho: boolean;
  };
  released: boolean;
}

export const apps: Record<string, AppInfo> = {
  picolle: {
    id: 'picolle',
    name: 'picolle.',
    tagline: 'お子さまの作品を、美術館の展示風に。',
    description: 'お子さまが作った折り紙、粘土、イラストなどの作品を撮影し、美術館の展示風フレームで特別感を演出しながら保存・共有できるアプリです。',
    color: 'picolle',
    bgColor: 'picolle-bg',
    contactEmail: 'support@daywizz.com',
    platforms: ['iOS'],
    pages: { support: true, privacy: true, terms: true, tokushoho: true },
    released: true,
  },
  pawsteps: {
    id: 'pawsteps',
    name: 'PawSteps',
    tagline: 'ペットとの散歩をもっと楽しく',
    description: 'ペットとの散歩を記録し、健康管理に役立てるアプリです。',
    color: 'pawsteps',
    bgColor: 'pawsteps-bg',
    contactEmail: 'support@daywizz.com',
    platforms: ['iOS'],
    pages: { support: true, privacy: true, terms: true, tokushoho: false },
    released: true,
  },
  omiya: {
    id: 'omiya',
    name: 'omiya',
    tagline: '日本のおみやげ文化を世界へ',
    description: '訪日観光客向けのお土産紹介アプリです。',
    color: 'omiya',
    bgColor: 'omiya-bg',
    contactEmail: 'shintaro@daywizz.com',
    platforms: ['iOS', 'Android'],
    pages: { support: false, privacy: false, terms: false, tokushoho: false },
    released: false,
  },
};

export const appList = Object.values(apps);
export const releasedApps = appList.filter(app => app.released);
