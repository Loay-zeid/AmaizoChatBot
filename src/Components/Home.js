import React from 'react';
import '../index.css';
import backgroundImage from '../assits/images/background.png'; 


const Home = ({ setPage }) => (
  <div
    className="flex justify-center items-center min-h-screen bg-black" >
    <div className="  text-center "style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <h1 className="text-7xl md:text-7xl text-white mb-4 w-full">AI-Powered</h1>
      <h1 className="text-7xl md:text-7xl text-white mb-4 w-full">Productivity.</h1>
      <p className="text-xl md:text-2xl w-full mx-auto text-white">
        AI-powered tools in one to supercharge your team productivity.
      </p>
      <p className="text-lg md:text-2xl w-full mx-auto text-white mb-8">
        With Taskade, all your work is in sync in one unified workspace.
      </p>
      <button
  className=" homeButton text-white p-4 w-48 h-12 rounded "
  onClick={() => setPage('signup')}
>
  Get Started
</button>
    </div>
  </div>
);

export default Home;