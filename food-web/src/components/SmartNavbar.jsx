

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { motion, AnimatePresence } from 'framer-motion';

// const SmartNavbar = () => {
//   const { totalPrice, setIsCartOpen, cartItems, wishlist } = useCart(); // wishlist yahan se li
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
//       <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
        
//         {/* LOGO */}
//         <Link to="/" className="text-2xl font-black italic tracking-tighter text-[#121212]">
//           SMART<span className="text-[#FF6B01]">BITE</span>
//         </Link>

//         {/* DESKTOP MENU & ACTIONS */}
//         <div className="flex items-center gap-6">
//           <div className="hidden md:flex items-center gap-6">
//             <Link to="/search" className="text-[10px] font-black uppercase text-gray-400 hover:text-[#FF6B01] tracking-widest">Explore</Link>
            
//             {/* Wishlist Link (Desktop) */}
//             <Link to="/wishlist" className="relative text-[10px] font-black uppercase text-gray-400 hover:text-[#FF6B01] tracking-widest flex items-center gap-1">
//               Wishlist
//               {wishlist.length > 0 && (
//                 <span className="bg-red-500 text-white text-[7px] px-1.5 py-0.5 rounded-full">{wishlist.length}</span>
//               )}
//             </Link>
//           </div>
          
//           {user ? (
//             <div className="hidden md:flex items-center gap-4">
//               <Link to="/profile" className="text-[10px] font-black uppercase text-[#FF6B01] border-b-2 border-[#FF6B01] pb-1">
//                 Hi, {user.name.split(' ')[0]}
//               </Link>
              
//               {user.role === 'admin' && (
//                 <Link to="/admin" className="bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">Admin</Link>
//               )}

//               <button onClick={handleLogout} className="text-[10px] font-black uppercase text-gray-400 hover:text-red-500">Logout</button>
//             </div>
//           ) : (
//             <Link to="/login" className="hidden md:block text-[10px] font-black uppercase text-gray-900 border-b-2 border-black pb-1">Login</Link>
//           )}

//           {/* Cart Trigger */}
//           <button onClick={() => setIsCartOpen(true)} className="bg-[#121212] text-white px-5 py-3 rounded-2xl flex items-center gap-3 hover:bg-[#FF6B01] transition-all">
//             <span className="font-black text-xs">₹{totalPrice}</span>
//             <div className="relative">
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path></svg>
//               {cartItems.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-[#FF6B01] text-[8px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#121212]">
//                   {cartItems.length}
//                 </span>
//               )}
//             </div>
//           </button>

//           {/* Hamburger Icon for Mobile */}
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#121212] text-2xl">
//             {isMenuOpen ? '✕' : '☰'}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU (Responsive) */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div 
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="md:hidden bg-white border-t border-gray-50 overflow-hidden"
//           >
//             <div className="px-6 py-8 flex flex-col gap-6 font-black uppercase text-xs tracking-widest">
//               <Link to="/search" onClick={() => setIsMenuOpen(false)}>Explore</Link>
//               <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex justify-between">
//                 Wishlist <span className="text-[#FF6B01]">{wishlist.length}</span>
//               </Link>
//               <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Order History</Link>
              
//               {user?.role === 'admin' && (
//                 <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-[#FF6B01]">Admin Dashboard</Link>
//               )}

//               <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
//                 {user ? (
//                   <>
//                     <span className="text-[#FF6B01]">Hi, {user.name}</span>
//                     <button onClick={handleLogout} className="text-red-500">Logout</button>
//                   </>
//                 ) : (
//                   <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login / Register</Link>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default SmartNavbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const SmartNavbar = () => {
  // FIX: Yahan wahi naam use karo jo tumne CartContext ki value mein pass kiye hain
  const { totalPrice, setShowCart, cartItems, wishlist } = useCart(); 
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO (No change) */}
        <Link to="/" className="text-2xl font-black italic tracking-tighter text-[#121212]">
          SMART<span className="text-[#FF6B01]">BITE</span>
        </Link>

        {/* DESKTOP MENU & ACTIONS */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/search" className="text-[10px] font-black uppercase text-gray-400 hover:text-[#FF6B01] tracking-widest">Explore</Link>
            
            {/* Wishlist Link (Desktop) */}
            <Link to="/wishlist" className="relative text-[10px] font-black uppercase text-gray-400 hover:text-[#FF6B01] tracking-widest flex items-center gap-1 group">
              Wishlist
              {wishlist && wishlist.length > 0 && (
                <span className="bg-[#FF6B01] text-white text-[7px] px-1.5 py-0.5 rounded-full group-hover:scale-110 transition-all">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>
          
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              {/* Order History Link as 'Hi, Name' */}
              <Link to="/profile" className="text-[10px] font-black uppercase text-[#FF6B01] border-b-2 border-[#FF6B01] pb-1 hover:opacity-80 transition-all">
                Hi, {user.name.split(' ')[0]}
              </Link>
              
              {user.role === 'admin' && (
                <Link to="/admin" className="bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">Admin</Link>
              )}

              <button onClick={handleLogout} className="text-[10px] font-black uppercase text-gray-400 hover:text-red-500">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block text-[10px] font-black uppercase text-gray-900 border-b-2 border-black pb-1">Login</Link>
          )}

          {/* Cart Trigger (Fixed function name) */}
          <button 
            onClick={() => setShowCart(true)} 
            className="bg-[#121212] text-white px-5 py-3 rounded-2xl flex items-center gap-3 hover:bg-[#FF6B01] transition-all active:scale-95 shadow-lg shadow-black/10"
          >
            <span className="font-black text-xs">₹{totalPrice}</span>
            <div className="relative">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B01] text-[8px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#121212] font-black">
                  {cartItems.length}
                </span>
              )}
            </div>
          </button>

          {/* Hamburger Icon for Mobile (No change) */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#121212] text-2xl p-2">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* MOBILE MENU (Responsive - Added Order History Link) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-50 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-10 flex flex-col gap-8 font-black uppercase text-[10px] tracking-widest">
              <Link to="/search" onClick={() => setIsMenuOpen(false)}>Explore Menu</Link>
              <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                My Wishlist <span className="bg-[#FF6B01] text-white px-2 py-1 rounded-lg text-[8px]">{wishlist.length} Items</span>
              </Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                Order History 📜
              </Link>
              
              {user?.role === 'admin' && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-[#FF6B01]">Admin Dashboard</Link>
              )}

              <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                {user ? (
                  <>
                    <div className="flex flex-col">
                       <span className="text-[8px] text-gray-400">Welcome Back</span>
                       <span className="text-[#FF6B01] text-xs">Hi, {user.name}</span>
                    </div>
                    <button onClick={handleLogout} className="text-red-500 font-black">Logout</button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-black text-white py-4 rounded-2xl">Login / Signup</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SmartNavbar;