import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const AdminProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/biodata")
            .then((res) => res.json())
            .then((data) => {
                const adminData = data.find(user => user._id === "6786291f20cc2d11dcf75ca5");
                setProfile(adminData);
            })
            .catch((error) => console.error("Error fetching profile:", error));
    }, []);

    if (!profile) {
        return <div className="text-center mt-10 text-xl font-semibold text-blue-600">Loading...</div>;
    }

    return (
        <div className="container mx-auto my-10 p-8 bg-gradient-to-r from-blue-500 to-blue-700 shadow-2xl rounded-lg max-w-3xl text-white">
            <Helmet>
                <title>Admin Profile - {profile.name}</title>
            </Helmet>
            <div className="flex flex-col items-center">
                <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <h2 className="text-3xl font-bold mt-4">{profile.name}</h2>
                <p className="text-lg text-gray-200">{profile.occupation}</p>
            </div>
            <div className="mt-6 bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold border-b pb-2">Personal Information</h3>
                <ul className="mt-2 space-y-2">
                    <li><strong>Email:</strong> {profile.contactEmail}</li>
                    <li><strong>Phone:</strong> {profile.mobileNumber}</li>
                    <li><strong>Age:</strong> {profile.age}</li>
                    <li><strong>Date of Birth:</strong> {profile.dob}</li>
                    <li><strong>Height:</strong> {profile.height}</li>
                    <li><strong>Weight:</strong> {profile.weight}</li>
                    <li><strong>Race:</strong> {profile.race}</li>
                </ul>
            </div>
            <div className="mt-6 bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold border-b pb-2">Address</h3>
                <ul className="mt-2 space-y-2">
                    <li><strong>Permanent Division:</strong> {profile.permanentDivision}</li>
                    <li><strong>Present Division:</strong> {profile.presentDivision}</li>
                </ul>
            </div>
            <div className="mt-6 bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold border-b pb-2">Family Details</h3>
                <ul className="mt-2 space-y-2">
                    <li><strong>Father's Name:</strong> {profile.fatherName}</li>
                    <li><strong>Mother's Name:</strong> {profile.motherName}</li>
                </ul>
            </div>
            <div className="mt-6 bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold border-b pb-2">Partner Preferences</h3>
                <ul className="mt-2 space-y-2">
                    <li><strong>Expected Partner Age:</strong> {profile.expectedPartnerAge}</li>
                    <li><strong>Expected Partner Height:</strong> {profile.expectedPartnerHeight}</li>
                    <li><strong>Expected Partner Weight:</strong> {profile.expectedPartnerWeight}</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminProfile;
