import React, { useState, useRef, useEffect, useContext } from "react";
import logo from "../../../image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import SearchNavbar from "../../utils/Searchnavbar";
import TableSearch from "../TableSearch/TableSearch";
import LikesProducts from "../Like/Likes";
import ProductsInBasket from "../Basket/ProductsInBasket";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { FiUser } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar() {
    const [search, setSearch] = useState('');
    const [resulta, setResulta] = useState('');
    const [showTableSearch, setShowTableSearch] = useState(false);
    const tableRef = useRef(null); 
    const menuRef = useRef(null); 

    const divRef = useRef(null);
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isOpenLogin, setIsOpenLogin] = useState(false);

    const [likesCount, setLikesCount] = useState(0); 
    const [basketCount, setBasketCount] = useState(0);
    const {user}=useContext(AuthContext)
    const {logout}=useContext(AuthContext)
    const navigate = useNavigate('');
   
    
    const{likedProducts,BasketProducts}=useContext(DonnerContext)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggeleLoginMenu = ()=>{
        setIsOpenLogin(!isOpenLogin)
        
        
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setIsOpenLogin(false);
            }
        };

        if (isOpenLogin) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpenLogin]);


    useEffect(()=>{
        setLikesCount(likedProducts.length);
        setBasketCount(BasketProducts.length)
    },[likedProducts,BasketProducts])
    

    const Search = (value) => {
        setSearch(value);
        if (value.trim() === '') {
            setShowTableSearch(false);
        } else {
            setShowTableSearch(true);
        }
    };
    
    const Resulta = (value) => {
        setResulta(value);
        
    };

    const handleLogout =() => { 
        logout();
        navigate("/");
        setIsOpenLogin(false)
    };

    // Close TableSearch if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tableRef.current && !tableRef.current.contains(event.target)) {
                setShowTableSearch(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [tableRef]);

    // Close menu if clicking outside
    useEffect(() => {
        const handleClickOutsideMenu = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false); 
            }
        };
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutsideMenu);
        } else {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        };
    }, [isMenuOpen]);

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-white max-h-[120px] flex min-h-[120px]">
                <div className="flex justify-between items-center mx-auto w-full sm:w-3/4 p-4">
                    <div className="custom-md:hidden">
                        <button
                            className="text-blue-950 dark:text-blue-950 focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="max-h-[100px] h-auto" alt="Logo" />
                    </Link>
                    <div className="hidden custom-lg:block">
                        <SearchNavbar OnSearch={Search} OnSubmit={Resulta} />
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-6 rtl:space-x-reverse">
                        { user ? 
                        <button onClick={toggeleLoginMenu} className="text-lg sm:text-2xl flex justify-center items-center text-white hover:underline rounded-full bg-blue-950 w-9 h-9 sm:w-12 sm:h-12">
                        <FiUser />
                        </button>
                        : <a href="/login" className="text-lg sm:text-2xl flex justify-center items-center text-white hover:underline rounded-full bg-blue-950 w-9 h-9 sm:w-12 sm:h-12">
                            <FiUser />
                        </a>

                        }
                        {
                           <AnimatePresence>
                           {isOpenLogin && (
                               <motion.div
                                   ref={divRef}
                                   initial={{ opacity: 0, y: -20 }} // الحركة عند الفتح
                                   animate={{ opacity: 1, y: 0 }} // الحركة المستمرة عند العرض
                                   exit={{ opacity: 0, y: -20 }} // الحركة عند الإغلاق
                                   transition={{ duration: 0.3 }} // مدة الحركة
                                   className="fixed top-[120px] right-5 md:right-44 lg:right-48 xl:right-60 w-60 bg-white p-4 shadow-xl  rounded-b-xl z-50 overflow-auto"
                                   style={{ maxHeight: "calc(100vh - 150px)" }}
                               >
                                <div className="w-full flex flex-col  items-center">
                                    
                                    <a href="/Profil-Account" className="w-full h-10 flex justify-center items-center rounded-3xl font-bold hover:bg-gray-500 hover:text-white ">
                                        Profil Account
                                    </a>
                                    <hr className="mt-3 mb-3  w-full" />
                                    <button 
                                    onClick={handleLogout}
                                    className="w-full bg-blue-950 font-bold text-white h-10 hover:bg-blue-500 rounded-3xl"
                                    >
                                        Logout
                                    </button>

                                </div>
                                  
                               </motion.div>
                           )}
                       </AnimatePresence>
                        }
                        
                       
                        {/* Likes icon with count */}
                        <div className="relative">
                            <span className=" text-lg sm:text-2xl flex justify-center items-center text-white hover:underline rounded-full bg-blue-950 w-9 h-9 sm:w-12 sm:h-12">
                                <LikesProducts />
                            </span>
                            {likesCount >= 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                {likesCount}
                            </span>
                            )}
                        </div>

                        {/* Basket icon with count */}
                        <div className="relative">
                        <span className=" text-lg sm:text-2xl flex justify-center items-center text-white hover:underline rounded-full bg-blue-950 w-9 h-9 sm:w-12 sm:h-12">
                                <ProductsInBasket />
                            </span>
                            {basketCount >= 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                    {basketCount}
                                </span>
                            )}
                        </div>

                        
                    </div>
                </div>
            </nav>

            <nav className=" bg-white  flex items-center justify-center custom-lg:hidden border-gray-200 dark:bg-white max-h-[60px] min-h-[60px]">
                <div className=" w-11/12  items-center max-h-[41px] min-h-[41px]">
                    <SearchNavbar OnSearch={Search} OnSubmit={Resulta} />
                </div>
            </nav>

            {showTableSearch && (
                <div className="w-full flex justify-center">
                    <div 
                        ref={tableRef}
                        className="absolute top-[120px] w-11/12 bg-gray-200 z-10 rounded-lg max-custom-lg:top-[175px]"
                    >
                        <TableSearch Search={search} Resulta={resulta} />
                    </div>
                </div>
            )}

            {/* Mobile menu */}
            {isMenuOpen && (
                <nav ref={menuRef} className="bg-white dark:bg-gray-900 custom-md:hidden">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                    <li><a href={"/"} className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a></li>
                        <li><a href={`/Products/Perfumes?search=${'Parfum'}`} className="text-gray-900 dark:text-white hover:underline">Perfumes</a></li>
                        <li><a href={`/Products/Makeup?search=${'Make_up'}`} className="text-gray-900 dark:text-white hover:underline">Makeup</a></li>
                        <li><a href={`/Products/FacialTraitment?search=${'Facial_treatment'}`} className="text-gray-900 dark:text-white hover:underline">Facial Treatment</a></li>
                        <li><a href={`/Products/Hors&Body?search=${'Hors_Body'}`} className="text-gray-900 dark:text-white hover:underline">Horses & Body</a></li>
                        <li><a href={`/Products/Men-Products?search=${'Men'}`} className="text-gray-900 dark:text-white hover:underline">Men</a></li>
                        <li><a href={`/Products/Women-Products?search=${'Women'}`} className="text-gray-900 dark:text-white hover:underline">Women</a></li>
                    </ul>
                </nav>
            )}

            {/* Desktop menu */}
            <nav className="bg-blue-50 dark:bg-blue-950 max-h-[70px] min-h-[70px] hidden custom-md:flex">
                <div className="max-w-screen-xl px-4 py-3 mx-auto max-h-[70px] min-h-[70px] flex justify-center items-center">
                    <ul className="flex flex-row text-lg font-normal mt-0 space-x-8 rtl:space-x-reverse">
                        <li><a href={"/"} className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a></li>
                        <li><a href={`/Products/Perfumes?search=${'Parfum'}`} className="text-gray-900 dark:text-white hover:underline">Perfumes</a></li>
                        <li><a href={`/Products/Makeup?search=${'Make_up'}`} className="text-gray-900 dark:text-white hover:underline">Makeup</a></li>
                        <li><a href={`/Products/FacialTraitment?search=${'Facial_treatment'}`} className="text-gray-900 dark:text-white hover:underline">Facial Treatment</a></li>
                        <li><a href={`/Products/Hors&Body?search=${'Hors_Body'}`} className="text-gray-900 dark:text-white hover:underline">Horses & Body</a></li>
                        <li><a href={`/Products/Men-Products?search=${'Men'}`} className="text-gray-900 dark:text-white hover:underline">Men</a></li>
                        <li><a href={`/Products/Women-Products?search=${'Women'}`} className="text-gray-900 dark:text-white hover:underline">Women</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
