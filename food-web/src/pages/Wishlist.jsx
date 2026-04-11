


import React from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16 min-h-screen bg-[#FBFBFE]">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-gray-900 leading-none">
            Your <span className="text-[#FF6B01]">Favorites</span>
          </h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mt-2">Saved for your next feast</p>
        </div>
        <div className="text-right">
          <span className="text-4xl font-black italic text-[#FF6B01]">{wishlist.length}</span>
          <p className="text-[9px] font-black text-gray-400 uppercase">Items</p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-24 rounded-[4rem] text-center border-2 border-dashed border-gray-100"
        >
          <div className="text-6xl mb-6">🏜️</div>
          <p className="text-gray-300 font-black uppercase italic text-xl tracking-tighter mb-6">
            Wishlist is empty, bhai!
          </p>
          <button 
            onClick={() => window.location.href = '/'} 
            className="bg-[#121212] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#FF6B01] transition-all"
          >
            Explore Menu 🍕
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {wishlist.map((item) => (
              <motion.div 
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white p-6 rounded-[3rem] shadow-sm border border-gray-50 relative group"
              >
                {/* Remove Button */}
                <button 
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-6 right-6 z-10 bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-75"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>

                <img src={item.img} className="w-full h-48 object-cover rounded-[2.2rem] mb-6 shadow-lg" alt={item.name} />
                
                <h3 className="font-black text-xl text-gray-800 uppercase italic tracking-tighter mb-1">{item.name}</h3>
                <p className="text-[#FF6B01] font-black text-2xl italic mb-6 text-right">₹{item.price}</p>

                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-[#121212] text-white py-5 rounded-[1.8rem] font-black uppercase text-[10px] tracking-widest hover:bg-[#FF6B01] shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  Move to Cart 🛒
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Wishlist;