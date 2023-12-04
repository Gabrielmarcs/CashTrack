import React, { useState} from 'react';
import '../Estilos/Styles.css';

// Componente para o modal de Cadastro
const CadastrarCategoriaModal = ({ onClose, onAdicionar }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
  
    const handleAdicionar = () => {
      onAdicionar({ nome, descricao}); 
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

export default CadastrarCategoriaModal;