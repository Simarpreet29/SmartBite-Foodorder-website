// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const user = JSON.parse(localStorage.getItem('user'));

//   const fetchMyOrders = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/orders/user/${user.name}`);
//       setOrders(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Orders fetch failed");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchMyOrders();
//       const interval = setInterval(fetchMyOrders, 5000);
//       return () => clearInterval(interval);
//     }
//   }, []);

//   // Status Check Logic
//   const getStatusLevel = (status) => {
//     if (status === 'Pending') return 1;
//     if (status === 'Accepted') return 2;
//     if (status === 'Cooking') return 3;
//     if (status === 'Out for Delivery') return 4;
//     if (status === 'Delivered') return 5;
//     return 1;
//   };

//   if (loading) return <div className="text-center py-20 font-black text-gray-400 animate-pulse uppercase italic">Tracking your food...</div>;

//   return (
//     <div className="max-w-[1100px] mx-auto px-6 py-12 min-h-screen">
//       <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-12 text-gray-900">
//         Live <span className="text-[#FF6B01]">Tracking</span>
//       </h1>
      
//       <div className="space-y-10">
//         {orders.length === 0 ? (
//            <div className="bg-white p-20 rounded-[3rem] text-center shadow-sm border-2 border-dashed border-gray-100">
//               <p className="text-gray-300 font-black uppercase italic text-2xl">No active orders. Time to eat? 🍕</p>
//            </div>
//         ) : (
//           orders.map((order) => {
//             const currentLevel = getStatusLevel(order.status);
            
//             return (
//               <motion.div 
//                 initial={{ opacity: 0, scale: 0.95 }} 
//                 animate={{ opacity: 1, scale: 1 }} 
//                 key={order._id} 
//                 className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-50"
//               >
//                 {/* Header Info */}
//                 <div className="flex justify-between items-start mb-10 border-b border-gray-50 pb-6">
//                   <div>
//                     <span className="text-[10px] font-black text-[#FF6B01] uppercase tracking-[4px]">Order #{order._id.slice(-6)}</span>
//                     <h3 className="text-2xl font-black text-gray-800 uppercase italic mt-1">
//                       {order.items.map(i => i.name).join(", ")}
//                     </h3>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-3xl font-black text-gray-900 italic">₹{order.totalAmount}</p>
//                     <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{new Date(order.createdAt).toLocaleTimeString()}</p>
//                   </div>
//                 </div>

//                 {/* --- SMART PROGRESS BAR --- */}
//                 <div className="relative pt-4 pb-8">
//                   {/* Background Line */}
//                   <div className="absolute top-9 left-0 w-full h-1 bg-gray-100 rounded-full"></div>
//                   {/* Animated Progress Line */}
//                   <motion.div 
//                     initial={{ width: 0 }}
//                     animate={{ width: `${(currentLevel - 1) * 25}%` }}
//                     className="absolute top-9 left-0 h-1 bg-[#FF6B01] rounded-full z-10"
//                   ></motion.div>

//                   {/* Steps Icons */}
//                   <div className="relative z-20 flex justify-between">
//                     {['Placed', 'Accepted', 'Cooking', 'On Way', 'Delivered'].map((step, index) => {
//                       const stepNum = index + 1;
//                       const isActive = stepNum <= currentLevel;
//                       const isCurrent = stepNum === currentLevel;

//                       return (
//                         <div key={step} className="flex flex-col items-center gap-3 group">
//                           <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
//                             isActive ? 'bg-[#FF6B01] text-white shadow-lg shadow-orange-500/40' : 'bg-gray-100 text-gray-300'
//                           } ${isCurrent ? 'scale-125 ring-4 ring-orange-100' : ''}`}>
//                             <span className="text-[10px] font-black">{stepNum}</span>
//                           </div>
//                           <span className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${
//                             isActive ? 'text-gray-900' : 'text-gray-300'
//                           }`}>
//                             {step}
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="mt-8 flex justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
//                    <p className="text-xs font-bold text-gray-500 italic">
//                       {order.status === 'Pending' && "Waiting for restaurant to confirm... ⏳"}
//                       {order.status === 'Accepted' && "YAY! Chef has started preparing your food! 👨‍🍳"}
//                       {order.status === 'Delivered' && "Enjoy your meal! Don't forget to rate us! ⭐"}
//                    </p>
//                    <button className="text-[10px] font-black uppercase text-[#FF6B01] hover:underline">Help?</button>
//                 </div>
//               </motion.div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchMyOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/user/${user.name}`);
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Orders fetch failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
      const interval = setInterval(fetchMyOrders, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  const getStatusLevel = (status) => {
    if (status === 'Pending') return 1;
    if (status === 'Accepted') return 2;
    if (status === 'Cooking') return 3;
    if (status === 'Out for Delivery') return 4;
    if (status === 'Delivered') return 5;
    return 1;
  };

  if (loading) return <div className="text-center py-20 font-black text-gray-400 animate-pulse uppercase italic">Tracking your food...</div>;

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-12 text-gray-900">
        Live <span className="text-[#FF6B01]">Tracking</span>
      </h1>
      
      <div className="space-y-10">
        {orders.length === 0 ? (
           <div className="bg-white p-20 rounded-[3rem] text-center shadow-sm border-2 border-dashed border-gray-100">
              <p className="text-gray-300 font-black uppercase italic text-2xl">No active orders. Time to eat? 🍕</p>
           </div>
        ) : (
          orders.map((order) => {
            const currentLevel = getStatusLevel(order.status);
            
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                key={order._id} 
                className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-50"
              >
                {/* Header Info */}
                <div className="flex justify-between items-start mb-10 border-b border-gray-50 pb-6">
                  <div>
                    <span className="text-[10px] font-black text-[#FF6B01] uppercase tracking-[4px]">Order #{order._id.slice(-6)}</span>
                    <h3 className="text-2xl font-black text-gray-800 uppercase italic mt-1">
                      {order.items.map(i => i.name).join(", ")}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-gray-900 italic">₹{order.totalAmount}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>

                {/* --- SMART PROGRESS BAR --- */}
                <div className="relative pt-4 pb-8">
                  <div className="absolute top-9 left-0 w-full h-1 bg-gray-100 rounded-full"></div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentLevel - 1) * 25}%` }}
                    className="absolute top-9 left-0 h-1 bg-[#FF6B01] rounded-full z-10"
                  ></motion.div>

                  <div className="relative z-20 flex justify-between">
                    {['Placed', 'Accepted', 'Cooking', 'On Way', 'Delivered'].map((step, index) => {
                      const stepNum = index + 1;
                      const isActive = stepNum <= currentLevel;
                      const isCurrent = stepNum === currentLevel;

                      return (
                        <div key={step} className="flex flex-col items-center gap-3 group">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                            isActive ? 'bg-[#FF6B01] text-white shadow-lg shadow-orange-500/40' : 'bg-gray-100 text-gray-300'
                          } ${isCurrent ? 'scale-125 ring-4 ring-orange-100' : ''}`}>
                            <span className="text-[10px] font-black">{stepNum}</span>
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${
                            isActive ? 'text-gray-900' : 'text-gray-300'
                          }`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
                   <p className="text-xs font-bold text-gray-500 italic">
                      {order.status === 'Pending' && "Waiting for restaurant to confirm... ⏳"}
                      {order.status === 'Accepted' && "YAY! Chef has started preparing your food! 👨‍🍳"}
                      {order.status === 'Delivered' && "Enjoy your meal! Don't forget to rate us! ⭐"}
                   </p>
                   
                   {/* 🔥 FIXED TRACKING BUTTON ADDED HERE */}
                   <div className="flex items-center gap-4">
                     <button 
                       onClick={() => window.location.href = `/track-order?id=${order._id}`}
                       className="bg-[#FF6B01] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-md"
                     >
                       Track Live 🛰️
                     </button>
                     <button className="text-[10px] font-black uppercase text-gray-400 hover:underline">Help?</button>
                   </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderHistory;