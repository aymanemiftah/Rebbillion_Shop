import React from "react";
import ImageSwipe from "./ImageSwipe";
import OurCollictions from "./Our_Collictions";

import ProductsSwipe from "./ProductsSwipe";
import IdeaGifts from "./IdeaGifts";
import OptionDeliveries from "./OptionDeliveries";


export default function ShowHome(){
   
    return (
    <>
    <div>
        <ImageSwipe />
    </div>
    
    <div className="mt-5">
        <OurCollictions />
    </div>
    <div className="mt-5">
        <ProductsSwipe title={'WOMEN SOLDS'} sexe={'Women'} link={`/Products/Women-Products?search=${'Women'}`} />
    </div>
    <div className="mt-5">
        <ProductsSwipe title={'MEN SOLDS'} sexe={'Men'} link={`/Products/Men-Products?search=${'Men'}`}/>
    </div>
    
    <div className="mt-10">
        <IdeaGifts />
    </div>

    <div className="mt-10" >
        <OptionDeliveries />
    </div>


    
    

    
    </>)
    
}