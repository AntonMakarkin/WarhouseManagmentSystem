const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const tokenManagerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Manager' },
    refreshToken: { type: String, required: true }
});

tokenManagerSchema.statics.generateTokens = async function (payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '20m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

    return {
        accessToken,
        refreshToken
    }
};

tokenManagerSchema.statics.saveRefreshToken = async function (userId, refreshToken) {
    const tokenData = await tokenManager.findOne({ user: userId });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }

    const token = await tokenManager.create({ user: userId, refreshToken });

    return token;
};

tokenManagerSchema.statics.removeRefreshToken = async function (refreshToken) {
    const tokenData = await tokenManager.deleteOne({ refreshToken });
    return tokenData;
};

tokenManagerSchema.statics.findRefreshToken = async function (refreshToken) {
    const tokenData = await tokenManager.findOne({ refreshToken });
    return tokenData;
}

const tokenManager = model('TokenManager', tokenManagerSchema);

module.exports = tokenManager;