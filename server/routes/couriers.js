const express = require('express');
const mongoose = require('mongoose');
const Courier = require('../models/users/courier');
const Admin = require('../models/users/admin');
const StoreKeeper = require('../models/users/storeKeeper');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

const router = new express.Router();

//user routes
router.post('/couriers', auth([Admin]), async (req, res) => {
    const courier = new Courier(req.body);

    try {
        await courier.save();
        res.status(201).send(courier);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/couriers/login', async (req, res) => {
    try {
        const courier = await Courier.findByCredentials(req.body.email, req.body.password); //function is defined in schema
        const token = await courier.generateAuthToken();
        res.cookie('jwt', token);
        res.send({ courier, token });
    } catch (e) {
        res.status(400).send('Неверный логин или пароль')
    }
});

router.post('/couriers/logout', auth([Courier]), async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token //to remove current token           
        })
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();     
    }
});

router.post('/couriers/logoutAll', auth([Courier]), async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send(e);
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
    try {
        const user = await Courier.findById(req.params.id);

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
        return res.status(400).send({ error: 'Неккоректный id' })
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
        return res.status(400).send({ error: 'Неккоректный id' })
    }

    try {
        const user = await Courier.findById(id);

        if (!user) {
            throw new Error('Пользователь не не найден!');
        }

        await Courier.deleteOne(user);
        res.status(200).send({ message: 'Пользователь успешно удален' })
    } catch(e) {
        res.status(404).send({ error: 'Пользователь не не найден!' })
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
        res.status(404).send(e);
    }
});


module.exports = router;