const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: { type: String, unique: true, required: true }
});

const Category = model('Category', categorySchema);

module.exports = Category;