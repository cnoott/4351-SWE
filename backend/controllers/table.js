const Table = require('../models/table');

exports.createTable = (req, res) => {
    const newTable = new Table(req.body);

    newTable.save((err, table) => {
        if (err || !table) {
            return res.status(400).json({
                error: 'Cannot create new table'
            });
        }

        return res.json({
            success: 'Table succesfully created'
        });
    });
};
