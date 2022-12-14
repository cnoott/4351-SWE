const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: 0
    },

    email: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true,
    },

    hashed_password: {
        type: String
    },

    billingAddress: {
        type: String,
        required: true
    },

    preferredDinerNum: {
        type: String,
        required: true
    },

    earnedPoints: {
        type: Number,
        default: 0
    },

    preferredPayment: {
        type: String,
        enum: ['cash', 'credit', 'check']
    },

    creditCardNumber: {
        type: String,
        required: false
    },

    reservations: [{
        type: ObjectId,
        ref: 'Reservation'
    }],


    salt: String, 
});

//virtual field
userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if(!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        }
        catch(err){
            return '';
        }
    }
};

module.exports = mongoose.model('User', userSchema);
