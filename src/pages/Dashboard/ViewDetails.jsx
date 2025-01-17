import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import SectionTitle from '../SectionTitle';

const ViewDetails = () => {
    const { user } = useContext(AuthContext); // Get logged-in user
    const [biodata, setBiodata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBiodata = async () => {
            try {
                const response = await axios.get('https://soul-link-server.vercel.app/biodata');
                const userBiodata = response.data.find(data => data.contactEmail === user?.email);

                if (userBiodata) {
                    setBiodata(userBiodata);
                } else {
                    setError('No biodata found for the logged-in user.');
                }
            } catch (err) {
                console.error('Error fetching biodata:', err);
                setError('Failed to fetch biodata.');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchBiodata();
        }
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!biodata) {
        return <p>No biodata available.</p>;
    }

    // Handler for making the biodata premium (you can define the actual functionality)
    const handleMakePremium = () => {
        // Add your logic here for making the biodata premium
        console.log("Biodata is now premium!");
        // Example: Make an API call to update the biodata type to premium
    };

    return (
        <div className="container mx-auto p-4">
            {/* SectionTitle added here */}
            <SectionTitle heading="Your Biodata" subHeading="Profile Details" />

            {/* Candidate's Picture and Name */}
            <div className="flex justify-center items-center flex-col mb-6">
                <img
                    src={biodata.profileImage || 'https://via.placeholder.com/150'} // Fallback image if no profile picture
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-gray-300 mb-3"
                />
                <h2 className="text-2xl font-semibold">{biodata.name}</h2>
            </div>

            <hr className="my-6 mx-20 border-gray-300" />

            {/* Biodata Table */}
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <tbody>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Biodata ID</td>
                        <td className="border px-4 py-2">{biodata.biodataId}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Name</td>
                        <td className="border px-4 py-2">{biodata.name}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Biodata Type</td>
                        <td className="border px-4 py-2">{biodata.biodataType}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Date of Birth</td>
                        <td className="border px-4 py-2">{biodata.dob}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Height</td>
                        <td className="border px-4 py-2">{biodata.height}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Weight</td>
                        <td className="border px-4 py-2">{biodata.weight}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Age</td>
                        <td className="border px-4 py-2">{biodata.age}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Occupation</td>
                        <td className="border px-4 py-2">{biodata.occupation}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Contact Email</td>
                        <td className="border px-4 py-2">{biodata.contactEmail}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 font-bold">Mobile Number</td>
                        <td className="border px-4 py-2">{biodata.mobileNumber}</td>
                    </tr>
                </tbody>
            </table>

            {/* "Make Biodata Premium" Button */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleMakePremium}
                    className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
                >
                    Make Biodata Premium
                </button>
            </div>
        </div>
    );
};

export default ViewDetails;
