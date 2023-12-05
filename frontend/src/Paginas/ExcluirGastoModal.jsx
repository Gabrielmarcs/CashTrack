import '../Estilos/Styles.css';

// Componente para o modal de Excluir
const ExcluirGastoModal = ({ gasto, onClose, onExcluir }) => {
    const handleConfirmarExcluir = () => {
      onExcluir(gasto);
      onClose();
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Confirmar Exclusão</h2>
          <p>Deseja realmente excluir o gasto "{gasto.descricao}"?</p>
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

  export default ExcluirGastoModal;