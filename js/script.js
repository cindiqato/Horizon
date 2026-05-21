// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const loginForm = document.getElementById('loginForm');
    const loginPage = document.getElementById('loginPage');
    const mainApp = document.getElementById('mainApp');
    const logoutBtnMain = document.getElementById('logoutBtnMain');
    const homeNavLink = document.getElementById('homeNavLink');
    const aboutUsNavLink = document.getElementById('aboutUsNavLink');
    const pageContainer = document.querySelector('.page-container');
    
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
    
    // Function to slide to About Us page
    function slideToAboutUs() {
        pageContainer.classList.add('slide-to-about');
        // Update active states
        homeNavLink.classList.remove('active');
        aboutUsNavLink.classList.add('active');
    }
    
    // Function to slide to Home page
    function slideToHome() {
        pageContainer.classList.remove('slide-to-about');
        // Update active states
        aboutUsNavLink.classList.remove('active');
        homeNavLink.classList.add('active');
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
    
    // Handle Home navigation click
    if (homeNavLink) {
        homeNavLink.addEventListener('click', function(event) {
            event.preventDefault();
            slideToHome();
        });
    }
    
    // Handle About Us navigation click
    if (aboutUsNavLink) {
        aboutUsNavLink.addEventListener('click', function(event) {
            event.preventDefault();
            slideToAboutUs();
        });
    }
    
    // Set initial active state
    homeNavLink.classList.add('active');
    
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
});