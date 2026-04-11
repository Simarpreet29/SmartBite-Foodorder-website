import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  
  // 🔥 YE LINE MISSING HAI - ISSE ADD KARO
  const [showCart, setShowCart] = useState(false); 

  // Add to Cart Logic
  const addToCart = (product) => {
    setCartItems((prev) => {
      const isExist = prev.find(item => item._id === product._id);
      if (isExist) {
        return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Wishlist Toggle Logic
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isExist = prev.find(item => item._id === product._id);
      if (isExist) {
        return prev.filter(item => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  // Total Price Calculator
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems,
      totalPrice,
      addToCart,
      wishlist,
      toggleWishlist,
      showCart,      // ✅ Ab ye error nahi dega
      setShowCart    // ✅ Ab Navbar ise use kar payega
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

