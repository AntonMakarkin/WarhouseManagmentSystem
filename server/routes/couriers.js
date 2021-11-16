const express = require('express');
const mongoose = require('mongoose');
const Courier = require('../models/users/courier');
const Admin = require('../models/users/admin');
const tokenCourier = require('../models/tokens/courierToken');
const StoreKeeper = require('../models/users/storeKeeper');
const auth = require('../middleware/auth');

const courierControllers = require('../controllers/users');
const createCourier = courierControllers.createUser;
const login = courierControllers.login;
const logout = courierControllers.logout;
const getAccountInfo = courierControllers.getAccountInfo;
const updateAccountInfo = courierControllers.updateAccountInfo;
const getListOfUsers = courierControllers.getListOfUsers;
const postAvatar = courierControllers.postAvatar;
const deleteAvatar = courierControllers.deleteAvatar;

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

//list of allowedUpdates
const allowedUpdates = ['name', 'email', 'password', 'phone'];

//user routes
router.post('/couriers', auth([Admin]), createCourier(Courier));
router.get('/couriers', auth([Admin, StoreKeeper]), getListOfUsers(Courier));

router.post('/couriers/login', login(Courier, tokenCourier));
router.post('/couriers/logout', auth([Courier]), logout(tokenCourier));

router.get('/couriers/me', auth([Courier]), getAccountInfo());
router.patch('/couriers/me', auth([Courier]), updateAccountInfo(allowedUpdates));
router.post('/couriers/me/avatar', auth([Courier]), upload.single('avatar'), postAvatar());
router.delete('/couriers/me/avatar', auth([Courier]), deleteAvatar());
router.post('/couriers/:id/avatar', auth([Admin]), upload.single('avatar'))

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

/*router.post('/couriers/:id/avatar', auth([Admin]), upload.single('avatar'), async (req, res) => {
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
});*/

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

module.exports = router;