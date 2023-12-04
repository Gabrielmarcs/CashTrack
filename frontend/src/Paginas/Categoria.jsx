import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Estilos/Styles.css';
import axios from 'axios';
import CadastrarCategoriaModal from './CadastrarCategoriaModal.jsx';
import AlterarCategoriaModal from './AlterarCategoriaModal.jsx';
import ExcluirCategoriaModal from './ExcluirCategoriaModal.jsx';

// Componente para o Dashboard principal
const DashboardCategoria = () => {
  const navigate = useNavigate(); // Use useNavigate para navegação
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);
  const [isAlterarModalOpen, setIsAlterarModalOpen] = useState(false);
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);
  const [categoriaParaExcluir, setCategoriaParaExcluir] = useState(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Função para buscar as categorias do backend ao carregar a página
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categoria/listar');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar as categorias:', error);
      }
    };

    fetchCategorias();
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
    } else if (action === 'Alterar' && selectedCategoriaId !== null){
      // Abre o modal de alteração para a fatura selecionada
      const categoriaSelecionada = categorias.find(categoria => categoria.id === selectedCategoriaId);
      setSelectedCategoria(categoriaSelecionada);
      setIsAlterarModalOpen(true);
    } else if (action === 'Excluir' && selectedCategoriaId !== null){
      const categoriaSelecionada = categorias.find(categoria => categoria.id === selectedCategoriaId);
      setCategoriaParaExcluir(categoriaSelecionada);
      setIsExcluirModalOpen(true);
  }
    
  };

  const handleAdicionarCategoria = async (dados) => {
    try {
      const response = await fetch('http://localhost:8080/categoria/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });
  
      if (response.ok) {
        const novaCategoria = await response.json();
  
        // Atualiza a lista de faturas com a nova fatura cadastrada
        setCategorias([...categorias, novaCategoria]);
        setIsCadastrarModalOpen(false); // Fecha o modal após o cadastro
      } else {
        console.error('Erro ao cadastrar a categoria.');
        // Adicione aqui a lógica para lidar com o erro, se necessário
      }
    } catch (error) {
      console.error('Erro ao cadastrar a categoria:', error);
      // Adicione aqui a lógica para lidar com o erro, se necessário
    }
  };

  const handleAlterarCategoria = (dados) => {
    axios.put(`http://localhost:8080/categoria/alterar`, dados)
      .then(() => {
        axios.get('http://localhost:8080/categoria/listar')
          .then((response) => {
            setCategorias(response.data);
          })
          .catch((erro) => {
            console.log('Erro ao obter as categorias: ' + erro);
          });
      })
      .catch((erro) => {
        console.log('Erro ao alterar a categoria: ' + erro);
      });
  };

  const handleExcluirCategoria = (categoria) => {
    axios.delete(`http://localhost:8080/categoria/deletar/${categoria.id}`)
      .then(() => {
        axios.get('http://localhost:8080/categoria/listar')
          .then((response) => {
            setCategorias(response.data);
          })
          .catch((erro) => {
            console.log('Erro ao obter as categorias: ' + erro);
          });
      })
      .catch((erro) => {
        console.log('Erro ao excluir a categoria: ' + erro);
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
              <th>Descricao</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id} onClick={() => setSelectedCategoriaId(categoria.id)} >
                <td>
                  <input type="checkbox"
                  checked={categoria.id === selectedCategoriaId}
                  onChange={() => setSelectedCategoriaId(categoria.id)}
                  />
                </td>
                <td>{categoria.nome}</td>
                <td>{categoria.descricao}</td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
      {isCadastrarModalOpen && (
        <CadastrarCategoriaModal onClose={() => setIsCadastrarModalOpen(false)} onAdicionar={handleAdicionarCategoria} />
      )}
      {isAlterarModalOpen && selectedCategoria && (
        <AlterarCategoriaModal
          categoria={selectedCategoria}
          onClose={() => setIsAlterarModalOpen(false)}
          onAlterar={handleAlterarCategoria}
        />
      )}
      {isExcluirModalOpen && categoriaParaExcluir && (
        <ExcluirCategoriaModal
          categoria={categoriaParaExcluir}
          onClose={() => setIsExcluirModalOpen(false)}
          onExcluir={handleExcluirCategoria}
        />
    )}
    </div>
  );
};

export default DashboardCategoria;