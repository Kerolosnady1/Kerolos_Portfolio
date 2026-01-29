// ==================== CONTACT FORM VALIDATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('.form__input, .form__textarea');
        
        inputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error on input
                const errorElement = document.getElementById(this.id + '-error');
                if (errorElement) {
                    errorElement.textContent = '';
                    this.style.borderColor = '';
                }
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(function(input) {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showMessage('Please fix the errors in the form.', 'error');
            }
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(field.id + '-error');
        let errorMessage = '';
        
        // Check if field is empty
        if (field.hasAttribute('required') && value === '') {
            errorMessage = 'This field is required.';
        }
        
        // Email validation
        if (fieldName === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Name validation (at least 2 characters)
        if (fieldName === 'name' && value !== '' && value.length < 2) {
            errorMessage = 'Name must be at least 2 characters long.';
        }
        
        // Subject validation (at least 3 characters)
        if (fieldName === 'subject' && value !== '' && value.length < 3) {
            errorMessage = 'Subject must be at least 3 characters long.';
        }
        
        // Message validation (at least 10 characters)
        if (fieldName === 'message' && value !== '' && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long.';
        }
        
        if (errorMessage) {
            if (errorElement) {
                errorElement.textContent = errorMessage;
                field.style.borderColor = '#ef4444';
            }
            return false;
        } else {
            if (errorElement) {
                errorElement.textContent = '';
                field.style.borderColor = '#10b981';
            }
            return true;
        }
    }
    
    function showMessage(message, type) {
        const messagesContainer = document.querySelector('.messages-container') || createMessagesContainer();
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message message--' + type;
        messageElement.textContent = message;
        messageElement.setAttribute('role', 'alert');
        
        messagesContainer.appendChild(messageElement);
        
        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            messageElement.style.animation = 'slideOut 0.3s ease-in-out';
            setTimeout(function() {
                messageElement.remove();
            }, 300);
        }, 5000);
    }
    
    function createMessagesContainer() {
        const container = document.createElement('div');
        container.className = 'messages-container';
        document.body.appendChild(container);
        return container;
    }
    
    // ==================== CHARACTER COUNTER FOR TEXTAREA ====================
    const textarea = document.getElementById('message');
    if (textarea) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = 'text-align: right; font-size: 0.875rem; color: var(--text-light); margin-top: 0.25rem;';
        textarea.parentElement.appendChild(counter);
        
        function updateCounter() {
            const length = textarea.value.length;
            const minLength = 10;
            counter.textContent = length + ' characters';
            
            if (length >= minLength) {
                counter.style.color = '#10b981';
            } else {
                counter.style.color = 'var(--text-light)';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter();
    }
    
    // ==================== PREVENT DOUBLE SUBMISSION ====================
    if (contactForm) {
        let isSubmitting = false;
        
        contactForm.addEventListener('submit', function(e) {
            if (isSubmitting) {
                e.preventDefault();
                return;
            }
            
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                isSubmitting = true;
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Re-enable after 3 seconds as a fallback
                setTimeout(function() {
                    isSubmitting = false;
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }, 3000);
            }
        });
    }
    
    // ==================== ANIMATE FORM ON LOAD ====================
    if (contactForm) {
        const formGroups = contactForm.querySelectorAll('.form__group');
        formGroups.forEach(function(group, index) {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            
            setTimeout(function() {
                group.style.transition = 'all 0.5s ease-in-out';
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
});
