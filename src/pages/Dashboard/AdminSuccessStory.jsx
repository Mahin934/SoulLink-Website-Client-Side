import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../SectionTitle";


const AdminSuccessStory = () => {
    const [successStories, setSuccessStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const axiosSecure = useAxiosSecure();

    // Fetch success stories using useAxiosSecure
    useEffect(() => {
        const fetchSuccessStories = async () => {
            try {
                const response = await axiosSecure.get("/successes"); // Assuming "/successes" is the endpoint
                setSuccessStories(response.data);
            } catch (error) {
                console.error("Error fetching success stories:", error);
            }
        };

        fetchSuccessStories();
    }, [axiosSecure]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Header */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className=" text-center rounded-b-lg">
                    <SectionTitle heading="Success Stories" subHeading="Admin View" />
                </div>
            </motion.div>

            {/* Success Story Table */}
            <div className="overflow-x-auto shadow-lg bg-white rounded-lg p-4">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-teal-700 text-white">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Male Biodata ID</th>
                            <th className="border border-gray-300 px-4 py-2">Female Biodata ID</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {successStories.length > 0 ? (
                            successStories.map((story) => (
                                <tr key={story._id} className="text-center hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{story.selfBiodataId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{story.partnerBiodataId}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            className="bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600 transition"
                                            onClick={() => setSelectedStory(story)}
                                        >
                                            View Story
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="border border-gray-300 px-4 py-6 text-center text-gray-500"
                                >
                                    No success stories available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Viewing Story */}
            {selectedStory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
                        <button
                            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                            onClick={() => setSelectedStory(null)}
                        >
                            Close
                        </button>
                        <h3 className="text-2xl font-bold text-teal-700 mb-4 text-center">
                            Success Story
                        </h3>
                        {/* Couple Image */}
                        <div className="flex justify-center mb-6">
                            <img
                                src={selectedStory.coupleImageLink}
                                alt="Couple"
                                className="w-64 h-64 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                        {/* Story Text */}
                        <p className="text-gray-700 mb-4 text-center">
                            <strong>Male Biodata ID:</strong> {selectedStory.selfBiodataId}
                        </p>
                        <p className="text-gray-700 mb-4 text-center">
                            <strong>Female Biodata ID:</strong> {selectedStory.partnerBiodataId}
                        </p>
                        <p className="text-gray-700 text-center">
                            {selectedStory.successStory}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSuccessStory;
