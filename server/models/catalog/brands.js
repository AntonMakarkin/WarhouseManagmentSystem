const { Schema, model } = require('mongoose');

const brandSchema = new Schema({
    name: { type: String, unique: true , required: true, lowercase: true }
});

const Brand = model('Brand', brandSchema);

module.exports = Brand;