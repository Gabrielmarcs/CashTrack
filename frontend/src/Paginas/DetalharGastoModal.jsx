import React, { useState, useEffect } from 'react';
import '../Estilos/Styles.css';

const DetalharGastoModal = ({ gasto, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Detalhes do Gasto</h2>
          <div className="modal-descricao">
            <label>Descrição: </label>
            <span>{gasto.descricao}</span>
          </div>
          <div className="modal-valor">
            <label>Valor: </label>
            <span>{gasto.valor}</span>
          </div>
          <div className="modal-fatura">
            <label>Fatura: </label>
            <span>{gasto.fatura.nome}</span>
          </div>
          <div className="modal-categoria">
            <label>Categoria: </label>
            <span>{gasto.categoria.nome}</span>
          </div>
          <button className="cancelar-button-model" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    );
  };

  export default DetalharGastoModal;