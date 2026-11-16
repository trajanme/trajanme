import fs from 'node:fs';
const registry = JSON.parse(fs.readFileSync('.styleseed/artifacts/index.json', 'utf8'));
const blocks = registry.artifacts.map(({id}) => {
  const bundle = fs.readFileSync(`.styleseed/bundles/${id}.md`, 'utf8');
  const spatialSection = bundle.split('## Spatial roles for this artifact')[1];
  const css = spatialSection?.match(/```css\n([\s\S]*?)\n```/)?.[1];
  if (!css) throw new Error(`Missing compiled spatial contract for ${id}`);
  return `/* ${id} */\n${css}`;
});
fs.writeFileSync('src/styles/spatial.css', '/* Generated from compiled StyleSeed spatial contracts.\n * Run node scripts/sync-styleseed-spacing.mjs after re-resolving configuration. */\n'+blocks.join('\n\n')+'\n');
console.log(`Synced spatial contracts for ${blocks.length} artifacts.`);
