import React, { useContext, useEffect, useState } from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import SearchComponent from "../../utils/SerchInput";
import { motion } from 'framer-motion';
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import Titlepage from "../../Titlepage/Titlepage";
import CartInfo from "../../Cart-Info/Cart_Info";


export default function ShowReports(){
    const{reports=[],usersall=[]}=useContext(DonnerContext)
    const{reportsall=[]}=useContext(DonnerContext)
    const{totalPagesReports,currentPageReports,handlePageChangeReports , UpdateReport}=useContext(DonnerContext)

    const [search,setsearch]=useState('');
    const [report,setReport]=useState([]);

    const [showDescription, setShowDescription] = useState(false);
    const [selectedReport, setselectedReport] = useState(null);

    const handleShowMore = (report) => {
        setselectedReport(report);
        setShowDescription(true);
    };

    const closeDescription = () => {
        setShowDescription(false);
        setselectedReport(null);
    };

    const handleResolved = async (e,id)=>{
        e.preventDefault();
        const status = {report_status:'resolved'}
        try {
            await UpdateReport(status,id)
            showSuccessAlert('Report Updated Successefuly')
            setReport((prevstate)=>prevstate.map((report)=>report.id === id ? {...report , report_status: status.report_status }:report))
        } catch (error) {
            showFailedAlert('Failed to Update Report')
        }
    }
    const handleRejected = async (e,id)=>{
        e.preventDefault();
        const status = {report_status:'rejected'}
        try {
            await UpdateReport(status,id)
            showSuccessAlert('Report Updated Successefuly')
            setReport((prevstate)=>prevstate.map((report)=>report.id === id ? {...report , report_status: status.report_status }:report))

        } catch (error) {
            console.log(error);
            
            showFailedAlert('Failed to Update Report')
        }
    }


    useEffect(()=>{
        setReport(reports)
    },[reports])

    const Search = (value)=>{
        setsearch(value)
    }

    const pagination = ()=>{
        let PageNumbers =[]
        for (let i = 1; i <= totalPagesReports; i++) {
            PageNumbers.push(
                <button key={i} onClick={()=>handlePageChangeReports(i,totalPagesReports) } className={`px-3 py-1 mx-1 rounded-md border ${currentPageReports === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 hover:text-white`}>
                    {i}
                </button>
            )
            
        }
        return  PageNumbers;
    }

    return(
    <>
     <div className="bg-gray-100 min-h-screen rounded-lg p-8">

     <Titlepage role={'Admin'} page={'Reports'} />

     <hr className="border-gray-300 mb-8" />

     <div className="mb-6 flex justify-between items-center">
        <SearchComponent onSearch={Search} />
    </div>

   
    <CartInfo Title1={'Reports Pending'} Value1={reportsall.filter((e)=>e.report_status === 'pending').length}
              Title2={'Reports Resolved'} Value2={reportsall.filter((e)=>e.report_status === 'resolved').length}
               Title3={'Reports Rejected'} Value3={reportsall.filter((e)=>e.report_status === 'rejected').length}
    />
    

    <div className="relative overflow-x-auto shadow-lg rounded-lg mb-6 bg-white p-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                <tr>
                    <th className="px-6 py-4"> Id</th>
                    <th className="px-6 py-4">User Id</th>
                    <th className="px-6 py-4">User Name</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                </tr>
            </thead>
            <tbody>
                { report && search !== "" ? report.filter((report)=>(
                    report.report_status.toLowerCase().startsWith(search.toLowerCase())||
                    report.id === parseInt(search) ||
                    usersall.find((user)=>user.id === report.user_id)?.name.toLowerCase().startsWith(search.toLowerCase())
                )).map((report,key)=>(
                    <tr key={key} className="hover:bg-gray-100 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{report.id}</td>
                    <td className="px-6 py-4">{report.user_id}</td>
                    <td className="px-6 py-4">{usersall.find((user)=>user.id === report.user_id)?.name}</td>
                    <td className="px-6 py-4">
                    {report.issue_description.length > 20 ? (
                                    <>
                                        {report.issue_description.slice(0, 20)}...
                                        <button onClick={() => handleShowMore(report)} className="text-blue-500">Show More</button>
                                    </>
                                ) : (
                                    report.issue_description
                                )}
                    </td>
                    <td className="px-6 py-4">
                         <span className={`px-3 py-1 rounded-full text-white ${report.report_status === 'pending' ? 'bg-yellow-500' : report.report_status === 'resolved' ? 'bg-green-500' : report.report_status === 'rejected' ? 'bg-red-500' : 'bg-red-500'}`}>
                                    {report.report_status}
                            </span>
                    </td>
                    <td className="px-6 py-4 ">
                        <div className="flex space-x-2">

                        
                    {report.report_status === "pending" ? (
                                        <div>
                                            <button onClick={(e) => handleResolved(e,report.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                            Resolved
                                            </button>
                                            <button onClick={(e) => handleRejected(e, report.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                            Rejected
                                            </button>
                                        </div>
                                    ) : report.report_status === "resolved" ? (
                                        <button className="px-4 py-2 bg-green-300 text-white rounded-lg cursor-not-allowed" disabled>
                                            Resolved
                                        </button>
                                    ) : report.report_status === "rejected" ? (
                                        <button className="px-4 py-2 bg-red-300 text-white rounded-lg cursor-not-allowed" disabled>
                                            Rejected
                                        </button>
                                    ) : ''}
                            </div>
                    </td>
                </tr>
                )): report.map((report,key)=>(
                    <tr key={key} className="hover:bg-gray-100 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">{report.id}</td>
                        <td className="px-6 py-4">{report.user_id}</td>
                        <td className="px-6 py-4">{usersall.find((user)=>user.id === report.user_id)?.name}</td>
                        <td className="px-6 py-4">
                        {report.issue_description.length > 20 ? (
                                        <>
                                            {report.issue_description.slice(0, 20)}...
                                            <button onClick={() => handleShowMore(report)} className="text-blue-500">Show More</button>
                                        </>
                                    ) : (
                                        report.issue_description
                                    )}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-white ${report.report_status === 'pending' ? 'bg-yellow-500' : report.report_status === 'resolved' ? 'bg-green-500' : report.report_status === 'rejected' ? 'bg-red-500' : 'bg-red-500'}`}>
                                    {report.report_status}
                            </span>
                        </td>
                        <td className="px-6 py-4 ">
                        <div className="flex space-x-2">

                        
                    {report.report_status === "pending" ? (
                                        <div>
                                            <button onClick={(e) => handleResolved(e,report.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                            Resolved
                                            </button>
                                            <button onClick={(e) => handleRejected(e, report.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                            Rejected
                                            </button>
                                        </div>
                                    ) : report.report_status === "resolved" ? (
                                        <button className="px-4 py-2 bg-green-300 text-white rounded-lg cursor-not-allowed" disabled>
                                            Resolved
                                        </button>
                                    ) : report.report_status === "rejected" ? (
                                        <button className="px-4 py-2 bg-red-300 text-white rounded-lg cursor-not-allowed" disabled>
                                            Rejected
                                        </button>
                                    ) : ''}
                            </div>
                    </td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    </div>
                {showDescription && selectedReport && (
                <motion.div
                    className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-5 overflow-y-auto"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }} 
                    exit={{ x: 300, opacity: 0 }} 
                    transition={{ duration: 0.3 }} 
                >
                    <h2 className="text-xl font-semibold border-b pb-2">{usersall.find((user)=>user.id ===selectedReport.user_id)?.name}</h2>
                    <p className="mt-2">{selectedReport.issue_description}</p>
                    <button onClick={closeDescription} className="mt-5 w-full bg-red-500 rounded-lg text-white hover:bg-red-800 transition duration-200">Close</button>
                </motion.div>
            )}
    <div>
        {pagination()}
    </div>

     </div>
    </>
    )



}