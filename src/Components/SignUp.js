import React, { useState } from 'react';

const SignUp = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validateName = (name) => name.trim().length >= 2;

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (touched.name) {
      setErrors({ ...errors, name: value && !validateName(value) ? 'Name must be at least 2 characters' : '' });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setErrors({ ...errors, email: value && !validateEmail(value) ? 'Invalid email address' : '' });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setErrors({ ...errors, password: value && !validatePassword(value) ? 'Password must be at least 6 characters' : '' });
    }
    if (touched.confirmPassword && confirmPassword && value !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      setErrors({ ...errors, confirmPassword: value && value !== password ? 'Passwords do not match' : '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateName(name)) newErrors.name = 'Name must be at least 2 characters';
    if (!validateEmail(email)) newErrors.email = 'Please enter a valid email address';
    if (!validatePassword(password)) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    if (Object.keys(newErrors).length === 0) {
      setPage('chat');
    }
  };

  return (
    <div className="signup-container flex justify-center items-center h-screen bg-black overflow-hidden">
      <div className="registerCard p-6 rounded shadow-md" style={{ width: '400px', boxSizing: 'border-box' }}>

        <div className="flex flex-col items-center mb-4">
          <img
            className="amaizoLogo mb-4"
            alt="AMAIZO LOGO"
            src="./amaizoLogo.png"
            style={{ height: '60px' }}
          />
          <h2 className="text-xl font-semibold text-white mb-1">Sign Up</h2>
          <p className="text-gray-400 text-xs mb-6">Create your free account</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-3">
            <label className="text-white text-xs font-medium mb-1 block">Name</label>
            <input
              type="text"
              className="w-full px-2 py-1.5 rounded-lg bg-gray-900 text-white text-sm border border-gray-700 focus:border-selectedOrange focus:outline-none transition"
              placeholder="Your Name"
              value={name}
              onChange={handleNameChange}
              onBlur={() => setTouched({ ...touched, name: true })}
            />
            {touched.name && errors.name && <span className="text-red-500 text-xs mt-0.5 block">{errors.name}</span>}
          </div>

          <div className="mb-3">
            <label className="text-white text-xs font-medium mb-1 block">Email</label>
            <input
              type="email"
              className="w-full px-2 py-1.5 rounded-lg bg-gray-900 text-white text-sm border border-gray-700 focus:border-selectedOrange focus:outline-none transition"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => setTouched({ ...touched, email: true })}
            />
            {touched.email && errors.email && <span className="text-red-500 text-xs mt-0.5 block">{errors.email}</span>}
          </div>

          <div className="mb-3">
            <label className="text-white text-xs font-medium mb-1 block">Password</label>
            <input
              type="password"
              className="w-full px-2 py-1.5 rounded-lg bg-gray-900 text-white text-sm border border-gray-700 focus:border-selectedOrange focus:outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => setTouched({ ...touched, password: true })}
            />
            {touched.password && errors.password && <span className="text-red-500 text-xs mt-0.5 block">{errors.password}</span>}
          </div>

          <div className="mb-4">
            <label className="text-white text-xs font-medium mb-1 block">Confirm Password</label>
            <input
              type="password"
              className="w-full px-2 py-1.5 rounded-lg bg-gray-900 text-white text-sm border border-gray-700 focus:border-selectedOrange focus:outline-none transition"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={() => setTouched({ ...touched, confirmPassword: true })}
            />
            {touched.confirmPassword && errors.confirmPassword && <span className="text-red-500 text-xs mt-0.5 block">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="signUpButtom text-white p-2 rounded-lg font-semibold text-sm w-full">
            Create Account
          </button>
        </form>

        {/* ✅ was <a href="#"> — replaced with button */}
        <p className="text-center text-gray-400 text-xs mt-3 mb-3">
          By signing up you agree to our{" "}
          <button
            type="button"
            className="text-selectedOrange hover:underline bg-transparent border-none p-0 cursor-pointer text-xs"
          >
            Terms of Service
          </button>
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => setPage('signin')}
            className="text-selectedOrange text-xs font-medium hover:underline"
          >
            Already have an account? <span className="font-semibold">Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
