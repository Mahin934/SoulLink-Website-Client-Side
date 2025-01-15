import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Biodatas = () => {
    const allBiodatas = useLoaderData(); // Load biodata from the server
    const [biodatas, setBiodatas] = useState(allBiodatas.slice(0, 20)); // Initially show 20 biodatas
    const [filters, setFilters] = useState({
        ageRange: [18, 60], // Default age range
        type: "all", // Default type (all)
        division: "all", // Default division (all)
    });

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        // Update filters based on input type
        setFilters((prev) => ({
            ...prev,
            [name]: name === "ageRange" ? value.split(",").map(Number) : value,
        }));
    };

    // Apply Filters automatically when filters change
    useEffect(() => {
        const { ageRange, type, division } = filters;

        // Filter logic
        const filtered = allBiodatas.filter((biodata) => {
            const ageMatch = biodata.age >= ageRange[0] && biodata.age <= ageRange[1];
            const typeMatch = type === "all" || biodata.biodataType === type; // Changed biodataType to biodataType
            const divisionMatch = division === "all" || biodata.permanentDivision === division; // Changed division to permanentDivision

            return ageMatch && typeMatch && divisionMatch;
        });

        setBiodatas(filtered.slice(0, 20)); // Show only 20 filtered biodatas
    }, [filters, allBiodatas]); // Re-run effect whenever filters change

    return (
        <div className="container mx-auto my-10 flex gap-8">
            <Helmet>
                <title>SoulLink | Biodatas</title>
            </Helmet>
            {/* Filter Section */}
            <div className="w-1/4 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>

                {/* Age Range Filter */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Age Range</label>
                    <input
                        type="range"
                        name="ageRange"
                        min="18"
                        max="60"
                        step="1"
                        value={filters.ageRange.join(",")}
                        onChange={(e) => {
                            const value = [Number(e.target.value), filters.ageRange[1]];
                            setFilters((prev) => ({ ...prev, ageRange: value }));
                        }}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm mt-1">
                        <span>{filters.ageRange[0]}</span>
                        <span>{filters.ageRange[1]}</span>
                    </div>
                </div>

                {/* Biodata Type Filter */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Biodata Type</label>
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="all">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                {/* Division Filter */}
                <div>
                    <label className="block font-semibold mb-2">Division</label>
                    <select
                        name="division"
                        value={filters.division}
                        onChange={handleFilterChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="all">All Divisions</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattagra">Chattagra</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                </div>
            </div>

            {/* Biodatas Section */}
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {biodatas.map((biodata, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                    >
                        <img
                            src={biodata.profileImage || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mb-4 object-cover"
                        />
                        <h3 className="font-bold text-lg">{biodata.biodataType}</h3> {/* Changed biodataType to biodataType */}
                        <p className="text-gray-600 text-sm">
                            <strong>Biodata ID:</strong> {biodata.biodataId} {/* Changed biodataId to biodataId */}
                        </p>
                        <p className="text-gray-600 text-sm">
                            <strong>Division:</strong> {biodata.permanentDivision} {/* Changed division to permanentDivision */}
                        </p>
                        <p className="text-gray-600 text-sm">
                            <strong>Age:</strong> {biodata.age}
                        </p>
                        <p className="text-gray-600 text-sm">
                            <strong>Occupation:</strong> {biodata.occupation}
                        </p>
                        <Link
                            to={`/bioDetails/${biodata._id}`} // Updated ID reference
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            View Profile
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Biodatas;
