import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SelectCategoria from '../Paginas/SelectCategoria';
import CadastrarGastoModal from './CadastrarGastoModal.jsx';
import AlterarGastoModal from './AlterarGastoModal.jsx';
import ExcluirGastoModal from './ExcluirGastoModal.jsx';
import DetalharGastoModal from './DetalharGastoModal.jsx';

import axios from 'axios';
import '../Estilos/Styles.css';


// Componente para o Dashboard principal
const DashboardGasto = () => {
  const navigate = useNavigate(); // Use useNavigate para navegação
  const [gastos, setGastos] = useState([]);
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);
  const [selectedGastoId, setSelectedGastoId] = useState(null);
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const selectedGasto = gastos.find((gasto) => gasto.id === selectedGastoId);
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [gastoParaExcluir, setGastoParaExcluir] = useState(null);
  const [categoriaSelecionadaId, setCategoriaSelecionadaId] = useState(null); 
  const [isAlterarModalOpen, setIsAlterarModalOpen] = useState(false);




  useEffect(() => {
    const fetchGastos = async () => {
      try {
        let url = 'http://localhost:8080/gastos/listar';
        if (categoriaSelecionadaId) {
          url = `http://localhost:8080/gastos/listarPorCategoria/${categoriaSelecionadaId}`;
        }
        const response = await axios.get(url);
        setGastos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os gastos:', error);
      }
    };
  
    fetchGastos();
  }, [categoriaSelecionadaId]);
  

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
    }else if (action === 'Alterar' && selectedGastoId !== null){
      // Abre o modal de alteração para a gasto selecionada
      
    }else if (action === 'Detalhes' && selectedGastoId !== null) {
      setIsDetalhesModalOpen(true);
    }else if (action === 'Excluir' && selectedGastoId !== null){
      const gastoSelecionado = gastos.find(gasto => gasto.id === selectedGastoId);
      setGastoParaExcluir(gastoSelecionado);
      setIsExcluirModalOpen(true);
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

  const handleAlterarGasto = async (dados) => {
    try{
      await axios.put(`http://localhost:8080/gastos/alterar`, dados);
      // Atualizar a lista de gastos após o cadastro
      const response = await axios.get('http://localhost:8080/gastos/listar');
    setGastos(response.data);
    } catch (error) {
      console.error('Erro ao adicionar gasto:', error);
    }
  };

  const handleExcluirGasto = (gasto) => {
    axios.delete(`http://localhost:8080/gastos/excluir/${gasto.id}`)
      .then(() => {
        axios.get('http://localhost:8080/gastos/listar')
          .then((response) => {
            setGastos(response.data);
          })
          .catch((erro) => {
            console.log('Erro ao obter os gastos: ' + erro);
          });
      })
      .catch((erro) => {
        console.log('Erro ao excluir o gasto: ' + erro);
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
      
      <SelectCategoria onCategoriaChange={(categoriaId) => setCategoriaSelecionadaId(categoriaId)} />

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
        <CadastrarGastoModal onClose={() => setIsCadastrarModalOpen(false)} onAdicionar={handleAdicionarGasto} />
      )}
      {isAlterarModalOpen && selectedGasto && (
        <AlterarGastoModal
          gasto={selectedGasto}
          onClose={() => setIsAlterarModalOpen(false)}
          onAlterar={handleAlterarGasto}
        />
      )}
      {isDetalhesModalOpen && selectedGasto && (
        <DetalharGastoModal gasto={selectedGasto} onClose={() => setIsDetalhesModalOpen(false)} />
      )}
      {isExcluirModalOpen && gastoParaExcluir && (
        <ExcluirGastoModal
          gasto={gastoParaExcluir}
          onClose={() => setIsExcluirModalOpen(false)}
          onExcluir={handleExcluirGasto}
        />
    )}
    </div>
  );
};

export default DashboardGasto;