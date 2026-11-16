import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Sample the original artwork, never a redrawn approximation. Re-run after a logo update.
const source = 'public/brand/daywizz-mark.svg';
const svg = await fs.readFile(source);
const { data, info } = await sharp(svg).resize({ width: 344 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const candidates = [];
const region = (x,y) => {
  if (x<0 || y<0 || x>=info.width || y>=info.height) return -1;
  const offset=(y*info.width+x)*4;
  return data[offset+3]>240 ? Number(data[offset]>data[offset+1]) : -1;
};
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const offset = (y * info.width + x) * 4;
    if (data[offset + 3] > 240) {
      const color=region(x,y);
      let clearance=5;
      for(let dy=-6;dy<=6;dy++) for(let dx=-6;dx<=6;dx++) {
        if(region(x+dx,y+dy)!==color) clearance=Math.min(clearance,Math.max(0,Math.hypot(dx,dy)-1));
      }
      candidates.push([
      +((x + .5 - info.width / 2) / info.width * 2.3).toFixed(5),
      +((info.height / 2 - y - .5) / info.width * 2.3).toFixed(5),
      data[offset] > data[offset + 1] ? 1 : 0,
      +(clearance/info.width*2.3).toFixed(6),
    ]);
    }
  }
}
let seed = 674742;
for (let i = candidates.length - 1; i > 0; i--) {
  seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
  const j = (seed >>> 0) % (i + 1);
  [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
}
const sampled = { source, sha256: createHash('sha256').update(svg).digest('hex'), viewBox: '674 424 1722 1151', points: candidates.slice(0, 3000) };
await fs.writeFile('src/data/logo-particles.json', JSON.stringify(sampled) + '\n');
console.log(`Sampled ${sampled.points.length} logo particles from ${source}`);
