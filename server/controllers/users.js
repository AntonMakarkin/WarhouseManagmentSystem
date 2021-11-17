const mongoose = require('mongoose');
const sharp = require('sharp');

const createUser = (model) => {
    return async (req, res) => {
        const user = new model(req.body);

        try {
            await user.save();
            res.status(201).json({ user });
        } catch (e) {
            res.status(400).json({ error: 'Пользователь с данным email или телефоном уже существует' });
        }
    }
};

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
            res.status(400).json({ error: "Неверный логин или пароль" });
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
        try {
            const users = await model.find({});

            if (!users) {
                throw new Error('Пользователи данной группы отсутсвуют!');
            }

            res.json({ users });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

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
    
            res.json({ user });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

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
    
            await Courier.deleteOne(user);
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
            res.json({ message: 'Аватар добавлен' });
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
            res.json({ message: 'Аватар добавлен' }); 
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

module.exports.createUser = createUser;
module.exports.login = login;
module.exports.logout = logout;
module.exports.getAccountInfo = getAccountInfo;
module.exports.updateAccountInfo = updateAccountInfo;
module.exports.deleteAccountAvatar = deleteAccountAvatar;
module.exports.getListOfUsers = getListOfUsers;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;
module.exports.postAvatar = postAvatar;
module.exports.postAvatarById = postAvatarById;
module.exports.deleteAvatar = deleteAvatar;
module.exports.deleteAvatarById = deleteAvatarById;