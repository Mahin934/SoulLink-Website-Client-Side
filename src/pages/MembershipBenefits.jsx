import React from "react";
import { motion } from "framer-motion";

const MembershipBenefits = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-teal-500 py-16 px-6 md:px-16 lg:px-32">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Membership <span className="text-blue-600">Plans & Benefits</span>
        </h2>
        <p className="text-lg md:text-xl font-light mt-4 text-gray-700">
          Unlock exclusive features with our Premium Membership!
        </p>
      </motion.div>

      <div className="flex justify-center ">
        <motion.div
          className="bg-white text-gray-900 shadow-lg rounded-lg p-8 max-w-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-3xl font-extrabold mb-4 text-blue-600">
            Premium Plan
          </h3>
          <p className="text-lg font-semibold text-gray-800 mb-4">
            10$ - Unlock Exclusive Features!
          </p>
          <ul className="text-left text-gray-700 space-y-3">
            <li>✅ View and send unlimited messages</li>
            <li>✅ Access exclusive premium profiles</li>
            <li>✅ Higher visibility in search results</li>
            <li>✅ Personalized matchmaking support</li>
            <li>✅ Direct contact with verified users</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default MembershipBenefits;
