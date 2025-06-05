// DOM Elements
document.addEventListener('DOMContentLoaded', function () {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Form Validation Functions
    const validateForm = (formData) => {
        let isValid = true;
        const errors = {};

        // Name validation
        if (!formData.name?.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email?.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email.trim())) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Phone validation
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!formData.phone?.trim()) {
            errors.phone = 'Phone number is required';
            isValid = false;
        } else if (!phoneRegex.test(formData.phone.trim())) {
            errors.phone = 'Please enter a valid phone number';
            isValid = false;
        }

        // Subject validation - simplified and explicit
        if (!formData.subject || formData.subject === '') {
            errors.subject = 'Please select a subject';
            isValid = false;
        }

        // Message validation
        if (!formData.message?.trim()) {
            errors.message = 'Message is required';
            isValid = false;
        } else if (formData.message.trim().length < 5) {
            errors.message = 'Message must be at least 5 characters';
            isValid = false;
        }

        return { isValid, errors };
    };

    // Show error message
    const showError = (fieldId, message) => {
        const errorDiv = document.getElementById(`${fieldId}Error`);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    };

    // Clear error messages
    const clearErrors = () => {
        const errorDivs = document.querySelectorAll('.error-message');
        errorDivs.forEach(div => {
            div.textContent = '';
            div.style.display = 'none';
        });
    };

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();

            // Get form field values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value, 
                message: document.getElementById('message').value
            };

            const { isValid, errors } = validateForm(formData);

            if (!isValid) {
                Object.keys(errors).forEach(field => {
                    showError(field, errors[field]);
                });
                return;
            }

            // If valid, show success message
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        });
    }

    // Newsletter Subscription
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Initialize Functions
    initializeFilters();
});

