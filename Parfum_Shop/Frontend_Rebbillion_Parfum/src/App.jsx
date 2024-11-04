import { RouterProvider } from "react-router-dom"
import { router } from "./routes/index.jsx"
import React from "react";
import { useContext } from "react";
import { AuthContext } from "./components/Context/AuthContext/AuthContext.jsx";
import { ToastContainer } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  const {user} = useContext(AuthContext);
  return (
    <>
      <RouterProvider router={router(user)}/>
      <ToastContainer/>
    </>
  )
}

export default App
