import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { DarkModeContext } from "../providers/DarkModeProvider";


const Biodatas = () => {
    const { darkMode } = useContext(DarkModeContext); // Get dark mode state
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
        <div className={`container mx-auto my-10 flex gap-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <Helmet>
                <title>SoulLink | Biodatas</title>
            </Helmet>

            {/* Sidebar Filters */}
            <div className={`w-1/4 p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
                <h2 className="text-xl font-semibold mb-4">Filters</h2>

                {/* Age Range Filter */}
                <div className="mb-4">
                    <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Age Range</label>
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
                        className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                    />
                    <div className={`flex justify-between text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span>{filters.ageRange[0]}</span>
                        <span>{filters.ageRange[1]}</span>
                    </div>
                </div>

                {/* Biodata Type Filter */}
                <div className="mb-4">
                    <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Biodata Type</label>
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-black border-gray-300'}`}
                    >
                        <option value="all">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                {/* Division Filter */}
                <div className="mb-4">
                    <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Division</label>
                    <select
                        name="division"
                        value={filters.division}
                        onChange={handleFilterChange}
                        className={`w-full border rounded-md p-2 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-black border-gray-300'}`}
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
                        className={`w-full mb-2 px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md`}
                    >
                        Ascending Age
                    </button>
                    <button
                        onClick={handleSortDescending}
                        className={`w-full px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md`}
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
                            className={`bg-white rounded-lg shadow-md p-4 flex flex-col items-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                        >
                            <img
                                src={biodata.profileImage || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="w-32 h-32 rounded-full mb-4 object-cover"
                            />
                            <h3 className="font-bold text-lg">{biodata.biodataType}</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <strong>Biodata ID:</strong> {biodata.biodataId}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <strong>Division:</strong> {biodata.permanentDivision}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <strong>Age:</strong> {biodata.age}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <strong>Occupation:</strong> {biodata.occupation}
                            </p>
                            <Link
                                to={`/bioDetails/${biodata._id}`}
                                className={`mt-4 px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md`}
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
                        className={`px-4 py-2 mr-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md`}
                    >
                        Previous
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className={`px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Biodatas;
