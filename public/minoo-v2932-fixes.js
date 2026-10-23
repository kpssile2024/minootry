/* Minoo v2.9.32 – chess teaching corrections, test branch only */
(function(){
'use strict';
// The teaching board is 8x8; an L-shaped knight guide must not be drawn as a diagonal.
const originalDraw=window.m299DrawLines;
window.m299DrawLines=function(from,ends,cls='m263-arrow'){
  const s=window._m263piece;
  if(s?.type!=='knight'||!Array.isArray(ends))return originalDraw(from,ends,cls);
  const svg=document.querySelector('.m262-overlay');if(!svg)return;
  const [f,r]=m263Coord(from);
  const cx=x=>(x+.5)*12.5,cy=y=>(8-y+.5)*12.5;
  svg.innerHTML=ends.map((dest,i)=>{
    const [x,y]=m263Coord(dest),dx=x-f,dy=y-r;
    if(!((Math.abs(dx)===2&&Math.abs(dy)===1)||(Math.abs(dx)===1&&Math.abs(dy)===2)))return '';
    // First two squares on the long axis, then one square perpendicular.
    const mid=Math.abs(dx)===2?[x,r]:[f,y];
    return `<polyline class="guide-line ${cls}" points="${cx(f)}%,${cy(r)}% ${cx(mid[0])}%,${cy(mid[1])}% ${cx(x)}%,${cy(y)}%" fill="none" style="animation-delay:${i*.08}s;stroke-dasharray:7 6"/>`;
  }).join('');
};
function paintFeedback(selector,state){
  let correct=true;
  for(const t of state.targets||[]){
    const el=document.querySelector(`${selector} [data-key="${t.k}"]`);
    if(!el)continue;
    const selected=state.selected.has(t.k);
    el.classList.remove('m2932-wrong','m2932-correct','m2932-missing','m262-wrong');
    if(t.reachable&&selected)el.classList.add('m2932-correct');
    else if(t.reachable&&!selected){el.classList.add('m2932-missing');correct=false;}
    else if(!t.reachable&&selected){el.classList.add('m2932-wrong');correct=false;}
  }
  return correct;
}
window.m263PieceCheck=function(){
 const s=window._m263piece;if(!s)return;
 const ok=paintFeedback('.m263-quiz',s);
 if(!ok){if(typeof m299Play==='function')m299Play(M299_FEEDBACK.bad);return modal('<h2>Bir daha bakalım 🌱</h2><p>🟢 Doğru seçimler, 🟡 kaçırdığın doğru hedefler, 🔴 yanlış seçimler.</p><div class="modal-actions"><button onclick="closeModal()">Yeniden Dene</button></div>')}
 if(typeof m299Play==='function')m299Play(M299_FEEDBACK.ok);
 if(s.round<4)return modal('<h2>Aferin! 🎉</h2><p>Yeşil tikli hedeflerin hepsi doğru.</p><div class="modal-actions"><button onclick="closeModal();window._m263piece.round++;m263PieceQuiz()">Sonraki Soru →</button></div>');
 return modal('<h2>Aferin! 🎉</h2><p>Taş alma alıştırmasını tamamladın.</p><div class="modal-actions"><button onclick="closeModal();m262Home()">Ana Sayfa</button></div>');
};
window.m262RookCheck=function(){
 const s=window._m262rook;if(!s)return;
 const ok=paintFeedback('.rook-quiz',s);
 if(!ok){if(typeof m299Play==='function')m299Play(M299_FEEDBACK.bad);return modal('<h2>Bir daha bakalım 🌱</h2><p>🟢 Doğru, 🟡 yapılmayan doğru, 🔴 yanlış seçim.</p><div class="modal-actions"><button onclick="closeModal()">Yeniden Dene</button></div>')}
 if(typeof m299Play==='function')m299Play(M299_FEEDBACK.ok);
 if(s.round<4)return modal('<h2>Aferin! 🎉</h2><div class="modal-actions"><button onclick="closeModal();window._m262rook.round++;m262RookQuiz()">Sonraki Soru →</button></div>');
 return modal('<h2>Aferin! 🎉</h2><p>Kale alıştırmasını tamamladın.</p><div class="modal-actions"><button onclick="closeModal();m262Home()">Ana Sayfa</button></div>');
};
})();
