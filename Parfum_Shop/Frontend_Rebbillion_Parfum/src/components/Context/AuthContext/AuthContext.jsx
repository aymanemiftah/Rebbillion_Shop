import React ,{createContext,useState,useEffect} from "react";
import { axiosClient } from "../../../api/axios";

export const AuthContext = createContext();

export const AuthProvider=({children})=>{

    const [user, setUser] = useState(() => {
        
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
      });
      const [nvuser, setnvuser]=useState();
    
      useEffect(() => {
       
        const fetchUser = async () => {
          try {
            const response = await axiosClient.get('/api/user');
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));  
          } catch (error) {
            setUser(null);
          }
        };
        
        if (!user) {
          fetchUser();
        }
      }, [user]);
    
      const login = async (userData) => {
        try {
          const response = await axiosClient.post('/api/login', userData);
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));  
        } catch (error) {
            throw error.response;
        }
      };

      const Registre = async (userData)=>{
        try {
            const formData = new FormData();
            formData.append('name',userData.name);
            formData.append('email',userData.email);
            formData.append('address',userData.address);
            formData.append('phonenumber',userData.phonenumber);
            formData.append('password',userData.password);
            formData.append('confirmation_password',userData.confirmation_password);
            const respone= await axiosClient.post('/api/users',formData);
            setnvuser(respone.data)
        } catch (error) {
            throw error.response;
        }
      }
      const csrf=()=>
         axiosClient.get('/sanctum/csrf-cookie');
      
      useEffect(() => {
        csrf(); 
    }, []);
      

    const logout= async ()=>{
        await axiosClient.post('/api/logout')
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{user,login,logout,Registre,csrf}}>
            {children}
        </AuthContext.Provider>
    )

}