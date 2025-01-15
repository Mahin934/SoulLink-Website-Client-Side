import { Link, NavLink, useLocation } from "react-router-dom";
import "animate.css";
import { useContext, useState} from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2"; // Import SweetAlert2 for enhanced logout alert

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext); // Using context for user and logout
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation(); // Get the current location

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                // SweetAlert success message
                Swal.fire({
                    icon: "success",
                    title: "Logged Out",
                    text: "You have successfully logged out!",
                    timer: 2000,
                    showConfirmButton: false,
                });
            })
            .catch((error) => {
                // SweetAlert error message
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Logout failed: ${error.message}`,
                });
            });
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    onClick={closeDropdown}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 hover:from-blue-400 hover:via-sky-600 hover:to-indigo-600 transition px-4 py-2"
                            : "hover:bg-gray-200 px-4 py-2 rounded-full transition"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/biodata"
                    onClick={closeDropdown}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 hover:from-blue-400 hover:via-sky-600 hover:to-indigo-600 transition px-4 py-2"
                            : "hover:bg-gray-200 px-4 py-2 rounded-full transition"
                    }
                >
                    Biodatas
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/addLost-found"
                    onClick={closeDropdown}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 hover:from-blue-400 hover:via-sky-600 hover:to-indigo-600 transition px-4 py-2"
                            : "hover:bg-gray-200 px-4 py-2 rounded-full transition"
                    }
                >
                    Add Lost & Found Item
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/myPosts"
                    onClick={closeDropdown}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 hover:from-blue-400 hover:via-sky-600 hover:to-indigo-600 transition px-4 py-2"
                            : "hover:bg-gray-200 px-4 py-2 rounded-full transition"
                    }
                >
                    My Posts
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard"
                    onClick={closeDropdown}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 hover:from-blue-400 hover:via-sky-600 hover:to-indigo-600 transition px-4 py-2"
                            : "hover:bg-gray-200 px-4 py-2 rounded-full transition"
                    }
                >
                    Dashboard 
                </NavLink>
            </li>
        </>
    );


    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-base-100">
            <div className="navbar p-0 md:p-2 md:container mx-auto">
                {/* Navbar start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                            onClick={toggleDropdown}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        {dropdownOpen && (
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            >
                                {links}
                            </ul>
                        )}
                    </div>
                    {/* Added "FundFusion" section */}
                    <a
                        className="btn border-none text-white font-semibold md:text-2xl bg-gradient-to-r from-blue-300 via-sky-500 to-indigo-500 animate__hinge"
                    >
                        SoulLink
                    </a>
                </div>

                {/* Navbar center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal space-x-3 px-1">{links}</ul>
                </div>

                {/* Navbar end */}
                <div className="navbar-end">
                    {user && user?.email ? (
                        <div className="flex justify-center gap-1 md:gap-3 items-center">
                            <div className="relative group">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={user.photoURL || "/default-avatar.png"}
                                    alt="User Avatar"
                                />
                                <div
                                    className="absolute top-12 left-1/2 transform -translate-x-1/2 w-max bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    {user.displayName}
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="btn btn-primary rounded-full"
                            >
                                Log Out
                            </button>
                        </div>
                     ) : ( 
                        <div className="join animate__heartBeat">
                            <Link
                                to="/register"
                                className="btn join-item rounded-l-full btn-primary"
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/login"
                                className="btn join-item border rounded-r-full border-gray-300 text-gray-700"
                            >
                                Log in
                            </Link>
                        </div>
                       )}  
                </div>
            </div>
        </div>
    );
};

export default NavBar;
