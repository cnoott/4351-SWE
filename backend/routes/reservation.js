const express = require('express');
const router = express.Router();

const { checkTables, makeReservation } = require('../controllers/reservation.js');
const { tableById } = require('../controllers/table');

router.post('/check-tables/', checkTables);
router.post('/make-reservation/:tableId', makeReservation);

router.param('tableId', tableById);

module.exports = router;
