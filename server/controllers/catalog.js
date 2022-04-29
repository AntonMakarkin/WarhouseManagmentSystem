const mongoose = require('mongoose');
const Category = require('../models/catalog/categories');
const Goods = require('../models/catalog/goods');
const Brand = require('../models/catalog/brands');
const sharp = require('sharp')

const addInCatalog = (model) => {
    return async (req, res) => {
        const { name } = req.body;

        const item = new model({ name });

        try {
            await item.save();
            res.status(201).json({ item });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

const addCategoryInCatalog = () => {
    return async (req, res) => {
        const { name, link } = req.body;

        const item = new Category({ name, link });

        try {
            await item.save();
            res.status(201).json(item);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};


const getFromCatalog = (model, modelName) => {
    return async (req, res) => {
        const { page } = req.query;

        try {
            const LIMIT = 10;
            const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

            const total = await model.countDocuments({});
            const items = await model.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

            if (!items) {
                throw new Error(`Информация о "${modelName}" отсутcтвует!`)
            }

            res.json({ items, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

const getAllInfoForHomePage = async (req, res) => {
    try {
        const categories = await Category.find({});
        const goods = await Goods.find().sort({ _id: -1 }).limit(8);

        res.json({ categories, goods });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

const getAllInfoForAdminPage = async (req, res) => {
    try {
        const brands = await Brand.find({});
        const categories = await Category.find({})
        let brandNames = [];
        let categoryNames = [];

        brands.forEach(brand => {
            brandNames.push(brand.name);
        });

        categories.forEach(category => {
            categoryNames.push(category.name)
        })
        res.json({ brands: brandNames, categories: categoryNames });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

const deleteAllFromCatalog = (model, modelName) => {
    return async (req, res) => {
        try {
            await model.deleteMany({});
            res.json({ message: `Список "${modelName}" успешно очищен` });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

const searchItemsFromCatalog = (model) => {
    return async (req, res) => {
        const { searchQuery } = req.query;

        try {
            const title = new RegExp(searchQuery, 'i');

            const items = await model.find({ name: title });

            res.json({ items });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

const searchItemById = (model, modelName) => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Неккоректный id!'});
        }

        try {
            const item = await model.findById(id);

            if (!item) {
                throw new Error(`${modelName} с данным id отсутствует!`);
            }

            res.json({ item });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

const updateItemFromCatalogById = (model, modelName) => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Неккоректный id!'});
        }

        const item = await model.findById(id);

        if (!item) {
            return res.status(404).json({ error: `${modelName} с данным id отсутствует!` })
        }

        const updates = Object.keys(req.body); //return array of properties
        const allowedUpdates = ['name'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Невозможно обновить данные параметры записи!' });
        }

        try {
            updates.forEach((update) => item[update] = req.body[update]); //updating the item
            await item.save();
            res.json({ item });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }
};

const deleteItemById = (model, modelName) => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Неккоректный id!'});
        }
    
        try {
            const item = await model.findById(id);
    
            if (!item) {
                throw new Error(`${modelName} с данным id отсутствует!`);
            }
    
            await model.deleteOne({ _id: item._id });
            res.json({ message: `Запись успешно удалена` });
        } catch (err) {
            res.status(404).json({ error: err.message })
        }
    }
};

const postItemCatalogImage = (model) => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Неккоректный id!'});
        }

        const item = await model.findById(id);

        if (!item) {
            return res.status(404).json({ error: 'Запись не найдена!' });
        }

        try {
            const buffer = await sharp(req.file.buffer).webp().toBuffer();
            console.log(buffer)
            item.avatar = buffer;
            await item.save();
            //res.json({ message: 'Аватар добавлен' });
            res.json({item}) 
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = {
    addInCatalog, addCategoryInCatalog, getFromCatalog, deleteAllFromCatalog, searchItemsFromCatalog, 
    searchItemById, updateItemFromCatalogById, deleteItemById, postItemCatalogImage, getAllInfoForHomePage,
    getAllInfoForAdminPage
}