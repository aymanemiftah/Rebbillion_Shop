import React, { useContext, useEffect, useState } from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { Link, useNavigate } from "react-router-dom";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import SearchComponent from "../../utils/SerchInput";
import { FaPlusCircle } from "react-icons/fa";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { axiosClient } from "../../../api/axios";

import { motion } from 'framer-motion';
import Titlepage from "../../Titlepage/Titlepage";

import CartInfo from "../../Cart-Info/Cart_Info";

import '../../../CSS/Showproduct.css'

export default function ShowProducts(){
    const {currentPageProduct,handlePageChangeProducts,totalPagesProduct}=useContext(DonnerContext)
    const {products}=useContext(DonnerContext)
    const {productsall}=useContext(DonnerContext)

    const {DeleteProduct}=useContext(DonnerContext)

    const [showDescription, setShowDescription] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleShowMore = (product) => {
        setSelectedProduct(product);
        setShowDescription(true);
    };

    const closeDescription = () => {
        setShowDescription(false);
        setSelectedProduct(null);
    };

    const[product,setProduct]=useState([])
    const navigate=useNavigate('');
    const[search,setsearch]=useState('');

    useEffect(()=>{
        setProduct(products)
    },[products])

    useEffect(()=>{
        const fetchProducts = async ()=>{
            try {
                const response = await axiosClient.get('/api/products');
                setProduct(response.data.data);
            } catch (error) {
                console.error(error);  
            }
        }
        fetchProducts();
    },[])

    const Search =(value)=>{
        setsearch(value)
    }

    const handleDelete = async(e,id)=>{
        e.preventDefault();
        try {
            await DeleteProduct(id);
            setProduct(pr=>pr.filter(prev=>prev.id != id));
            showSuccessAlert('Product Deleted Seccessefuly');
            navigate('/Admin/Products')
        } catch (error) {
            console.log(error);
            
            showFailedAlert('Faild to Delete Product')
        }
    }

    const pagination = ()=>{
        let pageNumber =[];
        for (let i = 1; i <= totalPagesProduct; i++) {
            pageNumber.push(
                <button 
                key={i}
                onClick={()=>handlePageChangeProducts(i,totalPagesProduct)}
                className={`px-3 py-1 mx-1 rounded-md border ${currentPageProduct === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 hover:text-white`}
                >
                    {i}
                </button>
            );
        }

        return pageNumber ;
    }

    return(
        <>
        <div className="bg-gray-100 min-h-screen rounded-lg p-8">
            
            <Titlepage role={'Admin'} page={'Products'} />
    
            <hr className="border-gray-300 mb-8" />
    
            
            <div className="mb-6 flex justify-between items-center">
                <SearchComponent onSearch={Search} />
                <Link
                    to={'/Admin/Products/create-product'}
                    className="flex justify-center items-center w-1/4 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    <FaPlusCircle className="w-4 h-4 mr-3" />
                    Create Product
                </Link>
            </div>
    
         
           

            <CartInfo Title1={'Total Products'} Value1={productsall.length}
              Title2={'In Stock'} Value2={productsall.filter(product => product.stock > 0).length}
               Title3={'Out of Stock'} Value3={productsall.filter(product => product.stock === 0).length}
               />
    
            
            <div className="relative overflow-x-auto shadow-lg rounded-lg bg-white p-6">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                        <tr>
                            
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Product Name</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Solde</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Sexe</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {product && search !== "" ? product.filter((product) =>
                            product.id === parseInt(search) ||
                            product.name.toLowerCase().startsWith(search.toLowerCase()) ||
                            product.description.toLowerCase().startsWith(search.toLowerCase()) ||
                            product.category.toLowerCase().startsWith(search.toLowerCase()) ||
                            product.sexe.toLowerCase().startsWith(search.toLowerCase()) ||
                            product.brands.toLowerCase().startsWith(search.toLowerCase()) 
                        ).map((product, key) => (
                            <tr key={key} className="hover:bg-gray-100 transition">
                                
                                <td className="px-6 py-4">
                                    <img src={`http://localhost:8000/storage/${product.image}`} className="w-16 md:w-32 h-16 md:h-32 object-cover rounded-md" alt={product.name} />
                                </td>
                                <td className="px-6 py-4 max-w-xs text-xs"> {product.name.length > 16 ? (
                                        <>
                                            {product.name.slice(0, 16)}...
                                           
                                        </>
                                    ) : (
                                        product.name
                                    )}</td>
                                <td className="px-6 py-4 max-w-xs overflow-hidden text-xs h-16">
                                    {product.description.length > 20 ? (
                                        <>
                                            {product.description.slice(0, 20)}...
                                            <button onClick={() => handleShowMore(product)} className="text-blue-500">Show More</button>
                                        </>
                                    ) : (
                                        product.description
                                    )}
                                </td>
                                <td className="px-6 py-4">{product.price}</td>
                                <td className="px-6 py-4">{product.solde}%</td>
                                <td className="px-6 py-4">{product.stock}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">{product.sexe}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <Link to={'/Admin/Products/Update-product/' + product.id} className="flex justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                        <FaRegEdit />
                                    </Link>
                                    <button onClick={(e) => handleDelete(e, product.id)} className="flex justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                        <RiDeleteBin6Fill />
                                    </button>
                                </td>
                            </tr>
                        )) : product.map((product, key) => (
                            <tr key={key} className="hover:bg-gray-100 transition">
                                
                                <td className="px-6 py-4">
                                    <img src={`http://localhost:8000/storage/${product.image}`} className="w-16 md:w-32 h-16 md:h-32 object-cover rounded-md" alt={product.name} />
                                </td>
                                <td className="px-6 py-4 max-w-xs text-xs"> {product.name.length > 16 ? (
                                        <>
                                            {product.name.slice(0, 16)}...
                                           
                                        </>
                                    ) : (
                                        product.name
                                    )}</td>
                                <td className="px-6 py-4 max-w-xs overflow-hidden text-xs h-16">
                                    {product.description.length > 20 ? (
                                        <>
                                            {product.description.slice(0, 20)}...
                                            <button onClick={() => handleShowMore(product)} className="text-blue-500">Show More</button>
                                        </>
                                    ) : (
                                        product.description
                                    )}
                                </td>
                                <td className="px-6 py-4">{product.price}</td>
                                <td className="px-6 py-4">{product.solde}%</td>
                                <td className="px-6 py-4">{product.stock}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">{product.sexe}</td>
                                <td className="px-6 py-4  ">
                                    <div className="mt-1/2 flex space-x-1">
                                    <Link to={'/Admin/Products/Update-product/' + product.id} className="flex justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                        <FaRegEdit />
                                    </Link>
                                    <button onClick={(e) => handleDelete(e, product.id)} className="flex justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                        <RiDeleteBin6Fill />
                                    </button>
                                    </div>
                                        
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            {/* عرض وصف المنتج عند الضغط عليه */}
            {showDescription && selectedProduct && (
                <motion.div
                    className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-5 overflow-y-auto"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }} 
                    exit={{ x: 300, opacity: 0 }} 
                    transition={{ duration: 0.3 }} 
                >
                    <h2 className="text-xl font-semibold border-b pb-2">{selectedProduct.name}</h2>
                    <p className="mt-2">{selectedProduct.description}</p>
                    <button onClick={closeDescription} className="mt-5 w-full bg-red-500 rounded-lg text-white hover:bg-red-800 transition duration-200">Close</button>
                </motion.div>
            )}
    
            {/* قسم التصفح (Pagination) */}
            <div className="mt-6">
                {pagination()}
            </div>
        </div>
    </>
    )


}