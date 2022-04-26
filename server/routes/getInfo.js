const express = require('express');
const catalogControllers = require('../controllers/catalog');
const { getAllInfoForHomePage, getAllInfoForAdminPage } = catalogControllers;

const router = express.Router();

//routes
router.get('/getinfo/homepage', getAllInfoForHomePage);
router.get('/getinfo/addgoods', getAllInfoForAdminPage)

module.exports = router;