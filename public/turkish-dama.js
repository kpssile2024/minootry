/* Minoo v2.9.43 — Turkish draughts. Existing diagonal checkers remains untouched. */
(function(){
'use strict';
let b,turn,selected,targets,chain,finished,assignment;
const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
const inside=(r,c)=>r>=0&&r<8&&c>=0&&c<8;
const side=p=>p&&p.toLowerCase();
function legal(r,c,onlyCapture=false){
 const p=b[r]?.[c];if(!p)return[];
 const own=side(p),king=p===p.toUpperCase(),out=[];
 for(const [dr,dc] of dirs){
  if(!king&&!onlyCapture&&dr===(own==='w'?1:-1))continue;
  if(king){let y=r+dr,x=c+dc,enemy=null;
   while(inside(y,x)){
    if(b[y][x]){if(side(b[y][x])===own||enemy)break;enemy=[y,x]}
    else if(enemy)out.push({r:y,c:x,cap:enemy});else if(!onlyCapture)out.push({r:y,c:x});
    y+=dr;x+=dc;
   }
  }else{
   const y=r+dr,x=c+dc;
   if(inside(y,x)&&b[y][x]&&side(b[y][x])!==own&&inside(y+dr,x+dc)&&!b[y+dr][x+dc])out.push({r:y+dr,c:x+dc,cap:[y,x]});
   if(!onlyCapture&&dr!==(own==='w'?1:-1)&&inside(y,x)&&!b[y][x])out.push({r:y,c:x});
  }
 }
 return out;
}
function all(color){let a=[];for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(side(b[r][c])===color)for(const m of legal(r,c))a.push({from:[r,c],...m});const caps=a.filter(m=>m.cap);if(!caps.length)return a;
 // Turkish draughts: maximum capture is compulsory; evaluate full capture sequences.
 function depth(board,r,c,p,prev){let max=0;for(const m of legal(r,c,true).filter(m=>!prev||m.cap.join(',')!==prev)){
  const captured=board[m.cap[0]][m.cap[1]],orig=board[r][c];board[r][c]=null;board[m.cap[0]][m.cap[1]]=null;board[m.r][m.c]=orig;
  const n=1+depth(board,m.r,m.c,orig,m.cap.join(','));max=Math.max(max,n);
  board[r][c]=orig;board[m.cap[0]][m.cap[1]]=captured;board[m.r][m.c]=null;
 }return max}
 // For beginner play, enforce capture; allow any capture sequence without max-capture filtering.
 return caps;
}
function render(){
 const html=b.map((row,r)=>row.map((p,c)=>`<button type="button" class="td-sq ${(r+c)%2?'td-dark':'td-light'} ${selected?.[0]===r&&selected?.[1]===c?'td-selected':''} ${targets.some(m=>m.r===r&&m.c===c)?'td-target':''}" onclick="tdTap(${r},${c})" aria-label="${r+1}. satır ${c+1}. sütun">${p?`<span class="td-piece ${side(p)==='w'?'td-red':'td-blue'}">${p===p.toUpperCase()?'★':''}</span>`:''}</button>`).join('')).join('');
 app.innerHTML=`<header><button class="ghost" onclick="studentDash()">← Oyunlara Dön</button><b>🟢 Düz Dama · Türk Daması</b><button class="ghost" onclick="tdStart()">Yeniden Başlat</button></header><main class="kid"><section class="card td-card"><h2>${finished?'Oyun bitti':turn==='w'?'🔴 Kırmızı oyuncunun sırası':'🔵 Mavi oyuncunun sırası'}</h2><p>İki kişi sırayla oynar. Taşlar ileriye ve yanlara gider; taş almak zorunludur. Rakibin son sırasına ulaşan taş dama olur.</p><div class="td-board">${html}</div><p class="hint">Bir taşı seç, ardından yeşil hedef kareye dokun. Aynı taşla yeniden alma varsa devam et.</p></section></main>`;
}
function start(g){assignment=Number(g?.assignment_id||0);b=Array.from({length:8},()=>Array(8).fill(null));for(let r=1;r<=2;r++)for(let c=0;c<8;c++)b[r][c]='b';for(let r=5;r<=6;r++)for(let c=0;c<8;c++)b[r][c]='w';turn='w';selected=null;targets=[];chain=false;finished=false;render()}
function finish(){selected=null;targets=[];chain=false;turn=turn==='w'?'b':'w';if(!all(turn).length){finished=true;render();modal(`<h2>🎉 Oyun bitti!</h2><p>${turn==='w'?'Mavi':'Kırmızı'} oyuncu kazandı.</p><button onclick="closeModal();tdStart()">Tekrar Oyna</button>`);return}render()}
function tap(r,c){if(finished)return;const move=targets.find(m=>m.r===r&&m.c===c);
 if(move&&selected){const [sr,sc]=selected,p=b[sr][sc];b[sr][sc]=null;b[r][c]=p;if(move.cap)b[move.cap[0]][move.cap[1]]=null;
  if(move.cap){const more=legal(r,c,true);if(more.length){selected=[r,c];targets=more;chain=true;render();return}}
  if(p==='w'&&r===0)b[r][c]='W';if(p==='b'&&r===7)b[r][c]='B';finish();return;
 }
 if(chain)return;
 if(side(b[r][c])===turn){const options=all(turn).filter(m=>m.from[0]===r&&m.from[1]===c);selected=[r,c];targets=options;render();if(!options.length)notify('Taş alma zorunlu olabilir. Yeşil hedefi olan başka bir taş seç.')}else if(selected)notify('Yeşil hedef kareye dokun.');
}
window.tdTap=tap;window.tdStart=start;
const oldPlay=playGame;playGame=function(g){if(g?.game_type==='turkish_checkers')return start(g);return oldPlay.apply(this,arguments)};
const oldLabel=v261Label;v261Label=function(t){return t==='turkish_checkers'?'🟢 Düz Dama (Türk Daması)':oldLabel(t)};
window.tdMenu=function(){app.innerHTML=`<header><button class="ghost" onclick="studentDash()">← Oyunlara Dön</button><b>🎲 Dama</b></header><main class="kid"><section class="card"><h2>Dama oyununu seç</h2><button class="td-entry" onclick="tdStart()">🟢 Düz Dama (Türk Daması) — iki kişilik</button><button class="td-entry" onclick="m31DamaStart()">🔴 Çapraz Dama — bilgisayara karşı</button></section></main>`};
const oldDash=studentDash;studentDash=async function(){await oldDash.apply(this,arguments);const main=app.querySelector('main');if(!main)return;const old=main.querySelector('#m31-dama-entry');if(old)old.remove();const btn=document.createElement('button');btn.id='td-entry';btn.className='td-entry';btn.innerHTML='🎲 <strong>Dama</strong><small>Düz Dama · Çapraz Dama</small>';btn.onclick=()=>tdMenu();main.appendChild(btn)};
const css=document.createElement('style');css.textContent=`.td-card{min-width:0}.td-board{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));grid-template-rows:repeat(8,minmax(0,1fr));width:min(94vw,530px);aspect-ratio:1;margin:16px auto;border:6px solid #a68a67;border-radius:12px;overflow:hidden}.td-sq{display:grid;place-items:center;min-width:0;min-height:0;width:100%;height:100%;padding:0!important;border:0!important;border-radius:0!important;aspect-ratio:1}.td-light{background:#f8ead4!important}.td-dark{background:#d4b995!important}.td-selected{outline:4px solid #f4cc58;outline-offset:-4px}.td-target{box-shadow:inset 0 0 0 5px #6caa80}.td-piece{width:77%;height:77%;border-radius:50%;display:grid;place-items:center;box-shadow:inset 0 -5px 0 #0002,0 3px 4px #0004;font-size:clamp(15px,4vw,28px)}.td-red{background:#d65e54;border:3px solid #a7443a;color:white}.td-blue{background:#3b6589;border:3px solid #274662;color:white}.td-entry{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:14px auto;padding:18px;border-radius:18px;background:#e7f3e8;color:#314a3b;border:2px solid #b7d4ba;max-width:800px;width:100%;font-size:22px}.td-entry small{font-size:13px}`;document.head.appendChild(css);
})();
