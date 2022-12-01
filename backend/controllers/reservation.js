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
    var date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);
    console.log('DATE: ', date);
    return date;
};

//returns list of avaliable tables
exports.checkTables = async (req, res) => {
    const reservationData = req.body;
    console.log(req.body);
    const { date, time, userId } = req.body;
    const numGuests = parseInt(req.body.numGuests);

    //check if chosen date time is in the past
    if (new Date(date) < new Date()){
            return res.status(400).json({ error: 'You cannot select a time in the past' });
    }

    //check if chosen time is avaliable
    var convertedDateTime = convertDateTime(date, time);
    if (new Date(date).getDay() < 1 || new Date(date).getDay() > 4) {
        if (reservationData.isGuest) {
            return res.status(400).json({ error: 'You must be logged in with a credit card on file to reserve during a weekend' });
        }

        const user = User.findById(userId).exec((err, user) => {
            if (err || !user) {
                console.log(err || user);
            }
            if (!user.creditCardNumber) {
                return res.status(400).json({
                    error: 'For weekends or holidays you must have a credit card on file to reserve. Go to your user dashboard to add a card'
                });
            }
        });

    }

    if (req.body.isSpecialDay) {
        if (reservationData.isGuest) {
            return res.status(400).json({ error: 'You must be logged in with a credit card on file to reserve during a holiday' });
        }
        else {
            const user = User.findById(userId).exec((err, user) => {
                if (err || !user) {
                    console.log(err || user);
                }
                if (!user.creditCardNumber) {
                    return res.status(400).json({
                        error: 'For weekends or holidays you must have a credit card on file to reserve. Go to your user dashboard to add a card'
                    });
                }
            });
        }
    }


    const reservationExists = await Reservation.exists({ dateTime: convertedDateTime });
    if (reservationExists) {        
        return res.status(400).json({ error: 'A reservation for that time already exists' });
    }

    let matchingTables = [];
    Table.find({ isReserved: false }).exec(async (err, tables) => {
        console.log(tables);
        if (!tables || tables.length === 0) {
            return res.status(400).json({ error: 'No tables found' });
        }



        for (var i=0; i < tables.length; i++) {
            if (numGuests <= tables[i].capacity) {
                matchingTables.push(tables[i]);

                return res.json({ matchingTables });
                break;
            }
        }

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
};

exports.makeReservation = (req, res) => {
    const { date, time, numGuests, userId, isGuest } = req.body;
    const convertedDateTime = convertDateTime(date, time);
    const table = req.table;

    table.isReserved = true;
    table.save();



    //make new resrvation doc
    //add new reservation id to reservationa
    let reservation;
    if (isGuest) {
        console.log('iSGUEST');
        reservation = new Reservation({
            tableId: table._id,
            dateTime: convertedDateTime,
            numGuests,
            isGuest
        });

    }
    else {
        reservation = new Reservation({
            tableId: table._id,
            userId,
            dateTime: convertedDateTime,
            numGuests
        });
    }


    reservation.save((err, newReservation) => {
        if (err || !newReservation) {
            console.log(err);
            return res.status(400).json({
                error: 'Could not create new reservation: ' + err
            });
        }
        if (!isGuest) {
            User.findOneAndUpdate(
                { _id: userId.toString() },
                { $push: { reservations: newReservation._id } },
                { new: true },
                (err, user) => {
                    if (err) return console.log(err);

                    return res.sendStatus(200);
                });  
        }
        else {
            return res.status(200).json({ url: `/checkout/${newReservation._id}` });
        }
    });
};

exports.getMyReservations = (req, res) => {
    const { reservations } = req.profile;
    Reservation.find()
        .where('_id').in(reservations)
        .exec((err, reservationData) => {
            return res.json({
                reservationData
            });
        })
};
