import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../SectionTitle";
import { DarkModeContext } from "../../providers/DarkModeProvider";


const UserFavouriteBio = () => {
    const { user } = useAuth(); // Access the logged-in user's data
    const axiosPublic = useAxiosPublic(); // Axios instance for public requests
    const [favourites, setFavourites] = useState([]); // State to store favorite biodata
    const [loading, setLoading] = useState(true);

    const { darkMode } = useContext(DarkModeContext); // Get dark mode state

    useEffect(() => {
        const fetchFavourites = async () => {
            if (!user?.email) return; // Skip if user is not logged in
            try {
                const response = await axiosPublic.get(`/favourite?email=${user.email}`);
                setFavourites(response.data);
            } catch (error) {
                console.error("Error fetching favourites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavourites();
    }, [user, axiosPublic]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosPublic.delete(`/favourite/${id}`);
                    if (response.data.deletedCount > 0) {
                        setFavourites((prev) => prev.filter((fav) => fav._id !== id));
                        Swal.fire("Deleted!", "The biodata has been removed from your favourites.", "success");
                    }
                } catch (error) {
                    console.error("Error deleting favourite:", error);
                    Swal.fire("Error!", "Failed to delete the biodata. Try again.", "error");
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="text-center mt-10">
                <progress className="progress w-56"></progress>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>SoulLink | My Favourites</title>
            </Helmet>

            {/* Banner Section */}
            <div className="py-16 text-center rounded-b-lg">
                <SectionTitle heading="Your Biodata" subHeading="Profile Details" />
            </div>

            {/* Table Section */}
            <div className="container mx-auto my-10">
                {favourites.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-left border-collapse border border-gray-200">
                            <thead>
                                <tr className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-800'}`}>
                                    <th className="px-4 py-2 border">Biodata ID</th>
                                    <th className="px-4 py-2 border">Type</th>
                                    <th className="px-4 py-2 border">Image</th>
                                    <th className="px-4 py-2 border">Permanent Division</th>
                                    <th className="px-4 py-2 border">Age</th>
                                    <th className="px-4 py-2 border">Occupation</th>
                                    <th className="px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favourites.map((fav, index) => (
                                    <tr key={fav._id} className={index % 2 === 0 ? `${darkMode ? 'bg-gray-700' : 'bg-white'}` : `${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                                        <td className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{fav.biodataId}</td>
                                        <td className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{fav.biodataType}</td>
                                        <td className="px-4 py-2 border">
                                            <img
                                                src={fav.profileImage || "https://via.placeholder.com/100?text=No+Image"}
                                                alt={`Biodata ${fav.biodataId}`}
                                                className="w-16 h-16 rounded"
                                            />
                                        </td>
                                        <td className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{fav.permanentDivision}</td>
                                        <td className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{fav.age}</td>
                                        <td className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{fav.occupation}</td>
                                        <td className="px-4 py-2 border">
                                            <button
                                                onClick={() => handleDelete(fav._id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center mt-10">
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                            You have no favourite biodata.
                        </h2>
                        <p className={`text-gray-600 mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Start adding biodata to your favourites to see them here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserFavouriteBio;
