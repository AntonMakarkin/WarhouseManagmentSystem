const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');

const customerAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', ''); //remove Bearer
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Customer.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('Пользователь не найден!');
        }

        req.token = token; //send token to the root handler
        req.user = user; //send information to the root handler
        next();
    } catch (e) {
        res.status(401).send({ error: 'Пожалуйста авторизуйтесь' });
    }
}

module.exports = customerAuth;