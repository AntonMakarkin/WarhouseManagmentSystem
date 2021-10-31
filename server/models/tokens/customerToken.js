const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const tokenCustomerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Customer'},
    refreshToken: { type: String, required: true }
});

tokenCustomerSchema.statics.generateTokens = async function (payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '20m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

    return {
        accessToken,
        refreshToken
    }
};

tokenCustomerSchema.statics.saveRefreshToken = async function (userId, refreshToken) {
    const tokenData = await tokenCustomer.findOne({ user: userId });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }

    const token = await tokenCustomer.create({ user: userId, refreshToken });

    return token;
};

tokenCustomerSchema.statics.removeRefreshToken = async function (refreshToken) {
    const tokenData = await tokenCustomer.deleteOne({ refreshToken });
    return tokenData;
};

tokenCustomerSchema.statics.findRefreshToken = async function (refreshToken) {
    const tokenData = await tokenCustomer.findOne({ refreshToken });
    return tokenData;
}

const tokenCustomer = model('tokenCustomer', tokenCustomerSchema);

module.exports = tokenCustomer;