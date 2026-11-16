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
    for(const time of [0,3000,8000,10999,11000,18000,22000,29000,32999,33000]) {
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
  const landscape=sampleParticleField(cloud,0,720,600);
  const fruit=sampleParticleField(cloud,11000,720,600);
  const logo=sampleParticleField(cloud,22000,720,600);
  assert.ok(landscape.some((p,i)=>Math.hypot(p.x-fruit[i].x,p.y-fruit[i].y)>60));
  assert.ok(fruit.some((p,i)=>Math.hypot(p.x-logo[i].x,p.y-logo[i].y)>60));
  for(const boundary of [11000,22000,33000]) {
    const before=sampleParticleField(cloud,boundary-1,720,600);
    const after=sampleParticleField(cloud,boundary,720,600);
    assert.ok(before.every((p,i)=>Math.hypot(p.x-after[i].x,p.y-after[i].y)<1),'Morph must not jump when the scene changes');
  }
});

// Every moving dot stays within its original SVG color region, including concave edges.
test('logo-hold-preserves-source-artwork', async () => {
  const { readFile } = await import('node:fs/promises');
  const { createHash } = await import('node:crypto');
  const { default:sharp } = await import('sharp');
  const source=JSON.parse(await readFile(new URL('../src/data/logo-particles.json',import.meta.url),'utf8'));
  const svg=await readFile(new URL('../public/brand/daywizz-mark.svg',import.meta.url));
  assert.equal(createHash('sha256').update(svg).digest('hex'),source.sha256);
  const {data,info}=await sharp(svg).resize({width:344}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const cloud=createParticleCloud(3000), scale=Math.min(720*.32,600*.43);
  for (const time of [22000,22750,23500,25000,27000,27999]) {
    const points=sampleParticleField(cloud,time,720,600);
    for (const [i,p] of points.entries()) {
      const x=(p.x-360)/scale, y=(318-p.y)/scale;
      const [sx,sy,accent,clearance]=source.points[i];
      assert.ok(Math.hypot(x-sx,y-sy)<=clearance+1e-10);
      const px=Math.floor(x/2.3*info.width+info.width/2);
      const py=Math.floor(info.height/2-y/2.3*info.width);
      const offset=(py*info.width+px)*4;
      assert.ok(px>=0 && px<info.width && py>=0 && py<info.height && data[offset+3]>240,'Dot remains within the artwork');
      assert.equal(Number(data[offset]>data[offset+1]),accent,'Dot remains in its original hill/star color region');
      assert.equal(p.accent,accent);
    }
  }
  const first=sampleParticleField(cloud,22000,720,600),later=sampleParticleField(cloud,24000,720,600);
  const deltas=first.map((p,i)=>({x:later[i].x-p.x,y:later[i].y-p.y}));
  assert.ok(deltas.filter(d=>Math.hypot(d.x,d.y)>1).length>300,'Interior dots visibly move');
  assert.ok(deltas.some(d=>Math.hypot(d.x-deltas[0].x,d.y-deltas[0].y)>2),'Dots move independently, rather than translating the whole logo');
});

test('river-flows-downstream-faster-than-mountains', () => {
  const cloud=createParticleCloud(3000);
  const first=sampleParticleField(cloud,1000,720,600);
  const next=sampleParticleField(cloud,1250,720,600);
  const displacement=water=>{
    const visible=first.flatMap((p,i)=>p.water===water && p.opacity>.3 && next[i].opacity>.3 ? [Math.hypot(p.x-next[i].x,p.y-next[i].y)] : []);
    return visible.reduce((a,b)=>a+b,0)/visible.length;
  };
  assert.ok(displacement(1)>displacement(0)*5,'River visibly flows while mountains remain calm');
  assert.ok(first.some(p=>p.water===1));
  const reaches=cloud.map(p=>p.forms[0]).filter(p=>p.water);
  const meanY=points=>points.reduce((sum,p)=>sum+p.y,0)/points.length;
  assert.ok(meanY(reaches.filter(p=>p.flowPosition<-.8))>meanY(reaches.filter(p=>p.flowPosition>.8))+.6,'River descends from the mountainside to the mouth');
  assert.ok(sampleParticleField(cloud,22000,720,600).every(p=>p.water===0),'Water color does not reach the logo hold');
});

test('each-scene-scatters-outward-before-regrouping', () => {
  const cloud=createParticleCloud(1400);
  const medianRadius=points=>{
    const radii=points.map(p=>Math.hypot((p.x-195)/195,(p.y-165)/165)).sort((a,b)=>a-b);
    return radii[Math.floor(radii.length/2)];
  };
  for (const start of [0,11000,22000]) {
    const held=sampleParticleField(cloud,start+5000,390,330);
    const scattered=sampleParticleField(cloud,start+8500,390,330);
    const regrouped=sampleParticleField(cloud,start+11000,390,330);
    assert.ok(medianRadius(scattered)>medianRadius(held)*1.2);
    assert.ok(medianRadius(scattered)>medianRadius(regrouped)*1.2);
    const center=scattered.filter(p=>Math.hypot((p.x-195)/195,(p.y-165)/165)<.35);
    assert.ok(center.length>scattered.length*.06,'Random cloud fills its center instead of forming a ring');
  }
});
