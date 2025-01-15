import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", // Replace with your backend URL
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext); // Access logOut from AuthContext
    const navigate = useNavigate();

    // Request interceptor
    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access-token");
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor to handle 401 and 403 errors
    axiosSecure.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                console.warn("Unauthorized access, logging out...");
                await logOut(); // Call logOut from AuthContext
                navigate("/login"); // Redirect to the login page
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
