const express = require('express');
const Manager = require('../models/users/manager');
const Admin = require('../models/users/admin');
const tokenManager = require('../models/tokens/managerToken');
const auth = require('../middleware/auth');

const managerControllers = require('../controllers/users');
const { createUser: createManager } = managerControllers;

const router = new express.Router();

//user routes
router.post('/managers', auth([Admin]), createManager(Manager));

module.exports = router;