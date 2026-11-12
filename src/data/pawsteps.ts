export interface Breed {
  id: string;
  name: string;
}

/** PawSteps で選べる10犬種（アプリ内の並び順） */
export const breeds: Breed[] = [
  { id: 'shiba', name: '柴犬' },
  { id: 'miniatureDachshund', name: 'ミニチュアダックス' },
  { id: 'bostonTerrier', name: 'ボストンテリア' },
  { id: 'goldenRetriever', name: 'ゴールデンレトリバー' },
  { id: 'pomeranian', name: 'ポメラニアン' },
  { id: 'toyPoodle', name: 'トイプードル' },
  { id: 'chihuahua', name: 'チワワ' },
  { id: 'siberianHusky', name: 'シベリアンハスキー' },
  { id: 'frenchBulldog', name: 'フレンチブルドッグ' },
  { id: 'pembrokeWelshCorgi', name: 'ウェルシュ・コーギー' },
];

export type Pose = '' | 'walk' | 'fun';

export function dogImage(id: string, pose: Pose = ''): string {
  return `/images/pawsteps/dogs/${id}${pose ? `-${pose}` : ''}.webp`;
}
