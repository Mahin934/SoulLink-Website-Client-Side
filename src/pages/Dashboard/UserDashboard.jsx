import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2"; 
import SectionTitle from "../SectionTitle";
import { DarkModeContext } from "../../providers/DarkModeProvider";

const UserDashboard = () => {
    const { darkMode } = useContext(DarkModeContext); // Access darkMode context
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const formData = {
            selfBiodataId: data.selfBiodataId,
            partnerBiodataId: data.partnerBiodataId,
            successStory: data.successStory,
            coupleImageLink: data.coupleImageLink, 
        };

        try {
            const response = await fetch("https://soul-link-server.vercel.app/successes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // success SweetAlert
                Swal.fire({
                    icon: "success",
                    title: "Form submitted successfully!",
                    text: "Thank you for sharing your success story!",
                });
                reset(); 
            } else {
                // error SweetAlert
                Swal.fire({
                    icon: "error",
                    title: "Failed to submit the form.",
                    text: "Please try again later.",
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            //error SweetAlert
            Swal.fire({
                icon: "error",
                title: "An error occurred.",
                text: "There was an error while submitting the form. Please try again.",
            });
        }
    };

    return (
        <div className={`got-married-form container mx-auto px-4 py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="text-center rounded-b-lg">
                <SectionTitle heading="Got Married" subHeading="Successes" />
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`p-6 rounded-lg shadow-md max-w-lg mx-auto ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
            >
                {/* Self Biodata ID */}
                <div className="mb-4">
                    <label htmlFor="selfBiodataId" className={`block text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        Self Biodata ID
                    </label>
                    <input
                        type="text"
                        id="selfBiodataId"
                        {...register("selfBiodataId", { required: true })}
                        className={`w-full border rounded px-3 py-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
                        placeholder="Enter your Biodata ID"
                    />
                </div>

                {/* Partner Biodata ID */}
                <div className="mb-4">
                    <label htmlFor="partnerBiodataId" className={`block text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        Partner Biodata ID
                    </label>
                    <input
                        type="text"
                        id="partnerBiodataId"
                        {...register("partnerBiodataId", { required: true })}
                        className={`w-full border rounded px-3 py-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
                        placeholder="Enter partner's Biodata ID"
                    />
                </div>

                {/* Couple Image Link */}
                <div className="mb-4">
                    <label htmlFor="coupleImageLink" className={`block text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        Couple Image Link
                    </label>
                    <input
                        type="text"
                        id="coupleImageLink"
                        {...register("coupleImageLink", { required: true })}
                        className={`w-full border rounded px-3 py-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
                        placeholder="Enter image link"
                    />
                </div>

                {/* Success Story Review */}
                <div className="mb-4">
                    <label htmlFor="successStory" className={`block text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        Success Story Review
                    </label>
                    <textarea
                        id="successStory"
                        {...register("successStory", { required: true })}
                        className={`w-full border rounded px-3 py-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
                        placeholder="Share your feelings about using this website..."
                        rows="4"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white font-semibold px-6 py-2 rounded shadow hover:bg-blue-600 transition ${darkMode ? 'hover:bg-blue-700' : ''}`}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserDashboard;
