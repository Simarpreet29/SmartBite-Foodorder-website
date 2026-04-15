


//finall code
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs'); 
// const jwt = require('jsonwebtoken'); 

// // --- SOCKET.IO IMPORTS ---
// const http = require('http'); 
// const { Server } = require('socket.io');

// const Food = require('./models/Food');
// const Order = require('./models/Order');
// const User = require('./models/User'); 

// const app = express(); 
// const server = http.createServer(app); 

// // 1. FIXED CORS (Isse Admin aur Checkout dono ko permission milegi)
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true
// }));

// app.use(express.json());

// // 2. SOCKET.IO SETUP
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST", "PATCH"],
//         credentials: true
//     }
// });

// const JWT_SECRET = "SmartBite_Secret_Key_2026"; 

// // Database Connection
// mongoose.connect("mongodb://localhost:27017/smartbite")
//     .then(() => console.log("SmartBite DB Connected! 📦"))
//     .catch((err) => console.error(err));

// // SOCKET LOGIC
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);
//   socket.on('joinOrder', (orderId) => {
//     socket.join(orderId);
//     console.log(`User joined order room: ${orderId}`);
//   });
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// // --- AUTH ROUTES ---
// app.post('/api/auth/signup', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword, role: 'user' });
//         await newUser.save();
//         res.status(201).json({ message: "User created!" });
//     } catch (err) { res.status(500).json({ error: err.message }); }
// });

// app.post('/api/auth/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: "User not found!" });
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });
//         const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
//         res.status(200).json({ 
//             token, 
//             user: { id: user._id, name: user.name, email: user.email, role: user.role } 
//         });
//     } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // --- WISHLIST ROUTES ---
// app.post('/api/user/wishlist/toggle', async (req, res) => {
//     const { userId, foodId } = req.body;
//     try {
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });
//         const isExist = user.wishlist.includes(foodId);
//         if (isExist) { user.wishlist = user.wishlist.filter(id => id.toString() !== foodId); } 
//         else { user.wishlist.push(foodId); }
//         await user.save();
//         const updatedUser = await User.findById(userId).populate('wishlist');
//         res.status(200).json(updatedUser.wishlist);
//     } catch (err) { res.status(500).json({ error: err.message }); }
// });

// app.get('/api/user/wishlist/:userId', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId).populate('wishlist');
//         res.status(200).json(user ? user.wishlist : []);
//     } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // --- FOOD ROUTES ---
// app.post('/api/food/add', async (req, res) => {
//     try { const newFood = new Food(req.body); await newFood.save(); res.status(201).json(newFood); } 
//     catch (err) { res.status(500).json({ error: err.message }); }
// });

// app.get('/api/food/all', async (req, res) => {
//     const foods = await Food.find();
//     res.status(200).json(foods);
// });

// app.get('/api/food/category/:cat', async (req, res) => {
//     try {
//         const foods = await Food.find({ category: req.params.cat });
//         res.json(foods);
//     } catch (err) { res.status(500).json(err); }
// });

// app.delete('/api/food/delete/:id', async (req, res) => {
//     await Food.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Deleted" });
// });

// app.put('/api/food/update/:id', async (req, res) => {
//     const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updated);
// });

// // --- ORDER ROUTES ---

// // 1. PLACE ORDER
// app.post('/api/orders/place', async (req, res) => {
//     try {
//         const { customerName, customerEmail, phone, address, items, totalAmount } = req.body;
//         const emailToSave = (customerEmail || req.body.email || "guest@smartbite.com").toLowerCase();

//         const newOrder = new Order({
//             customerName: customerName || "Guest",
//             customerEmail: emailToSave,
//             phone, address, items, totalAmount,
//             status: 'Accepted'
//         });

//         const savedOrder = await newOrder.save();
//         console.log("Order Saved Successfully! ID:", savedOrder._id);
//         return res.status(201).json(savedOrder); 
//     } catch (err) {
//         console.error("Order Save Error:", err.message);
//         return res.status(500).json({ error: err.message });
//     }
// });

// // 2. GET ALL ORDERS (FOR ADMIN PANEL)
// app.get('/api/orders/all', async (req, res) => {
//     try {
//         const orders = await Order.find().sort({ createdAt: -1 });
//         res.status(200).json(orders);
//     } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // 3. GET STATS (FOR COMMAND CENTER)
// app.get('/api/orders/stats', async (req, res) => {
//     try {
//         const orders = await Order.find();
//         const totalSales = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
//         const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Rejected').length;
//         res.status(200).json({ totalSales, activeOrders, totalOrders: orders.length });
//     } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // 4. GET SINGLE ORDER (FOR TRACKING)
// app.get('/api/orders/:id', async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);
//         if (!order) return res.status(404).json({ message: "Order not found" });
//         res.json(order);
//     } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // 5. UPDATE STATUS (ADMIN TO USER)
// app.patch('/api/orders/update/:id', async (req, res) => {
//     try {
//         const updated = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
//         if (!updated) return res.status(404).json({ message: "Order not found" });
//         io.to(req.params.id).emit('statusUpdate', updated.status);
//         res.status(200).json(updated);
//     } catch (err) { res.status(500).json({ error: err.message }); }
// });

// // 6. USER ORDER HISTORY
// app.get('/api/orders/user/:email', async (req, res) => {
//     try {
//         const userEmail = req.params.email.toLowerCase();
//         const orders = await Order.find({ customerEmail: userEmail }).sort({ createdAt: -1 });
//         res.status(200).json(orders);
//     } catch (err) { res.status(500).json({ error: err.message }); }
// });

// const PORT = 5000;
// server.listen(PORT, () => console.log(`SmartBite Live Server started on http://localhost:${PORT} 🚀`));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const Razorpay = require('razorpay'); // 👈 Razorpay Import
require('dotenv').config();

// --- SOCKET.IO IMPORTS ---
const http = require('http'); 
const { Server } = require('socket.io');

const Food = require('./models/Food');
const Order = require('./models/Order');
const User = require('./models/User'); 

const app = express(); 
const server = http.createServer(app); 

const PORT = process.env.PORT || 5000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const MONGODB_URI = process.env.MONGODB_URI || (IS_PRODUCTION ? '' : 'mongodb://localhost:27017/smartbite');
const JWT_SECRET = process.env.JWT_SECRET || 'SmartBite_Secret_Key_2026';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

// 1. FIXED CORS
app.use(cors({
    origin: [CLIENT_URL, 'http://localhost:5173'],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use(express.json());

// 2. SOCKET.IO SETUP
const io = new Server(server, {
    cors: {
        origin: [CLIENT_URL, 'http://localhost:5173'],
        methods: ["GET", "POST", "PATCH"],
        credentials: true
    }
});

const connectDatabase = async () => {
    if (!MONGODB_URI) {
        console.error('MONGODB_URI is required in production. Add it in Render environment variables.');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("SmartBite DB Connected! 📦");
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        if (IS_PRODUCTION) {
            process.exit(1);
        }
    }
};

connectDatabase();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'SmartBite API is running', health: '/api/health' });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ ok: true });
});

// --- RAZORPAY ROUTE (NEW) ---
app.post('/api/payment/create-order', async (req, res) => {
    try {
        if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
            return res.status(500).json({ error: 'Razorpay keys are not configured on the server.' });
        }

        const razorpay = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100, // Amount in paise (₹1 = 100 paise)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (err) {
        console.error("Razorpay Order Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// SOCKET LOGIC
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('joinOrder', (orderId) => {
    socket.join(orderId);
    console.log(`User joined order room: ${orderId}`);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// --- AUTH ROUTES ---
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: 'user' });
        await newUser.save();
        res.status(201).json({ message: "User created!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found!" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ 
            token, 
            user: { id: user._id, name: user.name, email: user.email, role: user.role } 
        });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- WISHLIST ROUTES ---
app.post('/api/user/wishlist/toggle', async (req, res) => {
    const { userId, foodId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        const isExist = user.wishlist.includes(foodId);
        if (isExist) { user.wishlist = user.wishlist.filter(id => id.toString() !== foodId); } 
        else { user.wishlist.push(foodId); }
        await user.save();
        const updatedUser = await User.findById(userId).populate('wishlist');
        res.status(200).json(updatedUser.wishlist);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/user/wishlist/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('wishlist');
        res.status(200).json(user ? user.wishlist : []);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- FOOD ROUTES ---

app.post('/api/food/add', async (req, res) => {
    try { const newFood = new Food(req.body); await newFood.save(); res.status(201).json(newFood); } 
    catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/food/all', async (req, res) => {
    const foods = await Food.find();
    res.status(200).json(foods);
});

app.get('/api/food/category/:cat', async (req, res) => {
    try {
        const foods = await Food.find({ category: req.params.cat });
        res.json(foods);
    } catch (err) { res.status(500).json(err); }
});

app.delete('/api/food/delete/:id', async (req, res) => {
    await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
});

app.put('/api/food/update/:id', async (req, res) => {
    const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
});

// --- ORDER ROUTES ---

// 1. PLACE ORDER
app.post('/api/orders/place', async (req, res) => {
    try {
        const { customerName, customerEmail, phone, address, items, totalAmount } = req.body;
        const emailToSave = (customerEmail || req.body.email || "guest@smartbite.com").toLowerCase();

        const newOrder = new Order({
            customerName: customerName || "Guest",
            customerEmail: emailToSave,
            phone, address, items, totalAmount,
            status: 'Accepted'
        });

        const savedOrder = await newOrder.save();
        console.log("Order Saved Successfully! ID:", savedOrder._id);
        return res.status(201).json(savedOrder); 
    } catch (err) {
        console.error("Order Save Error:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// 2. GET ALL ORDERS
app.get('/api/orders/all', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 3. GET STATS
app.get('/api/orders/stats', async (req, res) => {
    try {
        const orders = await Order.find();
        const totalSales = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Rejected').length;
        res.status(200).json({ totalSales, activeOrders, totalOrders: orders.length });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 4. GET SINGLE ORDER
app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 5. UPDATE STATUS
app.patch('/api/orders/update/:id', async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!updated) return res.status(404).json({ message: "Order not found" });
        io.to(req.params.id).emit('statusUpdate', updated.status);
        res.status(200).json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 6. USER ORDER HISTORY
app.get('/api/orders/user/:email', async (req, res) => {
    try {
        const userEmail = req.params.email.toLowerCase();
        const orders = await Order.find({ customerEmail: userEmail }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

server.listen(PORT, () => console.log(`SmartBite Live Server started on port ${PORT} 🚀`));