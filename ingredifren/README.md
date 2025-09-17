# IngrediFren - Analisis Cerdas Kandungan Produk

![IngrediFren Logo](https://via.placeholder.com/200x80/2563eb/ffffff?text=IngrediFren)

IngrediFren adalah aplikasi web inovatif yang membantu pengguna menganalisis kandungan produk makanan, minuman, dan skincare dengan teknologi OCR (Optical Character Recognition) dan database bahan yang komprehensif.

## 🌟 Fitur Utama

### 📱 Pemindai Cerdas (Smart Scanner)
- Upload gambar label produk
- Dukungan kamera langsung untuk mobile
- OCR untuk ekstraksi teks dari gambar
- Format yang didukung: JPG, PNG, JPEG (Max 10MB)

### 🔍 Mesin Analisis Bahan
- Database lengkap dengan informasi bahan
- Analisis tingkat keamanan (Aman, Hati-hati, Hindari)
- Informasi fungsi setiap bahan
- Deteksi alergen dan intoleransi

### ⚠️ Sistem Peringatan Visual
- **Hijau**: Aman untuk digunakan
- **Kuning**: Perlu perhatian khusus
- **Merah**: Berisiko tinggi, sebaiknya dihindari
- Ikon intuitif untuk setiap kategori peringatan

### 👤 Profil Pengguna Personal
- **Alergi**: Kacang, susu, seafood, gluten, dll.
- **Kondisi Kesehatan**: Diabetes, hipertensi, penyakit jantung
- **Preferensi Diet**: Vegan, vegetarian, halal, kosher
- **Kondisi Khusus**: Hamil, menyusui
- **Tipe Kulit**: Berminyak, kering, sensitif, berjerawat

### 📊 Hasil Analisis Komprehensif
- Ringkasan keamanan produk
- Daftar peringatan yang dipersonalisasi
- Informasi detail setiap bahan
- Saran dan rekomendasi alternatif

## 🚀 Cara Menggunakan

### 1. Buka Aplikasi
Akses IngrediFren melalui browser web di perangkat Anda.

### 2. Setup Profil (Opsional tapi Direkomendasikan)
- Klik menu **"Profil"**
- Isi informasi alergi, kondisi kesehatan, dan preferensi diet Anda
- Klik **"Simpan Profil"**

### 3. Pindai Produk
- Klik **"Mulai Pindai Sekarang"** atau navigasi ke bagian Scanner
- Pilih metode input:
  - **"Pilih Dari Galeri"**: Upload foto dari device
  - **"Ambil Foto"**: Gunakan kamera langsung
- Pastikan label produk terlihat jelas dan tidak blur

### 4. Analisis Otomatis
- Sistem akan mengekstrak teks dari gambar
- Mengidentifikasi bahan-bahan
- Menganalisis keamanan berdasarkan profil Anda
- Menampilkan hasil dalam beberapa detik

### 5. Baca Hasil
- **Ringkasan**: Status keamanan keseluruhan produk
- **Peringatan**: Bahan-bahan yang perlu diwaspadai
- **Daftar Bahan**: Informasi lengkap setiap kandungan
- **Rekomendasi**: Saran untuk penggunaan atau alternatif

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: CSS Custom Properties, Flexbox, Grid
- **Responsif**: Mobile-first design
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **Storage**: localStorage untuk menyimpan profil pengguna
- **OCR**: Simulasi (dalam implementasi nyata bisa menggunakan Tesseract.js atau API cloud)

## 📱 Kompatibilitas

### Browser yang Didukung
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Device
- Desktop (Windows, macOS, Linux)
- Mobile (iOS, Android)
- Tablet

## 🔧 Instalasi & Setup Lokal

### Prasyarat
- Web browser modern
- Web server lokal (opsional, untuk development)

### Langkah Instalasi

1. **Clone atau Download**
   ```bash
   git clone https://github.com/your-username/ingredifren.git
   cd ingredifren
   ```

2. **Buka dengan Web Server Lokal** (Recommended)
   ```bash
   # Menggunakan Python
   python -m http.server 8000
   
   # Menggunakan Node.js
   npx serve .
   
   # Menggunakan PHP
   php -S localhost:8000
   ```

3. **Atau Buka Langsung**
   Double-click file `index.html` untuk membuka di browser

4. **Akses Aplikasi**
   Buka `http://localhost:8000` di browser

## 📁 Struktur Folder

```
ingredifren/
├── index.html                 # Halaman utama aplikasi
├── css/
│   └── style.css             # Styling utama dan responsive design
├── js/
│   ├── app.js               # Logic utama aplikasi
│   └── ingredients-database.js # Database bahan dan kandungan
├── images/                   # Folder untuk gambar (logo, assets)
└── README.md                # Dokumentasi ini
```

## 🎯 Target Pengguna

- **Individu dengan alergi** atau intoleransi makanan
- **Orang tua** yang peduli kandungan makanan anak
- **Konsumen Muslim** yang mencari produk halal
- **Penganut gaya hidup vegan/vegetarian**
- **Ibu hamil dan menyusui**
- **Pecinta skincare** yang ingin menghindari bahan kontroversial
- **Siapa saja** yang ingin hidup lebih sehat

## 🔒 Privasi & Keamanan

- **Data Lokal**: Profil pengguna disimpan di localStorage browser
- **Tidak Ada Upload**: Gambar diproses secara lokal di browser
- **Tanpa Tracking**: Tidak ada pelacakan atau analytics pihak ketiga
- **Open Source**: Kode dapat diaudit oleh siapa saja

## 🤝 Kontribusi

Kami terbuka untuk kontribusi! Cara berkontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

### Jenis Kontribusi yang Dibutuhkan
- Penambahan database bahan
- Perbaikan UI/UX
- Optimasi performa
- Terjemahan ke bahasa lain
- Dokumentasi

## 🐛 Pelaporan Bug

Jika menemukan bug, silakan buat issue dengan informasi:
- Deskripsi masalah
- Langkah untuk mereproduksi
- Browser dan versi yang digunakan
- Screenshot (jika perlu)

## 📋 Roadmap

### Versi 1.1 (Planned)
- [ ] Integrasi OCR real (Tesseract.js)
- [ ] Export hasil ke PDF
- [ ] History analisis produk
- [ ] Notifikasi pengingat

### Versi 1.2 (Future)
- [ ] Barcode scanner
- [ ] API database produk komersial
- [ ] Machine learning untuk rekomendasi
- [ ] Mode offline lengkap

### Versi 2.0 (Vision)
- [ ] Mobile app (React Native)
- [ ] Komunitas dan review produk
- [ ] AI chatbot untuk konsultasi
- [ ] Integration dengan e-commerce

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👥 Tim

- **Product Manager**: [Nama Anda]
- **UI/UX Designer**: [Nama Anda]
- **Frontend Developer**: [Nama Anda]

## 📞 Kontak

- **Email**: info@ingredifren.com
- **Website**: https://ingredifren.com
- **GitHub**: https://github.com/ingredifren
- **Telepon**: +62 21 1234 5678

## 🙏 Acknowledgments

- Font Awesome untuk icon-icon yang indah
- Google Fonts untuk font Inter
- Komunitas open source untuk inspirasi
- Beta testers yang telah memberikan feedback

---

**IngrediFren** - *Membantu Anda membuat pilihan yang lebih sehat dan aman dalam setiap produk yang Anda gunakan.*

© 2025 IngrediFren. Semua hak cipta dilindungi.