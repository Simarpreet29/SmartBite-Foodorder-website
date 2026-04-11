import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Token save karo
      localStorage.setItem('user', JSON.stringify(res.data.user)); // User details save karo
      alert(`Welcome back, ${res.data.user.name}! 🍔`);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white/50"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Login <span className="text-[#FF6B01]">Back</span></h1>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2">Access your smart plate</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" placeholder="Email Address" required
            className="w-full bg-white/60 p-5 rounded-2xl outline-none border border-gray-100 focus:border-[#FF6B01] transition-all font-bold"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full bg-white/60 p-5 rounded-2xl outline-none border border-gray-100 focus:border-[#FF6B01] transition-all font-bold"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-[#121212] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#FF6B01] transition-all shadow-xl active:scale-95">
            Log In
          </button>
        </form>

        <p className="text-center mt-8 text-xs font-bold text-gray-400 uppercase">
          New here? <Link to="/signup" className="text-[#FF6B01] border-b-2 border-[#FF6B01] ml-1">Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;