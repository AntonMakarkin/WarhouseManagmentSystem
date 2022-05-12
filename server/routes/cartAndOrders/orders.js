const express = require('express');
const Admin = require('../../models/users/admin');
const Manager = require('../../models/users/manager');
const StoreKeeper = require('../../models/users/storeKeeper');
const auth = require('../../middleware/auth');

const orderControllers = require('../../controllers/orders');
const { addOrder, getOrders, getOrderById, getOrderByIdForStoreKeepeer, updateOrderById } = orderControllers;

const router = express.Router();

//routes
router.post('/orders', addOrder());
router.get('/orders', auth([Admin, Manager, StoreKeeper]), getOrders());

router.get('/orders/:id/storekeeper', auth([Admin, StoreKeeper]), getOrderByIdForStoreKeepeer())

router.get('/orders/:id', auth([Admin, Manager, StoreKeeper]), getOrderById());
router.patch('/orders/:id', auth([Admin, Manager, StoreKeeper]), updateOrderById());

module.exports = router;