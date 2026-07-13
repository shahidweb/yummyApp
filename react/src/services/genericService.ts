import axios, { AxiosError } from "axios";
import { DEV_URL } from "../shared/constants/api_urls";

export type APIResponse<T = null> = {
    success: boolean;
    message: string;
    data?: T
}

const api = axios.create({
    baseURL: DEV_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.response.use(
    res => res,
    (error) => {
        const err = error as AxiosError<{ message?: string }>
        const message = err.response?.data.message || "Something went wrong"
        return Promise.reject(new Error(message))
    }
)

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