import React ,{ useContext, useEffect, useState }from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { axiosClient } from "../../../api/axios";
import MyButton from "../../ButtonLoading/Button";

export default function UpdateUser(){
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [email, setEmail] = useState('');
    const [role, setrole] = useState('');
    const [image, setimage] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [errors, seterrors] = useState({});
    const [loading, setloading] = useState(false);
    const navigate=useNavigate('')
    const {id}=useParams();
    const {user} = useContext(AuthContext)

    

    const {UpdateUser}=useContext(DonnerContext);
    
    useEffect(()=>{
        if(user.role ==='admin' ||user.role ==='manager' ||user.role ==='user' ){
            fetchUser()
        }
        
    },[user])

    const fetchUser = async ()=>{
        await axiosClient.get('/api/users/'+id)
        .then(({data})=>{
          console.log(data.user.phonenumber);
          
            const {name,address,phonenumber,email,role}=data.user;
            setname(name)
            setaddress(address)
            setEmail(email)
            setphonenumber(phonenumber)
            setrole(role)
        })
    }
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        setloading(true)
        const user = {
            name: name,
            address: address,
            email: email,
            role: role,
            phonenumber: phonenumber,
            image:image
        };

        try {
            
            await UpdateUser(user, id);
            navigate('/Admin/Users');
            showSuccessAlert('User Updated Successefuly')
        } catch (error) {
            
            if (error?.data?.errors) {
                seterrors(error.data.errors);
            } 
                showFailedAlert('Failed To Update User');
            
        }finally{
            setloading(false)
        }
    };
return(
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Update User</h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="relative z-0 w-full group">
            <input onChange={(e) => setname(e.target.value)} type="text" value={name} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="User Name" />
            {errors?.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
          </div>

          <div className="relative z-0 w-full group">
            <input onChange={(e) => setaddress(e.target.value)} type="text" value={address} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Address" />
            {errors?.address && <p className="text-red-500 text-sm">{errors.address[0]}</p>}
          </div>

          <div className="relative z-0 w-full group">
            <input onChange={(e) => setphonenumber(e.target.value)} type="text" value={phonenumber} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="+212 000-000000" />
            {errors?.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber[0]}</p>}
          </div>

          <div className="relative z-0 w-full group">
            <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Email Address" />
            {errors?.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
          </div>
          <div className="relative z-0 w-full group">
              <input onChange={(e) => setimage(e.target.files[0])} type="file" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Image" />
              {errors?.image && <p className="text-red-500 text-sm">{errors.image[0]}</p>}
            </div>

          <div className="relative z-0 w-full group">
            <select onChange={(e) => setrole(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
              <option value={role}>{role}</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
            {errors?.role && <p className="text-red-500 text-sm">{errors.role[0]}</p>}
          </div>

          <MyButton text={'Update User'} type={'submit'} loading={loading} />
        </form>
      </div>
    </div>
)
}