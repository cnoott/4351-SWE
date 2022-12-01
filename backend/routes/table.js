const express = require('express');
const router = express.Router();

const { createTable, readTables } = require('../controllers/table');

router.post('/create-table', createTable);
router.get('/read-tables', readTables);

module.exports = router;
