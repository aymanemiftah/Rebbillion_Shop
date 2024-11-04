import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { axiosClient } from "../../../api/axios";
import { IoLogoAndroid } from "react-icons/io";

export const DonnerContext = createContext();

export const DonnerProvider = ({ children }) => {
    const {user}=useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState();
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState();
    const [users,setUsers]=useState([]);
    const [productsall, setProductsall] = useState([]);
    const [ordersall, setOrdersall] = useState([]);
    const [paymentsall, setPaymentsall] = useState([]);
    const [reportsall, setReportsall] = useState([]);
    const [deliveriesall, setDeliveriesall] = useState([]);
    const [usersall, setUsersall] = useState([]);
    const [Check, setCheck] = useState(false);
    const [changed, setchanged] = useState(false);
    
    const [us,setUs]=useState();
    const [deliveries,setDeleveries]=useState([]);
    const [delivery,setDelivery]=useState();
    const [reports,setReports]=useState([]);
    const [report,setReport]=useState();
    const [payments,setPayments]=useState([]);
    const [payment,setPayment]=useState();

    const [currentPage, setCurrentPage] = useState(1); 
    const [itemsPerPage, setItemsPerPage] = useState(10); 
    const [totalPages, setTotalpages] = useState(0);
    const [totalUsers, settotalUser] = useState(0);

    const [totalProducts, settotalProduct] = useState(0);
    const [currentPageProduct, setcurrentPageProduct] = useState(1); 
    const [itemsPerPageProduct, setItemsPerPageProduct] = useState(10); 
    const [totalPagesProduct, setTotalpagesProduct] = useState(0);

    const [totalDeliveries, settotalDeliveries] = useState(0);
    const [currentPageDeliveries, setcurrentPageDeliveries] = useState(1); 
    const [itemsPerPageDeliveries, setItemsPerPageDeliveries] = useState(10); 
    const [totalPagesDeliveries, setTotalpagesDelivreies] = useState(0);

    const [totalReports, settotalReports] = useState(0);
    const [currentPageReports, setcurrentPageReports] = useState(1); 
    const [itemsPerPageReports, setItemsPerPageReports] = useState(10); 
    const [totalPagesReports, setTotalpagesReports] = useState(0);

    const [totalOrders, settotalOrders] = useState(0);
    const [currentPageOrders, setcurrentPageOrders] = useState(1); 
    const [itemsPerPageOrders, setItemsPerPageOrders] = useState(10); 
    const [totalPagesOrders, setTotalpagesOrders] = useState(0);

  
    
    const [totalPayments, settotalPayments] = useState(0);
    const [currentPagePayments, setcurrentPagePayments] = useState(1); 
    const [itemsPerPagePayments, setItemsPerPagePayments] = useState(10); 
    const [totalPagesPayments, setTotalpagesPayments] = useState(0);
   
    const [likedProducts, setLikedProducts] = useState(() => {
        const savedLikes = JSON.parse(localStorage.getItem('likedProduct')) || [];
        return savedLikes;
    }); 

    const [BasketProducts, setBasketProducts] = useState(() => {
        const savedLikes = JSON.parse(localStorage.getItem('ProductsBasket')) || [];
        return savedLikes;
    }); 
    const addProductToBasket = (productId) => {
        let updatedBasketProducts = [...BasketProducts];
        updatedBasketProducts.push(productId);
        setBasketProducts(updatedBasketProducts);
        localStorage.setItem('ProductsBasket', JSON.stringify(updatedBasketProducts));
        console.log(BasketProducts);
        
    };
    const DeleteProductBasket =(id)=>{
        let updatedBasketProducts = [...BasketProducts];
        updatedBasketProducts = updatedBasketProducts.filter(productId => productId !== id); 
        setBasketProducts(updatedBasketProducts);
        localStorage.setItem('ProductsBasket', JSON.stringify(updatedBasketProducts));
    }

    const updateLikedProducts = (productId, isLiked) => {
        let updatedLikedProducts = [...likedProducts];
        
        if (isLiked) {
            updatedLikedProducts = updatedLikedProducts.filter(id => id !== productId); // حذف من الإعجابات
        } else {
            updatedLikedProducts.push(productId); // إضافة للإعجابات
        }
        
        setLikedProducts(updatedLikedProducts);
        localStorage.setItem('likedProduct', JSON.stringify(updatedLikedProducts));
    };

    
    axiosClient.defaults.withCredentials = true;

    
    const csrf = async () => {
        await axiosClient.get('/sanctum/csrf-cookie');
    };
    
    

    useEffect(() => {
        const fetchusersall = async () => {
            try {
                if (user?.role === 'admin' || user?.role === 'manager') {

                    const userResponse = await axiosClient.get(`/api/users-all`);
                    setUsersall(userResponse.data)
                    console.log(userResponse.data);
                    
                    localStorage.setItem('usersall',JSON.stringify(userResponse.data))
                    
                }
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
            }
        };
        
        const fetchreportsall = async () => {
            try {
                if (user?.role === 'admin' || user?.role === 'manager') {
                    const reportsResponse = await  axiosClient.get(`/api/reports-all`)
                    setReportsall(reportsResponse.data)
                    localStorage.setItem('reportsall',JSON.stringify(reportsResponse.data))
                    
                }
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
            }
        };
       


        const fetchdeliveriesall = async () => {
            try {
                if (user?.role === 'admin' || user?.role === 'manager') {
                    const deliveriesResponse= await axiosClient.get(`/api/deliveries-all`)
                    setDeliveriesall(deliveriesResponse.data)
                    localStorage.setItem('deliveriesall',JSON.stringify(deliveriesResponse.data))
                }
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
            }
        };
        const fetchpaymentsall = async () => {
            try {
                if (user?.role === 'admin' || user?.role === 'manager') {
                    const  paymentsResponse = await  axiosClient.get(`/api/payments-all`)
                    localStorage.setItem('paymentsall',JSON.stringify(paymentsResponse.data))
                }
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
            }
        };
        if (user) {
            const cashedusers= localStorage.getItem('usersall')
            if(Check){
                fetchusersall()
                setCheck(false)
            }else if(cashedusers){
                
                
                setUsersall(JSON.parse(cashedusers))
            }else{
                fetchusersall()
            }

            const cashedreports= localStorage.getItem('reportsall')
            if(Check){
                fetchreportsall()
                setCheck(false)
            }else if(cashedreports){
                
                setReportsall(JSON.parse(cashedreports))
            }else{
                fetchreportsall()
            }


            const casheddeliveries= localStorage.getItem('deliveriesall')
            if(Check){
                fetchdeliveriesall()
                setCheck(false)
            }else if(casheddeliveries){
                setDeliveriesall(JSON.parse(casheddeliveries))
            }else{
                fetchdeliveriesall()
            }


            const cashedpayments= localStorage.getItem('paymentsall')
            if(Check){
                fetchpaymentsall()
                setCheck(false)
            }else if(cashedpayments){
                setPaymentsall(JSON.parse(cashedpayments))
            }else{
                fetchpaymentsall()
            }
        }
    }, [Check]);

    useEffect(() => {
        const fetchuser = async () => {
            try {
                if (user?.role === 'admin' || user?.role === 'manager') {
                    
                    const userResponse  = await axiosClient.get(`/api/users?page=${currentPage}&limit=${itemsPerPage}`) 
                    setUsers(userResponse.data.data);
                    setTotalpages(userResponse.data.last_page);
                    settotalUser(userResponse.data.total)
                    localStorage.setItem('users',JSON.stringify(userResponse.data))
                }
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
            }
        };
        const fetchreports = async () => {
            try {
                if (user?.role === 'admin' || user?.role === 'manager') {
                    
                    const reportsResponse = await axiosClient.get(`/api/reports?page=${currentPageReports}&limit=${itemsPerPageReports}`)

                    setReports(reportsResponse.data.data);
                    settotalReports(reportsResponse.data.total)
                    setTotalpagesReports(reportsResponse.data.last_page)
                    localStorage.setItem('reports',JSON.stringify(reportsResponse.data))
                    
                }
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
            }
        };
       
        const fetchdeliveries = async () => {
            try {
                if (user?.role === 'admin' || user?.role === 'manager') {
                    const   deliveriesResponse = await axiosClient.get(`/api/deliveries?page=${currentPageDeliveries}&limit=${itemsPerPageDeliveries}`)
                    setDeleveries(deliveriesResponse.data.data);
                    settotalDeliveries(deliveriesResponse.data.total)
                    setTotalpagesDelivreies(deliveriesResponse.data.last_page)
                    localStorage.setItem('deliveries',JSON.stringify(deliveriesResponse.data))

                    
                }
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
            }
        };
        const fetchpayments = async () => {
            try {
                if (user?.role === 'admin' || user?.role === 'manager') {
                    
                    const  paymentsResponse = await axiosClient.get(`/api/payments?page=${currentPagePayments}&limit${itemsPerPagePayments}`)
                    setPayments(paymentsResponse.data.data);
                    settotalPayments(paymentsResponse.data.total)
                    setTotalpagesPayments(paymentsResponse.data.last_page)
                    localStorage.setItem('payments',JSON.stringify(paymentsResponse.data)) 
                }
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
            }
        };

        if (user) {
            const cashedusers= localStorage.getItem('users');
            if(changed || Check){
                fetchuser()
                setchanged(false)
                setCheck(false)
            }else if(cashedusers){
                const users = JSON.parse(cashedusers)
                setUsers(users.data);
                setTotalpages(users.last_page);
                settotalUser(users.total)
            }else{
                fetchuser()
            }


            const cashedreports= localStorage.getItem('reports');
            if(changed || Check){
                fetchreports()
                setchanged(false)
                setCheck(false)
            }else if(cashedreports){
                const reports = JSON.parse(cashedreports)
                setReports(reports.data);
                setTotalpagesReports(reports.last_page);
                settotalReports(reports.total)
            }else{
                fetchreports()
            }


            const casheddeliveries= localStorage.getItem('deliveries');
            if(changed || Check){
                fetchdeliveries()
                setchanged(false)
                setCheck(false)
            }else if(casheddeliveries){
                const deliveries = JSON.parse(casheddeliveries)
                setDeleveries(deliveries.data);
                settotalDeliveries(deliveries.total)
                setTotalpagesDelivreies(deliveries.last_page)
            }else{
                fetchdeliveries()
            }


            const cashedpayments= localStorage.getItem('payments');
            if( Check){
                fetchpayments()
                
                setCheck(false)
            }else if(cashedpayments){
                const payments = JSON.parse(cashedpayments)
                setPayments(payments.data);
                settotalPayments(payments.total)
                setTotalpagesPayments(payments.last_page)
            }else{
                fetchpayments()
            }
            
            
        }
    }, [changed,Check,user, currentPage,currentPageReports,currentPagePayments,currentPageDeliveries]);


    useEffect(() => {

        const fetchProductsall = async () => {
            try {
                const  productsallResponse= await axiosClient.get(`/api/products-all`);
                localStorage.setItem('productsall', JSON.stringify(productsallResponse.data)); 
                setProductsall(productsallResponse.data)
            } catch (error) {
                setProductsall([]);
                console.error(error.response ? error.response.data : error.message);
            }
            
        };

        const fetchOrdersall = async () => {
            try {   
                const  ordersallResponse = await axiosClient.get(`/api/orders-all`);
                localStorage.setItem('ordersall', JSON.stringify(ordersallResponse.data)); 
                setOrdersall(ordersallResponse.data)
                
                
            } catch (error) {
                setOrders([]);
                console.error(error.response ? error.response.data : error.message);
            }
            
        };

        const cashedproductsall= localStorage.getItem('productsall');
        if(Check){
            fetchProductsall()
            setCheck(false)
        } else if(cashedproductsall){
            setProductsall(JSON.parse(cashedproductsall))
        }else{
            fetchProductsall()
        }

        const cashedordersall=localStorage.getItem('ordersall');
        if(Check){
            fetchOrdersall()
            setCheck(false)
            
        } else if(cashedordersall){
        setOrdersall(JSON.parse(cashedordersall))
        }else{
            fetchOrdersall()
        }
    }, [Check]);

    useEffect(()=>{

        const fetchOrders = async () => {
            try {   
                const  ordersResponse = await axiosClient.get(`/api/orders?page=${currentPageOrders}&limit=${itemsPerPageOrders}`);
                localStorage.setItem('orders', JSON.stringify(ordersResponse.data)); 
                setOrders(ordersResponse.data.data);
                setTotalpagesOrders(ordersResponse.data.last_page)
                settotalOrders(ordersResponse.data.total)
            } catch (error) {
                setOrders([]);
                console.error(error.response ? error.response.data : error.message);
            }
        };

        const fetchProducts = async () => {
            try {
                const  productsResponse= await axiosClient.get(`/api/products?page=${currentPageProduct}&limit=${itemsPerPageProduct}`);
                localStorage.setItem('products', JSON.stringify(productsResponse.data)); 
                setProducts(productsResponse.data.data);
                setTotalpagesProduct(productsResponse.data.last_page);
                settotalProduct(productsResponse.data.total);
            } catch (error) {
                setProducts([]);
                console.error(error.response ? error.response.data : error.message);
            }
            
        };

        const cashedproducts= localStorage.getItem('products');
            if(changed){
                fetchProducts()
                setchanged(false)
            }else if(cashedproducts){
                const products = JSON.parse(cashedproducts)
                setProduct(products.data)
                setTotalpagesProduct(products.last_page);
                settotalProduct(products.total);
            }else{
                fetchProducts()
            }
            
        const cashedorders= localStorage.getItem('orders');
        if(changed || Check){
            fetchOrders()
            setchanged(false)
            setCheck(false)
        }else if(cashedorders){
                const orders = JSON.parse(cashedorders)
                setOrders(orders.data);
                setTotalpagesOrders(orders.last_page)
                settotalOrders(orders.total)
            }else{
                fetchOrders()
            }

    },[Check,changed,currentPageProduct,currentPageOrders])

    
    
    
    const handlePageChange = (page,totalPages) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);   
            setchanged(true)   
        }
    };
    const handlePageChangeProducts = (page,totalPages) => {
        if (page >= 1 && page <= totalPages) {
            setcurrentPageProduct(page); 
            setchanged(true)
        }
    };
    const handlePageChangeOrders = (page,totalPages) => {
        if (page >= 1 && page <= totalPages) {
            setcurrentPageOrders(page);      
            setchanged(true)
        }
    };
    const handlePageChangeDelivries = (page,totalPages) => {
        if (page >= 1 && page <= totalPages) {
            setcurrentPageDeliveries(page);  
            setchanged(true)    
        }
    };
    const handlePageChangeReports = (page,totalPages) => {
        if (page >= 1 && page <= totalPages) {
            setcurrentPageReports(page);      
            setchanged(true)
        }
    };
    
    const handlePageChangePayments = (page,totalPages) => {
        if (page >= 1 && page <= totalPages) {
            setcurrentPagePayments(page);    
            setchanged(true)  
        }
    };



/*----------------------------------Products------------------------------------- */
    const CreateProduct = async (Product) => {
        if(user?.role === 'admin'|| user?.role === 'manager'){
            try {
                const formData = new FormData();
                formData.append('name',Product.name)
                formData.append('description',Product.description)
                formData.append('price',Product.price)
                formData.append('stock',Product.stock)
                formData.append('brands',Product.brands)
                formData.append('category',Product.category)
                formData.append('sexe',Product.sexe)
                if(Product.image){
                    formData.append('image',Product.image)
                }
                if(Product.solde){
                    formData.append('last_price',Product.last_price)
                }
                if(Product.solde){
                    formData.append('solde',Product.solde)
                }
                const response = await axiosClient.post('/api/products', formData);
                setProduct(response.data);
                setCheck(true)
            } catch (error) {
                throw error.response;
            }
        }else{
            throw new Error("unauthorized");
            
        }
       
    };


    const UpdateProduct = async (Product, id) => {
        if(user?.role === 'admin'|| user?.role === 'manager'){
            const formData = new FormData();
                formData.append('_method','PATCH')
                formData.append('name',Product.name)
                formData.append('description',Product.description)
                formData.append('price',Product.price)
                formData.append('stock',Product.stock)
                formData.append('brands',Product.brands)
                formData.append('category',Product.category)
                formData.append('sexe',Product.sexe)
                if(Product.image){
                    formData.append('image',Product.image)
                }
                if(Product.solde){
                    formData.append('last_price',Product.last_price)
                }
                if(Product.solde){
                    formData.append('solde',Product.solde)
                }
                
            try {
                const response = await axiosClient.post('/api/products/'+id, formData);
                setProducts(prevProducts => prevProducts.map(product => product.id === id ? response.data : product));
                setCheck(true)
            } catch (error) {
                throw error.response;
            }
        }else{
            throw new Error("unauthorized");
        }
       
    };

    const DeleteProduct = async (id) => {
        if(user?.role === 'admin'|| user?.role === 'manager'){
            try {
                await axiosClient.delete('/api/products/'+id);
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
                setCheck(true)
            } catch (error) {
                throw error.response;
            }
        }else{
            throw new Error("unauthorized");
        }
      
    };

    /*----------------------------------Orders------------------------------------- */

    const CreateOrder = async (Order) => {
        try {
            const response = await axiosClient.post('/api/orders', Order);
            setOrder(response.data);
            setCheck(true)
            return response; // التأكد من إرجاع الاستجابة
        } catch (error) {
            if (error.response) {
                // إذا كان هناك استجابة من السيرفر (خطأ في الـAPI)
                console.error('API Error:', error.response.data);
                throw new Error(`API Error: ${error.response.data.message || 'An error occurred while creating the order'}`);
            } else if (error.request) {
                // إذا لم يتلقَّ الاستجابة من السيرفر (مشكلة في الاتصال)
                console.error('Network Error:', error.request);
                throw new Error('Network Error: No response from server');
            } else {
                // خطأ غير متوقع
                console.error('Error:', error.message);
                throw new Error('Unexpected Error: ' + error.message);
            }
        }
    };
    

    

    const UpdateOrder = async (Status, id) => {
        if(user?.role === 'admin'|| user?.role === 'manager'){
        try {
            const response = await axiosClient.patch('/api/orders/'+id, Status);
            setOrder(response.data);
            setCheck(true)
        } catch (error) {
            throw error.response;
        }
    }else{
        throw new Error("Unautorized");
        
    }
    };

    const DeleteOrder = async (id) => {
        checkPermission('admin','manager');
        try {
            await axiosClient.delete('/api/orders/'+id);
            setOrder(null);
            setCheck(true)
        } catch (error) {
            throw error.response;
        }
    };
    /*----------------------------------Deliveries------------------------------------- */
    const CreateDelivery = async (Delivery)=>{
        if(user?.role === 'admin'|| user?.role === 'manager'){
        try {
            const response = await axiosClient.post('/api/deliveries',Delivery)
            setDelivery(response.data)
            setCheck(true)
        } catch (error) {
            throw error.response;
        }}else{
            throw new Error("Unauthorized");
            
        }

        }
        
    
    const UpdateDelivery = async (Status,id)=>{
        if(user?.role === 'admin'|| user?.role === 'manager'){
            try {
            
                const response = await axiosClient.patch('/api/deliveries/'+id,Status)
                setDelivery(response.data);
                setCheck(true)
            } catch (error) {
                throw error.data;
            }
        }else{throw new Error("Unauthorized");
        }
       
    }
    const DeleteDelivery = async (id)=>{
        checkPermission('admin','manager');
        try {
             await axiosClient.delete('/api/deliveries/'+id);   
             setCheck(true)
        } catch (error) {
            setDelivery(null)
            throw error.response
        }
    }
    /*----------------------------------Users------------------------------------- */
    const CreateUser = async (User)=>{
        try {
            const formData = new FormData();
            formData.append('name',User.name);
            formData.append('phonenumber',User.phonenumber);
            formData.append('address',User.address);
            formData.append('image',User.image);
            formData.append('email',User.email);
            formData.append('password',User.password);
            formData.append('confirmation_password',User.confirmation_password);
            formData.append('role',User.role);
            const response = await axiosClient.post('/api/users',formData)
            setUs(response.data)
            setCheck(true)
        } catch (error) {
            throw error.response;
        }

        }
        
    
        const UpdateUser = async (User, id) => {
            if(user.role ==='admin' ||user.role ==='manager' || user.role ==='user' ){
                try {
                    const formData = new FormData();
                    formData.append('_method','PATCH');
                    formData.append('name',User.name);
                    formData.append('phonenumber',User.phonenumber);
                    formData.append('address',User.address);
                    formData.append('email',User.email);
                    formData.append('role',User.role);
                    if(User.image){
                        formData.append('image',User.image);
                    }
                    await axiosClient.post('/api/users/'+id, formData);
                    setCheck(true)
               } catch (error) {
                   throw error.response; 
               }
            }
        };
        const UpdateSelfUser = async (User, id) => {
            if(user.role ==='user' ){
                try {
                    const formData = new FormData();
                    formData.append('_method','PATCH');
                    formData.append('name',User.name);
                    formData.append('phonenumber',User.phonenumber);
                    formData.append('address',User.address);
                    formData.append('email',User.email);
                    if(User.image ){
                        formData.append('image',User.image);
                    }
                    await axiosClient.post('/api/profil-account/'+id, formData);
                    
               } catch (error) {
                   throw error.response; 
               }
            }
        };

    const DeleteUser = async (id)=>{
        if(user.role ==='admin' ||user.role ==='manager' ){
            try {

                await axiosClient.delete('/api/users/'+id)
                setCheck(true)
           } catch (error) {

               console.log(error);
               
               throw error.response;
               
           }
        }
        else{
            throw new Error("autorized access");
            
        }
        
        
            
       
    }
      /*----------------------------------Reports------------------------------------- */

      const CreateReport = async (Report) => {
        if(user.role === 'user'){
            try {
                const response = await axiosClient.post('/api/reports', Report);
                setReport(response.data);
                setCheck(true)
            } catch (error) {
                throw error.response;
            }
        }else{throw new Error("Unautorized");
        }
        
    };

    

    const UpdateReport = async (Report, id) => {
        if(user.role ==='admin' ||user.role ==='manager' ){
            try {
           
                const response = await axiosClient.patch('/api/reports/'+id, Report);
                setReport(response.data);
                setCheck(true)
            } catch (error) {
                throw error.response;
            }
        }else{
            throw new Error("Unautorized");
            
        }
       
           
        
        
    };

    const DeleteReport = async (id) => {
       
        try {
            await axiosClient.delete('/api/reports/'+id);
            setReport(null);
            setCheck(true)
        } catch (error) {
            throw error.response;
        }
    };
    
     /*----------------------------------Payments------------------------------------- */

     const CreatePayment = async (Payment) => {
        try {
            
            const response = await axiosClient.post('/api/payments', Payment);
            setPayment(response.data);
            setCheck(true)
        } catch (error) {
            throw error.response;
        }
    };

    

    const UpdatePayment = async (Payment, id) => {
        if( user?.role ==='admin'|| user?.role === 'manager'){
            try {
                const response = await axiosClient.patch('/api/payments/'+id, Payment);
                setPayment(response.data);
                setCheck(true)
            } catch (error) {
                throw error.response;
            }
        }else{
            throw new Error("Unauthorized");
        }
       
    };

    const DeletePayment = async (id) => {
        checkPermission('admin','manager');
        try {
            await axiosClient.delete('/api/payments/'+id);
            setPayment(null);
            setCheck(true)
        } catch (error) {
            throw error.response;
        }
    };
    

    
    return (
        <DonnerContext.Provider 
            value={{csrf,
                orders,ordersall, order, CreateOrder, UpdateOrder, DeleteOrder,
                products, productsall,product, CreateProduct, UpdateProduct, DeleteProduct,
                users ,usersall, us ,CreateUser , DeleteUser , UpdateUser ,UpdateSelfUser,
                deliveries ,deliveriesall, delivery ,CreateDelivery , DeleteDelivery , UpdateDelivery ,
                reports ,reportsall, report ,CreateReport , DeleteReport , UpdateReport ,
                payments ,paymentsall, payment ,CreatePayment , DeletePayment , UpdatePayment ,
                itemsPerPage,currentPage,totalPages,handlePageChange,totalUsers,
                itemsPerPageProduct,currentPageProduct,totalPagesProduct,handlePageChangeProducts,totalProducts,
                itemsPerPageOrders,currentPageOrders,totalPagesOrders,handlePageChangeOrders,totalOrders,
                itemsPerPageDeliveries,currentPageDeliveries,totalPagesDeliveries,handlePageChangeDelivries,totalDeliveries,
                itemsPerPageReports,currentPageReports,totalPagesReports,handlePageChangeReports,totalReports,
                itemsPerPagePayments,currentPagePayments,totalPagesPayments,handlePageChangePayments,totalPayments,
                likedProducts,updateLikedProducts,BasketProducts,addProductToBasket,DeleteProductBasket
            }}>
            {children}
        </DonnerContext.Provider>
    );
};