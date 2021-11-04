const express = require('express');
const Admin = require('../models/users/admin');
const tokenAdmin = require('../models/tokens/adminToken');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/admin/refresh', async (req, res) => {
    const cookieLife = 2592000000;
    
    try {
        let { refreshToken } = req.cookies;

        if (!refreshToken) {
            throw new Error('Отсутcтвует refreshToken');
        }

        const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const tokenFromDb = await tokenAdmin.findRefreshToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw new Error('Невалидный refreshToken');
        }

        const user = await Admin.findOne({ _id: userData._id, email: userData.email });
        const payload = { _id: user._id.toString(), email: user.email };
        const tokens = await tokenAdmin.generateTokens(payload);

        await tokenAdmin.saveRefreshToken(user._id, tokens.refreshToken);

        const accessToken = tokens.accessToken;
              refreshToken = tokens.refreshToken;

        res.cookie('refreshToken', refreshToken, { maxAge: cookieLife, httpOnly: true });
        res.send({ user, accessToken, refreshToken });
    } catch (e) {
        res.status(401).send({ error: 'Пожалуйста авторизуйтесь' })
    }
});

module.exports = router;