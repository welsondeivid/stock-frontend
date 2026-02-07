import { useState, useEffect } from "react";

import Edit  from "../components/RawMaterial/Edit";
import Delete from "../components/RawMaterial/Delete";
import Create from "../components/RawMaterial/Create";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

import { getRawMaterials, createRawMaterial, deleteRawMaterial } from "../api/rawMaterialService";

import "../styles/tabs.css";

import { mapProductError } from "../utils/Error";

function RawMaterialsList() {

    const [rawMaterials, setRawMaterials] = useState([]);
    const [selectedRawMaterial, setSelectedRawMaterial] = useState(null);
    const [editingRawMaterialOpen, setEditingRawMaterialOpen] = useState(false);
    const [deleteRawMaterialOpen, setDeleteRawMaterialOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [toast, setToast] = useState(null);

    async function loadRawMaterials() {
        try {
            const data = await getRawMaterials();
            setRawMaterials(data);
        } catch (error) {
            setToast({ message: mapProductError(error), type: "error" });
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
            setToast({ message: "Matéria-prima excluída com sucesso!", type: "success" });
        } catch (error) {
            setToast({ message: mapProductError(error), type: "error" });
            console.error("Error deleting raw material:", error);
        }
    }
    
    async function handleCreateProduct(rawMaterialData) {
        try {
            await createRawMaterial(rawMaterialData);
            setRefresh(prev => !prev);
            setToast({ message: "Matéria-prima criada com sucesso!", type: "success" });
        } catch (error) {
          setToast({ message: mapProductError(error), type: "error" });
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
                                <td className="actions-td">
                                    <button onClick={() => openEditModal(rm.code)}>Editar</button>
                                    <button onClick={() => openDeleteModal(rm.code)}>Excluir</button>
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

export default RawMaterialsList;