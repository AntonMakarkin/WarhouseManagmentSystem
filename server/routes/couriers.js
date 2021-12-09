const express = require('express');
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
const getUserById = courierControllers.getUserById;
const updateUserById = courierControllers.updateUserById;
const deleteUserById = courierControllers.deleteUserById;
const postAvatar = courierControllers.postAvatar;
const postAvatarById = courierControllers.postAvatarById;
const deleteAvatar = courierControllers.deleteAvatar;
const deleteAvatarById = courierControllers.deleteAvatarById;

const upload = require('../service/upload'); //function for preparing avatar before uploading

const router = new express.Router();

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
router.post('/couriers/:id/avatar', auth([Admin]), upload.single('avatar'), postAvatarById(Courier));
router.delete('/couriers/:id/avatar', auth([Admin]), deleteAvatarById(Courier));

router.get('/couriers/:id', auth([Admin, StoreKeeper]), getUserById(Courier));
router.patch('/couriers/:id', auth([Admin, StoreKeeper]), updateUserById(Courier, allowedUpdates));
router.delete('/couriers/:id', auth([Admin]), deleteUserById(Courier));

module.exports = router