const express = require('express');
const Admin = require('../../models/users/admin');
const Manager = require('../../models/users/manager');
const StoreKeeper = require('../../models/users/storeKeeper');
const Customer = require('../../models/users/customer');
const Courier = require('../../models/users/courier');
const auth = require('../../middleware/auth');

const goodsControllers = require('../../controllers/goods');
const { addInGoods, getGoods, getGoodsById, updateGoodsById,
        deleteGoodsById, postGoodsImage } = goodsControllers;

const upload = require('../../service/upload');

const router = express.Router();

//routes
router.post('/goods', auth([Admin, Manager, StoreKeeper]), addInGoods());
router.get('/goods', getGoods());

router.post('/goods/:id/avatar', auth([Admin, Manager, StoreKeeper]), upload.single('avatar'), postGoodsImage())

router.get('/goods/:id', getGoodsById());
router.patch('/goods/:id', auth([Admin, Manager, StoreKeeper]), updateGoodsById('Товар'));
router.delete('/goods/:id', auth([Admin, Manager, StoreKeeper]), deleteGoodsById());

module.exports = router;
