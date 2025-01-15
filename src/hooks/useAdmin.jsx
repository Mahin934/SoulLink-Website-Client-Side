import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (!loading && user?.email) {
                try {
                    console.log("Checking admin status for", user.email);
                    const res = await axiosSecure.get(`/users/admin/${user.email}`);
                    setIsAdmin(res.data?.admin || false);
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    setIsAdmin(false);
                } finally {
                    setIsAdminLoading(false);
                }
            } else {
                setIsAdminLoading(false); 
            }
        };

        checkAdminStatus();
    }, [user, loading, axiosSecure]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
