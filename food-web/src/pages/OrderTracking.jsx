//final code
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import axios from 'axios';

// Socket connection check
const socket = io('http://localhost:5000');

const OrderTracking = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('id');
    const [status, setStatus] = useState('Pending');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!orderId) {
            setError("No Order ID found in URL!");
            setLoading(false);
            return;
        }

        // 1. Initial Fetch from Backend
        const fetchStatus = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
                if (res.data) {
                    setStatus(res.data.status);
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("Order details fetch karne mein dikat aayi!");
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();

        // 2. Socket Live Updates
        socket.emit('joinOrder', orderId);
        socket.on('statusUpdate', (newStatus) => {
            console.log("Socket Update:", newStatus);
            setStatus(newStatus);
        });

        return () => {
            socket.off('statusUpdate');
        };
    }, [orderId]);

    // UI Steps Logic
    const steps = ['Pending', 'Accepted', 'Cooking', 'Out for Delivery', 'Delivered'];
    const currentIndex = steps.indexOf(status);

    if (error) return <div className="text-center py-20 font-black text-red-500 uppercase italic">{error}</div>;
    if (loading) return <div className="text-center py-20 font-black text-gray-400 animate-pulse uppercase italic tracking-widest">Finding your order... 🔍</div>;

    return (
        <div className="max-w-[800px] mx-auto py-20 px-6 text-center min-h-screen">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-black uppercase italic mb-2 tracking-tighter text-gray-900">
                    Live <span className="text-[#FF6B01]">Tracking</span>
                </h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-16">
                    Order ID: {orderId}
                </p>

                {/* Progress Bar Container */}
                <div className="relative mb-24 px-4">
                    <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 rounded-full"></div>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
                        className="absolute top-4 left-0 h-1 bg-[#FF6B01] rounded-full transition-all duration-700"
                    ></motion.div>

                    <div className="relative flex justify-between">
                        {steps.map((step, index) => (
                            <div key={step} className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] transition-all duration-500 ${
                                    index <= currentIndex ? 'bg-[#FF6B01] text-white shadow-lg shadow-orange-200' : 'bg-white border-2 border-gray-100 text-gray-300'
                                }`}>
                                    {index < currentIndex ? '✓' : index + 1}
                                </div>
                                <span className={`text-[9px] font-black uppercase mt-4 absolute -bottom-8 ${index <= currentIndex ? 'text-black' : 'text-gray-300'}`}>
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Message Card */}
                <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-gray-200/50 border border-gray-50 mt-10">
                    <span className="text-[10px] font-black text-[#FF6B01] uppercase tracking-[0.4em]">Current Status</span>
                    <h2 className="text-6xl font-black italic uppercase mt-4 tracking-tighter text-gray-900">{status}</h2>
                    <div className="h-1 w-16 bg-gray-100 mx-auto my-8"></div>
                    <p className="text-gray-500 font-bold italic text-sm">
                        {status === 'Pending' && "Waiting for restaurant to confirm... ⏳"}
                        {status === 'Accepted' && "Order confirmed! Prepping starts soon. ✅"}
                        {status === 'Cooking' && "Chef is working their magic! 👨‍🍳"}
                        {status === 'Out for Delivery' && "Your food is on the way! 🛵"}
                        {status === 'Delivered' && "Enjoy your meal! ⭐"}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderTracking;