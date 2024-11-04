import React ,{ useContext, useState }from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import { useNavigate } from "react-router-dom";
import MyButton from "../../ButtonLoading/Button";


export default function CreateUser(){
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation_password, setconfirmation_password] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [role, setrole] = useState('');
    const [image, setimage] = useState('');
    const [errors, seterrors] = useState({});
    const [loading,setloading]=useState(false)
    const navigate=useNavigate('')

    

    const {CreateUser}=useContext(DonnerContext);

    const handleCreate =async (e)=>{
        e.preventDefault();
        setloading(true)
        const user ={name : name ,phonenumber:phonenumber,address:address,image:image,email:email,password:password,confirmation_password:confirmation_password,role:role};
        try {
            
           await CreateUser(user);
           navigate('/Admin/Users');
           showSuccessAlert("User Created Successefuly")
        } catch (error) {
            seterrors(error.data.errors)
            showFailedAlert('Faild To Create User');
        }finally{
            setloading(false)
        }
    }
return(
    <>
    <div className="flex justify-center items-center rounded-lg min-h-screen bg-gray-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Create New User</h2>
        <form onSubmit={handleCreate} className="space-y-6">
          <div className="relative z-0 w-full group">
            <input onChange={(e) => setname(e.target.value)} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="User Name" />
            {errors?.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
          </div>
          <div className="relative z-0 w-full group">
            <input onChange={(e) => setaddress(e.target.value)} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Address" />
            {errors?.address && <p className="text-red-500 text-sm">{errors.address[0]}</p>}
          </div>
          <div className="relative z-0 w-full group">
            <input onChange={(e) => setphonenumber(e.target.value)} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="+212 000-000000" />
            {errors?.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber[0]}</p>}
          </div>
          <div className="relative z-0 w-full group">
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Email" />
            {errors?.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
          </div>
          <div className="relative z-0 w-full group">
            <input onChange={(e) => setPassword(e.target.value)} type="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Password" />
            {errors?.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
          </div>
          <div className="relative z-0 w-full group">
            <input onChange={(e) => setconfirmation_password(e.target.value)} type="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Confirmation Password" />
            {errors?.confirmation_password && <p className="text-red-500 text-sm">{errors.confirmation_password[0]}</p>}
          </div>
          <div className="relative z-0 w-full group">
              <input onChange={(e) => setimage(e.target.files[0])} type="file" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Image" />
              {errors?.image && <p className="text-red-500 text-sm">{errors.image[0]}</p>}
            </div>
          <div className="relative z-0 w-full group">
            <select onChange={(e) => setrole(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
              <option>Role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
            {errors?.role && <p className="text-red-500 text-sm">{errors.role[0]}</p>}
          </div>
          <MyButton text={'Create User'} type={'submit'} loading={loading} />
        </form>
      </div>
    </div>
    </>
)
}