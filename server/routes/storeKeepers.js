const express = require('express');
const StoreKeeper = require('../models/users/storeKeeper');
const Admin = require('../models/users/admin');
const tokenStoreKeeper = require('../models/tokens/storeKeeperToken');
const auth = require('../middleware/auth');

const storeKeeperControllers = require('../controllers/users');
const { createUser: createStoreKeeper, login, logout, getAccountInfo, updateAccountInfo, 
        getListOfUsers, getUserById, searchAccount, updateUserById, deleteUserById, 
        postAvatar, postAvatarById, deleteAvatar, deleteAvatarById } = storeKeeperControllers;

const upload = require('../service/upload');
const router = new express.Router();

