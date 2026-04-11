import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg> },
    { name: 'Search', path: '/search', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> },
    { name: 'Orders', path: '/orders', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg> },
    { name: 'Profile', path: '/profile', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 h-20 bg-[#121212] rounded-[2.5rem] shadow-2xl z-[100] flex items-center justify-around px-4 border border-white/5">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#FF6B01] scale-110' : 'text-gray-500'}`}
          >
            {item.icon}
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.name}</span>
            {isActive && <div className="w-1 h-1 bg-[#FF6B01] rounded-full mt-1"></div>}
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;