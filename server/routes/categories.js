const express = require('express');
const Category = require('../models/catalog/categories');
const Admin = require('../models/users/admin');
const Manager = require('../models/users/manager');
const StoreKeeper = require('../models/users/storeKeeper');
const auth = require('../middleware/auth');

const catalogControllers = require('../controllers/catalog');
const { addCategoryInCatalog, getFromCatalog, deleteAllFromCatalog, searchItemsFromCatalog,
        searchItemById, updateItemFromCatalogById: updateItemById, deleteItemById,
        postItemCatalogImage } = catalogControllers;

const upload = require('../service/upload')

const router = express.Router();

//routes
router.post('/categories', auth([Admin, Manager, StoreKeeper]), addCategoryInCatalog());
router.get('/categories', getFromCatalog(Category, 'Категории'));
router.delete('/categories', auth([Admin]), deleteAllFromCatalog(Category, 'Категории'));

router.get('/categories/search', searchItemsFromCatalog(Category));

router.post('/categories/:id/avatar', auth([Admin, Manager, StoreKeeper]), upload.single('avatar'), postItemCatalogImage(Category))

router.get('/categories/:id', searchItemById(Category, 'Категория'));
router.patch('/categories/:id', auth([Admin, Manager, StoreKeeper]), updateItemById(Category, 'Категория'));
router.delete('/categories/:id', auth([Admin, Manager, StoreKeeper]), deleteItemById(Category, 'Категория'));


module.exports = router;