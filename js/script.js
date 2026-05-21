// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const loginForm = document.getElementById('loginForm');
    const loginPage = document.getElementById('loginPage');
    const mainApp = document.getElementById('mainApp');
    const logoutBtnMain = document.getElementById('logoutBtnMain');
    
    // Function to transition from login to main app
    function loginToMainApp() {
        loginPage.classList.add('fade-out-up');
        
        setTimeout(function() {
            loginPage.style.display = 'none';
            loginPage.classList.remove('fade-out-up');
            mainApp.classList.add('fade-in-up');
            mainApp.style.display = 'block';
            
            // Initialize scroll effect after main app is shown
            setTimeout(initParallaxEffect, 100);
        }, 600);
    }
    
    // Function to transition from main app to login
    function mainAppToLogin() {
        mainApp.classList.add('fade-out-up');
        
        setTimeout(function() {
            mainApp.style.display = 'none';
            mainApp.classList.remove('fade-out-up');
            mainApp.classList.remove('fade-in-up');
            loginPage.style.display = 'flex';
            loginPage.classList.add('fade-in-up');
            
            setTimeout(function() {
                loginPage.classList.remove('fade-in-up');
            }, 600);
        }, 600);
    }
    
    // Handle login button click
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            loginToMainApp();
        });
    }
    
    // Handle logout button click
    if (logoutBtnMain) {
        logoutBtnMain.addEventListener('click', function(event) {
            event.preventDefault();
            mainAppToLogin();
        });
    }
    
    // Tab switching functionality with smooth crossfade
    const menuLinks = document.querySelectorAll('.menu-link');
    const tabContents = document.querySelectorAll('.tab-content');
    let isTransitioning = false;
    
    function switchTab(tabName) {
        if (isTransitioning) return;
        
        const targetTab = document.getElementById(`${tabName}Tab`);
        if (!targetTab) return;
        
        const currentActiveTab = document.querySelector('.tab-content.active');
        
        if (currentActiveTab === targetTab) return;
        
        isTransitioning = true;
        
        if (currentActiveTab) {
            currentActiveTab.style.opacity = '0';
            currentActiveTab.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                currentActiveTab.classList.remove('active');
                currentActiveTab.style.opacity = '';
                currentActiveTab.style.transform = '';
                
                targetTab.classList.add('active');
                targetTab.style.opacity = '0';
                targetTab.style.transform = 'translateY(10px)';
                
                targetTab.offsetHeight;
                
                targetTab.style.opacity = '1';
                targetTab.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    targetTab.style.opacity = '';
                    targetTab.style.transform = '';
                    isTransitioning = false;
                }, 400);
            }, 300);
        } else {
            targetTab.classList.add('active');
            isTransitioning = false;
        }
    }
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            if (this.classList.contains('active') || isTransitioning) return;
            
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Search bar handler
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('input', function() {
            console.log('Search:', this.value);
        });
    }
    
    // PARALLAX SCROLL EFFECT FOR PROPERTY IMAGES
    function initParallaxEffect() {
        const propertyImages = document.querySelectorAll('.property-image');
        
        if (propertyImages.length === 0) return;
        
        // Store initial positions and ranges for each image
        const imageData = [];
        
        propertyImages.forEach((img, index) => {
            // Calculate how much the image can move (image height - container height)
            const container = img.parentElement;
            const containerHeight = container.clientHeight;
            const imageHeight = img.clientHeight;
            const moveRange = (imageHeight - containerHeight) / 2; // Half range up and down from center
            
            // Different movement multipliers for each image for varied effect
            const speedMultiplier = 0.4 + (index * 0.03); // Ranges from 0.4 to 0.55
            
            imageData.push({
                element: img,
                moveRange: moveRange,
                speedMultiplier: speedMultiplier,
                isAnimating: false
            });
        });
        
        // Function to update image positions based on scroll
        function updateParallax() {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            
            imageData.forEach(data => {
                if (data.moveRange > 0) {
                    // Get the card's position relative to viewport
                    const card = data.element.closest('.property-card');
                    if (card) {
                        const cardRect = card.getBoundingClientRect();
                        const cardTop = cardRect.top;
                        const cardBottom = cardRect.bottom;
                        
                        // Calculate how far the card is from the center of viewport
                        const cardCenter = (cardTop + cardBottom) / 2;
                        const viewportCenter = viewportHeight / 2;
                        
                        // Calculate progress (-1 to 1) based on card position relative to viewport center
                        let progress = (cardCenter - viewportCenter) / (viewportHeight);
                        
                        // Limit the progress range for smoother movement
                        progress = Math.max(-0.8, Math.min(0.8, progress));
                        
                        // Calculate movement - smooth sine-like easing for natural feel
                        const easedProgress = Math.sin(progress * Math.PI / 2);
                        let movement = easedProgress * data.moveRange * data.speedMultiplier;
                        
                        // Add a subtle additional movement based on absolute scroll position
                        const globalScrollFactor = (scrollY % 200) / 200;
                        movement += Math.sin(scrollY * 0.002) * 2;
                        
                        // Apply transform while maintaining center position
                        // The base transform is translateY(-50%) to center the image
                        // We add the movement on top of that
                        data.element.style.transform = `translateY(calc(-50% + ${movement}px))`;
                    }
                }
            });
            
            requestAnimationFrame(updateParallax);
        }
        
        // Start the parallax animation
        updateParallax();
        
        // Update on window resize
        window.addEventListener('resize', () => {
            // Recalculate move ranges
            propertyImages.forEach((img, index) => {
                const container = img.parentElement;
                const containerHeight = container.clientHeight;
                const imageHeight = img.clientHeight;
                const moveRange = (imageHeight - containerHeight) / 2;
                
                if (imageData[index]) {
                    imageData[index].moveRange = moveRange;
                }
            });
        });
    }
    
    // Check if main app is already visible (in case of direct access)
    if (mainApp.style.display === 'block' || mainApp.classList.contains('fade-in-up')) {
        initParallaxEffect();
    }
});