import React, { useContext, useState, useEffect } from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import ProductsCard from "../ProductsCard/ProductsCard";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function ProductsSwipe(props) {
    const { productsall = [] } = useContext(DonnerContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [optionsCount, setOptionsCount] = useState(4); // عدد المنتجات المراد عرضها

    const totalProducts = productsall.filter((product) => product.category === props.category || product.sexe === props.sexe && product.solde != 0 && product.stock != 0 );
    const maxIndex = totalProducts.length;

    const handleNext = () => {
        if (currentIndex + optionsCount >= maxIndex) {
            setCurrentIndex(0); // إذا وصلنا للحد الأقصى، نعيد إلى البداية
        } else {
            setCurrentIndex((prevIndex) => prevIndex + 1); // انتقل لمنتج واحد
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(maxIndex - optionsCount); // إذا كنا في البداية، نذهب إلى النهاية
        } else {
            setCurrentIndex((prevIndex) => prevIndex - 1); // انتقل لمنتج واحد للخلف
        }
    };

    const updateOptionsCount = () => {
        const width = window.innerWidth;

        if (width >= 1264) {
            setOptionsCount(4); // شاشة كبيرة
        } else if (width >= 951) {
            setOptionsCount(3); // شاشة متوسطة
        } else  if (width >= 639){
            setOptionsCount(2); // شاشة صغيرة
        }else{
            setOptionsCount(1);
        }
    };

    useEffect(() => {
        updateOptionsCount(); // تعيين عدد الخيارات عند تحميل المكون
        window.addEventListener("resize", updateOptionsCount); // تحديث عدد الخيارات عند تغيير حجم الشاشة

        return () => {
            window.removeEventListener("resize", updateOptionsCount); // تنظيف
        };
    }, []);

    return (
        <div className="w-full min-h-[400px] flex flex-col items-center">
            <div className=" w-4/5 flex items-center justify-between mt-11">
            <h4 className="text-xl sm:text-3xl text-gray-800 font-bold ">{props.title}</h4>
            {props.link ? 
            <a href={props.link} className="text-base  sm:text-xl underline">Show All Products</a> :
             ''}
            
            </div>
            <div className="w-full relative mt-16 "  >
                {/* واجهة عرض المنتجات */}
                <div className="flex justify-center " 
                     >
                    {totalProducts
                        .slice(currentIndex, currentIndex + optionsCount) // عرض المنتجات حسب الخيارات
                        .map((product) => (
                            <div key={product.id} className="flex justify-center mx-2 " >
                                <ProductsCard
                                    id={product.id}
                                    image={product?.image}
                                    name={product?.name}
                                    description={product?.description}
                                    price={product?.price}
                                    last_price={product?.last_price}
                                    solde={product?.solde}
                                    stock={product?.stock}
                                    brands={product?.brands}
                                />
                            </div>
                        ))}
                </div>
                {/* أزرار التنقل */}
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow"
                    onClick={handlePrev}
                >
                    <AiOutlineLeft className="h-8 w-8 text-black" />
                </button>
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow"
                    onClick={handleNext}
                >
                    <AiOutlineRight className="h-8 w-8 text-black" />
                </button>
            </div>
        </div>
    );
}
