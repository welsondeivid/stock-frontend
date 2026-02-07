import '../../styles/button.css';
import '../../styles/product.css';

function Delete({ selectedProduct, onCancel, onConfirm }) {
    return (
      <div className="product-delete-container">
        <h2>Confirmar Exclusão</h2>
  
        <p>Tem certeza que deseja excluir este produto?</p>
  
        <p className="product-delete-code">
          Código: {selectedProduct}
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
  