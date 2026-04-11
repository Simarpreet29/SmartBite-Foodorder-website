// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// const Categories = () => {
//   const foodCategories = [
//     { name: "Burgers", img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
//     { name: "Pizza", img: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png" },
//     { name: "Sushi", img: "https://cdn-icons-png.flaticon.com/512/2252/2252912.png" },
//     { name: "Pasta", img: "https://cdn-icons-png.flaticon.com/512/3480/3480618.png" },
//     { name: "Desserts", img: "https://cdn-icons-png.flaticon.com/512/2682/2682413.png" },
//     { name: "Drinks", img: "https://cdn-icons-png.flaticon.com/512/2405/2405479.png" },
//     { name: "Salads", img: "https://cdn-icons-png.flaticon.com/512/2153/2153788.png" }
//   ];

//   return (
//     <div className="py-10">
//       <h3 className="text-xl font-black text-gray-800 mb-6 uppercase tracking-widest flex items-center gap-2">
//         <span className="w-8 h-[2px] bg-[#FF6B01]"></span> What's on your mind?
//       </h3>
//       <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
//         {foodCategories.map((item, index) => (
//           <motion.div 
//             key={index}
//             whileHover={{ y: -5 }}
//             className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
//           >
//             <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white shadow-sm border-2 border-dashed border-gray-100 flex items-center justify-center p-4 group-hover:border-[#FF6B01] group-hover:bg-orange-50 transition-all duration-300">
//               <img src={item.img} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
//             </div>
//             <span className="mt-3 font-bold text-gray-600 group-hover:text-black transition-colors">{item.name}</span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Categories;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // 👈 Link import kiya

const Categories = () => {
  const foodCategories = [
    { name: "Burgers", img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
    { name: "Pizza", img: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png" },
    { name: "Sushi", img: "https://cdn-icons-png.flaticon.com/512/2252/2252912.png" },
    { name: "Pasta", img: "https://cdn-icons-png.flaticon.com/512/3480/3480618.png" },
    { name: "Desserts", img: "https://cdn-icons-png.flaticon.com/512/2682/2682413.png" },
    { name: "Drinks", img: "https://cdn-icons-png.flaticon.com/512/2405/2405479.png" },
    { name: "Salads", img: "https://cdn-icons-png.flaticon.com/512/2153/2153788.png" }
  ];

  return (
    <div className="py-10">
      <h3 className="text-xl font-black text-gray-800 mb-6 uppercase tracking-widest flex items-center gap-2">
        <span className="w-8 h-[2px] bg-[#FF6B01]"></span> What's on your mind?
      </h3>
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {foodCategories.map((item, index) => (
          // 🚨 DESIGN SAME RAKHNE KE LIYE LINK ADD KIYA HAI 🚨
          <Link 
            to={`/category/${item.name.toLowerCase()}`} 
            key={index} 
            className="no-underline"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white shadow-sm border-2 border-dashed border-gray-100 flex items-center justify-center p-4 group-hover:border-[#FF6B01] group-hover:bg-orange-50 transition-all duration-300">
                <img src={item.img} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
              </div>
              <span className="mt-3 font-bold text-gray-600 group-hover:text-black transition-colors">{item.name}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;