import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';


const MyContactRequests = () => {
    const [biodata, setBiodata] = useState([]);
    const [premiumData, setPremiumData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext); // Access the logged-in user's info

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch biodata data
                const biodataResponse = await axios.get('https://soul-link-server.vercel.app/biodata');
                console.log('Biodata fetched:', biodataResponse.data);
                setBiodata(biodataResponse.data);

                // Fetch premium data
                const premiumResponse = await axios.get('https://soul-link-server.vercel.app/premiums');
                console.log('Premiums fetched:', premiumResponse.data);
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

    // Matching biodata with premium data based on biodataId and user email
    const matchingRequests = premiumData
        .filter(
            premium =>
                premium.status === 'approved' && // Filter approved premiums
                premium.userEmail === user?.email // Check if userEmail matches the logged-in user's email
        )
        .map(premium => {
            const matchedBiodata = biodata.find(
                data => Number(premium.biodataId) === data.biodataId // Match biodataId
            );
            if (matchedBiodata) {
                return { ...premium, biodata: matchedBiodata };
            }
            return null;
        })
        .filter(request => request !== null); // Remove null entries

    console.log('Matching requests:', matchingRequests);

    return (
        <div className="py-10">
            <h1 className="text-2xl font-bold mb-6">My Approved Contact Requests</h1>

            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Premium ID</th>
                        <th className="px-4 py-2 border">User Email</th>
                        <th className="px-4 py-2 border">Amount</th>
                        <th className="px-4 py-2 border">Date Approved</th>
                        <th className="px-4 py-2 border">Partner's Name</th>
                        <th className="px-4 py-2 border">Occupation</th>
                        <th className="px-4 py-2 border">Contact Email</th>
                        <th className="px-4 py-2 border">Mobile Number</th>
                    </tr>
                </thead>
                <tbody>
                    {matchingRequests.length > 0 ? (
                        matchingRequests.map(request => (
                            <tr key={request._id}>
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
                            <td colSpan="8" className="text-center py-2">
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
