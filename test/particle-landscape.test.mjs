import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldAnimateLandscape, createParticleCloud, sampleParticleField } from '../src/lib/particle-landscape.mjs';

test('background-animation-pause-policy', () => {
  const visible={reducedMotion:false,userPaused:false,inView:true,documentHidden:false};
  assert.equal(shouldAnimateLandscape(visible),true);
  for(const override of [{reducedMotion:true},{userPaused:true},{inView:false},{documentHidden:true}]) assert.equal(shouldAnimateLandscape({...visible,...override}),false);
  assert.equal(shouldAnimateLandscape({...visible,reducedMotion:true,userPaused:false}),false);
  assert.equal(shouldAnimateLandscape({...visible,userPaused:true,documentHidden:false}),false);
});

test('particle-field-fits-responsive-viewports', () => {
  const cloud=createParticleCloud(3000);
  assert.deepEqual(createParticleCloud(3000),cloud,'Sampling is deterministic for a fixed particle count');
  for(const [width,height] of [[720,600],[390,330]]) {
    for(const time of [0,3000,8000,10999,11000,18000,22000,29000,32999,33000,36000,41000,43999,44000]) {
      const points=sampleParticleField(cloud,time,width,height);
      assert.equal(points.length,cloud.length);
      for(const p of points) {
        assert.ok([p.x,p.y,p.radius,p.opacity].every(Number.isFinite));
        assert.ok(p.x-p.radius>=0 && p.x+p.radius<=width && p.y-p.radius>=0 && p.y+p.radius<=height,`Dot outside ${width}×${height} at ${time}`);
      }
    }
  }
});

test('particle-shapes-morph-continuously', () => {
  const cloud=createParticleCloud(150);
  const mountain=sampleParticleField(cloud,0,720,600);
  const river=sampleParticleField(cloud,11000,720,600);
  const fruit=sampleParticleField(cloud,22000,720,600);
  assert.ok(mountain.some((p,i)=>Math.hypot(p.x-river[i].x,p.y-river[i].y)>60));
  assert.ok(river.some((p,i)=>Math.hypot(p.x-fruit[i].x,p.y-fruit[i].y)>60));
  for(const boundary of [11000,22000,33000,44000]) {
    const before=sampleParticleField(cloud,boundary-1,720,600);
    const after=sampleParticleField(cloud,boundary,720,600);
    assert.ok(before.every((p,i)=>Math.hypot(p.x-after[i].x,p.y-after[i].y)<1),'Morph must not jump when the scene changes');
  }
});

// The logo hold must retain the source artwork's aspect ratio, position, and color regions.
test('logo-hold-preserves-source-artwork', async () => {
  const { readFile } = await import('node:fs/promises');
  const { createHash } = await import('node:crypto');
  const source=JSON.parse(await readFile(new URL('../src/data/logo-particles.json',import.meta.url),'utf8'));
  const svg=await readFile(new URL('../public/brand/daywizz-mark.svg',import.meta.url));
  assert.equal(createHash('sha256').update(svg).digest('hex'),source.sha256);
  const cloud=createParticleCloud(3000);
  const first=sampleParticleField(cloud,33000,720,600);
  const later=sampleParticleField(cloud,38000,720,600);
  assert.deepEqual(first,later,'Logo stays front-facing and still during its hold');
  const scale=Math.min(720*.32,600*.43);
  for (const [i,p] of first.entries()) {
    assert.ok(Math.abs((p.x-360)/scale-source.points[i][0])<1e-10);
    assert.ok(Math.abs((318-p.y)/scale-source.points[i][1])<1e-10);
    assert.equal(p.accent,source.points[i][2]);
  }
  assert.ok(first.some(p=>p.accent===1),'Original star color is present');
  assert.ok(first.some(p=>p.accent===0),'Original hill color is present');
});
