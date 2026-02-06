import { useEffect, useState } from "react";
import { getProducts } from "../api/productService";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProductsData() {
      try {
          const data = await getProducts();
          setProducts(data);
      } catch (error) {
          setError(error.message);
          console.error("Error fetching products:", error);
      }
    }

    getProductsData();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      <ul>
        {products.map(element => (
          <li key={element.code}>
            <strong>{element.code}</strong> - {element.name} - R$ {element.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList;