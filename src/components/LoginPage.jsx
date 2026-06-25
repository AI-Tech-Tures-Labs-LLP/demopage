import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [emailReadOnly, setEmailReadOnly] = useState(true);
  const [passwordReadOnly, setPasswordReadOnly] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEmailChange = (val) => {
    setEmail(val);
    if (fieldErrors.email) {
      setFieldErrors(prev => ({ ...prev, email: '' }));
    }
    setError('');
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
    if (fieldErrors.password) {
      setFieldErrors(prev => ({ ...prev, password: '' }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    // Client-side validation
    const newFieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newFieldErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newFieldErrors.email = 'Invalid email format';
    }

    if (!password) {
      newFieldErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newFieldErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setLoading(false);
      return;
    }

    try {
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000/api/auth/login'
        : '/api/auth/login';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        if (data.token) {
          sessionStorage.setItem('stacklogix_token', data.token);
          if (data.user) {
            sessionStorage.setItem('stacklogix_user', JSON.stringify(data.user));
          }
        }
        onLogin();
      } else {
        // Error responses
        if (data.errors && Array.isArray(data.errors)) {
          const apiFieldErrors = {};
          data.errors.forEach(err => {
            apiFieldErrors[err.field] = err.message;
          });
          setFieldErrors(apiFieldErrors);
        } else if (data.message) {
          setError(data.message);
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      }
    } catch (err) {
      console.error('Login request error:', err);
      setError('Cannot connect to login server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#f5f5f7',
      fontFamily: 'var(--font-family)'
    }}>
      {/* Left Panel - App Showcase (Full Bleed Cover) */}
      <div style={{
        flex: '1.2',
        display: windowWidth < 1024 ? 'none' : 'block',
        height: '100%',
        position: 'relative',
        backgroundColor: '#000000'
      }}>
        <img 
          src="/stack_demo_final.png" 
          alt="StackLogix Platform Preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        {/* Subtle dark overlay for premium branding integration */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Right Panel - Centered Premium Apple-like Card */}
      <div style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)', // Soft Apple background gradient
        height: '100%',
        padding: '2rem',
        boxSizing: 'border-box',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Glowing orange mesh in background of right side for warmth */}
        <div style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(232, 149, 40, 0.08) 0%, rgba(255,255,255,0) 70%)',
          top: '10%',
          left: '10%',
          filter: 'blur(50px)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '520px',
            padding: windowWidth < 768 ? '3rem 2rem' : '4.5rem 4rem',
            background: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRadius: '32px',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.01)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box'
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #f8d57c, var(--bubble-border))',
              padding: '10px',
              borderRadius: '16px',
              boxShadow: '0 8px 16px rgba(232, 149, 40, 0.2)'
            }}>
              <Layers size={28} color="#ffffff" />
            </div>
            <span style={{ 
              fontSize: '1.8rem', 
              fontWeight: 800, 
              color: 'var(--text-color)',
              letterSpacing: '-0.02em'
            }}>
              StackLogix DEMO
            </span>
          </div>

          <h1 style={{ 
            fontSize: '1.6rem', 
            fontWeight: 700, 
            color: 'var(--text-color)', 
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
            textAlign: 'center'
          }}>
            Welcome Back
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            color: '#666', 
            marginBottom: '2.5rem',
            textAlign: 'center'
          }}>
            Sign in to access your enterprise dashboard
          </p>

          {/* Generic Server Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#DC2626',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.05)'
                }}>
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} autoComplete="on" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}>
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="username"
                  readOnly={emailReadOnly}
                  style={{
                    width: '100%',
                    padding: '18px 16px 18px 46px',
                    borderRadius: '16px',
                    border: '1px solid rgba(0,0,0,0.12)',
                    background: 'rgba(255, 255, 255, 0.85)',
                    fontSize: '1.05rem',
                    color: 'var(--text-color)',
                    outline: 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxSizing: 'border-box',
                    fontWeight: 500
                  }}
                  onFocus={(e) => {
                    setEmailReadOnly(false);
                    e.target.style.background = '#ffffff';
                    e.target.style.border = '1px solid var(--bubble-border)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(232, 149, 40, 0.15)';
                  }}
                  onBlur={(e) => {
                    if (!email) setEmailReadOnly(true);
                    e.target.style.background = 'rgba(255, 255, 255, 0.85)';
                    e.target.style.border = '1px solid rgba(0,0,0,0.12)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <AnimatePresence>
                {fieldErrors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    style={{
                      color: '#EF4444',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      paddingLeft: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <AlertCircle size={14} style={{ flexShrink: 0 }} />
                    <span>{fieldErrors.email}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Password Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}>
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  readOnly={passwordReadOnly}
                  style={{
                    width: '100%',
                    padding: '18px 48px 18px 46px',
                    borderRadius: '16px',
                    border: '1px solid rgba(0,0,0,0.12)',
                    background: 'rgba(255, 255, 255, 0.85)',
                    fontSize: '1.05rem',
                    color: 'var(--text-color)',
                    outline: 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxSizing: 'border-box',
                    fontWeight: 500
                  }}
                  onFocus={(e) => {
                    setPasswordReadOnly(false);
                    e.target.style.background = '#ffffff';
                    e.target.style.border = '1px solid var(--bubble-border)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(232, 149, 40, 0.15)';
                  }}
                  onBlur={(e) => {
                    if (!password) setPasswordReadOnly(true);
                    e.target.style.background = 'rgba(255, 255, 255, 0.85)';
                    e.target.style.border = '1px solid rgba(0,0,0,0.12)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9CA3AF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    outline: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#e89528'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <AnimatePresence>
                {fieldErrors.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    style={{
                      color: '#EF4444',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      paddingLeft: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <AlertCircle size={14} style={{ flexShrink: 0 }} />
                    <span>{fieldErrors.password}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.25rem' }}>
              <a href="#" style={{ 
                fontSize: '0.85rem', 
                color: 'var(--accent-gold)', 
                textDecoration: 'none', 
                fontWeight: 600,
                transition: 'opacity 0.2s',
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.8'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              style={{
                marginTop: '1.5rem',
                width: '100%',
                padding: '18px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #f8d57c, var(--bubble-border))',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 700,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 10px 24px rgba(232, 149, 40, 0.3)',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ width: '22px', height: '22px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}
                />
              ) : (
                <>
                  Sign In <ArrowRight size={20} strokeWidth={2.5} />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
