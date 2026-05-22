import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    withCredentials: true,
})

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.set("Authorization", `Beared ${token}`)
//     }
//     return config;
// })


export const apiService = {
    get: async<T>(url: string): Promise<T> => {
        const response = await api.get<T>(url);
        return response.data
    },
    post: async<T, D>(url: string, data: D): Promise<T> => {
        const response = await api.post<T>(url, data);
        return response.data;
    },
    put: async<T, D>(url: string, id: number | string, data: D): Promise<T> => {
        const response = await api.put<T>(`${url}/${id}`, data);
        return response.data
    },
    delete: async<T>(url: string, id: number | string): Promise<T> => {
        const response = await api.delete<T>(`${url}/$${id}`);
        return response.data;
    }
}


export default api;