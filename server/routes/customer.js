const express = require('express');
const mongoose = require('mongoose');
const Customer = require('../models/users/customer');
const tokenCustomer = require('../models/tokens/customerToken');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');


const router = express.Router();

//function for preparing avatar before uploading
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Пожалуйста, загрузите картинку'));
        }

        cb(undefined, true); //to accept the file
    }
});

//users routes
router.post('/customers', async (req, res) => {
    const { name, email, password, phone } = req.body;
    const role = 'customer'; 

    const user = new Customer({ name, email, password, phone, role });

    try {
        await user.save();
        res.status(201).json(user);
    } catch (e) {
        res.status(400).json({ error: 'Пользователь с данным email или телефоном уже существует' });
    }
});

router.post('/customers/login', async (req, res) => {
    const cookieLife = 2592000000;

    try {
        const user = await Customer.findByCredentials(req.body.email, req.body.password); //function is defined in user.js (schema)
        const payload = { _id: user._id.toString(), email: user.email };
        const tokens = await tokenCustomer.generateTokens(payload);
        const refreshToken = tokens.refreshToken;

        await tokenCustomer.saveRefreshToken(user._id, refreshToken);

        const accessToken = tokens.accessToken;

        res.cookie('refreshToken', refreshToken, { maxAge: cookieLife, httpOnly: true });
        res.status(200).json({ user, accessToken, refreshToken });
    } catch (e) {
        res.status(400).json({ error: "Неверный логин или пароль" });
    }
});

module.exports = router;