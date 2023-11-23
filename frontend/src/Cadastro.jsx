import React, { useState } from 'react';
import './Cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();
    // Adicione a lógica para cadastrar o usuário aqui
    console.log(nome, email, senha);
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
          onClick={handleCadastro}
          className="cadastroButton"
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
