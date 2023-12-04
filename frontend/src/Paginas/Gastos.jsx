import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SelectCategoria from '../Paginas/SelectCategoria';
import SelectFatura from '../Paginas/SelectFatura';

import axios from 'axios';
import '../Estilos/Styles.css';

const CadastrarModal = ({ onClose, onAdicionar }) => {
  
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [faturaSelecionada, setFaturaSelecionada] = useState('');

  const handleCategoriaChange = (categoriaId) => {
    setCategoriaSelecionada(categoriaId);
  };

  const handleFaturaChange = (faturaId) => {
    setFaturaSelecionada(faturaId);
  };

  const handleAdicionarGasto = () => {
    onAdicionar({ descricao, valor, categoria: {id: categoriaSelecionada}, fatura: {id: faturaSelecionada}});
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastrar Gasto</h2>
        <div className="modal-descricao">
          <label>Descrição: </label>
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>
        <div className='modal-valor'>
          <label>Valor: </label>
          <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} />
        </div>
        <SelectCategoria onCategoriaChange={handleCategoriaChange} />
        <SelectFatura onFaturaChange={handleFaturaChange} />
        <div className='modal-button'>
          <button className='add-button-model' onClick={handleAdicionarGasto}>Adicionar Gasto</button>
          <button className='cancelar-button-model' onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const DetalhesModal = ({ gasto, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalhes do Gasto</h2>
        <div className="modal-descricao">
          <label>Descrição: </label>
          <span>{gasto.descricao}</span>
        </div>
        <div className="modal-valor">
          <label>Valor: </label>
          <span>{gasto.valor}</span>
        </div>
        <div className="modal-fatura">
          <label>Fatura: </label>
          <span>{gasto.fatura.nome}</span>
        </div>
        <div className="modal-categoria">
          <label>Categoria: </label>
          <span>{gasto.categoria.nome}</span>
        </div>
        <button className="cancelar-button-model" onClick={onClose}>
          Fechar
        </button>
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
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const selectedGasto = gastos.find((gasto) => gasto.id === selectedGastoId);

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
    } else if (action === 'Detalhes' && selectedGastoId) {
      setIsDetalhesModalOpen(true);
    } else {
      // Adiciona lógica para os outros botões
    }
  };

  const handleAdicionarGasto = async (dados) => {
    try {
      // Adicionar lógica para adicionar gasto no banco de dados
      // Usando axios para fazer a requisição POST
      await axios.post('http://localhost:8080/gastos/cadastrar', dados);
      // Atualizar a lista de gastos após o cadastro
      const response = await axios.get('http://localhost:8080/gastos/listar');
      setGastos(response.data);
    } catch (error) {
      console.error('Erro ao adicionar gasto:', error);
    }
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
                </tr>
              ))
            }
          </tbody>
          
        </table>
      </div>
      {isCadastrarModalOpen && (
        <CadastrarModal onClose={() => setIsCadastrarModalOpen(false)} onAdicionar={handleAdicionarGasto} />
      )}
      {isDetalhesModalOpen && selectedGasto && (
        <DetalhesModal gasto={selectedGasto} onClose={() => setIsDetalhesModalOpen(false)} />
      )}
    </div>
  );
};

export default DashboardGasto;