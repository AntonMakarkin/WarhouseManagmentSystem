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

module.exports.addInCatalog = addInCatalog;
module.exports.getFromCatalog = getFromCatalog;
module.exports.deleteAllFromCatalog = deleteAllFromCatalog;