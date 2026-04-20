import React, { useState } from 'react';

const SignIn = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (validateEmail(email) && validatePassword(password)) {
      setPage('chat');
    } else {
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
      }
      if (!validatePassword(password)) {
        setPasswordError('Password must be at least 6 characters long');
      }
    }
  };

  return (
    <div className="signup-container flex justify-center items-center min-h-screen bg-black">
      <div className="registerCard p-8 rounded shadow-md w-full max-w-md flex flex-col items-center">
        
        <img
          className="amaizoLogo"
          alt="AMAIZO LOGO"
          src="./amaizoLogo.png"
        />

        <h2 className="text-2xl mb-6">Sign In</h2>
        <h4 className="mb-8">Create your free account</h4>

        <div className="flex flex-col w-full">
          <button className="regButton mb-2">Sign Up With Google</button>
          <button className="regButton mb-2">Sign Up With Apple</button>
          <button className="regButton mb-2">Skip For Now</button>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-2 flex flex-col">
            <input
              type="email"
              className="p-2 rounded-xl"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span className="text-red-500">{emailError}</span>}
          </div>

          <div className="mb-4 flex flex-col">
            <input
              type="password"
              className="p-2 rounded-xl"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <span className="text-red-500">{passwordError}</span>}
          </div>

          <button className="signUpButtom w-full text-white p-2 rounded">
            Sign In
          </button>

          {/* 🔥 FIXED HERE */}
          <p className="text-center mt-2">
            By signing up you agree to our{" "}
            <a href="/" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>
          </p>
        </form>

        <button onClick={() => setPage('signup')} className="text-white mt-4">
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;