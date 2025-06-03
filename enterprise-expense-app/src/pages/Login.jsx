import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm();

  useEffect(() => {
    setFocus('email'); // ✅ auto-focus on first load
  }, [setFocus]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', data);
      const token = response.data.token;

      localStorage.setItem('token', token);

      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid email or password.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h2>LOGO <span className="highlight">COMPANY</span></h2>
      </div>
      <div className="login-right">
        <div className="login-card">
          <h2>Sign in</h2>
          <p className="sub-text">Sign in to continue</p>

          <form onSubmit={handleSubmit(onSubmit)}>
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

            <p className="forgot-link">
              <Link to="/forgot-password">Forgot your password?</Link>
            </p>

            <button type="submit" className="login-btn">Login</button>
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
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
