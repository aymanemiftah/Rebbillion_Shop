import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { AnimatePresence , motion } from "framer-motion";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../api/axios";
import { RiEdit2Fill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri"



export default function ProfilAccount(){

    const {user}=useContext(AuthContext)
    const {ordersall}=useContext(DonnerContext)
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [email, setEmail] = useState('');
    const [image, setimage] = useState('');
    
    const [imageshowing, setimageshowing] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [errors, seterrors] = useState({});
    const[ProfilIsOpen,setProfilIsOpen]=useState(false)
    const[OrdersIsOpen,setOrdersIsOpen]=useState(false)
    const navigate =useNavigate('')
    const fileInputRef = useRef(null);
    const [isEditable, setIsEditable] = useState(false); // Initially, the inputs are disabled

    const handleEditClick = () => {
      setIsEditable(!isEditable); // Toggle between editable and non-editable
    };
  
    
   

    const{UpdateSelfUser}=useContext(DonnerContext)
    const id = user.id
    useEffect(()=>{
        if(user.role ==='user'){
            fetchUser()
        }
    },[user])


    const fetchUser = async ()=>{
        await axiosClient.get('/api/users/'+id)
        .then(({data})=>{
            const {name,address,image,phonenumber,email}=data.user;
            setname(name)
            setaddress(address)
            setEmail(email)
            
            setimage(image)
            setphonenumber(phonenumber)
            
        })
        
    }

       

    const handleShowProfile=()=>{
        setProfilIsOpen(!ProfilIsOpen)
        setOrdersIsOpen(false)
        
    }
    const handleShoworders=()=>{
        setOrdersIsOpen(!OrdersIsOpen)
        setProfilIsOpen(false)
    }

    const handleUpdateUser=async (e)=>{
        e.preventDefault()
        
        const userself = {name:name,address:address,email:email,image:image,phonenumber:phonenumber}
        try {
            await UpdateSelfUser(userself,user.id)
            showSuccessAlert('Product Updated Successefuly')
            navigate('/')
            
        } catch (error) {
            if(error?.data?.errors){
                seterrors(error.data.errors)
                showFailedAlert('Faild Update Product')
            }
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setimage(file); 
          setimageshowing(URL.createObjectURL(file));
        }
      };
    
      const handleImageClick = () => {
        fileInputRef.current.click(); // Programmatically trigger the file input click
      };


    return(
    < >
    <div className="w-full  ">
        <div className="w-full h-[300px] mt-20  flex items-center justify-center ">
        <div className="w-3/4 h-[270px] rounded-2xl bg-[#c3eae1] shadow-xl flex items-center justify-center">
        <h1 className=" text-3xl space-x-1 font-bold ">Welcome Mr/Ms  </h1><h1 className=" text-3xl  font-bold ml-3 uppercase text-gray-600">{name}</h1>
        </div>
        
        </div>
        <div className="w-full h-[40px] mt-11 mb-11 flex space-x-60 items-center justify-center ">
        <button
        onClick={handleShowProfile}
        className="text-white w-36 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >{
            ProfilIsOpen ? 'Close Profil' :'Show Profil'
        }
       
        <span
            className={`ml-2 inline-block transform transition-transform duration-300 ${
            ProfilIsOpen ? "rotate-180" : "rotate-0"
            }`}
        >
            <RiArrowDownSLine />
        </span>
        </button>
        <button
        onClick={handleShoworders}
        className="text-white w-36 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl     font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >{
            OrdersIsOpen ? 'Close Orders' :'Show Orders'
        }
       
        <span
            className={`ml-2 inline-block transform transition-transform duration-300 ${
                OrdersIsOpen ? "rotate-180" : "rotate-0"
            }`}
        >
            <RiArrowDownSLine />
        </span>
        </button>
        </div>
        {
            <AnimatePresence>
                {ProfilIsOpen && (
                    <motion.div 
                    initial={{ opacity: 0, y: -20 }} // الحركة عند الفتح
                    animate={{ opacity: 1, y: 0 }} // الحركة المستمرة عند العرض
                    exit={{ opacity: 0, y: -20 }} // الحركة عند الإغلاق
                    transition={{ duration: 1 }}
                    className=" w-full  mb-28 h-auto   bg-[#c3eae1]  rounded-b-xl  "
                    >
                        
                <div class="min-h-[600px] p-6 bg-[#c3eae1] flex items-center justify-center">
                <div class="container max-w-screen-lg mx-auto">
                    <div>
                    

                    <div class="bg-white rounded-2xl shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div class="text-gray-600">
                            <p class="font-medium text-lg">Personal Details</p>
                            <p>Please fill out all the fields.</p>
                            <input
                                ref={fileInputRef} // Attach the ref to the input
                                onChange={handleImageChange}
                                type="file"
                                className="hidden" // Hide the input element
                            />
                    {imageshowing ? (
                        <img
                        src={imageshowing}
                        className="mt-16 rounded-full object-cover w-40 h-40 cursor-pointer"
                        alt="preview"
                        onClick={handleImageClick} // Trigger file input on image click
                        />
                    ) : (
                        <img
                        src={`http://localhost:8000/storage/${image}`}
                        className="mt-16 rounded-full object-cover w-40 h-40 cursor-pointer"
                        alt="preview"
                        onClick={handleImageClick} // Trigger file input on image click
                        />
                    )}
                    {errors?.imaage && <p className="text-red-500 text-sm">{errors.image[0]}</p>}
                        </div>

                        <div class="lg:col-span-2">
                        <form onSubmit={handleUpdateUser}>
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                            <div className="md:col-span-5 flex justify-between items-center">
                            <label htmlFor="full_name">Full Name</label>
                            <button type="button" onClick={handleEditClick} className="text-blue-950 ">
                                {/* Edit icon or text */}
                                {isEditable ? <FaSave className="w-8 h-8"/> : <RiEdit2Fill className="w-8 h-8"/>}
                            </button>
                            </div>
                            <div className="md:col-span-5">
                            <input
                                type="text"
                                onChange={(e) => setname(e.target.value)}
                                value={name || ''}
                                name="full_name"
                                id="full_name"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                placeholder={user?.name}
                                disabled={!isEditable} // Disable if not in edit mode
                            />
                            {errors?.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
                            </div>

                            <div className="md:col-span-5">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email || ''}
                                name="email"
                                id="email"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                placeholder={user?.email}
                                disabled={!isEditable} // Disable if not in edit mode
                            />
                            {errors?.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
                            </div>

                            <div className="md:col-span-3">
                            <label htmlFor="address">Address / Street</label>
                            <input
                                type="text"
                                onChange={(e) => setaddress(e.target.value)}
                                value={address || ''}
                                name="address"
                                id="address"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                placeholder={user?.address}
                                disabled={!isEditable} // Disable if not in edit mode
                            />
                            {errors?.address && <p className="text-red-500 text-sm">{errors.address[0]}</p>}
                            </div>

                            <div className="md:col-span-2">
                            <label htmlFor="phone_number">Phone Number</label>
                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                <input
                                name="phone_number"
                                onChange={(e) => setphonenumber(e.target.value)}
                                value={phonenumber || ''}
                                id="phone_number"
                                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                placeholder={user?.phonenumber}
                                disabled={!isEditable} // Disable if not in edit mode
                                />
                                {errors?.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber[0]}</p>}
                            </div>
                            </div>

                            <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end">
                                <button
                                className="bg-blue-950 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                disabled={!isEditable} // Disable submit if not in edit mode
                                >
                                {isEditable ? 'Save Changes' : 'Edit'}
                                </button>
                            </div>
                            </div>
                        </div>
                        </form>
                        </div>
                        </div>
                    </div>
                    </div>

                   
                </div>
                </div>
                        
                    </motion.div>
                )}
            </AnimatePresence>
            
        }
        {
            <AnimatePresence>
            {OrdersIsOpen && (
                <motion.div 
                initial={{ opacity: 0, y: -20 }} // الحركة عند الفتح
                animate={{ opacity: 1, y: 0 }} // الحركة المستمرة عند العرض
                exit={{ opacity: 0, y: -20 }} // الحركة عند الإغلاق
                transition={{ duration: 1 }}
                className=" w-full  mb-28 h-auto   bg-[#c3eae1]  rounded-b-xl  "
                >
                    
            <div class="min-h-[600px] p-6 bg-[#c3eae1] flex items-center justify-center">
            <div class="container max-w-screen-lg mx-auto ">
                <div className="bg-white 11/12 p-6 rounded-2xl">
                <h2 className="text-3xl text-gray-700 font-bold">Product Of your Orders</h2>
                
                <div className=" h-auto grid grid-cols-3  " >
                    
                       { ordersall.filter((order)=> order.user_id === user.id ).map((order)=>
                       order.products.map((product,key)=>
                        
                       <div  key={key} className="max-w-[300px]  min-w-[300px] custom-lg:w-full h-60 custom-lg:h-32 block custom-lg:flex mt-6 items-center space-x-3 border border-blue-500 rounded-xl">
                       <img className="w-full custom-lg:w-1/2 h-1/2 custom-lg:h-full object-cover rounded-xl" src={`http://localhost:8000/storage/${product.image}`} />
                       <div className="w-full custom-lg:w-1/2 h-1/2 custom-lg:h-full  flex justify-center max-custom-lg:items-center    flex-col">
                           <h4 className="md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700">{product.name.length > 13 ? (
                               <>
                                   {product.name.slice(0, 13)}...
                                  
                               </>
                           ) : (
                               product.name
                           )}</h4>
                        <p className="font-bold text-blue-500 ">{product.price} MAD</p>
                       </div>
                   </div>)
                    ) 
                       }
                </div>
                </div>
               
            </div>
            </div>
                    
                </motion.div>
            )}
        </AnimatePresence>
        }

    </div>
    </>
    )

}