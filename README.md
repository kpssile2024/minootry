# Minoo v1.2

Bu sürüm kalıcı PostgreSQL veritabanı desteği ekler.

- `DATABASE_URL` varsa PostgreSQL kullanır.
- `DATABASE_URL` yoksa yerel test için SQLite kullanır.
- Sınıflar, öğrenciler, oyun atamaları ve tamamlanma bilgileri deploy sonrası kaybolmaz.

Render + Supabase için Render Environment Variables bölümüne `DATABASE_URL` ekleyin.
Öğretmen şifresi için ayrıca `TEACHER_PASSWORD` eklenmesi önerilir.
