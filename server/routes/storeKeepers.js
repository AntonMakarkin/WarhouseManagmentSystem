const express = require('express');
const StoreKeeper = require('../models/users/storeKeeper');
const Admin = require('../models/users/admin');
const tokenStoreKeeper = require('../models/tokens/storeKeeperToken');
const auth = require('../middleware/auth');

const storeKeeperControllers = require('../controllers/users');
const { createUser: createStoreKeeper, login, logout, getAccountInfo, updateAccountInfo, 
        getListOfUsers, getUserById, searchAccount, updateUserById, deleteUserById, 
        postAvatar, postAvatarById, deleteAvatar, deleteAvatarById } = storeKeeperControllers;

const upload = require('../service/upload');
const router = new express.Router();

//list of allowedUpdates
const allowedUpdates = ['name', 'email', 'password', 'phone'];

//user routes
router.post('/storekeepers', auth([Admin]), createStoreKeeper(StoreKeeper, 'storekeeper'));
router.get('/storekeepers', auth([Admin]), getListOfUsers(StoreKeeper));

router.get('/storekeepers/search', auth([Admin]), searchAccount(StoreKeeper));

router.post('/storekeepers/login', login(StoreKeeper, tokenStoreKeeper));
router.post('/storekeepers/logout', auth([StoreKeeper]), logout(tokenStoreKeeper));

router.get('/storekeepers/me', auth([StoreKeeper]), getAccountInfo());
router.patch('/storekeepers/me', auth([StoreKeeper]), updateAccountInfo(allowedUpdates));
router.post('/storekeepers/me/avatar', auth([StoreKeeper]), upload.single('avatar'), postAvatar());
router.delete('/storekeepers/me/avatar', auth([StoreKeeper]), deleteAvatar());
router.post('/storekeepers/:id/avatar', auth([Admin]), upload.single('avatar'), postAvatarById(StoreKeeper));
router.delete('/storekeepers/:id/avatar', auth([Admin]), deleteAvatarById(StoreKeeper));

router.get('/storekeepers/:id', auth([Admin, StoreKeeper]), getUserById(StoreKeeper));
router.patch('/storekeepers/:id', auth([Admin, StoreKeeper]), updateUserById(StoreKeeper, allowedUpdates));
router.delete('/storekeepers/:id', auth([Admin]), deleteUserById(StoreKeeper));

module.exports = router;