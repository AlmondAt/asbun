// Utility functions: OCR parser, usia matcher, nutrisi analyzer

// 1. Parse OCR string to array of { nutrisi, nilai, unit }
function parseOCR(ocrString) {
  // Hanya ambil baris yang mengandung nutrisi utama
  if (!ocrString) return [];
  const NUTRISI_KEYWORDS = [
    { key: 'energi', alias: ['energi', 'energy', 'kalori', 'energy total', 'energitotal'] },
    { key: 'protein', alias: ['protein'] },
    { key: 'lemak', alias: ['lemak', 'fat', 'lemak total', 'lemaktotal'] },
    { key: 'karbohidrat', alias: ['karbohidrat', 'karbo', 'carbohydrate', 'karbohidrat total'] },
    { key: 'gula', alias: ['gula', 'sugar'] },
    { key: 'natrium', alias: ['natrium', 'sodium', 'na'] },
    { key: 'serat', alias: ['serat', 'fiber'] },
  ];

  // Kata-kata yang sering muncul tapi bukan nutrisi
  const NON_NUTRISI = [
    'takaran sa', 'tunlar', 'per sajian', 'bers prods', 'sebesar', 'al', 'total', 'jumlah', 'per', 'sajian', 'botel', 'ial', 'kebutuhan'
  ];

  // Split by comma or newline
  return ocrString.split(/[\n,]/).map(item => {
    let line = item.trim().toLowerCase();
    // Hilangkan kata non-nutrisi di awal
    for (const non of NON_NUTRISI) {
      if (line.startsWith(non)) {
        return null;
      }
    }
    // Ambil pola "nama nutrisi angka satuan" (toleran spasi/karakter)
    const match = line.match(/([a-zA-Z ]+)[ :]*([\d.,]+)\s*([a-zA-Z]+)/);
    if (!match) return null;
    let nutrisiRaw = match[1].replace(/[^a-zA-Z ]/g, '').trim();
    let nilai = parseFloat(match[2].replace(',', '.'));
    let unit = match[3].toLowerCase();
    // Normalisasi nama nutrisi
    let nutrisi = null;
    for (const n of NUTRISI_KEYWORDS) {
      if (n.alias.some(alias => nutrisiRaw.replace(/\s+/g, '').includes(alias.replace(/\s+/g, '')))) {
        nutrisi = n.key;
        break;
      }
    }
    if (!nutrisi) return null;
    return { nutrisi, nilai, unit };
  }).filter(Boolean);
}

// 2. Match umur ke kategori usia
function matchUsiaKategori(umur) {
  // Contoh kategori: '0-5 tahun', '6-9 tahun', '10-12 tahun', '13-18 tahun', '19-29 tahun', dst.
  umur = parseInt(umur);
  if (umur >= 0 && umur <= 5) return '0-5 tahun';
  if (umur >= 6 && umur <= 9) return '6-9 tahun';
  if (umur >= 10 && umur <= 12) return '10-12 tahun';
  if (umur >= 13 && umur <= 18) return '13-18 tahun';
  if (umur >= 19 && umur <= 29) return '19-29 tahun';
  if (umur >= 30 && umur <= 49) return '30-49 tahun';
  if (umur >= 50 && umur <= 64) return '50-64 tahun';
  if (umur >= 65) return '65+ tahun';
  return null;
}

// 3. Analisis nutrisi berdasarkan keterangan dan kondisi khusus
function analyzeNutrisi(item, akg, kondisi_khusus) {
  const persentase = (item.nilai / akg.nilai) * 100;
  let status = 'Rendah';
  let rekomendasi = 'Perlu ditambah asupannya';
  const ket = akg.keterangan ? akg.keterangan.toLowerCase() : '';

  if (ket.includes('> 50% akg') && persentase > 50) {
    status = 'Tinggi';
    rekomendasi = 'Sangat bermanfaat';
  } else if (ket.includes('batasi konsumsi') && persentase > 30) {
    status = 'Perlu Dibatasi';
    rekomendasi = 'Batasi konsumsi';
  } else if (ket.includes('direkomendasikan') && persentase > 30) {
    status = 'Direkomendasikan';
    rekomendasi = 'Direkomendasikan';
  }

  // Override jika ada kondisi khusus
  if (kondisi_khusus && akg.kondisi_khusus) {
    for (const kondisi of [].concat(kondisi_khusus)) {
      if (akg.kondisi_khusus[kondisi]) {
        rekomendasi = akg.kondisi_khusus[kondisi];
        status = 'Perhatian';
      }
    }
  }

  return { persentase: +persentase.toFixed(2), status, rekomendasi };
}

module.exports = { parseOCR, matchUsiaKategori, analyzeNutrisi };
