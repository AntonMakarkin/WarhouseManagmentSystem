import express from 'express';
import Courier from '../models/courier';
import adminAuth from '../middleware/adminAuth';
import courierAuth from '../middleware/courierAuth';
import multer from 'multer';
import sharp from 'sharp';

const router = new express.Router();

//user routes
router.post('/couriers', adminAuth, async (req, res) => {
    const courier = new Courier(req.body);

    try {
        await courier.save();
        res.status(201).send(courier);
    } catch (e) {
        res.status(400).send('Пожалуйста авторизуйтесь');
    }
});

router.post('/couriers/login', async (req, res) => {
    try {
        const courier = await Courier.findByCredentials(req.body.email, req.body.password); //function is defined in schema
        const token = await courier.generateAuthToken();
        res.cookie('jwt', token);
        res.send({ courier, token });
    } catch (e) {
        res.status(400).send('Wrong email or password')
    }
});

router.post('/couriers/logout', courierAuth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token //to remove current token           
        })
        await req.user.save();
    } catch (e) {
        res.status(500).send();     
    }
});