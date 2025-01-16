import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; 
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApprovedPremium = () => {
    const axiosSecure = useAxiosSecure();
    const [paymentData, setPaymentData] = useState([]);
    const [premiumsData, setPremiumsData] = useState([]); 
    const [loading, setLoading] = useState(true);

    // Function to fetch data
    const fetchData = async () => {
        try {
            const [paymentResponse, premiumsResponse] = await Promise.all([
                axiosSecure.get("/payment"), 
                axiosSecure.get("/premiums"), 
            ]);

            setPaymentData(paymentResponse.data); 
            setPremiumsData(premiumsResponse.data); 
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, [axiosSecure]);

    // Handle approving the premium
    const handleApprovePremium = async (payment) => {
        if (premiumsData.some((premium) => premium.paymentId === payment._id && premium.status === 'approved')) {
            // If already approved, show SweetAlert that it's already approved
            Swal.fire({
                icon: 'warning',
                title: 'Already Approved',
                text: `The premium for Payment ID ${payment._id} has already been approved.`,
            });
            return; 
        }

        try {
            // POST request to save premium approval
            const response = await axiosSecure.post("/premiums", {
                paymentId: payment._id,
                userEmail: payment.userEmail,
                amount: payment.amount,
                biodataId: payment.biodataId,
                status: 'approved', 
            });

            if (response.data.success) {
                // Show SweetAlert success message
                Swal.fire({
                    icon: 'success',
                    title: `Premium for Payment ID ${payment._id} approved successfully!`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Refetch data from /premiums
                fetchData();
            }
        } catch (error) {
            console.error("Error approving premium:", error);
            // Show SweetAlert error message
            Swal.fire({
                icon: 'error',
                title: 'There was an error approving the premium.',
                text: error.message,
            });
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="py-10">
            <h1 className="text-2xl font-bold mb-6">Approved Premium Payments</h1>

            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Payment ID</th>
                        <th className="px-4 py-2 border">User Email</th>
                        <th className="px-4 py-2 border">Amount</th>
                        <th className="px-4 py-2 border">Biodata ID</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentData.length > 0 ? (
                        paymentData.map((payment) => {
                            const isApproved = premiumsData.some(
                                (premium) =>
                                    premium.paymentId === payment._id &&
                                    premium.status === 'approved'
                            );

                            return (
                                <tr key={payment._id}>
                                    <td className="px-4 py-2 border">{payment._id}</td>
                                    <td className="px-4 py-2 border">{payment.userEmail}</td>
                                    <td className="px-4 py-2 border">${payment.amount}</td>
                                    <td className="px-4 py-2 border">{payment.biodataId}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => handleApprovePremium(payment)}
                                            className={`py-1 px-4 rounded-md ${isApproved
                                                    ? 'bg-green-500 cursor-not-allowed'
                                                    : 'bg-blue-500 hover:bg-blue-700'
                                                } text-white`}
                                            disabled={isApproved}
                                        >
                                            {isApproved ? 'Approved' : 'Approve Premium'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-2">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedPremium;
