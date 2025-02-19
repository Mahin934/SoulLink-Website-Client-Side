import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Fade } from "react-awesome-reveal"; // Importing the Fade animation

const Banner = () => {
    return (
        <div className="w-full bg-gradient-to-b from-pink-100 via-white to-purple-50 my-5">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="h-[500px] rounded-lg shadow-lg"
            >
                {/* Slide 1 */}
                <SwiperSlide className="relative">
                    <img
                        src="https://i.ibb.co.com/YBhzdWkm/bnr1.jpg"
                        alt="SoulLink: Find Your Match"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-6 text-center">
                        <Fade bottom>
                            <h1 className="text-4xl font-bold">Your Journey to Love Starts Here</h1>
                        </Fade>
                        <Fade bottom delay={200}>
                            <p className="mt-4 text-lg">
                                Explore SoulLink to connect with genuine individuals searching for meaningful relationships.
                            </p>
                        </Fade>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide className="relative">
                    <img
                        src="https://i.ibb.co.com/NgkwzTBG/3450.jpg"
                        alt="SoulLink: Personalized Matches"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-6 text-center">
                        <Fade bottom>
                            <h1 className="text-4xl font-bold">Find Your Perfect Partner</h1>
                        </Fade>
                        <Fade bottom delay={200}>
                            <p className="mt-4 text-lg">
                                Let SoulLink's intelligent matching system help you discover your ideal life partner.
                            </p>
                        </Fade>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide className="relative">
                    <img
                        src="https://i.ibb.co.com/qM0dxg8T/bnr3.jpg"
                        alt="SoulLink: Celebrate Love"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-6 text-center">
                        <Fade bottom>
                            <h1 className="text-4xl font-bold">Celebrate the Bond of Love</h1>
                        </Fade>
                        <Fade bottom delay={200}>
                            <p className="mt-4 text-lg">
                                Join thousands of couples who found love and companionship through SoulLink.
                            </p>
                        </Fade>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
