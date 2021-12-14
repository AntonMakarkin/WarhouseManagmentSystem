const express = require('express');
const Category = require('../models/catalog/categories');
const Admin = require('../models/users/admin');
const Manager = require('../models/users/manager');
const StoreKeeper = require('../models/users/storeKeeper');
const auth = require('../middleware/auth');

const catalogControllers = require('../controllers/catalog');
const { addInCatalog, getFromCatalog, deleteAllFromCatalog, searchItemsFromCatalog,
        searchItemById, updateItemFromCatalogById: updateItemById, deleteItemById } = catalogControllers;

const router = express.Router();

//routes
router.post('/categories', auth([Admin, Manager, StoreKeeper]), addInCatalog(Category));
router.get('/categories', getFromCatalog(Category, 'Категории'));
router.delete('/categories', auth([Admin]), deleteAllFromCatalog(Category, 'Категории'));

router.get('/categories/search', searchItemsFromCatalog(Category));

router.get('/categories/:id', searchItemById(Category, 'Категория'));
router.patch('/categories/:id', auth([Admin, Manager, StoreKeeper]), updateItemById(Category, 'Категория'));
router.delete('/categories/:id', auth([Admin, Manager, StoreKeeper]), deleteItemById(Category, 'Категория'));

module.exports = router;