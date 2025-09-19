// Express app for AKG analysis
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const { createWorker } = require('tesseract.js');
const fs = require('fs');
const path = require('path');

const { sequelize, AKGMaster, AsbunLogHarian } = require('./db');
const { parseOCR, matchUsiaKategori, analyzeNutrisi } = require('./utils');
const app = express();
app.use(cors());
app.use(bodyParser.json());
// Multer setup for image upload
const upload = multer({ dest: 'uploads/' });
// OCR endpoint
app.post('/api/ocr', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
  const imagePath = path.resolve(req.file.path);
  const worker = await createWorker('eng');
  try {
    const { data: { text } } = await worker.recognize(imagePath);
    await worker.terminate();
    fs.unlinkSync(imagePath); // Clean up temp file
    // Simple clean up: replace newlines with comma, remove double spaces
    const ocr_string = text.replace(/\n/g, ', ').replace(/\s+/g, ' ').trim();
    res.json({ ocr_string });
  } catch (err) {
    await worker.terminate();
    fs.unlinkSync(imagePath);
    res.status(500).json({ error: 'OCR gagal: ' + err.message });
  }
});

// Endpoint: POST /api/analyze
app.post('/api/analyze', async (req, res) => {
  try {
    const { ocr_string, umur, jenis_kelamin, kondisi_khusus, user_id } = req.body;
    if (!ocr_string || !umur || !jenis_kelamin) {
      return res.status(400).json({ error: 'Input tidak lengkap' });
    }
    // 1. Parse OCR
    const parsed = parseOCR(ocr_string);
    if (!parsed.length) return res.status(400).json({ error: 'OCR gagal diparse' });
    // 2. Match usia ke kategori
    const kategori_usia = matchUsiaKategori(umur);
    if (!kategori_usia) return res.status(400).json({ error: 'Usia tidak valid' });
    // 3. Analisis nutrisi
    const hasil_analisis = [];
    for (const item of parsed) {
      const akg = await AKGMaster.findOne({
        where: {
          jenis_kelamin,
          kategori_usia,
          nutrisi: item.nutrisi.toLowerCase(),
        },
      });
      if (!akg) {
        hasil_analisis.push({ ...item, error: 'Data AKG tidak ditemukan' });
        continue;
      }
      const analisis = analyzeNutrisi(item, akg, kondisi_khusus);
      hasil_analisis.push({ ...item, ...analisis, nilai_akg: akg.nilai, unit: akg.unit, keterangan: akg.keterangan });
    }
    // 4. Simpan log harian
    await AsbunLogHarian.create({
      user_id: user_id || null,
      tanggal: new Date(),
      profil: { umur, jenis_kelamin, kondisi_khusus },
      hasil_analisis,
    });
    res.json({ hasil_analisis });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (e) {
    console.error('DB connection error:', e);
  }
  console.log('Server running on port', PORT);
});
