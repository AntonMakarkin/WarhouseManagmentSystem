const express = require('express');
const Category = require('../models/catalog/categories');
const Admin = require('../models/users/admin');
const Manager = require('../models/users/manager');
const StoreKeeper = require('../models/users/storeKeeper');
const auth = require('../middleware/auth');
const catalogControllers = require('../controllers/catalog')
const addInCatalog = catalogControllers.addInCatalog;
const getFromCatalog = catalogControllers.getFromCatalog;
const deleteAllFromCatalog = catalogControllers.deleteAllFromCatalog;

const router = express.Router();

//routes
router.post('/categories', auth([Admin, Manager, StoreKeeper]), addInCatalog(Category));
router.get('/categories', getFromCatalog(Category, 'Категории'));
router.delete('/categories', auth([Admin]), deleteAllFromCatalog(Category, 'Категории'));

module.exports = router;