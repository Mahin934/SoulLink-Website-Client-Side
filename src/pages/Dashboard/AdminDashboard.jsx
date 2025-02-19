import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts"; // Recharts for the pie chart
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { DarkModeContext } from "../../providers/DarkModeProvider";


const AdminDashboard = () => {
    const { darkMode } = useContext(DarkModeContext); // Get dark mode state
    const [totalBiodata, setTotalBiodata] = useState(0);
    const [maleBiodata, setMaleBiodata] = useState(0);
    const [femaleBiodata, setFemaleBiodata] = useState(0);
    const [premiumBiodataCount, setPremiumBiodataCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch total biodata count
                const biodataResponse = await axiosSecure.get("/biodata");
                const allBiodata = biodataResponse.data;
                setTotalBiodata(allBiodata.length);
                setMaleBiodata(allBiodata.filter((biodata) => biodata.biodataType === "Male").length);
                setFemaleBiodata(allBiodata.filter((biodata) => biodata.biodataType === "Female").length);

                // Fetch premium biodata count
                const premiumResponse = await axiosSecure.get("/premiums");
                const premiumData = premiumResponse.data;
                setPremiumBiodataCount(premiumData.length);

                // Fetch total revenue
                const paymentsResponse = await axiosSecure.get("/payment");
                const paymentsData = paymentsResponse.data;
                const totalRevenueAmount = paymentsData.reduce((total, payment) => total + payment.amount, 0);
                setTotalRevenue(totalRevenueAmount);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error("Payments data not found.");
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, [axiosSecure]);

    // Pie chart data
    const pieData = [
        { name: "Male Biodata", value: maleBiodata },
        { name: "Female Biodata", value: femaleBiodata },
        { name: "Premium Biodata", value: premiumBiodataCount },
    ];

    // Pie chart color palette
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    return (
        <div className={`admin-dashboard container mx-auto py-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <Helmet>
                <title>Admin Dashboard | SoulLink</title>
            </Helmet>
            
            <h1 className={`text-3xl font-semibold text-center mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
                Admin Dashboard
            </h1>

            {/* Pie Chart Section */}
            <div className="pie-chart-container flex justify-center mb-8">
                <PieChart width={300} height={300}>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        fill="#8884d8"
                        label
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </div>

            {/* Dashboard Summary */}
            <div className="summary-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className={`card ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white p-6 rounded-lg shadow-md text-center`}>
                    <h3 className="text-2xl font-semibold">Total Biodata</h3>
                    <p className="text-xl">{totalBiodata}</p>
                </div>
                <div className={`card ${darkMode ? 'bg-green-600' : 'bg-green-500'} text-white p-6 rounded-lg shadow-md text-center`}>
                    <h3 className="text-2xl font-semibold">Male Biodata</h3>
                    <p className="text-xl">{maleBiodata}</p>
                </div>
                <div className={`card ${darkMode ? 'bg-pink-600' : 'bg-pink-500'} text-white p-6 rounded-lg shadow-md text-center`}>
                    <h3 className="text-2xl font-semibold">Female Biodata</h3>
                    <p className="text-xl">{femaleBiodata}</p>
                </div>
                <div className={`card ${darkMode ? 'bg-yellow-600' : 'bg-yellow-500'} text-white p-6 rounded-lg shadow-md text-center`}>
                    <h3 className="text-2xl font-semibold">Premium Biodata</h3>
                    <p className="text-xl">{premiumBiodataCount}</p>
                </div>
            </div>

            {/* Revenue Section */}
            <div className={`revenue-card ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-6 rounded-lg shadow-md mt-8 text-center`}>
                <h3 className="text-2xl font-semibold">Total Revenue</h3>
                <p className="text-xl">${totalRevenue}</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
