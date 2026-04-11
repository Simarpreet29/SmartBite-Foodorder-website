// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { motion, AnimatePresence } from 'framer-motion';

// const CategoryPage = () => {
//   const { slug } = useParams(); // 'pizza', 'burgers', etc.
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get('http://localhost:5000/api/food/all');
//         // Filter items based on category slug
//         const filtered = res.data.filter(item => item.category.toLowerCase() === slug.toLowerCase());
//         setItems(filtered);
//       } catch (err) {
//         console.error("Error fetching category items:", err);
//       }
//       setLoading(false);
//     };
//     fetchCategoryData();
//   }, [slug]);

//   return (
//     <div className="min-h-screen bg-[#fcfcfc] pb-20">
//       {/* 1. Dynamic Header Section */}
//       <div className="relative h-[300px] md:h-[400px] bg-[#121212] flex items-center justify-center overflow-hidden">
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }} 
//           animate={{ opacity: 1, y: 0 }}
//           className="relative z-10 text-center px-6"
//         >
//           <span className="text-[10px] font-black uppercase tracking-[5px] text-[#FF6B01] mb-4 block">SmartBite Menu</span>
//           <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
//             {slug}<span className="text-[#FF6B01]">.</span>
//           </h1>
//           <p className="text-gray-400 font-bold mt-4 uppercase text-xs tracking-widest">Handcrafted flavors delivered in minutes</p>
//         </motion.div>
        
//         {/* Background Decorative Element */}
//         <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B01] blur-[180px] opacity-20 rounded-full -mr-20 -mt-20"></div>
//         <div className="absolute bottom-0 left-0 w-72 h-72 bg-white blur-[150px] opacity-10 rounded-full -ml-20 -mb-20"></div>
//       </div>

//       <div className="max-w-[1300px] mx-auto px-6 -mt-10 relative z-20">
//         {/* 2. Breadcrumbs & Back Button */}
//         <div className="flex justify-between items-center mb-12">
//             <Link to="/" className="bg-white px-6 py-3 rounded-2xl shadow-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#FF6B01] hover:text-white transition-all flex items-center gap-2">
//                 ← Back to Home
//             </Link>
//             <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
//                 Explore / <span className="text-gray-900">{slug}</span>
//             </div>
//         </div>

//         {/* 3. Items Grid */}
//         {loading ? (
//             <div className="text-center py-20 font-black text-gray-300 uppercase italic animate-pulse text-2xl">Loading {slug}...</div>
//         ) : items.length === 0 ? (
//             <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
//                 <p className="text-3xl font-black text-gray-200 uppercase italic">No {slug} found in database</p>
//                 <Link to="/admin" className="text-[#FF6B01] font-black uppercase text-[10px] tracking-widest mt-4 block underline">Add some items from Admin Panel</Link>
//             </div>
//         ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//                 <AnimatePresence>
//                 {items.map((item, index) => (
//                     <motion.div 
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: index * 0.1 }}
//                         key={item._id} 
//                         className="bg-white p-5 rounded-[3rem] shadow-xl shadow-gray-200/40 border border-gray-50 group hover:border-[#FF6B01] transition-all"
//                     >
//                         <div className="relative h-72 rounded-[2.5rem] overflow-hidden">
//                             <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                             <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-black text-[10px] uppercase shadow-sm">
//                                 Best Seller
//                             </div>
//                         </div>
//                         <div className="mt-6 px-2">
//                             <div className="flex justify-between items-start mb-4">
//                                 <div>
//                                     <h3 className="font-black text-2xl text-gray-900 uppercase italic leading-none">{item.name}</h3>
//                                     <p className="text-gray-400 text-[10px] font-bold uppercase mt-2">Authentic {slug} recipe</p>
//                                 </div>
//                                 <span className="text-2xl font-black text-[#FF6B01] italic">₹{item.price}</span>
//                             </div>
//                             <button 
//                                 onClick={() => addToCart(item)}
//                                 className="w-full bg-[#121212] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-[#FF6B01] transition-all shadow-xl shadow-orange-500/10 active:scale-95"
//                             >
//                                 Add to Cart
//                             </button>
//                         </div>
//                     </motion.div>
//                 ))}
//                 </AnimatePresence>
//             </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryPage = () => {
  // 1. URL se category ka naam uthana (Slug matches what you pass from Home)
  const { slug } = useParams(); 
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        // ✅ Direct backend route use kar rahe hain jo humne index.js mein banaya tha
        // Isse sirf wahi items aayenge jo is category ke hain
        const res = await axios.get(`http://localhost:5000/api/food/category/${slug.toLowerCase()}`);
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching category items:", err);
        // Fallback: Agar specific route fail ho toh pura fetch karke filter (Tera purana logic)
        const res = await axios.get('http://localhost:5000/api/food/all');
        const filtered = res.data.filter(item => item.category.toLowerCase() === slug.toLowerCase());
        setItems(filtered);
      }
      setLoading(false);
    };
    fetchCategoryData();
    window.scrollTo(0, 0); // Click karte hi page top par aaye
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-20">
      {/* Dynamic Header Section */}
      <div className="relative h-[300px] md:h-[400px] bg-[#121212] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-[10px] font-black uppercase tracking-[5px] text-[#FF6B01] mb-4 block">SmartBite Menu</span>
          <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
            {slug}<span className="text-[#FF6B01]">.</span>
          </h1>
          <p className="text-gray-400 font-bold mt-4 uppercase text-xs tracking-widest">Handcrafted flavors delivered in minutes</p>
        </motion.div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B01] blur-[180px] opacity-20 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white blur-[150px] opacity-10 rounded-full -ml-20 -mb-20"></div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 -mt-10 relative z-20">
        {/* Breadcrumbs & Back Button */}
        <div className="flex justify-between items-center mb-12">
            <Link to="/" className="bg-white px-6 py-3 rounded-2xl shadow-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#FF6B01] hover:text-white transition-all flex items-center gap-2">
                ← Back to Home
            </Link>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Explore / <span className="text-gray-900">{slug}</span>
            </div>
        </div>

        {/* Items Grid */}
        {loading ? (
            <div className="text-center py-20 font-black text-gray-300 uppercase italic animate-pulse text-2xl">Loading {slug}...</div>
        ) : items.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
                <p className="text-3xl font-black text-gray-200 uppercase italic">No {slug} found in database</p>
                <Link to="/admin" className="text-[#FF6B01] font-black uppercase text-[10px] tracking-widest mt-4 block underline">Add some items from Admin Panel</Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence>
                {items.map((item, index) => (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.1 }}
                        key={item._id} 
                        className="bg-white p-5 rounded-[3rem] shadow-xl shadow-gray-200/40 border border-gray-50 group hover:border-[#FF6B01] transition-all"
                    >
                        <div className="relative h-72 rounded-[2.5rem] overflow-hidden">
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-black text-[10px] uppercase shadow-sm">
                                {item.category}
                            </div>
                        </div>
                        <div className="mt-6 px-2">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-black text-2xl text-gray-900 uppercase italic leading-none">{item.name}</h3>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase mt-2">Authentic {slug} recipe</p>
                                </div>
                                <span className="text-2xl font-black text-[#FF6B01] italic">₹{item.price}</span>
                            </div>
                            <button 
                                onClick={() => addToCart(item)}
                                className="w-full bg-[#121212] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-[#FF6B01] transition-all shadow-xl shadow-orange-500/10 active:scale-95"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;