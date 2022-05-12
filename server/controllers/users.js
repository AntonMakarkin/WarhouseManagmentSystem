const mongoose = require('mongoose');
const Customer = require('../models/users/customer');
const customerToken = require('../models/tokens/customerToken')
const sharp = require('sharp');

const createUser = (model, role) => {
    return async (req, res) => {
        const { name, email, password, phone } = req.body;
        const user = new model({ name, email, password, phone, role });

        try {
            await user.save();
            res.status(201).json({ user });
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: 'Пользователь с данным email или телефоном уже существует' });
        }
    }
};

const createCustomer = (cookieLife = 2592000000) => {
    return async (req, res) => {
        const { name, email, password, phone } = req.body;
        const role = "Клиент (покупатель)"
        const user = new Customer({ name, email, password, phone, role });

        try {
            await user.save();
            const payload = { _id: user._id.toString(), email: user.email };
            const tokens = await customerToken.generateTokens(payload);
            const refreshToken = tokens.refreshToken;

            await customerToken.saveRefreshToken(user._id, refreshToken);

            const accessToken = tokens.accessToken;

            res.cookie('refreshToken', refreshToken, { maxAge: cookieLife, httpOnly: true });
            res.json({ user, accessToken });

            //res.status(201).json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: 'Пользователь с данным email или телефоном уже существует' });
        }
    }
}

const login = (model, tokenModel, cookieLife = 2592000000) => {
    return async (req, res) => {
        try {
            const user = await model.findByCredentials(req.body.email, req.body.password);
            const payload = { _id: user._id.toString(), email: user.email };
            const tokens = await tokenModel.generateTokens(payload);
            const refreshToken = tokens.refreshToken;

            await tokenModel.saveRefreshToken(user._id, refreshToken);

            const accessToken = tokens.accessToken;

            res.cookie('refreshToken', refreshToken, { maxAge: cookieLife, httpOnly: true });
            res.json({ user, accessToken, refreshToken });

        } catch (err) {
            //res.status(400).json({ error: "Неверный логин или пароль" });
            res.status(400).json({ error: err.message });
        }
    }
};

const logout = (tokenModel) => {
    return async (req, res) => {
        try {
            const { refreshToken } = req.cookies;

            await tokenModel.removeRefreshToken(refreshToken);

            res.clearCookie('refreshToken');
            res.json({ result: "Успешный выход" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

const getAccountInfo = () => {
    return async (req, res) => {
        try {
            res.json({ user: req.user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

const searchAccount = (model) => {
    return async (req, res) => {
        const { searchQuery } = req.query;

        try {
            const title = new RegExp(searchQuery, 'i');

            const items = await model.find({ name: title });

            res.json({ items })
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

const updateAccountInfo = (allowedUpdates) => {
    return async (req, res) => {
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Невозможно обновить данные парметры учетной записи!' });
        }

        try {
            updates.forEach((update) => req.user[update] = req.body[update]); //updating the user
            await req.user.save();
            res.json({ user: req.user });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

const deleteAccountAvatar = () => {
    return async (req, res) => {
        try {
            req.user.avatar = undefined;
            await req.user.save();
            res.json({ user: req.user }); 
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

const getListOfUsers = (model) => {
    return async (req, res) => {
        const { page } = req.query;
        
        try {
            const LIMIT = 10;
            const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

            const total = await model.countDocuments({});
            const users = await model.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

            res.json({ items: users, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

const getListOfNameUsers = (model) => {
    return async (req, res) => {
        try {
            const users = await model.find({}, '-password -email -avatar -role -field');
            res.json({ items: users });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

const getUserById = (model) => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Неккоректный id'});
        }

        try {
            const user = await model.findById(id);
    
            if (!user) {
                throw new Error('Пользователь с данным id не найден!');
            }
    
            res.json({ item: user });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

const getCustomerStats = (model) => {
    return async (req, res) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        console.log(model)

        try {
            const data = await model.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                    $project: {
                      month: { $month: "$createdAt" },
                    },
                },
                {
                    $group: {
                      _id: "$month",
                      total: { $sum: 1 },
                    },
                  },
            ])

            res.json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

const updateUserById = (model, allowedUpdates) => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Неккоректный id' });
        }

        const user = await model.findById(id);

        if (!user) {
            return res.status(404).send({ error: 'Пользователь с данным id не найден!' });
        }

        const updates = Object.keys(req.body); //return array of properties

        if (updates.length < 1) {
            return res.status(400).send({ error: 'Переданы пустые данные!' });
        }

        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Невозможно обновить данные параметры учетной записи!' });
        }

        try {
            updates.forEach((update) => user[update] = req.body[update]); //updating the user
            await user.save();
            res.json({ user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

const deleteUserById = (model) => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Неккоректный id' });
        }

        try {
            const user = await model.findById(id);
    
            if (!user) {
                throw new Error('Пользователь с данным id не найден!');
            }
    
            await model.deleteOne(user);
            res.json({ message: 'Пользователь успешно удален' });
        } catch(err) {
            res.status(404).json({ error: err.message });
        }
    }
};

const postAvatar = () => {
    return async (req, res) => {
        try {
            const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
            req.user.avatar = buffer;
            await req.user.save();
            res.json(req.user); 
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

const postAvatarById = (model) => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Неккоректный id!'});
        }

        const user = await model.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден!' });
        }

        try {
            const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
            user.avatar = buffer;
            await user.save();
            //res.json({ message: 'Аватар добавлен' });
            res.json({ item: user }) 
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

const deleteAvatar = () => {
    return async (req, res) => {
        try {
            req.user.avatar = undefined;
            await req.user.save();
            res.json({ message: 'Аватар удален' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

const deleteAvatarById = (model) => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Неккоректный id' });
        }

        const user = await model.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден!' });
        }

        try {
            user.avatar = undefined;
            await user.save();
            res.json({ message: 'Аватар удален' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
};

module.exports = {
    createUser, createCustomer, login, logout, getAccountInfo, searchAccount, updateAccountInfo, deleteAccountAvatar,
    getListOfUsers, getListOfNameUsers, getUserById, getCustomerStats, updateUserById, deleteUserById, postAvatar, postAvatarById,
    deleteAvatar, deleteAvatarById 
};