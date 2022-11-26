const express = require('express');
const router = express.Router();

const { createTable } = require('../controllers/table');

router.post('/create-table', createTable);

module.exports = router;
