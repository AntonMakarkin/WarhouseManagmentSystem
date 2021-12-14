const express = require('express');
const Courier = require('../models/users/courier');
const Admin = require('../models/users/admin');
const Manager = require('../models/users/manager');
const Customer = require('../models/users/customer');
const tokenCourier = require('../models/tokens/courierToken');
const tokenAdmin = require('../models/tokens/adminToken');
const tokenManager = require('../models/tokens/managerToken');
const tokenCustomer = require('../models/tokens/customerToken');
const refreshToken = require('../controllers/token');

const router = express.Router();

router.get('/couriers/refresh', refreshToken(Courier, tokenCourier));
router.get('/admin/refresh', refreshToken(Admin, tokenAdmin));
router.get('/managers/refresh', refreshToken(Manager, tokenManager));
router.get('/customers/refresh', refreshToken(Customer, tokenCustomer));

module.exports = router;