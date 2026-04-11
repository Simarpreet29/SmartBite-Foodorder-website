


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('orders'); 
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [stats, setStats] = useState({ sales: 0, active: 0, items: 0 });
  const [chartData, setChartData] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", category: "pizza", img: "" });

  // --- Logic to Prepare Graph Data ---
  const processChartData = (allOrders) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const revenueByDay = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };

    allOrders.forEach(order => {
      const date = new Date(order.createdAt);
      const dayName = days[date.getDay()];
      revenueByDay[dayName] += Number(order.totalAmount || 0); 
    });

    return Object.keys(revenueByDay).map(day => ({
      name: day,
      revenue: revenueByDay[day]
    }));
  };

  const fetchData = async () => {
    try {
      const [orderRes, foodRes] = await Promise.all([
        axios.get('http://localhost:5000/api/orders/all'),
        axios.get('http://localhost:5000/api/food/all')
      ]);
      
      setOrders(orderRes.data);
      setFoods(foodRes.data);
      
      const processedData = processChartData(orderRes.data);
      setChartData(processedData);

      const totalSales = orderRes.data.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);
      const activeOrders = orderRes.data.filter(o => o.status !== 'Delivered' && o.status !== 'Rejected').length;
      setStats({ sales: totalSales, active: activeOrders, items: foodRes.data.length });
    } catch (err) { console.error("Fetch error", err); }
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/update/${id}`, { status });
      fetchData(); 
    } catch (err) { console.error(err); }
  };

  // --- Manage Menu Functions (Updated for Image URL) ---
  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      // Direct JSON data bhej rahe hain bina Multer ke
      await axios.post('http://localhost:5000/api/food/add', formData);
      alert("Dish Added! 🥗");
      setFormData({ name: "", price: "", category: "pizza", img: "" });
      fetchData();
    } catch (err) { alert("Failed to add"); }
  };

  const handleDeleteFood = async (id) => {
    if (window.confirm("Delete this dish?")) {
      try {
        await axios.delete(`http://localhost:5000/api/food/delete/${id}`);
        fetchData();
      } catch (err) { alert("Delete failed"); }
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10 min-h-screen bg-[#FBFBFE]">
      {/* HEADER & CHARTS */}
      <div className="mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-10 text-gray-900">Command <span className="text-[#FF6B01]">Center</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Revenue Trend (Actual Sales ₹)</p>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF6B01" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FF6B01" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <YAxis hide={true} domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}
                      formatter={(value) => [`₹${value}`, 'Daily Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#FF6B01" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#121212] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group h-1/2">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest relative z-10">Total Revenue</p>
              <h3 className="text-5xl font-black mt-2 relative z-10 italic tracking-tighter">₹{stats.sales}</h3>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B01] blur-[80px] opacity-20"></div>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm h-1/2 flex flex-col justify-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Orders</p>
              <h3 className="text-5xl font-black mt-2 text-[#FF6B01] tracking-tighter">{stats.active}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-10 bg-gray-100 p-2 rounded-[2rem] w-fit font-bold uppercase text-[10px]">
        <button onClick={() => setActiveTab('orders')} className={`px-10 py-4 rounded-[1.5rem] transition-all ${activeTab === 'orders' ? 'bg-white text-[#FF6B01] shadow-xl' : 'text-gray-400'}`}>Orders</button>
        <button onClick={() => setActiveTab('menu')} className={`px-10 py-4 rounded-[1.5rem] transition-all ${activeTab === 'menu' ? 'bg-white text-[#FF6B01] shadow-xl' : 'text-gray-400'}`}>Manage Menu</button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'orders' ? (
          <motion.div key="orders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-x-auto">
              <table className="w-full text-left min-w-[900px]">
                <thead className="bg-gray-50 border-b border-gray-100 uppercase text-[10px] font-black text-gray-400">
                  <tr><th className="p-8">Customer</th><th className="p-8">Items</th><th className="p-8">Bill</th><th className="p-8">Current Status</th><th className="p-8 text-right">Update Progress</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50/50 transition-all">
                      <td className="p-8 font-black text-gray-800 uppercase text-lg">{order.customerName}</td>
                      <td className="p-8 text-xs font-bold text-gray-500">{order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}</td>
                      <td className="p-8 font-black text-xl italic text-gray-900">₹{order.totalAmount}</td>
                      <td className="p-8">
                        <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                          order.status === 'Delivered' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-[#FF6B01]'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-8 text-right">
                        <div className="flex gap-2 justify-end">
                          {order.status === 'Accepted' && (
                            <button onClick={() => updateStatus(order._id, 'Cooking')} className="bg-yellow-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">Start Cooking</button>
                          )}
                          {order.status === 'Cooking' && (
                            <button onClick={() => updateStatus(order._id, 'Out for Delivery')} className="bg-purple-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">Out for Delivery</button>
                          )}
                          {order.status === 'Out for Delivery' && (
                            <button onClick={() => updateStatus(order._id, 'Delivered')} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter">Mark Delivered</button>
                          )}
                          {order.status === 'Delivered' && <span className="text-[10px] font-black text-gray-300 uppercase italic">Completed ✅</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </motion.div>
        ) : (
          <motion.div key="menu" className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 h-fit">
              <h3 className="text-2xl font-black italic uppercase mb-8">Add <span className="text-[#FF6B01]">Dish</span></h3>
              <form onSubmit={handleAddFood} className="space-y-6">
                <input type="text" placeholder="Name" className="w-full bg-gray-50 p-5 rounded-2xl outline-none font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <input type="number" placeholder="Price" className="w-full bg-gray-50 p-5 rounded-2xl outline-none font-bold" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                
                {/* 🚨 Yahan humne file upload ko URL input se replace kiya hai 🚨 */}
                <input 
                  type="text" 
                  placeholder="Paste Image URL (e.g., https://...)" 
                  className="w-full bg-gray-50 p-5 rounded-2xl outline-none font-bold text-sm border-2 border-dashed border-gray-200 focus:border-[#FF6B01] transition-all" 
                  value={formData.img} 
                  onChange={(e) => setFormData({...formData, img: e.target.value})} 
                  required 
                />
                
                <select 
                   className="w-full bg-gray-50 p-5 rounded-2xl outline-none font-bold uppercase text-xs"
                   value={formData.category}
                   onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                    <option value="pizza">Pizza</option>
                    <option value="burgers">Burgers</option>
                    <option value="pasta">Pasta</option>
                    <option value="sushi">Sushi</option>
                    <option value="desserts">Desserts</option>
                    <option value="drinks">Drinks</option>
                    <option value="salads">Salads</option>
                    <option value="indian">Indian</option>
                    <option value="chinese">Chinese</option>
                </select>

                <button className="w-full bg-[#FF6B01] text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">Publish Item</button>
              </form>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
               {foods.map(item => (
                 <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-[2rem] border border-gray-100">
                    <img src={item.img} className="w-16 h-16 rounded-[1.2rem] object-cover" alt="" />
                    <div className="flex-1">
                      <h4 className="font-black text-xs uppercase">{item.name}</h4>
                      <p className="text-[#FF6B01] font-bold text-xs">₹{item.price}</p>
                    </div>
                    <button onClick={() => handleDeleteFood(item._id)} className="p-2 bg-red-50 text-red-500 rounded-lg">🗑️</button>
                 </div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;