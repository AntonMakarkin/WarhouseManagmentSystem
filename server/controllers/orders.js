const mongoose = require('mongoose');
const Order = require('../models/ordersAndInfo/order');
const Goods = require('../models/catalog/goods');
const Courier = require('../models/users/courier');

const addOrder = () => {
    return async (req, res) => {
        const { name, email, phone, goods, total, address } = req.body;
        const order = new Order({ name, email, phone, goods, total, address });
    
        try {
            await order.save();
            res.json(order);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Ошибка! Не удалось добавить заказ' });
        }
    }
}

const getOrders = () => {
    return async (req, res) => {
        const { page, orderStatus } = req.query

        try {
            const LIMIT = 10;
            const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

            const total = await Order.countDocuments({});
            const orders = await Order.find({ status: orderStatus }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

            if (!orders) {
                throw new Error(`Информация о заказах отсутcтвует!`)
            }

            let items = orders.map(item => {
                let itemObject = item.toObject();

                delete itemObject.goods
                delete itemObject.phone
                delete itemObject.address
                delete itemObject.email

                return itemObject
            })

            res.json({ items, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

const getOrdersByCourier = (orderStatus) => {
    return async (req, res) => {
        const { page } = req.query

        try {
            const LIMIT = 10;
            const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

            let id = req.user._id;
            let convertedId = id.toString()
            let hello = 'hello'
            console.log(typeof convertedId)
            console.log(convertedId)
            const total = await Order.countDocuments({});
            const orders = await Order.find({ status: orderStatus, "courier._id": convertedId }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

            if (!orders) {
                throw new Error(`Информация о заказах отсутcтвует!`)
            }

            let items = orders.map(item => {
                let itemObject = item.toObject();

                delete itemObject.goods
                delete itemObject.phone
                delete itemObject.address
                delete itemObject.email

                return itemObject
            })

            res.json({ items, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

const getOrderById = () => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Неккоректный id'});
        }

        try {
            let item = await Order.findById(id);
            let goodsUpdated = []
            //console.log(item);
    
            if (!item) {
                throw new Error('Заказ с данным id не найден!');
            }

            item = item.toObject();

            for (const good of item.goods) {
                let goodItem = await Goods.findById(good._id)
                good['quantityOnStorage'] = goodItem.quantity; 
            }

            res.json(item);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

const getOrderByIdForStoreKeepeer = () => {
    return async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Неккоректный id'});
        }

        try {
            let item = await Order.findById(id);
    
            if (!item) {
                throw new Error('Заказ с данным id не найден!');
            }

            const couriers = await Courier.find({}, '-password -email -avatar -role -field')

            res.json({ item, couriers });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

const updateOrderById = (personal) => {
    return async (req, res) => {
        const { id } = req.params;
        console.log(id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Неккоректный id!'});
        }

        const item = await Order.findById(id);

        if (!item) {
            return res.status(404).json({ error: `Заказ с данным id отсутствует!` })
        }

        const updates = Object.keys(req.body); //return array of properties
        const allowedUpdates = ['goods', 'status', 'name', 'email', 'phone', 'total', 'address', 'courier'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Невозможно обновить данные параметры записи!' });
        }

        try {
            updates.forEach((update) => item[update] = req.body[update]); //updating the item
            await item.save();

            if (personal === 'manager') {
                for (const good of item.goods) {
                    let goodFromStorage = await Goods.findById(good._id)
                    let remainGoodsOnStorage = goodFromStorage.quantity - good.quantity
                    goodFromStorage.quantity = remainGoodsOnStorage
                    await goodFromStorage.save();
                }
            }

            if (personal === 'storekeeper') {
                for (const good of item.goods) {
                    let goodFromStorage = await Goods.findById(good._id)
                    let remainGoodsOnStorage = goodFromStorage.quantityOnStorage - good.quantity
                    goodFromStorage.quantityOnStorage = remainGoodsOnStorage
                    await goodFromStorage.save();
                }
            }

            res.json(item);
        } catch (err) {
            res.status(500).send({ error: err.message });
        }

    }
}

module.exports = {
    addOrder, getOrders, getOrdersByCourier, getOrderById, getOrderByIdForStoreKeepeer, updateOrderById
}