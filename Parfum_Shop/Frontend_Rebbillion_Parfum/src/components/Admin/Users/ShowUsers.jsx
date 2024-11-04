import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import SearchComponent from "../../utils/SerchInput";
import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import { axiosClient } from "../../../api/axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { motion } from 'framer-motion';
import Titlepage from "../../Titlepage/Titlepage";
import CartInfo from "../../Cart-Info/Cart_Info";

export default function ShowUsers(){
    const {users} = useContext(DonnerContext)
    const {usersall} = useContext(DonnerContext)
    const { currentPage,totalPages, handlePageChange ,DeleteUser} = useContext(DonnerContext);
    const [user,setuser]=useState([])
    const navigate =useNavigate('');

    const [showDescription, setShowDescription] = useState(false);
    const [selectedUser, setselectedUser] = useState(null);

    const handleShowMore = (user) => {
        setselectedUser(user);
        setShowDescription(true);
    };

    const closeDescription = () => {
        setShowDescription(false);
        setselectedUser(null);
    };
    
    useEffect(()=>{
        setuser(users)
        
        
    },[users])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosClient.get('/api/users');
                    setuser(response.data.data);
                
            } catch (error) {
                console.error(error);
                
            }
        };

        fetchUsers();
    }, []);



    const [search,setsearch]=useState('');
    const Search = (value) =>{
        setsearch(value)
    }

    const handleDelet = async (e,id)=>{
       e.preventDefault()
        try {
            await DeleteUser(id)
            showSuccessAlert('User Deleted Successefuly')
            setuser(pr=>pr.filter(pre=>pre.id != id))
            navigate('/admin/users')
        } catch (error) {
            console.log(error);
            
            showFailedAlert('Faild to Delete a User')
        }
    }

    const renderPagination = () => {
        let pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i,totalPages)}
                    className={`px-3 py-1 mx-1 rounded-md border ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 hover:text-white`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers ;
    };
    return(<>
    <div className="bg-gray-100 min-h-screen rounded-lg p-8">
    
    <Titlepage role={'Admin'} page={'Users'} />

    <hr className="border-gray-300 mb-8" />
    
    {/* مربع البحث */}
    <div className="mb-6 flex justify-between items-center">
        <SearchComponent onSearch={Search} />
        <Link
                    to={'/Admin/Users/create-user'}
                    className="flex justify-center items-center w-1/4 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    <FaPlusCircle className="w-4 h-4 mr-3" />
                    Create User
                </Link>
    </div>
    
    
    

    <CartInfo Title1={'Admins'} Value1={usersall.filter(e=>e.role ==='admin').length}
              Title2={'Managers'} Value2={usersall.filter(e=>e.role ==='manager').length}
               Title3={'Users'} Value3={usersall.filter(e=>e.role ==='user').length}
    />

    {/* الجدول مع تحسين التصميم */}
    <div className="relative overflow-x-auto shadow-lg rounded-lg bg-white p-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                <tr>
                    <th className="px-6 py-4">User Id</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Address</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {user && search !== '' ? user.filter((e) =>
                    e.id == parseInt(search) ||
                    e.name.toLowerCase().startsWith(search.toLowerCase()) ||
                    e.email.toLowerCase().startsWith(search.toLowerCase()) ||
                    e.role.toLowerCase().startsWith(search.toLowerCase())
                ).map((user, key) => (
                    <tr key={key} className="hover:bg-gray-100 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">{user.id}</td>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                        {user.address.length > 20 ? (
                                    <>
                                        {user.address.slice(0, 20)}...
                                        <button onClick={() => handleShowMore(user)} className="text-blue-500">Show More</button>
                                    </>
                                ) : (
                                    user.address
                                )}
                        </td>
                        <td className="px-6 py-4">{user.phonenumber}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4 flex space-x-2">
                            <Link to={'/Admin/Users/Update-user/' + user.id} className="flex justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 w-1/2">
                                <FaRegEdit />
                            </Link>
                            <button onClick={(e) => handleDelet(e, user.id)} className="flex justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-1/2">
                                <RiDeleteBin6Fill />
                            </button>
                        </td>
                    </tr>
                )) : user.map((user, key) => (
                    <tr key={key} className="hover:bg-gray-100 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">{user.id}</td>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4"> 
                            {user.address.length > 20 ? (
                                    <>
                                        {user.address.slice(0, 20)}...
                                        <button onClick={() => handleShowMore(user)} className="text-blue-500">Show More</button>
                                    </>
                                ) : (
                                    user.address
                                )}
                        </td>
                        <td className="px-6 py-4">{user.phonenumber}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4 flex space-x-2">
                            <Link to={'/Admin/Users/Update-user/' + user.id} className="flex justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 w-1/2">
                                <FaRegEdit />
                            </Link>
                            <button onClick={(e) => handleDelet(e, user.id)} className="flex justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-1/2">
                                <RiDeleteBin6Fill />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    {showDescription && selectedUser && (
                <motion.div
                    className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-5 overflow-y-auto"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }} 
                    exit={{ x: 300, opacity: 0 }} 
                    transition={{ duration: 0.3 }} 
                >
                    <h2 className="text-xl font-semibold border-b pb-2">{selectedUser.name}</h2>
                    <p className="mt-2">{selectedUser.address}</p>
                    <button onClick={closeDescription} className="mt-5 w-full bg-red-500 rounded-lg text-white hover:bg-red-800 transition duration-200">Close</button>
                </motion.div>
            )}
    {/* قسم التصفح (Pagination) */}
    <div className="mt-6">
        {renderPagination()}
    </div>
</div>

    
    
    
    </>
    )
}