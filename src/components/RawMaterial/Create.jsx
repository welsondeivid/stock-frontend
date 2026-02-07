import '../../styles/form.css';
import '../../styles/button.css';

function Create({ onSubmit }) {

    function handleSubmit(e) {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const rawMaterialData = Object.fromEntries(formData);
  
      rawMaterialData.amount = Number(rawMaterialData.amount);
  
      onSubmit(rawMaterialData);
  
      e.target.reset();
    }
  
    return (
      <>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-row">
            <input
              type="text"
              placeholder="Código da matéria-prima"
              name="code"
              required
              className="form-input-flex"
            />
  
            <input
              type="text"
              placeholder="Nome da matéria-prima"
              name="name"
              required
              className="form-input-flex"
            />
  
            <input
              type="number"
              placeholder="Estoque da matéria-prima"
              name="amount"
              required
              className="form-input-flex"
            />
  
            <button type="submit" className="btn btn-success">
              Criar Matéria-prima
            </button>
          </div>
        </form>
      </>
    );
  }
  
  export default Create;  