// export default DashboardReceita;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../Estilos/Styles.css';

// Componente para o modal de Cadastrar
const CadastrarModal = ({ onClose, onAdicionar }) => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

  const handleAdicionar = () => {
    onAdicionar({ nome, valor }); 
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
          <button className='add-button-model' onClick={handleAdicionar}>Adicionar Receita</button>
          <button className='cancelar-button-model' onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

// Componente para o modal de Alterar
const AlterarModal = ({ receita, onClose, onAlterar }) => {
  const [nome, setNome] = useState(receita.nome);
  const [valor, setValor] = useState(receita.valor);

  const handleAlterar = () => {
    onAlterar({ id: receita.id, nome, valor });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Alterar Receita</h2>
        <div className="modal-nome">
          <label>Nome: </label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />  
        </div>
        <div className='modal-valor'>
          <label>Valor: </label>
          <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} />
        </div>
        <div className='modal-button'>
          <button className='add-button-model' onClick={handleAlterar}>Salvar Alterações</button>
          <button className='cancelar-button-model' onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

// Componente para o modal de Excluir
const ExcluirModal = ({ receita, onClose, onExcluir }) => {
  const handleConfirmarExcluir = () => {
    onExcluir(receita);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmar Exclusão</h2>
        <p>Deseja realmente excluir a receita "{receita.nome}"?</p>
        <div className="modal-button">
          <button className="add-button-model" onClick={handleConfirmarExcluir}>
            Confirmar
          </button>
          <button className="cancelar-button-model" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente para o Dashboard principal
const DashboardReceita = () => {
  const navigate = useNavigate(); 
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false);
  const [isAlterarModalOpen, setIsAlterarModalOpen] = useState(false);
  const [receitas, setReceitas] = useState([]);
  const [selectedReceitaId, setSelectedReceitaId] = useState(null);
  const [selectedReceita, setSelectedReceita] = useState(null);
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
  const [receitaParaExcluir, setReceitaParaExcluir] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/receitas') 
    .then((response) => {
      setReceitas(response.data);
    })
    .catch((erro) => {
      console.log('Erro ao obter as receitas: ' + erro);
    });
  }, []);

  const handleMenuClick = (menuItem) => {
    if (menuItem === 'Receitas') {
      window.location.reload();
    } else if (menuItem === 'Gastos') {
      navigate('/dashboard/gastos');
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
    } else if (action === 'Alterar' && selectedReceitaId !== null) {
        // Abre o modal de alteração para a receita selecionada
        const receitaSelecionada = receitas.find(receita => receita.id === selectedReceitaId);
        setSelectedReceita(receitaSelecionada);
        setIsAlterarModalOpen(true);
    } else if (action === 'Excluir' && selectedReceitaId !== null){
        const receitaSelecionada = receitas.find(receita => receita.id === selectedReceitaId);
        setReceitaParaExcluir(receitaSelecionada);
        setIsExcluirModalOpen(true);
    }
  };

  const handleAdicionarReceita = (dados) => {
    axios.post('http://localhost:8080/receitas/cadastrar', dados)
    .then((response) => {
      // Após adicionar a receita com sucesso, atualize a lista de receitas
      axios.get('http://localhost:8080/receitas')
        .then((response) => {
          setReceitas(response.data); // Atualiza a lista de receitas com os dados atualizados
        })
        .catch((erro) => {
          console.log('Erro ao obter as receitas: ' + erro);
        });
    })
    .catch((erro) => {
      console.log('Erro ao adicionar a receita: ' + erro);
    });
  };

  const handleAlterarReceita = (dados) => {
    axios.put(`http://localhost:8080/receitas/${dados.id}`, dados)
      .then(() => {
        axios.get('http://localhost:8080/receitas')
          .then((response) => {
            setReceitas(response.data);
          })
          .catch((erro) => {
            console.log('Erro ao obter as receitas: ' + erro);
          });
      })
      .catch((erro) => {
        console.log('Erro ao alterar a receita: ' + erro);
      });
  };

  // Adicione a função para lidar com a exclusão da receita
  const handleExcluirReceita = (receita) => {
    axios.delete(`http://localhost:8080/receitas/${receita.id}`)
      .then(() => {
        axios.get('http://localhost:8080/receitas')
          .then((response) => {
            setReceitas(response.data);
          })
          .catch((erro) => {
            console.log('Erro ao obter as receitas: ' + erro);
          });
      })
      .catch((erro) => {
        console.log('Erro ao excluir a receita: ' + erro);
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
            className="update-button"
            onClick={() => handleActionButtonClick('Alterar')}
            disabled={selectedReceitaId === null}
          >
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
              <th></th>
              <th>Id</th>
              <th>Nome</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {
              receitas.map(receita => (
                <tr key={receita.id} onClick={() => setSelectedReceitaId(receita.id)}>
                  <td>
                    <input
                      type="checkbox"
                      checked={receita.id === selectedReceitaId}
                      onChange={() => setSelectedReceitaId(receita.id)}
                    />
                  </td>
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
      {isAlterarModalOpen && selectedReceita && (
        <AlterarModal
          receita={selectedReceita}
          onClose={() => setIsAlterarModalOpen(false)}
          onAlterar={handleAlterarReceita}
        />
      )}
      {isExcluirModalOpen && receitaParaExcluir && (
        <ExcluirModal
          receita={receitaParaExcluir}
          onClose={() => setIsExcluirModalOpen(false)}
          onExcluir={handleExcluirReceita}
        />
    )}
    </div>
  );
};

export default DashboardReceita;
