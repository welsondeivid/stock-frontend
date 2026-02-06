import { useEffect, useState } from "react";

import {
  getProducts,
  deleteProduct,
  createProduct
} from "../api/productService";

import Create from "../components/Product/Create";
import Edit from "../components/Product/Edit";
import Delete from "../components/Product/Delete";
import Modal from "../components/Modal";

import "../styles/products.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [editingProductOpen, setEditingProductOpen] = useState(false);
  const [deleteProductOpen, setDeleteProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, [refresh]);

  function openEditModal(productCode) {
    const product = products.find(p => p.code === productCode);
    setSelectedProduct(product);
    setEditingProductOpen(true);
  }

  function openDeleteModal(productCode) {
    setSelectedProduct(productCode);
    setDeleteProductOpen(true);
  }

  async function handleDeleteConfirm() {
    try {
      await deleteProduct(selectedProduct);
      setDeleteProductOpen(false);
      setRefresh(prev => !prev);
    } catch (error) {
      setError("Erro ao excluir produto");
      console.error("Error deleting product:", error);
    }
  }

  async function handleCreateProduct(productData) {
    try {
      await createProduct(productData);
      setRefresh(prev => !prev);
    } catch (error) {
      setError("Erro ao criar produto");
      console.error("Error creating product:", error);
    }
  }

  return (
    <>
      <Modal
        id="modal-edit"
        isOpen={editingProductOpen}
        setIsOpen={setEditingProductOpen}
      >
        <Edit
          productCode={selectedProduct?.code}
          product={selectedProduct}
        />
      </Modal>

      <Modal
        id="modal-delete"
        isOpen={deleteProductOpen}
        setIsOpen={setDeleteProductOpen}
      >
        <Delete
          selectedProduct={selectedProduct}
          onCancel={() => setDeleteProductOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      </Modal>

      <div className="main">
        <h1>Produtos</h1>

        {error && <p style={{ color: "red" }}>Erro: {error}</p>}

        <Create onSubmit={handleCreateProduct} />

        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.code}>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td className="actions-td">
                  <button onClick={() => openEditModal(product.code)}>
                    Editar
                  </button>
                  <button onClick={() => openDeleteModal(product.code)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductList;