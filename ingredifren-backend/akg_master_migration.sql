# AKG Master Table Migration

ALTER TABLE akg_master
  ADD COLUMN keterangan TEXT AFTER unit,
  ADD COLUMN kondisi_khusus JSON AFTER keterangan;

# Contoh: Import data dari CSV ke MySQL (gunakan MySQL CLI atau tool lain)
# Pastikan file CSV sudah memiliki kolom: jenis_kelamin, kategori_usia, nutrisi, nilai, unit, keterangan, kondisi_khusus

# Contoh perintah LOAD DATA (edit path dan kolom sesuai kebutuhan):
# LOAD DATA INFILE '/path/to/DATA AKG ASBUN Energi.csv'
# INTO TABLE akg_master
# FIELDS TERMINATED BY ','
# OPTIONALLY ENCLOSED BY '"'
# LINES TERMINATED BY '\n'
# IGNORE 1 LINES
# (jenis_kelamin, kategori_usia, nutrisi, nilai, unit, keterangan, kondisi_khusus);

# Jika kondisi_khusus berupa teks, bisa diubah ke JSON saat import atau setelahnya.

# Ulangi untuk semua file CSV:
# Energi, Karbohidrat, Lemak, Protein, Gula, Natrium, Serat

# Contoh insert manual:
INSERT INTO akg_master (jenis_kelamin, kategori_usia, nutrisi, nilai, unit, keterangan, kondisi_khusus)
VALUES ('P', '19-29 tahun', 'protein', 60, 'g', 'Memenuhi ...% kebutuhan protein harian...', '{"Diabetes": "Batasi konsumsi protein tinggi"}');
