# daywizz website

daywizzと公開アプリ（PawSteps / Picolle.）を紹介するAstro製のWebサイトです。`main`へのpushでGitHub Pagesへデプロイされます。

## ローカル確認

```sh
npm ci
npm run dev
npm run build
```

## アプリ情報の更新

アプリの公開バージョンと公開日は [`src/data/app-store.json`](src/data/app-store.json) で一元管理し、アプリカードと詳細ページの両方から参照します。紹介文・機能・App Store URLなどは [`src/data/apps.ts`](src/data/apps.ts)、詳細な訴求内容は各アプリページで管理します。

1. App Storeの差分を確認する

   ```sh
   npm run check:app-store
   ```

2. リリースノートをもとに、該当する詳細ページと画像を更新する

   - PawSteps: `src/pages/apps/pawsteps/index.astro`
   - Picolle.: `src/pages/apps/picolle/index.astro`

3. 公開バージョンのスナップショットを同期する

   ```sh
   npm run check:app-store -- --sync
   npm run build
   ```

`check-app-store.yml` が毎週月曜9:00（日本時間）にApp Store Lookup APIを確認します。新バージョンが見つかると、公開バージョン・リリース日・リリースノートを含むGitHub Issueを作成または追記します。

バージョン番号だけは機械的に検出し、紹介文や機能説明は内容を確認して更新する半自動方式です。誤った訴求を自動公開しないため、Issueを更新作業の開始点にしています。

## 主な構成

```text
src/data/                  アプリの共通メタデータ
src/pages/apps/            アプリ詳細・サポート・規約ページ
src/content/blog/          ブログ記事
public/images/             公開画像
scripts/                   更新チェックなどの運用スクリプト
.github/workflows/         デプロイ・定期チェック
```
