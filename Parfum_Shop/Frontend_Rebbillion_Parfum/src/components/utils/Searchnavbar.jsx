import React, { useState } from "react";

export default function SearchNavbar(props){
    const[search,setSearch]=useState('')
    const handleSearch = (e)=>{
        props.OnSearch(e.target.value);
        setSearch(e.target.value)
    };
   
    
    return (
    <>
    <div className="flex items-center custom-lg:min-w-[400px] w-full  custom-lg:w-3/4">
    <div className="relative flex items-center border w-full  border-blue-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
       
        <input
            type="text"
            onChange={handleSearch}
            
            className="block w-full pl-10 pr-4 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent placeholder-gray-400 rounded-lg"
            placeholder="Search..."
        />
        <a href={`/Products?search=${search}`} className=" inset-y-0  pl-3 flex items-center  m-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 100 14 7 7 0 100-14zm0  01M16 16l4 4" />
            </svg>
        </a>
    </div>
</div>
    </>
    )

}