const jwt = require('jsonwebtoken');

const auth = (userModels) => {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', ''); //remove Bearer
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            let user = null;

            for (const item of userModels) {
                user = await item.findOne({ _id: decoded._id, 'tokens.token': token });

                if (user) {
                    break;
                }
                //user = userInCycle;
                /*if (userInCycle) {
                    user = userInCycle;
                    break;
                }*/

            }

            if (!user) {
                throw new Error('Пользователь не найден!');
            }
            /*const userOne = await userModel.findOne({ _id: decoded._id, 'tokens.token': token });

            if (!userOne) {
                throw new Error('Пользователь не найден!');
            }*/

            req.token = token; //send token to the root handler
            req.user = user; //send information to the root handler
            next(); 
        } catch (err) {
            res.status(401).send({ error: 'Пожалуйста авторизуйтесь' });
        }
    }
}

module.exports = auth;