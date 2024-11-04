import React, { useContext, useEffect, useState } from "react";

import SearchComponent from "../../utils/SerchInput";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import Titlepage from "../../Titlepage/Titlepage";
import CartInfo from "../../Cart-Info/Cart_Info";



export default function ShowDeliveries(){

    
 const [search,setsearch]=useState('');
 const{deliveries,UpdateDelivery}=useContext(DonnerContext)
 const{totalPagesDeliveries,handlePageChangeDelivries,currentPageDeliveries}=useContext(DonnerContext)
const [delivery ,setdelivery]=useState([])

const {users=[]}=useContext(DonnerContext)

    useEffect(()=>{
        setdelivery(deliveries)

    },[deliveries])

 const Search =(value)=>{
    setsearch(value)
 }
    const handleShipped= async (e,id)=>{
        e.preventDefault();
        const status={delivery_status:'shipped'}
        try {
            await UpdateDelivery(status,id)
            setdelivery(prevstate=>prevstate.map((delivery=>delivery.id === id ? {...delivery,delivery_status:status.delivery_status}:delivery)))
            showSuccessAlert('Delivery Updated Successefuly')
        } catch (error) {
            showFailedAlert('Faild to update Delivery')
        }
    }
    const handleDelivered= async (e,id)=>{
        e.preventDefault();
       
        const status={delivery_status:'delivered'}
        try {
            await UpdateDelivery(status,id)
            setdelivery(prevstate=>prevstate.map((delivery=>delivery.id === id ? {...delivery,delivery_status:status.delivery_status}:delivery)))
            showSuccessAlert('Delivery Updated Successefuly')
        } catch (error) {
            showFailedAlert('Faild to update Delivery')
        }
    }

 const pagination = ()=>{
    let pageNumbers =[];
    for (let i = 1; i <= totalPagesDeliveries; i++) {
        pageNumbers.push(
            <button key={i} onClick={()=>handlePageChangeDelivries(i,totalPagesDeliveries)} className={`px-3 py-1 mx-1 rounded-md border ${currentPageDeliveries === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 hover:text-white`} >
            {i}
            </button>
        )
    }
    return pageNumbers;
 }

 

return(<>
    <div className="bg-gray-100 min-h-screen rounded-lg p-8">
        
    <Titlepage role={'Manager'} page={'Deliveries'} />
    
        <hr className="border-gray-300 mb-8" />
        
        
        <div className="mb-6">
            <SearchComponent onSearch={Search} />
        </div>
        
      
        <CartInfo Title1={'Pending Deliveries'} Value1={delivery.filter((e)=>e.delivery_status === 'pending').length}
              Title2={'Shipped Deliveries'} Value2={delivery.filter((e)=>e.delivery_status === 'shipped').length}
               Title3={'Delivered Deliveries'} Value3={delivery.filter((e)=>e.delivery_status === 'delivered').length}
               />
    
        {/* الجدول مع تحسين التصميم */}
        <div className="relative overflow-x-auto shadow-lg rounded-lg bg-white p-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                    <tr>
                        <th className="px-6 py-4">Delivery Id</th>
                        <th className="px-6 py-4">Order Id</th>
                        <th className="px-6 py-4">User Id</th>
                        <th className="px-6 py-4">User Name</th>
                        <th className="px-6 py-4">Delivery Status</th>
                        <th className="px-6 py-4">Delivery Date</th>
                        <th className="px-6 py-4">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {delivery && search !== '' ? delivery.filter((delivrey) =>
                     delivrey.delivery_status.toLowerCase().startsWith(search.toLowerCase()) ||
                     users.find(user => parseInt(user.id) === parseInt(delivrey.user_id))?.name.toLowerCase().startsWith(search.toLowerCase())||
                     delivrey.id === parseInt(search )
                    ).map((delivery, key) => (
                        <tr key={key} className="hover:bg-gray-100 transition">
                            <td className="px-6 py-4 font-medium text-gray-900">{delivery.id}</td>
                            <td className="px-6 py-4">{delivery.order_id}</td>
                            <td className="px-6 py-4">{delivery.user_id}</td>
                            <td className="px-6 py-4">{users.find(e => parseInt(e.id) === parseInt(delivery.user_id))?.name}</td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-white ${delivery.delivery_status === 'pending' ? 'bg-yellow-500' : delivery.delivery_status === 'shipped' ? 'bg-green-500' : delivery.delivery_status === 'delivered' ? 'bg-red-500' : 'bg-red-500'}`}>
                                    {delivery.delivery_status}
                                </span>
                            </td>
                            <td className="px-6 py-4">{delivery.delivery_date}</td>
                            <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                {delivery.delivery_status === 'pending' && (
                                            <>
                                                <button onClick={(e) => handleShipped(e, delivery.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                                    Shipped
                                                </button>
                                                <button onClick={(e) => handleDelivered(e, delivery.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                                    Delivered
                                                </button>
                                            </>
                                        )}
                                        {delivery.delivery_status === 'shipped' && (
                                            <button onClick={(e) => handleDelivered(e, delivery.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                                Delivered
                                            </button>
                                        )}
                                        {delivery.delivery_status === 'delivered' && (
                                            <button disabled className="px-4 py-2 bg-red-400 text-white rounded-lg cursor-not-allowed">
                                                Delivered
                                            </button>
                                        )}
                                </div>
                            </td>
                        </tr>
                    )) : delivery.map((delivery, key) => (
                        <tr key={key} className="hover:bg-gray-100 transition">
                            <td className="px-6 py-4 font-medium text-gray-900">{delivery.id}</td>
                            <td className="px-6 py-4">{delivery.order_id}</td>
                            <td className="px-6 py-4">{delivery.user_id}</td>
                            <td className="px-6 py-4">{users.find(e => parseInt(e.id) === parseInt(delivery.user_id))?.name}</td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-white ${delivery.delivery_status === 'pending' ? 'bg-yellow-500' : delivery.delivery_status === 'shipped' ? 'bg-green-500' : delivery.delivery_status === 'delivered' ? 'bg-red-500' : 'bg-red-500'}`}>
                                    {delivery.delivery_status}
                                </span>
                            </td>
                            <td className="px-6 py-4">{delivery.delivery_date}</td>
                            <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                {delivery.delivery_status === 'pending' && (
                                            <>
                                                <button onClick={(e) => handleShipped(e, delivery.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                                    Shipped
                                                </button>
                                                <button onClick={(e) => handleDelivered(e, delivery.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                                    Delivered
                                                </button>
                                            </>
                                        )}
                                        {delivery.delivery_status === 'shipped' && (
                                            <button onClick={(e) => handleDelivered(e, delivery.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                                Delivered
                                            </button>
                                        )}
                                        {delivery.delivery_status === 'delivered' && (
                                            <button disabled className="px-4 py-2 bg-red-400 text-white rounded-lg cursor-not-allowed">
                                                Delivered
                                            </button>
                                        )}
                                </div>
                            </td>
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