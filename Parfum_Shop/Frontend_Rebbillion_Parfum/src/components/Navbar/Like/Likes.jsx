import React, { useContext, useEffect, useState, useRef } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import ProductCartLike from "./ProductCardLike";
import { motion, AnimatePresence } from "framer-motion";


export default function LikesProducts() {
    const [isOpen, setIsOpen] = useState(false);
    const { productsall = [], likedProducts } = useContext(DonnerContext);
    const divRef = useRef(null);
   
   

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <button onClick={toggleOpen} className="text-2xl">
                <FaRegHeart />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={divRef}
                        initial={{ opacity: 0, y: -20 }} // الحركة عند الفتح
                        animate={{ opacity: 1, y: 0 }} // الحركة المستمرة عند العرض
                        exit={{ opacity: 0, y: -20 }} // الحركة عند الإغلاق
                        transition={{ duration: 0.3 }} // مدة الحركة
                        className="fixed top-[120px] right-0 w-96 bg-white p-4 shadow-lg rounded z-50 overflow-auto"
                        style={{ maxHeight: "calc(100vh - 150px)" }}
                    >
                        {parseInt(likedProducts.length) !== 0 ? (
                            productsall
                                .filter((product) => likedProducts.includes(product.id))
                                .map((product) => (
                                    <ProductCartLike
                                        key={product.id}
                                        id={product.id}
                                        image={product?.image}
                                        name={product?.name}
                                        description={product?.description}
                                        productId={product.id}
                                    />
                                ))
                        ) : (
                            <p className="text-center text-gray-500">No Products Liked</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
