import React from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

const TrackingWidget = () => {
  return (
    <motion.div 
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      className="fixed bottom-10 right-6 z-50 bg-[#1e1e1e] text-white p-6 rounded-[2.5rem] shadow-2xl border border-white/10 flex items-center gap-5 max-w-[320px]"
    >
      <div className="relative">
        <div className="w-14 h-14 bg-[#FF6B01] rounded-2xl flex items-center justify-center animate-pulse">
          <Truck size={28} />
        </div>
      </div>
      <div>
        <h4 className="font-black text-sm uppercase tracking-wider">Order Tracking</h4>
        <p className="text-[10px] text-gray-400 mb-2 uppercase">Your Burger is 2km away</p>
        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: ["20%", "75%"] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="h-full bg-[#FF6B01]" 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TrackingWidget;