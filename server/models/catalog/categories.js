const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: { type: String, unique: true, required: true },
    link: { type: String, unique: true, required: true },
    avatar: { type: Buffer }
}, {
    timestamps: true
});

categorySchema.methods.toJSON = function () {
    const item = this;
    const itemObject = item.toObject();

    return itemObject;
}

const Category = model('Category', categorySchema);

module.exports = Category;