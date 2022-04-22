const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: { type: String, unique: true, required: true },
    link: { type: String, unique: true, required: true },
    img: String
});

const Category = model('Category', categorySchema);

module.exports = Category;