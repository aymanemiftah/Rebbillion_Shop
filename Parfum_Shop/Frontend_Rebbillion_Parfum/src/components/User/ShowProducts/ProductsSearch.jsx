import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import ProductsCard from "../ProductsCard/ProductsCard";
import { FiChevronDown } from "react-icons/fi"; 
import { BsFilterLeft } from "react-icons/bs";
import { FaSpa } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { GiDelicatePerfume } from "react-icons/gi";
import { GiLipstick } from "react-icons/gi";
import { PiMaskHappyFill } from "react-icons/pi";
import '../../../CSS/Home.css'
import { FaSmileBeam } from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";



export default function ProductsSearch() {
    const Location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(Location.search);
    const search = queryParams.get('search');
    const { productsall ,ordersall} = useContext(DonnerContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [visibleProductsCount, setVisibleProductsCount] = useState(20); 
    const [openDropdown, setOpenDropdown] = useState(null); 
    const [sortOption, setSortOption] = useState("none");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // التحكم بإظهار/إخفاء القائمة عند الشاشة الصغيرة

    const menuRef = useRef();
    const [topproducts,settopproducts]=useState([])
    const [topcategory,settopcategory]=useState([])
    const [topsexe,settopsexe]=useState([]) // مرجع للتحكم في القائمة


    useEffect ( ()=>{
        
        const Rankeproducts =()=>{
            const productcount ={};
     
            ordersall.forEach((order)=>{
             order.products.forEach((product)=>{
                 if(productcount[product.id]){
                     productcount[product.id] += 1;
                 }else{
                     productcount[product.id]=1
                 }
             })
            })
            const storedProducts = Object.entries(productcount)
            .sort(([,countA], [, countB])=> countB - countA)
            .slice(0,5)
     
            storedProducts.forEach(([productid]) => {
                settopproducts((prevTopProducts) => [
                    ...prevTopProducts,
                    productsall.find((product) => product.id === parseInt(productid)),
                ]);
            });
         }
         const RankeProductsCategory =(category)=>{
            const categoryCount = {};

            ordersall.forEach((order)=>
            order.products.forEach((product)=>{
            if(product.category.toLowerCase() === category){

                if(categoryCount[product.id]){
                    categoryCount[product.id] += 1
                }else{
                    categoryCount[product.id] = 1
                }
            }}
            ))

            const storedcategory = Object.entries(categoryCount)
            .sort(([, CountA],[, CountB])=> CountB - CountA)
            .slice(0.5)

            const topCategoryProducts = storedcategory.map(([productId]) =>
                productsall.find((product) => product.id === parseInt(productId))
            );
    
            settopcategory(topCategoryProducts); 
         }
         const RankeProductSexe = (sexe)=>{
            const sexeCount = {};

            ordersall.forEach((order)=>
            order.products.forEach((product)=>{
                if(product.sexe.toLowerCase() === sexe){
                    if(sexeCount[product.id] ){
                        sexeCount[product.id] +=1
                    }else{
                        sexeCount[product.id] =1
                    }
                }
            })
            )

            const storedsexe = Object.entries(sexeCount)
            .sort(([, CountA],[, CountB])=> CountB - CountA)
            .slice(0,5)


            const topsexeProducts = storedsexe.map(([productId]) =>
                productsall.find((product) => product.id === parseInt(productId))
            );
    
            settopsexe(topsexeProducts); 

            
         }


         const category = search.toLowerCase()
         const sexe = search.toLowerCase()
         if (ordersall && ordersall.length > 0 && productsall && productsall.length > 0) {
            Rankeproducts();
            RankeProductsCategory(category)
            RankeProductSexe(sexe)
        }
        
        

    },[ordersall, productsall]) 


    const categories = [
        {
            key: 'parfum',
            logo: <GiDelicatePerfume className="mr-5 text-cyan-500"/>,
            label: 'Parfum',
            children: [
                {
                key: `/Products/Men-Products?search=${'Men'}`,
                logo: <FaMale className="mr-5 text-blue-500"/>,
                label: 'Men'
                 },
                { 
                key: `/Products/Women-Products?search=${'Women'}`,
                logo: <FaFemale className="mr-5 text-violet-500"/>,
                label: 'Women' 
                }
            ]
        },
        {
            key: `/Products/Makeup?search=${'Make_up'}`,
            logo: <GiLipstick className="mr-5 text-red-500"/>,
            label: 'Make-up'
        },
        {
            key: `/Products/FacialTraitment?search=${'Facial_treatment'}`,
            logo: <PiMaskHappyFill className="mr-5 text-green-500"/>,
            label: 'Facial Treatment'
        },
        {
            key: `/Products/Hors&Body?search=${'Hors_Body'}`,
            logo: <FaSpa className="mr-5 text-pink-500"/>,
            label: 'Hors & Body'
        }
    ];

    // صورة الخلفية بناءً على الفئة المختارة
    

  
    useEffect(() => {
        if (search) {
            const filtered = productsall.filter(product =>
                 product.category.toLowerCase().includes(search.toLowerCase()) ||
                 product.brands.toLowerCase().includes(search.toLowerCase()) ||
                 product.sexe.toLowerCase().includes(search.toLowerCase())||
                 product.name.toLowerCase().includes(search.toLowerCase())||
                 product.price ===  parseInt(search)
                );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(productsall); 
        }
    }, [search, productsall]);

    // دالة تغيير الفئة
   

    // دالة لفتح القائمة المنسدلة
    const toggleDropdown = (category) => {
        setOpenDropdown(openDropdown === category ? null : category);
    };

    // دالة لترتيب المنتجات
    const handleSortChange = (event) => {
        const sortType = event.target.value;
        setSortOption(sortType);

        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (sortType === "price-asc") {
                return a.price - b.price; // ترتيب حسب السعر من الأقل للأعلى
            } else if (sortType === "price-desc") {
                return b.price - a.price; // ترتيب حسب السعر من الأعلى للأقل
            } else if (sortType === "name-asc") {
                return a.name.localeCompare(b.name); // ترتيب أبجدي تصاعدي
            } else if (sortType === "name-desc") {
                return b.name.localeCompare(a.name); // ترتيب أبجدي تنازلي
            }
            return 0;
        });

        setFilteredProducts(sortedProducts);
    };

    // دالة لعرض المزيد من المنتجات
    const handleShowMore = () => {
        setVisibleProductsCount((prevCount) => prevCount + 20); // زيادة عدد المنتجات المعروضة
    };

    // دالة لفتح وإغلاق القائمة عند حجم الشاشة الصغيرة
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // إغلاق القائمة عند الضغط خارجها
    useEffect(() => {
        const handleClickOutside = (event) => {
            const menuElement = document.getElementById("filter-menu");
            if (menuElement && !menuElement.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsMenuOpen]);

    return (
        <>
            <div>
            <div className="relative w-full mx-auto overflow-hidden max-h-[200px] bg-cover bg-center md:flex md:justify-center md:items-center ">
                
                <img 
                    src={'https://www.dontwasteyourmoney.com/wp-content/uploads/2022/09/best-celebrity-perfume-scaled-e1663083371792.jpeg'}
                    className="h-full md:min-h-[500px] md:max-h-[500px] w-full  "
                />

                {/* الرسالة في منتصف الصورة */}
                <div className="absolute inset-0 bg-black bg-opacity-70 rounded-xl flex items-center justify-center">
                    <div className=" p-6 rounded-lg">
                        <h2 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold text-center">Search Results for : {search.toUpperCase()}</h2>
                    </div>
                </div>
            </div>

                <div className=" sm:flex border-t-2 border-t-gray-300 mt-10">
                    {/* زر القائمة عند الشاشة الصغيرة */} 
                   

                    {/* القائمة الجانبية لتغيير الفئات */} 
                    <div ref={menuRef} className={`sm:w-1/4 max-sm:hidden p-4 border-r-2 border-r-gray-300 transition-all  duration-300 ease-in-out `}>
                        <h3 className="text-xl font-bold text-blue-950 mb-4 flex justify-center items-center">
                            <BsFilterLeft className="mr-2"/>Category
                        </h3>
                        <hr className="border-t-4 h-5 bg-blue-950" />
                        <ul>
                            {categories.map((category) => (
                                <li key={category.key} className="mb-2">
                                    {category.children ? (
                                        <>
                                            <div
                                                onClick={() => toggleDropdown(category.key)} 
                                                className="cursor-pointer text-base sm:text-lg font-bold text-left w-full py-2 px-3 rounded-lg text-black flex items-center "
                                            >
                                                {category.logo}
                                                {category.label}
                                                <span
                                                    className={`ml-auto inline-block transform transition-transform duration-300 ${
                                                        openDropdown ? "rotate-180" : "rotate-0"
                                                    }`}
                                                >
                                                    <FiChevronDown />
                                                </span> {/* إضافة أيقونة السهم */}
                                            </div>
                                            {openDropdown === category.key && (
                                                <ul className="ml-4 mt-2">
                                                    {category.children.map((child) => (
                                                        <li key={child.key} className="mb-2">
                                                            <a href={child.key}
                                                                
                                                                className={`text-base font-bold  flex items-center sm:text-lg  text-left w-full py-2 px-3 rounded-lg ${search === child.key ? 'bg-gray-300 text-gray-700' : 'text-black'}`}
                                                            >
                                                                {child.logo}
                                                                {child.label}
                                                            </a>
                                                            <hr />
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            <hr />
                                        </>
                                    ) : (
                                        <div>
                                            <a
                                                href={category.key}
                                                className={`text-base flex items-center font-bold   sm:text-lg  text-left w-full py-2 px-3 rounded-lg ${search === category.key ? 'bg-gray-300 text-gray-700' : 'text-black'}`}
                                            >
                                               {category.logo} {category.label}
                                            </a>
                                            <hr />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                            {topcategory.length > 0 ? <div className="w-full h-auto mt-20">
                                <h3 className="text-lg mb-4 xl:text-xl font-bold text-blue-950">Top 5 selling in {search}</h3>
                                <hr className="border-t-4 h-5 bg-blue-950" />
                            { topcategory.map((product,key)=>
                            <a href={'/Products/Product-Info/' + product.id} key={key} className="w-11/12 custom-lg:w-full h-60 custom-lg:h-32 block custom-lg:flex mt-6 items-center space-x-3 border border-blue-500 rounded-xl">
                            <img className="w-full custom-lg:w-1/2 h-1/2 custom-lg:h-full object-cover rounded-xl" src={`http://localhost:8000/storage/${product.image}`} />
                            <div className="w-full custom-lg:w-1/2 h-1/2 custom-lg:h-full  flex justify-center max-custom-lg:items-center    flex-col">
                                <h4 className="md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700">{product.name.length > 13 ? (
                                    <>
                                        {product.name.slice(0, 13)}...
                                       
                                    </>
                                ) : (
                                    product.name
                                )}</h4>
                                <p className="font-bold text-blue-500 ">{product.price} MAD</p>
                            </div>
                        </a>
                            )} 

                            </div>:''}
                            {topsexe.length > 0 ? <div className="w-full h-auto mt-20">
                                <h3 className="text-lg mb-4 xl:text-xl font-bold text-blue-950">Top 5 selling in Products {search}</h3>
                                <hr className="border-t-4 h-5 bg-blue-950" />
                            { topsexe.map((product,key)=>
                            <a href={'/Products/Product-Info/' + product.id} key={key} className="w-11/12 custom-lg:w-full h-60 custom-lg:h-32 block custom-lg:flex mt-6 items-center space-x-3 border border-blue-500 rounded-xl">
                            <img className="w-full custom-lg:w-1/2 h-1/2 custom-lg:h-full object-cover rounded-xl" src={`http://localhost:8000/storage/${product.image}`} />
                            <div className="w-full custom-lg:w-1/2 h-1/2 custom-lg:h-full  flex justify-center max-custom-lg:items-center    flex-col">
                                <h4 className="md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700">{product.name.length > 13 ? (
                                    <>
                                        {product.name.slice(0, 13)}...
                                       
                                    </>
                                ) : (
                                    product.name
                                )}</h4>
                                <p className="font-bold text-blue-500 ">{product.price} MAD</p>
                            </div>
                        </a>
                            )} 

                            </div>:''}
                            <div className="w-full h-auto mt-20">
                                <h3 className="text-lg mb-4 xl:text-xl font-bold text-blue-950">Top 5 best-selling products</h3>
                                <hr className="border-t-4 h-5 bg-blue-950" />
                            {topproducts && topproducts.map((product,key)=>
                            <a href={'/Products/Product-Info/' + product.id} key={key} className="w-11/12 custom-lg:w-full h-60 custom-lg:h-32 block custom-lg:flex mt-6 items-center space-x-3 border border-blue-500 rounded-xl">
                                <img className="w-full custom-lg:w-1/2 h-1/2 custom-lg:h-full object-cover rounded-xl" src={`http://localhost:8000/storage/${product.image}`} />
                                <div className="w-full custom-lg:w-1/2 h-1/2 custom-lg:h-full  flex justify-center max-custom-lg:items-center    flex-col">
                                    <h4 className="md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-700">{product.name.length > 13 ? (
                                        <>
                                            {product.name.slice(0, 13)}...
                                           
                                        </>
                                    ) : (
                                        product.name
                                    )}</h4>
                                    <p className="font-bold text-blue-500 ">{product.price} MAD</p>
                                </div>
                            </a>
                            )}
                            </div>
                            
                        


                    </div>
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                id="filter-menu"
                                initial={{ opacity: 0, height: 0, x: -20 }} // البداية من اليسار
                                animate={{ opacity: 1, height: "100vh", x: 0 }} // الانتقال إلى الوضع الطبيعي
                                exit={{ opacity: 0, height: 0, x: -20 }} // العودة إلى اليسار عند الإغلاق
                                transition={{ duration: 0.3 }}
                                className={`sm:w-1/4 p-4 border-r-2 border-r-gray-300 fixed top-0 left-0 w-3/4 h-auto bg-white z-50`} // تغيير top-500 إلى top-0 وabsolute إلى fixed
                            >
                                <h3 className="text-xl font-bold mb-4 flex justify-center items-center">
                                    <BsFilterLeft className="mr-2" />Filters
                                </h3>
                                <ul>
                                {categories.map((category) => (
                                <li key={category.key} className="mb-2">
                                    {category.children ? (
                                        <>
                                            <div
                                                onClick={() => toggleDropdown(category.key)} 
                                                className="cursor-pointer text-base sm:text-lg font-bold text-left w-full py-2 px-3 rounded-lg text-black flex items-center "
                                            >
                                                {category.logo}
                                                {category.label}
                                                <span
                                                    className={`ml-auto inline-block transform transition-transform duration-300 ${
                                                        openDropdown ? "rotate-180" : "rotate-0"
                                                    }`}
                                                >
                                                    <FiChevronDown />
                                                </span> {/* إضافة أيقونة السهم */}
                                            </div>
                                            {openDropdown === category.key && (
                                                <ul className="ml-4 mt-2">
                                                    {category.children.map((child) => (
                                                        <li key={child.key} className="mb-2">
                                                            <a href={child.key}
                                                                
                                                                className={`text-base font-bold  flex items-center sm:text-lg  text-left w-full py-2 px-3 rounded-lg ${search === child.key ? 'bg-gray-300 text-gray-700' : 'text-black'}`}
                                                            >
                                                                {child.logo}
                                                                {child.label}
                                                            </a>
                                                            <hr />
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            <hr />
                                        </>
                                    ) : (
                                        <div>
                                            <a
                                                href={category.key}
                                                className={`text-base flex items-center font-bold   sm:text-lg  text-left w-full py-2 px-3 rounded-lg ${search === category.key ? 'bg-gray-300 text-gray-700' : 'text-black'}`}
                                            >
                                               {category.logo} {category.label}
                                            </a>
                                            <hr />
                                        </div>
                                    )}
                                </li>
                            ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* عرض المنتجات المصفاة */} 
                    <div className="w-full sm:w-3/4 p-4 ">
                        {/* اختيار الترتيب */} 
                        <div className="mb-4 w-full min-h-20  border-b-2 border-b-gray-300 flex items-center justify-between">
                            <button onClick={handleMenuToggle} className="flex items-center ml-4 bg-blue-950 text-white p-2 rounded-lg sm:hidden">
                                <BsFilterLeft />Filter {/* أيقونة الفلتر */}
                            </button>
                            <div>
                                <p className="hidden sm:block text-base sm:text-xl text-gray-500"> There are {filteredProducts.length} products.</p>
                            </div>
                            <div className="flex  items-center ">
                            <label htmlFor="sort" className="  text-base sm:text-lg font-semibold mr-4 text-gray-500">Sort by:</label>
                            <select id="sort" value={sortOption} onChange={handleSortChange} className=" sm:p-2  border  text-gray-500">
                                <option value="none">None</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name-asc">Name: A-Z</option>
                                <option value="name-desc">Name: Z-A</option>
                            </select>
                            
                            </div>
                           
                        </div>

                        {/* عرض المنتجات */} 
                        <div className="max-sm:w-full max-sm:flex max-sm:justify-center">
                            <div className="grid grid-cols-2 gap-4 max-sm:gap-2 custom-lg:grid-cols-3 xl:grid-cols-4">
                                {filteredProducts.slice(0, visibleProductsCount).map((product) => (
                                    <ProductsCard
                                        key={product.id} // Add a key prop for better rendering
                                        id={product.id}
                                        image={product?.image}
                                        name={product?.name}
                                        description={product?.description}
                                        price={product?.price}
                                        last_price={product?.last_price}
                                        solde={product?.solde}
                                        stock={product?.stock}
                                        brands={product?.brands}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* زر عرض المزيد */} 
                        {visibleProductsCount < filteredProducts.length && (
                            <div className="mt-8 text-center">
                                <button
                                    onClick={handleShowMore}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                                >
                                    Show More
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
