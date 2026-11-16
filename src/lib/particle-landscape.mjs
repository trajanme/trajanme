import logo from '../data/logo-particles.json' with { type: 'json' };

// Original particle geometry for daywizz. The same projection powers Canvas and the SVG fallback.
export function shouldAnimateLandscape({ reducedMotion, userPaused, inView, documentHidden }) {
  return !reducedMotion && !userPaused && inView && !documentHidden;
}
const TAU = Math.PI * 2;
const clamp = (v,min,max) => Math.min(max,Math.max(min,v));
const mix = (a,b,t) => a+(b-a)*t;
const smooth = t => t*t*t*(t*(t*6-15)+10);
// Narrow upper reaches meander between the banks and widen gradually toward the mouth.
function riverChannel(z) {
  const downstream=clamp((z+.96)/1.92,0,1);
  return {
    center:.19*Math.sin(z*3.8)+.045*Math.sin(z*7)-.035*z,
    halfWidth:.024+.042*downstream**2,
  };
}
// Continue downstream around the mountain foothills toward the left edge.
function riverPoint(position,lane) {
  const {center,halfWidth}=riverChannel(position);
  const bend=smooth(clamp(((position+.96)/1.92-.48)/.52,0,1));
  return {
    x:center-1.22*bend+lane*halfWidth,
    z:position-1.25*bend+.6*Math.sin(bend*TAU),
  };
}
function random(seed) {
  let value = seed | 0;
  return () => { value ^= value << 13; value ^= value >>> 17; value ^= value << 5; return (value >>> 0)/4294967296; };
}

export function createParticleCloud(count=3000) {
  const next = random(674742);
  return Array.from({ length:count }, (_,id) => {
    const u=next(), v=next(), w=next(), phase=next()*TAU;
    // Two banks rise around one continuous river bed, rather than a floating ribbon.
    const z=(v*2-1)*.96;
    const {center:channel,halfWidth}=riverChannel(z);
    let landscape;
    if (id/count < .26) {
      landscape={...riverPoint(z,u*2-1),y:-.35+.012*Math.sin(z*25+u*8),water:1,lane:u*2-1,flowPosition:z};
    } else {
      const side=id%2===0 ? -1 : 1;
      const inner=channel+side*(halfWidth+.035);
      const x=mix(inner,side*1.19,u);
      const left=.9*Math.exp(-((x+.61)**2/.15+(z+.24)**2/.4));
      const right=.75*Math.exp(-((x-.65)**2/.18+(z-.12)**2/.32));
      landscape={x,y:-.32+left+right+.018*Math.sin(x*9+z*6),z,water:0};
    }
    // All three fruits share one scene: apple, grape bunch, and mandarin.
    const kind=id%3, local=Math.floor(id/3)/Math.ceil(count/3);
    const angle=u*TAU, latitude=Math.acos(1-2*v);
    let fruit;
    if (kind===0) {
      const r=.34*(1+.1*Math.cos(latitude));
      const sx=Math.sin(latitude)*Math.cos(angle)*r, sz=Math.sin(latitude)*Math.sin(angle)*r;
      fruit=local<.94 ? {
        x:-1.0+sx,
        y:.08+Math.cos(latitude)*r*1.06-(Math.cos(latitude)>0 ? .065*Math.exp(-(sx*sx+sz*sz)/.012) : 0),
        z:sz*.85,
      } : local<.975 ? {
        x:-1.0+(u-.5)*.025,y:.39+v*.14,z:(w-.5)*.022,
      } : {
        x:-.98+u*.2,y:.44+Math.sin(u*Math.PI)*.075,z:(v-.5)*Math.sin(u*Math.PI)*.12,
      };
    } else if (kind===1) {
      // Discrete berries form a tapered bunch; gaps keep it readable as grapes.
      const berries=[[-.25,.3,0],[0,.3,.015],[.25,.3,0],[-.25,.05,0],[0,.05,.015],[.25,.05,0],[-.125,-.2,0],[.125,-.2,0],[0,-.45,0]];
      const berry=berries[Math.floor(w*berries.length)];
      const r=.104;
      fruit=local<.96 ? {
        grape:1,
        light:clamp(.55-.28*Math.sin(latitude)*Math.cos(angle)+.35*Math.cos(latitude)+.25*Math.sin(latitude)*Math.sin(angle),0,1),
        x:berry[0]+Math.sin(latitude)*Math.cos(angle)*r,
        y:berry[1]+Math.cos(latitude)*r,
        z:berry[2]+Math.sin(latitude)*Math.sin(angle)*r,
      } : {x:(u-.5)*.025,y:.41+v*.16,z:(w-.5)*.025};
    } else {
      const r=.34+.009*Math.cos(angle*10)*Math.sin(latitude)**2;
      fruit=local<.95 ? {
        x:1.0+Math.sin(latitude)*Math.cos(angle)*r,
        y:-.05+Math.cos(latitude)*r*.8,
        z:Math.sin(latitude)*Math.sin(angle)*r,
      } : {
        x:1.01+u*.22,y:.24+Math.sin(u*Math.PI)*.08,z:(v-.5)*Math.sin(u*Math.PI)*.12,
      };
    }
    const [lx,ly,accent]=logo.points[id % logo.points.length];
    return { id,phase,seed:w,highlight:next()>.965,logoAccent:accent,radius:.62+next()*.68,forms:[landscape,fruit,{x:lx,y:ly,z:0}] };
  });
}

export function sampleParticleField(cloud,time,width,height) {
  if (width<=0 || height<=0) return [];
  const sceneLength=11000;
  const scene=Math.floor(time/sceneLength)%3;
  const progress=clamp((time%sceneLength-6000)/5000,0,1);
  const blend=smooth(progress);
  const logoWeight=scene===2 ? 1-blend : scene===1 ? blend : 0;
  const motion=1-logoWeight;
  const yaw=(.32+Math.sin(time*.00011)*.17)*motion;
  const cy=Math.cos(yaw), sy=Math.sin(yaw), pitch=.36*motion;
  const cp=Math.cos(pitch), sp=Math.sin(pitch);
  const scale=Math.min(width*.32,height*.43);
  return cloud.map(p => {
    const water=mix(p.forms[scene].water || 0,p.forms[(scene+1)%3].water || 0,blend);
    // Water travels downstream in about 3.5 seconds; fade at both ends hides recycling.
    const flowZ=(((p.forms[0].flowPosition ?? p.forms[0].z)+.96+time*.00055)%1.92)-.96;
    const flowing = form => form.water ? {
      ...form,
      ...riverPoint(flowZ,form.lane),
      y:-.35+.012*Math.sin(flowZ*25+p.phase),
    } : form;
    const from=flowing(p.forms[scene]), to=flowing(p.forms[(scene+1)%3]);
    const grape=mix(from.grape || 0,to.grape || 0,blend);
    const wobble=motion*(1-grape*.9);
    const spread=Math.sin(blend*Math.PI)*.065;
    const x=mix(from.x,to.x,blend)+Math.sin(time*.00045+p.phase)*(.024+spread)*wobble;
    const y=mix(from.y,to.y,blend)+Math.sin(time*.00062+p.phase+x*2)*.037*wobble;
    const z=mix(from.z,to.z,blend)+Math.cos(time*.00038+p.phase)*.028*wobble;
    const rx=x*cy+z*sy, rz=z*cy-x*sy;
    const ry=y*cp-rz*sp, depth=y*sp+rz*cp;
    const perspective=3.8/(3.8+depth*.28);
    const near=clamp((1.1-depth)/2.2,0,1);
    const ripple=Math.sin(time*.0063-mix(from.z,to.z,blend)*12+p.seed*.4);
    return {
      x:width*.5+rx*scale*perspective,
      y:height*.53-ry*scale*perspective,
      radius:p.radius*(.8+near*.6)*perspective,
      opacity:(.24+near*.48+water*(.21+.045*ripple))
        *mix(1,clamp((.96-Math.abs(flowZ))/.13,0,1),water)
        *mix(1,.48+mix(from.light || 0,to.light || 0,blend)*.7,grape),
      water,
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
