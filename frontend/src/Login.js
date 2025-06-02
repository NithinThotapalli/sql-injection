import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [remember, setRemember] = useState(false);
  const [waveHover, setWaveHover] = useState(false);
  const [formHover, setFormHover] = useState(false);
  const usernameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!username.trim() || !password) {
      setMessage('Please enter username and password.');
      setLoading(false);
      setShake(true);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/insecure-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/dashboard');
      } else {
        setMessage(data.message || 'Invalid credentials');
        setShake(true);
        usernameRef.current.focus();
      }
    } catch {
      setMessage('Network error, please try again.');
      setShake(true);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'fadein 0.8s cubic-bezier(0.4,0,0.2,1)'
      }}
    >
      {/* Animated background color */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: formHover ? '#111' : '#fff',
          transition: 'background 0.5s cubic-bezier(0.4,0,0.2,1)'
        }}
        aria-hidden="true"
      />
      {/* Animated SVG Wave Background */}
      <svg
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100vw',
          height: '30vh',
          zIndex: 1,
          pointerEvents: 'auto',
          filter: formHover ? 'invert(1) hue-rotate(180deg)' : 'none',
          transition: 'filter 0.4s cubic-bezier(0.4,0,0.2,1)'
        }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        onMouseEnter={() => setWaveHover(true)}
        onMouseLeave={() => setWaveHover(false)}
      >
        <path
          id="wave"
          fill={waveHover ? "#808080" : "#000"}
          fillOpacity={waveHover ? "1" : "0.38"}
          d="
            M0,160 
            C360,240 1080,80 1440,160 
            L1440,320 
            L0,320 
            Z
          "
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z;
              M0,180 C400,100 1040,280 1440,180 L1440,320 L0,320 Z;
              M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z
            "
          />
        </path>
      </svg>
      
      {/* Minimalist welcome text */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div
        style={{
          position: 'absolute',
          top: 100,
          width: '100%',
          textAlign: 'center',
          zIndex: 2,
          color: formHover ? '#fff' : '#232526', // Change to white when background is black
          fontSize: 60,
          letterSpacing: 0.5,
          fontWeight: 1000,
          pointerEvents: 'auto',
          userSelect: 'none',
          fontFamily: "'Montserrat', sans-serif",
          transition: 'color 0.3s'
        }}
        className="sql-injection-title"
      >
        SQL Injection 
      </div>
      <style>
        {`
          .sql-injection-title {
            transition: color 0.3s;
          }
        `}
      </style>
      <div
        className="login-form-container"
        style={{
          position: 'relative',
          zIndex: 1,
          background: '#222',
          padding: 80,
          borderRadius: 10,
          width: 300,
          boxShadow: '0 4px 32px 0 rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid rgb(0, 0, 0)',
          animation: shake
            ? 'shake 0.5s'
            : 'slideupscale 0.8s cubic-bezier(0.4,0,0.2,1)',
          filter: formHover ? 'invert(1) hue-rotate(180deg)' : 'none',
          transition: 'filter 0.4s cubic-bezier(0.4,0,0.2,1)'
        }}
        onMouseEnter={() => setFormHover(true)}
        onMouseLeave={() => setFormHover(false)}
      >
        {/* Minimal lock icon */}
        <div style={{
          marginBottom: 18,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <rect x="9" y="17" width="20" height="14" rx="4" fill="#232526" stroke="#444" strokeWidth="2"/>
            <ellipse cx="19" cy="24" rx="2" ry="3" fill="#888"/>
            <rect x="13" y="11" width="12" height="8" rx="6" fill="none" stroke="#444" strokeWidth="2"/>
            <circle cx="19" cy="24" r="1" fill="#fff"/>
          </svg>
        </div>
        <h2 style={{
          color: '#fff',
          fontWeight: 500,
          marginBottom: 18,
          letterSpacing: 0.5,
          fontSize: 22
        }}>Login</h2>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Username"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              marginBottom: 12,
              padding: '10px 12px',
              borderRadius: 6,
              border: '1px solid #333',
              background: '#181818',
              color: '#fff',
              fontSize: 15,
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 6,
                border: '1px solid #333',
                background: '#181818',
                color: '#fff',
                fontSize: 15,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#888',
                fontSize: 18,
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Closed eye SVG (childish style)
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <ellipse cx="11" cy="11" rx="8" ry="5" stroke="#888" strokeWidth="2" fill="#222"/>
                  <line x1="5" y1="17" x2="17" y2="5" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="11" cy="11" r="2" fill="#888"/>
                </svg>
              ) : (
                // Open eye SVG (childish style)
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <ellipse cx="11" cy="11" rx="8" ry="5" stroke="#888" strokeWidth="2" fill="#222"/>
                  <circle cx="11" cy="11" r="2" fill="#888"/>
                  <circle cx="11" cy="11" r="1" fill="#fff"/>
                </svg>
              )}
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 18,
            fontSize: 14,
            color: '#bbb'
          }}>
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={() => setRemember(!remember)}
              style={{ marginRight: 7 }}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: 10,
              background: '#fff',
              color: '#181818',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 15,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{
          color: '#ff7675',
          marginTop: 16,
          minHeight: 22,
          textAlign: 'center',
          fontSize: 14
        }}>{message}</p>
      </div>
    </div>
  );
}

export default Login;
