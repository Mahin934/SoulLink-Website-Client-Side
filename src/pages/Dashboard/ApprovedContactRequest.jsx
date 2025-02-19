import React, { useEffect, useState, useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { DarkModeContext } from '../../providers/DarkModeProvider';


const ApprovedContactRequest = () => {
    const { darkMode } = useContext(DarkModeContext); 
    const axiosSecure = useAxiosSecure();
    const [premiumData, setPremiumData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPremiumData = async () => {
            try {
                const response = await axiosSecure.get("/premiums");
                setPremiumData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching premium data:", error);
                setLoading(false);
            }
        };

        fetchPremiumData();
    }, [axiosSecure]);

    if (loading) return <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} text-center`}>Loading...</p>;

    return (
        <div className={`py-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                Approved Premium Contact Requests
            </h1>
            
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Premium ID</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>User Email</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Amount</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Status</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Date Approved</th>
                        <th className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Biodata ID</th>
                    </tr>
                </thead>
                <tbody>
                    {premiumData.length > 0 ? (
                        premiumData.map((premium) => (
                            <tr key={premium._id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                <td className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{premium.paymentId}</td>
                                <td className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{premium.userEmail}</td>
                                <td className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>${premium.amount}</td>
                                <td className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{premium.status}</td>
                                <td className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                                    {new Date(premium.dateApproved).toLocaleDateString()}
                                </td>
                                <td className={`px-4 py-2 border ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{premium.biodataId}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className={`text-center py-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                                No premium requests available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedContactRequest;
