

                 
// import React from 'react';
// import { useCart } from '../context/CartContext';
// import { motion, AnimatePresence } from 'framer-motion';

// const CartSidebar = () => {
//   // Context se showCart aur use band karne wala function nikaalo
//   const { showCart, setShowCart, cartItems, totalPrice, removeFromCart } = useCart();

//   return (
//     <AnimatePresence>
//       {/* 1. Sirf tabhi dikhao jab showCart TRUE ho */}
//       {showCart && (
//         <>
//           {/* Backdrop: Peeche ka kaala hissa jo click karne par cart band kar de */}
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }}
//             onClick={() => setShowCart(false)} 
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
//           />

//           {/* Sidebar: Asli Cart jo right se slide karega */}
//           <motion.div 
//             initial={{ x: '100%' }} 
//             animate={{ x: 0 }} 
//             exit={{ x: '100%' }}
//             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//             className="fixed right-0 top-0 h-screen w-full max-w-[400px] bg-white z-[1001] shadow-2xl p-8 flex flex-col"
//           >
//             <div className="flex justify-between items-center mb-10">
//               <h2 className="text-3xl font-black italic uppercase tracking-tighter">Your <span className="text-[#FF6B01]">Cart</span></h2>
//               <button onClick={() => setShowCart(false)} className="text-2xl hover:rotate-90 transition-all">✕</button>
//             </div>

//             {/* Cart Items List */}
//             <div className="flex-1 overflow-y-auto space-y-6">
//               {cartItems.length === 0 ? (
//                 <p className="text-center text-gray-400 font-black uppercase italic mt-20">Cart Khali Hai Bhai! 🍕</p>
//               ) : (
//                 cartItems.map((item) => (
//                   <div key={item._id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl">
//                     <img src={item.img} className="w-16 h-16 rounded-xl object-cover" />
//                     <div className="flex-1">
//                       <h4 className="font-black text-xs uppercase">{item.name}</h4>
//                       <p className="text-[#FF6B01] font-bold text-xs">₹{item.price} x {item.quantity}</p>
//                     </div>
//                     <button onClick={() => removeFromCart(item._id)} className="text-red-500">🗑️</button>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Bottom Section */}
//             <div className="pt-8 border-t border-gray-100">
//               <div className="flex justify-between text-2xl font-black mb-6 italic">
//                 <span>Total</span>
//                 <span>₹{totalPrice}</span>
//               </div>
//               <button 
//                 onClick={() => { setShowCart(false); window.location.href='/checkout'; }}
//                 className="w-full bg-[#121212] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#FF6B01] transition-all"
//               >
//                 Checkout Now
//               </button>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CartSidebar;


import React from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { showCart, setShowCart, cartItems, totalPrice, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setShowCart(false); // Sidebar band karo
    navigate('/checkout'); // React Router se navigate karo (No Refresh)
  };

  return (
    <AnimatePresence>
      {showCart && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowCart(false)} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
          />

          {/* Sidebar Content */}
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-[400px] bg-white z-[1001] shadow-2xl p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900">Your <span className="text-[#FF6B01]">Cart</span></h2>
              <button onClick={() => setShowCart(false)} className="text-2xl hover:rotate-90 transition-all text-gray-400">✕</button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 opacity-30 italic font-black uppercase">Cart is Empty! 🍕</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-[2rem] border border-gray-100 group">
                    <img src={item.img} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt={item.name} />
                    <div className="flex-1">
                      <h4 className="font-black text-[10px] uppercase tracking-tight text-gray-800">{item.name}</h4>
                      <p className="text-[#FF6B01] font-black text-xs italic">₹{item.price} x {item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="p-2 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all">🗑️</button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Section */}
            <div className="pt-8 border-t border-gray-100 mt-6">
              <div className="flex justify-between text-2xl font-black mb-8 italic tracking-tighter">
                <span className="text-gray-400 uppercase text-xs self-center">Total Amount</span>
                <span className="text-gray-900">₹{totalPrice}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-[#FF6B01] text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-orange-100 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
              >
                Checkout Now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;