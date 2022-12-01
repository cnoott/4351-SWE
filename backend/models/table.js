const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const tableSchema = new mongoose.Schema({
    tableNum: {
        type: Number,
        required: true,
        unique: true
    },

    isReserved: {
        type: Boolean,
        required: true,
        default: false,
    },

    capacity: {
        type: Number,
        required: true
    },

    combinedWith: {
        type: Object,
    },
});

module.exports = mongoose.model('Table', tableSchema);
