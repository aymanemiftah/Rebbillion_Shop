import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/User/Navbar"
import Footer from "../Footer/Footer"

export default function Layout(){
    return(
        <>
        <header><Navbar/></header>
        <main className="w-full"><Outlet/></main>
        <footer><Footer/></footer>
        </>
    )

}