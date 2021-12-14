const express = require('express');
const Brand = require('../models/catalog/brands');
const Admin = require('../models/users/admin');
const Manager = require('../models/users/manager');
const StoreKeeper = require('../models/users/storeKeeper');
const auth = require('../middleware/auth');

const catalogControllers = require('../controllers/catalog');
const { addInCatalog, getFromCatalog, deleteAllFromCatalog, searchItemsFromCatalog,
        searchItemById, updateItemFromCatalogById: updateItemById, deleteItemById } = catalogControllers;

const router = express.Router();

//routes
router.post('/brands', auth([Admin, Manager, StoreKeeper]), addInCatalog(Brand));
router.get('/brands', getFromCatalog(Brand, 'Бренды'));
router.delete('/brands', auth([Admin]), deleteAllFromCatalog(Brand, 'Бренды'));

router.get('/brands/search', searchItemsFromCatalog(Brand));

router.get('/brands/:id', searchItemById(Brand, 'Бренд'));
router.patch('/brands/:id', auth([Admin, Manager, StoreKeeper]), updateItemById(Brand, 'Бренд'));
router.delete('/brands/:id', auth([Admin, Manager, StoreKeeper]), deleteItemById(Brand, 'Бренд'));

module.exports = router;