import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApprovedContactRequest = () => {
    const axiosSecure = useAxiosSecure(); // Custom hook for secure axios requests
    const [premiumData, setPremiumData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch premiums data on component mount
    useEffect(() => {
        const fetchPremiumData = async () => {
            try {
                const response = await axiosSecure.get("/premiums"); // Fetch data from the server
                setPremiumData(response.data); // Assuming the server response contains the data array
                setLoading(false);
            } catch (error) {
                console.error("Error fetching premium data:", error);
                setLoading(false);
            }
        };

        fetchPremiumData();
    }, [axiosSecure]); // Dependency on axiosSecure

    if (loading) return <p>Loading...</p>;

    return (
        <div className="py-10">
            <h1 className="text-2xl font-bold mb-6">Approved Premium Contact Requests</h1>
            
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Premium ID</th>
                        <th className="px-4 py-2 border">User Email</th>
                        <th className="px-4 py-2 border">Amount</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Date Approved</th>
                        <th className="px-4 py-2 border">Biodata ID</th> {/* New column for Biodata ID */}
                    </tr>
                </thead>
                <tbody>
                    {premiumData.length > 0 ? (
                        premiumData.map((premium) => (
                            <tr key={premium._id}>
                                <td className="px-4 py-2 border">{premium.paymentId}</td>
                                <td className="px-4 py-2 border">{premium.userEmail}</td>
                                <td className="px-4 py-2 border">${premium.amount}</td>
                                <td className="px-4 py-2 border">{premium.status}</td>
                                <td className="px-4 py-2 border">
                                    {new Date(premium.dateApproved).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 border">{premium.biodataId}</td> {/* Display Biodata ID */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-2">No premium requests available</td> {/* Updated to match 6 columns */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedContactRequest;
