import { useParams } from "react-router-dom";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { useState } from 'react';
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from 'sweetalert2';  // Import SweetAlert2

// Load Stripe with your public key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const CheckoutForm = ({ biodataId, userEmail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return; // Make sure stripe.js is loaded
        }

        setIsProcessing(true);
        setPaymentError(null);

        // Create a payment method with the card details
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            setPaymentError(error.message);
            setIsProcessing(false);
            return;
        }

        // Use axiosSecure to send the payment method details to the server
        try {
            const response = await axiosSecure.post("/create-payment-intent", {
                paymentMethodId: paymentMethod.id,
                amount: 500, // Amount in cents, $5 = 500 cents
                biodataId: biodataId,
                userEmail: userEmail,
            });

            const paymentResult = response.data;

            if (paymentResult.error) {
                setPaymentError(paymentResult.error.message);
            } else {
                // Record payment details to database
                try {
                    await axiosSecure.post('/payment', {
                        paymentMethodId: paymentMethod.id,
                        biodataId: biodataId,
                        userEmail: userEmail,
                        amount: 5, // The amount you charged
                    });

                    // Handle successful payment (show SweetAlert)
                    Swal.fire({
                        title: 'Payment Successful!',
                        text: 'Contact information will be shared shortly.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                } catch (error) {
                    console.error('Error saving payment data:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'There was an issue saving your payment data. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        } catch (error) {
            setPaymentError("An error occurred. Please try again.");
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="biodataId" className="block text-lg font-medium text-gray-700">Biodata ID</label>
                <input
                    id="biodataId"
                    type="text"
                    value={biodataId}
                    readOnly
                    className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Your Email</label>
                <input
                    id="email"
                    type="email"
                    value={userEmail}
                    readOnly
                    className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="card" className="block text-lg font-medium text-gray-700">Card Information</label>
                <CardElement id="card" className="mt-2 p-2 border border-gray-300 rounded-md" />
            </div>

            {paymentError && <p className="text-red-500 text-sm">{paymentError}</p>}

            <div className="mt-6 flex justify-center">
                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="w-1/3 bg-blue-500 text-white py-2 rounded-md"
                >
                    {isProcessing ? "Processing..." : "Pay $5"}
                </button>
            </div>
        </form>
    );
};

const Checkout = () => {
    const { biodataId } = useParams(); // Get biodataId from URL
    const { user } = useAuth(); // Get logged-in user from useAuth hook

    if (!user) {
        return <p>Please log in to continue.</p>;
    }

    const userEmail = user.email; // Get user email from useAuth

    return (
        <div className="py-10">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            <p className="mb-6">You're requesting contact information for Biodata ID: {biodataId}</p>

            <Elements stripe={stripePromise}>
                <CheckoutForm biodataId={biodataId} userEmail={userEmail} />
            </Elements>
        </div>
    );
};

export default Checkout;
