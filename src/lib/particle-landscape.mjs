import logo from '../data/logo-particles.json' with { type: 'json' };

// Original particle geometry for daywizz. The same projection powers Canvas and the SVG fallback.
export function shouldAnimateLandscape({ reducedMotion, userPaused, inView, documentHidden }) {
  return !reducedMotion && !userPaused && inView && !documentHidden;
}
const TAU = Math.PI * 2;
const clamp = (v,min,max) => Math.min(max,Math.max(min,v));
const mix = (a,b,t) => a+(b-a)*t;
const smooth = t => t*t*t*(t*(t*6-15)+10);
function random(seed) {
  let value = seed | 0;
  return () => { value ^= value << 13; value ^= value >>> 17; value ^= value << 5; return (value >>> 0)/4294967296; };
}

export function createParticleCloud(count=3000) {
  const next = random(674742);
  return Array.from({ length:count }, (_,id) => {
    const u=next(), v=next(), w=next(), phase=next()*TAU;
    // An elevated surface with overlapping ridges, sampled with a stable particle identity.
    const x=(u*2-1)*1.18, z=(v*2-1)*.88;
    const a=.95*Math.exp(-((x+.49)**2/.19+(z+.16)**2/.3));
    const b=.69*Math.exp(-((x-.36)**2/.24+(z-.15)**2/.27));
    const mountain={x,y:a+b-.38+.035*Math.sin(x*8+z*5),z};
    // A broad ribbon of water folds through space rather than drawing an illustrated river.
    const river={x:Math.sin(u*TAU-.55)*.68+(v-.5)*.36,y:Math.sin(u*TAU*1.13)*.28+(w-.5)*.1,z:(u*2-1)*1.2};
    // A rounded citrus surface with a leaf, keeping food as a sculptural form.
    const angle=u*TAU, latitude=Math.acos(1-2*v), radius=.76+.025*Math.cos(angle*9)*Math.sin(latitude)**2;
    const fruit = id/count < .91 ? {
      x:Math.sin(latitude)*Math.cos(angle)*radius,
      y:Math.cos(latitude)*radius*.92-.06,
      z:Math.sin(latitude)*Math.sin(angle)*radius*.9,
    } : {
      x:.04+u*.64,
      y:.65+Math.sin(u*Math.PI)*.19,
      z:(v-.5)*Math.sin(u*Math.PI)*.32,
    };
    const [lx,ly,accent]=logo.points[id % logo.points.length];
    return { id,phase,seed:w,highlight:next()>.965,logoAccent:accent,radius:.62+next()*.68,forms:[mountain,river,fruit,{x:lx,y:ly,z:0}] };
  });
}

export function sampleParticleField(cloud,time,width,height) {
  if (width<=0 || height<=0) return [];
  const sceneLength=11000;
  const scene=Math.floor(time/sceneLength)%4;
  const progress=clamp((time%sceneLength-6000)/5000,0,1);
  const blend=smooth(progress);
  const logoWeight=scene===3 ? 1-blend : scene===2 ? blend : 0;
  const motion=1-logoWeight;
  const yaw=(.32+Math.sin(time*.00011)*.17)*motion;
  const cy=Math.cos(yaw), sy=Math.sin(yaw), pitch=.36*motion;
  const cp=Math.cos(pitch), sp=Math.sin(pitch);
  const scale=Math.min(width*.32,height*.43);
  return cloud.map(p => {
    const from=p.forms[scene], to=p.forms[(scene+1)%4];
    const spread=Math.sin(blend*Math.PI)*.065;
    const x=mix(from.x,to.x,blend)+Math.sin(time*.00045+p.phase)*(.024+spread)*motion;
    const y=mix(from.y,to.y,blend)+Math.sin(time*.00062+p.phase+x*2)*.037*motion;
    const z=mix(from.z,to.z,blend)+Math.cos(time*.00038+p.phase)*.028*motion;
    const rx=x*cy+z*sy, rz=z*cy-x*sy;
    const ry=y*cp-rz*sp, depth=y*sp+rz*cp;
    const perspective=3.8/(3.8+depth*.28);
    const near=clamp((1.1-depth)/2.2,0,1);
    return {
      x:width*.5+rx*scale*perspective,
      y:height*.53-ry*scale*perspective,
      radius:p.radius*(.8+near*.6)*perspective,
      opacity:.24+near*.48,
      highlight:p.highlight,
      accent:mix(Number(p.highlight),p.logoAccent,logoWeight),
    };
  });
}

export function dotsPath(points,highlight=false) {
  return points.filter(p=>p.highlight===highlight).map(p=>{
    const r=p.radius.toFixed(2), d=(p.radius*2).toFixed(2);
    return `M${(p.x-p.radius).toFixed(2)},${p.y.toFixed(2)}a${r},${r} 0 1,0 ${d},0a${r},${r} 0 1,0 -${d},0`;
  }).join('');
}
