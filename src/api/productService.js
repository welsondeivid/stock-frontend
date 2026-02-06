import api from './axios';

export async function getProducts() {
    const response = await api.get('/products');
    return response.data;
}

export async function availables() {
    const response = await api.get('/production/available-products');
    console.log(response.data);
    
    return response.data;
}