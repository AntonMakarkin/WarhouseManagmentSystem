const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const tokenAdminSchema = new Schema({ 
    user: {type: Schema.Types.ObjectId, ref: 'Admin'},
    refreshToken: {type: String, required: true}
});

tokenAdminSchema.statics.generateTokens = async function (payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '10m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '20d'});

    return {
        accessToken,
        refreshToken
    }
};

tokenAdminSchema.statics.saveRefreshToken = async function (userId, refreshToken) {
    const tokenData = await tokenAdmin.findOne({ user: userId });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }

    const token = await tokenAdmin.create({ user: userId, refreshToken });

    return token;
};

tokenAdminSchema.statics.removeRefreshToken = async function (refreshToken) {
    const tokenData = await tokenAdmin.deleteOne({ refreshToken });
    return tokenData;
}

tokenAdminSchema.statics.findRefreshToken = async function (refreshToken) {
    const tokenData = await tokenAdmin.findOne({ refreshToken });
    return tokenData;
}

const tokenAdmin = model('tokenAdmin', tokenAdminSchema);

module.exports = tokenAdmin;