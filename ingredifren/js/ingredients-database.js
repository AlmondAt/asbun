// Database Bahan-bahan dan Kandungan
const ingredientsDatabase = {
    // Pengawet
    'sodium benzoate': {
        name: 'Sodium Benzoate',
        category: 'Pengawet',
        safetyLevel: 'caution',
        function: 'Pengawet makanan untuk mencegah pertumbuhan bakteri dan jamur',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: true,
            breastfeeding: true
        },
        skincareInfo: {
            skinTypes: ['oily', 'combination', 'normal'],
            avoidSkinTypes: ['sensitive'],
            concerns: ['Dapat menyebabkan iritasi pada kulit sensitif']
        },
        description: 'Pengawet sintetis yang umum digunakan. Relatif aman dalam dosis normal tetapi perlu perhatian untuk kulit sensitif.',
        warnings: ['Dapat menyebabkan iritasi pada kulit sensitif', 'Hindari konsumsi berlebihan']
    },
    
    'potassium sorbate': {
        name: 'Potassium Sorbate',
        category: 'Pengawet',
        safetyLevel: 'safe',
        function: 'Pengawet alami untuk mencegah pertumbuhan jamur dan ragi',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: false,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: ['all'],
            avoidSkinTypes: [],
            concerns: []
        },
        description: 'Pengawet alami yang aman dan efektif. Disetujui oleh FDA dan dianggap aman untuk semua kelompok.',
        warnings: []
    },
    
    // Pewarna
    'red 40': {
        name: 'Red 40 (Allura Red AC)',
        category: 'Pewarna',
        safetyLevel: 'caution',
        function: 'Pewarna makanan sintetis berwarna merah',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: true,
            breastfeeding: true
        },
        skincareInfo: {
            skinTypes: [],
            avoidSkinTypes: ['sensitive', 'acne'],
            concerns: ['Dapat menyebabkan reaksi alergi', 'Berpotensi memicu jerawat']
        },
        description: 'Pewarna sintetis yang kontroversial. Beberapa studi menunjukkan potensi efek samping.',
        warnings: ['Dapat menyebabkan hiperaktivitas pada anak', 'Hindari jika memiliki riwayat alergi pewarna']
    },
    
    // Pemanis
    'aspartame': {
        name: 'Aspartame',
        category: 'Pemanis Buatan',
        safetyLevel: 'caution',
        function: 'Pemanis buatan rendah kalori',
        allergens: ['phenylalanine'],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: true,
            breastfeeding: true
        },
        skincareInfo: {
            skinTypes: [],
            avoidSkinTypes: [],
            concerns: []
        },
        description: 'Pemanis buatan yang 200x lebih manis dari gula. Mengandung fenilalanin.',
        warnings: ['Hindari jika memiliki fenilketonuria (PKU)', 'Batasi konsumsi selama kehamilan']
    },
    
    'stevia': {
        name: 'Stevia',
        category: 'Pemanis Alami',
        safetyLevel: 'safe',
        function: 'Pemanis alami dari daun stevia',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: false,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: ['all'],
            avoidSkinTypes: [],
            concerns: []
        },
        description: 'Pemanis alami yang aman dan tidak mengandung kalori. Ideal untuk penderita diabetes.',
        warnings: []
    },
    
    // Alergen Umum
    'wheat': {
        name: 'Wheat (Gandum)',
        category: 'Bahan Dasar',
        safetyLevel: 'caution',
        function: 'Sumber karbohidrat dan protein',
        allergens: ['gluten', 'wheat'],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: true,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: false,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: [],
            avoidSkinTypes: ['sensitive'],
            concerns: ['Dapat menyebabkan iritasi pada kulit sensitif']
        },
        description: 'Mengandung gluten dan dapat menyebabkan reaksi alergi pada orang yang sensitif.',
        warnings: ['Hindari jika memiliki celiac disease', 'Hindari jika alergi gluten atau gandum']
    },
    
    'milk': {
        name: 'Milk (Susu)',
        category: 'Produk Dairy',
        safetyLevel: 'caution',
        function: 'Sumber protein dan kalsium',
        allergens: ['dairy', 'lactose'],
        dietaryRestrictions: {
            halal: true,
            vegan: false,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: false,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: ['dry'],
            avoidSkinTypes: ['acne', 'oily'],
            concerns: ['Dapat memperburuk jerawat pada beberapa orang']
        },
        description: 'Sumber protein hewani yang baik tetapi dapat menyebabkan masalah pada orang yang intoleran laktosa.',
        warnings: ['Hindari jika intoleran laktosa', 'Hindari jika alergi susu', 'Tidak cocok untuk diet vegan']
    },
    
    'eggs': {
        name: 'Eggs (Telur)',
        category: 'Protein Hewani',
        safetyLevel: 'caution',
        function: 'Sumber protein lengkap',
        allergens: ['eggs'],
        dietaryRestrictions: {
            halal: true,
            vegan: false,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: true,
            kidney: false,
            pregnant: false,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: ['dry', 'normal'],
            avoidSkinTypes: [],
            concerns: []
        },
        description: 'Protein hewani berkualitas tinggi tetapi tinggi kolesterol.',
        warnings: ['Hindari jika alergi telur', 'Batasi jika memiliki masalah kolesterol', 'Tidak cocok untuk diet vegan']
    },
    
    'peanuts': {
        name: 'Peanuts (Kacang Tanah)',
        category: 'Kacang-kacangan',
        safetyLevel: 'avoid',
        function: 'Sumber protein dan lemak sehat',
        allergens: ['nuts', 'peanuts'],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: false,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: [],
            avoidSkinTypes: ['acne'],
            concerns: ['Dapat memperburuk jerawat']
        },
        description: 'Kacang tanah adalah alergen yang sangat umum dan dapat menyebabkan reaksi yang fatal.',
        warnings: ['HINDARI jika alergi kacang tanah', 'Dapat menyebabkan reaksi anafilaksis', 'Periksa label dengan cermat']
    },
    
    // Bahan Skincare
    'paraben': {
        name: 'Paraben',
        category: 'Pengawet Kosmetik',
        safetyLevel: 'caution',
        function: 'Pengawet dalam produk kosmetik',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: true,
            breastfeeding: true
        },
        skincareInfo: {
            skinTypes: [],
            avoidSkinTypes: ['sensitive'],
            concerns: ['Dapat mengganggu hormon', 'Berpotensi menyebabkan iritasi']
        },
        description: 'Pengawet kosmetik yang kontroversial karena potensi gangguan hormonal.',
        warnings: ['Hindari selama kehamilan dan menyusui', 'Pilih produk bebas paraben jika kulit sensitif']
    },
    
    'sodium lauryl sulfate': {
        name: 'Sodium Lauryl Sulfate (SLS)',
        category: 'Surfaktan',
        safetyLevel: 'caution',
        function: 'Agen pembersih dan pembusa',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: false,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: ['oily'],
            avoidSkinTypes: ['dry', 'sensitive'],
            concerns: ['Dapat menyebabkan kekeringan dan iritasi', 'Menghilangkan minyak alami kulit']
        },
        description: 'Surfaktan yang efektif tetapi dapat menyebabkan iritasi pada kulit kering dan sensitif.',
        warnings: ['Hindari jika kulit kering atau sensitif', 'Dapat menyebabkan iritasi mata']
    },
    
    'hyaluronic acid': {
        name: 'Hyaluronic Acid',
        category: 'Humektan',
        safetyLevel: 'safe',
        function: 'Menarik dan menahan kelembaban kulit',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: false,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: ['all'],
            avoidSkinTypes: [],
            concerns: []
        },
        description: 'Bahan anti-aging yang sangat efektif dan aman untuk semua jenis kulit.',
        warnings: []
    },
    
    // Gula dan Karbohidrat
    'high fructose corn syrup': {
        name: 'High Fructose Corn Syrup',
        category: 'Pemanis',
        safetyLevel: 'avoid',
        function: 'Pemanis sintetis murah',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: true,
            hypertension: true,
            heart: true,
            kidney: false,
            pregnant: true,
            breastfeeding: true
        },
        skincareInfo: {
            skinTypes: [],
            avoidSkinTypes: [],
            concerns: []
        },
        description: 'Pemanis sintetis yang dikaitkan dengan berbagai masalah kesehatan.',
        warnings: ['Hindari jika diabetes', 'Dikaitkan dengan obesitas', 'Dapat meningkatkan risiko penyakit jantung']
    },
    
    'sugar': {
        name: 'Sugar (Gula)',
        category: 'Pemanis Alami',
        safetyLevel: 'caution',
        function: 'Pemanis alami',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: true,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: false,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: [],
            avoidSkinTypes: ['acne'],
            concerns: ['Dapat memperburuk jerawat']
        },
        description: 'Pemanis alami yang harus dibatasi konsumsinya.',
        warnings: ['Batasi jika diabetes', 'Konsumsi berlebihan dapat menyebabkan obesitas']
    },
    
    // Lemak dan Minyak
    'trans fat': {
        name: 'Trans Fat',
        category: 'Lemak',
        safetyLevel: 'avoid',
        function: 'Lemak yang telah dihidrogenasi parsial',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: true,
            hypertension: true,
            heart: true,
            kidney: false,
            pregnant: true,
            breastfeeding: true
        },
        skincareInfo: {
            skinTypes: [],
            avoidSkinTypes: [],
            concerns: []
        },
        description: 'Lemak yang sangat berbahaya bagi kesehatan cardiovascular.',
        warnings: ['HINDARI sepenuhnya', 'Meningkatkan risiko penyakit jantung', 'Meningkatkan kolesterol jahat']
    },
    
    'coconut oil': {
        name: 'Coconut Oil',
        category: 'Minyak Alami',
        safetyLevel: 'safe',
        function: 'Minyak nabati serbaguna',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: false,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: ['dry', 'normal'],
            avoidSkinTypes: ['acne', 'oily'],
            concerns: ['Dapat menyumbat pori pada kulit berminyak']
        },
        description: 'Minyak alami yang baik untuk kesehatan dan kecantikan, tetapi dapat menyumbat pori.',
        warnings: ['Hindari pada kulit berjerawat']
    },
    
    // Sodium dan Mineral
    'sodium': {
        name: 'Sodium (Natrium)',
        category: 'Mineral',
        safetyLevel: 'caution',
        function: 'Elektrolit penting untuk tubuh',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: true,
            heart: true,
            kidney: true,
            pregnant: true,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: [],
            avoidSkinTypes: [],
            concerns: []
        },
        description: 'Mineral penting tetapi konsumsi berlebihan dapat berbahaya.',
        warnings: ['Batasi jika hipertensi', 'Batasi jika masalah ginjal', 'Batasi selama kehamilan']
    },
    
    // Kafein
    'caffeine': {
        name: 'Caffeine',
        category: 'Stimulan',
        safetyLevel: 'caution',
        function: 'Stimulan alami',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: true,
            heart: true,
            kidney: false,
            pregnant: true,
            breastfeeding: true
        },
        skincareInfo: {
            skinTypes: ['all'],
            avoidSkinTypes: [],
            concerns: []
        },
        description: 'Stimulan yang perlu dibatasi pada kondisi tertentu.',
        warnings: ['Batasi jika hipertensi', 'Batasi selama kehamilan', 'Dapat menyebabkan kecemasan']
    }
};

// Fungsi untuk mencari bahan
function findIngredient(ingredientName) {
    const cleanName = ingredientName.toLowerCase().trim();
    
    // Cari exact match
    if (ingredientsDatabase[cleanName]) {
        return ingredientsDatabase[cleanName];
    }
    
    // Cari partial match
    for (const key in ingredientsDatabase) {
        if (key.includes(cleanName) || cleanName.includes(key)) {
            return ingredientsDatabase[key];
        }
    }
    
    // Jika tidak ditemukan, return default
    return {
        name: ingredientName,
        category: 'Tidak Diketahui',
        safetyLevel: 'unknown',
        function: 'Informasi belum tersedia',
        allergens: [],
        dietaryRestrictions: {
            halal: true,
            vegan: true,
            vegetarian: true,
            kosher: true
        },
        healthConcerns: {
            diabetes: false,
            hypertension: false,
            heart: false,
            kidney: false,
            pregnant: false,
            breastfeeding: false
        },
        skincareInfo: {
            skinTypes: [],
            avoidSkinTypes: [],
            concerns: []
        },
        description: 'Bahan ini belum ada dalam database kami. Silakan konsultasi dengan ahli.',
        warnings: ['Informasi belum tersedia - konsultasi dengan ahli']
    };
}

// Fungsi untuk mendapatkan semua kategori
function getCategories() {
    const categories = new Set();
    Object.values(ingredientsDatabase).forEach(ingredient => {
        categories.add(ingredient.category);
    });
    return Array.from(categories);
}

// Fungsi untuk mendapatkan bahan berdasarkan level keamanan
function getIngredientsBysafety(safetyLevel) {
    return Object.entries(ingredientsDatabase)
        .filter(([key, ingredient]) => ingredient.safetyLevel === safetyLevel)
        .map(([key, ingredient]) => ({ key, ...ingredient }));
}

// Export untuk penggunaan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ingredientsDatabase,
        findIngredient,
        getCategories,
        getIngredientsBySafety
    };
}