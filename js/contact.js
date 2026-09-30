/* ==========================================================================
   STACKLY ORGANIC FARMING - Contact Page Script (contact.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initFaqAccordion();
});

/* 1. Contact Form Validation and Handler */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBanner = document.getElementById('contact-alert');

  if (!form) return;

  const fullNameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Reset validation states
    [fullNameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
      if (input) input.classList.remove('is-invalid');
    });

    // Full Name Validation
    if (!fullNameInput.value.trim()) {
      setError(fullNameInput, 'Full Name is required');
      isValid = false;
    }

    // Email Validation
    if (!emailInput.value.trim()) {
      setError(emailInput, 'Email Address is required');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      setError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    // Phone Validation
    if (!phoneInput.value.trim()) {
      setError(phoneInput, 'Phone Number is required');
      isValid = false;
    } else if (!validatePhone(phoneInput.value.trim())) {
      setError(phoneInput, 'Please enter a valid 10-digit phone number');
      isValid = false;
    }

    // Subject Validation
    if (!subjectInput.value.trim()) {
      setError(subjectInput, 'Subject is required');
      isValid = false;
    }

    // Message Validation
    if (!messageInput.value.trim()) {
      setError(messageInput, 'Message is required');
      isValid = false;
    }

    if (isValid) {
      // Show success alert
      if (alertBanner) {
        alertBanner.className = 'form-alert success';
        alertBanner.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. Our farming team will get back to you within 24 hours.';
        alertBanner.style.display = 'flex';
      }

      showToast('Contact request submitted successfully!', 'success');
      form.reset();

      setTimeout(() => {
        if (alertBanner) alertBanner.style.display = 'none';
      }, 7000);
    }
  });

  function setError(input, message) {
    if (!input) return;
    input.classList.add('is-invalid');
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains('error-msg')) {
      errorEl.textContent = message;
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s+/g, ''));
  }
}

/* 2. Contact FAQ Accordion Handler */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
