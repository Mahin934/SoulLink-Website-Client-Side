import { useState, useEffect } from "react";
import { FaUserShield, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Fetch users data from the server
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosSecure.get("/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users data:", error);
                Swal.fire({
                    icon: "error",
                    title: "Failed to fetch users",
                    text: error.message,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [axiosSecure]);

    // Handle make admin action
    const handleMakeAdmin = (user) => {
        axiosSecure
            .patch(`/users/admin/${user._id}`)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    setUsers((prevUsers) =>
                        prevUsers.map((u) =>
                            u._id === user._id ? { ...u, role: "admin" } : u
                        )
                    );
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                console.error("Error making admin", error);
            });
    };

    const handlePremiumAccess = () => {
        navigate("/dashboard/approvedPremium"); // Navigate to the approvedPremium route
    };


    return (
        <div className="overflow-x-auto w-full p-6">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <p className="mb-4 text-gray-700">Total Users: {users.length}</p>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-4">#</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="border-b">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4 flex gap-4">
                                    {user.role !== "admin" ? (
                                        <button
                                            className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
                                            onClick={() => handleMakeAdmin(user)}
                                        >
                                            <FaUserShield size={18} />
                                            Make Admin
                                        </button>
                                    ) : (
                                        <span className="text-green-500 font-bold">
                                            Admin
                                        </span>
                                    )}
                                    <button onClick={handlePremiumAccess} className="btn btn-sm bg-green-500 text-white hover:bg-green-600 flex items-center gap-2">
                                        <FaStar size={18} />
                                        Premium Access
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllUsers;
