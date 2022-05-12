const { Schema, model } = require('mongoose');
const validator = require('validator');

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Customer' },

    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Неккоректный email');
            }
        }
    },
    phone: { 
        type: String, 
        required: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Неккоректный номер телефона');
            }
        }
    },
    goods: { type: Array, required: true },
    total: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'В_обработке' },
    courier: { type: Object } 
}, {
    timestamps: true
});

orderSchema.methods.toJSON = function () {
    const order = this;
    const orderObject = order.toObject();

    return orderObject;
}


const Order = model('Order', orderSchema);

module.exports = Order;