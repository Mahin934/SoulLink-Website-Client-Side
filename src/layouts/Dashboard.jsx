import { NavLink, Outlet } from "react-router-dom";
import { FaUserEdit, FaEye, FaUserFriends, FaHeart, FaSignOutAlt, FaHome, FaUserShield, FaUsers, FaStar, FaEnvelopeOpen } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const { logOut } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logOut(); // Call logOut from the AuthContext
            console.log("User logged out");
            // Optionally, redirect to login page or homepage after logout
            // history.push('/login'); or navigate('/login') if using react-router
        } catch (error) {
            console.error("Logout error:", error);
        }
    };


    return (
        <div className="md:container mx-auto flex min-h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-blue-500 text-white p-4">
                <h2 className="text-lg font-bold mb-4">Dashboard</h2>
                <ul className="space-y-3">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink
                                    to="/dashboard/admin"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-3 bg-blue-700 p-3 rounded"
                                            : "flex items-center gap-3 hover:bg-blue-600 p-3 rounded"
                                    }
                                >
                                    <FaUserShield size={20} />
                                    Admin Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/users"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-3 bg-blue-700 p-3 rounded"
                                            : "flex items-center gap-3 hover:bg-blue-600 p-3 rounded"
                                    }
                                >
                                    <FaUsers size={20} />
                                    Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/approvedPremium"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-3 bg-blue-700 p-3 rounded"
                                            : "flex items-center gap-3 hover:bg-blue-600 p-3 rounded"
                                    }
                                >
                                    <FaStar size={20} />
                                    Approved Premium
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/approvedContactRequest"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-3 bg-blue-700 p-3 rounded"
                                            : "flex items-center gap-3 hover:bg-blue-600 p-3 rounded"
                                    }
                                >
                                    <FaEnvelopeOpen size={20} />
                                    Approved Contact Request
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    className="flex items-center gap-3 w-full bg-red-500 hover:bg-red-600 p-3 rounded text-white mt-6"
                                    onClick={handleLogout}
                                >
                                    <FaSignOutAlt size={20} />
                                    Logout
                                </button>
                            </li>

                        </>
                            :
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/editBio"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex items-center gap-3 bg-blue-700 p-3 rounded"
                                                : "flex items-center gap-3 hover:bg-blue-600 p-3 rounded"
                                        }
                                    >
                                        <FaUserEdit size={20} />
                                        Edit Biodata
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/viewDetails"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex items-center gap-3 bg-blue-700 p-3 rounded"
                                                : "flex items-center gap-3 hover:bg-blue-600 p-3 rounded"
                                        }
                                    >
                                        <FaEye size={20} />
                                        View Biodata
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/myContactRequests"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex items-center gap-3 bg-blue-700 p-3 rounded"
                                                : "flex items-center gap-3 hover:bg-blue-600 p-3 rounded"
                                        }
                                    >
                                        <FaUserFriends size={20} />
                                        My Contact Request
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/favourite"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex items-center gap-3 bg-blue-700 p-3 rounded"
                                                : "flex items-center gap-3 hover:bg-blue-600 p-3 rounded"
                                        }
                                    >
                                        <FaHeart size={20} />
                                        Favourites Biodata
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        className="flex items-center gap-3 w-full bg-red-500 hover:bg-red-600 p-3 rounded text-white mt-6"
                                        onClick={handleLogout}
                                    >
                                        <FaSignOutAlt size={20} />
                                        Logout
                                    </button>
                                </li>
                            </>
                    }
                </ul>

                {/* Divider */}
                <hr className="border-t border-white my-6" />

                {/* Home Button */}
                <NavLink
                    to="/"
                    className="flex items-center gap-3 bg-green-500 hover:bg-green-600 p-3 rounded text-white"
                >
                    <FaHome size={20} />
                    Home
                </NavLink>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
