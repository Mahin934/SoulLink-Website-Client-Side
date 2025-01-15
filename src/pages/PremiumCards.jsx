import React, { useEffect, useState } from 'react';
import { FaUser, FaBirthdayCake, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineNumbers } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; // To handle navigation

import axios from 'axios';

const PremiumCards = () => {
    const [biodata, setBiodata] = useState([]);
    const [premiumData, setPremiumData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Use navigate for programmatic navigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch biodata data
                const biodataResponse = await axios.get('http://localhost:5000/biodata');
                setBiodata(biodataResponse.data);

                // Fetch premium data
                const premiumResponse = await axios.get('http://localhost:5000/premiums');
                setPremiumData(premiumResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    // Matching biodata with premium data based on email
    const matchingRequests = premiumData
        .filter(premium => premium.status === 'approved') // Filter approved status
        .map(premium => {
            const matchedBiodata = biodata.find(
                data => premium.userEmail === data.contactEmail // Match by email
            );
            if (matchedBiodata) {
                return { ...premium, biodata: matchedBiodata };
            }
            return null;
        })
        .filter(request => request !== null); // Remove null entries if no match

    // Remove duplicates by email
    const uniqueRequests = [];
    const seenEmails = new Set();

    matchingRequests.forEach(request => {
        if (!seenEmails.has(request.biodata.contactEmail)) {
            uniqueRequests.push(request);
            seenEmails.add(request.biodata.contactEmail);
        }
    });

    // Handle navigation to bio details page
    const handleViewDetails = (id) => {
        navigate(`/bioDetails/${id}`);
    };

    return (
        <div className="py-10">
            <h1 className="text-2xl font-bold mb-6">Approved Premium Cards</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {uniqueRequests.length > 0 ? (
                    uniqueRequests.map(request => (
                        <div key={request._id} className="border rounded-lg p-4 shadow-md">
                            <img
                                src={request.biodata.profileImage}
                                alt={request.biodata.name}
                                className="w-full h-64 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold">{request.biodata.name}</h2>

                            <div className="mt-2">
                                <p className="flex items-center">
                                <MdOutlineNumbers className="mr-2 text-gray-600"/>
                                    BiodataID: {request.biodata.biodataId}
                                </p>
                                <p className="flex items-center">
                                    <FaBirthdayCake className="mr-2 text-gray-600" />
                                    Age: {request.biodata.age}
                                </p>
                                <p className="flex items-center">
                                    <FaUser className="mr-2 text-gray-600" />
                                    Occupation: {request.biodata.occupation}
                                </p>
                                <p className="flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-gray-600" />
                                    Location: {request.biodata.presentDivision}
                                </p>
                            </div>

                            <div className='flex justify-center'>
                                <button
                                    onClick={() => handleViewDetails(request.biodata._id)}
                                    className="mt-4  bg-blue-500 text-white px-12 py-2 rounded-full hover:bg-blue-700"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full">No matching approved premium requests found</p>
                )}
            </div>
        </div>
    );
};

export default PremiumCards;
