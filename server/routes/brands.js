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
        res.status(404).json({ error: err.message });
    }
});

router.delete('/brands', auth([Admin]), async (req, res) => {
    try {
        await Brand.deleteMany({});
        res.json({ message: 'Список брендов успешно очищен' });  
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/brands/search', async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');

        const items = await Brand.find({ name: title });

        res.json({ items });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.get('/brands/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Brand.findById(id);

        if (!item) {
            throw new Error('Бренд с данным id не найден!');
        }

        res.json({ item });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.patch('/brands/:id', auth([Admin, Manager, StoreKeeper]), async (req, res) => {
    const { id } = req.params;

    const item = await Brand.findById(id);

    if (!item) {
        return res.status(400).send({ error: 'Бренд с данным id не найден!' });
    }

    const updates = Object.keys(req.body); //return array of properties
    const allowedUpdates = ['name'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Невозможно обновить данные параметры записи!' });
    }

    try {
        updates.forEach((update) => item[update] = req.body[update]); //updating the user
        await item.save();
        res.json({ item });
    } catch (err) {
        res.status(404).send({ error: err.message });
    }
});

router.delete('/brands/:id', auth([Admin, Manager, StoreKeeper]), async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Brand.findById(id);

        if (!item) {
            throw new Error('Бренд с данным id не найден!');
        }

        await Brand.deleteOne(item);
        res.status(200).send({ message: 'Бренд успешно удален' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

module.exports = router;