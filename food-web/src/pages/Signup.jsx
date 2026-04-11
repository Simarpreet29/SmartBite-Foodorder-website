import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert("Account Created! Now Login 🚀");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white/50"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Join <span className="text-[#FF6B01]">SmartBite</span></h1>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2">Start your 2026 food journey</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <input 
            type="text" placeholder="Full Name" required
            className="w-full bg-white/60 p-5 rounded-2xl outline-none border border-gray-100 focus:border-[#FF6B01] transition-all font-bold"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Email Address" required
            className="w-full bg-white/60 p-5 rounded-2xl outline-none border border-gray-100 focus:border-[#FF6B01] transition-all font-bold"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Create Password" required
            className="w-full bg-white/60 p-5 rounded-2xl outline-none border border-gray-100 focus:border-[#FF6B01] transition-all font-bold"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button className="w-full bg-[#FF6B01] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-xs font-bold text-gray-400 uppercase">
          Already a member? <Link to="/login" className="text-gray-900 border-b-2 border-gray-900 ml-1">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;