import React, { useState } from 'react';
import '../Estilos/Styles.css';
// Componente para o modal de Cadastrar
const CadastrarReceitaModal = ({ onClose, onAdicionar }) => {
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

export default CadastrarReceitaModal;
