// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const loginForm = document.getElementById('loginForm');
    const loginPage = document.getElementById('loginPage');
    const homePage = document.getElementById('homePage');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Function to transition from login to home
    function loginToHome() {
        // Add fade-out-up animation to login page
        loginPage.classList.add('fade-out-up');
        
        // Wait for animation to complete before showing home page
        setTimeout(function() {
            loginPage.style.display = 'none';
            loginPage.classList.remove('fade-out-up');
            // Trigger home page fade-in-up animation
            homePage.classList.add('fade-in-up');
            homePage.style.display = 'block';
        }, 600);
    }
    
    // Function to transition from home to login
    function homeToLogin() {
        // Add fade-out-up animation to home page
        homePage.classList.add('fade-out-up');
        
        // Wait for animation to complete before showing login page
        setTimeout(function() {
            homePage.style.display = 'none';
            homePage.classList.remove('fade-out-up');
            homePage.classList.remove('fade-in-up');
            // Show login page with fade-in-up animation
            loginPage.style.display = 'flex';
            loginPage.classList.add('fade-in-up');
            
            // Remove the animation class after it completes
            setTimeout(function() {
                loginPage.classList.remove('fade-in-up');
            }, 600);
        }, 600);
    }
    
    // Handle login button click
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            loginToHome();
        });
    }
    
    // Handle logout button click
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            homeToLogin();
        });
    }
    
    // Tab switching functionality for clickable text links
    const menuLinks = document.querySelectorAll('.menu-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Remove active class from all menu links
            menuLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the tab name from data-tab attribute
            const tabName = this.getAttribute('data-tab');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            const activeTab = document.getElementById(`${tabName}Tab`);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
    
    // About Us click handler (functionless for now)
    const aboutUs = document.getElementById('aboutUs');
    if (aboutUs) {
        aboutUs.addEventListener('click', function(event) {
            event.preventDefault();
            alert('About Us page coming soon!');
        });
    }
    
    // Search bar handler (functionless for now)
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('input', function() {
            // Search functionality will be added later
            console.log('Search:', this.value);
        });
    }
});