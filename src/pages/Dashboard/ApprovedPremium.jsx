import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApprovedPremium = () => {
    const axiosSecure = useAxiosSecure(); // Custom hook to make secure axios requests
    const [paymentData, setPaymentData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data on component mount
    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const response = await axiosSecure.get("/payment"); // Fetch data from the server
                setPaymentData(response.data); // Assuming the server response is in `data` field
                setLoading(false);
            } catch (error) {
                console.error("Error fetching payment data", error);
                setLoading(false);
            }
        };

        fetchPaymentData();
    }, [axiosSecure]); // Run once when the component mounts

    // Handle approving the premium
    const handleApprovePremium = async (payment) => {
        if (payment.status === 'approved') {
            // If already approved, show SweetAlert that it's already approved
            Swal.fire({
                icon: 'warning',
                title: 'Already Approved',
                text: `The premium for Payment ID ${payment._id} has already been approved.`,
            });
            return; // Do nothing if already approved
        }

        try {
            // POST request to save premium approval with extra 'approved' status
            const response = await axiosSecure.post("/premiums", {
                paymentId: payment._id,
                userEmail: payment.userEmail,
                amount: payment.amount,
                biodataId: payment.biodataId,
                status: 'approved', // New status for approved premium
            });

            if (response.data.success) {
                // Show SweetAlert success message
                Swal.fire({
                    icon: 'success',
                    title: `Premium for Payment ID ${payment._id} approved successfully!`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Optionally, update the paymentData state if needed
                setPaymentData((prevData) =>
                    prevData.map((item) =>
                        item._id === payment._id ? { ...item, status: 'approved' } : item
                    )
                );
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
                        <th className="px-4 py-2 border">Biodata ID</th> {/* Updated column */}
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentData.length > 0 ? (
                        paymentData.map((payment) => (
                            <tr key={payment._id}>
                                <td className="px-4 py-2 border">{payment._id}</td>
                                <td className="px-4 py-2 border">{payment.userEmail}</td>
                                <td className="px-4 py-2 border">${payment.amount}</td>
                                <td className="px-4 py-2 border">{payment.biodataId}</td> {/* New data */}
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => handleApprovePremium(payment)}
                                        className="bg-blue-500 text-white py-1 px-4 rounded-md"
                                        disabled={payment.status === 'approved'} // Disable button if already approved
                                    >
                                        {payment.status === 'approved' ? 'Approved' : 'Approve Premium'}
                                    </button>
                                </td>
                            </tr>
                        ))
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
