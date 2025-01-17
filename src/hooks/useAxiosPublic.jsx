import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://soul-link-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;