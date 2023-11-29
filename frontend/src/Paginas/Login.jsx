import React, { useState } from 'react';
import '../Estilos/Login.css';
import axios from 'axios';
import { Link,Navigate,Redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/usuarios/login', {
        email: email,
        senha: senha
      });
      setMensagem(response.data); // Mensagem de sucesso vinda do backend após o login
      setRedirect(true);
    } catch (error) {
      setMensagem('Credenciais inválidas');
    }
  };
  if (redirect) {
    return <Navigate to="/receita" />;
  }

  return (
    <div className="container">
      <div className="leftContainer">
        <div>
          <h1 className="title">$$CashTrack$$</h1>
        </div>
      </div>
      
      <div className="rightContainer">
        <form onSubmit={handleLogin}>
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
            type="submit"
            className="loginButton"
          >
            Login
          </button>

          <Link to="/cadastro" className="link">Cadastre-se</Link>

        </form>
        <p>{mensagem}</p>
      </div>
    </div>
  );
};

export default Login;