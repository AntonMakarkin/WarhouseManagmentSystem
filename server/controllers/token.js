const jwt = require('jsonwebtoken');

const refreshToken = (model, tokenModel, cookieLife = 2592000000) => {
    return async (req, res) => {
        try {
            let { refreshToken } = req.cookies;

            if (!refreshToken) {
                throw new Error('Отсутcтвует refresh token. Пожалуйста авторизуйтесь');
            }

            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const tokenFromDb = await tokenModel.findRefreshToken(refreshToken);

            if (!userData || !tokenFromDb) {
                throw new Error('Невалидный refresh token. Пожалуйста авторизуйтесь');
            }

            const user = await model.findOne({ _id: userData._id, email: userData.email });
            const payload = { _id: user._id.toString(), email: user.email };
            const tokens = await tokenModel.generateTokens(payload);

            await tokenModel.saveRefreshToken(user._id, tokens.refreshToken);

            const accessToken = tokens.accessToken;
                  refreshToken = tokens.refreshToken;

            res.cookie('refreshToken', refreshToken, { maxAge: cookieLife, httpOnly: true });
            res.json({ user, accessToken, refreshToken });
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
};

module.exports = refreshToken;