const express = require('express');
const Admin = require('../../models/users/admin');
const Manager = require('../../models/users/manager');
const StoreKeeper = require('../../models/users/storeKeeper');
const Customer = require('../../models/users/customer');
const Courier = require('../../models/users/courier');
const auth = require('../../middleware/auth');

const goodsControllers = require('../../controllers/goods');
const { addInGoods, getGoods, updateGoodsById } = goodsControllers;

const router = express.Router();

//routes
router.post('/goods', auth([Admin, Manager, StoreKeeper]), addInGoods());
router.get('/goods', auth([Admin, Manager, StoreKeeper, Customer, Courier]), getGoods());

router.get('/goods/:id');
router.patch('/goods/:id', auth([Admin, Manager, StoreKeeper]), updateGoodsById('Товар'));

module.exports = router;
