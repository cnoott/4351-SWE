const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        req.profile = user;
        next();
    });
};

exports.read = (req, res) => {
    //DO NOT SEND PASSWORD INFO
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
};

exports.update = (req, res) => { //used in Client Profile Managment
    console.log(req.body);
    User.findOneAndUpdate({_id: req.profile._id},
        {$set: req.body},
        {new: true},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error: 'You are not authorize to perform this action'
                });
            }

            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        });
};
