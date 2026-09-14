# Minoo v1

Çalışan MVP: öğretmen sınıf/öğrenci oluşturabilir, Canva oyununu sınıfa veya tek öğrenciye atayabilir; öğrenci kişisel koduyla girip oyunu tamamlayabilir; öğretmen tamamlanma durumunu görür.

## Çalıştırma
Node.js 22+ gerekir.

```bash
TEACHER_PASSWORD="guclu-bir-parola" npm start
```

Varsayılan geliştirme parolası: `minoo123` (internete açmadan önce mutlaka değiştirin).
Tarayıcı: http://localhost:3000

## Kalıcı veri
`minoo.db` SQLite veritabanıdır. Sunucu yeniden başlasa da veriler korunur.

## Telefon / PWA
HTTPS altında yayınlandığında Safari/Chrome üzerinden Ana Ekrana Ekle ile uygulama gibi kurulabilir.

## Üretime çıkmadan önce
- HTTPS ve gerçek hosting
- Güvenli öğretmen hesabı (hash'li parola / e-posta oturumu)
- Yedekleme
- KVKK/Gizlilik metni
- Öğrenci adlarının mümkün olduğunca minimal tutulması
- Canva paylaşım izinlerinin doğru ayarlanması
