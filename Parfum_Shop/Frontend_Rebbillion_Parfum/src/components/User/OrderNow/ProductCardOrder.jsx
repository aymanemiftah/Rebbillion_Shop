import React from "react";


export default function ProductCardOrder(props){
    
    return(
    <>
    <div  className="flex  space-x-1 items-center  bg-white border  border-gray-200 rounded-lg shadow-sm shadow-gray-600 hover:shadow-md hover:shadow-blue-300 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 md:flex-row md:max-w-xl max-h-[150px] min-h-[150px]  dark:border-white dark:bg-white mt-2 ml-2 mr-2 mx-lg:w-full ">
    <img className=" object-cover max-w-[150px] min-w-[150px] max-h-[150px]  rounded-lg h-full" src={`http://localhost:8000/storage/${props.image}`} alt="" />
        
    <div className="flex flex-col justify-between p-4 leading-normal w-full">
        <h5 className="mb-2 text-2xl max-custom-lg:text-xl font-bold tracking-tight text-gray-900 dark:text-gray-700">
            {props.name.length > 10 ? (
                <>
                {props.name.slice(0, 10)}...
                </>
            ) : (
                props.name
            )}
            </h5>
            <p className="mb-2 text-lg  tracking-tight text-gray-500 dark:text-gray-500">
           
                {props.price + 'MAD'}
            
            </p>

            

    </div>
    </div>
    </>
    )

}