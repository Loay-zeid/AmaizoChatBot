import React, { useState } from 'react';

const SignIn = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setEmailError(value && !validateEmail(value) ? 'Invalid email address' : '');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setPasswordError(value && !validatePassword(value) ? 'Password must be at least 6 characters' : '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setTouched({ ...touched, email: true });
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      setTouched({ ...touched, password: true });
      return;
    }

    setPage('chat');
  };

  return (
    <div className="signup-container flex justify-center items-center h-screen bg-black overflow-hidden">
      <div className="registerCard p-6 rounded shadow-md" style={{ width: '400px' }}>
        
        <div className="flex flex-col items-center mb-6">
          <img
            className="amaizoLogo mb-4"
            alt="AMAIZO LOGO"
            src="./amaizoLogo.png"
            style={{ height: '60px' }}
          />

          <h2 className="text-xl font-semibold text-white mb-1">Sign In</h2>
          <p className="text-gray-400 text-xs mb-6">Access your account</p>
        </div>
        
        <div className="flex flex-col gap-2 mb-4">
          <button className="regButton text-sm py-2 px-3 ">Sign In With Google</button>
          <button className="regButton text-sm py-2 px-3">Sign In With Apple</button>
        </div>

        <div className="w-full h-px bg-gray-700 mb-4"></div>

        <form onSubmit={handleSubmit} className="w-full" style={{ boxSizing: 'border-box' }}>
          <div className="mb-3">
            <label className="text-white text-xs font-medium mb-1 block">Email</label>
            <input
              type="email"
              className="w-full px-2 py-1.5 rounded-lg bg-gray-900 text-white text-sm border border-gray-700 focus:border-selectedOrange focus:outline-none transition"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => setTouched({ ...touched, email: true })}
              placeholder="you@example.com"
              style={{ boxSizing: 'border-box' }}
            />
            {touched.email && emailError && <span className="text-red-500 text-xs mt-0.5 block">{emailError}</span>}
          </div>

          <div className="mb-3">
            <label className="text-white text-xs font-medium mb-1 block">Password</label>
            <input
              type="password"
              className="w-full px-2 py-1.5 rounded-lg bg-gray-900 text-white text-sm border border-gray-700 focus:border-selectedOrange focus:outline-none transition"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => setTouched({ ...touched, password: true })}
              placeholder="••••••••"
              style={{ boxSizing: 'border-box' }}
            />
            {touched.password && passwordError && <span className="text-red-500 text-xs mt-0.5 block">{passwordError}</span>}
          </div>

          <a href="#" onClick={(e) => e.preventDefault()} className="text-selectedOrange text-xs mb-3 block hover:underline">
            Forgot password?
          </a>

          <div className="flex justify-center mb-3">
            <button type="submit" className="signUpButtom text-white p-2 rounded-lg font-semibold text-sm px-6">
              Sign In
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 text-xs mb-3">
          By signing in you agree to our{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-selectedOrange hover:underline">
            Terms of Service
          </a>
        </p>

        <button onClick={() => setPage('signup')} className="text-selectedOrange text-xs font-medium hover:underline">
          Don't have an account? <span className="font-semibold">Sign Up</span>
        </button>
      </div>
    </div>
  );
};

export default SignIn;