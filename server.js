const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');
const { Pool } = require('pg');

const PORT = Number(process.env.PORT || 3000);
const TEACHER_PASSWORD = process.env.TEACHER_PASSWORD || 'minoo123';
const DATABASE_URL = process.env.DATABASE_URL || '';
const usePostgres = Boolean(DATABASE_URL);

let sqlite;
let pool;

function makeCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = 'MIN-';
  for (let i=0;i<6;i++) s += alphabet[crypto.randomInt(alphabet.length)];
  return s;
}

async function initDb() {
  if (usePostgres) {
    pool = new Pool({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
    await pool.query(`
      CREATE TABLE IF NOT EXISTS classes (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS students (
        id BIGSERIAL PRIMARY KEY,
        class_id BIGINT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        code TEXT NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS games (
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        canva_url TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS assignments (
        id BIGSERIAL PRIMARY KEY,
        game_id BIGINT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
        student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        completed_at TIMESTAMPTZ,
        UNIQUE(game_id, student_id)
      );
    `);
    const { rows } = await pool.query('SELECT COUNT(*)::int AS c FROM classes');
    if (rows[0].c === 0) {
      const c = await pool.query('INSERT INTO classes(name) VALUES($1) RETURNING id', ['Afacanlar']);
      const cid = c.rows[0].id;
      for (const name of ['Defne Yılmaz','Efe Demir','Elif Kaya']) {
        await pool.query('INSERT INTO students(class_id,name,code) VALUES($1,$2,$3)', [cid,name,makeCode()]);
      }
    }
    console.log('Minoo database: PostgreSQL');
  } else {
    sqlite = new DatabaseSync(path.join(__dirname, 'minoo.db'));
    sqlite.exec(`
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
    if (sqlite.prepare('SELECT COUNT(*) c FROM classes').get().c === 0) {
      sqlite.prepare('INSERT INTO classes(name) VALUES (?)').run('Afacanlar');
      const cid = sqlite.prepare('SELECT id FROM classes WHERE name=?').get('Afacanlar').id;
      for (const name of ['Defne Yılmaz','Efe Demir','Elif Kaya']) {
        sqlite.prepare('INSERT INTO students(class_id,name,code) VALUES (?,?,?)').run(cid,name,makeCode());
      }
    }
    console.log('Minoo database: SQLite fallback');
  }
}

async function q(sqlPg, params=[], sqlLite=sqlPg) {
  if (usePostgres) return (await pool.query(sqlPg, params)).rows;
  const stmt = sqlite.prepare(sqlLite);
  return stmt.all(...params);
}
async function one(sqlPg, params=[], sqlLite=sqlPg) {
  if (usePostgres) return (await pool.query(sqlPg, params)).rows[0];
  return sqlite.prepare(sqlLite).get(...params);
}
async function run(sqlPg, params=[], sqlLite=sqlPg) {
  if (usePostgres) return await pool.query(sqlPg, params);
  return sqlite.prepare(sqlLite).run(...params);
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
      const rows = usePostgres
        ? await q(`SELECT c.*, COUNT(s.id)::int student_count FROM classes c LEFT JOIN students s ON s.class_id=c.id GROUP BY c.id ORDER BY c.name`)
        : await q('',[],`SELECT c.*, COUNT(s.id) student_count FROM classes c LEFT JOIN students s ON s.class_id=c.id GROUP BY c.id ORDER BY c.name`);
      return json(res,200,rows);
    }
    if (req.method==='POST' && url.pathname==='/api/classes') {
      if(!needTeacher(req,res)) return; const b=await body(req); const name=String(b.name||'').trim();
      if(!name) return json(res,400,{error:'Sınıf adı gerekli'});
      try {
        if(usePostgres){ const r=await pool.query('INSERT INTO classes(name) VALUES($1) RETURNING id,name',[name]); return json(res,201,r.rows[0]); }
        const r=sqlite.prepare('INSERT INTO classes(name) VALUES (?)').run(name); return json(res,201,{id:Number(r.lastInsertRowid),name});
      } catch { return json(res,409,{error:'Bu sınıf zaten var'}); }
    }
    const classItem=url.pathname.match(/^\/api\/classes\/(\d+)$/);
    if(classItem && req.method==='PATCH'){
      if(!needTeacher(req,res))return; const id=Number(classItem[1]), b=await body(req), name=String(b.name||'').trim();
      if(!name)return json(res,400,{error:'Sınıf adı gerekli'});
      try{
        if(usePostgres){const r=await pool.query('UPDATE classes SET name=$1 WHERE id=$2 RETURNING id,name',[name,id]);if(!r.rowCount)return json(res,404,{error:'Sınıf bulunamadı'});return json(res,200,r.rows[0]);}
        const r=sqlite.prepare('UPDATE classes SET name=? WHERE id=?').run(name,id);if(!r.changes)return json(res,404,{error:'Sınıf bulunamadı'});return json(res,200,{id,name});
      }catch{return json(res,409,{error:'Bu sınıf adı zaten kullanılıyor'});}
    }
    if(classItem && req.method==='DELETE'){
      if(!needTeacher(req,res))return; const id=Number(classItem[1]);
      const x=usePostgres?await one('SELECT id FROM classes WHERE id=$1',[id]):await one('',[id],'SELECT id FROM classes WHERE id=?');
      if(!x)return json(res,404,{error:'Sınıf bulunamadı'});
      if(usePostgres)await run('DELETE FROM classes WHERE id=$1',[id]);else await run('',[id],'DELETE FROM classes WHERE id=?');
      return json(res,200,{ok:true});
    }
    const sm=url.pathname.match(/^\/api\/classes\/(\d+)\/students$/);
    if (sm && req.method==='GET') {
      if(!needTeacher(req,res)) return; const id=Number(sm[1]);
      const rows = usePostgres
        ? await q(`SELECT s.*, COUNT(a.id)::int assigned_count, COUNT(a.completed_at)::int completed_count FROM students s LEFT JOIN assignments a ON a.student_id=s.id WHERE s.class_id=$1 GROUP BY s.id ORDER BY s.name`,[id])
        : await q('',[id],`SELECT s.*, COUNT(a.id) assigned_count, SUM(CASE WHEN a.completed_at IS NOT NULL THEN 1 ELSE 0 END) completed_count FROM students s LEFT JOIN assignments a ON a.student_id=s.id WHERE s.class_id=? GROUP BY s.id ORDER BY s.name`);
      return json(res,200,rows);
    }
    if (sm && req.method==='POST') {
      if(!needTeacher(req,res)) return; const b=await body(req); const name=String(b.name||'').trim(); if(!name)return json(res,400,{error:'Öğrenci adı gerekli'});
      let code;
      do { code=makeCode(); } while(await one(usePostgres?'SELECT 1 FROM students WHERE code=$1':'',[code],`SELECT 1 FROM students WHERE code=?`));
      if(usePostgres){ const r=await pool.query('INSERT INTO students(class_id,name,code) VALUES($1,$2,$3) RETURNING id,name,code',[Number(sm[1]),name,code]); return json(res,201,r.rows[0]); }
      const r=sqlite.prepare('INSERT INTO students(class_id,name,code) VALUES (?,?,?)').run(Number(sm[1]),name,code); return json(res,201,{id:Number(r.lastInsertRowid),name,code});
    }
    const studentItem=url.pathname.match(/^\/api\/students\/(\d+)$/);
    if(studentItem && req.method==='PATCH'){
      if(!needTeacher(req,res))return; const id=Number(studentItem[1]),b=await body(req),name=String(b.name||'').trim();
      if(!name)return json(res,400,{error:'Öğrenci adı gerekli'});
      if(usePostgres){const r=await pool.query('UPDATE students SET name=$1 WHERE id=$2 RETURNING id,name,code',[name,id]);if(!r.rowCount)return json(res,404,{error:'Öğrenci bulunamadı'});return json(res,200,r.rows[0]);}
      const r=sqlite.prepare('UPDATE students SET name=? WHERE id=?').run(name,id);if(!r.changes)return json(res,404,{error:'Öğrenci bulunamadı'});return json(res,200,sqlite.prepare('SELECT id,name,code FROM students WHERE id=?').get(id));
    }
    if(studentItem && req.method==='DELETE'){
      if(!needTeacher(req,res))return; const id=Number(studentItem[1]);
      const x=usePostgres?await one('SELECT id FROM students WHERE id=$1',[id]):await one('',[id],'SELECT id FROM students WHERE id=?');
      if(!x)return json(res,404,{error:'Öğrenci bulunamadı'});
      if(usePostgres)await run('DELETE FROM students WHERE id=$1',[id]);else await run('',[id],'DELETE FROM students WHERE id=?');
      return json(res,200,{ok:true});
    }
    const studentCode=url.pathname.match(/^\/api\/students\/(\d+)\/regenerate-code$/);
    if(studentCode && req.method==='POST'){
      if(!needTeacher(req,res))return; const id=Number(studentCode[1]);
      const x=usePostgres?await one('SELECT id FROM students WHERE id=$1',[id]):await one('',[id],'SELECT id FROM students WHERE id=?');
      if(!x)return json(res,404,{error:'Öğrenci bulunamadı'});
      let code; do{code=makeCode();}while(await one(usePostgres?'SELECT 1 FROM students WHERE code=$1':'',[code],'SELECT 1 FROM students WHERE code=?'));
      if(usePostgres)await run('UPDATE students SET code=$1 WHERE id=$2',[code,id]);else await run('',[code,id],'UPDATE students SET code=? WHERE id=?');
      return json(res,200,{id,code});
    }
    if (req.method==='POST' && url.pathname==='/api/games/assign') {
      if(!needTeacher(req,res)) return; const b=await body(req);
      const title=String(b.title||'').trim(), canva=String(b.canva_url||'').trim();
      if(!title || !/^https?:\/\//i.test(canva)) return json(res,400,{error:'Oyun adı ve geçerli bağlantı gerekli'});
      let ids=[];
      if (b.class_id) ids=(usePostgres?await q('SELECT id FROM students WHERE class_id=$1',[Number(b.class_id)]):await q('',[Number(b.class_id)],'SELECT id FROM students WHERE class_id=?')).map(x=>Number(x.id));
      else if (b.student_id) ids=[Number(b.student_id)];
      if(!ids.length) return json(res,400,{error:'Atanacak öğrenci bulunamadı'});

      let game = usePostgres
        ? await one('SELECT id FROM games WHERE title=$1 AND canva_url=$2 ORDER BY id DESC LIMIT 1',[title,canva])
        : await one('',[title,canva],'SELECT id FROM games WHERE title=? AND canva_url=? ORDER BY id DESC LIMIT 1');
      let gid;
      if(game) gid=Number(game.id);
      else if(usePostgres){ const gr=await pool.query('INSERT INTO games(title,canva_url) VALUES($1,$2) RETURNING id',[title,canva]); gid=Number(gr.rows[0].id); }
      else { const gr=sqlite.prepare('INSERT INTO games(title,canva_url) VALUES (?,?)').run(title,canva); gid=Number(gr.lastInsertRowid); }

      let added=0;
      for(const sid of ids) {
        if(usePostgres){ const r=await pool.query('INSERT INTO assignments(game_id,student_id) VALUES($1,$2) ON CONFLICT DO NOTHING',[gid,sid]); added+=r.rowCount; }
        else { const r=sqlite.prepare('INSERT OR IGNORE INTO assignments(game_id,student_id) VALUES (?,?)').run(gid,sid); added+=Number(r.changes||0); }
      }
      if(!added) return json(res,409,{error:'Bu oyun seçilen öğrenci veya sınıfa zaten atanmış'});
      return json(res,201,{game_id:gid,assigned:added});
    }
    const delGame=url.pathname.match(/^\/api\/games\/(\d+)$/);
    if(delGame && req.method==='DELETE') {
      if(!needTeacher(req,res)) return; const gid=Number(delGame[1]);
      const exists=usePostgres?await one('SELECT id FROM games WHERE id=$1',[gid]):await one('',[gid],'SELECT id FROM games WHERE id=?');
      if(!exists) return json(res,404,{error:'Oyun bulunamadı'});
      if(usePostgres) await run('DELETE FROM games WHERE id=$1',[gid]); else await run('',[gid],'DELETE FROM games WHERE id=?');
      return json(res,200,{ok:true});
    }
    const cm=url.pathname.match(/^\/api\/classes\/(\d+)\/assignments$/);
    if(cm && req.method==='GET') {
      if(!needTeacher(req,res)) return; const id=Number(cm[1]);
      const rows=usePostgres
        ? await q(`SELECT g.id game_id,g.title,g.canva_url,s.id student_id,s.name,s.code,a.completed_at,a.assigned_at FROM assignments a JOIN games g ON g.id=a.game_id JOIN students s ON s.id=a.student_id WHERE s.class_id=$1 ORDER BY g.id DESC,s.name`,[id])
        : await q('',[id],`SELECT g.id game_id,g.title,g.canva_url,s.id student_id,s.name,s.code,a.completed_at,a.assigned_at FROM assignments a JOIN games g ON g.id=a.game_id JOIN students s ON s.id=a.student_id WHERE s.class_id=? ORDER BY g.id DESC,s.name`);
      return json(res,200,rows);
    }
    if(req.method==='POST' && url.pathname==='/api/student/login') {
      const b=await body(req); const code=String(b.code||'').trim().toUpperCase();
      const s=usePostgres
        ? await one(`SELECT s.id,s.name,s.code,c.name class_name FROM students s JOIN classes c ON c.id=s.class_id WHERE s.code=$1`,[code])
        : await one('',[code],`SELECT s.id,s.name,s.code,c.name class_name FROM students s JOIN classes c ON c.id=s.class_id WHERE s.code=?`);
      if(!s) return json(res,404,{error:'Kod bulunamadı'}); return json(res,200,s);
    }
    const gm=url.pathname.match(/^\/api\/student\/(\d+)\/games$/);
    if(gm && req.method==='GET') {
      const sid=Number(gm[1]); const code=String(req.headers['x-student-code']||'').toUpperCase();
      const ok=usePostgres?await one('SELECT 1 FROM students WHERE id=$1 AND code=$2',[sid,code]):await one('',[sid,code],'SELECT 1 FROM students WHERE id=? AND code=?');
      if(!ok)return json(res,401,{error:'Geçersiz öğrenci erişimi'});
      const rows=usePostgres
        ? await q(`SELECT a.id assignment_id,g.title,g.canva_url,a.completed_at,a.assigned_at FROM assignments a JOIN games g ON g.id=a.game_id WHERE a.student_id=$1 ORDER BY a.id DESC`,[sid])
        : await q('',[sid],`SELECT a.id assignment_id,g.title,g.canva_url,a.completed_at,a.assigned_at FROM assignments a JOIN games g ON g.id=a.game_id WHERE a.student_id=? ORDER BY a.id DESC`);
      return json(res,200,rows);
    }
    const done=url.pathname.match(/^\/api\/assignments\/(\d+)\/complete$/);
    if(done && req.method==='POST') {
      const aid=Number(done[1]); const code=String(req.headers['x-student-code']||'').toUpperCase();
      const a=usePostgres
        ? await one(`SELECT a.id FROM assignments a JOIN students s ON s.id=a.student_id WHERE a.id=$1 AND s.code=$2`,[aid,code])
        : await one('',[aid,code],`SELECT a.id FROM assignments a JOIN students s ON s.id=a.student_id WHERE a.id=? AND s.code=?`);
      if(!a)return json(res,401,{error:'Yetkisiz'});
      if(usePostgres) await run('UPDATE assignments SET completed_at=COALESCE(completed_at,NOW()) WHERE id=$1',[aid]);
      else await run('',[aid],"UPDATE assignments SET completed_at=COALESCE(completed_at,datetime('now')) WHERE id=?");
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

initDb().then(()=>server.listen(PORT,()=>console.log(`Minoo: http://localhost:${PORT}`))).catch(err=>{console.error('Database init failed',err);process.exit(1);});
