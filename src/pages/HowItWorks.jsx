import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    id: 1,
    title: "Create Your Profile",
    description: "Sign up and create your detailed profile to help others know you better.",
    icon: "https://img.freepik.com/free-photo/sign-up-form-button-graphic-concept_53876-133556.jpg?semt=ais_hybrid",
  },
  {
    id: 2,
    title: "Search & Connect",
    description: "Browse through profiles and connect with individuals who share your vision.",
    icon: "https://media.istockphoto.com/id/1450058572/photo/businessman-using-a-laptop-and-touching-on-virtual-screen-contact-icons-consists-of-telephone.jpg?s=612x612&w=0&k=20&c=R5wzCGHu6ZS-8EQpJ2Z1tkSbKGGdJH4apVhFM18EXSM=",
  },
  {
    id: 3,
    title: "Build Relationships",
    description: "Engage in meaningful conversations and take the next step toward your future.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBEDx-xpr62DoFv3-_CnBPruXyBh6SBHf7Cw&s",
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-700 text-white py-16 px-6 md:px-16 lg:px-32">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold">
          How <span className="text-yellow-300">It Works</span>
        </h2>
        <p className="text-lg md:text-xl font-light mt-4">
          Finding your life partner is just three steps away.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            className="bg-white text-gray-900 shadow-lg rounded-lg p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: step.id * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={step.icon}
              alt={step.title}
              className="w-28 h-28 mx-auto mb-6 rounded-full"
            />
            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link to={"/register"}>
          <button className="py-3 px-8 bg-yellow-300 text-purple-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300">
          Get Started Now
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
