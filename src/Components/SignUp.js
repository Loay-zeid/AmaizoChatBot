import React, { useState } from 'react';
const SignUp = ({ setPage }) => { 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [emailError, setEmailError] = useState(''); 
  const [passwordError, setPasswordError] = useState(''); 
  const [name, setname] = useState(''); 
  const [confirmpassword, setconfirmpassword] = useState(''); 
  const [confirmpassworderror, setconfirmpassworderror] = useState(''); 
 
 
 const validateEmail = (email) => { 
    // Regular expression for email validation 
    const re = /\S+@\S+\.\S+/; 
    return re.test(email); 
  }; 
 
  const validatePassword = (password) => { 
    // Check if password length is at least 6 characters 
    return password.length >= 6; 
  }; 
  const handleEmailChange = (e) => { 
    setEmail(e.target.value); 
    // Reset email error when email format is valid 
    setEmailError(validateEmail(e.target.value) ? '' : 'Please enter a valid email address'); 
  }; 
 
  const handlePasswordChange = (e) => { 
    setPassword(e.target.value); 
    // Update password error dynamically 
    setPasswordError(e.target.value.length < 6 ? 'Password must be at least 6 characters long' : ''); 
  }; 
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    setEmailError(''); 
    setPasswordError(''); 
 
    // Dummy authentication 
    if ((email && password)&& (password===confirmpassword)&&(validateEmail(email) && validatePassword(password))) { 
      setPage('chat'); 
    } 
    else 
    { 
      if (!validateEmail(email)) { 
        setEmailError('Please enter a valid email address'); 
      } 
      if (!validatePassword(password)) { 
        setPasswordError('Password must be at least 6 characters long'); 
      } 
      setconfirmpassworderror("Passwords Dont Match!"); 
    } 
     
  }; 
  return ( 
    <div className="signup-container flex justify-center items-center min-h-screen bg-black"> 
      <div className="registerCard p-8 rounded shadow-md w-full max-w-md registerCard p-8 rounded shadow-md w-full max-w-md flex flex-col items-center"> 
        <img 
        className='amaizoLogo text-center flex align-item-center'  
        alt='AMAIZO LOGO' 
        src='./amaizoLogo.png'> 
        </img> 
        <h2 className="text-center text-2xl mb-6">Sign Up</h2> 
        <h4 className='text-center mb-2'>Create your free account</h4> 
 
        <div className="flex flex-col"> 
          <button className=' regButton text-center w-full mb-1'>Sign Up With Google</button> 
          <button className=' regButton text-center w-full mb-1'>Sign Up With Apple</button> 
        </div> 
 
        <form onSubmit={handleSubmit}> 
          <div className="mb-1"> 
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded mt-1" 
              value={name} 
              placeholder='Name' 
              onChange={(e) => setname(e.target.value)} 
              required 
            /> 
          </div> 
          <div className="mb-1 flex flex-col"> 
               <input 
                type="email" 
                className="w-full p-2 border border-gray-300 rounded-xl" 
                value={email} 
                placeholder='Email' 
                onChange={handleEmailChange} 
                required 
              /> 
              {emailError && <span className='text-red-500 text-sm mt-1'>{emailError}</span>} 
          </div> 
          <div className="mb-4"> 
          <div className='flex flex-col'> 
              <input 
                type="password" 
                placeholder='Password' 
                className="w-full p-2 border border-gray-300 rounded-xl" 
                value={password} 
                onChange={handlePasswordChange} 
                required 
              /> 
              {passwordError && <span className='text-red-500 text-sm mt-1'>{passwordError}</span>} 
            </div> 
          </div> 
<div className="mb-4"> 
            <div className='flex flex-col'> 
              <input

type="password" 
              placeholder=' confirm password' 
              className="w-full p-2 border border-gray-300 rounded-xl " 
              value={confirmpassword} 
              onChange={(e) => setconfirmpassword(e.target.value)} 
              required 
            /> 
            {confirmpassworderror && <span className='text-red-500 text-sm mt-1'>{confirmpassworderror}</span>}</div> 
             
          </div> 
 
          <button type="submit" className="signUpButtom w-[415px] text-white p-2 rounded">Create New Account</button> 
          <p className=' text-center terms mt-1 mr-5'>By signing up you agree to our <a>Terms of Service</a></p> 
        </form> 
        <div className="mt-4 text-center"> 
        </div> 
 
     </div>   <button onClick={() => setPage('signin')} className="text-white">Already Have An Account? Sign in</button> 
      </div> 
  ); 
}; 
 
export default SignUp;