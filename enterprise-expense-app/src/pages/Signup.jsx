import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './signup.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const nameRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  // Auto-focus using react-hook-form
  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const onSubmit = async (data) => {
    try {
      // Replace with your backend endpoint
      await axios.post('http://localhost:8080/api/auth/Signup', data);
      alert('Signup successful!');
      navigate('/');
    } catch (error) {
      alert('Signup failed. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <h2>LOGO <span className="highlight">COMPANY</span></h2>
      </div>
      <div className="signup-right">
        <div className="signup-card">
          <h2>Sign up</h2>
          <p className="sub-text">Sign up to continue</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format'
                }
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}

            <button type="submit" className="signup-btn">Sign up</button>
          </form>

          <div className="social-login">
            <p>ACCESS QUICKLY</p>
            <div className="social-buttons">
              <button>Google</button>
              <button>LinkedIn</button>
              <button>SSO</button>
            </div>
          </div>

          <p className="footer-text">
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;