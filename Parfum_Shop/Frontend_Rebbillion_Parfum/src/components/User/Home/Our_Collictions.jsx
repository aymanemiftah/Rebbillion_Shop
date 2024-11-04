import React, { useEffect, useRef, useState } from "react";
import '../../../CSS/Home.css';

export default function OurCollections() {
    const [isVisible, setIsVisible] = useState(false);
    const refWomen = useRef(null);
    const refMen = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const women = refWomen.current;
            const men = refMen.current;
            if (women && men) {
                const rectWomen = women.getBoundingClientRect();
                const rectMen = men.getBoundingClientRect();
                const isWomenVisible = rectWomen.bottom < window.innerHeight && rectWomen.bottom > 0;
                const isMenVisible = rectMen.bottom < window.innerHeight && rectMen.bottom > 0;

                if (isWomenVisible || isMenVisible) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div id="customBackground" className="w-full min-h-[650px] max-h-[650px] md:min-h-[850px] md:max-h-[850px] xl:min-h-[600px] xl:max-h-[600px] bg-[#c3eae1] sm:bg-white flex flex-col items-center">
            <h4 className="text-2xl sm:text-4xl text-gray-800 font-bold mt-16">OUR COLLECTIONS</h4>
            <div className="w-3/4 mt-14 grid grid-cols-1 custom-lg:grid-cols-2 gap-7">
            <a
                ref={refWomen}
                href={`/Products/Men-Products?search=${'Women'}`}
                className={`relative bg-white border border-gray-200 rounded-lg shadow-sm shadow-gray-600 transition-transform duration-300 hover:scale-105 hover:shadow-md hover:shadow-blue-300 min-h-[20vh] max-h-[30vh] custom-lg:max-h-[40vh] custom-lg:min-h-[40vh] dark:border-white dark:bg-white mx-lg:w-full overflow-hidden flex items-center justify-center transform ${isVisible ? 'animateslide-in-right' : 'opacity-0'}`}
            >
                <div className="absolute inset-0 bg-black ">
                <img
                src="https://img.freepik.com/premium-photo/portrait-person_970765-7253.jpg"
                alt="Women Perfumes"
                className="w-full absolute opacity-70 inset-0 bg-black h-full object-cover transition-transform duration-1000 hover:scale-125"
                 />
                </div>
                 <span className="absolute text-white text-xl sm:text-3xl font-bold z-10">WOMEN PERFUMES</span>
            
            
            </a>
            <a
                ref={refMen}
                href={`/Products/Men-Products?search=${'Men'}`}
                className={`relative bg-white border border-gray-200 rounded-lg shadow-sm shadow-gray-600 transition-transform duration-300 hover:scale-105 hover:shadow-md hover:shadow-blue-300 min-h-[20vh] max-h-[30vh] custom-lg:max-h-[40vh] custom-lg:min-h-[40vh] dark:border-white dark:bg-white mx-lg:w-full overflow-hidden flex items-center justify-center transform ${isVisible ? 'animateslide-in-left' : 'opacity-0'}`}
            >
                
                <div className="absolute inset-0 bg-black ">
                <img
                 src="https://th.bing.com/th/id/OIP.ODXrt-XtKHtjmOzjaCFaZAHaD4?w=1200&h=628&rs=1&pid=ImgDetMain"
                alt="Women Perfumes"
                className="w-full absolute opacity-70 inset-0 bg-black h-full object-cover transition-transform duration-1000 hover:scale-125"
                 />
                </div>
                 <span className="absolute text-white text-xl sm:text-3xl font-bold z-10">MEN PERFUMES</span>
                
            </a>
    </div>
        </div>
    );
}
