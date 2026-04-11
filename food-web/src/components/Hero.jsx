import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  const foodCategories = [
    { name: "Pizza", slug: "pizza" },
    { name: "Burgers", slug: "burgers" },
    { name: "Chinese", slug: "chinese" },
    { name: "Indian", slug: "indian" },
    { name: "Desserts", slug: "desserts" },
    { name: "Drinks", slug: "drinks" }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-4 md:py-8">
      
      {/* 1. SIDEBAR (Desktop par Sidebar, Mobile par Horizontal Scroll) */}
      <div className="w-full lg:w-1/4">
        {/* Desktop Title */}
        <div className="hidden lg:block bg-[#FF6B01] text-white p-5 rounded-t-[2rem] font-black uppercase text-[10px] tracking-[3px]">
          Menu Categories
        </div>

        {/* Categories List */}
        <ul className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-4 lg:gap-0 bg-white lg:rounded-b-[2rem] p-2 lg:p-0 shadow-sm lg:shadow-none no-scrollbar">
          {foodCategories.map((item, index) => (
            <li 
              key={index}
              onClick={() => navigate(`/category/${item.slug}`)}
              className="flex-shrink-0 lg:flex-shrink flex items-center justify-center lg:justify-between px-6 py-3 lg:py-5 border lg:border-0 lg:border-b border-gray-100 rounded-full lg:rounded-none bg-gray-50 lg:bg-transparent text-gray-700 font-bold hover:bg-orange-50 hover:text-[#FF6B01] cursor-pointer transition-all whitespace-nowrap min-w-fit"
            >
              <span className="text-sm lg:text-base">{item.name}</span>
              <span className="hidden lg:block text-[#FF6B01] font-bold">→</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. MAIN BANNER (Responsive Height) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 h-[250px] md:h-[480px] rounded-[2rem] md:rounded-[3rem] relative overflow-hidden shadow-xl flex items-center px-6 md:px-12 text-white"
        style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-sm md:max-w-lg">
          <h2 className="text-3xl md:text-6xl font-black leading-tight mb-4 md:mb-8 uppercase italic">
            Spicy <br className="hidden md:block"/> Food Delivery.
          </h2>
          <button onClick={()=> navigate('/all-foods')} className="bg-[#FF6B01] px-8 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl font-black hover:bg-orange-600 transition shadow-xl uppercase text-[10px] md:text-sm tracking-widest">
            Order Now
          </button>
        </div>
      </motion.div>

    </div>
  );
};

export default Hero;