// Demo Configuration for IngrediFren
// This file contains sample data and demo settings

const demoConfig = {
    // Sample product images with their expected ingredients
    sampleProducts: [
        {
            name: "Makanan Ringan",
            ingredients: ["wheat flour", "sugar", "palm oil", "salt", "sodium benzoate", "red 40"],
            description: "Keripik kentang dengan perisa"
        },
        {
            name: "Minuman Bersoda",
            ingredients: ["water", "high fructose corn syrup", "citric acid", "natural flavors", "caffeine", "sodium benzoate"],
            description: "Minuman berkarbonasi dengan kafein"
        },
        {
            name: "Produk Skincare",
            ingredients: ["water", "hyaluronic acid", "glycerin", "sodium lauryl sulfate", "paraben", "fragrance"],
            description: "Serum wajah dengan hyaluronic acid"
        },
        {
            name: "Produk Dairy",
            ingredients: ["milk", "sugar", "cream", "stabilizers", "natural flavors"],
            description: "Yogurt dengan rasa buah"
        },
        {
            name: "Makanan dengan Kacang",
            ingredients: ["peanuts", "sugar", "salt", "palm oil", "natural flavors"],
            description: "Selai kacang alami"
        }
    ],
    
    // Demo user profiles for testing
    demoProfiles: [
        {
            name: "User with Allergies",
            profile: {
                allergies: ["nuts", "dairy"],
                health: [],
                diet: ["vegan"],
                skincare: ["paraben-free"],
                skinType: "sensitive"
            }
        },
        {
            name: "Diabetic User",
            profile: {
                allergies: [],
                health: ["diabetes", "hypertension"],
                diet: ["lowsugar", "lowsodium"],
                skincare: [],
                skinType: "normal"
            }
        },
        {
            name: "Pregnant User",
            profile: {
                allergies: [],
                health: ["pregnant"],
                diet: ["halal"],
                skincare: ["paraben-free", "sulfate-free"],
                skinType: "sensitive"
            }
        },
        {
            name: "Vegan User",
            profile: {
                allergies: [],
                health: [],
                diet: ["vegan", "cruelty-free"],
                skincare: ["paraben-free", "sulfate-free"],
                skinType: "oily"
            }
        }
    ]
};

// Demo functions for testing and presentation
function loadDemoProfile(profileIndex) {
    if (profileIndex < 0 || profileIndex >= demoConfig.demoProfiles.length) {
        console.error("Invalid profile index");
        return;
    }
    
    const demoProfile = demoConfig.demoProfiles[profileIndex];
    currentUserProfile = { ...demoProfile.profile };
    
    // Apply to form
    applyProfileToForm();
    
    showAlert(`Profil demo "${demoProfile.name}" berhasil dimuat!`, 'success');
    
    console.log("Demo profile loaded:", demoProfile.name);
}

function simulateProductScan(productIndex) {
    if (productIndex < 0 || productIndex >= demoConfig.sampleProducts.length) {
        console.error("Invalid product index");
        return;
    }
    
    const product = demoConfig.sampleProducts[productIndex];
    
    // Show loading
    loadingContainer.style.display = 'block';
    uploadArea.style.display = 'none';
    previewContainer.style.display = 'none';
    
    // Simulate analysis
    setTimeout(() => {
        performAnalysis(product.ingredients);
        loadingContainer.style.display = 'none';
        displayResults();
        
        showAlert(`Analisis selesai untuk: ${product.description}`, 'success');
    }, 2000);
    
    console.log("Simulating scan for:", product.name);
}

// Add demo controls to the page (for development/testing)
function addDemoControls() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const demoPanel = document.createElement('div');
        demoPanel.id = 'demo-panel';
        demoPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            z-index: 10000;
            font-size: 12px;
            max-width: 300px;
        `;
        
        demoPanel.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #60a5fa;">Demo Controls</h4>
            
            <div style="margin-bottom: 15px;">
                <strong>Load Demo Profiles:</strong><br>
                ${demoConfig.demoProfiles.map((profile, index) => 
                    `<button onclick="loadDemoProfile(${index})" style="margin: 2px; padding: 4px 8px; font-size: 10px; border: none; border-radius: 4px; background: #3b82f6; color: white; cursor: pointer;">${profile.name}</button>`
                ).join('')}
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong>Simulate Product Scans:</strong><br>
                ${demoConfig.sampleProducts.map((product, index) => 
                    `<button onclick="simulateProductScan(${index})" style="margin: 2px; padding: 4px 8px; font-size: 10px; border: none; border-radius: 4px; background: #10b981; color: white; cursor: pointer;">${product.name}</button>`
                ).join('')}
            </div>
            
            <div>
                <button onclick="document.getElementById('demo-panel').style.display='none'" style="padding: 4px 8px; font-size: 10px; border: none; border-radius: 4px; background: #ef4444; color: white; cursor: pointer;">Hide Demo</button>
            </div>
        `;
        
        document.body.appendChild(demoPanel);
        
        console.log("Demo controls added. This panel only appears on localhost.");
    }
}

// Analytics and usage tracking (for demo purposes)
const analytics = {
    events: [],
    
    track(event, data = {}) {
        const eventData = {
            event,
            data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.events.push(eventData);
        console.log("Analytics event:", eventData);
        
        // In a real app, this would send to analytics service
    },
    
    getEvents() {
        return this.events;
    },
    
    clearEvents() {
        this.events = [];
    }
};

// Track common events
function trackEvent(eventName, eventData = {}) {
    analytics.track(eventName, eventData);
}

// Performance monitoring
const performance = {
    startTime: Date.now(),
    
    mark(label) {
        const time = Date.now() - this.startTime;
        console.log(`Performance mark: ${label} - ${time}ms`);
        trackEvent('performance_mark', { label, time });
    },
    
    measure(label, startMark, endMark) {
        console.log(`Performance measure: ${label}`);
        trackEvent('performance_measure', { label });
    }
};

// Error handling and reporting
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    trackEvent('javascript_error', {
        message: event.error.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
    
    // Show user-friendly error message
    showAlert('Terjadi kesalahan. Silakan refresh halaman atau coba lagi.', 'error');
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('ServiceWorker registration successful');
        //         trackEvent('service_worker_registered');
        //     })
        //     .catch(function(err) {
        //         console.log('ServiceWorker registration failed: ', err);
        //         trackEvent('service_worker_failed', { error: err.message });
        //     });
    });
}

// Initialize demo features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add demo controls for development
    addDemoControls();
    
    // Mark initial load time
    performance.mark('dom_content_loaded');
    
    // Track page load
    trackEvent('page_loaded', {
        userAgent: navigator.userAgent,
        screen: {
            width: screen.width,
            height: screen.height
        },
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    });
    
    // Add keyboard shortcuts for demo
    document.addEventListener('keydown', function(e) {
        // Press 'D' key to toggle demo panel
        if (e.key === 'd' && e.ctrlKey) {
            e.preventDefault();
            const panel = document.getElementById('demo-panel');
            if (panel) {
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            }
        }
        
        // Press '1'-'5' keys to simulate product scans
        if (e.key >= '1' && e.key <= '5' && e.ctrlKey) {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            simulateProductScan(index);
        }
    });
    
    console.log("Demo features initialized");
    console.log("Keyboard shortcuts:");
    console.log("- Ctrl+D: Toggle demo panel");
    console.log("- Ctrl+1-5: Simulate product scans");
});

// Export for global access
window.demoConfig = demoConfig;
window.loadDemoProfile = loadDemoProfile;
window.simulateProductScan = simulateProductScan;
window.trackEvent = trackEvent;
window.analytics = analytics;