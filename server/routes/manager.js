const express = require('express');
const Manager = require('../models/users/manager');
const Admin = require('../models/users/admin');
const tokenManager = require('../models/tokens/managerToken');
const auth = require('../middleware/auth');

const managerControllers = require('../controllers/users');
const { createUser: createManager, login, logout, getAccountInfo, updateAccountInfo, 
        getListOfUsers, getUserById, searchAccount, updateUserById, deleteUserById,
        postAvatar, postAvatarById, deleteAvatar, deleteAvatarById } = managerControllers;

const upload = require('../service/upload');
const router = new express.Router();

//list of allowedUpdates
const allowedUpdates = ['name', 'email', 'password', 'phone'];

//user routes
router.post('/managers', auth([Admin]), createManager(Manager, 'manager'));
router.get('/managers', auth([Admin]), getListOfUsers(Manager));

router.get('/managers/search', auth([Admin]), searchAccount(Manager));

router.post('/managers/login', login(Manager, tokenManager));
router.post('/managers/logout', auth([Manager]), logout(tokenManager));

router.get('/managers/me', auth([Manager]), getAccountInfo());
router.patch('/managers/me', auth([Manager]), updateAccountInfo(allowedUpdates));
router.post('/managers/me/avatar', auth([Manager]), upload.single('avatar'), postAvatar());
router.delete('/managers/me/avatar', auth([Manager]), deleteAvatar());
router.post('/managers/:id/avatar', auth([Admin]), upload.single('avatar'), postAvatarById(Manager));
router.delete('/managers/:id/avatar', auth([Admin]), deleteAvatarById(Manager));

router.get('/managers/:id', auth([Admin]), getUserById(Manager));
router.patch('/managers/:id', auth([Admin]), updateUserById(Manager, allowedUpdates));
router.delete('/managers/:id', auth([Admin]), deleteUserById(Manager));

module.exports = router;