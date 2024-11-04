import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import Info from "./Info";
import ProductsSwipe from "../Home/ProductsSwipe";

export default function ProductInfo(){
    const{id}=useParams();
    const{productsall=[]}=useContext(DonnerContext)

    const product = productsall.find((product)=>product.id === parseInt(id))
   
    return(
    <>
        <div>
            {productsall && product ? (
                <Info
                id={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
                last_price={product.last_price}
                stock={product.stock}
                solde={product.solde}
                brands={product.brands}
                product={product}
                />
            ):(
                <div className="w-full h-min-[250px] flex justify-center items-center">
                    <p className="text-2xl font-bold text-gray-500">Wait a minute...</p>
                    </div>
            
            )}
        </div>
        <div className="mb-10">
            <ProductsSwipe title={'CONTINUE SHOPPING'}  sexe={product?.sexe} />
        </div>
    </>
    )

}