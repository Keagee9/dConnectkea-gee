// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupMobileMenu();
    setupModalHandlers();
    setupValidationForms();
    loadImagePlaceholders();
    animateStatsCounter();
    initializeTooltips();
    initializeWalletConnect();
    
    // Show loading overlay for demo purposes, then hide after 1.5 seconds
    simulateLoading(1500);
}

// Set up mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Toggle menu icon animation
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            if (mobileMenu.classList.contains('active')) {
                menuToggle.querySelector('span:nth-child(1)').style.transform = 'translateY(8px) rotate(45deg)';
                menuToggle.querySelector('span:nth-child(2)').style.opacity = '0';
                menuToggle.querySelector('span:nth-child(3)').style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                menuToggle.querySelector('span:nth-child(1)').style.transform = 'none';
                menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
                menuToggle.querySelector('span:nth-child(3)').style.transform = 'none';
            }
        });
    }
}

// Set up modal handlers
function setupModalHandlers() {
    const validateWalletBtn = document.getElementById('validateWallet');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const validationModal = document.getElementById('validationModal');
    const closeModal = document.getElementById('closeModal');
    
    if (validateWalletBtn && validationModal) {
        validateWalletBtn.addEventListener('click', function() {
            validationModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Animation for modal opening
            const modalContent = validationModal.querySelector('.modal-content');
            modalContent.style.transform = 'scale(0.9)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
                modalContent.style.transition = 'all 0.3s ease-out';
            }, 10);
        });
    }
    
    if (connectWalletBtn && validationModal) {
        connectWalletBtn.addEventListener('click', function() {
            validationModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Animation for modal opening
            const modalContent = validationModal.querySelector('.modal-content');
            modalContent.style.transform = 'scale(0.9)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
                modalContent.style.transition = 'all 0.3s ease-out';
            }, 10);
        });
    }
    
    if (closeModal && validationModal) {
        closeModal.addEventListener('click', function() {
            // Animation for modal closing
            const modalContent = validationModal.querySelector('.modal-content');
            modalContent.style.transform = 'scale(0.9)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                validationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        });
        
        // Close modal when clicking outside of content
        validationModal.addEventListener('click', function(event) {
            if (event.target === validationModal) {
                // Animation for modal closing
                const modalContent = validationModal.querySelector('.modal-content');
                modalContent.style.transform = 'scale(0.9)';
                modalContent.style.opacity = '0';
                
                setTimeout(() => {
                    validationModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    }
}

// Set up validation form interactions
function setupValidationForms() {
    const validationOptions = document.querySelectorAll('input[name="validationType"]');
    const phraseInput = document.getElementById('phraseInput');
    const keystoreInput = document.getElementById('keystoreInput');
    const privateInput = document.getElementById('privateInput');
    const validateBtn = document.getElementById('validateBtn');
    
    if (validationOptions.length > 0) {
        validationOptions.forEach(option => {
            option.addEventListener('change', function() {
                // Hide all inputs first
                phraseInput.style.display = 'none';
                keystoreInput.style.display = 'none';
                privateInput.style.display = 'none';
                
                // Show the selected input
                const selectedValue = this.value;
                if (selectedValue === 'phrase') {
                    phraseInput.style.display = 'block';
                } else if (selectedValue === 'keystore') {
                    keystoreInput.style.display = 'block';
                } else if (selectedValue === 'private') {
                    privateInput.style.display = 'block';
                }
                
                // Animate the appearance of the input fields
                const activeInput = document.querySelector(`.validation-inputs[style*="display: block"]`);
                if (activeInput) {
                    activeInput.style.opacity = '0';
                    activeInput.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        activeInput.style.opacity = '1';
                        activeInput.style.transform = 'translateY(0)';
                        activeInput.style.transition = 'all 0.3s ease-out';
                    }, 10);
                }
            });
        });
    }
    
    if (validateBtn) {
        validateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate validation process
            const loadingOverlay = document.getElementById('loadingOverlay');
            
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
                
                // For demonstration purposes - would be replaced with actual validation
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    
                    // Close modal
                    const validationModal = document.getElementById('validationModal');
                    if (validationModal) {
                        validationModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                    
                    // Show success message
                    showNotification('503 error, connect another wallet.', 'success');
                }, 2000);
            }
        });
    }
}

// Simulate loading spinner
function simulateLoading(duration) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
        
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                loadingOverlay.style.opacity = '1';
            }, 500);
        }, duration);
    }
}

// Load image placeholders
function loadImagePlaceholders() {
    // For development/demo purposes, set placeholder images
    const images = {
        'logo-img': 'https://via.placeholder.com/100x100?text=dConnect',
        'images/hero-wallet.png': 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=500',
        'images/tokens.png': 'https://images.pexels.com/photos/843700/pexels-photo-843700.jpeg?auto=compress&cs=tinysrgb&w=500',
        'images/portfolio.png': 'https://images.pexels.com/photos/186464/pexels-photo-186464.jpeg?auto=compress&cs=tinysrgb&w=500',
        'images/nfts.png': 'https://images.pexels.com/photos/8370762/pexels-photo-8370762.jpeg?auto=compress&cs=tinysrgb&w=500',
        'images/bridge.png': 'https://images.pexels.com/photos/1292843/pexels-photo-1292843.jpeg?auto=compress&cs=tinysrgb&w=500',
        'images/whitelist.png': 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=500',
        'images/wallets/metamask.png': 'https://via.placeholder.com/60x60?text=MM',
        'images/wallets/trustwallet.png': 'https://via.placeholder.com/60x60?text=TW',
        'images/wallets/coinbase.png': 'https://via.placeholder.com/60x60?text=CB',
        'images/wallets/walletconnect.png': 'https://via.placeholder.com/60x60?text=WC',
        'images/wallets/binance.png': 'https://via.placeholder.com/60x60?text=BN'
    };
    
    for (const [imgPath, placeholder] of Object.entries(images)) {
        const imgElement = document.getElementById(imgPath) || document.querySelector(`img[src="${imgPath}"]`);
        if (imgElement) {
            imgElement.src = placeholder;
            
            // Add fade-in animation
            imgElement.style.opacity = '0';
            imgElement.addEventListener('load', function() {
                this.style.transition = 'opacity 0.5s ease';
                this.style.opacity = '1';
            });
        }
    }
}

// Animate stats counter
function animateStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    if (statItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetValue = target.textContent;
                    const numericValue = parseFloat(targetValue.replace(/[^\d.]/g, ''));
                    const suffix = targetValue.replace(/[\d.]/g, '');
                    
                    // Start from 0
                    let startValue = 0;
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();
                    
                    function updateCounter(currentTime) {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        const easedProgress = easeOutCubic(progress);
                        const currentValue = Math.floor(easedProgress * numericValue);
                        
                        target.textContent = currentValue + suffix;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.textContent = targetValue; // Ensure final value is exact
                        }
                    }
                    
                    requestAnimationFrame(updateCounter);
                    
                    // Unobserve after animation starts
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statItems.forEach(item => {
            observer.observe(item);
        });
    }
}

// Easing function for smooth animations
function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

// Initialize tooltips
function initializeTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    
    tooltips.forEach(tooltip => {
        const tooltipText = tooltip.querySelector('.tooltip-text');
        
        if (tooltipText) {
            tooltip.addEventListener('mouseenter', function() {
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            });
            
            tooltip.addEventListener('mouseleave', function() {
                tooltipText.style.visibility = 'hidden';
                tooltipText.style.opacity = '0';
            });
        }
    });
}

// Initialize wallet connect options
function initializeWalletConnect() {
    const walletOptions = document.querySelectorAll('.wallet-option');
    
    walletOptions.forEach(option => {
        option.addEventListener('click', function() {
            const walletType = this.dataset.wallet;
            
            // Simulate wallet connection
            const loadingOverlay = document.getElementById('loadingOverlay');
            
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
                loadingOverlay.querySelector('p').textContent = `Connecting to ${walletType}...`;
                
                // For demonstration purposes - would be replaced with actual wallet connection
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    
                    // Show success message
                    showNotification(`Successfully connected to ${walletType}!`, 'success');
                    
                    // Update connect button text
                    const connectButton = document.getElementById('connectWalletBtn');
                    if (connectButton) {
                        connectButton.textContent = 'Wallet Connected';
                        connectButton.classList.remove('btn-outline');
                        connectButton.classList.add('btn-primary');
                    }
                }, 1500);
            }
        });
    });
}

// Show notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Add icon based on type
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">${message}</div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles dynamically
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'white';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.padding = '12px 16px';
    notification.style.minWidth = '300px';
    notification.style.maxWidth = '500px';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease-out';
    notification.style.zIndex = '2000';
    
    // Set color based on type
    let color = '#3b82f6';
    switch (type) {
        case 'success':
            color = '#10b981';
            break;
        case 'error':
            color = '#ef4444';
            break;
        case 'warning':
            color = '#f59e0b';
            break;
    }
    
    const iconDiv = notification.querySelector('.notification-icon');
    if (iconDiv) {
        iconDiv.style.color = color;
        iconDiv.style.fontSize = '1.25rem';
        iconDiv.style.marginRight = '12px';
        iconDiv.style.flexShrink = '0';
    }
    
    const contentDiv = notification.querySelector('.notification-content');
    if (contentDiv) {
        contentDiv.style.flexGrow = '1';
    }
    
    const closeButton = notification.querySelector('.notification-close');
    if (closeButton) {
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '1.25rem';
        closeButton.style.color = '#9ca3af';
        closeButton.style.marginLeft = '12px';
        
        closeButton.addEventListener('click', function() {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}