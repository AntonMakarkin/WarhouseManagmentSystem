const express = require('express');
const Courier = require('../models/users/courier');
const tokenCourier = require('../models/tokens/courierToken');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/couriers/refresh', async (req, res) => {
    const cookieLife = 2592000000;
    
    try {
        let { refreshToken } = req.cookies;

        if (!refreshToken) {
            throw new Error('Отсутcтвует refreshToken');
        }

        const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const tokenFromDb = await tokenCourier.findRefreshToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw new Error('Невалидный refreshToken');
        }

        const user = await Courier.findOne({ _id: userData._id, email: userData.email });
        const payload = { _id: user._id.toString(), email: user.email };
        const tokens = await tokenCourier.generateTokens(payload);

        await tokenCourier.saveRefreshToken(user._id, tokens.refreshToken);

        const accessToken = tokens.accessToken;
              refreshToken = tokens.refreshToken;

        res.cookie('refreshToken', refreshToken, { maxAge: cookieLife, httpOnly: true });
        res.json({ user, accessToken, refreshToken });
    } catch (e) {
        res.status(401).json({ error: 'Пожалуйста авторизуйтесь' });
    }
});

module.exports = router;