const express = require('express');
const router = express.Router();

const { requireSignin, isAuth } = require('../controllers/auth');
const {
    userById,
    read,
    update
} = require('../controllers/user');

router.get('/user/:userId', read);
router.put('/update-user/:userId', update);

router.param('userId', userById);

module.exports = router;
