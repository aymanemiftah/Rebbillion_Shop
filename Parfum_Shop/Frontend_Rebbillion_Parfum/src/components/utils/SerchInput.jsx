import React from "react";

export default function SearchComponent({onSearch}) {
    const handleChange = (e)=>{
        onSearch(e.target.value)
    }

    return (
        <div className="flex items-center">
    <div className="flex border border-purple-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <input
            type="text"
            onChange={handleChange}
            className="block w-full px-4 py-2 text-purple-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-gray-400 rounded-lg"
            placeholder="Search..."
        />
    </div>
</div>
    );
}