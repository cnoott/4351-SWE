const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { v1: uuidv1 } = require('uuid');

require('dotenv').config();

exports.signup = (req, res) => {
    console.log(req.body);

    const user = new User(req.body);

    user.save((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: '' + err
            });
        }

        user.salt = undefined;
        user.hashed_password = undefined;

        const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);

        res.cookie('t', token, { expiry: new Date() + 999 });

        const { _id, username } = user;
        return res.json({ token, user: { _id, username } });
    });
};

exports.signin = (req, res) => {
    //find user based on email
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist'
            });
        }

        //if user is found make sure email and password match
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password don't match"
            });
        }

        //generate signin token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        //persist token as 't' in cookie with expiry date
        res.cookie('t', token, { expiry: new Date() + 150 });

        //return response with user and token to frontend client
        const { _id, username } = user;
        return res.json({ token, user: { _id, username } });
    });
};

exports.signout = (req, res, next) => {
    res.clearCookie('t');
    res.json({ message: 'Signout Success' });
};

//requireSignin
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};
