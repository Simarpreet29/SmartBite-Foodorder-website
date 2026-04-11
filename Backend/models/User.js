const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }, // 'user' or 'admin'
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);