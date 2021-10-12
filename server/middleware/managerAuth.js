const jwt = require('jsonwebtoken');
const Manager = require('../models/manager');

const managerAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', ''); //remove Bearer
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Manager.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('User is not found!');
        }

        req.token = token; //send token to the root handler
        req.user = user; //send information to the root handler
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

module.exports = managerAuth;