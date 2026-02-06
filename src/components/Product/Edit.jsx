import { useState, useEffect } from 'react';
import { getRawMaterials } from '../../api/rawMaterialService';
import { getProduct, updateProduct, updateComposition } from '../../api/productService';

function Edit({ productCode, product }) {
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

      // Fazer as duas chamadas em paralelo
      await Promise.all([
        updateProduct(productCode, productBody),
        updateComposition(productCode, rawMaterialsBody)
      ]);

      // Sucesso - você pode adicionar uma mensagem de sucesso ou fechar o modal aqui
      alert('Produto atualizado com sucesso!');
      
    } catch (error) {
      setError('Erro ao atualizar produto. Tente novamente.');
      console.error('Error updating product:', error);
    } finally {
      setSaving(false);
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
    <div>
      <h2>Editar Produto</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Nome do Produto:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do produto"
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Preço do Produto:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Preço do produto"
              step="0.01"
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h3>Matérias-Primas</h3>
          {rawMaterials.map((rm, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              gap: '10px', 
              marginBottom: '10px',
              alignItems: 'flex-end'
            }}>
              <div style={{ flex: 1 }}>
                <label>
                  Código da Matéria-Prima:
                  <select
                    value={rm.rawMaterialCode}
                    onChange={(e) => updateRawMaterial(index, 'rawMaterialCode', e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
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
              
              <div style={{ flex: 1 }}>
                <label>
                  Quantidade Requerida:
                  <input
                    type="number"
                    value={rm.required}
                    onChange={(e) => updateRawMaterial(index, 'required', e.target.value)}
                    placeholder="Quantidade"
                    min="1"
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={() => removeRawMaterialGroup(index)}
                disabled={rawMaterials.length === 1}
                style={{ 
                  padding: '8px 15px',
                  backgroundColor: rawMaterials.length === 1 ? '#ccc' : '#dc3545',
                  color: 'white',
                  border: 'none',
                  cursor: rawMaterials.length === 1 ? 'not-allowed' : 'pointer',
                  height: 'fit-content'
                }}
              >
                Remover
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addRawMaterialGroup}
            style={{
              padding: '8px 15px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            + Adicionar Matéria-Prima
          </button>
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
    </div>
  );
}

export default Edit;