const express = require('express');
const Admin = require('../models/admin');
const adminAuth = require('../middleware/adminAuth');
const courierAuth = require('../middleware/courierAuth')
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
router.post('/admin', async (req, res) => {
    const { name, email, password, phone, role, position } = req.body; 

    const user = new Admin({ name, email, password, phone, role, position });

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/admin/login', async (req, res) => {
    try {
        const user = await Admin.findByCredentials(req.body.email, req.body.password); //function is defined in user.js (schema)
        const token = await user.generateAuthToken();
        res.cookie('jwt', token);
        res.send({ user, token });
    } catch (e) {
        res.status(400).send('Неверный логин или пароль');
    }
});

router.post('/admin/logout', adminAuth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token; //to remove token which we used for authentication
        })
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/admin/logoutAll', adminAuth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/admin/me', adminAuth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/admin/me', adminAuth, async (req, res) => {
    const updates = Object.keys(req.body); //return array of properties
    const allowedUpdates = ['name', 'email', 'password', 'phone', 'position'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Невозможно обновить данные парметры учетной записи!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]); //updating the user
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/admin/me/avatar', adminAuth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
})

module.exports = router;