import React, { useContext, useEffect, useRef } from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import ProductCartSeach from "./ProductCartSearch";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; 


export default function TableSearch({ Search,Resulta , closeTableSearch }) {
    const { productsall = [] } = useContext(DonnerContext);
    return (
        <AnimatePresence>
            <motion.div
                className="w-full min-h-[400px] max-h-[500px] rounded-lg shadow-gray-700 shadow-md bg-white overflow-y-auto flex flex-col"
                initial={{ opacity: 0, y: -20 }} // حركة الدخول
                animate={{ opacity: 1, y: 0 }}   // الحركة عند العرض
                exit={{ opacity: 0, y: -20 }}    // حركة الخروج
                transition={{ duration: 0.3 }}   // مدة الحركة
            >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  ">
                    {Search !== '' ? 
                        productsall
                            .filter((product) => (
                                product.name.toLowerCase().includes(Search.toLowerCase()) ||
                                product.sexe.toLowerCase().includes(Search.toLowerCase()) ||
                                product.category.toLowerCase().includes(Search.toLowerCase())      
                            ))
                            .slice(0, 6)
                            .map((product) => (
                                <ProductCartSeach
                                    key={product.id}
                                    id={product.id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                />
                            )) : <p>Search...</p>
                    }
                </div>
                <div className="flex mb-2 ml-4 mt-2">
                    <a
                        href={`/Products?search=${Search}`}  // تأكد من تعديل الرابط حسب الحاجة
                        className="text-white bg-blue-700 min-w-[150px] text-center max-w-[150px] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Show More ...
                    </a>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}