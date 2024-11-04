import React ,{useState , useEffect, useContext}from "react"
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxFill } from "react-icons/ri";


export default function NavbarAdminChild(){

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const {user}=useContext(AuthContext);
    const {logout}=useContext(AuthContext);
    const navigate = useNavigate('');

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
      };
      const closeDropdown = (event) => {
        if (event.target.closest('#user-dropdown') || event.target.closest('#user-menu-button')) return;
        setIsDropdownOpen(false);
      };
      useEffect(() => {
        document.addEventListener('click', closeDropdown);
        return () => {
          document.removeEventListener('click', closeDropdown);
        };
      }, []);
      const handleLogout =()=>{
        logout();
        navigate('/')
      }
      
    return(
      <>
      <nav className="bg-blue-950 border-blue-950"> 
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="relative ml-auto md:order-2">
            <button
              type="button"
              className="flex text-sm text-gray-300 rounded-full md:me-0"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              id="user-menu-button"
            >
              <span className="sr-only">Open user menu</span>
              <CgProfile className="w-10 h-10" />
            </button>
    
            {isDropdownOpen && (
              <div
                id="user-dropdown"
                className="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-white dark:divide-white"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:gray-900">{user.name}</span>
                  <span className="block text-sm text-gray-900 truncate dark:text-gray-600">{user.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <button
                      onClick={() => handleLogout()}
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-600 hover:text-white w-full"
                    >
                      <RiLogoutBoxFill />
                      <span className="ml-2">Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
    )
}