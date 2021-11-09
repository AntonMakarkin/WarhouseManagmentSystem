const express = require('express');
const Category = require('../models/catalog/categories');
const Admin = require('../models/users/admin');
const Manager = require('../models/users/manager');
const StoreKeeper = require('../models/users/storeKeeper');
const auth = require('../middleware/auth');

const router = express.Router();

//routes
router.post('/categories', auth([Admin, Manager, StoreKeeper]), async (req, res) => {
    const { name } = req.body;

    const item = new Category({ name });

    try {
        await item.save();
        res.status(201).json({ item });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/categories', async (req, res) => {
    try {
        const items = await Category.find({});

        if (!items) {
            throw new Error('Информация о категориях отсутcтвует!');
        }

        res.json({ items });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

module.exports = router;