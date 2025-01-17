import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SuccessStory = () => {
  const [successStories, setSuccessStories] = useState([]);

  // Fetch success stories from the API
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await fetch("https://soul-link-server.vercel.app/successes");
        const data = await response.json();
        setSuccessStories(data);
      } catch (error) {
        console.error("Error fetching success stories:", error);
      }
    };

    fetchSuccessStories();
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-500 to-teal-700 text-white py-16 px-6 md:px-16 lg:px-32">
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-yellow-300">Shared Stories</span> from Our Couples
        </motion.h2>
        <p className="text-lg md:text-xl font-light mt-4">
          Hear directly from the happy couples who found their soulmates on SoulLink!
        </p>
      </div>

      {/* Dynamic Wedding Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {successStories.map((story) => (
          <motion.div
            key={story._id}
            className="bg-white text-gray-900 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Couple Image */}
            <div className="flex justify-center mb-6">
              <img
                src={story.coupleImageLink}
                alt="Couple"
                className="rounded-full w-32 h-32 object-cover border-4 border-teal-500 shadow-lg"
              />
            </div>

            {/* Story Content */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-teal-700 mb-2">
                Biodata IDs: {story.selfBiodataId} & {story.partnerBiodataId}
              </h3>
              <p className="text-gray-700 text-lg italic mb-4">"{story.successStory}"</p>
              <p className="text-sm text-gray-500">
                Shared on: {new Date(story.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Decorative Element */}
            <div className="mt-6 text-center">
              <motion.div
                className="h-1 w-16 bg-teal-500 mx-auto rounded"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStory;
