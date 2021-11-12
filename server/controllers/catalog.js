const mongoose = require('mongoose');

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

const getFromCatalog = (model, modelName) => {
    return async (req, res) => {
        try {
            const items = await model.find({});

            if (!items) {
                throw new Error(`Информация о "${modelName}" отсутcтвует!`)
            }

            res.json({ items });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

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
}

module.exports.addInCatalog = addInCatalog;
module.exports.getFromCatalog = getFromCatalog;
module.exports.deleteAllFromCatalog = deleteAllFromCatalog;
module.exports.searchItemsFromCatalog = searchItemsFromCatalog;
module.exports.searchItemById = searchItemById;
module.exports.updateItemFromCatalogById = updateItemFromCatalogById;
module.exports.deleteItemById = deleteItemById;