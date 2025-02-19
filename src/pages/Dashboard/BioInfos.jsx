import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form'; // For easier form handling
import Swal from 'sweetalert2'; // Import SweetAlert
import { DarkModeContext } from '../../providers/DarkModeProvider';


const BioInfos = () => {
    const { user } = useContext(AuthContext); // Get logged-in user
    const { darkMode } = useContext(DarkModeContext); // Get dark mode status
    const [biodata, setBiodata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const navigate = useNavigate();

    // Form handling using react-hook-form
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchBiodata = async () => {
            try {
                const response = await axios.get('https://soul-link-server.vercel.app/biodata');
                const userBiodata = response.data.find(data => data.contactEmail === user?.email);

                if (userBiodata) {
                    setBiodata(userBiodata);
                } else {
                    setError('No biodata found for the logged-in user.');
                }
            } catch (err) {
                console.error('Error fetching biodata:', err);
                setError('Failed to fetch biodata.');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchBiodata();
        }
    }, [user]);

    // Open and close modal functions
    const handleUpdate = () => {
        reset(biodata); // Reset the form with current biodata
        setIsModalOpen(true); // Open modal
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // Close modal
    };

    const refetchBiodata = async () => {
        try {
            const response = await axios.get('https://soul-link-server.vercel.app/biodata');
            const updatedBiodata = response.data.find(data => data.contactEmail === user?.email);
            setBiodata(updatedBiodata); // Set the updated data
        } catch (error) {
            console.error('Error refetching biodata:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`https://soul-link-server.vercel.app/biodata/${biodata._id}`, data);
            console.log('Updated Biodata:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Biodata Updated!',
                text: 'Your biodata has been successfully updated.',
            });
            setIsModalOpen(false); // Close modal after successful update
            refetchBiodata(); // Refetch biodata to show updated data immediately
        } catch (error) {
            console.error('Error updating biodata:', error);
            setError('Failed to update biodata.');
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'There was an error updating your biodata.',
            });
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!biodata) {
        return <p>No biodata available.</p>;
    }

    return (
        <div className={`container mx-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <button
                onClick={handleUpdate}
                className={`flex items-center gap-2 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded`}
            >
                <FaEdit />
                Update Biodata
            </button>

            {/* Modal Component */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className={`bg-white p-6 rounded-md w-11/12 max-w-lg ${darkMode ? 'bg-gray-800' : ''}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Update Your Biodata</h2>
                            <button
                                onClick={handleModalClose}
                                className={`text-gray-500 text-2xl hover:text-gray-700 transition duration-200 ${darkMode ? 'text-white' : 'text-black'}`}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className={`block font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Name</label>
                                <input
                                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 text-black'}`}
                                    type="text"
                                    defaultValue={biodata.name}
                                    {...register('name')}
                                />
                            </div>
                            <div className="mb-4">
                                <label className={`block font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Biodata Type</label>
                                <input
                                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 text-black'}`}
                                    type="text"
                                    defaultValue={biodata.biodataType}
                                    {...register('biodataType')}
                                />
                            </div>
                            <div className="mb-4">
                                <label className={`block font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Date of Birth</label>
                                <input
                                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 text-black'}`}
                                    type="date"
                                    defaultValue={biodata.dob}
                                    {...register('dob')}
                                />
                            </div>
                            <div className="mb-4">
                                <label className={`block font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Height</label>
                                <input
                                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 text-black'}`}
                                    type="text"
                                    defaultValue={biodata.height}
                                    {...register('height')}
                                />
                            </div>
                            <div className="mb-4">
                                <label className={`block font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Weight</label>
                                <input
                                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 text-black'}`}
                                    type="text"
                                    defaultValue={biodata.weight}
                                    {...register('weight')}
                                />
                            </div>
                            <div className="mb-4">
                                <label className={`block font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Occupation</label>
                                <input
                                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 text-black'}`}
                                    type="text"
                                    defaultValue={biodata.occupation}
                                    {...register('occupation')}
                                />
                            </div>
                            <div className="mb-4">
                                <label className={`block font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Contact Email</label>
                                <input
                                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 text-black'}`}
                                    type="email"
                                    defaultValue={biodata.contactEmail}
                                    {...register('contactEmail')}
                                />
                            </div>
                            <div className="mb-4">
                                <label className={`block font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Mobile Number</label>
                                <input
                                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 text-black'}`}
                                    type="text"
                                    defaultValue={biodata.mobileNumber}
                                    {...register('mobileNumber')}
                                />
                            </div>
                            <div className="mb-4">
                                <button
                                    type="submit"
                                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BioInfos;
