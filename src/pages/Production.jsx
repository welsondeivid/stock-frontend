import { useState, useEffect } from "react";

import { availables } from "../api/productService";

function AvailableProductsList() {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
        async function getAvailableProducts() {
            try {
                const data = await availables();
                setAvailableProducts(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching available products:", error);
            }
        }

        getAvailableProducts();
    }, []);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            <h2>Produtos Disponíveis para Produção</h2>
            
            <ul>
            {availableProducts.map(element => (
                <li key={element.productCode}> 
                <strong>{element.productCode}</strong> - {element.productName} - Quantidade disponível: {element.maxProduction}
                - valor Unitário: R$ {element.unitValue} - valor Total: R$ {element.totalValue}
                </li>
            ))}
            </ul>
        </div>
    )
}

export default AvailableProductsList;