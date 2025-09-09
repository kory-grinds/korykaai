/**
 * Modern Portfolio JavaScript - Korykaai
 * Handles navigation, form validation, animations, and user interactions
 */

(function() {
    'use strict';

    // DOM Elements
    const contactForm = document.querySelector('.contact-form');
    const sections = document.querySelectorAll('section[id]');

    // State
    let currentSection = 'home';

    /**
     * Initialize the application
     */
    function init() {
        setupEventListeners();
        setupIntersectionObserver();
        setupSmoothScrolling();
        setupFormValidation();
        setupAnimations();
        setupDeveloperTools();
    }

    /**
     * Set up all event listeners
     */
    function setupEventListeners() {
        // Form submission
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }

        // Focus management
        setupFocusManagement();
    }



    /**
     * Set up focus management for accessibility
     */
    function setupFocusManagement() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Focus visible indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }


    /**
     * Set up intersection observer for section visibility
     */
    function setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    currentSection = sectionId;
                    
                    // Animate elements in view
                    animateElementsInView(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }


    /**
     * Smooth scroll to section
     */
    function scrollToSection(target) {
        const targetPosition = target.offsetTop;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Set up smooth scrolling for all anchor links
     */
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement && targetId !== '#') {
                    e.preventDefault();
                    scrollToSection(targetElement);
                }
            });
        });
    }

    /**
     * Set up form validation
     */
    function setupFormValidation() {
        if (!contactForm) return;

        const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }

    /**
     * Validate individual form field
     */
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (!value) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
        }
        // Email validation
        else if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        // Name validation
        else if (fieldName === 'name') {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long.';
            }
        }
        // Message validation
        else if (fieldName === 'message') {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long.';
            }
        }

        // Update field appearance and error message
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.setAttribute('aria-live', 'off');
            }
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.setAttribute('aria-live', 'polite');
            }
        }

        return isValid;
    }

    /**
     * Clear field error state
     */
    function clearFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.setAttribute('aria-live', 'off');
        }
    }

    /**
     * Handle form submission
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        
        // Validate all fields
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            // Focus first invalid field
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            inputs.forEach(input => {
                input.classList.remove('valid', 'error');
            });
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    /**
     * Show notification message
     */
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">×</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 16px 20px;
            background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    /**
     * Set up scroll-triggered animations
     */
    function setupAnimations() {
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .animate-on-scroll.animated {
                opacity: 1;
                transform: translateY(0);
            }
            
            .keyboard-navigation *:focus {
                outline: 2px solid var(--primary-color) !important;
                outline-offset: 2px !important;
            }
            
            .form-input.error,
            .form-textarea.error {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
            
            .form-input.valid,
            .form-textarea.valid {
                border-color: #10b981;
                box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            }
            
            .notification-close:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        `;
        document.head.appendChild(style);

        // Mark elements for animation
        const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat, .about-text, .contact-info');
        animateElements.forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    }

    /**
     * Animate elements when they come into view
     */
    function animateElementsInView(section) {
        const animateElements = section.querySelectorAll('.animate-on-scroll:not(.animated)');
        
        animateElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated');
            }, index * 100);
        });
    }

    /**
     * Throttle function for performance
     */
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Debounce function for performance
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Lazy load images for performance
     */
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Initialize when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /**
     * Set up developer tools functionality
     */
    function setupDeveloperTools() {
        // JSON Formatter Tool
        const jsonInput = document.getElementById('json-input');
        const jsonOutput = document.getElementById('json-output');
        const jsonStatus = document.getElementById('json-status');
        const formatJsonBtn = document.getElementById('format-json');
        const minifyJsonBtn = document.getElementById('minify-json');
        const validateJsonBtn = document.getElementById('validate-json');
        const clearJsonBtn = document.getElementById('clear-json');

        if (formatJsonBtn) {
            formatJsonBtn.addEventListener('click', () => formatJSON(false));
            minifyJsonBtn.addEventListener('click', () => formatJSON(true));
            validateJsonBtn.addEventListener('click', validateJSON);
            clearJsonBtn.addEventListener('click', clearJSON);
        }

        function formatJSON(minify = false) {
            const input = jsonInput.value.trim();
            if (!input) {
                showToolStatus(jsonStatus, 'Please enter some JSON to format.', 'error');
                return;
            }

            try {
                const parsed = JSON.parse(input);
                const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
                jsonOutput.value = formatted;
                showToolStatus(jsonStatus, `JSON ${minify ? 'minified' : 'formatted'} successfully!`, 'success');
            } catch (error) {
                showToolStatus(jsonStatus, `Invalid JSON: ${error.message}`, 'error');
                jsonOutput.value = '';
            }
        }

        function validateJSON() {
            const input = jsonInput.value.trim();
            if (!input) {
                showToolStatus(jsonStatus, 'Please enter some JSON to validate.', 'error');
                return;
            }

            try {
                JSON.parse(input);
                showToolStatus(jsonStatus, 'Valid JSON! ✅', 'success');
            } catch (error) {
                showToolStatus(jsonStatus, `Invalid JSON: ${error.message}`, 'error');
            }
        }

        function clearJSON() {
            jsonInput.value = '';
            jsonOutput.value = '';
            jsonStatus.textContent = '';
            jsonStatus.className = 'tool-status';
        }

        // Base64 Encoder/Decoder Tool
        const base64Input = document.getElementById('base64-input');
        const base64Output = document.getElementById('base64-output');
        const base64Status = document.getElementById('base64-status');
        const encodeBase64Btn = document.getElementById('encode-base64');
        const decodeBase64Btn = document.getElementById('decode-base64');
        const clearBase64Btn = document.getElementById('clear-base64');

        if (encodeBase64Btn) {
            encodeBase64Btn.addEventListener('click', encodeBase64);
            decodeBase64Btn.addEventListener('click', decodeBase64);
            clearBase64Btn.addEventListener('click', clearBase64);
        }

        function encodeBase64() {
            const input = base64Input.value;
            if (!input) {
                showToolStatus(base64Status, 'Please enter some text to encode.', 'error');
                return;
            }

            try {
                const encoded = btoa(unescape(encodeURIComponent(input)));
                base64Output.value = encoded;
                showToolStatus(base64Status, 'Text encoded to Base64 successfully!', 'success');
            } catch (error) {
                showToolStatus(base64Status, `Encoding error: ${error.message}`, 'error');
            }
        }

        function decodeBase64() {
            const input = base64Input.value.trim();
            if (!input) {
                showToolStatus(base64Status, 'Please enter Base64 text to decode.', 'error');
                return;
            }

            try {
                const decoded = decodeURIComponent(escape(atob(input)));
                base64Output.value = decoded;
                showToolStatus(base64Status, 'Base64 decoded successfully!', 'success');
            } catch (error) {
                showToolStatus(base64Status, `Decoding error: Invalid Base64 string.`, 'error');
            }
        }

        function clearBase64() {
            base64Input.value = '';
            base64Output.value = '';
            base64Status.textContent = '';
            base64Status.className = 'tool-status';
        }

        // Color Palette Generator Tool
        const baseColor = document.getElementById('base-color');
        const baseColorHex = document.getElementById('base-color-hex');
        const colorPalette = document.getElementById('color-palette');
        const generatePaletteBtn = document.getElementById('generate-palette');
        const randomPaletteBtn = document.getElementById('random-palette');

        if (generatePaletteBtn) {
            generatePaletteBtn.addEventListener('click', generatePalette);
            randomPaletteBtn.addEventListener('click', generateRandomPalette);
            baseColor.addEventListener('input', updateHexInput);
            baseColorHex.addEventListener('input', updateColorInput);
        }

        function updateHexInput() {
            baseColorHex.value = baseColor.value;
        }

        function updateColorInput() {
            const hex = baseColorHex.value;
            if (/^#[0-9A-F]{6}$/i.test(hex)) {
                baseColor.value = hex;
            }
        }

        function generatePalette() {
            const baseHex = baseColor.value;
            const colors = generateColorPalette(baseHex);
            displayColorPalette(colors);
        }

        function generateRandomPalette() {
            const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
            baseColor.value = randomHex;
            baseColorHex.value = randomHex;
            const colors = generateColorPalette(randomHex);
            displayColorPalette(colors);
        }

        function generateColorPalette(baseHex) {
            const hsl = hexToHsl(baseHex);
            const colors = [];

            // Generate complementary and analogous colors
            const variations = [
                { h: hsl.h, s: hsl.s, l: Math.max(0.1, hsl.l - 0.3) }, // Darker
                { h: hsl.h, s: hsl.s, l: Math.max(0.1, hsl.l - 0.15) }, // Dark
                { h: hsl.h, s: hsl.s, l: hsl.l }, // Base
                { h: hsl.h, s: hsl.s, l: Math.min(0.9, hsl.l + 0.15) }, // Light
                { h: hsl.h, s: hsl.s, l: Math.min(0.9, hsl.l + 0.3) }, // Lighter
                { h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l }, // Complementary
                { h: (hsl.h + 30) % 360, s: hsl.s, l: hsl.l }, // Analogous 1
                { h: (hsl.h - 30 + 360) % 360, s: hsl.s, l: hsl.l }, // Analogous 2
            ];

            variations.forEach(color => {
                colors.push(hslToHex(color.h, color.s, color.l));
            });

            return colors;
        }

        function displayColorPalette(colors) {
            colorPalette.innerHTML = '';
            colors.forEach(color => {
                const swatch = document.createElement('div');
                swatch.className = 'color-swatch';
                swatch.style.backgroundColor = color;
                swatch.innerHTML = `<span class="color-code">${color.toUpperCase()}</span>`;
                swatch.addEventListener('click', () => copyToClipboard(color.toUpperCase()));
                colorPalette.appendChild(swatch);
            });
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification(`Copied ${text} to clipboard!`, 'success');
            }).catch(() => {
                showNotification('Failed to copy to clipboard', 'error');
            });
        }

        // Color conversion utilities
        function hexToHsl(hex) {
            const r = parseInt(hex.slice(1, 3), 16) / 255;
            const g = parseInt(hex.slice(3, 5), 16) / 255;
            const b = parseInt(hex.slice(5, 7), 16) / 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return { h: h * 360, s: s, l: l };
        }

        function hslToHex(h, s, l) {
            h = h / 360;
            const a = s * Math.min(l, 1 - l);
            const f = n => {
                const k = (n + h * 12) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color).toString(16).padStart(2, '0');
            };
            return `#${f(0)}${f(8)}${f(4)}`;
        }

        function showToolStatus(statusElement, message, type) {
            statusElement.textContent = message;
            statusElement.className = `tool-status ${type}`;
        }
    }

    // Expose public methods for external use
    window.PortfolioApp = {
        scrollToSection,
        showNotification
    };

})();
