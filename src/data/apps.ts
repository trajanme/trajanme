export type Platform = 'iOS' | 'Android' | 'Web';

export interface AppInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  bgColor: string;
  icon: string;
  contactEmail: string;
  platforms: Platform[];
  version?: string;
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
    icon: '/images/picolle-icon.png',
    contactEmail: 'support@daywizz.com',
    platforms: ['iOS'],
    version: 'v1.1.0',
    appStoreUrl: 'https://apps.apple.com/us/app/picolle-%E3%83%94%E3%82%B3%E3%83%AC-%E5%B0%8F%E3%81%95%E3%81%AA%E8%8A%B8%E8%A1%93%E5%AE%B6%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E7%BE%8E%E8%A1%93%E9%A4%A8/id6758279279',
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
    icon: '/images/pawsteps-icon.png',
    contactEmail: 'support@daywizz.com',
    platforms: ['iOS'],
    version: 'v1.1.0',
    appStoreUrl: 'https://apps.apple.com/jp/app/%E6%AD%A9%E6%95%B0%E8%A8%88-pawsteps-%E5%8F%AF%E6%84%9B%E3%81%84%E7%8A%AC%E3%82%AD%E3%83%A3%E3%83%A9%E3%81%A8%E3%82%A6%E3%82%A9%E3%83%BC%E3%82%AD%E3%83%B3%E3%82%B0/id6747422609',
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
    icon: '',
    contactEmail: 'shintaro@daywizz.com',
    platforms: ['iOS', 'Android'],
    pages: { support: false, privacy: false, terms: false, tokushoho: false },
    released: false,
  },
};

export const appList = Object.values(apps);
export const releasedApps = appList.filter(app => app.released);
