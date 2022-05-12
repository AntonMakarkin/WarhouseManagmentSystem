const { Schema, model } = require('mongoose');

const goodsSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: Buffer },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    specification: { type: Array },
    category: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    quantityOnStorage: { type: Number, default: 1 },
    price: { type: Number, required: true }
}, {
    timestamps: true
});

goodsSchema.methods.toJSON = function () {
    const item = this;
    const itemObject = item.toObject();

    return itemObject
}

const Goods = model('Goods', goodsSchema);

module.exports = Goods;