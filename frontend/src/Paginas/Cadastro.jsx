import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Estilos/Cadastro.css';
import axios from 'axios';
import { Link,Navigate,Redirect } from 'react-router-dom';

const Cadastro = () => {
  const navigate = useNavigate(); // Use useNavigate para navegação
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/usuarios/cadastrar', {
        nome: nome,
        email: email,
        senha: senha
      });
      setMensagem(response.data); // Mensagem de sucesso vinda do backend

      navigate('/login');

      // Limpar os campos
      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      setMensagem('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="container">
      <div className="leftContainer">
        <div>
          <h1 className="title">$$CashTrack$$</h1>
        </div>
      </div>

      <div className="rightContainer">
        <form onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="inputField"
          />
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
            className="cadastroButton"
          >
            Cadastrar
          </button>
          <Link to="/login" className="link">Já é cadastrado? Faça login aqui</Link>
        </form>
        <p>{mensagem}</p>
      </div>
    </div>
  );
};

export default Cadastro;
