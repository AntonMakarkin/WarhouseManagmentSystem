const express = require('express');
const mongoose = require('mongoose');
const Admin = require('../models/users/admin');
const tokenAdmin = require('../models/tokens/adminToken');
const auth = require('../middleware/auth');

const adminControllers = require('../controllers/users');
const login = adminControllers.login;
const logout = adminControllers.logout;
const getAccountInfo = adminControllers.getAccountInfo;
const updateAccountInfo = adminControllers.updateAccountInfo;
const deleteAccountAvatar = adminControllers.deleteAccountAvatar;

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

//list of allowed updates
const allowedUpdates = ['name', 'email', 'password', 'phone', 'position'];

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

router.post('/admin/login', login(Admin, tokenAdmin));
router.post('/admin/logout', auth([Admin]), logout(tokenAdmin));
router.get('/admin/me', auth([Admin]), getAccountInfo());
router.patch('/admin/me', auth([Admin]), updateAccountInfo(allowedUpdates));

router.post('/admin/me/avatar', auth([Admin]), upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/admin/me/avatar', auth([Admin]), deleteAccountAvatar());


/*router.get('/admin/:id/avatar', async (req, res) => {
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
})*/

module.exports = router;