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


document.head.insertAdjacentHTML('beforeend',`<style>
/* v2.5.3: beslenme takibi + serbest satranç yerleştirme */
.meal-btn{background:#fff7e8!important;color:#75501d!important;border:1px solid #edcf9a!important}
.meal-table{display:grid;gap:8px;margin-top:12px}.meal-row{display:grid;grid-template-columns:minmax(130px,1.4fr) repeat(3,minmax(105px,1fr));gap:8px;align-items:center;padding:9px;border-radius:14px;background:#faf9ff}.meal-row.head{font-weight:800;background:#f0edff}.meal-name{font-weight:800}.meal-select{width:100%;padding:9px 7px;border-radius:10px;border:1px solid #ddd;background:#fff}.meal-summary{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.meal-chip{padding:6px 10px;border-radius:999px;background:#f5f2ff;font-size:12px;font-weight:800}.meal-kid{background:#fffaf0;border:1px solid #f0d9ac;border-radius:18px;padding:15px;margin-bottom:16px}.meal-kid-grid{display:flex;gap:8px;flex-wrap:wrap}.meal-kid-grid span{background:#fff;padding:7px 10px;border-radius:999px;border:1px solid #f0dfbf;font-size:13px}.setup-square.check-wrong{box-shadow:inset 0 0 0 5px #e89b55!important}.setup-square.check-right{box-shadow:inset 0 0 0 5px #62b77a!important}
@media(max-width:720px){.meal-row{grid-template-columns:1fr}.meal-row.head{display:none}.meal-select{min-height:42px}}


</style>`);

const app=document.querySelector('#app');let teacherPass='',teacherToken='',teacherRole='',teacherName='',currentClass=null,studentSession=null;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
async function api(url,opt={}){opt.headers={...(opt.headers||{}),'Content-Type':'application/json'};if(teacherPass)opt.headers['X-Teacher-Password']=teacherPass;if(teacherToken)opt.headers['X-Teacher-Token']=teacherToken;if(studentSession)opt.headers['X-Student-Code']=studentSession.code;const r=await fetch(url,opt);let d={};try{d=await r.json()}catch{}if(!r.ok)throw Error(d.error||'İşlem başarısız');return d}
function notify(msg){let t=document.querySelector('#toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('show'),2600)}
function modal(html){closeModal();const d=document.createElement('div');d.id='modal';d.className='modal';d.innerHTML=`<div class="modal-card">${html}</div>`;d.onclick=e=>{if(e.target===d)closeModal()};document.body.appendChild(d)}
function closeModal(){document.querySelector('#modal')?.remove()}
const avatar=(s,size='')=>s.photo_data?`<img class="avatar ${size}" src="${s.photo_data}" alt="">`:`<div class="avatar placeholder ${size}">🌱</div>`;
function home(){teacherPass='';teacherToken='';teacherRole='';teacherName='';studentSession=null;currentClass=null;app.innerHTML=`<main class="center"><div class="logo">Minoo <span>v2.8.0</span></div><p class="tag">Oyna • Keşfet • Öğren</p><section class="card"><h2>Öğrenci girişi</h2><div class="login-grid"><input id="suser" placeholder="Kullanıcı adı" autocomplete="username"><input id="scode" type="password" placeholder="İlk giriş kodu / şifre" autocomplete="current-password" onkeydown="if(event.key==='Enter')studentLogin()"><button onclick="studentLogin()">Giriş yap</button></div></section><button class="link" onclick="staffLogin()">Öğretmen / Yönetici girişi</button><p class="safe">Reklamsız • Sohbetsiz • Öğretmen kontrollü</p></main>`}
function staffLogin(){app.innerHTML=`<main class="center teacher-login"><button class="back-link" onclick="home()">← Geri</button><div class="logo">Minoo <span>v2.8.0</span></div><p class="tag">Giriş türünü seçin</p><div class="m267-role-grid"><button onclick="adminLogin()"><span>👑</span><b>Yönetici Girişi</b><small>Öğretmenleri, sınıfları ve sistemi yönet</small></button><button onclick="teacherLogin()"><span>👩‍🏫</span><b>Öğretmen Girişi</b><small>Size verilen kullanıcı adı ve şifreyle giriş yapın</small></button></div></main>`}
function adminLogin(){app.innerHTML=`<main class="center teacher-login"><button class="back-link" onclick="staffLogin()">← Geri</button><div class="logo">Minoo <span>Yönetici</span></div><section class="card login-card"><h2>👑 Yönetici Girişi</h2><label>Yönetici şifresi</label><input id="ap" type="password" autocomplete="current-password" onkeydown="if(event.key==='Enter')doAdminLogin()"><button onclick="doAdminLogin()">Giriş yap</button></section></main>`}
async function doAdminLogin(){const p=document.querySelector('#ap').value;if(!p)return;try{teacherPass=p;const r=await api('/api/admin/login',{method:'POST',body:JSON.stringify({password:p})});teacherRole='admin';teacherName='Yönetici';dashboard()}catch(e){teacherPass='';notify(e.message)}}
function teacherLogin(){app.innerHTML=`<main class="center teacher-login"><button class="back-link" onclick="staffLogin()">← Geri</button><div class="logo">Minoo <span>Öğretmen</span></div><section class="card login-card"><h2>👩‍🏫 Öğretmen Girişi</h2><label>Kullanıcı adı</label><input id="tu" autocomplete="username"><label>Şifre</label><input id="tp" type="password" autocomplete="current-password" onkeydown="if(event.key==='Enter')doTeacherLogin()"><button onclick="doTeacherLogin()">Giriş yap</button></section></main>`}
async function doTeacherLogin(){const username=document.querySelector('#tu').value.trim(),password=document.querySelector('#tp').value;if(!username||!password)return notify('Kullanıcı adı ve şifre gerekli');try{const r=await fetch('/api/teacher/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})}).then(async x=>{const d=await x.json();if(!x.ok)throw Error(d.error);return d});teacherToken=r.token;teacherRole='teacher';teacherName=r.name;dashboard()}catch(e){teacherToken='';notify(e.message)}}
async function dashboard(){const cs=await api('/api/classes');app.innerHTML=`<header><div><b>Minoo Öğretmen</b><small>v2.8.0</small></div><button class="ghost" onclick="home()">Çıkış</button></header><main><div class="toolbar"><h1>Sınıflarım</h1><button onclick="addClass()">+ Sınıf</button></div><div class="grid">${cs.map(c=>`<article class="card"><h3>${esc(c.name)}</h3><p>${c.student_count} öğrenci</p><button onclick="openClass(${c.id})">Aç</button><div class="row"><button class="ghost" onclick="renameClass(${c.id},'${encodeURIComponent(c.name)}')">Adını değiştir</button><button class="danger ghost" onclick="deleteClass(${c.id},'${encodeURIComponent(c.name)}')">Sil</button></div></article>`).join('')}</div><hr><div class="toolbar"><h2>Oyun Kütüphanesi</h2><button onclick="gameForm()">+ Oyun ekle</button></div><div id="library"></div></main>`;loadLibrary()}
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
async function openClass(id){currentClass=id;const [cs,ss,as,gs]=await Promise.all([api('/api/classes'),api(`/api/classes/${id}/students`),api(`/api/classes/${id}/assignments`),api('/api/games')]);const c=cs.find(x=>Number(x.id)===Number(id));const grouped={};as.forEach(a=>(grouped[a.game_id]??={game_id:a.game_id,title:a.title,rows:[]}).rows.push(a));app.innerHTML=`<header><button class="ghost" onclick="dashboard()">← Sınıflar</button><b>${esc(c?.name||'Sınıf')}</b><button class="ghost" onclick="home()">Çıkış</button></header><main><div class="cols"><section><div class="toolbar"><h2>Öğrenciler</h2><div class="row"><button onclick="studentForm()">+ Öğrenci</button><button class="ghost" onclick="bulkStudents()">Toplu ekle</button><button class="meal-btn" onclick="mealTracking(${id})">🍽️ Beslenme</button></div></div>${ss.length?`<div class="bulk-bar"><label><input id="selectAllStudents" type="checkbox" onchange="selectAllStudents(this.checked)"> Tümünü seç</label><span id="selectedCount">0 öğrenci seçildi</span><button id="bulkDeleteBtn" class="danger ghost" onclick="deleteSelectedStudents()" disabled>Seçilenleri sil</button></div>`:''}${ss.map(s=>`<article class="student"><input class="student-select" type="checkbox" data-student-id="${s.id}" aria-label="${esc(s.name)} seç" onchange="updateStudentSelection()"><div class="student-main" onclick="profile(${s.id})">${avatar(s)}<div><b>${esc(s.name)}</b><small>👤 ${esc(s.username||'—')}</small><code>${esc(s.code)}</code><small>${s.completed_count||0}/${s.assigned_count||0} tamamlandı</small>${s.guardian_name?`<small>Veli: ${esc(s.guardian_name)}</small>`:''}</div></div><div class="row"><button class="ghost" onclick="studentForm(${s.id})">Düzenle</button><button class="ghost" onclick="parentNoteQuick(${s.id},'${encodeURIComponent(s.name)}')">💌 Veliye not</button><button class="ghost" onclick="assignGamesToStudent(${s.id},'${encodeURIComponent(s.name)}')">🎮 Oyun ata</button><button class="ghost" onclick="copyCode('${esc(s.code)}')">Kopyala</button><button class="ghost" onclick="regen(${s.id})">Kod yenile</button><button class="danger ghost" onclick="deleteStudent(${s.id},'${encodeURIComponent(s.name)}')">Sil</button></div></article>`).join('')||'<p>Öğrenci yok.</p>'}</section><section><h2>Oyun ata</h2><select id="gamePick"><option value="">Oyun seç</option>${gs.map(g=>`<option value="${g.id}">${esc(g.title)}</option>`).join('')}</select><button onclick="assignPicked()">Öğrencileri seç</button><p class="hint">Mevcut bir oyunu istediğin zaman bu sınıftaki öğrencilere ekleyip çıkarabilirsin.</p></section></div><section class="card wide"><h2>Tamamlanma takibi</h2>${Object.values(grouped).map(g=>{const done=g.rows.filter(x=>x.completed_at).length;return `<article class="assignment"><div class="toolbar"><div><h3>${esc(g.title)}</h3><b>${done}/${g.rows.length} öğrenci • %${g.rows.length?Math.round(done/g.rows.length*100):0}</b></div><button onclick="editAssignment(${g.game_id})">Atamayı düzenle</button></div><progress max="${g.rows.length}" value="${done}"></progress>${g.rows.map(x=>`<div class="status"><span>${esc(x.name)}</span><span>${x.completed_at?'✅ Tamamladı':'⏳ Yapmadı'}</span></div>`).join('')}</article>`}).join('')||'<p>Henüz atama yok.</p>'}</section></main>`}
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

function mealToday(){const d=new Date(),z=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`}
const MEAL_LABELS={breakfast:'Kahvaltı',lunch:'Öğle Yemeği',snack:'İkindi Öğünü'},MEAL_STATUS={ate:'Yedi',some:'Biraz Yedi',none:'Yemedi',absent:'Gelmedi'};
function mealSelect(sid,meal,value=''){return `<select class="meal-select" data-sid="${sid}" data-meal="${meal}"><option value="">— Seç —</option>${Object.entries(MEAL_STATUS).map(([k,v])=>`<option value="${k}" ${value===k?'selected':''}>${v}</option>`).join('')}</select>`}
async function mealTracking(cid,date=mealToday()){try{const d=await api(`/api/classes/${cid}/meals?date=${encodeURIComponent(date)}`),by={};d.records.forEach(r=>by[`${r.student_id}:${r.meal}`]=r.status);modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>🍽️ Beslenme Takibi</h2><p class="hint">Her çocuk için öğün durumunu seç. Kaydedilen bilgiler veli/öğrenci ekranında görünür.</p><label>Tarih</label><input id="mealDate" type="date" value="${esc(date)}" onchange="mealTracking(${cid},this.value)"><div class="meal-summary"><span class="meal-chip">🍽️ Yedi</span><span class="meal-chip">🥄 Biraz Yedi</span><span class="meal-chip">○ Yemedi</span><span class="meal-chip">🏠 Gelmedi</span></div><div class="meal-table"><div class="meal-row head"><span>Öğrenci</span><span>Kahvaltı</span><span>Öğle Yemeği</span><span>İkindi</span></div>${d.students.map(st=>`<div class="meal-row"><span class="meal-name">${esc(st.name)}</span>${mealSelect(st.id,'breakfast',by[`${st.id}:breakfast`]||'')}${mealSelect(st.id,'lunch',by[`${st.id}:lunch`]||'')}${mealSelect(st.id,'snack',by[`${st.id}:snack`]||'')}</div>`).join('')}</div><div class="modal-actions"><button class="ghost" onclick="closeModal()">Kapat</button><button onclick="saveMeals(${cid})">Kaydet</button></div>`)}catch(e){notify(e.message)}}
async function saveMeals(cid){const date=document.querySelector('#mealDate').value,records=[...document.querySelectorAll('.meal-select')].filter(x=>x.value).map(x=>({student_id:Number(x.dataset.sid),meal:x.dataset.meal,status:x.value}));try{await api(`/api/classes/${cid}/meals`,{method:'PUT',body:JSON.stringify({date,records})});notify('Beslenme bilgileri kaydedildi ✓');mealTracking(cid,date)}catch(e){notify(e.message)}}

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
async function studentDash(){const [gs,notes,meals]=await Promise.all([api(`/api/student/${studentSession.id}/games`),api(`/api/student/${studentSession.id}/parent-notes`),api(`/api/student/${studentSession.id}/meals?date=${mealToday()}`)]);app.innerHTML=`<header><div class="kid-head">${avatar(studentSession)}<div><b>Merhaba ${esc(studentSession.name)} 👋</b><small>${esc(studentSession.class_name)}</small></div></div><div class="account-row"><button class="ghost" onclick="changeStudentPassword()">🔐 Şifrem</button><button class="ghost" onclick="home()">Çıkış</button></div></header><main class="kid">${meals.length?`<section class="meal-kid"><h2>🍽️ Bugünkü Beslenmem</h2><div class="meal-kid-grid">${meals.map(m=>`<span><b>${MEAL_LABELS[m.meal]||m.meal}:</b> ${MEAL_STATUS[m.status]||m.status}</span>`).join('')}</div></section>`:''}${notes.length?`<section class="parent-notes-kid"><h2>💌 Öğretmeninden Not</h2>${notes.map(n=>`<article><small>${formatDate(n.created_at)}</small><p>${esc(n.note)}</p></article>`).join('')}</section>`:''}${gs.filter(g=>!g.completed_at).length?`<section class="new-task-panel"><h2>🆕 Yeni Görev</h2><div class="new-task-list">${gs.filter(g=>!g.completed_at).map(g=>`<button class="new-task-btn" onclick="playEncoded('${encodeURIComponent(JSON.stringify(g))}')"><span><b>${esc(g.title)}</b><br><small>Öğretmenin sana yeni bir oyun gönderdi.</small></span><span>Oyna →</span></button>`).join('')}</div></section>`:''}<h1>Oyunlarım</h1><p>Bugün keşfedecek harika oyunların var!</p><div class="grid">${gs.map(g=>`<article class="game ${g.completed_at?'done':''}"><h2>${esc(g.title)}</h2><p>${g.game_type==='matching'?'🧩 Minoo Eşleştirme':g.game_type==='chess_intro'?'♟️ Satranç Taşlarını Tanı':g.game_type==='chess_names'?'🔊 Satranç Taşlarının İsimleri':g.game_type==='chess_setup'?'♟️ Satranç Taşlarını Dizelim':g.game_type==='chess_color_match'?'♟️ Siyah-Beyaz Taş Eşleştirme':g.game_type==='chess_count'?'🔢 Satranç Taşları ve Sayıları':'🎨 Canva oyunu'}</p><p>${g.completed_at?'✅ Tamamladın':'🌱 Seni bekliyor'}</p><button onclick="playEncoded('${encodeURIComponent(JSON.stringify(g))}')">${g.completed_at?'Tekrar oyna':'Oyunu aç'}</button></article>`).join('')||'<div class="card"><h2>Şimdilik oyun yok 🌼</h2><p>Öğretmenin yeni oyun eklediğinde burada görünecek.</p></div>'}</div></main>`}
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

/* ===== Minoo v2.5.3 • Satranç Taşlarını Dizelim ===== */
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
 setupState={g,phase:'learn',placed:new Map(),pieces:setupPieces(),selected:null,audio:true,wrongPlacements:0,checks:0};
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
function setupStartPlay(){setupState.phase='play';setupState.placed.clear();setupState.selected=null;setupState.wrongPlacements=0;setupState.checks=0;document.querySelector('#setupMessage').textContent='Bir taşa dokun, sonra istediğin kareye yerleştir. Bitirince Kontrol Et.';renderSetup()}
function setupBoardPieceClick(id){if(setupState.phase!=='play')return;const entry=[...setupState.placed.entries()].find(([,p])=>p.id===id);if(!entry)return;setupState.placed.delete(entry[0]);setupState.selected=id;renderSetup()}
function setupSquareClick(key){if(setupState.phase==='play'&&setupState.selected)setupTryPlace(setupState.selected,key)}
function setupAllowedTargets(p){
 if(p.type==='pawn')return [...Array(8)].map((_,c)=>`${c},${p.side==='white'?6:1}`);
 if(p.type==='rook')return p.side==='white'?['0,7','7,7']:['0,0','7,0'];
 if(p.type==='knight')return p.side==='white'?['1,7','6,7']:['1,0','6,0'];
 if(p.type==='bishop')return p.side==='white'?['2,7','5,7']:['2,0','5,0'];
 return [p.target];
}
function setupTryPlace(id,key){const p=setupState.pieces.find(x=>x.id===id);if(!p||setupState.placed.has(key))return;setupState.placed.set(key,p);setupState.selected=null;if(!setupAllowedTargets(p).includes(key))setupState.wrongPlacements=(setupState.wrongPlacements||0)+1;setupPlaceSound();renderSetup();const m=document.querySelector('#setupMessage');if(m)m.textContent='Taşını yerleştirdin. Dizilimin bitince Kontrol Et.'}
function setupClearBoard(){setupState.placed.clear();setupState.selected=null;renderSetup();document.querySelector('#setupMessage').textContent=setupState.phase==='learn'?'Tahta temizlendi. Bir taşa dokunup yeniden öğrenebilirsin.':'Tahta temizlendi. Yeniden dizmeye başlayabilirsin.'}
function setupToggleAudio(){setupState.audio=setupState.audio===false;const e=document.querySelector('#setupAudio');if(e)e.textContent=setupState.audio?'Açık':'Kapalı';notify(setupState.audio?'Sesli anlatım açık':'Sesli anlatım kapalı')}
function setupHelp(){modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>♟️ Nasıl oynanır?</h2><p><b>Öğrenirken:</b> Bir taşa dokun. Ok doğru kareyi gösterir ve taş yerine gider.</p><p><b>Oynarken:</b> Sağ veya soldan taşı seç ve istediğin kareye yerleştir. Oyun yanlış kareyi engellemez.</p><p>32 taşı dizdikten sonra <b>Kontrol Et</b>'e bas. Doğru kareler yeşil, düzeltilmesi gerekenler turuncu görünür. Yanlış taşı tahtadan seçip yeniden yerleştirebilirsin.</p><div class="modal-actions"><button onclick="closeModal()">Anladım ✓</button></div>`)}
function setupCheck(){if(setupState.phase==='learn'){notify(setupState.placed.size===32?'Öğrenme tamamlandı ✓':'Önce 32 taşı birlikte yerleştirelim.');return}if(setupState.placed.size<32){notify(`${32-setupState.placed.size} taş daha yerleştirmen gerekiyor.`);return}setupState.checks=(setupState.checks||0)+1;let wrong=0;document.querySelectorAll('.setup-square').forEach(x=>x.classList.remove('check-wrong','check-right'));for(const [key,p] of setupState.placed){const ok=setupAllowedTargets(p).includes(key);const sq=document.querySelector(`.setup-square[data-key="${key}"]`);sq?.classList.add(ok?'check-right':'check-wrong');if(!ok)wrong++}if(!wrong){setTimeout(setupWin,450);return}const m=document.querySelector('#setupMessage');if(m)m.textContent=`${wrong} taşın yerini yeniden düşünelim. Turuncu kutudaki taşa dokunup başka bir kareye taşıyabilirsin.`;notify(`Çok güzel gidiyorsun! ${wrong} taşı yeniden deneyelim.`)}
function setupPlaceSound(){
 try{
  const A=window.AudioContext||window.webkitAudioContext;if(!A)return;
  const c=window.__minooPlaceAudio||(window.__minooPlaceAudio=new A());
  if(c.state==='suspended')c.resume();
  const t=c.currentTime,o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();
  o.type='sine';o.frequency.setValueAtTime(180,t);o.frequency.exponentialRampToValueAtTime(88,t+.07);
  f.type='lowpass';f.frequency.value=680;
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.42,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+.11);
  o.connect(f);f.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.12);
 }catch(e){}
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

/* ===== Minoo v2.5.3 • Satranç Taşlarının İsimleri ===== */
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

/* v2.5.3 — Satranç Taşlarını Dizelim: seçili taş kutusu vurgusu */
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
 background:#dff6e5 !important;
 border:3px solid #55ad70 !important;
 box-shadow:0 0 0 4px rgba(85,173,112,.18),0 8px 20px rgba(55,120,72,.16) !important;
 transform:translateY(-2px) scale(1.025);
}
.tray-piece.selected::after{
 content:"✓";
 position:absolute;top:5px;right:6px;width:23px;height:23px;border-radius:50%;
 display:grid;place-items:center;background:#55ad70;color:#fff;font-weight:900;font-size:14px;
 box-shadow:0 2px 5px rgba(0,0,0,.15)
}
.tray-piece{position:relative}
</style>`);

document.head.insertAdjacentHTML('beforeend', `<style id="minoo250-bulk">
.setup-controls .learn-all{background:linear-gradient(135deg,#7668d8,#68b8ad);color:white;border:0;box-shadow:0 7px 18px rgba(92,92,180,.18)}
</style>`);

document.head.insertAdjacentHTML('beforeend', `<style id="minoo252-polish">
.tray-piece.selected{
 background:#9fc8ff !important;border:4px solid #0b4fae !important;
 box-shadow:0 0 0 4px rgba(11,79,174,.30),0 8px 20px rgba(20,65,130,.24) !important;
 transform:translateY(-2px) scale(1.025);
}
.tray-piece.selected::after{
 content:"✓" !important;left:6px !important;right:auto !important;top:6px !important;
 width:24px !important;height:24px !important;border-radius:50% !important;
 display:grid !important;place-items:center !important;background:#0b4fae !important;
 color:#fff !important;border:2px solid #fff !important;font-weight:900 !important;
 font-size:14px !important;z-index:9 !important;
}
/* Satranç Tanı / İsimler: beyaz zeminde metin kaybolmasın */
.chess-card .tap-hint,.chess-card .piece-name,
.chess-name-card .tap-hint,.chess-name-card .piece-name,
.chess-intro-card .tap-hint,.chess-intro-card .piece-name,
.name-piece-card .tap-hint,.name-piece-card .piece-name{
 color:#26384d !important;border-color:#26384d !important;text-shadow:none !important;
}
.chess-card .tap-hint,.chess-name-card .tap-hint,.chess-intro-card .tap-hint,.name-piece-card .tap-hint{
 background:#fff !important;border:2px solid #26384d !important;font-weight:800 !important;
}
</style>`);


/* ===== Minoo v2.6.1 • Oyun Atölyesi + Matematik Beceri Haritası ===== */
const MINOO_SKILLS={
 matching:{title:'🧩 Eşleştirme',skills:['Aynı olanı eşleştirme','İlişkili nesneleri eşleştirme','Sayı-miktar eşleştirme','Parça-bütün eşleştirme']},
 classification:{title:'📦 Sınıflandırma',skills:['Renge göre gruplama','Şekle göre gruplama','Türe göre gruplama','Özelliğe göre gruplama']},
 comparison:{title:'⚖️ Karşılaştırma',skills:['Büyük-küçük','Uzun-kısa','Az-çok','Geniş-dar','Yüksek-alçak']},
 ordering:{title:'↕️ Sıralama',skills:['Küçükten büyüğe','Kısadan uzuna','Azdan çoğa','Sayı sırası','Olay sırası']},
 number:{title:'🔢 Sayı Kavramı',skills:['Rakam tanıma','Ritmik sayma','Sayı-miktar','Önce-sonra','Eksik sayı']},
 measure:{title:'📏 Ölçme',skills:['Uzunluk','Ağırlık','Hacim','Standart olmayan ölçme']},
 operation:{title:'➕ İşlem',skills:['Ekleme','Ayırma','Basit toplama','Basit çıkarma']},
 geometry:{title:'🔷 Geometri',skills:['Şekil tanıma','Şekil ayırt etme','Şekil özellikleri','Şekil oluşturma']},
 spatial:{title:'🧭 Uzaysal Algı',skills:['Üst-alt','İçinde-dışında','Ön-arka','Sağ-sol','Yakın-uzak']},
 pattern:{title:'🎨 Örüntü',skills:['AB örüntüsü','AAB örüntüsü','ABB örüntüsü','ABC örüntüsü','Eksik öğe']},
 graph:{title:'📊 Grafik',skills:['Veri sınıflandırma','Basit grafik oluşturma','Grafik okuma']},
 problem:{title:'🧠 Problem Çözme',skills:['İlişki kurma','Strateji seçme','Günlük yaşam problemi']}
};
function atelierHome(){modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>🎨 Minoo Oyun Atölyesi</h2><p class="hint">Pedagojik sıraya göre ilk dört oyun motorundan birini seç.</p><div class="atelier-path"><button onclick="atelierForm('atelier_matching')"><b>1. Eşleştirme</b><small>Benzerliği ve ilişkiyi fark et</small></button><button onclick="atelierForm('classification')"><b>2. Sınıflandırma</b><small>Ortak özelliğe göre grupla</small></button><button onclick="atelierForm('comparison')"><b>3. Karşılaştırma</b><small>İki nesnenin özelliğini karşılaştır</small></button><button onclick="atelierForm('ordering')"><b>4. Sıralama</b><small>Bir kurala göre sıraya koy</small></button></div><hr><h3>🗺️ Matematik Beceri Haritası</h3><div class="skill-map">${Object.values(MINOO_SKILLS).map(x=>`<span>${x.title}</span>`).join('')}</div>`)}
function atelierForm(type){const kind=type==='atelier_matching'?'matching':type;const info=MINOO_SKILLS[kind];const examples=type==='atelier_matching'?'Elma = 🍎\nKedi = 🐱\n3 = ●●●':type==='classification'?'Kırmızılar: 🍎,🍓,🌹\nSarılar: 🍋,🍌,🌽':type==='comparison'?'🐘 | 🐭 | büyük\n🌳 | 🌱 | uzun': 'küçükten büyüğe | 🍏,🍎,🍉\n1’den 4’e | 1,2,3,4';modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>${info.title} Oyunu Oluştur</h2><label>Oyun adı</label><input id="atTitle" placeholder="Örn. Meyveleri Keşfediyorum"><label>🎯 Bu oyun neyi destekliyor?</label><select id="atSkill">${info.skills.map(x=>`<option>${x}</option>`).join('')}</select><label>Yaş grubu</label><select id="atAge"><option>3-4 yaş</option><option selected>4-5 yaş</option><option>5-6 yaş</option></select><label>Sesli yönerge</label><input id="atInstruction" value="${type==='atelier_matching'?'Birbirine ait olanları eşleştir.':type==='classification'?'Nesneleri doğru gruba yerleştir.':type==='comparison'?'Soruyu dinle ve doğru olanı seç.':'Nesneleri doğru sıraya diz.'}"><label>İçerik</label><textarea id="atContent" rows="7" placeholder="${examples}"></textarea><p class="hint">Emoji, sayı ve kısa metin kullanabilirsin. Görsel yükleme kütüphanesini sonraki aşamada bu motora bağlayacağız.</p><label>⭐ Görev değeri</label><select id="atStars"><option value="1">⭐ 1 yıldız</option><option value="2">⭐⭐ 2 yıldız</option><option value="3" selected>⭐⭐⭐ 3 yıldız</option></select><div class="modal-actions"><button class="ghost" onclick="atelierHome()">← Geri</button><button onclick="saveAtelierGame('${type}')">Kaydet</button></div>`)}
function parseAtelier(type,text){const lines=text.split('\n').map(x=>x.trim()).filter(Boolean);if(type==='atelier_matching')return {items:lines.map(x=>{let i=x.indexOf('=');return i<0?null:[x.slice(0,i).trim(),x.slice(i+1).trim()]}).filter(Boolean)};if(type==='classification')return {groups:lines.map(x=>{let i=x.indexOf(':');return i<0?null:{name:x.slice(0,i).trim(),items:x.slice(i+1).split(',').map(y=>y.trim()).filter(Boolean)}}).filter(Boolean)};if(type==='comparison')return {questions:lines.map(x=>{let p=x.split('|').map(y=>y.trim());return p.length<3?null:{a:p[0],b:p[1],answer:p[2]}}).filter(Boolean)};return {orders:lines.map(x=>{let p=x.split('|');return p.length<2?null:{instruction:p[0].trim(),items:p[1].split(',').map(y=>y.trim()).filter(Boolean)}}).filter(Boolean)} }
async function saveAtelierGame(type){const title=document.querySelector('#atTitle').value.trim(),raw=document.querySelector('#atContent').value.trim();if(!title||!raw)return notify('Oyun adı ve içerik gerekli');const cfg=parseAtelier(type,raw);cfg.skill=document.querySelector('#atSkill').value;cfg.age=document.querySelector('#atAge').value;cfg.instruction=document.querySelector('#atInstruction').value.trim();cfg.star_value=Number(document.querySelector('#atStars').value);cfg.flow=['Öğren','Dene','Oyna','Kontrol Et','Düzelt','Tamamla'];try{await api('/api/games',{method:'POST',body:JSON.stringify({title,game_type:type,game_data:cfg})});closeModal();dashboard();notify('Oyun Atölyesine kaydedildi ✓')}catch(e){notify(e.message)}}
function atelierLabel(t){return t==='atelier_matching'?'🧩 Atölye Eşleştirme':t==='classification'?'📦 Atölye Sınıflandırma':t==='comparison'?'⚖️ Atölye Karşılaştırma':t==='ordering'?'↕️ Atölye Sıralama':null}
const _oldPlayGame=playGame;playGame=function(g){if(['atelier_matching','classification','comparison','ordering'].includes(g.game_type))return atelierPlay(g);return _oldPlayGame(g)};
function atelierPlay(g){let cfg={};try{cfg=JSON.parse(g.game_data||'{}')}catch{};const state={g,cfg,phase:'learn',started:Date.now(),firstScore:null,retries:0,answers:{}};window._atelierState=state;atelierRender()}
function atelierRender(){const s=window._atelierState,c=s.cfg,back=teacherPreviewMode?'previewBack()':'studentDash()';let body='';if(s.phase==='learn')body=`<div class="learn-card"><div class="learn-icon">${s.g.game_type==='atelier_matching'?'🧩':s.g.game_type==='classification'?'📦':s.g.game_type==='comparison'?'⚖️':'↕️'}</div><h2>${esc(c.skill||'Yeni beceri')}</h2><p>${esc(c.instruction||'Oyunu birlikte keşfedelim.')}</p><button onclick="minooSpeak('${String(c.instruction||'Hazırsan başlayalım').replace(/'/g,"\\'")}');">🔊 Dinle</button><button onclick="atelierSetPhase('practice')">Dene →</button></div>`;else if(s.phase==='practice')body=`<div class="learn-card"><h2>🌱 Birlikte deneyelim</h2><p>${esc(c.instruction||'')}</p><p class="hint">Bu bölüm alıştırmadır; performansına eklenmez.</p><button onclick="atelierSetPhase('play')">Hazırım • Oyuna Başla</button></div>`;else body=atelierBoard(s);app.innerHTML=`<header><button class="ghost" onclick="${back}">← Geri</button><b>${esc(s.g.title)}</b><span class="phase-pill">${s.phase==='learn'?'Öğren':s.phase==='practice'?'Dene':'Oyna'}</span></header><main class="atelier-game">${body}</main>`}
function atelierSetPhase(p){window._atelierState.phase=p;atelierRender()}
function atelierBoard(s){const t=s.g.game_type,c=s.cfg;if(t==='atelier_matching'){const items=c.items||[];return `<h2>🧩 Eşlerini bul</h2><p>${esc(c.instruction||'')}</p><div class="atelier-match">${items.map((x,i)=>`<div><button onclick="atelierPick('L',${i},this)">${esc(x[0])}</button><button onclick="atelierPick('R',${i},this)">${esc(x[1])}</button></div>`).join('')}</div><button onclick="atelierCheck()">Kontrol Et</button>`}if(t==='classification'){const gs=c.groups||[];const all=gs.flatMap((g,gi)=>g.items.map((x,ii)=>({x,gi,ii}))).sort(()=>Math.random()-.5);if(!s.pool)s.pool=all;return `<h2>📦 Doğru gruba yerleştir</h2><div class="class-pool">${s.pool.map((o,i)=>`<button class="class-item ${s.answers[i]!=null?'placed':''}" onclick="atelierClassPick(${i})">${esc(o.x)}</button>`).join('')}</div><div class="class-groups">${gs.map((g,gi)=>`<button onclick="atelierClassDrop(${gi})"><b>${esc(g.name)}</b><span>${Object.entries(s.answers).filter(([i,v])=>Number(v)===gi).map(([i])=>esc(s.pool[Number(i)].x)).join(' ')}</span></button>`).join('')}</div><button onclick="atelierCheck()">Kontrol Et</button>`}if(t==='comparison'){const qs=c.questions||[];return `<h2>⚖️ Hangisi?</h2>${qs.map((q,i)=>`<article class="compare-q"><b>${esc(q.answer)} olanı seç</b><div><button onclick="atelierAnswer(${i},0,this)">${esc(q.a)}</button><button onclick="atelierAnswer(${i},1,this)">${esc(q.b)}</button></div></article>`).join('')}<button onclick="atelierCheck()">Kontrol Et</button>`}const o=(c.orders||[])[0]||{instruction:'Sırala',items:[]};if(!s.order)s.order=[...o.items].sort(()=>Math.random()-.5);return `<h2>↕️ ${esc(o.instruction)}</h2><p class="hint">Bir öğeye dokun, sonra gitmesini istediğin yere dokun.</p><div class="order-row">${s.order.map((x,i)=>`<button class="${s.orderPick===i?'selected':''}" onclick="atelierOrderPick(${i})">${esc(x)}</button>`).join('')}</div><button onclick="atelierCheck()">Kontrol Et</button>`}
function atelierPick(side,i,el){const s=window._atelierState;s.pick=s.pick||{};s.pick[side]=i;document.querySelectorAll(`.atelier-match button[data-side='${side}']`).forEach(x=>x.classList.remove('selected'));el.classList.add('selected');if(s.pick.L!=null&&s.pick.R!=null){s.answers[s.pick.L]=s.pick.R;s.pick={};atelierRender()}}
function atelierClassPick(i){window._atelierState.classPick=i;atelierRender()}
function atelierClassDrop(gi){const s=window._atelierState;if(s.classPick==null)return notify('Önce bir nesne seç');s.answers[s.classPick]=gi;s.classPick=null;atelierRender()}
function atelierAnswer(i,v,el){window._atelierState.answers[i]=v;el.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));el.classList.add('selected')}
function atelierOrderPick(i){const s=window._atelierState;if(s.orderPick==null){s.orderPick=i;return atelierRender()}const a=s.orderPick,b=i;[s.order[a],s.order[b]]=[s.order[b],s.order[a]];s.orderPick=null;atelierRender()}
function atelierScore(s){if(s.g.game_type==='atelier_matching'){const n=(s.cfg.items||[]).length;return [Array.from({length:n},(_,i)=>s.answers[i]===i).filter(Boolean).length,n]}if(s.g.game_type==='classification'){const n=s.pool.length;return [s.pool.filter((o,i)=>Number(s.answers[i])===o.gi).length,n]}if(s.g.game_type==='comparison'){const qs=s.cfg.questions||[];return [qs.filter((q,i)=>{const picked=s.answers[i];const ans=(q.answer||'').toLowerCase();return (picked===0&&String(q.a).toLowerCase().includes(ans))||(picked===1&&String(q.b).toLowerCase().includes(ans))}).length,qs.length]}const target=(s.cfg.orders||[])[0]?.items||[];return [s.order.filter((x,i)=>x===target[i]).length,target.length]}
async function atelierCheck(){const s=window._atelierState,[score,total]=atelierScore(s);if(!total)return notify('Oyunda içerik bulunamadı');if(s.firstScore==null)s.firstScore=score;else s.retries++;if(score<total){modal(`<h2>Çok güzel gidiyorsun! 🌟</h2><p class="result-big"><b>${score}</b> / ${total} doğru</p><p>${total-score} tanesine yeniden bakalım.</p><div class="modal-actions"><button onclick="closeModal()">Oyuna Devam Et</button></div>`);return}const pct=Math.round((s.firstScore/total)*100),earned=pct>=100?3:pct>=75?2:pct>=50?1:0,cap=Number(s.cfg.star_value||3),stars=Math.min(cap,earned||1),duration=Math.round((Date.now()-s.started)/1000);if(!teacherPreviewMode&&s.g.assignment_id){try{await api(`/api/assignments/${s.g.assignment_id}/attempt`,{method:'POST',body:JSON.stringify({first_score:s.firstScore,total,retries:s.retries,duration_seconds:duration,stars,completed:true})});await api(`/api/assignments/${s.g.assignment_id}/complete`,{method:'POST'})}catch(e){notify(e.message)}}modal(`<h2>Aferin! 🎉</h2><p>Oyunu tamamladın.</p><p class="big-star">${'⭐'.repeat(stars)}</p><p class="hint">İlk deneme: %${pct} • ${s.retries} düzeltme</p><div class="modal-actions"><button class="ghost" onclick="closeModal();atelierPlay(window._atelierState.g)">Yeniden Oyna</button><button onclick="closeModal();${teacherPreviewMode?'previewBack()':'studentDash()'}">${teacherPreviewMode?'Kütüphaneye':'Ana Sayfaya'} Dön</button></div>`)}
async function studentPerformance(sid,name){try{const rows=await api(`/api/students/${sid}/performance`);modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>📈 ${esc(decodeURIComponent(name))} • Oyun Performansı</h2>${rows.length?rows.map(r=>{let d={};try{d=JSON.parse(r.game_data||'{}')}catch{};return `<article class="perf-card"><b>${esc(r.title)}</b><small>${esc(d.skill||atelierLabel(r.game_type)||'Dijital etkinlik')}</small><p>İlk deneme: <b>${r.total?Math.round(r.first_score/r.total*100):0}%</b> • Düzeltme: ${r.retries} • Süre: ${r.duration_seconds} sn</p><p>${'⭐'.repeat(r.stars||0)} ${r.completed?'• ✅ Tamamlandı':''}</p></article>`}).join(''):'<p>Henüz performans kaydı yok.</p>'}<p class="hint">Bu veriler dijital etkinlik performansıdır; gelişim düzeyi etiketi değildir.</p>`)}catch(e){notify(e.message)}}

/* Öğretmen ana ekranı: Atölye girişini ekle */
const _oldDashboard=dashboard;dashboard=async function(){await _oldDashboard();const tb=[...document.querySelectorAll('.toolbar')].find(x=>x.textContent.includes('Oyun Kütüphanesi'));if(tb&&!tb.querySelector('.atelier-open')){const b=document.createElement('button');b.className='atelier-open';b.textContent='🎨 Oyun Atölyesi';b.onclick=atelierHome;tb.appendChild(b)}document.querySelectorAll('article.card').forEach(card=>{const txt=card.querySelector('p');const title=card.querySelector('h3');if(!txt||!title)return;});};
/* Kütüphane etiketlerini atölye türleri için düzelt */
const _oldLoadLibrary=loadLibrary;loadLibrary=async function(){await _oldLoadLibrary();const gs=await api('/api/games');const el=document.querySelector('#library');if(!el||!gs.some(g=>atelierLabel(g.game_type)))return;el.innerHTML=`<div class="grid">${gs.map(g=>`<article class="card"><h3>${esc(g.title)}</h3><p>${atelierLabel(g.game_type)|| (g.game_type==='matching'?'🧩 Minoo Eşleştirme':g.game_type==='chess_intro'?'♟️ Satranç Taşlarını Tanı':g.game_type==='chess_names'?'🔊 Satranç Taşlarının İsimleri':g.game_type==='chess_setup'?'♟️ Satranç Taşlarını Dizelim':'🔗 Canva oyunu')}</p><p>${g.completed_count||0}/${g.assigned_count||0} tamamlandı</p><div class="row"><button class="ghost" onclick="teacherPreviewEncoded('${encodeURIComponent(JSON.stringify(g))}')">▶ Oyunu oyna</button><button class="danger ghost" onclick="deleteGame(${g.id},'${encodeURIComponent(g.title)}')">Sil</button></div></article>`).join('')}</div>`};
/* Öğrenci kartlarında atölye etiketi */
const _oldStudentDash=studentDash;studentDash=async function(){await _oldStudentDash();const cards=document.querySelectorAll('article.game');cards.forEach(card=>{const h=card.querySelector('h2');if(!h)return;});};

document.head.insertAdjacentHTML('beforeend',`<style id="minoo260">
.atelier-path{display:grid;grid-template-columns:1fr 1fr;gap:10px}.atelier-path button{text-align:left;padding:16px;border-radius:16px;background:#f6f3ff;color:#26384d;border:1px solid #ddd}.atelier-path b,.atelier-path small{display:block}.atelier-path small{margin-top:5px}.skill-map{display:flex;flex-wrap:wrap;gap:7px}.skill-map span,.phase-pill{background:#eef2ff;border-radius:999px;padding:7px 10px;font-weight:800;font-size:12px}.atelier-game{max-width:760px;margin:auto}.learn-card{text-align:center;background:#fff;border-radius:24px;padding:28px;box-shadow:0 10px 30px rgba(40,50,80,.08)}.learn-icon{font-size:64px}.atelier-match{display:grid;gap:9px}.atelier-match>div{display:grid;grid-template-columns:1fr 1fr;gap:12px}.atelier-match button,.class-item,.class-groups button,.compare-q button,.order-row button{min-height:64px;font-size:22px;border:2px solid #d9def0;background:#fff;border-radius:16px}.selected{outline:4px solid #5b8def!important;background:#dceaff!important}.class-pool,.order-row{display:flex;gap:9px;flex-wrap:wrap;justify-content:center;margin:18px 0}.class-item.placed{opacity:.35}.class-groups{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:16px 0}.class-groups button span{display:block;margin-top:10px;min-height:32px}.compare-q{background:#faf9ff;border-radius:18px;padding:14px;margin:10px 0}.compare-q div{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:9px}.result-big{font-size:28px}.perf-card{padding:12px;border:1px solid #e4e4ef;border-radius:14px;margin:8px 0}.perf-card small{display:block;margin-top:4px;color:#667}
@media(max-width:650px){.atelier-path{grid-template-columns:1fr}.atelier-match>div,.class-groups,.compare-q div{grid-template-columns:1fr 1fr}}
</style>`);

/* ===== Minoo v2.6.1 • Satranç eşleştirme + taş sayıları ===== */
const CHESS_COUNT_SET=[
 {name:'Şah',symbol:'♚',count:1,object:'🍎'},
 {name:'Vezir',symbol:'♛',count:1,object:'⭐'},
 {name:'Kale',symbol:'♜',count:2,object:'🍀'},
 {name:'Fil',symbol:'●',count:2,object:'🌸'},
 {name:'At',symbol:'♞',count:2,object:'🐞'},
 {name:'Piyon',symbol:'♟',count:8,object:'❤️'}
];
function v261ChessVisual(x,white=false){const p=CHESS_PIECES.find(p=>p.name===x.name)||x;return `<span class="v261-piece ${white?'white':'black'}">${chessPieceVisual(p)}</span>`}
function v261Shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function v261Back(){return teacherPreviewMode?'previewBack()':'studentDash()'}
function chessColorMatchGame(g){window._v261={g,kind:'color',answers:{},first:null,retries:0,started:Date.now(),checked:false};v261ColorRender()}
function v261ColorRender(){const s=window._v261,left=CHESS_COUNT_SET,right=v261Shuffle(CHESS_COUNT_SET);s.right=right;app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="v261Back()">⌂</button><b>♟️ ${esc(s.g.title||'Siyah ve Beyaz Taşları Eşleştir')}</b><button class="ghost" onclick="minooSpeak('Siyah ve beyaz aynı satranç taşlarını eşleştir. Sonra kontrol et düğmesine dokun.')">🔊</button></header><main class="v261-world"><div class="v261-instruction">Siyah ve beyaz aynı taşları eşleştirelim.</div><div class="v261-columns"><div>${left.map((x,i)=>`<button class="v261-card" data-l="${i}" onclick="v261PickColor('L',${i},this)">${v261ChessVisual(x)}</button>`).join('')}</div><div>${right.map((x,i)=>`<button class="v261-card" data-r="${i}" onclick="v261PickColor('R',${i},this)">${v261ChessVisual(x,true)}</button>`).join('')}</div></div><div class="v261-actions"><button class="retry" onclick="chessColorMatchGame(window._v261.g)">↻ Yeniden Dene</button><button onclick="v261CheckColor()">✓ Kontrol Et</button></div></main>`}
function v261PickColor(side,i,el){const s=window._v261;if(s.checked)return;s.pick=s.pick||{};s.pick[side]=i;document.querySelectorAll(`[data-${side.toLowerCase()}]`).forEach(x=>x.classList.remove('picked'));el.classList.add('picked');if(s.pick.L!=null&&s.pick.R!=null){s.answers[s.pick.L]=s.pick.R;s.pick={};document.querySelectorAll('.v261-card').forEach(x=>x.classList.remove('picked'));v261DrawLines()}}
function v261DrawLines(){document.querySelectorAll('.v261-card').forEach(x=>x.classList.remove('paired'));Object.entries(window._v261.answers).forEach(([l,r])=>{document.querySelector(`[data-l="${l}"]`)?.classList.add('paired');document.querySelector(`[data-r="${r}"]`)?.classList.add('paired')})}
async function v261CheckColor(){const s=window._v261;let correct=0;document.querySelectorAll('.v261-card').forEach(x=>x.classList.remove('wrong'));CHESS_COUNT_SET.forEach((x,i)=>{const r=s.answers[i],ok=r!=null&&s.right[r]?.name===x.name;if(ok)correct++;else{document.querySelector(`[data-l="${i}"]`)?.classList.add('wrong');if(r!=null)document.querySelector(`[data-r="${r}"]`)?.classList.add('wrong')}});if(s.first==null)s.first=correct;else s.retries++;if(correct<6){s.checked=true;modal(`<h2>Birlikte düzeltelim 🌱</h2><p>Yanlış eşleşmeler neon kırmızı ile işaretlendi.</p><div class="modal-actions"><button onclick="closeModal();v261RetryColor()">↻ Yeniden Dene</button></div>`);return}await v261Finish(s,6)}
function v261RetryColor(){const s=window._v261;s.checked=false;document.querySelectorAll('.v261-card').forEach(x=>x.classList.remove('wrong'));Object.entries(s.answers).forEach(([l,r])=>{if(s.right[r]?.name!==CHESS_COUNT_SET[l]?.name)delete s.answers[l]});v261DrawLines()}
function chessCountGame(g){window._v261={g,kind:'count',stage:1,slide:0,answers:{},first:null,retries:0,started:Date.now()};v261CountRender()}
function v261CountRender(){const s=window._v261;if(s.stage===1)return v261CountLearn();return v261CountMatch()}
function v261CountLearn(){const s=window._v261,x=CHESS_COUNT_SET[s.slide];app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="v261Back()">⌂</button><b>♟️ ${esc(s.g.title||'Satranç Taşları ve Sayıları')}</b><span>1. Aşama</span></header><main class="v261-world"><div class="v261-instruction">Satranç taşlarının kaç adet olduğunu öğrenelim.</div><section class="v261-learn"><div>${v261ChessVisual(x)}<b>${x.name}</b></div><span class="v261-arrow">→</span><div><strong>${x.count}</strong><div class="v261-objects">${x.object.repeat(x.count)}</div></div></section><div class="v261-dots">${CHESS_COUNT_SET.map((_,i)=>`<i class="${i===s.slide?'on':''}"></i>`).join('')}</div><div class="v261-actions"><button class="retry" onclick="v261LearnPrev()">← Geri</button><button onclick="v261LearnNext()">İleri →</button></div></main>`;minooSpeak(`${x.name}. Satrançta ${x.count} tane ${x.name} vardır.`)}
function v261LearnPrev(){const s=window._v261;if(s.slide>0){s.slide--;v261CountLearn()}else v261Back()}
function v261LearnNext(){const s=window._v261;if(s.slide<CHESS_COUNT_SET.length-1){s.slide++;v261CountLearn()}else{s.stage=2;s.answers={};v261CountMatch()}}
function v261CountMatch(){const s=window._v261,final=s.stage===3;if(!s.right||s.rightStage!==s.stage){s.right=v261Shuffle(CHESS_COUNT_SET);s.rightStage=s.stage}s.answers=s.answers||{};const instruction='Satranç taşlarının kaç tane olduğunu biliyor musun? Hadi etkinliğimizi yapalım, taşları doğru sayıdaki nesnelerle eşleştirelim.';app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="v261Back()">⌂</button><b>♟️ ${esc(s.g.title||'Satranç Taşları ve Sayıları')}</b><span>${s.stage}. Aşama</span><button class="ghost" onclick="minooSpeak('${instruction}')">🔊</button></header><main class="v261-world"><div class="v261-instruction">${instruction}</div><div class="v261-columns count"><div>${CHESS_COUNT_SET.map((x,i)=>`<button class="v261-card count-card" data-l="${i}" onclick="v261PickCount('L',${i},this)"><span class="mini-set">${final?v261ChessVisual(x):Array(x.count).fill(0).map(()=>v261ChessVisual(x)).join('')}</span>${final?'':`<strong>${x.count}</strong>`}</button>`).join('')}</div><div>${s.right.map((x,i)=>`<button class="v261-card object-card" data-r="${i}" onclick="v261PickCount('R',${i},this)"><span>${x.object.repeat(x.count)}</span></button>`).join('')}</div></div><div class="v261-actions"><button class="retry" onclick="v261ResetCount()">↻ Yeniden Dene</button><button onclick="v261CheckCount()">✓ Kontrol Et</button></div></main>`}
function v261PickCount(side,i,el){const s=window._v261;s.pick=s.pick||{};s.pick[side]=i;document.querySelectorAll(`[data-${side.toLowerCase()}]`).forEach(x=>x.classList.remove('picked'));el.classList.add('picked');if(s.pick.L!=null&&s.pick.R!=null){s.answers[s.pick.L]=s.pick.R;s.pick={};document.querySelectorAll('.v261-card').forEach(x=>x.classList.remove('picked','wrong'));v261DrawLines()}}
function v261ResetCount(){const s=window._v261;s.answers={};s.right=v261Shuffle(CHESS_COUNT_SET);v261CountMatch()}
async function v261CheckCount(){const s=window._v261;let correct=0;document.querySelectorAll('.v261-card').forEach(x=>x.classList.remove('wrong'));CHESS_COUNT_SET.forEach((x,i)=>{const r=s.answers[i],ok=r!=null&&s.right[r]?.count===x.count;if(ok)correct++;else{document.querySelector(`[data-l="${i}"]`)?.classList.add('wrong');if(r!=null)document.querySelector(`[data-r="${r}"]`)?.classList.add('wrong')}});if(s.stage===2){if(correct<6){modal(`<h2>Çok güzel gidiyorsun! 🌟</h2><p>Neon kırmızı işaretli olanlara yeniden bakalım.</p><div class="modal-actions"><button onclick="closeModal()">↻ Yeniden Dene</button></div>`);return}s.stage=3;s.answers={};s.right=null;modal(`<h2>Harika! 🎉</h2><p>Şimdi son aşamada rakamlar yok. Sayıları sen bulacaksın.</p><div class="modal-actions"><button onclick="closeModal();v261CountRender()">3. Aşamaya Geç →</button></div>`);return}if(s.first==null)s.first=correct;else s.retries++;if(correct<6){modal(`<h2>Bir daha deneyelim 🌱</h2><p>Yanlış eşleşmeler neon kırmızı ve × işaretiyle gösterildi.</p><div class="modal-actions"><button onclick="closeModal()">↻ Yeniden Dene</button></div>`);return}await v261Finish(s,6)}
async function v261Finish(s,total){const first=s.first==null?total:s.first,pct=Math.round(first/total*100),stars=pct===100?3:pct>=75?2:pct>=50?1:0,duration=Math.round((Date.now()-s.started)/1000);if(!teacherPreviewMode&&s.g.assignment_id){try{await api(`/api/assignments/${s.g.assignment_id}/attempt`,{method:'POST',body:JSON.stringify({first_score:first,total,retries:s.retries,duration_seconds:duration,stars,completed:true})});await api(`/api/assignments/${s.g.assignment_id}/complete`,{method:'POST'})}catch(e){notify(e.message)}}modal(`<h2>Aferin! 🎉</h2><p>Etkinliği tamamladın.</p><p class="big-star">${'⭐'.repeat(Math.max(1,stars))}</p><div class="modal-actions"><button class="ghost" onclick="closeModal();playGame(window._v261.g)">Yeniden Oyna</button><button onclick="closeModal();v261Back()">Ana Sayfaya Dön</button></div>`)}
const _playGame260=playGame;playGame=function(g){if(g.game_type==='chess_color_match')return chessColorMatchGame(g);if(g.game_type==='chess_count')return chessCountGame(g);return _playGame260(g)};

/* v2.6.1 etiketleri ve sürüm */
function v261Label(t){return t==='chess_color_match'?'♟️ Siyah-Beyaz Taş Eşleştirme':t==='chess_count'?'🔢 Satranç Taşları ve Sayıları':''}
const _loadLibrary261=loadLibrary;loadLibrary=async function(){await _loadLibrary261();const gs=await api('/api/games'),el=document.querySelector('#library');if(!el)return;el.innerHTML=`<div class="grid">${gs.map(g=>`<article class="card"><h3>${esc(g.title)}</h3><p>${v261Label(g.game_type)||atelierLabel(g.game_type)||(g.game_type==='matching'?'🧩 Minoo Eşleştirme':g.game_type==='chess_intro'?'♟️ Satranç Taşlarını Tanı':g.game_type==='chess_names'?'🔊 Satranç Taşlarının İsimleri':g.game_type==='chess_setup'?'♟️ Satranç Taşlarını Dizelim':'🔗 Canva oyunu')}</p><p>${g.completed_count||0}/${g.assigned_count||0} tamamlandı</p><div class="row"><button class="ghost" onclick="teacherPreviewEncoded('${encodeURIComponent(JSON.stringify(g))}')">▶ Oyunu oyna</button><button class="danger ghost" onclick="deleteGame(${g.id},'${encodeURIComponent(g.title)}')">Sil</button></div></article>`).join('')}</div>`};
const _studentDash261=studentDash;studentDash=async function(){await _studentDash261();document.querySelectorAll('article.game').forEach(card=>{const h=card.querySelector('h2'),p=card.querySelector('p');if(!h||!p)return;});};
setTimeout(()=>{document.querySelectorAll('.logo span,header small').forEach(x=>{if(x.textContent.includes('v2.6.1'))x.textContent=x.textContent.replace('v2.6.1','v2.6.1')})},0);

document.head.insertAdjacentHTML('beforeend',`<style id="minoo261">
.v261-world{max-width:760px;margin:auto;padding:18px;background:#fffaf1;min-height:calc(100vh - 80px);background-image:radial-gradient(circle at 8% 85%,rgba(96,110,150,.05),transparent 22%),radial-gradient(circle at 92% 88%,rgba(246,190,110,.08),transparent 24%)}.v261-instruction{margin:0 auto 18px;max-width:650px;padding:14px 20px;border-radius:24px;background:#dff2ff;text-align:center;font-weight:900;color:#24456a}.v261-columns{display:grid;grid-template-columns:1fr 1fr;gap:32px;max-width:600px;margin:auto}.v261-columns>div{display:grid;gap:10px}.v261-card{position:relative;min-height:86px;border:3px solid #ffc58d;border-radius:18px;background:#fff;box-shadow:0 7px 14px rgba(67,56,45,.10);display:flex;align-items:center;justify-content:center;gap:10px;padding:8px;transition:.18s}.v261-card:nth-child(even){border-color:#b9dfff}.v261-card.picked{outline:5px solid #4e9cff;transform:scale(1.03)}.v261-card.paired{box-shadow:0 0 0 3px rgba(103,201,140,.2),0 7px 14px rgba(67,56,45,.10)}.v261-card.wrong{border-color:#ff1744!important;box-shadow:0 0 8px #ff1744,0 0 18px rgba(255,23,68,.75)!important}.v261-card.wrong:after{content:'×';position:absolute;right:-9px;top:-15px;color:#ff1744;font-size:42px;font-weight:1000;text-shadow:0 0 8px #ff1744}.v261-piece{display:inline-flex;align-items:center;justify-content:center;width:58px;height:66px;font-size:58px;line-height:1;color:#111}.v261-piece.white{color:#fff;text-shadow:-1px -1px 0 #777,1px -1px 0 #777,-1px 1px 0 #777,1px 1px 0 #777,0 4px 8px rgba(0,0,0,.18)}.v261-piece .bishop-svg{height:60px}.v261-piece .chess-glyph{font-size:58px}.v261-actions{display:flex;justify-content:space-between;gap:15px;margin:22px auto 0;max-width:620px}.v261-actions button{min-height:58px;border-radius:999px;padding:12px 24px;font-size:18px;font-weight:900;background:#62be4c}.v261-actions .retry{background:#f35d7d}.v261-learn{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;max-width:600px;margin:35px auto}.v261-learn>div{min-height:220px;border:2px solid #f1dcc6;border-radius:26px;background:#fff;box-shadow:0 10px 24px rgba(60,50,40,.1);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}.v261-learn .v261-piece{width:120px;height:130px}.v261-learn .v261-piece .chess-glyph{font-size:120px}.v261-learn strong{font-size:64px}.v261-objects{font-size:35px;max-width:230px;text-align:center;letter-spacing:4px}.v261-arrow{font-size:48px;color:#ff8a65}.v261-dots{display:flex;justify-content:center;gap:8px}.v261-dots i{width:13px;height:13px;border-radius:50%;background:#ddd}.v261-dots i.on{background:#ff6685}.count-card{justify-content:space-between}.count-card strong{font-size:26px;background:#fff0c7;border-radius:50%;width:45px;height:45px;display:grid;place-items:center}.mini-set{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:1px;max-width:190px}.mini-set .v261-piece{width:28px;height:34px}.mini-set .v261-piece .chess-glyph{font-size:31px}.mini-set .bishop-svg{height:31px}.object-card span{font-size:28px;letter-spacing:4px;line-height:1.45}.chess-header span{white-space:nowrap}
@media(max-width:600px){.v261-world{padding:12px}.v261-columns{gap:14px}.v261-card{min-height:72px}.v261-piece{width:45px;height:54px}.v261-piece .chess-glyph{font-size:48px}.v261-learn{gap:8px}.v261-learn>div{min-height:180px}.v261-arrow{font-size:32px}.v261-actions button{padding:10px 16px;font-size:15px}.object-card span{font-size:22px}.mini-set{max-width:125px}.mini-set .v261-piece{width:20px;height:28px}.mini-set .v261-piece .chess-glyph{font-size:25px}}
</style>`);

/* ===== v2.6.1 final • Okul öncesi Oyun Atölyesi görsel/işitsel düzeltmeleri ===== */
function atelierForm(type){const kind=type==='atelier_matching'?'matching':type,info=MINOO_SKILLS[kind];const examples=type==='atelier_matching'?'🍎 = 🍎\n🐱 = 🐱\n3 = ●●●':type==='classification'?'Kırmızılar: 🍎,🍓,🌹\nSarılar: 🍋,🍌,🌽':type==='comparison'?'🐘 | 🐭 | büyük\n🌳 | 🌱 | uzun':'küçükten büyüğe | 🍒,🍎,🍉\n1’den 4’e | 1,2,3,4';modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>${info.title} Oyunu Oluştur</h2><label>Oyun adı</label><input id="atTitle" placeholder="Örn. Meyveleri Eşleştir"><label>🎯 Bu oyun neyi destekliyor?</label><select id="atSkill">${info.skills.map(x=>`<option>${x}</option>`).join('')}</select><label>Yaş grubu</label><select id="atAge"><option>3-4 yaş</option><option selected>4-5 yaş</option><option>5-6 yaş</option></select><label>🔊 Sesli yönerge</label><input id="atInstruction" value="${type==='atelier_matching'?'Birbirine ait olan resimleri eşleştir.':type==='classification'?'Nesneleri doğru gruba yerleştir.':type==='comparison'?'Soruyu dinle ve doğru resmi seç.':'Nesneleri doğru sıraya diz.'}"><p class="hint">Çocuk bu metni okumak zorunda değildir. Minoo yönergeyi sesli okur.</p><label>Görsel içerik</label><textarea id="atContent" rows="7" placeholder="${examples}"></textarea><p class="hint">Okul öncesi için mümkün olduğunca emoji, nesne, şekil, rakam ve miktar kullan. Kelimeler öğretmen içindir; çocuk ekranı görsel ve ses ağırlıklıdır.</p><label>⭐ Görev değeri</label><select id="atStars"><option value="1">⭐ 1 yıldız</option><option value="2">⭐⭐ 2 yıldız</option><option value="3" selected>⭐⭐⭐ 3 yıldız</option></select><div class="modal-actions"><button class="ghost" onclick="atelierHome()">← Geri</button><button onclick="saveAtelierGame('${type}')">Kaydet</button></div>`)}
function atelierPlay(g){let cfg={};try{cfg=JSON.parse(g.game_data||'{}')}catch{};const state={g,cfg,phase:'learn',started:Date.now(),firstScore:null,retries:0,answers:{},wrong:[]};if(g.game_type==='atelier_matching'){const n=(cfg.items||[]).length;state.rightOrder=Array.from({length:n},(_,i)=>i).sort(()=>Math.random()-.5)}window._atelierState=state;atelierRender()}
function atelierRender(){const s=window._atelierState,c=s.cfg,back=teacherPreviewMode?'previewBack()':'studentDash()',say=String(c.instruction||'Hazırsan başlayalım').replace(/'/g,"\\'");let body='';if(s.phase==='learn')body=`<section class="preschool-stage"><div class="learn-icon">${s.g.game_type==='atelier_matching'?'🧩':s.g.game_type==='classification'?'📦':s.g.game_type==='comparison'?'⚖️':'↕️'}</div><button class="big-speaker" onclick="minooSpeak('${say}')">🔊</button><p class="teacher-caption">${esc(c.instruction||'Oyunu birlikte keşfedelim.')}</p><button class="kid-next" onclick="atelierSetPhase('practice')">▶</button></section>`;else if(s.phase==='practice'){let sample='🌟';if(s.g.game_type==='atelier_matching'&&(c.items||[])[0])sample=`<div class="practice-pair"><span>${esc(c.items[0][0])}</span><b>↔</b><span>${esc(c.items[0][1])}</span></div>`;body=`<section class="preschool-stage"><h2>🌱 Dene</h2>${sample}<button class="big-speaker" onclick="minooSpeak('${say}')">🔊</button><button class="kid-next" onclick="atelierSetPhase('play')">▶ Oyna</button></section>`}else body=atelierBoard(s);app.innerHTML=`<header><button class="ghost" onclick="${back}">⌂</button><b>${esc(s.g.title)}</b><button class="ghost" onclick="minooSpeak('${say}')">🔊</button></header><main class="atelier-game preschool-game">${body}</main>`;if(s.phase!=='play')setTimeout(()=>minooSpeak(c.instruction||'Hazırsan başlayalım'),180)}
function atelierBoard(s){const t=s.g.game_type,c=s.cfg,voice=`<button class="floating-sound" onclick="minooSpeak('${String(c.instruction||'').replace(/'/g,"\\'")}')">🔊</button>`;if(t==='atelier_matching'){const items=c.items||[],order=s.rightOrder||items.map((_,i)=>i);return `${voice}<div class="kid-instruction">${esc(c.instruction||'Eşlerini bul.')}</div><div class="picture-match"><div class="picture-col">${items.map((x,i)=>`<button data-side="L" data-i="${i}" class="picture-card ${s.answers[i]!=null?'paired':''} ${s.wrong.includes(i)?'wrong':''}" onclick="atelierPick('L',${i},this)"><span>${esc(x[0])}</span></button>`).join('')}</div><div class="picture-col">${order.map((orig,ri)=>`<button data-side="R" data-i="${ri}" class="picture-card ${Object.values(s.answers).includes(ri)?'paired':''} ${s.wrong.some(li=>s.answers[li]===ri)?'wrong':''}" onclick="atelierPick('R',${ri},this)"><span>${esc(items[orig]?.[1]||'')}</span></button>`).join('')}</div></div><button class="kid-check" onclick="atelierCheck()">✓ Kontrol Et</button>`}if(t==='classification'){const gs=c.groups||[];if(!s.pool)s.pool=gs.flatMap((g,gi)=>g.items.map(x=>({x,gi}))).sort(()=>Math.random()-.5);return `${voice}<div class="kid-instruction">${esc(c.instruction||'Doğru gruba yerleştir.')}</div><div class="class-pool">${s.pool.map((o,i)=>`<button class="visual-tile ${s.answers[i]!=null?'placed':''}" onclick="atelierClassPick(${i})">${esc(o.x)}</button>`).join('')}</div><div class="class-groups">${gs.map((g,gi)=>`<button onclick="atelierClassDrop(${gi})"><b>${esc(g.name)}</b><span>${Object.entries(s.answers).filter(([i,v])=>Number(v)===gi).map(([i])=>esc(s.pool[Number(i)].x)).join(' ')}</span></button>`).join('')}</div><button class="kid-check" onclick="atelierCheck()">✓ Kontrol Et</button>`}if(t==='comparison'){const qs=c.questions||[];return `${voice}<div class="kid-instruction">${esc(c.instruction||'Doğru olanı seç.')}</div>${qs.map((q,i)=>`<article class="compare-q"><button class="big-speaker mini" onclick="minooSpeak('${String(q.answer).replace(/'/g,"\\'")} olanı seç')">🔊</button><div><button onclick="atelierAnswer(${i},0,this)">${esc(q.a)}</button><button onclick="atelierAnswer(${i},1,this)">${esc(q.b)}</button></div></article>`).join('')}<button class="kid-check" onclick="atelierCheck()">✓ Kontrol Et</button>`}const o=(c.orders||[])[0]||{instruction:'Sırala',items:[]};if(!s.order)s.order=[...o.items].sort(()=>Math.random()-.5);return `${voice}<div class="kid-instruction">${esc(c.instruction||o.instruction||'Sırala.')}</div><div class="order-row">${s.order.map((x,i)=>`<button class="visual-tile ${s.orderPick===i?'selected':''}" onclick="atelierOrderPick(${i})">${esc(x)}</button>`).join('')}</div><button class="kid-check" onclick="atelierCheck()">✓ Kontrol Et</button>`}
function atelierPick(side,i,el){const s=window._atelierState;s.wrong=[];s.pick=s.pick||{};s.pick[side]=i;document.querySelectorAll(`[data-side="${side}"]`).forEach(x=>x.classList.remove('selected'));el.classList.add('selected');if(s.pick.L!=null&&s.pick.R!=null){s.answers[s.pick.L]=s.pick.R;s.pick={};atelierRender()}}
function atelierScore(s){if(s.g.game_type==='atelier_matching'){const items=s.cfg.items||[],order=s.rightOrder||[];return [items.filter((_,li)=>s.answers[li]!=null&&order[s.answers[li]]===li).length,items.length]}if(s.g.game_type==='classification'){const n=s.pool.length;return [s.pool.filter((o,i)=>Number(s.answers[i])===o.gi).length,n]}if(s.g.game_type==='comparison'){const qs=s.cfg.questions||[];return [qs.filter((q,i)=>{const picked=s.answers[i],ans=(q.answer||'').toLowerCase();return (picked===0&&String(q.a).toLowerCase().includes(ans))||(picked===1&&String(q.b).toLowerCase().includes(ans))}).length,qs.length]}const target=(s.cfg.orders||[])[0]?.items||[];return [s.order.filter((x,i)=>x===target[i]).length,target.length]}
async function atelierCheck(){const s=window._atelierState,[score,total]=atelierScore(s);if(!total)return notify('Oyunda içerik bulunamadı');if(s.firstScore==null)s.firstScore=score;else s.retries++;if(score<total){if(s.g.game_type==='atelier_matching'){const order=s.rightOrder||[];s.wrong=Array.from({length:total},(_,i)=>i).filter(i=>s.answers[i]==null||order[s.answers[i]]!==i);atelierRender()}modal(`<h2>Harika gidiyorsun! 🌟</h2><p class="result-big"><b>${score}</b> / ${total} doğru</p><p>Neon kırmızı işaretli olanlara yeniden bakalım.</p><div class="modal-actions"><button onclick="closeModal()">↻ Yeniden Dene</button></div>`);return}const pct=Math.round((s.firstScore/total)*100),earned=pct>=100?3:pct>=75?2:pct>=50?1:0,cap=Number(s.cfg.star_value||3),stars=Math.min(cap,earned||1),duration=Math.round((Date.now()-s.started)/1000);if(!teacherPreviewMode&&s.g.assignment_id){try{await api(`/api/assignments/${s.g.assignment_id}/attempt`,{method:'POST',body:JSON.stringify({first_score:s.firstScore,total,retries:s.retries,duration_seconds:duration,stars,completed:true})});await api(`/api/assignments/${s.g.assignment_id}/complete`,{method:'POST'})}catch(e){notify(e.message)}}modal(`<h2>Aferin! 🎉</h2><p>Oyunu tamamladın.</p><p class="big-star">${'⭐'.repeat(stars)}</p><div class="modal-actions"><button class="ghost" onclick="closeModal();atelierPlay(window._atelierState.g)">↻ Yeniden Oyna</button><button onclick="closeModal();${teacherPreviewMode?'previewBack()':'studentDash()'}">⌂ Ana Sayfa</button></div>`)}

document.head.insertAdjacentHTML('beforeend',`<style id="minoo261-atelier-preschool">
.preschool-game{max-width:760px;padding:16px}.preschool-stage{text-align:center;max-width:620px;margin:18px auto;padding:28px;border-radius:28px;background:#fffaf3;box-shadow:0 12px 28px rgba(54,63,82,.12)}.teacher-caption,.kid-instruction{background:#dff2ff;border-radius:24px;padding:13px 18px;font-weight:850;text-align:center;color:#294763;margin:10px auto 18px}.big-speaker,.floating-sound{border-radius:50%;width:70px;height:70px;font-size:30px;background:#ffe9a8;box-shadow:0 7px 16px rgba(90,75,40,.16)}.floating-sound{display:block;margin:0 auto 8px}.big-speaker.mini{width:50px;height:50px;font-size:20px}.kid-next,.kid-check{display:block;margin:18px auto 0;min-height:58px;border-radius:999px;padding:12px 30px;font-size:20px;font-weight:900;background:#79c957}.practice-pair{display:flex;justify-content:center;align-items:center;gap:20px;margin:25px}.practice-pair span,.visual-tile{min-width:100px;min-height:90px;padding:12px;border:2px solid #f2d2ad;border-radius:22px;background:#fff;font-size:42px;box-shadow:0 9px 18px rgba(67,56,45,.12)}.picture-match{display:grid;grid-template-columns:1fr 1fr;gap:28px;max-width:650px;margin:auto}.picture-col{display:grid;gap:13px}.picture-card{position:relative;min-height:112px;border:3px solid #f5c999;border-radius:24px;background:#fff;box-shadow:0 10px 20px rgba(65,55,45,.13);font-size:46px;transition:.18s}.picture-col:nth-child(2) .picture-card{border-color:#b9dcff}.picture-card.selected{outline:5px solid #579cff!important;transform:scale(1.025)}.picture-card.paired{box-shadow:0 0 0 3px rgba(96,190,128,.16),0 10px 20px rgba(65,55,45,.13)}.picture-card.wrong{border-color:#ff1744!important;box-shadow:0 0 9px #ff1744,0 0 20px rgba(255,23,68,.7)!important}.picture-card.wrong:after{content:'×';position:absolute;right:-10px;top:-19px;color:#ff1744;font-size:48px;font-weight:1000;text-shadow:0 0 8px #ff1744}.class-groups button,.compare-q,.order-row button{box-shadow:0 8px 18px rgba(65,55,45,.10)}
@media(max-width:600px){.picture-match{gap:12px}.picture-card{min-height:88px;font-size:36px}.teacher-caption,.kid-instruction{font-size:14px}.preschool-stage{padding:20px 14px}}
</style>`);

/* ===== v2.6.1 revB • Referans görsele uygun eşleştirme düzeltmeleri ===== */
const ATELIER_MATCH_TEMPLATES={
 animals:{name:'🐾 Hayvanlar',instruction:'Aynı hayvanları eşleştir.',items:[['🐱','🐱'],['🐶','🐶'],['🐰','🐰'],['🐼','🐼']]},
 fruits:{name:'🍎 Meyveler',instruction:'Aynı meyveleri eşleştir.',items:[['🍎','🍎'],['🍌','🍌'],['🍓','🍓'],['🍊','🍊']]},
 shapes:{name:'🔷 Şekiller',instruction:'Aynı şekilleri eşleştir.',items:[['🔵','🔵'],['🔺','🔺'],['🟨','🟨'],['💜','💜']]},
 quantity:{name:'🔢 Sayı–Miktar',instruction:'Sayıları doğru miktarlarla eşleştir.',items:[['1','⭐'],['2','🍎🍎'],['3','🐞🐞🐞'],['4','🌸🌸🌸🌸']]}
};
let atelierTemplate='animals';
function atelierForm(type){const kind=type==='atelier_matching'?'matching':type,info=MINOO_SKILLS[kind];if(type==='atelier_matching'){atelierTemplate='animals';return modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>🧩 Eşleştirme Oyunu Oluştur</h2><p class="hint">Hazır bir görsel şablon seçin. Çocuk ekranda iki resme dokunarak eşleştirecek ve aralarında ok oluşacak.</p><label>Hazır şablonlar</label><div class="template-grid">${Object.entries(ATELIER_MATCH_TEMPLATES).map(([k,v])=>`<button id="tpl-${k}" class="template-card ${k==='animals'?'selected':''}" onclick="selectAtelierTemplate('${k}')"><span>${v.items.map(x=>x[0]).join(' ')}</span><b>${v.name}</b></button>`).join('')}</div><label>Oyun adı</label><input id="atTitle" value="Hayvanları Eşleştir"><label>🎯 Bu oyun neyi destekliyor?</label><select id="atSkill">${info.skills.map(x=>`<option>${x}</option>`).join('')}</select><label>Yaş grubu</label><select id="atAge"><option>3-4 yaş</option><option selected>4-5 yaş</option><option>5-6 yaş</option></select><label>🔊 Sesli yönerge</label><input id="atInstruction" value="${ATELIER_MATCH_TEMPLATES.animals.instruction}"><label>⭐ Görev değeri</label><select id="atStars"><option value="1">⭐ 1 yıldız</option><option value="2">⭐⭐ 2 yıldız</option><option value="3" selected>⭐⭐⭐ 3 yıldız</option></select><div class="modal-actions"><button class="ghost" onclick="atelierHome()">← Geri</button><button onclick="saveAtelierGame('atelier_matching')">Kaydet</button></div>`)}
 const examples=type==='classification'?'Kırmızılar: 🍎,🍓,🌹\nSarılar: 🍋,🍌,🌽':type==='comparison'?'🐘 | 🐭 | büyük\n🌳 | 🌱 | uzun':'küçükten büyüğe | 🍒,🍎,🍉\n1’den 4’e | 1,2,3,4';modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>${info.title} Oyunu Oluştur</h2><label>Oyun adı</label><input id="atTitle"><label>🎯 Bu oyun neyi destekliyor?</label><select id="atSkill">${info.skills.map(x=>`<option>${x}</option>`).join('')}</select><label>Yaş grubu</label><select id="atAge"><option>3-4 yaş</option><option selected>4-5 yaş</option><option>5-6 yaş</option></select><label>🔊 Sesli yönerge</label><input id="atInstruction" value="${type==='classification'?'Nesneleri doğru gruba yerleştir.':type==='comparison'?'Soruyu dinle ve doğru resmi seç.':'Nesneleri doğru sıraya diz.'}"><label>Görsel içerik</label><textarea id="atContent" rows="7" placeholder="${examples}"></textarea><label>⭐ Görev değeri</label><select id="atStars"><option value="1">⭐ 1 yıldız</option><option value="2">⭐⭐ 2 yıldız</option><option value="3" selected>⭐⭐⭐ 3 yıldız</option></select><div class="modal-actions"><button class="ghost" onclick="atelierHome()">← Geri</button><button onclick="saveAtelierGame('${type}')">Kaydet</button></div>`)}
function selectAtelierTemplate(k){atelierTemplate=k;document.querySelectorAll('.template-card').forEach(x=>x.classList.remove('selected'));document.querySelector('#tpl-'+k)?.classList.add('selected');const t=ATELIER_MATCH_TEMPLATES[k];const title=document.querySelector('#atTitle'),ins=document.querySelector('#atInstruction');if(title)title.value=t.name.replace(/^.. /,'')+' Eşleştirme';if(ins)ins.value=t.instruction}
async function saveAtelierGame(type){const title=document.querySelector('#atTitle').value.trim();if(!title)return notify('Oyun adı gerekli');let cfg;if(type==='atelier_matching'){const t=ATELIER_MATCH_TEMPLATES[atelierTemplate]||ATELIER_MATCH_TEMPLATES.animals;cfg={items:t.items.map(x=>[...x]),template:atelierTemplate}}else{const raw=document.querySelector('#atContent').value.trim();if(!raw)return notify('İçerik gerekli');cfg=parseAtelier(type,raw)}cfg.skill=document.querySelector('#atSkill').value;cfg.age=document.querySelector('#atAge').value;cfg.instruction=document.querySelector('#atInstruction').value.trim();cfg.star_value=Number(document.querySelector('#atStars').value);cfg.flow=['Öğren','Dene','Oyna','Kontrol Et','Düzelt','Tamamla'];try{await api('/api/games',{method:'POST',body:JSON.stringify({title,game_type:type,game_data:cfg})});closeModal();dashboard();notify('Oyun Atölyesine kaydedildi ✓')}catch(e){notify(e.message)}}
function minooMatchArrows(rootSel,answers,leftAttr='data-l',rightAttr='data-r'){const root=document.querySelector(rootSel);if(!root)return;root.querySelector('.match-arrow-layer')?.remove();const box=root.getBoundingClientRect(),svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','match-arrow-layer');svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);svg.innerHTML=`<defs><marker id="minooArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#ff8a5b"/></marker></defs>`;Object.entries(answers||{}).forEach(([l,r])=>{const a=root.querySelector(`[${leftAttr}="${l}"]`),b=root.querySelector(`[${rightAttr}="${r}"]`);if(!a||!b)return;const A=a.getBoundingClientRect(),B=b.getBoundingClientRect(),line=document.createElementNS('http://www.w3.org/2000/svg','path');const x1=A.right-box.left,y1=A.top+A.height/2-box.top,x2=B.left-box.left,y2=B.top+B.height/2-box.top;line.setAttribute('d',`M ${x1} ${y1} C ${x1+35} ${y1}, ${x2-35} ${y2}, ${x2} ${y2}`);line.setAttribute('class','match-arrow-path');line.setAttribute('marker-end','url(#minooArrow)');svg.appendChild(line)});root.appendChild(svg)}
function atelierPick(side,i,el){const s=window._atelierState;s.wrong=[];s.pick=s.pick||{};s.pick[side]=i;document.querySelectorAll(`[data-side="${side}"]`).forEach(x=>x.classList.remove('selected'));el.classList.add('selected');if(s.pick.L!=null&&s.pick.R!=null){s.answers[s.pick.L]=s.pick.R;s.pick={};atelierRender();requestAnimationFrame(()=>minooMatchArrows('.picture-match',s.answers,'data-i','data-i'))}}
// Atölye sağ kartlarını ayırt etmek ve okları yeniden çizmek için render sonrası işaretle
const _atelierRenderRevB=atelierRender;atelierRender=function(){_atelierRenderRevB();const s=window._atelierState;if(s?.phase==='play'&&s.g.game_type==='atelier_matching'){const cols=document.querySelectorAll('.picture-match .picture-col');cols[0]?.querySelectorAll('.picture-card').forEach((x,i)=>{x.setAttribute('data-l',i);x.removeAttribute('data-i')});cols[1]?.querySelectorAll('.picture-card').forEach((x,i)=>{x.setAttribute('data-r',i);x.removeAttribute('data-i')});requestAnimationFrame(()=>minooMatchArrows('.picture-match',s.answers))}}
function atelierPick(side,i,el){const s=window._atelierState;s.wrong=[];s.pick=s.pick||{};s.pick[side]=i;document.querySelectorAll(`[data-side="${side}"]`).forEach(x=>x.classList.remove('selected'));el.classList.add('selected');if(s.pick.L!=null&&s.pick.R!=null){s.answers[s.pick.L]=s.pick.R;s.pick={};atelierRender()}}
function v261Type(name){return ({'Şah':'king','Vezir':'queen','Kale':'rook','Fil':'bishop','At':'knight','Piyon':'pawn'})[name]||'pawn'}
function v261ChessVisual(x,white=false){return `<span class="v261-piece ${white?'white':'black'}">${minooPieceSvg(v261Type(x.name),white?'white':'black')}</span>`}
function v261Back(){teacherPreviewMode=false;return studentSession?studentDash():dashboard()}
function v261ToggleAudio(){const s=window._v261;s.audio=!s.audio;v261CountLearn()}
function v261CountLearn(){const s=window._v261,x=CHESS_COUNT_SET[s.slide];if(s.audio==null)s.audio=true;app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="v261Back()">⌂</button><b>♟️ ${esc(s.g.title||'Satranç Taşları ve Sayıları')}</b><span>1. Aşama</span><button class="ghost audio-toggle ${s.audio?'on':'off'}" onclick="v261ToggleAudio()">${s.audio?'🔊':'🔇'}</button></header><main class="v261-world"><div class="v261-instruction">Satranç taşlarının kaç adet olduğunu öğrenelim.</div><section class="v261-learn"><div>${v261ChessVisual(x)}<b>${x.name}</b></div><span class="v261-arrow">➜</span><div><strong>${x.count}</strong><div class="v261-objects">${x.object.repeat(x.count)}</div></div></section><div class="v261-dots">${CHESS_COUNT_SET.map((_,i)=>`<i class="${i===s.slide?'on':''}"></i>`).join('')}</div><div class="v261-actions"><button class="retry" onclick="v261LearnPrev()">← Geri</button><button onclick="v261LearnNext()">İleri →</button></div></main>`;if(s.audio)minooSpeak(`${x.name}. Satrançta ${x.count} tane ${x.name} vardır.`)}
const _v261ColorRenderB=v261ColorRender;v261ColorRender=function(){_v261ColorRenderB();requestAnimationFrame(()=>minooMatchArrows('.v261-columns',window._v261.answers))}
function v261PickColor(side,i,el){const s=window._v261;if(s.checked)return;s.pick=s.pick||{};s.pick[side]=i;document.querySelectorAll(`[data-${side.toLowerCase()}]`).forEach(x=>x.classList.remove('picked'));el.classList.add('picked');if(s.pick.L!=null&&s.pick.R!=null){s.answers[s.pick.L]=s.pick.R;s.pick={};document.querySelectorAll('.v261-card').forEach(x=>x.classList.remove('picked'));v261DrawLines()}}
function v261DrawLines(){document.querySelectorAll('.v261-card').forEach(x=>x.classList.remove('paired'));Object.entries(window._v261.answers).forEach(([l,r])=>{document.querySelector(`[data-l="${l}"]`)?.classList.add('paired');document.querySelector(`[data-r="${r}"]`)?.classList.add('paired')});requestAnimationFrame(()=>minooMatchArrows('.v261-columns',window._v261.answers))}
function v261PickCount(side,i,el){const s=window._v261;s.pick=s.pick||{};s.pick[side]=i;document.querySelectorAll(`[data-${side.toLowerCase()}]`).forEach(x=>x.classList.remove('picked'));el.classList.add('picked');if(s.pick.L!=null&&s.pick.R!=null){s.answers[s.pick.L]=s.pick.R;s.pick={};document.querySelectorAll('.v261-card').forEach(x=>x.classList.remove('picked','wrong'));v261DrawLines()}}
window.addEventListener('resize',()=>{if(window._v261?.answers)requestAnimationFrame(()=>minooMatchArrows('.v261-columns',window._v261.answers));if(window._atelierState?.answers)requestAnimationFrame(()=>minooMatchArrows('.picture-match',window._atelierState.answers))});
document.head.insertAdjacentHTML('beforeend',`<style id="minoo261-revb">
.template-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:8px 0 16px}.template-card{background:#fffaf2!important;color:#34495e!important;border:3px solid #eadfd3!important;border-radius:20px!important;box-shadow:0 7px 16px rgba(65,52,42,.09)!important;padding:14px!important}.template-card span{display:block;font-size:28px;margin-bottom:7px}.template-card.selected{border-color:#67b7ff!important;box-shadow:0 0 0 4px rgba(103,183,255,.18)!important}.picture-match,.v261-columns{position:relative}.match-arrow-layer{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:5}.match-arrow-path{fill:none;stroke:#ff8a5b;stroke-width:5;stroke-linecap:round;stroke-dasharray:8 7;filter:drop-shadow(0 2px 2px rgba(255,138,91,.22))}.picture-card,.v261-card{z-index:2}.v261-piece .minoo-piece-svg{width:64px;height:72px;filter:drop-shadow(0 6px 5px rgba(0,0,0,.18))}.v261-learn .v261-piece .minoo-piece-svg{width:118px;height:132px}.mini-set .v261-piece .minoo-piece-svg{width:30px;height:36px}.audio-toggle.on{background:#e3f5ff}.audio-toggle.off{background:#f1f1f1}.v261-arrow{font-size:58px!important;font-weight:1000;color:#ff7f57!important;text-shadow:0 3px 10px rgba(255,127,87,.25)}
@media(max-width:600px){.template-grid{grid-template-columns:1fr 1fr}.match-arrow-path{stroke-width:4}.v261-piece .minoo-piece-svg{width:50px;height:58px}.mini-set .v261-piece .minoo-piece-svg{width:22px;height:28px}}
</style>`);

/* ===== v2.6.1 REV-C • Atölye şablonları + çizgi bağlantıları + Minoo Geri Sayım ===== */
const ATELIER_TEMPLATES_V261C={
 atelier_matching:{
  animals:{name:'🐾 Hayvanlar ve Yiyecekleri',instruction:'Hayvanı sevdiği yiyecekle eşleştir.',items:[['🐶','🦴'],['🐱','🐟'],['🐰','🥕'],['🐵','🍌']]},
  fruits:{name:'🍎 Meyve ve Yarımları',instruction:'Meyveleri aynı meyvenin yarısıyla eşleştir.',items:[['🍎','🍎'],['🍊','🍊'],['🍋','🍋'],['🥝','🥝']]},
  shapes:{name:'🔷 Şekil ve Nesne',instruction:'Şekli ona benzeyen nesneyle eşleştir.',items:[['🔴','⚽'],['🔺','🍕'],['🟨','🪟'],['💜','💜']]},
  quantity:{name:'🔢 Sayı–Miktar',instruction:'Sayıları doğru miktardaki nesnelerle eşleştir.',items:[['1','⭐'],['2','🍎 🍎'],['3','🐞 🐞 🐞'],['4','🌸 🌸 🌸 🌸']]}
 },
 classification:{
  colors:{name:'🎨 Renklere Göre',instruction:'Nesneleri renklerine göre gruplandır.',cfg:{groups:[{name:'🔴 Kırmızı',items:['🍎','🍓','🌹']},{name:'🟡 Sarı',items:['🍋','🍌','🌽']}]}},
  animals:{name:'🐾 Yaşam Alanları',instruction:'Hayvanları yaşadıkları yere göre gruplandır.',cfg:{groups:[{name:'🌊 Su',items:['🐟','🐙','🐬']},{name:'🌳 Kara',items:['🐘','🦁','🐰']}]}},
  food:{name:'🍎 Yiyecek Grupları',instruction:'Yiyecekleri doğru gruba yerleştir.',cfg:{groups:[{name:'🍎 Meyveler',items:['🍎','🍌','🍓']},{name:'🥕 Sebzeler',items:['🥕','🥦','🌽']}]}}
 },
 comparison:{
  size:{name:'🐘 Büyük–Küçük',instruction:'Büyük olanı seç.',cfg:{questions:[{a:'🐘',b:'🐭',answer:'🐘'},{a:'🌳',b:'🌱',answer:'🌳'},{a:'🍉',b:'🍒',answer:'🍉'}]}},
  amount:{name:'⭐ Az–Çok',instruction:'Daha çok olan grubu seç.',cfg:{questions:[{a:'⭐',b:'⭐⭐⭐',answer:'⭐⭐⭐'},{a:'🍎🍎🍎🍎',b:'🍎🍎',answer:'🍎🍎🍎🍎'}]}},
  length:{name:'📏 Uzun–Kısa',instruction:'Uzun olanı seç.',cfg:{questions:[{a:'━━━━━━',b:'━━',answer:'━━━━━━'},{a:'🐍🐍🐍',b:'🐛',answer:'🐍🐍🐍'}]}}
 },
 ordering:{
  size:{name:'🍒 Küçükten Büyüğe',instruction:'Nesneleri küçükten büyüğe sırala.',cfg:{orders:[{instruction:'Küçükten büyüğe sırala',items:['🍒','🍎','🍉']}]}},
  numbers:{name:'🔢 Sayı Sırası',instruction:'Sayıları küçükten büyüğe sırala.',cfg:{orders:[{instruction:'1’den 5’e sırala',items:['1','2','3','4','5']}]}},
  amount:{name:'⭐ Azdan Çoğa',instruction:'Grupları azdan çoğa sırala.',cfg:{orders:[{instruction:'Azdan çoğa sırala',items:['⭐','⭐⭐','⭐⭐⭐','⭐⭐⭐⭐']}]}}
 }
};
let atelierTemplateV261C='';
function atelierTemplatePreview(v,type){if(type==='atelier_matching')return v.items.map(x=>x[0]).join(' ');if(type==='classification')return v.cfg.groups.map(g=>g.items[0]).join(' ');if(type==='comparison')return v.cfg.questions.map(q=>q.a+' '+q.b).slice(0,2).join(' ');return v.cfg.orders[0].items.join(' ')}
function atelierForm(type){const kind=type==='atelier_matching'?'matching':type,info=MINOO_SKILLS[kind],set=ATELIER_TEMPLATES_V261C[type],first=Object.keys(set)[0];atelierTemplateV261C=first;const t=set[first];modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>${info.title} Oyunu Oluştur</h2><p class="hint">Hazır görsel şablonlardan birini seçin. Çocuk ekranı görsel ve ses ağırlıklıdır.</p><label>Hazır şablonlar</label><div class="template-grid">${Object.entries(set).map(([k,v],i)=>`<button id="tplc-${k}" class="template-card ${i===0?'selected':''}" onclick="selectAtelierTemplateC('${type}','${k}')"><span>${atelierTemplatePreview(v,type)}</span><b>${v.name}</b></button>`).join('')}</div><label>Oyun adı</label><input id="atTitle" value="${esc(t.name.replace(/^.. /,''))}"><label>🎯 Bu oyun neyi destekliyor?</label><select id="atSkill">${info.skills.map(x=>`<option>${x}</option>`).join('')}</select><label>Yaş grubu</label><select id="atAge"><option>3-4 yaş</option><option selected>4-5 yaş</option><option>5-6 yaş</option></select><label>🔊 Sesli yönerge</label><input id="atInstruction" value="${esc(t.instruction)}"><label>⭐ Görev değeri</label><select id="atStars"><option value="1">⭐ 1 yıldız</option><option value="2">⭐⭐ 2 yıldız</option><option value="3" selected>⭐⭐⭐ 3 yıldız</option></select><div class="modal-actions"><button class="ghost" onclick="atelierHome()">← Geri</button><button onclick="saveAtelierGameC('${type}')">Kaydet</button></div>`)}
function selectAtelierTemplateC(type,k){atelierTemplateV261C=k;document.querySelectorAll('.template-card').forEach(x=>x.classList.remove('selected'));document.querySelector('#tplc-'+k)?.classList.add('selected');const t=ATELIER_TEMPLATES_V261C[type][k];document.querySelector('#atTitle').value=t.name.replace(/^.. /,'');document.querySelector('#atInstruction').value=t.instruction}
async function saveAtelierGameC(type){const title=document.querySelector('#atTitle').value.trim();if(!title)return notify('Oyun adı gerekli');const t=ATELIER_TEMPLATES_V261C[type][atelierTemplateV261C];let cfg=type==='atelier_matching'?{items:t.items.map(x=>[...x]),template:atelierTemplateV261C}:JSON.parse(JSON.stringify(t.cfg));cfg.skill=document.querySelector('#atSkill').value;cfg.age=document.querySelector('#atAge').value;cfg.instruction=document.querySelector('#atInstruction').value.trim();cfg.star_value=Number(document.querySelector('#atStars').value);cfg.flow=['Öğren','Dene','Oyna','Kontrol Et','Düzelt','Tamamla'];try{await api('/api/games',{method:'POST',body:JSON.stringify({title,game_type:type,game_data:cfg})});closeModal();dashboard();notify('Oyun Atölyesine kaydedildi ✓')}catch(e){notify(e.message)}}
// Ok ucu kaldırıldı: bütün eşleştirmelerde sade, modern bağlantı çizgisi.
function minooMatchArrows(rootSel,answers,leftAttr='data-l',rightAttr='data-r'){const root=document.querySelector(rootSel);if(!root)return;root.querySelector('.match-arrow-layer')?.remove();const box=root.getBoundingClientRect(),svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','match-arrow-layer');svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);Object.entries(answers||{}).forEach(([l,r])=>{const a=root.querySelector(`[${leftAttr}="${l}"]`),b=root.querySelector(`[${rightAttr}="${r}"]`);if(!a||!b)return;const A=a.getBoundingClientRect(),B=b.getBoundingClientRect(),line=document.createElementNS('http://www.w3.org/2000/svg','path');const x1=A.right-box.left,y1=A.top+A.height/2-box.top,x2=B.left-box.left,y2=B.top+B.height/2-box.top;line.setAttribute('d',`M ${x1} ${y1} C ${x1+30} ${y1}, ${x2-30} ${y2}, ${x2} ${y2}`);line.setAttribute('class','match-arrow-path');svg.appendChild(line)});root.appendChild(svg)}

/* Minoo Geri Sayım Sayacı */
let minooTimer={total:300,left:300,running:false,theme:'bomb',sound:true,interval:null};
const MINOO_TIMER_THEMES={bomb:{name:'💣 Pof Bomba',icon:'💣',end:'💥 POF!'},rocket:{name:'🚀 Roket',icon:'🚀',end:'✨ FIRLAT!'},balloon:{name:'🎈 Balon',icon:'🎈',end:'🎉 POP!'},race:{name:'🏎️ Yarış',icon:'🏎️',end:'🏁 FİNİŞ!'},snail:{name:'🐌 Salyangoz',icon:'🐌',end:'🌼 HEDEF!'},hourglass:{name:'⏳ Kum Saati',icon:'⏳',end:'⭐ BİTTİ!'}};
function timerTool(){clearInterval(minooTimer.interval);minooTimer.running=false;app.innerHTML=`<header><button class="ghost" onclick="dashboard()">← Öğretmen Paneli</button><b>⏳ Minoo Geri Sayım Sayacı</b><span></span></header><main class="timer-setup"><section class="timer-panel"><h1>Süreyi seç</h1><div class="timer-presets">${[1,2,3,5,10,15,20].map(m=>`<button onclick="timerSet(${m*60})">${m} dk</button>`).join('')}</div><div class="timer-custom"><input id="timerMin" type="number" min="0" max="99" value="5"><span>dk</span><input id="timerSec" type="number" min="0" max="59" value="0"><span>sn</span><button onclick="timerCustom()">Uygula</button></div><h2>Sayaç temasını seç</h2><div class="timer-themes">${Object.entries(MINOO_TIMER_THEMES).map(([k,v])=>`<button class="timer-theme ${k===minooTimer.theme?'selected':''}" onclick="timerTheme('${k}')"><span>${v.icon}</span><b>${v.name}</b></button>`).join('')}</div><div class="timer-controls"><button class="ghost" onclick="timerToggleSound()">${minooTimer.sound?'🔊 Ses Açık':'🔇 Ses Kapalı'}</button><button onclick="timerStartScreen()">▶ Sayacı Aç</button></div></section></main>`}
function timerSet(sec){minooTimer.total=minooTimer.left=sec;document.querySelector('#timerMin').value=Math.floor(sec/60);document.querySelector('#timerSec').value=sec%60;notify(`${Math.floor(sec/60)} dakika seçildi`)}
function timerCustom(){const m=Math.max(0,Number(document.querySelector('#timerMin').value)||0),s=Math.min(59,Math.max(0,Number(document.querySelector('#timerSec').value)||0));minooTimer.total=minooTimer.left=Math.max(1,m*60+s);notify('Süre ayarlandı ✓')}
function timerTheme(k){minooTimer.theme=k;timerTool()}
function timerToggleSound(){minooTimer.sound=!minooTimer.sound;timerTool()}
function timerStartScreen(){clearInterval(minooTimer.interval);minooTimer.left=minooTimer.total;minooTimer.running=false;timerRender()}
function timerFmt(s){return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`}
function timerRender(){const t=MINOO_TIMER_THEMES[minooTimer.theme],pct=minooTimer.total?Math.max(0,minooTimer.left/minooTimer.total):0,done=minooTimer.left<=0;app.innerHTML=`<main class="timer-stage theme-${minooTimer.theme}"><button class="timer-back" onclick="timerTool()">←</button><button class="timer-sound" onclick="minooTimer.sound=!minooTimer.sound;timerRender()">${minooTimer.sound?'🔊':'🔇'}</button><div class="timer-clock">${timerFmt(minooTimer.left)}</div><div class="timer-scene"><div class="timer-track"><div class="timer-progress" style="width:${pct*100}%"></div></div><div class="timer-character ${done?'finished':''}" style="--p:${pct}">${done?t.end:t.icon}</div>${minooTimer.theme==='bomb'?`<div class="timer-fuse"><i style="width:${pct*100}%"></i><b style="left:${pct*100}%">✨</b></div>`:''}</div><div class="timer-stage-controls">${done?`<button onclick="timerStartScreen()">↻ Yeniden Başlat</button>`:`<button onclick="timerToggleRun()">${minooTimer.running?'⏸ Duraklat':'▶ Başlat'}</button><button class="ghost" onclick="timerReset()">↻ Sıfırla</button>`}</div></main>`}
function timerToggleRun(){minooTimer.running=!minooTimer.running;clearInterval(minooTimer.interval);if(minooTimer.running)minooTimer.interval=setInterval(()=>{minooTimer.left=Math.max(0,minooTimer.left-1);if(minooTimer.left<=0){clearInterval(minooTimer.interval);minooTimer.running=false;if(minooTimer.sound){try{const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=220;g.gain.setValueAtTime(.18,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.7);o.start();o.stop(a.currentTime+.7)}catch{}}}timerRender()},1000);timerRender()}
function timerReset(){clearInterval(minooTimer.interval);minooTimer.running=false;minooTimer.left=minooTimer.total;timerRender()}
const _dashboardRevC=dashboard;dashboard=async function(){await _dashboardRevC();const main=document.querySelector('main');if(main&&!document.querySelector('.teacher-tools-v261c')){const sec=document.createElement('section');sec.className='card wide teacher-tools-v261c';sec.innerHTML='<div class="toolbar"><div><h2>🧰 Öğretmen Araçları</h2><p class="hint">Sınıfta kullanabileceğiniz hızlı araçlar.</p></div><button onclick="timerTool()">⏳ Geri Sayım Sayacı</button></div>';main.appendChild(sec)}};

document.head.insertAdjacentHTML('beforeend',`<style id="minoo261-revc">
.match-arrow-path{stroke:#ff9b72!important;stroke-width:5!important;stroke-dasharray:none!important;filter:drop-shadow(0 2px 2px rgba(255,155,114,.18))!important}.picture-card span{color:#24364a!important;opacity:1!important;text-shadow:none!important}.picture-card{background:#fffdf9!important}.template-card span{font-size:26px;min-height:38px}.timer-setup{max-width:900px;margin:auto}.timer-panel{background:#fffaf2;border-radius:28px;padding:24px;box-shadow:0 12px 32px rgba(45,55,70,.12)}.timer-presets,.timer-themes,.timer-controls,.timer-custom{display:flex;gap:10px;flex-wrap:wrap;align-items:center}.timer-custom input{width:90px;font-size:24px;text-align:center}.timer-themes{display:grid;grid-template-columns:repeat(3,1fr);margin:12px 0 22px}.timer-theme{background:#fff!important;color:#31445b!important;border:3px solid #e6e0d8!important;border-radius:22px!important;padding:18px!important}.timer-theme span{display:block;font-size:42px}.timer-theme.selected{border-color:#65b8ff!important;box-shadow:0 0 0 4px rgba(101,184,255,.18)!important}.timer-stage{min-height:100vh;background:linear-gradient(180deg,#fffaf1,#f4f0e8);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;position:relative;overflow:hidden}.timer-back,.timer-sound{position:absolute;top:18px;border-radius:50%!important;width:58px;height:58px;padding:0!important}.timer-back{left:18px}.timer-sound{right:18px}.timer-clock{font-size:clamp(58px,13vw,150px);font-weight:1000;letter-spacing:4px;background:#26384d;color:#fff;padding:8px 30px;border-radius:24px;box-shadow:0 10px 24px rgba(0,0,0,.16)}.timer-scene{width:min(900px,88vw);height:330px;position:relative;display:flex;align-items:center;justify-content:center}.timer-character{font-size:clamp(100px,20vw,210px);filter:drop-shadow(0 14px 14px rgba(0,0,0,.15));transition:.3s}.timer-character.finished{animation:minooPop .65s ease both;font-size:clamp(72px,14vw,150px);font-weight:1000}.timer-track{position:absolute;bottom:35px;width:90%;height:20px;background:#e5e8ec;border-radius:20px;overflow:hidden}.timer-progress{height:100%;background:linear-gradient(90deg,#78d58b,#ffd46b,#ff8c82);transition:width .8s linear}.timer-fuse{position:absolute;top:30px;width:72%;height:12px;background:#d9d9d9;border-radius:12px}.timer-fuse i{display:block;height:100%;background:#525252;border-radius:12px;transition:width .8s linear}.timer-fuse b{position:absolute;top:-17px;transform:translateX(-50%);font-size:38px;transition:left .8s linear}.timer-stage-controls{display:flex;gap:14px}.timer-stage-controls button{font-size:22px;padding:16px 28px}.theme-bomb{background:radial-gradient(circle at center,#30343b,#101215)}.theme-bomb .timer-clock{background:#050505}.theme-bomb .timer-track{opacity:.45}.theme-bomb .timer-fuse{background:#777}.theme-bomb .timer-back,.theme-bomb .timer-sound{background:#fff!important;color:#222!important}@keyframes minooPop{0%{transform:scale(.4);opacity:.2}55%{transform:scale(1.35)}100%{transform:scale(1)}}
@media(max-width:600px){.timer-themes{grid-template-columns:repeat(2,1fr)}.timer-scene{height:280px}.timer-stage-controls button{font-size:18px;padding:13px 18px}}
</style>`);

/* ===== Minoo v2.6.2 • Profesyonel sayaç + satranç öğrenme paketi ===== */
const M262_FILES=['a','b','c','d','e','f','g','h'];
function m262Piece(name,white=false){return v261ChessVisual({name},white)}
function m262Board(inner='',cls=''){return `<div class="m262-board ${cls}">${Array.from({length:64},(_,i)=>{const r=8-Math.floor(i/8),f=i%8,key=M262_FILES[f]+r;return `<button class="m262-sq" data-key="${key}" data-f="${f}" data-r="${r}">${inner&&inner[key]||''}</button>`}).join('')}</div>`}
function m262Home(){if(teacherPreviewMode)return previewBack();return studentDash()}

/* Atölye: tüm motorlarda kontrol sonrası neon geri bildirim */
const _atelierCheck262=atelierCheck;
atelierCheck=async function(){const s=window._atelierState;if(!s)return _atelierCheck262();const [score,total]=atelierScore(s);if(score<total){s.wrong=s.wrong||[];await _atelierCheck262();requestAnimationFrame(()=>{
 if(s.g.game_type==='classification'){document.querySelectorAll('.class-item').forEach((el,i)=>{const a=s.answers[i];if(a==null||a!==s.pool[i]?.gi)el.classList.add('m262-wrong')})}
 if(s.g.game_type==='comparison'){(s.cfg.questions||[]).forEach((q,i)=>{const chosen=s.answers[i];if(chosen==null||chosen!==(q.correct??q.answerIndex??0)){document.querySelectorAll('.compare-q')[i]?.classList.add('m262-wrong')}})}
 if(s.g.game_type==='ordering'){document.querySelectorAll('.order-row button').forEach((el,i)=>{const target=((s.cfg.orders||[])[0]?.items||[])[i];if(s.order?.[i]!==target)el.classList.add('m262-wrong')})}
 });return}return _atelierCheck262()};

/* Profesyonel sayaç */
const M262_TIMER={rocket:{name:'Roket',icon:'🚀'},bomb:{name:'Pof Bomba',icon:'💣'},balloon:{name:'Balon',icon:'🎈'},race:{name:'Yarış',icon:'🏎️'},snail:{name:'Salyangoz',icon:'🐌'},sand:{name:'Kum Saati',icon:'⏳'}};
function m262Beep(freq=520,d=.12,vol=.045){if(!minooTimer.sound)return;try{const A=window.AudioContext||window.webkitAudioContext,a=new A(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=freq;g.gain.value=vol;o.start();g.gain.exponentialRampToValueAtTime(.001,a.currentTime+d);o.stop(a.currentTime+d)}catch{}}
function m262TimerFinish(){if(!minooTimer.sound)return;m262Beep(660,.18,.08);setTimeout(()=>m262Beep(880,.2,.08),180);setTimeout(()=>m262Beep(1100,.45,.08),380)}
timerRender=function(){const t=M262_TIMER[minooTimer.theme]||M262_TIMER.rocket,p=minooTimer.total?1-minooTimer.left/minooTimer.total:0,done=minooTimer.left<=0,deg=Math.round(p*360);let scene='';
 if(minooTimer.theme==='rocket')scene=`<div class="m262-space"><i class="m262-star s1">✦</i><i class="m262-star s2">✧</i><div class="m262-rocket ${minooTimer.running?'alive':''} ${done?'launch':''}" style="--p:${p}">🚀<b></b></div><div class="m262-pad"></div></div>`;
 else if(minooTimer.theme==='bomb')scene=`<div class="m262-bomb ${done?'boom':''}">${done?'💥':'💣'}<div class="m262-fuse"><i style="width:${(1-p)*100}%"></i><b style="left:${(1-p)*100}%">✦</b></div>${done?'<strong>POF!</strong>':''}</div>`;
 else if(minooTimer.theme==='balloon')scene=`<div class="m262-balloon ${done?'pop':''}" style="transform:scale(${.75+p*.35})">${done?'✨':'🎈'}</div>`;
 else if(minooTimer.theme==='race')scene=`<div class="m262-road"><span style="left:${p*82}%">🏎️</span><b>🏁</b></div>`;
 else if(minooTimer.theme==='snail')scene=`<div class="m262-road grass"><span style="left:${p*82}%">🐌</span><b>🌼</b></div>`;
 else scene=`<div class="m262-sand">⏳<i style="height:${(1-p)*65}%"></i></div>`;
 app.innerHTML=`<main class="timer-stage m262-timer theme-${minooTimer.theme}"><button class="timer-back" onclick="timerTool()">←</button><button class="timer-sound" onclick="minooTimer.sound=!minooTimer.sound;timerRender()">${minooTimer.sound?'🔊':'🔇'}</button><div class="timer-clock">${timerFmt(minooTimer.left)}</div><div class="m262-ring" style="--deg:${deg}deg">${scene}</div><div class="timer-stage-controls">${done?`<button onclick="timerStartScreen()">↻ Yeniden Başlat</button>`:`<button onclick="timerToggleRun()">${minooTimer.running?'⏸ Duraklat':'▶ Başlat'}</button><button class="ghost" onclick="timerReset()">↻ Sıfırla</button>`}</div></main>`}
timerToggleRun=function(){minooTimer.running=!minooTimer.running;clearInterval(minooTimer.interval);if(minooTimer.running){m262Beep(440,.1);minooTimer.interval=setInterval(()=>{minooTimer.left=Math.max(0,minooTimer.left-1);if(minooTimer.left<=10&&minooTimer.left>0)m262Beep(380+minooTimer.left*18,.07,.025);if(minooTimer.left<=0){clearInterval(minooTimer.interval);minooTimer.running=false;m262TimerFinish()}timerRender()},1000)}timerRender()}

/* Satranç Taşlarını Düzelt */
const M262_START={a8:'Kale',b8:'At',c8:'Fil',d8:'Vezir',e8:'Şah',f8:'Fil',g8:'At',h8:'Kale',a1:'Kale',b1:'At',c1:'Fil',d1:'Vezir',e1:'Şah',f1:'Fil',g1:'At',h1:'Kale'};
for(const f of M262_FILES){M262_START[f+'7']='Piyon';M262_START[f+'2']='Piyon'}
function chessFixGame(g){window._m262fix={g,level:1,selected:new Set(),phase:'find',first:null};m262FixRound()}
function m262FixRound(){const s=window._m262fix,n=[0,3,5,8][s.level],entries=Object.entries(M262_START),wrong=new Set();while(wrong.size<n)wrong.add(Math.floor(Math.random()*entries.length));const board={};entries.forEach(([k,v],i)=>{let nk=k;if(wrong.has(i)){do{nk=M262_FILES[Math.floor(Math.random()*8)]+(1+Math.floor(Math.random()*8))}while(board[nk]||M262_START[nk])}board[nk]=m262Piece(v,k[1]<='2')});s.wrong=wrong;s.entries=entries;s.board=board;s.selected=new Set();m262FixRender()}
function m262FixRender(){const s=window._m262fix;app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="m262Home()">⌂</button><b>♟️ Satranç Taşlarını Düzelt</b><span>Seviye ${s.level}/3</span></header><main class="m262-game"><div class="v261-instruction">Yanlış dizilmiş taşları bul. Yanlış olduğunu düşündüğün taşa dokunup çember içine al.</div>${m262Board(s.board,'fix-board')}<div class="v261-actions"><button class="retry" onclick="m262FixRound()">↻ Yeni Tahta</button><button onclick="m262FixCheck()">✓ Kontrol Et</button></div></main>`;document.querySelectorAll('.fix-board .m262-sq').forEach(b=>{if(!b.innerHTML)return;b.onclick=()=>{b.classList.toggle('circled');const k=b.dataset.key;b.classList.contains('circled')?s.selected.add(k):s.selected.delete(k)}})}
function m262FixCheck(){
 const s=window._m262fix; let hits=0, chosen=0;
 document.querySelectorAll('.fix-board .m262-sq').forEach(b=>{if(!b.classList.contains('circled'))return;chosen++;const key=b.dataset.key;const expected=M262_START[key];const has=!!b.innerHTML;const wrongHere=has&&!expected;if(wrongHere)hits++;else b.classList.add('m262-wrong')});
 const need=[0,3,5,8][s.level];
 if(hits>=Math.max(1,need-1)&&chosen>=Math.max(1,need-1)){
  if(s.level<3) modal(`<h2>Harika! 🌟</h2><p>Şimdi biraz daha zor bir tahta geliyor.</p><div class="modal-actions"><button onclick="closeModal();window._m262fix.level++;m262FixRound()">İleri →</button></div>`);
  else modal(`<h2>Aferin! 🎉</h2><p>Üç seviyeyi de tamamladın.</p><div class="modal-actions"><button onclick="closeModal();m262Home()">⌂ Ana Sayfa</button></div>`);
 } else modal(`<h2>Bir daha bakalım 🌱</h2><p>Seçimlerini yeniden düşün.</p><div class="modal-actions"><button onclick="closeModal()">Yeniden Dene</button></div>`);
}

/* Dikey-yatay-çapraz yönler */
function chessDirectionsGame(g){window._m262dir={g,step:0,practice:false,lines:[]};m262DirRender()}
const M262_DIRS=[['Dikey','↕','vertical'],['Yatay','↔','horizontal'],['Çapraz','⤢','diag1'],['Çapraz','⤡','diag2']];
function m262DirRender(){const s=window._m262dir,d=M262_DIRS[s.step];app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="m262Home()">⌂</button><b>♟️ Satrançta Yönleri Öğreniyorum</b><span>${s.step+1}/4</span></header><main class="m262-game"><div class="v261-instruction">${s.practice?`Şimdi sen ${d[0].toLowerCase()} çizgileri çiz.`:`${d[0]} yönleri öğrenelim.`}</div><div class="m262-dirwrap">${m262Board({},'dir-board')}<svg class="m262-overlay"></svg></div><div class="v261-actions"><button class="retry" onclick="m262DirPrev()">← Geri</button>${s.practice?`<button class="ghost" onclick="m262DirClear()">🧹 Temizle</button><button onclick="m262DirCheck()">✓ Kontrol Et</button>`:`<button onclick="window._m262dir.practice=true;m262DirRender()">Şimdi Sen Çiz →</button>`}</div></main>`;if(!s.practice)setTimeout(()=>m262DrawGuide(d[2]),100);else m262EnableDraw(d[2])}
function m262DrawGuide(type){const svg=document.querySelector('.m262-overlay'),b=document.querySelector('.dir-board').getBoundingClientRect(),lines=[];if(type==='vertical')for(let i=0;i<8;i++)lines.push([i+.5,.2,i+.5,7.8]);if(type==='horizontal')for(let i=0;i<8;i++)lines.push([.2,i+.5,7.8,i+.5]);if(type==='diag1')for(let i=-5;i<6;i++)lines.push([Math.max(.2,i+.2),Math.max(.2,-i+.2),Math.min(7.8,7.8+i),Math.min(7.8,7.8-i)]);if(type==='diag2')for(let i=-5;i<6;i++)lines.push([Math.max(.2,i+.2),Math.min(7.8,7.8+i),Math.min(7.8,7.8+i),Math.max(.2,i+.2)]);svg.innerHTML=lines.map((l,i)=>`<line class="guide-line" x1="${l[0]*12.5}%" y1="${l[1]*12.5}%" x2="${l[2]*12.5}%" y2="${l[3]*12.5}%" style="animation-delay:${i*.09}s"/>`).join('')}
function m262EnableDraw(type){const board=document.querySelector('.dir-board'),svg=document.querySelector('.m262-overlay'),s=window._m262dir;let start=null;board.querySelectorAll('.m262-sq').forEach(q=>q.onclick=()=>{if(!start){start=q;q.classList.add('start')}else{const a=[+start.dataset.f,8-(+start.dataset.r)],z=[+q.dataset.f,8-(+q.dataset.r)];s.lines.push([a,z,type]);start.classList.remove('start');start=null;m262PracticeLines()}})}
function m262PracticeLines(){const svg=document.querySelector('.m262-overlay'),s=window._m262dir;svg.innerHTML=s.lines.map(([a,z])=>`<line class="kid-line" x1="${(a[0]+.5)*12.5}%" y1="${(a[1]+.5)*12.5}%" x2="${(z[0]+.5)*12.5}%" y2="${(z[1]+.5)*12.5}%"/>`).join('')}
function m262DirCheck(){const s=window._m262dir,type=M262_DIRS[s.step][2],ok=s.lines.length&&s.lines.every(([a,z])=>type==='vertical'?a[0]===z[0]:type==='horizontal'?a[1]===z[1]:Math.abs(a[0]-z[0])===Math.abs(a[1]-z[1]));if(!ok)return notify('Neon kırmızı çizgilere yeniden bakalım.');if(s.step<3){s.step++;s.practice=false;s.lines=[];m262DirRender()}else modal(`<h2>Harika! 🎉</h2><p>Dikey, yatay ve çapraz yönleri tamamladın.</p><div class="modal-actions"><button onclick="closeModal();m262Home()">Ana Sayfa</button></div>`)}
function m262DirPrev(){const s=window._m262dir;if(s.practice){s.practice=false;s.lines=[]}else s.step=Math.max(0,s.step-1);m262DirRender()}function m262DirClear(){window._m262dir.lines=[];m262PracticeLines()}

/* Kale hareketi ve tek hamlede taş alma */
function rookCaptureGame(g){window._m262rook={g,phase:'learn',slide:0,round:0,selected:new Set()};m262RookRender()}
const M262_ROOK_POS=['d4','a8','f3'];
function m262RookRender(){const s=window._m262rook;if(s.phase==='learn')return m262RookLearn();return m262RookQuiz()}
function m262RookLearn(){const s=window._m262rook,pos=M262_ROOK_POS[s.slide],pieces={[pos]:m262Piece('Kale',s.slide===2)};app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="m262Home()">⌂</button><b>♜ Kalenin Hareketi ve Taş Alması</b><span>Öğretici ${s.slide+1}/3</span></header><main class="m262-game"><div class="v261-instruction">Kale bulunduğu kareden dikey ve yatay olarak gidebilir.</div><div class="m262-dirwrap">${m262Board(pieces,'rook-board')}<svg class="m262-overlay"></svg></div><div class="v261-actions"><button class="retry" onclick="m262RookPrev()">← Geri</button><button onclick="m262RookNext()">İleri →</button></div></main>`;setTimeout(()=>m262RookArrows(pos),80)}
function m262RookArrows(pos){const svg=document.querySelector('.m262-overlay'),f=M262_FILES.indexOf(pos[0]),r=8-Number(pos[1]);svg.innerHTML=[[f+.5,r+.5,f+.5,.2],[f+.5,r+.5,f+.5,7.8],[f+.5,r+.5,.2,r+.5],[f+.5,r+.5,7.8,r+.5]].map(l=>`<line class="guide-line rook" x1="${l[0]*12.5}%" y1="${l[1]*12.5}%" x2="${l[2]*12.5}%" y2="${l[3]*12.5}%"/>`).join('')}
function m262RookNext(){const s=window._m262rook;if(s.slide<2){s.slide++;m262RookLearn()}else{s.phase='quiz';s.round=0;m262RookQuiz()}}function m262RookPrev(){const s=window._m262rook;s.slide=Math.max(0,s.slide-1);m262RookLearn()}
const M262_FRUITS=['🍎','🍓','🍌','🍊','🍇','🥝'];
function m262RookQuiz(){const s=window._m262rook,round=s.round,pos=['d4','b6','g3','a5','e4'][round],f=M262_FILES.indexOf(pos[0]),r=Number(pos[1]),board={[pos]:m262Piece('Kale',round%2===1)},targets=[];const coords=round<4?[[f,Math.min(8,r+2)],[Math.min(7,f+2),r],[Math.max(0,f-2),r],[Math.min(7,f+1),Math.min(8,r+1)],[Math.max(0,f-1),Math.max(1,r-2)]]:[[f,Math.min(8,r+2)],[Math.min(7,f+2),r],[Math.max(0,f-2),r],[Math.min(7,f+1),Math.min(8,r+1)]];coords.forEach((c,i)=>{const k=M262_FILES[c[0]]+c[1];if(k===pos)return;const reachable=c[0]===f||c[1]===r;targets.push({k,reachable});board[k]=round<4?M262_FRUITS[i%M262_FRUITS.length]:m262Piece(['Piyon','At','Fil','Vezir'][i%4],true)});s.targets=targets;s.selected=new Set();app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="m262Home()">⌂</button><b>♜ Kalenin Hareketi ve Taş Alması</b><span>${round+1}/5</span></header><main class="m262-game"><div class="v261-instruction">${round<4?'Kale hangi meyveleri tek hamlede yiyebilir? Dokunup çember içine al.':'Kale hangi rakip taşları tek hamlede alabilir? Dokunup çember içine al.'}</div>${m262Board(board,'rook-quiz')}<div class="v261-actions"><button class="retry" onclick="m262RookQuiz()">↻ Temizle</button><button onclick="m262RookCheck()">✓ Kontrol Et</button></div></main>`;document.querySelectorAll('.rook-quiz .m262-sq').forEach(q=>{if(q.dataset.key===pos||!q.innerHTML)return;q.onclick=()=>{q.classList.toggle('circled');q.classList.contains('circled')?s.selected.add(q.dataset.key):s.selected.delete(q.dataset.key)}})}
function m262RookCheck(){const s=window._m262rook;let ok=true;s.targets.forEach(t=>{const q=document.querySelector(`.rook-quiz [data-key="${t.k}"]`),sel=s.selected.has(t.k);if(sel!==t.reachable){ok=false;q?.classList.add('m262-wrong')}});if(!ok)return modal(`<h2>Bir daha bakalım 🌱</h2><p>Neon kırmızı işaretli seçimleri yeniden düşün.</p><div class="modal-actions"><button onclick="closeModal()">Yeniden Dene</button></div>`);if(s.round<4){s.round++;m262RookQuiz()}else modal(`<h2>Aferin! 🎉</h2><p>Kalenin hareketini ve tek hamlede taş almasını tamamladın.</p><div class="modal-actions"><button onclick="closeModal();m262Home()">Ana Sayfa</button></div>`)}

const _playGame262=playGame;playGame=function(g){if(g.game_type==='chess_fix')return chessFixGame(g);if(g.game_type==='chess_directions')return chessDirectionsGame(g);if(g.game_type==='rook_capture')return rookCaptureGame(g);return _playGame262(g)};
const _v261Label262=v261Label;v261Label=function(t){return t==='chess_fix'?'🛠️ Satranç Taşlarını Düzelt':t==='chess_directions'?'🧭 Satrançta Yönleri Öğreniyorum':t==='rook_capture'?'♜ Kalenin Hareketi ve Taş Alması':_v261Label262(t)};

document.head.insertAdjacentHTML('beforeend',`<style id="minoo262">
.m262-wrong{position:relative!important;border-color:#ff1744!important;box-shadow:0 0 8px #ff1744,0 0 20px rgba(255,23,68,.72)!important;outline:3px solid #ff1744!important}.m262-wrong:after{content:'×';position:absolute;right:-8px;top:-18px;color:#ff1744;font-size:42px;font-weight:1000;text-shadow:0 0 8px #ff1744;z-index:8}.m262-game{max-width:820px;margin:auto;padding:14px}.m262-board{width:min(92vw,620px);aspect-ratio:1;display:grid;grid-template-columns:repeat(8,1fr);margin:14px auto;border:4px solid #26384d;border-radius:10px;overflow:hidden}.m262-sq{border:0!important;border-radius:0!important;padding:0!important;min-width:0!important;min-height:0!important;background:#fff!important;position:relative;display:grid;place-items:center}.m262-sq:nth-child(16n+2),.m262-sq:nth-child(16n+4),.m262-sq:nth-child(16n+6),.m262-sq:nth-child(16n+8),.m262-sq:nth-child(16n+9),.m262-sq:nth-child(16n+11),.m262-sq:nth-child(16n+13),.m262-sq:nth-child(16n+15){background:#f5c08f!important}.m262-sq .v261-piece{width:70%;height:70%;font-size:clamp(25px,6vw,54px)}.m262-sq .chess-glyph{font-size:inherit!important}.m262-sq.circled:before{content:'';position:absolute;inset:8%;border:5px solid #ff4f7b;border-radius:50%;box-shadow:0 0 9px rgba(255,79,123,.45);z-index:5}.m262-dirwrap{position:relative;width:min(92vw,620px);margin:auto}.m262-dirwrap .m262-board{width:100%;margin:0}.m262-overlay{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.guide-line,.kid-line{stroke:#ff4b4b;stroke-width:1.2%;stroke-linecap:round;fill:none;stroke-dasharray:120;stroke-dashoffset:120;animation:m262Draw .7s ease forwards}.guide-line.rook{stroke:#ff4545;stroke-width:1%}.kid-line{stroke:#4d8fff;stroke-dasharray:none;stroke-dashoffset:0;animation:none}.m262-sq.start{box-shadow:inset 0 0 0 5px #4d8fff}.m262-timer{min-height:calc(100vh - 1px)!important}.m262-ring{width:min(82vw,650px);height:360px;border-radius:34px;display:grid;place-items:center;position:relative;background:conic-gradient(#6fc8ff var(--deg),rgba(255,255,255,.18) 0);padding:10px}.m262-ring:before{content:'';position:absolute;inset:12px;border-radius:27px;background:#17233c}.m262-space,.m262-bomb,.m262-balloon,.m262-road,.m262-sand{position:relative;z-index:2;width:92%;height:88%;display:grid;place-items:center;overflow:hidden}.m262-space{background:radial-gradient(circle at 30% 25%,#35538c,#111a31 62%);border-radius:22px}.m262-rocket{position:absolute;left:12%;bottom:22%;font-size:110px;filter:drop-shadow(0 12px 10px #0008);transition:left .8s linear,bottom .8s linear}.m262-rocket.alive{animation:m262Vibe .35s infinite alternate}.m262-rocket b{position:absolute;width:26px;height:70px;background:linear-gradient(#fff38b,#ff7a3d,transparent);left:44%;top:78%;border-radius:50%;filter:blur(2px)}.m262-rocket.launch{animation:m262Launch 1s ease-in forwards}.m262-pad{position:absolute;bottom:13%;width:70%;height:12px;background:#65718a;border-radius:50%}.m262-star{position:absolute;color:#fff;font-size:30px;animation:m262Twinkle 1s infinite alternate}.s1{left:18%;top:18%}.s2{right:20%;top:30%}.m262-bomb{font-size:150px;background:#090909;border-radius:22px}.m262-bomb strong{position:absolute;color:#fff;font-size:58px}.m262-fuse{position:absolute;top:15%;width:68%;height:10px;background:#777;border-radius:10px}.m262-fuse i{display:block;height:100%;background:#e6d5a4}.m262-fuse b{position:absolute;top:-18px;font-size:34px;color:#ffb21d}.m262-bomb.boom{animation:minooPop .6s}.m262-balloon{font-size:180px;transition:transform .8s}.m262-road{height:180px;border-bottom:12px dashed #fff;background:#4f5968;border-radius:22px}.m262-road span{position:absolute;bottom:30px;font-size:90px;transition:left .8s linear}.m262-road b{position:absolute;right:4%;bottom:28px;font-size:70px}.m262-road.grass{background:#91d07e}.m262-sand{font-size:190px}.m262-sand i{position:absolute;bottom:20%;width:45px;background:#f1c15d;opacity:.55}.timer-stage.theme-rocket,.timer-stage.theme-race{background:linear-gradient(#15203a,#283f68)}@keyframes m262Draw{to{stroke-dashoffset:0}}@keyframes m262Vibe{to{transform:translate(2px,-2px) rotate(1deg)}}@keyframes m262Launch{to{transform:translate(260px,-260px) scale(.5);opacity:0}}@keyframes m262Twinkle{to{opacity:.25;transform:scale(.7)}}
@media(max-width:600px){.m262-ring{height:290px}.m262-rocket{font-size:80px}.m262-board{border-width:3px}.m262-sq.circled:before{border-width:3px}.m262-game .v261-actions{flex-wrap:wrap}.m262-game .v261-actions button{flex:1}}
</style>`);


/* ===== Minoo v2.6.3 • Satranç Eğitim Paketi ===== */
const M263_PIECES={
 bishop:{name:'Fil',title:'♝ Filin Hareketi ve Taş Alması',positions:['d4','b3','f6'],dirs:[[1,1],[1,-1],[-1,1],[-1,-1]]},
 queen:{name:'Vezir',title:'♛ Vezirin Hareketi ve Taş Alması',positions:['d4','b6','f3'],dirs:[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]},
 knight:{name:'At',title:'♞ Atın Hareketi ve Taş Alması',positions:['d4','c6','f3'],jumps:[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]},
 king:{name:'Şah',title:'♚ Şahın Hareketi ve Taş Alması',positions:['d4','b6','f3'],dirs:[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]],one:true},
 pawn:{name:'Piyon',title:'♟ Piyonun Hareketi ve Taş Alması',positions:['d2','b4','f5'],pawn:true}
};
function m263Pencil(){try{const A=window.AudioContext||window.webkitAudioContext,a=new A(),n=a.createBufferSource(),b=a.createBuffer(1,a.sampleRate*.16,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(.22*(1-i/d.length));const g=a.createGain();g.gain.value=.14;n.buffer=b;n.connect(g);g.connect(a.destination);n.start()}catch{}}
function m263Circle(el,set,key){el.classList.toggle('circled');if(el.classList.contains('circled')){set.add(key);m263Pencil()}else set.delete(key)}
function m263Coord(key){return [M262_FILES.indexOf(key[0]),Number(key[1])]}
function m263Key(f,r){return f>=0&&f<8&&r>=1&&r<=8?M262_FILES[f]+r:null}
function m263Targets(type,pos){const c=M263_PIECES[type],[f,r]=m263Coord(pos),out=[];if(c.jumps)c.jumps.forEach(([df,dr])=>{const k=m263Key(f+df,r+dr);if(k)out.push(k)});else if(c.pawn){[-1,1].forEach(df=>{const k=m263Key(f+df,r+1);if(k)out.push(k)})}else c.dirs.forEach(([df,dr])=>{let x=f+df,y=r+dr;while(1){const k=m263Key(x,y);if(!k)break;out.push(k);if(c.one)break;x+=df;y+=dr}});return out}
function pieceLearnGame(g,type){window._m263piece={g,type,phase:'learn',slide:0,round:0,selected:new Set()};m263PieceRender()}
function m263PieceRender(){const s=window._m263piece;if(s.phase==='learn')m263PieceLearn();else m263PieceQuiz()}
function m263PieceLearn(){const s=window._m263piece,c=M263_PIECES[s.type],pos=c.positions[s.slide],board={[pos]:m262Piece(c.name,false)};app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="m262Home()">⌂</button><b>${c.title}</b><span>Öğretici ${s.slide+1}/3</span></header><main class="m262-game"><div class="v261-instruction">${c.pawn?'Piyon ileri gider; taşı çaprazındaki rakip taşı alır.':c.name+' bulunduğu kareden gidebileceği yönleri öğrenelim.'}</div><div class="m262-dirwrap">${m262Board(board,'m263-piece-board')}<svg class="m262-overlay"></svg></div><div class="v261-actions"><button class="retry" onclick="m263PiecePrev()">← Geri</button><button onclick="m263Speak('${c.pawn?'Piyon ileri gider ve çapraz taş alır.':c.name+' için gösterilen yolları izle.'}')">🔊 Dinle</button><button onclick="m263PieceNext()">İleri →</button></div></main>`;setTimeout(()=>m263ShowMoves(s.type,pos),80)}
function m263ShowMoves(type,pos){const svg=document.querySelector('.m262-overlay'),[f,r]=m263Coord(pos),fy=8-r+.5,fx=f+.5,t=m263Targets(type,pos);let ends=[];if(M263_PIECES[type].jumps||M263_PIECES[type].pawn)ends=t;else{const c=M263_PIECES[type];c.dirs.forEach(([df,dr])=>{let x=f,y=r,k;while((k=m263Key(x+df,y+dr))){x+=df;y+=dr;if(c.one)break}if(x!==f||y!==r)ends.push(m263Key(x,y))})}svg.innerHTML=ends.map((k,i)=>{const [x,y]=m263Coord(k);return `<line class="guide-line m263-arrow" x1="${fx*12.5}%" y1="${fy*12.5}%" x2="${(x+.5)*12.5}%" y2="${(8-y+.5)*12.5}%" style="animation-delay:${i*.08}s"/>`}).join('')}
function m263PiecePrev(){const s=window._m263piece;s.slide=Math.max(0,s.slide-1);m263PieceLearn()}
function m263PieceNext(){const s=window._m263piece;if(s.slide<2){s.slide++;m263PieceLearn()}else{s.phase='quiz';s.round=0;m263PieceQuiz()}}
function m263Speak(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='tr-TR';speechSynthesis.speak(u)}catch{}}
const M263_FRUIT=['🍎','🍓','🍌','🍊','🍐','🍒'];
function m263PieceQuiz(){const s=window._m263piece,c=M263_PIECES[s.type],pos=c.positions[s.round%3],valid=m263Targets(s.type,pos),board={[pos]:m262Piece(c.name,false)},targets=[];let picks=[];for(let i=0;i<6;i++){let k;if(i<3&&valid.length)k=valid[(i*2+s.round)%valid.length];else{do{k=M262_FILES[(i*3+s.round)%8]+(1+((i*2+s.round+2)%8))}while(k===pos||picks.includes(k))}if(picks.includes(k))continue;picks.push(k);const reachable=valid.includes(k);targets.push({k,reachable});board[k]=s.round<4?M263_FRUIT[i%M263_FRUIT.length]:m262Piece(['Piyon','At','Fil','Vezir','Kale','Şah'][i%6],true)}s.targets=targets;s.selected=new Set();app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="m262Home()">⌂</button><b>${c.title}</b><span>${s.round+1}/5</span></header><main class="m262-game"><div class="v261-instruction">${s.round<4?`${c.name} tek hamlede hangi meyveleri alabilir? Dokunup çember içine al.`:`${c.name} tek hamlede hangi rakip taşları alabilir?`}</div>${m262Board(board,'m263-quiz')}<div class="v261-actions"><button class="retry" onclick="m263PieceQuiz()">↻ Temizle</button><button onclick="m263PieceCheck()">✓ Kontrol Et</button></div></main>`;document.querySelectorAll('.m263-quiz .m262-sq').forEach(q=>{if(q.dataset.key===pos||!q.innerHTML)return;q.onclick=()=>m263Circle(q,s.selected,q.dataset.key)})}
function m263PieceCheck(){const s=window._m263piece;let ok=true;s.targets.forEach(t=>{const q=document.querySelector(`.m263-quiz [data-key="${t.k}"]`),sel=s.selected.has(t.k);if(sel!==t.reachable){ok=false;q?.classList.add('m262-wrong')}});if(!ok)return modal(`<h2>Bir daha bakalım 🌱</h2><p>Neon kırmızı işaretlenenleri yeniden düşün.</p><div class="modal-actions"><button onclick="closeModal()">Yeniden Dene</button></div>`);if(s.round<4){s.round++;m263PieceQuiz()}else modal(`<h2>Aferin! 🎉</h2><p>${M263_PIECES[s.type].name} oyununu tamamladın.</p><div class="modal-actions"><button onclick="closeModal();m262Home()">Ana Sayfa</button></div>`)}

/* v2.6.3: kare tahta, taş hizası, çember sesi */
const _m262FixRender263=m262FixRender;m262FixRender=function(){_m262FixRender263();const s=window._m262fix;document.querySelectorAll('.fix-board .m262-sq').forEach(b=>{if(!b.innerHTML)return;b.onclick=()=>m263Circle(b,s.selected,b.dataset.key)})};
const _m262RookQuiz263=m262RookQuiz;m262RookQuiz=function(){_m262RookQuiz263();const s=window._m262rook,pos=['d4','b6','g3','a5','e4'][s.round];document.querySelectorAll('.rook-quiz .m262-sq').forEach(q=>{if(q.dataset.key===pos||!q.innerHTML)return;q.onclick=()=>m263Circle(q,s.selected,q.dataset.key)})};

/* Sayaç: sürekli tik, tema final sesleri ve eriyen mum */
M262_TIMER.candle={name:'Eriyen Mum',icon:'🕯️'};MINOO_TIMER_THEMES.candle={name:'Eriyen Mum',icon:'🕯️',end:'💨'};
function m263Fx(kind){if(!minooTimer.sound)return;try{const A=window.AudioContext||window.webkitAudioContext,a=new A();if(kind==='boom'){for(let j=0;j<2;j++){const n=a.createBufferSource(),b=a.createBuffer(1,a.sampleRate*.7,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);const g=a.createGain();g.gain.value=.32;n.buffer=b;n.connect(g);g.connect(a.destination);n.start(a.currentTime+j*.08)}}else if(kind==='rocket'){const o=a.createOscillator(),g=a.createGain();o.type='sawtooth';o.frequency.setValueAtTime(90,a.currentTime);o.frequency.exponentialRampToValueAtTime(700,a.currentTime+1);g.gain.setValueAtTime(.12,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+1.1);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+1.1)}else m262Beep(700,.25,.08)}catch{}}
const _timerRender263=timerRender;timerRender=function(){if(minooTimer.theme!=='candle')return _timerRender263();const p=minooTimer.total?1-minooTimer.left/minooTimer.total:0,done=minooTimer.left<=0,h=Math.max(8,150*(1-p));app.innerHTML=`<main class="timer-stage m262-timer theme-candle"><button class="timer-back" onclick="timerTool()">←</button><button class="timer-sound" onclick="minooTimer.sound=!minooTimer.sound;timerRender()">${minooTimer.sound?'🔊':'🔇'}</button><div class="timer-clock">${timerFmt(minooTimer.left)}</div><div class="m262-ring"><div class="m263-candle"><div class="flame ${done?'out':''}">${done?'💨':'🔥'}</div><div class="wax" style="height:${h}px"><i></i></div></div></div><div class="timer-stage-controls">${done?`<button onclick="timerStartScreen()">↻ Yeniden Başlat</button>`:`<button onclick="timerToggleRun()">${minooTimer.running?'⏸ Duraklat':'▶ Başlat'}</button><button class="ghost" onclick="timerReset()">↻ Sıfırla</button>`}</div></main>`}
timerToggleRun=function(){minooTimer.running=!minooTimer.running;clearInterval(minooTimer.interval);if(minooTimer.running){minooTimer.interval=setInterval(()=>{minooTimer.left=Math.max(0,minooTimer.left-1);m262Beep(minooTimer.left<=10?520:300,.045,.018);if(minooTimer.left<=0){clearInterval(minooTimer.interval);minooTimer.running=false;if(minooTimer.theme==='bomb')m263Fx('boom');else if(minooTimer.theme==='rocket')m263Fx('rocket');else m263Fx('end')}timerRender()},1000)}timerRender()}

const _playGame263=playGame;playGame=function(g){if(g.game_type==='bishop_capture')return pieceLearnGame(g,'bishop');if(g.game_type==='queen_capture')return pieceLearnGame(g,'queen');if(g.game_type==='knight_capture')return pieceLearnGame(g,'knight');if(g.game_type==='king_capture')return pieceLearnGame(g,'king');if(g.game_type==='pawn_capture')return pieceLearnGame(g,'pawn');return _playGame263(g)};
const _v261Label263=v261Label;v261Label=function(t){const x={bishop_capture:'♝ Filin Hareketi ve Taş Alması',queen_capture:'♛ Vezirin Hareketi ve Taş Alması',knight_capture:'♞ Atın Hareketi ve Taş Alması',king_capture:'♚ Şahın Hareketi ve Taş Alması',pawn_capture:'♟ Piyonun Hareketi ve Taş Alması'};return x[t]||_v261Label263(t)};

document.head.insertAdjacentHTML('beforeend',`<style id="minoo263">
.m262-board{grid-template-columns:repeat(8,minmax(0,1fr))!important;grid-template-rows:repeat(8,minmax(0,1fr))!important;width:min(92vw,620px)!important;height:auto!important;aspect-ratio:1/1!important}.m262-sq{width:100%!important;height:100%!important;aspect-ratio:1/1!important;overflow:visible!important;line-height:1!important}.m262-sq .v261-piece{width:72%!important;height:72%!important;max-width:72%!important;max-height:72%!important;display:grid!important;place-items:center!important;transform:none!important;margin:0!important}.m262-sq .v261-piece svg{width:100%!important;height:100%!important;display:block!important}.m262-sq.circled:before{inset:9%!important;border-radius:50%!important;animation:m263Circle .28s ease-out both!important}.m263-arrow{stroke:#ef5350!important;stroke-width:1.15%!important}.m263-candle{height:250px;width:170px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;position:relative;z-index:3}.m263-candle .wax{width:95px;min-height:8px;background:linear-gradient(90deg,#ffd66b,#fff0a8,#ffc64f);border-radius:18px 18px 10px 10px;position:relative;transition:height .8s linear;box-shadow:inset -12px 0 16px #e8a72f55,0 12px 20px #0004}.m263-candle .wax:before{content:'';position:absolute;top:-8px;left:8px;width:78px;height:18px;background:#ffe38b;border-radius:50%}.m263-candle .wax i{position:absolute;right:10px;top:12px;width:12px;height:34px;border-radius:10px;background:#ffd35f}.m263-candle .flame{font-size:58px;animation:m262Vibe .4s infinite alternate;z-index:4;margin-bottom:-8px}.m263-candle .flame.out{animation:none;font-size:48px}.theme-candle{background:linear-gradient(#253044,#101725)!important}@keyframes m263Circle{from{transform:scale(.65) rotate(-8deg);opacity:.2}to{transform:scale(1);opacity:1}}
</style>`);
setTimeout(()=>document.querySelectorAll('.logo span,header small').forEach(x=>{if(/v2\.6\.[0-9]+/.test(x.textContent))x.textContent=x.textContent.replace(/v2\.6\.[0-9]+/,'v2.6.3')}),0);


/* ===== Minoo v2.6.4 • Atölye alanları + Fen renk karışımı + Türkçe harf yazma ===== */
const MINOO_VERSION='v2.8.0';

function atelierHome(){
  modal(`<button class="modal-x" onclick="closeModal()">×</button>
  <h2>🎨 Minoo Oyun Atölyesi</h2>
  <p class="hint">Bir öğrenme alanı seçin.</p>
  <div class="m264-subjects">
    <button onclick="m264MathHome()"><span>🔢</span><b>Matematik</b><small>Matematik ve Geometri-Uzaysal Algı</small></button>
    <button onclick="m264TurkishHome()"><span>📖</span><b>Türkçe</b><small>Okuma Yazma</small></button>
    <button onclick="m264ScienceHome()"><span>🔬</span><b>Fen</b><small>Keşfet ve deney yap</small></button>
    <button onclick="m264EnglishHome()"><span>🇬🇧</span><b>İngilizce</b><small>İçerikler yakında</small></button>
  </div>`);
}
function m264MathHome(){
  modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>🔢 Matematik</h2>
  <div class="m264-subjects two">
    <button onclick="m264MathGames()"><span>🔢</span><b>Matematik</b><small>Eşleştirme, sınıflandırma, karşılaştırma, sıralama</small></button>
    <button onclick="notify('Geometri ve Uzaysal Algı oyunlarını birlikte ekleyeceğiz.')"><span>📐</span><b>Geometri ve Uzaysal Algı</b><small>Yeni oyun alanı</small></button>
  </div><div class="modal-actions"><button class="ghost" onclick="atelierHome()">← Geri</button></div>`);
}
function m264MathGames(){
  modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>🔢 Matematik Oyunları</h2>
  <div class="atelier-path">
    <button onclick="atelierFormC('atelier_matching')"><b>1. Eşleştirme</b><small>İlişkiyi fark et</small></button>
    <button onclick="atelierFormC('classification')"><b>2. Sınıflandırma</b><small>Ortak özelliğe göre grupla</small></button>
    <button onclick="atelierFormC('comparison')"><b>3. Karşılaştırma</b><small>Özellikleri karşılaştır</small></button>
    <button onclick="atelierFormC('ordering')"><b>4. Sıralama</b><small>Bir kurala göre sırala</small></button>
  </div><div class="modal-actions"><button class="ghost" onclick="m264MathHome()">← Geri</button></div>`);
}
function m264EnglishHome(){
  modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>🇬🇧 İngilizce</h2><p class="hint">İngilizce alanı hazır. Oyunları sonraki adımda birlikte ekleyeceğiz.</p><div class="modal-actions"><button class="ghost" onclick="atelierHome()">← Geri</button></div>`);
}
function m264ScienceHome(){
  modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>🔬 Fen</h2>
  <div class="m264-feature"><span>🎨</span><div><b>Renkleri Karıştırıyorum</b><small>Önce keşfet, sonra hangi rengin oluşacağını bul.</small></div></div>
  <div class="modal-actions"><button class="ghost" onclick="atelierHome()">← Geri</button><button onclick="closeModal();m264ColorGame({game_type:'science_color_mix',title:'Renkleri Karıştırıyorum'})">▶ Önizle</button><button onclick="m264AddBuiltIn('science_color_mix','Renkleri Karıştırıyorum')">＋ Kütüphaneye Ekle</button></div>`);
}
function m264TurkishHome(){
  modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>📖 Türkçe</h2>
  <div class="m264-feature"><span>✍️</span><div><b>Okuma Yazma</b><small>29 harfin yazılışını izle, noktalı harfin üzerinden parmağınla çiz.</small></div></div>
  <div class="modal-actions"><button class="ghost" onclick="atelierHome()">← Geri</button><button onclick="closeModal();m264LetterGame({game_type:'turkish_letters',title:'Harfleri Yazıyorum'})">▶ Önizle</button><button onclick="m264AddBuiltIn('turkish_letters','Harfleri Yazıyorum')">＋ Kütüphaneye Ekle</button></div>`);
}
async function m264AddBuiltIn(type,title){
  try{await api('/api/games',{method:'POST',body:JSON.stringify({title,game_type:type,game_data:{age:'4-6 yaş',built_in:true}})});closeModal();dashboard();notify('Oyun kütüphaneye eklendi ✓')}
  catch(e){notify(e.message)}
}

/* Fen • renk karıştırma */
const M264_MIXES=[
 ['#ffd928','#2387e8','#45ad55','Sarı','Mavi','Yeşil'],
 ['#ef4a4a','#ffd928','#f28a25','Kırmızı','Sarı','Turuncu'],
 ['#ef4a4a','#3978df','#8b5bc2','Kırmızı','Mavi','Mor'],
 ['#ef4a4a','#ffffff','#f5a4b8','Kırmızı','Beyaz','Pembe'],
 ['#f28a25','#ffffff','#f7bd82','Turuncu','Beyaz','Açık turuncu'],
 ['#222831','#ffffff','#9aa0a6','Siyah','Beyaz','Gri']
];
function m264ColorGame(g){window._m264mix={g,phase:'learn',i:0,selected:null};m264MixRender()}
function m264MixRender(){
 const s=window._m264mix,m=M264_MIXES[s.i];
 if(s.phase==='learn'){
  app.innerHTML=`<header><button class="ghost" onclick="m262Home()">⌂ Ana Sayfa</button><b>🔬 Renkleri Karıştırıyorum</b><span>${s.i+1}/${M264_MIXES.length}</span></header>
  <main class="m264-mix"><h1>Renkleri keşfedelim!</h1><p>İki renge dokun. Boyalar karışsın.</p>
  <div class="mix-lab"><button class="paint ${s.a?'on':''}" style="--c:${m[0]}" onclick="m264MixTap(1)"><i></i><b>${m[3]}</b></button>
  <div class="mix-center ${s.a&&s.b?'mixed':''}" style="--mix:${m[2]}"><span>+</span><i></i></div>
  <button class="paint ${s.b?'on':''}" style="--c:${m[1]}" onclick="m264MixTap(2)"><i></i><b>${m[4]}</b></button></div>
  <div class="mix-result">${s.a&&s.b?`<b style="--mix:${m[2]}"></b><strong>${m[5]}!</strong>`:'<span>İki rengi seç 👆</span>'}</div>
  <div class="v261-actions"><button class="ghost" onclick="m264MixPrev()">← Geri</button><button onclick="m264MixNext()">İleri →</button></div></main>`;
 }else m264MixQuiz();
}
function m264MixTap(n){const s=window._m264mix;s[n===1?'a':'b']=true;m264MixRender();if(s.a&&s.b)m263Speak(`${M264_MIXES[s.i][3]} ile ${M264_MIXES[s.i][4]} karışınca ${M264_MIXES[s.i][5]} olur.`)}
function m264MixPrev(){const s=window._m264mix;if(s.i>0){s.i--;s.a=s.b=false;m264MixRender()}}
function m264MixNext(){const s=window._m264mix;if(s.i<M264_MIXES.length-1){s.i++;s.a=s.b=false;m264MixRender()}else{s.phase='quiz';s.i=0;m264MixRender()}}
function m264MixQuiz(){
 const s=window._m264mix,m=M264_MIXES[s.i],alts=M264_MIXES.filter(x=>x!==m).map(x=>[x[2],x[5]]),opts=[[m[2],m[5]],alts[(s.i+1)%alts.length],alts[(s.i+3)%alts.length]].sort((a,b)=>((a[1].charCodeAt(0)+s.i)%3)-((b[1].charCodeAt(0)+s.i)%3));
 app.innerHTML=`<header><button class="ghost" onclick="m262Home()">⌂ Ana Sayfa</button><b>🔬 Renkleri Karıştırıyorum</b><span>Soru ${s.i+1}/${M264_MIXES.length}</span></header>
 <main class="m264-mix"><h1>${m[3]} + ${m[4]} = ?</h1><p>${m[3]} ile ${m[4]} karışınca hangi renk olur?</p>
 <div class="mix-question"><i style="--c:${m[0]}"></i><span>＋</span><i style="--c:${m[1]}"></i></div>
 <div class="mix-options">${opts.map(o=>`<button class="${s.selected===o[1]?'selected':''}" onclick="window._m264mix.selected='${o[1]}';m264MixQuiz()"><i style="--c:${o[0]}"></i><b>${o[1]}</b></button>`).join('')}</div>
 <div class="v261-actions"><button onclick="m264MixCheck()">✓ Kontrol Et</button></div></main>`;
}
function m264MixCheck(){const s=window._m264mix,m=M264_MIXES[s.i];if(!s.selected)return notify('Önce bir renk seç 🌈');if(s.selected!==m[5]){document.querySelector('.mix-options .selected')?.classList.add('m262-wrong');return notify('Bir daha deneyelim 🌱')}m263Speak('Aferin! Doğru renk.');if(s.i<M264_MIXES.length-1){s.i++;s.selected=null;setTimeout(m264MixQuiz,450)}else modal(`<h2>Aferin! 🌈</h2><p>Renk karışımlarını tamamladın.</p><div class="modal-actions"><button onclick="closeModal();m262Home()">Ana Sayfa</button></div>`)}

/* Türkçe • 29 harf, öğretici + parmakla izleme */
const M264_LETTERS=[...'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'];
function m264LetterGame(g){window._m264letter={g,i:0,phase:'learn',drawing:false,points:[],coverage:0};m264LetterRender()}
function m264LetterRender(){
 const s=window._m264letter,L=M264_LETTERS[s.i];
 app.innerHTML=`<header><button class="ghost" onclick="m262Home()">⌂ Ana Sayfa</button><b>📖 Okuma Yazma • Harfleri Yazıyorum</b><span>${s.i+1}/${M264_LETTERS.length}</span></header>
 <main class="m264-letter"><h1>${L} harfini ${s.phase==='learn'?'öğrenelim':'sen yaz'}</h1>
 <p>${s.phase==='learn'?'Kayan oku izle. Harfin üzerinden nasıl gidildiğine bakalım.':'Parmağını kaldırmadan noktalı harfin üzerinden çiz.'}</p>
 <div class="trace-wrap"><canvas id="traceCanvas" width="700" height="520"></canvas>${s.phase==='learn'?'<div class="trace-arrow">➤</div>':''}</div>
 <div class="v261-actions">${s.phase==='learn'?`<button onclick="m264ReplayLetter()">↻ Tekrar Göster</button><button onclick="window._m264letter.phase='trace';m264LetterRender()">Şimdi Ben Çizeyim →</button>`:`<button class="retry" onclick="m264ClearTrace()">↻ Temizle</button><button onclick="m264CheckTrace()">✓ Kontrol Et</button>`}</div></main>`;
 setTimeout(()=>m264InitTrace(),30)
}
function m264CanvasLetter(ctx,L,solid=false){
 ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='900 360px Arial, sans-serif';ctx.lineWidth=solid?18:8;ctx.setLineDash(solid?[]:[7,13]);ctx.strokeStyle=solid?'#74c6ff':'#9aa9ba';ctx.globalAlpha=solid?.32:.8;ctx.strokeText(L,350,265);ctx.restore()
}
function m264InitTrace(){
 const s=window._m264letter,c=document.querySelector('#traceCanvas');if(!c)return;const ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);m264CanvasLetter(ctx,M264_LETTERS[s.i],false);
 if(s.phase==='learn'){m264CanvasLetter(ctx,M264_LETTERS[s.i],true);const a=document.querySelector('.trace-arrow');a?.classList.add('go')}
 else{
  c.style.touchAction='none';
  const pos=e=>{const r=c.getBoundingClientRect(),p=e.touches?.[0]||e;return [(p.clientX-r.left)*c.width/r.width,(p.clientY-r.top)*c.height/r.height]};
  const start=e=>{e.preventDefault();s.drawing=true;const p=pos(e);s.points.push(p);ctx.beginPath();ctx.moveTo(...p)};
  const move=e=>{if(!s.drawing)return;e.preventDefault();const p=pos(e);s.points.push(p);ctx.lineTo(...p);ctx.strokeStyle='#425fda';ctx.lineWidth=22;ctx.lineCap='round';ctx.lineJoin='round';ctx.setLineDash([]);ctx.stroke()};
  const end=e=>{e.preventDefault();s.drawing=false};
  c.addEventListener('pointerdown',start);c.addEventListener('pointermove',move);c.addEventListener('pointerup',end);c.addEventListener('pointercancel',end);
 }
}
function m264ReplayLetter(){m264LetterRender()}
function m264ClearTrace(){window._m264letter.points=[];m264LetterRender()}
function m264CheckTrace(){
 const s=window._m264letter;if(s.points.length<18)return notify('Harfin üzerinden biraz daha çizelim ✍️');
 const c=document.querySelector('#traceCanvas'),ctx=c.getContext('2d'),L=M264_LETTERS[s.i];
 const off=document.createElement('canvas');off.width=c.width;off.height=c.height;const o=off.getContext('2d');o.textAlign='center';o.textBaseline='middle';o.font='900 360px Arial, sans-serif';o.lineWidth=42;o.strokeStyle='#000';o.strokeText(L,350,265);
 const data=o.getImageData(0,0,off.width,off.height).data;let inside=0;
 for(const [x,y] of s.points){const ix=Math.max(0,Math.min(699,Math.round(x))),iy=Math.max(0,Math.min(519,Math.round(y)));if(data[(iy*700+ix)*4+3]>0)inside++}
 const ratio=inside/Math.max(1,s.points.length);
 if(ratio<.72){document.querySelector('.trace-wrap')?.classList.add('m262-wrong');return notify('Çizgiyi noktalı harfin üzerinde tutalım. Yeniden deneyebilirsin 🌱')}
 m263Speak('Aferin! Harfi çok güzel takip ettin.');
 if(s.i<M264_LETTERS.length-1){s.i++;s.phase='learn';s.points=[];setTimeout(m264LetterRender,500)}
 else modal(`<h2>Aferin! 🎉</h2><p>Alfabedeki bütün harfleri tamamladın.</p><div class="modal-actions"><button onclick="closeModal();m262Home()">Ana Sayfa</button></div>`)
}

const _playGame264=playGame;playGame=function(g){if(g.game_type==='science_color_mix')return m264ColorGame(g);if(g.game_type==='turkish_letters')return m264LetterGame(g);return _playGame264(g)};
const _v261Label264=v261Label;v261Label=function(t){return t==='science_color_mix'?'🔬 Renkleri Karıştırıyorum':t==='turkish_letters'?'✍️ Harfleri Yazıyorum':_v261Label264(t)};

/* sürüm etiketini tek yerden güncelle */
setInterval(()=>document.querySelectorAll('.logo span,header small').forEach(x=>{if(/^v\d/.test(x.textContent.trim()))x.textContent=MINOO_VERSION}),700);

document.head.insertAdjacentHTML('beforeend',`<style id="minoo264">
.m264-subjects{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.m264-subjects button{min-height:145px;border-radius:24px!important;background:#fff!important;color:#2d4057!important;border:2px solid #e7e5df!important;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;text-align:left;gap:5px}.m264-subjects button span{font-size:34px}.m264-subjects button b{font-size:20px}.m264-subjects button small{opacity:.72}.m264-feature{display:flex;gap:18px;align-items:center;padding:22px;border:2px solid #ece7de;border-radius:24px;background:#fffdf9}.m264-feature>span{font-size:52px}.m264-feature div{display:flex;flex-direction:column;gap:6px}.m264-feature b{font-size:22px}
.m264-mix,.m264-letter{max-width:900px;margin:auto;padding:22px;text-align:center}.mix-lab{display:grid;grid-template-columns:1fr 130px 1fr;align-items:center;gap:16px;margin:30px auto}.paint{background:#fff!important;color:#31445b!important;border:3px solid #ece8df!important;border-radius:28px!important;min-height:190px}.paint i,.mix-question i,.mix-options i{display:block;width:95px;height:95px;margin:auto;border-radius:50%;background:var(--c);border:4px solid rgba(0,0,0,.08);box-shadow:inset 0 10px 16px rgba(255,255,255,.35),0 9px 20px rgba(0,0,0,.12)}.paint.on{transform:scale(1.04);box-shadow:0 0 0 5px rgba(95,181,255,.25)}.mix-center{font-size:45px}.mix-center i{display:none}.mix-center.mixed span{display:none}.mix-center.mixed i{display:block;width:105px;height:105px;border-radius:44% 56% 51% 49%;background:var(--mix);animation:mixBlob .65s ease both}.mix-result{min-height:85px;font-size:28px;display:flex;gap:15px;align-items:center;justify-content:center}.mix-result b{width:58px;height:58px;border-radius:50%;background:var(--mix)}.mix-question{display:flex;gap:24px;align-items:center;justify-content:center;font-size:42px;margin:24px}.mix-options{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.mix-options button{background:#fff!important;color:#31445b!important;border:3px solid #ece8df!important;border-radius:24px!important;min-height:160px}.mix-options button.selected{border-color:#5277e8!important;box-shadow:0 0 0 5px rgba(82,119,232,.18)}.mix-options button.m262-wrong{border-color:#ff1744!important;box-shadow:0 0 18px #ff1744!important}
.trace-wrap{position:relative;width:min(700px,94vw);aspect-ratio:700/520;margin:18px auto;background:#fff;border-radius:30px;box-shadow:0 10px 28px rgba(50,65,80,.12);overflow:hidden}.trace-wrap canvas{width:100%;height:100%;display:block}.trace-arrow{position:absolute;left:19%;top:18%;font-size:48px;color:#ff7043;filter:drop-shadow(0 3px 3px rgba(0,0,0,.2));opacity:0}.trace-arrow.go{animation:traceGuide 4.2s ease-in-out infinite}.trace-wrap.m262-wrong{box-shadow:0 0 0 5px #ff1744,0 0 22px rgba(255,23,68,.45)}
@keyframes mixBlob{from{transform:scale(.25) rotate(-20deg);opacity:.2}to{transform:scale(1) rotate(0);opacity:1}}@keyframes traceGuide{0%{left:25%;top:72%;opacity:0}8%{opacity:1}30%{left:50%;top:16%}52%{left:75%;top:72%}72%{left:35%;top:48%}92%{left:67%;top:48%;opacity:1}100%{opacity:0}}
@media(max-width:650px){.m264-subjects{grid-template-columns:1fr}.mix-lab{grid-template-columns:1fr 70px 1fr;gap:6px}.paint{min-height:145px;padding:10px!important}.paint i,.mix-question i,.mix-options i{width:65px;height:65px}.mix-options{grid-template-columns:1fr}.mix-options button{min-height:110px;display:flex;align-items:center;justify-content:center;gap:16px}.mix-options i{margin:0}.m264-mix,.m264-letter{padding:12px}.trace-arrow{font-size:34px}}
</style>`);


/* ===== Minoo v2.6.5 • toplu düzeltme ===== */
const MINOO_VERSION_265='v2.8.0';

/* Güvenli ortak ana sayfa */
async function m265Home(){
  try{
    closeModal();
    if(window.speechSynthesis) speechSynthesis.cancel();
    if(window._m265raf) cancelAnimationFrame(window._m265raf);
    if(typeof teacherPreviewMode!=='undefined' && teacherPreviewMode) return previewBack();
    if(typeof studentSession!=='undefined' && studentSession && studentSession.id) return await studentDash();
    if((typeof teacherPass!=='undefined' && teacherPass)||(typeof teacherToken!=='undefined' && teacherToken)) return await dashboard();
    return home();
  }catch(e){
    if((teacherPass||teacherToken)) return dashboard();
    return home();
  }
}
m262Home=m265Home;

/* Satranç öğretici okları: kesintisiz, gerçek ok ucu; At gerçek L */
function m263ShowMoves(type,pos){
 const svg=document.querySelector('.m262-overlay'); if(!svg)return;
 const [f,r]=m263Coord(pos), fy=8-r+.5, fx=f+.5, c=M263_PIECES[type], ends=[];
 if(c.jumps||c.pawn) ends.push(...m263Targets(type,pos));
 else c.dirs.forEach(([df,dr])=>{let x=f,y=r,k;while((k=m263Key(x+df,y+dr))){x+=df;y+=dr;if(c.one)break}if(x!==f||y!==r)ends.push(m263Key(x,y))});
 const defs=`<defs><marker id="m265arr" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#ef476f"/></marker></defs>`;
 svg.innerHTML=defs+ends.map((k,i)=>{
   const [x,y]=m263Coord(k), ex=(x+.5)*12.5, ey=(8-y+.5)*12.5, sx=fx*12.5, sy=fy*12.5;
   if(type==='knight'){
     const df=x-f,dr=y-r;
     let mx,my;
     if(Math.abs(df)===2){mx=(f+df)*12.5+6.25;my=sy}else{mx=sx;my=(8-(r+dr)+.5)*12.5}
     return `<polyline class="m265-move" points="${sx},${sy} ${mx},${my} ${ex},${ey}" marker-end="url(#m265arr)" style="animation-delay:${i*.12}s"/>`;
   }
   return `<line class="m265-move" x1="${sx}%" y1="${sy}%" x2="${ex}%" y2="${ey}%" marker-end="url(#m265arr)" style="animation-delay:${i*.12}s"/>`
 }).join('');
}

/* Taş alma: sonsuz döngü yok + tek hamlede ilk engel */
function m265Reachable(type,pos,occupied){
 const c=M263_PIECES[type],[f,r]=m263Coord(pos),out=[];
 if(c.jumps)c.jumps.forEach(([df,dr])=>{const k=m263Key(f+df,r+dr);if(k&&occupied.has(k))out.push(k)});
 else if(c.pawn)[-1,1].forEach(df=>{const k=m263Key(f+df,r+1);if(k&&occupied.has(k))out.push(k)});
 else c.dirs.forEach(([df,dr])=>{let x=f+df,y=r+dr;while(1){const k=m263Key(x,y);if(!k)break;if(occupied.has(k)){out.push(k);break}if(c.one)break;x+=df;y+=dr}});
 return out;
}
function m263PieceQuiz(){
 const s=window._m263piece,c=M263_PIECES[s.type],pos=c.positions[s.round%3],board={[pos]:m262Piece(c.name,false)};
 const all=[];for(let r=1;r<=8;r++)for(const f of M262_FILES){const k=f+r;if(k!==pos)all.push(k)}
 const seed=s.round*11+s.type.length*7;
 const ordered=all.slice().sort((a,b)=>((a.charCodeAt(0)*17+Number(a[1])*13+seed)%97)-((b.charCodeAt(0)*17+Number(b[1])*13+seed)%97));
 const natural=m263Targets(s.type,pos);
 let picks=[];
 /* en az birkaç yasal hat üzerinde hedef */
 for(const k of natural){if(!picks.includes(k)&&picks.length<3)picks.push(k)}
 for(const k of ordered){if(!picks.includes(k)&&picks.length<6)picks.push(k)}
 const occupied=new Set(picks), reachable=new Set(m265Reachable(s.type,pos,occupied));
 s.targets=picks.map((k,i)=>({k,reachable:reachable.has(k)}));s.selected=new Set();
 picks.forEach((k,i)=>board[k]=s.round<4?M263_FRUIT[i%M263_FRUIT.length]:m262Piece(['Piyon','At','Fil','Vezir','Kale','Şah'][i%6],true));
 app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="m265Home()">⌂ Ana Sayfa</button><b>${c.title}</b><span>${s.round+1}/5</span></header><main class="m262-game"><div class="v261-instruction">${c.name} <b>tek hamlede</b> hangi ${s.round<4?'meyveleri':'rakip taşları'} alabilir? Alabileceklerini çember içine al.</div>${m262Board(board,'m263-quiz')}<div class="v261-actions"><button class="retry" onclick="m263PieceQuiz()">↻ Temizle</button><button onclick="m263PieceCheck()">✓ Kontrol Et</button></div></main>`;
 document.querySelectorAll('.m263-quiz .m262-sq').forEach(q=>{if(q.dataset.key===pos||!q.innerHTML)return;q.onclick=()=>m263Circle(q,s.selected,q.dataset.key)})
}
function m263PieceCheck(){
 const s=window._m263piece;let ok=true;
 s.targets.forEach(t=>{const q=document.querySelector(`.m263-quiz [data-key="${t.k}"]`),sel=s.selected.has(t.k);q?.classList.remove('m262-wrong');if(sel!==t.reachable){ok=false;q?.classList.add('m262-wrong')}});
 if(!ok)return modal(`<h2>Bir daha bakalım 🌱</h2><p>Yalnızca <b>tek hamlede</b> alınabilen hedefleri düşün.</p><div class="modal-actions"><button onclick="closeModal()">Yeniden Dene</button><button class="ghost" onclick="closeModal();m265Home()">Ana Sayfa</button></div>`);
 if(s.round<4){s.round++;return setTimeout(m263PieceQuiz,80)}
 modal(`<h2>Aferin! 🎉</h2><p>${M263_PIECES[s.type].name} oyununu tamamladın.</p><div class="modal-actions"><button onclick="closeModal();m265Home()">Ana Sayfa</button></div>`)
}

/* Harfler: kalın font çevresi değil, gerçek yazım vuruşları */
const M265_STROKES={
 A:[[[25,85],[50,15],[75,85]],[[35,58],[65,58]]],
 B:[[[28,15],[28,85]],[[28,15],[57,15],[70,25],[70,38],[58,48],[28,48]],[[28,48],[60,48],[73,59],[73,74],[60,85],[28,85]]],
 C:[[[75,25],[62,15],[40,15],[25,30],[20,50],[25,70],[40,85],[62,85],[75,75]]],
 Ç:[[[75,25],[62,15],[40,15],[25,30],[20,50],[25,70],[40,85],[62,85],[75,75]],[[48,87],[45,96],[55,96]]],
 D:[[[28,15],[28,85]],[[28,15],[55,15],[72,30],[72,70],[55,85],[28,85]]],
 E:[[[70,15],[28,15],[28,85],[70,85]],[[28,50],[62,50]]],
 F:[[[28,85],[28,15],[72,15]],[[28,50],[62,50]]],
 G:[[[75,27],[63,15],[40,15],[24,31],[20,52],[27,72],[42,85],[66,83],[76,70],[76,55],[55,55]]],
 Ğ:[[[75,27],[63,15],[40,15],[24,31],[20,52],[27,72],[42,85],[66,83],[76,70],[76,55],[55,55]],[[38,5],[48,11],[58,5]]],
 H:[[[27,15],[27,85]],[[73,15],[73,85]],[[27,50],[73,50]]],
 I:[[[50,15],[50,85]]], İ:[[[50,15],[50,85]],[[50,5],[50,5]]],
 J:[[[70,15],[70,68],[62,82],[47,86],[33,80],[28,68]]],
 K:[[[28,15],[28,85]],[[72,15],[28,53],[74,85]]],
 L:[[[28,15],[28,85],[72,85]]],
 M:[[[22,85],[22,15],[50,55],[78,15],[78,85]]],
 N:[[[25,85],[25,15],[75,85],[75,15]]],
 O:[[[50,15],[35,18],[23,32],[20,52],[27,72],[40,84],[58,84],[73,70],[78,50],[73,30],[60,16],[50,15]]],
 Ö:[[[50,15],[35,18],[23,32],[20,52],[27,72],[40,84],[58,84],[73,70],[78,50],[73,30],[60,16],[50,15]],[[38,5],[38,5]],[[62,5],[62,5]]],
 P:[[[28,85],[28,15],[58,15],[72,26],[72,40],[59,51],[28,51]]],
 R:[[[28,85],[28,15],[58,15],[72,26],[72,40],[59,51],[28,51]],[[52,51],[76,85]]],
 S:[[[74,25],[62,15],[40,15],[26,27],[28,42],[42,50],[61,53],[74,64],[72,77],[60,85],[39,85],[25,75]]],
 Ş:[[[74,25],[62,15],[40,15],[26,27],[28,42],[42,50],[61,53],[74,64],[72,77],[60,85],[39,85],[25,75]],[[48,87],[45,96],[55,96]]],
 T:[[[20,15],[80,15]],[[50,15],[50,85]]],
 U:[[[25,15],[25,65],[33,80],[48,86],[63,80],[75,65],[75,15]]],
 Ü:[[[25,15],[25,65],[33,80],[48,86],[63,80],[75,65],[75,15]],[[38,5],[38,5]],[[62,5],[62,5]]],
 V:[[[20,15],[50,85],[80,15]]],
 Y:[[[20,15],[50,50],[80,15]],[[50,50],[50,85]]],
 Z:[[[22,15],[78,15],[22,85],[78,85]]]
};
function m265LetterCanvas(){
 const s=window._m264letter,c=document.querySelector('#traceCanvas');if(!c)return;const ctx=c.getContext('2d'),L=M264_LETTERS[s.i],st=M265_STROKES[L]||[];
 ctx.clearRect(0,0,c.width,c.height);ctx.lineCap='round';ctx.lineJoin='round';
 st.forEach((stroke,si)=>{ctx.beginPath();stroke.forEach((p,j)=>{const x=p[0]/100*c.width,y=p[1]/100*c.height;j?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle='#a9c9e9';ctx.lineWidth=18;ctx.setLineDash([3,18]);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#4f79a8';ctx.font='bold 20px Arial';ctx.fillText(String(si+1),stroke[0][0]/100*c.width-12,stroke[0][1]/100*c.height-10)});
 if(s.phase==='learn')m265AnimateStroke(c,st);
 else m265EnableTrace(c,st);
}
function m265AnimateStroke(c,st){
 const ctx=c.getContext('2d');let si=0,pi=0;
 function next(){
  if(si>=st.length)return;
  const stroke=st[si];if(pi===0){ctx.beginPath();ctx.moveTo(stroke[0][0]/100*c.width,stroke[0][1]/100*c.height);pi=1}
  if(pi<stroke.length){const p=stroke[pi++];ctx.lineTo(p[0]/100*c.width,p[1]/100*c.height);ctx.strokeStyle='#ef6b5b';ctx.lineWidth=9;ctx.setLineDash([]);ctx.stroke();window._m265raf=requestAnimationFrame(next)}
  else{si++;pi=0;setTimeout(next,280)}
 } next()
}
function m265EnableTrace(c,st){
 const s=window._m264letter,ctx=c.getContext('2d');s.points=[];s.strokeIndex=0;c.style.touchAction='none';
 const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
 c.onpointerdown=e=>{e.preventDefault();s.drawing=true;const p=pos(e);s.points.push(p);ctx.beginPath();ctx.moveTo(...p)};
 c.onpointermove=e=>{if(!s.drawing)return;e.preventDefault();const p=pos(e);s.points.push(p);ctx.lineTo(...p);ctx.strokeStyle='#405fd1';ctx.lineWidth=13;ctx.lineCap='round';ctx.stroke()};
 c.onpointerup=c.onpointercancel=e=>{s.drawing=false};
}
m264InitTrace=m265LetterCanvas;
function m265DistPointSeg(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;if(!l)return Math.hypot(px-ax,py-ay);let t=((px-ax)*dx+(py-ay)*dy)/l;t=Math.max(0,Math.min(1,t));return Math.hypot(px-(ax+t*dx),py-(ay+t*dy))}
function m264CheckTrace(){
 const s=window._m264letter,L=M264_LETTERS[s.i],st=M265_STROKES[L]||[],c=document.querySelector('#traceCanvas');if(s.points.length<12)return notify('Harfin çizgisini parmağınla takip edelim ✍️');
 let good=0;for(const [x,y] of s.points){let d=1e9;for(const stroke of st)for(let j=1;j<stroke.length;j++){const a=stroke[j-1],b=stroke[j];d=Math.min(d,m265DistPointSeg(x,y,a[0]/100*c.width,a[1]/100*c.height,b[0]/100*c.width,b[1]/100*c.height))}if(d<42)good++}
 if(good/s.points.length<.68){document.querySelector('.trace-wrap')?.classList.add('m262-wrong');return notify('Çizgiyi harfin yazım yoluna yakın tutalım. Yeniden deneyebilirsin 🌱')}
 m263Speak('Aferin! Harfin yazım yolunu takip ettin.');if(s.i<M264_LETTERS.length-1){s.i++;s.phase='learn';s.points=[];setTimeout(m264LetterRender,350)}else modal(`<h2>Aferin! 🎉</h2><p>Alfabedeki bütün harfleri tamamladın.</p><div class="modal-actions"><button onclick="closeModal();m265Home()">Ana Sayfa</button></div>`)
}
function m265LetterBack(){const s=window._m264letter;if(s.phase==='trace'){s.phase='learn';s.points=[]}else if(s.i>0){s.i--;s.phase='learn';s.points=[]}else return m265Home();m264LetterRender()}
const _m264LetterRender265=m264LetterRender;
m264LetterRender=function(){_m264LetterRender265();const h=document.querySelector('header');if(h){const old=h.querySelector('button');if(old)old.outerHTML=`<div style="display:flex;gap:8px"><button class="ghost" onclick="m265LetterBack()">← Geri</button><button class="ghost" onclick="m265Home()">⌂ Ana Sayfa</button></div>`}};

/* İngilizce v2.8.0: önce öğretici, sonra 10 aşamalı test */
const M266_ENGLISH={
 body:{title:'Vücudun Bölümleri',icon:'🧍',items:[['👀','eyes'],['👂','ears'],['👃','nose'],['👄','mouth'],['✋','hand'],['🦶','foot'],['🦵','leg'],['💪','arm'],['🦷','teeth'],['👅','tongue']]},
 colors:{title:'Renkler',icon:'🎨',items:[['🔴','red'],['🔵','blue'],['🟡','yellow'],['🟢','green'],['🟠','orange'],['🟣','purple'],['⚫','black'],['⚪','white'],['🩷','pink'],['🟤','brown']]},
 numbers:{title:'Sayılar',icon:'🔢',items:[['1️⃣','one'],['2️⃣','two'],['3️⃣','three'],['4️⃣','four'],['5️⃣','five'],['6️⃣','six'],['7️⃣','seven'],['8️⃣','eight'],['9️⃣','nine'],['🔟','ten']]},
 animals:{title:'Hayvanlar',icon:'🐾',items:[['🐶','dog'],['🐱','cat'],['🐰','rabbit'],['🐦','bird'],['🐟','fish'],['🐘','elephant'],['🦁','lion'],['🐒','monkey'],['🐸','frog'],['🐴','horse']]},
 days:{title:'Günler',icon:'📅',items:[['1️⃣','Monday'],['2️⃣','Tuesday'],['3️⃣','Wednesday'],['4️⃣','Thursday'],['5️⃣','Friday'],['6️⃣','Saturday'],['7️⃣','Sunday'],['📅','Monday'],['⭐','Friday'],['🏡','Sunday']]},
 greetings:{title:'Selamlaşma',icon:'👋',items:[['👋','Hello'],['😊','Hi'],['🌅','Good morning'],['☀️','Good afternoon'],['🌙','Good evening'],['👋','Goodbye'],['🤗','See you'],['🙏','Thank you'],['🌟','You are welcome'],['🙂','How are you']]},
 meeting:{title:'Tanışma',icon:'🤝',items:[['🙋','My name is Minoo'],['❓','What is your name'],['😊','Nice to meet you'],['🙂','I am fine'],['🎂','I am five'],['👧','I am a girl'],['👦','I am a boy'],['👍','Yes'],['🙅','No'],['👋','See you later']]}
};
let m268Voice=null;
function m268PickEnglishVoice(){
  const vs=(window.speechSynthesis?.getVoices?.()||[]);
  m268Voice=vs.find(v=>/^en-GB/i.test(v.lang))||vs.find(v=>/^en-US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;
  return m268Voice;
}
if(window.speechSynthesis){m268PickEnglishVoice();speechSynthesis.onvoiceschanged=m268PickEnglishVoice}
function m265Say(w){
  try{
    const text=String(w||'').trim(); if(!text)return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang='en-US';u.rate=.72;u.pitch=1.03;u.volume=1;
    const v=m268Voice||m268PickEnglishVoice(); if(v)u.voice=v;
    speechSynthesis.resume();
    setTimeout(()=>speechSynthesis.speak(u),35);
  }catch(e){console.warn('English speech',e)}
}
function m264EnglishHome(){
 modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>🇬🇧 İngilizce</h2><p class="hint">Önce öğretici, sonra 10 aşamalı alıştırma.</p><div class="m266-topicgrid">${Object.entries(M266_ENGLISH).map(([k,t])=>`<button onclick="closeModal();m266EnglishTeach('${k}')"><span>${t.icon}</span><b>${t.title}</b><small>Öğret + 10 alıştırma</small></button>`).join('')}</div><div class="modal-actions"><button class="ghost" onclick="atelierHome()">← Geri</button></div>`)
}
function m266EnglishTeach(k){window._m266en={k,topic:M266_ENGLISH[k],i:0,selected:null,phase:'teach',optionIds:[]};m266EnglishRenderTeach()}
function m266EnglishRenderTeach(){
 const s=window._m266en,t=s.topic;
 app.innerHTML=`<header><button class="ghost" onclick="m264EnglishHome()">← İngilizce</button><b>🇬🇧 ${t.title} • Öğretici</b><button class="ghost" onclick="m265Home()">⌂ Ana Sayfa</button></header>
 <main class="m266-en"><h1>Önce kelimeleri öğrenelim 🎧</h1><p>Resme dokun; yalnızca o resmin İngilizce adını dinle.</p>
 <div class="m266-learn-grid">${t.items.map((o,i)=>`<button type="button" onclick="m268TeachSpeak(${i},this)"><span>${o[0]}</span><b>${o[1]}</b><small>🔊 Dokun ve dinle</small></button>`).join('')}</div>
 <button class="m266-start" onclick="window._m266en.phase='quiz';window._m266en.i=0;window._m266en.selected=null;m266EnglishQuiz()">Alıştırmalara Geç →</button></main>`}
function m268TeachSpeak(i,el){
 const s=window._m266en;if(!s)return;
 document.querySelectorAll('.m266-learn-grid button').forEach(x=>x.classList.remove('speaking'));
 el?.classList.add('speaking');m265Say(s.topic.items[i][1]);
 setTimeout(()=>el?.classList.remove('speaking'),700);
}
function m268QuizOptions(){
 const s=window._m266en,t=s.topic,n=t.items.length,target=s.i;
 let ids=[target,(target+3)%n,(target+7)%n];
 if(new Set(ids).size<3)ids=[target,(target+2)%n,(target+5)%n];
 const shift=(target*2+1)%3; ids=[ids[shift],ids[(shift+1)%3],ids[(shift+2)%3]];
 s.optionIds=ids; return ids;
}
function m266EnglishQuiz(){
 const s=window._m266en,t=s.topic,target=t.items[s.i],ids=m268QuizOptions();
 app.innerHTML=`<header><button class="ghost" onclick="m266EnglishRenderTeach()">← Öğretici</button><b>🇬🇧 ${t.title}</b><button class="ghost" onclick="m265Home()">⌂ Ana Sayfa</button></header>
 <main class="m266-en"><div class="m266-progress"><i style="width:${(s.i+1)*10}%"></i></div><h1>Listen and choose! 👂</h1>
 <p>Önce soruyu dinle. Sonra bir resme dokun: dokunduğun resmin kendi İngilizce adı söylenir ve seçim olarak işaretlenir.</p>
 <button class="m265-listen" onclick="m265Say(${JSON.stringify(target[1])})">🔊 Soruyu Dinle</button>
 <div class="m265-enopts">${ids.map(j=>{const o=t.items[j];return `<button type="button" data-en-index="${j}" onclick="m266EnglishPick(${j},this)"><span>${o[0]}</span><small>🔊 ${o[1]}</small></button>`}).join('')}</div>
 <button onclick="m266EnglishCheck()">✓ Kontrol Et</button><p class="m268-qcount">${s.i+1}/10</p></main>`}
function m266EnglishPick(j,el){
 const s=window._m266en;if(!s)return;
 s.selected=j;
 document.querySelectorAll('.m265-enopts button').forEach(b=>{b.classList.remove('selected','m266-wrong','m268-correct')});
 el?.classList.add('selected');
 m265Say(s.topic.items[j][1]);
}
function m266EnglishCheck(){
 const s=window._m266en,t=s.topic;if(s.selected===null)return notify('Önce bir resme dokunalım 👆');
 const chosen=document.querySelector(`.m265-enopts button[data-en-index="${s.selected}"]`);
 if(s.selected!==s.i){chosen?.classList.add('m266-wrong');m265Say('Try again');return notify('Bir daha deneyelim 🌱')}
 chosen?.classList.add('m268-correct');m265Say('Great job');
 if(s.i<9){s.i++;s.selected=null;setTimeout(m266EnglishQuiz,700)}
 else modal(`<h2>Great job! ⭐</h2><p>${t.title} bölümündeki 10 alıştırmayı tamamladın.</p><div class="modal-actions"><button class="ghost" onclick="closeModal();m264EnglishHome()">İngilizce Bölümü</button><button onclick="closeModal();m265Home()">Ana Sayfa</button></div>`)
}
function m265EnglishGame(){m266EnglishTeach('animals')}
const _playGame265=playGame;playGame=function(g){if(g.game_type==='english_listen')return m266EnglishTeach('animals');if(g.game_type&&g.game_type.startsWith('english_')){const k=g.game_type.slice(8);if(M266_ENGLISH[k])return m266EnglishTeach(k)}return _playGame265(g)};

/* Fen/Harf sonuç ve üst ana sayfa çağrılarını güvenli eve yönlendir */
const _m264MixRender265=m264MixRender;m264MixRender=function(){_m264MixRender265();document.querySelectorAll('button').forEach(b=>{if(b.textContent.includes('Ana Sayfa'))b.onclick=m265Home})};
const _m264MixQuiz265=m264MixQuiz;m264MixQuiz=function(){_m264MixQuiz265();document.querySelectorAll('button').forEach(b=>{if(b.textContent.includes('Ana Sayfa'))b.onclick=m265Home})};

document.head.insertAdjacentHTML('beforeend',`<style>
.m265-move{stroke:#ef476f;stroke-width:1.15;fill:none;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;stroke-dasharray:120;stroke-dashoffset:120;animation:m265draw .8s ease forwards}
@keyframes m265draw{to{stroke-dashoffset:0}}
.m265-en{max-width:850px;margin:auto;text-align:center;padding:30px}.m265-listen{font-size:24px!important;padding:18px 34px!important}.m265-enopts{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:30px 0}.m265-enopts button{min-height:210px;background:#fff!important;border:4px solid #e9e5dc!important;border-radius:28px!important}.m265-enopts button.selected{border-color:#5577e8!important;box-shadow:0 0 0 6px rgba(85,119,232,.15)}.m265-enopts span{font-size:88px}@media(max-width:650px){.m265-enopts{grid-template-columns:1fr}.m265-enopts button{min-height:120px}.m265-enopts span{font-size:62px}}
</style>`);
setInterval(()=>document.querySelectorAll('.logo span,header small').forEach(x=>{if(/^v\d/.test(x.textContent.trim()))x.textContent=MINOO_VERSION_265}),650);

document.head.insertAdjacentHTML('beforeend',`<style id="m266english">
.m266-topicgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:18px 0}.m266-topicgrid button{background:#fff!important;color:#26384d!important;border:2px solid #ebe6de!important;border-radius:22px!important;padding:16px!important;display:grid!important;grid-template-columns:auto 1fr!important;grid-template-rows:auto auto!important;text-align:left!important;gap:2px 12px!important;align-items:center!important}.m266-topicgrid span{font-size:38px;grid-row:1/3}.m266-topicgrid b{font-size:18px}.m266-topicgrid small{opacity:.7}.m266-en{max-width:900px;margin:auto;text-align:center;padding:24px 18px 45px}.m266-learn-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin:24px 0}.m266-learn-grid button{background:#fff!important;color:#26384d!important;border:3px solid #e8e4dc!important;border-radius:24px!important;min-height:150px!important;display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;gap:6px!important}.m266-learn-grid button:hover{border-color:#6f91ed!important;transform:translateY(-2px)}.m266-learn-grid span{font-size:58px}.m266-learn-grid b{font-size:18px}.m266-learn-grid small{font-size:12px;opacity:.68}.m266-start{font-size:20px!important;padding:16px 30px!important}.m266-progress{height:12px;background:#eee8df;border-radius:99px;overflow:hidden;margin:0 auto 24px}.m266-progress i{display:block;height:100%;background:linear-gradient(90deg,#77c9b7,#6f91ed);border-radius:99px}.m265-enopts button small{display:block;font-size:15px;margin-top:7px;color:#566}.m265-enopts button.m266-wrong{border-color:#ff1744!important;box-shadow:0 0 15px rgba(255,23,68,.55)!important}@media(max-width:700px){.m266-topicgrid{grid-template-columns:1fr}.m266-learn-grid{grid-template-columns:repeat(2,1fr)}.m266-learn-grid button{min-height:125px!important}.m266-learn-grid span{font-size:48px}}
</style>`);


/* ===== v2.8.0 yönetici/öğretmen + sayaç müziği + At kesin L ===== */
const _dashboard267=dashboard;
dashboard=async function(){
  await _dashboard267();
  const h=document.querySelector('header');
  if(h && teacherRole==='admin' && !document.querySelector('#teacherManageBtn')){
    const b=document.createElement('button');b.id='teacherManageBtn';b.className='ghost';b.textContent='👩‍🏫 Öğretmenler';b.onclick=m267Teachers;h.appendChild(b);
  }
  if(h && teacherRole==='teacher'){
    const title=h.querySelector('b'); if(title)title.textContent=`👩‍🏫 ${teacherName||'Öğretmen'} Paneli`;
  }
}
async function m267Teachers(){
 try{
  const [teachers,classes]=await Promise.all([api('/api/teachers'),api('/api/classes')]);
  modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>👩‍🏫 Öğretmen Yönetimi</h2>
  <button onclick='m267TeacherForm(null,${JSON.stringify(classes).replace(/'/g,"&#39;")})'>＋ Yeni Öğretmen</button>
  <div class="m267-teacher-list">${teachers.map(t=>`<article><div><b>${esc(t.name)}</b><small>@${esc(t.username)} • ${t.active?'Aktif':'Kapalı'}</small><p>${(t.classes||[]).map(c=>esc(c.name)).join(', ')||'Sınıf atanmadı'}</p></div><div><button class="ghost" onclick='m267TeacherForm(${JSON.stringify(t).replace(/'/g,"&#39;")},${JSON.stringify(classes).replace(/'/g,"&#39;")})'>Düzenle</button><button class="danger ghost" onclick="m267DeleteTeacher(${t.id})">Sil</button></div></article>`).join('')||'<p>Henüz öğretmen yok.</p>'}</div>`);
 }catch(e){notify(e.message)}
}
function m267TeacherForm(t,classes){
 t=t||{id:0,name:'',username:'',active:true,classes:[]};const selected=new Set((t.classes||[]).map(c=>Number(c.id)));
 modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>${t.id?'Öğretmeni Düzenle':'Yeni Öğretmen'}</h2>
 <label>Ad soyad</label><input id="m267tn" value="${esc(t.name)}">
 <label>Kullanıcı adı</label><input id="m267tu" value="${esc(t.username)}" autocomplete="off">
 <label>${t.id?'Yeni şifre (değişmeyecekse boş bırakın)':'Şifre'}</label><input id="m267tp" type="password" autocomplete="new-password">
 <h3>Sınıfları</h3><div class="m267-class-checks">${classes.map(c=>`<label><input type="checkbox" value="${c.id}" ${selected.has(Number(c.id))?'checked':''}> ${esc(c.name)}</label>`).join('')}</div>
 ${t.id?`<label class="m267-active"><input id="m267active" type="checkbox" ${t.active?'checked':''}> Hesap aktif</label>`:''}
 <div class="modal-actions"><button class="ghost" onclick="m267Teachers()">Vazgeç</button><button onclick="m267SaveTeacher(${Number(t.id)||0})">Kaydet</button></div>`);
}
async function m267SaveTeacher(id){
 const data={name:document.querySelector('#m267tn').value.trim(),username:document.querySelector('#m267tu').value.trim(),password:document.querySelector('#m267tp').value,class_ids:[...document.querySelectorAll('.m267-class-checks input:checked')].map(x=>Number(x.value))};
 if(id)data.active=document.querySelector('#m267active').checked;
 try{await api(id?'/api/teachers/'+id:'/api/teachers',{method:id?'PATCH':'POST',body:JSON.stringify(data)});m267Teachers();notify('Öğretmen kaydedildi ✓')}catch(e){notify(e.message)}
}
async function m267DeleteTeacher(id){if(!confirm('Bu öğretmen hesabı silinsin mi?'))return;try{await api('/api/teachers/'+id,{method:'DELETE'});m267Teachers()}catch(e){notify(e.message)}}

/* Sayaç için telifsiz, tarayıcı içinde üretilen klasik-esintili arka plan müziği */
minooTimer.music=minooTimer.music||'off'; minooTimer.musicVolume=minooTimer.musicVolume||0.16;
let m267MusicCtx=null,m267MusicTimer=null,m267MusicStep=0;
const M267_MUSIC={
 off:{name:'Müzik Kapalı'},
 calm:{name:'Klasik • Sakin',notes:[261.63,329.63,392,329.63,293.66,349.23,440,349.23]},
 bright:{name:'Klasik • Neşeli',notes:[329.63,392,523.25,392,349.23,440,587.33,440]},
 focus:{name:'Odaklanma',notes:[220,261.63,329.63,261.63,196,246.94,293.66,246.94]}
};
function m267MusicStop(){if(m267MusicTimer)clearInterval(m267MusicTimer);m267MusicTimer=null;if(m267MusicCtx){try{m267MusicCtx.close()}catch{}m267MusicCtx=null}}
function m267MusicNote(){
 if(!minooTimer.running||minooTimer.music==='off')return;
 try{const A=window.AudioContext||window.webkitAudioContext;if(!m267MusicCtx)m267MusicCtx=new A();const ctx=m267MusicCtx,n=M267_MUSIC[minooTimer.music].notes[m267MusicStep++%M267_MUSIC[minooTimer.music].notes.length],o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=n;g.gain.setValueAtTime(minooTimer.musicVolume,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.72);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.75)}catch{}
}
function m267MusicStart(){m267MusicStop();if(minooTimer.music==='off'||!minooTimer.running)return;m267MusicNote();m267MusicTimer=setInterval(m267MusicNote,780)}
function m267MusicSelect(v){minooTimer.music=v;timerTool()}
function m267MusicVol(v){minooTimer.musicVolume=Number(v);}

/* Sayaç ayar ekranına müzik panelini ekle */
const _timerTool267=timerTool;
timerTool=function(){m267MusicStop();_timerTool267();const panel=document.querySelector('.timer-panel');if(panel){const box=document.createElement('section');box.className='m267-music';box.innerHTML=`<h2>🎵 Arka Plan Müziği</h2><div class="m267-music-options">${Object.entries(M267_MUSIC).map(([k,v])=>`<button class="${minooTimer.music===k?'selected':''}" onclick="m267MusicSelect('${k}')">${v.name}</button>`).join('')}</div><label>Müzik sesi <input type="range" min="0.04" max="0.30" step="0.01" value="${minooTimer.musicVolume}" oninput="m267MusicVol(this.value)"></label><p class="hint">Müzik tarayıcı içinde üretilir; harici kayıt kullanılmaz.</p>`;panel.insertBefore(box,panel.querySelector('.timer-controls'))}}
const _timerToggle267=timerToggleRun;
timerToggleRun=function(){_timerToggle267();if(minooTimer.running)m267MusicStart();else m267MusicStop()}
const _timerReset267=timerReset;
timerReset=function(){m267MusicStop();_timerReset267()}

/* At: SVG yüzde/piksel karışıklığı yok; taşın merkezinden gerçek L rotaları */
m263ShowMoves=function(type,pos){
 const svg=document.querySelector('.m262-overlay');if(!svg)return;svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');
 const [f,r]=m263Coord(pos),sx=(f+.5)*12.5,sy=(8-r+.5)*12.5,c=M263_PIECES[type];let ends=[];
 if(c.jumps||c.pawn)ends=m263Targets(type,pos);else c.dirs.forEach(([df,dr])=>{let x=f,y=r,k;while((k=m263Key(x+df,y+dr))){x+=df;y+=dr;if(c.one)break}if(x!==f||y!==r)ends.push(m263Key(x,y))});
 svg.innerHTML=`<defs><marker id="m267arr" markerWidth="5" markerHeight="5" refX="4.2" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#ef476f"/></marker></defs>`+ends.map((k,i)=>{const [x,y]=m263Coord(k),ex=(x+.5)*12.5,ey=(8-y+.5)*12.5;if(type==='knight'){const df=x-f,mx=Math.abs(df)===2?ex:sx,my=Math.abs(df)===2?sy:ey;return `<path class="m267-move" d="M${sx},${sy} L${mx},${my} L${ex},${ey}" marker-end="url(#m267arr)" style="animation-delay:${i*.12}s"/>`}return `<line class="m267-move" x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" marker-end="url(#m267arr)" style="animation-delay:${i*.1}s"/>`}).join('');
};

document.head.insertAdjacentHTML('beforeend',`<style id="m267css">
.m267-role-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:700px;margin:24px auto}.m267-role-grid button{min-height:170px;background:#fff!important;color:#26384d!important;border:2px solid #e8e3db!important;border-radius:26px!important;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px}.m267-role-grid span{font-size:48px}.m267-role-grid b{font-size:20px}.m267-role-grid small{opacity:.7}.m267-teacher-list{display:grid;gap:10px;margin-top:16px}.m267-teacher-list article{display:flex;justify-content:space-between;gap:15px;padding:14px;border:1px solid #e8e3db;border-radius:18px}.m267-teacher-list small{display:block;opacity:.7}.m267-teacher-list p{margin:5px 0}.m267-class-checks{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0 18px}.m267-class-checks label,.m267-active{padding:10px;border-radius:12px;background:#f7f5f1}.m267-music{margin:20px 0;padding:18px;border-radius:22px;background:#f8f4ff}.m267-music-options{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:10px 0}.m267-music-options button.selected{box-shadow:0 0 0 4px rgba(90,115,220,.18);border-color:#5a73dc!important}.m267-music input[type=range]{width:100%}.m267-move{stroke:#ef476f;stroke-width:1.45;fill:none;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;stroke-dasharray:180;stroke-dashoffset:180;animation:m267draw .85s ease forwards}@keyframes m267draw{to{stroke-dashoffset:0}}@media(max-width:650px){.m267-role-grid,.m267-class-checks,.m267-music-options{grid-template-columns:1fr}}
</style>`);


/* v2.8.0: Satranç hareket çizgileri tek parça; marker çizginin gerçek ucuna bağlı */
m263ShowMoves=function(type,pos){
 const svg=document.querySelector('.m262-overlay');if(!svg)return;
 svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');
 const [f,r]=m263Coord(pos),sx=(f+.5)*12.5,sy=(8-r+.5)*12.5,c=M263_PIECES[type];let ends=[];
 if(c.jumps||c.pawn)ends=m263Targets(type,pos);
 else c.dirs.forEach(([df,dr])=>{let x=f,y=r,k;while((k=m263Key(x+df,y+dr))){x+=df;y+=dr;if(c.one)break}if(x!==f||y!==r)ends.push(m263Key(x,y))});
 svg.innerHTML=`<defs><marker id="m268arr" markerUnits="userSpaceOnUse" markerWidth="3.2" markerHeight="3.2" refX="2.8" refY="1.6" orient="auto"><path d="M0,0 L3.2,1.6 L0,3.2 Z" fill="#d94368"/></marker></defs>`+
 ends.map((k,i)=>{const [x,y]=m263Coord(k),ex=(x+.5)*12.5,ey=(8-y+.5)*12.5;
   if(type==='knight'){
     const dx=x-f,dy=y-r;
     const mx=Math.abs(dx)===2?ex:sx, my=Math.abs(dx)===2?sy:ey;
     return `<path class="m268-move" d="M ${sx} ${sy} L ${mx} ${my} L ${ex} ${ey}" marker-end="url(#m268arr)"/>`;
   }
   return `<line class="m268-move" x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" marker-end="url(#m268arr)"/>`
 }).join('');
};


/* v2.8.0 • Fen Dijital Deneyleri */
const M268_EXPERIMENTS={
 sink:{title:'Batar mı, Yüzer mi?',icon:'🛟',desc:'Nesneleri suya bırak, tahmin et ve sonucu gözlemle.'},
 shadow:{title:'Işık ve Gölge',icon:'🔦',desc:'Işığı yaklaştırıp uzaklaştır; gölgenin nasıl değiştiğini keşfet.'},
 magnet:{title:'Mıknatıs Neyi Çeker?',icon:'🧲',desc:'Farklı nesneleri mıknatısa yaklaştır ve hangilerinin çekildiğini keşfet.'},
 grow:{title:'Bitkinin İhtiyaçları',icon:'🌱',desc:'Su ve ışık seçimleriyle bitkinin gelişimini gözlemle.'}
};
m264ScienceHome=function(){
 modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>🔬 Fen</h2><p class="hint">Dokunarak keşfedilebilen dijital deneyler.</p>
 <div class="m268-expgrid">
 <button onclick="closeModal();m264ColorGame({game_type:'science_color_mix',title:'Renkleri Karıştırıyorum'})"><span>🎨</span><b>Renkleri Karıştırıyorum</b><small>Renkleri karıştır ve sonucu keşfet.</small></button>
 ${Object.entries(M268_EXPERIMENTS).map(([k,e])=>`<button onclick="closeModal();m268Experiment('${k}')"><span>${e.icon}</span><b>${e.title}</b><small>${e.desc}</small></button>`).join('')}</div>
 <div class="modal-actions"><button class="ghost" onclick="atelierHome()">← Geri</button></div>`);
}
function m268Experiment(k){
 if(k==='sink')return m268Sink();
 if(k==='shadow')return m268Shadow();
 if(k==='magnet')return m268Magnet();
 if(k==='grow')return m268Grow();
}
function m268ExpShell(title,body){
 app.innerHTML=`<header><button class="ghost" onclick="m264ScienceHome()">← Fen</button><b>🔬 ${title}</b><button class="ghost" onclick="m265Home()">⌂ Ana Sayfa</button></header><main class="m268-exp">${body}</main>`;
}
function m268Sink(){
 const items=[['🪨','Taş',false],['🪵','Tahta',true],['🪙','Madeni para',false],['🍃','Yaprak',true],['🧽','Sünger',true]];
 m268ExpShell('Batar mı, Yüzer mi?',`<h1>Önce tahmin et, sonra suya bırak 💧</h1><div class="m268-water">💧<span>Su</span></div><div class="m268-items">${items.map((x,i)=>`<button onclick="this.classList.add('${x[2]?'float':'sink'}');m263Speak('${x[1]} ${x[2]?'yüzer':'batar'}.')"><span>${x[0]}</span><b>${x[1]}</b><small>Suya bırak</small></button>`).join('')}</div><p class="hint">Neden bazı nesnelerin battığını, bazılarının yüzdüğünü öğretmeninle konuş.</p>`);
}
function m268Shadow(){
 m268ExpShell('Işık ve Gölge',`<h1>Işık yaklaşınca gölgeye ne oluyor? 🔦</h1><div class="m268-shadowlab"><span class="lamp">🔦</span><span class="toy">🧸</span><span id="m268shadow" class="shadow">●</span></div><label>Işığın uzaklığı <input type="range" min="1" max="100" value="50" oninput="m268ShadowMove(this.value)"></label><p id="m268shadowtext">Sürgüyü hareket ettir ve gölgeyi gözlemle.</p>`);
}
function m268ShadowMove(v){const s=document.querySelector('#m268shadow');if(!s)return;const scale=1.8-(Number(v)/100);s.style.transform=`scale(${scale})`;document.querySelector('#m268shadowtext').textContent=Number(v)<45?'Işık yaklaştı: gölge büyüdü.':'Işık uzaklaştı: gölge küçüldü.'}
function m268Magnet(){
 const items=[['📎','Ataş',true],['🪙','Metal para',true],['🧸','Oyuncak',false],['🪵','Tahta',false],['🧴','Plastik',false]];
 m268ExpShell('Mıknatıs Neyi Çeker?',`<h1>Mıknatısa yaklaştır 🧲</h1><div class="m268-magnet">🧲</div><div class="m268-items">${items.map(x=>`<button onclick="this.classList.add('${x[2]?'attract':'no-attract'}');m263Speak('${x[1]} ${x[2]?'mıknatıs tarafından çekilir':'mıknatıs tarafından çekilmez'}.')"><span>${x[0]}</span><b>${x[1]}</b><small>Dene</small></button>`).join('')}</div>`);
}
function m268Grow(){
 m268ExpShell('Bitkinin İhtiyaçları',`<h1>Bitkiye ne verelim? 🌱</h1><div id="m268plant" class="m268-plant">🌱</div><div class="m268-growbtns"><button onclick="m268GrowDo('water')">💧 Su ver</button><button onclick="m268GrowDo('sun')">☀️ Işığa çıkar</button><button onclick="m268GrowDo('dark')">🌑 Karanlıkta bırak</button></div><p id="m268growtext">Su ve ışığı deneyerek bitkiyi gözlemle.</p>`);
}
let m268GrowState={water:0,sun:0};
function m268GrowDo(k){if(k==='water')m268GrowState.water++;if(k==='sun')m268GrowState.sun++;const p=document.querySelector('#m268plant'),t=document.querySelector('#m268growtext');if(k==='dark'){p.textContent='🥀';t.textContent='Işık olmadan bitki iyi gelişemedi.'}else if(m268GrowState.water&&m268GrowState.sun){p.textContent='🌿';p.classList.add('grown');t.textContent='Su ve ışık birlikte bitkinin gelişmesine yardımcı oldu.'}else t.textContent=k==='water'?'Su verdin. Bir de ışığı deneyelim.':'Işık verdin. Bir de suyu deneyelim.'}

document.head.insertAdjacentHTML('beforeend',`<style id="m268css">
.m268-move{stroke:#d94368;stroke-width:1.25;fill:none;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.m266-learn-grid button.speaking{border-color:#5577e8!important;box-shadow:0 0 0 5px rgba(85,119,232,.15)}
.m265-enopts button.m268-correct{border-color:#35b76f!important;box-shadow:0 0 0 5px rgba(53,183,111,.16)!important}
.m268-qcount{font-weight:800;opacity:.65}.m268-exp{max-width:900px;margin:auto;padding:24px;text-align:center}
.m268-expgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:18px 0}.m268-expgrid button{background:#fff!important;color:#26384d!important;border:2px solid #e7e3db!important;border-radius:22px!important;padding:18px!important;display:grid!important;grid-template-columns:auto 1fr!important;text-align:left!important;gap:3px 12px!important}.m268-expgrid span{font-size:42px;grid-row:1/3}.m268-expgrid small{opacity:.72}
.m268-items{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin:25px 0}.m268-items button{background:#fff!important;color:#26384d!important;border:3px solid #e6e2da!important;border-radius:22px!important;min-height:145px!important;display:flex!important;flex-direction:column!important;align-items:center;justify-content:center;gap:5px}.m268-items span{font-size:55px}.m268-items button.float{transform:translateY(-12px);border-color:#54bde8!important}.m268-items button.sink{transform:translateY(14px);opacity:.75}.m268-items button.attract{transform:translateX(-12px);border-color:#ef6d86!important}.m268-items button.no-attract{opacity:.65}
.m268-water{height:120px;border-radius:25px;background:linear-gradient(#bfeaff,#6fc8ef);display:grid;place-items:center;font-size:45px}.m268-water span{font-size:16px}.m268-shadowlab{height:300px;border-radius:26px;background:#fff5ce;position:relative;overflow:hidden;margin:20px 0}.m268-shadowlab .lamp{position:absolute;left:8%;top:42%;font-size:70px}.m268-shadowlab .toy{position:absolute;left:48%;top:40%;font-size:80px;z-index:2}.m268-shadowlab .shadow{position:absolute;right:14%;top:43%;font-size:90px;color:#4b4655;opacity:.35;transition:transform .2s}.m268-magnet{font-size:100px;margin:15px}.m268-plant{font-size:130px;transition:.4s}.m268-plant.grown{transform:scale(1.2)}.m268-growbtns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
@media(max-width:700px){.m268-expgrid{grid-template-columns:1fr}.m268-items{grid-template-columns:repeat(2,1fr)}}
</style>`);


/* ===== v2.8.0 • gerçek zamana bağlı sayaç düzeltmesi ===== */
let m269EndAt=0,m269Paused=null,m269Loop=null,m269Total=0;
function m269Remaining(){
 if(minooTimer.running&&m269EndAt)return Math.max(0,Math.ceil((m269EndAt-Date.now())/1000));
 if(m269Paused!==null)return Math.max(0,m269Paused);
 return Math.max(0,Number(minooTimer.left||0));
}
function m269Paint(){
 const left=m269Remaining(); minooTimer.left=left;
 const mm=String(Math.floor(left/60)).padStart(2,'0'),ss=String(left%60).padStart(2,'0');
 document.querySelectorAll('.timer-time,.timer-clock,.timer-display,[data-timer-time]').forEach(el=>el.textContent=`${mm}:${ss}`);
 const total=Math.max(1,m269Total||Number(minooTimer.total||0)||left||1);
 document.documentElement.style.setProperty('--minoo-timer-progress',String(1-left/total));
 document.documentElement.style.setProperty('--minoo-timer-remaining',String(left/total));
 if(left<=0&&minooTimer.running){
   minooTimer.running=false;m269EndAt=0;m269Paused=0;
   if(m269Loop){clearInterval(m269Loop);m269Loop=null}
   if(typeof m267MusicStop==='function')m267MusicStop();
   try{if(typeof timerFinish==='function')timerFinish()}catch(e){}
 }
}
function m269Run(){
 if(m269Loop)clearInterval(m269Loop);
 m269Paint();m269Loop=setInterval(m269Paint,250);
}
const m269ToggleBase=timerToggleRun;
timerToggleRun=function(){
 const was=Boolean(minooTimer.running);
 if(!was){
   const rem=m269Paused!==null?m269Paused:Math.max(1,Number(minooTimer.left||minooTimer.total||60));
   m269Total=Math.max(m269Total,Number(minooTimer.total||0),rem);
   m269EndAt=Date.now()+rem*1000;m269Paused=null;
 }else{
   m269Paused=m269Remaining();m269EndAt=0;
 }
 m269ToggleBase();
 if(minooTimer.running){
   if(!m269EndAt){const rem=m269Paused!==null?m269Paused:Math.max(1,Number(minooTimer.left||1));m269EndAt=Date.now()+rem*1000;m269Paused=null}
   m269Run();
 }else{
   if(m269Loop){clearInterval(m269Loop);m269Loop=null}
   m269Paint();
 }
}
const m269ResetBase=timerReset;
timerReset=function(){
 if(m269Loop){clearInterval(m269Loop);m269Loop=null}
 m269EndAt=0;m269Paused=null;m269Total=0;
 m269ResetBase();
 m269Total=Number(minooTimer.total||minooTimer.left||0);
 m269Paint();
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&minooTimer&&minooTimer.running)m269Paint()});


/* ===== Minoo v2.8.0 • İlk Güncelleme ===== */

/* 1) İngilizce: öğretici görsel ve her seçenek kendi İngilizce sesini verir.
      "Soruyu Dinle" yalnız o aşamanın hedef kelimesini söyler. */
function m270EnglishSpeak(text){
  try{
    const value=String(text||'').trim(); if(!value)return;
    if(!('speechSynthesis' in window))return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(value);
    u.lang='en-US';u.rate=.70;u.pitch=1.04;u.volume=1;
    const voices=speechSynthesis.getVoices()||[];
    u.voice=voices.find(v=>/^en-GB/i.test(v.lang))||
            voices.find(v=>/^en-US/i.test(v.lang))||
            voices.find(v=>/^en/i.test(v.lang))||null;
    speechSynthesis.resume();
    setTimeout(()=>speechSynthesis.speak(u),60);
  }catch(e){console.warn('Minoo English voice',e)}
}
m265Say=m270EnglishSpeak;

/* 2) Tek seferlik alkış: tamamlanan alıştırmada çocuğa kısa kutlama sesi. */
let m270ApplauseAt=0;
function m270Applause(){
  if(Date.now()-m270ApplauseAt<1500)return;m270ApplauseAt=Date.now();
  try{
    const C=window.AudioContext||window.webkitAudioContext,ctx=new C(),start=ctx.currentTime;
    for(let i=0;i<16;i++){
      const dur=.05,buf=ctx.createBuffer(1,Math.floor(ctx.sampleRate*dur),ctx.sampleRate),data=buf.getChannelData(0);
      for(let j=0;j<data.length;j++)data[j]=(Math.random()*2-1)*Math.pow(1-j/data.length,2);
      const src=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
      filter.type='bandpass';filter.frequency.value=850+Math.random()*1200;
      const t=start+i*.055;
      gain.gain.setValueAtTime(.001,t);gain.gain.exponentialRampToValueAtTime(.13,t+.006);gain.gain.exponentialRampToValueAtTime(.001,t+dur);
      src.buffer=buf;src.connect(filter);filter.connect(gain);gain.connect(ctx.destination);src.start(t);src.stop(t+dur);
    }
    setTimeout(()=>ctx.close().catch(()=>{}),1500);
  }catch(e){}
}
const m270EnglishCheckBase=m266EnglishCheck;
m266EnglishCheck=function(){
  const s=window._m266en;
  const finalCorrect=!!(s && s.selected===s.i && s.i>=9);
  const r=m270EnglishCheckBase();
  if(finalCorrect)setTimeout(m270Applause,120);
  return r;
};

/* Satranç ve diğer alıştırmalarda görünen başarı ekranını yakalayıp yalnız bir kez alkışla. */
const m270SuccessObserver=new MutationObserver(()=>{
  const nodes=[...document.querySelectorAll('h1,h2,.success,.complete,.completed,.celebration')];
  const hit=nodes.find(el=>el.offsetParent!==null && /aferin|tebrik|tamamlad|harika|başard/i.test(el.textContent||''));
  if(hit&&!hit.dataset.m270Clapped){hit.dataset.m270Clapped='1';m270Applause()}
});
m270SuccessObserver.observe(document.documentElement,{subtree:true,childList:true});

/* 3) Satranç: alıştırma/yönerge metnini Türkçe seslendirme ve tekrar dinleme. */
let m270LastChessPrompt='';
function m270SpeakTR(text){
  try{
    const value=String(text||'').trim();if(!value||!('speechSynthesis'in window))return;
    speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(value);u.lang='tr-TR';u.rate=.82;u.pitch=1.03;
    const vs=speechSynthesis.getVoices()||[];u.voice=vs.find(v=>/^tr/i.test(v.lang))||null;
    speechSynthesis.resume();setTimeout(()=>speechSynthesis.speak(u),45);
  }catch(e){}
}
function m270SpeakChessPrompt(){
  const candidates=['.m263-prompt','.m263-instruction','.chess-prompt','.chess-instruction','.game-instruction','.instruction'];
  let el=null;for(const q of candidates){const x=document.querySelector(q);if(x&&x.offsetParent!==null&&x.textContent.trim()){el=x;break}}
  if(el)m270LastChessPrompt=el.textContent.trim();
  if(m270LastChessPrompt)m270SpeakTR(m270LastChessPrompt);
}
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  const label=(b.textContent||'').toLocaleLowerCase('tr-TR');
  if((label.includes('tekrar dinle')||label.includes('soruyu dinle')) &&
     (document.querySelector('.m262-board,.m263-board,.chess-board,[class*="chess"]'))){
    setTimeout(m270SpeakChessPrompt,0);
  }
},true);

/* 4) Sayaç: yeni Klasik Piyano seçeneği. Mevcut sakin/neşeli/odak seçenekleri korunur. */
M267_MUSIC.classicpiano={name:'🎹 Klasik Piyano',notes:[
  [261.63,329.63,392.00],[293.66,349.23,440.00],[246.94,329.63,392.00],
  [261.63,349.23,440.00],[220.00,261.63,329.63],[246.94,293.66,392.00]
]};

/* 5) Sayaçtaki Öğretmen Paneli: oturumu kapatmadan doğrudan panele dön. */
function m270TeacherPanel(){
  try{
    clearInterval(minooTimer.interval);
    if(typeof m269Loop!=='undefined'&&m269Loop){clearInterval(m269Loop);m269Loop=null}
    minooTimer.running=false;
    if(typeof m267MusicStop==='function')m267MusicStop();
    if(window.speechSynthesis)speechSynthesis.cancel();
    return dashboard();
  }catch(e){return dashboard()}
}
const m270TimerToolBase=timerTool;
timerTool=function(){
  m270TimerToolBase();
  const back=document.querySelector('header button.ghost');
  if(back && /öğretmen paneli/i.test(back.textContent||'')) back.onclick=m270TeacherPanel;
};

/* Timer çalışma ekranından geri dönüldüğünde de öğretmen oturumu korunur. */
document.addEventListener('click',e=>{
  const b=e.target.closest('.timer-back');if(!b)return;
  if(typeof m267MusicStop==='function')m267MusicStop();
},true);


/* ============================================================
   MINOO v2.8.0 • SES + FEN ETKİLEŞİMİ + YÖN ÇİZİMİ
   ============================================================ */
window.m271VoiceOn = (window.m271VoiceOn!==false);
function m271Speak(text,lang='tr-TR'){
  if(!window.m271VoiceOn || !text || !('speechSynthesis' in window))return;
  try{
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(String(text));
    u.lang=lang;u.rate=lang.startsWith('en')?.70:.82;u.pitch=1.03;u.volume=1;
    const vs=speechSynthesis.getVoices()||[];
    u.voice=vs.find(v=>v.lang.toLowerCase().startsWith(lang.slice(0,2).toLowerCase()))||null;
    speechSynthesis.resume();setTimeout(()=>speechSynthesis.speak(u),45);
  }catch(e){}
}
function m271VoiceToggle(){
  window.m271VoiceOn=!window.m271VoiceOn;
  if(!window.m271VoiceOn && window.speechSynthesis)speechSynthesis.cancel();
  const b=document.querySelector('#m271VoiceBtn');if(b)b.textContent=window.m271VoiceOn?'🔊 Ses Açık':'🔇 Ses Kapalı';
}
function m271VoiceButton(){return `<button id="m271VoiceBtn" class="ghost" onclick="m271VoiceToggle()">${window.m271VoiceOn?'🔊 Ses Açık':'🔇 Ses Kapalı'}</button>`}

/* ---------- İngilizce: Soruyu Dinle düğmesini quizde kesin göster ---------- */
m266EnglishQuiz=function(){
 const s=window._m266en,t=s.topic,target=t.items[s.i],ids=m268QuizOptions();
 app.innerHTML=`<header><button class="ghost" onclick="m266EnglishRenderTeach()">← Öğretici</button><b>🇬🇧 ${t.title}</b><button class="ghost" onclick="m265Home()">⌂ Ana Sayfa</button></header>
 <main class="m266-en"><div class="m266-progress"><i style="width:${(s.i+1)*10}%"></i></div>
 <h1>Listen and choose! 👂</h1>
 <div class="m271-questionbar"><button class="m271-listen-big" onclick="m271Speak(${JSON.stringify(target[1])},'en-US')">🔊 Soruyu Dinle</button></div>
 <p>Önce soruyu dinle. Sonra bir resme dokun.</p>
 <div class="m265-enopts">${ids.map(j=>{const o=t.items[j];return `<button type="button" data-en-index="${j}" onclick="m266EnglishPick(${j},this)"><span>${o[0]}</span><small>🔊 ${o[1]}</small></button>`}).join('')}</div>
 <button onclick="m266EnglishCheck()">✓ Kontrol Et</button><p class="m268-qcount">${s.i+1}/10</p></main>`;
 setTimeout(()=>m271Speak(target[1],'en-US'),180);
}
m265Say=function(w){m271Speak(w,'en-US')};

/* ---------- Satranç: her soru/yönerge için ses + kapatma + tekrar dinleme ---------- */
function m271ChessEnhance(){
 const board=document.querySelector('.m262-board,.v261-board,.chess-board,[class*="chess-board"]');
 if(!board)return;
 const main=board.closest('main')||document.querySelector('main'); if(!main)return;
 const ins=main.querySelector('.v261-instruction,.m263-instruction,.chess-instruction,.instruction');
 if(!ins||ins.dataset.m271Voice)return;
 ins.dataset.m271Voice='1';
 const text=ins.textContent.trim();
 const bar=document.createElement('div');bar.className='m271-voicebar';
 bar.innerHTML=`${m271VoiceButton()}<button class="ghost" type="button">🔁 Tekrar Dinle</button>`;
 bar.querySelectorAll('button')[1].onclick=()=>m271Speak(text,'tr-TR');
 ins.after(bar);
 setTimeout(()=>m271Speak(text,'tr-TR'),180);
}
const m271ChessObs=new MutationObserver(()=>setTimeout(m271ChessEnhance,30));
m271ChessObs.observe(document.documentElement,{childList:true,subtree:true});

/* ---------- Piyano: gerçek duyulur piyano-benzeri WebAudio ---------- */
M267_MUSIC.classicpiano={name:'🎹 Klasik Piyano',notes:[261.63,329.63,392,523.25,493.88,392,349.23,293.66,261.63,329.63,440,392]};
function m267MusicNote(){
 if(!minooTimer.running||minooTimer.music==='off')return;
 try{
   const A=window.AudioContext||window.webkitAudioContext;
   if(!m267MusicCtx)m267MusicCtx=new A();
   if(m267MusicCtx.state==='suspended')m267MusicCtx.resume();
   const ctx=m267MusicCtx,seq=M267_MUSIC[minooTimer.music]?.notes||M267_MUSIC.calm.notes;
   const n=seq[m267MusicStep++%seq.length],now=ctx.currentTime;
   [1,2].forEach((harm,h)=>{
     const o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter();
     o.type=h?'triangle':'sine';o.frequency.value=Number(n)*harm;
     f.type='lowpass';f.frequency.value=1800;
     const vol=Math.max(.018,Number(minooTimer.musicVolume||.16)*(h?.16:.42));
     g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(vol,now+.015);
     g.gain.exponentialRampToValueAtTime(.0001,now+1.05);
     o.connect(f);f.connect(g);g.connect(ctx.destination);o.start(now);o.stop(now+1.08);
   });
 }catch(e){console.warn('Piano',e)}
}
function m267MusicStart(){m267MusicStop();if(minooTimer.music==='off'||!minooTimer.running)return;m267MusicNote();m267MusicTimer=setInterval(m267MusicNote,minooTimer.music==='classicpiano'?620:780)}

/* ---------- Fen: ortak sesli soru kabuğu ---------- */
function m271ScienceShell(title,question,body){
 app.innerHTML=`<header><button class="ghost" onclick="m264ScienceHome()">← Fen</button><b>🔬 ${title}</b><button class="ghost" onclick="m265Home()">⌂ Ana Sayfa</button></header>
 <main class="m268-exp"><div class="m271-science-head"><h1>${question}</h1><div class="m271-voicebar">${m271VoiceButton()}<button class="ghost" onclick="m271Speak(${JSON.stringify(question)},'tr-TR')">🔁 Soruyu Dinle</button></div></div>${body}</main>`;
 setTimeout(()=>m271Speak(question,'tr-TR'),180);
}

/* Batar-yüzer: nesneyi sürükleyip suya gerçekten bırak */
function m268Sink(){
 const items=[['🪨','Taş',false],['🪵','Tahta',true],['🪙','Madeni para',false],['🍃','Yaprak',true],['🧽','Sünger',true]];
 window._m271Sink=Object.fromEntries(items.map((x,i)=>[String(i),x]));
 m271ScienceShell('Batar mı, Yüzer mi?','Sence hangisi batar, hangisi yüzer? Nesneyi suya bırak.',
 `<div id="m271Water" class="m271-dropzone m271-water"><span>💧</span><b>SU</b><small>Nesneyi buraya sürükle</small></div>
 <div class="m271-dragtray">${items.map((x,i)=>`<div class="m271-dragitem" draggable="true" data-sink="${i}"><span>${x[0]}</span><b>${x[1]}</b></div>`).join('')}</div>
 <p id="m271ScienceResult" class="hint">Bir nesneyi tutup suyun üzerine bırak.</p>`);
 m271BindDrag('#m271Water','sink');
}
function m271SinkDrop(id){
 const x=window._m271Sink[id];if(!x)return;
 const zone=document.querySelector('#m271Water'),res=document.querySelector('#m271ScienceResult');
 zone.classList.remove('result-green','result-red');zone.classList.add(x[2]?'result-green':'result-red');
 zone.querySelector('span').textContent=x[0];
 res.textContent=`${x[1]} ${x[2]?'yüzer.':'batar.'}`;
 m271Speak(`${x[1]} ${x[2]?'yüzer':'batar'}.`,'tr-TR');
}

/* Mıknatıs: nesneyi sürükleyip mıknatısa yaklaştır; çeker=yeşil, çekmez=kırmızı */
function m268Magnet(){
 const items=[['📎','Ataş',true],['🪙','Metal para',true],['🧸','Oyuncak',false],['🪵','Tahta',false],['🧴','Plastik',false]];
 window._m271Mag=Object.fromEntries(items.map((x,i)=>[String(i),x]));
 m271ScienceShell('Mıknatıs Neyi Çeker?','Sence mıknatıs hangisini çeker? Nesneyi mıknatısa yaklaştır.',
 `<div id="m271Magnet" class="m271-dropzone m271-magnet"><span>🧲</span><b>MIKNATIS</b><small>Nesneyi buraya sürükle</small></div>
 <div class="m271-dragtray">${items.map((x,i)=>`<div class="m271-dragitem" draggable="true" data-magnet="${i}"><span>${x[0]}</span><b>${x[1]}</b></div>`).join('')}</div>
 <p id="m271ScienceResult" class="hint">Bir nesneyi tutup mıknatısın üzerine bırak.</p>`);
 m271BindDrag('#m271Magnet','magnet');
}
function m271MagDrop(id){
 const x=window._m271Mag[id];if(!x)return;
 const zone=document.querySelector('#m271Magnet'),res=document.querySelector('#m271ScienceResult');
 zone.classList.remove('result-green','result-red');zone.classList.add(x[2]?'result-green':'result-red');
 zone.querySelector('span').textContent=x[2]?'🧲 '+x[0]:'🧲';
 res.innerHTML=`<strong class="${x[2]?'m271-green':'m271-red'}">${x[1]} ${x[2]?'mıknatıs tarafından çekilir.':'mıknatıs tarafından çekilmez.'}</strong>`;
 m271Speak(`${x[1]} ${x[2]?'mıknatıs tarafından çekilir':'mıknatıs tarafından çekilmez'}.`,'tr-TR');
}
function m271BindDrag(zoneSel,type){
 const zone=document.querySelector(zoneSel);if(!zone)return;
 document.querySelectorAll('.m271-dragitem').forEach(el=>{
   el.addEventListener('dragstart',e=>{e.dataTransfer.setData('text/plain',el.dataset.sink??el.dataset.magnet);e.dataTransfer.effectAllowed='move'});
   /* mobil/dokunmatik için Pointer Events */
   let ghost=null;
   el.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')return;el.setPointerCapture?.(e.pointerId);ghost=el;el.classList.add('dragging')});
   el.addEventListener('pointermove',e=>{if(!ghost)return;el.style.transform=`translate(${e.clientX-el.getBoundingClientRect().left-el.offsetWidth/2}px,${e.clientY-el.getBoundingClientRect().top-el.offsetHeight/2}px)`});
   el.addEventListener('pointerup',e=>{if(!ghost)return;const r=zone.getBoundingClientRect(),inside=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;el.style.transform='';el.classList.remove('dragging');ghost=null;if(inside){const id=el.dataset.sink??el.dataset.magnet;type==='sink'?m271SinkDrop(id):m271MagDrop(id)}});
 });
 zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('drag-over')});
 zone.addEventListener('dragleave',()=>zone.classList.remove('drag-over'));
 zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('drag-over');const id=e.dataTransfer.getData('text/plain');type==='sink'?m271SinkDrop(id):m271MagDrop(id)});
}

/* Bitki: büyüme/solma animasyonlu */
m268GrowState={water:0,sun:0};
function m268Grow(){
 m268GrowState={water:0,sun:0};
 m271ScienceShell('Bitkinin İhtiyaçları','Bitkinin büyümesi için neye ihtiyacı var?',
 `<div class="m271-plant-scene"><div class="m271-sun" id="m271Sun">☀️</div><div class="m271-cloud" id="m271Cloud">💧</div><div id="m268plant" class="m271-plant">🌱</div><div class="m271-soil"></div></div>
 <div class="m268-growbtns"><button onclick="m268GrowDo('water')">💧 Su ver</button><button onclick="m268GrowDo('sun')">☀️ Işığa çıkar</button><button onclick="m268GrowDo('dark')">🌑 Karanlıkta bırak</button></div>
 <p id="m268growtext">Su ve ışığı deneyerek bitkinin gelişimini gözlemle.</p>`);
}
function m268GrowDo(k){
 const p=document.querySelector('#m268plant'),t=document.querySelector('#m268growtext');
 if(k==='water'){m268GrowState.water++;document.querySelector('#m271Cloud')?.classList.add('rain');setTimeout(()=>document.querySelector('#m271Cloud')?.classList.remove('rain'),900);m271Speak('Bitkiye su verdin.','tr-TR')}
 if(k==='sun'){m268GrowState.sun++;document.querySelector('#m271Sun')?.classList.add('shine');setTimeout(()=>document.querySelector('#m271Sun')?.classList.remove('shine'),900);m271Speak('Bitkiyi ışığa çıkardın.','tr-TR')}
 if(k==='dark'){p.textContent='🥀';p.className='m271-plant wilt';t.textContent='Işık olmadan bitki iyi gelişemedi.';m271Speak(t.textContent,'tr-TR');return}
 if(m268GrowState.water&&m268GrowState.sun){p.textContent='🌿';p.className='m271-plant grow';t.textContent='Su ve ışık birlikte bitkinin büyümesine yardımcı oldu.';m271Speak(t.textContent,'tr-TR')}
 else t.textContent=k==='water'?'Su verdin. Şimdi ışığı da deneyelim.':'Işık verdin. Şimdi suyu da deneyelim.';
}

/* Işık-gölge sorusu da otomatik sesli */
const m271ShadowBase=m268Shadow;
m268Shadow=function(){m271ShadowBase();const h=document.querySelector('.m268-exp h1');if(h){const q=h.textContent.trim(),bar=document.createElement('div');bar.className='m271-voicebar';bar.innerHTML=`${m271VoiceButton()}<button class="ghost">🔁 Soruyu Dinle</button>`;bar.lastElementChild.onclick=()=>m271Speak(q,'tr-TR');h.after(bar);setTimeout(()=>m271Speak(q,'tr-TR'),180)}}

/* ---------- Satranç yönleri: öğretici çizgiler kesintisiz + çocuk serbestçe parmağı/fareyle çizer ---------- */
function m271DirSegments(type){
 const L=[];
 if(type==='vertical')for(let i=0;i<8;i++)L.push([i+.5,0,i+.5,8]);
 if(type==='horizontal')for(let i=0;i<8;i++)L.push([0,i+.5,8,i+.5]);
 if(type==='diag1'){
   for(let k=-7;k<=7;k++){let x1=Math.max(0,k),y1=Math.max(0,-k),x2=Math.min(8,8+k),y2=Math.min(8,8-k);if(Math.hypot(x2-x1,y2-y1)>1)L.push([x1,y1,x2,y2])}
 }
 if(type==='diag2'){
   for(let sum=1;sum<=15;sum++){let x1=Math.max(0,sum-8),y1=Math.min(8,sum),x2=Math.min(8,sum),y2=Math.max(0,sum-8);if(Math.hypot(x2-x1,y2-y1)>1)L.push([x1,y1,x2,y2])}
 }
 return L;
}
m262DrawGuide=function(type){
 const svg=document.querySelector('.m262-overlay');if(!svg)return;
 svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');
 svg.innerHTML=m271DirSegments(type).map((l,i)=>`<line class="m271-guide" x1="${l[0]*12.5}" y1="${l[1]*12.5}" x2="${l[2]*12.5}" y2="${l[3]*12.5}" style="--delay:${i*.045}s"/>`).join('');
}
m262EnableDraw=function(type){
 const wrap=document.querySelector('.m262-dirwrap'),svg=document.querySelector('.m262-overlay'),s=window._m262dir;if(!wrap||!svg)return;
 svg.style.pointerEvents='auto';svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');
 let drawing=false,current=null,pts=[];
 const point=e=>{const r=svg.getBoundingClientRect();return [Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100)),Math.max(0,Math.min(100,(e.clientY-r.top)/r.height*100))]};
 const down=e=>{e.preventDefault();drawing=true;pts=[point(e)];current=document.createElementNS('http://www.w3.org/2000/svg','polyline');current.setAttribute('class','m271-kidfree');current.setAttribute('points',pts[0].join(','));svg.appendChild(current);svg.setPointerCapture?.(e.pointerId)};
 const move=e=>{if(!drawing)return;e.preventDefault();const p=point(e),last=pts[pts.length-1];if(Math.hypot(p[0]-last[0],p[1]-last[1])>.7){pts.push(p);current.setAttribute('points',pts.map(x=>x.join(',')).join(' '))}};
 const up=e=>{if(!drawing)return;drawing=false;if(pts.length>2){const a=pts[0],z=pts[pts.length-1];s.lines.push([a,z,type,pts]);}current=null;pts=[]};
 svg.onpointerdown=down;svg.onpointermove=move;svg.onpointerup=up;svg.onpointercancel=up;
}
m262PracticeLines=function(){
 const svg=document.querySelector('.m262-overlay'),s=window._m262dir;if(!svg)return;
 svg.innerHTML=s.lines.map(x=>`<polyline class="m271-kidfree" points="${(x[3]||[x[0],x[1]]).map(p=>p.join(',')).join(' ')}"/>`).join('');
 m262EnableDraw(M262_DIRS[s.step][2]);
}
m262DirCheck=function(){
 const s=window._m262dir,type=M262_DIRS[s.step][2],lines=s.lines||[];
 const orientOk=([a,z])=>{
   const dx=Math.abs(z[0]-a[0]),dy=Math.abs(z[1]-a[1]);
   if(type==='vertical')return dy>=75&&dx<=10;
   if(type==='horizontal')return dx>=75&&dy<=10;
   return dx>=60&&dy>=60&&Math.abs(dx-dy)<=15;
 };
 const need=(type==='vertical'||type==='horizontal')?8:7;
 const ok=lines.length>=need&&lines.every(orientOk);
 if(!ok){document.querySelectorAll('.m271-kidfree').forEach(x=>x.classList.add('bad'));m271Speak('Çizgileri bir kenardan diğer kenara kadar tamamlayalım.','tr-TR');return notify('Çizgileri bir kenardan diğer kenara kadar tamamlayalım 🌱')}
 if(s.step<3){s.step++;s.practice=false;s.lines=[];m262DirRender()}else{m270Applause?.();modal(`<h2>Harika! 🎉</h2><p>Dikey, yatay ve çapraz yönleri tamamladın.</p><div class="modal-actions"><button onclick="closeModal();m262Home()">Ana Sayfa</button></div>`)}
}

/* Yön etkinliğinin yönergesi de sesli; çizim ekranında geri/temizle/kontrol korunur */
const m271DirRenderBase=m262DirRender;
m262DirRender=function(){m271DirRenderBase();setTimeout(m271ChessEnhance,80)};

/* ---------- Görünüm ---------- */
document.head.insertAdjacentHTML('beforeend',`<style id="m271css">
.m271-questionbar,.m271-voicebar{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:10px auto 16px}
.m271-listen-big{font-size:20px!important;padding:15px 24px!important;border-radius:18px!important;box-shadow:0 8px 24px rgba(75,105,190,.18)}
.m271-science-head h1{margin-bottom:6px}
.m271-dropzone{width:min(82vw,520px);min-height:190px;margin:18px auto;border:4px dashed #8aa6c7;border-radius:32px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;transition:.25s;background:#f8fbff}
.m271-dropzone>span{font-size:78px}.m271-dropzone.drag-over{transform:scale(1.035);box-shadow:0 0 0 8px rgba(89,141,218,.12)}
.m271-water{background:linear-gradient(#e8f8ff,#9ddcff)}.m271-magnet{background:#fff8f8}
.m271-dropzone.result-green{border-color:#28b76b!important;background:#eafff1!important;box-shadow:0 0 0 7px rgba(40,183,107,.14)}
.m271-dropzone.result-red{border-color:#ff365f!important;background:#fff0f3!important;box-shadow:0 0 0 7px rgba(255,54,95,.13)}
.m271-green{color:#168c4e}.m271-red{color:#e51e49}
.m271-dragtray{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:20px auto}
.m271-dragitem{touch-action:none;user-select:none;background:#fff;border:2px solid #e5e1da;border-radius:20px;padding:12px 16px;min-width:105px;display:flex;flex-direction:column;gap:5px;align-items:center;cursor:grab;position:relative;z-index:3}
.m271-dragitem span{font-size:48px}.m271-dragitem.dragging{opacity:.8;z-index:50;cursor:grabbing}
.m271-plant-scene{height:330px;max-width:650px;margin:15px auto;position:relative;overflow:hidden;border-radius:30px;background:linear-gradient(#c9efff 0 68%,#b8875d 68% 100%)}
.m271-plant{position:absolute;left:50%;bottom:65px;transform:translateX(-50%);font-size:95px;transform-origin:bottom center;transition:.8s}
.m271-plant.grow{animation:m271Grow 1.2s ease both}.m271-plant.wilt{animation:m271Wilt .8s ease both}
.m271-sun{position:absolute;right:35px;top:25px;font-size:65px}.m271-sun.shine{animation:m271Shine .8s ease}
.m271-cloud{position:absolute;left:35px;top:30px;font-size:55px}.m271-cloud.rain{animation:m271Rain .8s ease}
.m271-soil{position:absolute;left:0;right:0;bottom:0;height:68px;background:rgba(91,57,37,.22)}
@keyframes m271Grow{0%{transform:translateX(-50%) scale(.65)}55%{transform:translateX(-50%) scale(1.25)}100%{transform:translateX(-50%) scale(1.05)}}
@keyframes m271Wilt{to{transform:translateX(-50%) rotate(18deg) scale(.82);filter:saturate(.55)}}
@keyframes m271Shine{50%{transform:scale(1.35) rotate(20deg)}}@keyframes m271Rain{50%{transform:translateY(45px)}}
.m271-guide{stroke:#ef476f;stroke-width:1.45;stroke-linecap:round;fill:none;stroke-dasharray:none!important;stroke-dashoffset:0!important;animation:m271Guide .55s ease both;animation-delay:var(--delay)}
@keyframes m271Guide{from{opacity:0}to{opacity:1}}
.m271-kidfree{fill:none;stroke:#3f82f7;stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;touch-action:none}
.m271-kidfree.bad{stroke:#ff1744;filter:drop-shadow(0 0 3px #ff1744)}
.m262-dirwrap .m262-overlay{touch-action:none}
@media(max-width:650px){.m271-dropzone{min-height:155px}.m271-dragitem{min-width:88px}.m271-dragitem span{font-size:40px}.m271-plant-scene{height:270px}}
</style>`);


/* ============================================================
   MINOO v2.8.0 • LEVEL MERKEZİ + GERİ + OTURUM/KALDIĞIN YER
   ============================================================ */
const M272_SESSION='minoo_session_v272',M272_ROUTE='minoo_route_v272',M272_LEVELS='minoo_levels_v272';
let m272Restoring=false,m272HistoryReady=false;

function m272SaveSession(){
  try{
    sessionStorage.setItem(M272_SESSION,JSON.stringify({
      teacherPass:teacherPass||'',teacherToken:teacherToken||'',teacherRole:teacherRole||'',
      teacherName:teacherName||'',currentClass:currentClass??null,studentSession:studentSession||null
    }));
  }catch(e){}
}
function m272ClearSession(){
  try{sessionStorage.removeItem(M272_SESSION);sessionStorage.removeItem(M272_ROUTE)}catch(e){}
}
function m272Route(name,data={},push=true){
  const r={name,data,at:Date.now()};
  try{sessionStorage.setItem(M272_ROUTE,JSON.stringify(r))}catch(e){}
  if(push&&!m272Restoring){
    try{
      const cur=history.state?.minoo;
      if(!cur||cur.name!==name||JSON.stringify(cur.data)!==JSON.stringify(data))
        history.pushState({minoo:r},'',location.href);
    }catch(e){}
  }
}
function m272LevelKey(gameKey){
  const who=studentSession?.id?`student-${studentSession.id}`:(teacherPreviewMode?'preview':'staff');
  return `${who}:${gameKey}`;
}
function m272GetLevels(gameKey){
  try{const all=JSON.parse(localStorage.getItem(M272_LEVELS)||'{}');return all[m272LevelKey(gameKey)]||{}}catch(e){return{}}
}
function m272Done(gameKey,level){
  try{const all=JSON.parse(localStorage.getItem(M272_LEVELS)||'{}'),k=m272LevelKey(gameKey);all[k]=all[k]||{};all[k][level]={done:true,last:Date.now()};localStorage.setItem(M272_LEVELS,JSON.stringify(all))}catch(e){}
}
function m272LevelHub(title,levels,onPick,backFn='m262Home()'){
  const done=m272GetLevels(title);
  app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="${backFn}">← Geri</button><b>${title}</b><span>🎯 Bölümler</span></header>
  <main class="m272-level-main"><section class="m272-level-card">
   <div class="m272-level-hero"><span>🧩</span><div><h1>Bölümünü seç</h1><p>İstediğin bölümü oynayabilir, tamamladığın bölümü tekrar edebilirsin.</p></div></div>
   <div class="m272-level-grid">${levels.map((x,i)=>`<button class="${done[i]?.done?'done':''}" onclick="${onPick}(${i})"><span class="num">${i+1}</span><div><b>Level ${i+1}</b><small>${x}</small></div><em>${done[i]?.done?'✓ Tamamlandı • Tekrar Oyna':'▶ Oyna'}</em></button>`).join('')}</div>
  </section></main>`;
}

/* Yönler: artık zorunlu sıra yok. Her level bağımsız seçilebilir ve tekrar oynanabilir. */
const m272DirectionsBase=chessDirectionsGame;
chessDirectionsGame=function(g){
  window._m272DirGame=g;
  try{sessionStorage.setItem('m272_dir_game',JSON.stringify(g||{}))}catch(e){}
  m272Route('chessDirections',{g},true);
  m272DirectionsHub();
}
function m272DirectionsHub(){
  m272Route('chessDirectionsHub',{g:window._m272DirGame||{}},false);
  m272LevelHub('♟️ Satrançta Yönleri Öğreniyorum',
    ['Dikey çizgiler ↕','Yatay çizgiler ↔','Çapraz çizgiler ↗↙','Çapraz çizgiler ↖↘'],
    'm272StartDirection',teacherPreviewMode?'previewBack()':'studentDash()');
}
function m272StartDirection(i){
  const g=window._m272DirGame||{};
  window._m262dir={g,step:Number(i),practice:false,lines:[],m272Single:true};
  m272Route('chessDirectionLevel',{g,level:Number(i)},true);
  m262DirRender();
}
const m272DirCheckBase=m262DirCheck;
m262DirCheck=function(){
  const s=window._m262dir;if(!s||!s.m272Single)return m272DirCheckBase();
  const type=M262_DIRS[s.step][2],lines=s.lines||[];
  const orientOk=([a,z])=>{
    const dx=Math.abs(z[0]-a[0]),dy=Math.abs(z[1]-a[1]);
    if(type==='vertical')return dy>=75&&dx<=10;
    if(type==='horizontal')return dx>=75&&dy<=10;
    return dx>=60&&dy>=60&&Math.abs(dx-dy)<=15;
  };
  const need=(type==='vertical'||type==='horizontal')?8:7;
  const ok=lines.length>=need&&lines.every(orientOk);
  if(!ok){
    document.querySelectorAll('.m271-kidfree').forEach(x=>x.classList.add('bad'));
    m271Speak('Çizgileri bir kenardan diğer kenara kadar tamamlayalım.','tr-TR');
    return notify('Bu level henüz tamamlanmadı. Yeniden deneyelim 🌱');
  }
  m272Done('♟️ Satrançta Yönleri Öğreniyorum',s.step);
  m270Applause?.();
  modal(`<h2>Level ${s.step+1} tamamlandı! ✓</h2><p>${M262_DIRS[s.step][0]} bölümünü istediğin zaman tekrar oynayabilirsin.</p>
    <div class="modal-actions"><button class="ghost" onclick="closeModal();m272StartDirection(${s.step})">↻ Tekrar Oyna</button><button onclick="closeModal();m272DirectionsHub()">Bölümlere Dön</button></div>`);
};
const m272DirPrevBase=m262DirPrev;
m262DirPrev=function(){
  const s=window._m262dir;
  if(s?.m272Single){
    if(s.practice){s.practice=false;s.lines=[];return m262DirRender()}
    return m272DirectionsHub();
  }
  return m272DirPrevBase();
};

/* Ana ekran ve oyun rotalarını kaydet: yenilemede yeniden giriş istemesin. */
const m272DashboardBase=dashboard;
dashboard=async function(){
  m272SaveSession();m272Route('dashboard',{},!m272Restoring);
  const r=await m272DashboardBase();m272SaveSession();return r;
};
const m272StudentDashBase=studentDash;
studentDash=async function(){
  m272SaveSession();m272Route('studentDash',{},!m272Restoring);
  const r=await m272StudentDashBase();m272SaveSession();return r;
};
const m272PlayGameBase=playGame;
playGame=function(g){
  try{sessionStorage.setItem('m272_last_game',JSON.stringify(g||{}))}catch(e){}
  m272Route('game',{g},!m272Restoring);
  return m272PlayGameBase(g);
};

/* Başarılı girişten sonra oturum bilgileri aynı sekmede saklanır. */
const m272AdminLoginBase=doAdminLogin;
doAdminLogin=async function(){const r=await m272AdminLoginBase();m272SaveSession();return r};
const m272TeacherLoginBase=doTeacherLogin;
doTeacherLogin=async function(){const r=await m272TeacherLoginBase();m272SaveSession();return r};
const m272StudentLoginBase=studentLogin;
studentLogin=async function(){const r=await m272StudentLoginBase();m272SaveSession();return r};

/* Çıkış gerçek çıkış olsun; normal geri/ana sayfa oturumu silmesin. */
function m272Logout(){
  m272ClearSession();
  teacherPass='';teacherToken='';teacherRole='';teacherName='';studentSession=null;currentClass=null;
  try{history.replaceState({minoo:{name:'home',data:{}}},'',location.href)}catch(e){}
  home();
}
function m272WireLogout(){
  document.querySelectorAll('button').forEach(b=>{
    if((b.textContent||'').trim()==='Çıkış')b.onclick=m272Logout;
  });
}
new MutationObserver(()=>m272WireLogout()).observe(document.documentElement,{childList:true,subtree:true});

/* Tarayıcının geri tuşu Minoo içinde bir önceki ekrana döner. */
async function m272RestoreRoute(route){
  if(!route)return;
  m272Restoring=true;
  try{
    if(route.name==='dashboard'&&(teacherPass||teacherToken))await dashboard();
    else if(route.name==='studentDash'&&studentSession)await studentDash();
    else if(route.name==='chessDirections'||route.name==='chessDirectionsHub'){
      window._m272DirGame=route.data?.g||JSON.parse(sessionStorage.getItem('m272_dir_game')||'{}');m272DirectionsHub();
    }else if(route.name==='chessDirectionLevel'){
      window._m272DirGame=route.data?.g||{};m272StartDirection(Number(route.data?.level||0));
    }else if(route.name==='game'){
      const g=route.data?.g||JSON.parse(sessionStorage.getItem('m272_last_game')||'null');
      if(g)playGame(g);else if(studentSession)await studentDash();else if(teacherPass||teacherToken)await dashboard();
    }else if(studentSession)await studentDash();
    else if(teacherPass||teacherToken)await dashboard();
  }catch(e){
    if(studentSession)try{await studentDash()}catch{}
    else if(teacherPass||teacherToken)try{await dashboard()}catch{}
  }finally{m272Restoring=false}
}
window.addEventListener('popstate',e=>m272RestoreRoute(e.state?.minoo||JSON.parse(sessionStorage.getItem(M272_ROUTE)||'null')));

/* Yenileme sonrası oturumu ve son güvenli ekranı geri getir. */
(async function m272Boot(){
  try{
    const s=JSON.parse(sessionStorage.getItem(M272_SESSION)||'null');if(!s)return;
    teacherPass=s.teacherPass||'';teacherToken=s.teacherToken||'';teacherRole=s.teacherRole||'';
    teacherName=s.teacherName||'';currentClass=s.currentClass??null;studentSession=s.studentSession||null;
    if(!(teacherPass||teacherToken||studentSession))return;
    const route=JSON.parse(sessionStorage.getItem(M272_ROUTE)||'null');
    m272Restoring=true;
    if(!history.state?.minoo)history.replaceState({minoo:route||{name:studentSession?'studentDash':'dashboard',data:{}}},'',location.href);
    await m272RestoreRoute(route||{name:studentSession?'studentDash':'dashboard',data:{}});
  }catch(e){console.warn('Minoo session restore',e)}
  finally{m272Restoring=false}
})();

/* Ortak level bileşeni bundan sonraki aşamalı oyunlarda da kullanılacak.
   Tamamlanan level kilitlenmez; tekrar oynanabilir. */
document.head.insertAdjacentHTML('beforeend',`<style id="m272css">
.m272-level-main{max-width:900px;margin:auto;padding:22px}.m272-level-card{background:#fff;border:1px solid #ebe6df;border-radius:30px;padding:22px;box-shadow:0 14px 45px rgba(48,61,88,.08)}
.m272-level-hero{display:flex;align-items:center;gap:15px;margin-bottom:20px}.m272-level-hero>span{font-size:52px}.m272-level-hero h1{margin:0}.m272-level-hero p{margin:5px 0;opacity:.72}
.m272-level-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.m272-level-grid button{background:#fbfcff!important;color:#26384d!important;border:2px solid #e4e8f0!important;border-radius:22px!important;padding:18px!important;display:grid!important;grid-template-columns:auto 1fr!important;gap:4px 13px!important;text-align:left!important;align-items:center}
.m272-level-grid button.done{border-color:#45b979!important;background:#effcf4!important}.m272-level-grid .num{grid-row:1/3;width:45px;height:45px;border-radius:50%;display:grid;place-items:center;background:#eaf0ff;font-weight:900;font-size:20px}.m272-level-grid button.done .num{background:#c9f3da}
.m272-level-grid b{font-size:19px}.m272-level-grid small{font-size:15px;opacity:.78}.m272-level-grid em{grid-column:2;font-style:normal;font-weight:800;font-size:13px;color:#4c70c8}.m272-level-grid button.done em{color:#21884e}
@media(max-width:650px){.m272-level-grid{grid-template-columns:1fr}.m272-level-card{padding:14px;border-radius:22px}}
</style>`);


/* ============================================================
   MINOO v2.8.0 • BİLGİSAYARA KARŞI GERÇEK SATRANÇ
   ============================================================ */
const M280_GLYPH={w:{k:'♔',q:'♕',r:'♖',b:'♗',n:'♘',p:'♙'},b:{k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'}};
const M280_NAME={k:'Şah',q:'Vezir',r:'Kale',b:'Fil',n:'At',p:'Piyon'};
let m280={level:1,b:null,turn:'w',selected:null,legal:[],castle:{wK:true,wQ:true,bK:true,bQ:true},ep:null,half:0,status:'',thinking:false,last:null};

function m280New(level=1){
 m280={level:Number(level),b:m280StartBoard(),turn:'w',selected:null,legal:[],castle:{wK:true,wQ:true,bK:true,bQ:true},ep:null,half:0,status:'',thinking:false,last:null};
 m272Route('realChess',{level:Number(level)},true);m280Render();
 setTimeout(()=>m271Speak(`Bilgisayara karşı satranç. ${level==1?'Kolay':level==2?'Orta':'Zor'} seviye. Beyaz taşlar senin. İlk hamleni yap.`,'tr-TR'),250);
}
function m280StartBoard(){
 const b=Array.from({length:8},()=>Array(8).fill(null)),back=['r','n','b','q','k','b','n','r'];
 for(let x=0;x<8;x++){b[0][x]={c:'b',t:back[x]};b[1][x]={c:'b',t:'p'};b[6][x]={c:'w',t:'p'};b[7][x]={c:'w',t:back[x]}}
 return b;
}
function m280Clone(s){return {b:s.b.map(r=>r.map(p=>p?{...p}:null)),turn:s.turn,castle:{...s.castle},ep:s.ep?s.ep.slice():null,half:s.half||0,last:s.last?{...s.last}:null}}
function m280Inside(y,x){return y>=0&&y<8&&x>=0&&x<8}
function m280Pseudo(s,y,x,attacks=false){
 const p=s.b[y][x];if(!p)return[];const out=[],add=(yy,xx,special='')=>{if(m280Inside(yy,xx))out.push({fy:y,fx:x,ty:yy,tx:xx,special})};
 if(p.t==='p'){
   const d=p.c==='w'?-1:1,start=p.c==='w'?6:1,promo=p.c==='w'?0:7;
   if(attacks){for(const dx of [-1,1])if(m280Inside(y+d,x+dx))add(y+d,x+dx,'attack');return out}
   if(m280Inside(y+d,x)&&!s.b[y+d][x]){add(y+d,x,y+d===promo?'promotion':'');if(y===start&&!s.b[y+2*d][x])add(y+2*d,x,'double')}
   for(const dx of [-1,1]){const yy=y+d,xx=x+dx;if(!m280Inside(yy,xx))continue;const q=s.b[yy][xx];if(q&&q.c!==p.c)add(yy,xx,yy===promo?'promotion':'capture');else if(s.ep&&s.ep[0]===yy&&s.ep[1]===xx)add(yy,xx,'enpassant')}
 }else if(p.t==='n'){
   for(const [dy,dx] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]){const yy=y+dy,xx=x+dx;if(m280Inside(yy,xx)&&(!s.b[yy][xx]||s.b[yy][xx].c!==p.c))add(yy,xx)}
 }else if(p.t==='k'){
   for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(dy||dx){const yy=y+dy,xx=x+dx;if(m280Inside(yy,xx)&&(!s.b[yy][xx]||s.b[yy][xx].c!==p.c))add(yy,xx)}
   if(!attacks){
     const row=p.c==='w'?7:0,enemy=p.c==='w'?'b':'w';
     if(y===row&&x===4&&!m280Attacked(s,row,4,enemy)){
       const ck=p.c==='w'?s.castle.wK:s.castle.bK,cq=p.c==='w'?s.castle.wQ:s.castle.bQ;
       if(ck&&s.b[row][7]?.t==='r'&&s.b[row][7]?.c===p.c&&!s.b[row][5]&&!s.b[row][6]&&!m280Attacked(s,row,5,enemy)&&!m280Attacked(s,row,6,enemy))add(row,6,'castleK');
       if(cq&&s.b[row][0]?.t==='r'&&s.b[row][0]?.c===p.c&&!s.b[row][1]&&!s.b[row][2]&&!s.b[row][3]&&!m280Attacked(s,row,3,enemy)&&!m280Attacked(s,row,2,enemy))add(row,2,'castleQ');
     }
   }
 }else{
   const dirs=p.t==='r'?[[1,0],[-1,0],[0,1],[0,-1]]:p.t==='b'?[[1,1],[1,-1],[-1,1],[-1,-1]]:[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
   for(const [dy,dx] of dirs){let yy=y+dy,xx=x+dx;while(m280Inside(yy,xx)){if(!s.b[yy][xx])add(yy,xx);else{if(s.b[yy][xx].c!==p.c)add(yy,xx);break}yy+=dy;xx+=dx}}
 }
 return out;
}
function m280Attacked(s,y,x,by){
 for(let yy=0;yy<8;yy++)for(let xx=0;xx<8;xx++){const p=s.b[yy][xx];if(p?.c===by&&m280Pseudo(s,yy,xx,true).some(m=>m.ty===y&&m.tx===x))return true}
 return false;
}
function m280King(s,c){for(let y=0;y<8;y++)for(let x=0;x<8;x++)if(s.b[y][x]?.c===c&&s.b[y][x].t==='k')return[y,x];return null}
function m280Check(s,c){const k=m280King(s,c);return k?m280Attacked(s,k[0],k[1],c==='w'?'b':'w'):true}
function m280Apply(s,m,prom='q'){
 const n=m280Clone(s),p=n.b[m.fy][m.fx],capt=n.b[m.ty][m.tx];n.b[m.fy][m.fx]=null;
 if(m.special==='enpassant')n.b[m.fy][m.tx]=null;
 if(m.special==='castleK'){n.b[m.ty][5]=n.b[m.ty][7];n.b[m.ty][7]=null}
 if(m.special==='castleQ'){n.b[m.ty][3]=n.b[m.ty][0];n.b[m.ty][0]=null}
 n.b[m.ty][m.tx]={...p,t:m.special==='promotion'?prom:p.t};
 n.ep=m.special==='double'?[(m.fy+m.ty)/2,m.fx]:null;
 if(p.t==='k'){if(p.c==='w'){n.castle.wK=false;n.castle.wQ=false}else{n.castle.bK=false;n.castle.bQ=false}}
 if(p.t==='r'){if(m.fy===7&&m.fx===0)n.castle.wQ=false;if(m.fy===7&&m.fx===7)n.castle.wK=false;if(m.fy===0&&m.fx===0)n.castle.bQ=false;if(m.fy===0&&m.fx===7)n.castle.bK=false}
 if(capt?.t==='r'){if(m.ty===7&&m.tx===0)n.castle.wQ=false;if(m.ty===7&&m.tx===7)n.castle.wK=false;if(m.ty===0&&m.tx===0)n.castle.bQ=false;if(m.ty===0&&m.tx===7)n.castle.bK=false}
 n.half=(p.t==='p'||capt)?0:(n.half+1);n.last={...m,piece:p.t,c:p.c};n.turn=p.c==='w'?'b':'w';return n;
}
function m280Legal(s,c){
 const all=[];for(let y=0;y<8;y++)for(let x=0;x<8;x++)if(s.b[y][x]?.c===c)for(const m of m280Pseudo(s,y,x,false)){const n=m280Apply(s,m);if(!m280Check(n,c))all.push(m)}return all;
}
function m280MovesFrom(y,x){return m280Legal(m280,m280.turn).filter(m=>m.fy===y&&m.fx===x)}
function m280Same(a,b){return a&&b&&a.ty===b.ty&&a.tx===b.tx&&a.fy===b.fy&&a.fx===b.fx}
function m280Sq(y,x){return 'abcdefgh'[x]+(8-y)}

function m280ChooseLevel(){
 m272LevelHub('♟️ Bilgisayara Karşı Satranç',['Kolay • Hamle okları + sesli yardım','Orta • Yasal kare ipuçları','Zor • Yardımsız gerçek oyun'],'m280New',teacherPreviewMode?'previewBack()':'studentDash()');
 /* m272LevelHub sıfır tabanlı gönderir; burada düğmeleri 1-3 yap */
 document.querySelectorAll('.m272-level-grid button').forEach((b,i)=>b.setAttribute('onclick',`m280New(${i+1})`));
}
function m280Render(){
 const legal=m280.turn==='w'&&!m280.thinking?m280Legal(m280,'w'):[];
 const inCheck=m280Check(m280,m280.turn);
 let msg=m280.thinking?'Bilgisayar düşünüyor…':m280.turn==='w'?(inCheck?'Şah çekildi! Şahını koru.':'Sıra sende • Beyaz'):'Bilgisayarın sırası';
 app.innerHTML=`<header class="chess-header"><button class="ghost" onclick="m280ChooseLevel()">← Seviyeler</button><b>♟️ Bilgisayara Karşı Satranç</b><button id="m271VoiceBtn" class="ghost" onclick="m271VoiceToggle()">${window.m271VoiceOn?'🔊 Ses Açık':'🔇 Ses Kapalı'}</button></header>
 <main class="m280-main"><div class="m280-top"><span class="m280-badge">${m280.level===1?'🌱 Kolay':m280.level===2?'🌿 Orta':'🌳 Zor'}</span><b id="m280msg">${msg}</b><button class="ghost" onclick="m280New(${m280.level})">↻ Yeni Oyun</button></div>
 <div class="m280-wrap"><div id="m280board" class="m280-board">${m280.b.map((row,y)=>row.map((p,x)=>{const sel=m280.selected?.[0]===y&&m280.selected?.[1]===x,target=m280.legal.some(m=>m.ty===y&&m.tx===x),last=m280.last&&(m280.last.ty===y&&m280.last.tx===x||m280.last.fy===y&&m280.last.fx===x);return `<button class="m280-sq ${(x+y)%2?'dark':'light'} ${sel?'sel':''} ${target?'target':''} ${last?'last':''}" data-y="${y}" data-x="${x}" onclick="m280Tap(${y},${x})">${p?`<span class="m280-piece ${p.c}">${M280_GLYPH[p.c][p.t]}</span>`:''}${target?'<i></i>':''}</button>`}).join('')).join('')}<svg id="m280arrows" viewBox="0 0 100 100"></svg></div></div>
 <div class="m280-help">${m280.level===1?'Taşa dokun: gidebileceği bütün yasal yönleri oklarla göreceksin.':m280.level===2?'Taşa dokun: gidebileceği yasal kareler işaretlenecek.':'Gerçek oyun modu: hamle yardımı gösterilmez.'}</div>
 <div class="m271-voicebar"><button class="ghost" onclick="m280SpeakState()">🔁 Yönergeyi Dinle</button><button class="ghost" onclick="m280Rules()">📖 Kurallar</button></div></main>`;
 if(m280.level===1&&m280.selected)m280DrawArrows();
}
function m280SpeakState(){m271Speak(m280.turn==='w'?'Sıra sende. Beyaz taşlardan birini seç ve hamleni yap.':'Bilgisayar hamlesini yapıyor.','tr-TR')}
function m280Tap(y,x){
 if(m280.turn!=='w'||m280.thinking)return;const p=m280.b[y][x];
 if(m280.selected){
   const m=m280.legal.find(z=>z.ty===y&&z.tx===x);
   if(m)return m280HumanMove(m);
 }
 if(p?.c==='w'){
   m280.selected=[y,x];m280.legal=m280MovesFrom(y,x);
   if(m280.level===1)m271Speak(`${M280_NAME[p.t]}. ${m280.legal.length} yasal hamle var.`,'tr-TR');
   m280Render();
 }else{m280.selected=null;m280.legal=[];m280Render()}
}
function m280DrawArrows(){
 const svg=document.querySelector('#m280arrows');if(!svg||!m280.selected)return;const [sy,sx]=m280.selected,scx=(sx+.5)*12.5,scy=(sy+.5)*12.5;
 svg.innerHTML=`<defs><marker id="m280arr" markerUnits="userSpaceOnUse" markerWidth="3.5" markerHeight="3.5" refX="3.1" refY="1.75" orient="auto"><path d="M0,0 L3.5,1.75 L0,3.5 Z" fill="#ef476f"/></marker></defs>`+
 m280.legal.map(m=>{const ex=(m.tx+.5)*12.5,ey=(m.ty+.5)*12.5,p=m280.b[m.fy][m.fx];if(p?.t==='n'){const mx=Math.abs(m.tx-m.fx)===2?ex:scx,my=Math.abs(m.tx-m.fx)===2?scy:ey;return `<polyline points="${scx},${scy} ${mx},${my} ${ex},${ey}" class="m280-arrow" marker-end="url(#m280arr)"/>`}return `<line x1="${scx}" y1="${scy}" x2="${ex}" y2="${ey}" class="m280-arrow" marker-end="url(#m280arr)"/>`}).join('');
}
function m280HumanMove(m){
 const p=m280.b[m.fy][m.fx];
 if(m.special==='promotion')return m280Promotion(m);
 m280=m280Apply(m280,m);m280.selected=null;m280.legal=[];m263Fx?.('tap');m280AfterMove(p.c);
}
function m280Promotion(m){
 modal(`<h2>Piyon terfi ediyor! 🎉</h2><p>Hangi taşa dönüşsün?</p><div class="m280-promote">${[['q','♕ Vezir'],['r','♖ Kale'],['b','♗ Fil'],['n','♘ At']].map(x=>`<button onclick="closeModal();m280=m280Apply(m280,${JSON.stringify(m)},'${x[0]}');m280.selected=null;m280.legal=[];m280AfterMove('w')">${x[1]}</button>`).join('')}</div>`);
}
function m280AfterMove(who){
 const side=m280.turn,moves=m280Legal(m280,side),check=m280Check(m280,side);
 if(!moves.length){
   if(check){const winner=side==='w'?'Bilgisayar':'Sen';m280.status='mate';m280Render();m270Applause?.();m271Speak(`Şah mat. ${winner} kazandın.`,'tr-TR');return modal(`<h2>♚ Şah Mat!</h2><p>${winner==='Sen'?'Harika! Bilgisayarı mat ettin.':'Bu kez bilgisayar kazandı. Tekrar deneyebilirsin.'}</p><div class="modal-actions"><button onclick="closeModal();m280New(${m280.level})">↻ Tekrar Oyna</button><button onclick="closeModal();m280ChooseLevel()">Seviyeler</button></div>`)}
   m280.status='stalemate';m280Render();m271Speak('Pat. Oyun berabere.','tr-TR');return modal(`<h2>🤝 Pat • Berabere</h2><div class="modal-actions"><button onclick="closeModal();m280New(${m280.level})">Tekrar Oyna</button></div>`);
 }
 if(m280.half>=100){m280.status='draw';m280Render();return modal(`<h2>🤝 Berabere</h2><p>Elli hamle kuralı.</p><button onclick="closeModal();m280New(${m280.level})">Tekrar Oyna</button>`)}
 m280Render();if(m280.turn==='b'){m280.thinking=true;m280Render();setTimeout(m280Computer,420)}
}
function m280Eval(s){
 const val={p:100,n:320,b:330,r:500,q:900,k:20000};let z=0;
 for(let y=0;y<8;y++)for(let x=0;x<8;x++){const p=s.b[y][x];if(p)z+=(p.c==='b'?1:-1)*(val[p.t]+(p.t==='p'?(p.c==='b'?y:7-y)*4:0))}
 return z;
}
function m280Computer(){
 if(m280.turn!=='b')return;const moves=m280Legal(m280,'b');if(!moves.length)return m280AfterMove('w');
 let chosen;
 if(m280.level===1){
   const captures=moves.filter(m=>m280.b[m.ty][m.tx]);chosen=(captures.length&&Math.random()<.55?captures:moves)[Math.floor(Math.random()*(captures.length&&Math.random()<.55?captures:moves).length)];
 }else{
   const scored=moves.map(m=>{const n=m280Apply(m280,m);let score=m280Eval(n)+(Math.random()*18-9);if(m280Check(n,'w'))score+=m280.level===3?45:20;
     if(m280.level===3){const replies=m280Legal(n,'w');if(replies.length){let worst=Infinity;for(const r of replies.slice(0,28)){const nn=m280Apply(n,r);worst=Math.min(worst,m280Eval(nn))}score=score*.55+worst*.45}}
     return[m,score]});
   scored.sort((a,b)=>b[1]-a[1]);const pool=m280.level===2?scored.slice(0,Math.min(3,scored.length)):scored.slice(0,Math.min(2,scored.length));chosen=pool[Math.floor(Math.random()*pool.length)][0];
 }
 m280=m280Apply(m280,chosen);m280.thinking=false;m280.selected=null;m280.legal=[];m263Fx?.('tap');m280AfterMove('b');
}
function m280Rules(){
 modal(`<button class="modal-x" onclick="closeModal()">×</button><h2>♟️ Satranç Kuralları</h2><div class="m280-rules"><p><b>Amaç:</b> Rakip şahı kaçamayacağı biçimde tehdit ederek şah mat yapmak.</p><p><b>Özel kurallar:</b> Rok, geçerken alma ve piyon terfisi bu oyunda aktiftir.</p><p>Şahını tehdit altında bırakan bir hamle yapılamaz. Şah mat, pat ve 50 hamle beraberlik kuralı kontrol edilir.</p><p><b>Kolay:</b> Yasal hamle okları. <b>Orta:</b> Yasal hedef kareler. <b>Zor:</b> Hamle yardımı yok.</p></div>`);
}

/* Öğrenci ana ekranına gerçek satranç kartı ekle. */
function m280InjectChessCard(){
 const main=document.querySelector('main.kid');if(!main||document.querySelector('#m280ChessCard'))return;
 const grid=main.querySelector('.grid');if(!grid)return;
 const card=document.createElement('article');card.id='m280ChessCard';card.className='game';
 card.innerHTML=`<h2>♟️ Bilgisayara Karşı Satranç</h2><p>Gerçek satranç • 3 zorluk seviyesi</p><p>🌱 Kolay • 🌿 Orta • 🌳 Zor</p><button onclick="m280ChooseLevel()">Oyunu aç</button>`;
 grid.prepend(card);
}
new MutationObserver(()=>m280InjectChessCard()).observe(document.documentElement,{childList:true,subtree:true});
setTimeout(m280InjectChessCard,200);

/* game_type ile atanırsa da açılır */
const m280PlayBase=playGame;
playGame=function(g){if(g?.game_type==='real_chess')return m280ChooseLevel();return m280PlayBase(g)};

/* Yenilemede gerçek satranç seviyesini geri aç */
const m280RestoreBase=m272RestoreRoute;
m272RestoreRoute=async function(route){
 if(route?.name==='realChess'){m272Restoring=true;try{return m280New(Number(route.data?.level||1))}finally{m272Restoring=false}}
 return m280RestoreBase(route);
};

document.head.insertAdjacentHTML('beforeend',`<style id="m280css">
.m280-main{max-width:900px;margin:auto;padding:12px}.m280-top{display:flex;justify-content:center;align-items:center;gap:14px;flex-wrap:wrap;margin:8px 0 12px}.m280-badge{padding:8px 13px;border-radius:999px;background:#eef5ff;font-weight:900}
.m280-wrap{width:min(92vw,650px);margin:auto}.m280-board{width:100%;aspect-ratio:1;display:grid;grid-template-columns:repeat(8,1fr);grid-template-rows:repeat(8,1fr);border:5px solid #26384d;border-radius:12px;overflow:hidden;position:relative;box-shadow:0 16px 40px rgba(34,48,67,.18)}
.m280-sq{min-width:0!important;min-height:0!important;padding:0!important;border:0!important;border-radius:0!important;display:grid!important;place-items:center!important;position:relative!important;color:#222!important}.m280-sq.light{background:#f3e2c5!important}.m280-sq.dark{background:#9ab3c7!important}.m280-sq.last{box-shadow:inset 0 0 0 5px rgba(255,215,70,.62)}.m280-sq.sel{box-shadow:inset 0 0 0 6px #4169e1!important}
.m280-piece{font-family:"Times New Roman",serif;font-size:clamp(34px,7vw,68px);line-height:1;filter:drop-shadow(0 2px 1px rgba(0,0,0,.18));position:relative;z-index:3}.m280-piece.w{color:#fff;text-shadow:-1.5px -1.5px 0 #26384d,1.5px -1.5px 0 #26384d,-1.5px 1.5px 0 #26384d,1.5px 1.5px 0 #26384d}.m280-piece.b{color:#20252b}
.m280-sq.target i{width:22%;aspect-ratio:1;border-radius:50%;background:rgba(32,135,81,.72);position:absolute;z-index:2}.m280-sq.target .m280-piece+i{width:82%;border:5px solid #29a363;background:transparent}
#m280arrows{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:5}.m280-arrow{stroke:#ef476f;stroke-width:1.2;fill:none;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.m280-help{max-width:650px;margin:12px auto;padding:12px 16px;border-radius:16px;background:#fff7e8;text-align:center;font-weight:700}.m280-promote{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.m280-promote button{font-size:22px}.m280-rules{text-align:left;line-height:1.55}
@media(max-width:600px){.m280-main{padding:6px}.m280-board{border-width:3px}.m280-piece{font-size:clamp(28px,10vw,52px)}.m280-top{gap:7px}.m280-help{font-size:13px}}
</style>`);
