const express = require('express');
const Courier = require('../models/users/courier');
const Admin = require('../models/users/admin');
const tokenCourier = require('../models/tokens/courierToken');
const StoreKeeper = require('../models/users/storeKeeper');
const auth = require('../middleware/auth');

const courierControllers = require('../controllers/users');
const { createUser: createCourier, login, logout, getAccountInfo, updateAccountInfo, 
        getListOfUsers, getListOfNameUsers, getUserById, searchAccount, updateUserById, deleteUserById, 
        postAvatar, postAvatarById, deleteAvatar, deleteAvatarById } = courierControllers;

const upload = require('../service/upload'); //function for preparing avatar before uploading

const router = new express.Router();

//list of allowedUpdates
const allowedUpdates = ['name', 'email', 'password', 'phone'];

//user routes
router.post('/couriers', auth([Admin]), createCourier(Courier, 'courier'));
router.get('/couriers', auth([Admin, StoreKeeper]), getListOfUsers(Courier));

router.get('/couriers/list', auth([Admin, StoreKeeper]), getListOfNameUsers(Courier));

router.get('/couriers/search', auth([Admin, StoreKeeper]), searchAccount(Courier));

router.post('/couriers/login', login(Courier, tokenCourier));
router.post('/couriers/logout', auth([Courier]), logout(tokenCourier));

router.get('/couriers/me', auth([Courier]), getAccountInfo());
router.patch('/couriers/me', auth([Courier]), updateAccountInfo(allowedUpdates));
router.post('/couriers/me/avatar', auth([Courier]), upload.single('avatar'), postAvatar());
router.delete('/couriers/me/avatar', auth([Courier]), deleteAvatar());
router.post('/couriers/:id/avatar', auth([Admin]), upload.single('avatar'), postAvatarById(Courier));
router.delete('/couriers/:id/avatar', auth([Admin]), deleteAvatarById(Courier));

router.get('/couriers/:id', auth([Admin, StoreKeeper]), getUserById(Courier));
router.patch('/couriers/:id', auth([Admin, StoreKeeper]), updateUserById(Courier, allowedUpdates));
router.delete('/couriers/:id', auth([Admin]), deleteUserById(Courier));

module.exports = router