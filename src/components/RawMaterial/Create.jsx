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
              placeholder="Código da matéria-prima"
              name="code"
              required
              style={{ flex: 1, padding: '8px' }}
            />
  
            <input
              type="text"
              placeholder="Nome da matéria-prima"
              name="name"
              required
              style={{ flex: 1, padding: '8px' }}
            />
  
            <input
              type="number"
              placeholder="Estoque da matéria-prima"
              name="amount"
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