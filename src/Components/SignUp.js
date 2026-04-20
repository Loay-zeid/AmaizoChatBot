import React, { useState } from 'react';

const SignUp = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      validateEmail(email) &&
      validatePassword(password) &&
      password === confirmPassword
    ) {
      setPage('chat');
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

        <h2 className="text-2xl mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            className="w-full p-2 rounded mb-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="w-full p-2 rounded mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-2 rounded mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-2 rounded mb-4"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="signUpButtom w-full text-white p-2 rounded">
            Create Account
          </button>

          {/* 🔥 FIXED HERE */}
          <p className="text-center mt-2">
            By signing up you agree to our{" "}
            <a href="/" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>
          </p>
        </form>

        <button onClick={() => setPage('signin')} className="text-white mt-4">
          Already Have An Account? Sign in
        </button>
      </div>
    </div>
  );
};

export default SignUp;