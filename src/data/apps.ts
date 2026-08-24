import appStore from './app-store.json';

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
  releaseDate?: string;
  appStoreId?: string;
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
    name: 'Picolle.',
    tagline: 'お子さまの作品を、美術館の展示風に。',
    description: 'お子さまの絵や工作を撮って「個展」に。AI学芸員ルゥのメモ、制作時の年齢記録、家族共有で、小さな芸術家の成長を残せるアプリです。',
    color: 'picolle',
    bgColor: 'picolle-bg',
    icon: '/images/picolle-icon.png',
    contactEmail: 'support@daywizz.com',
    platforms: ['iOS'],
    version: `v${appStore.picolle.version}`,
    releaseDate: appStore.picolle.releaseDate,
    appStoreId: appStore.picolle.id,
    appStoreUrl: 'https://apps.apple.com/jp/app/id6758279279',
    pages: { support: true, privacy: true, terms: true, tokushoho: true },
    released: true,
  },
  pawsteps: {
    id: 'pawsteps',
    name: 'PawSteps',
    tagline: 'かわいい犬と歩く、習慣がつづく歩数計',
    description: '10犬種のキャラクターと一緒に歩き、ミッションやごはん、日々変わるセリフを楽しみながら健康習慣を育てる歩数計アプリです。',
    color: 'pawsteps',
    bgColor: 'pawsteps-bg',
    icon: '/images/pawsteps-icon.png',
    contactEmail: 'support@daywizz.com',
    platforms: ['iOS'],
    version: `v${appStore.pawsteps.version}`,
    releaseDate: appStore.pawsteps.releaseDate,
    appStoreId: appStore.pawsteps.id,
    appStoreUrl: 'https://apps.apple.com/jp/app/id6747422609',
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
