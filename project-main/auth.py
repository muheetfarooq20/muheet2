from flask import Blueprint, render_template, request, redirect, url_for, flash, session
import os
import secrets
import logging
import time
from functools import wraps

# Create a Blueprint for authentication routes
auth = Blueprint('auth', __name__, url_prefix='/auth')

# Mock storage for demo purposes (in a real app, this would be a database)
mock_users = {
    'admin@pridictx.com': {
        'first_name': 'Admin',
        'last_name': 'User',
        'password': 'Secure123',  # In a real app, this would be hashed
        'created_at': time.time()
    }
}

mock_reset_tokens = {}  # token -> email mapping

# Helper function to check if user is logged in
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_email' not in session:
            return redirect(url_for('auth.login'))
        return f(*args, **kwargs)
    return decorated_function

@auth.route('/login', methods=['GET', 'POST'])
def login():
    """Handle user login"""
    error = None
    
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        remember = 'remember' in request.form
        
        # Accept any email and password for testing purposes
        if email and password:
            # Set session variables
            session['user_email'] = email
            # Extract name from email or use a default
            name_part = email.split('@')[0]
            user_name = name_part.replace('.', ' ').title()
            session['user_name'] = user_name
            
            # If remember me is checked, set a longer session expiry
            if remember:
                session.permanent = True
            
            logging.info(f"User {email} logged in successfully")
            return redirect(url_for('index'))
        else:
            error = "Email and password are required"
            logging.warning(f"Failed login attempt for {email}")
    
    return render_template('auth/login.html', error=error)

@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    """Handle user registration"""
    error = None
    
    if request.method == 'POST':
        # Get form data
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        
        # Simplified validation for testing - only require basic fields
        if not all([first_name, last_name, email, password]):
            error = "First name, last name, email and password are required"
        else:
            # Set session variables to log the user in
            session['user_email'] = email
            session['user_name'] = f"{first_name} {last_name}"
            
            logging.info(f"New user {email} created and logged in")
            return redirect(url_for('index'))
    
    return render_template('auth/signup.html', error=error)

@auth.route('/logout')
def logout():
    """Handle user logout"""
    session.pop('user_email', None)
    session.pop('user_name', None)
    return redirect(url_for('index'))

@auth.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    """Handle forgot password requests"""
    error = None
    success = None
    
    if request.method == 'POST':
        email = request.form.get('email')
        
        # Check if email exists
        if email in mock_users:
            # Generate a secure token
            token = secrets.token_urlsafe(32)
            
            # Store token with email association (would be time-limited in a real app)
            mock_reset_tokens[token] = {
                'email': email,
                'expires_at': time.time() + 3600  # 1 hour expiry
            }
            
            # In a real app, send an email with the reset link
            reset_link = url_for('auth.reset_password', token=token, _external=True)
            
            logging.info(f"Password reset link generated for {email}: {reset_link}")
            
            # For demo purposes, just show a success message
            success = f"A password reset link has been sent to {email}"
        else:
            # Don't reveal if email exists for security
            success = "If an account exists with this email, a password reset link will be sent"
    
    return render_template('auth/forgot_password.html', error=error, success=success)

@auth.route('/reset-password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    """Handle password reset with token"""
    error = None
    
    # Validate token
    if token not in mock_reset_tokens:
        return redirect(url_for('auth.forgot_password'))
    
    token_data = mock_reset_tokens[token]
    
    # Check token expiry
    if token_data['expires_at'] < time.time():
        mock_reset_tokens.pop(token)
        return render_template('auth/forgot_password.html', error="Password reset link has expired")
    
    if request.method == 'POST':
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        
        # Validate passwords
        if not password or not confirm_password:
            error = "Both fields are required"
        elif password != confirm_password:
            error = "Passwords do not match"
        else:
            # Update the user's password
            email = token_data['email']
            mock_users[email]['password'] = password
            
            # Remove used token
            mock_reset_tokens.pop(token)
            
            logging.info(f"Password reset successful for {email}")
            
            # Redirect to login with success message
            return redirect(url_for('auth.login'))
    
    return render_template('auth/reset_password.html', token=token, error=error)

# Profile page - example of protected route
@auth.route('/profile')
@login_required
def profile():
    """User profile page"""
    user_email = session.get('user_email')
    user_data = mock_users.get(user_email, {})
    
    return f"<h1>Profile Page</h1><p>Hello, {user_data.get('first_name')} {user_data.get('last_name')}!</p><p>Your email: {user_email}</p>" 