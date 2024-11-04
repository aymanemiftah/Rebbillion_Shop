import React, { useContext, useEffect, useState } from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";


const Basket = ({ productId,title }) => {
    
    const {addProductToBasket} = useContext(DonnerContext)
    const toggleAdd = () => {
        addProductToBasket(productId)
    };

    return (
        <button onClick={toggleAdd}  className="flex-1 inline-flex items-center justify-center px-3 py-2  text-sm font-medium text-white bg-blue-950  hover:bg-blue-800 transition-transform duration-300 hover:scale-105">
            {title}
        </button>
    );
};

export default Basket;
