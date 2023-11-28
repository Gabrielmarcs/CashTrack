import React, { useState } from 'react';
import SelectCategoria from '../Paginas/SelectCategoria';
import '../Estilos/Gastos.css';
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
const DashboardGasto = () => {
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);

  const handleMenuClick = (menuItem) => {
    if (menuItem === 'Receitas') {
      // Implemente a navegação para a tela de Receitas
    } else if (menuItem === 'Gastos') {
        window.location.reload();
    } else if (menuItem === 'Faturas') {
      // Implemente a navegação para a tela de Faturas
    } else if (menuItem === 'Sair') {
      // Implemente a lógica para ação de Sair
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

  const handleAdicionarGasto = (dados) => {
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
          <button className="detail-button" onClick={() => handleActionButtonClick('Detalhes')}>
            Detalhes
          </button>
        </div>
      </header>
      <SelectCategoria />

      <div className="dashboard-content">
        <div className="dashboard-menu">
          <div className="menu-item menu-receita" onClick={() => handleMenuClick('Receitas')}>
            Receita
          </div>
          <div className="menu-item menu-gasto" onClick={() => handleMenuClick('Gastos')}>
            Gasto
          </div>
          <div className="menu-item menu-fatura" onClick={() => handleMenuClick('Faturas')}>
            Fatura
          </div>
          <div className="menu-item menu-sair" onClick={() => handleMenuClick('Sair')}>
            Sair
          </div>
        </div>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Descricao</th>
              <th>Valor</th>
              <th>Fatura</th>
            </tr>
          </thead>
          <tbody>{/* Adicione os dados da tabela aqui */}</tbody>
          <tbody>{/* Adicione os dados da tabela aqui */}</tbody>
          <tbody>{/* Adicione os dados da tabela aqui */}</tbody>
        </table>
      </div>
      {isCadastrarModalOpen && (
        <CadastrarModal onClose={() => setIsCadastrarModalOpen(false)} onAdicionar={handleAdicionarGasto} />
      )}
    </div>
  );
};

export default DashboardGasto;