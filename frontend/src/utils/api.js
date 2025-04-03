import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const clientServer = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


export const fetchAPI = async (method, url, data = {}) => {
    try {
        const response = await clientServer({
            method,
            url,
            data,
        });
        return response.data;
    } catch (error) {

        const errorMessage =
            error.response?.data?.message || 
            error.message ||                
            "Something went wrong. Please try again."; 
        
        throw new Error(errorMessage);
    }
};
