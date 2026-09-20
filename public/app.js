document.head.insertAdjacentHTML('beforeend','\n<style>\n.setup-piece,.tray-piece{font-family:Georgia,"Times New Roman",serif!important}\n.setup-piece.white,.tray-piece.white{color:#fffdf2!important;-webkit-text-stroke:1.35px #343434!important;paint-order:stroke fill;filter:drop-shadow(0 1px 1px rgba(0,0,0,.28))}\n.setup-piece.black,.tray-piece.black{color:#111!important;-webkit-text-stroke:.65px #000!important;paint-order:stroke fill}\n.setup-square{aspect-ratio:1/1}.setup-board{overflow:hidden}\n.setup-learn-arrow{position:fixed;inset:0;width:100vw;height:100vh;z-index:9998;pointer-events:none}\n.setup-flying-piece{position:fixed;z-index:9999;pointer-events:none;display:grid;place-items:center;font:46px/1 Georgia,"Times New Roman",serif;transition:transform .62s cubic-bezier(.22,.8,.28,1)}\n.setup-flying-piece.white{color:#fffdf2;-webkit-text-stroke:1.35px #343434}.setup-flying-piece.black{color:#111;-webkit-text-stroke:.65px #000}\n.new-task-panel{margin:14px 0 22px;padding:16px;border-radius:20px;background:linear-gradient(135deg,#fff5d8,#f6e8ff);border:2px solid #ead7a2}\n.new-task-panel h2{margin:0 0 10px}.new-task-list{display:grid;gap:10px}\n.new-task-btn{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;text-align:left;padding:14px 16px;border-radius:16px}\n.account-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.login-grid{display:grid;gap:10px}\n@media(max-width:700px){header{padding:10px 12px}.kid{padding:14px}.cols{grid-template-columns:1fr!important}.setup-card{padding:10px!important}.setup-world{padding:6px!important}.setup-board{width:min(96vw,520px)!important;border-width:5px!important}.setup-piece{font-size:clamp(25px,9vw,44px)!important}.setup-tray{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important}.tray-piece{min-width:0!important;padding:8px 3px!important;font-size:34px!important}.tray-piece small{font-size:9px!important}.setup-guide h1{font-size:20px}.setup-guide p{font-size:13px}.grid{grid-template-columns:1fr!important}}\n@media(min-width:701px){.kid,.setup-world{max-width:1180px;margin:auto}.setup-tray{max-width:900px;margin:14px auto}}\n</style>');

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
function home(){teacherPass='';studentSession=null;currentClass=null;app.innerHTML=`<main class="center"><div class="logo">Minoo <span>v2.5.1</span></div><p class="tag">Oyna • Keşfet • Öğren</p><section class="card"><h2>Öğrenci girişi</h2><div class="login-grid"><input id="suser" placeholder="Kullanıcı adı" autocomplete="username"><input id="scode" type="password" placeholder="İlk giriş kodu / şifre" autocomplete="current-password" onkeydown="if(event.key==='Enter')studentLogin()"><button onclick="studentLogin()">Giriş yap</button></div></section><button class="link" onclick="teacherLogin()">Öğretmen girişi</button><p class="safe">Reklamsız • Sohbetsiz • Öğretmen kontrollü</p></main>`}
function teacherLogin(){app.innerHTML=`<main class="center teacher-login"><button class="back-link" onclick="home()">← Geri</button><div class="logo">Minoo <span>Öğretmen</span></div><p class="tag">Öğretmen paneline güvenli giriş</p><section class="card login-card"><h2>Öğretmen Girişi</h2><label for="tp">Şifre</label><input id="tp" type="password" placeholder="Şifrenizi girin" autocomplete="current-password" autofocus onkeydown="if(event.key==='Enter')doTeacherLogin()"><button class="login-btn" onclick="doTeacherLogin()">Giriş yap</button></section></main>`}
async function doTeacherLogin(){const p=document.querySelector('#tp').value;if(!p)return;try{teacherPass=p;await api('/api/teacher/login',{method:'POST',body:JSON.stringify({password:p})});closeModal();dashboard()}catch(e){teacherPass='';notify(e.message)}}
async function dashboard(){const cs=await api('/api/classes');app.innerHTML=`<header><div><b>Minoo Öğretmen</b><small>v2.5.1</small></div><button class="ghost" onclick="home()">Çıkış</button></header><main><div class="toolbar"><h1>Sınıflarım</h1><button onclick="addClass()">+ Sınıf</button></div><div class="grid">${cs.map(c=>`<article class="card"><h3>${esc(c.name)}</h3><p>${c.student_count} öğrenci</p><button onclick="openClass(${c.id})">Aç</button><div class="row"><button class="ghost" onclick="renameClass(${c.id},'${encodeURIComponent(c.name)}')">Adını değiştir</button><button class="danger ghost" onclick="deleteClass(${c.id},'${encodeURIComponent(c.name)}')">Sil</button></div></article>`).join('')}</div><hr><div class="toolbar"><h2>Oyun Kütüphanesi</h2><button onclick="gameForm()">+ Oyun ekle</button></div><div id="library"></div></main>`;loadLibrary()}
async function loadLibrary(){const gs=await api('/api/games'),el=document.querySelector('#library');el.innerHTML=gs.length?`<div class="grid">${gs.map(g=>`<article class="card"><h3>${esc(g.title)}</h3><p>${g.game_type==='matching'?'🧩 Minoo Eşleştirme':g.game_type==='chess_intro'?'♟️ Satranç Taşlarını Tanı':g.game_type==='chess_names'?'🔊 Satranç Taşlarının İsimleri':g.game_type==='chess_setup'?'♟️ Satranç Taşlarını Dizelim':'🔗 Canva oyunu'}</p><p>${g.completed_count||0}/${g.assigned_count||0} tamamlandı</p><div class="row"><button class="ghost" onclick="teacherPreviewEncoded('${encodeURIComponent(JSON.stringify(g))}')">▶ Oyunu oyna</button><button onclick="gameForm(${g.id},'${encodeURIComponent(g.title)}','${encodeURIComponent(g.canva_url||'')}','${g.game_type||'external'}','${encodeURIComponent(g.game_data||'') }')">Düzenle</button><button class="danger ghost" onclick="deleteGame(${g.id},'${encodeURIComponent(g.title)}')">Sil</button></div></article>`).join('')}</div>`:'<p>Henüz oyun yok.</p>'}
function addClass(){modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>Yeni sınıf</h2><label>Sınıf adı</label><input id="cn" autofocus><div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="saveClass()">Oluştur</button></div>`)}
async function saveClass(){const name=document.querySelector('#cn').value.trim();if(!name)return;try{await api('/api/classes',{method:'POST',body:JSON.stringify({name})});closeModal();dashboard()}catch(e){notify(e.message)}}
function renameClass(id,old){modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>Sınıf adını değiştir</h2><input id="cn" value="${esc(decodeURIComponent(old))}" autofocus><div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="saveRenameClass(${id})">Kaydet</button></div>`)}
async function saveRenameClass(id){const name=document.querySelector('#cn').value.trim();if(!name)return;try{await api('/api/classes/'+id,{method:'PATCH',body:JSON.stringify({name})});closeModal();dashboard()}catch(e){notify(e.message)}}
async function deleteClass(id,name){if(confirm(`${decodeURIComponent(name)} sınıfını ve içindeki öğrencileri silmek istediğine emin misin? Bu işlem geri alınamaz.`))try{await api('/api/classes/'+id,{method:'DELETE'});dashboard()}catch(e){notify(e.message)}}
function gameForm(id=0,t='',u='',type='external',data=''){let pairs='';try{const d=JSON.parse(decodeURIComponent(data)||'{}');pairs=(d.pairs||[]).map(x=>`${x[0]} = ${x[1]}`).join('\n')}catch{}modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>${id?'Oyunu düzenle':'Yeni oyun'}</h2><label>Oyun adı</label><input id="gt" value="${esc(id?decodeURIComponent(t):'')}"><label>Oyun türü</label><select id="gtype" onchange="toggleGameFields()"><option value="external" ${!['matching','chess_intro','chess_names','chess_setup'].includes(type)?'selected':''}>Canva / dış bağlantı</option><option value="matching" ${type==='matching'?'selected':''}>🧩 Minoo Eşleştirme</option><option value="chess_intro" ${type==='chess_intro'?'selected':''}>♟️ Satranç Taşlarını Tanı</option><option value="chess_names" ${type==='chess_names'?'selected':''}>🔊 Satranç Taşlarının İsimleri</option><option value="chess_setup" ${type==='chess_setup'?'selected':''}>♟️ Satranç Taşlarını Dizelim</option></select><div id="externalFields"><label>Canva bağlantısı</label><input id="gu" value="${esc(id?decodeURIComponent(u):'')}" placeholder="https://...canva.com/..."></div><div id="matchingFields"><label>Eşleştirme çiftleri</label><textarea id="gpairs" rows="7" placeholder="Kedi = 🐱\nKöpek = 🐶\nElma = 🍎">${esc(pairs)}</textarea><p class="hint">Her satıra bir çift yaz. İki tarafı = işaretiyle ayır. Metin, sayı veya emoji kullanabilirsin. En az 2, en fazla 12 çift.</p></div><p class="hint">Öğrencileri sınıf ekranından seçerek atayabilirsin.</p><div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="saveGame(${id})">Kaydet</button></div>`);toggleGameFields()}
function toggleGameFields(){const type=document.querySelector('#gtype')?.value;const matching=type==='matching';document.querySelector('#externalFields').style.display=type==='external'?'block':'none';document.querySelector('#matchingFields').style.display=matching?'block':'none'}
async function saveGame(id){const title=document.querySelector('#gt').value.trim(),game_type=document.querySelector('#gtype').value,canva_url=document.querySelector('#gu').value.trim();const pairs=document.querySelector('#gpairs').value.split('\n').map(line=>{const i=line.indexOf('=');return i<0?[]:[line.slice(0,i).trim(),line.slice(i+1).trim()]}).filter(x=>x[0]&&x[1]);try{await api(id?'/api/games/'+id:'/api/games',{method:id?'PATCH':'POST',body:JSON.stringify({title,game_type,canva_url,pairs})});closeModal();currentClass?openClass(currentClass):dashboard()}catch(e){notify(e.message)}}
async function deleteGame(id,name){if(confirm(`${decodeURIComponent(name)} oyununu silmek istediğine emin misin? Tüm atamaları da silinir.`))try{await api('/api/games/'+id,{method:'DELETE'});currentClass?openClass(currentClass):dashboard()}catch(e){notify(e.message)}}
async function openClass(id){currentClass=id;const [cs,ss,as,gs]=await Promise.all([api('/api/classes'),api(`/api/classes/${id}/students`),api(`/api/classes/${id}/assignments`),api('/api/games')]);const c=cs.find(x=>Number(x.id)===Number(id));const grouped={};as.forEach(a=>(grouped[a.game_id]??={game_id:a.game_id,title:a.title,rows:[]}).rows.push(a));app.innerHTML=`<header><button class="ghost" onclick="dashboard()">← Sınıflar</button><b>${esc(c?.name||'Sınıf')}</b><button class="ghost" onclick="home()">Çıkış</button></header><main><div class="cols"><section><div class="toolbar"><h2>Öğrenciler</h2><div class="row"><button onclick="studentForm()">+ Öğrenci</button><button class="ghost" onclick="bulkStudents()">Toplu ekle</button></div></div>${ss.length?`<div class="bulk-bar"><label><input id="selectAllStudents" type="checkbox" onchange="selectAllStudents(this.checked)"> Tümünü seç</label><span id="selectedCount">0 öğrenci seçildi</span><button id="bulkDeleteBtn" class="danger ghost" onclick="deleteSelectedStudents()" disabled>Seçilenleri sil</button></div>`:''}${ss.map(s=>`<article class="student"><input class="student-select" type="checkbox" data-student-id="${s.id}" aria-label="${esc(s.name)} seç" onchange="updateStudentSelection()"><div class="student-main" onclick="profile(${s.id})">${avatar(s)}<div><b>${esc(s.name)}</b><small>👤 ${esc(s.username||'—')}</small><code>${esc(s.code)}</code><small>${s.completed_count||0}/${s.assigned_count||0} tamamlandı</small>${s.guardian_name?`<small>Veli: ${esc(s.guardian_name)}</small>`:''}</div></div><div class="row"><button class="ghost" onclick="studentForm(${s.id})">Düzenle</button><button class="ghost" onclick="parentNoteQuick(${s.id},'${encodeURIComponent(s.name)}')">💌 Veliye not</button><button class="ghost" onclick="assignGamesToStudent(${s.id},'${encodeURIComponent(s.name)}')">🎮 Oyun ata</button><button class="ghost" onclick="copyCode('${esc(s.code)}')">Kopyala</button><button class="ghost" onclick="regen(${s.id})">Kod yenile</button><button class="danger ghost" onclick="deleteStudent(${s.id},'${encodeURIComponent(s.name)}')">Sil</button></div></article>`).join('')||'<p>Öğrenci yok.</p>'}</section><section><h2>Oyun ata</h2><select id="gamePick"><option value="">Oyun seç</option>${gs.map(g=>`<option value="${g.id}">${esc(g.title)}</option>`).join('')}</select><button onclick="assignPicked()">Öğrencileri seç</button><p class="hint">Mevcut bir oyunu istediğin zaman bu sınıftaki öğrencilere ekleyip çıkarabilirsin.</p></section></div><section class="card wide"><h2>Tamamlanma takibi</h2>${Object.values(grouped).map(g=>{const done=g.rows.filter(x=>x.completed_at).length;return `<article class="assignment"><div class="toolbar"><div><h3>${esc(g.title)}</h3><b>${done}/${g.rows.length} öğrenci • %${g.rows.length?Math.round(done/g.rows.length*100):0}</b></div><button onclick="editAssignment(${g.game_id})">Atamayı düzenle</button></div><progress max="${g.rows.length}" value="${done}"></progress>${g.rows.map(x=>`<div class="status"><span>${esc(x.name)}</span><span>${x.completed_at?'✅ Tamamladı':'⏳ Yapmadı'}</span></div>`).join('')}</article>`}).join('')||'<p>Henüz atama yok.</p>'}</section></main>`}
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

async function profile(id){try{const p=await api(`/api/students/${id}/profile`),d=p.games.filter(x=>x.completed_at).length,s=p.student;modal(`<button class="modal-x" onclick="closeModal()">×</button><div class="profile-head">${avatar(s,'large')}<div><h2>${esc(s.name)}</h2><p>${esc(s.class_name)}</p></div></div><div class="info"><b>Kullanıcı adı</b><span>${esc(s.username||"—")}</span><b>İlk giriş kodu</b><span>${esc(s.code)} <button class="tiny ghost" onclick="copyCode('${esc(s.code)}')">Kopyala</button></span><b>Veli</b><span>${esc(s.guardian_name||'—')}</span><b>Telefon</b><span>${esc(s.guardian_phone||'—')}</span><b>İlerleme</b><span>${d}/${p.games.length} tamamlandı</span><b>Öğretmen notu</b><span class="teacher-note">${esc(s.teacher_note||'—')}</span></div><section class="parent-note-admin"><div class="toolbar"><h3>💌 Veliye Notlar</h3></div><textarea id="parentNote" rows="2" maxlength="1000" placeholder="Velinin görebileceği yeni not..."></textarea><button onclick="addParentNote(${s.id})">Veliye not ekle</button><div class="note-history">${(p.parent_notes||[]).map(n=>`<article class="note-item"><div><b>${formatDate(n.created_at)}</b><span>${n.seen_at?'✓ Veli gördü':'○ Henüz görülmedi'}</span></div><p>${esc(n.note)}</p><button class="tiny danger ghost" onclick="deleteParentNote(${n.id},${s.id})">Sil</button></article>`).join('')||'<p class="hint">Henüz veliye not yazılmadı.</p>'}</div></section><h3>Oyunlar</h3>${p.games.map(x=>`<div class="status"><span>${esc(x.title)}</span><span>${x.completed_at?'✅':'○'}</span></div>`).join('')||'<p>Henüz oyun atanmadı.</p>'}<div class="modal-actions"><button class="ghost" onclick="closeModal();studentForm(${s.id})">Düzenle</button><button onclick="closeModal()">Kapat</button></div>`)}catch(e){notify(e.message)}}
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

async function studentLogin(){const username=document.querySelector('#suser').value.trim().toLowerCase(),password=document.querySelector('#scode').value.trim();if(!username||!password)return notify('Kullanıcı adı ve şifre gerekli');try{studentSession=await api('/api/student/login',{method:'POST',body:JSON.stringify({username,password})});studentDash()}catch(e){notify(e.message)}}
function changeStudentPassword(){modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>🔐 Şifremi değiştir</h2><label>Mevcut şifre</label><input id="oldpw" type="password"><label>Yeni şifre</label><input id="newpw" type="password" minlength="4"><label>Yeni şifre tekrar</label><input id="newpw2" type="password" minlength="4"><div class="modal-actions"><button class="ghost" onclick="closeModal()">Vazgeç</button><button onclick="saveStudentPassword()">Şifreyi değiştir</button></div>`)}
async function saveStudentPassword(){const old_password=document.querySelector('#oldpw').value,new_password=document.querySelector('#newpw').value,new2=document.querySelector('#newpw2').value;if(new_password!==new2)return notify('Yeni şifreler aynı değil');if(new_password.length<4)return notify('Yeni şifre en az 4 karakter olmalı');try{await api(`/api/student/${studentSession.id}/password`,{method:'POST',body:JSON.stringify({old_password,new_password})});closeModal();notify('Şifren değiştirildi ✓')}catch(e){notify(e.message)}}
async function studentDash(){const [gs,notes]=await Promise.all([api(`/api/student/${studentSession.id}/games`),api(`/api/student/${studentSession.id}/parent-notes`)]);app.innerHTML=`<header><div class="kid-head">${avatar(studentSession)}<div><b>Merhaba ${esc(studentSession.name)} 👋</b><small>${esc(studentSession.class_name)}</small></div></div><div class="account-row"><button class="ghost" onclick="changeStudentPassword()">🔐 Şifrem</button><button class="ghost" onclick="home()">Çıkış</button></div></header><main class="kid">${notes.length?`<section class="parent-notes-kid"><h2>💌 Öğretmeninden Not</h2>${notes.map(n=>`<article><small>${formatDate(n.created_at)}</small><p>${esc(n.note)}</p></article>`).join('')}</section>`:''}${gs.filter(g=>!g.completed_at).length?`<section class="new-task-panel"><h2>🆕 Yeni Görev</h2><div class="new-task-list">${gs.filter(g=>!g.completed_at).map(g=>`<button class="new-task-btn" onclick="playEncoded('${encodeURIComponent(JSON.stringify(g))}')"><span><b>${esc(g.title)}</b><br><small>Öğretmenin sana yeni bir oyun gönderdi.</small></span><span>Oyna →</span></button>`).join('')}</div></section>`:''}<h1>Oyunlarım</h1><p>Bugün keşfedecek harika oyunların var!</p><div class="grid">${gs.map(g=>`<article class="game ${g.completed_at?'done':''}"><h2>${esc(g.title)}</h2><p>${g.game_type==='matching'?'🧩 Minoo Eşleştirme':g.game_type==='chess_intro'?'♟️ Satranç Taşlarını Tanı':g.game_type==='chess_names'?'🔊 Satranç Taşlarının İsimleri':g.game_type==='chess_setup'?'♟️ Satranç Taşlarını Dizelim':'🎨 Canva oyunu'}</p><p>${g.completed_at?'✅ Tamamladın':'🌱 Seni bekliyor'}</p><button onclick="playEncoded('${encodeURIComponent(JSON.stringify(g))}')">${g.completed_at?'Tekrar oyna':'Oyunu aç'}</button></article>`).join('')||'<div class="card"><h2>Şimdilik oyun yok 🌼</h2><p>Öğretmenin yeni oyun eklediğinde burada görünecek.</p></div>'}</div></main>`}
function playEncoded(v){playGame(JSON.parse(decodeURIComponent(v)))}
function playGame(g){if(g.game_type==='matching')return matchingGame(g);if(g.game_type==='chess_intro')return chessIntroGame(g);if(g.game_type==='chess_names')return chessNamesGame(g);if(g.game_type==='chess_setup')return chessSetupGame(g);play(g.assignment_id,encodeURIComponent(g.canva_url))}
async function play(aid,u){window.open(decodeURIComponent(u),'_blank','noopener,noreferrer');modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>Oyunu bitirdin mi? 🌟</h2><p>Oyunu tamamladıysan aşağıdaki düğmeye bas.</p><div class="modal-actions"><button class="ghost" onclick="closeModal()">Daha bitirmedim</button><button onclick="completeGame(${aid})">Tamamladım ✓</button></div>`)}
function matchingGame(g){let data={pairs:[]};try{data=JSON.parse(g.game_data||'{}')}catch{}const pairs=data.pairs||[];const cards=[];pairs.forEach((p,i)=>{cards.push({pair:i,text:p[0]}),cards.push({pair:i,text:p[1]})});for(let i=cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]]}app.innerHTML=`<header><button class="ghost" onclick="${teacherPreviewMode?'previewBack()':'studentDash()'}">← ${teacherPreviewMode?'Oyun Kütüphanesi':'Oyunlarım'}</button><b>${esc(g.title)}</b><span></span></header><main class="matching-wrap"><div class="matching-top"><div><h1>🧩 Eşlerini bul!</h1><p>Birbirine ait iki karta sırayla dokun.</p></div><b id="matchScore">0 / ${pairs.length}</b></div><div id="matchBoard" class="match-board">${cards.map((c,i)=>`<button class="match-card" data-i="${i}" data-pair="${c.pair}" type="button"><span>?</span><b>${esc(c.text)}</b></button>`).join('')}</div><p id="matchMessage" class="match-message" aria-live="polite"></p></main>`;let first=null,lock=false,done=0;const board=document.querySelector('#matchBoard');board.addEventListener('click',e=>{const btn=e.target.closest('.match-card');if(!btn||lock||btn.classList.contains('matched')||btn===first)return;btn.classList.add('open');if(!first){first=btn;return}if(first.dataset.pair===btn.dataset.pair){first.classList.add('matched');btn.classList.add('matched');first=null;done++;document.querySelector('#matchScore').textContent=`${done} / ${pairs.length}`;document.querySelector('#matchMessage').textContent='Harika! Bir eş buldun 🌟';if(done===pairs.length)setTimeout(()=>teacherPreviewMode?previewFinished(g.title):matchingFinished(g.assignment_id,g.title),500)}else{lock=true;document.querySelector('#matchMessage').textContent='Bir daha deneyelim 🌱';const old=first;first=null;setTimeout(()=>{old.classList.remove('open');btn.classList.remove('open');lock=false},700)}})}
function previewFinished(title){modal(`<h2>Önizleme tamamlandı 🎉</h2><p><b>${esc(title)}</b> öğretmen önizlemesinde tamamlandı.</p><p class="hint">Bu deneme hiçbir öğrencinin ilerleme kaydını değiştirmedi.</p><div class="modal-actions"><button onclick="closeModal();previewBack()">Oyun Kütüphanesine dön</button></div>`)}
async function matchingFinished(aid,title){try{await api(`/api/assignments/${aid}/complete`,{method:'POST'});modal(`<h2>Harika! 🎉</h2><p><b>${esc(title)}</b> oyununu tamamladın.</p><p class="big-star">⭐</p><div class="modal-actions"><button onclick="closeModal();studentDash()">Oyunlarıma dön</button></div>`)}catch(e){notify(e.message)}}



document.head.insertAdjacentHTML('beforeend',`<style>
.minoo-piece-svg{width:58px;height:68px;display:block;margin:auto;filter:drop-shadow(0 4px 3px rgba(35,25,18,.22))}
.setup-desktop-layout{display:grid;grid-template-columns:190px minmax(420px,560px) 190px;gap:16px;align-items:start;justify-content:center}
.setup-side{border-radius:22px;padding:12px;min-height:560px}.setup-side.white{background:#eef7ff}.setup-side.black{background:#fff3eb}.setup-side h3{text-align:center;font-size:14px;margin:4px 0 12px}
.side-pieces{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}.tray-piece{position:relative;min-width:0!important;width:100%;padding:8px 4px!important}
.setup-side.white .tray-piece{background:#9a704f!important;border-color:#79553c!important}.setup-side.black .tray-piece{background:#f2dfc2!important;border-color:#d3b68d!important}
.setup-side.white .tray-piece small{color:#fff!important}.setup-side.black .tray-piece small{color:#352b24!important}.piece-count{position:absolute;right:5px;top:5px;background:#6f83bd;color:#fff;border-radius:8px;padding:2px 6px;font:800 11px system-ui}
.tray-empty{grid-column:1/-1;text-align:center;padding:24px 5px;font-weight:900;color:#55a86a}
.setup-square.home:empty:after{content:''!important;display:block!important;width:62%!important;height:62%!important;border:2px dashed rgba(56,43,31,.48)!important;border-radius:8px!important}
.setup-piece{border:0;background:transparent;padding:0;width:88%;height:88%;display:grid;place-items:center}.setup-piece .minoo-piece-svg{width:88%;height:88%}
.learn-pool{display:grid;grid-template-columns:repeat(8,1fr);gap:6px;max-width:650px;margin:12px auto}.learn-chip{border:0;border-radius:12px;padding:4px}.learn-chip.white{background:#9a704f}.learn-chip.black{background:#f2dfc2}.learn-chip .minoo-piece-svg{width:40px;height:48px}
@media(max-width:760px){.setup-desktop-layout{grid-template-columns:1fr 1fr;gap:8px}.setup-desktop-layout .setup-board{grid-column:1/-1;grid-row:1;width:min(94vw,500px)!important}.setup-side{min-height:0;padding:8px}.setup-side.white{grid-column:1;grid-row:2}.setup-side.black{grid-column:2;grid-row:2}.side-pieces{grid-template-columns:repeat(3,1fr);gap:5px}.tray-piece .minoo-piece-svg{width:38px;height:46px}.setup-side h3{font-size:11px}.learn-pool{grid-template-columns:repeat(8,1fr);gap:3px}.learn-chip .minoo-piece-svg{width:29px;height:36px}}
</style>`);

/* ===== Minoo v2.5.1 • Satranç Taşlarını Dizelim ===== */
let setupState=null;

function minooPieceSvg(type,side){
 const uid=`m${type}${side}${Math.random().toString(36).slice(2,7)}`, white=side==='white';
 const light=white?'#ffffff':'#4a515c', mid=white?'#ece9e2':'#171a20', dark=white?'#c9c4ba':'#050609', edge=white?'#777168':'#020304';
 const defs=`<defs><linearGradient id="${uid}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light}"/><stop offset=".48" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/></linearGradient><linearGradient id="${uid}b" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${white?'#fff':'#343a44'}"/><stop offset="1" stop-color="${white?'#d7d2c8':'#07090c'}"/></linearGradient></defs>`;
 const F=`fill="url(#${uid}g)" stroke="${edge}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`, B=`fill="url(#${uid}b)" stroke="${edge}" stroke-width="2.4" stroke-linejoin="round"`, H=`fill="none" stroke="${white?'#fff':'#89919d'}" stroke-width="4.5" stroke-linecap="round" opacity=".72"`;
 let body='';
 if(type==='pawn')body=`<circle cx="50" cy="22" r="14" ${F}/><rect x="34" y="37" width="32" height="8" rx="4" ${B}/><path d="M39 45C41 58 37 68 29 77H71C63 68 59 58 61 45Z" ${F}/><path d="M24 77H76L82 90H18Z" ${B}/><rect x="12" y="90" width="76" height="12" rx="5" ${B}/><path d="M42 15Q49 10 56 14" ${H}/><path d="M42 50Q40 64 34 71" ${H}/>`;
 else if(type==='rook')body=`<path d="M18 13H34V28H43V13H57V28H66V13H82V39Q82 45 75 45H25Q18 45 18 39Z" ${F}/><rect x="25" y="44" width="50" height="9" rx="4" ${B}/><path d="M31 53H69L66 78H34Z" ${F}/><rect x="23" y="77" width="54" height="11" rx="4" ${B}/><path d="M16 88H84L89 102H11Z" ${B}/><path d="M27 19V36" ${H}/><path d="M38 57L35 71" ${H}/>`;
 else if(type==='bishop')body=`<circle cx="50" cy="13" r="8" ${F}/><path d="M50 22C35 28 28 41 31 55C33 63 38 68 41 71H59C62 68 67 63 69 55C72 41 65 28 50 22Z" ${F}/><path d="M47 29L58 44" stroke="${edge}" stroke-width="4" stroke-linecap="round"/><rect x="28" y="70" width="44" height="10" rx="4" ${B}/><path d="M22 80H78L84 92H16Z" ${F}/><rect x="10" y="92" width="80" height="11" rx="4" ${B}/><path d="M39 30Q32 41 36 54" ${H}/>`;
 else if(type==='knight')body=`<text x="50" y="86" text-anchor="middle" font-size="86" font-family="Georgia, 'Times New Roman', serif" font-weight="700" fill="${white?'#ffffff':'#08090b'}" stroke="${white?'#777066':'#000000'}" stroke-width="${white?'1.8':'1.2'}" paint-order="stroke fill">♞</text><path d="M29 88 H71 L80 99 H20Z" ${B}/><rect x="13" y="98" width="74" height="8" rx="4" ${B}/>`;
 else if(type==='queen')body=`<circle cx="20" cy="21" r="5" ${F}/><circle cx="39" cy="13" r="5" ${F}/><circle cx="61" cy="13" r="5" ${F}/><circle cx="80" cy="21" r="5" ${F}/><path d="M21 28L31 67H69L79 28L62 48L50 21L38 48Z" ${F}/><rect x="28" y="66" width="44" height="10" rx="4" ${B}/><path d="M22 76H78L84 90H16Z" ${F}/><rect x="10" y="91" width="80" height="12" rx="4" ${B}/><path d="M31 34L36 58" ${H}/>`;
 else body=`<path d="M50 4V28M38 16H62" stroke="${white?'#ffffff':edge}" stroke-width="${white?'7':'5'}" stroke-linecap="round" style="${white?'filter:drop-shadow(0 1px 2px rgba(0,0,0,.8))':''}"/><path d="M50 26C35 26 29 37 31 49C32 56 37 61 41 65C35 70 32 75 33 80H67C68 75 65 70 59 65C63 61 68 56 69 49C71 37 65 26 50 26Z" ${F}/><rect x="28" y="79" width="44" height="10" rx="4" ${B}/><path d="M22 89H78L84 101H16Z" ${F}/><path d="M39 33Q32 43 37 53" ${H}/>`;
 return `<svg class="minoo-piece-svg ${side}" viewBox="0 0 100 110" aria-hidden="true">${defs}${body}</svg>`;
}
function setupPieces(){
 const order=['rook','knight','bishop','queen','king','bishop','knight','rook'], a=[];
 order.forEach((type,c)=>a.push({id:`b8-${c}`,type,target:`${c},0`,side:'black'}));
 for(let c=0;c<8;c++)a.push({id:`b7-${c}`,type:'pawn',target:`${c},1`,side:'black'});
 for(let c=0;c<8;c++)a.push({id:`w2-${c}`,type:'pawn',target:`${c},6`,side:'white'});
 order.forEach((type,c)=>a.push({id:`w1-${c}`,type,target:`${c},7`,side:'white'}));
 return a;
}
function setupPieceName(p){return ({rook:'Kale',knight:'At',bishop:'Fil',queen:'Vezir',king:'Şah',pawn:'Piyon'})[p.type]||''}
function chessSetupGame(g){
 setupState={g,phase:'learn',placed:new Map(),pieces:setupPieces(),selected:null,audio:true};
 app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="${teacherPreviewMode?'previewBack()':'studentDash()'}">← ${teacherPreviewMode?'Oyun Kütüphanesi':'Oyunlarım'}</button><b>♟️ ${esc(g.title||'Satranç Taşlarını Dizelim')}</b><span id="setupProgress">0 / 32</span></header>
 <main class="setup-world"><section class="setup-card"><div class="setup-guide"><div class="setup-mascot">🌱</div><div><h1>Satranç Taşlarını Dizelim</h1><p id="setupMessage">Önce doğru dizilişi birlikte görelim.</p></div></div><div id="setupArea"></div><div class="setup-actions"><button id="setupStart" class="setup-start" hidden onclick="setupStartPlay()">▶ Oyuna Başla</button></div></section></main>`;
 renderSetup();
}
function setupBoardHtml(){
 let h='<div class="setup-board">';
 for(let r=0;r<8;r++)for(let c=0;c<8;c++){const key=`${c},${r}`,home=(r<=1||r>=6),p=setupState.placed.get(key);h+=`<div class="setup-square ${(r+c)%2?'dark':'light'} ${home?'home':''}" data-key="${key}" onclick="setupSquareClick('${key}')">${c===0?`<span class="rank">${8-r}</span>`:''}${r===7?`<span class="file">${'abcdefgh'[c]}</span>`:''}${p?`<button class="setup-piece ${p.side}" onclick="event.stopPropagation();setupBoardPieceClick('${p.id}')">${minooPieceSvg(p.type,p.side)}</button>`:''}</div>`}return h+'</div>';
}
function setupTrayHtml(side){
 const remaining=setupState.pieces.filter(p=>p.side===side && ![...setupState.placed.values()].some(x=>x.id===p.id));
 const groups=['rook','knight','bishop','queen','king','pawn'].map(type=>({type,items:remaining.filter(p=>p.type===type)})).filter(g=>g.items.length);
 return `<aside class="setup-side ${side}"><h3>${side==='white'?'⚪ BEYAZ TAŞLAR':'⚫ SİYAH TAŞLAR'}</h3><div class="side-pieces">${groups.map(g=>{const p=g.items[0];return `<button class="tray-piece ${side} ${setupState.selected===p.id?'selected':''}" onclick="setupPieceClick('${p.id}')">${minooPieceSvg(p.type,p.side)}<small>${setupPieceName(p)}</small>${g.items.length>1?`<b class="piece-count">${g.items.length}</b>`:''}</button>`}).join('')||'<div class="tray-empty">✓ Tamam</div>'}</div></aside>`;
}
function renderSetup(){
 const area=document.querySelector('#setupArea'); if(!area)return;
 if(setupState.phase==='learn'){
   area.innerHTML=`<div class="setup-desktop-layout">${setupTrayHtml('white')}${setupBoardHtml()}${setupTrayHtml('black')}</div>`;
 } else {
   area.innerHTML=`<div class="setup-desktop-layout">${setupTrayHtml('white')}${setupBoardHtml()}${setupTrayHtml('black')}</div>`;
 }
 document.querySelector('#setupProgress').textContent=`${setupState.placed.size} / 32`;
 const actions=document.querySelector('.setup-actions');
 actions.innerHTML=`<div class="setup-controls">
 ${setupState.phase==='learn'?'<button class="learn-all" onclick="setupPlaceAllLearn()">✨ Tüm Taşları Diz</button>':''}
 <button class="clean" onclick="setupClearBoard()">↻ Tahtayı Temizle</button>
 <button class="audio" onclick="setupToggleAudio()">🔊 Sesli Anlatım: <span id="setupAudio">${setupState.audio===false?'Kapalı':'Açık'}</span></button>
 <button class="check" onclick="setupCheck()">✓ Kontrol Et</button>
 <button class="help" onclick="setupHelp()">? Nasıl Oynanır?</button>
 ${setupState.phase==='learn'&&setupState.placed.size===32?'<button class="setup-start" onclick="setupStartPlay()">▶ Oyuna Başla</button>':''}
 </div>`;
}
function setupLearnPiece(id){setupPieceClick(id)}
function setupPieceClick(id){
 const p=setupState.pieces.find(x=>x.id===id);if(!p)return;
 if(setupState.phase==='learn'){
   const key=setupAllowedTargets(p).find(k=>!setupState.placed.has(k));if(!key)return;
   const from=[...document.querySelectorAll('.tray-piece')].find(x=>x.getAttribute('onclick')?.includes(`'${id}'`));
   const to=document.querySelector(`.setup-square[data-key="${key}"]`);
   if(!from||!to){setupState.placed.set(key,p);setupPlaceSound();renderSetup();return}
   const A=from.getBoundingClientRect(),B=to.getBoundingClientRect(),x1=A.left+A.width/2,y1=A.top+A.height/2,x2=B.left+B.width/2,y2=B.top+B.height/2;
   const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','setup-arrow-layer');
   svg.innerHTML=`<defs><linearGradient id="arrowGrad248"><stop offset="0" stop-color="#a58ce8"/><stop offset=".55" stop-color="#7f9fe7"/><stop offset="1" stop-color="#66c8c0"/></linearGradient><marker id="arr248" markerWidth="11" markerHeight="11" refX="8.5" refY="4" orient="auto"><path d="M1 1L1 7Q1 8 2 7.5L9 4.4Q10 4 9 3.5L2 .5Q1 0 1 1Z" fill="#66c8c0"/></marker></defs><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#arrowGrad248)" stroke-width="6" stroke-linecap="round" stroke-dasharray="10 8" marker-end="url(#arr248)"/>`;document.body.appendChild(svg);
   const fly=document.createElement('div');fly.className='setup-fly';fly.innerHTML=minooPieceSvg(p.type,p.side);fly.style.left=(x1-29)+'px';fly.style.top=(y1-33)+'px';document.body.appendChild(fly);
   requestAnimationFrame(()=>fly.style.transform=`translate(${x2-x1}px,${y2-y1}px)`);
   setTimeout(()=>{svg.remove();fly.remove();setupState.placed.set(key,p);setupPlaceSound();renderSetup();document.querySelector('#setupMessage').textContent=setupState.placed.size===32?'Harika! Doğru dizilişi gördün. Şimdi Oyuna Başla.':`${setupPieceName(p)} doğru yerine gitti.`},680);
 }else{setupState.selected=setupState.selected===id?null:id;renderSetup()}
}

function setupPlaceAllLearn(){
 if(!setupState||setupState.phase!=='learn')return;
 setupState.placed.clear();
 const occupied=new Set();
 setupState.pieces.forEach(p=>{
   const key=setupAllowedTargets(p).find(k=>!occupied.has(k));
   if(key){occupied.add(key);setupState.placed.set(key,p)}
 });
 setupPlaceSound();
 renderSetup();
 const m=document.querySelector('#setupMessage');
 if(m)m.textContent='Harika! Tüm taşların doğru başlangıç dizilişini gördün. Şimdi Oyuna Başla.';
}
function setupStartPlay(){setupState.phase='play';setupState.placed.clear();setupState.selected=null;document.querySelector('#setupMessage').textContent='Bir taşa dokun, sonra tahtadaki doğru kareye dokun.';renderSetup()}
function setupBoardPieceClick(id){if(setupState.phase!=='play')return;const entry=[...setupState.placed.entries()].find(([,p])=>p.id===id);if(!entry)return;setupState.placed.delete(entry[0]);setupState.selected=id;renderSetup()}
function setupSquareClick(key){if(setupState.phase==='play'&&setupState.selected)setupTryPlace(setupState.selected,key)}
function setupAllowedTargets(p){
 if(p.type==='pawn')return [...Array(8)].map((_,c)=>`${c},${p.side==='white'?6:1}`);
 if(p.type==='rook')return p.side==='white'?['0,7','7,7']:['0,0','7,0'];
 if(p.type==='knight')return p.side==='white'?['1,7','6,7']:['1,0','6,0'];
 if(p.type==='bishop')return p.side==='white'?['2,7','5,7']:['2,0','5,0'];
 return [p.target];
}
function setupTryPlace(id,key){const p=setupState.pieces.find(x=>x.id===id);if(!p||setupState.placed.has(key))return;if(!setupAllowedTargets(p).includes(key)){const sq=document.querySelector(`.setup-square[data-key="${key}"]`);sq?.classList.add('wrong');setTimeout(()=>sq?.classList.remove('wrong'),420);return}setupState.placed.set(key,p);setupState.selected=null;setupPlaceSound();renderSetup()}
function setupClearBoard(){setupState.placed.clear();setupState.selected=null;renderSetup();document.querySelector('#setupMessage').textContent=setupState.phase==='learn'?'Tahta temizlendi. Bir taşa dokunup yeniden öğrenebilirsin.':'Tahta temizlendi. Yeniden dizmeye başlayabilirsin.'}
function setupToggleAudio(){setupState.audio=setupState.audio===false;const e=document.querySelector('#setupAudio');if(e)e.textContent=setupState.audio?'Açık':'Kapalı';notify(setupState.audio?'Sesli anlatım açık':'Sesli anlatım kapalı')}
function setupHelp(){modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>♟️ Nasıl oynanır?</h2><p><b>Öğrenirken:</b> Bir taşa dokun. Ok doğru kareyi gösterir ve taş yerine gider.</p><p><b>Oynarken:</b> Sağ veya soldan taşı seç, sonra doğru kareye dokun.</p><p>Piyonlar kendi sıralarındaki herhangi bir boş kareye; kale, at ve filler de kendi iki doğru başlangıç karesinden boş olana yerleşebilir.</p><div class="modal-actions"><button onclick="closeModal()">Anladım ✓</button></div>`)}
function setupCheck(){if(setupState.phase==='learn'){notify(setupState.placed.size===32?'Öğrenme tamamlandı ✓':'Önce 32 taşı birlikte yerleştirelim.');return}if(setupState.placed.size<32){notify(`${32-setupState.placed.size} taş daha yerleştirmen gerekiyor.`);return}setupWin()}
function setupPlaceSound(){try{const C=window.AudioContext||window.webkitAudioContext,ctx=new C(),t=ctx.currentTime,b=ctx.createBuffer(1,ctx.sampleRate*.07,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*.012));const src=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();src.buffer=b;f.type='lowpass';f.frequency.value=850;g.gain.setValueAtTime(.17,t);g.gain.exponentialRampToValueAtTime(.001,t+.07);src.connect(f).connect(g).connect(ctx.destination);src.start(t)}catch{}}
async function setupWin(){
 const g=setupState.g;playChessCelebration();
 if(!teacherPreviewMode&&g.assignment_id){try{await api(`/api/assignments/${g.assignment_id}/complete`,{method:'POST'})}catch{}}
 modal(`<h2>👏 Aferin! 🎉</h2><p>Beyaz ve siyah taşların hepsini doğru yerlerine dizdin!</p><div class="big-star">⭐⭐⭐</div><div class="modal-actions"><button class="ghost" onclick="closeModal();chessSetupGame(setupState.g)">↻ Yeniden Oyna</button><button onclick="closeModal();${teacherPreviewMode?'previewBack()':'studentDash()'}">⌂ Ana Sayfaya Dön</button></div>`);
}



let minooVoice=null;
function minooPickVoice(){
 const vs=window.speechSynthesis?.getVoices?.()||[];
 const tr=vs.filter(v=>(v.lang||'').toLowerCase().startsWith('tr'));
 const femaleHints=['yelda','filiz','emel','aylin','seda','female','kadın'];
 minooVoice=tr.find(v=>femaleHints.some(h=>(v.name||'').toLowerCase().includes(h)))
          ||tr.find(v=>/natural|premium|enhanced|neural/i.test(v.name||''))
          ||tr[0]||vs.find(v=>(v.lang||'').toLowerCase().startsWith('tr'))||null;
 return minooVoice;
}
if('speechSynthesis' in window){
 minooPickVoice();
 speechSynthesis.addEventListener?.('voiceschanged',minooPickVoice);
}
function minooSpeak(text,opts={}){
 if(!('speechSynthesis' in window))return;
 speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(text);
 u.lang='tr-TR'; u.rate=opts.rate??0.86; u.pitch=opts.pitch??1.02; u.volume=1;
 const v=minooPickVoice(); if(v)u.voice=v;
 if(opts.onend)u.onend=opts.onend;
 speechSynthesis.speak(u);
}

const CHESS_PIECES=[
{name:'Kale',symbol:'♜',tone:'blue',short:'Düz yolların ustasıyım!',speech:'Merhaba! Ben Kale. Dikey ve yatay yönlerde istediğim kadar ilerleyebilirim. Taş alırken de düz yolları kullanırım.',dirs:['up','right','down','left'],note:'Dikey ve yatay gider.'},
{name:'At',symbol:'♞',tone:'peach',short:'L şeklinde sıçrarım!',speech:'Merhaba! Ben At. İki kare bir yöne, sonra bir kare yana giderim. Hareketim L harfine benzer. Üstelik diğer taşların üzerinden atlayabilirim.',dirs:['knight'],note:'L şeklinde gider ve taşların üzerinden atlayabilir.'},
{name:'Fil',symbol:'●',tone:'lilac',short:'Çapraz yollar benim!',speech:'Merhaba! Ben Fil. Her zaman çapraz yönlerde istediğim kadar ilerlerim. Taş alırken de çapraz giderim.',dirs:['ne','se','sw','nw'],note:'Her yöne çapraz gider.'},
{name:'Vezir',symbol:'♛',tone:'pink',short:'Her yöne gidebilirim!',speech:'Merhaba! Ben Vezir. Yatay, dikey ve çapraz yönlerde istediğim kadar ilerleyebilirim. Taş alırken da bu yönleri kullanırım.',dirs:['up','ne','right','se','down','sw','left','nw'],note:'Yatay, dikey ve çapraz gider.'},
{name:'Şah',symbol:'♚',tone:'mint',short:'Bir kare, her yöne!',speech:'Merhaba! Ben Şah. Her yöne gidebilirim ama yalnızca bir kare ilerlerim. Ben çok önemliyim. Rakibin beni kaçamayacağım şekilde tehdit etmesine şah mat denir.',dirs:['king'],note:'Her yöne yalnızca bir kare gider.'},
{name:'Piyon',symbol:'♟',tone:'melon',short:'İleri gider, çapraz alırım!',speech:'Merhaba! Ben Piyon. Düz yönde ilerlerim. İlk hamlemde bir ya da iki kare, sonraki hamlelerde bir kare gidebilirim. Taş alırken bir kare çapraza giderim ve asla geri gitmem. Son sıraya ulaşırsam terfi edebilirim.',dirs:['pawn'],note:'İleri gider; taş alırken çapraz gider.'}
];

function chessPieceVisual(p){
 if(p.name==='Fil')return `<svg class="bishop-svg" viewBox="0 0 100 120" role="img" aria-label="Fil"><circle cx="50" cy="15" r="10" fill="currentColor"/><path d="M50 26 C31 38 28 57 39 70 L29 89 H71 L61 70 C72 57 69 38 50 26Z" fill="currentColor"/><rect x="24" y="90" width="52" height="11" rx="5" fill="currentColor"/><rect x="17" y="103" width="66" height="10" rx="5" fill="currentColor"/></svg>`;
 return `<span class="chess-glyph">${p.symbol}</span>`
}

/* ===== Minoo v2.5.1 • Satranç Taşlarının İsimleri ===== */
function chessNamesGame(g){
 window._chessNamesState={g,heard:new Set()};
 app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="${teacherPreviewMode?'previewBack()':'studentDash()'}">← ${teacherPreviewMode?'Oyun Kütüphanesi':'Oyunlarım'}</button><b>🔊 ${esc(g.title||'Satranç Taşlarının İsimleri')}</b><span id="chessNamesProgress">0 / 6 dinlendi</span></header>
 <main class="chess-world chess-names-world">
  <section class="chess-names-card">
   <div class="chess-hero names-hero"><span>🔊</span><div><h1>Satranç Taşlarının İsimleri</h1><p><b>Taşa dokun ve adını dinle!</b></p></div></div>
   <div class="chess-piece-grid chess-names-grid">
    ${CHESS_PIECES.map((p,i)=>`<button class="piece-tile ${p.tone} chess-name-tile" onclick="hearChessName(${i})">
      <span class="piece-character">${chessPieceVisual(p)}</span>
      <b>${p.name}</b>
      <em id="nameHeard${i}">Dinlemek için dokun</em>
    </button>`).join('')}
   </div>
   <p id="chessNameMessage" class="setup-message" aria-live="polite">Bir taş seç 🌱</p>
  </section>
 </main>`;
}
function hearChessName(i){
 const st=window._chessNamesState,p=CHESS_PIECES[i]; if(!st||!p)return;
 const tile=document.querySelectorAll('.chess-name-tile')[i];
 document.querySelectorAll('.chess-name-tile').forEach(x=>x.classList.remove('name-speaking'));
 tile?.classList.add('name-speaking');
 const msg=document.querySelector('#chessNameMessage'); if(msg)msg.textContent=p.name;
 try{
  minooSpeak(p.name,{rate:.82,pitch:1.02,onend:()=>tile?.classList.remove('name-speaking')});
 }catch{}
 if(!st.heard.has(i)){
  st.heard.add(i);
  const e=document.querySelector(`#nameHeard${i}`);if(e)e.textContent='✓ Dinledin';
  const pr=document.querySelector('#chessNamesProgress');if(pr)pr.textContent=`${st.heard.size} / 6 dinlendi`;
  if(st.heard.size===6)setTimeout(()=>finishChessNames(),650);
 }
}
async function finishChessNames(){
 const st=window._chessNamesState;if(!st)return;
 playChessCelebration();
 if(!teacherPreviewMode&&st.g.assignment_id){try{await api(`/api/assignments/${st.g.assignment_id}/complete`,{method:'POST'})}catch{}}
 modal(`<h2>👏 Aferin! 🎉</h2><p>Altı satranç taşının adını da dinledin!</p><div class="big-star">♟️ ⭐</div><div class="modal-actions"><button class="ghost" onclick="closeModal();chessNamesGame(window._chessNamesState.g)">↻ Yeniden Dinle</button><button onclick="closeModal();${teacherPreviewMode?'previewBack()':'studentDash()'}">⌂ Ana Sayfaya Dön</button></div>`);
}
document.head.insertAdjacentHTML('beforeend',`<style id="chess-names-244">
.chess-names-card{max-width:920px;margin:auto;background:rgba(255,255,255,.84);border-radius:28px;padding:20px;box-shadow:0 14px 38px rgba(70,80,100,.12)}
.chess-names-grid .piece-tile{min-height:210px}
.chess-names-grid .piece-character{transform:scale(1.08);transition:.18s ease}
.chess-name-tile.name-speaking{transform:translateY(-5px) scale(1.025);box-shadow:0 14px 30px rgba(112,72,199,.22);outline:4px solid rgba(112,72,199,.18)}
.chess-name-tile.name-speaking .piece-character{transform:scale(1.18)}
.chess-name-tile b{font-size:22px}.chess-name-tile em{font-style:normal;font-weight:800;opacity:.72}
@media(max-width:700px){.chess-names-card{padding:12px;border-radius:20px}.chess-names-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.chess-names-grid .piece-tile{min-height:170px}.chess-name-tile b{font-size:19px}}
</style>`);

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
function speakChess(i){if(!('speechSynthesis' in window))return notify('Bu cihazda sesli okuma desteklenmiyor.');minooSpeak(CHESS_PIECES[i].speech,{rate:.86,pitch:1.02})}

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

document.head.insertAdjacentHTML('beforeend', `<style id="minoo242">
.setup-square.home:after{content:""!important;display:block!important;position:absolute!important;width:62%!important;height:62%!important;border:2px dashed rgba(56,43,31,.48)!important;border-radius:8px!important;box-sizing:border-box!important;pointer-events:none!important;z-index:0!important}
.setup-square{position:relative!important}.setup-piece{position:relative!important;z-index:2!important}
.setup-desktop-layout{display:grid!important;grid-template-columns:190px minmax(430px,590px) 190px!important;gap:14px!important;align-items:start!important;justify-content:center!important}
.setup-side{min-width:0!important}.tray-piece{overflow:hidden!important}.tray-piece .minoo-piece-svg{display:block!important;margin:auto!important}
.setup-controls{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:14px}.setup-controls button{border:0;border-radius:999px;padding:11px 15px;font-weight:900;cursor:pointer}
.setup-controls .clean{background:#dff3ff;color:#245777}.setup-controls .audio{background:#eee7ff;color:#59459d}.setup-controls .check{background:#55c994;color:white}.setup-controls .help{background:#ffdfe6;color:#9b4057}
.setup-arrow-layer{position:fixed;inset:0;width:100vw;height:100vh;z-index:9998;pointer-events:none}.setup-fly{position:fixed;width:58px;height:66px;z-index:9999;pointer-events:none;transition:transform .62s cubic-bezier(.22,.8,.28,1)}.setup-fly .minoo-piece-svg{width:100%;height:100%}
@media(max-width:760px){.setup-desktop-layout{grid-template-columns:1fr 1fr!important}.setup-desktop-layout>.setup-board{grid-column:1/-1!important;grid-row:1!important}.setup-side.white{grid-column:1!important}.setup-side.black{grid-column:2!important}}
</style>`);

document.head.insertAdjacentHTML('beforeend', `<style id="minoo243-final">
.setup-world{max-width:none!important;width:100%!important;padding:18px 22px 30px!important;box-sizing:border-box!important}.setup-card{max-width:1080px!important;width:100%!important;margin:0 auto!important;box-sizing:border-box!important;overflow:visible!important}.setup-guide{max-width:920px!important;margin:0 auto 14px!important}
.setup-desktop-layout{display:grid!important;grid-template-columns:150px 500px 150px!important;gap:24px!important;align-items:start!important;justify-content:center!important;width:100%!important}.setup-desktop-layout>.setup-side.white{grid-column:1!important;grid-row:1!important}.setup-desktop-layout>.setup-board{grid-column:2!important;grid-row:1!important;width:500px!important;max-width:500px!important;margin:0!important}.setup-desktop-layout>.setup-side.black{grid-column:3!important;grid-row:1!important}
.setup-side{width:150px!important;min-width:150px!important;min-height:0!important;padding:8px!important;box-sizing:border-box!important;border-radius:18px!important;position:relative!important;z-index:1!important}.side-pieces{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important}.tray-piece{width:100%!important;min-width:0!important;padding:6px 2px!important;overflow:hidden!important;box-sizing:border-box!important;border-radius:14px!important}.tray-piece .minoo-piece-svg{width:48px!important;height:55px!important;display:block!important;margin:auto!important;filter:drop-shadow(0 4px 3px rgba(0,0,0,.25)) saturate(1.05)!important}.setup-piece .minoo-piece-svg{width:94%!important;height:94%!important;filter:drop-shadow(0 3px 2px rgba(0,0,0,.24)) saturate(1.05)!important}.setup-side.white .tray-piece{background:linear-gradient(145deg,#8a614d,#a97c64)!important}.setup-side.black .tray-piece{background:linear-gradient(145deg,#f6ead8,#dfc4a4)!important}.setup-side h3{font-size:12px!important;white-space:nowrap!important}.piece-count{z-index:3!important}
.setup-square.home:after{content:""!important;display:block!important;position:absolute!important;left:20%!important;top:20%!important;width:60%!important;height:60%!important;border:2px dashed rgba(60,45,34,.46)!important;border-radius:7px!important;box-sizing:border-box!important;pointer-events:none!important;z-index:0!important}.setup-square:not(.home):after{display:none!important}.setup-square .setup-piece{position:absolute!important;inset:4%!important;width:92%!important;height:92%!important;z-index:2!important;border:0!important;background:transparent!important;padding:0!important}.setup-controls{max-width:900px!important;margin:16px auto 0!important}
@media(max-width:1000px) and (min-width:761px){.setup-card{max-width:900px!important}.setup-desktop-layout{grid-template-columns:130px 440px 130px!important;gap:14px!important}.setup-desktop-layout>.setup-board{width:440px!important;max-width:440px!important}.setup-side{width:130px!important;min-width:130px!important;padding:6px!important}.tray-piece .minoo-piece-svg{width:42px!important;height:49px!important}}
@media(max-width:760px){.setup-world{padding:7px!important}.setup-card{max-width:100%!important}.setup-desktop-layout{grid-template-columns:1fr 1fr!important;gap:8px!important}.setup-desktop-layout>.setup-board{grid-column:1/-1!important;grid-row:1!important;width:min(94vw,500px)!important;max-width:500px!important;margin:0 auto!important}.setup-desktop-layout>.setup-side.white{grid-column:1!important;grid-row:2!important}.setup-desktop-layout>.setup-side.black{grid-column:2!important;grid-row:2!important}.setup-side{width:100%!important;min-width:0!important}.side-pieces{grid-template-columns:repeat(3,minmax(0,1fr))!important}.tray-piece .minoo-piece-svg{width:38px!important;height:44px!important}}
</style>`);
document.head.insertAdjacentHTML('beforeend', `<style id="minoo248">@keyframes minooArrowFlow248{to{stroke-dashoffset:-36}}.setup-arrow-layer line{filter:drop-shadow(0 3px 4px rgba(94,75,190,.20));animation:minooArrowFlow248 .7s linear infinite}</style>`);

/* v2.5.1 — Satranç Taşlarını Dizelim: seçili taş kutusu vurgusu */
document.head.insertAdjacentHTML('beforeend', `<style id="minoo249-selected-piece">
.setup-piece.minoo-selected-piece,
.setup-piece.selected,
.setup-piece[aria-pressed="true"]{
  background:#dff5e5 !important;
  border-color:#65b77a !important;
  box-shadow:0 0 0 3px rgba(101,183,122,.20),0 5px 14px rgba(55,120,72,.14) !important;
  transform:translateY(-2px);
}
.setup-piece.minoo-selected-piece::after{
  content:"✓";
  position:absolute;
  top:5px;
  right:7px;
  width:22px;
  height:22px;
  border-radius:50%;
  display:grid;
  place-items:center;
  background:#58ad70;
  color:white;
  font-size:14px;
  font-weight:900;
  box-shadow:0 2px 5px rgba(0,0,0,.14);
}
.setup-piece{position:relative;transition:background .16s ease,border-color .16s ease,box-shadow .16s ease,transform .16s ease}
</style>`);

document.addEventListener('click',function(e){
  const p=e.target.closest('.setup-piece');
  if(!p) return;
  const scope=p.closest('.setup-tray,.piece-tray,.setup-side,.setup-game') || document;
  scope.querySelectorAll('.setup-piece.minoo-selected-piece').forEach(x=>{
    if(x!==p){x.classList.remove('minoo-selected-piece');x.removeAttribute('aria-pressed');}
  });
  p.classList.add('minoo-selected-piece');
  p.setAttribute('aria-pressed','true');
},true);

document.head.insertAdjacentHTML('beforeend', `<style id="minoo250-selection">
.tray-piece.selected{
 background:#b9d7ff !important;
 border:4px solid #1557b0 !important;
 box-shadow:0 0 0 5px rgba(21,87,176,.28),0 8px 22px rgba(14,54,120,.28) !important;
 transform:translateY(-2px) scale(1.025);
}
.tray-piece.selected::after{
 content:"✓";
 position:absolute;top:5px;right:6px;width:23px;height:23px;border-radius:50%;
 display:grid;place-items:center;background:#1557b0;color:#fff;font-weight:900;font-size:14px;
 box-shadow:0 2px 5px rgba(0,0,0,.15)
}
.tray-piece{position:relative}
</style>`);

document.head.insertAdjacentHTML('beforeend', `<style id="minoo250-bulk">
.setup-controls .learn-all{background:linear-gradient(135deg,#7668d8,#68b8ad);color:white;border:0;box-shadow:0 7px 18px rgba(92,92,180,.18)}
</style>`);
