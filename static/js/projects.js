// ==================== PROJECT FILTERING ====================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Filter projects
                filterProjects(filter);
            });
        });
    }
    
    function filterProjects(filter) {
        projectCards.forEach(function(card) {
            // Reset display
            card.style.display = 'block';
            
            if (filter === 'all') {
                // Show all projects with fade-in animation
                animateCardIn(card);
            } else if (filter === 'featured') {
                // Show only featured projects
                if (card.classList.contains('project-card--featured')) {
                    animateCardIn(card);
                } else {
                    animateCardOut(card);
                }
            } else {
                // Show projects matching the category
                const category = card.getAttribute('data-category');
                if (category && category.includes(filter)) {
                    animateCardIn(card);
                } else {
                    animateCardOut(card);
                }
            }
        });
    }
    
    function animateCardIn(card) {
        card.style.animation = 'fadeIn 0.5s ease-in-out';
        card.style.display = 'block';
    }
    
    function animateCardOut(card) {
        card.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(function() {
            card.style.display = 'none';
        }, 300);
    }
    
    // ==================== PROJECT CARD HOVER EFFECTS ====================
    projectCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ==================== ANIMATION STYLES ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
`;
document.head.appendChild(style);
