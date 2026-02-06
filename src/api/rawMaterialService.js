import api from "./axios";

export async function getRawMaterials() {

    const response = await api.get('/raw-materials');
    return response.data;
}

export async function getRawMaterial(rawMaterial) {
    const response = await api.get(`/raw-materials/${rawMaterial}`);
    return response.data;
}

export async function createRawMaterial(rawMaterialData) {
    const response = await api.post('/raw-materials', rawMaterialData);
    return response.data;
}

export async function updateRawMaterial(rawMaterialCode, rawMaterialData) {
    const response = await api.put(`/raw-materials/${rawMaterialCode}`, rawMaterialData);
    return response.data;
}

export async function deleteRawMaterial(rawMaterialCode) {
    const response = await api.delete(`/raw-materials/${rawMaterialCode}`);
    return response.data;
}