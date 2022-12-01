const request = require('supertest');
var expect = require('chai').expect;

const app = require('../app');
const User = require('../models/user');
const Table = require('../models/table');

const tableData = {
    tableNum: 7777,
    capacity: 8
};

before(function(done) {
    this.timeout(3000);
    setTimeout(done, 2000);
});
after(async () => {
    try {
        await Table.deleteOne({ tableNum: tableData.tableNum });
    }
    catch (err) {
        console.log(err)
    }
});

describe('POST /create-table', () => {
    it('Should create table', done => {
        request(app)
            .post('/api/create-table')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(tableData)
            .expect(200)
            .then(res => {
                done()
            })
            .catch(err => console.log(err));
    });
});

describe('get /read-tables', () => {
    it('Should read tables', done => {
        request(app)
            .get('/api/read-tables')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                done()
            })
            .catch(err => console.log(err));
    });
});



