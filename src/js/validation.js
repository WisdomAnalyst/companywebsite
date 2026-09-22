/**
 * Purpose: Implement client-side validation and preview functionality for the contact form
 * This ensures data quality before submission and provides a preview feature
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const previewBtn = document.getElementById('previewBtn');
    const previewSection = document.getElementById('previewSection');
    const closePreviewBtn = document.getElementById('closePreview');
    
    // Get all error message elements
    const errorMessages = {
        nameError: document.getElementById('nameError'),
        emailError: document.getElementById('emailError'),
        phoneError: document.getElementById('phoneError'),
        messageError: document.getElementById('messageError'),
        contactMethodError: document.getElementById('contactMethodError'),
        inquiryTypeError: document.getElementById('inquiryTypeError')
    };
    
    // Get all preview elements
    const previewElements = {
        name: document.getElementById('previewName'),
        email: document.getElementById('previewEmail'),
        phone: document.getElementById('previewPhone'),
        message: document.getElementById('previewMessage'),
        contactMethod: document.getElementById('previewContactMethod'),
        inquiryType: document.getElementById('previewInquiryType')
    };
    
    // Validation function
    function validateForm() {
        // Reset all error messages
        Object.values(errorMessages).forEach(msg => {
            msg.classList.remove('show');
        });
        
        let isValid = true;
        
        // Validate Name (required)
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            errorMessages.nameError.classList.add('show');
            isValid = false;
        }
        
        // Validate Email (required and format)
        const email = document.getElementById('email').value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            errorMessages.emailError.classList.add('show');
            isValid = false;
        } else if (!emailPattern.test(email)) {
            errorMessages.emailError.textContent = 'Please enter a valid email address.';
            errorMessages.emailError.classList.add('show');
            isValid = false;
        }
        
        // Validate Phone (required and 10 digits)
        const phone = document.getElementById('phone').value.trim();
        const phonePattern = /^[0-9]{10}$/;
        if (phone === '') {
            errorMessages.phoneError.classList.add('show');
            isValid = false;
        } else if (!phonePattern.test(phone)) {
            errorMessages.phoneError.textContent = 'Please enter a valid 10-digit phone number.';
            errorMessages.phoneError.classList.add('show');
            isValid = false;
        }
        
        // Validate Message (required)
        const message = document.getElementById('message').value.trim();
        if (message === '') {
            errorMessages.messageError.classList.add('show');
            isValid = false;
        }
        
        // Validate Contact Method (required)
        const contactMethod = document.querySelector('input[name="contactMethod"]:checked');
        if (!contactMethod) {
            errorMessages.contactMethodError.classList.add('show');
            isValid = false;
        }
        
        // Validate Inquiry Type (required)
        const inquiryType = document.getElementById('inquiryType').value;
        if (inquiryType === '') {
            errorMessages.inquiryTypeError.classList.add('show');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Preview function
    function showPreview() {
        if (!validateForm()) {
            // Scroll to first error
            const firstError = document.querySelector('.error-message.show');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
            contactMethod: document.querySelector('input[name="contactMethod"]:checked').value,
            inquiryType: document.getElementById('inquiryType').value
        };
        
        // Display preview
        previewElements.name.textContent = formData.name;
        previewElements.email.textContent = formData.email;
        previewElements.phone.textContent = formData.phone;
        previewElements.message.textContent = formData.message;
        previewElements.contactMethod.textContent = formData.contactMethod;
        previewElements.inquiryType.textContent = formData.inquiryType;
        
        // Show preview section
        previewSection.classList.add('active');
        
        // Scroll to preview
        previewSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Close preview function
    function closePreview() {
        previewSection.classList.remove('active');
    }
    
    // Event Listeners
    form.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
            // Scroll to first error
            const firstError = document.querySelector('.error-message.show');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Form is valid, allow submission
            // In a real application, this would send data to the server
            alert('Form submitted successfully!');
        }
    });
    
    previewBtn.addEventListener('click', showPreview);
    closePreviewBtn.addEventListener('click', closePreview);
    
    // Real-time validation for better user experience
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // Clear error message when user starts typing
            const errorId = input.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.classList.remove('show');
            }
            
            // Special handling for radio buttons
            if (input.type === 'radio' && input.name === 'contactMethod') {
                const errorElement = document.getElementById('contactMethodError');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        });
    });
});