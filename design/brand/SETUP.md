# Token and asset provenance

The user supplied the brand README, component CSS, and six SVG logos. They did not have
the missing variable definitions. This setup supplies a reversible initial token proposal
to make the method usable, rather than treating proposed values as recovered brand data.

## Observed colors

| Token | SVG literal | Source |
| --- | --- | --- |
| forest | #2F5D50 | Colored logo and mark |
| akari | #E0913A | Colored logo and mark |
| sumi | #24221E | Colored wordmark |
| on-forest | #FFFFFF | White SVG variants; applied to text by README |

## Supplemental initial proposal

All other colors in tokens.json are initial proposals. So are the 4px spacing scale,
4px / 12px / 9999px radii, 16px / 24px responsive page insets, and restrained motion posture.
These values are not user-approved original tokens. Character, harmony, and temperature
are method metadata; imported tokens disable palette generation. The required
quiet-mineral palette selection is compatibility metadata only: its colors are withheld.
The registry keyColor is the observed forest, not a request to regenerate colors.

The primary role maps to akari/sumi and the accent role maps to forest/white. The CSS
uses the supplied native token names. Status colors are functional initial proposals;
use them only for actual states, with labels, never as decorative extra accents.

The canonical machine input is tokens.json (DTCG). tokens.css is the corresponding
CSS declaration file; components.css is the user's component source. Neither is imported
into the running website during setup. If token values change, update both JSON and CSS,
then recompile affected bundles. Imported tokens are measured, not automatically adjusted.

## Logos

Six original SVGs are copied byte-for-byte to public/brand/. They are not installed into
headers or footers during setup. Logo artwork remains unchanged. No visual acceptance
is implied by copying or parsing SVGs.

## Registry and future implementation

The registry covers 21 Astro templates and legacy public HTML routes. The dynamic
blog article entry denotes the shared template, not a literal preview URL. Substitute a
real published article when rendering it. Existing public HTML redirect pages retain
their own entries; verify the redirects and their destination routes.

Required renders and human acceptance are future validation requirements, not completed
checks. No score or rendered verification is claimed for setup. The existing website
still uses its previous colors, fonts, and layouts until a separate implementation task.

A future visual reference requiring its own grammar should use StyleSeed reference;
the supplied Claude URL remains visually uninspected and contributes no inferred rules.
