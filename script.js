/**
 * Main JavaScript file for Prestige University website
 * Contains functionality for navigation, interactive elements, and more
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarMenu = document.querySelector('.navbar__menu');
    
    if (mobileMenu && navbarMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar__links');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // News category filter functionality
    const newsCategoryBtns = document.querySelectorAll('.news-categories__btn');
    if (newsCategoryBtns.length > 0) {
        newsCategoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                newsCategoryBtns.forEach(b => b.classList.remove('news-categories__btn--active'));
                
                // Add active class to clicked button
                this.classList.add('news-categories__btn--active');
                
                // Get category to filter
                const category = this.textContent.trim();
                
                // Filter news cards (in a real implementation, this would be more sophisticated)
                console.log(`Filtering by category: ${category}`);
                // This is where you would implement actual filtering logic
            });
        });
    }
    
    // Programs filter functionality
    const programFilters = document.querySelectorAll('.programs-filter__select');
    if (programFilters.length > 0) {
        programFilters.forEach(filter => {
            filter.addEventListener('change', function() {
                // Get all selected filter values
                const schoolFilter = document.querySelector('.programs-filter__select:nth-of-type(1)').value;
                const levelFilter = document.querySelector('.programs-filter__select:nth-of-type(2)').value;
                const formatFilter = document.querySelector('.programs-filter__select:nth-of-type(3)').value;
                
                console.log(`Filtering programs by: School=${schoolFilter}, Level=${levelFilter}, Format=${formatFilter}`);
                // This is where you would implement actual filtering logic
            });
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.programs-filter__input');
    const searchBtn = document.querySelector('.programs-filter__search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                console.log(`Searching for: ${searchTerm}`);
                // This is where you would implement actual search logic
            }
        });
        
        // Allow search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchBtn.click();
            }
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter__form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                console.log(`Subscribing email: ${email}`);
                // In a real implementation, you would send this to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Animation on scroll
    // This would require the Intersection Observer API or a library like AOS
    // For simplicity, we'll just log when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.featured__card, .news-preview__card, .programs-list__card, .news-grid__card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Call the animation function
    animateOnScroll();
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.display = 'none';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.zIndex = '999';
    backToTopBtn.style.width = '50px';
    backToTopBtn.style.height = '50px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.backgroundColor = 'var(--secondary-color)';
    backToTopBtn.style.color = 'white';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.fontSize = '1.2rem';
    backToTopBtn.style.transition = 'all 0.3s ease';
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
});

// Additional utility functions
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}