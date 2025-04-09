// Auth page functionality

document.addEventListener('DOMContentLoaded', function() {
  // Password visibility toggle
  const passwordToggles = document.querySelectorAll('.password-toggle');
  if (passwordToggles.length > 0) {
    passwordToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const passwordField = this.parentElement.querySelector('input');
        if (passwordField.type === 'password') {
          passwordField.type = 'text';
          this.querySelector('i').classList.remove('fa-eye');
          this.querySelector('i').classList.add('fa-eye-slash');
        } else {
          passwordField.type = 'password';
          this.querySelector('i').classList.remove('fa-eye-slash');
          this.querySelector('i').classList.add('fa-eye');
        }
      });
    });
  }

  // Password strength meter
  const passwordField = document.getElementById('password');
  const passwordStrength = document.querySelector('.password-strength');
  const meterBar = document.querySelector('.meter-bar');
  const requirements = document.querySelectorAll('.password-requirements li');

  if (passwordField && passwordStrength) {
    passwordField.addEventListener('focus', function() {
      passwordStrength.classList.add('active');
    });

    passwordField.addEventListener('input', function() {
      const password = this.value;
      
      // Update requirements
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasMinLength = password.length >= 8;
      
      // Update UI for each requirement
      requirements.forEach(requirement => {
        const reqType = requirement.getAttribute('data-requirement');
        
        let isMet = false;
        
        if (reqType === 'uppercase') isMet = hasUppercase;
        if (reqType === 'lowercase') isMet = hasLowercase;
        if (reqType === 'number') isMet = hasNumber;
        if (reqType === 'length') isMet = hasMinLength;
        
        if (isMet) {
          requirement.classList.add('valid');
        } else {
          requirement.classList.remove('valid');
        }
      });
      
      // Calculate password strength
      let strength = 0;
      if (hasUppercase) strength += 1;
      if (hasLowercase) strength += 1;
      if (hasNumber) strength += 1;
      if (hasMinLength) strength += 1;
      
      // Update strength meter
      meterBar.className = 'meter-bar';
      if (password.length === 0) {
        meterBar.style.width = '0';
      } else {
        if (strength === 1) {
          meterBar.classList.add('weak');
        } else if (strength === 2) {
          meterBar.classList.add('medium');
        } else if (strength === 3) {
          meterBar.classList.add('strong');
        } else if (strength === 4) {
          meterBar.classList.add('very-strong');
        }
      }
    });
    
    // If we click outside, hide the password strength meter
    document.addEventListener('click', function(e) {
      if (!passwordField.contains(e.target) && !passwordStrength.contains(e.target)) {
        passwordStrength.classList.remove('active');
      }
    });
  }
  
  // Form validation for password confirmation
  const signupForm = document.querySelector('.signup-page form');
  if (signupForm) {
    const confirmField = signupForm.querySelector('input[name="confirm_password"]');
    
    signupForm.addEventListener('submit', function(e) {
      if (passwordField.value !== confirmField.value) {
        e.preventDefault();
        
        // Show error message
        let errorDiv = signupForm.querySelector('.error-message');
        if (!errorDiv) {
          errorDiv = document.createElement('div');
          errorDiv.className = 'error-message';
          errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i><span>Passwords do not match!</span>';
          signupForm.prepend(errorDiv);
        } else {
          errorDiv.querySelector('span').textContent = 'Passwords do not match!';
        }
        
        // Highlight password fields
        confirmField.style.borderColor = '#ff4d4d';
        passwordField.style.borderColor = '#ff4d4d';
        
        // Shake animation for error feedback
        confirmField.parentElement.classList.add('shake');
        passwordField.parentElement.classList.add('shake');
        
        setTimeout(() => {
          confirmField.parentElement.classList.remove('shake');
          passwordField.parentElement.classList.remove('shake');
        }, 500);
      }
    });
    
    // Clear error highlighting when user starts typing again
    confirmField.addEventListener('input', function() {
      this.style.borderColor = '';
      passwordField.style.borderColor = '';
      
      const errorDiv = signupForm.querySelector('.error-message');
      if (errorDiv && errorDiv.querySelector('span').textContent === 'Passwords do not match!') {
        errorDiv.remove();
      }
    });
  }
  
  // Animated background shapes
  const shapes = document.querySelectorAll('.shape');
  
  if (shapes.length > 0) {
    // Add some randomness to the initial positions
    shapes.forEach(shape => {
      const randomX = Math.random() * 30 - 15;
      const randomY = Math.random() * 30 - 15;
      const randomDelay = Math.random() * 5;
      const randomDuration = 15 + Math.random() * 15;
      
      shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
      shape.style.animationDelay = `${randomDelay}s`;
      shape.style.animationDuration = `${randomDuration}s`;
    });
  }
  
  // Add shake animation for form validation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
      animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
  `;
  document.head.appendChild(style);
  
  // Social login buttons (mock functionality)
  const socialButtons = document.querySelectorAll('.social-btn');
  
  if (socialButtons.length > 0) {
    socialButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Add a spinner to show loading
        const originalContent = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        this.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
          // In a real application, this would redirect to OAuth provider
          window.location.href = '/'; // Redirect to home for demo purposes
        }, 1500);
      });
    });
  }
}); 