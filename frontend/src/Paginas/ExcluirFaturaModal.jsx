import '../Estilos/Styles.css';

// Componente para o modal de Excluir
const ExcluirFaturaModal = ({ fatura, onClose, onExcluir }) => {
    const handleConfirmarExcluir = () => {
      onExcluir(fatura);
      onClose();
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Confirmar Exclusão</h2>
          <p>Deseja realmente excluir a fatura "{fatura.nome}"?</p>
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

  export default ExcluirFaturaModal;