

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';

// const Profile = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // --- NAYE STATES FOR ADDRESSES ---
//   const [addresses, setAddresses] = useState(JSON.parse(localStorage.getItem('saved_addresses')) || []);
//   const [showAddrForm, setShowAddrForm] = useState(false);
//   const [newAddr, setNewAddr] = useState({ label: "Home", full: "" });

//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         if (user && user.email) {
//           const userEmail = user.email.toLowerCase();
//           const res = await axios.get(`http://localhost:5000/api/orders/user/${userEmail}`);
//           setOrders(res.data);
//         }
//       } catch (err) { 
//         console.error("Fetch failed", err); 
//       }
//       setLoading(false);
//     };
//     fetchOrders();
//   }, []);

//   // --- NAYE FUNCTIONS FOR ADDRESS ---
//   const saveAddress = (e) => {
//     e.preventDefault();
//     if(!newAddr.full) return;
//     const updated = [...addresses, newAddr];
//     setAddresses(updated);
//     localStorage.setItem('saved_addresses', JSON.stringify(updated));
//     setNewAddr({ label: "Home", full: "" });
//     setShowAddrForm(false);
//   };

//   const deleteAddr = (index) => {
//     const updated = addresses.filter((_, i) => i !== index);
//     setAddresses(updated);
//     localStorage.setItem('saved_addresses', JSON.stringify(updated));
//   };

//   return (
//     <div className="max-w-[1200px] mx-auto px-6 py-16 min-h-screen">
//       {/* Profile Header (Aapka Purana Code) */}
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121212] p-12 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden mb-16">
//         <div className="w-32 h-32 bg-[#FF6B01] rounded-full flex items-center justify-center text-5xl font-black italic shadow-inner">
//           {user?.name[0]}
//         </div>
//         <div className="relative z-10 text-center md:text-left">
//           <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-2">{user?.name}</h1>
//           <p className="text-[#FF6B01] font-black uppercase tracking-[4px] text-[10px]">{user?.email}</p>
//         </div>
//         <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B01] blur-[150px] opacity-20 -mr-20 -mt-20"></div>
//       </motion.div>

//       {/* --- NAYA FEATURE: SAVED ADDRESSES SECTION --- */}
//       <section className="mb-20">
//         <div className="flex justify-between items-center mb-8 px-2">
//           <h2 className="text-3xl font-black uppercase italic tracking-tighter">
//             Saved <span className="text-[#FF6B01]">Addresses</span>
//           </h2>
//           <button 
//             onClick={() => setShowAddrForm(!showAddrForm)}
//             className="bg-black text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#FF6B01] transition-all"
//           >
//             {showAddrForm ? "Close" : "+ Add New"}
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <AnimatePresence>
//             {showAddrForm && (
//               <motion.form 
//                 initial={{ opacity: 0, scale: 0.9 }} 
//                 animate={{ opacity: 1, scale: 1 }} 
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 onSubmit={saveAddress} 
//                 className="bg-gray-50 p-8 rounded-[2.5rem] border-2 border-dashed border-gray-200"
//               >
//                 <select 
//                   className="w-full bg-white p-3 rounded-xl mb-4 font-black text-[10px] uppercase outline-none border-none shadow-sm" 
//                   value={newAddr.label}
//                   onChange={(e)=>setNewAddr({...newAddr, label: e.target.value})}
//                 >
//                   <option value="Home">🏠 Home</option>
//                   <option value="Office">🏢 Office</option>
//                   <option value="Gym">💪 Gym / Other</option>
//                 </select>
//                 <textarea 
//                   placeholder="House No, Street, Landmark..." 
//                   className="w-full bg-white p-4 rounded-2xl mb-4 text-sm font-bold outline-none h-24 shadow-sm resize-none" 
//                   required 
//                   value={newAddr.full}
//                   onChange={(e)=>setNewAddr({...newAddr, full: e.target.value})}
//                 ></textarea>
//                 <button className="w-full bg-[#FF6B01] text-white py-4 rounded-2xl font-black uppercase text-[10px] shadow-lg shadow-orange-200">Save Address</button>
//               </motion.form>
//             )}
//           </AnimatePresence>

//           {addresses.map((addr, i) => (
//             <motion.div layout key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 relative group shadow-sm hover:shadow-md transition-all">
//               <span className="bg-orange-50 text-[#FF6B01] text-[8px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest">{addr.label}</span>
//               <p className="mt-5 text-gray-600 font-bold text-sm leading-relaxed uppercase italic">{addr.full}</p>
//               <button 
//                 onClick={() => deleteAddr(i)} 
//                 className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"
//               >
//                 <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"></path></svg>
//               </button>
//             </motion.div>
//           ))}

//           {addresses.length === 0 && !showAddrForm && (
//             <div className="col-span-full py-10 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem]">
//               <p className="text-gray-300 font-black uppercase italic text-xs tracking-widest">No addresses saved yet.</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* History Section (Aapka Purana Code) */}
//       <h2 className="text-4xl font-black uppercase italic mb-10 text-gray-900 tracking-tighter">
//         Order <span className="text-[#FF6B01]">History</span>
//       </h2>

//       {loading ? (
//         <div className="text-gray-300 font-black uppercase italic animate-pulse">Scanning your past plates...</div>
//       ) : orders.length === 0 ? (
//         <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100">
//           <p className="text-gray-300 font-black uppercase italic text-xl">No orders yet. Hungry?</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6">
//           {orders.map((order, idx) => (
//             <motion.div 
//               key={order._id} 
//               initial={{ opacity: 0, x: -20 }} 
//               animate={{ opacity: 1, x: 0 }} 
//               transition={{ delay: idx * 0.1 }}
//               className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-xl transition-all group"
//             >
//               <div>
//                 <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">#{order._id.slice(-6)}</span>
//                 <h3 className="text-xl font-black text-gray-800 uppercase mt-1 leading-none group-hover:text-[#FF6B01] transition-colors">
//                   {order.items.map(i => i.name).join(", ")}
//                 </h3>
//                 <p className="text-gray-400 text-[10px] font-bold mt-2 uppercase italic">{new Date(order.createdAt).toDateString()}</p>
//               </div>
//               <div className="flex items-center gap-8">
//                 <div className="text-right">
//                    <p className="text-2xl font-black italic text-gray-900 leading-none">₹{order.totalAmount}</p>
//                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Paid Online</p>
//                 </div>
//                 <span className={`px-5 py-2 rounded-2xl font-black uppercase text-[10px] tracking-tighter ${
//                   order.status === 'Delivered' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-[#FF6B01]'
//                 }`}>
//                   {order.status}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useCart } from '../context/CartContext'; // Re-order ke liye zaruri

// const Profile = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { addToCart } = useCart(); // Cart context use kiya
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (user && user.email) {
//         try {
//           const email = user.email.toLowerCase();
//           const res = await axios.get(`http://localhost:5000/api/orders/user/${email}`);
//           setOrders(res.data);
//         } catch (err) {
//           console.error("Fetch failed:", err);
//         }
//       }
//       setLoading(false);
//     };
//     fetchOrders();
//   }, []);

//   // --- NEW FEATURE: Re-order Logic ---
//   const handleReorder = (items) => {
//     items.forEach(item => {
//       addToCart(item); // Purani items ko wapas cart mein daalo
//     });
//     alert("Items added back to cart! 🛒");
//   };

//   // --- NEW FEATURE: Stats Calculation ---
//   const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

//   return (
//     <div className="max-w-[1200px] mx-auto px-6 py-16 min-h-screen bg-[#FBFBFE]">
      
//       {/* Profile Header Card (Aapka Purana UI) */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         className="bg-[#121212] p-12 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden mb-8"
//       >
//         <div className="w-32 h-32 bg-[#FF6B01] rounded-full flex items-center justify-center text-5xl font-black italic shadow-inner">
//           {user?.name ? user.name[0].toUpperCase() : 'U'}
//         </div>
//         <div className="relative z-10 text-center md:text-left flex-1">
//           <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-2">{user?.name}</h1>
//           <p className="text-[#FF6B01] font-black uppercase tracking-[4px] text-[10px] opacity-80">{user?.email}</p>
//         </div>
        
//         {/* NEW FEATURE: Stats Box inside Header */}
//         <div className="relative z-10 flex gap-6 border-l border-gray-800 pl-10 hidden lg:flex">
//             <div className="text-center">
//                 <p className="text-[8px] font-black uppercase text-gray-500 tracking-widest">Total Orders</p>
//                 <p className="text-3xl font-black italic text-[#FF6B01]">{orders.length}</p>
//             </div>
//             <div className="text-center border-l border-gray-800 pl-6">
//                 <p className="text-[8px] font-black uppercase text-gray-500 tracking-widest">Total Spent</p>
//                 <p className="text-3xl font-black italic text-white">₹{totalSpent}</p>
//             </div>
//         </div>

//         <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B01] blur-[150px] opacity-20 -mr-20 -mt-20"></div>
//       </motion.div>

//       {/* Order History Section */}
//       <h2 className="text-4xl font-black uppercase italic mb-10 text-gray-900 tracking-tighter">
//         Order <span className="text-[#FF6B01]">History</span>
//       </h2>

//       {loading ? (
//         <div className="flex items-center gap-3">
//           <div className="w-5 h-5 border-4 border-[#FF6B01] border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-400 font-black uppercase italic text-xs tracking-widest">Searching your kitchen history...</p>
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="bg-white p-24 rounded-[4rem] text-center border-2 border-dashed border-gray-100">
//           <p className="text-gray-300 font-black uppercase italic text-xl mb-4 tracking-tighter">No orders found yet.</p>
//           <button onClick={() => window.location.href = '/'} className="bg-[#FF6B01] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">Go To Menu 🍕</button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6">
//           {orders.map((order, idx) => (
//             <motion.div 
//               key={order._id} 
//               initial={{ opacity: 0, x: -20 }} 
//               animate={{ opacity: 1, x: 0 }} 
//               transition={{ delay: idx * 0.1 }}
//               className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-xl transition-all group border-l-8 border-l-[#FF6B01]"
//             >
//               <div className="flex-1">
//                 <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-2">Order ID: #{order._id.slice(-6)}</span>
//                 <h3 className="text-xl font-black text-gray-800 uppercase leading-none group-hover:text-[#FF6B01] transition-colors">
//                   {order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
//                 </h3>
//                 <div className="flex gap-4 mt-3">
//                    <p className="text-gray-400 text-[10px] font-bold uppercase italic">{new Date(order.createdAt).toLocaleDateString()}</p>
//                    <p className="text-gray-400 text-[10px] font-bold uppercase italic">Time: {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
//                 </div>
                
//                 {/* NEW FEATURE: Re-order Button for Desktop */}
//                 <button 
//                     onClick={() => handleReorder(order.items)}
//                     className="mt-4 text-[9px] font-black uppercase text-[#FF6B01] border border-[#FF6B01]/20 px-4 py-2 rounded-xl hover:bg-[#FF6B01] hover:text-white transition-all active:scale-95"
//                 >
//                     Order This Again 🔄
//                 </button>
//               </div>

//               <div className="flex items-center gap-8">
//                 <div className="text-right">
//                    <p className="text-2xl font-black italic text-gray-900 leading-none">₹{order.totalAmount}</p>
//                    <p className="text-[9px] font-black text-green-500 uppercase tracking-widest mt-1">Paid Successful ✅</p>
//                 </div>
//                 <span className={`px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-tighter relative ${
//                   order.status === 'Delivered' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-[#FF6B01]'
//                 }`}>
//                   {order.status}
//                   {/* Pulse effect if not delivered */}
//                   {order.status !== 'Delivered' && (
//                       <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping"></span>
//                   )}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchOrders = async () => {
    setLoading(true);
    if (user && user.email) {
      try {
        // Hum backend se data mangwa rahe hain
        const res = await axios.get(`http://localhost:5000/api/orders/user/${user.email.toLowerCase()}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Orders load nahi ho paye", err);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16 min-h-screen">
      {/* Profile Header Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-12 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden mb-16"
      >
        <div className="w-32 h-32 bg-[#FF6B01] rounded-full flex items-center justify-center text-5xl font-black italic shadow-2xl border-4 border-white/10">
          {user?.name ? user.name[0].toUpperCase() : 'S'}
        </div>
        <div className="relative z-10 text-center md:text-left flex-1">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-2">{user?.name}</h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{user?.email}</p>
        </div>
        
        {/* Naya Refresh Button */}
        <button 
          onClick={fetchOrders}
          className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all active:scale-90"
        >
          🔄
        </button>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B01] blur-[150px] opacity-10"></div>
      </motion.div>

      {/* History Section */}
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-4xl font-black uppercase italic text-gray-900 tracking-tighter">
          Order <span className="text-[#FF6B01]">History</span>
        </h2>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{orders.length} Orders Total</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-24 bg-gray-100 rounded-[2.5rem] animate-pulse"></div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-20 rounded-[4rem] text-center border-2 border-dashed border-gray-100">
          <div className="text-6xl mb-6">📦</div>
          <p className="text-gray-300 font-black uppercase italic text-xl">No orders yet. Start your feast!</p>
          <button onClick={() => window.location.href='/'} className="mt-6 bg-[#FF6B01] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-orange-200">Order Now</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {orders.map((order, idx) => (
              <motion.div 
                key={order._id} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-xl transition-all group border-l-[12px] border-l-[#FF6B01]"
              >
                <div className="flex-1">
                  <div className="flex gap-3 items-center mb-2">
                    <span className="text-[8px] font-black bg-gray-100 px-3 py-1 rounded-full text-gray-400 uppercase tracking-widest">#{order._id.slice(-6)}</span>
                    <span className="text-[8px] font-black text-gray-300 uppercase">{new Date(order.createdAt).toDateString()}</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-800 uppercase leading-none group-hover:text-[#FF6B01] transition-colors">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
                  </h3>
                  {/* Yahan Address bhi dikha sakte hain agar user ne bhara hai */}
                  <p className="text-gray-400 text-[10px] font-bold mt-3 uppercase italic opacity-60">Delivering to: {order.address || 'Saved Address'}</p>
                </div>

                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="text-2xl font-black italic text-gray-900 leading-none">₹{order.totalAmount}</p>
                    <p className="text-[9px] font-black text-green-500 uppercase tracking-widest mt-1">Payment Received</p>
                  </div>
                  <div className={`px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-tighter ${
                    order.status === 'Delivered' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-[#FF6B01]'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Profile;