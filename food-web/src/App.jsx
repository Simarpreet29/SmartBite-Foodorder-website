import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Components
import SmartNavbar from './components/SmartNavbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FoodGrid from './components/FoodGrid';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import AllFoods from './components/AllFoods';

// Pages
import CategoryPage from './pages/CategoryPage';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Wishlist from './pages/Wishlist';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'admin';
  const isLoggedIn = !!user;

  return (
    <CartProvider>
      <Router>
        <div className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-[#FF6B01] selection:text-white">
          
          <SmartNavbar />
          <CartSidebar />

          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={
              <main className="max-w-[1400px] mx-auto px-4 md:px-10 pb-24 md:pb-12">
                <Hero />
                <Categories />
                <div className="mt-12">
                  <h2 className="text-4xl font-black text-gray-900 uppercase italic tracking-tighter mb-8">Popular Near You 🔥</h2>
                  <FoodGrid />
                </div>
              </main>
            } />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/all-foods" element={<FoodGrid />} />

            {/* PROTECTED ROUTES (Login Required) */}
            <Route path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />} />
            <Route path="/track-order" element={<OrderTracking />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/wishlist" element={<Wishlist />} />
           

            {/* ADMIN ROUTE */}
            <Route path="/admin" element={isAdmin ? <Admin /> : <div className="h-screen flex items-center justify-center font-black uppercase text-red-500 italic text-2xl text-center px-6">Access Denied! <br/> Admins Only.</div>} />
          </Routes>

          <BottomNav />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
     