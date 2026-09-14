const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const PORT = Number(process.env.PORT || 3000);
const TEACHER_PASSWORD = process.env.TEACHER_PASSWORD || 'minoo123';
const db = new DatabaseSync(path.join(__dirname, 'minoo.db'));

db.exec(`
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  canva_url TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  assigned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TEXT,
  UNIQUE(game_id, student_id)
);
`);

if (db.prepare('SELECT COUNT(*) c FROM classes').get().c === 0) {
  db.prepare('INSERT INTO classes(name) VALUES (?)').run('Afacanlar');
  const cid = db.prepare('SELECT id FROM classes WHERE name=?').get('Afacanlar').id;
  for (const name of ['Defne Yılmaz','Efe Demir','Elif Kaya']) {
    db.prepare('INSERT INTO students(class_id,name,code) VALUES (?,?,?)').run(cid,name,makeCode());
  }
}

function makeCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = 'MIN-';
  for (let i=0;i<6;i++) s += alphabet[crypto.randomInt(alphabet.length)];
  return s;
}
function json(res, status, body) {
  res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
  res.end(JSON.stringify(body));
}
function body(req) {
  return new Promise((resolve,reject)=>{
    let data='';
    req.on('data',c=>{data+=c; if(data.length>1e6) req.destroy();});
    req.on('end',()=>{try{resolve(data?JSON.parse(data):{});}catch(e){reject(e);}});
    req.on('error',reject);
  });
}
function isTeacher(req) { return req.headers['x-teacher-password'] === TEACHER_PASSWORD; }
function needTeacher(req,res) { if(!isTeacher(req)){json(res,401,{error:'Öğretmen oturumu gerekli'}); return false;} return true; }

async function api(req,res,url) {
  try {
    if (req.method==='POST' && url.pathname==='/api/teacher/login') {
      const b=await body(req); return json(res,b.password===TEACHER_PASSWORD?200:401,{ok:b.password===TEACHER_PASSWORD});
    }
    if (req.method==='GET' && url.pathname==='/api/classes') {
      if(!needTeacher(req,res)) return;
      const rows=db.prepare(`SELECT c.*, COUNT(s.id) student_count FROM classes c LEFT JOIN students s ON s.class_id=c.id GROUP BY c.id ORDER BY c.name`).all();
      return json(res,200,rows);
    }
    if (req.method==='POST' && url.pathname==='/api/classes') {
      if(!needTeacher(req,res)) return; const b=await body(req); const name=String(b.name||'').trim();
      if(!name) return json(res,400,{error:'Sınıf adı gerekli'});
      try { const r=db.prepare('INSERT INTO classes(name) VALUES (?)').run(name); return json(res,201,{id:Number(r.lastInsertRowid),name}); }
      catch { return json(res,409,{error:'Bu sınıf zaten var'}); }
    }
    const sm=url.pathname.match(/^\/api\/classes\/(\d+)\/students$/);
    if (sm && req.method==='GET') {
      if(!needTeacher(req,res)) return; const id=Number(sm[1]);
      const rows=db.prepare(`SELECT s.*, COUNT(a.id) assigned_count, SUM(CASE WHEN a.completed_at IS NOT NULL THEN 1 ELSE 0 END) completed_count FROM students s LEFT JOIN assignments a ON a.student_id=s.id WHERE s.class_id=? GROUP BY s.id ORDER BY s.name`).all(id);
      return json(res,200,rows);
    }
    if (sm && req.method==='POST') {
      if(!needTeacher(req,res)) return; const b=await body(req); const name=String(b.name||'').trim(); if(!name)return json(res,400,{error:'Öğrenci adı gerekli'});
      let code; do {code=makeCode();} while(db.prepare('SELECT 1 FROM students WHERE code=?').get(code));
      const r=db.prepare('INSERT INTO students(class_id,name,code) VALUES (?,?,?)').run(Number(sm[1]),name,code);
      return json(res,201,{id:Number(r.lastInsertRowid),name,code});
    }
    if (req.method==='POST' && url.pathname==='/api/games/assign') {
      if(!needTeacher(req,res)) return; const b=await body(req);
      const title=String(b.title||'').trim(), canva=String(b.canva_url||'').trim();
      if(!title || !/^https?:\/\//i.test(canva)) return json(res,400,{error:'Oyun adı ve geçerli bağlantı gerekli'});
      const gr=db.prepare('INSERT INTO games(title,canva_url) VALUES (?,?)').run(title,canva); const gid=Number(gr.lastInsertRowid);
      let ids=[];
      if (b.class_id) ids=db.prepare('SELECT id FROM students WHERE class_id=?').all(Number(b.class_id)).map(x=>x.id);
      else if (b.student_id) ids=[Number(b.student_id)];
      if(!ids.length) return json(res,400,{error:'Atanacak öğrenci bulunamadı'});
      const ins=db.prepare('INSERT OR IGNORE INTO assignments(game_id,student_id) VALUES (?,?)');
      for(const sid of ids) ins.run(gid,sid);
      return json(res,201,{game_id:gid,assigned:ids.length});
    }
    const cm=url.pathname.match(/^\/api\/classes\/(\d+)\/assignments$/);
    if(cm && req.method==='GET') {
      if(!needTeacher(req,res)) return;
      const rows=db.prepare(`SELECT g.id game_id,g.title,g.canva_url,s.id student_id,s.name,s.code,a.completed_at,a.assigned_at FROM assignments a JOIN games g ON g.id=a.game_id JOIN students s ON s.id=a.student_id WHERE s.class_id=? ORDER BY g.id DESC,s.name`).all(Number(cm[1]));
      return json(res,200,rows);
    }
    if(req.method==='POST' && url.pathname==='/api/student/login') {
      const b=await body(req); const code=String(b.code||'').trim().toUpperCase();
      const s=db.prepare(`SELECT s.id,s.name,s.code,c.name class_name FROM students s JOIN classes c ON c.id=s.class_id WHERE s.code=?`).get(code);
      if(!s) return json(res,404,{error:'Kod bulunamadı'}); return json(res,200,s);
    }
    const gm=url.pathname.match(/^\/api\/student\/(\d+)\/games$/);
    if(gm && req.method==='GET') {
      const sid=Number(gm[1]); const code=String(req.headers['x-student-code']||'').toUpperCase();
      const ok=db.prepare('SELECT 1 FROM students WHERE id=? AND code=?').get(sid,code); if(!ok)return json(res,401,{error:'Geçersiz öğrenci erişimi'});
      const rows=db.prepare(`SELECT a.id assignment_id,g.title,g.canva_url,a.completed_at,a.assigned_at FROM assignments a JOIN games g ON g.id=a.game_id WHERE a.student_id=? ORDER BY a.id DESC`).all(sid);
      return json(res,200,rows);
    }
    const done=url.pathname.match(/^\/api\/assignments\/(\d+)\/complete$/);
    if(done && req.method==='POST') {
      const aid=Number(done[1]); const code=String(req.headers['x-student-code']||'').toUpperCase();
      const a=db.prepare(`SELECT a.id FROM assignments a JOIN students s ON s.id=a.student_id WHERE a.id=? AND s.code=?`).get(aid,code); if(!a)return json(res,401,{error:'Yetkisiz'});
      db.prepare("UPDATE assignments SET completed_at=COALESCE(completed_at,datetime('now')) WHERE id=?").run(aid);
      return json(res,200,{ok:true});
    }
    return json(res,404,{error:'Bulunamadı'});
  } catch(e) { console.error(e); return json(res,500,{error:'Sunucu hatası'}); }
}

const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,`http://${req.headers.host||'localhost'}`);
  if(url.pathname.startsWith('/api/')) return api(req,res,url);
  let p=url.pathname==='/'?'/index.html':url.pathname;
  p=path.normalize(p).replace(/^\.\.(\/|\\|$)/,'');
  const file=path.join(__dirname,'public',p);
  if(!file.startsWith(path.join(__dirname,'public'))) {res.writeHead(403); return res.end('Forbidden');}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);});
});
server.listen(PORT,()=>console.log(`Minoo: http://localhost:${PORT}`));
