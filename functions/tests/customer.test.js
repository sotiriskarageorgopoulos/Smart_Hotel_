const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const {db} = require('../util/admin')
const {
    validateRegisterData
} = require('../util/helper_functions')

suite('Customer handler testing...', () => {
    suite('Unit Tests', () => {
        /**
         * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com> 
         */
        suite('Testing validateRegisterData() function...', () => {
            test('Checking valid registration data...', () => {
                let registrationData = {
                    userId: "AK28D2D8DH2",
                    name: "Kyle",
                    surname: "Havertz",
                    email: "kh@domain.com",
                    tel: "6188181818919",
                    bonusPoints: 0,
                    password: "123456",
                    confirmPassword: "123456",
                    birthDate: "1988-11-02T00:00:00.000Z",
                    nationality: "Germany"
                }

                let {
                    valid,
                    errors
                } = validateRegisterData(registrationData)

                assert.isTrue(valid, "It is a valid registration...")
                assert.deepEqual(errors, {}, "No errors...")
            })

            test('Checking empty email...', () => {
                let registrationData = {
                    name: "Kyle",
                    surname: "Havertz",
                    email: "",
                    tel: "6188181818919",
                    bonusPoints: 0,
                    password: "123456",
                    confirmPassword: "123456",
                    birthDate: "1988-11-02T00:00:00.000Z",
                    nationality: "Germany"
                }

                let {
                    valid,
                    errors
                } = validateRegisterData(registrationData)

                assert.isFalse(valid, "It is not a valid registration...")
                assert.strictEqual(errors.email, 'Email must not be empty!')
                assert.deepEqual(errors, {
                    email: 'Email must not be empty!'
                })
            })

            test('Checking invalid email...', () => {
                let registrationData = {
                    name: "Kyle",
                    surname: "Havertz",
                    email: "khdomain.com",
                    tel: "6188181818919",
                    bonusPoints: 0,
                    password: "123456",
                    confirmPassword: "123456",
                    birthDate: "1988-11-02T00:00:00.000Z",
                    nationality: "Germany"
                }

                let {
                    valid,
                    errors
                } = validateRegisterData(registrationData)

                assert.isFalse(valid, "It is not a valid registration...")
                assert.strictEqual(errors.email, 'Must be a valid a address!')
                assert.deepEqual(errors, {
                    email: 'Must be a valid a address!'
                })
            })

            test('Checking empty password & not matching with confirmed password...', () => {
                let registrationData = {
                    name: "Kyle",
                    surname: "Havertz",
                    email: "kh@domain.com",
                    tel: "6188181818919",
                    bonusPoints: 0,
                    password: "",
                    confirmPassword: "123456",
                    birthDate: "1988-11-02T00:00:00.000Z",
                    nationality: "Germany"
                }

                let {
                    valid,
                    errors
                } = validateRegisterData(registrationData)

                assert.isFalse(valid, "It is not a valid registration...")
                assert.strictEqual(errors.password, "Must not be empty!")
                assert.strictEqual(errors.confirmPassword, "Password must match!")
                assert.deepEqual(errors, {
                    password: "Must not be empty!",
                    confirmPassword: "Password must match!"
                })
            })

            test('Checking empty telephone number...', () => {
                let registrationData = {
                    name: "Kyle",
                    surname: "Havertz",
                    email: "kh@domain.com",
                    tel: "",
                    bonusPoints: 0,
                    password: "123456",
                    confirmPassword: "123456",
                    birthDate: "1988-11-02T00:00:00.000Z",
                    nationality: "Germany"
                }

                let {
                    valid,
                    errors
                } = validateRegisterData(registrationData)

                assert.isFalse(valid, "It is not a valid registration...")
                assert.strictEqual(errors.tel, "Must not be empty!")
                assert.deepEqual(errors, {
                    tel: "Must not be empty!"
                })
            })

            test('Checking empty birth date...', () => {
                let registrationData = {
                    name: "Kyle",
                    surname: "Havertz",
                    email: "kh@domain.com",
                    tel: "6188181818919",
                    bonusPoints: 0,
                    password: "123456",
                    confirmPassword: "123456",
                    birthDate: "",
                    nationality: "Germany"
                }

                let {
                    valid,
                    errors
                } = validateRegisterData(registrationData)

                assert.isFalse(valid, "It is not a valid registration...")
                assert.strictEqual(errors.birthDate, "Must not be empty!")
                assert.deepEqual(errors, {
                    birthDate: "Must not be empty!"
                })
            })

            test('Checking empty nationality...', () => {
                let registrationData = {
                    userId: "AK28D2D8DH2",
                    name: "Kyle",
                    surname: "Havertz",
                    email: "kh@domain.com",
                    tel: "6188181818919",
                    bonusPoints: 0,
                    password: "123456",
                    confirmPassword: "123456",
                    birthDate: "1988-11-02T00:00:00.000Z",
                    nationality: ""
                }

                let {
                    valid,
                    errors
                } = validateRegisterData(registrationData)

                assert.isFalse(valid, "It is not valid registration...")
                assert.equal(errors.nationality, "Must not be empty!")
                assert.deepEqual(errors, {
                    nationality: "Must not be empty!"
                })
            })
        })

    })

    suite('Functional Tests', () => {
        /**
         * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com> 
        */
        suite('POST /register', () => {
            test('Testing register endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                    .post('/api/register')
                    .type('application/json')
                    .send({
                        name: "Kyle",
                        surname: "Havertz",
                        email: "kh@domain.com",
                        tel: "6188181818919",
                        bonusPoints: 0,
                        password: "123456",
                        confirmPassword: "123456",
                        birthDate: "1988-11-02T00:00:00.000Z",
                        nationality: "Germany"
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 201, 'Response status should be 201...')
                        done()
                    })
            })
        })

        /**
         * @author Dimitris Giannopoulos 
         * @param {*} req 
         * @param {*} res 
        */
         suite('GET /getAvailableRoomsByDate', () => {
            test('Testing getAvailableRoomsByDate endpoint...', (done) => {
                chai
                    .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                    .get(`/getAvailableRoomsByDate/`+new Date().toISOString())
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200, "response must be 200")
                        assert.isAtLeast(Object.keys(res.body).length, 1)
                        done()
                    })

            })
        })

        /**
         * @author Sotiris Karageorgopoulos
         */
        suite('POST /postReview', () => {
            test('Testing the postReview endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .post('/postReview')
                    .type('form')
                    .send({
                        userId: "zTJyKwYSMEelU24s19b58BuJoAd2",
                        reviewId: "jdndnj",
                        rating: "5",
                        date: "2022-01-15T11:30:46Z",
                        comment: "csnjncsjnc csjnncsjncsnj scnjjcnsnjsc njcsjncsjn csnjcnsjn scjncnjsjn ncjsn"
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.strictEqual(res.text, `The review with reviewId 'jdndnj' is added to collection!`)
                        done()
                    })
            })
        })
        /**
         * @author Tassou Venetia
         */
        suite('GET /getCustomerBonus', () => {
            test('Testing getCustomerBonus endpoint...', (done) => {
                chai
                    .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                    .get(`/getCustomerBonus/Ho9Am9N4VEdlwhlrpuZibUqlgg33`)
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200, "response must be 200")
                        assert.equal(Object.keys(res.body).length, 1)
                        done()
                    })

            })
        })
        /**
         * @author Dimitris Giannopoulos
         */
        suite('GET /reservations', () => {
            test('Testing the getReservationsOfCustomer endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .get('/reservations/zTJyKwYSMEelU24s19b58BuJoAd2')
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.isAtLeast(res.body.length, 1, 'Must return at least')
                        done()
                    })
            })
        })
        /**
         * @author Dimitris Giannopoulos
         */
        suite('GET /reservation', () => {
            test('Testing the getReservationOfCustomer endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .get('/reservation/CPU3ztfgW4ApBgxrYwLI/zTJyKwYSMEelU24s19b58BuJoAd2')
                    .end((err, res) => {
                        let result = {
                            duration: 1,
                            userId: "zTJyKwYSMEelU24s19b58BuJoAd2",
                            roomsIds: ["302"],
                            decision: "accepted",
                            reservationId: "CPU3ztfgW4ApBgxrYwLI",
                            resDate: "2022-02-07T08:53:43Z",
                            totalPrice: 280,
                            customerNotes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        }
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.deepEqual(res.body, result, 'The JSON must be valid')
                        //assert.equal(res.body.length, 1, 'Must return one document') 
                        done()
                    })
            })
        })

    /**
     * @author George Koulos
     */
     suite('GET/getRoomsUntilPrice', () => {
        test('Testing getRoomsUntilPrice endpoint', (done) => {
            chai
                .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                .get('/api/getRoomsUntilPrice/70')
                .type('form')
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Response status should be 200...')
                    assert.isAtLeast(res.body.length, 1)
                    done()
                })
        })
    })

    /**
     * @author George Koulos
     */
    suite('GET/getRoomsByType', () => {
        test('Testing getRoomsByType endpoint', (done) => {
            chai
                .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                .get('/api/getRoomsByType/Double Room')
                .type('form')
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Response status should be 200...')
                    assert.isAtLeast(res.body.length, 1)
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
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        done()
                    })
            })
        })


        /**
         * @author Dimitris Giannopoulos
         */
        suite('PUT /updateReview', () => {
            test('Testing the updateReview endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .put('/updateReview/xnjcssjxnjsxnjsxjn')
                    .type('form')
                    .send({
                        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.strictEqual(res.text, `The document with id xnjcssjxnjsxnjsxjn updated successfully`)
                        done()
                    })
            })
        })
        /** 
         * @author Dimitris Michailidis <dimmichlds@gmail.com>
         */
        suite('POST /doReservation', () => {
            test('Testing the doReservation endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .post('/doReservation')
                    .type('form')
                    .send({
                        customerNotes: "Take me from airport",
                        decision: "pending",
                        duration: 1,
                        resDate: "2022-01-03T08:48:54.932Z",
                        reservationId: "12oA12LKaw",
                        roomsIds: ["102"],
                        userId: "ZKEm6dsh2defzKKZb4YLCmZLLtH2",
                        totalPrice: 100
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.strictEqual(res.text, `Reservation with 12oA12LKaw is ok...`)
                        done()
                    })
            })
        })
        /**
         * @author Dimitris Michailidis <dimmichlds@gmail.com>
         */
        suite('DELETE /cancelReservation', () => {
            test('Testing the cancelReservatio endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .delete('/cancelReservation/12oA12LKaw')
                    .type('form')
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.strictEqual(res.text, `Reservation with id: 12oA12LKaw deleted successfully!`)
                        done()
                    })
            })
        })
    })
})