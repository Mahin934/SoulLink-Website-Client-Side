import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import { DarkModeContext } from '../../providers/DarkModeProvider';


const MyContactRequests = () => {
    const { darkMode } = useContext(DarkModeContext); // Get dark mode state
    const [biodata, setBiodata] = useState([]);
    const [premiumData, setPremiumData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext); // Access the logged-in user's info

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
        .filter(
            premium =>
                premium.status === 'approved' &&
                premium.userEmail === user?.email
        )
        .map(premium => {
            const matchedBiodata = biodata.find(
                data => Number(premium.biodataId) === data.biodataId
            );
            return matchedBiodata ? { ...premium, biodata: matchedBiodata } : null;
        })
        .filter(request => request !== null);

    return (
        <div className={`py-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                My Approved Contact Requests
            </h1>

            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className={darkMode ? 'bg-gray-800' : 'bg-gray-100'}>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Premium ID</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>User Email</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Amount</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Date Approved</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Partner's Name</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Occupation</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Contact Email</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Mobile Number</th>
                    </tr>
                </thead>
                <tbody>
                    {matchingRequests.length > 0 ? (
                        matchingRequests.map(request => (
                            <tr key={request._id} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                <td className="px-4 py-2 border">{request.paymentId}</td>
                                <td className="px-4 py-2 border">{request.userEmail}</td>
                                <td className="px-4 py-2 border">${request.amount}</td>
                                <td className="px-4 py-2 border">
                                    {new Date(request.dateApproved).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 border">{request.biodata.name}</td>
                                <td className="px-4 py-2 border">{request.biodata.occupation}</td>
                                <td className="px-4 py-2 border">{request.biodata.contactEmail}</td>
                                <td className="px-4 py-2 border">{request.biodata.mobileNumber}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className={`text-center py-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                                No approved contact requests found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyContactRequests;
