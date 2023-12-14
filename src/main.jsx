import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/register'; // Importando o componente de registro
import './styles/global.css';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  function handleLogin(token) {
    setIsLoggedIn(true);
    setIsRegistering(false);
  }

  function handleToggleRegister() {
    setIsRegistering(!isRegistering);
  }

  return (
    <React.StrictMode>
      {!isLoggedIn && !isRegistering ? (
        <Login onLogin={handleLogin} />
      ) : isRegistering ? (
        <Register onRegister={() => setIsRegistering(false)} />
      ) : (
        <App />
      )}
      {!isLoggedIn && (
        <p className="registerLink" onClick={handleToggleRegister}>
          Não tem uma conta? Cadastre-se aqui.
        </p>
      )}
    </React.StrictMode>
  );
}

const root = createRoot(document.getElementById('root')); // Utilizando createRoot
root.render(<Main />);
//src/main.jsx
