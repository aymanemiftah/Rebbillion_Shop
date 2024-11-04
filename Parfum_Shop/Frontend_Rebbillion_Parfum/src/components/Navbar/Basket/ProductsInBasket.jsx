import React, { useContext, useEffect, useRef, useState } from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { SlBasket } from "react-icons/sl";
import ProductCartBasket from "./ProductCardBasket";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccessAlert } from "../../utils/toastify";


export default function ProductsInBasket(){

    const [isOpen, setIsOpen] = useState(false);
    const { productsall = [] } = useContext(DonnerContext);
    const divRef = useRef(null);
    const {BasketProducts,DeleteProductBasket}= useContext(DonnerContext);

   

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    const handleDelete = (id) => {
        DeleteProductBasket(id)
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
                <SlBasket />
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
                        {parseInt(BasketProducts.length) !== 0 ? (
                            <div>
                                {productsall
                                    .filter((product) => BasketProducts.includes(product.id))
                                    .map((product) => (
                                        <ProductCartBasket
                                            key={product.id}
                                            id={product.id}
                                            image={product?.image}
                                            name={product?.name}
                                            price={product?.price}
                                            productId={product.id}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                <a href="/Order/Order-Now" className="mt-4 ml-2 w-11/12 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-950 rounded-lg hover:bg-blue-800 transition-transform duration-300 hover:scale-105">
                                    Order Now
                                </a>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">There is no Products in Basket</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            
        </>
    );

}