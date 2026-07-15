const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    amount: Number,
    status: { type: String, default: 'PENDING' },
    paymentId: String,
    signature: String
});

module.exports = mongoose.model('Order', orderSchema);