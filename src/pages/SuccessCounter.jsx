import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SuccessCounter = () => {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [marriagesCount, setMarriagesCount] = useState(0);

  // Fetching biodata and success data from the API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch biodata
        const biodataResponse = await fetch("https://soul-link-server.vercel.app/biodata");
        const biodata = await biodataResponse.json();

        // Count males and females
        const maleBiodatas = biodata.filter(bio => bio.biodataType === "Male");
        const femaleBiodatas = biodata.filter(bio => bio.biodataType === "Female");

        setMaleCount(maleBiodatas.length);
        setFemaleCount(femaleBiodatas.length);

        // Fetch successes
        const successesResponse = await fetch("https://soul-link-server.vercel.app/successes");
        const successes = await successesResponse.json();

        setMarriagesCount(successes.length); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-700 rounded-lg text-white py-16 px-6 md:px-16 lg:px-32">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Our <span className="text-yellow-300">Success</span>
        </h2>
        <p className="text-lg md:text-xl font-light mt-4">
          See how many people have connected and found their perfect match on SoulLink!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Male Count */}
        <motion.div
          className="bg-white text-gray-900 shadow-lg rounded-lg p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-4xl font-extrabold mb-4">{maleCount}</h3>
          <p className="text-lg font-semibold">Male Biodatas</p>
        </motion.div>

        {/* Female Count */}
        <motion.div
          className="bg-white text-gray-900 shadow-lg rounded-lg p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-4xl font-extrabold mb-4">{femaleCount}</h3>
          <p className="text-lg font-semibold">Female Biodatas</p>
        </motion.div>

        {/* Marriages Count */}
        <motion.div
          className="bg-white text-gray-900 shadow-lg rounded-lg p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-4xl font-extrabold mb-4">{marriagesCount}</h3>
          <p className="text-lg font-semibold">Successful Marriages</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessCounter;
