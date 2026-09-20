
(function(){
 const s=document.createElement('style');s.textContent=`
 .setup-world{min-height:100vh;padding:18px;background:linear-gradient(180deg,#e9f8ff,#f2fff4)}
 .setup-card{max-width:900px;margin:auto;background:rgba(255,255,255,.8);border-radius:28px;padding:18px;box-shadow:0 14px 40px rgba(55,90,110,.12)}
 .setup-guide{display:flex;align-items:center;gap:14px;margin-bottom:12px}.setup-guide h1{margin:0;color:#7048c7}.setup-guide p{margin:5px 0;font-weight:700;color:#31506b}
 .setup-mascot{font-size:42px;background:#d9f8df;width:66px;height:66px;border-radius:50%;display:grid;place-items:center}
 .setup-board{width:min(92vw,560px);aspect-ratio:1;margin:10px auto;display:grid;grid-template-columns:repeat(8,minmax(0,1fr));grid-template-rows:repeat(8,minmax(0,1fr));border:8px solid #c99b65;border-radius:14px;overflow:hidden;box-shadow:0 8px 22px rgba(70,50,30,.16)}
 .setup-square{position:relative;display:grid;place-items:center;min-width:0;min-height:0;width:100%;height:100%;overflow:hidden}.setup-square.light{background:#f7e6c8}.setup-square.dark{background:#b98f68}.setup-square.home:empty:after{content:'';width:62%;height:62%;border:2px dashed rgba(60,50,40,.35);border-radius:8px}
 .setup-square .rank,.setup-square .file{position:absolute;font-size:10px;font-weight:900;opacity:.65}.setup-square .rank{left:3px;top:2px}.setup-square .file{right:3px;bottom:1px}
 .setup-piece,.tray-piece{font-family:"Times New Roman",serif;line-height:1}.setup-piece{font-size:clamp(26px,6vw,48px);cursor:pointer;z-index:2;text-shadow:none;max-width:90%;max-height:90%}.setup-piece.white,.tray-piece.white{color:#fff;-webkit-text-stroke:1.6px #222;text-shadow:0 1px 1px rgba(0,0,0,.18)}.setup-piece.black,.tray-piece.black{color:#050505;-webkit-text-stroke:.4px #050505;text-shadow:none}
 .setup-tray{max-width:760px;margin:16px auto;display:flex;flex-wrap:wrap;justify-content:center;gap:7px;padding:12px;border-radius:18px;background:#f7f0ff}
 .tray-piece{border:2px solid transparent;background:#fff;border-radius:12px;}.tray-piece.white{background:#66717d;border-color:#aeb7c0}.tray-piece.black{background:#f4eadc;border-color:#d8c5aa}.tray-piece{padding:7px 8px;font-size:34px;min-width:49px;box-shadow:0 3px 9px rgba(60,60,80,.09);cursor:pointer}.tray-piece small{display:block;font:700 9px system-ui;color:#53606c;margin-top:4px;-webkit-text-stroke:0}
 .tray-piece.selected{border-color:#7b61d1;transform:translateY(-3px);box-shadow:0 7px 15px rgba(90,70,180,.2)}
 .setup-actions{text-align:center}.setup-start{font-size:20px;padding:15px 34px;border-radius:999px;background:linear-gradient(180deg,#52d67c,#20ae58);color:#fff;font-weight:900;border:0;box-shadow:0 8px 18px rgba(30,160,80,.25)}
 .setup-tip{font-weight:800;color:#635083}.setup-square.wrong{animation:setupWrong .4s}.slide-in{animation:setupSlide .45s}.shuffle-pop{animation:setupShuffle .55s}
 @keyframes setupWrong{25%,75%{transform:translateX(-5px)}50%{transform:translateX(5px);background:#f4aaa5}}
 @keyframes setupSlide{from{transform:translateY(35px) scale(.7);opacity:.2}to{transform:none;opacity:1}}
 @keyframes setupShuffle{0%{transform:scale(.9);opacity:.2}60%{transform:scale(1.03)}100%{transform:none;opacity:1}}
 @media(max-width:620px){.setup-card{padding:10px;border-radius:18px}.setup-guide h1{font-size:22px}.setup-guide p{font-size:13px}.setup-mascot{width:48px;height:48px;font-size:30px}.tray-piece{font-size:27px;min-width:41px;padding:6px}.setup-board{border-width:5px}}
 `;document.head.appendChild(s)
})();


(function(){
 const s=document.createElement('style');s.textContent=`
 .bishop-svg{width:72px;height:86px;color:currentColor;display:block;margin:auto}
 .piece-tile.lilac .bishop-svg,.lesson-character.lilac .bishop-svg{color:#a98bd5}
 .chess-piece-grid .piece-tile em{display:block!important;margin-top:8px;font-style:normal;font-weight:800;opacity:.78}
 .board-svg-wrap{width:min(100%,430px);margin:auto}
 .move-board-svg{display:block;width:100%;height:auto;background:#fff;border-radius:18px;box-shadow:0 8px 24px rgba(50,50,70,.10)}
 .board-light{fill:#f7ead8}.board-dark{fill:#c9b69c}.coord{font:700 12px system-ui;fill:#6f665d}
 .move-arrow{stroke-width:5;stroke-linecap:round;stroke-linejoin:round;opacity:.95}
 .king-arrow{stroke-width:4}.knight-arrow{stroke-width:4}.capture-arrow{stroke-dasharray:5 4}
 .svg-piece{font:700 54px "Times New Roman",serif;paint-order:stroke;stroke:#fff;stroke-width:1.5px}
 .teacher-preview-badge{display:inline-block;padding:5px 9px;border-radius:999px;background:#fff3c8;font-weight:800}
 `;document.head.appendChild(s)
})();

const app=document.querySelector('#app');let teacherPass='',currentClass=null,studentSession=null;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
async function api(url,opt={}){opt.headers={...(opt.headers||{}),'Content-Type':'application/json'};if(teacherPass)opt.headers['X-Teacher-Password']=teacherPass;if(studentSession)opt.headers['X-Student-Code']=studentSession.code;const r=await fetch(url,opt);let d={};try{d=await r.json()}catch{}if(!r.ok)throw Error(d.error||'İşlem başarısız');return d}
function notify(msg){let t=document.querySelector('#toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('show'),2600)}
function modal(html){closeModal();const d=document.createElement('div');d.id='modal';d.className='modal';d.innerHTML=`<div class="modal-card">${html}</div>`;d.onclick=e=>{if(e.target===d)closeModal()};document.body.appendChild(d)}
function closeModal(){document.querySelector('#modal')?.remove()}
const avatar=(s,size='')=>s.photo_data?`<img class="avatar ${size}" src="${s.photo_data}" alt="">`:`<div class="avatar placeholder ${size}">🌱</div>`;
function home(){teacherPass='';studentSession=null;currentClass=null;app.innerHTML=`<main class="center"><div class="logo">Minoo <span>v2.2.3</span></div><p class="tag">Oyna • Keşfet • Öğren</p><section class="card"><h2>Öğrenci girişi</h2><input id="scode" placeholder="MIN-XXXXXX" autocomplete="off"><button onclick="studentLogin()">Giriş yap</button></section><button class="link" onclick="teacherLogin()">Öğretmen girişi</button><p class="safe">Reklamsız • Sohbetsiz • Öğretmen kontrollü</p></main>`}
function teacherLogin(){app.innerHTML=`<main class="center teacher-login"><button class="back-link" onclick="home()">← Geri</button><div class="logo">Minoo <span>Öğretmen</span></div><p class="tag">Öğretmen paneline güvenli giriş</p><section class="card login-card"><h2>Öğretmen Girişi</h2><label for="tp">Şifre</label><input id="tp" type="password" placeholder="Şifrenizi girin" autocomplete="current-password" autofocus onkeydown="if(event.key==='Enter')doTeacherLogin()"><button class="login-btn" onclick="doTeacherLogin()">Giriş yap</button></section></main>`}
async function doTeacherLogin(){const p=document.querySelector('#tp').value;if(!p)return;try{teacherPass=p;await api('/api/teacher/login',{method:'POST',body:JSON.stringify({password:p})});closeModal();dashboard()}catch(e){teacherPass='';notify(e.message)}}
async function dashboard(){const cs=await api('/api/classes');app.innerHTML=`<header><div><b>Minoo Öğretmen</b><small>v2.2.3</small></div><button class="ghost" onclick="home()">Çıkış</button></header><main><div class="toolbar"><h1>Sınıflarım</h1><button onclick="addClass()">+ Sınıf</button></div><div class="grid">${cs.map(c=>`<article class="card"><h3>${esc(c.name)}</h3><p>${c.student_count} öğrenci</p><button onclick="openClass(${c.id})">Aç</button><div class="row"><button class="ghost" onclick="renameClass(${c.id},'${encodeURIComponent(c.name)}')">Adını değiştir</button><button class="danger ghost" onclick="deleteClass(${c.id},'${encodeURIComponent(c.name)}')">Sil</button></div></article>`).join('')}</div><hr><div class="toolbar"><h2>Oyun Kütüphanesi</h2><button onclick="gameForm()">+ Oyun ekle</button></div><div id="library"></div></main>`;loadLibrary()}
async function loadLibrary(){const gs=await api('/api/games'),el=document.querySelector('#library');el.innerHTML=gs.length?`<div class="grid">${gs.map(g=>`<article class="card"><h3>${esc(g.title)}</h3><p>${g.game_type==='matching'?'🧩 Minoo Eşleştirme':g.game_type==='chess_intro'?'♟️ Satranç Taşlarını Tanı':g.game_type==='chess_setup'?'♟️ Satranç Taşlarını Dizelim':'🔗 Canva oyunu'}</p><p>${g.completed_count||0}/${g.assigned_count||0} tamamlandı</p><div class="row"><button class="ghost" onclick="teacherPreviewEncoded('${encodeURIComponent(JSON.stringify(g))}')">▶ Oyunu oyna</button><button onclick="gameForm(${g.id},'${encodeURIComponent(g.title)}','${encodeURIComponent(g.canva_url||'')}','${g.game_type||'external'}','${encodeURIComponent(g.game_data||'') }')">Düzenle</button><button class="danger ghost" onclick="deleteGame(${g.id},'${encodeURIComponent(g.title)}')">Sil</button></div></article>`).join('')}</div>`:'<p>Henüz oyun yok.</p>'}
function addClass(){modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>Yeni sınıf</h2><label>Sınıf adı</label><input id="cn" autofocus><div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="saveClass()">Oluştur</button></div>`)}
async function saveClass(){const name=document.querySelector('#cn').value.trim();if(!name)return;try{await api('/api/classes',{method:'POST',body:JSON.stringify({name})});closeModal();dashboard()}catch(e){notify(e.message)}}
function renameClass(id,old){modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>Sınıf adını değiştir</h2><input id="cn" value="${esc(decodeURIComponent(old))}" autofocus><div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="saveRenameClass(${id})">Kaydet</button></div>`)}
async function saveRenameClass(id){const name=document.querySelector('#cn').value.trim();if(!name)return;try{await api('/api/classes/'+id,{method:'PATCH',body:JSON.stringify({name})});closeModal();dashboard()}catch(e){notify(e.message)}}
async function deleteClass(id,name){if(confirm(`${decodeURIComponent(name)} sınıfını ve içindeki öğrencileri silmek istediğine emin misin? Bu işlem geri alınamaz.`))try{await api('/api/classes/'+id,{method:'DELETE'});dashboard()}catch(e){notify(e.message)}}
function gameForm(id=0,t='',u='',type='external',data=''){let pairs='';try{const d=JSON.parse(decodeURIComponent(data)||'{}');pairs=(d.pairs||[]).map(x=>`${x[0]} = ${x[1]}`).join('\n')}catch{}modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>${id?'Oyunu düzenle':'Yeni oyun'}</h2><label>Oyun adı</label><input id="gt" value="${esc(id?decodeURIComponent(t):'')}"><label>Oyun türü</label><select id="gtype" onchange="toggleGameFields()"><option value="external" ${!['matching','chess_intro','chess_setup'].includes(type)?'selected':''}>Canva / dış bağlantı</option><option value="matching" ${type==='matching'?'selected':''}>🧩 Minoo Eşleştirme</option><option value="chess_intro" ${type==='chess_intro'?'selected':''}>♟️ Satranç Taşlarını Tanı</option><option value="chess_setup" ${type==='chess_setup'?'selected':''}>♟️ Satranç Taşlarını Dizelim</option></select><div id="externalFields"><label>Canva bağlantısı</label><input id="gu" value="${esc(id?decodeURIComponent(u):'')}" placeholder="https://...canva.com/..."></div><div id="matchingFields"><label>Eşleştirme çiftleri</label><textarea id="gpairs" rows="7" placeholder="Kedi = 🐱\nKöpek = 🐶\nElma = 🍎">${esc(pairs)}</textarea><p class="hint">Her satıra bir çift yaz. İki tarafı = işaretiyle ayır. Metin, sayı veya emoji kullanabilirsin. En az 2, en fazla 12 çift.</p></div><p class="hint">Öğrencileri sınıf ekranından seçerek atayabilirsin.</p><div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="saveGame(${id})">Kaydet</button></div>`);toggleGameFields()}
function toggleGameFields(){const type=document.querySelector('#gtype')?.value;const matching=type==='matching';document.querySelector('#externalFields').style.display=type==='external'?'block':'none';document.querySelector('#matchingFields').style.display=matching?'block':'none'}
async function saveGame(id){const title=document.querySelector('#gt').value.trim(),game_type=document.querySelector('#gtype').value,canva_url=document.querySelector('#gu').value.trim();const pairs=document.querySelector('#gpairs').value.split('\n').map(line=>{const i=line.indexOf('=');return i<0?[]:[line.slice(0,i).trim(),line.slice(i+1).trim()]}).filter(x=>x[0]&&x[1]);try{await api(id?'/api/games/'+id:'/api/games',{method:id?'PATCH':'POST',body:JSON.stringify({title,game_type,canva_url,pairs})});closeModal();currentClass?openClass(currentClass):dashboard()}catch(e){notify(e.message)}}
async function deleteGame(id,name){if(confirm(`${decodeURIComponent(name)} oyununu silmek istediğine emin misin? Tüm atamaları da silinir.`))try{await api('/api/games/'+id,{method:'DELETE'});currentClass?openClass(currentClass):dashboard()}catch(e){notify(e.message)}}
async function openClass(id){currentClass=id;const [cs,ss,as,gs]=await Promise.all([api('/api/classes'),api(`/api/classes/${id}/students`),api(`/api/classes/${id}/assignments`),api('/api/games')]);const c=cs.find(x=>Number(x.id)===Number(id));const grouped={};as.forEach(a=>(grouped[a.game_id]??={game_id:a.game_id,title:a.title,rows:[]}).rows.push(a));app.innerHTML=`<header><button class="ghost" onclick="dashboard()">← Sınıflar</button><b>${esc(c?.name||'Sınıf')}</b><button class="ghost" onclick="home()">Çıkış</button></header><main><div class="cols"><section><div class="toolbar"><h2>Öğrenciler</h2><div class="row"><button onclick="studentForm()">+ Öğrenci</button><button class="ghost" onclick="bulkStudents()">Toplu ekle</button></div></div>${ss.length?`<div class="bulk-bar"><label><input id="selectAllStudents" type="checkbox" onchange="selectAllStudents(this.checked)"> Tümünü seç</label><span id="selectedCount">0 öğrenci seçildi</span><button id="bulkDeleteBtn" class="danger ghost" onclick="deleteSelectedStudents()" disabled>Seçilenleri sil</button></div>`:''}${ss.map(s=>`<article class="student"><input class="student-select" type="checkbox" data-student-id="${s.id}" aria-label="${esc(s.name)} seç" onchange="updateStudentSelection()"><div class="student-main" onclick="profile(${s.id})">${avatar(s)}<div><b>${esc(s.name)}</b><code>${esc(s.code)}</code><small>${s.completed_count||0}/${s.assigned_count||0} tamamlandı</small>${s.guardian_name?`<small>Veli: ${esc(s.guardian_name)}</small>`:''}</div></div><div class="row"><button class="ghost" onclick="studentForm(${s.id})">Düzenle</button><button class="ghost" onclick="parentNoteQuick(${s.id},'${encodeURIComponent(s.name)}')">💌 Veliye not</button><button class="ghost" onclick="assignGamesToStudent(${s.id},'${encodeURIComponent(s.name)}')">🎮 Oyun ata</button><button class="ghost" onclick="copyCode('${esc(s.code)}')">Kopyala</button><button class="ghost" onclick="regen(${s.id})">Kod yenile</button><button class="danger ghost" onclick="deleteStudent(${s.id},'${encodeURIComponent(s.name)}')">Sil</button></div></article>`).join('')||'<p>Öğrenci yok.</p>'}</section><section><h2>Oyun ata</h2><select id="gamePick"><option value="">Oyun seç</option>${gs.map(g=>`<option value="${g.id}">${esc(g.title)}</option>`).join('')}</select><button onclick="assignPicked()">Öğrencileri seç</button><p class="hint">Mevcut bir oyunu istediğin zaman bu sınıftaki öğrencilere ekleyip çıkarabilirsin.</p></section></div><section class="card wide"><h2>Tamamlanma takibi</h2>${Object.values(grouped).map(g=>{const done=g.rows.filter(x=>x.completed_at).length;return `<article class="assignment"><div class="toolbar"><div><h3>${esc(g.title)}</h3><b>${done}/${g.rows.length} öğrenci • %${g.rows.length?Math.round(done/g.rows.length*100):0}</b></div><button onclick="editAssignment(${g.game_id})">Atamayı düzenle</button></div><progress max="${g.rows.length}" value="${done}"></progress>${g.rows.map(x=>`<div class="status"><span>${esc(x.name)}</span><span>${x.completed_at?'✅ Tamamladı':'⏳ Yapmadı'}</span></div>`).join('')}</article>`}).join('')||'<p>Henüz atama yok.</p>'}</section></main>`}
function studentForm(id=0){if(id)return loadStudentForm(id);renderStudentForm({})}
async function loadStudentForm(id){try{const p=await api(`/api/students/${id}/profile`);renderStudentForm(p.student)}catch(e){notify(e.message)}}
function renderStudentForm(s){modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>${s.id?'Öğrenciyi düzenle':'Yeni öğrenci'}</h2><div class="photo-edit">${avatar(s,'large')}<div><label class="file-btn">Fotoğraf seç<input id="sp" type="file" accept="image/*" onchange="previewPhoto(this)"></label>${s.photo_data?'<button class="ghost" onclick="removePhoto()">Fotoğrafı kaldır</button>':''}</div></div><input type="hidden" id="photoData" value="${s.photo_data?'keep':''}"><label>Öğrenci adı soyadı</label><input id="sn" value="${esc(s.name||'')}"><label>Veli adı soyadı</label><input id="gn" value="${esc(s.guardian_name||'')}"><label>Veli telefon numarası</label><input id="gp" type="tel" value="${esc(s.guardian_phone||'')}" placeholder="05xx xxx xx xx"><label>Öğretmen notu</label><textarea id="tn" rows="3" maxlength="500" placeholder="Bu öğrenciyle ilgili kısa bir not...">${esc(s.teacher_note||'')}</textarea><p class="hint">Veli bilgileri ve öğretmen notu yalnızca öğretmen panelinde görünür.</p><div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="saveStudent(${Number(s.id)||0})">Kaydet</button></div>`)}
async function previewPhoto(inp){const f=inp.files?.[0];if(!f)return;if(f.size>8*1024*1024)return notify('Fotoğraf en fazla 8 MB olabilir.');const img=new Image(),r=new FileReader();r.onload=()=>img.src=r.result;img.onload=()=>{const max=360,scale=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);const data=c.toDataURL('image/jpeg',.78);document.querySelector('#photoData').value=data;document.querySelector('.photo-edit .avatar').outerHTML=`<img class="avatar large" src="${data}" alt="">`};r.readAsDataURL(f)}
function removePhoto(){document.querySelector('#photoData').value='';document.querySelector('.photo-edit .avatar').outerHTML='<div class="avatar placeholder large">🌱</div>'}
async function saveStudent(id){const name=document.querySelector('#sn').value.trim(),guardian_name=document.querySelector('#gn').value.trim(),guardian_phone=document.querySelector('#gp').value.trim(),teacher_note=document.querySelector('#tn').value.trim(),pv=document.querySelector('#photoData').value;const data={name,guardian_name,guardian_phone,teacher_note};if(pv!=='keep')data.photo_data=pv;try{await api(id?'/api/students/'+id:`/api/classes/${currentClass}/students`,{method:id?'PATCH':'POST',body:JSON.stringify(data)});closeModal();openClass(currentClass)}catch(e){notify(e.message)}}
function bulkStudents(){modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>Toplu öğrenci ekle</h2><p class="hint">Her satıra bir öğrenci yaz. Veli bilgilerini daha sonra Düzenle bölümünden ekleyebilirsin.</p><textarea id="bulk" rows="10" placeholder="Defne Yılmaz\nEge Kaya"></textarea><div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="saveBulk()">Öğrencileri ekle</button></div>`)}
async function saveBulk(){const names=document.querySelector('#bulk').value.split(/\n|,/).map(x=>x.trim()).filter(Boolean);try{await api(`/api/classes/${currentClass}/students/bulk`,{method:'POST',body:JSON.stringify({names})});closeModal();openClass(currentClass)}catch(e){notify(e.message)}}
async function copyCode(code){try{await navigator.clipboard.writeText(code);notify('Öğrenci kodu kopyalandı')}catch{notify('Kod: '+code)}}
async function regen(id){if(!confirm('Eski öğrenci kodu hemen geçersiz olacak. Yeni kod oluşturulsun mu?'))return;try{const r=await api(`/api/students/${id}/regenerate-code`,{method:'POST'});await copyCode(r.code);openClass(currentClass)}catch(e){notify(e.message)}}
function selectedStudentIds(){return [...document.querySelectorAll('.student-select:checked')].map(x=>Number(x.dataset.studentId))}
function updateStudentSelection(){const all=[...document.querySelectorAll('.student-select')],ids=selectedStudentIds(),allBox=document.querySelector('#selectAllStudents'),count=document.querySelector('#selectedCount'),btn=document.querySelector('#bulkDeleteBtn');if(allBox){allBox.checked=all.length>0&&ids.length===all.length;allBox.indeterminate=ids.length>0&&ids.length<all.length}if(count)count.textContent=`${ids.length} öğrenci seçildi`;if(btn)btn.disabled=!ids.length}
function selectAllStudents(v){document.querySelectorAll('.student-select').forEach(x=>x.checked=v);updateStudentSelection()}
async function deleteSelectedStudents(){const ids=selectedStudentIds();if(!ids.length)return notify('Önce en az bir öğrenci seç.');if(!confirm(`${ids.length} öğrenciyi silmek istediğine emin misin? Bu öğrencilerin oyun atamaları ve ilerleme kayıtları da silinir. Bu işlem geri alınamaz.`))return;try{await api(`/api/classes/${currentClass}/students/bulk-delete`,{method:'POST',body:JSON.stringify({student_ids:ids})});notify(`${ids.length} öğrenci silindi`);openClass(currentClass)}catch(e){notify(e.message)}}
async function deleteStudent(id,name){if(confirm(`${decodeURIComponent(name)} öğrencisini silmek istediğine emin misin? İlerleme kayıtları da silinir.`))try{await api('/api/students/'+id,{method:'DELETE'});openClass(currentClass)}catch(e){notify(e.message)}}

async function parentNoteQuick(sid,name){
 try{
  const p=await api(`/api/students/${sid}/profile`);
  modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>💌 ${esc(decodeURIComponent(name))} • Veliye Not</h2>
  <p class="hint">Buraya yazdığın not öğrenci koduyla giriş yapılan veli/öğrenci ekranında görünür. Öğretmen notundan ayrıdır.</p>
  <textarea id="parentNote" rows="4" maxlength="1000" placeholder="Velinin görebileceği notu yaz..."></textarea>
  <div class="note-history">${(p.parent_notes||[]).map(n=>`<article class="note-item"><div><b>${formatDate(n.created_at)}</b><span>${n.seen_at?'✓ Veli gördü':'○ Henüz görülmedi'}</span></div><p>${esc(n.note)}</p></article>`).join('')||'<p class="hint">Henüz veliye açık not yok.</p>'}</div>
  <div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="addParentNote(${sid})">Veliye gönder</button></div>`);
 }catch(e){notify(e.message)}
}

async function profile(id){try{const p=await api(`/api/students/${id}/profile`),d=p.games.filter(x=>x.completed_at).length,s=p.student;modal(`<button class="modal-x" onclick="closeModal()">×</button><div class="profile-head">${avatar(s,'large')}<div><h2>${esc(s.name)}</h2><p>${esc(s.class_name)}</p></div></div><div class="info"><b>Öğrenci kodu</b><span>${esc(s.code)} <button class="tiny ghost" onclick="copyCode('${esc(s.code)}')">Kopyala</button></span><b>Veli</b><span>${esc(s.guardian_name||'—')}</span><b>Telefon</b><span>${esc(s.guardian_phone||'—')}</span><b>İlerleme</b><span>${d}/${p.games.length} tamamlandı</span><b>Öğretmen notu</b><span class="teacher-note">${esc(s.teacher_note||'—')}</span></div><section class="parent-note-admin"><div class="toolbar"><h3>💌 Veliye Notlar</h3></div><textarea id="parentNote" rows="2" maxlength="1000" placeholder="Velinin görebileceği yeni not..."></textarea><button onclick="addParentNote(${s.id})">Veliye not ekle</button><div class="note-history">${(p.parent_notes||[]).map(n=>`<article class="note-item"><div><b>${formatDate(n.created_at)}</b><span>${n.seen_at?'✓ Veli gördü':'○ Henüz görülmedi'}</span></div><p>${esc(n.note)}</p><button class="tiny danger ghost" onclick="deleteParentNote(${n.id},${s.id})">Sil</button></article>`).join('')||'<p class="hint">Henüz veliye not yazılmadı.</p>'}</div></section><h3>Oyunlar</h3>${p.games.map(x=>`<div class="status"><span>${esc(x.title)}</span><span>${x.completed_at?'✅':'○'}</span></div>`).join('')||'<p>Henüz oyun atanmadı.</p>'}<div class="modal-actions"><button class="ghost" onclick="closeModal();studentForm(${s.id})">Düzenle</button><button onclick="closeModal()">Kapat</button></div>`)}catch(e){notify(e.message)}}
function formatDate(v){if(!v)return '';try{return new Date(v).toLocaleDateString('tr-TR',{day:'2-digit',month:'short',year:'numeric'})}catch{return ''}}
async function addParentNote(sid){const note=document.querySelector('#parentNote').value.trim();if(!note)return notify('Not boş olamaz.');try{await api(`/api/students/${sid}/parent-notes`,{method:'POST',body:JSON.stringify({note})});closeModal();profile(sid)}catch(e){notify(e.message)}}
async function deleteParentNote(nid,sid){if(!confirm('Bu veli notu silinsin mi?'))return;try{await api(`/api/parent-notes/${nid}`,{method:'DELETE'});closeModal();profile(sid)}catch(e){notify(e.message)}}

async function assignGamesToStudent(sid,name){
 try{
  const [games,profile]=await Promise.all([api('/api/games'),api(`/api/students/${sid}/profile`)]);
  const assigned=new Map((profile.games||[]).map(x=>[Number(x.game_id),x]));
  modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>${esc(decodeURIComponent(name))} • Oyun Ata</h2>
  <div class="row"><button class="ghost" onclick="toggleStudentGames(true)">Tümünü seç</button><button class="ghost" onclick="toggleStudentGames(false)">Tümünü kaldır</button></div>
  <p id="studentGameCount" class="hint">0 oyun seçildi</p>
  <div class="check-list">${games.map(g=>{const a=assigned.get(Number(g.id)),locked=!!a?.completed_at;return `<label class="check-row ${locked?'locked':''}"><input class="student-game-select" type="checkbox" data-gid="${g.id}" ${a?'checked':''} ${locked?'disabled':''} onchange="updateStudentGameCount()"><span>${esc(g.title)}</span>${locked?'<small>✅ Tamamlandı • korunur</small>':a?'<small>Atanmış</small>':''}</label>`}).join('')||'<p class="hint">Henüz oyun yok.</p>'}</div>
  <div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="saveStudentGames(${sid})">Atamaları kaydet</button></div>`);
  updateStudentGameCount();
 }catch(e){notify(e.message)}
}
function toggleStudentGames(v){document.querySelectorAll('.student-game-select:not(:disabled)').forEach(x=>x.checked=v);updateStudentGameCount()}
function updateStudentGameCount(){const n=[...document.querySelectorAll('.student-game-select')].filter(x=>x.checked||x.disabled).length,el=document.querySelector('#studentGameCount');if(el)el.textContent=`${n} oyun seçildi`}
async function saveStudentGames(sid){const game_ids=[...document.querySelectorAll('.student-game-select')].filter(x=>x.checked||x.disabled).map(x=>Number(x.dataset.gid));try{await api(`/api/students/${sid}/game-assignments`,{method:'PUT',body:JSON.stringify({game_ids})});closeModal();notify('Oyun atamaları kaydedildi');openClass(currentClass)}catch(e){notify(e.message)}}

function assignPicked(){const gid=Number(document.querySelector('#gamePick').value);if(!gid)return notify('Önce oyun seç.');editAssignment(gid)}
async function editAssignment(gid){try{const rows=await api(`/api/games/${gid}/assignment-students?class_id=${currentClass}`);if(!rows.length)return notify('Bu sınıfta öğrenci yok.');modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>Öğrencileri seç</h2><div class="row"><button class="ghost" onclick="toggleAll(true)">Tümünü seç</button><button class="ghost" onclick="toggleAll(false)">Tümünü kaldır</button></div><div class="check-list">${rows.map(s=>`<label class="check-row ${s.completed?'locked':''}"><input type="checkbox" data-sid="${s.id}" ${s.assigned?'checked':''} ${s.completed?'disabled':''}><span>${esc(s.name)}</span>${s.completed?'<small>✅ Tamamladı • korunur</small>':''}</label>`).join('')}</div><div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="saveAssignment(${gid})">Atamayı kaydet</button></div>`)}catch(e){notify(e.message)}}
function toggleAll(v){document.querySelectorAll('.check-row input:not(:disabled)').forEach(x=>x.checked=v)}
async function saveAssignment(gid){const student_ids=[...document.querySelectorAll('.check-row input')].filter(x=>x.checked||x.disabled).map(x=>Number(x.dataset.sid));try{await api(`/api/games/${gid}/assignment-students`,{method:'PUT',body:JSON.stringify({class_id:currentClass,student_ids})});closeModal();openClass(currentClass)}catch(e){notify(e.message)}}

let teacherPreviewMode=false;
function teacherPreviewEncoded(v){
 const g=JSON.parse(decodeURIComponent(v)); teacherPreviewMode=true;
 g.assignment_id=0;
 if(g.game_type==='external'){window.open(g.canva_url,'_blank','noopener,noreferrer');notify('Öğretmen önizlemesi • öğrenci kaydı değişmez');return}
 playGame(g);
}
function previewBack(){teacherPreviewMode=false;dashboard()}

async function studentLogin(){const code=document.querySelector('#scode').value.trim().toUpperCase();try{studentSession=await api('/api/student/login',{method:'POST',body:JSON.stringify({code})});studentDash()}catch(e){notify(e.message)}}
async function studentDash(){const [gs,notes]=await Promise.all([api(`/api/student/${studentSession.id}/games`),api(`/api/student/${studentSession.id}/parent-notes`)]);app.innerHTML=`<header><div class="kid-head">${avatar(studentSession)}<div><b>Merhaba ${esc(studentSession.name)} 👋</b><small>${esc(studentSession.class_name)}</small></div></div><button class="ghost" onclick="home()">Çıkış</button></header><main class="kid">${notes.length?`<section class="parent-notes-kid"><h2>💌 Öğretmeninden Not</h2>${notes.map(n=>`<article><small>${formatDate(n.created_at)}</small><p>${esc(n.note)}</p></article>`).join('')}</section>`:''}<h1>Oyunlarım</h1><p>Bugün keşfedecek harika oyunların var!</p><div class="grid">${gs.map(g=>`<article class="game ${g.completed_at?'done':''}"><h2>${esc(g.title)}</h2><p>${g.game_type==='matching'?'🧩 Minoo Eşleştirme':g.game_type==='chess_intro'?'♟️ Satranç Taşlarını Tanı':g.game_type==='chess_setup'?'♟️ Satranç Taşlarını Dizelim':'🎨 Canva oyunu'}</p><p>${g.completed_at?'✅ Tamamladın':'🌱 Seni bekliyor'}</p><button onclick="playEncoded('${encodeURIComponent(JSON.stringify(g))}')">${g.completed_at?'Tekrar oyna':'Oyunu aç'}</button></article>`).join('')||'<div class="card"><h2>Şimdilik oyun yok 🌼</h2><p>Öğretmenin yeni oyun eklediğinde burada görünecek.</p></div>'}</div></main>`}
function playEncoded(v){playGame(JSON.parse(decodeURIComponent(v)))}
function playGame(g){if(g.game_type==='matching')return matchingGame(g);if(g.game_type==='chess_intro')return chessIntroGame(g);if(g.game_type==='chess_setup')return chessSetupGame(g);play(g.assignment_id,encodeURIComponent(g.canva_url))}
async function play(aid,u){window.open(decodeURIComponent(u),'_blank','noopener,noreferrer');modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>Oyunu bitirdin mi? 🌟</h2><p>Oyunu tamamladıysan aşağıdaki düğmeye bas.</p><div class="modal-actions"><button class="ghost" onclick="closeModal()">Daha bitirmedim</button><button onclick="completeGame(${aid})">Tamamladım ✓</button></div>`)}
function matchingGame(g){let data={pairs:[]};try{data=JSON.parse(g.game_data||'{}')}catch{}const pairs=data.pairs||[];const cards=[];pairs.forEach((p,i)=>{cards.push({pair:i,text:p[0]}),cards.push({pair:i,text:p[1]})});for(let i=cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]]}app.innerHTML=`<header><button class="ghost" onclick="${teacherPreviewMode?'previewBack()':'studentDash()'}">← ${teacherPreviewMode?'Oyun Kütüphanesi':'Oyunlarım'}</button><b>${esc(g.title)}</b><span></span></header><main class="matching-wrap"><div class="matching-top"><div><h1>🧩 Eşlerini bul!</h1><p>Birbirine ait iki karta sırayla dokun.</p></div><b id="matchScore">0 / ${pairs.length}</b></div><div id="matchBoard" class="match-board">${cards.map((c,i)=>`<button class="match-card" data-i="${i}" data-pair="${c.pair}" type="button"><span>?</span><b>${esc(c.text)}</b></button>`).join('')}</div><p id="matchMessage" class="match-message" aria-live="polite"></p></main>`;let first=null,lock=false,done=0;const board=document.querySelector('#matchBoard');board.addEventListener('click',e=>{const btn=e.target.closest('.match-card');if(!btn||lock||btn.classList.contains('matched')||btn===first)return;btn.classList.add('open');if(!first){first=btn;return}if(first.dataset.pair===btn.dataset.pair){first.classList.add('matched');btn.classList.add('matched');first=null;done++;document.querySelector('#matchScore').textContent=`${done} / ${pairs.length}`;document.querySelector('#matchMessage').textContent='Harika! Bir eş buldun 🌟';if(done===pairs.length)setTimeout(()=>teacherPreviewMode?previewFinished(g.title):matchingFinished(g.assignment_id,g.title),500)}else{lock=true;document.querySelector('#matchMessage').textContent='Bir daha deneyelim 🌱';const old=first;first=null;setTimeout(()=>{old.classList.remove('open');btn.classList.remove('open');lock=false},700)}})}
function previewFinished(title){modal(`<h2>Önizleme tamamlandı 🎉</h2><p><b>${esc(title)}</b> öğretmen önizlemesinde tamamlandı.</p><p class="hint">Bu deneme hiçbir öğrencinin ilerleme kaydını değiştirmedi.</p><div class="modal-actions"><button onclick="closeModal();previewBack()">Oyun Kütüphanesine dön</button></div>`)}
async function matchingFinished(aid,title){try{await api(`/api/assignments/${aid}/complete`,{method:'POST'});modal(`<h2>Harika! 🎉</h2><p><b>${esc(title)}</b> oyununu tamamladın.</p><p class="big-star">⭐</p><div class="modal-actions"><button onclick="closeModal();studentDash()">Oyunlarıma dön</button></div>`)}catch(e){notify(e.message)}}


/* ===== Minoo v2.2.3 • Satranç Taşlarını Dizelim ===== */
const SETUP_BACK = ['♜','♞','♝','♛','♚','♝','♞','♜'];
const SETUP_WHITE = ['♖','♘','♗','♕','♔','♗','♘','♖'];
const SETUP_NAMES = {'♜':'Kale','♞':'At','♝':'Fil','♛':'Vezir','♚':'Şah','♟':'Piyon','♖':'Kale','♘':'At','♗':'Fil','♕':'Vezir','♔':'Şah','♙':'Piyon'};
let setupState=null;

function setupPieces(){
 const a=[];
 SETUP_BACK.forEach((p,c)=>a.push({id:`b8-${c}`,p,target:`${c},0`,side:'black'}));
 for(let c=0;c<8;c++)a.push({id:`b7-${c}`,p:'♟',target:`${c},1`,side:'black'});
 for(let c=0;c<8;c++)a.push({id:`w2-${c}`,p:'♙',target:`${c},6`,side:'white'});
 SETUP_WHITE.forEach((p,c)=>a.push({id:`w1-${c}`,p,target:`${c},7`,side:'white'}));
 return a;
}
function chessSetupGame(g){
 setupState={g,phase:'learn',placed:new Map(),pieces:setupPieces(),drag:null};
 const app=document.querySelector('#app');
 app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="${teacherPreviewMode?'previewBack()':'studentDash()'}">← ${teacherPreviewMode?'Oyun Kütüphanesi':'Oyunlarım'}</button><b>♟️ ${esc(g.title||'Satranç Taşlarını Dizelim')}</b><span id="setupProgress">0 / 32</span></header>
 <main class="setup-world"><section class="setup-card">
 <div class="setup-guide"><div class="setup-mascot">🌱</div><div><h1>Satranç Taşlarını Dizelim</h1><p id="setupMessage">Önce taşları doğru yerlerine birlikte dizelim. Taşlara dokun; doğru karelerine kayarak yerleşsinler.</p></div></div>
 <div id="setupBoard"></div><div id="setupTray"></div><div id="setupActions"></div>
 </section></main>`;
 renderSetup();
}
function setupBoardHtml(){
 let s='<div class="setup-board" aria-label="Satranç tahtası">';
 for(let r=0;r<8;r++)for(let c=0;c<8;c++){
   const key=`${c},${r}`, placed=[...setupState.placed.values()].find(x=>x.target===key);
   s+=`<div class="setup-square ${(r+c)%2?'dark':'light'} ${r===0||r===1||r===6||r===7?'home':''}" data-square="${key}" ondragover="event.preventDefault()" ondrop="setupDrop(event,'${key}')">${placed?`<span class="setup-piece ${placed.side}" draggable="${setupState.phase==='play'}" ondragstart="setupDrag(event,'${placed.id}')" onclick="setupPieceClick('${placed.id}')">${placed.p}</span>`:''}${c===0?`<small class="rank">${8-r}</small>`:''}${r===7?`<small class="file">${'abcdefgh'[c]}</small>`:''}</div>`;
 }
 return s+'</div>';
}
function renderSetup(){
 const board=document.querySelector('#setupBoard'),tray=document.querySelector('#setupTray'),actions=document.querySelector('#setupActions');
 if(!board)return;
 board.innerHTML=setupBoardHtml();
 const remaining=setupState.pieces.filter(x=>!setupState.placed.has(x.id));
 tray.innerHTML=`<div class="setup-tray ${setupState.phase}">${remaining.map(x=>`<button class="tray-piece ${x.side}" draggable="${setupState.phase==='play'}" ondragstart="setupDrag(event,'${x.id}')" onclick="setupPieceClick('${x.id}')" title="${SETUP_NAMES[x.p]}">${x.p}<small>${SETUP_NAMES[x.p]} • ${x.side==="white"?"BEYAZ":"SİYAH"}</small></button>`).join('')}</div>`;
 document.querySelector('#setupProgress').textContent=`${setupState.placed.size} / 32`;
 if(setupState.phase==='learn'){
   actions.innerHTML=setupState.placed.size===32?`<button class="setup-start" onclick="setupStartPlay()">▶ Oyuna Başla</button>`:`<p class="setup-tip">👆 Bir taşa dokun. Doğru yerine kayarak gitsin.</p>`;
 }else{
   actions.innerHTML=`<p class="setup-tip">Taşları sürükleyerek ya da önce taşa, sonra kareye dokunarak yerleştir.</p>`;
 }
}
function setupPieceClick(id){
 const x=setupState.pieces.find(p=>p.id===id); if(!x)return;
 if(setupState.phase==='learn'){
   if(setupState.placed.has(id))return;
   const el=document.querySelector(`[data-square="${x.target}"]`);
   setupState.placed.set(id,x); renderSetup();
   const landed=document.querySelector(`[data-square="${x.target}"] .setup-piece`);
   if(landed){landed.classList.add('slide-in');}
   document.querySelector('#setupMessage').textContent=setupState.placed.size===32?'Harika! Taşların doğru dizilişini gördün. Hazırsan oyuna başlayalım!':`${SETUP_NAMES[x.p]} doğru yerine yerleşti. Devam et!`;
   return;
 }
 if(setupState.placed.has(id)){
   setupState.placed.delete(id); setupState.drag=id; renderSetup(); return;
 }
 setupState.drag=id;
 document.querySelectorAll('.tray-piece').forEach(b=>b.classList.remove('selected'));
 const btn=[...document.querySelectorAll('.tray-piece')].find(b=>b.getAttribute('onclick')?.includes(`'${id}'`));
 if(btn)btn.classList.add('selected');
 document.querySelector('#setupMessage').textContent=`${SETUP_NAMES[x.p]} seçildi. Şimdi doğru kareye dokun.`;
}
function setupStartPlay(){
 setupState.phase='play'; setupState.placed.clear(); setupState.drag=null;
 setupState.pieces=setupShuffle(setupState.pieces);
 document.querySelector('#setupMessage').textContent='Taşlar karıştı! Şimdi hepsini doğru yerlerine sen diz.';
 renderSetup();
 document.querySelector('.setup-tray')?.classList.add('shuffle-pop');
}
function setupShuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function setupDrag(ev,id){setupState.drag=id;try{ev.dataTransfer.setData('text/plain',id)}catch{}}
function setupDrop(ev,key){ev.preventDefault();const id=setupState.drag||ev.dataTransfer?.getData('text/plain');setupTryPlace(id,key)}
document.addEventListener('click',e=>{
 const sq=e.target.closest?.('.setup-square'); if(!sq||!setupState||setupState.phase!=='play'||!setupState.drag)return;
 if(e.target.closest('.setup-piece'))return;
 setupTryPlace(setupState.drag,sq.dataset.square);
});

function setupAllowedTargets(x){
 const row=x.side==='white'?7:0, pawnRow=x.side==='white'?6:1;
 if(SETUP_NAMES[x.p]==='Piyon')return Array.from({length:8},(_,c)=>`${c},${pawnRow}`);
 if(SETUP_NAMES[x.p]==='Kale')return [`0,${row}`,`7,${row}`];
 if(SETUP_NAMES[x.p]==='At')return [`1,${row}`,`6,${row}`];
 if(SETUP_NAMES[x.p]==='Fil')return [`2,${row}`,`5,${row}`];
 return [x.target];
}
function setupPlaceSound(){
 try{
  const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
  const ctx=new C(),now=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();
  o.type='square';o.frequency.setValueAtTime(165,now);o.frequency.exponentialRampToValueAtTime(95,now+.045);
  g.gain.setValueAtTime(.08,now);g.gain.exponentialRampToValueAtTime(.001,now+.055);
  o.connect(g).connect(ctx.destination);o.start(now);o.stop(now+.06);
 }catch{}
}

function setupTryPlace(id,key){
 if(!id)return; const x=setupState.pieces.find(p=>p.id===id); if(!x)return;
 const occupied=[...setupState.placed.values()].some(p=>p.target===key);
 const allowed=setupAllowedTargets(x);
 if(allowed.includes(key)&&!occupied){
   x.target=key;
   setupState.placed.set(id,x); setupState.drag=null; setupPlaceSound(); renderSetup();
   document.querySelector('#setupMessage').textContent='Aferin! Doğru kare. Devam et. ⭐';
   if(setupState.placed.size===32)setTimeout(setupWin,250);
 }else{
   const sq=document.querySelector(`[data-square="${key}"]`); if(sq){sq.classList.add('wrong');setTimeout(()=>sq.classList.remove('wrong'),450)}
   document.querySelector('#setupMessage').textContent=occupied?'Bu kare dolu 😊 Başka doğru kareyi seç.':'Bir daha düşün 😊 Bu taşın yeri başka bir kare.';
 }
}
async function setupWin(){
 playChessCelebration();
 if(!teacherPreviewMode && setupState.g.assignment_id){try{await api(`/api/assignments/${setupState.g.assignment_id}/complete`,{method:'POST'})}catch{}}
 modal(`<h2>🎉 Harika!</h2><p>Tüm satranç taşlarını doğru şekilde dizdin!</p><p><b>Artık satranç tahtasını hazırlayabiliyorsun. ♟️</b></p><div class="modal-actions"><button class="ghost" onclick="closeModal();chessSetupGame(setupState.g)">↻ Tekrar Oyna</button><button onclick="closeModal();${teacherPreviewMode?'previewBack()':'studentDash()'}">⌂ ${teacherPreviewMode?'Oyun Kütüphanesi':'Oyunlarım'}</button></div>`);
}

const CHESS_PIECES=[
{name:'Kale',symbol:'♜',tone:'blue',short:'Düz yolların ustasıyım!',speech:'Merhaba! Ben Kale. Dikey ve yatay yönlerde istediğim kadar ilerleyebilirim. Taş alırken de düz yolları kullanırım.',dirs:['up','right','down','left'],note:'Dikey ve yatay gider.'},
{name:'At',symbol:'♞',tone:'peach',short:'L şeklinde sıçrarım!',speech:'Merhaba! Ben At. İki kare bir yöne, sonra bir kare yana giderim. Hareketim L harfine benzer. Üstelik diğer taşların üzerinden atlayabilirim.',dirs:['knight'],note:'L şeklinde gider ve taşların üzerinden atlayabilir.'},
{name:'Fil',symbol:'●',tone:'lilac',short:'Çapraz yollar benim!',speech:'Merhaba! Ben Fil. Her zaman çapraz yönlerde istediğim kadar ilerlerim. Taş alırken de çapraz giderim.',dirs:['ne','se','sw','nw'],note:'Her yöne çapraz gider.'},
{name:'Vezir',symbol:'♛',tone:'pink',short:'Her yöne gidebilirim!',speech:'Merhaba! Ben Vezir. Yatay, dikey ve çapraz yönlerde istediğim kadar ilerleyebilirim. Taş alırken de bu yönleri kullanırım.',dirs:['up','ne','right','se','down','sw','left','nw'],note:'Yatay, dikey ve çapraz gider.'},
{name:'Şah',symbol:'♚',tone:'mint',short:'Bir kare, her yöne!',speech:'Merhaba! Ben Şah. Her yöne gidebilirim ama yalnızca bir kare ilerlerim. Ben çok önemliyim. Rakibin beni kaçamayacağım şekilde tehdit etmesine şah mat denir.',dirs:['king'],note:'Her yöne yalnızca bir kare gider.'},
{name:'Piyon',symbol:'♟',tone:'melon',short:'İleri gider, çapraz alırım!',speech:'Merhaba! Ben Piyon. Düz yönde ilerlerim. İlk hamlemde bir ya da iki kare, sonraki hamlelerde bir kare gidebilirim. Taş alırken bir kare çapraza giderim ve asla geri gitmem. Son sıraya ulaşırsam terfi edebilirim.',dirs:['pawn'],note:'İleri gider; taş alırken çapraz gider.'}
];
function chessPieceVisual(p){
 if(p.name==='Fil')return `<svg class="bishop-svg" viewBox="0 0 100 120" role="img" aria-label="Fil"><circle cx="50" cy="15" r="10" fill="currentColor"/><path d="M50 26 C31 38 28 57 39 70 L29 89 H71 L61 70 C72 57 69 38 50 26Z" fill="currentColor"/><rect x="24" y="90" width="52" height="11" rx="5" fill="currentColor"/><rect x="17" y="103" width="66" height="10" rx="5" fill="currentColor"/></svg>`;
 return `<span class="chess-glyph">${p.symbol}</span>`
}
function chessIntroGame(g){
 app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="${teacherPreviewMode?'previewBack()':'studentDash()'}">← ${teacherPreviewMode?'Oyun Kütüphanesi':'Oyunlarım'}</button><b>${esc(g.title)}</b><span id="chessProgress">0 / 6 keşfedildi</span></header><main class="chess-world"><section id="chessHome"><div class="chess-hero"><span>♟️</span><div><h1>Satranç Taşlarını Tanı</h1><p><b>Dokun ve keşfet!</b> Bir taşa dokun, hareketini gör ve görevini öğren.</p></div></div><div class="chess-piece-grid">${CHESS_PIECES.map((p,i)=>`<button class="piece-tile ${p.tone}" onclick="openChessPiece(${i},${g.assignment_id},'${encodeURIComponent(g.title)}')"><span class="piece-character">${chessPieceVisual(p)}<i>•ᴗ•</i></span><b>${p.name}</b><small>${p.short}</small><em id="pieceDone${i}">Dokun ve keşfet</em></button>`).join('')}</div></section><section id="chessLesson" class="chess-lesson" hidden></section></main>`;
 window._chessState={g,seen:new Set()};
}

function chessBoard(p){
 const N=40, ox=20, oy=20, pc=3, pr=4, cx=ox+(pc+.5)*N, cy=oy+(pr+.5)*N;
 let squares='',labels='';
 for(let r=0;r<8;r++)for(let c=0;c<8;c++)squares+=`<rect x="${ox+c*N}" y="${oy+r*N}" width="${N}" height="${N}" class="${(r+c)%2?'board-dark':'board-light'}"/>`;
 'abcdefgh'.split('').forEach((x,c)=>labels+=`<text x="${ox+(c+.5)*N}" y="356" text-anchor="middle" class="coord">${x}</text>`);
 for(let r=0;r<8;r++)labels+=`<text x="10" y="${oy+(r+.63)*N}" text-anchor="middle" class="coord">${8-r}</text>`;
 const tone={blue:'#75aee8',peach:'#e9a98f',lilac:'#aa8bd8',pink:'#e69ab5',mint:'#78bda5',melon:'#e8b56f'}[p.tone]||'#6f8f85';
 const marker=`<defs><marker id="arrow-${p.tone}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="${tone}"/></marker></defs>`;
 const line=(x2,y2,cls='')=>`<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" class="move-arrow ${cls}" stroke="${tone}" marker-end="url(#arrow-${p.tone})"/>`;
 const poly=(pts)=>`<polyline points="${pts}" class="move-arrow knight-arrow" fill="none" stroke="${tone}" marker-end="url(#arrow-${p.tone})"/>`;
 let arrows='';
 if(p.name==='Kale'){
   arrows=line(cx,oy+8)+line(ox+8*N-8,cy)+line(cx,oy+8*N-8)+line(ox+8,cy);
 }else if(p.name==='Fil'){
   arrows=line(ox+8,cy-(cx-(ox+8)))+line(ox+8*N-8,cy-((ox+8*N-8)-cx))+line(ox+8*N-8,cy+((ox+8*N-8)-cx))+line(ox+8,cy+(cx-(ox+8)));
 }else if(p.name==='Vezir'){
   arrows=line(cx,oy+8)+line(ox+8*N-8,cy)+line(cx,oy+8*N-8)+line(ox+8,cy)
    +line(ox+8,cy-(cx-(ox+8)))+line(ox+8*N-8,cy-((ox+8*N-8)-cx))+line(ox+8*N-8,cy+((ox+8*N-8)-cx))+line(ox+8,cy+(cx-(ox+8)));
 }else if(p.name==='Şah'){
   const d=N; [[0,-d],[d,-d],[d,0],[d,d],[0,d],[-d,d],[-d,0],[-d,-d]].forEach(v=>arrows+=line(cx+v[0],cy+v[1],'king-arrow'));
 }else if(p.name==='At'){
   const moves=[[2,-1],[1,-2],[-1,-2],[-2,-1],[2,1],[1,2],[-1,2],[-2,1]];
   moves.forEach(([dx,dy])=>{
     const mx=cx+dx*N, my=cy+dy*N;
     const bend= Math.abs(dx)===2 ? `${cx+dx*N},${cy} ${mx},${my}` : `${cx},${cy+dy*N} ${mx},${my}`;
     arrows+=poly(`${cx},${cy} ${bend}`);
   });
 }else if(p.name==='Piyon'){
   arrows=line(cx,cy-N)+line(cx-N,cy-N,'capture-arrow')+line(cx+N,cy-N,'capture-arrow');
 }
 let piece='';
 if(p.name==='Fil'){
   piece=`<g transform="translate(${cx-18} ${cy-25})" fill="${tone}" stroke="#5c4b6d" stroke-width="1.2"><circle cx="18" cy="5" r="5"/><path d="M18 11 C9 16 8 27 13 33 L8 42 H28 L23 33 C28 27 27 16 18 11Z"/><rect x="6" y="42" width="24" height="5" rx="2"/><rect x="3" y="48" width="30" height="5" rx="2"/></g>`;
 }else{
   piece=`<text x="${cx}" y="${cy+15}" text-anchor="middle" class="svg-piece" fill="${tone}">${p.symbol}</text>`;
 }
 return `<div class="board-svg-wrap"><svg class="move-board-svg" viewBox="0 0 360 370" role="img" aria-label="${p.name} hareket tahtası">${marker}${squares}${labels}${arrows}<circle cx="${cx}" cy="${cy}" r="19" fill="rgba(255,255,255,.78)"/>${piece}</svg></div>`;
}
function chessArrows(){return ''}
function openChessPiece(i,aid,title){const p=CHESS_PIECES[i],home=document.querySelector('#chessHome'),lesson=document.querySelector('#chessLesson');home.hidden=true;lesson.hidden=false;lesson.innerHTML=`<div class="lesson-top"><button class="round-back" onclick="closeChessPiece()">←</button><button class="ghost" onclick="openChessPiece(${(i+5)%6},${aid},'${title}')">← Önceki</button><div class="lesson-title ${p.tone}">${p.name} <small>${i+1}/6</small></div><button class="sound-btn" onclick="speakChess(${i})" aria-label="Dinle">🔊</button><button class="ghost" onclick="openChessPiece(${(i+1)%6},${aid},'${title}')">Sonraki →</button></div><div class="lesson-body"><div class="lesson-character ${p.tone}"><span>${chessPieceVisual(p)}</span><b>Merhaba! Ben ${p.name}!</b><p>${p.short}</p></div><div class="board-zone">${chessBoard(p)}<p class="movement-note">${p.note}</p></div><div class="speech-card ${p.tone}"><p>${p.speech}</p><button onclick="replayChess(${i})">▶ Hareketi tekrar göster</button></div></div>`;setTimeout(()=>lesson.classList.add('play'),30);markChessSeen(i,aid,title)}
function closeChessPiece(){const l=document.querySelector('#chessLesson');if(l){l.classList.remove('play');l.hidden=true}document.querySelector('#chessHome').hidden=false}
function replayChess(i){const l=document.querySelector('#chessLesson');l.classList.remove('play');void l.offsetWidth;l.classList.add('play');speakChess(i)}
function speakChess(i){if(!('speechSynthesis' in window))return notify('Bu cihazda sesli okuma desteklenmiyor.');speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(CHESS_PIECES[i].speech);u.lang='tr-TR';u.rate=.9;u.pitch=1.2;speechSynthesis.speak(u)}

function playChessCelebration(){
 try{
  const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
  const ctx=new C(),now=ctx.currentTime;
  // Short applause-like noise bursts plus cheerful whistle tones, synthesized locally.
  for(let k=0;k<9;k++){const len=Math.floor(ctx.sampleRate*.07),buf=ctx.createBuffer(1,len,ctx.sampleRate),d=buf.getChannelData(0);for(let j=0;j<len;j++)d[j]=(Math.random()*2-1)*(1-j/len);const src=ctx.createBufferSource(),g=ctx.createGain();src.buffer=buf;g.gain.value=.10;src.connect(g).connect(ctx.destination);src.start(now+k*.055)}
  [880,1046,1318].forEach((f,k)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(f,now+.18+k*.12);g.gain.setValueAtTime(.001,now+.18+k*.12);g.gain.exponentialRampToValueAtTime(.12,now+.20+k*.12);g.gain.exponentialRampToValueAtTime(.001,now+.34+k*.12);o.connect(g).connect(ctx.destination);o.start(now+.18+k*.12);o.stop(now+.36+k*.12)})
 }catch{}
}

async function markChessSeen(i,aid,title){const st=window._chessState;if(!st||st.seen.has(i))return;st.seen.add(i);const done=document.querySelector(`#pieceDone${i}`);if(done){done.textContent='✓ Keşfettin';done.classList.add('seen')}const pr=document.querySelector('#chessProgress');if(pr)pr.textContent=`${st.seen.size} / 6 keşfedildi`;if(st.seen.size===6){try{playChessCelebration();if(teacherPreviewMode){modal(`<h2>🎉 Harika! Altı satranç taşını da keşfettin!</h2><p class="hint">Öğretmen önizlemesi olduğu için öğrenci ilerleme kaydı değişmedi.</p><div class="modal-actions"><button onclick="closeModal()">Devam et</button><button onclick="closeModal();previewBack()">Oyun Kütüphanesine dön</button></div>`);return}await api(`/api/assignments/${aid}/complete`,{method:'POST'});setTimeout(()=>modal(`<h2>Harika! 🌟</h2><p>Altı satranç taşını da keşfettin!</p><p class="big-star">♟️ ⭐</p><div class="modal-actions"><button onclick="closeModal();studentDash()">Oyunlarıma dön</button></div>`),500)}catch(e){notify(e.message)}}}

async function completeGame(aid){try{await api(`/api/assignments/${aid}/complete`,{method:'POST'});closeModal();studentDash()}catch(e){notify(e.message)}}
home();
