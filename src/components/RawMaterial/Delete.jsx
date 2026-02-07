import '../../styles/button.css';
import '../../styles/rawMaterial.css';

function Delete({ selectedRawMaterial, onCancel, onConfirm }) {
    return (
      <div className="raw-material-delete-container">
        <h2>Confirmar Exclusão</h2>
  
        <p>Tem certeza que deseja excluir esta Matéria-Prima?</p>
  
        <p className="raw-material-delete-code">
          Código: {selectedRawMaterial}
        </p>
  
        <div className="button-group">
          <button onClick={onCancel} className="btn btn-secondary">
            Não
          </button>
  
          <button onClick={onConfirm} className="btn btn-danger">
            Sim
          </button>
        </div>
      </div>
    );
  }
  
  export default Delete;
  