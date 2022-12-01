const request = require('supertest');
var expect = require('chai').expect;

const app = require('../app');
const User = require('../models/user');
const Table = require('../models/table');
const Reservation = require('../models/reservation');

const checkTablesData = {
    numGuests: '1',
    date: '2023-11-03',
    time: '10:30',
    userId: '63815851488f3c1e4e15912e'
};

const tableData = {
    capacity: 8,
    tableNum: 6666
};


const makeReservationData = {
    numGuests: '1',
    date: '2023-11-03',
    time: '10:33',
    userId: '63815851488f3c1e4e15912e',
    isGuest: false
};

function convertDateTime(date, time) {
    var dateParts = date.split('-');
    var timeParts = time.split(':');
    var date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);
    console.log('DATE: ', date);
    return date;
};


let table;
let dateTime;
before(function(done) {
    this.timeout(3000);
    setTimeout(done, 2000);
    table = new Table(tableData);
    console.log(table);
    dateTime = convertDateTime(makeReservationData.date, makeReservationData.time);
});

after(async () => {
    try {
        await Table.deleteOne({ dateTime: dateTime });
    }
    catch (err) {
        console.log(err)
    }
});

describe('POST /check-tables', () => {
    it('Should return avaliable tables', done => {
        request(app)
            .post('/api/check-tables')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(checkTablesData)
            .expect(400)
            .then(res => {
                done()
            })
            .catch(err => console.log(err));
    });
});

describe('POSt /make-reservation', () => {
    it('Should make reservation', done => {
        request(app)
            .post(`/api/make-reservation/${table._id}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(makeReservationData)
            .expect(400)
            .then(res => {
                done()
            })
            .catch(err => console.log(err));
    });
});

