import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../Estilos/Styles.css';
import CadastrarFaturaModal from './CadastrarFaturaModal.jsx';
import AlterarFaturaModal from './AlterarFaturaModal.jsx';
import ExcluirFaturaModal from './ExcluirFaturaModal.jsx';

// Componente para o Dashboard principal
const DashboardFatura = () => {
  const navigate = useNavigate(); // Use useNavigate para navegação
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);
  const [isAlterarModalOpen, setIsAlterarModalOpen] = useState(false);
  const [selectedFaturaId, setSelectedFaturaId] = useState(null);
  const [selectedFatura, setSelectedFatura] = useState(null);
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [faturaParaExcluir, setFaturaParaExcluir] = useState(null);
  const [faturas, setFaturas] = useState([]);

  useEffect(() => {
    // Função para buscar as faturas do backend ao carregar a página
    const fetchFaturas = async () => {
      try {
        const response = await fetch('http://localhost:8080/fatura/listar');
        const data = await response.json();
        setFaturas(data);
      } catch (error) {
        console.error('Erro ao buscar faturas:', error);
      }
    };

    fetchFaturas();
  }, []);

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
    } else if (action === 'Alterar' && selectedFaturaId !== null){
        // Abre o modal de alteração para a fatura selecionada
        const faturaSelecionada = faturas.find(fatura => fatura.id === selectedFaturaId);
        setSelectedFatura(faturaSelecionada);
        setIsAlterarModalOpen(true);
    } else if (action === 'Excluir' && selectedFaturaId !== null){
        const faturaSelecionada = faturas.find(fatura => fatura.id === selectedFaturaId);
        setFaturaParaExcluir(faturaSelecionada);
        setIsExcluirModalOpen(true);
    }
  };

  const handleAdicionarFatura = async (dados) => {
    try {
      const response = await fetch('http://localhost:8080/fatura/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });
  
      if (response.ok) {
        const novaFatura = await response.json();
  
        // Atualiza a lista de faturas com a nova fatura cadastrada
        setFaturas([...faturas, novaFatura]);
        setIsCadastrarModalOpen(false); // Fecha o modal após o cadastro
      } else {
        console.error('Erro ao cadastrar a fatura.');
        // Adicione aqui a lógica para lidar com o erro, se necessário
      }
    } catch (error) {
      console.error('Erro ao cadastrar a fatura:', error);
      // Adicione aqui a lógica para lidar com o erro, se necessário
    }
  };

  const handleAlterarFatura = (dados) => {
    axios.put(`http://localhost:8080/fatura/alterar`, dados)
      .then(() => {
        axios.get('http://localhost:8080/fatura/listar')
          .then((response) => {
            setFaturas(response.data);
          })
          .catch((erro) => {
            console.log('Erro ao obter as faturas: ' + erro);
          });
      })
      .catch((erro) => {
        console.log('Erro ao alterar a fatura: ' + erro);
      });
  };

  const handleExcluirFatura = (fatura) => {
    axios.delete(`http://localhost:8080/fatura/deletar/${fatura.id}`)
      .then(() => {
        axios.get('http://localhost:8080/fatura/listar')
          .then((response) => {
            setFaturas(response.data);
          })
          .catch((erro) => {
            console.log('Erro ao obter as faturas: ' + erro);
          });
      })
      .catch((erro) => {
        console.log('Erro ao excluir a fatura: ' + erro);
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
              <th>Nome</th>
              <th>Data de Vencimento</th>
            </tr>
          </thead>
          <tbody>
            {faturas.map((fatura) => (
              <tr key={fatura.id} onClick={() => setSelectedFaturaId(fatura.id)}>
                <td>
                  <input type="checkbox"
                  checked={fatura.id === selectedFaturaId}
                  onChange={() => setSelectedFaturaId(fatura.id)}
                   />
                </td>
                <td>{fatura.nome}</td>
                <td>{fatura.dataVencimento}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      {isCadastrarModalOpen && (
        <CadastrarFaturaModal onClose={() => setIsCadastrarModalOpen(false)} onAdicionar={handleAdicionarFatura} />
      )}
      {isAlterarModalOpen && selectedFatura && (
        <AlterarFaturaModal
          fatura={selectedFatura}
          onClose={() => setIsAlterarModalOpen(false)}
          onAlterar={handleAlterarFatura}
        />
      )}
      {isExcluirModalOpen && faturaParaExcluir && (
        <ExcluirFaturaModal
          fatura={faturaParaExcluir}
          onClose={() => setIsExcluirModalOpen(false)}
          onExcluir={handleExcluirFatura}
        />
    )}
    </div>
  );
};

export default DashboardFatura;