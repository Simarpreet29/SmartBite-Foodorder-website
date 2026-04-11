import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allFoods, setAllFoods] = useState([]); // Database ka poora data
  const [filteredFoods, setFilteredFoods] = useState([]); // Search ke baad wala data
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // 1. Database se saara khana load karo
  useEffect(() => {
    const fetchAllFoods = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/food/all');
        setAllFoods(res.data);
        setFilteredFoods(res.data); // Shuru mein saara dikhao
        setLoading(false);
      } catch (err) {
        console.error("Search data fetch error", err);
        setLoading(false);
      }
    };
    fetchAllFoods();
  }, []);

  // 2. Search Logic (Jaise hi searchTerm badle, filter karo)
  useEffect(() => {
    const results = allFoods.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFoods(results);
  }, [searchTerm, allFoods]);

  return (
    <div className="max-w-[1300px] mx-auto px-6 py-12 min-h-screen">
      
      {/* Search Header */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-6 text-gray-900">
          Find Your <span className="text-[#FF6B01]">Cravings</span>
        </h1>
        
        {/* Real-time Search Bar */}
        <div className="relative max-w-2xl mx-auto group">
          <input 
            type="text" 
            placeholder="Search pizza, burgers, or any dish..." 
            className="w-full bg-white border-2 border-gray-100 p-6 rounded-[2.5rem] outline-none text-xl font-bold focus:border-[#FF6B01] shadow-2xl shadow-gray-200/50 transition-all pl-16"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF6B01] transition-colors" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="text-center py-20 font-black text-gray-300 uppercase italic text-2xl animate-pulse">Scanning the Kitchen...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredFoods.length > 0 ? (
              filteredFoods.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={item._id} 
                  className="bg-white p-5 rounded-[3rem] shadow-xl border border-gray-50 group hover:shadow-2xl transition-all"
                >
                  <div className="relative h-64 rounded-[2.5rem] overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-black text-white px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                      {item.category}
                    </div>
                  </div>
                  <div className="mt-6 px-2 flex justify-between items-center">
                    <div>
                      <h3 className="font-black text-xl text-gray-800 uppercase italic">{item.name}</h3>
                      <p className="text-[#FF6B01] font-bold text-lg">₹{item.price}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-[#121212] text-white px-6 py-3 rounded-2xl font-black hover:bg-[#FF6B01] transition-all active:scale-95 shadow-lg"
                    >
                      ADD
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed">
                 <p className="text-2xl font-black text-gray-300 uppercase italic">Oops! No dish found named "{searchTerm}"</p>
                 <button onClick={() => setSearchTerm("")} className="mt-4 text-[#FF6B01] font-black uppercase text-xs tracking-widest underline">Clear Search</button>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Search;