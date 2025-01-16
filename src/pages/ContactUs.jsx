import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Display sweet alert
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for reaching out. We will get back to you shortly.",
      confirmButtonColor: "#6B46C1", // Matches the purple theme
    });

    // Reset the form after submission
    e.target.reset();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white my-20 py-16 px-6 md:px-16 lg:px-32">
      <div className="flex justify-center">
        <img
          src="https://i.ibb.co/kKVs0Rx/Screenshot-2025-01-16-180017.png"
          alt="Logo"
          className="w-20"
        />
      </div>

      {/* Header Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Contact <span className="text-yellow-300">Us</span>
        </h1>
        <p className="text-lg md:text-xl font-light">
          Have questions? We’re here to help! Send us a message, and we’ll get
          back to you as soon as possible.
        </p>
      </motion.div>

      {/* Form Section */}
      <motion.div
        className="bg-white text-gray-800 shadow-lg rounded-lg p-8 max-w-3xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-lg font-semibold mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-lg font-semibold mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Write your message here..."
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-3 bg-yellow-300 text-purple-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>

      {/* Footer Section */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="text-lg font-light">
          You can also email us directly at{" "}
          <a
            href="mailto:support@soulink.com"
            className="text-yellow-300 font-bold hover:underline"
          >
            support@soulink.com
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default ContactUs;
