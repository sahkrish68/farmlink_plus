const express = require('express');
const router = express.Router();
const { listFarmers, getFarmer } = require('../controllers/farmerController');

router.get('/', listFarmers);
router.get('/:id', getFarmer);

module.exports = router;