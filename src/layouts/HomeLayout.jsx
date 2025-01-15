import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";



const HomeLayout = () => {
    return (
        <div className='md:container mx-auto'>
            <Helmet>
                <title>SoulLink | Home</title>
            </Helmet>
            <NavBar></NavBar>
            <div className="mt-10 md:mt-24">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;