const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    userId: { type: String, required: true },
    goods: [
        {
            goodsId: { type: String, required: true },
            quantity: { type: Number, defailt: 1 }
        }
    ]
}, {
    timestamps: true
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;