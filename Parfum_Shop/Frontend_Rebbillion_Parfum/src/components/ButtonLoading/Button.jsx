import React from "react";



export default function MyButton(props) {
    

   

    return (
        <button
            type={props.type}
            className="relative block w-full bg-blue-950 hover:bg-blue-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 transition duration-300 ease-in-out"
            disabled={props.loading} 
        >
            {props.loading ? (
                
                <span className="flex items-center justify-center">
                    <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4.354V19.646M16.646 15.646L12 20.292l-4.646-4.646"
                        />
                    </svg>
                    {props.text}
                </span>
            ) : (
                
               props.text
            )}
        </button>
    );
}