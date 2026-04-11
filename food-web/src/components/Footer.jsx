import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white pt-16 pb-8 font-sans border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black italic tracking-tighter text-[#FF6B01]">SMARTBITE</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Smart Food Ordering 2026: Direct kitchen-to-door delivery with AI-tracking.
          </p>
          {/* Social Icons (Plain SVG) */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#1e1e1e] rounded-xl flex items-center justify-center hover:bg-[#FF6B01] transition-all cursor-pointer">
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </div>
            <div className="w-10 h-10 bg-[#1e1e1e] rounded-xl flex items-center justify-center hover:bg-[#FF6B01] transition-all cursor-pointer">
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </div>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-[#FF6B01]">Navigation</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Menu</li>
            <li className="hover:text-white cursor-pointer">Order Tracking</li>
            <li className="hover:text-white cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF6B01]">Connect</h3>
          <p className="text-gray-400 text-sm">Amritsar, Punjab</p>
          <p className="text-gray-400 text-sm font-bold">+91 12345 67890</p>
        </div>
      </div>
      <div className="text-center mt-16 text-gray-700 text-[10px] tracking-[4px]">
        © 2026 SMARTBITE LOGISTICS
      </div>
    </footer>
  );
};

export default Footer;