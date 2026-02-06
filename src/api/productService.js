import api from './axios';

export async function getProducts() {
    const response = await api.get('/products');
    return response.data;
}

export async function getProduct(product) {
    const response = await api.get(`/product/${product}/raw-material`);
    return response.data;
}

export async function availables() {
    const response = await api.get('/production/available-products');
    return response.data;
}

export async function createProduct(productData) {
    const response = await api.post('/products', productData);
    return response.data;
}

export async function updateProduct(productCode, productData) {
    const response = await api.put(`/products/${productCode}`, productData);
    return response.data;
}

export async function updateComposition(productCode, rawMaterials) {
    const response = await api.post(`/product/${productCode}/raw-material`, rawMaterials);
    return response.data;
}

export async function deleteProduct(productCode) {
    const response = await api.delete(`/products/${productCode}`);
    return response.data;
}