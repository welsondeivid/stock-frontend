import '../../styles/form.css';
import '../../styles/button.css';

function Create({ onSubmit }) {

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData);

    productData.price = Number(productData.price);

    onSubmit(productData);

    e.target.reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <input
            type="text"
            placeholder="Código do produto"
            name="code"
            required
            className="form-input-flex"
          />

          <input
            type="text"
            placeholder="Nome do produto"
            name="name"
            required
            className="form-input-flex"
          />

          <input
            type="number"
            placeholder="Preço do produto"
            step="0.01"
            name="price"
            required
            className="form-input-flex"
          />

          <button type="submit" className="btn btn-success">
            Criar Produto
          </button>
        </div>
      </form>
    </>
  );
}

export default Create;  