import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodGrid from '../components/FoodGrid'; // 👈 Tera asli component

const AllFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllFoods = async () => {
            try {
                // Backend se data mangwana
                const res = await axios.get('http://localhost:5000/api/food/all');
                setFoods(res.data);
            } catch (err) {
                console.error("Menu fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllFoods();
        window.scrollTo(0, 0);
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-2xl font-black italic text-[#FF6B01] animate-bounce uppercase">
                Preparing SmartBite Menu...
            </div>
        </div>
    );

    return (
        <div className="max-w-[1400px] mx-auto py-20 px-6 min-h-screen">
            <div className="mb-16">
                <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
                    Hungry? <br />
                    <span className="text-[#FF6B01]">Our Full Menu</span>
                </h1>
                <p className="text-gray-400 mt-4 font-bold uppercase text-[10px] tracking-[0.4em]">Handpicked flavors just for you</p>
            </div>

            {/* Food Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
                {foods.length > 0 ? (
                    foods.map(item => (
                        /* 🚨 DHAYAN SE: Yahan check karo ki FoodGrid 
                           ko data 'food' prop mein chahiye ya kisi aur mein */
                        <FoodGrid key={item._id} food={item} /> 
                    ))
                ) : (
                    <div className="col-span-full py-32 text-center bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-black italic uppercase text-xl">
                            No dishes found. Add some from Admin Panel!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllFoods;