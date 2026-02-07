import { useEffect, useState } from "react";

import { getProducts, deleteProduct, createProduct} from "../api/productService";

import Create from "../components/Product/Create";
import Edit from "../components/Product/Edit";
import Delete from "../components/Product/Delete";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

import "../styles/tabs.css";

import { mapProductError } from "../utils/Error";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);
  const [editingProductOpen, setEditingProductOpen] = useState(false);
  const [deleteProductOpen, setDeleteProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setToast({ message: mapProductError(error), type: "error" });
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
        setToast({ message: "Produto excluído com sucesso!", type: "success" });
    } catch (error) {
      setToast({ message: mapProductError(error), type: "error" });
      console.error("Error deleting product:", error);
    }
  }

  async function handleCreateProduct(productData) {
    try {
      await createProduct(productData);
      setRefresh(prev => !prev);
      setToast({ message: "Produto criado com sucesso!", type: "success" });
    } catch (error) {
      setToast({ message: mapProductError(error), type: "error" });
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
          setEditingProductOpen={setEditingProductOpen}
          setRefresh={setRefresh}
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

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default ProductList;