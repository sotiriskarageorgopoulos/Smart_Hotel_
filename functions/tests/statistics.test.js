const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');
const Customer = require('../model/customer')

chai.use(chaiHttp)

suite('Statistics handler testing...', () => {
    suite('Unit Tests', () => {

    })

    suite('Functional Tests', () => {
        /**
         * @author George Koulos
         */
        suite('GET /reservationsByDate', () => {
            test('Testing the reservationsByDate endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .get('/reservationsByDate')
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.isAtLeast(res.body.length, 1)
                        done()
                    })
            })
        })
        /**
         * @author Tassou Venetia
         */
        suite('Testing get csutomers by nationality..', () => {
            test('test to get customer by nationality', (done) => {
                chai
                    .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                    .get(`/numberOfCustomersByNationality`)
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200, "response must be 200")
                        assert.isAtLeast(res.body.length, 1)
                        done()
                    })

            })

        })
        /** 
         * @author Dimitris Giannopoulos
         */
        suite('GET /incomeByDate', () => {
            test('Testing the getIncomeByDate endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .get('/incomeByDate')
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
        suite('GET/ReservationsByMonth', () => {
            test('Testing getReservationsByMonth endpoint', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                    .get('/api/ReservationsByMonth')
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
        suite('GET /roomWithMaxReservations', () => {
            test('Testing the getRoomWithMaxReservations endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .get('/roomWithMaxReservations')
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        done()
                    })
            })
        })
        /**
         * @author Dimitris Michailidis <dimmichlds@gmail.com>
         */
        suite('GET/MostDemandRooms', () => {
            test('Testing getMostDemandRooms endpoint', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                    .get('/api/MostDemandRooms/3')
                    .type('form')
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.isAtLeast(res.body.length, 1)
                        done()
                    })
            })
        })
    })
})