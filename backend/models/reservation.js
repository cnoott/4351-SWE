const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const reservationSchema = new mongoose.Schema({
    tableId: {
        type: ObjectId,
        ref: 'Table',
        required: true
    },

    userId: {
        type: ObjectId,
        ref: 'User',
    },

    isGuest: {
        type: Boolean,
        default: false,
    },

    guestInfo: {
        name: String,
        phoneNumber: String,
        email: String,
    },

    dateTime: {
        type: Date,
        required: true
    },

    numGuests: {
        type: Number,
        required: true
    },

});


module.exports = mongoose.model('Reservation', reservationSchema);
