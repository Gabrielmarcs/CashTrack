import React, { useState } from 'react';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Adicione a lógica para autenticar o usuário aqui
    console.log(email, senha);
  };

  return (
    <div className="container">
      <div className="leftContainer">
        <div>
          <h1 className="title">$$CashTrack$$</h1>
        </div>
      </div>
      
      <div className="rightContainer">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputField"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="inputField"
        />
        <button
          onClick={handleLogin}
          className="loginButton"
        >
          Login
        </button>
   
      </div>
    </div>
  );
};

export default Login;











