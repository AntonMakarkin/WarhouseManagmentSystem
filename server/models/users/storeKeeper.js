const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const storeKeeperSchema = new mongoose.Schema({
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
        unique: true,
        required: true,
        minlength: 11,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, ['ru-RU'])) {
                throw new Error('Неккоректный номер телефона');
            }
        }
    },
    role: {
        type: String,
        default: 'Кладовщик'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

storeKeeperSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

storeKeeperSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

storeKeeperSchema.statics.findByCredentials = async (email, password) => {
    const user = await StoreKeeper.findOne({ email });

    if (!user) {
        throw new Error('Неверный логин или пароль');
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Неверный логин или пароль');
    };

    return user;
};

// Hash the plain text password before saving
storeKeeperSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next() //middleware function is finished
})

const StoreKeeper = mongoose.model('StoreKeeper', storeKeeperSchema);

module.exports = StoreKeeper;