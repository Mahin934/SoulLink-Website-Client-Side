import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "Aisha Rahman",
        rating: 5,
        review:
            "SoulLink helped me find my perfect match! The premium features made the process so much easier and more secure.",
    },
    {
        id: 2,
        name: "Rahul Chowdhury",
        rating: 4.5,
        review:
            "A great platform with a smooth interface. I appreciate the verification process, which ensures genuine connections.",
    },
    {
        id: 3,
        name: "Sara Ahmed",
        rating: 4,
        review:
            "Good experience overall. I wish there were more free features, but the premium membership is definitely worth it.",
    },
    {
        id: 4,
        name: "Omar Hasan",
        rating: 5,
        review:
            "I never thought I'd find my life partner online, but SoulLink made it possible! Thank you for this amazing platform.",
    },
];

const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        } else if (i - 0.5 === rating) {
            stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-gray-400" />);
        }
    }
    return stars;
};

const UserReviews = () => {
    return (
        <div className="bg-gradient-to-r from-blue-200 to-teal-300 py-16 px-6 md:px-16 lg:px-32">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    What Our <span className="text-blue-600">Users Say</span>
                </h2>
                <p className="text-lg md:text-xl font-light mt-4 text-gray-700">
                    Real stories from our happy members!
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review) => (
                    <motion.div
                        key={review.id}
                        className="bg-gray-100 p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: review.id * 0.2 }}
                    >
                        <h3 className="text-lg font-bold text-gray-900">{review.name}</h3>
                        <div className="flex items-center mt-2">{renderStars(review.rating)}</div>
                        <p className="mt-4 text-gray-700">{review.review}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default UserReviews;
