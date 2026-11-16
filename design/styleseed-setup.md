# daywizz — StyleSeed setup brief

## Scope and source

The user selected the entire website, including app landing pages, support, legal pages,
blog, about, and contact. This task configures StyleSeed; it does not implement a redesign.

Brand source: [brand/README.md](brand/README.md), copied verbatim from the user-supplied
`/Users/daywizz/Downloads/README.md` on 2026-11-15. Its explicit brand instructions supersede
the earlier proposal to retain the site's blue/orange palette and current fonts.

The Claude Artifact URL is an additional reference:
https://claude.ai/artifact/CxmVckzqrWT2WsvCvQg3td
Only its hosting shell could be retrieved. Its design has not been visually inspected;
no layout, token, interaction, or motion claims are derived from it.

## Brand requirements from the supplied source

- Mission: 日本各地の魅力に光を当て、地域がにぎわい続ける仕組みをつくる。
- Tagline: 地域に、ちいさな魔法を。
- Theme: 土地と灯り. Regions and people are the subjects; daywizz supports them.
- Three pillars: 地域の魅力を届ける / 楽しめる体をつくる（PawSteps） /
  地域で育つ力を伸ばす（Picolle）.
- Japanese first, short sentences, です・ます, plain language, sourced numbers.
  Avoid exaggeration, exclamation marks, and emoji.
- Canvas `kinari`; raised surfaces `surface`; structural brand areas `forest`
  with `on-forest` text; body `sumi`; secondary text `ink-muted`; borders `line`.
- `akari` is restricted to one emphasis per screen, with `sumi` text. Use `akari-text`
  for orange text. `wakaba` supports maps, figures, and tags, with labels or luminance cues.
  The source does not define whether persistent logo stars count toward the screen limit;
  resolve this when reviewing the actual layout instead of silently weakening the rule.
- Zen Kaku Gothic Antique is the sole typeface, including Latin text. Weights: body 400,
  headings 700, captions 500 only. Type scale: 56 / 40 / 28 / 20 / 16 / 14 / 12px.
  Body line height: 1.75. Web primarily uses h1 through body.
- Sections use `space-16`; cards use `surface`, `line`, and `radius-md`.
  Primary buttons use `akari`, `radius-pill`, and a minimum height of 44px.
- Preserve the supplied hill-and-star logo construction, colors, clear space, and variants.
  Logo files have not yet been supplied; do not substitute an invented mark.
- No gradients, stacked shadows, emoji, photo color overlays, or excessive orange.
- Keep the Astro implementation. The source explicitly allows the `dw-` CSS classes without
  React; setup does not authorize adding React or replacing the site's components.

## Recommended method

These are setup recommendations, not evidence of visual quality or acceptance.

| Surface | Grammar | Domain / page | Brand recipe |
| --- | --- | --- | --- |
| Home | expressive-marketing | content / landing | expressive-brand |
| About | expressive-marketing | content / detail | expressive-brand |
| PawSteps landing | expressive-marketing | health / landing | expressive-brand |
| Picolle landing | expressive-marketing | education / landing | expressive-brand |
| Omiya landing | expressive-marketing | content / landing | expressive-brand |
| Blog index | editorial-reading | content / list | editorial-authority |
| Blog articles | editorial-reading | content / detail | editorial-authority |
| Contact | consumer-service | content / form | calm-consumer |
| App support | editorial-reading | content / detail | editorial-authority |
| App legal and legacy public HTML pages | editorial-reading | content / detail | editorial-authority |

Use the `product-ui` adapter for these responsive web surfaces, with no aesthetic profile.
The brand source controls typography and tokens regardless of the recipe's defaults.
Marketing pages explain the regional mission through actual products and evidence;
reading pages prioritize a clear text hierarchy and bounded reading width.

## Spacing and verification plan

Keep related labels, explanations, and actions together. Separate topic changes using
the supplied section token. Do not apply section spacing inside every card or form group.
Configure page inset, section gap, group gap, stack gap, inline gap, and component inset
separately once their source tokens are available. `space-16` is a name, not yet a verified
64px value. Preserve independent font sizes and minimum 44px primary button targets.

For future implementation, propose narrow and wide checks at 390×844 and 1440×900,
plus keyboard focus, responsive navigation, and reduced motion where applicable.
No screens have been changed, scored, or visually verified during setup.

## Supplied component source and completed token proposal

The user subsequently supplied [brand/components.css](brand/components.css). It is preserved
as reference source and is not imported by the running site. It confirms button variants,
hover and focus states, card geometry, a 220px minimum grid track, and component type sizes.
All its `var(...)` references are defined in the accompanying proposed `brand/tokens.css`.
Additional named tokens include `forest-deep`, `on-forest-muted`, `font-sans`,
`space-1`, `space-2`, `space-4`, `space-6`, `space-10`, and `radius-sm`.

Keep explicit component details alongside the general README scale: buttons are 15px/700,
tags and eyebrows are 12px/500, and card body is 14px with 24px line height. The Stat accent
uses `akari-text` on text; do not substitute the orange fill token. The tag's inset shadow
is a border treatment, not approval for decorative layered shadows. The 220px grid minimum
requires narrow-viewport checking before implementation is accepted.

The user supplied six SVG logo files and explained that the original variables were
unavailable. The setup extracts forest, akari, sumi, and white from these assets and
supplies explicit initial proposals for the remaining colors, spacing, and radii.
See [brand/SETUP.md](brand/SETUP.md) for provenance and [brand/tokens.json](brand/tokens.json)
for individual token descriptions. Proposed values are not presented as original values.

Required brand tokens: `kinari`, `surface`, `forest`, `on-forest`, `akari`, `akari-text`,
`sumi`, `ink-muted`, `wakaba`, `line`, `space-16`, `radius-md`, `radius-pill`.
The semantic import maps focus and success to forest, and supplies explicitly proposed
warning/danger colors. These are functional states, not additional decorative brand accents.

The complete `.styleseed/project.json` and artifact registry import this token canon.
All 21 registered templates/routes have compiled bundles and manifests. The root
[design lock](../STYLESEED.md) is the human entry point; registry configuration is authoritative.

## Setup status

- Installed StyleSeed: 5.0.0, revision
  `sha256:9bddb23ed24bad0c8feb95c8d9855de7d71468941cff8daa475b6fe066b2cd75`.
- Update preflight: installed and published revisions matched earlier in this task.
- Brand requirements recorded; imported token canon and six unchanged logo assets available.
- Initial token proposal is documented separately from supplied literal values.
- Design lock and 21 artifact bundles/manifests created.
- Registry compilation and freshness checks passed for all 21 artifacts.
- All 21 component CSS variable references resolve in the proposed token CSS, which matches
  the JSON canon. Six SVGs match their supplied originals byte for byte.
- Eleven semantic contrast pairs and seven additional component pairs passed their
  applicable numeric thresholds. See [setup-validation.json](../.styleseed/setup-validation.json).
- Score and rendered verification: not run; configuration preparation only.
