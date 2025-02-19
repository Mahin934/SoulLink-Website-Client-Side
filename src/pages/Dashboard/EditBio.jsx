import React, { useState, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import BioInfos from "./BioInfos";
import SectionTitle from "../SectionTitle";
import { DarkModeContext } from "../../providers/DarkModeProvider";


const EditBio = () => {
    const { user } = useContext(AuthContext); // Fetch logged-in user's details
    const { darkMode } = useContext(DarkModeContext); // Access darkMode context
    const axiosSecure = useAxiosSecure(); // Use secure Axios instance
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        biodataType: "",
        name: user?.displayName || "",
        profileImage: "",
        dob: "",
        height: "",
        weight: "",
        age: "",
        occupation: "",
        race: "",
        fatherName: "",
        motherName: "",
        permanentDivision: "",
        presentDivision: "",
        expectedPartnerAge: "",
        expectedPartnerHeight: "",
        expectedPartnerWeight: "",
        contactEmail: user?.email || "",
        mobileNumber: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosSecure.post("/biodata", formData);
            Swal.fire({
                title: 'Biodata Created!',
                text: 'Your biodata has been created successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                // Close modal after showing success message
                setShowModal(false);
            });
        } catch (error) {
            console.error("Error creating biodata:", error.response?.data || error.message);
            Swal.fire({
                title: 'Error',
                text: 'Failed to create biodata. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <div>
                <SectionTitle 
                    heading="Create & Edit Biodata" 
                    subHeading="Update Information"
                />
            </div>
            <h2 className="text-xl text-center mt-32 font-bold mb-4">Create & Edit Biodata</h2>
            <div className="flex gap-4 justify-center">
                <div>
                    <button
                        className={`flex items-center gap-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded`}
                        onClick={() => setShowModal(true)}
                    >
                        <FaPlus />
                        Create Biodata
                    </button>
                </div>
                <div>
                    <BioInfos />
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`bg-white ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} p-6 rounded shadow-lg w-full max-w-3xl`}>
                        <h3 className="text-lg font-bold mb-4">Create Biodata</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className="block">
                                    Biodata Type <span className="text-red-500">*</span>
                                    <select
                                        name="biodataType"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </label>

                                <label className="block">
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        value={user.displayName}
                                        readOnly
                                        className="w-full border p-2 rounded bg-gray-100"
                                    />
                                </label>

                                <label className="block">
                                    Profile Image Link
                                    <input
                                        type="text"
                                        name="profileImage"
                                        className="w-full border p-2 rounded"
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label className="block">
                                    Date of Birth <span className="text-red-500">*</span>
                                    <input
                                        type="date"
                                        name="dob"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>

                                <label className="block">
                                    Height <span className="text-red-500">*</span>
                                    <select
                                        name="height"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="5'0">5'0</option>
                                        <option value="5'2">5'2</option>
                                        <option value="5'4">5'4</option>
                                    </select>
                                </label>

                                <label className="block">
                                    Weight <span className="text-red-500">*</span>
                                    <input
                                        type="number"
                                        name="weight"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>

                                <label className="block">
                                    Age
                                    <input
                                        type="number"
                                        name="age"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label className="block">
                                    Occupation <span className="text-red-500">*</span>
                                    <input
                                        type="text"
                                        name="occupation"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>

                                <label className="block">
                                    Race <span className="text-red-500">*</span>
                                    <select
                                        name="race"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Dark">Dark</option>
                                    </select>
                                </label>

                                <label className="block">
                                    Father's Name
                                    <input
                                        type="text"
                                        name="fatherName"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label className="block">
                                    Mother's Name
                                    <input
                                        type="text"
                                        name="motherName"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label className="block">
                                    Permanent Division <span className="text-red-500">*</span>
                                    <select
                                        name="permanentDivision"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Chattagra">Chattagra</option>
                                        <option value="Rangpur">Rangpur</option>
                                        <option value="Barisal">Barisal</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Mymensingh">Mymensingh</option>
                                        <option value="Sylhet">Sylhet</option>
                                    </select>
                                </label>

                                <label className="block">
                                    Present Division <span className="text-red-500">*</span>
                                    <select
                                        name="presentDivision"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Chattagra">Chattagra</option>
                                        <option value="Rangpur">Rangpur</option>
                                        <option value="Barisal">Barisal</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Mymensingh">Mymensingh</option>
                                        <option value="Sylhet">Sylhet</option>
                                    </select>
                                </label>

                                <label className="block">
                                    Expected Partner Age
                                    <input
                                        type="number"
                                        name="expectedPartnerAge"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label className="block">
                                    Expected Partner Height
                                    <select
                                        name="expectedPartnerHeight"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="5'0">5'0</option>
                                        <option value="5'2">5'2</option>
                                        <option value="5'4">5'4</option>
                                    </select>
                                </label>

                                <label className="block">
                                    Expected Partner Weight
                                    <input
                                        type="number"
                                        name="expectedPartnerWeight"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label className="block">
                                    Contact Email
                                    <input
                                        type="email"
                                        name="contactEmail"
                                        value={user.email}
                                        readOnly
                                        className="w-full border p-2 rounded bg-gray-100"
                                    />
                                </label>

                                <label className="block">
                                    Mobile Number
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        className={`w-full border p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className={`px-4 py-2 ${darkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'} text-white rounded`}
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditBio;
