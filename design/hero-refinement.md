# 写真とロゴを加えたホーム背景

2026-11-16。StyleSeed の expressive-marketing × content × landing × expressive-brand と既存ブランドを継続。

左側46%に京都・嵐山の写真を置き、生成りの被覆率84%から100%へ徐々に変化させる。右側は無地の生成りで点群を表示する。スマートフォンでは写真を本文側に収め、下方向へ生成りに溶かし、本文の下に点群を表示する。写真の読み込みに失敗しても生成りの背景と本文が残る。

この写真のフェードはユーザーの明示的な指定によるホーム限定の例外。全体のグラデーション禁止を変更するものではない（project.json D-016）。最暗の黒い写真画素を想定しても、84%の生成り被覆とforestの小さい文字のコントラストを確保する。説明本文はsumiに変更した。

| Before | After | Why |
| --- | --- | --- |
| 背景は無地 | 左の写真から中央で生成りへフェード | 地域の実景と点群を共存させる |
| 山・川・果実の3場面 | 提供SVGのロゴマークを4場面目に追加 | 地域の風景からブランドへつなぐ |
| 動きを続ける立体投影 | ロゴの保持中は正面で静止 | ロゴの縦横比と丘・星の位置を保つ |
| テキスト付き停止ボタン | 44×44pxの停止／再生アイコン | 要望に合わせ簡潔にし、読み上げ名・フォーカス・状態は維持 |

点群は各場面6秒保持＋5秒変形、計44秒の循環。ロゴに集まる間は投影と揺らぎを弱め、元のforest/akariへ連続的に色を変える。元SVGは変更していない。`scripts/sample-logo-particles.mjs` で再生成でき、出力には元SVGのSHA-256を保持している。

## 写真の出典

- 作品: [Katsura River at Arashiyama.jpg](https://commons.wikimedia.org/wiki/File:Katsura_River_at_Arashiyama.jpg)
- 作者: Nicholas Graves / NickAura
- ライセンス: [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)
- 変更: WebPへの圧縮、表示時のトリミング、生成りのフェード被覆。
- サイト上にも作者・元ページ・ライセンス・変更内容を表示。転載元の写真をdaywizzの撮影実績として扱わない。

## 検証範囲

本番ビルドと9件のテストを実行。リンク・ルート・法的文言の維持、停止条件、PC/モバイルの描画範囲、4場面の切替の連続性、ロゴ保持中の原図座標と配色・静止を検査。StyleSeedのソース検査はblocking 0。

投影モデルから山・川・果実・ロゴをPNG化して確認。写真原画と、写真→生成りの背景だけを合成した1440×680pxのモデル画像も目視した（`.styleseed/evidence/home-particle-background/photo-fade-model.png`）。これはブラウザのスクリーンショットではない。現在のCUA環境はnative pipe startup failed / browser access host unavailableであり、最新の実画面レイアウト、連続再生、実際のボタン操作の最終検証は未実施。過去の全体UIスクリーンショットは最新背景の証明には使わない。必須のtemporal/human acceptanceゲートを通過したとは主張しない。
