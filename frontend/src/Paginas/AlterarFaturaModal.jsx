import React, { useState } from 'react';
import '../Estilos/Styles.css';
// Componente para o modal de Alterar
const AlterarFaturaModal = ({ fatura, onClose, onAlterar }) => {
    const [nome, setNome] = useState(fatura.nome);
    const [dataVencimento, setDataVencimento] = useState(fatura.dataVencimento);
  
    const handleAlterar = () => {
      onAlterar({ id: fatura.id, nome, dataVencimento});
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
          <div className="modal-data">
            <label>Data de Vencimento: </label>
            <input type="text" value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} placeholder="dd/mm/aaaa" />  
          </div>
          <div className='modal-button'>
            <button className='add-button-model' onClick={handleAlterar}>Salvar Alterações</button>
            <button className='cancelar-button-model' onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  };

  export default AlterarFaturaModal;