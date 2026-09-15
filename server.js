const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {DatabaseSync}=require('node:sqlite');
const {Pool}=require('pg');

const PORT=Number(process.env.PORT||3000);
const TEACHER_PASSWORD=process.env.TEACHER_PASSWORD||'minoo123';
const DATABASE_URL=process.env.DATABASE_URL||'';
const usePostgres=Boolean(DATABASE_URL);
let sqlite,pool;

function makeCode(){const a='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='MIN-';for(let i=0;i<6;i++)s+=a[crypto.randomInt(a.length)];return s}
async function initDb(){
 if(usePostgres){
  pool=new Pool({connectionString:DATABASE_URL,ssl:{rejectUnauthorized:false}});
  await pool.query(`
   CREATE TABLE IF NOT EXISTS classes(id BIGSERIAL PRIMARY KEY,name TEXT NOT NULL UNIQUE,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
   CREATE TABLE IF NOT EXISTS students(id BIGSERIAL PRIMARY KEY,class_id BIGINT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,name TEXT NOT NULL,code TEXT NOT NULL UNIQUE,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
   CREATE TABLE IF NOT EXISTS games(id BIGSERIAL PRIMARY KEY,title TEXT NOT NULL,canva_url TEXT NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
   CREATE TABLE IF NOT EXISTS assignments(id BIGSERIAL PRIMARY KEY,game_id BIGINT NOT NULL REFERENCES games(id) ON DELETE CASCADE,student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),completed_at TIMESTAMPTZ,UNIQUE(game_id,student_id));
  `);
 }else{
  sqlite=new DatabaseSync(path.join(__dirname,'minoo.db')); sqlite.exec(`PRAGMA foreign_keys=ON;
   CREATE TABLE IF NOT EXISTS classes(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL UNIQUE,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
   CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY AUTOINCREMENT,class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,name TEXT NOT NULL,code TEXT NOT NULL UNIQUE,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
   CREATE TABLE IF NOT EXISTS games(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL,canva_url TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
   CREATE TABLE IF NOT EXISTS assignments(id INTEGER PRIMARY KEY AUTOINCREMENT,game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,assigned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,completed_at TEXT,UNIQUE(game_id,student_id));`);
 }
}
async function q(pg,p=[],sq=pg){return usePostgres?(await pool.query(pg,p)).rows:sqlite.prepare(sq).all(...p)}
async function one(pg,p=[],sq=pg){return usePostgres?(await pool.query(pg,p)).rows[0]:sqlite.prepare(sq).get(...p)}
async function run(pg,p=[],sq=pg){return usePostgres?pool.query(pg,p):sqlite.prepare(sq).run(...p)}
function json(res,status,obj){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'});res.end(JSON.stringify(obj))}
function body(req){return new Promise((ok,no)=>{let d='';req.on('data',c=>{d+=c;if(d.length>1e6)req.destroy()});req.on('end',()=>{try{ok(d?JSON.parse(d):{})}catch(e){no(e)}});req.on('error',no)})}
function teacher(req){return req.headers['x-teacher-password']===TEACHER_PASSWORD}
function needTeacher(req,res){if(!teacher(req)){json(res,401,{error:'Öğretmen oturumu gerekli'});return false}return true}
function validUrl(v){try{const u=new URL(v);return ['https:'].includes(u.protocol)&&/(^|\.)canva\.com$/i.test(u.hostname)}catch{return false}}
async function uniqueCode(){let c;do{c=makeCode()}while(await one(usePostgres?'SELECT 1 FROM students WHERE code=$1':'',[c],'SELECT 1 FROM students WHERE code=?'));return c}

async function api(req,res,url){
 try{
  if(req.method==='POST'&&url.pathname==='/api/teacher/login'){const b=await body(req);const ok=b.password===TEACHER_PASSWORD;return json(res,ok?200:401,{ok})}
  if(req.method==='GET'&&url.pathname==='/api/classes'){if(!needTeacher(req,res))return;const r=usePostgres?await q(`SELECT c.*,COUNT(s.id)::int student_count FROM classes c LEFT JOIN students s ON s.class_id=c.id GROUP BY c.id ORDER BY c.name`):await q('',[],`SELECT c.*,COUNT(s.id) student_count FROM classes c LEFT JOIN students s ON s.class_id=c.id GROUP BY c.id ORDER BY c.name`);return json(res,200,r)}
  if(req.method==='POST'&&url.pathname==='/api/classes'){if(!needTeacher(req,res))return;const b=await body(req),name=String(b.name||'').trim();if(!name)return json(res,400,{error:'Sınıf adı gerekli'});try{if(usePostgres){const r=await pool.query('INSERT INTO classes(name) VALUES($1) RETURNING id,name',[name]);return json(res,201,r.rows[0])}const r=sqlite.prepare('INSERT INTO classes(name) VALUES(?)').run(name);return json(res,201,{id:Number(r.lastInsertRowid),name})}catch{return json(res,409,{error:'Bu sınıf zaten var'})}}
  let m=url.pathname.match(/^\/api\/classes\/(\d+)$/);
  if(m&&req.method==='PATCH'){if(!needTeacher(req,res))return;const b=await body(req),name=String(b.name||'').trim();if(!name)return json(res,400,{error:'Sınıf adı gerekli'});try{await run(usePostgres?'UPDATE classes SET name=$1 WHERE id=$2':'',[name,Number(m[1])],'UPDATE classes SET name=? WHERE id=?');return json(res,200,{ok:true})}catch{return json(res,409,{error:'Bu sınıf adı kullanılıyor'})}}
  if(m&&req.method==='DELETE'){if(!needTeacher(req,res))return;await run(usePostgres?'DELETE FROM classes WHERE id=$1':'',[Number(m[1])],'DELETE FROM classes WHERE id=?');return json(res,200,{ok:true})}

  m=url.pathname.match(/^\/api\/classes\/(\d+)\/students$/);
  if(m&&req.method==='GET'){if(!needTeacher(req,res))return;const id=Number(m[1]);const r=usePostgres?await q(`SELECT s.*,COUNT(a.id)::int assigned_count,COUNT(a.completed_at)::int completed_count FROM students s LEFT JOIN assignments a ON a.student_id=s.id WHERE s.class_id=$1 GROUP BY s.id ORDER BY s.name`,[id]):await q('',[id],`SELECT s.*,COUNT(a.id) assigned_count,SUM(CASE WHEN a.completed_at IS NOT NULL THEN 1 ELSE 0 END) completed_count FROM students s LEFT JOIN assignments a ON a.student_id=s.id WHERE s.class_id=? GROUP BY s.id ORDER BY s.name`);return json(res,200,r)}
  if(m&&req.method==='POST'){if(!needTeacher(req,res))return;const b=await body(req),name=String(b.name||'').trim();if(!name)return json(res,400,{error:'Öğrenci adı gerekli'});const code=await uniqueCode();if(usePostgres){const r=await pool.query('INSERT INTO students(class_id,name,code) VALUES($1,$2,$3) RETURNING id,name,code',[Number(m[1]),name,code]);return json(res,201,r.rows[0])}const r=sqlite.prepare('INSERT INTO students(class_id,name,code) VALUES(?,?,?)').run(Number(m[1]),name,code);return json(res,201,{id:Number(r.lastInsertRowid),name,code})}
  m=url.pathname.match(/^\/api\/classes\/(\d+)\/students\/bulk$/);
  if(m&&req.method==='POST'){if(!needTeacher(req,res))return;const b=await body(req),names=(Array.isArray(b.names)?b.names:[]).map(x=>String(x).trim()).filter(Boolean).slice(0,100);if(!names.length)return json(res,400,{error:'En az bir öğrenci adı gerekli'});let out=[];for(const name of names){const code=await uniqueCode();if(usePostgres){const r=await pool.query('INSERT INTO students(class_id,name,code) VALUES($1,$2,$3) RETURNING id,name,code',[Number(m[1]),name,code]);out.push(r.rows[0])}else{const r=sqlite.prepare('INSERT INTO students(class_id,name,code) VALUES(?,?,?)').run(Number(m[1]),name,code);out.push({id:Number(r.lastInsertRowid),name,code})}}return json(res,201,out)}

  m=url.pathname.match(/^\/api\/students\/(\d+)$/);
  if(m&&req.method==='PATCH'){if(!needTeacher(req,res))return;const b=await body(req),sid=Number(m[1]);if(b.name!==undefined){const name=String(b.name).trim();if(!name)return json(res,400,{error:'Ad gerekli'});await run(usePostgres?'UPDATE students SET name=$1 WHERE id=$2':'',[name,sid],'UPDATE students SET name=? WHERE id=?')}if(b.class_id!==undefined)await run(usePostgres?'UPDATE students SET class_id=$1 WHERE id=$2':'',[Number(b.class_id),sid],'UPDATE students SET class_id=? WHERE id=?');return json(res,200,{ok:true})}
  if(m&&req.method==='DELETE'){if(!needTeacher(req,res))return;await run(usePostgres?'DELETE FROM students WHERE id=$1':'',[Number(m[1])],'DELETE FROM students WHERE id=?');return json(res,200,{ok:true})}
  m=url.pathname.match(/^\/api\/students\/(\d+)\/regenerate-code$/);
  if(m&&req.method==='POST'){if(!needTeacher(req,res))return;const code=await uniqueCode();await run(usePostgres?'UPDATE students SET code=$1 WHERE id=$2':'',[code,Number(m[1])],'UPDATE students SET code=? WHERE id=?');return json(res,200,{code})}
  m=url.pathname.match(/^\/api\/students\/(\d+)\/profile$/);
  if(m&&req.method==='GET'){if(!needTeacher(req,res))return;const sid=Number(m[1]);const s=usePostgres?await one(`SELECT s.*,c.name class_name FROM students s JOIN classes c ON c.id=s.class_id WHERE s.id=$1`,[sid]):await one('',[sid],`SELECT s.*,c.name class_name FROM students s JOIN classes c ON c.id=s.class_id WHERE s.id=?`);if(!s)return json(res,404,{error:'Öğrenci bulunamadı'});const games=usePostgres?await q(`SELECT g.id game_id,g.title,g.canva_url,a.assigned_at,a.completed_at FROM assignments a JOIN games g ON g.id=a.game_id WHERE a.student_id=$1 ORDER BY a.id DESC`,[sid]):await q('',[sid],`SELECT g.id game_id,g.title,g.canva_url,a.assigned_at,a.completed_at FROM assignments a JOIN games g ON g.id=a.game_id WHERE a.student_id=? ORDER BY a.id DESC`);return json(res,200,{student:s,games})}

  if(req.method==='GET'&&url.pathname==='/api/games'){if(!needTeacher(req,res))return;const r=usePostgres?await q(`SELECT g.*,COUNT(a.id)::int assigned_count,COUNT(a.completed_at)::int completed_count FROM games g LEFT JOIN assignments a ON a.game_id=g.id GROUP BY g.id ORDER BY g.id DESC`):await q('',[],`SELECT g.*,COUNT(a.id) assigned_count,SUM(CASE WHEN a.completed_at IS NOT NULL THEN 1 ELSE 0 END) completed_count FROM games g LEFT JOIN assignments a ON a.game_id=g.id GROUP BY g.id ORDER BY g.id DESC`);return json(res,200,r)}
  if(req.method==='POST'&&url.pathname==='/api/games'){if(!needTeacher(req,res))return;const b=await body(req),title=String(b.title||'').trim(),canva=String(b.canva_url||'').trim();if(!title||!validUrl(canva))return json(res,400,{error:'Oyun adı ve https://...canva.com bağlantısı gerekli'});if(usePostgres){const r=await pool.query('INSERT INTO games(title,canva_url) VALUES($1,$2) RETURNING *',[title,canva]);return json(res,201,r.rows[0])}const r=sqlite.prepare('INSERT INTO games(title,canva_url) VALUES(?,?)').run(title,canva);return json(res,201,{id:Number(r.lastInsertRowid),title,canva_url:canva})}
  m=url.pathname.match(/^\/api\/games\/(\d+)$/);
  if(m&&req.method==='PATCH'){if(!needTeacher(req,res))return;const b=await body(req),gid=Number(m[1]),title=String(b.title||'').trim(),canva=String(b.canva_url||'').trim();if(!title||!validUrl(canva))return json(res,400,{error:'Geçerli oyun adı ve Canva bağlantısı gerekli'});await run(usePostgres?'UPDATE games SET title=$1,canva_url=$2 WHERE id=$3':'',[title,canva,gid],'UPDATE games SET title=?,canva_url=? WHERE id=?');return json(res,200,{ok:true})}
  if(m&&req.method==='DELETE'){if(!needTeacher(req,res))return;await run(usePostgres?'DELETE FROM games WHERE id=$1':'',[Number(m[1])],'DELETE FROM games WHERE id=?');return json(res,200,{ok:true})}

  m=url.pathname.match(/^\/api\/games\/(\d+)\/assignment-students$/);
  if(m&&req.method==='GET'){if(!needTeacher(req,res))return;const gid=Number(m[1]),cid=Number(url.searchParams.get('class_id'));const r=usePostgres?await q(`SELECT s.id,s.name,s.code,(a.id IS NOT NULL) assigned,(a.completed_at IS NOT NULL) completed FROM students s LEFT JOIN assignments a ON a.student_id=s.id AND a.game_id=$1 WHERE s.class_id=$2 ORDER BY s.name`,[gid,cid]):await q('',[gid,cid],`SELECT s.id,s.name,s.code,(a.id IS NOT NULL) assigned,(a.completed_at IS NOT NULL) completed FROM students s LEFT JOIN assignments a ON a.student_id=s.id AND a.game_id=? WHERE s.class_id=? ORDER BY s.name`);return json(res,200,r)}
  if(m&&req.method==='PUT'){if(!needTeacher(req,res))return;const gid=Number(m[1]),b=await body(req),cid=Number(b.class_id),ids=[...new Set((b.student_ids||[]).map(Number).filter(Number.isFinite))];const valid=(usePostgres?await q('SELECT id FROM students WHERE class_id=$1',[cid]):await q('',[cid],'SELECT id FROM students WHERE class_id=?')).map(x=>Number(x.id));const selected=ids.filter(x=>valid.includes(x));const current=usePostgres?await q(`SELECT a.student_id,a.completed_at FROM assignments a JOIN students s ON s.id=a.student_id WHERE a.game_id=$1 AND s.class_id=$2`,[gid,cid]):await q('',[gid,cid],`SELECT a.student_id,a.completed_at FROM assignments a JOIN students s ON s.id=a.student_id WHERE a.game_id=? AND s.class_id=?`);const cur=new Map(current.map(x=>[Number(x.student_id),x.completed_at]));for(const sid of selected)if(!cur.has(sid)){if(usePostgres)await pool.query('INSERT INTO assignments(game_id,student_id) VALUES($1,$2) ON CONFLICT DO NOTHING',[gid,sid]);else sqlite.prepare('INSERT OR IGNORE INTO assignments(game_id,student_id) VALUES(?,?)').run(gid,sid)}for(const [sid,completed] of cur)if(!selected.includes(sid)){if(completed)return json(res,409,{error:'Tamamlamış bir öğrenci atamadan çıkarılamaz. Önce kaydını koruyarak bırakmalısın.'});if(usePostgres)await pool.query('DELETE FROM assignments WHERE game_id=$1 AND student_id=$2',[gid,sid]);else sqlite.prepare('DELETE FROM assignments WHERE game_id=? AND student_id=?').run(gid,sid)}return json(res,200,{ok:true})}

  m=url.pathname.match(/^\/api\/classes\/(\d+)\/assignments$/);
  if(m&&req.method==='GET'){if(!needTeacher(req,res))return;const cid=Number(m[1]);const r=usePostgres?await q(`SELECT g.id game_id,g.title,g.canva_url,s.id student_id,s.name,s.code,a.completed_at,a.assigned_at FROM assignments a JOIN games g ON g.id=a.game_id JOIN students s ON s.id=a.student_id WHERE s.class_id=$1 ORDER BY g.id DESC,s.name`,[cid]):await q('',[cid],`SELECT g.id game_id,g.title,g.canva_url,s.id student_id,s.name,s.code,a.completed_at,a.assigned_at FROM assignments a JOIN games g ON g.id=a.game_id JOIN students s ON s.id=a.student_id WHERE s.class_id=? ORDER BY g.id DESC,s.name`);return json(res,200,r)}

  if(req.method==='POST'&&url.pathname==='/api/student/login'){const b=await body(req),code=String(b.code||'').trim().toUpperCase();const s=usePostgres?await one(`SELECT s.id,s.name,s.code,c.name class_name FROM students s JOIN classes c ON c.id=s.class_id WHERE s.code=$1`,[code]):await one('',[code],`SELECT s.id,s.name,s.code,c.name class_name FROM students s JOIN classes c ON c.id=s.class_id WHERE s.code=?`);if(!s)return json(res,404,{error:'Kod bulunamadı'});return json(res,200,s)}
  m=url.pathname.match(/^\/api\/student\/(\d+)\/games$/);
  if(m&&req.method==='GET'){const sid=Number(m[1]),code=String(req.headers['x-student-code']||'').toUpperCase();const ok=usePostgres?await one('SELECT 1 FROM students WHERE id=$1 AND code=$2',[sid,code]):await one('',[sid,code],'SELECT 1 FROM students WHERE id=? AND code=?');if(!ok)return json(res,401,{error:'Geçersiz öğrenci erişimi'});const r=usePostgres?await q(`SELECT a.id assignment_id,g.title,g.canva_url,a.completed_at,a.assigned_at FROM assignments a JOIN games g ON g.id=a.game_id WHERE a.student_id=$1 ORDER BY a.id DESC`,[sid]):await q('',[sid],`SELECT a.id assignment_id,g.title,g.canva_url,a.completed_at,a.assigned_at FROM assignments a JOIN games g ON g.id=a.game_id WHERE a.student_id=? ORDER BY a.id DESC`);return json(res,200,r)}
  m=url.pathname.match(/^\/api\/assignments\/(\d+)\/complete$/);
  if(m&&req.method==='POST'){const aid=Number(m[1]),code=String(req.headers['x-student-code']||'').toUpperCase();const a=usePostgres?await one(`SELECT a.id FROM assignments a JOIN students s ON s.id=a.student_id WHERE a.id=$1 AND s.code=$2`,[aid,code]):await one('',[aid,code],`SELECT a.id FROM assignments a JOIN students s ON s.id=a.student_id WHERE a.id=? AND s.code=?`);if(!a)return json(res,401,{error:'Yetkisiz'});await run(usePostgres?'UPDATE assignments SET completed_at=COALESCE(completed_at,NOW()) WHERE id=$1':'',[aid],"UPDATE assignments SET completed_at=COALESCE(completed_at,datetime('now')) WHERE id=?");return json(res,200,{ok:true})}
  return json(res,404,{error:'Bulunamadı'});
 }catch(e){console.error(e);return json(res,500,{error:'Sunucu hatası'})}
}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{const url=new URL(req.url,`http://${req.headers.host||'localhost'}`);if(url.pathname.startsWith('/api/'))return api(req,res,url);let p=url.pathname==='/'?'/index.html':url.pathname;p=path.normalize(p).replace(/^\.\.(\/|\\|$)/,'');const file=path.join(__dirname,'public',p);if(!file.startsWith(path.join(__dirname,'public'))){res.writeHead(403);return res.end('Forbidden')}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':path.extname(file)==='.html'?'no-cache':'public, max-age=300','X-Content-Type-Options':'nosniff'});res.end(data)})});
initDb().then(()=>server.listen(PORT,()=>console.log(`Minoo v1.5: http://localhost:${PORT}`))).catch(e=>{console.error(e);process.exit(1)});
