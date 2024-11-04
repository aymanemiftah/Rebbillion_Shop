import React,{useState} from "react";
import { Link } from "react-router-dom";
import MyButton from "../../ButtonLoading/Button";



export default function FormRegistre(props){
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation_password, setconfirmation_password] = useState('');
	const[loading,setloading]=useState(false)

	const handleSubmit = async (e)=>{
		e.preventDefault();
		setloading(true)
		try {
			await props.handleRegistre(e,name,email,address,phonenumber,password,confirmation_password);
			props.Successefuly();
		} catch (error) {
			props.Faild()
		}finally{
			setloading(false)
		}
	}


    

    return(
    <>
    
    <div className="h-screen md:flex">
	<div
		className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-700 to-blue-950 i justify-around items-center hidden">
		<div>
			<h1 className="text-white font-bold text-4xl font-sans">Login</h1>
			<p className="text-white mt-1">Login with your account</p>
			<Link to={'/login'} className="block w-28 text-center bg-white text-blue-800 hover:bg-blue-700 hover:text-white mt-4 py-2 rounded-2xl transition duration-300 ease-in-out font-bold mb-2">From here!</Link>
		</div>
		<div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
	</div>
	<div className="flex md:w-1/2 max-sm:mt-48 justify-center py-10 items-center bg-white">
		<form onSubmit={handleSubmit} className="bg-white">
			<h1 className="text-gray-700 text-center font-bold text-2xl mb-4">Registre</h1>
			
           
			<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
				fill="currentColor">
				<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
				clipRule="evenodd" />
				</svg>
				<input className="pl-2 outline-none border-none" onChange={(e) => setname(e.target.value)} type="text"  placeholder="Full name" />
      </div>
      {props.errors?.name && <p className="text-red-500 text-sm">{props.errors.name[0]}</p>}
				<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
				viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
				d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
				</svg>
				<input className="pl-2 outline-none border-none" onChange={(e) => setaddress(e.target.value)} type="text"  placeholder="Address" />
      </div>
      {props.errors?.address && <p className="text-red-500 text-sm">{props.errors.address[0]}</p>}
	  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
				viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
					d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
				</svg>
				<input className="pl-2 outline-none border-none" onChange={(e) => setphonenumber(e.target.value)} type="text"  placeholder="+212 000-000000" />
      </div>
	  {props.errors?.phonenumber && <p className="text-red-500 text-sm">{props.errors.phonenumber[0]}</p>}
				<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
				viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
				</svg>
				<input className="pl-2 outline-none border-none" onChange={(e) => setEmail(e.target.value)} type="email"  placeholder="Email Address" />
      </div>
      {props.errors?.email && <p className="text-red-500 text-sm">{props.errors.email[0]}</p>}
				<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
				fill="currentColor">
				<path fillRule="evenodd"
				d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
				clipRule="evenodd" />
				</svg>
				<input className="pl-2 outline-none border-none" onChange={(e) => setPassword(e.target.value)} type="password"  placeholder="Password" />
      </div>
      {props.errors?.password && <p className="text-red-500 text-sm">{props.errors.password[0]}</p>}
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
				fill="currentColor">
				<path fillRule="evenodd"
				d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
				clipRule="evenodd" />
				</svg>
				<input className="pl-2 outline-none border-none"  onChange={(e) => setconfirmation_password(e.target.value)}type="password"  placeholder="Password confirmation" />
        </div>
        {props.errors?.confirmation_password && <p className="text-red-500 text-sm">{props.errors.confirmation_password[0]}</p>}
				<MyButton text={'Registre'} loading={loading} type={'submit'} />
				<Link to={'/login'} className="block sm:hidden text-sm ml-2 hover:text-blue-500 cursor-pointer">
				Login.
			</Link>
		</form>
	</div>
</div>
   
    </>
    )
}