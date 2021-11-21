const express = require('express');
const Courier = require('../models/users/courier');
const Admin = require('../models/users/admin');
const tokenCourier = require('../models/tokens/courierToken');
const tokenAdmin = require('../models/tokens/adminToken');
const refreshToken = require('../controllers/token');

const router = express.Router();

router.get('/couriers/refresh', refreshToken(Courier, tokenCourier));
router.get('/admin/refresh', refreshToken(Admin, tokenAdmin));

module.exports = router;