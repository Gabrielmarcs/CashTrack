import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SelectCategoria from '../Paginas/SelectCategoria';
import axios from 'axios';
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
  const navigate = useNavigate(); // Use useNavigate para navegação
  const [gastos, setGastos] = useState([]);
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);
  const [selectedGastoId, setSelectedGastoId] = useState(null);

  useEffect(() => {
    // Função para buscar os gastos do backend ao carregar a página
    const fetchGastos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/gastos/listar');
        setGastos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os gastos:', error);
      }
    };
  
    fetchGastos();
  }, []);


  const handleMenuClick = (menuItem) => {
    if (menuItem === 'Receitas') {
      navigate('/dashboard/receitas');
    } else if (menuItem === 'Gastos') {
      window.location.reload();
    } else if (menuItem === 'Faturas') {
      navigate('/dashboard/faturas');
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
          <button
            className="update-button" onClick={() => handleActionButtonClick('Alterar')}>
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
              <th></th>
              <th>Descricao</th>
              <th>Valor</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {
              gastos.map(gasto => (
                <tr key={gasto.id} onClick={() => setSelectedGastoId(gasto.id)}>
                  <td>
                    <input
                      type="checkbox"
                      checked={gasto.id === selectedGastoId}
                      onChange={() => setSelectedGastoId(gasto.id)}
                    />
                  </td>
                  <td>{gasto.descricao}</td>
                  <td>{gasto.valor}</td>
                  <td>{gasto.categoria.nome}</td>
                </tr>
              ))
            }
          </tbody>
          
        </table>
      </div>
      {isCadastrarModalOpen && (
        <CadastrarModal onClose={() => setIsCadastrarModalOpen(false)} onAdicionar={handleAdicionarGasto} />
      )}
    </div>
  );
};

export default DashboardGasto;