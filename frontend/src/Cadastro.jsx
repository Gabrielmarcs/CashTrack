import React, { useState } from 'react';
import './Cadastro.css';
import axios from 'axios';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/usuarios/cadastrar', {
        nome: nome,
        email: email,
        senha: senha
      });
      setMensagem(response.data); // Mensagem de sucesso vinda do backend
      // Limpar os campos após o cadastro bem-sucedido (opcional)
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
        </form>
        <p>{mensagem}</p>
      </div>
    </div>
  );
};

export default Cadastro;
