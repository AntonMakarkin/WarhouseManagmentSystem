const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const tokenCourierSchema = new Schema({ 
    user: {type: Schema.Types.ObjectId, ref: 'Courier'},
    refreshToken: {type: String, required: true}
});

tokenCourierSchema.statics.generateTokens = async function (payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

    return {
        accessToken,
        refreshToken
    }
};

tokenCourierSchema.statics.saveRefreshToken = async function (userId, refreshToken) {
    const tokenData = await tokenCourier.findOne({ user: userId });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }

    const token = await tokenCourier.create({ user: userId, refreshToken });

    return token;
};

tokenCourierSchema.statics.removeRefreshToken = async function (refreshToken) {
    const tokenData = await tokenCourier.deleteOne({ refreshToken });
    return tokenData;
};

tokenCourierSchema.statics.findRefreshToken = async function (refreshToken) {
    const tokenData = await tokenCourier.findOne({ refreshToken });
    return tokenData;
}

const tokenCourier = model('tokenCourier', tokenCourierSchema);

module.exports = tokenCourier;