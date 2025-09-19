# Backend AKG Analyzer - Setup & Usage

## 1. Struktur Folder
- models.js: Sequelize models
- db.js: Koneksi database
- app.js: Express API
- utils.js: Fungsi parsing & analisis
- akg_master_migration.sql: SQL migrasi & import data
- .env.example: Contoh konfigurasi env

## 2. Setup Database
- Buat database `asbun` di MySQL
- Jalankan `akg_master_migration.sql` untuk update tabel dan petunjuk import CSV
- Import data dari 7 file CSV ke tabel `akg_master` (bisa pakai MySQL Workbench, phpMyAdmin, atau CLI)

## 3. Konfigurasi
- Copy `.env.example` ke `.env` dan isi sesuai database Anda

## 4. Install Dependency
```
npm install
```

## 5. Jalankan Server
```
npm start
```

## 6. Endpoint API
### POST /api/analyze
Body JSON:
```
{
  "ocr_string": "Protein 5g, Gula 8g, Serat 2g",
  "umur": 25,
  "jenis_kelamin": "P",
  "kondisi_khusus": ["Diabetes"]
}
```

Response:
```
{
  "hasil_analisis": [
    {
      "nutrisi": "protein",
      "nilai": 5,
      "unit": "g",
      "nilai_akg": 60,
      "keterangan": "Memenuhi ...% kebutuhan protein harian...",
      "persentase": 8.33,
      "status": "Rendah",
      "rekomendasi": "Perlu ditambah asupannya"
    },
    ...
  ]
}
```

## 7. Log Harian
- Setiap analisis disimpan ke tabel `asbun_log_harian` dalam format JSON.

## 8. Error Handling
- Input tidak lengkap, OCR gagal, usia tidak valid, data AKG tidak ditemukan → error JSON

## 9. Pengembangan
- Struktur modular, mudah dikembangkan (tambah nutrisi, logika, dsb)

---

**Catatan:**
- Untuk import CSV, pastikan kolom sesuai urutan di SQL.
- Kolom `kondisi_khusus` bisa JSON (misal: `{ "Diabetes": "Batasi konsumsi gula" }`).
- Bisa diintegrasikan dengan frontend OCR/image upload.
