import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Estilos/Receitas.css';
import '../Estilos/Styles.css';


// Componente para o modal de Cadastro
const CadastrarModal = ({ onClose, onAdicionar }) => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  
  const handleAdicionar = () => {
    onAdicionar({ nome, valor }); //nome é o descricao no banco de dados
    onClose();
  };

  //modal - tela de cadastro
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastrar Receita</h2>
        <div className="modal-nome">
          <label>Nome: </label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />  
        </div>
        <div className='modal-valor'>
          <label>Valor: </label>
          <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} />
        </div>
        <div className='modal-button'>
          <button className = 'add-button-model' onClick={handleAdicionar}>Adicionar Receita</button>
          <button className='cancelar-button-model' onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

// Componente para o Dashboard principal
const DashboardReceita = () => {
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);
  const [receitas, setReceitas] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/receita  ').then((response) => {
      setReceitas(response.data);
    })
    .catch((erro) => {
      console.log('Erro:' + erro);
    });
  }, []);

  const handleMenuClick = (menuItem) => {
    if (menuItem === 'Receitas') {
      window.location.reload();
    } else if (menuItem === 'Gastos') {
      // Implemente a navegação para a tela de Gastos
    } else if (menuItem === 'Faturas') {
      // Implemente a navegação para a tela de Faturas
    } else if (menuItem === 'Categorias') {
      // Implemente a navegação para a tela de Categorias
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

  const handleAdicionarReceita = (dados) => {
    // Adicionar lógica para add receita no banco de dados
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
            Categoria
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
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {
              receitas.map(receita => (
                <tr key={receita.id}>
                  <td>{receita.id}</td>
                  <td>{receita.nome}</td>
                  <td>{receita.valor}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {isCadastrarModalOpen && (
        <CadastrarModal onClose={() => setIsCadastrarModalOpen(false)} onAdicionar={handleAdicionarReceita} />
      )}
    </div>
  );
};

export default DashboardReceita;
