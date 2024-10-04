import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm';
import Authenticate from './components/Authenticate';

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <>
      <SignUpForm token={token} setToken={setToken} setUsername={setUsername}/>

      <Authenticate token={token} setToken={setToken} username={username}/>
    </>
  )
}

export default App
