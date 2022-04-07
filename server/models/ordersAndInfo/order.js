const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    userId: { type: String, required: true },
    goods: [
        {
            goodsId: { type: String, required: true },
            quantity: { type: Number, defailt: 1 }
        }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'В обработке' } 
}, {
    timestamps: true
});

const Order = model('Order', orderSchema);

module.exports = Order;