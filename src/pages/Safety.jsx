import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaUserShield, FaEyeSlash } from "react-icons/fa";

const safetyPoints = [
    {
        id: 1,
        icon: <FaShieldAlt className="text-blue-600 text-4xl" />,
        title: "Secure & Verified Profiles",
        description:
            "All user profiles go through a strict verification process to ensure authenticity and prevent fraudulent activities.",
    },
    {
        id: 2,
        icon: <FaLock className="text-blue-600 text-4xl" />,
        title: "End-to-End Encryption",
        description:
            "Your private messages and personal data are encrypted, ensuring complete privacy and security in communication.",
    },
    {
        id: 3,
        icon: <FaUserShield className="text-blue-600 text-4xl" />,
        title: "Report & Block Feature",
        description:
            "Users can report suspicious profiles and block unwanted interactions for a safe and respectful experience.",
    },
    {
        id: 4,
        icon: <FaEyeSlash className="text-blue-600 text-4xl" />,
        title: "Data Privacy Protection",
        description:
            "We follow strict privacy policies and never share your personal information with third parties without consent.",
    },
];

const Safety = () => {
    return (
        <div className="bg-gradient-to-r from-blue-200 to-teal-200 py-16 px-6 md:px-16 lg:px-32">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    Your <span className="text-blue-600">Safety</span> is Our Priority
                </h2>
                <p className="text-lg md:text-xl font-light mt-4 text-gray-700">
                    We ensure a secure and trusted matchmaking experience for our users.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {safetyPoints.map((point) => (
                    <motion.div
                        key={point.id}
                        className="bg-gray-100 p-6 rounded-lg shadow-md flex items-start space-x-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: point.id * 0.2 }}
                    >
                        <div>{point.icon}</div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{point.title}</h3>
                            <p className="mt-2 text-gray-700">{point.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Safety;
