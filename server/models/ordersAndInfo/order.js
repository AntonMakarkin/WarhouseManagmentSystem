const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    userId: { type: String },

    goods: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'В обработке' } 
}, {
    timestamps: true
});

const Order = model('Order', orderSchema);

module.exports = Order;