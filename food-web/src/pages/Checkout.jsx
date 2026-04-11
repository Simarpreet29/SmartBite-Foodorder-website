//final code---------


// import React, { useState, useEffect } from 'react';
// import { useCart } from '../context/CartContext';
// import axios from 'axios';

// const Checkout = () => {
//   const { cartItems, totalPrice, clearCart } = useCart();
//   const [loading, setLoading] = useState(false);
//   const [promoInput, setPromoInput] = useState(""); 
//   const [discount, setDiscount] = useState(0); 
//   const user = JSON.parse(localStorage.getItem('user'));

//   const [customer, setCustomer] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     phone: "",
//     address: ""
//   });

//   const applyCoupon = () => {
//     if (promoInput === "SMART50" && totalPrice >= 500) {
//       setDiscount(50);
//       alert("Success! ₹50 Discount Applied 🎁");
//     } else {
//       alert("Invalid Promo Code!");
//     }
//   };

//   const finalAmount = totalPrice - discount;

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const orderData = {
//         customerName: customer.name,
//         customerEmail: customer.email || user?.email,
//         phone: customer.phone,
//         address: customer.address,
//         items: cartItems,
//         totalAmount: finalAmount
//       };

//       // Backend API call
//       const res = await axios.post('http://localhost:5000/api/orders/place', orderData);

//       if (res.data && res.data._id) {
//         // ✅ TERA ORIGINAL SUCCESS POPUP
//         alert("Payment Successful! Order Placed. 🎉");
        
        
//         // Redirect to tracking
//         window.location.href = `/track-order?id=${res.data._id}`;
//       }
//     } catch (err) {
//       alert("Order Failed! Backend check karo.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-[1400px] mx-auto px-6 py-16 min-h-screen">
//       <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-12 text-gray-900">Final <span className="text-[#FF6B01]">Step</span></h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
//         {/* FORM */}
//         <form onSubmit={handlePlaceOrder} className="space-y-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
//            <div className="space-y-2">
//              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Full Name</label>
//              <input type="text" className="w-full bg-gray-50 p-5 rounded-2xl outline-none font-bold" value={customer.name} readOnly />
//            </div>
//            <div className="space-y-2">
//              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Phone Number</label>
//              <input type="text" placeholder="987XX XXXXX" className="w-full bg-gray-50 p-5 rounded-2xl outline-none font-bold" value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})} required />
//            </div>
//            <div className="space-y-2">
//              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Delivery Address</label>
//              <textarea rows="3" placeholder="House No, Street, City..." className="w-full bg-gray-50 p-5 rounded-2xl outline-none font-bold resize-none" value={customer.address} onChange={(e) => setCustomer({...customer, address: e.target.value})} required />
//            </div>
//            <button type="submit" disabled={loading} className="w-full bg-[#121212] text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-2xl hover:bg-[#FF6B01] transition-all">
//              {loading ? "PROCESSING..." : "PLACE ORDER & PAY"}
//            </button>
//         </form>

//         {/* SUMMARY */}
//         <div className="bg-gray-50 p-10 rounded-[4rem] border border-gray-100 shadow-inner">
//            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">Order Summary</p>
//            <div className="space-y-6 mb-10">
//               {cartItems.map(item => (
//                 <div key={item._id} className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-white">
//                   <p className="font-black uppercase italic text-[11px] text-gray-600">{item.name} x {item.quantity}</p>
//                   <p className="font-black text-gray-900 italic text-sm">₹{item.price * item.quantity}</p>
//                 </div>
//               ))}
//            </div>
//            <div className="flex gap-2 mb-10">
//               <input type="text" placeholder="SMART50" className="flex-1 bg-white p-5 rounded-2xl outline-none font-bold text-[10px] border border-gray-200" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} />
//               <button type="button" onClick={applyCoupon} className="bg-[#121212] text-white px-8 rounded-2xl font-black uppercase text-[10px]">Apply</button>
//            </div>
//            <div className="flex justify-between items-end border-t border-gray-200 pt-8">
//               <span className="text-5xl font-black italic uppercase tracking-tighter text-gray-900">Total</span>
//               <div className="text-right">
//                 {discount > 0 && <p className="text-red-500 font-black text-[10px] mb-1 italic">- ₹{discount} Discount</p>}
//                 <span className="text-5xl font-black italic text-[#FF6B01] tracking-tighter">₹{finalAmount}</span>
//               </div>
//            </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [promoInput, setPromoInput] = useState(""); 
  const [discount, setDiscount] = useState(0); 
  const user = JSON.parse(localStorage.getItem('user'));

  const [customer, setCustomer] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: ""
  });

  // Razorpay script load karne ke liye
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const applyCoupon = () => {
    if (promoInput === "SMART50" && totalPrice >= 500) {
      setDiscount(50);
      alert("Success! ₹50 Discount Applied 🎁");
    } else {
      alert("Invalid Promo Code!");
    }
  };

  const finalAmount = totalPrice - discount;

  // --- RAZORPAY PAYMENT LOGIC ---
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Cart khali hai!");
    
    setLoading(true);

    try {
      // 1. Backend se Order ID mangwana
      const orderRes = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount: finalAmount
      });

      const { amount, id: order_id, currency } = orderRes.data;

      // 2. Razorpay Options
      const options = {
        key: "rzp_test_Sawt3iCGE2rfB4", // 👈 Yahan apni Key ID dalo
        amount: amount,
        currency: currency,
        name: "SmartBite",
        description: "Delicious Food Payment",
        order_id: order_id,
        handler: async function (response) {
          // YE CHALEGA JAB PAYMENT SUCCESS HOGI ✅
          const orderData = {
            customerName: customer.name,
            customerEmail: customer.email || user?.email,
            phone: customer.phone,
            address: customer.address,
            items: cartItems,
            totalAmount: finalAmount,
            paymentId: response.razorpay_payment_id
          };

          const res = await axios.post('http://localhost:5000/api/orders/place', orderData);

          if (res.data && res.data._id) {
            alert("Payment Successful! Order Placed. 🎉");
            try {
        clearCart(); 
      } catch (e) {
        console.log("Cart clear error, but moving to tracking...");
      }
            // clearCart(); 
            window.location.href = `/track-order?id=${res.data._id}`;
          }
        },
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        theme: { color: "#FF6B01" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (err) {
      alert("Payment Initiation Failed! Backend check karo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 min-h-screen">
      <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-12 text-gray-900">Final <span className="text-[#FF6B01]">Step</span></h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* FORM */}
        <form onSubmit={handlePlaceOrder} className="space-y-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Full Name</label>
             <input type="text" className="w-full bg-gray-50 p-5 rounded-2xl outline-none font-bold" value={customer.name} readOnly />
           </div>
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Phone Number</label>
             <input type="text" placeholder="987XX XXXXX" className="w-full bg-gray-50 p-5 rounded-2xl outline-none font-bold" value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})} required />
           </div>
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Delivery Address</label>
             <textarea rows="3" placeholder="House No, Street, City..." className="w-full bg-gray-50 p-5 rounded-2xl outline-none font-bold resize-none" value={customer.address} onChange={(e) => setCustomer({...customer, address: e.target.value})} required />
           </div>
           <button type="submit" disabled={loading} className="w-full bg-[#121212] text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-2xl hover:bg-[#FF6B01] transition-all">
             {loading ? "PROCESSING..." : "PLACE ORDER & PAY"}
           </button>
        </form>

        {/* SUMMARY */}
        <div className="bg-gray-50 p-10 rounded-[4rem] border border-gray-100 shadow-inner">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">Order Summary</p>
           <div className="space-y-6 mb-10">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-white">
                  <p className="font-black uppercase italic text-[11px] text-gray-600">{item.name} x {item.quantity}</p>
                  <p className="font-black text-gray-900 italic text-sm">₹{item.price * item.quantity}</p>
                </div>
              ))}
           </div>
           <div className="flex gap-2 mb-10">
              <input type="text" placeholder="SMART50" className="flex-1 bg-white p-5 rounded-2xl outline-none font-bold text-[10px] border border-gray-200" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} />
              <button type="button" onClick={applyCoupon} className="bg-[#121212] text-white px-8 rounded-2xl font-black uppercase text-[10px]">Apply</button>
           </div>
           <div className="flex justify-between items-end border-t border-gray-200 pt-8">
              <span className="text-5xl font-black italic uppercase tracking-tighter text-gray-900">Total</span>
              <div className="text-right">
                {discount > 0 && <p className="text-red-500 font-black text-[10px] mb-1 italic">- ₹{discount} Discount</p>}
                <span className="text-5xl font-black italic text-[#FF6B01] tracking-tighter">₹{finalAmount}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;