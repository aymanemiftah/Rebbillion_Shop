import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import IsLike from "../ProductsCard/Like";

import { MdLocalOffer } from "react-icons/md";


export default function Info(props) {
  const inStock = props.stock > 0;

  const { addProductToBasket } = useContext(DonnerContext);
  const toggleAdd = () => {
    addProductToBasket(props?.id);
  };

  const [showDescription, setShowDescription] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleShowMore = (product) => {
    setSelectedProduct(product);
    setShowDescription(true);
  };

  const closeDescription = () => {
    setShowDescription(false);
    setSelectedProduct(null);
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center min-h-[600px] max-h-full py-6 md:py-8 lg:py-10 bg-gray-100">
    <div className="flex flex-col md:flex-row w-11/12 max-w-5xl ">
      {/* Left: Product Image */}
      <div className="w-full md:w-1/2 p-4 md:p-6">
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
          {props.solde != 0 || props.solde == null ? (
            <div className="absolute top-2 left-2 bg-red-600 text-white p-2 rounded-full flex items-center space-x-1">
              <MdLocalOffer size={24} />
              <span className="text-sm font-bold">{props.solde}%</span>
            </div>
          ):''}
          <img
            className="object-contain w-full h-full rounded-xl"
            src={`http://localhost:8000/storage/${props.image}`}
            alt={props.name}
          />
          {!inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-70 rounded-xl flex items-center justify-center">
              <span className="text-3xl font-bold text-white">Out of Stock</span>
            </div>
          )}
        </div>
      </div>
  
      {/* Right: Product Information */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-6 lg:pl-10">
        {/* Product Info */}
        <div className="space-y-4 mt-4">
          {/* Brand */}
          <p className="text-lg md:text-xl font-semibold underline text-gray-600">{props.brands}</p>
  
          {/* Product Name */}
          <h1 className="text-2xl md:text-3xl uppercase font-extrabold text-gray-800 leading-tight">
            {props.name}
          </h1>
  
          {/* Description */}
          <p className="text-sm md:text-md text-gray-700">
            {props.description.length > 100 ? (
              <>
                {props.description.slice(0, 100)}...
                <button onClick={() => handleShowMore(props.product)} className="text-blue-500">
                  Show More
                </button>
              </>
            ) : (
              props.description
            )}
          </p>
  
          {/* Price Section */}
          <div className="flex items-baseline space-x-4">
            <span className="text-xl md:text-2xl font-bold text-blue-600">{props.price} MAD</span>
            {props.last_price && props.last_price !== 0 ? (
              <span className="text-lg line-through text-gray-500">{props.last_price} MAD</span>
            ) : null}
          </div>
  
          {/* Stock Status */}
          <div className="text-md md:text-lg mt-2">
            <span className="font-semibold">Stock: </span>
            <span className={inStock ? "text-green-600" : "text-red-600"}>
              {inStock ? `${props.stock} Available` : "Out of Stock"}
            </span>
          </div>
        </div>
  
        {/* Order Now Button */}
        <div className="mt-6">
          <button
            onClick={toggleAdd}
            className={`w-full py-3 rounded-lg text-lg font-semibold text-white transition-all ${
              inStock ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!inStock}
          >
            {inStock ? "Order Now" : "Unavailable"}
          </button>
        </div>
  
        {/* Additional Information */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Additional Information</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Free shipping on orders over 500 MAD</li>
            <li>30-day return policy</li>
            <li>100% authentic products</li>
          </ul>
        </div>
      </div>
    </div>
  
    {/* Description Modal */}
    {showDescription && selectedProduct && (
      <motion.div
        className="fixed top-0 right-0 h-full w-full md:w-80 bg-white shadow-lg z-50 p-5 overflow-y-auto"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold border-b pb-2">{selectedProduct.name}</h2>
        <p className="mt-2">{selectedProduct.description}</p>
        <button onClick={closeDescription} className="mt-5 w-full bg-red-500 rounded-lg text-white hover:bg-red-800 transition duration-200">
          Close
        </button>
      </motion.div>
    )}
  </div>
  
  );
}
