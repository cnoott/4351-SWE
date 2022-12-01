const request = require('supertest');
var expect = require('chai').expect;

const app = require('../app');
const User = require('../models/user');

const signupUser = {
    name: 'testname',
    email: 'test@gmail',
    password: 'pizza44',
    address: 'testaddress',
    billingAddress: 'test',
    preferredDinerNum: '23',
    preferredPayment: 'cash'
};

const signinUser = {
    email: 'test@gmail',
    password: 'pizza44'
};

before(function(done) {
    this.timeout(3000);
    setTimeout(done, 2000);
});
after(async () => {
    try {
        await User.deleteOne({ name: signupUser.name });
    }
    catch (err) {
        console.log(err)
    }
});

describe('POST /signup', () => {
    it('Should signup user', done => {
        request(app)
            .post('/api/signup')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(signupUser)
            .expect(200)
            .then(res => {
                done()
            })
            .catch(err => console.log(err));
    });
});
describe('POST /signin', () => {
    it('Should signin user', done => {
        request(app)
            .post('/api/signin')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(signinUser)
            .expect(200)
            .then(res => {
                done()
            })
            .catch(err => console.log(err));
    });
});

describe('get /signout', () => {
    it('Should signout user', done => {
        request(app)
            .get('/api/signout')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                done()
            })
            .catch(err => console.log(err));
    });
});
