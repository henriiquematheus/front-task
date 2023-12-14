//src/pages/register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users', {
        name: name,
        email: email,
        password: password
      });
      const { user, token } = response.data;
      // Aqui você pode armazenar o token em localStorage ou sessionStorage para usá-lo em requisições subsequentes
      // Exemplo: localStorage.setItem('token', token);
      onRegister(token, user); // Passa o token e o usuário para o componente pai ou alguma função de manipulação
    } catch (error) {
      console.error('Erro ao se cadastrar:', error);
      // Lógica para exibir mensagem de erro, se necessário
    }
  }

  return (
    <div className="registerContainer">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Registrar</button>
      </form>
      <button className="backButton" onClick={() => onRegister(false)}>
        Voltar
      </button>
    </div>
  );
}

export default Register;
