// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//     customerName: { type: String, required: true },
//     customerEmail: { type: String, required: true }, // <--- YE ZARURI HAI
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     items: Array,
//     totalAmount: Number,
//     status: { 
//         type: String, 
//         default: 'Pending', 
//         enum: ['Pending', 'Accepted', 'Cooking', 'Out for Delivery', 'Delivered', 'Rejected'] 
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', OrderSchema);


const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String }, // <--- required hata diya taaki agar miss ho toh fail na ho
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        default: 'Pending',
        enum: ['Pending', 'Accepted', 'Cooking', 'Out for Delivery', 'Delivered', 'Rejected']
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);