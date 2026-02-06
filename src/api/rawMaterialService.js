import api from "./axios";

export async function getRawMaterials() {

    const response = await api.get('/raw-materials');
    return response.data;
}