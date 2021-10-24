const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const tokenAdminSchema = new Schema({ 
    user: {type: Schema.Types.ObjectId, ref: 'Admin'},
    refreshTokens: [{
        token: {type: String}
    }]
});

tokenAdminSchema.statics.generateTokens = async function (payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30d'});

    return {
        accessToken,
        refreshToken
    }
};

tokenAdminSchema.statics.saveRefreshToken = async function (userId, refreshToken) {
    const tokenData = await tokenAdmin.findOne({ user: userId });

    if (tokenData) {
        tokenData.refreshTokens = tokenData.refreshTokens.concat({ refreshToken });
        await tokenData.save();
        return refreshToken
    }

    const token = await tokenAdmin.create({ user: userId, 'refreshTokens.token': refreshToken });

    return token;
 
};

const tokenAdmin = model('TokenAdmin', tokenAdminSchema);

module.exports = tokenAdmin;