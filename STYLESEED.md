# StyleSeed — daywizz Design Lock

<!-- This is the human entry point. The complete artifact registry is authoritative. -->

Scope: the entire website, including all app pages, shared layouts, blog, support,
contact, legal pages, and legacy HTML redirects. This is an initial configuration;
it does not claim human acceptance or a visually verified redesign.

- App domain: content
- Surface: responsive website
- Surface adapter: product-ui
- Page type: landing
- Output grammar: expressive-marketing
- Grammar path: built-in:engine/RULESETS.md
- Grammar fallback: expressive-marketing
- Reference confidence: explicit supplied brand requirements; Claude Artifact visuals uninspected
- Brand recipe: expressive-brand
- Aesthetic profile: none
- Palette mode: light
- Surface temperature: warm
- Font: Zen Kaku Gothic Antique
- Radius: soft
- Elevation: flat
- Density: comfortable
- Motion: Silk restrained
- Imagery/data role: real product evidence and regional context; no invented statistics
- Signature move: 土地と灯り — forest structure, kinari canvas, one akari emphasis per screen
- Locked: 2026-11-15

## Canon and source boundaries

The [project configuration](.styleseed/project.json) and
[artifact index](.styleseed/artifacts/index.json) own the machine-readable method.
Resolve the relevant artifact before building; never compile this file as a legacy lock
or fall back to a global effective-rules bundle.

The supplied [brand README](design/brand/README.md) and
[component CSS](design/brand/components.css) define the intended brand. The imported
[DTCG token canon](design/brand/tokens.json) owns palette values; its
[CSS counterpart](design/brand/tokens.css) exposes the native variable names.
`quiet-mineral` is the resolver's required palette metadata only. Its preset values
are withheld and palette generation is disabled by the token import.

Observed SVG values: forest `#2F5D50`, akari `#E0913A`, sumi `#24221E`, white `#FFFFFF`.
Other colors, numeric spacing, radii, and the restrained motion posture are initial setup
proposals, clearly identified in the token descriptions and [provenance](design/brand/SETUP.md).
They are not recovered original values or approved reference transfers.

## Artifact methods

Home, about, and app landing pages use expressive-marketing / expressive-brand.
Blog, support, and legal pages use editorial-reading / editorial-authority.
Contact uses consumer-service / calm-consumer. All use the shared imported brand canon,
product-ui adapter, and no aesthetic profile. PawSteps landing uses the health domain;
Picolle landing uses education; the remaining website surfaces use content.

Each of the 21 registered templates/routes has its own bundle and hash manifest in
`.styleseed/bundles/` and `.styleseed/manifests/`. Article rendering must substitute
a real article for the `/blog/[slug]/` template locator.

## Compile and verify configuration

```sh
node .agents/skills/styleseed/workflows/ss-resolve/scripts/resolve-context.mjs --project-root . --all --agent codex
node .agents/skills/styleseed/workflows/ss-resolve/scripts/resolve-context.mjs --project-root . --all --agent codex --check
```

Required future implementation checks include mobile and desktop renders, keyboard focus,
responsive navigation, real contact behavior, and reduced motion where relevant. The score
floor is 80; human acceptance is required. These are requirements, not completed evidence.
The subsequent UI improvement task imports the brand CSS, applies the supplied white logos
to shared forest chrome, and retains the original app artwork. See design/ui-improvement-review.md
for actual checks and remaining verification limits.

Use StyleSeed reference for future visual references that need a distinct grammar.

Home background detail: the current D-015 uses an original depth-aware dot field.
See [particle background](design/particle-background.md) for implementation and verification limits.

ホームの写真→生成りのフェードとロゴ粒子はD-016で承認範囲を記録。最新仕様と写真の出典: [design/hero-refinement.md](design/hero-refinement.md)。
