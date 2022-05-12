const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const tokenStoreKeeperSchema = new Schema({ 
    user: {type: Schema.Types.ObjectId, ref: 'StoreKeeper'},
    refreshToken: {type: String, required: true}
});

tokenStoreKeeperSchema.statics.generateTokens = async function (payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '10h'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30h'});

    return {
        accessToken,
        refreshToken
    }
};

tokenStoreKeeperSchema.statics.saveRefreshToken = async function (userId, refreshToken) {
    const tokenData = await tokenStoreKeeper.findOne({ user: userId });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }

    const token = await tokenStoreKeeper.create({ user: userId, refreshToken });

    return token;
};

tokenStoreKeeperSchema.statics.removeRefreshToken = async function (refreshToken) {
    const tokenData = await tokenStoreKeeper.deleteOne({ refreshToken });
    return tokenData;
};

tokenStoreKeeperSchema.statics.findRefreshToken = async function (refreshToken) {
    const tokenData = await tokenStoreKeeper.findOne({ refreshToken });
    return tokenData;
};

const tokenStoreKeeper = model('tokenStoreKeeper', tokenStoreKeeperSchema);

module.exports = tokenStoreKeeper;