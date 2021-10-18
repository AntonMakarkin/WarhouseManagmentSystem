const express = require('express');
const Courier = require('../models/courier');
const Admin = require('../models/admin');
const adminAuth = require('../middleware/adminAuth');
const courierAuth = require('../middleware/courierAuth');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

const router = new express.Router();

//user routes
router.post('/couriers', adminAuth, async (req, res) => {
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

router.get('/couriers/:id', auth([Admin, Courier]), async (req, res) => {
    try {
        const user = await Courier.findById(req.params.id);

        if (!user) {
            throw new Error('Пользователь с данным id не найден!')
        }

        res.send(user)
    } catch (e) {
        res.status(404).send();
    }
})


module.exports = router;