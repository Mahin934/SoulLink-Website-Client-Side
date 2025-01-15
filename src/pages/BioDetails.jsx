import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState, useEffect } from "react";

const BioDetails = () => {
    const bio = useLoaderData(); // Data for the specific biodata item
    const { user } = useAuth(); // Get the logged-in user's info
    const axiosPublic = useAxiosPublic(); // Axios instance for public requests
    const navigate = useNavigate(); // Hook to navigate to different routes

    const {
        biodataId,
        biodataType,
        profileImage,
        permanentDivision,
        age,
        occupation,
    } = bio;

    const [similarBiodata, setSimilarBiodata] = useState([]);

    // Fetch similar biodata based on gender
    useEffect(() => {
        const fetchSimilarBiodata = async () => {
            try {
                const response = await axiosPublic.get("http://localhost:5000/biodata");
                const allBiodata = response.data;

                // Filter similar biodata based on gender (biodataType)
                const filteredBiodata = allBiodata.filter(
                    (biodata) => biodata.biodataType === biodataType && biodata.biodataId !== biodataId
                );

                // Show a maximum of 3 similar biodata
                setSimilarBiodata(filteredBiodata.slice(0, 3));
            } catch (error) {
                console.error("Error fetching similar biodata:", error);
            }
        };

        fetchSimilarBiodata();
    }, [biodataId, biodataType, axiosPublic]);

    // Handle Add to Favourites
    const handleAddToFavorites = async () => {
        if (!user?.email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to log in to add to favourites!",
            });
            return;
        }

        // Check if the biodata is already in favourites
        try {
            const response = await axiosPublic.get(`/favourite?email=${user.email}`);
            const userFavourites = response.data;

            // Check if the biodataId already exists in the user's favourites
            const isAlreadyFavourite = userFavourites.some(fav => fav.biodataId === biodataId);
            if (isAlreadyFavourite) {
                Swal.fire({
                    icon: "info",
                    title: "Already in Favourites",
                    text: "This biodata is already in your favourites.",
                });
                return;
            }

            const favoriteData = {
                biodataId,
                biodataType,
                profileImage,
                permanentDivision,
                age,
                occupation,
                userEmail: user.email, // Include the logged-in user's email
            };

            const addResponse = await axiosPublic.post("/favourite", favoriteData);

            if (addResponse.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Added to Favourites",
                    text: "This biodata has been added to your favourites!",
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Failed to Add",
                    text: "Something went wrong. Please try again.",
                });
            }
        } catch (error) {
            console.error("Error adding to favourites:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to add this biodata to favourites.",
            });
        }
    };

    // Navigate to Checkout page and pass biodataId
    const handleRequestContactInfo = () => {
        navigate(`/checkout/${biodataId}`); // Assuming the Checkout page route is configured to accept biodataId
    };

    return (
        <div>
            <Helmet>
                <title>SoulLink | BioDetails</title>
            </Helmet>
            {/* Banner Section */}
            <div className="bg-purple-600 py-16 text-center rounded-b-lg">
                <h1 className="text-4xl font-bold text-white">Biodata Details</h1>
                <p className="text-white mt-3">View all the details of the selected biodata.</p>
            </div>

            {/* Details Section */}
            <div className="container mx-auto my-10">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Image Section */}
                        <img
                            src={profileImage || "https://via.placeholder.com/300?text=No+Image+Available"}
                            alt={`Biodata ${biodataId}`}
                            className="w-full lg:w-1/3 rounded-lg"
                        />

                        {/* Details Section */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-800">Biodata ID: {biodataId}</h2>
                            <p className="text-gray-600 mt-2">
                                <strong>Type:</strong> {biodataType}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <strong>Permanent Division:</strong> {permanentDivision}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <strong>Age:</strong> {age}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <strong>Occupation:</strong> {occupation}
                            </p>

                            {/* Add to Favourites Button */}
                            <button
                                onClick={handleAddToFavorites}
                                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Add to Favourites
                            </button>

                            {/* Request Contact Information Button */}
                            <button
                                onClick={handleRequestContactInfo}
                                className="mt-4 px-4 ml-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Request Contact Information
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Biodata Section */}
            {similarBiodata.length > 0 && (
                <div className="container mx-auto my-10">
                    <h3 className="text-2xl font-bold text-gray-800">Similar Biodata</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        {similarBiodata.map((biodata) => (
                            <div key={biodata.biodataId} className="bg-white shadow-lg rounded-lg p-6">
                                <img
                                    src={biodata.profileImage || "https://via.placeholder.com/300?text=No+Image+Available"}
                                    alt={`Biodata ${biodata.biodataId}`}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <h4 className="text-xl font-semibold text-gray-800 mt-4">{biodata.biodataId}</h4>
                                <p className="text-gray-600 mt-2">
                                    <strong>Age:</strong> {biodata.age}
                                </p>
                                <p className="text-gray-600 mt-2">
                                    <strong>Occupation:</strong> {biodata.occupation}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BioDetails;
