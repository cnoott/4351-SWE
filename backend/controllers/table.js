const Table = require('../models/table');

exports.tableById = (req, res, next, id) => {
    console.log(id);
    console.log("*** ID");
    Table.findById(id).exec((err, table) => {
        console.log('table');
        console.log(table);
        if (err || !table) {
            return res.status(400).json({
                error: 'Could not find table'
            });
        }

        req.table = table;
        next();
    });
        
};

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
