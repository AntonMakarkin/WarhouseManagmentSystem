const express = require('express');
const Admin = require('../models/users/admin');
const tokenAdmin = require('../models/tokens/token');
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
router.post('/admin', async (req, res) => {
    const { name, email, password, phone, position } = req.body;
    const role = 'admin' 

    const user = new Admin({ name, email, password, phone, role, position });

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/admin/login', async (req, res) => {
    try {
        const user = await Admin.findByCredentials(req.body.email, req.body.password); //function is defined in user.js (schema)
        const tokens = await tokenAdmin.generateTokens({ _id: user._id.toString() });
        const refreshToken = await tokenAdmin.saveRefreshToken(user._id, tokens.refreshToken);
        const accessToken = tokens.accessToken;
        res.cookie('refreshToken', refreshToken);
        res.send({ user, accessToken, refreshToken });
        /*const token = await user.generateAuthToken();
        res.cookie('jwt', token);
        res.send({ user, token });*/
    } catch (e) {
        res.status(400).send('Неверный логин или пароль');
    }
});

router.post('/admin/logout', auth([Admin]), async (req, res) => {
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

router.post('/admin/logoutAll', auth([Admin]), async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/admin/me', auth([Admin]), async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/admin/me', auth([Admin]), async (req, res) => {
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

router.post('/admin/me/avatar', auth([Admin]), upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/admin/me/avatar', auth(Admin), async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/admin/:id/avatar', async (req, res) => {
    try {
        const user = await Admin.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
})

module.exports = router;