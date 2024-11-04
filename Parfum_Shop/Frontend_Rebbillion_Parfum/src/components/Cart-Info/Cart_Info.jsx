import React from "react";

export default function CartInfo(props){

    return(
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-lg font-bold text-gray-700">{props.Title1 }</h2>
                    <p className="mt-2 text-2xl text-yellow-500">{props.Value1}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-lg font-bold text-gray-700">{props.Title2 }</h2>
                    <p className="mt-2 text-2xl text-green-500">{props.Value2}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-lg font-bold text-gray-700">{props.Title3 }</h2>
                    <p className="mt-2 text-2xl text-red-500">{props.Value3}</p>
                </div>
    </div>
        
    </>
    )
}