import React from "react";
import { useState ,useContext,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { axiosClient } from "../../../api/axios";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import MyButton from "../../ButtonLoading/Button";

export default function UpdateProduct(){

    const{UpdateProduct}=useContext(DonnerContext)

    const{user}=useContext(AuthContext)


    const [name,setname]=useState('');
    const [description,setdescription]=useState('');
    const [price,setprice]=useState();
    const [last_price,setlast_price]=useState();
    const [solde,setsolde]=useState();
    const [stock,setstock]=useState();
    const [category,setcategory]=useState('');
    const [brands,setbrands]=useState('');
    const [sexe,setsexe]=useState('');
    const [image,setimage]=useState('');
    const[errors,seterrors]=useState({})
    const{id}=useParams();
    const[loading,setloading]=useState(false)
    const navigate=useNavigate("");

    const[product,setproduct]=useState();
    
    const fetchProduct = async ()=>{
        
              await axiosClient.get('/api/products/'+id)
              .then(({data})=>{
                const{name,description,price,last_price,brands,solde,stock,image}=data.product;
                setname(name)
                setdescription(description)
                setprice(price)
                setlast_price(last_price)
                setbrands(brands)
                setsolde(solde)
                setstock(stock)
                setimage(image)
              })
            
        
    }

    useEffect(()=>{
        if(user?.role === 'admin' || user?.role === 'manager'){
            fetchProduct()
        }else{
            throw new Error("Unauthorized");
            
        }
    },[user])

    const handleUpdate= async (e)=>{
        e.preventDefault()
        const Prod={name:name,description:description,price:price,last_price:last_price,solde:solde,brands:brands,stock:stock,category:category,sexe:sexe,image:image};
        setloading(true)
        try {
          await  UpdateProduct(Prod,id);
            navigate('/Manager/Products')
            showSuccessAlert('Product Updated Successefuly')
        } catch (error) {
            if(error?.data?.errors){
                seterrors(error.data.errors)
            }

            showFailedAlert('Faild Update Product')
        }finally{
            setloading(false)
        }

    }
    return (<div className="flex justify-center items-center min-h-screen bg-gray-300">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Update Product</h2>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="relative z-0 w-full group">
              <input onChange={(e) => setname(e.target.value)} type="text" value={name || ""} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Product Name" />
              {errors?.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
            </div>
  
            <div className="relative z-0 w-full group">
              <textarea onChange={(e) => setdescription(e.target.value)} value={description || ""} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Description"></textarea>
              {errors?.description && <p className="text-red-500 text-sm">{errors.description[0]}</p>}
            </div>
  
            <div className="relative z-0 w-full group">
              <input onChange={(e) => setprice(e.target.value)} type="number" value={price || ""} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Price" />
              {errors?.price && <p className="text-red-500 text-sm">{errors.price[0]}</p>}
            </div>

            <div className="relative z-0 w-full group">
              <input onChange={(e) => setlast_price(e.target.value)} type="number" value={last_price || ""} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Last Price" />
              {errors?.last_price && <p className="text-red-500 text-sm">{errors.last_price[0]}</p>}
            </div>

            
            <div className="relative z-0 w-full group">
              <input onChange={(e) => setsolde(e.target.value)} type="number" value={solde || ""} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Solde" />
              {errors?.solde && <p className="text-red-500 text-sm">{errors.solde[0]}</p>}
            </div>
  
            <div className="relative z-0 w-full group">
              <input onChange={(e) => setstock(e.target.value)} type="number" value={stock || ""} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Stock" />
              {errors?.stock && <p className="text-red-500 text-sm">{errors.stock[0]}</p>}
            </div>

            <div className="relative z-0 w-full group">
              <input onChange={(e) => setbrands(e.target.value)} type="text" value={brands || ""} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Brands" />
              {errors?.brands && <p className="text-red-500 text-sm">{errors.brands[0]}</p>}
            </div>
  
            <div className="relative z-0 w-full group">
              <select onChange={(e) => setcategory(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                <option>Category</option>
                <option value="Parfum">Parfum</option>
                <option value="Make_up">Make_up</option>
                <option value="Facial_treatment">Facial_treatment</option>
                <option value="Refreshment">Refreshment</option>
              </select>
              {errors?.category && <p className="text-red-500 text-sm">{errors.category[0]}</p>}
            </div>
  
            <div className="relative z-0 w-full group">
              <select onChange={(e) => setsexe(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                <option>Sexe</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
              {errors?.sexe && <p className="text-red-500 text-sm">{errors.sexe[0]}</p>}
            </div>
  
            <div className="relative z-0 w-full group">
              <input onChange={(e) => setimage(e.target.files[0])} type="file" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Image" />
              {errors?.image && <p className="text-red-500 text-sm">{errors.image[0]}</p>}
            </div>
  
            <MyButton text={'Update Product'} type={'submit'} loading={loading} />
          </form>
        </div>
      </div>)



}