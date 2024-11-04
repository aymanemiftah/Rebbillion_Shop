import React from "react";
import { MdLocalOffer, MdCheck } from "react-icons/md";
import { TbXboxX } from "react-icons/tb";
import IsLike from "./Like";
import Basket from "./Basket";
import { SlBasket } from "react-icons/sl";

export default function ProductsCard(props) {
    return (
        <div className="relative max-w-[170px] min-w-[170px] max-h-[380px] min-h-[380px] md:max-h-[450px] md:min-h-[450px] md:max-w-[270px] md:min-w-[270px] mt-8 bg-white hover:bg-gradient-to-r hover:from-white hover:via-gray-100 hover:to-gray-200 border border-gray-400 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-xl hover:scale-105 group">
            
            {/* Solde tag */}
            {parseInt(props?.solde) !== 0 && (
                <div className="absolute top-2 right-2 z-20 bg-blue-950 text-white p-2 rounded-full flex items-center space-x-1">
                    <MdLocalOffer size={24} />
                    <span className="text-sm font-bold">{props?.solde}%</span>
                </div>
            )}

            {/* Heart Icon in the top-left */}
            <div className="absolute top-2 left-2 z-20">
                <IsLike productId={props?.id} />
            </div>

            {/* Product Image */}
            <div className="relative flex justify-center items-center h-44 md:h-64">
                <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:8000/storage/${props?.image}`}
                    alt={props?.name}
                />

                {/* Basket button with animation */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                    <div className="block custom-lg:hidden opacity-100 transition-opacity duration-300 w-full">
                        {props?.stock !== 0 ? (
                            <Basket title={<SlBasket />} productId={props?.id} className="w-full" />
                        ) : (
                            <button
                                disabled
                                className="w-full block px-3 py-2 text-sm font-medium text-white bg-blue-400"
                            >
                                Out Of Stock
                            </button>
                        )}
                    </div>
                    <div className="hidden custom-lg:flex opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-full transition-transform duration-300 w-full">
                        {props?.stock !== 0 ? (
                            <Basket title={'Add To Basket'} productId={props?.id} className="w-full basket-slide-up" />
                        ) : (
                            <button
                                disabled
                                className="w-full block px-3 py-2 text-sm font-medium text-white bg-blue-400"
                            >
                                Out Of Stock
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <a href={'/Products/Product-Info/' + props?.id} className="flex flex-col flex-grow relative">
                {/* Product Info */}
                <div className="p-5 flex flex-col items-center flex-grow h-[150px] md:h-[200px]">
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                        {props.name?.length > 10 ? `${props?.name.slice(0, 10)}...` : props?.name}
                    </h5>
                    <p className="mb-3 uppercase font-bold text-gray-700">
                        {props.brands?.length > 10 ? `${props?.brands.slice(0, 10)}...` : props?.brands}
                    </p>
                    <div className="flex flex-col space-x-2">
                        <p className="font-bold text-blue-600">{props?.price} MAD</p>
                        {props?.last_price != null ? (
                            <span className="line-through text-gray-500">{props?.last_price} MAD</span>
                        ):""}
                    </div>
                    <div className="mt-2">
                        {props?.stock > 0 ? (
                            <p className="text-green-600 flex items-center space-x-1">
                                <MdCheck />
                                <span>In stock: {props?.stock}</span>
                            </p>
                        ) : (
                            <p className="text-red-600 flex items-center">
                                <TbXboxX />
                                <span>Out of stock</span>
                            </p>
                        )}
                    </div>
                </div>
            </a>
        </div>
    );
}
