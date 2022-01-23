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
        /**
         * @author Dimitris Giannopoulos
         */
         suite('DELETE /deleteReview', () => {
            test('Testing deleteReview endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .delete('/deleteReview/jdndnj')
                    .end((err,res) => {
                        assert.equal(res.status, 200,'Response status should be 200...')
                        assert.strictEqual(res.text, `The review with id jdndnj deleted successfully!`)
                        done()
                    })
            })
        })
        /**
         * @author Dimitris Giannopoulos
         */
         suite('GET /availableRooms', () => {
            test('Testing the getAvailableRooms endpoint...', (done) => { 
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .get('/availableRooms')
                    .end((err, res) => {
                        assert.equal(res.status,200,'Response status should be 200...')
                        done()
                    })
            })
        })
        /**
         * @author Dimitris Giannopoulos
         */
         suite('GET /reviews', () => {
            test('Testing the getReviews endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .get('/reviews')
                    .end((err, res) => {
                        assert.equal(res.status,200,'Response status should be 200...')
                        done()
                    })
            })
        })
        /**
         * @author Dimitris Giannopoulos
         */
         suite('GET /review', () => {
            test('Testing the getReview endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .get('/review/hgjhghj')
                    .end((err, res) => {
                        let result = {
                            reviewId: "hgjhghj",
                            userId: "hggh",
                            rating: 3,
                            comment: "very good",
                            date: "2022-01-12T16:37:00Z"
                        }
                        assert.equal(res.status,200,'Response status should be 200...')
                        done()
                    })
            })
        })
        /**
         * @author Dimitris Giannopoulos
         */
         suite('PUT /updateReservationDecision', () => {
            test('Testing the updateReservationDecision endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .put('/updateReservationDecision/res229')
                    .type('form')
                    .send({
                        decision: "rejected"
                       })
                    .end((err,res) => {
                        assert.equal(res.status,200,'Response status should be 200...')
                        assert.strictEqual(res.text, `Reservation with id res229 updated succesfully`)
                        done()
                    })
            })
        })
    })
})