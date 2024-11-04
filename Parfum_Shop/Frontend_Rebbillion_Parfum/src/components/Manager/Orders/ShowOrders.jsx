import React, { useContext, useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import SearchComponent from "../../utils/SerchInput";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";

import Titlepage from "../../Titlepage/Titlepage";

import { useNavigate } from "react-router-dom";
import CartInfo from "../../Cart-Info/Cart_Info";


export default function ShowOrders(){

    const [search,setsearch]=useState('');

    const Search= (value) =>{
        setsearch(value)
    }

    const{totalPagesOrders,currentPageOrders,handlePageChangeOrders}=useContext(DonnerContext)
    const{orders=[]}=useContext(DonnerContext)
    
    const {users=[]}=useContext(DonnerContext)

    const [order,setorder]=useState([])
    const navigate=useNavigate('')
    
    

    useEffect(()=>{
        setorder(orders)
    },[orders])

    
    
    
    const pagination = ()=>{
        let pageNumber =[];
        for (let i = 1; i <= totalPagesOrders; i++) {
            pageNumber.push(
                <button 
                key={i}
                onClick={()=>handlePageChangeOrders(i,totalPagesOrders)}
                className={`px-3 py-1 mx-1 rounded-md border ${currentPageOrders === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 hover:text-white`}
                >
                    {i}
                </button>
            )
        }

        return pageNumber ;
    }


    return(
        <>
        <div className="bg-gray-100 min-h-screen rounded-lg p-8">
            
        <Titlepage role={'Manager'} page={'Orders'} />
        
            <hr className="border-gray-300 mb-8" />
            
            {/* مربع البحث */}
            <div className="mb-6">
                <SearchComponent onSearch={Search} />
            </div>
            
            {/* كروت عرض المعلومات */}
            <CartInfo Title1={'Pending Orders'} Value1={order.filter(e => e.status === 'pending').length}
              Title2={'Completed Orders'} Value2={order.filter(e => e.status === 'completed').length}
               Title3={'Canceled Orders'} Value3={order.filter(e => e.status === 'canceled').length}
               />
        
            {/* الجدول مع تحسين التصميم */}
            <div className="relative overflow-x-auto shadow-lg rounded-lg bg-white p-6">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-6 py-4">Order Id</th>
                            <th className="px-6 py-4">User Id</th>
                            <th className="px-6 py-4">User Name</th>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Total Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Order Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {order && search !== '' ? order.filter(order =>
                            order.status.toLowerCase().startsWith(search.toLowerCase()) ||
                            users.find(e => parseInt(e.id) === parseInt(order.user_id))?.name.toLowerCase().startsWith(search.toLowerCase()) ||
                            order.id === parseInt(search) ||
                            order.products.some(product => product.name.toLowerCase().startsWith(search.toLowerCase()))
                        ).map((order, key) => (
                            <tr key={key} className="hover:bg-gray-100 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4">{order.user_id}</td>
                                <td className="px-6 py-4">{users.find(e => parseInt(e.id) === parseInt(order.user_id))?.name}</td>
                                <td className="px-6 py-4">
                                    <ul>
                                        {order.products && order.products.length > 0 ? (
                                            order.products.map((product, key) => (
                                                <li key={key}>{product.name} Stock: {product.pivot.stock} Price: {product.pivot.price} Dh</li>
                                            ))
                                        ) : (
                                            <li>Product Null</li>
                                        )}
                                    </ul>
                                </td>
                                <td className="px-6 py-4">{order.total_price}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-white ${order.status === 'pending' ? 'bg-yellow-500' : order.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{order.order_date}</td>
                            </tr>
                        )) : order.map((order, key) => (
                            <tr key={key} className="hover:bg-gray-100 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4">{order.user_id}</td>
                                <td className="px-6 py-4">{users.find(e => parseInt(e.id) === parseInt(order.user_id))?.name}</td>
                                <td className="px-6 py-4">
                                    <ul>
                                        {order.products && order.products.length > 0 ? (
                                            order.products.map((product, key) => (
                                                <li key={key}>{product.name} Stock: {product.pivot.stock} Price: {product.pivot.price} Dh</li>
                                            ))
                                        ) : (
                                            <li>Product Null</li>
                                        )}
                                    </ul>
                                </td>
                                <td className="px-6 py-4">{order.total_price}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-white ${order.status === 'pending' ? 'bg-yellow-500' : order.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{order.order_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        
            {/* قسم التصفح (Pagination) */}
            <div className="mt-6">
                {pagination()}
            </div>
        </div>
    </>
    
    )
}