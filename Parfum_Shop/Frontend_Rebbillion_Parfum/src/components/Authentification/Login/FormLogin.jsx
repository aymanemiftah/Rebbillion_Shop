import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyButton from "../../ButtonLoading/Button";

export default function FormLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await props.handlelogin(e, email, password);
      props.Successefuly();
    } catch (error) {
      props.Faild();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen md:flex ">
      {/* Left Section: Registration Prompt */}
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-700 to-blue-950 justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl">Register</h1>
          <p className="text-white mt-1">Create your account</p>
          <Link to={'/Register'} className="block w-28 text-center bg-white text-blue-800 hover:bg-blue-700 hover:text-white mt-4 py-2 rounded-2xl transition duration-300 ease-in-out font-bold mb-2">
            From here!
          </Link>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex md:w-1/2 max-sm:mt-52  justify-center py-10 items-center bg-white">
        <form onSubmit={handleSubmit} className="bg-white">
          <h1 className="text-gray-700 text-center font-bold text-2xl mb-4">Login</h1>
          
          {/* Email Input */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {props.errors?.email && <p className="text-red-500 text-sm">{props.errors.email[0]}</p>}
          
          {/* Password Input */}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {props.errors?.password && <p className="text-red-500 text-sm">{props.errors.password[0]}</p>}
          
          {/* Login Button */}
          <MyButton text={'Login'} type={'submit'} loading={loading} />
          
          {/* Forgot Password Link */}
          <Link to={'/forget-password'} className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Forgot Password?
          </Link>
		  <Link to={'/Register'} className="block sm:hidden text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Register In Web.
          </Link>
        </form>
      </div>
    </div>
  );
}
