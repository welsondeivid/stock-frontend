function Delete({ selectedRawMaterial, onCancel, onConfirm }) {
    return (
      <div>
        <h2>Confirmar Exclusão</h2>
  
        <p>Tem certeza que deseja excluir esta Matéria-Prima?</p>
  
        <p style={{ fontWeight: "bold", marginTop: "10px" }}>
          Código: {selectedRawMaterial}
        </p>
  
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              padding: "8px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Não
          </button>
  
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Sim
          </button>
        </div>
      </div>
    );
  }
  
  export default Delete;
  