document.addEventListener('DOMContentLoaded', function() {
    
    // LOGIN/LOGOUT FUNCTIONALITY
    const loginForm = document.getElementById('loginForm');
    const loginPage = document.getElementById('loginPage');
    const mainApp = document.getElementById('mainApp');
    const logoutBtnMain = document.getElementById('logoutBtnMain');
    
    function loginToMainApp() {
        loginPage.classList.add('fade-out-up');
        setTimeout(function() {
            loginPage.style.display = 'none';
            loginPage.classList.remove('fade-out-up');
            mainApp.style.display = 'block';
            mainApp.classList.add('fade-in-up');
            setTimeout(function() {
                mainApp.classList.remove('fade-in-up');
            }, 600);
        }, 600);
    }
    
    function mainAppToLogin() {
        mainApp.classList.add('fade-out-up');
        setTimeout(function() {
            mainApp.style.display = 'none';
            mainApp.classList.remove('fade-out-up');
            loginPage.style.display = 'flex';
            loginPage.classList.add('fade-in-up');
            setTimeout(function() {
                loginPage.classList.remove('fade-in-up');
            }, 600);
        }, 600);
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            loginToMainApp();
        });
    }
    
    if (logoutBtnMain) {
        logoutBtnMain.addEventListener('click', function(event) {
            event.preventDefault();
            mainAppToLogin();
        });
    }
    
    // TAB SWITCHING
    const menuLinks = document.querySelectorAll('.menu-link');
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
            switchTab(this.getAttribute('data-tab'));
        });
    });
    
    // APPOINTMENT FORM HANDLER
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Thank you! Your schedule has been confirmed. One of our agents will contact you shortly.');
            appointmentForm.reset();
        });
    }
    
    // PROPERTY CARD CLICK HANDLER
    const propertyCards = document.querySelectorAll('.property-card');
    const detailSections = {
        maplewood: document.getElementById('maplewood-details'),
        villa: document.getElementById('villa-details'),
        blanc: document.getElementById('blanc-details'),
        maison: document.getElementById('maison-details'),
        aurelia: document.getElementById('aurelia-details'),
        royale: document.getElementById('royale-details')
    };
    
    function showPropertyDetails(propertyId) {
        Object.values(detailSections).forEach(section => {
            if (section) section.style.display = 'none';
        });
        const selectedSection = detailSections[propertyId];
        if (selectedSection) {
            selectedSection.style.display = 'block';
        } else if (detailSections.maplewood) {
            detailSections.maplewood.style.display = 'block';
        }
    }
    
    if (propertyCards.length > 0) {
        propertyCards.forEach(card => {
            card.addEventListener('click', function() {
                const property = this.getAttribute('data-property');
                const detailsTabLink = document.querySelector('.menu-link[data-tab="details"]');
                if (detailsTabLink) {
                    menuLinks.forEach(l => l.classList.remove('active'));
                    detailsTabLink.classList.add('active');
                    switchTab('details');
                }
                showPropertyDetails(property);
            });
        });
    }
    
    // SCHEDULE VIEWING BUTTON HANDLER (removed redundant setTimeout)
    const scheduleButtons = document.querySelectorAll('.schedule-viewing-btn');
    if (scheduleButtons.length > 0) {
        scheduleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const propertyName = this.getAttribute('data-property');
                const viewingTabLink = document.querySelector('.menu-link[data-tab="viewing"]');
                if (viewingTabLink) {
                    menuLinks.forEach(l => l.classList.remove('active'));
                    viewingTabLink.classList.add('active');
                    switchTab('viewing');
                }
                const propertySelect = document.getElementById('propertyName');
                if (propertySelect && propertyName) {
                    propertySelect.value = propertyName;
                }
                const appointmentSection = document.querySelector('.appointment-section');
                if (appointmentSection) {
                    appointmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    // SEARCH BAR - Kept functional for typing (no filtering logic as requested)
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        // Search bar exists and is functional for typing
        // No filtering logic per user request
    }
});