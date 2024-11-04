import React, { useContext, useEffect, useState } from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { showFailedAlert, showSuccessAlert } from "../../utils/toastify";
import { useNavigate } from "react-router-dom";

export default function OrderNow() {
  const { BasketProducts ,CreateOrder,CreatePayment , ordersall, productsall,DeleteProductBasket } = useContext(DonnerContext);
  const {user}=useContext(AuthContext)

    const handleDelete = (id)=>{
        DeleteProductBasket(id)
    }


  // Store quantities for each product
    const [quantities, setQuantities] = useState({});
    const [totalprice, setTotalprice] = useState();
    const [typepayments, settypepayments] = useState('');

    const [emailpaypal, setemailpaypal] = useState('');
    const [passwordpaypal, setpasswordpaypal] = useState('');
    const navigate = useNavigate('');

 
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [ccvNumber, setCcvNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [isRearVisible, setIsRearVisible] = useState(false);
  
    const handleFlipCard = () => {
      setIsRearVisible((prev) => !prev);
    };

    const handleOrder = async (e) => {
        e.preventDefault();
    
        const orderData = {
            user_id: user.id,
            products: productsall.filter((product) => BasketProducts.includes(product.id)).map((product) => ({
                id: product.id,
                stock: quantities[product.id] || 1,
                price: productsall.find((pro) => pro.id === product.id)?.price
            })),
            total_price: totalprice,
        };
    
        try {
            
            const orderResponse = await CreateOrder(orderData);
            
            
          
            if (orderResponse && orderResponse.status === 201) {  
                const orderId = orderResponse.data.order.id; 
                
                const payment = {
                    order_id: orderId,  
                    user_id: user.id,
                    amount: totalprice,
                    card_number: cardNumber,
                    card_expiration: expDate,
                    cvv: ccvNumber,
                    paypal_account: emailpaypal,
                    paypal_password: passwordpaypal,
                    payment_method: typepayments,
                };
    
                try {
                    
                    await CreatePayment(payment);    
                        navigate('/')
                    showSuccessAlert('Order and Payment are successful');
                } catch (paymentError) {

                    
                }
            } else {
                throw new Error('Order creation failed');
            }
        } catch (orderError) {

        
        } finally {
           
            localStorage.removeItem('ProductsBasket');
        }
    };
    
    
  
    const formatExpDate = (input) => {
      return input.replace(/\D/g, '').replace(/(.{2})/, '$1/').substring(0, 5);
    };

  // Handle quantity increment/decrement for a specific product
  const handleIncDec = (productId, action) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1; // Default to 1 if no quantity yet
      let newQuantity = currentQuantity;

      // Increment or decrement based on action, but respect stock limits
      if (action === "increment" && currentQuantity < getProductStock(productId)) {
        newQuantity = currentQuantity + 1;
      } else if (action === "decrement" && currentQuantity > 1) {
        newQuantity = currentQuantity - 1;
      }

      return { ...prevQuantities, [productId]: newQuantity };
        });
    };

    // Get product stock (you can get it from `productsall`)
    const getProductStock = (productId) => {
        const product = productsall.find((p) => p.id === productId);
        return product ? product.stock : 0;
    };

    useEffect(()=>{
        let sum = 0;
        productsall.filter((product)=>BasketProducts.includes(product.id))
        .forEach((product)=>{
            const quantity = quantities[product.id] || 1;
            sum = sum + product.price * quantity;
        })
        setTotalprice(sum.toFixed(2))
    },[quantities,productsall,BasketProducts])




  return (
    <>
      <div className="w-full h-auto flex max-custom:justify-center  max-custom:block  mb-6   space-x-5   bg-gray-50">
        <div className=" w-11/12 custom:w-2/3 ml-3  custom:ml-6">
          <h2 className="text-3xl font-bold uppercase text-gray-700 m-8 ml-10 underline">Basket</h2>
          <div className="w-full h-auto ">
            <table className="w-full max-custom-xl:hidden text-sm text-left shadow-lg rtl:text-right text-gray-500">
              <thead className="text-xs uppercase bg-blue-950 text-white">
                <tr>
                  <th className="px-6 py-4"></th>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Total Price</th>
                  <th className="px-6 py-4">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white ">
                {productsall &&
                  productsall
                    .filter((product) => BasketProducts.includes(product.id))
                    .map((product, key) => {
                      const quantity = quantities[product.id] || 1;
                      const totalPrice = (product.price * quantity).toFixed(2);
                      

                      return (
                        <tr key={key} className="hover:bg-blue-200 bg-white transition">
                          <td className="px-6 py-4"><button onClick={()=>handleDelete(product.id)} className="text-red-700 hover:text-red-500 text-2xl"><MdDelete/></button></td>
                          <td className="px-6 py-4">
                            <img
                              src={`http://localhost:8000/storage/${product.image}`}
                              className="w-16 md:w-32 h-16 md:h-32 object-cover rounded-md"
                              alt={product.name}
                            />
                          </td>
                          <td className="px-6 py-4 font-bold">{product.name}</td>
                          <td className="px-6 py-4">{product.price} MAD</td>
                          <td className="px-6 py-4">{totalPrice} MAD</td>
                          <td className="px-6 py-4 flex items-center space-x-2 mt-12">
                            <button
                              onClick={() => handleIncDec(product.id, "decrement")}
                              className="px-2 py-1 bg-gray-200 rounded"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={quantity}
                              readOnly
                              className="w-12 text-center border border-gray-300 rounded"
                            />
                            <button
                              onClick={() => handleIncDec(product.id, "increment")}
                              className="px-2 py-1 bg-gray-200 rounded"
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
            <div className="w-full grid grid-cols-1 custom:hidden  ">
            {productsall &&
                  productsall
                    .filter((product) => BasketProducts.includes(product.id))
                    .map((product, key) => {
                      const quantity = quantities[product.id] || 1;
                      const totalPrice = (product.price * quantity).toFixed(2);

                      return (
                          <div key={key}  className="flex  space-x-1 items-center  bg-white border  border-gray-200 rounded-lg shadow-sm shadow-gray-600 hover:shadow-md hover:shadow-blue-300 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 md:flex-row w-full max-h-[150px] min-h-[150px]  dark:border-white dark:bg-white mt-2 ml-2 mr-2 mx-lg:w-full ">
                            <img className=" object-cover max-w-[100px] min-w-[100px]  max-h-[100px] sm:max-w-[150px] sm:min-w-[150px] sm:max-h-[150px]   rounded-lg h-full" src={`http://localhost:8000/storage/${product.image}`} alt="" />
                                
                            <div className="flex  justify-between p-4 leading-normal w-full">
                            <div className=" flex flex-col">
                                <h5 className="mb-2 text-base sm:text-xl max-custom-lg:text-xl font-bold tracking-tight text-gray-900 dark:text-gray-700">
                                    {product.name.length > 20 ? (
                                        <>
                                        {product.name.slice(0, 20)}...
                                        </>
                                    ) : (
                                      product.name
                                    )}
                                    </h5>
                                    <p className="mb-2 text-base sm:text-lg font-bold  tracking-tight text-gray-500 dark:text-blue-600">
                                        Total price:{' '+totalPrice} MAD
                                    </p>
                                    </div>
                                    
                                    <div className=" flex flex-col justify-center items-center">
                                    <span className="flex flex-col">
                                    <input
                                      type="number"
                                      value={quantity}
                                      readOnly
                                      className="w-12 text-center border border-gray-300 rounded"
                                    />
                                    <div>
                                    <button
                                    onClick={() => handleIncDec(product.id, "decrement")}
                                    className="px-1 py-1 w-6 bg-red-600 rounded "
                                    >
                                      -
                                    </button>
                                    <button
                                      onClick={() => handleIncDec(product.id, "increment")}
                                      className="px-1 py-1 w-6 bg-blue-600 rounded"
                                    >
                                      +
                                    </button>
                                    </div>
                                    
                                    </span>
                                    <button onClick={()=>handleDelete(product.id)} className="text-red-700 hover:text-red-500 text-2xl"><MdDelete/></button>
                                    </div>
                            </div>
                            </div>
                    
                      );
                    })}

            </div>

            {typepayments && typepayments === 'credit_card' ?
                   <div className="flex min-h-[400px] flex-col items-center justify-between sm:p-8 max-sm:mt-10  bg-slate-100">
                   <form className="bg-white  w-full max-w-3xl mx-auto px-6 py-8 shadow-md rounded-md   flex   items-center max-xl:flex-col">
                     {/* Form Section */}
                     <div className="w-full xl:w-1/2  pr-8 xl:border-r-2 xl:border-slate-300">
                       <label className="text-neutral-800 font-bold text-sm mb-2 block">Card number:</label>
                       <input
                        type="text"
                        className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength="19"  // Keep this to ensure the maximum length is 19 characters (16 digits + 3 hyphens)
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                    />
             
                       <div className="flex gap-x-2 mb-4">
                         <div className="flex-1">
                           <label className="text-neutral-800 font-bold text-sm mb-2 block">Exp. date:</label>
                           <input
                             type="text"
                             className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                             value={expDate}
                             onChange={(e) => setExpDate(formatExpDate(e.target.value))}
                             
                             maxLength="5"
                             placeholder="MM/YY"
                           />
                         </div>
                         <div className="flex-1">
                           <label className="text-neutral-800 font-bold text-sm mb-2 block">CCV:</label>
                           <input
                             type="text"
                             className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                             value={ccvNumber}
                             onChange={(e) => setCcvNumber(e.target.value.replace(/\D/g, '').substring(0, 3))}
                             
                             maxLength="3"
                             placeholder="123"
                           />
                         </div>
                       </div>
             
                       <label className="text-neutral-800 font-bold text-sm mb-2 block">Card holder:</label>
                       <input
                         type="text"
                         className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                         value={cardName}
                         onChange={(e) => setCardName(e.target.value)}
                         
                         placeholder="John Doe"
                       />
                     </div>
             
                     {/* Card Display Section */}
                     <div className="w-full xl:w-1/2  xl:pl-8 max-xl:mt-5" >
                       <div className="w-full h-56 " style={{ perspective: '1000px' }}>
                       <div
                            className={`relative w-full h-full flex justify-center transition-transform duration-500 card ${isRearVisible ? 'flipped' : ''}`}
                            style={{ transformStyle: 'preserve-3d' }}
                            onClick={handleFlipCard}
                          >
                            {/* Front Side of Card */}
                            <div className={`absolute min-w-[300px] sm:min-w-[350px] h-full front ${isRearVisible ? 'hidden' : 'block'}`}>
                              <img src="https://i.ibb.co/swnZ5b1/Front-Side-Card.jpg" className="relative w-full h-full rounded-xl" alt="Front Side Card" />
                              <div className="w-full px-8 absolute top-8 text-white">
                                <div className="pt-1">
                                  <p className="font-light">Card Number</p>
                                  <p className="font-medium tracking-more-wider h-6">{cardNumber}</p>
                                </div>
                                <div className="pt-6 flex justify-between">
                                  <div>
                                    <p className="font-light">Name</p>
                                    <p className="font-medium tracking-widest h-6">{cardName.toUpperCase()}</p>
                                  </div>
                                  <div>
                                    <p className="font-light">Expiry</p>
                                    <p className="font-medium tracking-wider h-6 w-14">{expDate}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Back Side of Card */}
                            <div className={`absolute min-w-[300px] sm:min-w-[350px] h-full back ${isRearVisible ? 'block' : 'hidden'}`}>
                              <img src="https://i.ibb.co/Fn11jBc/Rear-Side-Card.jpg" className="relative w-full h-full rounded-xl" alt="Rear Side Card" />
                              <div className="w-full absolute top-8">
                                <div className="px-8 mt-12">
                                  <p className="text-black flex items-center pl-4 pr-2 w-14 ml-auto">{ccvNumber}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                       </div>
                     </div>
                   </form>
                 </div>
            : typepayments === 'paypal'?  
                <div className="w-full bg-white min-h-[400px] mt-10 flex justify-center items-center">
                    <form class="w-1/4 mx-auto">
                        <div class="mb-5">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email paypal</label>
                            <input type="email" onChange={(e)=>{setemailpaypal(e.target.value)}} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                        </div>
                        <div class="mb-5">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Your password paypal</label>
                            <input type="password" onChange={(e)=>{setpasswordpaypal(e.target.value)}} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        
                    </form>
                </div>
            
            :
             ''}
           
          </div>
        </div>
        <div className="w-11/12 custom:w-1/4 flex flex-col bg-white mt-10 shadow-lg min-h-[400px] rounded-xl">
            <div className="p-4 mt-4">
                <h2 className="text-3xl font-bold text-gray-800">Total Cart</h2>
            </div>
            
            <div className="flex justify-between px-4 mt-4">
                <p className="text-gray-500">{productsall.filter((product) => BasketProducts.includes(product.id)).length} Item Delivery</p>
                <p className="text-gray-700">{totalprice} MAD</p>
            </div>
            
           
            
            <div className=" flex  justify-between px-4 mt-4">
                <form className="w-full">
                <label htmlFor="underline_select" className="sr-only">Underline select</label>
                <select 
                    id="underline_select" 
                    onChange={(e) => settypepayments(e.target.value)} 
                    placeholder='Choose a payment method'
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                    <option value="payments_on_delivery">Payments on Delivery</option>
                    <option value="credit_card">Payments With Credit Card</option>
                    <option value="paypal">Payments with Paypal</option>
                </select>
                </form>
            </div>
            <div className="flex-grow flex mt-4 justify-between px-4">
                <p className="font-bold text-gray-500">Total TTC</p>
                <p className="font-bold text-blue-600">{totalprice} MAD</p>
            </div>

            <div className="mt-auto p-4">
                <button 
                onClick={(e)=>handleOrder(e)}
                type="button" 
                className="text-white w-full text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                Order
                </button>
            </div>
            </div>
      </div>
    </>
  );
}
