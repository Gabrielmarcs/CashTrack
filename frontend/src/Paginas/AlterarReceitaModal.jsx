import React, { useState } from 'react';
import '../Estilos/Styles.css';

// Componente para o modal de Alterar
const AlterarReceitaModal = ({ receita, onClose, onAlterar }) => {
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

  export default AlterarReceitaModal;