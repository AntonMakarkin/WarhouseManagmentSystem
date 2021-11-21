const express = require('express');
const mongoose = require('mongoose');
const Customer = require('../models/users/customer');
const Admin = require('../models/users/admin');
const Manager = require('../models/users/manager');
const StoreKeeper = require('../models/users/storeKeeper');
const tokenCustomer = require('../models/tokens/customerToken');
const auth = require('../middleware/auth');

const customerControllers = require('../controllers/users');
const login = customerControllers.login;
const logout = customerControllers.logout;
const getListOfUsers = customerControllers.getListOfUsers;
const getAccountInfo = customerControllers.getAccountInfo;
const updateAccountInfo = customerControllers.updateAccountInfo;
const postAvatar = customerControllers.postAvatar;

const upload = require('../service/upload'); //function for preparing avatar before uploading

const router = express.Router();

//list of allowedUpdates
const allowedUpdates = ['name', 'email', 'password', 'phone'];

//users routes
router.post('/customers', async (req, res) => {
    const { name, email, password, phone } = req.body;
    const role = 'customer'; 

    const user = new Customer({ name, email, password, phone, role });

    try {
        await user.save();
        res.status(201).json(user);
    } catch (e) {
        res.status(400).json({ error: 'Пользователь с данным email или телефоном уже существует' });
    }
});
router.get('/customers', auth([Admin, Manager, StoreKeeper]), getListOfUsers(Customer));


router.post('/customers/login', login(Customer, tokenCustomer));
router.post('/customers/logout', auth([Customer]), logout(tokenCustomer));

router.get('/customers/me', auth([Customer]), getAccountInfo());
router.patch('/customers/me', auth([Customer]), updateAccountInfo(allowedUpdates));
router.post('/customers/me/avatar', auth([Customer]), upload.single('avatar'), postAvatar());

module.exports = router;