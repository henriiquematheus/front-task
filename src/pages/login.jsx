import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/login', {
        email: email,
        password: password
      });
      const { token } = response.data;

      // Salva o token no localStorage
      localStorage.setItem('token', token);

      // Chama a função de login passando o token
      onLogin(token);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Senha incorreta. Por favor, tente novamente.');
      } else {
        setErrorMessage('Erro ao fazer login. Por favor, tente novamente.');
        console.error('Erro ao fazer login:', error);
      }
    }
  }

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Entrar</button>
      </form>
      {errorMessage && (
        <p className="errorMessage">{errorMessage}</p>
      )}
    </div>
  );
}

export default Login;
