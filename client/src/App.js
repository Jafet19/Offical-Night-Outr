import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Register from './Auth-Register/Register';
import Option from './OptionsSet/Option';
import './App.scss'
import Profile from './Account/Profile';
import Home from './Home';

function App() {
  const [user, setUser] = useState(null)
  const [needToRegister, setNeedToRegister] = useState(false)

  useEffect(() => {
    fetch('/me').then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function onLogin(user) {
    setUser(user);
  }

  function onRegister(value) {
    setNeedToRegister(value);
  }

  function onLogout() {
    setUser('');
  }

  
  if (!user) {
    return(
      <Register onLogin={onLogin} onCancel={onRegister} />
    )
  } else {
    return (
      <div className='App'>
        <div className='snow'></div>
          <Routes>
            <Route path='/' element={<Home setUser={setUser}/>} />
            <Route path='/Options' element={<Option/>}/>
            <Route path='/Profile' element={<Profile user={user} setUser={setUser}/>}/>
          </Routes>
      </div>
    );
  }
}
export default App;