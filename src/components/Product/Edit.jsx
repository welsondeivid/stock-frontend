import { useState, useEffect } from 'react';
import { getRawMaterials } from '../../api/rawMaterialService';
import { getProduct, updateProduct, updateComposition } from '../../api/productService';
import '../../styles/form.css';
import '../../styles/button.css';
import '../../styles/product.css';

function Edit({ productCode, product, setEditingProductOpen, setRefresh }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [rawMaterials, setRawMaterials] = useState([{ rawMaterialCode: '', required: '' }]);
  const [availableRawMaterials, setAvailableRawMaterials] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchRawMaterials() {
      try {
        const data = await getRawMaterials();
        setAvailableRawMaterials(data);
      } catch (error) {
        setError('Erro ao carregar matérias-primas');
        console.error('Error fetching raw materials:', error);
      }
    }
    fetchRawMaterials();
  }, []);

  useEffect(() => {
    async function fetchProductData() {
      if (!productCode) return;
      
      setLoading(true);
      try {
        if (product) {
          setName(product.name || '');
          setPrice(product.price || '');
        }

        const rawMaterialsData = await getProduct(productCode);
        
        if (rawMaterialsData && rawMaterialsData.length > 0) {
          const formattedRawMaterials = rawMaterialsData.map(item => ({
            rawMaterialCode: item.id?.rawMaterialCode || '',
            required: item.required || ''
          }));
          setRawMaterials(formattedRawMaterials);
        } else {
          setRawMaterials([{ rawMaterialCode: '', required: '' }]);
        }
      } catch (error) {
        setError('Erro ao carregar dados do produto');
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductData();
  }, [productCode, product]);

  const addRawMaterialGroup = () => {
    setRawMaterials([...rawMaterials, { rawMaterialCode: '', required: '' }]);
  };

  const removeRawMaterialGroup = (index) => {
    if (rawMaterials.length > 1) {
      setRawMaterials(rawMaterials.filter((_, i) => i !== index));
    }
  };

  const updateRawMaterial = (index, field, value) => {
    const updated = [...rawMaterials];
    updated[index] = { ...updated[index], [field]: value };
    setRawMaterials(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError(null);

    try {
      const rawMaterialsBody = rawMaterials
        .filter(rm => rm.rawMaterialCode && rm.required)
        .map(rm => ({
          rawMaterialCode: rm.rawMaterialCode,
          required: parseInt(rm.required) || 0
        }));

      const productBody = {
        code: productCode,
        name: name,
        price: price
      };

      await Promise.all([
        updateProduct(productCode, productBody),
        updateComposition(productCode, rawMaterialsBody)
      ]);
    } catch (error) {
      setError('Erro ao atualizar produto. Tente novamente.');
      console.error('Error updating product:', error);
    } finally {
      setSaving(false);
      setEditingProductOpen(false);
      setRefresh(prev => !prev);
    }
  };

  if (loading) {
    return (
      <div>
        <h2>Editar Produto</h2>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="product-edit-container">
      <h2>Editar Produto</h2>
      {error && <p className="form-error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Nome do Produto:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do produto"
              required
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Preço do Produto:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Preço do produto"
              step="0.01"
              required
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <h3>Matérias-Primas</h3>
          {rawMaterials.map((rm, index) => (
            <div key={index} className="raw-material-group">
              <div className="raw-material-group-item">
                <label className="form-label">
                  Código da Matéria-Prima:
                  <select
                    value={rm.rawMaterialCode}
                    onChange={(e) => updateRawMaterial(index, 'rawMaterialCode', e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="">Selecione...</option>
                    {availableRawMaterials.map(rawMat => (
                      <option key={rawMat.code} value={rawMat.code}>
                        {rawMat.code} - {rawMat.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              
              <div className="raw-material-group-item">
                <label className="form-label">
                  Quantidade Requerida:
                  <input
                    type="number"
                    value={rm.required}
                    onChange={(e) => updateRawMaterial(index, 'required', e.target.value)}
                    placeholder="Quantidade"
                    min="1"
                    required
                    className="form-input"
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={() => removeRawMaterialGroup(index)}
                disabled={rawMaterials.length === 1}
                className="btn btn-danger btn-remove"
              >
                Remover
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addRawMaterialGroup}
            className="btn btn-success btn-add-raw-material"
          >
            + Adicionar Matéria-Prima
          </button>
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