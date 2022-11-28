const Reservation = require('../models/reservation');
const Table = require('../models/table');
const User = require('../models/user');
//TODO:
// - reserve dates and check if a date-time has already been reserved (in progress)
// - handle guest

function compare(table1, table2) {
    if (table1.capacity < table2.capacity) {
        return -1;
    }
    if (table1.capacity > table2.capacity) {
        return 1;
    }
    return 0;
}

function convertDateTime(date, time) {
    var dateParts = date.split('-');
    var timeParts = time.split(':');
    return convertedDate = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);
};

//returns list of avaliable tables
exports.checkTables = async (req, res) => {
    const reservationData = req.body;
    console.log(req.body);
    const { date, time } = req.body;
    const numGuests = parseInt(req.body.numGuests);
        
    //check if chosen time is avaliable
    var convertedDateTime = convertDateTime(date, time);
    const reservationExists = await Reservation.exists({ dateTime: convertedDateTime });
    console.log(reservationExists);
    if (reservationExists) {        
        return res.status(400).json({ error: 'A reservation for that time already exists' });
    }

    if (reservationData.isGuest) {
        console.log('isGuest');
    }
    else {
        let matchingTables = [];
        Table.find({ isReserved: false }).exec(async (err, tables) => {
            console.log(tables);
            if (!tables || tables.length === 0) {
                return res.status(400).json({ error: 'No tables found' });
            }


            tables.forEach(table => {
                if (numGuests <= table.capacity) {
                    matchingTables.push(table);

                    return res.json({ matchingTables });
                }
            });

            if (matchingTables.length === 0) {
                var sorted = tables.sort(compare);
                var maxTable = sorted[sorted.length-1];
                

                for (var i=0; i < tables.length; i++) {
                    if (numGuests <= (maxTable.capacity + tables[i].capacity)) {
                        maxTable.combinedWith = tables[i]._id;
                        await matchingTables.push(maxTable);

                        return res.json({ matchingTables: matchingTables });
                        break;
                    }
                }
                return res.status(400).json({ error: 'No possible seats avaliable'});

            }
        });
    }
};

exports.makeReservation = (req, res) => {
    const { date, time, numGuests, userId } = req.body;
    const convertedDateTime = convertDateTime(date, time);
    const table = req.table;

    table.isReserved = true;
    table.save();



    //make new resrvation doc
    //add new reservation id to reservations
    
    const reservation = new Reservation({
        tableId: table._id,
        userId,
        dateTime: convertedDateTime,
        numGuests
    });

    reservation.save((err, newReservation) => {
        if (err || !newReservation) {
            console.log(err);
            return res.status(400).json({
                error: 'Could not create new reservation: ' + err
            });
        }

        User.findOneAndUpdate(
            { _id: userId.toString() },
            { $push: newReservation._id },
            { new: true },
            (err, user) => {
                if (err) return console.log(err);

                return res.sendStatus(200);
            });  
    });
};
