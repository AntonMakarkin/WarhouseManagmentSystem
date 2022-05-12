const mongoose = require('mongoose');
const Goods = require('../models/catalog/goods');
const sharp = require('sharp')

const addInGoods = () => {
    return async (req, res) => {
        const { name, brand, description, category, quantity, price } = req.body;
        const item = new Goods({ name, brand, description, category, quantity,
              quantityOnStorage: quantity, price });

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
        const { page } = req.query;

        try {
            const LIMIT = 10;
            const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

            const total = await Goods.countDocuments({});
            const items = await Goods.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

            if (!items) {
                throw new Error(`Информация о товарах отсутcтвует!`)
            }

            res.json({ items, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
        //const { page , brand, categories, newProduct } = req.query;

        /*try {
            let items;
            let total;
            const LIMIT = 8;
            const startIndex = (Number(page) - 1) * LIMIT;

            if (newProduct) {
                items = await Goods.find().sort({ createdAt: -1 }).limit(1);
            } else if (categories) {
                items = await Goods.find({ category: { $in: [categories] } })
            } else if (brand) {
                items = await Goods.find({ brand: { $in: [brand] } })
            } else {
                total = await Goods.countDocuments({});
                items = await Goods.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)
            }

            res.send(items);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }*/
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

            res.json({ item });
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

const postGoodsImage = () => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Неккоректный id!'});
        }
    
        const goodsItem = await Goods.findById(id);
    
        if (!goodsItem) {
            return res.status(404).json({ error: 'Товар не найден!' });
        }
    
        try {
            const buffer = await sharp(req.file.buffer).webp().toBuffer();
            goodsItem.avatar = buffer;
            await goodsItem.save();
            //res.json({ message: 'Аватар добавлен' });
            res.json({ item: goodsItem }) 
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = {
    addInGoods, getGoods, getGoodsById, updateGoodsById, deleteGoodsById,
    postGoodsImage
}