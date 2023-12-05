import React, { useState} from 'react';
import SelectCategoria from '../Paginas/SelectCategoria';
import SelectFatura from '../Paginas/SelectFatura';
import '../Estilos/Styles.css';

const CadastrarGastoModal = ({ onClose, onAdicionar }) => {
  
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [faturaSelecionada, setFaturaSelecionada] = useState('');
  
    const handleCategoriaChange = (categoriaId) => {
      setCategoriaSelecionada(categoriaId);
    };
  
    const handleFaturaChange = (faturaId) => {
      setFaturaSelecionada(faturaId);
    };
  
    const handleAdicionarGasto = () => {
      onAdicionar({ descricao, valor, categoria: {id: categoriaSelecionada}, fatura: {id: faturaSelecionada}});
      onClose();
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Cadastrar Gasto</h2>
          <div className="modal-descricao">
            <label>Descrição: </label>
            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>
          <div className='modal-valor'>
            <label>Valor: </label>
            <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} />
          </div>
          <SelectCategoria onCategoriaChange={handleCategoriaChange} />
          <SelectFatura onFaturaChange={handleFaturaChange} />
          <div className='modal-button'>
            <button className='add-button-model' onClick={handleAdicionarGasto}>Adicionar Gasto</button>
            <button className='cancelar-button-model' onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  };

  export default CadastrarGastoModal;