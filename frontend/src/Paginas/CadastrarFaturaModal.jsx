import React, { useState} from 'react';
import '../Estilos/Styles.css';

// Componente para o modal de Cadastro
const CadastrarFaturaModal = ({ onClose, onAdicionar }) => {
    const [nome, setNome] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
  
    const handleAdicionar = () => {
      onAdicionar({ nome, dataVencimento}); 
      onClose();
    };
  
    //modal - tela de cadastro
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Cadastrar Fatura</h2>
          <div className="modal-nome">
            <label>Nome: </label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>  
          </div>
          <div className="modal-data">
          <label>Data de Vencimento: </label>
            <input type="text" value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} placeholder="dd/mm/aaaa" />  
          </div>
          <div className='modal-button'>
            <button className = 'add-button-model' onClick={handleAdicionar}>Adicionar Fatura</button>
            <button className='cancelar-button-model' onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  };

  export default CadastrarFaturaModal;