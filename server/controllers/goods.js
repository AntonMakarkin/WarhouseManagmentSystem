const mongoose = require('mongoose');
const Goods = require('../models/catalog/goods');

const addInGoods = () => {
    return async (req, res) => {
        const { title, img, brand, description, specification, category, price } = req.body;
        const item = new Goods({ title, img, brand, description, specification, category, price });

        try {
            await item.save();
            res.status(201).json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

const getGoods = () => {
    return async (req, res) => {
        const { brand, categories, newProduct } = req.query;

        try {
            let items;

            if (newProduct) {
                items = await Goods.find().sort({ createdAt: -1 }).limit(1);
            } else if (categories) {
                items = await Goods.find({ category: { $in: [categories] } })
            } else if (brand) {
                items = await Goods.find({ brand: { $in: [brand] } })
            }

            res.send(items);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

const getGoodsById = () => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Неккоректный id!'});
        }

        try {
            const item = await Goods.findById(id);

            if (!item) {
                throw new Error(`Товар с данным id отсутствует!`);
            }

            res.json(item);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

const updateGoodsById = (modelName) => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Неккоректный id!'});
        }

        const item = await Goods.findById(id);

        if (!item) {
            return res.status(404).json({ error: `${modelName} с данным id отсутствует!` })
        }

        const updates = Object.keys(req.body); //return array of properties
        const allowedUpdates = ['title', 'img', 'brand', 'description', 'specification', 'category', 'quantity', 'price'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Невозможно обновить данные параметры записи!' });
        }

        try {
            updates.forEach((update) => item[update] = req.body[update]); //updating the item
            await item.save();
            res.json(item);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }
}

const deleteGoodsById = () => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Неккоректный id' });
        }

        try {
            const item = await Goods.findById(id);
    
            if (!item) {
                throw new Error('Товар с данным id не найден!');
            }
    
            await Goods.deleteOne(item);
            res.json({ message: 'Товар успешно удален' });
        } catch(err) {
            res.status(404).json({ error: err.message });
        }
    }
}

module.exports = {
    addInGoods, getGoods, getGoodsById, updateGoodsById, deleteGoodsById
}