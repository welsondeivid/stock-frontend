import { useState, useEffect } from "react";

import Edit  from "../components/RawMaterial/Edit";
import Delete from "../components/RawMaterial/Delete";
import Create from "../components/RawMaterial/Create";
import Modal from "../components/Modal";

import { getRawMaterials, createRawMaterial, deleteRawMaterial } from "../api/rawMaterialService";

import "../styles/tabs.css";

function RawMaterialsList() {

    const [rawMaterials, setRawMaterials] = useState([]);
    const [selectedRawMaterial, setSelectedRawMaterial] = useState(null);
    const [editingRawMaterialOpen, setEditingRawMaterialOpen] = useState(false);
    const [deleteRawMaterialOpen, setDeleteRawMaterialOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(null);

    async function loadRawMaterials() {
        try {
            const data = await getRawMaterials();
            setRawMaterials(data);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching raw materials:", error);
        }
    }

    useEffect(() => {
       loadRawMaterials()
    }, [refresh]);

    function openEditModal(rawMaterialCode) {
        const rawMaterial = rawMaterials.find(rm => rm.code === rawMaterialCode);
        setSelectedRawMaterial(rawMaterial);
        setEditingRawMaterialOpen(true);
    }

    function openDeleteModal(rawMaterialCode) {
        setSelectedRawMaterial(rawMaterialCode);
        setDeleteRawMaterialOpen(true);
    }

    async function handleDeleteConfirm() {
        try {
            await deleteRawMaterial(selectedRawMaterial);
            setDeleteRawMaterialOpen(false);
            setRefresh(prev => !prev);
            setError(null);
        } catch (error) {
            setError("Erro ao excluir matéria-prima");
            console.error("Error deleting raw material:", error);
        }
    }
    
    async function handleCreateProduct(rawMaterialData) {
        try {
            await createRawMaterial(rawMaterialData);
            setRefresh(prev => !prev);
            setError(null);
        } catch (error) {
          setError("Erro ao criar matéria-prima");
          console.error("Error creating raw material:", error);
        }
    }

    return (
        <>
            <Modal id="modal-edit" isOpen={editingRawMaterialOpen} setIsOpen={setEditingRawMaterialOpen}>
                <Edit   rawMaterialCode={selectedRawMaterial?.code} rawMaterial={selectedRawMaterial} 
                        setEditingRawMaterialOpen={setEditingRawMaterialOpen} setRefresh={setRefresh}/>
            </Modal>

            <Modal id="modal-delete" isOpen={deleteRawMaterialOpen} setIsOpen={setDeleteRawMaterialOpen}>
                <Delete selectedRawMaterial={selectedRawMaterial} onCancel={() => setDeleteRawMaterialOpen(false)} onConfirm={handleDeleteConfirm}/>
            </Modal>
            
            <div className="main">
                {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
                
                <h1>Matérias-Primas</h1>
                
                <Create onSubmit={handleCreateProduct} />

                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rawMaterials.map((rm) => (
                            <tr key={rm.code}>
                                <td>{rm.code}</td>
                                <td>{rm.name}</td>
                                <td>{rm.amount}</td>
                                <td>
                                    <button onClick={() => openEditModal(rm.code)}>Editar</button>
                                    <button onClick={() => openDeleteModal(rm.code)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default RawMaterialsList;