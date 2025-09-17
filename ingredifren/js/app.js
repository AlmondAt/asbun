// IngrediFren - Main Application JavaScript

// Global Variables
let currentUserProfile = {
    allergies: [],
    health: [],
    diet: [],
    skincare: [],
    skinType: ''
};

let currentAnalysisResult = null;
let uploadedImage = null;

// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const loadingContainer = document.getElementById('loadingContainer');
const resultsSection = document.getElementById('results');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadUserProfile();
    setupMobileMenu();
    setupProfileTabs();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupEventListeners() {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('click', () => fileInput.click());
    
    // Profile form changes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateProfile);
    });
    
    document.getElementById('skinType').addEventListener('change', updateProfile);
    
    // Navigation
    setupNavigation();
}

function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
        });
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Update active nav based on scroll position
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function setupProfileTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// File Upload Functions
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processFile(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

function processFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showAlert('Silakan pilih file gambar (JPG, PNG, atau JPEG)', 'error');
        return;
    }
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
        showAlert('Ukuran file terlalu besar. Maksimal 10MB.', 'error');
        return;
    }
    
    uploadedImage = file;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        uploadArea.style.display = 'none';
        previewContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    uploadedImage = null;
    imagePreview.src = '';
    previewContainer.style.display = 'none';
    uploadArea.style.display = 'block';
    fileInput.value = '';
}

function openCamera() {
    // For mobile devices, this will open the camera
    fileInput.setAttribute('capture', 'environment');
    fileInput.click();
}

// OCR Simulation (In real app, this would call actual OCR service)
function simulateOCR() {
    // Simulate ingredient lists for different product types
    const sampleIngredients = [
        // Makanan ringan
        ['wheat flour', 'sugar', 'palm oil', 'salt', 'sodium benzoate', 'red 40'],
        // Minuman
        ['water', 'high fructose corn syrup', 'citric acid', 'natural flavors', 'caffeine', 'sodium benzoate'],
        // Skincare
        ['water', 'hyaluronic acid', 'glycerin', 'sodium lauryl sulfate', 'paraben', 'fragrance'],
        // Produk dairy
        ['milk', 'sugar', 'cream', 'stabilizers', 'natural flavors'],
        // Produk dengan kacang
        ['peanuts', 'sugar', 'salt', 'palm oil', 'natural flavors']
    ];
    
    // Random selection for demo
    const randomIndex = Math.floor(Math.random() * sampleIngredients.length);
    return sampleIngredients[randomIndex];
}

// Analysis Functions
function analyzeImage() {
    if (!uploadedImage) {
        showAlert('Silakan pilih gambar terlebih dahulu', 'error');
        return;
    }
    
    // Hide preview, show loading
    previewContainer.style.display = 'none';
    loadingContainer.style.display = 'block';
    
    // Simulate analysis steps
    simulateAnalysisSteps();
}

function simulateAnalysisSteps() {
    const steps = document.querySelectorAll('.loading-steps .step');
    let currentStep = 0;
    
    const stepInterval = setInterval(() => {
        if (currentStep < steps.length) {
            // Remove active from previous step
            if (currentStep > 0) {
                steps[currentStep - 1].classList.remove('active');
            }
            
            // Add active to current step
            steps[currentStep].classList.add('active');
            currentStep++;
        } else {
            clearInterval(stepInterval);
            
            // Simulate OCR and analysis
            setTimeout(() => {
                const extractedIngredients = simulateOCR();
                performAnalysis(extractedIngredients);
                
                // Hide loading, show results
                loadingContainer.style.display = 'none';
                displayResults();
            }, 1000);
        }
    }, 800);
}

function performAnalysis(ingredientsList) {
    const analysis = {
        overallSafety: 'safe',
        warnings: [],
        ingredients: [],
        recommendations: []
    };
    
    let hasHighRisk = false;
    let hasMediumRisk = false;
    
    // Analyze each ingredient
    ingredientsList.forEach(ingredientName => {
        const ingredient = findIngredient(ingredientName);
        const personalWarnings = checkPersonalWarnings(ingredient);
        
        analysis.ingredients.push({
            ...ingredient,
            personalWarnings
        });
        
        // Check for warnings based on user profile
        if (personalWarnings.length > 0) {
            personalWarnings.forEach(warning => {
                analysis.warnings.push({
                    ingredient: ingredient.name,
                    level: warning.level,
                    message: warning.message,
                    icon: warning.icon
                });
                
                if (warning.level === 'high') hasHighRisk = true;
                if (warning.level === 'medium') hasMediumRisk = true;
            });
        }
    });
    
    // Determine overall safety
    if (hasHighRisk) {
        analysis.overallSafety = 'danger';
    } else if (hasMediumRisk) {
        analysis.overallSafety = 'warning';
    }
    
    // Generate recommendations
    analysis.recommendations = generateRecommendations(analysis);
    
    currentAnalysisResult = analysis;
}

function checkPersonalWarnings(ingredient) {
    const warnings = [];
    const profile = currentUserProfile;
    
    // Check allergens
    ingredient.allergens.forEach(allergen => {
        if (profile.allergies.includes(allergen)) {
            warnings.push({
                level: 'high',
                message: `Mengandung ${allergen} - HINDARI jika Anda alergi`,
                icon: 'fas fa-exclamation-triangle'
            });
        }
    });
    
    // Check health conditions
    Object.keys(ingredient.healthConcerns).forEach(condition => {
        if (ingredient.healthConcerns[condition] && profile.health.includes(condition)) {
            const conditionNames = {
                diabetes: 'diabetes',
                hypertension: 'hipertensi',
                heart: 'penyakit jantung',
                kidney: 'gangguan ginjal',
                pregnant: 'kehamilan',
                breastfeeding: 'menyusui'
            };
            
            warnings.push({
                level: 'medium',
                message: `Perhatian untuk ${conditionNames[condition]}`,
                icon: 'fas fa-heartbeat'
            });
        }
    });
    
    // Check dietary restrictions
    Object.keys(ingredient.dietaryRestrictions).forEach(diet => {
        if (!ingredient.dietaryRestrictions[diet] && profile.diet.includes(diet)) {
            const dietNames = {
                halal: 'diet halal',
                vegan: 'diet vegan',
                vegetarian: 'diet vegetarian',
                kosher: 'diet kosher'
            };
            
            warnings.push({
                level: 'medium',
                message: `Tidak sesuai dengan ${dietNames[diet]}`,
                icon: 'fas fa-leaf'
            });
        }
    });
    
    // Check skincare concerns
    if (profile.skinType && ingredient.skincareInfo.avoidSkinTypes.includes(profile.skinType)) {
        warnings.push({
            level: 'medium',
            message: `Tidak direkomendasikan untuk kulit ${profile.skinType}`,
            icon: 'fas fa-spa'
        });
    }
    
    // Check skincare preferences
    profile.skincare.forEach(pref => {
        if (pref === 'paraben-free' && ingredient.name.toLowerCase().includes('paraben')) {
            warnings.push({
                level: 'medium',
                message: 'Mengandung paraben',
                icon: 'fas fa-spa'
            });
        }
        if (pref === 'sulfate-free' && ingredient.name.toLowerCase().includes('sulfate')) {
            warnings.push({
                level: 'medium',
                message: 'Mengandung sulfat',
                icon: 'fas fa-spa'
            });
        }
    });
    
    return warnings;
}

function generateRecommendations(analysis) {
    const recommendations = [];
    
    if (analysis.overallSafety === 'danger') {
        recommendations.push({
            title: 'Hindari Produk Ini',
            description: 'Produk ini mengandung bahan yang berisiko tinggi untuk Anda. Kami sarankan untuk mencari alternatif yang lebih aman.',
            link: '#scanner',
            linkText: 'Pindai Produk Lain'
        });
    } else if (analysis.overallSafety === 'warning') {
        recommendations.push({
            title: 'Gunakan dengan Hati-hati',
            description: 'Produk ini mengandung beberapa bahan yang perlu diperhatikan. Konsultasi dengan ahli jika ragu.',
            link: '#profile',
            linkText: 'Perbarui Profil Kesehatan'
        });
    } else {
        recommendations.push({
            title: 'Produk Aman untuk Anda',
            description: 'Berdasarkan profil kesehatan Anda, produk ini relatif aman untuk digunakan.',
            link: '#scanner',
            linkText: 'Pindai Produk Lain'
        });
    }
    
    // Add general recommendations
    if (analysis.warnings.length === 0) {
        recommendations.push({
            title: 'Tips Kesehatan',
            description: 'Tetap perhatikan komposisi produk dan selalu baca label dengan cermat.',
            link: '#about',
            linkText: 'Pelajari Lebih Lanjut'
        });
    }
    
    return recommendations;
}

// Display Functions
function displayResults() {
    if (!currentAnalysisResult) return;
    
    const result = currentAnalysisResult;
    
    // Show results section
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Display overall summary
    displaySummary(result);
    
    // Display warnings
    displayWarnings(result.warnings);
    
    // Display ingredients
    displayIngredients(result.ingredients);
    
    // Display recommendations
    displayRecommendations(result.recommendations);
}

function displaySummary(result) {
    const summaryCard = document.querySelector('.summary-card');
    const summaryIcon = document.querySelector('.summary-icon i');
    const summaryTitle = document.querySelector('.summary-title');
    const summaryDescription = document.querySelector('.summary-description');
    
    // Remove existing classes
    summaryCard.classList.remove('safe', 'warning', 'danger');
    
    switch (result.overallSafety) {
        case 'safe':
            summaryCard.classList.add('safe');
            summaryIcon.className = 'fas fa-check-circle';
            summaryTitle.textContent = 'Produk ini aman untuk Anda!';
            summaryDescription.textContent = 'Tidak ditemukan bahan yang bertentangan dengan profil kesehatan Anda.';
            break;
        case 'warning':
            summaryCard.classList.add('warning');
            summaryIcon.className = 'fas fa-exclamation-triangle';
            summaryTitle.textContent = 'Gunakan dengan hati-hati';
            summaryDescription.textContent = 'Beberapa bahan memerlukan perhatian khusus sesuai profil Anda.';
            break;
        case 'danger':
            summaryCard.classList.add('danger');
            summaryIcon.className = 'fas fa-times-circle';
            summaryTitle.textContent = 'Hindari produk ini!';
            summaryDescription.textContent = 'Produk mengandung bahan yang berisiko tinggi untuk kondisi Anda.';
            break;
    }
}

function displayWarnings(warnings) {
    const warningsSection = document.getElementById('warningsSection');
    const warningsList = document.getElementById('warningsList');
    
    if (warnings.length === 0) {
        warningsSection.style.display = 'none';
        return;
    }
    
    warningsSection.style.display = 'block';
    warningsList.innerHTML = '';
    
    warnings.forEach(warning => {
        const warningItem = document.createElement('div');
        warningItem.className = `warning-item ${warning.level}`;
        
        warningItem.innerHTML = `
            <div class="warning-icon">
                <i class="${warning.icon}"></i>
            </div>
            <div class="warning-content">
                <h4>${warning.ingredient}</h4>
                <p>${warning.message}</p>
            </div>
        `;
        
        warningsList.appendChild(warningItem);
    });
}

function displayIngredients(ingredients) {
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = '';
    
    ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('div');
        ingredientItem.className = `ingredient-item ${ingredient.safetyLevel}`;
        
        const tags = [];
        if (ingredient.allergens.length > 0) {
            tags.push(...ingredient.allergens);
        }
        tags.push(ingredient.category);
        
        ingredientItem.innerHTML = `
            <div class="ingredient-header">
                <span class="ingredient-name">${ingredient.name}</span>
                <span class="ingredient-status ${ingredient.safetyLevel}">
                    ${ingredient.safetyLevel === 'safe' ? 'Aman' : 
                      ingredient.safetyLevel === 'caution' ? 'Hati-hati' : 
                      ingredient.safetyLevel === 'avoid' ? 'Hindari' : 'Tidak Diketahui'}
                </span>
            </div>
            <div class="ingredient-description">${ingredient.description}</div>
            <div class="ingredient-tags">
                ${tags.map(tag => `<span class="ingredient-tag">${tag}</span>`).join('')}
            </div>
        `;
        
        ingredientsList.appendChild(ingredientItem);
    });
}

function displayRecommendations(recommendations) {
    const recommendationsSection = document.getElementById('recommendationsSection');
    const recommendationsList = document.getElementById('recommendationsList');
    
    if (recommendations.length === 0) {
        recommendationsSection.style.display = 'none';
        return;
    }
    
    recommendationsSection.style.display = 'block';
    recommendationsList.innerHTML = '';
    
    recommendations.forEach(rec => {
        const recItem = document.createElement('div');
        recItem.className = 'recommendation-item';
        
        recItem.innerHTML = `
            <h4 class="recommendation-title">${rec.title}</h4>
            <p class="recommendation-description">${rec.description}</p>
            <a href="${rec.link}" class="recommendation-link">
                ${rec.linkText} <i class="fas fa-arrow-right"></i>
            </a>
        `;
        
        recommendationsList.appendChild(recItem);
    });
}

// Profile Management
function updateProfile() {
    const profile = {
        allergies: [],
        health: [],
        diet: [],
        skincare: [],
        skinType: document.getElementById('skinType').value
    };
    
    // Get checked allergies
    document.querySelectorAll('input[name="allergies"]:checked').forEach(input => {
        profile.allergies.push(input.value);
    });
    
    // Get checked health conditions
    document.querySelectorAll('input[name="health"]:checked').forEach(input => {
        profile.health.push(input.value);
    });
    
    // Get checked diet preferences
    document.querySelectorAll('input[name="diet"]:checked').forEach(input => {
        profile.diet.push(input.value);
    });
    
    // Get checked skincare preferences
    document.querySelectorAll('input[name="skincare"]:checked').forEach(input => {
        profile.skincare.push(input.value);
    });
    
    currentUserProfile = profile;
}

function saveProfile() {
    updateProfile();
    localStorage.setItem('ingredifren_profile', JSON.stringify(currentUserProfile));
    showAlert('Profil berhasil disimpan!', 'success');
}

function loadUserProfile() {
    const savedProfile = localStorage.getItem('ingredifren_profile');
    if (savedProfile) {
        currentUserProfile = JSON.parse(savedProfile);
        applyProfileToForm();
    }
}

function applyProfileToForm() {
    // Apply allergies
    currentUserProfile.allergies.forEach(allergy => {
        const input = document.querySelector(`input[name="allergies"][value="${allergy}"]`);
        if (input) input.checked = true;
    });
    
    // Apply health conditions
    currentUserProfile.health.forEach(health => {
        const input = document.querySelector(`input[name="health"][value="${health}"]`);
        if (input) input.checked = true;
    });
    
    // Apply diet preferences
    currentUserProfile.diet.forEach(diet => {
        const input = document.querySelector(`input[name="diet"][value="${diet}"]`);
        if (input) input.checked = true;
    });
    
    // Apply skincare preferences
    currentUserProfile.skincare.forEach(skincare => {
        const input = document.querySelector(`input[name="skincare"][value="${skincare}"]`);
        if (input) input.checked = true;
    });
    
    // Apply skin type
    if (currentUserProfile.skinType) {
        document.getElementById('skinType').value = currentUserProfile.skinType;
    }
}

function resetProfile() {
    if (confirm('Apakah Anda yakin ingin menghapus semua data profil?')) {
        currentUserProfile = {
            allergies: [],
            health: [],
            diet: [],
            skincare: [],
            skinType: ''
        };
        
        // Clear form
        document.querySelectorAll('input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });
        document.getElementById('skinType').value = '';
        
        // Clear localStorage
        localStorage.removeItem('ingredifren_profile');
        
        showAlert('Profil berhasil direset!', 'success');
    }
}

// Utility Functions
function scrollToScanner() {
    document.getElementById('scanner').scrollIntoView({ behavior: 'smooth' });
}

function scanAgain() {
    // Reset everything
    removeImage();
    resultsSection.style.display = 'none';
    currentAnalysisResult = null;
    
    // Scroll to scanner
    scrollToScanner();
}

function saveResult() {
    if (!currentAnalysisResult) {
        showAlert('Tidak ada hasil untuk disimpan', 'error');
        return;
    }
    
    const savedResults = JSON.parse(localStorage.getItem('ingredifren_results') || '[]');
    const result = {
        ...currentAnalysisResult,
        timestamp: new Date().toISOString(),
        id: Date.now()
    };
    
    savedResults.push(result);
    localStorage.setItem('ingredifren_results', JSON.stringify(savedResults));
    
    showAlert('Hasil berhasil disimpan!', 'success');
}

function shareResult() {
    if (!currentAnalysisResult) {
        showAlert('Tidak ada hasil untuk dibagikan', 'error');
        return;
    }
    
    if (navigator.share) {
        navigator.share({
            title: 'Hasil Analisis IngrediFren',
            text: `Saya baru saja menganalisis kandungan produk dengan IngrediFren. Status keamanan: ${currentAnalysisResult.overallSafety}`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `Saya baru saja menganalisis kandungan produk dengan IngrediFren. Status keamanan: ${currentAnalysisResult.overallSafety}. Coba juga di ${window.location.href}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText);
            showAlert('Link berhasil disalin ke clipboard!', 'success');
        } else {
            showAlert('Fitur berbagi tidak didukung browser Anda', 'error');
        }
    }
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#06b6d4'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    alert.textContent = message;
    
    // Add to body
    document.body.appendChild(alert);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}