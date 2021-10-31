const express = require('express');
const mongoose = require('mongoose');
const Courier = require('../models/users/courier');
const Admin = require('../models/users/admin');
const tokenCourier = require('../models/tokens/courierToken');
const StoreKeeper = require('../models/users/storeKeeper');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

const router = new express.Router();

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

//user routes
router.post('/couriers', auth([Admin]), async (req, res) => {
    const courier = new Courier(req.body);

    try {
        await courier.save();
        res.status(201).json({ courier });
    } catch (e) {
        res.status(400).json({ error: 'Неккоректный запрос' });
    }
});

router.post('/couriers/login', async (req, res) => {
    const cookieLife = 2592000000;

    try {
        const user = await Courier.findByCredentials(req.body.email, req.body.password); //function is defined in schema
        const payload = { _id: user._id.toString(), email: user.email };
        const tokens = await tokenCourier.generateTokens(payload);
        const refreshToken = tokens.refreshToken;

        await tokenCourier.saveRefreshToken(user._id, refreshToken);

        const accessToken = tokens.accessToken;

        res.cookie('refreshToken', refreshToken, { maxAge: cookieLife, httpOnly: true });
        res.status(200).json({ user, accessToken, refreshToken });
    } catch (e) {
        res.status(400).json({ error: 'Неверный логин или пароль' });
    }
});

router.post('/couriers/logout', auth([Courier]), async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        await tokenCourier.removeRefreshToken(refreshToken);

        res.clearCookie('refreshToken');
        res.status(200).json({ result: "Успешный выход" })
    } catch (e) {
        res.status(500).json({ error: e.message });     
    }
});

router.get('/couriers/me', auth([Courier]), async (req, res) => {
    res.send(req.user);
});

router.patch('/couriers/me', auth([Courier]), async (req, res) => {
    const updates = Object.keys(req.body); //return array of properties
    const allowedUpdates = ['name', 'email', 'password', 'phone'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Невозможно обновить данные параметры учетной записи!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]); //updating the user
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/couriers/:id', auth([Admin, StoreKeeper]), async (req, res) => {
    const { id } = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Неккоректный id'});
    }

    try {
        const user = await Courier.findById(id);

        if (!user) {
            throw new Error('Пользователь с данным id не найден!');
        }

        res.send(user);
    } catch (e) {
        res.status(404).send();
    }
});

router.patch('/couriers/:id', auth([Admin, StoreKeeper]), async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Неккоректный id' });
    }

    const user = await Courier.findById(id);

    if (!user) {
        return res.status(400).send({ error: 'Пользователь с данным id не найден!' });
    }

    const updates = Object.keys(req.body); //return array of properties
    const allowedUpdates = ['name', 'email', 'password', 'phone'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Невозможно обновить данные параметры учетной записи!' });
    }

    try {
        updates.forEach((update) => user[update] = req.body[update]); //updating the user
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(404).send({ error: 'Пользователь не не найден!' });
    }
});

router.delete('/couriers/:id', auth([Admin]), async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Неккоректный id' });
    }

    try {
        const user = await Courier.findById(id);

        if (!user) {
            throw new Error('Пользователь не не найден!');
        }

        await Courier.deleteOne(user);
        res.status(200).send({ message: 'Пользователь успешно удален' });
    } catch(e) {
        res.status(404).send({ error: 'Пользователь не найден!' });
    }

});

router.get('/couriers', auth([Admin, StoreKeeper]), async (req, res) => {
    try {
        const users = await Courier.find({});

        if (!users) {
            throw new Error('Пользователи данной группы отсутсвуют!');
        }

        res.send(users);
    } catch (e) {
        res.status(404).send({ error: 'Пользователи данной группы отсутсвуют!'});
    }
});

router.post('/couriers/:id/avatar', auth([Admin]), upload.single('avatar'), async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Неккоректный id' });
    }

    const user = await Courier.findById(id);

    if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден!' });
    }

    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    user.avatar = buffer;
    await user.save();
    res.status(200).json({ message: 'Аватар добавлен' });
}, (error, req, res, next) => {
    res.status(400).json({ error: error.message });
});

router.delete('/couriers/:id/avatar', auth([Admin]), async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Неккоректный id' });
    }

    const user = await Courier.findById(id);

    if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден!' });
    }

    try {
        user.avatar = undefined;
        await user.save();
        res.status(200).json({ message: 'Аватар удален' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/couriers/me/avatar', auth([Courier]), upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.status(200).json({ message: 'Аватар добавлен' });
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/couriers/me/avatar', auth([Courier]), async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.status(200).json({ message: 'Аватар добавлен' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

module.exports = router;