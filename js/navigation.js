document.addEventListener('DOMContentLoaded', function() {
    // Get all links that point to catalog section
    const catalogLinks = document.querySelectorAll('a[href*="#catalog"]');
    
    // Add click event listener to each catalog link
    catalogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If the link is on the same page
            if (this.getAttribute('href').charAt(0) === '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Add a small offset to account for fixed header if needed
                    const headerOffset = 80; // Adjust this value based on your header height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}); 