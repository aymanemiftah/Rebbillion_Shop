import React, { useContext, useState, useEffect } from "react";
import { FiUsers } from "react-icons/fi";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaSitemap } from "react-icons/fa6";
import { GrDeliver } from "react-icons/gr";
import { SlBasketLoaded } from "react-icons/sl";
import { MdReport } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { LuMoveUp } from "react-icons/lu";
import { Pie, Line } from "react-chartjs-2";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { Chart, registerables } from 'chart.js';
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import Titrepage from "../../Titlepage/Titlepage";
import Titlepage from "../../Titlepage/Titlepage";

Chart.register(...registerables);

const Dashboardchildren = () => {
  const { totalUsers, totalProducts, totalOrders,totalDeliveries,totalReports, ordersall } = useContext(DonnerContext);
  const{user}=useContext(AuthContext)
  const [totale, settotale] = useState(0);
  const [profit, setProfit] = useState();

  const [lineData, setLineData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales Over Time',
        data: new Array(12).fill(0), 
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  useEffect(() => {
    let sum = 0;
    let totalProfit = 0;
    const profitPercentage = 0.20;
    const monthlySales = new Array(12).fill(0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
  
    
    for (let i = 0; i < ordersall.length; i++) {
      const orderDate = new Date(ordersall[i].created_at);
      const totalPrice = parseFloat(ordersall[i].total_price);
      
  

      if (ordersall[i].status === 'completed' &&
          orderDate.getFullYear() === currentYear && 
          orderDate.getMonth() === currentMonth) {  
            const monthIndex = orderDate.getMonth(); 
            monthlySales[monthIndex] += totalPrice;  
        sum += totalPrice;
        totalProfit += totalPrice * profitPercentage;
        
      }
    }
  
    settotale(sum);
    setProfit(totalProfit);
    
    console.log('Final Total Sum:', sum);
    console.log('Final Total Profit:', totalProfit);
    setLineData({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Sales Over Time',
          data: monthlySales, 
          fill: false,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    });
  }, [ordersall]);
  

  
  

  
 

  const pieData = {
    labels: ['Users', 'Products', 'Orders'],
    datasets: [
      {
        data: [totalUsers, totalProducts, totalOrders],
        backgroundColor: ['#87A2FF', '#1E3E62', '#050C9C'],
        hoverBackgroundColor: ['#87A2FF', '#1E3E62', '#050C9C'],
      },
    ],
  };

  return (
    <>
    <div className="bg-gray-100 min-h-screen rounded-lg p-6">
      
    
    <Titlepage role={'Admin'} page={'Dashboard'} />

    <hr className="border-gray-300 mb-8" />

        <h2 className=" text-2xl text-gray-700 ml-5 mb-7">Busniess Dashboard</h2>
        <div className=" flex  space-x-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-1 w-3/4">
    
            <div className="bg-gradient-to-r bg-white  text-blue-900 flex pl-6 space-x-10  items-center rounded-3xl shadow-xl  min-h-[150px] max-h-[150px] transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500">
              <FiUsers className="text-blue-900 w-1/4 h-1/4 " />
              <div className="text-center ">
                <p className="mt-4 text-3xl font-extrabold text-blue-500 ">{totalUsers}</p>
                <h3 className="text-2xl    text-gray-500 ">Total Users</h3>
              </div>
            </div>

            <div className="bg-gradient-to-r bg-white  text-blue-900    flex pl-6 space-x-10  items-center rounded-3xl shadow-lg min-h-[150px] max-h-[150px] transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl  hover:shadow-cyan-500">
              <FaSitemap className="text-blue-900  w-1/4 h-1/4 " />
              <div className="text-center ">
                <p className="mt-4 text-3xl font-extrabold text-blue-500 ">{totalProducts}</p>
                <h3 className="text-xl  text-gray-500 ">Total Products</h3>
              </div>
            </div>

            <div className="bg-gradient-to-r bg-white  text-blue-900    flex pl-6 space-x-10  items-center rounded-3xl shadow-lg min-h-[150px] max-h-[150px] transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl  hover:shadow-cyan-500">
              <SlBasketLoaded className="text-blue-900  w-1/4 h-1/4 " />
              <div className="text-center ">
                <p className="mt-4 text-3xl font-extrabold text-blue-500 ">{ordersall?.filter((e) => e.status === 'pending').length}</p>
                <h3 className="text-xl  text-gray-500 ">New Orders</h3>
              </div>
            </div>
            <div className="bg-gradient-to-r bg-white  text-blue-900 flex pl-6 space-x-10  items-center rounded-3xl shadow-lg min-h-[150px] max-h-[150px] transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl  hover:shadow-cyan-500">
              <GiTakeMyMoney className="text-blue-900 w-1/4 h-1/4 " />
              <div className="text-center ">
                <p className="mt-4 text-3xl font-extrabold text-blue-500 ">${totale}</p>
                <h3 className="text-2xl    text-gray-500 ">Total Sales</h3>
                <div className="flex items-center justify-center mt-1">
                  <LuMoveUp className="text-green-600 w-6 h-6 mr-2" />
                  <p className="text-green-600 text-xl font-semibold">{profit}% Profit</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r bg-white  text-blue-900    flex pl-6 space-x-10  items-center rounded-3xl shadow-lg min-h-[150px] max-h-[150px] transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl  hover:shadow-cyan-500">
              <GrDeliver className="text-blue-900  w-1/4 h-1/4 " />
              <div className="text-center ">
                <p className="mt-4 text-3xl font-extrabold text-blue-500 ">{totalDeliveries}</p>
                <h3 className="text-xl  text-gray-500 ">Total Deliveries</h3>
              </div>
            </div>
            <div className="bg-gradient-to-r bg-white  text-blue-900    flex pl-6 space-x-10  items-center rounded-3xl shadow-lg min-h-[150px] max-h-[150px] transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl  hover:shadow-cyan-500">
              <MdReport className="text-blue-900  w-1/4 h-1/4 " />
              <div className="text-center ">
                <p className="mt-4 text-3xl font-extrabold text-blue-500 ">{totalReports}</p>
                <h3 className="text-xl  text-gray-500 ">Reports</h3>
              </div>
            </div>
          </div>
          <div className="w-1/4 min-h-[300px] flex  flex-col justify-center items-center bg-white rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl  hover:shadow-cyan-500">
              <img src={`http://localhost:8000/storage/${user.image}`} className="w-24 h-24  rounded-full mb-3"/>
              
              <h4 className="uppercase font-bold text-gray-800 ">
                  {user.name}
              </h4>
              <p className="text-gray-600 ">
                  {user.email}
              </p>
          </div>

        </div >
  

  {/* كرت المبيانات */}
  <div className="mt-10 grid grid-cols-2 md:grid-cols-2 gap-4">
  <div className="bg-gradient-to-r  bg-white rounded-lg shadow-lg  transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col  hover:shadow-cyan-500">
    <h2 className="text-xl font-bold mb-5 text-center  rounded-lg w-full pt-1 h-10 bg-blue-700 text-white">Sales Over Time</h2>
    <div className="flex-grow flex items-center justify-center" style={{ width: '100%', height: '300px' }}>
      <Line data={lineData} />
    </div>
  </div>

  <div className="bg-gradient-to-r bg-white rounded-lg shadow-lg  transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex items-center flex-col  hover:shadow-cyan-500" style={{ height: '500px' }}>
  <h2 className="text-xl font-bold mb-5 text-center  rounded-lg w-full pt-1 h-10 bg-blue-700 text-white">Users, Products, and Orders Distribution</h2>
  <div className="flex-grow flex items-center justify-center" style={{ width: '100%', maxWidth: '400px', maxHeight: '400px' }}>
    <Pie data={pieData} />
  </div>
</div>
</div>
</div>
  
</>

  );
};

export default Dashboardchildren;
