import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Biodatas = () => {
    const allBiodatas = useLoaderData(); 
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 6; 
    const totalPages = Math.ceil(allBiodatas.length / itemsPerPage); 

    const [filters, setFilters] = useState({
        ageRange: [18, 60], 
        type: "all", 
        division: "all", 
    });

    const [filteredBiodatas, setFilteredBiodatas] = useState(allBiodatas);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: name === "ageRange" ? value.split(",").map(Number) : value,
        }));
    };

    useEffect(() => {
        const { ageRange, type, division } = filters;
        const filtered = allBiodatas.filter((biodata) => {
            const ageMatch = biodata.age >= ageRange[0] && biodata.age <= ageRange[1];
            const typeMatch = type === "all" || biodata.biodataType === type;
            const divisionMatch = division === "all" || biodata.permanentDivision === division;
            return ageMatch && typeMatch && divisionMatch;
        });

        setFilteredBiodatas(filtered);
        setCurrentPage(1);
    }, [filters, allBiodatas]);

    const handleSortAscending = () => {
        const sorted = [...filteredBiodatas].sort((a, b) => a.age - b.age);
        setFilteredBiodatas(sorted);
    };

    const handleSortDescending = () => {
        const sorted = [...filteredBiodatas].sort((a, b) => b.age - a.age);
        setFilteredBiodatas(sorted);
    };

    const paginatedBiodatas = filteredBiodatas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container mx-auto my-10 flex gap-8">
            <Helmet>
                <title>SoulLink | Biodatas</title>
            </Helmet>

            {/* Sidebar Filters */}
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
                <div className="mb-4">
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

                {/* Sorting Buttons */}
                <div className="mb-4">
                    <button
                        onClick={handleSortAscending}
                        className="w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        Ascending Age
                    </button>
                    <button
                        onClick={handleSortDescending}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        Descending Age
                    </button>
                </div>
            </div>

            {/* Biodata Cards */}
            <div className="w-3/4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedBiodatas.map((biodata, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                        >
                            <img
                                src={biodata.profileImage || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="w-32 h-32 rounded-full mb-4 object-cover"
                            />
                            <h3 className="font-bold text-lg">{biodata.biodataType}</h3>
                            <p className="text-gray-600 text-sm">
                                <strong>Biodata ID:</strong> {biodata.biodataId}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <strong>Division:</strong> {biodata.permanentDivision}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <strong>Age:</strong> {biodata.age}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <strong>Occupation:</strong> {biodata.occupation}
                            </p>
                            <Link
                                to={`/bioDetails/${biodata._id}`}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                View Profile
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className={`px-4 py-2 mr-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${
                            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${
                            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Biodatas;
