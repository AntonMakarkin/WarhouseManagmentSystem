const { Schema, model } = require('mongoose');

const goodsSchema = new Schema({
    title: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    brand: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    specification: { type: Array },
    category: { type: String, required: true, unique: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true }
}, {
    timestamps: true
});

const Goods = model('Goods', goodsSchema);

module.exports = Goods;