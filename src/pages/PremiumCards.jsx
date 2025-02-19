import React, { useEffect, useState, useContext } from 'react';
import { FaUser, FaBirthdayCake, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineNumbers } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DarkModeContext } from '../providers/DarkModeProvider';


const PremiumCards = () => {
    const { darkMode } = useContext(DarkModeContext); // Get dark mode state
    const [biodata, setBiodata] = useState([]);
    const [premiumData, setPremiumData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('ascending');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const biodataResponse = await axios.get('https://soul-link-server.vercel.app/biodata');
                setBiodata(biodataResponse.data);

                const premiumResponse = await axios.get('https://soul-link-server.vercel.app/premiums');
                setPremiumData(premiumResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Loading...</p>;

    const matchingRequests = premiumData
        .filter(premium => premium.status === 'approved')
        .map(premium => {
            const matchedBiodata = biodata.find(
                data => premium.userEmail === data.contactEmail
            );
            return matchedBiodata ? { ...premium, biodata: matchedBiodata } : null;
        })
        .filter(request => request !== null);

    const uniqueRequests = [];
    const seenEmails = new Set();

    matchingRequests.forEach(request => {
        if (!seenEmails.has(request.biodata.contactEmail)) {
            uniqueRequests.push(request);
            seenEmails.add(request.biodata.contactEmail);
        }
    });

    const sortedRequests = uniqueRequests.sort((a, b) => 
        sortOrder === 'ascending' ? a.biodata.age - b.biodata.age : b.biodata.age - a.biodata.age
    );

    const limitedRequests = sortedRequests.slice(0, 6);

    const handleViewDetails = (id) => {
        navigate(`/bioDetails/${id}`);
    };

    return (
        <div className="py-10">
            <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                Approved Premium Cards
            </h1>

            {/* Dropdown for sorting */}
            <div className="mb-6">
                <label htmlFor="sortOrder" className={`mr-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    Sort by Age:
                </label>
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={`p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                >
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {limitedRequests.length > 0 ? (
                    limitedRequests.map(request => (
                        <div 
                            key={request._id} 
                            className={`border rounded-lg p-4 shadow-md transition-colors duration-300 
                                ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
                        >
                            <img
                                src={request.biodata.profileImage}
                                alt={request.biodata.name}
                                className="w-full h-64 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold">{request.biodata.name}</h2>

                            <div className="mt-2">
                                <p className="flex items-center">
                                    <MdOutlineNumbers className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                                    BiodataID: {request.biodata.biodataId}
                                </p>
                                <p className="flex items-center">
                                    <FaBirthdayCake className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                                    Age: {request.biodata.age}
                                </p>
                                <p className="flex items-center">
                                    <FaUser className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                                    Occupation: {request.biodata.occupation}
                                </p>
                                <p className="flex items-center">
                                    <FaMapMarkerAlt className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                                    Location: {request.biodata.presentDivision}
                                </p>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={() => handleViewDetails(request.biodata._id)}
                                    className={`mt-4 px-12 py-2 rounded-full transition 
                                        ${darkMode ? 'bg-blue-600 hover:bg-blue-800 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={`text-center col-span-full ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        No matching approved premium requests found
                    </p>
                )}
            </div>
        </div>
    );
};

export default PremiumCards;
