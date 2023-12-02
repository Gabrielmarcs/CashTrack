import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Estilos/Styles.css';
import axios from 'axios';

// Componente para o modal de Cadastro
const CadastrarModal = ({ onClose, onAdicionar }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleAdicionar = () => {
    onAdicionar({ nome, descricao}); //id e contador é automatico, valor é associado com os gastos e inicia com 0 (eu acho)
    onClose();
  };

  //modal - tela de cadastro
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastrar Categoria</h2>
        <div className="modal-nome">
          <label>Nome: </label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />  
        </div>
        <div className="modal-descricao">
          <label>Descricao: </label>
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />  
        </div>
        <div className='modal-button'>
          <button className = 'add-button-model' onClick={handleAdicionar}>Adicionar Categoria</button>
          <button className='cancelar-button-model' onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

// Componente para o Dashboard principal
const DashboardCategoria = () => {
  const navigate = useNavigate(); // Use useNavigate para navegação
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);
  const [categorias, setCategoria] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/categoria') 
    .then((response) => {
      setCategoria(response.data);
    })
    .catch((erro) => {
      console.log('Erro ao obter as categorias: ' + erro);
    });
  }, []);

  const handleMenuClick = (menuItem) => {
    if (menuItem === 'Receitas') {
      navigate('/dashboard/receitas');
    } else if (menuItem === 'Gastos') {
      navigate('/dashboard/gastos');
    } else if (menuItem === 'Faturas') {
      navigate('/dashboard/faturas');
    } else if (menuItem === 'Categorias') {
      window.location.reload();
    } else if (menuItem === 'Sair') {
      navigate('/login');
    }
  };

  const handleActionButtonClick = (action) => {
    if (action === 'Cadastrar') {
      setIsCadastrarModalOpen(true);
    }
    else {
      // Adiciona lógica para os outros botões
    }
  };

  const handleAdicionarCategoria = (dados) => {
    axios.post('http://localhost:8080/categoria/cadastrar', dados)
      .then((response) => {
        // Atualiza a lista de categorias após adicionar com sucesso
        axios.get('http://localhost:8080/categoria')
          .then((response) => {
            setCategoria(response.data); // Atualiza a lista de categorias
          })
          .catch((erro) => {
            console.log('Erro ao obter categorias:', erro);
          });
      })
      .catch((erro) => {
        console.log('Erro ao adicionar categoria:', erro);
      });
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
            Receita
          </div>
          <div className="menu-item menu-gasto" onClick={() => handleMenuClick('Gastos')}>
            Gasto
          </div>
          <div className="menu-item menu-fatura" onClick={() => handleMenuClick('Faturas')}>
            Fatura
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
              <th>Nome</th>
              <th>Descricao</th>
              <th>nº de gastos associados </th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.nome}</td>
                <td>{categoria.descricao}</td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
      {isCadastrarModalOpen && (
        <CadastrarModal onClose={() => setIsCadastrarModalOpen(false)} onAdicionar={handleAdicionarCategoria} />
      )}
    </div>
  );
};

export default DashboardCategoria;