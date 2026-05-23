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
    
    // Appointment Form Handler - Submit only (Clear form button removed)
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Store the form container reference
            const formContainer = document.querySelector('.appointment-form-container');
            const originalContent = formContainer.innerHTML;
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-icon">✓</div>
                <h3>Appointment Confirmed!</h3>
                <p>Your viewing appointment has been scheduled. One of our agents will contact you shortly to confirm.</p>
            `;
            
            // Replace form with success message
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
            
            // Reset the form fields
            appointmentForm.reset();
            
            // Restore form after 3 seconds
            setTimeout(() => {
                formContainer.innerHTML = originalContent;
                // Re-attach event listeners to the restored form
                const restoredForm = document.getElementById('appointmentForm');
                if (restoredForm) {
                    // Re-attach submit event
                    restoredForm.addEventListener('submit', arguments.callee);
                }
            }, 3000);
        });
    }
    
    // Function to scroll to the top of the details section
    function scrollToDetailsTop() {
        // Find the gradient section which contains the details
        const gradientSection = document.querySelector('.gradient-section');
        if (gradientSection) {
            // Get the position of the gradient section
            const gradientRect = gradientSection.getBoundingClientRect();
            const absoluteGradientTop = gradientRect.top + window.pageYOffset;
            
            // Scroll to the gradient section with an offset to show the top
            window.scrollTo({
                top: absoluteGradientTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    // Property Card Click Handler - Show details in Details tab
    const propertyCards = document.querySelectorAll('.property-card');
    const maplewoodDetails = document.getElementById('maplewood-details');
    const villaDetails = document.getElementById('villa-details');
    const blancDetails = document.getElementById('blanc-details');
    const maisonDetails = document.getElementById('maison-details');
    const aureliaDetails = document.getElementById('aurelia-details');
    const royaleDetails = document.getElementById('royale-details');
    
    function showPropertyDetails(propertyId) {
        // Hide all property detail sections
        if (maplewoodDetails) maplewoodDetails.style.display = 'none';
        if (villaDetails) villaDetails.style.display = 'none';
        if (blancDetails) blancDetails.style.display = 'none';
        if (maisonDetails) maisonDetails.style.display = 'none';
        if (aureliaDetails) aureliaDetails.style.display = 'none';
        if (royaleDetails) royaleDetails.style.display = 'none';
        
        // Show the selected property details
        switch(propertyId) {
            case 'maplewood':
                if (maplewoodDetails) maplewoodDetails.style.display = 'block';
                break;
            case 'villa':
                if (villaDetails) villaDetails.style.display = 'block';
                break;
            case 'blanc':
                if (blancDetails) blancDetails.style.display = 'block';
                break;
            case 'maison':
                if (maisonDetails) maisonDetails.style.display = 'block';
                break;
            case 'aurelia':
                if (aureliaDetails) aureliaDetails.style.display = 'block';
                break;
            case 'royale':
                if (royaleDetails) royaleDetails.style.display = 'block';
                break;
            default:
                // Show first property (Maplewood Crest) by default
                if (maplewoodDetails) maplewoodDetails.style.display = 'block';
        }
    }
    
    if (propertyCards) {
        propertyCards.forEach(card => {
            card.addEventListener('click', function() {
                const property = this.getAttribute('data-property');
                
                // Switch to details tab
                const detailsTabLink = document.querySelector('.menu-link[data-tab="details"]');
                if (detailsTabLink) {
                    // Remove active class from all menu links
                    menuLinks.forEach(l => l.classList.remove('active'));
                    detailsTabLink.classList.add('active');
                    
                    // Switch to details tab
                    switchTab('details');
                }
                
                // Show the appropriate property details
                showPropertyDetails(property);
                
                // Scroll to the top of the details section after a longer delay
                // to ensure the tab content is fully rendered
                setTimeout(() => {
                    scrollToDetailsTop();
                }, 500);
            });
        });
    }
    
    // Schedule Viewing Button Handler
    const scheduleButtons = document.querySelectorAll('.schedule-viewing-btn');
    
    if (scheduleButtons) {
        scheduleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const propertyName = this.getAttribute('data-property');
                
                // Switch to viewing tab
                const viewingTabLink = document.querySelector('.menu-link[data-tab="viewing"]');
                if (viewingTabLink) {
                    // Remove active class from all menu links
                    menuLinks.forEach(l => l.classList.remove('active'));
                    viewingTabLink.classList.add('active');
                    
                    // Switch to viewing tab
                    switchTab('viewing');
                }
                
                // Pre-fill the property name in the form
                setTimeout(() => {
                    const propertySelect = document.getElementById('propertyName');
                    if (propertySelect && propertyName) {
                        propertySelect.value = propertyName;
                    }
                    
                    // Scroll to the appointment form
                    const appointmentSection = document.querySelector('.appointment-section');
                    if (appointmentSection) {
                        appointmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            });
        });
    }
});