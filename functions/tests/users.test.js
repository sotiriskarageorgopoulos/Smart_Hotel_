const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const {
    validateEmailAndPassword
} = require('../util/helper_functions')

suite('Users handler testing...', () => {
    suite('Unit Tests', () => {
        /**
         * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com> 
         */
        suite('Testing validateEmailAndPassword() function...', () => {
            test('Checking a valid user...', () => {
                let validUser = {
                    password: '152562hshsh',
                    email: 'test@example.com'
                }

                let {
                    errors,
                    valid
                } = validateEmailAndPassword(validUser.email, validUser.password)

                assert.isTrue(valid, "The user's credentials is valid...")
                assert.deepEqual(errors, {}, 'There is no error...')
            })

            test('Checking a user with invalid password...', () => {
                let inValidUser = {
                    password: '',
                    email: 'test@example.com'
                }

                let {
                    errors,
                    valid
                } = validateEmailAndPassword(inValidUser.email, inValidUser.password)

                assert.isFalse(valid, "The user's password is invalid...")
                assert.strictEqual(errors.password, 'Must not be empty!')
                assert.deepEqual(errors, {
                    password: 'Must not be empty!'
                })
            })

            test("Checking a user with invalid email...", () => {
                let inValidUser = {
                    password: '173bsqgd1',
                    email: 'testexamplecom'
                }

                let {
                    errors,
                    valid
                } = validateEmailAndPassword(inValidUser.email, inValidUser.password)

                assert.isFalse(valid, "The user's email is invalid...")
                assert.strictEqual(errors.email, 'Must be a valid a address!')
                assert.deepEqual(errors, {
                    email: 'Must be a valid a address!'
                })
            })

            test("Checking a user without email...", () => {
                let inValidUser = {
                    password: '173bsqgd1',
                    email: ''
                }

                let {
                    errors,
                    valid
                } = validateEmailAndPassword(inValidUser.email, inValidUser.password)

                assert.isFalse(valid, "The user's email is empty string...")
                assert.strictEqual(errors.email, 'Email must not be empty!')
                assert.deepEqual(errors, {
                    email: 'Email must not be empty!'
                })
            })
        })
    })

    suite('Functional Tests', () => {
        /**
         * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com> 
         */
        suite('POST /login', () => {
            test('Testing login endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                    .post('/api/login')
                    .type('form')
                    .send({
                        email: "john@domain.com",
                        password: "123456"
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.strictEqual(Object.keys(res.body).length, 1)
                        done()
                    })
            })
        })


    })
    /**
     * @author Dimitris Michailidis <dimmichlds@gmail.com>
     */
    suite('GET/AllReservations', () => {
        test('Testing getAllReservationsOfHotel endpoint', (done) => {
            chai
                .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                .get('/api/getAllReservationsOfHotel')
                .type('form')

                .end((err, res) => {
                    let result = {

                        duration: 2,
                        decision: "accepted",
                        totalPrice: 180,
                        reservationId: "res2034",
                        userId: "c0LnmM8mxoYMM33Q7Kn6IssD16k2",
                        customerNotes: "something. . .",
                        roomsIds: ["101"]
                    }
                    assert.equal(res.status, 200, 'Response status should be 200...')
                    done()
                })
        })
    })
    /**
     * @author Dimitris Michailidis <dimmichlds@gmail.com>
     */
    suite('GET/OneReservationOfHotel', () => {
        test('Testing getReservationOfHotel endpoint', (done) => {
            chai
                .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                .get('/api/getReservationOfHotel/res2034')
                .type('form')
                .end((err, res) => {
                    let result = {
                        roomsIds: ["101"],
                        userId: "c0LnmM8mxoYMM33Q7Kn6IssD16k2",
                        reservationId: "res2034",
                        decision: "accepted",
                        duration: 2,
                        totalPrice: 180,
                        customerNotes: "something. . ."
                    }
                    assert.equal(res.status, 200, 'Response status should be 200...')
                    done()
                })
        })
    })
    /**
     * @author Dimitris Michailidis <dimmichlds@gmail.com>
     */
    suite('/PUT UpdateProfile', () => {
        test('Testing updateProfileDetails endpoint...', (done) => {
            let userId = 'ZYioRvOtwNRDzX9DFlgS8WiCKHy1'
            chai
                .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                .put('/api/updateProfileDetails/ZYioRvOtwNRDzX9DFlgS8WiCKHy1')
                .type('form')
                .send({
                    tel: '2105656233'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Response status should be 200...')
                    assert.strictEqual(res.text, 'The profile with id: ZYioRvOtwNRDzX9DFlgS8WiCKHy1 has been updated')
                    done()
                })
        })
    })
})