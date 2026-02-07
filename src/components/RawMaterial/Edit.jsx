import { useState, useEffect, use } from 'react';
import { updateRawMaterial } from '../../api/rawMaterialService';
import '../../styles/form.css';
import '../../styles/button.css';
import '../../styles/rawMaterial.css';

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
      <div className="raw-material-edit-container">
        <h2>Editar Matéria Prima</h2>
        {error && <p className="form-error">{error}</p>}
        
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label className="form-label">
                Nome da Matéria-Prima:
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da matéria-prima"
                required
                className="form-input"
                />
            </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                  Quantidade da Matéria-Prima:
                  <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Quantidade da matéria-prima"
                  required
                  className="form-input"
                  />
              </label>
            </div>
              <button
              type="submit"
              disabled={saving}
              className="btn btn-primary btn-full-width"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
        </form>
    </div>
  );
}

export default Edit;