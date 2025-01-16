import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white my-20 py-16 px-6 md:px-16 lg:px-32">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    About <span className="text-yellow-300">SoulLink</span>
                </h1>
                <p className="text-lg md:text-xl font-light">
                    Where hearts meet, dreams unite, and lifelong connections are built.
                </p>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left Section: Image */}
                <div className="text-center">
                    <img
                        src="https://i.ibb.co.com/kKVs0Rx/Screenshot-2025-01-16-180017.png"
                        alt="SoulLink Community"
                        className="rounded-full shadow-lg w-3/4 mx-auto"
                    />
                </div>

                {/* Right Section: Information */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                    <p className="text-lg leading-relaxed mb-4">
                        At <span className="font-semibold text-yellow-300">SoulLink</span>, we strive to bridge the gap between individuals seeking meaningful, lifelong partnerships. Our platform is dedicated to fostering connections based on shared values, compatibility, and trust.
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Us?</h2>
                    <ul className="list-disc list-inside space-y-3">
                        <li>🔒 <strong>Privacy First</strong>: We prioritize the confidentiality and security of your personal information.</li>
                        <li>❤️ <strong>Compatibility Matching</strong>: Advanced algorithms ensure matches based on what truly matters.</li>
                        <li>🌍 <strong>Global Connections</strong>: Find your soulmate from anywhere in the world.</li>
                    </ul>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="text-center mt-16">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                    Ready to Start Your Journey with <span className="text-yellow-300">SoulLink?</span>
                </h2>
                <p className="text-lg font-light mb-6">
                    Join us today and take the first step towards finding your perfect match.
                </p>
                <Link to={"/biodata"}>
                    <button className="bg-yellow-300 text-purple-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AboutUs;
