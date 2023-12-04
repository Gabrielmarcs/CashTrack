import React, { useState} from 'react';
import '../Estilos/Styles.css';

// Componente para o modal de Alterar
const AlterarCategoriaModal = ({ categoria, onClose, onAlterar }) => {
    const [nome, setNome] = useState(categoria.nome);
    const [descricao, setDescricao] = useState(categoria.descricao);
    const handleAlterar = () => {
      onAlterar({ id: categoria.id, nome, descricao });
      onClose();
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Alterar Fatura</h2>
          <div className="modal-nome">
            <label>Nome: </label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />  
          </div>
          <div className="modal-descricao">
            <label>Descrição: </label>
            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />  
          </div>
          <div className='modal-button'>
            <button className='add-button-model' onClick={handleAlterar}>Salvar Alterações</button>
            <button className='cancelar-button-model' onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  };

export default AlterarCategoriaModal;