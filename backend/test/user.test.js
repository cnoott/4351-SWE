const request = require('supertest');
var expect = require('chai').expect;

const app = require('../app');
const User = require('../models/user');

const updateUserData = {
    creditCardNumber: '12341234'
};

const signupUser = {
    name: 'testname2',
    email: 'test@gmail2',
    password: 'pizza44',
    address: 'testaddress',
    billingAddress: 'test',
    preferredDinerNum: '23',
    preferredPayment: 'cash'
};

let user;
before(function(done) {
    this.timeout(3000);
    setTimeout(done, 2000);

    user = new User(signupUser);
    user.save();
});

after(async () => {
    try {
        await User.deleteOne({ name: signupUser.name });
    }
    catch (err) {
        console.log(err)
    }
});

describe('GET /user/:userId', () => {
    it('Should get user data', done => {
        request(app)
            .get(`/api/user/${user._id}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                done()
            })
            .catch(err => console.log(err));
    });
});


describe('PUT /update-user/:userId', () => {
    it('Should update user', done => {
        request(app)
            .put(`/api/update-user/${user._id}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(updateUserData)
            .expect(200)
            .then(res => {
                done()
            })
            .catch(err => console.log(err));
    });
});
