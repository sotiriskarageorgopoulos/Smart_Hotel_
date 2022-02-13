const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const Message = require('../model/message')

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
                        assert.isAtLeast(Object.keys(res.body).length, 1)
                        done()
                    })
            })
        })
        /**
         * @author Tassou Venetia
         */
        suite('GET /getMessages', () => {
            test('Testing getMessages endpoint...', (done) => {
                chai
                    .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                    .get('/getMessages/rBOy7dZzKDJV2xJqujms/sZ9QpKdOKSCvDEcIbQDt')
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200, "response must be 200")
                        assert.isAtLeast(res.body.length, 1)
                        done()
                    })
            })
        })
        /**
         * @author Tassou Venetia
         */
        suite('Testing user send message..', () => {
            test('test send message', (done) => {
                let message = new Message("jdfhjfdsh", "uydyug", "mpla", "mpla mpla", "2022-01-16T09:58:54.932Z", true)
                chai
                    .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                    .post(`/sendMessage`)
                    .send(JSON.parse(JSON.stringify(message)))
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200, "response must be 200")
                        assert.strictEqual(res.text, `The message send by ${message.getSenderId}`)
                        done()
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
                        .end((err, res) => {
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.strictEqual(res.text, `The review with id jdndnj deleted successfully!`)
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
                            assert.equal(res.status, 200, 'Response status should be 200...')
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
                        .get('/review/xnjcssjxnjsxnjsxjn')
                        .end((err, res) => {
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.equal(Object.keys(res.body).length, 5)
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
                        .put('/updateReservationDecision/CPU3ztfgW4ApBgxrYwLI')
                        .type('form')
                        .send({
                            decision: "accepted"
                        })
                        .end((err, res) => {
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.strictEqual(res.text, `Reservation with id CPU3ztfgW4ApBgxrYwLI updated succesfully`)
                            done()
                        })
                })
            })

            /**
             * @author Sotiris Karageorgopoulos
             */
            suite('PUT /updIsReadMessages', () => {
                test('Testing the updateReservationDecision endpoint...', (done) => {
                    chai
                        .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                        .put('/updIsReadMessages/rBOy7dZzKDJV2xJqujms/sZ9QpKdOKSCvDEcIbQDt')
                        .end((err, res) => {
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.strictEqual(res.text, `The messages are seen...`)
                            done()
                        })
                })
            })

            /**
             * @author Dimitris Michailidis
             * @param {*} req 
             * @param {*} res 
             */
            suite('GET /getReservationHistoryOfHotel', () => {
                test('Testing getReservationHistoryOfHotel endpoint...', (done) => {
                    chai
                        .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                        .get('/getReservationHistoryOfHotel')
                        .end((err, res) => {
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.isAtLeast(res.body.length, 1)
                            done()
                        })
                })
            })

            /**
             * @author Sotiris Karageorgopoulos
             * @param {*} req 
             * @param {*} res 
             */
            suite('PUT /checkAvailabilityOfRooms', () => {
                test('Testing checkAvailabilityOfRooms endpoint...', (done) => {
                    chai
                        .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                        .put('/checkAvailabilityOfRooms')
                        .end((err, res) => {
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.equal(res.text, 'The availability check is ok...')
                            done()
                        })
                })
            })


            /**
             * @author Sotiris Karageorgopoulos
             */
            suite('GET /user', () => {
                test('Testing the user endpoint...', (done) => {
                    chai
                        .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                        .get('/user/rBOy7dZzKDJV2xJqujms')
                        .end((err, res) => {
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.isAtLeast(Object.keys(res.body).length, 8)
                            done()
                        })
                })
            })

            /**
             * @author Venetia Tassou
             * @param {*} req 
             * @param {*} res 
             */
            suite('GET /getSenders', () => {
                test('Testing the user endpoint...', (done) => {
                    chai
                        .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                        .get('/getSenders/rBOy7dZzKDJV2xJqujms')
                        .end((err, res) => {
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.isAtLeast(res.body.length, 1)
                            done()
                        })
                })
            })

            /**
             * @author Dimitris Michailidis <dimmichlds@gmail.com>
             */
            suite('GET /getAllReservationsOfHotel', () => {
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

            /**
             * @author George Koulos
             */
            suite('GET /getCustomer', () => {
                test('Testing getCustomer endpoint', (done) => {
                    let customer = {
                        "birthDate": "1948-06-07T00:00:00.000Z",
                        "password": "123456",
                        "userId": "ZYioRvOtwNRDzX9DFlgS8WiCKHy1",
                        "bonusPoints": 0,
                        "name": "Hlias",
                        "blackListed": false,
                        "image": "https://firebasestorage.googleapis.com/v0/b/smart-hotel-7965b.appspot.com/o/no-img.png?alt=media&token=57ccaa66-55b5-41b3-b5b7-57d46f424609",
                        "surname": "Panagoulis",
                        "nationality": "Greece",
                        "email": "panago@gmail.com",
                        "tel": "2105656233"
                    }
                    chai
                        .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                        .get('/api/getCustomer/ZYioRvOtwNRDzX9DFlgS8WiCKHy1')
                        .type('form')
                        .end((err, res) => {
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.deepEqual(res.body, customer)
                            done()
                        })
                })
            })
        })
    })

})