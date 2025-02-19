import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import loginLottie from "../assets/lottie/login.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import { DarkModeContext } from "../providers/DarkModeProvider";


const Login = () => {
    const { darkMode } = useContext(DarkModeContext); // Get dark mode state from context
    const { userLogin, setUser, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(""); // For forgot-password link

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");

        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success("Login successful!", {
                    position: "top-right",
                    autoClose: 2000,
                });
                navigate(location?.state || "/");
            })
            .catch((error) => {
                toast.error(`Login failed: ${error.message}`, {
                    position: "top-center",
                    autoClose: 2000,
                });
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success("Google login successful!", {
                    position: "top-right",
                    autoClose: 2000,
                });
                navigate(location?.state || "/");
            })
            .catch((error) => {
                toast.error(`Google login failed: ${error.message}`, {
                    position: "top-center",
                    autoClose: 2000,
                });
            });
    };

    return (
        <div className={`flex flex-col md:flex-row items-center justify-center py-20 gap-10 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <Helmet>
                <title>SoulLink | Login</title>
            </Helmet>
            <div className={`flex justify-center py-28 ${darkMode ? 'text-white' : 'text-black'}`}>
                <div className={`card w-full max-w-sm shrink-0 shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-base-100'}`}>
                    <h1 className={`text-center text-2xl pt-8 font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                        Login to your account
                    </h1>
                    <div className="divider px-8 mb-0"></div>
                    <form onSubmit={handleSubmit} className="card-body">
                        {/* Email input */}
                        <div className="form-control">
                            <label className={`label ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <span className="label-text font-bold">Email address</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                className={`input input-bordered ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* Password input with toggle */}
                        <div className="form-control">
                            <label className={`label ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className={`input input-bordered w-full pr-10 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                                    required
                                />
                                <span
                                    className="absolute top-4 right-3 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <label className="label">
                                <Link
                                    to={`/forgot-password?email=${email}`}
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </Link>
                            </label>
                        </div>

                        {/* Submit button */}
                        <div className="form-control mt-6">
                            <button className={`btn ${darkMode ? 'bg-gray-600' : 'bg-[#403F3F]'} text-white`}>
                                Login
                            </button>
                        </div>

                        {/* Google Login Button */}
                        <div className="form-control mt-4">
                            <button
                                type="button"
                                className={`btn ${darkMode ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
                                onClick={handleGoogleLogin}
                            >
                                Login with Google
                            </button>
                        </div>

                        <p className={`text-center pt-4 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Don’t Have An Account?{" "}
                            <Link className={`text-red-500 ${darkMode ? 'hover:text-red-300' : 'hover:text-red-700'}`} to="/register">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Toast Container */}
                <ToastContainer />
            </div>
            {/* Lottie Animation */}
            <div className="w-full md:w-1/2 flex justify-center">
                <Lottie animationData={loginLottie} style={{ maxWidth: "500px" }} />
            </div>
        </div>
    );
};

export default Login;
