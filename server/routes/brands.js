const express = require('express');
const Brand = require('../models/catalog/brands');
const Admin = require('../models/users/admin');
const Manager = require('../models/users/manager');
const StoreKeeper = require('../models/users/storeKeeper');
const auth = require('../middleware/auth');

const router = express.Router();

//routes
router.post('/brands', auth([Admin, Manager, StoreKeeper]), async (req, res) => {
    const { name } = req.body;

    const item = new Brand({ name });

    try {
        await item.save();
        res.status(201).json({ item });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/brands', async (req, res) => {
    try {
        const items = await Brand.find({});

        if (!items) {
            throw new Error('Информация о брендах отсутcтвует!');
        }

        res.json({ items });
    } catch (err) {
        res.status(404).json({ error: 'Информация о брендах отсутcтвует!' });
    }
});

router.get('/brands/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Brand.findById(id);

        res.json({ item });
    } catch (err) {
        res.status(404).json({ error: 'Бренд не найден!' });
    }
});

router.get('/brands/search', async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');

        const items = await Brand.find({ name: searchQuery });

        res.json({ items });
    } catch (err) {
        res.status(404).json({ error: 'Неверный запрос' });
    }
});

module.exports = router;