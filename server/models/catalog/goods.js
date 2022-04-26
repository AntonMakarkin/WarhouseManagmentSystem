const { Schema, model } = require('mongoose');

const goodsSchema = new Schema({
    name: { type: String, required: true },
    img: { type: Buffer },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    specification: { type: Array },
    category: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true }
}, {
    timestamps: true
});

const Goods = model('Goods', goodsSchema);

module.exports = Goods;