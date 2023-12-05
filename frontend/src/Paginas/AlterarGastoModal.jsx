import React, { useState} from 'react';
import SelectCategoria from '../Paginas/SelectCategoria';
import SelectFatura from '../Paginas/SelectFatura';
import '../Estilos/Styles.css';

const AlterarGastoModal = ({ gasto, onClose, onAlterar }) => {
    const [novaDescricao, setNovaDescricao] = useState(gasto.descricao);
    const [novoValor, setNovoValor] = useState(gasto.valor);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(gasto.categoria.id);
    const [faturaSelecionada, setFaturaSelecionada] = useState(gasto.fatura.id);
    
  
    const handleCategoriaChange = (categoriaId) => {
      setCategoriaSelecionada(categoriaId);
    };
  
    const handleFaturaChange = (faturaId) => {
      setFaturaSelecionada(faturaId);
    };
  
    const handleAlterarGasto = () => {
      onAlterar({
        ...gasto,
        descricao: novaDescricao,
        valor: novoValor,
        categoria: { id: categoriaSelecionada },
        fatura: { id: faturaSelecionada },
      });
      onClose();
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Alterar Gasto</h2>
          <div className="modal-descricao">
            <label>Descrição: </label>
            <input type="text" value={novaDescricao} onChange={(e) => setNovaDescricao(e.target.value)} />
          </div>
          <div className='modal-valor'>
            <label>Valor: </label>
            <input type="text" value={novoValor} onChange={(e) => setNovoValor(e.target.value)} />
          </div>
          <SelectCategoria
            categoriaSelecionada={categoriaSelecionada}
            onCategoriaChange={handleCategoriaChange}
          />
          <SelectFatura
            faturaSelecionada={faturaSelecionada}
            onFaturaChange={handleFaturaChange}
          />
          <div className='modal-button'>
            <button className='add-button-model' onClick={handleAlterarGasto}>Alterar Gasto</button>
            <button className='cancelar-button-model' onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  };

  export default AlterarGastoModal;
  