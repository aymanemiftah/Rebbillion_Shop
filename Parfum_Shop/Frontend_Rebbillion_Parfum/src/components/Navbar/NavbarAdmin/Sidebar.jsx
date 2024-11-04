import React, { useContext, useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { MdDashboard } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaShoppingBasket } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbMessageReportFilled } from "react-icons/tb";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { showSuccessAlert } from "../../utils/toastify";
import { RiLogoutBoxFill } from "react-icons/ri";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const {user}=useContext(AuthContext);
  const [activeLink, setActiveLink] = useState(""); 
  const navigate = useNavigate(""); 
  const{logout}=useContext(AuthContext)

  useEffect(() => {
    // جلب الرابط النشط من localStorage عند تحميل المكون
    const storedLink = localStorage.getItem("activeLink");
    if (storedLink) {
      setActiveLink(storedLink);
    }
  }, []);

  const handleLinkClick = (value) => {
    setActiveLink(value);
    localStorage.setItem("activeLink", value); // تخزين الرابط النشط في localStorage
     // التنقل إلى الرابط المطلوب
  };

 const  handleLogout= async()=>{
    try {
        await logout();
        showSuccessAlert('Logout Successfuly')
        navigate('/')
    } catch (error) {
        showSuccessAlert('Logout Failed')
    }

 }
  return (
    <>
    {user && user?.role === 'admin' ? (
         <div className={`${isOpen ? "w-64" : "w-20"} bg-blue-950 min-h-screen p-5 pt-8 relative duration-300 shadow-lg border border-blue-950 transition-all ease-in-out`}>
            <div className="flex items-center justify-between mb-5">
                <div className={`flex flex-col items-start text-white duration-200 ${!isOpen && "scale-0"}`}>
                    <h2 className="font-bold text-2xl transition-all duration-300">{user.name}</h2>
                    <div className="flex items-center mt-1">
                        <MdSecurity className="text-white text-base mr-2" />
                        <span className="font-semibold text-sm bg-gradient-to-r from-blue-500 to-blue-700 rounded-full px-3 py-1 shadow-lg">
                            Admin
                        </span>
                    </div>
                </div>
               
                <button onClick={() => setIsOpen(!isOpen)} className="text-white absolute right-4 transition-transform duration-300 transform hover:scale-110">
                    {isOpen ? <FaChevronCircleLeft /> : <FaChevronCircleRight />}
                </button>
            </div>
            <ul className="pt-6">
                <li className="mb-4">
                <a
                    href="/Admin/Dashboard"
                    onClick={() => handleLinkClick("Dashboard")} // تعيين القسم النشط عند النقر
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Dashboard" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <MdDashboard />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Dashboard</span>
                </a>
                </li>
                
                <li className="mb-4">
                <a
                    href="/Admin/Users"
                    onClick={() => handleLinkClick("Users")} 
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Users" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <FaUserAlt />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Users</span>
                </a>
                </li>
              
                <li className="mb-4">
                <a
                    href="/Admin/Products"
                    onClick={() => handleLinkClick("Products")} 
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Products" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <AiFillProduct />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Products</span>
                </a>
                </li >
                <li  className="mb-4">
                <a
                    href="/Admin/Orders"
                    onClick={() => handleLinkClick("Orders")}
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Orders" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <FaShoppingBasket />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Orders</span>
                </a>
                </li>
                <li className="mb-4">
                <a
                    href="/Admin/Deliveries"
                    onClick={() => handleLinkClick("Deliveries")}
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Deliveries" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <TbTruckDelivery />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Deliveries</span>
                </a>
                </li>
                
                <li className="mb-4">
                <a
                    href="/Admin/Payments"
                    onClick={() => handleLinkClick("Payments")} 
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Payments" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <RiSecurePaymentFill />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Payments</span>
                </a>
                </li>
               
                <li className="mb-4">
                <a
                    href="/Admin/Reports"
                    onClick={() => handleLinkClick("Reports")} 
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Reports" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <TbMessageReportFilled />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Reports</span>
                </a>
                </li>
                <li className="mb-4">
                <button
                    
                    onClick={() => handleLogout()}
                    className={`flex items-center p-2 text-white rounded-lg transition-colors hover:bg-blue-700 w-full`}
                >
                    <RiLogoutBoxFill />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Logout</span>
                </button>
                </li>
                
            </ul>
        </div>
    ) : (
        <div className={`${isOpen ? "w-64" : "w-20"} bg-blue-950 min-h-screen p-5 pt-8 relative duration-300 shadow-lg border border-gray-300 transition-all ease-in-out`}>
            <div className="flex items-center justify-between mb-5">
                <div className={`flex flex-col items-start text-white duration-200 ${!isOpen && "scale-0"}`}>
                    <h2 className="font-bold text-2xl transition-all duration-300">{user.name}</h2>
                    <div className="flex items-center mt-1">
                        <MdSecurity className="text-white text-base mr-2" />
                        <span className="font-semibold text-sm bg-gradient-to-r from-blue-500 to-blue-700 rounded-full px-3 py-1 shadow-lg">
                            Manager
                        </span>
                    </div>
                </div>
                {/* السهم داخل الشريط */}
                <button onClick={() => setIsOpen(!isOpen)} className="text-white absolute right-4 transition-transform duration-300 transform hover:scale-110">
                    {isOpen ? <FaChevronCircleLeft /> : <FaChevronCircleRight />}
                </button>
            </div>
            <ul className="pt-6">
                <li className="mb-4">
                <a
                    href="/Manager/Dashboard"
                    onClick={() => handleLinkClick("Dashboard")}  // تعيين القسم النشط عند النقر
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Dashboard" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <MdDashboard />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Dashboard</span>
                </a>
                </li>
                
                <li className="mb-4">
                <a
                    href="/Manager/Products"
                    onClick={() => handleLinkClick("Products")} 
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Products" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <AiFillProduct />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Products</span>
                </a>
                </li>

               <li className="mb-4">
               <a
                    href="/Manager/Orders"
                    onClick={() => handleLinkClick("Orders")} 
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Orders" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <FaShoppingBasket />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Orders</span>
                </a>
               </li>
                
                
                <li className="mb-4">
                <a
                    href="/Manager/Deliveries"
                    onClick={() => handleLinkClick("Deliveries")} 
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Deliveries" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <TbTruckDelivery />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Deliveries</span>
                </a>
                </li>
               
                <li className="mb-4">
                <a
                    href="/Manager/Payments"
                    onClick={() => handleLinkClick("Payments")} 
                    className={`flex items-center p-2 text-white rounded-lg transition-colors ${activeLink === "Payments" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                >
                    <RiSecurePaymentFill />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Payments</span>
                </a>
                </li>
                <li className="mb-4">
                <button
                    
                    onClick={() => handleLogout()}
                    className={`flex items-center p-2 text-white rounded-lg transition-colors hover:bg-blue-700 w-full`}
                >
                    <RiLogoutBoxFill />
                    <span className={`ml-3 ${!isOpen && "hidden"}`}>Logout</span>
                </button>
                </li>
                
            </ul>
        </div>
    )}
</>


  );
};

export default Sidebar;