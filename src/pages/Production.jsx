import { useState, useEffect } from "react";

import { availables } from "../api/productService";

import Toast from "../components/Toast";

import "../styles/tabs.css";

import { mapProductError } from "../utils/Error";

function AvailableProductsList() {
    const [availableProducts, setAvailableProducts] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        async function getAvailableProducts() {
            try {
                const data = await availables();
                setAvailableProducts(data);
            } catch (error) {
                setToast({ message: mapProductError(error), type: "error" });
                console.error("Error fetching available products:", error);
            }
        }

        getAvailableProducts();
    }, []);

    return (
        <>
            <div className="main">
                
                <h1>Produtos Disponíveis</h1>
                
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Máximo possível</th>
                            <th>Valor unitário</th>
                            <th>Valor total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableProducts.map(element => (
                            <tr key={element.productCode}>
                                <td>{element.productCode}</td>
                                <td>{element.productName}</td>
                                <td>{element.maxProduction} unidades</td>
                                <td>R$ {element.unitValue}</td>
                                <td>R$ {element.totalValue}</td>
                            </tr>))
                        }
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
    )
}

export default AvailableProductsList;