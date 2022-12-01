const express = require('express');
const router = express.Router();

const { checkTables, makeReservation, getMyReservations } = require('../controllers/reservation.js');
const { tableById } = require('../controllers/table');
const { userById } = require('../controllers/user');

router.post('/check-tables/', checkTables);
router.post('/make-reservation/:tableId', makeReservation);
router.get('/get-reservations/:userId', getMyReservations);

router.param('tableId', tableById);
router.param('userId', userById);

module.exports = router;
