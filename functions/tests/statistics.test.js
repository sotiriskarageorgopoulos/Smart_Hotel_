const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');

chai.use(chaiHttp)

suite('Statistics handler testing...', () => {
    suite('Unit Tests', () => {

    })

    suite('Functional Tests', () => {
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