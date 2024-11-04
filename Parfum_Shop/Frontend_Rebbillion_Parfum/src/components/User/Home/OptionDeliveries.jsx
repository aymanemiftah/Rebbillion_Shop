import React, { useState } from "react";
import { IoGiftSharp } from "react-icons/io5";
import { TbHeadphones } from "react-icons/tb";
import { FaHandHolding } from "react-icons/fa6";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import '../../../CSS/Home.css';

const options = [
    {
        key:1,
        icon: <IoGiftSharp className="h-16 w-16 text-black" />,
        title: "FAST SHIPPING IS FREE"
    },
    {
        key:2,
        icon: <TbHeadphones className="h-16 w-16 text-black" />,
        title: "24/7 Support"
    },
    {
        key:3,
        icon: <FaHandHolding className="h-16 w-16 text-black" />,
        title: "Professional Handling"
    },
];

export default function OptionDeliveries() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + options.length) % options.length);
    };

    return (
        <div id="Divgen" className="w-full max-h-[300px] min-h-[300px] flex flex-col items-center  p-8">
            <div className={`hidden custom:flex w-full justify-around items-center {}`}>
                {options.map((option, index) => (
                    <div  key={index} className={`flex flex-col items-center min-h-[250px] min-w-[300px] rounded-xl  ${option.key === 1 ? 'bg-white' : option.key === 2 ? '' :'bg-[#c3eae1] ' } `}>
                        <div className="flex justify-center items-center h-24 w-24 rounded-full bg-slate-300 mt-5">
                            {option.icon}
                        </div>
                        <h4  className={`text-2xl font-bold mt-5 `}>{option.title}</h4>
                    </div>
                ))}
            </div>

            {/* واجهة swipe للشاشات الصغيرة */}
            <div className="custom:hidden flex w-full justify-between items-center">
                <button onClick={handlePrev} className="p-2">
                    <AiOutlineLeft className="h-8 w-8 text-black" />
                </button>

                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex flex-row justify-center items-center">
                        <div className="flex flex-col items-center transition-opacity">
                            <div className={`flex justify-center items-center h-24 w-24 rounded-full bg-slate-300`}>
                                {options[currentIndex].icon}
                            </div>
                            <h4 className="text-2xl font-bold mt-5">{options[currentIndex].title}</h4>
                        </div>
                    </div>
                </div>

                <button onClick={handleNext} className="p-2">
                    <AiOutlineRight className="h-8 w-8 text-black" />
                </button>
            </div>
        </div>
    );
}
