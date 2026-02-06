import { useState, useEffect } from "react";

import { getRawMaterials } from "../api/rawMaterialService";

function RawMaterialsList() {

    const [rawMaterials, setRawMaterials] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getRawMaterialsData() {
            try {
                const data = await getRawMaterials();
                setRawMaterials(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching raw materials:", error);
            }
        }

        getRawMaterialsData();
    }, []);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            <ul>
                {rawMaterials.map(element => (
                    <li key={element.code}>
                        <strong>{element.code}</strong> - {element.name} - R$ {element.amount}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RawMaterialsList;