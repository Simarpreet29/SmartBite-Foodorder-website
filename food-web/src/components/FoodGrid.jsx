
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const FoodGrid = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [isVeg, setIsVeg] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/food/all');
        setFoods(res.data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();

    // Wishlist fetch logic (Phle jaisa)
    if (user && user.id) {
      axios.get(`http://localhost:5000/api/user/wishlist/${user.id}`)
        .then(res => {
            const ids = res.data.map(item => item._id || item);
            setWishlist(ids);
        })
        .catch(err => console.log("Wishlist fetch error"));
    }
  }, []);

  // --- TOGGLE WISHLIST LOGIC (PHLE JAISA) ---
  const toggleWishlist = async (foodId) => {
    if(!user) return alert("Please Login first!");
    try {
      const res = await axios.post('http://localhost:5000/api/user/wishlist/toggle', {
        userId: user.id,
        foodId
      });
      // Backend se updated wishlist aayegi
      setWishlist(res.data.map(item => item._id || item));
    } catch (err) {
      console.error(err);
    }
  };

  // Filter Logic (Veg + Search)
  const filteredFoods = foods.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) && 
    (isVeg ? f.category.toLowerCase() === 'veg' : true)
  );

  return (
    <div className="max-w-[1400px] mx-auto py-20 px-6 space-y-12">
      
      {/* --- SEARCH & FILTER BAR (DESIGN WAISA HI HAI) --- */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search your craving..." 
            className="w-full p-4 pl-6 bg-gray-50 rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-[#FF6B01] transition-all border-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* VEG TOGGLE (PHLE JAISA) */}
        <div className="flex items-center gap-4">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isVeg ? 'text-green-600' : 'text-gray-400'}`}>Veg Only</span>
            <div 
                onClick={() => setIsVeg(!isVeg)}
                className={`w-12 h-6 rounded-full cursor-pointer relative transition-all duration-300 ${isVeg ? 'bg-green-500' : 'bg-gray-200'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isVeg ? 'left-7' : 'left-1'}`}></div>
            </div>
        </div>
      </div>

      {/* --- FOOD GRID (LAPTOP PE 4 CARDS) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
        {filteredFoods.map((food) => (
          <div key={food._id} className="relative group bg-white p-4 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full">
            
            {/* WISHLIST HEART ICON */}
            <button 
              onClick={() => toggleWishlist(food._id)}
              className="absolute top-8 right-8 z-10 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:scale-110 transition-all"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" height="20" 
                viewBox="0 0 24 24" 
                fill={wishlist.includes(food._id) ? "#FF6B01" : "none"} 
                stroke={wishlist.includes(food._id) ? "#FF6B01" : "#121212"} 
                strokeWidth="2.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            {/* IMAGE SECTION */}
            <div className="h-52 overflow-hidden rounded-[2.5rem] mb-6">
               <img src={food.img} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>

            {/* CONTENT */}
            <div className="px-2 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-black uppercase italic text-lg tracking-tighter truncate w-2/3">{food.name}</h3>
                    <span className="text-[10px] font-black bg-gray-100 px-3 py-1 rounded-full uppercase italic">★ 4.8</span>
                </div>
                <p className="text-[#FF6B01] font-black text-2xl italic tracking-tighter mb-4">₹{food.price}</p>
                
                {/* ADD TO CART */}
                <button 
                  onClick={() => {
                    addToCart(food);
                    alert("Added to cart! 🍔");
                  }}
                  className="w-full mt-auto bg-[#121212] text-white py-4 rounded-[1.5rem] font-black text-[10px] tracking-[0.2em] uppercase hover:bg-[#FF6B01] transition-all shadow-lg active:scale-95"
                >
                  ADD TO CART
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodGrid;