# daywizz.com リニューアル TODO

## 概要
- 技術スタック: Astro + Tailwind CSS
- ホスティング: GitHub Pages
- 目的: 個人ブランディング + アプリ紹介 + ブログ
- 現フェーズ: ワイヤーフレーム（全体像の確認）

---

## Phase 0: プロジェクトセットアップ
- [ ] Astro プロジェクト初期化（Tailwind 込み）
- [ ] GitHub Pages 用の Astro 設定（`astro.config.mjs` に `site`, `base` 設定）
- [ ] 共通レイアウト作成（`BaseLayout.astro`）
- [ ] 共通コンポーネント作成（`Header.astro`, `Footer.astro`）

## Phase 1: ワイヤーフレーム — daywizz 共通ページ
- [ ] トップページ (`/`)
  - ヒーローセクション（キャッチコピー + ブランド紹介）
  - アプリ一覧カード（picolle, PawSteps, omiya のプレースホルダー）
  - ブログ最新記事プレビュー（ダミー）
- [ ] About ページ (`/about/`)
  - プロフィール・経歴・ビジョン（現サイトの内容を移植）
- [ ] ブログ一覧 (`/blog/`)
  - Content Collections セットアップ
  - タグ絞り込み UI
  - ダミー記事 2-3 本
- [ ] ブログ個別記事 (`/blog/[slug]/`)
  - Markdown → ページ生成の仕組み
- [ ] Contact ページ (`/contact/`)
  - お問い合わせフォーム（現サイトから移植）

## Phase 2: ワイヤーフレーム — アプリ共通テンプレート & picolle
- [ ] アプリ LP テンプレート (`AppLayout.astro`)
  - ヒーロー（スクショ枠 + キャッチコピー + DL ボタン）
  - 機能紹介セクション
  - 関連ブログ記事リンク
- [ ] 法務ページテンプレート (`LegalLayout.astro`)
  - プライバシーポリシー / 利用規約 / 特商法の共通レイアウト
- [ ] FAQ / サポートテンプレート
  - `FaqSection.astro` コンポーネント
- [ ] picolle で実際にテンプレート適用
  - `/apps/picolle/` — LP（プレースホルダー）
  - `/apps/picolle/support/` — FAQ + サポート
  - `/apps/picolle/privacy/` — プライバシーポリシー
  - `/apps/picolle/terms/` — 利用規約
  - `/apps/picolle/tokushoho/` — 特商法表記

## Phase 3: ワイヤーフレーム — 残りアプリページ
- [ ] PawSteps（テンプレート適用）
  - `/apps/pawsteps/` — LP
  - `/apps/pawsteps/support/`
  - `/apps/pawsteps/privacy/`
  - `/apps/pawsteps/terms/`
- [ ] omiya（非公開 — スケルトンのみ準備）
  - `/apps/omiya/` — 最低限の構造だけ用意

## Phase 4: デザイン調整 & 確認
- [ ] 全ページをローカルで通しチェック
- [ ] レスポンシブ確認（モバイル / タブレット / デスクトップ）
- [ ] ページ間のナビゲーション・リンク確認
- [ ] 上様レビュー → フィードバック反映

## Phase 5: デプロイ準備
- [ ] GitHub Actions ワークフロー作成（Astro → GitHub Pages）
- [ ] カスタムドメイン（daywizz.com）設定確認
- [ ] 既存ページからのリダイレクト対応（旧 URL → 新 URL）
- [ ] 本番デプロイ

---

## 備考
- 各アプリの実コンテンツ（スクショ、機能説明、法務文書）は後から差し込み
- ブログ記事は Markdown で `src/content/blog/` に追加するだけ
- 多言語化（英語対応）は将来タスクとして別途検討
