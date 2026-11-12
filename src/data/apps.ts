import appStore from './app-store.json';

export type Platform = 'iOS' | 'Android' | 'Web';

/**
 * App Store Connect のプロバイダートークン（任意）。
 * 設定すると、すべての App Store リンクに `pt` が付き、App Analytics でキャンペーン（ct）別の入手数を計測できる。
 * App Store Connect > App Analytics > キャンペーン > キャンペーンリンクを作成 で表示される `pt=` の値を入れる。
 */
export const APP_STORE_PROVIDER_TOKEN = '';

export interface AppInfo {
  id: string;
  name: string;
  /** 読み（サポートページ等で使用） */
  reading?: string;
  tagline: string;
  description: string;
  /** カテゴリ表示（例: 子育て ／ 思い出記録） */
  category: string;
  /** 価格の要約（カード・ヒーローで表示） */
  priceLabel: string;
  /** カードに出す要点（3つまで） */
  highlights: string[];
  color: string;
  bgColor: string;
  icon: string;
  /** apple-touch / OGP 用 */
  iconPng: string;
  ogImage?: string;
  qr?: string;
  contactEmail: string;
  platforms: Platform[];
  devices?: string;
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
    reading: 'ピコレ',
    tagline: 'お子さまの作品を、美術館の展示風に。',
    description: 'お子さまの絵や工作を撮って「個展」に。AI学芸員ルゥのメモ、制作時の年齢記録、家族共有で、小さな芸術家の成長を残せるアプリです。',
    category: '子育て ／ 思い出記録',
    priceLabel: '無料 ・ Premium 月額500円',
    highlights: [
      '撮るだけで美術館風に。AI学芸員ルゥが感想を添える',
      '制作時の年齢を自動で記録',
      '招待リンクで祖父母とも共有（無料で5人まで）',
    ],
    color: 'picolle',
    bgColor: 'picolle-bg',
    icon: '/images/picolle/icon.webp',
    iconPng: '/images/picolle/icon-180.png',
    ogImage: '/images/og/picolle.png',
    qr: '/images/picolle/qr.svg',
    contactEmail: 'support@daywizz.com',
    platforms: ['iOS'],
    devices: 'iPhone',
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
    category: '健康 ／ 歩数計',
    priceLabel: '無料 ・ 登録不要',
    highlights: [
      '10犬種から相棒を選んで、ミッションとごはんで習慣に',
      'Apple Watch・ホーム画面ウィジェットに対応',
      'アカウント登録なし。歩数は端末内で扱う',
    ],
    color: 'pawsteps',
    bgColor: 'pawsteps-bg',
    icon: '/images/pawsteps/icon.webp',
    iconPng: '/images/pawsteps/icon-180.png',
    ogImage: '/images/og/pawsteps.png',
    qr: '/images/pawsteps/qr.svg',
    contactEmail: 'support@daywizz.com',
    platforms: ['iOS'],
    devices: 'iPhone / Apple Watch',
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
    category: '旅行',
    priceLabel: '',
    highlights: [],
    color: 'omiya',
    bgColor: 'omiya-bg',
    icon: '',
    iconPng: '',
    contactEmail: 'shintaro@daywizz.com',
    platforms: ['iOS', 'Android'],
    pages: { support: false, privacy: false, terms: false, tokushoho: false },
    released: false,
  },
};

export const appList = Object.values(apps);
// Most recently updated first (ISO dates compare correctly as strings)
export const releasedApps = appList
  .filter(app => app.released)
  .sort((a, b) => (b.releaseDate ?? '').localeCompare(a.releaseDate ?? ''));

/**
 * App Store へのリンクを作る。`campaign` は App Analytics の ct（どのボタンから入手されたか）。
 * 例: home_hero / home_apps / lp_hero / lp_sticky / lp_bottom / apps_index / blog
 */
export function appStoreLink(app: AppInfo, campaign: string): string {
  if (!app.appStoreUrl) return '';
  const params = new URLSearchParams();
  if (APP_STORE_PROVIDER_TOKEN) params.set('pt', APP_STORE_PROVIDER_TOKEN);
  params.set('ct', campaign);
  params.set('mt', '8');
  return `${app.appStoreUrl}?${params.toString()}`;
}

export type AppPageKey = keyof AppInfo['pages'];

/** そのアプリに存在するサポート・法務ページのキー一覧 */
export function appPageKeys(app: AppInfo, keys: AppPageKey[] = ['support', 'privacy', 'terms', 'tokushoho']): AppPageKey[] {
  return keys.filter((key) => app.pages[key]);
}
