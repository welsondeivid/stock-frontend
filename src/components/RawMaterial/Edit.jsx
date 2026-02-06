import { useState, useEffect, use } from 'react';
import { updateRawMaterial } from '../../api/rawMaterialService';

function Edit({ rawMaterialCode, rawMaterial, setEditingRawMaterialOpen, setRefresh }) {

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
      async function fetchRawMaterialData() {
        try {

          if (!rawMaterialCode || !rawMaterial) return;
          
          setLoading(true);

          setName(rawMaterial.name || '');
          setAmount(rawMaterial.amount || '');
          setCode(rawMaterial.code || '');

        } catch (error) {
          setError('Erro ao carregar dados da matéria-prima');
          console.error('Error fetching raw material data:', error);
        } finally {
          setLoading(false);
        }
      }

      fetchRawMaterialData();
  }, [rawMaterialCode, rawMaterial]);

  const handleSubmit = async (e) => {

      e.preventDefault();

      setSaving(true);
      setError(null);

      try {
        const rawMaterialBody = {
          code: code,
          name: name,
          amount: amount
        };

        await updateRawMaterial(rawMaterialCode, rawMaterialBody);

      } catch (error) {
        setError('Erro ao atualizar matéria-prima');
        console.error('Error updating raw material:', error);
      } finally {
        setSaving(false);
        setEditingRawMaterialOpen(false);
        setRefresh(prev => !prev);
      }
  }

  if (loading) {
      return (
      <div>
          <h2>Editar Produto</h2>
          <p>Carregando...</p>
      </div>
      );
  }

  return (
      <>
        <h2>Editar Matéria Prima</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
            <label>
                Nome da Matéria-Prima:
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da matéria-prima"
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
            </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>
                  Quantidade da Matéria-Prima:
                  <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Quantidade da matéria-prima"
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  />
              </label>
            </div>
              <button
              type="submit"
              disabled={saving}
              style={{
                padding: '10px 20px',
                backgroundColor: saving ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                cursor: saving ? 'not-allowed' : 'pointer',
                width: '100%',
                marginTop: '20px'
              }}
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
        </form>
    </>
  );
}

export default Edit;