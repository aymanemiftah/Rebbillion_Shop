
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Redirect from "../components/Context/AuthContext/Redirect.jsx";
import Login from "../pages/Authentification/Login";
import AdminLayout from "../components/Layout/AdminLayout.jsx";
import ManagerLayout from "../components/Layout/ManagerLayout.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import ProtectedRouteAdmin from "./ProtectedRoutes/ProtectedRouteAdmin.jsx";
import ProtectedRouteManager from "./ProtectedRoutes/ProtectedRouteManager.jsx";
import ProtectedRouteLogin from "./ProtectedRoutes/ProtectedRouteLogin.jsx";
import Registre from "../pages/Authentification/Register.jsx";
import ForgetPassword from "../components/Authentification/Login/ForgetPassword.jsx";
import ResetPassword from "../components/Authentification/Login/PasswordRestForm.jsx";
import Dashboard from '../pages/Admin/Dashboard.jsx'
import Deliveries from "../pages/Admin/Deliveries.jsx";
import Orders from "../pages/Admin/Orders.jsx";
import Payments from "../pages/Admin/Payments.jsx";
import Products from "../pages/Admin/Products.jsx";
import Users from "../pages/Admin/Users.jsx";
import Logout from "../components/Authentification/Logout/Logout.jsx";
import CreateUser from "../components/Admin/Users/CreateUser.jsx";
import UpdateUser from "../components/Admin/Users/UpdateUser.jsx";
import CreateProduct from "../components/Admin/Products/CreateProduct.jsx";
import UpdateProduct from "../components/Admin/Products/UpdateProduct.jsx";
import DashboardManager from "../pages/Manager/Dashboard.jsx";
import DeliveriesManager from "../pages/Manager/Deliveries.jsx";
import ProductsManager from "../pages/Manager/Products.jsx";
import OrdersManager from "../pages/Manager/Orders.jsx";
import PaymentsManager from "../pages/Manager/Payments.jsx";
import CreateProductManager from "../components/Manager/Products/CreateProduct.jsx";
import UpdateProductManager from "../components/Manager/Products/UpdateProduct.jsx";
import Home from "../pages/User/Home.jsx";
import Women from "../pages/User/Women.jsx";
import Men from "../pages/User/Men.jsx";
import Makeup from "../pages/User/Makeup.jsx";
import Perfumes from "../pages/User/perfumes.jsx";
import FacialTraitment from "../pages/User/FacialTraitment.jsx";
import HorsBody from "../pages/User/Hors_Body.jsx";
import ProductInfo from "../components/User/ProductInfo/ProductInfo.jsx";
import ProductsSearch from "../components/User/ShowProducts/ProductsSearch.jsx";
import ReportsUser from "../pages/User/Reports.jsx";
import ShowReports from "../components/Admin/Reports/ShowReports.jsx";
import ProtectedRouteIsLogin from "./ProtectedRoutes/ProtectedRouteIsLogin.jsx";
import ContactUs from "../components/User/Company/ContactUs.jsx";
import AboutUs from "../components/User/Company/AboutUs.jsx";
import Order from "../pages/User/Order.jsx";
import ProfilAccount from "../components/User/ProfilAccount/ProfilAccount.jsx";





export const router =(user)=>createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                element:<Home/>,
                path:'/'
            },
            {
                element:<Women/>,
                path:'/Products/Women-Products'
            },
            {
                element:<Men/>,
                path:'/Products/Men-Products'
            },
            {
                element:<Makeup/>,
                path:'/Products/Makeup'
            },
            {
                element:<Perfumes/>,
                path:'/Products/Perfumes'
            },
            {
                element:<FacialTraitment/>,
                path:'/Products/FacialTraitment'
            },
            {
                element:<HorsBody/>,
                path:'/Products/Hors&Body'
            },
            {
                element:<ProductInfo/>,
                path:'/Products/Product-Info/:id'
            },
            {
                element:<ProductsSearch/>,
                path:'/Products'
            },
            {
                element:<ProtectedRouteIsLogin user={user}><ReportsUser/></ProtectedRouteIsLogin>,
                path:'/Opinion/Reports'
            },
            {
                element:<ContactUs/>,
                path:'/Company/Contact-Us'
            },
             {
                element:<AboutUs/>,
                path:'/Company/About-Us'
            },
            {
                element:<ProtectedRouteIsLogin user={user}><Order/></ProtectedRouteIsLogin>,
                path:'/Order/Order-Now'
            },
            {
                element:<ProfilAccount/>,
                path:'/Profil-Account'
            },
            
    ]
    },
    {
        element:<ProtectedRouteAdmin user={user}>
                <AdminLayout />
                </ProtectedRouteAdmin>,
        children:[
            {
            element:<Dashboard/>,
            path:'/Admin/Dashboard'
            },
            {
            element:<Deliveries/>,
            path:'/Admin/Deliveries'
            },
            {
            element:<Orders/>,
            path:'/Admin/Orders'
            },
            {
            element:<Payments />,
            path:'/Admin/Payments'
            },
            {
            element:<Products/>,
            path:'/Admin/Products'
            },
            {
            element:<CreateProduct />,
            path:'/Admin/Products/Create-product'
            },
            {
            element:<UpdateProduct />,
            path:'/Admin/Products/Update-product/:id'
            },
            {
            element:<ShowReports/>,
            path:'/Admin/Reports'
            },
            {
            element:<Users/>,
            path:'/Admin/Users',
            },
            {
            element:<CreateUser />,
            path:'/Admin/Users/Create-user'
            },
            {
            element:<UpdateUser />,
            path:'/Admin/Users/Update-user/:id'
            }
            
            ]
    },
    {
        element:<ProtectedRouteManager user={user}>
                <ManagerLayout />
                </ProtectedRouteManager>,
        children:[
            {
                element:<DashboardManager />,
                path:'/Manager/Dashboard'
            },
            {
                element:<DeliveriesManager />,
                path:'/Manager/Deliveries'
            },
            {
                element:<ProductsManager />,
                path:'/Manager/Products'
            },
            {
                element:<CreateProductManager />,
                path:'/Manager/Products/Create-Product'
            },
            {
                element:<UpdateProductManager />,
                path:'/Manager/Products/Update-Product/:id'
            },
            {
                element:<OrdersManager />,
                path:'/Manager/Orders'
            },
            {
                element:<PaymentsManager />,
                path:'/Manager/Payments'
            },
        ]
    }
    ,
    {
        element:<Redirect/>,
        path:'/Redirect'
    },
    {
        element:<ProtectedRouteLogin user={user}><Login/></ProtectedRouteLogin>,
        path:'/Login'
    },
    {
        element:<Logout/>,
        path:'/Logout'
    },
    {
        element:<ForgetPassword/>,
        path:'/Forget-Password'
    },
    {
        element:<ResetPassword/>,
        path:'/Reset-Password'
    },
    {
        element:<Registre/>,
        path:'/Register'
    },
    {
        element:<NotFound/>,
        path:'*'
    },
])