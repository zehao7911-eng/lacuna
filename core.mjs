export const TAU=Math.PI*2;
export const RADIUS=.76;
export const GAP=Math.PI*.32;
export const CLASP_TOL=.14;
export const SNAP=.28;
export const CATALOG=[
 {name:'A Little Opening',note:'Two gaps. One golden clasp.',set:0,p:[[-.82,0],[.82,0]],e:[[0,1]]},
 {name:'A Lovely Little Chain',note:'Free the ends, then the middle.',set:0,p:[[-1.64,0],[0,0],[1.64,0]],e:[[0,1],[1,2]]},
 {name:'Three Is a Charm',note:'One ring can meet more than one clasp.',set:0,p:[[-.82,.48],[.82,.48],[0,-.94]],e:[[0,1],[1,2],[2,0]]},
 {name:'The Velvet Waltz',note:'Follow the golden trail.',set:1,p:[[-.82,1.42],[.82,.48],[-.82,-.48],[.82,-1.42]],e:[[0,1],[1,2],[2,3]]},
 {name:'Little Constellation',note:'A new opening at every turn.',set:1,p:[[0,0],[-1.64,0],[1.64,0],[0,1.64],[0,-1.64]],e:[[0,1],[0,2],[0,3],[0,4]]},
 {name:'The Moonlit Pair',note:'Open the loops, then the bridge.',set:2,p:[[-1.64,.76],[0,.76],[1.64,.76],[-1.64,-.88],[0,-.88],[1.64,-.88]],e:[[0,1],[1,2],[3,4],[4,5],[0,3],[2,5],[1,4]]},
 {name:'Petals After Dark',note:'A patient turn is a beautiful thing.',set:2,p:[[0,0],[-1.55,.52],[0,1.64],[1.55,.52],[.96,-1.33],[-.96,-1.33]],e:[[0,1],[0,2],[0,3],[0,4],[0,5],[1,2],[3,4]]},
 {name:'The Last Little Knot',note:'Every knot has an opening.',set:2,p:[[-1.64,1.18],[0,1.18],[1.64,1.18],[-1.64,-.46],[0,-.46],[1.64,-.46],[0,-2.1]],e:[[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[4,6]]}
];
export const wrap=a=>((a%TAU)+TAU)%TAU;
export const delta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const copy=o=>JSON.parse(JSON.stringify(o));
export function ports(r,i){return CATALOG[r.level].e.flatMap(([a,b],id)=>r.open.includes(id)||a!==i&&b!==i?[]:[{id,angle:wrap(Math.atan2(CATALOG[r.level].p[a===i?b:a][1]-CATALOG[r.level].p[i][1],CATALOG[r.level].p[a===i?b:a][0]-CATALOG[r.level].p[i][0]))}]);}
export function makeRound(level=0){level=clamp(Math.floor(level),0,CATALOG.length-1);let c=CATALOG[level];return{level,phase:'ready',angles:c.p.map((p,i)=>wrap((i%2?Math.PI:0)+1.22+i*.29)),open:[],selected:0,turns:0,hints:0,undos:0,elapsed:0,score:0,chain:0,bestChain:0,last:-99,opening:null,undo:null};}
export function active(r,i){return ports(r,i).length>0;}
function snapshot(r){return{angles:[...r.angles],open:[...r.open],selected:r.selected,score:r.score,chain:r.chain,bestChain:r.bestChain,last:r.last};}
export function beginTurn(r,i){if(r.phase==='won'||r.opening||!Number.isInteger(i)||!active(r,i))return false;r.undo=snapshot(r);r.selected=i;r.turns++;r.phase='play';return true;}
export function rotate(r,i,angle){if(r.phase==='won'||r.opening||!Number.isFinite(angle)||!active(r,i))return false;r.angles[i]=wrap(angle);return true;}
export function release(r,soft=true){if(r.phase==='won'||r.opening)return;let p=ports(r,r.selected).sort((a,b)=>Math.abs(delta(r.angles[r.selected],a.angle))-Math.abs(delta(r.angles[r.selected],b.angle)))[0];if(!p)return;let leaving=r.undo&&Math.abs(delta(r.undo.angles[r.selected],p.angle))<.02&&Math.abs(delta(r.angles[r.selected],p.angle))>.02;if(!leaving&&Math.abs(delta(r.angles[r.selected],p.angle))<(soft?SNAP:.09))r.angles[r.selected]=p.angle;}
export function aligned(r,id){let [a,b]=CATALOG[r.level].e[id],p=CATALOG[r.level].p,angle=Math.atan2(p[b][1]-p[a][1],p[b][0]-p[a][0]);return !r.open.includes(id)&&Math.abs(delta(r.angles[a],angle))<=CLASP_TOL&&Math.abs(delta(r.angles[b],angle+Math.PI))<=CLASP_TOL;}
export function step(r,dt){let events=[];if(r.phase!=='play')return events;dt=clamp(dt,0,.05);r.elapsed+=dt;if(r.opening){r.opening.t+=dt;if(r.opening.t>=.68){let id=r.opening.id;r.open.push(id);r.open.sort((a,b)=>a-b);r.opening=null;r.chain=r.elapsed-r.last<6?r.chain+1:1;r.last=r.elapsed;r.bestChain=Math.max(r.bestChain,r.chain);let points=300+Math.min(r.chain,4)*50;r.score+=points;events.push({type:'unlinked',id,points,chain:r.chain});if(r.open.length===CATALOG[r.level].e.length){r.phase='won';events.push({type:'win'});}else if(!active(r,r.selected))r.selected=r.angles.findIndex((_,i)=>active(r,i));}}else{let id=CATALOG[r.level].e.findIndex((_,id)=>aligned(r,id));if(id>=0){r.opening={id,t:0};events.push({type:'click',id});}}return events;}
export function guide(r){if(r.phase==='won'||r.opening)return null;let id=CATALOG[r.level].e.findIndex((_,i)=>!r.open.includes(i));if(id<0)return null;let [a,b]=CATALOG[r.level].e[id],p=CATALOG[r.level].p;let ang=Math.atan2(p[b][1]-p[a][1],p[b][0]-p[a][0]);r.hints++;return{id,a,b,angles:[wrap(ang),wrap(ang+Math.PI)]};}
export function undo(r){if(!r.undo||r.phase==='won')return false;let s=r.undo;r.undo=null;Object.assign(r,copy(s));r.opening=null;r.phase='play';r.undos++;return true;}
export function stars(r){if(r.phase!=='won')return 0;return 1+(r.hints===0?1:0)+(r.turns<=CATALOG[r.level].e.length*12+2?1:0);}
export function defaultProfile(){return{v:1,best:Array(8).fill(0),scores:Array(8).fill(0),round:makeRound(),finish:0,rewards:{like:false,comment:false},settings:{sound:true,light:false,gentle:false,snap:true}};}
export const totalStars=p=>p.best.reduce((s,x)=>s+x,0);
export function bank(p,r){if(r.phase!=='won')return;p.best[r.level]=Math.max(p.best[r.level],stars(r));p.scores[r.level]=Math.max(p.scores[r.level],r.score);}
export function cleanRound(raw){try{if(!raw||typeof raw!=='object'||!Number.isInteger(raw.level)||!CATALOG[raw.level])return null;let r=makeRound(raw.level),c=CATALOG[r.level];if(!Array.isArray(raw.angles)||raw.angles.length!==c.p.length||raw.angles.some(x=>!Number.isFinite(x)))return null;if(!Array.isArray(raw.open)||raw.open.some(x=>!Number.isInteger(x)||!c.e[x])||new Set(raw.open).size!==raw.open.length)return null;r.angles=raw.angles.map(wrap);r.open=[...raw.open].sort((a,b)=>a-b);r.phase=r.open.length===c.e.length?'won':raw.phase==='ready'?'ready':'play';r.selected=Number.isInteger(raw.selected)&&raw.selected>=0&&raw.selected<c.p.length?raw.selected:0;for(let n of ['turns','hints','undos','score','chain','bestChain'])r[n]=clamp(Math.floor(Number.isFinite(raw[n])?raw[n]:0),0,1000000);r.elapsed=clamp(Number.isFinite(raw.elapsed)?raw.elapsed:0,0,1e7);r.last=clamp(Number.isFinite(raw.last)?raw.last:-99,-99,r.elapsed);if(raw.opening&&r.phase==='play'&&Number.isInteger(raw.opening.id)&&c.e[raw.opening.id]&&!r.open.includes(raw.opening.id)&&aligned(r,raw.opening.id))r.opening={id:raw.opening.id,t:clamp(Number.isFinite(raw.opening.t)?raw.opening.t:0,0,.68)};
 if(raw.undo){let u=cleanRound({...r,...raw.undo,undo:null,opening:null,phase:'play'});if(u&&u.phase!=='won')r.undo=snapshot(u);}return r;}catch{return null;}}
export function cleanProfile(raw){let p=defaultProfile();if(!raw||typeof raw!=='object')return p;for(let a of ['best','scores'])if(Array.isArray(raw[a]))p[a]=p[a].map((_,i)=>clamp(Math.floor(Number.isFinite(raw[a][i])?raw[a][i]:0),0,a==='best'?3:1e7));p.rewards={like:raw.rewards?.like===true,comment:raw.rewards?.comment===true};for(let k of Object.keys(p.settings))if(typeof raw.settings?.[k]==='boolean')p.settings[k]=raw.settings[k];p.round=cleanRound(raw.round)||makeRound();p.finish=Number.isInteger(raw.finish)&&raw.finish>=0&&raw.finish<=2?raw.finish:0;if(p.finish===1&&totalStars(p)<8&&!p.rewards.like)p.finish=0;if(p.finish===2&&totalStars(p)<16&&!p.rewards.comment)p.finish=0;return p;}
export function mergeProfile(local,remote){let p=cleanProfile(local),q=cleanProfile(remote);for(let a of ['best','scores'])p[a]=p[a].map((x,i)=>Math.max(x,q[a][i]));p.rewards={like:p.rewards.like||q.rewards.like,comment:p.rewards.comment||q.rewards.comment};return p;}
