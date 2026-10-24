/* Minoo v2.9.31 — isolated test additions */
(function(){
'use strict';
let halfMoves=0, saved=false;
const oldNew=m280New;
m280New=function(level){halfMoves=0;saved=false;return oldNew.apply(this,arguments)};
function saveChess(result){
 if(saved||!studentSession?.id||teacherPreviewMode)return;
 saved=true;
 api(`/api/student/${studentSession.id}/computer-chess-history`,{method:'POST',body:JSON.stringify({level:m280.level,result,move_count:Math.ceil(halfMoves/2)})})
 .catch(e=>{saved=false;notify('Maç geçmişi kaydedilemedi: '+e.message)});
}
const after=m280AfterMove;
m280AfterMove=function(who){
 halfMoves++;
 const side=m280.turn,legal=m280Legal(m280,side),check=m280Check(m280,side);
 // Terminal chess results are recorded by the shared m302 completion handler.
 return after.apply(this,arguments);
};
const oldResign=m296Resign;
m296Resign=function(){if(confirm('Oyundan pes ederek ayrılmak istiyor musun?')){saveChess('loss');m280ChooseLevel()}};
function chessList(rows){
 if(!rows?.length)return '<p>Henüz tamamlanmış bilgisayara karşı satranç maçı yok.</p>';
 const labels={win:'🏆 Kazandı',loss:'💪 Kaybetti',draw:'🤝 Berabere'};
 return `<div class="m31-history-list">${rows.map(x=>`<div class="m31-history-row"><strong>${labels[x.result]||'Maç'}</strong><span>${['','Kolay','Orta','Zor'][x.level]||'Seviye '+x.level}</span><span>${Number(x.move_count)||0} hamle</span><small>${new Date(x.created_at).toLocaleDateString('tr-TR')}</small></div>`).join('')}</div>`;
}
async function addStudentHistory(){
 const host=document.querySelector('.m299-history main,.m299-history');if(!host||!studentSession)return;
 let sec=document.querySelector('#m31-chess-history');if(sec)return;
 sec=document.createElement('section');sec.id='m31-chess-history';sec.className='card wide';sec.innerHTML='<h2>♟️ Bilgisayara Karşı Satranç Geçmişim</h2><p>Yükleniyor…</p>';host.appendChild(sec);
 try{const rows=await api(`/api/student/${studentSession.id}/computer-chess-history`);if(sec.isConnected)sec.innerHTML='<h2>♟️ Bilgisayara Karşı Satranç Geçmişim</h2>'+chessList(rows)}catch(e){if(sec.isConnected)sec.innerHTML='<h2>♟️ Satranç Geçmişim</h2><p>'+esc(e.message)+'</p>'}
}
const oldHistory=studentHistory;
studentHistory=async function(){await oldHistory.apply(this,arguments);await addStudentHistory()};
const oldProfile=profile;
profile=async function(id){await oldProfile.apply(this,arguments);const card=document.querySelector('#modal .modal-card');if(!card)return;const section=document.createElement('section');section.className='m31-profile-history';section.innerHTML='<h3>♟️ Bilgisayara Karşı Satranç</h3><p>Yükleniyor…</p>';card.appendChild(section);try{const rows=await api(`/api/students/${id}/computer-chess-history`);if(section.isConnected)section.innerHTML='<h3>♟️ Bilgisayara Karşı Satranç</h3>'+chessList(rows)}catch(e){if(section.isConnected)section.innerHTML='<h3>♟️ Satranç Geçmişi</h3><p>'+esc(e.message)+'</p>'}};
// Dama — beginner-friendly 8x8 game against a simple computer opponent.
let board=[],turn='w',selected=null,moves=[],finished=false,busy=false,turnCount=0,matchSaved=false,assignedDama=0;
async function saveDama(result){if(matchSaved||!studentSession?.id||teacherPreviewMode)return;matchSaved=true;try{await api(`/api/student/${studentSession.id}/computer-checkers-history`,{method:'POST',body:JSON.stringify({result,move_count:turnCount})});if(assignedDama)await api(`/api/assignments/${assignedDama}/complete`,{method:'POST'})}catch(e){matchSaved=false;notify('Dama geçmişi kaydedilemedi: '+e.message)}}
function inside(r,c){return r>=0&&r<8&&c>=0&&c<8}
function legalFor(r,c,b=board){
 const p=b[r]?.[c];if(!p)return[];const color=p.toLowerCase(),king=p===p.toUpperCase(),dirs=king?[-1,1]:(color==='w'?[-1]:[1]);const out=[];
 for(const dr of dirs)for(const dc of [-1,1]){
  if(king){let y=r+dr,x=c+dc,enemy=null;while(inside(y,x)){
   if(b[y][x]){if(b[y][x].toLowerCase()===color||enemy)break;enemy=[y,x]}
   else out.push(enemy?{r:y,c:x,cap:enemy}:{r:y,c:x});
   y+=dr;x+=dc;
  }}else{const y=r+dr,x=c+dc;if(!inside(y,x))continue;if(!b[y][x])out.push({r:y,c:x});else if(b[y][x].toLowerCase()!==color&&inside(y+dr,x+dc)&&!b[y+dr][x+dc])out.push({r:y+dr,c:x+dc,cap:[y,x]})}
 }
 return out;
}
function allMoves(color,b=board){const out=[];for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(b[r][c]?.toLowerCase()===color)for(const m of legalFor(r,c,b))out.push({from:[r,c],...m});return out.some(x=>x.cap)?out.filter(x=>x.cap):out}
function start(g){assignedDama=Number(g?.assignment_id||0);board=Array.from({length:8},()=>Array(8).fill(null));for(let r=0;r<3;r++)for(let c=0;c<8;c++)if((r+c)%2)board[r][c]='b';for(let r=5;r<8;r++)for(let c=0;c<8;c++)if((r+c)%2)board[r][c]='w';turn='w';selected=null;moves=[];finished=false;busy=false;turnCount=0;matchSaved=false;draw()}
function draw(){
 const sq=board.map((row,r)=>row.map((p,c)=>`<button class="m31-sq ${(r+c)%2?'dark':'light'} ${selected?.[0]===r&&selected?.[1]===c?'selected':''} ${moves.some(m=>m.r===r&&m.c===c)?'target':''}" onclick="m31DamaTap(${r},${c})" aria-label="${r+1}. satır ${c+1}. sütun">${p?`<span class="m31-piece ${p.toLowerCase()==='w'?'white':'black'}">${p===p.toUpperCase()?'★':''}</span>`:''}</button>`).join('')).join('');
 app.innerHTML=`<header><button class="ghost" onclick="studentDash()">← Oyunlarıma Dön</button><b>🔴 Dama Oynayalım</b><button class="ghost" onclick="m31DamaStart()">Yeniden Başlat</button></header><main class="kid m31-dama"><section class="card"><h2>🔴 ${finished?'Oyun bitti':turn==='w'?'Sıra sende!':'Bilgisayar düşünüyor…'}</h2><p>Kırmızı taşlar senin. Çapraz ilerle, rakip taşı üzerinden atlayarak al. Taş alma varsa önce onu yap!</p><div class="m31-board">${sq}</div><p class="hint">Son sıraya ulaşan taş yıldızlı dama olur ve iki yöne gidebilir.</p></section></main>`;
}
function apply(m){const [r,c]=m.from,p=board[r][c];board[r][c]=null;board[m.r][m.c]=(p==='w'&&m.r===0)?'W':(p==='b'&&m.r===7)?'B':p;if(m.cap)board[m.cap[0]][m.cap[1]]=null;return Boolean(m.cap)}
function finishTurn(color){turnCount++;const other=color==='w'?'b':'w';turn=other;selected=null;moves=[];const remain=board.some(row=>row.some(p=>p?.toLowerCase()===other));if(!remain||!allMoves(other).length){finished=true;saveDama(color==='w'?'win':'loss');draw();modal(`<h2>${color==='w'?'🎉 Tebrikler, kazandın!':'💪 Bilgisayar kazandı'}</h2><p>Bir oyun daha oynayabilirsin.</p><button onclick="closeModal();m31DamaStart()">Tekrar Oyna</button>`);return}draw();if(other==='b'){busy=true;setTimeout(computer,450)}}
function humanTap(r,c){if(finished||busy||turn!=='w')return;const available=allMoves('w');const choice=moves.find(m=>m.r===r&&m.c===c);if(choice&&selected){const cap=apply({from:selected,...choice});if(cap){const again=legalFor(r,c).filter(x=>x.cap);if(again.length){selected=[r,c];moves=again;draw();return}}finishTurn('w');return}if(board[r][c]?.toLowerCase()==='w'){selected=[r,c];moves=available.filter(m=>m.from[0]===r&&m.from[1]===c);draw();if(!moves.length)notify('Bu taş şu anda ilerleyemez. Yeşil hedefi olan taşı seç.')}else if(selected)notify('Yeşil işaretli hedef kareye dokun. Taş alma zorunlu olabilir.')}
function computer(){if(finished||turn!=='b')return;const opts=allMoves('b');if(!opts.length)return finishTurn('w');const choice=opts.find(x=>x.cap)||opts[Math.floor(Math.random()*opts.length)];const cap=apply(choice);if(cap){let r=choice.r,c=choice.c;while(true){const again=legalFor(r,c).filter(x=>x.cap);if(!again.length)break;const m=again[0];apply({from:[r,c],...m});r=m.r;c=m.c}}busy=false;finishTurn('b')}
window.m31DamaTap=humanTap;window.m31DamaStart=start;
const previousDamaHistory=studentHistory;
studentHistory=async function(){await previousDamaHistory.apply(this,arguments);if(!studentSession)return;const host=document.querySelector('main.m299-history');if(!host)return;const sec=document.createElement('section');sec.className='card wide';sec.innerHTML='<h2>🔴 Dama Geçmişim</h2><p>Yükleniyor…</p>';host.appendChild(sec);try{const rows=await api(`/api/student/${studentSession.id}/computer-checkers-history`);if(sec.isConnected)sec.innerHTML='<h2>🔴 Dama Geçmişim</h2>'+damaHistoryList(rows)}catch(e){sec.innerHTML='<h2>🔴 Dama Geçmişim</h2><p>'+esc(e.message)+'</p>'}};
function damaHistoryList(rows){return rows.length?`<div class="m31-history-list">${rows.map(x=>`<div class="m31-history-row"><b>${x.result==='win'?'🏆 Kazandı':x.result==='loss'?'💪 Kaybetti':'🤝 Berabere'}</b><span>${Number(x.move_count)||0} tur</span><small>${formatDate(x.created_at)}</small></div>`).join('')}</div>`:'<p>Henüz tamamlanan dama maçı yok.</p>'}
const previousDamaProfile=profile;
profile=async function(id){await previousDamaProfile.apply(this,arguments);const card=document.querySelector('#modal .modal-card');if(!card)return;const sec=document.createElement('section');sec.className='m31-profile-history';sec.innerHTML='<h3>🔴 Dama Geçmişi</h3><p>Yükleniyor…</p>';card.appendChild(sec);try{const rows=await api(`/api/students/${id}/computer-checkers-history`);if(sec.isConnected)sec.innerHTML='<h3>🔴 Dama Geçmişi</h3>'+damaHistoryList(rows)}catch(e){if(sec.isConnected)sec.innerHTML='<h3>🔴 Dama Geçmişi</h3><p>'+esc(e.message)+'</p>'}};
const _damaPlayBase=playGame;playGame=function(g){if(g?.game_type==='checkers')return start(g);return _damaPlayBase(g)};
const oldDash=studentDash;
studentDash=async function(){await oldDash.apply(this,arguments);const main=app.querySelector('main');if(main&&!main.querySelector('#m31-dama-entry')){const b=document.createElement('button');b.id='m31-dama-entry';b.className='m31-dama-entry';b.innerHTML='🔴 <strong>Dama Oynayalım</strong><small>Bilgisayara karşı dama • Deneme oyunu</small>';b.onclick=()=>start();main.appendChild(b)}};
const style=document.createElement('style');style.textContent=`.m31-history-list{display:grid;gap:7px}.m31-history-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:9px;padding:11px;border-radius:12px;background:#f4f7f5}.m31-profile-history{margin-top:18px;border-top:1px solid #ddd;padding-top:14px}.m31-dama-entry{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:18px auto;padding:18px;border-radius:18px;background:#fff1e6;color:#423b36;border:2px solid #d9b59d;max-width:800px;width:100%;font-size:22px}.m31-dama-entry small{font-size:13px}.m31-board{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));grid-template-rows:repeat(8,minmax(0,1fr));width:min(94vw,530px);aspect-ratio:1;margin:auto;border:7px solid #b38969;border-radius:12px;overflow:hidden}.m31-dama .card{min-width:0}.m31-sq{display:grid;place-items:center;border:0!important;border-radius:0!important;padding:0!important;margin:0!important;width:100%!important;height:100%!important;min-width:0;min-height:0;aspect-ratio:1/1;box-sizing:border-box}.m31-dama .m31-board .m31-sq.light{background:#f9e8d2!important}.m31-dama .m31-board .m31-sq.dark{background:#ad8061!important}.m31-sq.selected{outline:4px solid #f4d14c;outline-offset:-4px}.m31-sq.target{box-shadow:inset 0 0 0 5px #8cd49d}.m31-piece{display:grid;place-items:center;border-radius:50%;width:75%;height:75%;box-shadow:inset 0 -5px 0 #0002,0 3px 4px #0005;font-size:clamp(14px,4vw,28px)}.m31-piece.white{background:#dd6550;border:3px solid #a93e35;color:#fff2c7}.m31-piece.black{background:#293d53;border:3px solid #152536;color:#ffe7a0}`;document.head.appendChild(style);
})();
