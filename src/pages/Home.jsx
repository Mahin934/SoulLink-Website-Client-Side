import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import PremiumCards from "./PremiumCards";
import HowItWorks from "./HowItWorks";
import SuccessCounter from "./SuccessCounter";
import SuccessStory from "./SuccessStory";
import MembershipBenefits from "./MembershipBenefits";
import UserReviews from "./UserReviews";
import Safety from "./Safety";


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
            <div className="py-16">
                <SuccessCounter></SuccessCounter>
            </div>
            <div className="py-16">
                <SuccessStory></SuccessStory>
            </div>
            <div className="py-16">
                <MembershipBenefits></MembershipBenefits>
            </div>
            <div className="py-16">
                <UserReviews></UserReviews>
            </div>
            <div className="py-16">
                <Safety></Safety>
            </div>
        </div>
    );
};

export default Home;