const express = require('express');
const mongoose = require('mongoose');
const Customer = require('../models/users/customer');
const Admin = require('../models/users/admin');
const Manager = require('../models/users/manager');
const StoreKeeper = require('../models/users/storeKeeper');
const tokenCustomer = require('../models/tokens/customerToken');
const auth = require('../middleware/auth');

const customerControllers = require('../controllers/users');
const createCustomer = customerControllers.createUser;
const login = customerControllers.login;
const logout = customerControllers.logout;
const getListOfUsers = customerControllers.getListOfUsers;
const getUserById = customerControllers.getUserById;
const searchAccount = customerControllers.searchAccount;
const deleteUserById = customerControllers.deleteUserById;
const getAccountInfo = customerControllers.getAccountInfo;
const updateAccountInfo = customerControllers.updateAccountInfo;
const postAvatar = customerControllers.postAvatar;
const deleteAvatar = customerControllers.deleteAvatar;
const deleteAvatarById = customerControllers.deleteAvatarById;

const upload = require('../service/upload'); //function for preparing avatar before uploading

const router = express.Router();

//list of allowedUpdates
const allowedUpdates = ['name', 'email', 'password', 'phone'];

//users routes
router.post('/customers', createCustomer(Customer, 'customer'));
router.get('/customers', auth([Admin, Manager, StoreKeeper]), getListOfUsers(Customer));

router.get('/customers/search', auth([Admin, Manager, StoreKeeper]), searchAccount(Customer));

router.post('/customers/login', login(Customer, tokenCustomer));
router.post('/customers/logout', auth([Customer]), logout(tokenCustomer));

router.get('/customers/me', auth([Customer]), getAccountInfo());
router.patch('/customers/me', auth([Customer]), updateAccountInfo(allowedUpdates));
router.post('/customers/me/avatar', auth([Customer]), upload.single('avatar'), postAvatar());
router.delete('/customers/me/avatar', auth([Customer]), deleteAvatar());
router.delete('/customers/:id/avatar', auth([Admin]), upload.single('avatar'), deleteAvatarById(Customer));

router.get('/customers/:id', auth([Admin, Manager, StoreKeeper]), getUserById(Customer));
router.delete('/customers/:id', auth([Admin]), deleteUserById(Customer));

module.exports = router;