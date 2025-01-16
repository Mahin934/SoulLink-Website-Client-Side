import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import PremiumCards from "./PremiumCards";
import HowItWorks from "./HowItWorks";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SoulLink | Home</title>
            </Helmet>
            <div>
                <Banner></Banner>
            </div>
            <div>
                <PremiumCards></PremiumCards>
            </div>
            <div className="py-16">
                <HowItWorks></HowItWorks>
            </div>
        </div>
    );
};

export default Home;