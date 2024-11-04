import React from "react"
import { IoMdHome } from "react-icons/io";

export default function Titlepage(props){
    return(<>
     <div className="flex items-center mb-8">
            <IoMdHome className="text-2xl text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">/ {props.role} / {props.page}</h1>
        </div>
    </>)
}