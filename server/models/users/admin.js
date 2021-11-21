const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email некорректен');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password') || 
                value.toLowerCase().includes('пароль')) 
            {
                throw new Error('Пароль не может содержать слово "пароль"');
            }
        }
    },
    phone: {
        type: String,
        default: '84992027450',
        unique: true,
        minlength: 11,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Неккоректный номер телефона');
            }
        }
    },
    role: {
        type: String,
        trim: true,
        minlength: 5,
        defailt: 'admin'
    },
    position: {
        type: String,
        trim: true,
        default: ''
    },
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

adminSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    //delete userObject.avatar;

    return userObject;
};

adminSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

adminSchema.statics.findByCredentials = async (email, password) => {
    const user = await Admin.findOne({ email });

    if (!user) {
        throw new Error('Пользователь не найден');
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Неверный логин или пароль');
    };

    return user;
};

// Hash the plain text password before saving
adminSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next(); //middleware function is finished
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;