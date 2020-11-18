const express = require('express');
const router = express.Router();

const { feeStructureGet } = require('../controllers/auth');

router.get('/', feeStructureGet);

module.exports = router;