/* ==========================================================================
   STACKLY ORGANIC FARMING - Authentication Script (auth.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggle();
  initPasswordStrength();
  initSignupForm();
  initLoginForm();
  initQuickFill();
});

/* 1. Password Show/Hide Toggle */
function initPasswordToggle() {
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input && (input.type === 'password' || input.type === 'text')) {
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        btn.className = `fa-solid ${isPass ? 'fa-eye-slash' : 'fa-eye'} password-toggle-btn`;
      }
    });
  });
}

/* 2. Password Strength Meter */
function initPasswordStrength() {
  const passInput = document.getElementById('signup-password');
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');

  if (!passInput || !strengthBar || !strengthText) return;

  passInput.addEventListener('input', () => {
    const val = passInput.value;
    const score = calculatePasswordStrength(val);

    strengthBar.className = 'strength-bar';
    
    if (val.length === 0) {
      strengthBar.style.width = '0%';
      strengthText.textContent = '';
    } else if (score < 3) {
      strengthBar.classList.add('weak');
      strengthText.textContent = 'Weak Password';
      strengthText.style.color = '#ef4444';
    } else if (score < 5) {
      strengthBar.classList.add('medium');
      strengthText.textContent = 'Medium Strength';
      strengthText.style.color = '#f59e0b';
    } else {
      strengthBar.classList.add('strong');
      strengthText.textContent = 'Strong Organic Password!';
      strengthText.style.color = '#10b981';
    }
  });
}

function calculatePasswordStrength(pass) {
  let score = 0;
  if (pass.length >= 6) score += 1;
  if (pass.length >= 10) score += 1;
  if (/[A-Z]/.test(pass)) score += 1;
  if (/[0-9]/.test(pass)) score += 1;
  if (/[^A-Za-z0-9]/.test(pass)) score += 1;
  return score;
}

/* 3. Signup Form Validation & localStorage Handler */
function initSignupForm() {
  const signupForm = document.getElementById('signup-form');
  if (!signupForm) return;

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPass = document.getElementById('signup-confirm-password').value;
    const userType = document.querySelector('input[name="user-type"]:checked')?.value || 'Farmer';
    const terms = document.getElementById('terms-checkbox').checked;

    let isValid = true;

    // Validate inputs
    if (!fullName) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    if (!phone) {
      showToast('Please enter your phone number', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }
    if (password !== confirmPass) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    if (!terms) {
      showToast('You must agree to the Terms & Conditions', 'error');
      return;
    }

    // Save demonstration data to localStorage
    const userData = { fullName, email, phone, userType, createdAt: new Date().toISOString() };
    localStorage.setItem('stackly_demo_user', JSON.stringify(userData));

    showToast('Account created successfully! Redirecting to login...', 'success');

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  });
}

/* 4. Login Form Handler with Role-Based Routing (User / Admin) */
function initLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const roleRadio = document.querySelector('input[name="login-role"]:checked');

    if (!email) {
      showToast('Please enter an email', 'error');
      return;
    }

    if (!password) {
      showToast('Please enter your password', 'error');
      return;
    }

    const role = roleRadio ? roleRadio.value : 'user';

    showToast(`Authentication successful as ${role.toUpperCase()}! Redirecting...`, 'success');

    // Routing execution
    setTimeout(() => {
      if (role === 'admin') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'user.html';
      }
    }, 1200);
  });
}

/* 5. Quick Fill Demo Credentials for User testing */
function initQuickFill() {
  const fillUserBtn = document.getElementById('fill-user-demo');
  const fillAdminBtn = document.getElementById('fill-admin-demo');

  if (fillUserBtn) {
    fillUserBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      const userRadio = document.getElementById('role-user');

      if (emailInput) emailInput.value = 'farmer@stackly.org';
      if (passInput) passInput.value = 'OrganicFarmer2026!';
      if (userRadio) userRadio.checked = true;

      showToast('Filled Demo Farmer Credentials!', 'success');
    });
  }

  if (fillAdminBtn) {
    fillAdminBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      const adminRadio = document.getElementById('role-admin');

      if (emailInput) emailInput.value = 'admin@stackly.org';
      if (passInput) passInput.value = 'AdminSecret2026!';
      if (adminRadio) adminRadio.checked = true;

      showToast('Filled Demo Admin Credentials!', 'success');
    });
  }
}
