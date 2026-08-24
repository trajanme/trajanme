import { readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';

const snapshotUrl = new URL('../src/data/app-store.json', import.meta.url);
const args = process.argv.slice(2);
const reportIndex = args.indexOf('--report');
const reportPath = reportIndex >= 0 ? args[reportIndex + 1] : undefined;
const shouldSync = args.includes('--sync');
const snapshot = JSON.parse(await readFile(snapshotUrl, 'utf8'));

const results = await Promise.all(Object.entries(snapshot).map(async ([key, app]) => {
  const response = await fetch(`https://itunes.apple.com/lookup?id=${app.id}&country=jp`, {
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`${key}: App Store API returned ${response.status}`);

  const payload = await response.json();
  const current = payload.results?.[0];
  if (!current) throw new Error(`${key}: App Store entry ${app.id} was not found`);

  return {
    key,
    name: current.trackName,
    expectedVersion: app.version,
    currentVersion: current.version,
    releaseDate: current.currentVersionReleaseDate?.slice(0, 10),
    releaseNotes: current.releaseNotes?.trim() || 'リリースノートはありません。',
    url: current.trackViewUrl,
  };
}));

const changed = results.filter((result) => result.expectedVersion !== result.currentVersion);
const lines = [
  '# App Store更新チェック',
  '',
  `確認日時: ${new Date().toISOString()}`,
  '',
];

if (changed.length === 0) {
  lines.push('Webサイトの掲載バージョンはApp Storeと一致しています。');
} else {
  lines.push('Webサイトの更新候補が見つかりました。各アプリの紹介文・機能・画像を確認後、スナップショットを更新してください。', '');
  for (const result of changed) {
    lines.push(
      `## ${result.name}`,
      '',
      `- Webサイト: v${result.expectedVersion}`,
      `- App Store: v${result.currentVersion}（${result.releaseDate ?? '日付不明'}）`,
      `- App Store: ${result.url}`,
      '',
      '### リリースノート',
      '',
      result.releaseNotes,
      '',
    );
  }
  lines.push('更新後は `npm run check:app-store -- --sync` で `src/data/app-store.json` を同期し、`npm run build` で確認します。');
}

const report = `${lines.join('\n')}\n`;
if (reportPath) await writeFile(reportPath, report);
process.stdout.write(report);

if (shouldSync && changed.length > 0) {
  for (const result of changed) {
    snapshot[result.key].version = result.currentVersion;
    if (result.releaseDate) snapshot[result.key].releaseDate = result.releaseDate;
  }
  await writeFile(snapshotUrl, `${JSON.stringify(snapshot, null, 2)}\n`);
  process.stdout.write(`\n${changed.length}件のスナップショットを更新しました。\n`);
} else if (changed.length > 0) {
  process.exitCode = 2;
}
