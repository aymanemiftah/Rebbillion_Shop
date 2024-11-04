
import { Outlet } from "react-router-dom"


import SideBarMenu from "../../pages/Sidebarmenu/Sidebarmenu"



export default function AdminLayout(){
   
    
   
    return(
        <div className="flex">
            <SideBarMenu />
            <div className="flex-1 ">
                <header>
                   
                </header>
                <main className="min-h-screen  ">
                    <div className="min-h-screen bg-gray-300 p-6">
                    
                    <Outlet />
                    </div>
                </main>
                
            </div>
        </div>
    )

}