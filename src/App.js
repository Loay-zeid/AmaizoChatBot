// src/App.js
import React, { useState } from 'react';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Chat from './Components/Chat';

const App = () => {
  const [page, setPage] = useState('home');

  return (
    <div className="App">
      {page === 'home' && <Home setPage={setPage} />}
      {page === 'signin' && <SignIn setPage={setPage} />}
      {page === 'signup' && <SignUp setPage={setPage} />}
      {page === 'chat' && <Chat setPage={setPage} />}
    </div>
  );
};

export default App;
