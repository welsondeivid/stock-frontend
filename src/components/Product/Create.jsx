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
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginTop: '20px'
          }}
        >
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Código do produto"
              name="code"
              required
              style={{ flex: 1, padding: '8px' }}
            />
  
            <input
              type="text"
              placeholder="Nome do produto"
              name="name"
              required
              style={{ flex: 1, padding: '8px' }}
            />
  
            <input
              type="number"
              placeholder="Preço do produto"
              step="0.01"
              name="price"
              required
              style={{ flex: 1, padding: '8px' }}
            />
  
            <button
              type="submit"
              style={{
                padding: '8px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Criar Produto
            </button>
          </div>
        </form>
      </>
    );
  }
  
  export default Create;  