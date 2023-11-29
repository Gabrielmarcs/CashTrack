import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Estilos/Faturas.css';
import '../Estilos/Styles.css';

// Componente para o modal de Cadastro
const CadastrarModal = ({ onClose, onAdicionar }) => {
  const [nome, setNome] = useState('');

  const handleAdicionar = () => {
    onAdicionar({ nome}); //id e contador é automatico, valor é associado com os gastos e inicia com 0 (eu acho)
    onClose();
  };

  //modal - tela de cadastro
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastrar Fatura</h2>
        <div className="modal-nome">
          <label>Nome: </label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />  
        </div>
        <div className='modal-button'>
          <button className = 'add-button-model' onClick={handleAdicionar}>Adicionar Fatura</button>
          <button className='cancelar-button-model' onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

// Componente para o Dashboard principal
const DashboardFatura = () => {
  const navigate = useNavigate(); // Use useNavigate para navegação
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);

  const handleMenuClick = (menuItem) => {
    if (menuItem === 'Receitas') {
      navigate('/dashboard/receitas');
    } else if (menuItem === 'Gastos') {
      navigate('/dashboard/gastos');
    } else if (menuItem === 'Faturas') {
      window.location.reload();
    } else if (menuItem === 'Categorias') {
      navigate('/dashboard/categorias');
    } else if (menuItem === 'Sair') {
      navigate('/login');
    }
  };

  const handleActionButtonClick = (action) => {
    if (action === 'Cadastrar') {
      // Abre o modal de cadastro
      setIsCadastrarModalOpen(true);
    }
    else {
      // Adiciona lógica para os outros botões
    }
  };

  const handleAdicionarFatura = (dados) => {
    // Adicionar lógica para add fatura no banco de dados
    // Fazer integraçao
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">____________________CashTrack____________________</h1>
        <div className="dashboard-actions">
          <button className="add-button" onClick={() => handleActionButtonClick('Cadastrar')}>
            Cadastrar
          </button>
          <button className="update-button" onClick={() => handleActionButtonClick('Alterar')}>
            Alterar
          </button>
          <button className="del-button" onClick={() => handleActionButtonClick('Excluir')}>
            Excluir
          </button>
        </div>
      </header>
      <div className="dashboard-content">
        <div className="dashboard-menu">
          <div className="menu-item menu-receita" onClick={() => handleMenuClick('Receitas')}>
            Receitas
          </div>
          <div className="menu-item menu-gasto" onClick={() => handleMenuClick('Gastos')}>
            Gastos
          </div>
          <div className="menu-item menu-fatura" onClick={() => handleMenuClick('Faturas')}>
            Faturas
          </div>
          <div className="menu-item menu-categoria" onClick={() => handleMenuClick('Categorias')}>
            Categorias
          </div>
          <div className="menu-item menu-sair" onClick={() => handleMenuClick('Sair')}>
            Sair
          </div>
        </div>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>nº de gastos associados </th>
              <th>Valor total</th>
            </tr>
          </thead>
          <tbody>{/* Adicione os dados da tabela aqui */}</tbody>
          <tbody>{/* Adicione os dados da tabela aqui */}</tbody>
          <tbody>{/* Adicione os dados da tabela aqui */}</tbody>
          <tbody>{/* Adicione os dados da tabela aqui */}</tbody>
        </table>
      </div>
      {isCadastrarModalOpen && (
        <CadastrarModal onClose={() => setIsCadastrarModalOpen(false)} onAdicionar={handleAdicionarFatura} />
      )}
    </div>
  );
};

export default DashboardFatura;