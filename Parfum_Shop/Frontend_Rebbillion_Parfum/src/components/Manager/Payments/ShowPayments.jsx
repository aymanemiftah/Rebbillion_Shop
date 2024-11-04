import React, { useContext, useEffect, useState } from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { IoMdHome } from "react-icons/io";
import SearchComponent from "../../utils/SerchInput";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import { useNavigate } from "react-router-dom";
import Titlepage from "../../Titlepage/Titlepage";
import CartInfo from "../../Cart-Info/Cart_Info";

export default function ShowPayments(){
    const [search,setsearch]=useState('');
    const [payment,setpayment]=useState([]);
    const navigate=useNavigate('');

    const Search = (value)=>{
        setsearch(value)
    }

    const {totalPagesPayments,currentPagePayments,handlePageChangePayments}= useContext(DonnerContext)
    const{payments=[],users}=useContext(DonnerContext)
    const{UpdatePayment,UpdateOrder,CreateDelivery}=useContext(DonnerContext)

    useEffect(()=>{
        setpayment(payments)
    },[payments])

    const handleCompleted = async (e,id_payment,id_order,Delivery)=>{
        e.preventDefault();
        const status = {status:"completed"}
        const Deliivery = Delivery
        try {
            await UpdatePayment(status,id_payment)
            await UpdateOrder(status,id_order)
            await CreateDelivery(Deliivery)
            navigate('/Manager/Payments')
            showSuccessAlert('Payment Update Successefuly');
            setpayment(prevstate=>prevstate.map((payment=>payment.id === id_payment ? {...payment , status :status.status} : payment)))
        } catch (error) {
            console.log(error);
            
            showFailedAlert('Faild to Update Payments')
        }

    }
    const handleFaild = async (e,id_payment,id_order)=>{
        e.preventDefault();
        const statusPayment = {status:"failed"}
        const statusOrder = {status:"canceled"}
        try {
            await UpdatePayment(statusPayment,id_payment)
            await UpdateOrder(statusOrder,id_order)
            showSuccessAlert('Payment Update Successefuly');
            setpayment((prevstate)=>prevstate.map((payment=>payment.id === id_payment ? {...payment , status :statusPayment.status} : payment)))
        } catch (error) {
            showFailedAlert('Faild to Update Payments')
        }

    }

    const pagination = ()=>{
        let PageNumbers =[];
        for (let i = 1; i <= totalPagesPayments; i++) {
            PageNumbers.push(
                <button key={i} onClick={()=>handlePageChangePayments(i,totalPagesPayments)} className={`px-3 py-1 mx-1 rounded-md border ${currentPagePayments === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 hover:text-white`}>
                    {i}
                </button>
            )
            
        }
        return PageNumbers;
    }

    return(
        <>
        <div className="bg-gray-100 min-h-screen rounded-lg p-8">

        <Titlepage role={'Manager'} page={'Payments'} />
    
            <hr className="border-gray-300 mb-8" />
    
            <div className="mb-6">
                <SearchComponent onSearch={Search} />
            </div>
    
            {/* كروت عرض المعلومات */}
            <CartInfo Title1={'Pending Payments'} Value1={payment.filter((e) => e.status === 'pending').length}
              Title2={'Completed Payments'} Value2={payment.filter((e) => e.status === 'completed').length}
               Title3={'Failed Payments'} Value3={payment.filter((e) => e.status === 'failed').length}
               />
    
            {/* الجدول مع تحسين التصميم */}
            <div className="relative overflow-x-auto shadow-lg rounded-lg bg-white p-6">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-6 py-4">Id</th>
                            <th className="px-6 py-4">Order Id</th>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Payment Method</th>
                            <th className="px-6 py-4">Payment Date</th>
                            <th className="px-6 py-4">Information Payments</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {payment && search !== "" ? payment.filter((payment) =>
                            payment.id === parseInt(search) ||
                            users.find((user) => user.id === payment.user_id)?.name.toLowerCase().startsWith(search.toLowerCase()) ||
                            payment.paypal_account.toLowerCase().startsWith(search.toLowerCase()) ||
                            payment.status.toLowerCase().startsWith(search.toLowerCase()) ||
                            payment.payment_method.toLowerCase().startsWith(search.toLowerCase())
                        ).map((payment, key) => (
                            <tr key={key} className="hover:bg-gray-100 transition">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900">{payment.id}</th>
                                <td className="px-6 py-4">{payment.order_id}</td>
                                <td className="px-6 py-4">{payment.user_id + " "}{users.find((e) => parseInt(e.id) === parseInt(payment.user_id))?.name}</td>
                                <td className="px-6 py-4">{payment.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-white ${payment.status === 'pending' ? 'bg-yellow-500' : payment.status === 'completed' ? 'bg-green-500' : payment.status === 'failed' ? 'bg-red-500' : 'bg-red-500'}`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{payment.payment_method}</td>
                                <td className="px-6 py-4">{payment.payment_date}</td>
                                <td className="px-6 py-4">
                                    {payment && payment.payment_method === 'credit_card' ? (
                                        <>
                                            Card Number: {payment.card_number}<br />
                                            Card Expiration: {payment.card_expiration}<br />
                                            CVV: {payment.cvv}
                                        </>
                                    ) : payment.payment_method === 'paypal' ? (
                                        <>
                                            Paypal Account: {payment.paypal_account}<br />
                                            Paypal Password: {payment.paypal_password}
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </td>
                                <td className="px-6 py-4 ">
                                <div className="flex space-x-2">
                                    {payment.status === "pending" ? (
                                        <div>
                                            <button onClick={(e) => handleCompleted(e, payment.id, payment.order_id, { order_id: payment.order_id, user_id: payment.user_id })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                                Completed
                                            </button>
                                            <button onClick={(e) => handleFaild(e, payment.id, payment.order_id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                                Failed
                                            </button>
                                        </div>
                                    ) : payment.status === "completed" ? (
                                        <button className="px-4 py-2 bg-green-300 text-white rounded-lg cursor-not-allowed" disabled>
                                            Completed
                                        </button>
                                    ) : payment.status === "failed" ? (
                                        <button className="px-4 py-2 bg-red-300 text-white rounded-lg cursor-not-allowed" disabled>
                                            Failed
                                        </button>
                                    ) : ''}
                                    </div>
                                </td>
                            </tr>
                        )) : payment.map((payment, key) => (
                            <tr key={key} className="hover:bg-gray-100 transition">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900">{payment.id}</th>
                                <td className="px-6 py-4">{payment.order_id}</td>
                                <td className="px-6 py-4">{payment.user_id + " "}{users.find((e) => parseInt(e.id) === parseInt(payment.user_id))?.name}</td>
                                <td className="px-6 py-4">{payment.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-white ${payment.status === 'pending' ? 'bg-yellow-500' : payment.status === 'completed' ? 'bg-green-500' : payment.status === 'failed' ? 'bg-red-500' : 'bg-red-500'}`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{payment.payment_method}</td>
                                <td className="px-6 py-4">{payment.payment_date}</td>
                                <td className="px-6 py-4">
                                    {payment && payment.payment_method === 'credit_card' ? (
                                        <>
                                            Card Number: {payment.card_number}<br />
                                            Card Expiration: {payment.card_expiration}<br />
                                            CVV: {payment.cvv}
                                        </>
                                    ) : payment.payment_method === 'paypal' ? (
                                        <>
                                            Paypal Account: {payment.paypal_account}<br />
                                            Paypal Password: {payment.paypal_password}
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </td>
                                <td className="px-6 py-4 ">
                                <div className="flex space-x-2">
                                    {payment.status === "pending" ? (
                                        <div>
                                            <button onClick={(e) => handleCompleted(e, payment.id, payment.order_id, { order_id: payment.order_id, user_id: payment.user_id })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                                Completed
                                            </button>
                                            <button onClick={(e) => handleFaild(e, payment.id, payment.order_id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                                Failed
                                            </button>
                                        </div>
                                    ) : payment.status === "completed" ? (
                                        <button className="px-4 py-2 bg-green-300 text-white rounded-lg cursor-not-allowed" disabled>
                                            Completed
                                        </button>
                                    ) : payment.status === "failed" ? (
                                        <button className="px-4 py-2 bg-red-300 text-white rounded-lg cursor-not-allowed" disabled>
                                            Failed
                                        </button>
                                    ) : ''}
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