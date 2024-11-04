import React, { useEffect, useRef, useState } from "react";
import '../../../CSS/Home.css';

export default function IdeaGifts() {
    const [isVisible, setIsVisible] = useState(false);
    const refImage1 = useRef(null);
    const refText1 = useRef(null);
    const refImage2 = useRef(null);
    const refText2 = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const image1 = refImage1.current;
            const text1 = refText1.current;
            const image2 = refImage2.current;
            const text2 = refText2.current;

            if (image1 && text1 && image2 && text2) {
                const rectImage1 = image1.getBoundingClientRect();
                const rectText1 = text1.getBoundingClientRect();
                const rectImage2 = image2.getBoundingClientRect();
                const rectText2 = text2.getBoundingClientRect();

                const isImage1Visible = rectImage1.bottom < window.innerHeight && rectImage1.bottom > 0;
                const isText1Visible = rectText1.bottom < window.innerHeight && rectText1.bottom > 0;
                const isImage2Visible = rectImage2.bottom < window.innerHeight && rectImage2.bottom > 0;
                const isText2Visible = rectText2.bottom < window.innerHeight && rectText2.bottom > 0;

                if (isImage1Visible && isText1Visible) {
                    setIsVisible(true);
                }
                if (isImage2Visible && isText2Visible) {
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
        <div id="ItemsGiftsBackground" className="w-full min-h-[900px] flex justify-center items-center bg-white">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
                {/* الصورة الأولى */}
                <div ref={refImage1} className={`flex justify-center items-center h-full mb-10 md:mb-0 transition-transform duration-500 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                    <img
                        src="https://www.botanicadayspa.com/wp/wp-content/uploads/2016/12/spa-membership.jpg"
                        alt="Gift Image"
                        className="w-3/4 h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 md:skew-y-6"
                    />
                </div>

                {/* النص الأول */}
                <div ref={refText1} className={`flex flex-col justify-center items-start h-full p-4 mb-10 md:mb-0 text-center md:text-left transition-transform duration-500 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
                    <h4 className="text-4xl text-gray-800 font-bold mb-3">Choose your gift</h4>
                    <p className="text-lg text-gray-600 mb-4">
                        We will help you choose your special gift from our wonderful products that satisfy every woman and man.
                    </p>
                </div>

                {/* الصورة الثانية */}
                <div ref={refImage2} className={`flex justify-center items-center h-full mb-10 md:mb-0 transition-transform duration-500 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                    <img
                        src="https://th.bing.com/th/id/R.f6f42de24272ffcfc89835dd15572c1d?rik=XxajxDyU0aY4mQ&pid=ImgRaw&r=0"
                        alt="Gift Image"
                        className="w-3/4 h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 md:-skew-y-6"
                    />
                </div>

                {/* النص الثاني */}
                <div ref={refText2} className={`flex flex-col justify-center items-start h-full p-4 text-center md:text-left transition-transform duration-500 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
                    <h4 className="text-4xl text-gray-800 font-bold mb-3">By the way</h4>
                    <p className="text-lg text-gray-600 mb-4">
                        Opens the doors to her magnificent universe, filled with gift ideas and essential beauty products. Go in search of the latest novelties and find your best-sellers. We refine our look with a touch of fragrance. Eau de parfum or eau de toilette, we shop our favorite women's perfume and pamper Monsieur with his unique men's perfume.
                    </p>
                </div>
            </div>
        </div>
    );
}
